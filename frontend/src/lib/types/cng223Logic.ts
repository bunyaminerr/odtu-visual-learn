export type LogicOperator = 'AND' | 'OR' | 'NOT' | 'IMPLIES' | 'IFF' | 'XOR';

export interface ASTNode {
  type: 'variable' | 'operator' | 'constant';
  value: string; 
  left?: ASTNode;
  right?: ASTNode;
}

export interface TruthTableRow {
  inputs: Record<string, boolean>;
  intermediateSteps: Record<string, boolean>;
  result: boolean;
}

export interface TruthTableResult {
  originalExpression: string;
  variables: string[];
  headers: string[]; // List of expressions evaluated in order (sub-expressions -> final)
  rows: TruthTableRow[];
  isTautology: boolean;
  isContradiction: boolean;
  isContingency: boolean;
  error?: string;
}
