import { RecurrenceInput, RecurrenceSolution, RootType } from '../types/cng223AdvancedCounting';

export function solveRecurrence(input: RecurrenceInput): RecurrenceSolution {
  const { c1, c2, a0, a1 } = input;
  const stepsTex: string[] = [];
  
  stepsTex.push(`\\text{Problem: } a_n = ${c1}a_{n-1} + (${c2})a_{n-2}`);
  stepsTex.push(`\\text{Başlangıç Koşulları: } a_0 = ${a0}, a_1 = ${a1}`);
  
  // Characteristic Equation: r^2 - c1 r - c2 = 0
  const signC1 = c1 > 0 ? `-${c1}` : `+${Math.abs(c1)}`;
  const signC2 = c2 > 0 ? `-${c2}` : `+${Math.abs(c2)}`;
  stepsTex.push(`\\text{1. Karakteristik Denklem: } r^2 ${signC1}r ${signC2} = 0`);

  const delta = c1 * c1 + 4 * c2;
  stepsTex.push(`\\Delta = (${c1})^2 - 4(1)(-${c2}) = ${delta}`);

  if (delta < 0) {
    stepsTex.push(`\\text{Diskriminant } < 0 \\text{ olduğundan kökler karmaşıktır. Bu araç sadece reel kökleri destekler.}`);
    return {
      input,
      rootType: 'complex',
      stepsTex,
      finalTex: '\\text{Reel kök yok.}'
    };
  }

  if (delta === 0) {
    // Double root
    const r = c1 / 2;
    stepsTex.push(`\\text{2. Çakışık Reel Kök (Double Root): } r_1 = r_2 = r = ${r}`);
    
    if (r === 0) {
      stepsTex.push(`r = 0 \\text{ olduğundan } a_n = 0.`);
      return {
        input,
        rootType: 'double_real',
        r1: 0, r2: 0, alpha1: 0, alpha2: 0,
        stepsTex, finalTex: 'a_n = 0'
      };
    }

    stepsTex.push(`\\text{Kökler çakışık olduğu için çözüm formu: } a_n = \\alpha_1 r^n + \\alpha_2 n r^n`);
    stepsTex.push(`a_n = \\alpha_1 (${r})^n + \\alpha_2 n (${r})^n`);

    stepsTex.push(`\\text{3. Başlangıç koşullarını yerine koyalım:}`);
    stepsTex.push(`n=0 \\implies a_0 = \\alpha_1 (${r})^0 + \\alpha_2 (0) = ${a0} \\implies \\alpha_1 = ${a0}`);
    
    const alpha1 = a0;
    const alpha2 = (a1 - alpha1 * r) / r;

    stepsTex.push(`n=1 \\implies a_1 = \\alpha_1 (${r})^1 + \\alpha_2 (1) (${r})^1 = ${a1}`);
    stepsTex.push(`${alpha1}(${r}) + \\alpha_2(${r}) = ${a1} \\implies \\alpha_2 = ${alpha2}`);

    const finalTex = `a_n = ${alpha1}(${r})^n + ${alpha2}n(${r})^n`;
    stepsTex.push(`\\text{4. Nihai Kapalı Form (Closed Form):}`);

    return {
      input,
      rootType: 'double_real',
      r1: r, r2: r,
      alpha1, alpha2,
      stepsTex,
      finalTex
    };

  } else {
    // Distinct roots
    const sqrtDelta = Math.sqrt(delta);
    const r1 = (c1 + sqrtDelta) / 2;
    const r2 = (c1 - sqrtDelta) / 2;

    stepsTex.push(`\\text{2. İki Farklı Reel Kök: } r_1 = ${r1}, \\; r_2 = ${r2}`);
    stepsTex.push(`\\text{Çözüm formu: } a_n = \\alpha_1 r_1^n + \\alpha_2 r_2^n`);
    stepsTex.push(`a_n = \\alpha_1 (${r1})^n + \\alpha_2 (${r2})^n`);

    stepsTex.push(`\\text{3. Başlangıç koşullarını yerine koyalım:}`);
    stepsTex.push(`n=0 \\implies \\alpha_1 + \\alpha_2 = ${a0}`);
    stepsTex.push(`n=1 \\implies ${r1}\\alpha_1 + ${r2}\\alpha_2 = ${a1}`);

    // Solve system
    // alpha2 = a0 - alpha1
    // r1*alpha1 + r2*(a0 - alpha1) = a1
    // alpha1(r1 - r2) = a1 - a0*r2
    const alpha1 = (a1 - a0 * r2) / (r1 - r2);
    const alpha2 = a0 - alpha1;

    stepsTex.push(`\\text{Denklem sistemini çözdüğümüzde: } \\alpha_1 = ${alpha1}, \\; \\alpha_2 = ${alpha2}`);

    const finalTex = `a_n = ${alpha1}(${r1})^n + ${alpha2}(${r2})^n`;
    stepsTex.push(`\\text{4. Nihai Kapalı Form (Closed Form):}`);

    return {
      input,
      rootType: 'distinct_real',
      r1, r2,
      alpha1, alpha2,
      stepsTex,
      finalTex
    };
  }
}
