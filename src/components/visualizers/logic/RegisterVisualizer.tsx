"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowDown } from "lucide-react";

export function RegisterVisualizer() {
    // 4-bit Register state (Q3, Q2, Q1, Q0)
    const [q, setQ] = useState<[number, number, number, number]>([0, 0, 0, 0]);
    
    // Control inputs
    const [s1, setS1] = useState<number>(0);
    const [s0, setS0] = useState<number>(0); // 00: Hold, 01: Shift Right, 10: Shift Left, 11: Parallel Load
    const [clr, setClr] = useState<number>(1); // Active Low Clear
    
    // Data inputs
    const [serialInRight, setSerialInRight] = useState<number>(0);
    const [serialInLeft, setSerialInLeft] = useState<number>(0);
    const [parallelIn, setParallelIn] = useState<[number, number, number, number]>([0, 0, 0, 0]);

    // Apply Clock
    const handleClock = () => {
        if (clr === 0) {
            setQ([0, 0, 0, 0]);
            return;
        }

        const mode = `${s1}${s0}`;
        let newQ: [number, number, number, number] = [...q];

        if (mode === "00") {
            // Hold
        } else if (mode === "01") {
            // Shift Right (Q3 receives Serial In, others shift right)
            newQ = [serialInRight, q[0], q[1], q[2]];
        } else if (mode === "10") {
            // Shift Left (Q0 receives Serial In, others shift left)
            newQ = [q[1], q[2], q[3], serialInLeft];
        } else if (mode === "11") {
            // Parallel Load
            newQ = [...parallelIn];
        }

        setQ(newQ);
    };

    // Asynchronous Clear Effect
    useEffect(() => {
        if (clr === 0) {
            setQ([0, 0, 0, 0]);
        }
    }, [clr]);

    const getModeText = () => {
        if (clr === 0) return "Temizleniyor (Clear)";
        const mode = `${s1}${s0}`;
        if (mode === "00") return "Bekleme (Hold)";
        if (mode === "01") return "Sağa Kaydır (Shift Right)";
        if (mode === "10") return "Sola Kaydır (Shift Left)";
        return "Paralel Yükle (Parallel Load)";
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
            
            {/* Controls */}
            <div className="w-full lg:w-72 bg-[#F2F7F4] border-r border-[#DAF1DE] p-6 flex flex-col gap-6">
                <div>
                    <h3 className="text-sm font-bold text-[#163832] mb-3 uppercase tracking-wider">Mod Seçimi (S1, S0)</h3>
                    <div className="flex gap-2">
                        <button onClick={() => setS1(s1 ^ 1)} className={cn("flex-1 py-2 font-bold rounded-lg border", s1 ? "bg-[#235347] text-white border-[#235347]" : "bg-white text-slate-600")}>S1: {s1}</button>
                        <button onClick={() => setS0(s0 ^ 1)} className={cn("flex-1 py-2 font-bold rounded-lg border", s0 ? "bg-[#235347] text-white border-[#235347]" : "bg-white text-slate-600")}>S0: {s0}</button>
                    </div>
                    <div className="mt-2 text-center text-sm font-bold text-amber-700 bg-amber-100 p-2 rounded-lg border border-amber-200">
                        {getModeText()}
                    </div>
                </div>

                <div className="h-px bg-[#DAF1DE] w-full" />

                <div>
                    <h3 className="text-sm font-bold text-[#163832] mb-3 uppercase tracking-wider">Seri Girişler</h3>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => setSerialInRight(serialInRight ^ 1)} className={cn("py-2 px-4 rounded border font-bold flex justify-between", serialInRight ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-white")}>
                            <span>Sağa Kaydırma Girişi</span><span>{serialInRight}</span>
                        </button>
                        <button onClick={() => setSerialInLeft(serialInLeft ^ 1)} className={cn("py-2 px-4 rounded border font-bold flex justify-between", serialInLeft ? "bg-purple-100 border-purple-500 text-purple-700" : "bg-white")}>
                            <span>Sola Kaydırma Girişi</span><span>{serialInLeft}</span>
                        </button>
                    </div>
                </div>

                <div className="h-px bg-[#DAF1DE] w-full" />

                <div>
                    <h3 className="text-sm font-bold text-[#163832] mb-3 uppercase tracking-wider">Paralel Veri (I3..I0)</h3>
                    <div className="flex gap-2">
                        {[0, 1, 2, 3].map(i => (
                            <button 
                                key={i}
                                onClick={() => {
                                    const n = [...parallelIn] as [number,number,number,number];
                                    n[i] = n[i] ^ 1;
                                    setParallelIn(n);
                                }}
                                className={cn("flex-1 py-2 rounded border font-bold", parallelIn[i] ? "bg-slate-700 text-white" : "bg-white text-slate-600")}
                            >
                                {parallelIn[i]}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-[#DAF1DE] w-full" />

                <div className="flex flex-col gap-2">
                    <button onClick={handleClock} className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-lg rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors">
                        <ArrowRight className="w-5 h-5" />
                        CLOCK (Tetikle)
                    </button>
                    <button onClick={() => setClr(clr ^ 1)} className={cn("w-full py-2 font-bold rounded-xl border flex items-center justify-center gap-2 transition-colors", clr === 0 ? "bg-red-500 text-white border-red-600" : "bg-red-50 text-red-500 hover:bg-red-100 border-red-200")}>
                        Clear (Active Low): {clr}
                    </button>
                </div>
            </div>

            {/* Visualizer */}
            <div className="flex-1 p-8 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
                
                <h3 className="text-xl font-black text-[#163832] mb-12">4-Bit Universal Shift Register</h3>

                <div className="flex gap-4 relative">
                    
                    {/* Shift Right Input Arrow */}
                    <div className={cn("absolute -left-16 top-1/2 -translate-y-1/2 flex items-center transition-opacity", (s1===0 && s0===1) ? "opacity-100" : "opacity-20")}>
                        <span className="font-bold text-blue-700 mr-1">{serialInRight}</span>
                        <ArrowRight className="w-6 h-6 text-blue-500" />
                    </div>

                    {/* Shift Left Input Arrow */}
                    <div className={cn("absolute -right-16 top-1/2 -translate-y-1/2 flex items-center flex-row-reverse transition-opacity", (s1===1 && s0===0) ? "opacity-100" : "opacity-20")}>
                        <span className="font-bold text-purple-700 ml-1">{serialInLeft}</span>
                        <ArrowRight className="w-6 h-6 text-purple-500 rotate-180" />
                    </div>

                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className="flex flex-col items-center gap-4 relative">
                            {/* Parallel Input Arrow */}
                            <div className={cn("flex flex-col items-center transition-opacity", (s1===1 && s0===1) ? "opacity-100" : "opacity-20")}>
                                <span className="font-bold text-sm text-slate-500">{parallelIn[i]}</span>
                                <ArrowDown className="w-5 h-5 text-slate-400" />
                            </div>

                            {/* Flip Flop Box */}
                            <div className={cn(
                                "w-20 h-24 bg-white border-4 rounded-xl flex flex-col items-center justify-center relative shadow-sm transition-all duration-300",
                                q[i] === 1 ? "border-[#235347] bg-[#F2F7F4]" : "border-slate-300"
                            )}>
                                <span className="absolute top-1 left-2 text-[10px] font-bold text-slate-400">FF {3-i}</span>
                                <span className={cn("text-3xl font-black", q[i]===1 ? "text-[#163832]" : "text-slate-300")}>{q[i]}</span>
                                
                                {/* Clock Triangle */}
                                <div className="absolute bottom-0 left-2 w-0 h-0 border-l-[6px] border-l-transparent border-b-[8px] border-b-slate-400 border-r-[6px] border-r-transparent" />
                            </div>

                            {/* Output */}
                            <span className="font-bold text-lg text-[#163832]">Q{3-i}</span>
                        </div>
                    ))}

                </div>

                {/* State String */}
                <div className="mt-12 bg-white px-6 py-4 rounded-2xl border shadow-sm text-center">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Register İçeriği</div>
                    <div className="text-4xl font-mono tracking-widest font-black text-[#163832]">
                        {q.join("")}
                    </div>
                </div>

            </div>
        </div>
    );
}
