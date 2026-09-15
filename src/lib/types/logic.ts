export type CellValue = 0 | 1 | 'X';

export interface KMapCell {
    row: string; // '00', '01', '11', '10' (AB)
    col: string; // '00', '01', '11', '10' (CD)
    mintermIndex: number; // 0-15
    value: CellValue;
}

export interface KMapGroup {
    id: string;
    cells: number[]; // Kapsanan minterm index'leri
    color: string; // Tailwind class, Örn: "bg-red-500/30 border-red-500"
    implicantTerm: string; // Örn: "A'C"
}

export interface KMapSolution {
    simplifiedExpression: string; // SOP string, Örn: "A'C + BD"
    posSimplifiedExpression?: string; // POS string, Örn: "(A + C') . (B' + D')"
    groups: KMapGroup[];
    posGroups?: KMapGroup[];
    truthTable: {
        inputs: number[]; // [A, B, C, D]
        output: CellValue;
    }[];
}
