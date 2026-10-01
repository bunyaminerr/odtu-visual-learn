export type RowOperationType = 'SWAP' | 'SCALE' | 'ADD_MULTIPLE';

export interface RowOperation {
    type: RowOperationType;
    sourceRow: number;
    targetRow: number;
    scalar?: string; // Kesirli gösterimler (Örn: "3/2") için string
    latexExplanation: string; // Örn: "R_2 \leftarrow R_2 - 2R_1"
}

export interface MatrixCell {
    row: number;
    col: number;
    value: string; // Rasyonel veya tam sayı formatında string gösterimi
    isPivot: boolean;
    isActive: boolean;
}

export interface MatrixStep {
    stepIndex: number;
    title: string;
    explanation: string; // Sokratik, Türkçe pedagojik açıklama
    matrix: string[][]; // Kesirli değerleri tutan 2D dizi
    pivot: { row: number; col: number } | null;
    activeRows: number[];
    operation: RowOperation | null;
}

export interface MatrixSolveResponse {
    originalMatrix: string[][];
    totalSteps: number;
    steps: MatrixStep[];
    rank: number;
    isConsistent: boolean;
}
