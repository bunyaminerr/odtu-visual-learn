export type AdjacencyMatrix = number[][];

export interface NodeDegree {
  nodeIndex: number;
  degree: number;
}

export interface GraphAnalysisResult {
  totalVertices: number;
  totalEdges: number;
  degrees: NodeDegree[];
  sumOfDegrees: number;
  isDirected: boolean;
  hasLoops: boolean;
  hasMultipleEdges: boolean;
  graphType: 'Simple Graph' | 'Multigraph' | 'Pseudograph' | 'Directed Graph' | 'Directed Multigraph';
  isComplete: boolean;
}
