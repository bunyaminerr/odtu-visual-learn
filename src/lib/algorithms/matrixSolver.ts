import { MatrixSolveResponse, MatrixStep, RowOperation } from "../types/math";

import Fraction from 'fraction.js';

// Basit Kesir (Fraction) Sınıfı - fraction.js wrapper
class Frac {
    public f: Fraction;
    constructor(val: string | number | Fraction) {
        this.f = new Fraction(val);
    }
    static fromString(val: string): Frac { return new Frac(val); }
    toString(): string { return this.f.toFraction(); } // standard improper fractions
    add(other: Frac): Frac { return new Frac(this.f.add(other.f)); }
    sub(other: Frac): Frac { return new Frac(this.f.sub(other.f)); }
    mul(other: Frac): Frac { return new Frac(this.f.mul(other.f)); }
    div(other: Frac): Frac { return new Frac(this.f.div(other.f)); }
    isZero(): boolean { return this.f.equals(0); }
    isOne(): boolean { return this.f.equals(1); }
    isEqual(other: Frac): boolean { return this.f.equals(other.f); }
    ltZero(): boolean { return this.f.s < 0; }
    neg(): Frac { return new Frac(this.f.neg()); }
}

function gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b > 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}

function simplifyRow(row: Frac[]): { simplified: Frac[], scalarStr?: string } {
    let rowLcm = 1;
    for (let i = 0; i < row.length; i++) {
        if (!row[i].isZero()) rowLcm = lcm(rowLcm, Number(row[i].f.d));
    }
    
    let intRow = row.map(v => v.mul(new Frac(rowLcm)));
    
    let rowGcd = 0;
    for (let i = 0; i < intRow.length; i++) {
        if (!intRow[i].isZero()) {
            const num = Number(intRow[i].f.n);
            rowGcd = rowGcd === 0 ? Math.abs(num) : gcd(rowGcd, Math.abs(num));
        }
    }
    
    if (rowGcd > 0) {
        intRow = intRow.map(v => v.mul(new Frac(1).div(new Frac(rowGcd))));
    } else {
        rowGcd = 1;
    }
    
    let appliedFactor = new Frac(rowLcm).div(new Frac(rowGcd));
    if (!appliedFactor.isOne()) {
        return { simplified: intRow, scalarStr: appliedFactor.toString() };
    }
    return { simplified: row };
}

export function solveGaussJordan(matrixData: string[][], targetForm: "REF" | "RREF" = "RREF"): MatrixSolveResponse {
    const rows = matrixData.length;
    const cols = matrixData[0].length;
    
    // Matrix oluştur (Fraction objeleri olarak)
    const M: Frac[][] = matrixData.map(row => row.map(cell => Frac.fromString(cell)));
    
    const steps: MatrixStep[] = [];
    let stepIndex = 0;

    const addStep = (title: string, explanation: string, operation: RowOperation | null = null, activeRows: number[] = [], pivot: {row: number, col: number} | null = null) => {
        const matStr = M.map(row => row.map(val => val.toString()));
        steps.push({
            stepIndex,
            title,
            explanation,
            matrix: matStr,
            pivot,
            activeRows,
            operation
        });
        stepIndex++;
    };

    addStep("Başlangıç Matrisi", "Genişletilmiş matris (Augmented Matrix) oluşturuldu ve hesaplamaya hazır.");

    let lead = 0;
    // --- PHASE 1: Forward Elimination (REF) ---
    for (let r = 0; r < rows; r++) {
        if (lead >= cols - 1) break; // Asla augmented sütunda pivot arama
        
        let i = r;
        let foundPivot = false;
        
        // Find best pivot (prefer 1 or -1)
        while (lead < cols - 1) {
            let bestRow = -1;
            let firstNonZero = -1;
            
            for (let k = r; k < rows; k++) {
                if (!M[k][lead].isZero()) {
                    if (firstNonZero === -1) firstNonZero = k;
                    if (M[k][lead].isOne() || M[k][lead].f.equals(new Frac("-1").f)) {
                        bestRow = k;
                        break;
                    }
                }
            }
            
            if (bestRow !== -1) {
                i = bestRow;
                foundPivot = true;
                break;
            } else if (firstNonZero !== -1) {
                i = firstNonZero;
                foundPivot = true;
                break;
            } else {
                lead++;
            }
        }
        
        if (!foundPivot || lead >= cols - 1) break;

        // SWAP if needed
        if (i !== r) {
            const temp = M[i];
            M[i] = M[r];
            M[r] = temp;
            
            const op: RowOperation = {
                type: "SWAP",
                sourceRow: i,
                targetRow: r,
                latexExplanation: `R_{${r+1}} \\leftrightarrow R_{${i+1}}`
            };
            addStep("Satır Takası (Row Swap)", `Kesirlerle uğraşmamak için daha uygun bir pivot elemanı seçildi. ${i+1}. satır ile ${r+1}. satır yer değiştirdi.`, op, [r, i], {row: r, col: lead});
        }

        const simp = simplifyRow(M[r]);
        if (simp.scalarStr) {
            M[r] = simp.simplified;
            const op: RowOperation = {
                type: "SCALE",
                sourceRow: r,
                targetRow: r,
                scalar: simp.scalarStr,
                latexExplanation: `R_{${r+1}} \\leftarrow ${simp.scalarStr} R_{${r+1}}`
            };
            addStep("Satır Sadeleştirme", `Daha temiz sayılarla çalışmak için ${r+1}. satır ${simp.scalarStr} ile çarpılarak sadeleştirildi.`, op, [r], {row: r, col: lead});
        }

        // ELIMINATE ONLY ROWS BELOW (Forward Phase)
        const pivotVal = M[r][lead];
        for (let k = r + 1; k < rows; k++) {
            const targetVal = M[k][lead];
            if (!targetVal.isZero()) {
                const factor = targetVal.div(pivotVal);
                for (let j = 0; j < cols; j++) {
                    M[k][j] = M[k][j].sub(factor.mul(M[r][j]));
                }
                
                let latexExp = "";
                let pedagogical = "";
                
                if (factor.ltZero()) {
                    const absF = factor.neg().toString();
                    latexExp = `R_{${k+1}} \\leftarrow R_{${k+1}} + ${absF} R_{${r+1}}`;
                    pedagogical = `İleri Eliminasyon: ${k+1}. satırdaki elemanı sıfırlamak için ${r+1}. satırın ${absF} katı ${k+1}. satıra eklendi.`;
                } else {
                    const fStr = factor.toString();
                    latexExp = `R_{${k+1}} \\leftarrow R_{${k+1}} - ${fStr} R_{${r+1}}`;
                    pedagogical = `İleri Eliminasyon: ${k+1}. satırdaki elemanı sıfırlamak için ${r+1}. satırın ${fStr} katı ${k+1}. satırdan çıkarıldı.`;
                }

                const op: RowOperation = {
                    type: "ADD_MULTIPLE",
                    sourceRow: r,
                    targetRow: k,
                    scalar: factor.neg().toString(),
                    latexExplanation: latexExp
                };
                addStep("İleri Eliminasyon (Forward)", pedagogical, op, [k, r], {row: r, col: lead});
                
                const simpK = simplifyRow(M[k]);
                if (simpK.scalarStr) {
                    M[k] = simpK.simplified;
                    const op2: RowOperation = {
                        type: "SCALE",
                        sourceRow: k,
                        targetRow: k,
                        scalar: simpK.scalarStr,
                        latexExplanation: `R_{${k+1}} \\leftarrow ${simpK.scalarStr} R_{${k+1}}`
                    };
                    addStep("Satır Sadeleştirme", `İşlem sonrası ${k+1}. satır sadeleştirildi. (Kesirler silindi / Ortak bölenlere bölündü)`, op2, [k], {row: r, col: lead});
                }
            }
        }
        lead++;
    }

    addStep("REF Aşaması Tamamlandı", targetForm === "RREF" 
        ? "Matris, Row Echelon Form (REF) haline getirildi. Şimdi geriye doğru yerine koyma (Backward Phase) ile RREF'e geçeceğiz." 
        : "Matris, Row Echelon Form (REF) haline getirildi. İşlem burada bitiyor.");

    if (targetForm === "RREF") {
        // --- PHASE 2: Backward Elimination (RREF) ---
        for (let r = rows - 1; r >= 0; r--) {
            // Find the leading non-zero for this row
            let pivotCol = -1;
            for (let c = 0; c < cols - 1; c++) {
                if (!M[r][c].isZero()) {
                    pivotCol = c;
                    break;
                }
            }

            if (pivotCol !== -1) {
                // SCALE pivot to 1 for RREF if it's not already 1
                const val = M[r][pivotCol];
                if (!val.isOne()) {
                    const scalar = new Frac(1).div(val);
                    for (let j = 0; j < cols; j++) {
                        M[r][j] = M[r][j].mul(scalar);
                    }
                    const op: RowOperation = {
                        type: "SCALE",
                        sourceRow: r,
                        targetRow: r,
                        scalar: scalar.toString(),
                        latexExplanation: `R_{${r+1}} \\leftarrow ${scalar.toString()} R_{${r+1}}`
                    };
                    addStep("Pivot Ölçekleme (RREF)", `RREF için pivot elemanının 1 olması zorunludur. ${r+1}. satır ${val.toString()} sayısına bölündü.`, op, [r], {row: r, col: pivotCol});
                }

                // ELIMINATE ROWS ABOVE
                for (let k = 0; k < r; k++) {
                    const factor = M[k][pivotCol];
                    if (!factor.isZero()) {
                        for (let j = 0; j < cols; j++) {
                            M[k][j] = M[k][j].sub(factor.mul(M[r][j]));
                        }
                        
                        let latexExp = "";
                        let pedagogical = "";
                        
                        if (factor.ltZero()) {
                            const absF = factor.neg().toString();
                            latexExp = `R_{${k+1}} \\leftarrow R_{${k+1}} + ${absF} R_{${r+1}}`;
                            pedagogical = `Geri Eliminasyon (RREF): ${k+1}. satırdaki elemanı sıfırlamak için ${r+1}. satırın ${absF} katı ${k+1}. satıra eklendi.`;
                        } else {
                            const fStr = factor.toString();
                            latexExp = `R_{${k+1}} \\leftarrow R_{${k+1}} - ${fStr} R_{${r+1}}`;
                            pedagogical = `Geri Eliminasyon (RREF): ${k+1}. satırdaki elemanı sıfırlamak için ${r+1}. satırın ${fStr} katı ${k+1}. satırdan çıkarıldı.`;
                        }

                        const op: RowOperation = {
                            type: "ADD_MULTIPLE",
                            sourceRow: r,
                            targetRow: k,
                            scalar: factor.neg().toString(),
                            latexExplanation: latexExp
                        };
                        addStep("Geri Eliminasyon (Backward)", pedagogical, op, [k, r], {row: r, col: pivotCol});
                    }
                }
            }
        }
    }

    // Check rank & consistency
    let rank = 0;
    for (let i = 0; i < rows; i++) {
        const isAllZeros = M[i].slice(0, cols - 1).every(v => v.isZero());
        if (!isAllZeros) rank++;
    }

    let isConsistent = true;
    for (let i = 0; i < rows; i++) {
        const coeffZeros = M[i].slice(0, cols - 1).every(v => v.isZero());
        const lastNotZero = !M[i][cols - 1].isZero();
        if (coeffZeros && lastNotZero) {
            isConsistent = false;
            break;
        }
    }

    if (isConsistent) {
        addStep(`Çözüm Tamamlandı (Tutarlı)`, `Matris ${targetForm} haline getirildi. Sistem tutarlıdır ve rank=${rank} olarak hesaplandı.`);
    } else {
        addStep(`Çözüm Tamamlandı (Tutarsız Sistem)`, `Matris ${targetForm} haline getirildi. En az bir satırda '0 = k' (k ≠ 0) şeklinde bir durum oluştuğu için sistemin çözümü yoktur.`);
    }

    return {
        originalMatrix: matrixData,
        totalSteps: steps.length,
        steps,
        rank,
        isConsistent
    };
}
