export interface LinkedListNode {
    id: string; // React flow node ID için kullanışlı
    value: number | string;
    address: string; // Örn: '0x7ffee1'
    nextAddress: string | null;
}

export interface MemoryPointer {
    head: string | null;
    tail?: string | null;
    current?: string | null;
    prev?: string | null;
    temp?: string | null;
    next?: string | null; // Reverse işlemlerinde kullanılır
}

export interface LinkedListStep {
    stepIndex: number;
    title: string;
    explanation: string; // Sokratik açıklama
    cCodeSnippet: string; // O adımda çalışan C kodu
    nodes: LinkedListNode[];
    pointers: MemoryPointer;
    highlightAddress?: string; // Vurgulanacak bellek adresi
}
