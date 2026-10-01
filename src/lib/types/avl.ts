export interface AVLNodeState {
  id: string;
  val: number;
  height: number;
  address: string;
  leftAddress: string | null;
  rightAddress: string | null;
  isActive?: boolean;
  isTarget?: boolean;
  isTemp?: boolean;
}

export interface AVLRecord {
  rootAddress: string | null;
  size: number;
}

export interface AVLPointers {
  t: string | null;
  k1: string | null;
  k2: string | null;
  k3: string | null;
}

export interface AVLStep {
  stepNumber: number;
  title: string;
  explanation: string;
  activeCodeLine: number | null;
  cCode: string;
  
  nodes: AVLNodeState[];
  treeRecord: AVLRecord;
  pointers: AVLPointers;
  activePointers: string[];
}

export type AVLOperation = 'insert' | 'delete' | 'find' | 'find_min' | 'find_max' | 'tree_height' | 'count_nodes' | 'count_leaves' | 'is_avl' | 'traverse_inorder' | 'traverse_preorder' | 'traverse_postorder' | 'traverse_levelorder' | 'random_tree';
