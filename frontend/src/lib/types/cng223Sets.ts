export interface SetElement {
  id: string;
  label: string;
}

export interface MappingEdge {
  from: string; // id of element in domain
  to: string; // id of element in codomain
}

export interface FunctionAnalysisResult {
  isFunction: boolean;
  isInjective: boolean;
  isSurjective: boolean;
  isBijective: boolean;
  reasons: string[];
}
