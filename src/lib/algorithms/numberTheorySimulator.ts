import { EuclideanStep, ExtendedEuclideanResult } from '../types/cng223NumberTheory';

export function calculateExtendedEuclidean(originalA: number, originalB: number): ExtendedEuclideanResult {
  let a = originalA;
  let b = originalB;

  let s1 = 1, s2 = 0;
  let t1 = 0, t2 = 1;

  const steps: EuclideanStep[] = [];
  let stepCount = 1;

  while (b > 0) {
    const q = Math.floor(a / b);
    const r = a - q * b;
    const s = s1 - q * s2;
    const t = t1 - q * t2;

    steps.push({
      step: stepCount++,
      a,
      b,
      q,
      r,
      s1,
      s2,
      s,
      t1,
      t2,
      t
    });

    a = b;
    b = r;
    s1 = s2;
    s2 = s;
    t1 = t2;
    t2 = t;
  }

  // The last 'a' is the GCD.
  // The last 's1' and 't1' are the Bezout coefficients such that: originalA * s1 + originalB * t1 = GCD
  
  let modularInverse: number | null = null;
  
  if (a === 1) {
    // If GCD is 1, originalA and originalB are coprime.
    // Modular inverse of originalA modulo originalB is s1
    modularInverse = s1 % originalB;
    if (modularInverse < 0) {
      modularInverse += originalB;
    }
  }

  return {
    a: originalA,
    b: originalB,
    gcd: a,
    s: s1,
    t: t1,
    steps,
    modularInverse
  };
}
