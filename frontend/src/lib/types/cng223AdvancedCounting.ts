export interface RecurrenceInput {
  c1: number;
  c2: number;
  a0: number;
  a1: number;
}

export type RootType = 'distinct_real' | 'double_real' | 'complex' | 'invalid';

export interface RecurrenceSolution {
  input: RecurrenceInput;
  rootType: RootType;
  r1?: number | string;
  r2?: number | string;
  alpha1?: number | string;
  alpha2?: number | string;
  stepsTex: string[];
  finalTex: string;
}
