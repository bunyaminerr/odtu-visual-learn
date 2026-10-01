import { Matrix2D, RelationAnalysisResult, RelationProperty } from '../types/cng223Relations';

export function analyzeRelation(matrix: Matrix2D): RelationAnalysisResult {
  const n = matrix.length;

  // 1. Reflexive: all M[i][i] == 1
  let isReflexive = true;
  let reflexiveReason = '';
  for (let i = 0; i < n; i++) {
    if (matrix[i][i] === 0) {
      isReflexive = false;
      reflexiveReason = `(${i + 1}, ${i + 1}) eksik.`;
      break;
    }
  }

  // 2. Irreflexive: all M[i][i] == 0
  let isIrreflexive = true;
  let irreflexiveReason = '';
  for (let i = 0; i < n; i++) {
    if (matrix[i][i] === 1) {
      isIrreflexive = false;
      irreflexiveReason = `(${i + 1}, ${i + 1}) bulunuyor.`;
      break;
    }
  }

  // 3. Symmetric: M[i][j] == M[j][i]
  let isSymmetric = true;
  let symmetricReason = '';
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1 && matrix[j][i] === 0) {
        isSymmetric = false;
        symmetricReason = `(${i + 1}, ${j + 1}) var ama (${j + 1}, ${i + 1}) yok.`;
        break;
      }
    }
    if (!isSymmetric) break;
  }

  // 4. Asymmetric: if M[i][j] == 1 then M[j][i] == 0
  let isAsymmetric = true;
  let asymmetricReason = '';
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1 && matrix[j][i] === 1) {
        isAsymmetric = false;
        asymmetricReason = `Hem (${i + 1}, ${j + 1}) hem de (${j + 1}, ${i + 1}) var.`;
        break;
      }
    }
    if (!isAsymmetric) break;
  }

  // 5. Antisymmetric: if M[i][j] == 1 and M[j][i] == 1 then i == j
  // Equivalently: if i != j and M[i][j] == 1, then M[j][i] == 0
  let isAntisymmetric = true;
  let antisymmetricReason = '';
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && matrix[i][j] === 1 && matrix[j][i] === 1) {
        isAntisymmetric = false;
        antisymmetricReason = `i ≠ j olmasına rağmen hem (${i + 1}, ${j + 1}) hem (${j + 1}, ${i + 1}) var.`;
        break;
      }
    }
    if (!isAntisymmetric) break;
  }

  // 6. Transitive: if M[i][j] == 1 and M[j][k] == 1, then M[i][k] == 1
  let isTransitive = true;
  let transitiveReason = '';
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1) {
        for (let k = 0; k < n; k++) {
          if (matrix[j][k] === 1 && matrix[i][k] === 0) {
            isTransitive = false;
            transitiveReason = `(${i + 1}, ${j + 1}) ve (${j + 1}, ${k + 1}) var ama (${i + 1}, ${k + 1}) yok.`;
            break;
          }
        }
      }
      if (!isTransitive) break;
    }
    if (!isTransitive) break;
  }

  const isEquivalence = isReflexive && isSymmetric && isTransitive;
  const isPoset = isReflexive && isAntisymmetric && isTransitive;

  return {
    reflexive: { isTrue: isReflexive, reason: reflexiveReason },
    irreflexive: { isTrue: isIrreflexive, reason: irreflexiveReason },
    symmetric: { isTrue: isSymmetric, reason: symmetricReason },
    asymmetric: { isTrue: isAsymmetric, reason: asymmetricReason },
    antisymmetric: { isTrue: isAntisymmetric, reason: antisymmetricReason },
    transitive: { isTrue: isTransitive, reason: transitiveReason },
    isEquivalence,
    isPoset
  };
}
