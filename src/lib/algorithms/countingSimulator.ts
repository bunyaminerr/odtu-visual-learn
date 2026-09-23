import { CountingResult, CountingMethod } from '../types/cng223Counting';

// Helper to calculate factorial
export function factorial(n: number): number {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

// C(n, r)
export function combinations(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// P(n, r)
export function permutations(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return factorial(n) / factorial(n - r);
}

// Generate items to sample from, e.g., A, B, C...
function getItems(n: number): string[] {
  const items = [];
  for (let i = 0; i < n; i++) {
    items.push(String.fromCharCode(65 + i)); // 65 is 'A'
  }
  return items;
}

// Generate Permutations without repetition
function getPermutations(arr: string[], r: number): string[][] {
  const results: string[][] = [];
  function backtrack(current: string[], used: boolean[]) {
    if (current.length === r) {
      results.push([...current]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      current.push(arr[i]);
      backtrack(current, used);
      current.pop();
      used[i] = false;
    }
  }
  backtrack([], Array(arr.length).fill(false));
  return results;
}

// Generate Combinations without repetition
function getCombinations(arr: string[], r: number): string[][] {
  const results: string[][] = [];
  function backtrack(start: number, current: string[]) {
    if (current.length === r) {
      results.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return results;
}

// Generate Permutations WITH repetition
function getPermutationsRep(arr: string[], r: number): string[][] {
  const results: string[][] = [];
  function backtrack(current: string[]) {
    if (current.length === r) {
      results.push([...current]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(current);
      current.pop();
    }
  }
  backtrack([]);
  return results;
}

// Generate Combinations WITH repetition
function getCombinationsRep(arr: string[], r: number): string[][] {
  const results: string[][] = [];
  function backtrack(start: number, current: string[]) {
    if (current.length === r) {
      results.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i, current); // pass i, not i+1 (repetition allowed)
      current.pop();
    }
  }
  backtrack(0, []);
  return results;
}

export function simulateCounting(n: number, r: number, orderMatters: boolean, repetitionAllowed: boolean): CountingResult {
  let method: CountingMethod;
  let total = 0;
  let formulaTex = '';
  let sampleSpace: string[][] | undefined = undefined;
  let message = undefined;

  const MAX_SAMPLES = 50;

  if (orderMatters && !repetitionAllowed) {
    method = 'permutation';
    total = permutations(n, r);
    formulaTex = `P(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!} = ${total}`;
    if (total > 0 && total <= MAX_SAMPLES) {
      sampleSpace = getPermutations(getItems(n), r);
    }
  } 
  else if (!orderMatters && !repetitionAllowed) {
    method = 'combination';
    total = combinations(n, r);
    formulaTex = `C(${n}, ${r}) = \\binom{${n}}{${r}} = \\frac{${n}!}{${r}!(${n}-${r})!} = ${total}`;
    if (total > 0 && total <= MAX_SAMPLES) {
      sampleSpace = getCombinations(getItems(n), r);
    }
  }
  else if (orderMatters && repetitionAllowed) {
    method = 'permutation_rep';
    total = Math.pow(n, r);
    formulaTex = `${n}^${r} = ${total}`;
    if (total > 0 && total <= MAX_SAMPLES) {
      sampleSpace = getPermutationsRep(getItems(n), r);
    }
  }
  else if (!orderMatters && repetitionAllowed) {
    method = 'combination_rep';
    // stars and bars
    total = combinations(n + r - 1, r);
    formulaTex = `C(${n}+${r}-1, ${r}) = \\binom{${n+r-1}}{${r}} = ${total}`;
    if (total > 0 && total <= MAX_SAMPLES) {
      sampleSpace = getCombinationsRep(getItems(n), r);
    }
  }

  if (total > MAX_SAMPLES) {
    message = `Toplam ${total} olasılık var. ${MAX_SAMPLES} adetten fazla olduğu için performans sebebiyle liste çizilmedi.`;
  }

  return {
    method: method!,
    formulaTex,
    n,
    r,
    total,
    sampleSpace,
    message
  };
}
