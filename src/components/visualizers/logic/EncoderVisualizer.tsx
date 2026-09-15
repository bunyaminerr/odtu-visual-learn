"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Cpu, ArrowRight } from 'lucide-react';

export const EncoderVisualizer = () => {
    const [inputs, setInputs] = useState<number[]>([0, 0, 0, 0]); // D3, D2, D1, D0
    
    const handleInputClick = (index: number) => {
        setInputs(prev => {
            const next = [...prev];
            next[index] = next[index] === 0 ? 1 : 0;
            return next;
        });
    };

    // Calculate priority encoder outputs
    // Highest index has priority. D3 > D2 > D1 > D0
    let a1 = 0;
    let a0 = 0;
    let v = 0;
    let activeInput = -1;

    if (inputs[0] === 1) { // D3 is at index 0 in our array for rendering order, but let's re-map logically
        activeInput = 3; a1 = 1; a0 = 1; v = 1;
    } else if (inputs[1] === 1) { // D2
        activeInput = 2; a1 = 1; a0 = 0; v = 1;
    } else if (inputs[2] === 1) { // D1
        activeInput = 1; a1 = 0; a0 = 1; v = 1;
    } else if (inputs[3] === 1) { // D0
        activeInput = 0; a1 = 0; a0 = 0; v = 1;
    }

    return (
        <div className="flex flex-col items-center w-full gap-8">
            <h3 className="font-bold text-[#163832] text-lg">4-to-2 Priority Encoder (Öncelikli Kodlayıcı)</h3>
            <div className="flex items-center justify-center gap-8 w-full">
                
                {/* Inputs (D3 to D0) */}
                <div className="flex flex-col gap-4">
                    {inputs.map((val, i) => {
                        const logicalIndex = 3 - i; // 3, 2, 1, 0
                        const isActive = activeInput === logicalIndex;
                        return (
                            <div key={`in-${i}`} className="flex items-center gap-3">
                                <span className={cn("font-bold w-6 text-right", isActive ? "text-[#235347]" : "text-[#051F20]")}>D{logicalIndex}</span>
                                <button
                                    onClick={() => handleInputClick(i)}
                                    className={cn(
                                        "w-12 h-12 flex items-center justify-center text-xl font-bold font-mono rounded-lg border-2 transition-all shadow-sm",
                                        val === 1 
                                            ? (isActive ? "bg-[#DAF1DE] border-[#235347] text-[#235347] ring-4 ring-[#DAF1DE]" : "bg-slate-100 border-slate-300 text-slate-500 line-through")
                                            : "bg-white border-slate-300 text-slate-400"
                                    )}
                                >
                                    {val}
                                </button>
                                <ArrowRight className={cn("w-5 h-5 transition-colors", isActive ? "text-[#235347]" : "text-slate-300")} />
                            </div>
                        );
                    })}
                </div>

                {/* Encoder Chip */}
                <div className="w-48 bg-[#051F20] rounded-xl shadow-lg border-4 border-slate-700 flex flex-col items-center justify-center py-12 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-slate-700 rounded-b-full"></div>
                    <Cpu className="w-12 h-12 text-amber-200 mb-2 opacity-50" />
                    <span className="text-white font-mono font-bold tracking-widest text-center px-2">PRIORITY ENCODER</span>
                </div>

                {/* Outputs */}
                <div className="flex flex-col gap-6 justify-center">
                    <div className="flex items-center gap-3">
                        <ArrowRight className={cn("w-5 h-5 transition-colors", a1 === 1 ? "text-amber-500" : "text-slate-300")} />
                        <div className={cn("w-12 h-12 flex items-center justify-center text-xl font-bold font-mono rounded-lg border-2 transition-all shadow-sm", a1 === 1 ? "bg-amber-100 border-amber-500 text-amber-700" : "bg-white border-slate-300 text-slate-400")}>
                            {a1}
                        </div>
                        <span className="font-bold text-amber-600">A1</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <ArrowRight className={cn("w-5 h-5 transition-colors", a0 === 1 ? "text-amber-500" : "text-slate-300")} />
                        <div className={cn("w-12 h-12 flex items-center justify-center text-xl font-bold font-mono rounded-lg border-2 transition-all shadow-sm", a0 === 1 ? "bg-amber-100 border-amber-500 text-amber-700" : "bg-white border-slate-300 text-slate-400")}>
                            {a0}
                        </div>
                        <span className="font-bold text-amber-600">A0</span>
                    </div>

                    <div className="flex items-center gap-3 mt-4 border-t pt-4">
                        <ArrowRight className={cn("w-5 h-5 transition-colors", v === 1 ? "text-[#235347]" : "text-slate-300")} />
                        <div className={cn("w-12 h-12 flex items-center justify-center text-xl font-bold font-mono rounded-lg border-2 transition-all shadow-sm", v === 1 ? "bg-[#235347] border-[#163832] text-white" : "bg-white border-slate-300 text-slate-400")}>
                            {v}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[#235347]">V</span>
                            <span className="text-[10px] text-slate-500 leading-none">Valid</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#DAF1DE]/30 p-4 rounded-xl border border-[#DAF1DE] w-full max-w-2xl text-center text-sm text-[#163832]">
                <p><strong>Çalışma Mantığı:</strong> Priority Encoder (Öncelikli Kodlayıcı), aktif (1) olan girişlerden <strong>indexi en büyük olana</strong> öncelik verir. Örneğin D3 aktifse, D2, D1 veya D0'ın ne olduğuna (Don't care) bakmaksızın çıkışa D3'ün binary kodunu (11) yazar. Hiçbir giriş aktif değilse Valid (V) pini 0 olur.</p>
            </div>
        </div>
    );
};
