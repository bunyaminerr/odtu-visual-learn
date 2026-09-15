"use client";

import React, { useState, useEffect } from "react";
import { CellValue, KMapSolution } from "@/lib/types/logic";
import { KMapGrid } from "@/components/visualizers/logic/KMapGrid";
import { MathFormula } from "@/components/visualizers/shared/MathFormula";
import { Button } from "@/components/ui/button";
import { Calculator, Cpu, Sigma, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function KMapPage() {
    const [cells, setCells] = useState<CellValue[]>(Array(16).fill(0));
    const [solution, setSolution] = useState<KMapSolution | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const qstate = urlParams.get('qstate');
        if (qstate) {
            try {
                const parsed = JSON.parse(decodeURIComponent(qstate));
                if (parsed.minterms && Array.isArray(parsed.minterms)) {
                    const newCells = Array(16).fill(0);
                    parsed.minterms.forEach((m: number) => newCells[m] = 1);
                    if (parsed.dontcares && Array.isArray(parsed.dontcares)) {
                        parsed.dontcares.forEach((d: number) => newCells[d] = 'X');
                    }
                    setCells(newCells);
                }
            } catch (e) {
                console.error("Failed to parse qstate");
            }
        }
    }, []);

    // K-Map hücresine tıklandığında değeri döngüsel değiştir (0 -> 1 -> X -> 0)
    const handleCellClick = (minterm: number) => {
        setCells(prev => {
            const next = [...prev];
            if (next[minterm] === 0) next[minterm] = 1;
            else if (next[minterm] === 1) next[minterm] = 'X';
            else next[minterm] = 0;
            return next;
        });
        setSolution(null); // Çözümü sıfırla
    };

    const handleClear = () => {
        setCells(Array(16).fill(0));
        setSolution(null);
    };

    const handleSolve = async () => {
        setIsLoading(true);
        const minterms: number[] = [];
        const dontcares: number[] = [];
        
        cells.forEach((val, idx) => {
            if (val === 1) minterms.push(idx);
            if (val === 'X') dontcares.push(idx);
        });

        try {
            const res = await fetch("http://localhost:8000/api/solvers/logic/kmap-solve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ minterms, dontcares })
            });
            if (res.ok) {
                const data = await res.json();
                setSolution(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-6 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col gap-6">
                
                {/* Header */}
                <header className="border-b border-slate-200 pb-4 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-3 text-[#051F20] mb-2">
                            <Cpu className="w-8 h-8" />
                            <h1 className="text-2xl font-bold tracking-tight text-[#051F20]">CNG 232</h1>
                        </div>
                        <h2 className="text-sm font-medium text-[#235347] flex items-center gap-2">
                            <Sigma className="w-4 h-4" /> 
                            Karnaugh Map (K-Map) & Boolean Minimizer
                        </h2>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Orta/Sol Panel: K-Map Grid */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="bg-white border border-slate-200/80 shadow-sm p-6 rounded-xl relative flex flex-col items-center">
                            <h3 className="font-bold text-[#163832] w-full text-left mb-6">İnteraktif K-Map (A,B,C,D)</h3>
                            
                            <KMapGrid 
                                cells={cells} 
                                onCellClick={handleCellClick} 
                                groups={solution?.groups || []}
                                hoveredGroupId={hoveredGroupId}
                            />
                            
                            <div className="flex items-center gap-4 mt-8 w-full justify-center">
                                <Button onClick={handleClear} variant="outline" className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] font-medium text-sm rounded-lg border border-[#8EB69B]/40 shadow-sm transition-all">
                                    Temizle
                                </Button>
                                <Button onClick={handleSolve} disabled={isLoading} className="bg-[#235347] hover:bg-[#163832] text-white font-medium text-sm rounded-lg shadow-sm transition-all min-w-[150px]">
                                    {isLoading ? "Hesaplanıyor..." : "İndirge (Minimize)"}
                                </Button>
                            </div>
                            
                            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#163832]">
                                <AlertCircle className="w-4 h-4 text-[#235347]" />
                                <span>Hücrelere tıklayarak değerini (0, 1, X) değiştirebilirsiniz.</span>
                            </div>
                        </div>

                        {/* Sonuç Paneli */}
                        {solution && (
                            <div className="bg-[#F2F7F4] border border-slate-200/80 p-6 rounded-2xl shadow-inner flex flex-col gap-4">
                                <h3 className="font-bold text-[#163832] flex items-center gap-2">
                                    <Calculator className="w-5 h-5" /> Minimal Boolean İfadesi (SOP)
                                </h3>
                                
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-center text-xl text-[#051F20]">
                                    <MathFormula math={`f(A,B,C,D) = ${solution.simplifiedExpression}`} />
                                </div>

                                <div className="mt-2">
                                    <h4 className="text-sm font-medium text-[#051F20] mb-2">Prime Implicant Grupları:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {solution.groups.length === 0 && <span className="text-[#051F20] text-sm">Grup bulunamadı (Sonuç 0).</span>}
                                        {solution.groups.map(g => {
                                            const bgColor = g.color.split(" ")[0].replace("30", "20");
                                            const borderColor = g.color.split(" ")[1];
                                            return (
                                                <div 
                                                    key={g.id} 
                                                    className={cn("px-3 py-1.5 rounded-md border text-sm font-mono cursor-default transition-all text-[#051F20]", bgColor, borderColor)}
                                                    onMouseEnter={() => setHoveredGroupId(g.id)}
                                                    onMouseLeave={() => setHoveredGroupId(null)}
                                                >
                                                    <MathFormula math={g.implicantTerm} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <p className="text-xs font-medium text-[#163832] mt-2">Grupların haritadaki yerini görmek için üzerlerine fare ile gelin (Hover).</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sağ Panel: Truth Table */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm h-full flex flex-col">
                            <h3 className="font-bold text-[#163832] mb-4">Doğruluk Tablosu (Truth Table)</h3>
                            
                            <div className="overflow-y-auto max-h-[600px] border border-slate-200 rounded-lg">
                                <table className="w-full text-center text-sm font-mono">
                                    <thead className="bg-slate-50 sticky top-0 border-b border-slate-200">
                                        <tr>
                                            <th className="p-2 text-[#163832] font-bold">m</th>
                                            <th className="p-2 text-[#163832] font-bold">A</th>
                                            <th className="p-2 text-[#163832] font-bold">B</th>
                                            <th className="p-2 text-[#163832] font-bold">C</th>
                                            <th className="p-2 text-[#163832] font-bold">D</th>
                                            <th className="p-2 text-[#051F20] font-bold border-l border-slate-200">f</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {(solution ? solution.truthTable : Array(16).fill(0).map((_, i) => ({
                                            inputs: [i&8?1:0, i&4?1:0, i&2?1:0, i&1?1:0],
                                            output: cells[i]
                                        }))).map((row, i) => (
                                            <tr key={i} className={cn("hover:bg-slate-50 transition-colors", row.output === 1 ? "bg-[#DAF1DE]/40 text-[#235347] font-semibold" : row.output === 'X' ? "bg-amber-100 text-amber-700" : "text-[#051F20]")}>
                                                <td className="p-1.5 text-xs text-[#051F20]/60">{i}</td>
                                                <td className="p-1.5">{row.inputs[0]}</td>
                                                <td className="p-1.5">{row.inputs[1]}</td>
                                                <td className="p-1.5">{row.inputs[2]}</td>
                                                <td className="p-1.5">{row.inputs[3]}</td>
                                                <td className="p-1.5 font-bold border-l border-slate-200">{row.output}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
