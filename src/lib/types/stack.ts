export const EMPTY_TOS = -1;
export const MIN_STACK_SIZE = 5;

// Array-based Stack (Static or Dynamic Array)
export interface CngArrayStack {
  capacity: number;
  topOfStack: number;
  array: (number | string | null)[];
}

// Linked List-based Stack (Dynamic)
export interface CngStackNode {
  id: string; // for React keys
  value: number | string;
  address: string;
  nextAddress: string | null;
  isTemp?: boolean; // For malloc highlight
  isTarget?: boolean; // For free highlight
}

export interface CngLinkedStack {
  topAddress: string | null;
  size: number;
}

export type CngStackImplementation = 'array' | 'linked_list';

// Frame structure for step-by-step animation
export interface CngStackFrame {
  stepIndex: number;
  arrayStack?: CngArrayStack; // If in array mode
  linkedNodes?: CngStackNode[]; // If in linked list mode
  linkedRecord?: CngLinkedStack;
  pointers?: {
    tmp: string | null;
    removeNode: string | null;
  };
  explanation: string;
  activeLineIndex: number;
  cCode?: string;
}

export type StackOpType = 'push' | 'pop' | 'infix_postfix' | 'parentheses';
