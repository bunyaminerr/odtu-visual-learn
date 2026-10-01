import { ExpectedValueResult, ProbabilityVariable } from '../types/cng223Probability';

export function analyzeProbabilityDistribution(variables: ProbabilityVariable[]): ExpectedValueResult {
  const stepsTex: string[] = [];
  
  // 1. Calculate Total Probability
  let totalProbability = 0;
  for (const v of variables) {
    totalProbability += v.px;
  }
  
  // Floating point precision fix
  totalProbability = Math.round(totalProbability * 100000) / 100000;

  stepsTex.push(`\\sum P(X=x) = ${variables.map(v => v.px).join(' + ')} = ${totalProbability}`);

  const isValid = totalProbability === 1;

  if (!isValid) {
    stepsTex.push(`\\text{\\textcolor{red}{Hata: Toplam olasılık 1'e eşit değil! (Şu an: ${totalProbability}). Hesaplama yapılamaz.}}`);
    return {
      isValid: false,
      totalProbability,
      expectedValue: 0,
      expectedValueSquared: 0,
      variance: 0,
      standardDeviation: 0,
      stepsTex
    };
  }

  stepsTex.push(`\\text{\\textcolor{teal}{Toplam olasılık = 1. Dağılım geçerli.}}`);

  // 2. Calculate Expected Value E(X)
  let expectedValue = 0;
  const exSteps: string[] = [];
  for (const v of variables) {
    expectedValue += v.x * v.px;
    exSteps.push(`(${v.x} \\cdot ${v.px})`);
  }
  
  expectedValue = Math.round(expectedValue * 100000) / 100000;
  stepsTex.push(`E(X) = \\sum x \\cdot P(x) = ${exSteps.join(' + ')} = ${expectedValue}`);

  // 3. Calculate E(X^2)
  let expectedValueSquared = 0;
  const ex2Steps: string[] = [];
  for (const v of variables) {
    expectedValueSquared += (v.x * v.x) * v.px;
    ex2Steps.push(`(${v.x}^2 \\cdot ${v.px})`);
  }

  expectedValueSquared = Math.round(expectedValueSquared * 100000) / 100000;
  stepsTex.push(`E(X^2) = \\sum x^2 \\cdot P(x) = ${ex2Steps.join(' + ')} = ${expectedValueSquared}`);

  // 4. Calculate Variance V(X)
  let variance = expectedValueSquared - (expectedValue * expectedValue);
  variance = Math.round(variance * 100000) / 100000;
  stepsTex.push(`V(X) = E(X^2) - [E(X)]^2 = ${expectedValueSquared} - (${expectedValue})^2 = ${variance}`);

  // 5. Calculate Standard Deviation SD(X)
  let standardDeviation = Math.sqrt(variance);
  standardDeviation = Math.round(standardDeviation * 100000) / 100000;
  stepsTex.push(`\\sigma = \\sqrt{V(X)} = \\sqrt{${variance}} = ${standardDeviation}`);

  return {
    isValid,
    totalProbability,
    expectedValue,
    expectedValueSquared,
    variance,
    standardDeviation,
    stepsTex
  };
}
