"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sampleQuestions } from "@/content/sampleQuestions";
import { Difficulty, ExamType, Question } from "@/lib/types/questions";
import { Button } from "@/components/ui/button";
import { MathFormula } from "@/components/visualizers/shared/MathFormula";
import { BookOpen, Target, Filter, ChevronRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const difficulties: Difficulty[] = ["Easy", "Medium", "Hard", "Exam Standard"];
const examTypes: ExamType[] = ["Quiz", "Midterm 1", "Midterm 2", "Final"];

export default function QuestionsHubPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    
    // Convert courseId from url (e.g. cng213-data-structures) to CourseCode (CNG213)
    const courseCode = courseId.split("-")[0].toUpperCase();
    
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "All">("All");
    const [selectedExamType, setSelectedExamType] = useState<ExamType | "All">("All");
    
    const [expandedHintId, setExpandedHintId] = useState<string | null>(null);

    const questions = sampleQuestions.filter(q => q.courseCode === courseCode);
    const filteredQuestions = questions.filter(q => {
        if (selectedDifficulty !== "All" && q.difficulty !== selectedDifficulty) return false;
        if (selectedExamType !== "All" && q.examType !== selectedExamType) return false;
        return true;
    });

    const handleSolveInVisualizer = (question: Question) => {
        const stateStr = JSON.stringify(question.initialState);
        const encodedState = encodeURIComponent(stateStr);
        router.push(`${question.visualizerUrl}?qstate=${encodedState}`);
    };

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-6 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col gap-6">
                
                {/* Header */}
                <header className="border-b border-slate-200 pb-4 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-3 text-[#051F20] mb-2">
                            <GraduationCap className="w-8 h-8" />
                            <h1 className="text-2xl font-bold tracking-tight text-[#051F20]">{courseCode}</h1>
                        </div>
                        <h2 className="text-sm font-medium text-[#235347] flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> 
                            Soru Havuzu ve Sınav Pratiği
                        </h2>
                    </div>
                    <Link href={`/courses/${courseId}`}>
                        <Button variant="ghost" className="text-[#051F20] hover:bg-slate-100">
                            Derse Dön
                        </Button>
                    </Link>
                </header>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters Sidebar */}
                    <div className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
                        <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm">
                            <h3 className="font-bold text-[#163832] mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Filter className="w-4 h-4 text-[#235347]" />
                                Filtreler
                            </h3>
                            
                            <div className="mb-4">
                                <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase">Zorluk Seviyesi</h4>
                                <div className="flex flex-col gap-1">
                                    <button 
                                        className={cn("text-left px-3 py-1.5 rounded-lg text-sm transition-all", selectedDifficulty === "All" ? "bg-[#DAF1DE] text-[#235347] font-medium" : "hover:bg-slate-50 text-[#051F20]")}
                                        onClick={() => setSelectedDifficulty("All")}
                                    >
                                        Tümü
                                    </button>
                                    {difficulties.map(d => (
                                        <button 
                                            key={d}
                                            className={cn("text-left px-3 py-1.5 rounded-lg text-sm transition-all", selectedDifficulty === d ? "bg-[#DAF1DE] text-[#235347] font-medium" : "hover:bg-slate-50 text-[#051F20]")}
                                            onClick={() => setSelectedDifficulty(d)}
                                        >
                                            {d === "Easy" ? "Kolay" : d === "Medium" ? "Orta" : "Zor"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase">Sınav Tipi</h4>
                                <div className="flex flex-col gap-1">
                                    <button 
                                        className={cn("text-left px-3 py-1.5 rounded-lg text-sm transition-all", selectedExamType === "All" ? "bg-[#DAF1DE] text-[#235347] font-medium" : "hover:bg-slate-50 text-[#051F20]")}
                                        onClick={() => setSelectedExamType("All")}
                                    >
                                        Tümü
                                    </button>
                                    {examTypes.map(e => (
                                        <button 
                                            key={e}
                                            className={cn("text-left px-3 py-1.5 rounded-lg text-sm transition-all", selectedExamType === e ? "bg-[#DAF1DE] text-[#235347] font-medium" : "hover:bg-slate-50 text-[#051F20]")}
                                            onClick={() => setSelectedExamType(e)}
                                        >
                                            {e}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Questions List */}
                    <div className="flex-1 flex flex-col gap-4">
                        {filteredQuestions.length === 0 ? (
                            <div className="bg-white border border-slate-200/80 p-8 rounded-xl shadow-sm text-center">
                                <Target className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                                <h3 className="text-lg font-medium text-[#051F20] mb-1">Soru Bulunamadı</h3>
                                <p className="text-slate-500 text-sm">Seçili filtrelere uygun soru bulunmuyor.</p>
                            </div>
                        ) : (
                            filteredQuestions.map(q => (
                                <div key={q.id} className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-sm flex flex-col gap-4 transition-all hover:border-slate-300">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                                    {q.examType}
                                                </span>
                                                <span className={cn(
                                                    "text-xs font-semibold px-2 py-0.5 rounded-full border",
                                                    q.difficulty === "Easy" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                    q.difficulty === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                    q.difficulty === "Exam Standard" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                                                    "bg-rose-50 text-rose-700 border-rose-200"
                                                )}>
                                                    {q.difficulty === "Easy" ? "Kolay" : q.difficulty === "Medium" ? "Orta" : q.difficulty === "Exam Standard" ? "Sınav Sorusu" : "Zor"}
                                                </span>
                                                <span className="text-xs font-medium text-slate-400">
                                                    Konu: {q.topic}
                                                </span>
                                                {q.sourceExam && (
                                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#DAF1DE]/50 text-[#235347] border border-[#8EB69B]/40">
                                                        {q.sourceExam}
                                                    </span>
                                                )}
                                            </div>
                                            {q.title && (
                                                <h2 className="text-lg font-bold text-[#051F20] mt-2">{q.title}</h2>
                                            )}
                                            <h3 className={cn("font-medium text-[#051F20] leading-relaxed", q.title ? "text-sm mt-1" : "text-base mt-2")}>
                                                {q.questionText}
                                            </h3>
                                            {q.subQuestions && q.subQuestions.length > 0 && (
                                                <div className="mt-2 flex flex-col gap-1.5 text-sm text-[#051F20] bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                                                    {q.subQuestions.map((sq, idx) => (
                                                        <p key={idx}>{sq}</p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {q.latexMath && (
                                        <div className="bg-[#F2F7F4] p-4 rounded-lg border border-slate-200 flex justify-center overflow-x-auto text-[#051F20]">
                                            <MathFormula math={q.latexMath} block={true} />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                                        <button 
                                            onClick={() => setExpandedHintId(expandedHintId === q.id ? null : q.id)}
                                            className="text-sm font-medium text-[#235347] hover:text-[#163832] transition-colors"
                                        >
                                            {expandedHintId === q.id ? "Gizle" : (q.stepByStepSolution ? "Çözümü Göster" : "Adım Adım İpucu Al")}
                                        </button>
                                        {q.canVisualize !== false && (
                                            <Button 
                                                onClick={() => handleSolveInVisualizer(q)}
                                                className="bg-[#235347] hover:bg-[#163832] text-white font-medium text-sm rounded-lg shadow-sm transition-all flex items-center gap-2"
                                            >
                                                Görselleştiricide Çöz <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>

                                    {/* Hints & Solutions Drawer */}
                                    {expandedHintId === q.id && (
                                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col gap-4 mt-2">
                                            {q.stepByStepSolution && q.stepByStepSolution.length > 0 && (
                                                <div className="flex flex-col gap-2">
                                                    <h4 className="text-xs font-bold text-[#163832] uppercase tracking-wider mb-1">Adım Adım Çözüm</h4>
                                                    {q.stepByStepSolution.map((step, idx) => (
                                                        <div key={`sol-${idx}`} className="flex items-start gap-3 text-sm">
                                                            <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-[#051F20] font-bold text-xs border border-slate-300">
                                                                {idx + 1}
                                                            </span>
                                                            <div className="flex flex-col gap-1 text-[#051F20] pt-0.5">
                                                                <span>{step}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            {q.hints && q.hints.length > 0 && (
                                                <div className="flex flex-col gap-2">
                                                    {q.stepByStepSolution && <div className="h-px w-full bg-slate-200 my-2" />}
                                                    <h4 className="text-xs font-bold text-[#235347] uppercase tracking-wider mb-1">İpuçları</h4>
                                                    {q.hints.map((hint, idx) => {
                                                        const isString = typeof hint === 'string';
                                                        const stepNum = isString ? idx + 1 : hint.step;
                                                        const hintText = isString ? hint : hint.text;
                                                        const hintMath = isString ? null : hint.latexMath;
                                                        
                                                        return (
                                                            <div key={`hint-${idx}`} className="flex items-start gap-3 text-sm">
                                                                <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#DAF1DE] text-[#235347] font-bold text-xs border border-[#8EB69B]/40">
                                                                    {stepNum}
                                                                </span>
                                                                <div className="flex flex-col gap-1 text-[#051F20] pt-0.5">
                                                                    <span>{hintText}</span>
                                                                    {hintMath && <MathFormula math={hintMath} />}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
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
