export type MemorySegment = 'STACK' | 'HEAP' | 'DATA' | 'CODE';

export interface MemoryCell {
  id: string; // Unique identifier for React rendering (e.g., 'stack-x' or 'heap-0x1000')
  address: string; // Hex format, e.g., '0x7ffee0' or '0x600010'
  segment: MemorySegment;
  varName?: string; // e.g., 'x', 'ptr', 'arr[0]'
  type: string; // e.g., 'int', 'int*', 'char'
  value: string | number; // The actual value, can be a number or string like 'NULL' or another address
  sizeBytes: number; // Size in bytes, e.g., 4 for int, 1 for char
  isHighlighted: boolean; // For animation / visual focus
  isFree?: boolean; // True if the heap cell has been freed
}

export interface PointerArrow {
  id: string; // e.g., 'arrow-ptr-x'
  fromId: string; // ID of the MemoryCell where the pointer is stored
  toAddress: string | null; // Address the pointer points to (can be null)
  toId?: string; // ID of the target MemoryCell, if it exists in the current view
  label: string; // e.g., 'ptr', 'pptr'
  isDangling: boolean; // True if it points to freed memory
  isNull: boolean; // True if toAddress is NULL
}

export interface StructByte {
  offset: number; // Offset from the start of the struct (0, 1, 2, ...)
  byteType: 'DATA' | 'PADDING';
  fieldName?: string; // e.g., 'c', 'i', 's'
  color: string; // CSS color or Tailwind class name
}

export interface MemoryTimelineStep {
  stepNumber: number;
  title: string;
  explanation: string;
  cCodeSnippet: string;
  activeLineIndex: number;
  stackCells: MemoryCell[];
  heapCells: MemoryCell[];
  pointers: PointerArrow[];
}
