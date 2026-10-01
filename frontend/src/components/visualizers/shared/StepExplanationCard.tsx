"use client";

import React from "react";
import { MathFormula } from "./MathFormula";
import { BookOpen, AlertCircle } from "lucide-react";

interface StepExplanationCardProps {
    title: string;
    explanation: string;
    latexAnnotation?: string;
}

export const StepExplanationCard: React.FC<StepExplanationCardProps> = ({
    title,
    explanation,
    latexAnnotation
}) => {
    return (
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <BookOpen className="w-5 h-5 text-[#235347]" />
                <h3 className="text-lg font-bold text-[#051F20]">{title}</h3>
            </div>
            
            <p className="text-[#051F20]/80 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {explanation}
            </p>

            {latexAnnotation && (
                <div className="mt-2 p-3 bg-[#DAF1DE]/30 rounded-lg flex items-center justify-center border border-[#8EB69B]/40">
                    <MathFormula math={latexAnnotation} block={true} className="text-[#051F20]" />
                </div>
            )}
            
            <div className="mt-1 flex items-start gap-2 text-xs font-medium text-[#051F20] bg-[#F4F7F5] border border-[#8EB69B]/20 p-2 rounded">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#235347]" />
                <span>
                    <strong>ODTÜ Notu:</strong> Bu adım, Deterministic Compute Engine tarafından üretilmiş ve pedagojik olarak etiketlenmiştir.
                </span>
            </div>
        </div>
    );
};
