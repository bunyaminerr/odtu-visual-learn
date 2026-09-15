export interface DNodeState {
  id: string; // for React keys
  val: number | string;
  address: string; // Hex e.g. "0x00A123"
  prevAddress: string | null;
  nextAddress: string | null;
  isTarget?: boolean;
  isTemp?: boolean;
  isDummy?: boolean;
}

export interface DListRecord {
  headAddress: string | null;
  tailAddress: string | null;
  size: number;
}

export interface DListStep {
  stepNumber: number;
  title: string;
  explanation: string;
  activeCodeLine: number;
  cCode: string;
  nodes: DNodeState[];
  listRecord: DListRecord;
  highlightNodeId?: string;
  activePointers: string[]; // which pointers are currently being animated/highlighted
  pointers: {
    tmp: string | null;
    current: string | null;
    target: string | null;
  };
}

export type DllOperation = 
  | 'insert_head' | 'insert_tail' | 'insert_index' | 'insert_before' | 'insert_after'
  | 'delete_head' | 'delete_tail' | 'delete_index' | 'delete_before' | 'delete_after' | 'delete_node'
  | 'traverse' | 'reverse';
