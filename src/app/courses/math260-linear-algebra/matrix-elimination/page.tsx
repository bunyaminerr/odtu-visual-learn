"use client";

import React, { useState, useEffect } from "react";
import { MatrixSolveResponse, MatrixStep } from "@/lib/types/math";
import { MatrixRowOpsTable } from "@/components/visualizers/math/MatrixRowOpsTable";
import { TimeTravelControls } from "@/components/visualizers/shared/TimeTravelControls";
import { StepExplanationCard } from "@/components/visualizers/shared/StepExplanationCard";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calculator, ChevronRight, GraduationCap } from "lucide-react";

const PRESET_MATRICES = {
    midterm1: [
        [2, 1, -1, 8],
        [-3, -1, 2, -11],
        [-2, 1, 2, -3]
    ],
    midterm2: [
        [1, 2, -3, 4],
        [3, -1, 5, 2],
        [4, 1, 2, 6] // Sonsuz çözüm/Serbest değişken simülasyonu
    ]
};

export default function MatrixEliminationPage() {
    const [matrixInput, setMatrixInput] = useState<string>("2, 1, -1, 8\n-3, -1, 2, -11\n-2, 1, 2, -3");
    const [solveData, setSolveData] = useState<MatrixSolveResponse | null>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const qstate = urlParams.get('qstate');
        if (qstate) {
            try {
                const parsed = JSON.parse(decodeURIComponent(qstate));
                if (Array.isArray(parsed) && parsed.length > 0) {
                    const matrixStr = parsed.map((r: number[]) => r.join(", ")).join("\n");
                    setMatrixInput(matrixStr);
                }
            } catch (e) {
                console.error("Failed to parse qstate");
            }
        }
    }, []);

    const handleSolve = async (matrixStr: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // Parse string to float[][]
            const rows = matrixStr.trim().split("\n");
            const matrixData = rows.map(r => r.split(",").map(c => parseFloat(c.trim())));
            
            // Validate
            if (matrixData.some(r => r.some(isNaN))) {
                throw new Error("Geçersiz matris girişi. Sadece sayıları ve virgülleri kullanın.");
            }

            const res = await fetch("http://localhost:8000/api/solvers/matrix/eliminate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matrix: matrixData })
            });

            if (!res.ok) throw new Error("Sunucu hatası oluştu.");

            const data: MatrixSolveResponse = await res.json();
            setSolveData(data);
            setCurrentStepIndex(0);
            
        } catch (err: any) {
            setError(err.message || "Bilinmeyen bir hata oluştu.");
        } finally {
            setIsLoading(false);
        }
    };

    const currentStep: MatrixStep | null = solveData ? solveData.steps[currentStepIndex] : null;

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-6 flex justify-center">
            <div className="max-w-5xl w-full flex flex-col gap-6">
                
                {/* Header */}
                <header className="border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-3 text-[#051F20] mb-2">
                        <GraduationCap className="w-8 h-8" />
                        <h1 className="text-2xl font-bold tracking-tight text-[#051F20]">MATH 260</h1>
                    </div>
                    <h2 className="text-sm font-medium text-[#235347] flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" /> 
                        Gauss-Jordan Eliminasyonu (REF & RREF)
                    </h2>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Sol Panel: Girdi ve Kontroller */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-5">
                            <h3 className="font-bold text-[#163832] mb-3 flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-[#235347]" />
                                Matris Girdisi
                            </h3>
                            
                            <div className="flex flex-col gap-2 mb-4">
                                <Button 
                                    variant="outline" 
                                    className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] border border-[#8EB69B]/40 shadow-sm transition-all text-xs justify-start"
                                    onClick={() => setMatrixInput(PRESET_MATRICES.midterm1.map(r => r.join(", ")).join("\n"))}
                                >
                                    ODTÜ Midterm Örneği 1 (Benzersiz Çözüm)
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] border border-[#8EB69B]/40 shadow-sm transition-all text-xs justify-start"
                                    onClick={() => setMatrixInput(PRESET_MATRICES.midterm2.map(r => r.join(", ")).join("\n"))}
                                >
                                    ODTÜ Midterm Örneği 2 (Serbest Değişken)
                                </Button>
                            </div>

                            <label className="text-xs font-semibold text-[#051F20] mb-1 block">Özel Matris (Virgülle ayrılmış):</label>
                            <textarea
                                value={matrixInput}
                                onChange={(e) => setMatrixInput(e.target.value)}
                                className="w-full h-32 bg-[#051F20] border border-[#163832] shadow-inner rounded-xl p-3 text-[#DAF1DE] font-mono text-sm focus:ring-2 focus:ring-[#8EB69B] outline-none resize-none"
                            />
                            
                            {error && (
                                <div className="mt-2 text-rose-700 text-xs flex items-center gap-1 bg-rose-50 p-2 rounded-lg border border-rose-200">
                                    <AlertCircle className="w-4 h-4" /> {error}
                                </div>
                            )}

                            <Button 
                                onClick={() => handleSolve(matrixInput)}
                                disabled={isLoading}
                                className="w-full mt-4 bg-[#235347] hover:bg-[#163832] text-white font-medium text-sm rounded-lg shadow-sm transition-all"
                            >
                                {isLoading ? "Hesaplanıyor..." : "Çözümü Başlat"}
                            </Button>
                        </div>
                    </div>

                    {/* Sağ Panel: Görselleştirici */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {solveData && currentStep ? (
                            <>
                                <StepExplanationCard 
                                    title={currentStep.title}
                                    explanation={currentStep.explanation}
                                    latexAnnotation={currentStep.operation?.latexExplanation}
                                />
                                
                                <div className="flex-1 bg-[#F2F7F4] border border-[#8EB69B]/40 rounded-2xl flex items-center justify-center p-8 relative overflow-hidden shadow-inner">
                                    <MatrixRowOpsTable 
                                        matrix={currentStep.matrix} 
                                        pivot={currentStep.pivot}
                                        activeRows={currentStep.activeRows}
                                    />
                                </div>

                                <TimeTravelControls 
                                    currentStep={currentStepIndex}
                                    totalSteps={solveData.totalSteps}
                                    onStepChange={setCurrentStepIndex}
                                />
                            </>
                        ) : (
                            <div className="flex-1 bg-white border border-slate-200/80 shadow-sm p-5 rounded-xl flex flex-col items-center justify-center text-[#163832] font-medium min-h-[400px]">
                                <Calculator className="w-16 h-16 mb-4 opacity-20" />
                                <p>Hesaplamayı başlatmak için soldaki paneli kullanın.</p>
                                <p className="text-sm mt-2 opacity-50">Deterministik SymPy motoru devrede.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
