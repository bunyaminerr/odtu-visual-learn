import { MaryCalculationResult, MaryInputType, TreeNode, TraversalType, TreeTraversalResult } from '../types/cng223Trees';

export function calculateMaryTree(m: number, inputType: MaryInputType, value: number): MaryCalculationResult {
  let n = 0, i = 0, l = 0;
  const stepsTex: string[] = [];

  stepsTex.push(`\\text{Ağaç Tipi (m): } ${m}`);

  if (inputType === 'n') {
    n = value;
    stepsTex.push(`\\text{Verilen: Toplam Düğüm } (n) = ${n}`);
    
    // i = (n - 1) / m
    i = (n - 1) / m;
    stepsTex.push(`i = \\frac{n - 1}{m} = \\frac{${n} - 1}{${m}} = ${i}`);
    
    // l = n - i
    l = n - i;
    stepsTex.push(`l = n - i = ${n} - ${i} = ${l}`);

  } else if (inputType === 'i') {
    i = value;
    stepsTex.push(`\\text{Verilen: İç Düğüm } (i) = ${i}`);
    
    // n = mi + 1
    n = m * i + 1;
    stepsTex.push(`n = m \\cdot i + 1 = ${m} \\cdot ${i} + 1 = ${n}`);
    
    // l = (m - 1)i + 1
    l = (m - 1) * i + 1;
    stepsTex.push(`l = (m - 1)i + 1 = (${m} - 1) \\cdot ${i} + 1 = ${l}`);

  } else if (inputType === 'l') {
    l = value;
    stepsTex.push(`\\text{Verilen: Yaprak } (l) = ${l}`);
    
    // i = (l - 1) / (m - 1)
    i = (l - 1) / (m - 1);
    stepsTex.push(`i = \\frac{l - 1}{m - 1} = \\frac{${l} - 1}{${m} - 1} = ${i}`);
    
    // n = mi + 1
    n = m * i + 1;
    stepsTex.push(`n = m \\cdot i + 1 = ${m} \\cdot ${i} + 1 = ${n}`);
  }

  // Validate results
  if (n % 1 !== 0 || i % 1 !== 0 || l % 1 !== 0) {
    stepsTex.push(`\\text{\\textcolor{red}{Hata: Verilen m değerine göre tam sayı çıkmadı. Girdi geçersiz.}}`);
  }

  return { m, n, i, l, stepsTex };
}

// Fixed Tree Traversal
export function getTreeTraversal(nodes: Record<string, TreeNode>, rootId: string, type: TraversalType): TreeTraversalResult {
  const path: string[] = [];

  function traverse(nodeId: string) {
    const node = nodes[nodeId];
    if (!node) return;

    if (type === 'preorder') {
      path.push(node.id); // N
      if (node.left) traverse(node.left); // L
      if (node.right) traverse(node.right); // R
    } else if (type === 'inorder') {
      if (node.left) traverse(node.left); // L
      path.push(node.id); // N
      if (node.right) traverse(node.right); // R
    } else if (type === 'postorder') {
      if (node.left) traverse(node.left); // L
      if (node.right) traverse(node.right); // R
      path.push(node.id); // N
    }
  }

  traverse(rootId);
  return { path };
}
