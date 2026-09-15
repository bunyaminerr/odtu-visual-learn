"use client";

import React, { useState, useEffect } from "react";
import { RecurrenceTreeVisualizer } from "@/components/visualizers/discrete/RecurrenceTreeVisualizer";
import { RecurrenceNode, RecurrenceResult } from "@/lib/types/discrete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Binary, Calculator, Hash, Leaf } from "lucide-react";
import { MathFormula } from "@/components/visualizers/shared/MathFormula";

export default function RecurrencePage() {
    const [a, setA] = useState(2);
    const [b, setB] = useState(2);
    // f(n) n^d'deki d
    const [d, setD] = useState(1);
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const qstate = urlParams.get('qstate');
        if (qstate) {
            try {
                const parsed = JSON.parse(decodeURIComponent(qstate));
                if (typeof parsed.a === "number") setA(parsed.a);
                if (typeof parsed.b === "number") setB(parsed.b);
                if (typeof parsed.d === "number") setD(parsed.d);
            } catch (e) {
                console.error("Failed to parse qstate");
            }
        }
    }, []);

    // Ağacı limitli seviyede üret
    const MAX_VISUAL_DEPTH = 3; 

    const generateTree = (depth: number, currentN: string, costStr: string): RecurrenceNode => {
        if (depth === MAX_VISUAL_DEPTH) {
            return { id: Math.random().toString(), name: "T(1)", cost: "\\Theta(1)" };
        }
        
        const children = [];
        for (let i = 0; i < a; i++) {
            const nextN = currentN === "n" ? `n/${b}` : `${currentN}/${b}`;
            const nextCostStr = d === 1 ? nextN : d === 0 ? "1" : `(${nextN})^${d}`;
            children.push(generateTree(depth + 1, nextN, nextCostStr));
        }

        return {
            id: Math.random().toString(),
            name: `T(${currentN})`,
            cost: costStr,
            children
        };
    };

    // Master Theorem Complexity hesabı
    const calculateMasterTheorem = (): RecurrenceResult => {
        const costStr = d === 1 ? "n" : d === 0 ? "1" : `n^${d}`;
        const tree = generateTree(0, "n", costStr);
        
        let totalWork = "";
        const logBa = Math.log(a) / Math.log(b);
        
        // Toleranslı eşitlik kontrolü (JavaScript float)
        if (Math.abs(logBa - d) < 0.0001) {
            totalWork = d === 0 ? "n \\log n" : d === 1 ? "n \\log n" : `n^{${d}} \\log n`;
        } else if (logBa > d) {
            // log_b(a) int ise
            const pow = Number.isInteger(logBa) ? logBa : logBa.toFixed(2);
            totalWork = `n^{${pow}}`;
        } else {
            totalWork = d === 1 ? "n" : `n^{${d}}`;
        }

        return {
            tree,
            depth: `\\log_{${b}} n`,
            leaves: `n^{\\log_{${b}} ${a}}`,
            totalWork
        };
    };

    const result = calculateMasterTheorem();

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-6 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col gap-6">
                
                {/* Header */}
                <header className="border-b border-slate-200 pb-4 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-3 text-[#051F20] mb-2">
                            <Binary className="w-8 h-8" />
                            <h1 className="text-2xl font-bold tracking-tight text-[#051F20]">CNG 223</h1>
                        </div>
                        <h2 className="text-sm font-medium text-[#235347] flex items-center gap-2">
                            <Leaf className="w-4 h-4" /> 
                            Yineleme Ağacı (Recurrence Tree) & Master Teoremi
                        </h2>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
                    
                    {/* Sol Panel: Kontroller */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm">
                            <h3 className="font-semibold text-[#163832] mb-4 border-b border-slate-100 pb-2">
                                Denklem Parametreleri
                            </h3>
                            
                            <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-center text-[#051F20]">
                                <MathFormula math={`T(n) = aT(n/b) + \\Theta(n^d)`} />
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-[#163832]">a (Dal Sayısı):</label>
                                    <Input 
                                        type="number"
                                        value={a}
                                        onChange={e => setA(Math.max(1, Math.min(4, parseInt(e.target.value) || 1)))}
                                        className="w-20 bg-white border-slate-200 text-[#051F20] focus:border-[#235347] focus:ring-2 focus:ring-[#235347]/20 rounded-lg"
                                        min={1} max={4}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-[#163832]">b (Bölen):</label>
                                    <Input 
                                        type="number"
                                        value={b}
                                        onChange={e => setB(Math.max(2, Math.min(5, parseInt(e.target.value) || 2)))}
                                        className="w-20 bg-white border-slate-200 text-[#051F20] focus:border-[#235347] focus:ring-2 focus:ring-[#235347]/20 rounded-lg"
                                        min={2} max={5}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-[#163832]">d (Maliyet Üssü):</label>
                                    <Input 
                                        type="number"
                                        value={d}
                                        onChange={e => setD(Math.max(0, Math.min(3, parseInt(e.target.value) || 0)))}
                                        className="w-20 bg-white border-slate-200 text-[#051F20] focus:border-[#235347] focus:ring-2 focus:ring-[#235347]/20 rounded-lg"
                                        min={0} max={3}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col gap-2">
                                <Button onClick={() => {setA(2); setB(2); setD(1)}} variant="outline" className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] font-medium rounded-lg border border-[#8EB69B]/40 shadow-sm transition-all text-xs">
                                    Merge Sort (2,2,1)
                                </Button>
                                <Button onClick={() => {setA(1); setB(2); setD(0)}} variant="outline" className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] font-medium rounded-lg border border-[#8EB69B]/40 shadow-sm transition-all text-xs">
                                    Binary Search (1,2,0)
                                </Button>
                                <Button onClick={() => {setA(3); setB(2); setD(1)}} variant="outline" className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] font-medium rounded-lg border border-[#8EB69B]/40 shadow-sm transition-all text-xs">
                                    Karatsuba Tipi (3,2,1)
                                </Button>
                            </div>
                            
                            <p className="text-[10px] text-slate-500 mt-4 leading-tight font-medium">
                                Not: Ağaç görselleştirmesi performans için maksimum 3 derinlik düzeyinde kırpılır (Render sınırı: a={a}).
                            </p>
                        </div>
                    </div>

                    {/* Sağ Panel: Tuval */}
                    <div className="lg:col-span-3">
                        <RecurrenceTreeVisualizer result={result} a={a} />
                    </div>
                </div>
            </div>
        </div>
    );
}
