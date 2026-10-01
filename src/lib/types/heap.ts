export type HeapMode = 'min' | 'max';

export interface HeapNodeState {
  id: string;      // Unique identifier for animation tracking
  val: number;     // The value of the element
  index: number;   // 1-based index in the array
  isActive?: boolean;
  isTarget?: boolean;
  isTemp?: boolean;
}

export interface HeapRecord {
  size: number;
  capacity: number;
  mode: HeapMode;
}

export interface HeapPointers {
  i: number | null;
  child: number | null;
  parent: number | null;
  tmp: number | null; // useful for swap index or temp value
}

export interface HeapStep {
  stepNumber: number;
  title: string;
  explanation: string;
  activeCodeLine: number | null;
  cCode: string;
  
  nodes: HeapNodeState[];
  record: HeapRecord;
  pointers: HeapPointers;
  activePointers: string[];
}

export type HeapOperation = 'insert' | 'delete' | 'heapify' | 'heapsort' | 'increase_key' | 'decrease_key' | 'clear' | 'random';
