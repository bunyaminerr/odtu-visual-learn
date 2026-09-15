"use client";

import React, { useState } from "react";
import { Cpu, Table, ListTree } from "lucide-react";
import { cn } from "@/lib/utils";
import { KMapGrid } from "@/components/visualizers/logic/KMapGrid";
import { analyzeKMap } from "@/lib/algorithms/logicSolver";

export default function BooleanAndKMapPage() {
    const [numVars, setNumVars] = useState<number>(4);
    
    // Create initial empty grid based on numVars
    const getInitialGrid = (vars: number) => {
        const rows = vars === 2 ? 2 : (vars === 3 ? 2 : 4);
        const cols = vars === 2 ? 2 : 4;
        return Array(rows).fill(null).map(() => Array(cols).fill(0));
    };

    const [grid, setGrid] = useState<number[][]>(getInitialGrid(4));
    const [solution, setSolution] = useState<any>(null);

    const handleNumVarsChange = (vars: number) => {
        setNumVars(vars);
        setGrid(getInitialGrid(vars));
        setSolution(null);
    };

    const handleGridChange = (r: number, c: number, val: number) => {
        const newGrid = [...grid];
        newGrid[r] = [...grid[r]];
        newGrid[r][c] = val;
        setGrid(newGrid);
        setSolution(null);
    };

    const handleSolve = () => {
        const result = analyzeKMap(grid, numVars);
        setSolution(result);
    };

    const loadPreset = (presetType: string) => {
        let newGrid;
        if (presetType === "slide16") {
            handleNumVarsChange(4);
            newGrid = [
                [0, 1, 0, 0],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [0, 1, 0, 0]
            ];
            setGrid(newGrid);
            setSolution(null);
        } else if (presetType === "slide24") {
            handleNumVarsChange(3);
            newGrid = [
                [1, 1, 1, 1],
                [0, 1, 1, 0]
            ];
            setGrid(newGrid);
            setSolution(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-6 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col gap-10">
                
                <header className="border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-3 text-[#051F20] mb-2">
                        <Cpu className="w-8 h-8" />
                        <h1 className="text-2xl font-bold tracking-tight text-[#051F20]">CNG 232</h1>
                    </div>
                    <h2 className="text-sm font-medium text-[#235347] flex items-center gap-2">
                        <Table className="w-4 h-4" /> 
                        Boolean Algebra & K-Maps (Karnaugh Haritaları ve Kapı-Seviyesi İndirgeme)
                    </h2>
                </header>

                <div className="flex flex-col gap-12">
                    
                    {/* Educational Text */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4 text-[#235347]">
                            <ListTree className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Kanonik Formlar ve Karnaugh Haritası (K-Map) Nedir?</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-4">
                            <p>Boolean fonksiyonları karmaşık denklemler olabilir. Donanım (hardware) üretilirken maliyeti düşürmek için bu denklemlerin <strong>en sade halini (minimized)</strong> bulmak şarttır. Bunun için standart formlara ve K-Map'e ihtiyaç vardır.</p>
                            
                            <h3 className="font-bold text-[#163832] mt-4">Kanonik ve Standart Formlar (Minterm & Maxterm):</h3>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>Minterm:</strong> Tabloda çıkışı 1 olan satırlardır. Değişkenlerin AND'lenmesiyle (çarpımı) oluşur (Örn: $x'yz$). Mintermlerin OR'lanarak toplanmasına <strong>Sum of Products (SOP)</strong> denir. Küçük $m$ ile gösterilir (Örn: $\Sigma m(1,4,7)$).</li>
                                <li><strong>Maxterm:</strong> Tabloda çıkışı 0 olan satırlardır. Değişkenlerin OR'lanmasıyla (toplamı) oluşur (Örn: $x+y'+z$). Maxtermlerin AND'lenmesine <strong>Product of Sums (POS)</strong> denir. Büyük $M$ ile gösterilir (Örn: $\Pi M(0,2,3)$).</li>
                            </ul>

                            <div className="mt-4 bg-[#F2F7F4] p-6 rounded-xl border border-[#DAF1DE]">
                                <h3 className="font-bold mb-2 text-[#163832]">Karnaugh Haritası (K-Map) Algoritması</h3>
                                <p className="text-sm text-[#051F20]">
                                    K-Map, boolean fonksiyonlarını grafiksel bir harita üzerinden kolayca sadeleştirme (optimize etme) aracıdır. Venn diyagramının bir modifikasyonudur. 2, 3 veya 4 değişken (4, 8, 16 kare) için tasarlanabilir.
                                </p>
                                <ul className="list-disc pl-6 space-y-1 mt-2 text-sm text-[#235347]">
                                    <li><strong>Prime Implicants:</strong> K-Map üzerindeki oluşturulabilecek tüm maksimum boyutlu 1'li gruplardır (gruplar $2^n$ boyutunda olmalıdır: 1, 2, 4, 8, 16 kare).</li>
                                    <li><strong>Essential Prime Implicants:</strong> Sadece bir grup tarafından kapsanan, "olmazsa olmaz" kritik 1'li gruplardır. Nihai fonksiyonda kesinlikle yer almalıdırlar.</li>
                                    <li><strong>Don't Care (Fark etmez) Durumları (d veya X):</strong> Fonksiyonun o durumda 0 mı 1 mi çıkardığı umrumuzda değilse, bu karelere "Don't Care" denir. Sadeleştirme yaparken işimize gelirse 1 gibi (grubu büyütmek için), işimize gelmezse 0 gibi davranabiliriz. Maliyeti daha da düşürmemizi sağlarlar.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Interactive Section */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-[#163832]">K-Map Çözücü Simülatörü</h2>
                            <div className="flex items-center gap-4">
                                <div className="text-sm font-medium text-slate-500">Değişken Sayısı:</div>
                                <div className="flex gap-2">
                                    {[2, 3, 4].map(v => (
                                        <button
                                            key={v}
                                            onClick={() => handleNumVarsChange(v)}
                                            className={cn(
                                                "px-3 py-1 rounded-md font-bold transition-all border",
                                                numVars === v 
                                                    ? "bg-[#235347] text-white border-[#235347]" 
                                                    : "bg-white text-slate-500 hover:text-slate-800"
                                            )}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-sm font-medium text-slate-500">Hazır Slayt Örnekleri:</div>
                            <button onClick={() => loadPreset("slide24")} className="px-3 py-1 bg-amber-100 text-amber-800 font-bold rounded-md hover:bg-amber-200 text-sm">3 Değişkenli Örnek (Slayt 24)</button>
                            <button onClick={() => loadPreset("slide16")} className="px-3 py-1 bg-amber-100 text-amber-800 font-bold rounded-md hover:bg-amber-200 text-sm">4 Değişkenli Örnek (Slayt 16)</button>
                        </div>

                        <KMapGrid 
                            grid={grid} 
                            numVars={numVars} 
                            onChange={handleGridChange} 
                        />

                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleSolve}
                                className="px-8 py-3 bg-[#235347] text-white font-bold rounded-xl hover:bg-[#163832] transition-colors shadow-lg hover:shadow-xl active:translate-y-0.5"
                            >
                                En Sade Hali Bul (Minimize)
                            </button>
                        </div>
                        
                        {solution && (
                            <div className="mt-8 p-6 bg-[#F2F7F4] border border-[#DAF1DE] rounded-xl animate-in fade-in slide-in-from-bottom-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-[#163832] flex items-center gap-2">
                                            SOP (Sum of Products)
                                        </h3>
                                        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 font-mono text-lg text-[#235347]">
                                            F = {solution.sop.expression || '0'}
                                        </div>
                                        <div className="text-sm text-slate-600">
                                            <p className="font-semibold text-slate-800 mb-1">Prime Implicants (Olası Gruplar):</p>
                                            <ul className="list-disc pl-5">
                                                {solution.sop.primeImplicants.map((pi: string, i: number) => (
                                                    <li key={i}>{pi}</li>
                                                ))}
                                                {solution.sop.primeImplicants.length === 0 && <li>Bulunamadı (0)</li>}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-[#163832] flex items-center gap-2">
                                            POS (Product of Sums)
                                        </h3>
                                        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 font-mono text-lg text-[#235347]">
                                            F = {solution.pos.expression || '1'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
