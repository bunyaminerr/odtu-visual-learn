"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, Play, RefreshCcw } from "lucide-react";

export function RaceConditionVisualizer() {
    // 00, 01, 10, 11
    const [raceType, setRaceType] = useState<"noncritical" | "critical">("noncritical");
    const [currentState, setCurrentState] = useState<"00" | "01" | "10" | "11">("00");
    const [history, setHistory] = useState<string[]>(["00"]);

    const runSimulation = (fasterVariable: "y1" | "y2" | "both") => {
        let path: string[] = ["00"];
        let next: "00"|"01"|"10"|"11" = "00";

        // Initial target from 00 is 11 (Both variables change)
        if (fasterVariable === "both") {
            next = "11";
            path.push("11");
        } else if (fasterVariable === "y1") {
            // y1 changes first: 00 -> 10
            next = "10";
            path.push("10");
        } else if (fasterVariable === "y2") {
            // y2 changes first: 00 -> 01
            next = "01";
            path.push("01");
        }

        // Second step based on race type
        if (raceType === "noncritical") {
            // Both intermediate states (10 and 01) direct the machine to 11
            if (next === "10" || next === "01") {
                next = "11";
                path.push("11");
            }
        } else {
            // Critical race: intermediate states trap the machine or send it somewhere else
            if (next === "10") {
                // Let's say 10 is a stable state in critical race
                // It stays at 10.
            } else if (next === "01") {
                // Let's say 01 is a stable state in critical race
                // It stays at 01.
            }
        }

        setHistory(path);
        setCurrentState(next);
    };

    const reset = () => {
        setCurrentState("00");
        setHistory(["00"]);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            
            {/* Controls */}
            <div className="w-full md:w-80 bg-[#F2F7F4] border-r border-[#DAF1DE] p-6 flex flex-col gap-6">
                <div>
                    <h3 className="text-sm font-bold text-[#163832] mb-3 uppercase tracking-wider">Senaryo Seçimi</h3>
                    <div className="flex flex-col gap-2">
                        <button 
                            onClick={() => { setRaceType("noncritical"); reset(); }} 
                            className={cn("py-2 px-4 rounded-lg font-bold border transition-colors text-left", raceType === "noncritical" ? "bg-green-600 text-white border-green-700" : "bg-white text-slate-600")}
                        >
                            Non-Critical Race (Tehlikesiz)
                        </button>
                        <button 
                            onClick={() => { setRaceType("critical"); reset(); }} 
                            className={cn("py-2 px-4 rounded-lg font-bold border transition-colors text-left", raceType === "critical" ? "bg-red-600 text-white border-red-700" : "bg-white text-slate-600")}
                        >
                            Critical Race (Kritik - Hatalı)
                        </button>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border text-sm text-slate-600 shadow-sm">
                    Hedef State (Durum): <strong>11</strong><br/>
                    Başlangıç: <strong>00</strong><br/><br/>
                    İki bit aynı anda değişmeye çalışıyor. Hangi sinyalin (gecikmeden dolayı) daha hızlı ulaşacağını seçin:
                </div>

                <div className="flex flex-col gap-2">
                    <button onClick={() => runSimulation("both")} className="w-full py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold rounded-lg border border-blue-300 transition-colors">
                        İkisi de Aynı Anda (İdeal)
                    </button>
                    <button onClick={() => runSimulation("y1")} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg border border-slate-300 transition-colors">
                        y1 Sinyali Daha Hızlı (00 &rarr; 10)
                    </button>
                    <button onClick={() => runSimulation("y2")} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg border border-slate-300 transition-colors">
                        y2 Sinyali Daha Hızlı (00 &rarr; 01)
                    </button>
                </div>

                <button onClick={reset} className="mt-auto py-2 flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 font-bold">
                    <RefreshCcw className="w-4 h-4" /> Sıfırla
                </button>
            </div>

            {/* Visualizer */}
            <div className="flex-1 p-8 bg-slate-50 relative flex flex-col items-center">
                
                <h3 className="text-xl font-black text-[#163832] mb-8">K-Map (Transition Table) Görünümü</h3>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-4 w-64 h-64 relative">
                    
                    {/* Paths */}
                    {history.length > 1 && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#163832" />
                                </marker>
                            </defs>
                            {history.map((step, idx) => {
                                if (idx === 0) return null;
                                const prev = history[idx-1];
                                
                                const getCoords = (state: string) => {
                                    if (state === "00") return {x: 48, y: 48};
                                    if (state === "01") return {x: 192, y: 48};
                                    if (state === "10") return {x: 48, y: 192};
                                    if (state === "11") return {x: 192, y: 192};
                                    return {x:0, y:0};
                                };

                                const start = getCoords(prev);
                                const end = getCoords(step);

                                return (
                                    <line 
                                        key={idx}
                                        x1={start.x} y1={start.y} 
                                        x2={end.x} y2={end.y} 
                                        stroke="#163832" strokeWidth="4" 
                                        markerEnd="url(#arrowhead)"
                                        className="animate-in fade-in"
                                    />
                                );
                            })}
                        </svg>
                    )}

                    {["00", "01", "10", "11"].map((st) => (
                        <div key={st} className={cn(
                            "flex flex-col items-center justify-center rounded-2xl border-4 transition-all duration-300 relative z-20",
                            currentState === st ? "bg-[#235347] border-[#163832] shadow-lg scale-105" : "bg-white border-slate-200",
                            st === "11" && currentState !== "11" ? "border-dashed border-amber-400" : ""
                        )}>
                            <span className={cn("text-2xl font-black", currentState === st ? "text-white" : "text-slate-400")}>
                                {st}
                            </span>
                            {st === "11" && currentState !== "11" && (
                                <span className="absolute bottom-2 text-xs font-bold text-amber-500">HEDEF</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Result Box */}
                {history.length > 1 && (
                    <div className={cn(
                        "mt-12 p-4 rounded-xl border flex items-start gap-3 max-w-md animate-in slide-in-from-bottom-4",
                        currentState === "11" 
                            ? "bg-green-50 border-green-200 text-green-800" 
                            : "bg-red-50 border-red-200 text-red-800"
                    )}>
                        {currentState === "11" ? (
                            <>
                                <Info className="w-6 h-6 flex-shrink-0 text-green-600" />
                                <div>
                                    <h4 className="font-bold">Başarılı (Non-Critical)</h4>
                                    <p className="text-sm mt-1">Yol ne olursa olsun sistem eninde sonunda hedeflenen doğru (11) durumuna (stable state) ulaştı.</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <AlertTriangle className="w-6 h-6 flex-shrink-0 text-red-600" />
                                <div>
                                    <h4 className="font-bold">Hata (Critical Race)</h4>
                                    <p className="text-sm mt-1">Sinyallerin gecikme farkından dolayı sistem yanlış bir duruma ({currentState}) girip orada kilitlendi. Hedefine ulaşamadı.</p>
                                </div>
                            </>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
