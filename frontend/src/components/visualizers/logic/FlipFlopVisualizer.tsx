"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type DeviceType = "SR_LATCH" | "D_LATCH" | "D_FF";

export function FlipFlopVisualizer() {
    const [deviceType, setDeviceType] = useState<DeviceType>("D_FF");

    // Inputs
    const [s, setS] = useState<number>(0);
    const [r, setR] = useState<number>(0);
    const [d, setD] = useState<number>(0);
    const [clk, setClk] = useState<number>(0);
    const [en, setEn] = useState<number>(1); // For D FF with enable

    // State
    const [q, setQ] = useState<number>(0);
    const [prevClk, setPrevClk] = useState<number>(0);
    const [invalidState, setInvalidState] = useState<boolean>(false);

    // Simulation Engine
    useEffect(() => {
        let newQ = q;
        let invalid = false;

        if (deviceType === "SR_LATCH") {
            // Asynchronous SR Latch (NOR based usually, but simple logic here)
            // S=1, R=0 -> Q=1
            // S=0, R=1 -> Q=0
            // S=0, R=0 -> Hold
            // S=1, R=1 -> Invalid
            if (s === 1 && r === 1) {
                invalid = true;
                newQ = 0; // Both Q and Q' go to 0 in NOR latch, causing issues
            } else if (s === 1 && r === 0) {
                newQ = 1;
            } else if (s === 0 && r === 1) {
                newQ = 0;
            }
        } 
        else if (deviceType === "D_LATCH") {
            // Level triggered D Latch (Transparent when CLK=1)
            if (clk === 1) {
                newQ = d;
            }
        } 
        else if (deviceType === "D_FF") {
            // Positive Edge Triggered D Flip-Flop
            if (prevClk === 0 && clk === 1) {
                if (en === 1) {
                    newQ = d;
                }
            }
        }

        setQ(newQ);
        setInvalidState(invalid);
        setPrevClk(clk);
    }, [s, r, d, clk, en, deviceType]); // Re-evaluate on input change

    // Pulse function for clock
    const handlePulse = () => {
        setClk(1);
        setTimeout(() => setClk(0), 300); // 300ms pulse
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar Controls */}
            <div className="w-full md:w-64 bg-[#F2F7F4] border-r border-[#DAF1DE] p-6 flex flex-col gap-6">
                <div>
                    <h3 className="text-sm font-bold text-[#163832] mb-3 uppercase tracking-wider">Devre Tipi</h3>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => setDeviceType("SR_LATCH")} className={cn("px-4 py-2 text-sm font-bold rounded-lg text-left transition-colors border", deviceType === "SR_LATCH" ? "bg-[#235347] text-white border-[#235347]" : "bg-white text-slate-600 hover:border-[#235347]")}>SR Latch (Asenkron)</button>
                        <button onClick={() => setDeviceType("D_LATCH")} className={cn("px-4 py-2 text-sm font-bold rounded-lg text-left transition-colors border", deviceType === "D_LATCH" ? "bg-[#235347] text-white border-[#235347]" : "bg-white text-slate-600 hover:border-[#235347]")}>D Latch (Level-Triggered)</button>
                        <button onClick={() => setDeviceType("D_FF")} className={cn("px-4 py-2 text-sm font-bold rounded-lg text-left transition-colors border", deviceType === "D_FF" ? "bg-[#235347] text-white border-[#235347]" : "bg-white text-slate-600 hover:border-[#235347]")}>D Flip-Flop (Edge-Triggered)</button>
                    </div>
                </div>

                <div className="h-[1px] bg-[#DAF1DE] w-full" />

                <div>
                    <h3 className="text-sm font-bold text-[#163832] mb-3 uppercase tracking-wider">Giriş Sinyalleri (Inputs)</h3>
                    
                    {deviceType === "SR_LATCH" && (
                        <div className="flex flex-col gap-3">
                            <button onClick={() => setS(s ^ 1)} className={cn("px-4 py-2 rounded-lg font-bold border transition-colors flex justify-between", s ? "bg-green-100 border-green-500 text-green-700" : "bg-white text-slate-500 hover:bg-slate-50")}>
                                <span>Set (S)</span>
                                <span>{s}</span>
                            </button>
                            <button onClick={() => setR(r ^ 1)} className={cn("px-4 py-2 rounded-lg font-bold border transition-colors flex justify-between", r ? "bg-red-100 border-red-500 text-red-700" : "bg-white text-slate-500 hover:bg-slate-50")}>
                                <span>Reset (R)</span>
                                <span>{r}</span>
                            </button>
                        </div>
                    )}

                    {(deviceType === "D_LATCH" || deviceType === "D_FF") && (
                        <div className="flex flex-col gap-3">
                            <button onClick={() => setD(d ^ 1)} className={cn("px-4 py-2 rounded-lg font-bold border transition-colors flex justify-between", d ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-white text-slate-500 hover:bg-slate-50")}>
                                <span>Data (D)</span>
                                <span>{d}</span>
                            </button>
                            
                            {deviceType === "D_FF" && (
                                <button onClick={() => setEn(en ^ 1)} className={cn("px-4 py-2 rounded-lg font-bold border transition-colors flex justify-between", en ? "bg-purple-100 border-purple-500 text-purple-700" : "bg-white text-slate-500 hover:bg-slate-50")}>
                                    <span>Enable (EN)</span>
                                    <span>{en}</span>
                                </button>
                            )}
                            
                            <div className="mt-2 p-3 bg-white rounded-lg border border-slate-200">
                                <div className="text-xs font-semibold text-slate-500 mb-2">Clock Signal (CLK)</div>
                                <div className="flex gap-2">
                                    <button onClick={() => setClk(clk ^ 1)} className={cn("flex-1 py-2 rounded font-bold border transition-colors", clk ? "bg-amber-100 border-amber-500 text-amber-700" : "bg-slate-50 text-slate-600 hover:bg-slate-100")}>
                                        {clk === 1 ? "Yüksek (1)" : "Düşük (0)"}
                                    </button>
                                    <button onClick={handlePulse} className="px-3 py-2 bg-slate-800 text-white font-bold rounded hover:bg-slate-700" title="Pulse (0 -> 1 -> 0)">
                                        ⍙
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Visualizer Area */}
            <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
                
                {invalidState && (
                    <div className="absolute top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="font-bold">Geçersiz Durum (Invalid State)!</p>
                            <p className="text-sm">SR Latch'te hem Set hem de Reset aynı anda 1 olamaz.</p>
                        </div>
                    </div>
                )}

                <div className="relative w-80 h-80 flex items-center justify-center">
                    {/* Device Box */}
                    <div className={cn("w-48 h-56 bg-white border-4 rounded-xl flex flex-col justify-between p-4 relative z-10 shadow-lg transition-colors", invalidState ? "border-red-500" : "border-[#163832]")}>
                        <div className="text-center font-black text-xl text-[#163832] mt-2">
                            {deviceType === "SR_LATCH" ? "SR Latch" : deviceType === "D_LATCH" ? "D Latch" : "D Flip-Flop"}
                        </div>

                        {/* Input Pins */}
                        <div className="absolute left-[-24px] top-0 bottom-0 flex flex-col justify-around py-4">
                            {deviceType === "SR_LATCH" && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-8 h-1", s ? "bg-green-500" : "bg-slate-300")} />
                                        <span className="font-bold text-sm">S</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-8 h-1", r ? "bg-red-500" : "bg-slate-300")} />
                                        <span className="font-bold text-sm">R</span>
                                    </div>
                                </>
                            )}
                            {(deviceType === "D_LATCH" || deviceType === "D_FF") && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-8 h-1", d ? "bg-blue-500" : "bg-slate-300")} />
                                        <span className="font-bold text-sm">D</span>
                                    </div>
                                    
                                    {/* Clock Pin (Triangle for Edge triggered) */}
                                    <div className="flex items-center gap-2 relative">
                                        <div className={cn("w-8 h-1", clk ? "bg-amber-500" : "bg-slate-300")} />
                                        {deviceType === "D_FF" ? (
                                            <div className="absolute right-[-10px] w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#163832] border-b-[8px] border-b-transparent" />
                                        ) : (
                                            <span className="font-bold text-sm">C</span>
                                        )}
                                    </div>

                                    {deviceType === "D_FF" && (
                                        <div className="flex items-center gap-2 mt-4">
                                            <div className={cn("w-8 h-1", en ? "bg-purple-500" : "bg-slate-300")} />
                                            <span className="font-bold text-sm text-xs">EN</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Output Pins */}
                        <div className="absolute right-[-24px] top-0 bottom-0 flex flex-col justify-around py-4">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm">Q</span>
                                <div className={cn("w-8 h-1", invalidState ? "bg-red-500" : (q ? "bg-green-500" : "bg-slate-300"))} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm line-through">Q</span>
                                <div className="relative">
                                    <div className="absolute -left-3 top-[-4px] w-3 h-3 rounded-full border-2 border-[#163832] bg-white z-20" />
                                    <div className={cn("w-8 h-1", invalidState ? "bg-red-500" : (!q ? "bg-green-500" : "bg-slate-300"))} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-8 text-center bg-slate-50 p-4 rounded-xl border w-full max-w-md">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Çıkış Durumu (State)</div>
                    <div className="flex justify-around items-center">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black text-[#163832]">{invalidState ? "0" : q}</span>
                            <span className="text-xs font-bold text-slate-500">Q (Normal)</span>
                        </div>
                        <div className="w-px h-10 bg-slate-200" />
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black text-[#163832]">{invalidState ? "0" : (q === 1 ? 0 : 1)}</span>
                            <span className="text-xs font-bold text-slate-500">Q' (Inverted)</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
