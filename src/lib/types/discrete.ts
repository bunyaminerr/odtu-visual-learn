export interface HasseNode {
    id: string;
    label: string;
    level: number;
}

export interface HasseEdge {
    source: string;
    target: string;
}

export interface PosetRelation {
    elements: string[];
    pairs: [string, string][]; // (a, b) means a <= b
}

export interface RecurrenceNode {
    id: string;
    name: string; // Örn: "T(n/2)"
    cost: string; // Örn: "n/2" veya "c(n/2)"
    children?: RecurrenceNode[];
}

export interface RecurrenceResult {
    tree: RecurrenceNode;
    depth: string;
    leaves: string;
    totalWork: string; // Örn: "O(n log n)"
}
