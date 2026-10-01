export interface EuclideanStep {
  step: number;
  a: number;
  b: number;
  q: number; // Quotient
  r: number; // Remainder
  s1: number;
  s2: number;
  s: number;
  t1: number;
  t2: number;
  t: number;
}

export interface ExtendedEuclideanResult {
  a: number;
  b: number;
  gcd: number;
  s: number; // Bezout coefficient 1
  t: number; // Bezout coefficient 2
  steps: EuclideanStep[];
  modularInverse: number | null; // Null if no inverse exists (i.e. gcd != 1)
}
