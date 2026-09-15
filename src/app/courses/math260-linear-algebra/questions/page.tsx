"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import math260QuestionsData from "@/content/math260/questions.json";
import { Math260Question, Math260TopicName } from "@/lib/types/math260";
import { Button } from "@/components/ui/button";
import { MathFormula } from "@/components/visualizers/shared/MathFormula";
import { BookOpen, Target, Filter, ChevronRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const allTopics: Math260TopicName[] = [
    "Parametric Linear Systems & RREF",
    "Matrix Inverses & Elementary Matrices",
    "Homogeneous Systems & Free Variables",
    "Linear Independence & Span",
    "Matrix Equations & Invertibility Theorems"
];

const questions = math260QuestionsData as Math260Question[];

export default function Math260QuestionsHubPage() {
    const router = useRouter();
    
    const [selectedTopic, setSelectedTopic] = useState<Math260TopicName | "All">("All");
    const [expandedSolutionId, setExpandedSolutionId] = useState<string | null>(null);

    const filteredQuestions = questions.filter(q => {
        if (selectedTopic !== "All" && q.topic !== selectedTopic) return false;
        return true;
    });

    const handleSolveInVisualizer = (question: Math260Question) => {
        const stateStr = JSON.stringify(question.initialMatrix);
        const encodedState = encodeURIComponent(stateStr);
        router.push(`/courses/math260-linear-algebra/matrix-elimination?qstate=${encodedState}`);
    };

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-6 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col gap-6">
                
                {/* Header */}
                <header className="border-b border-slate-200 pb-4 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-3 text-[#051F20] mb-2">
                            <GraduationCap className="w-8 h-8" />
                            <h1 className="text-2xl font-bold tracking-tight text-[#051F20]">MATH 260</h1>
                        </div>
                        <h2 className="text-sm font-medium text-[#235347] flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> 
                            ODTÜ Midterm 1 Soru Havuzu
                        </h2>
                    </div>
                    <Link href={`/courses/math260-linear-algebra`}>
                        <Button variant="ghost" className="text-[#051F20] hover:bg-slate-100">
                            Derse Dön
                        </Button>
                    </Link>
                </header>

                {/* Topic Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button 
                        className={cn(
                            "shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                            selectedTopic === "All" 
                                ? "bg-[#235347] text-white border-[#235347] shadow-sm" 
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-[#051F20]"
                        )}
                        onClick={() => setSelectedTopic("All")}
                    >
                        Tümü
                    </button>
                    {allTopics.map(t => (
                        <button 
                            key={t}
                            className={cn(
                                "shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                                selectedTopic === t 
                                    ? "bg-[#235347] text-white border-[#235347] shadow-sm" 
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-[#051F20]"
                            )}
                            onClick={() => setSelectedTopic(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-6">
                    {/* Questions List */}
                    <div className="flex-1 flex flex-col gap-6">
                        {filteredQuestions.length === 0 ? (
                            <div className="bg-white border border-slate-200/80 p-8 rounded-xl shadow-sm text-center">
                                <Target className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                                <h3 className="text-lg font-medium text-[#051F20] mb-1">Soru Bulunamadı</h3>
                                <p className="text-slate-500 text-sm">Seçili konuya uygun ODTÜ sınav sorusu bulunmuyor.</p>
                            </div>
                        ) : (
                            filteredQuestions.map(q => (
                                <div key={q.id} className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-sm flex flex-col gap-4 transition-all hover:border-slate-300">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex flex-col gap-1 w-full">
                                            <div className="flex justify-between items-center gap-2 flex-wrap mb-2">
                                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
                                                    🎓 {q.sourceExam}
                                                </span>
                                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#DAF1DE] text-[#051F20] border border-[#8EB69B]/40">
                                                    {q.topic}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-medium text-[#051F20] mt-2 leading-relaxed">
                                                {q.questionText}
                                            </h3>
                                            
                                            {q.subParts && q.subParts.length > 0 && (
                                                <div className="mt-3 flex flex-col gap-2 text-sm text-[#051F20] bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    {q.subParts.map((sq, idx) => (
                                                        <p key={idx} className="leading-relaxed">{sq}</p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {q.latexFormula && (
                                        <div className="bg-[#F2F7F4] p-4 rounded-xl border border-[#8EB69B]/30 flex justify-center overflow-x-auto text-[#051F20] my-2 shadow-inner">
                                            <MathFormula math={q.latexFormula} block={true} />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-2">
                                        <button 
                                            onClick={() => setExpandedSolutionId(expandedSolutionId === q.id ? null : q.id)}
                                            className="text-sm font-semibold text-[#235347] hover:text-[#163832] transition-colors flex items-center gap-2"
                                        >
                                            {expandedSolutionId === q.id ? "Çözümü Gizle" : "Adım Adım Çözümü Göster"}
                                        </button>
                                        
                                        {q.canVisualize && (
                                            <Button 
                                                onClick={() => handleSolveInVisualizer(q)}
                                                className="bg-[#235347] hover:bg-[#163832] text-white font-medium text-sm rounded-lg shadow-sm transition-all flex items-center gap-2 px-5"
                                            >
                                                Görselleştiricide Çöz <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>

                                    {/* Solutions Drawer */}
                                    {expandedSolutionId === q.id && q.stepByStepSolution && q.stepByStepSolution.length > 0 && (
                                        <div className="bg-[#F4F7F5] border border-slate-200 rounded-xl p-5 flex flex-col gap-5 mt-3 shadow-sm">
                                            <h4 className="text-xs font-bold text-[#163832] uppercase tracking-wider border-b border-slate-200 pb-2">Çözüm Adımları</h4>
                                            {q.stepByStepSolution.map((step) => (
                                                <div key={step.stepNumber} className="flex items-start gap-4 text-sm bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                                                    <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#DAF1DE] text-[#235347] font-bold text-xs border border-[#8EB69B]/40 shadow-sm mt-0.5">
                                                        {step.stepNumber}
                                                    </span>
                                                    <div className="flex flex-col gap-2 text-[#051F20] w-full">
                                                        <div className="flex flex-col gap-1.5">
                                                            <div className="font-semibold text-[#163832] flex items-center gap-2">
                                                                Operasyon: <span className="font-normal bg-slate-50 px-2 py-0.5 rounded border border-slate-100"><MathFormula math={step.operation} /></span>
                                                            </div>
                                                            <p className="text-slate-600 leading-relaxed">{step.explanation}</p>
                                                        </div>
                                                        {step.resultingMatrix && (
                                                            <div className="mt-2 bg-[#F9FAF9] p-3 rounded-lg border border-slate-100 flex justify-center">
                                                                <MathFormula math={step.resultingMatrix} block={true} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
