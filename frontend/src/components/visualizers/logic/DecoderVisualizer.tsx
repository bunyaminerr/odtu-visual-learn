"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Cpu, ArrowRight } from 'lucide-react';

export const DecoderVisualizer = () => {
    const [type, setType] = useState<'2to4' | '3to8'>('2to4');
    const [inputs, setInputs] = useState<number[]>(type === '2to4' ? [0, 0] : [0, 0, 0]);

    const numOutputs = type === '2to4' ? 4 : 8;
    
    const handleInputClick = (index: number) => {
        setInputs(prev => {
            const next = [...prev];
            next[index] = next[index] === 0 ? 1 : 0;
            return next;
        });
    };

    const handleTypeChange = (newType: '2to4' | '3to8') => {
        setType(newType);
        setInputs(newType === '2to4' ? [0, 0] : [0, 0, 0]);
    };

    // Calculate active output
    let activeOutput = 0;
    for (let i = 0; i < inputs.length; i++) {
        activeOutput += inputs[i] * Math.pow(2, inputs.length - 1 - i); // MSB is inputs[0]
    }

    const inputLabels = type === '2to4' ? ['A', 'B'] : ['A', 'B', 'C'];

    return (
        <div className="flex flex-col items-center w-full gap-8">
            <div className="flex gap-4">
                <button 
                    className={cn("px-4 py-2 text-sm font-bold rounded-md transition-all border", type === '2to4' ? "bg-[#235347] text-white border-[#235347]" : "bg-white text-slate-500 hover:text-slate-700")}
                    onClick={() => handleTypeChange('2to4')}
                >
                    2-to-4 Decoder
                </button>
                <button 
                    className={cn("px-4 py-2 text-sm font-bold rounded-md transition-all border", type === '3to8' ? "bg-[#235347] text-white border-[#235347]" : "bg-white text-slate-500 hover:text-slate-700")}
                    onClick={() => handleTypeChange('3to8')}
                >
                    3-to-8 Decoder
                </button>
            </div>

            <div className="flex items-center justify-center gap-8 w-full">
                {/* Inputs */}
                <div className="flex flex-col gap-4">
                    {inputs.map((val, i) => (
                        <div key={`in-${i}`} className="flex items-center gap-3">
                            <span className="font-bold text-[#051F20] w-4 text-right">{inputLabels[i]}</span>
                            <button
                                onClick={() => handleInputClick(i)}
                                className={cn(
                                    "w-12 h-12 flex items-center justify-center text-xl font-bold font-mono rounded-lg border-2 transition-all shadow-sm",
                                    val === 1 ? "bg-[#DAF1DE] border-[#235347] text-[#235347]" : "bg-white border-slate-300 text-slate-400"
                                )}
                            >
                                {val}
                            </button>
                            <ArrowRight className="text-slate-300 w-5 h-5" />
                        </div>
                    ))}
                </div>

                {/* Decoder Chip */}
                <div className="w-48 bg-[#051F20] rounded-xl shadow-lg border-4 border-slate-700 flex flex-col items-center justify-center py-12 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-slate-700 rounded-b-full"></div>
                    <Cpu className="w-12 h-12 text-[#DAF1DE] mb-2 opacity-50" />
                    <span className="text-white font-mono font-bold tracking-widest">{type === '2to4' ? '2x4' : '3x8'} DECODER</span>
                </div>

                {/* Outputs */}
                <div className="flex flex-col gap-2">
                    {Array.from({length: numOutputs}).map((_, i) => (
                        <div key={`out-${i}`} className="flex items-center gap-3">
                            <ArrowRight className={cn("w-5 h-5 transition-colors", activeOutput === i ? "text-[#235347]" : "text-slate-300")} />
                            <div
                                className={cn(
                                    "w-12 h-10 flex items-center justify-center text-lg font-bold font-mono rounded-lg border-2 transition-all shadow-sm",
                                    activeOutput === i ? "bg-[#235347] border-[#163832] text-white ring-4 ring-[#DAF1DE]" : "bg-white border-slate-300 text-slate-400"
                                )}
                            >
                                {activeOutput === i ? 1 : 0}
                            </div>
                            <span className={cn("font-bold w-6", activeOutput === i ? "text-[#235347]" : "text-slate-400")}>D{i}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#DAF1DE]/30 p-4 rounded-xl border border-[#DAF1DE] w-full max-w-2xl text-center text-sm text-[#163832]">
                <p><strong>Çalışma Mantığı:</strong> Decoder (Kod Çözücü), <span className="font-mono bg-white px-1 border rounded">{inputs.join('')}</span> binary girişini okur ve ondalık (decimal) karşılığı olan <strong>D{activeOutput}</strong> çıkışını aktif (1) yapar. Diğer tüm çıkışlar 0 kalır.</p>
            </div>
        </div>
    );
};
