"use client";

import React, { useState, useEffect } from "react";
import { generateDivisorsPoset, generateHasseDiagram } from "@/lib/algorithms/discreteSimulator";
import { HasseDiagramCanvas } from "@/components/visualizers/discrete/HasseDiagramCanvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GitMerge, Layers, Hash } from "lucide-react";

export default function SetsAndRelationsPage() {
    const [inputValue, setInputValue] = useState("36");
    const [poset, setPoset] = useState(generateDivisorsPoset(36));

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const qstate = urlParams.get('qstate');
        if (qstate) {
            try {
                const parsed = JSON.parse(decodeURIComponent(qstate));
                if (typeof parsed === "number") {
                    setInputValue(String(parsed));
                    setPoset(generateDivisorsPoset(parsed));
                }
            } catch (e) {
                console.error("Failed to parse qstate");
            }
        }
    }, []);

    const handleGenerate = () => {
        const n = parseInt(inputValue);
        if (!isNaN(n) && n > 0 && n <= 1000) {
            setPoset(generateDivisorsPoset(n));
        }
    };

    const hasse = generateHasseDiagram(poset);

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-6 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col gap-6">
                
                {/* Header */}
                <header className="border-b border-slate-200 pb-4 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-3 text-[#051F20] mb-2">
                            <Layers className="w-8 h-8" />
                            <h1 className="text-2xl font-bold tracking-tight text-[#051F20]">CNG 223</h1>
                        </div>
                        <h2 className="text-sm font-medium text-[#235347] flex items-center gap-2">
                            <GitMerge className="w-4 h-4" /> 
                            Kısmi Sıralama Bağıntıları (Posets) ve Hasse Diyagramı
                        </h2>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
                    
                    {/* Sol Panel: Kontroller */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div className="bg-white border border-slate-200/80 shadow-sm p-5 rounded-xl">
                            <h3 className="font-bold text-[#163832] mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Hash className="w-4 h-4 text-[#235347]" />
                                Bölenler (Divisors) Poset'i
                            </h3>
                            
                            <p className="text-xs font-medium text-[#163832] mb-4">
                                Girdiğiniz N sayısının tüm pozitif bölenleri için "a | b" (a böler b) bağıntısını oluşturur. Hasse diyagramı için refleksif ve transitif kenarlar otomatik silinir.
                            </p>

                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-semibold text-[#163832]">N (Maks: 1000)</label>
                                <div className="flex gap-2">
                                    <Input 
                                        type="number"
                                        value={inputValue}
                                        onChange={e => setInputValue(e.target.value)}
                                        className="bg-white border-slate-200 text-[#051F20] focus:border-[#235347] focus:ring-2 focus:ring-[#235347]/20 rounded-lg"
                                        min={1}
                                        max={1000}
                                    />
                                    <Button onClick={handleGenerate} className="bg-[#235347] hover:bg-[#163832] text-white font-medium text-sm rounded-lg shadow-sm transition-all">
                                        Çiz
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex flex-col gap-2">
                                <Button onClick={() => {setInputValue("12"); setPoset(generateDivisorsPoset(12))}} variant="outline" className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] font-medium rounded-lg border border-[#8EB69B]/40 shadow-sm transition-all text-xs">
                                    D_12 Örneği
                                </Button>
                                <Button onClick={() => {setInputValue("36"); setPoset(generateDivisorsPoset(36))}} variant="outline" className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] font-medium rounded-lg border border-[#8EB69B]/40 shadow-sm transition-all text-xs">
                                    D_36 Örneği
                                </Button>
                                <Button onClick={() => {setInputValue("60"); setPoset(generateDivisorsPoset(60))}} variant="outline" className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] font-medium rounded-lg border border-[#8EB69B]/40 shadow-sm transition-all text-xs">
                                    D_60 Örneği
                                </Button>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200/80 shadow-sm p-5 rounded-xl text-xs font-medium text-[#163832]">
                            <strong>İstatistikler:</strong><br/>
                            Eleman Sayısı: {poset.elements.length}<br/>
                            Transitif Kenar (Gizlenen): {poset.pairs.filter(p=>p[0]!==p[1]).length - hasse.edges.length}<br/>
                            Çizilen Kenar: {hasse.edges.length}
                        </div>
                    </div>

                    {/* Sağ Panel: Tuval */}
                    <div className="lg:col-span-3">
                        <HasseDiagramCanvas nodes={hasse.nodes} edges={hasse.edges} />
                    </div>
                </div>
            </div>
        </div>
    );
}
