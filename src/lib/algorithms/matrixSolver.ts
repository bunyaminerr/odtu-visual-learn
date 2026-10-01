import { MatrixSolveResponse, MatrixStep, RowOperation } from "../types/math";

import Fraction from 'fraction.js';

// Basit Kesir (Fraction) Sınıfı - fraction.js wrapper
class Frac {
    private f: Fraction;
    constructor(val: string | number | Fraction) {
        this.f = new Fraction(val);
    }
    static fromString(val: string): Frac { return new Frac(val); }
    toString(): string { return this.f.toFraction(true); } // exclude mixed numbers
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

export function solveGaussJordan(matrixData: string[][]): MatrixSolveResponse {
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
    for (let r = 0; r < rows; r++) {
        if (lead >= cols) break;
        
        let i = r;
        while (M[i][lead].isZero()) {
            i++;
            if (i === rows) {
                i = r;
                lead++;
                if (lead === cols) break;
            }
        }
        
        if (lead === cols) break;

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
            addStep("Satır Takası", `Pivot elemanını sıfırdan kurtarmak için ${i+1}. satır ile ${r+1}. satır yer değiştirdi.`, op, [r, i], {row: r, col: lead});
        }

        // SCALE the pivot row
        const val = M[r][lead];
        if (!val.isOne() && !val.isZero()) {
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
            addStep("Satır Ölçekleme", `Pivot elemanını 1 (bir) yapmak için ${r+1}. satır ${val.toString()} sayısına bölündü.`, op, [r], {row: r, col: lead});
        }

        // ELIMINATE other rows
        for (let i = 0; i < rows; i++) {
            if (i !== r) {
                const factor = M[i][lead];
                if (!factor.isZero()) {
                    for (let j = 0; j < cols; j++) {
                        M[i][j] = M[i][j].sub(factor.mul(M[r][j]));
                    }
                    
                    let latexExp = "";
                    let pedagogical = "";
                    
                    if (factor.ltZero()) {
                        const absF = factor.neg().toString();
                        latexExp = `R_{${i+1}} \\leftarrow R_{${i+1}} + ${absF} R_{${r+1}}`;
                        pedagogical = `${i+1}. satırdaki elemanı sıfırlamak için ${r+1}. satırın ${absF} katı ${i+1}. satıra eklendi.`;
                    } else {
                        const fStr = factor.toString();
                        latexExp = `R_{${i+1}} \\leftarrow R_{${i+1}} - ${fStr} R_{${r+1}}`;
                        pedagogical = `${i+1}. satırdaki elemanı sıfırlamak için ${r+1}. satırın ${fStr} katı ${i+1}. satırdan çıkarıldı.`;
                    }

                    const op: RowOperation = {
                        type: "ADD_MULTIPLE",
                        sourceRow: r,
                        targetRow: i,
                        scalar: factor.neg().toString(),
                        latexExplanation: latexExp
                    };
                    addStep("Satır İndirgeme (Eliminasyon)", pedagogical, op, [i, r], {row: r, col: lead});
                }
            }
        }
        lead++;
    }

    // Check rank & consistency
    let rank = 0;
    for (let i = 0; i < rows; i++) {
        const isAllZeros = M[i].every(v => v.isZero());
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
        addStep("Çözüm Tamamlandı", `Matris RREF (İndirgenmiş Satır Eşelon Formu) haline getirildi. Sistem tutarlıdır ve rank=${rank} olarak hesaplandı.`);
    } else {
        addStep("Çözüm Tamamlandı (Tutarsız Sistem)", "Matris RREF haline getirildi. En az bir satırda '0 = k' şeklinde bir durum oluştuğu için sistemin çözümü yoktur.");
    }

    return {
        originalMatrix: matrixData,
        totalSteps: steps.length,
        steps,
        rank,
        isConsistent
    };
}
