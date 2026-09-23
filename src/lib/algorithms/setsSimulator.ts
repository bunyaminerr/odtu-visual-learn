import { FunctionAnalysisResult, MappingEdge, SetElement } from '../types/cng223Sets';

export function analyzeFunctionMapping(
  domain: SetElement[],
  codomain: SetElement[],
  edges: MappingEdge[]
): FunctionAnalysisResult {
  const reasons: string[] = [];
  
  // 1. Is it a function?
  // Condition 1: Every element in Domain must have AT LEAST ONE outgoing edge.
  // Condition 2: Every element in Domain must have AT MOST ONE outgoing edge.
  const domainMappingCount: Record<string, number> = {};
  domain.forEach(d => domainMappingCount[d.id] = 0);
  
  const codomainMappingCount: Record<string, number> = {};
  codomain.forEach(c => codomainMappingCount[c.id] = 0);

  edges.forEach(edge => {
    if (domainMappingCount[edge.from] !== undefined) {
      domainMappingCount[edge.from]++;
    }
    if (codomainMappingCount[edge.to] !== undefined) {
      codomainMappingCount[edge.to]++;
    }
  });

  let isFunction = true;
  let hasUnmappedDomain = false;
  let hasMultipleMappedDomain = false;

  domain.forEach(d => {
    if (domainMappingCount[d.id] === 0) hasUnmappedDomain = true;
    if (domainMappingCount[d.id] > 1) hasMultipleMappedDomain = true;
  });

  if (hasUnmappedDomain) {
    isFunction = false;
    reasons.push("Fonksiyon değil: Domain'deki (Tanım Kümesi) bazı elemanlar hiçbir yere eşleşmemiş. Her eleman eşleşmek zorundadır.");
  }
  if (hasMultipleMappedDomain) {
    isFunction = false;
    reasons.push("Fonksiyon değil: Domain'deki bir elemandan birden fazla ok çıkıyor. (Bir eleman Codomain'de birden fazla yere gidemez).");
  }

  if (!isFunction) {
    return {
      isFunction: false,
      isInjective: false,
      isSurjective: false,
      isBijective: false,
      reasons
    };
  }

  reasons.push("Bu geçerli bir fonksiyondur. (Domain'deki her eleman tam olarak bir yere gidiyor).");

  // 2. Is it Injective (One-to-one)?
  // Condition: No element in Codomain has MORE THAN ONE incoming edge.
  let isInjective = true;
  let hasMultipleIncomingCodomain = false;
  codomain.forEach(c => {
    if (codomainMappingCount[c.id] > 1) hasMultipleIncomingCodomain = true;
  });

  if (hasMultipleIncomingCodomain) {
    isInjective = false;
    reasons.push("Injective (Birebir) DEĞİL: Codomain'deki (Değer Kümesi) en az bir elemana birden fazla ok geliyor. Birebirlikte her değere en fazla 1 ok gelmelidir.");
  } else {
    reasons.push("Injective (Birebir): Codomain'deki her elemana en fazla 1 ok geliyor (f(a) = f(b) => a = b kuralı sağlandı).");
  }

  // 3. Is it Surjective (Onto)?
  // Condition: Every element in Codomain has AT LEAST ONE incoming edge. (Range == Codomain)
  let isSurjective = true;
  let hasUnmappedCodomain = false;
  codomain.forEach(c => {
    if (codomainMappingCount[c.id] === 0) hasUnmappedCodomain = true;
  });

  if (hasUnmappedCodomain) {
    isSurjective = false;
    reasons.push("Surjective (Örten) DEĞİL: Codomain'deki bazı elemanlara hiçbir ok gelmiyor. Örtenlikte boşta eleman kalamaz (Range = Codomain olmalı).");
  } else {
    reasons.push("Surjective (Örten): Codomain'deki her elemana en az 1 ok geliyor (Boşta eleman yok).");
  }

  // 4. Is it Bijective?
  const isBijective = isInjective && isSurjective;
  if (isBijective) {
    reasons.push("Bijective (Birebir ve Örten): Hem Injective hem Surjective olduğu için bu fonksiyon tersine çevrilebilir (Invertible).");
  }

  return {
    isFunction,
    isInjective,
    isSurjective,
    isBijective,
    reasons
  };
}
