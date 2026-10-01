import { ASTNode, TruthTableResult, TruthTableRow } from '../types/cng223Logic';

// A simple recursive descent parser for Propositional Logic

const OPERATOR_PRECEDENCE: Record<string, number> = {
  'NOT': 5,
  'AND': 4,
  'OR': 3,
  'XOR': 3,
  'IMPLIES': 2,
  'IFF': 1,
};

function tokenize(expr: string): string[] {
  // Normalize operators with word boundaries for text keywords
  let s = expr
    .replace(/<->|<=>|\bIFF\b/gi, ' IFF ')
    .replace(/->|=>|\bIMPLIES\b/gi, ' IMPLIES ')
    .replace(/&&|&|\bAND\b|\*/gi, ' AND ')
    .replace(/\|\||\||\bOR\b|\+/gi, ' OR ')
    .replace(/!|~|\bNOT\b/gi, ' NOT ')
    .replace(/\^|\bXOR\b/gi, ' XOR ')
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .replace(/\bT\b|\bTRUE\b|\b1\b/gi, ' 1 ')
    .replace(/\bF\b|\bFALSE\b|\b0\b/gi, ' 0 ');

  return s.split(/\s+/).filter(t => t.length > 0);
}

class Parser {
  private tokens: string[];
  private pos: number = 0;

  constructor(tokens: string[]) {
    this.tokens = tokens;
  }

  private peek(): string | null {
    if (this.pos < this.tokens.length) return this.tokens[this.pos];
    return null;
  }

  private consume(): string {
    return this.tokens[this.pos++];
  }

  public parse(): ASTNode {
    const node = this.parseExpression(0);
    if (this.pos < this.tokens.length) {
      throw new Error(`Unexpected token at end: ${this.peek()}`);
    }
    return node;
  }

  private parseExpression(minPrecedence: number): ASTNode {
    let left = this.parsePrimary();

    while (true) {
      const token = this.peek();
      if (!token) break;

      const precedence = OPERATOR_PRECEDENCE[token];
      if (precedence === undefined || precedence < minPrecedence) {
        break;
      }

      this.consume(); // consume operator
      
      // Right associative for IMPLIES, Left for others
      const nextMinPrec = token === 'IMPLIES' ? precedence : precedence + 1;
      const right = this.parseExpression(nextMinPrec);

      left = {
        type: 'operator',
        value: token,
        left,
        right,
      };
    }

    return left;
  }

  private parsePrimary(): ASTNode {
    const token = this.peek();
    if (!token) throw new Error("Unexpected end of expression");

    if (token === 'NOT') {
      this.consume();
      return {
        type: 'operator',
        value: 'NOT',
        right: this.parseExpression(OPERATOR_PRECEDENCE['NOT']),
      };
    }

    if (token === '(') {
      this.consume();
      const node = this.parseExpression(0);
      if (this.consume() !== ')') {
        throw new Error("Missing closing parenthesis ')'");
      }
      return node;
    }

    if (token === '1' || token === '0') {
      this.consume();
      return { type: 'constant', value: token };
    }

    // Variable
    if (/^[a-zA-Z]$/.test(token)) {
      this.consume();
      return { type: 'variable', value: token };
    }

    throw new Error(`Unexpected token: ${token}`);
  }
}

function getVariables(node: ASTNode, vars: Set<string>) {
  if (node.type === 'variable') vars.add(node.value);
  if (node.left) getVariables(node.left, vars);
  if (node.right) getVariables(node.right, vars);
}

function evaluate(node: ASTNode, env: Record<string, boolean>, stepsOut: Record<string, boolean>): boolean {
  if (node.type === 'constant') return node.value === '1';
  if (node.type === 'variable') {
    if (env[node.value] === undefined) throw new Error(`Missing variable ${node.value}`);
    return env[node.value];
  }
  
  if (node.type === 'operator') {
    if (node.value === 'NOT') {
      const val = !evaluate(node.right!, env, stepsOut);
      stepsOut[formatNode(node)] = val;
      return val;
    }
    const leftVal = evaluate(node.left!, env, stepsOut);
    const rightVal = evaluate(node.right!, env, stepsOut);
    let val = false;
    switch (node.value) {
      case 'AND': val = leftVal && rightVal; break;
      case 'OR': val = leftVal || rightVal; break;
      case 'XOR': val = leftVal !== rightVal; break;
      case 'IMPLIES': val = !leftVal || rightVal; break;
      case 'IFF': val = leftVal === rightVal; break;
    }
    stepsOut[formatNode(node)] = val;
    return val;
  }
  return false;
}

function formatNode(node: ASTNode): string {
  if (node.type === 'constant') return node.value === '1' ? 'T' : 'F';
  if (node.type === 'variable') return node.value;
  if (node.value === 'NOT') return `~${formatNode(node.right!)}`;
  
  const leftStr = node.left!.type === 'operator' && OPERATOR_PRECEDENCE[node.left!.value] < OPERATOR_PRECEDENCE[node.value] ? `(${formatNode(node.left!)})` : formatNode(node.left!);
  const rightStr = node.right!.type === 'operator' && OPERATOR_PRECEDENCE[node.right!.value] <= OPERATOR_PRECEDENCE[node.value] ? `(${formatNode(node.right!)})` : formatNode(node.right!);

  let op = node.value;
  if (op === 'AND') op = '∧';
  if (op === 'OR') op = '∨';
  if (op === 'XOR') op = '⊕';
  if (op === 'IMPLIES') op = '→';
  if (op === 'IFF') op = '↔';

  return `${leftStr} ${op} ${rightStr}`;
}

export function generateTruthTable(expression: string): TruthTableResult {
  try {
    const tokens = tokenize(expression);
    if (tokens.length === 0) throw new Error("Empty expression");
    
    const parser = new Parser(tokens);
    const ast = parser.parse();

    const varsSet = new Set<string>();
    getVariables(ast, varsSet);
    const variables = Array.from(varsSet).sort();

    if (variables.length > 5) {
      throw new Error("Too many variables! Max allowed is 5 to prevent browser freezing.");
    }

    const numRows = Math.pow(2, variables.length);
    const rows: TruthTableRow[] = [];
    
    let allHeaders = new Set<string>();

    for (let i = 0; i < numRows; i++) {
      const env: Record<string, boolean> = {};
      for (let j = 0; j < variables.length; j++) {
        // Standard truth table ordering: False first or True first? 
        // We'll use True first (1) then False (0).
        env[variables[j]] = ((i >> (variables.length - 1 - j)) & 1) === 0;
      }
      
      const stepsOut: Record<string, boolean> = {};
      const result = evaluate(ast, env, stepsOut);
      
      Object.keys(stepsOut).forEach(k => allHeaders.add(k));
      
      rows.push({
        inputs: env,
        intermediateSteps: stepsOut,
        result
      });
    }

    const headers = Array.from(allHeaders).sort((a, b) => a.length - b.length);
    const finalHeader = formatNode(ast);
    // ensure final is last
    const filteredHeaders = headers.filter(h => h !== finalHeader);
    filteredHeaders.push(finalHeader);

    const isTautology = rows.every(r => r.result === true);
    const isContradiction = rows.every(r => r.result === false);

    return {
      originalExpression: expression,
      variables,
      headers: filteredHeaders,
      rows,
      isTautology,
      isContradiction,
      isContingency: !isTautology && !isContradiction
    };

  } catch (error: any) {
    return {
      originalExpression: expression,
      variables: [],
      headers: [],
      rows: [],
      isTautology: false,
      isContradiction: false,
      isContingency: false,
      error: error.message || "Invalid expression"
    };
  }
}
