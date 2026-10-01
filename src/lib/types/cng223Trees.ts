export type MaryInputType = 'n' | 'i' | 'l';

export interface MaryCalculationResult {
  m: number;
  n: number; // total vertices
  i: number; // internal vertices
  l: number; // leaves
  stepsTex: string[];
}

export type TraversalType = 'preorder' | 'inorder' | 'postorder';

export interface TreeNode {
  id: string;
  left?: string;
  right?: string;
}

export interface TreeTraversalResult {
  path: string[];
}
