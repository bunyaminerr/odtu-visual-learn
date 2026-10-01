"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Cpu, ArrowRight, ArrowDown } from 'lucide-react';

export const MuxVisualizer = () => {
    const [type, setType] = useState<'2to1' | '4to1'>('4to1');
    const [inputs, setInputs] = useState<number[]>([1, 0, 1, 0]); // I0, I1, I2, I3
    const [select, setSelect] = useState<number[]>([0, 0]); // S1, S0 (or just S0 for 2to1)

    const numInputs = type === '2to1' ? 2 : 4;
    const numSelects = type === '2to1' ? 1 : 2;

    const handleInputClick = (index: number) => {
        setInputs(prev => {
            const next = [...prev];
            next[index] = next[index] === 0 ? 1 : 0;
            return next;
        });
    };

    const handleSelectClick = (index: number) => {
        setSelect(prev => {
            const next = [...prev];
            next[index] = next[index] === 0 ? 1 : 0;
            return next;
        });
    };

    // Calculate selected input
    let selectedIndex = 0;
    if (type === '2to1') {
        selectedIndex = select[0]; // S0
    } else {
        selectedIndex = select[0] * 2 + select[1]; // S1*2 + S0
    }

    const outputValue = inputs[selectedIndex];

    return (
        <div className="flex flex-col items-center w-full gap-8">
            <div className="flex gap-4">
                <button 
                    className={cn("px-4 py-2 text-sm font-bold rounded-md transition-all border", type === '2to1' ? "bg-[#235347] text-white border-[#235347]" : "bg-white text-slate-500 hover:text-slate-700")}
                    onClick={() => { setType('2to1'); setSelect([0]); }}
                >
                    2-to-1 MUX
                </button>
                <button 
                    className={cn("px-4 py-2 text-sm font-bold rounded-md transition-all border", type === '4to1' ? "bg-[#235347] text-white border-[#235347]" : "bg-white text-slate-500 hover:text-slate-700")}
                    onClick={() => { setType('4to1'); setSelect([0, 0]); }}
                >
                    4-to-1 MUX
                </button>
            </div>

            <div className="flex items-center justify-center gap-8 w-full mt-4">
                
                {/* Data Inputs */}
                <div className="flex flex-col gap-4">
                    {Array.from({length: numInputs}).map((_, i) => {
                        const isSelected = selectedIndex === i;
                        return (
                            <div key={`in-${i}`} className="flex items-center gap-3">
                                <span className={cn("font-bold w-4 text-right", isSelected ? "text-[#235347]" : "text-[#051F20]")}>I{i}</span>
                                <button
                                    onClick={() => handleInputClick(i)}
                                    className={cn(
                                        "w-12 h-12 flex items-center justify-center text-xl font-bold font-mono rounded-lg border-2 transition-all shadow-sm",
                                        isSelected ? "bg-[#DAF1DE] border-[#235347] text-[#235347] ring-4 ring-[#DAF1DE]" : "bg-white border-slate-300 text-slate-500"
                                    )}
                                >
                                    {inputs[i]}
                                </button>
                                <ArrowRight className={cn("w-5 h-5 transition-colors", isSelected ? "text-[#235347]" : "text-slate-300")} />
                            </div>
                        );
                    })}
                </div>

                {/* MUX Shape */}
                <div className="relative flex flex-col items-center">
                    
                    {/* Select Lines (Top) */}
                    <div className="flex gap-4 mb-4">
                        {Array.from({length: numSelects}).map((_, i) => {
                            const label = numSelects === 1 ? 'S' : `S${numSelects - 1 - i}`;
                            return (
                                <div key={`sel-${i}`} className="flex flex-col items-center gap-2">
                                    <span className="font-bold text-amber-600">{label}</span>
                                    <button
                                        onClick={() => handleSelectClick(i)}
                                        className={cn(
                                            "w-10 h-10 flex items-center justify-center text-lg font-bold font-mono rounded-lg border-2 transition-all shadow-sm",
                                            select[i] === 1 ? "bg-amber-100 border-amber-500 text-amber-700" : "bg-white border-slate-300 text-slate-500"
                                        )}
                                    >
                                        {select[i]}
                                    </button>
                                    <ArrowDown className="text-amber-500 w-5 h-5" />
                                </div>
                            );
                        })}
                    </div>

                    {/* Trapezoid Body */}
                    <div className="w-32 h-64 bg-[#051F20] flex items-center justify-center relative shadow-lg"
                         style={{ clipPath: 'polygon(0 0, 100% 20%, 100% 80%, 0 100%)' }}>
                        <span className="text-white font-mono font-bold tracking-widest rotate-90 whitespace-nowrap text-xl">MULTIPLEXER</span>
                    </div>

                </div>

                {/* Output */}
                <div className="flex items-center gap-3">
                    <ArrowRight className="w-5 h-5 text-[#235347]" />
                    <div className="w-16 h-16 flex items-center justify-center text-2xl font-bold font-mono rounded-lg border-4 transition-all shadow-lg bg-[#235347] border-[#163832] text-white">
                        {outputValue}
                    </div>
                    <span className="font-bold text-[#235347] text-xl">Y</span>
                </div>
            </div>

            <div className="bg-[#DAF1DE]/30 p-4 rounded-xl border border-[#DAF1DE] w-full max-w-2xl text-center text-sm text-[#163832]">
                <p><strong>Çalışma Mantığı:</strong> Multiplexer (Çoklayıcı), dijital bir seçici anahtardır. <strong>Seçici (Select)</strong> pinlerindeki binary değere bakar ve o değere karşılık gelen veri hattını (Data Input) doğrudan çıkışa ($Y$) bağlar. Şu an {numSelects > 1 ? `S1S0 = ${select[0]}${select[1]} (Ondalık: ${selectedIndex})` : `S = ${select[0]}`} seçili olduğu için <strong>I{selectedIndex}</strong> çıkışa aktarılıyor.</p>
            </div>
        </div>
    );
};
