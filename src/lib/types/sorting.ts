export type AlgorithmType = 'selection' | 'insertion' | 'bubble' | 'merge' | 'quick' | 'linear' | 'binary';

export interface ArrayElement {
  id: string; // Unique ID for Framer Motion layout animations (e.g. 'el-5' for value 5)
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'found' | 'eliminated';
}

export interface SortingFrame {
  stepNumber: number;
  elements: ArrayElement[];
  explanation: string;
  activeLineIndex: number; // Matches the 0-indexed line number of the canonical C code
  
  // Specific pointers for searching
  low?: number;
  mid?: number;
  high?: number;

  swapCount?: number;
}

export interface AlgorithmMetadata {
  id: AlgorithmType;
  title: string;
  cCode: string; // The canonical C implementation
  invariants: string[]; // e.g. "Dış döngü i ne işe yarıyor?"
  complexityInsight: {
    text: string;
    formula: string; // KaTeX math
  };
  pitfalls: string[]; // ODTÜ Lab / exam tricks
}
