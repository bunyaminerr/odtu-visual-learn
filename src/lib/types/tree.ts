export interface TreeNodeState {
  id: string; // Unique identifier for React key
  address: string; // Hex string mocking memory address
  val: number;
  leftAddress: string | null;
  rightAddress: string | null;
  
  // Visual states
  isTemp?: boolean; // Highlighted as newly created (malloc)
  isTarget?: boolean; // Highlighted for deletion or found
  isActive?: boolean; // Currently being evaluated in recursion/iteration
}

export interface TreeRecord {
  rootAddress: string | null;
  size: number;
}

export interface TreePointers {
  current: string | null;
  parent: string | null;
  tmp: string | null;
}

export interface TreeStep {
  stepNumber: number;
  title: string;
  explanation: string;
  activeCodeLine: number;
  cCode: string;
  
  nodes: TreeNodeState[];
  treeRecord: TreeRecord;
  pointers: TreePointers;
  activePointers: string[]; // E.g., ['root', 'current_left']
  traversalResult?: number[]; // Stores printed node values during traversals
}

export type TreeOperation = 
  | 'insert_recursive'
  | 'insert_iterative'
  | 'delete_iterative'
  | 'delete_node'
  | 'find_iterative'
  | 'find_min_iterative'
  | 'find_max_iterative'
  | 'find_min_recursive'
  | 'find_max_recursive'
  | 'traverse_inorder'
  | 'traverse_preorder'
  | 'traverse_postorder'
  | 'traverse_level'
  | 'tree_height'
  | 'count_nodes'
  | 'count_leaves';
