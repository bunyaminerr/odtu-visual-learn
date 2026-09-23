import { AdjacencyMatrix, GraphAnalysisResult, NodeDegree } from '../types/cng223Graphs';

export function analyzeGraph(matrix: AdjacencyMatrix): GraphAnalysisResult {
  const n = matrix.length;
  let isDirected = false;
  let hasLoops = false;
  let hasMultipleEdges = false;
  let isComplete = true;

  // 1. Determine basic properties
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] !== matrix[j][i]) {
        isDirected = true;
      }
      if (i === j && matrix[i][j] > 0) {
        hasLoops = true;
      }
      if (matrix[i][j] > 1) {
        hasMultipleEdges = true;
      }
      if (i !== j && matrix[i][j] === 0) {
        isComplete = false;
      }
    }
  }

  // 2. Determine Graph Type
  let graphType: GraphAnalysisResult['graphType'] = 'Simple Graph';
  if (isDirected) {
    graphType = hasMultipleEdges ? 'Directed Multigraph' : 'Directed Graph';
  } else {
    if (hasLoops) {
      graphType = 'Pseudograph';
    } else if (hasMultipleEdges) {
      graphType = 'Multigraph';
    } else {
      graphType = 'Simple Graph';
    }
  }

  // 3. Calculate Degrees & Edges
  let totalEdges = 0;
  let sumOfDegrees = 0;
  const degrees: NodeDegree[] = [];

  for (let i = 0; i < n; i++) {
    let deg = 0;
    for (let j = 0; j < n; j++) {
      deg += matrix[i][j];
      
      // ODTÜ rules: A loop contributes 2 to the degree of an undirected graph.
      // If the matrix has a 1 at M[i][i] for a loop, the row sum adds 1, 
      // but we need it to contribute 2, so we add an extra 1.
      if (!isDirected && i === j && matrix[i][j] > 0) {
        deg += matrix[i][j]; // Add M[i][i] again (so a 1 becomes 2)
      }
    }
    degrees.push({ nodeIndex: i, degree: deg });
    sumOfDegrees += deg;
  }

  // Total edges calculation
  if (isDirected) {
    // In directed graphs, sum of all entries is the number of edges.
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        totalEdges += matrix[i][j];
      }
    }
  } else {
    // Undirected graphs: sum of degrees = 2 * totalEdges
    totalEdges = sumOfDegrees / 2;
  }

  return {
    totalVertices: n,
    totalEdges,
    degrees,
    sumOfDegrees,
    isDirected,
    hasLoops,
    hasMultipleEdges,
    graphType,
    isComplete: isComplete && graphType === 'Simple Graph'
  };
}
