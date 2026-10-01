export type CountingMethod = 
  | 'permutation' // Order matters, no repetition: P(n,r)
  | 'combination' // Order doesn't matter, no repetition: C(n,r)
  | 'permutation_rep' // Order matters, repetition allowed: n^r
  | 'combination_rep'; // Order doesn't matter, repetition allowed: C(n+r-1, r)

export interface CountingResult {
  method: CountingMethod;
  formulaTex: string;
  n: number;
  r: number;
  total: number;
  sampleSpace?: string[][]; // Optional, only populated if total < 50
  message?: string; // Information about why the space wasn't generated
}
