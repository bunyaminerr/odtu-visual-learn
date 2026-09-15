import { CellValue, KMapGroup, KMapSolution } from "@/lib/types/logic";

const COLORS = [
    "bg-red-500/30 border-red-500",
    "bg-blue-500/30 border-blue-500",
    "bg-green-500/30 border-green-500",
    "bg-yellow-500/30 border-yellow-500",
    "bg-purple-500/30 border-purple-500",
    "bg-pink-500/30 border-pink-500",
    "bg-cyan-500/30 border-cyan-500",
    "bg-orange-500/30 border-orange-500",
];

// Helper to count 1s in a binary string
const countOnes = (s: string) => s.split('').filter(c => c === '1').length;

// Convert implicant to SOP term (e.g. "0-1-" -> "A'C")
const formatImplicantSOP = (impl: string, numVars: number): string => {
    const vars = ['A', 'B', 'C', 'D'];
    let res = "";
    for (let i = 0; i < numVars; i++) {
        if (impl[i] === '1') res += vars[i];
        else if (impl[i] === '0') res += vars[i] + "'";
    }
    return res === "" ? "1" : res;
};

// Convert implicant of F' to POS term of F (e.g. "0-1-" -> "(A + C')")
const formatImplicantPOS = (impl: string, numVars: number): string => {
    const vars = ['A', 'B', 'C', 'D'];
    let res = [];
    for (let i = 0; i < numVars; i++) {
        if (impl[i] === '0') res.push(vars[i]);
        else if (impl[i] === '1') res.push(vars[i] + "'");
    }
    if (res.length === 0) return "0";
    if (res.length === 1) return res[0];
    return "(" + res.join(' + ') + ")";
};

// Check if a covers b (both are strings like "01-1", "0101")
const covers = (a: string, b: string, numVars: number): boolean => {
    for (let i = 0; i < numVars; i++) {
        if (a[i] !== '-' && a[i] !== b[i]) return false;
    }
    return true;
};

// Combine two implicants if they differ by exactly 1 bit
const combine = (a: string, b: string, numVars: number): string | null => {
    let diff = 0;
    let res = "";
    for (let i = 0; i < numVars; i++) {
        if (a[i] !== b[i]) {
            diff++;
            res += "-";
        } else {
            res += a[i];
        }
    }
    return diff === 1 ? res : null;
};

const solveQMC = (targets: number[], dontcares: number[], formatType: 'SOP' | 'POS', numVars: number): { expr: string, groups: KMapGroup[] } => {
    const maxCells = Math.pow(2, numVars);
    if (targets.length === 0) {
        return { expr: formatType === 'SOP' ? "0" : "1", groups: [] };
    }
    if (targets.length + dontcares.length === maxCells) {
        return {
            expr: formatType === 'SOP' ? "1" : "0",
            groups: [{
                id: `group-all-${formatType}`,
                cells: Array.from({length: maxCells}, (_, i) => i),
                color: COLORS[0],
                implicantTerm: formatType === 'SOP' ? "1" : "0"
            }]
        };
    }

    let implicants = [...targets, ...dontcares].map(n => n.toString(2).padStart(numVars, '0'));
    let primeImplicants = new Set<string>();

    while (implicants.length > 0) {
        const nextImplicants = new Set<string>();
        const combined = new Set<string>();

        for (let i = 0; i < implicants.length; i++) {
            for (let j = i + 1; j < implicants.length; j++) {
                const comb = combine(implicants[i], implicants[j], numVars);
                if (comb) {
                    nextImplicants.add(comb);
                    combined.add(implicants[i]);
                    combined.add(implicants[j]);
                }
            }
        }

        for (const impl of implicants) {
            if (!combined.has(impl)) primeImplicants.add(impl);
        }
        implicants = Array.from(nextImplicants);
    }

    const piList = Array.from(primeImplicants);
    let remainingTargets = new Set(targets.map(m => m.toString(2).padStart(numVars, '0')));
    const selectedPIs = new Set<string>();

    // 1. Essential PIs
    for (const m of Array.from(remainingTargets)) {
        const coveringPIs = piList.filter(pi => covers(pi, m, numVars));
        if (coveringPIs.length === 1) {
            selectedPIs.add(coveringPIs[0]);
            for (const cm of Array.from(remainingTargets)) {
                if (covers(coveringPIs[0], cm, numVars)) remainingTargets.delete(cm);
            }
        }
    }

    // 2. Greedy approach
    while (remainingTargets.size > 0) {
        let bestPI = "";
        let maxCovered = 0;
        for (const pi of piList) {
            if (selectedPIs.has(pi)) continue;
            let coveredCount = 0;
            for (const m of Array.from(remainingTargets)) {
                if (covers(pi, m, numVars)) coveredCount++;
            }
            if (coveredCount > maxCovered) {
                bestPI = pi;
                maxCovered = coveredCount;
            }
        }
        selectedPIs.add(bestPI);
        for (const m of Array.from(remainingTargets)) {
            if (covers(bestPI, m, numVars)) remainingTargets.delete(m);
        }
    }

    const groups: KMapGroup[] = [];
    let idx = 0;
    for (const pi of Array.from(selectedPIs)) {
        const cells: number[] = [];
        for (let i = 0; i < maxCells; i++) {
            const b = i.toString(2).padStart(numVars, '0');
            if (covers(pi, b, numVars)) cells.push(i);
        }
        groups.push({
            id: `group-${formatType}-${idx}`,
            cells,
            color: COLORS[idx % COLORS.length],
            implicantTerm: formatType === 'SOP' ? formatImplicantSOP(pi, numVars) : formatImplicantPOS(pi, numVars)
        });
        idx++;
    }

    const expr = groups.map(g => g.implicantTerm).join(formatType === 'SOP' ? ' + ' : ' . ');
    return { expr, groups };
};

export const solveKMap = (minterms: number[], dontcares: number[], numVars: number = 4): KMapSolution => {
    const maxCells = Math.pow(2, numVars);
    
    // SOP Solver
    const sopRes = solveQMC(minterms, dontcares, 'SOP', numVars);
    
    // POS Solver
    const maxterms: number[] = [];
    for (let i = 0; i < maxCells; i++) {
        if (!minterms.includes(i) && !dontcares.includes(i)) {
            maxterms.push(i);
        }
    }
    const posRes = solveQMC(maxterms, dontcares, 'POS', numVars);

    return {
        simplifiedExpression: sopRes.expr,
        groups: sopRes.groups,
        posSimplifiedExpression: posRes.expr,
        posGroups: posRes.groups,
        truthTable: generateTruthTable(minterms, dontcares, numVars)
    };
};

const generateTruthTable = (minterms: number[], dontcares: number[], numVars: number) => {
    const tt = [];
    const maxCells = Math.pow(2, numVars);
    for (let i = 0; i < maxCells; i++) {
        let output: CellValue = 0;
        if (minterms.includes(i)) output = 1;
        else if (dontcares.includes(i)) output = 'X';

        const inputs = [];
        for (let j = numVars - 1; j >= 0; j--) {
            inputs.push((i >> j) & 1);
        }

        tt.push({
            inputs,
            output
        });
    }
    return tt;
};

export const analyzeKMap = (grid: number[][], numVars: number) => {
    const minterms: number[] = [];
    const dontcares: number[] = [];
    
    // Map grid positions to cell indices for 2, 3, and 4 variables
    let cellMap: number[][] = [];
    if (numVars === 2) {
        cellMap = [
            [0, 1],
            [2, 3]
        ];
    } else if (numVars === 3) {
        cellMap = [
            [0, 1, 3, 2],
            [4, 5, 7, 6]
        ];
    } else if (numVars === 4) {
        cellMap = [
            [0, 1, 3, 2],
            [4, 5, 7, 6],
            [12, 13, 15, 14],
            [8, 9, 11, 10]
        ];
    }
    
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const val = grid[r][c];
            const idx = cellMap[r][c];
            if (val === 1) minterms.push(idx);
            else if (val === 2) dontcares.push(idx); // 2 represents Don't Care (d)
        }
    }
    
    const sol = solveKMap(minterms, dontcares, numVars);
    
    return {
        sop: {
            expression: sol.simplifiedExpression,
            primeImplicants: sol.groups.map(g => g.implicantTerm)
        },
        pos: {
            expression: sol.posSimplifiedExpression,
            primeImplicants: sol.posGroups.map(g => g.implicantTerm)
        }
    };
};
