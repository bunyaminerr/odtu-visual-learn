export interface ProbabilityVariable {
  id: string;
  x: number; // The outcome value
  px: number; // The probability P(X = x)
}

export interface ExpectedValueResult {
  isValid: boolean;
  totalProbability: number;
  expectedValue: number; // E(X)
  expectedValueSquared: number; // E(X^2)
  variance: number; // V(X)
  standardDeviation: number; // SD(X)
  stepsTex: string[];
}
