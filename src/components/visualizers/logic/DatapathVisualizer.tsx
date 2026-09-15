"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Database, Settings, Activity, Cpu } from "lucide-react";

export function DatapathVisualizer() {
    // Datapath state
    const [r1, setR1] = useState<number>(0);
    const [r2, setR2] = useState<number>(0);
    const [dataIn, setDataIn] = useState<number>(5); // Default input
    const [operation, setOperation] = useState<"ADD" | "SUB">("ADD");

    // FSM State
    // S0: Idle (Wait for START)
    // S1: LOAD_R1 (Load DataIn to R1)
    // S2: LOAD_R2 (Load DataIn to R2)
    // S3: EXECUTE (Add or Sub based on SUBTRACT pin)
    // S4: DONE (Hold Result)
    const [state, setState] = useState<"S0" | "S1" | "S2" | "S3" | "S4">("S0");

    // Control Signals
    const [ctrl, setCtrl] = useState({
        RST: 0,
        LOAD_R1: 0,
        LOAD_R2: 0,
        ADD_SUB: 0 // 0: Add, 1: Sub
    });

    const stepClock = () => {
        if (state === "S0") {
            // Move to S1, assert LOAD_R1
            setState("S1");
            setCtrl({ RST: 0, LOAD_R1: 1, LOAD_R2: 0, ADD_SUB: operation === "SUB" ? 1 : 0 });
            setR1(dataIn);
        } else if (state === "S1") {
            // Move to S2, assert LOAD_R2
            setState("S2");
            setCtrl({ RST: 0, LOAD_R1: 0, LOAD_R2: 1, ADD_SUB: operation === "SUB" ? 1 : 0 });
            setR2(dataIn);
        } else if (state === "S2") {
            // Move to S3, assert LOAD_R1 again to save ALU output
            setState("S3");
            setCtrl({ RST: 0, LOAD_R1: 1, LOAD_R2: 0, ADD_SUB: operation === "SUB" ? 1 : 0 });
            if (operation === "ADD") {
                setR1(r1 + r2);
            } else {
                setR1(r1 - r2);
            }
        } else if (state === "S3") {
            // Move to S4
            setState("S4");
            setCtrl({ RST: 0, LOAD_R1: 0, LOAD_R2: 0, ADD_SUB: 0 });
        } else if (state === "S4") {
            // Reset back to S0
            setState("S0");
            setCtrl({ RST: 1, LOAD_R1: 0, LOAD_R2: 0, ADD_SUB: 0 });
            setR1(0);
            setR2(0);
        }
    };

    const getStateDescription = () => {
        switch (state) {
            case "S0": return "S0 (IDLE): Başlamak için bekliyor. RST=1 yapılabilir.";
            case "S1": return "S1 (YÜKLE R1): Veriyolu girişindeki data R1'e kopyalanır.";
            case "S2": return "S2 (YÜKLE R2): Veriyolu girişindeki yeni data R2'ye kopyalanır.";
            case "S3": return "S3 (İŞLEM YAP): ALU R1 ve R2'yi toplar/çıkarır ve sonucu tekrar R1'e yazar.";
            case "S4": return "S4 (BİTİŞ): İşlem tamamlandı. Sonuç R1'de (DataOut).";
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col xl:flex-row">
            
            {/* Control Unit (FSM) */}
            <div className="w-full xl:w-96 bg-[#F2F7F4] border-r border-[#DAF1DE] p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-6 text-[#163832]">
                    <Settings className="w-6 h-6" />
                    <h3 className="text-lg font-black uppercase tracking-wider">Control Unit (FSM)</h3>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border">
                        <span className="text-xs font-bold text-slate-500 uppercase">Mevcut State (Durum)</span>
                        <div className="text-3xl font-black text-[#235347] my-1">{state}</div>
                        <p className="text-xs text-slate-600 font-medium">{getStateDescription()}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border">
                        <span className="text-xs font-bold text-slate-500 uppercase mb-2 block">Kontrol Sinyalleri (Çıkışlar)</span>
                        <div className="grid grid-cols-2 gap-2 text-sm font-bold">
                            <div className={cn("p-2 rounded border text-center transition-colors", ctrl.RST ? "bg-red-100 text-red-700 border-red-200" : "bg-slate-50 text-slate-400")}>RST: {ctrl.RST}</div>
                            <div className={cn("p-2 rounded border text-center transition-colors", ctrl.LOAD_R1 ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-slate-50 text-slate-400")}>LOAD_R1: {ctrl.LOAD_R1}</div>
                            <div className={cn("p-2 rounded border text-center transition-colors", ctrl.LOAD_R2 ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-slate-50 text-slate-400")}>LOAD_R2: {ctrl.LOAD_R2}</div>
                            <div className={cn("p-2 rounded border text-center transition-colors", ctrl.ADD_SUB ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-slate-50 text-slate-400")}>ADD/SUB: {ctrl.ADD_SUB}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex flex-col gap-3">
                    <div className="flex gap-2 items-center mb-2">
                        <span className="text-sm font-bold text-slate-600">Giriş Verisi (DataIn):</span>
                        <input 
                            type="number" 
                            value={dataIn} 
                            onChange={(e) => setDataIn(Number(e.target.value))}
                            className="border rounded px-2 py-1 w-20 text-center font-bold"
                            disabled={state !== "S0" && state !== "S1"}
                        />
                    </div>
                    
                    {state === "S0" && (
                        <div className="flex gap-2">
                            <button onClick={() => setOperation("ADD")} className={cn("flex-1 py-2 rounded-lg font-bold border transition-colors", operation === "ADD" ? "bg-amber-500 text-white border-amber-600" : "bg-white text-slate-600")}>TOPLA</button>
                            <button onClick={() => setOperation("SUB")} className={cn("flex-1 py-2 rounded-lg font-bold border transition-colors", operation === "SUB" ? "bg-amber-500 text-white border-amber-600" : "bg-white text-slate-600")}>ÇIKAR</button>
                        </div>
                    )}

                    <button onClick={stepClock} className="w-full py-3 bg-[#163832] hover:bg-[#051F20] text-white font-black text-lg rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors mt-2">
                        <Activity className="w-5 h-5" />
                        {state === "S4" ? "SİSTEMİ SIFIRLA" : "CLOCK (Adım İlerle)"}
                    </button>
                </div>
            </div>

            {/* Datapath */}
            <div className="flex-1 bg-slate-50 p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">
                
                <div className="flex items-center gap-2 mb-8 text-[#163832] absolute top-8 left-8">
                    <Database className="w-6 h-6" />
                    <h3 className="text-lg font-black uppercase tracking-wider">Datapath (Veriyolu)</h3>
                </div>

                {/* DataBus Line */}
                <div className="absolute top-28 left-8 right-8 h-2 bg-blue-200 flex items-center">
                    <div className="absolute -top-6 left-10 font-bold text-blue-600">DataIn Bus</div>
                    <div className="absolute right-0 w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-blue-200 border-b-[6px] border-b-transparent" />
                </div>

                <div className="flex w-full max-w-2xl justify-between relative mt-20">
                    
                    {/* Register 1 */}
                    <div className="flex flex-col items-center gap-2">
                        {/* Load wire */}
                        <div className={cn("h-10 w-1 transition-colors", ctrl.LOAD_R1 ? "bg-blue-500" : "bg-slate-300")} />
                        <div className={cn(
                            "w-32 h-24 border-4 rounded-xl flex flex-col items-center justify-center relative shadow-sm transition-all duration-300",
                            ctrl.LOAD_R1 ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-white"
                        )}>
                            <span className="absolute top-2 text-xs font-bold text-slate-400">REGISTER 1</span>
                            <span className="text-3xl font-black text-[#163832]">{r1}</span>
                            
                            {/* Control Signal indicator */}
                            {ctrl.LOAD_R1 === 1 && <span className="absolute -right-2 -top-2 w-4 h-4 bg-blue-500 rounded-full animate-ping" />}
                        </div>
                        {/* Output wire to ALU */}
                        <div className="h-16 w-1 bg-slate-600" />
                    </div>

                    {/* ALU */}
                    <div className="flex flex-col items-center mt-24">
                        <div className="relative w-48 h-32 flex items-center justify-center">
                            {/* ALU Shape (Trapezoid using SVG or CSS borders) */}
                            <svg className="absolute inset-0 w-full h-full text-[#235347] drop-shadow-md" viewBox="0 0 200 120" preserveAspectRatio="none">
                                <polygon points="0,0 80,0 100,30 120,0 200,0 160,120 40,120" fill="currentColor" />
                            </svg>
                            <div className="z-10 text-white flex flex-col items-center">
                                <span className="font-bold text-sm opacity-80">ALU</span>
                                <span className="font-black text-2xl">{ctrl.ADD_SUB === 0 ? "A + B" : "A - B"}</span>
                            </div>

                            {/* Control signal to ALU */}
                            <div className={cn("absolute -left-12 top-1/2 w-12 h-1 transition-colors", ctrl.ADD_SUB ? "bg-amber-500" : "bg-slate-300")} />
                            <span className="absolute -left-20 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">ADD/SUB</span>
                        </div>
                        
                        {/* ALU Output wire (Loops back to R1) */}
                        <div className="h-20 w-1 bg-green-500 relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-green-700 whitespace-nowrap">Result: {ctrl.ADD_SUB === 0 ? r1 + r2 : r1 - r2}</span>
                        </div>
                        <div className="w-[calc(50%+4rem)] h-1 bg-green-500 absolute bottom-12 right-1/2" />
                        <div className="w-1 h-80 bg-green-500 absolute bottom-12 left-12" />
                        <div className="w-32 h-1 bg-green-500 absolute top-32 left-12" />
                        <ArrowRight className="w-5 h-5 text-green-500 absolute top-[122px] left-[165px]" />
                    </div>

                    {/* Register 2 */}
                    <div className="flex flex-col items-center gap-2">
                        {/* Load wire */}
                        <div className={cn("h-10 w-1 transition-colors", ctrl.LOAD_R2 ? "bg-purple-500" : "bg-slate-300")} />
                        <div className={cn(
                            "w-32 h-24 border-4 rounded-xl flex flex-col items-center justify-center relative shadow-sm transition-all duration-300",
                            ctrl.LOAD_R2 ? "border-purple-500 bg-purple-50" : "border-slate-300 bg-white"
                        )}>
                            <span className="absolute top-2 text-xs font-bold text-slate-400">REGISTER 2</span>
                            <span className="text-3xl font-black text-[#163832]">{r2}</span>
                            
                            {/* Control Signal indicator */}
                            {ctrl.LOAD_R2 === 1 && <span className="absolute -right-2 -top-2 w-4 h-4 bg-purple-500 rounded-full animate-ping" />}
                        </div>
                        {/* Output wire to ALU */}
                        <div className="h-16 w-1 bg-slate-600" />
                    </div>

                </div>

            </div>
        </div>
    );
}
