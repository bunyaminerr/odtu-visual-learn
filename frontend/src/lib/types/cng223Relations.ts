export interface RelationProperty {
  isTrue: boolean;
  reason?: string; // Reason why it failed, e.g. "(1,2) exists but (2,1) does not"
}

export interface RelationAnalysisResult {
  reflexive: RelationProperty;
  irreflexive: RelationProperty;
  symmetric: RelationProperty;
  asymmetric: RelationProperty;
  antisymmetric: RelationProperty;
  transitive: RelationProperty;
  isEquivalence: boolean;
  isPoset: boolean;
}

export type Matrix2D = (0 | 1)[][];
