"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";

interface TimeTravelControlsProps {
    currentStep: number;
    totalSteps: number;
    onStepChange: (step: number) => void;
    isPlaying?: boolean;
    onPlayToggle?: (playing: boolean) => void;
    extraInfo?: React.ReactNode;
}

export const TimeTravelControls: React.FC<TimeTravelControlsProps> = ({
    currentStep,
    totalSteps,
    onStepChange,
    isPlaying: externalIsPlaying,
    onPlayToggle,
    extraInfo,
}) => {
    const [internalPlaying, setInternalPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1200); // Milisaniye cinsinden hız

    const isPlaying = externalIsPlaying !== undefined ? externalIsPlaying : internalPlaying;

    const setPlaying = (val: boolean) => {
        setInternalPlaying(val);
        if (onPlayToggle) onPlayToggle(val);
    };

    // Otomatik oynatma döngüsü
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying) {
            timer = setInterval(() => {
                if (currentStep < totalSteps - 1) {
                    onStepChange(currentStep + 1);
                } else {
                    setPlaying(false);
                }
            }, playbackSpeed);
        }
        return () => clearInterval(timer);
    }, [isPlaying, currentStep, totalSteps, playbackSpeed]);

    return (
        <div className="flex flex-col gap-3 p-4 bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl shadow-md">
            {/* İlerleme Kaydırıcısı (Slider) */}
            <div className="flex items-center gap-4">
                <div className="flex flex-col text-right w-20">
                    <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">
                        Adım {currentStep + 1} / {Math.max(totalSteps, 1)}
                    </span>
                    {extraInfo && (
                        <span className="text-[10px] font-bold text-amber-600 whitespace-nowrap">
                            {extraInfo}
                        </span>
                    )}
                </div>
                <Slider
                    value={[currentStep]}
                    max={Math.max(totalSteps - 1, 0)}
                    step={1}
                    onValueChange={(val: any) => onStepChange(Array.isArray(val) ? val[0] : val)}
                    className="flex-1 cursor-pointer"
                />
            </div>

            {/* Kontrol Butonları */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <div className="flex items-center gap-2">
                    {/* Başa Dön */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            setPlaying(false);
                            onStepChange(0);
                        }}
                        disabled={currentStep === 0}
                        className="text-[#051F20] hover:bg-[#DAF1DE]/60 rounded-lg transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </Button>

                    {/* Bir Adım Geri */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            setPlaying(false);
                            if (currentStep > 0) onStepChange(currentStep - 1);
                        }}
                        disabled={currentStep === 0}
                        className="text-[#051F20] hover:bg-[#DAF1DE]/60 rounded-lg transition-colors"
                    >
                        <SkipBack className="w-4 h-4" />
                    </Button>

                    {/* Oynat / Duraklat */}
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => setPlaying(!isPlaying)}
                        className="bg-[#235347] hover:bg-[#163832] text-white px-4 font-semibold shadow-sm rounded-lg transition-all"
                    >
                        {isPlaying ? (
                            <>
                                <Pause className="w-4 h-4 mr-1" /> Duraklat
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4 mr-1" /> Oynat
                            </>
                        )}
                    </Button>

                    {/* Bir Adım İleri */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            setPlaying(false);
                            if (currentStep < totalSteps - 1) onStepChange(currentStep + 1);
                        }}
                        disabled={currentStep >= totalSteps - 1}
                        className="text-[#051F20] hover:bg-[#DAF1DE]/60 rounded-lg transition-colors"
                    >
                        <SkipForward className="w-4 h-4" />
                    </Button>
                </div>

                {/* Hız Seçici */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#051F20]">
                    <span>Hız:</span>
                    <select
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                        className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm font-medium text-[#051F20] outline-none focus:border-[#235347] focus:ring-2 focus:ring-[#235347]/20 transition-shadow"
                    >
                        <option value={2000}>0.5x</option>
                        <option value={1200}>1.0x</option>
                        <option value={600}>2.0x</option>
                    </select>
                </div>
            </div>
        </div>
    );
};