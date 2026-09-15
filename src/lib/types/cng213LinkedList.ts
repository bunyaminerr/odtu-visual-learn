export type CngNodeValue = number | 'DUMMY';

export interface CngNode {
  id: string; // unique string for framer motion
  value: CngNodeValue;
  address: string; // e.g. "0x3af960"
  nextAddress: string | null;
  
  // Visual states
  isTemp?: boolean; // Highlighted as newly malloc'd
  isTarget?: boolean; // Highlighted for deletion or swapping
  isEliminated?: boolean; // For nodes that are freed
}

export interface CngListRecord {
  headAddress: string; // Always points to Dummy Node
  tailAddress: string; // Points to last node, or Dummy if size=0
  size: number;
}

export interface CngPointerState {
  current: string | null;
  tmp: string | null;
  removeNode: string | null;
  first: string | null;
  second: string | null;
}

export interface CngLinkedListFrame {
  stepIndex: number;
  nodes: CngNode[]; // All nodes currently in memory
  listRecord: CngListRecord;
  pointers: CngPointerState;
  
  // UI Sync
  activeLineIndex: number;
  explanation: string;
}

export type CngOperationType = 
  'insert_head' | 'insert_end' | 'insert_index' | 'insert_sorted' | 
  'delete_head' | 'delete_tail' | 'delete_index' | 'delete' | 
  'swap_first_two' |
  'get_element_at_position' | 'get_position_of_element' | 
  'head_of_list' | 'tail_of_list' | 'list_size' | 'is_empty';
