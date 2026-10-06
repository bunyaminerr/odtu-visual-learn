"use client";

import React, { useState, useEffect } from "react";
import { MatrixSolveResponse, MatrixStep } from "@/lib/types/math";
import { solveGaussJordan } from "@/lib/algorithms/matrixSolver";
import { parseSystemOfEquations } from "@/lib/algorithms/equationParser";
import { MatrixRowOpsTable } from "@/components/visualizers/math/MatrixRowOpsTable";
import { TimeTravelControls } from "@/components/visualizers/shared/TimeTravelControls";
import { StepExplanationCard } from "@/components/visualizers/shared/StepExplanationCard";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calculator, ChevronRight, GraduationCap, BookOpen, Lightbulb } from "lucide-react";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const PRESET_EQUATIONS = {
    q1: [
        "x + y + 2z = 1\ny + 2z = -3\n-2x - y - 2z = 1",
        "x + y + z = 1\nx + y + z = 2\nx - y + z = 0",
        "2x - y + z = 3\n-4x + 2y - 2z = 5\nx + y + z = 1",
        "x + 2y - z = 4\nx - y = 2\n2x + y - z = 10",
        "3x + y = 5\n-3x - y = -2\nx + 2y + z = 1",
        "x - 2y + 3z = 1\n2x - 4y + 6z = 3\nx + y + z = 0",
        "y + z = 2\n2y + 2z = 5\nx - y - z = 1",
        "x + y - 3z = 2\n2x + 2y - 6z = 4\n-x - y + 3z = 1",
        "x + z = 1\ny - z = 2\nx + y = 5",
        "2x + 3y + z = 0\n4x + 6y + 2z = 1\nx - y = 0"
    ],
    q2: [
        "y + 2z = 2\n-2x + y + 5z = 1\nx + 2y + z = 0",
        "2y - z = 3\nx + y + z = 1\n3x - y + 2z = 4",
        "y + 3z = 5\n2x - y - z = -1\nx + y + z = 2",
        "z = 4\nx + y = 2\n-x + y + z = 3",
        "2y = 6\nx - y + z = 1\n2x + y - z = 5",
        "3y + z = 1\nx + y = 0\nx - z = 2",
        "y - 2z = 4\nx + 2y + 3z = 1\n2x - y - z = 0",
        "2y + z = 0\nx - 3y + z = 2\nx + y - z = -1",
        "y - z = -2\n3x + y + z = 4\nx - y + 2z = 1",
        "4y = 8\nx + y + z = 5\n-x - y + z = -1"
    ],
    q3: [
        "x1 + x2 + x3 + x4 = -2\n2x1 - x2 + x3 = 6\nx1 - x3 - 3x4 = 3\nx1 + 2x2 - x4 = -4",
        "x1 - x2 + 2x3 + x4 = 1\n-x1 + 2x2 - x3 - x4 = 2\n2x1 + x2 + x3 + x4 = 0\nx1 + x2 + x3 - x4 = 3",
        "x1 + 2x2 + x3 - x4 = 4\n-x1 - x2 + 2x3 + 2x4 = -1\nx2 + 3x3 + x4 = 3\nx1 - x2 - x3 = 0",
        "2x1 + x2 - x3 + x4 = 5\nx1 - x2 + x3 - x4 = 1\nx1 + 2x2 + 3x4 = -2\n-x1 + x2 - x3 + 2x4 = 0",
        "x1 + x2 + x3 + x4 = 0\n2x1 + 3x2 - x3 = 1\nx1 - x2 + 2x3 + 2x4 = -1\n-x1 - x2 - x3 - 2x4 = 2",
        "x1 - 2x2 + 3x3 - x4 = 2\n-x1 + 3x2 - 2x3 + x4 = -1\n2x1 - x2 + x3 + x4 = 3\nx1 + x2 + x3 - x4 = 0",
        "3x1 - x2 + x3 + 2x4 = 1\nx1 + x2 - x3 - x4 = 2\n-x1 + 2x2 + x3 + x4 = -1\nx1 - x2 + 2x3 - x4 = 0",
        "x1 + x3 = 2\nx2 + x4 = 1\nx1 + x2 + x3 + x4 = 3\nx1 - x2 + x3 - x4 = 1",
        "x1 + 2x2 - x3 = 1\nx2 + 2x3 - x4 = 2\nx3 + 2x4 - x1 = -1\nx4 + 2x1 - x2 = 0",
        "x1 - x2 = 1\nx2 - x3 = 2\nx3 - x4 = -1\nx1 + x2 + x3 + x4 = 4"
    ],
    q4: [
        "2x - y - 3z = 0\n-x + 2y - 3z = 0\nx + y + 4z = 0",
        "x + y + z = 0\nx - y + z = 0\n2x + y - z = 0",
        "3x - y + 2z = 0\nx + y - z = 0\n-x + 2y + z = 0",
        "x - 2y + z = 0\n2x + y - z = 0\n-x + y + 2z = 0",
        "4x - y - z = 0\nx + 2y - z = 0\n-x - y + 2z = 0",
        "x + 3y - z = 0\n-2x + y + z = 0\nx - y + z = 0",
        "2x + 2y - z = 0\nx - y + 3z = 0\n-x + y - z = 0",
        "x - y - z = 0\n-x + 2y - z = 0\n2x - y + 2z = 0",
        "3x + y - 2z = 0\n-x + y + z = 0\n2x - 2y + z = 0",
        "x + y + 2z = 0\n2x - y + z = 0\n-x + 2y - z = 0"
    ],
};

export default function LinearEquationsPage() {
    const [equationInput, setEquationInput] = useState<string>(PRESET_EQUATIONS.q1[0]);
    const [solveData, setSolveData] = useState<MatrixSolveResponse | null>(null);
    const [variables, setVariables] = useState<string[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastTargetForm, setLastTargetForm] = useState<"REF" | "RREF" | null>(null);

    const handleSolve = async (equationsStr: string, targetForm: "REF" | "RREF" = "RREF", jumpToResult: boolean = false) => {
        setIsLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 50)); 
            
            const parsed = parseSystemOfEquations(equationsStr);
            if (parsed.error || parsed.matrix.length === 0) {
                throw new Error(parsed.error || "Geçersiz denklem sistemi.");
            }
            
            setVariables(parsed.variables);
            const data: MatrixSolveResponse = solveGaussJordan(parsed.matrix, targetForm);
            setSolveData(data);
            setCurrentStepIndex(jumpToResult ? data.totalSteps - 1 : 0);
            setLastTargetForm(targetForm);
            
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Bilinmeyen bir hata oluştu.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const currentStep: MatrixStep | null = solveData ? solveData.steps[currentStepIndex] : null;

    const renderSolutionSummary = () => {
        if (!solveData || currentStepIndex !== solveData.totalSteps - 1) return null;

        if (!solveData.isConsistent) {
            return (
                <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl mt-6 animate-in fade-in slide-in-from-bottom-2">
                    <h4 className="font-bold text-rose-800 text-lg mb-2 flex items-center gap-2">❌ Çözüm Yok (No Solution)</h4>
                    <p className="text-sm text-rose-700">Bu sistem tutarsız (Inconsistent). Matriste "0 = c" (c ≠ 0) şeklinde mantıksız bir eşitlik oluştuğu için denklemlerin ortak bir kesişim noktası yoktur.</p>
                </div>
            );
        }

        const numVars = variables.length;
        if (solveData.rank < numVars) {
            return (
                <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl mt-6 animate-in fade-in slide-in-from-bottom-2">
                    <h4 className="font-bold text-amber-800 text-lg mb-2 flex items-center gap-2">♾️ Sonsuz Çözüm (Infinite Solutions)</h4>
                    <p className="text-sm text-amber-700">Bu sistem tutarlı (Consistent) ancak yeterli bağımsız denklem yok. Rank ({solveData.rank}) &lt; Değişken Sayısı ({numVars}) olduğu için tam <strong>{numVars - solveData.rank} adet serbest değişken (free variable)</strong> var. Çözüm kümesi sonsuzdur.</p>
                </div>
            );
        }

        // Unique Solution
        if (lastTargetForm === "REF") {
            return (
                <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl mt-6 animate-in fade-in slide-in-from-bottom-2">
                    <h4 className="font-bold text-indigo-800 text-lg mb-2 flex items-center gap-2">🎯 Tek Çözüm (Unique Solution)</h4>
                    <p className="text-sm text-indigo-700 mb-3">Sistemin tam olarak 1 çözümü var. (Sistem Tutarlı ve Rank = Değişken Sayısı)</p>
                    <p className="text-xs text-indigo-600 bg-white p-3 rounded-xl border border-indigo-100 shadow-sm">Kökleri doğrudan (x=..., y=...) okumak için sistemi <strong>RREF</strong> formuna çözmelisiniz veya geriye doğru yerine koyma (Backward Substitution) yapmalısınız.</p>
                </div>
            );
        }

        // RREF Unique Solution - We can extract the values!
        const lastMatrix = solveData.steps[solveData.steps.length - 1].matrix;
        return (
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl mt-6 animate-in fade-in slide-in-from-bottom-2">
                <h4 className="font-bold text-emerald-800 text-lg mb-3 flex items-center gap-2">✅ Tek Çözüm (Unique Solution)</h4>
                <p className="text-sm text-emerald-700 mb-4">Sistem çözüldü! Kesişim noktası başarıyla bulundu:</p>
                <div className="flex flex-wrap gap-3">
                    {variables.map((v, i) => {
                        const val = lastMatrix[i][lastMatrix[i].length - 1];
                        return (
                            <div key={v} className="bg-white border border-emerald-200 px-5 py-3 rounded-xl font-mono text-emerald-900 shadow-sm flex items-center gap-3 text-lg">
                                <span className="font-bold text-emerald-700">{v}</span> 
                                <span className="text-emerald-300">=</span> 
                                <span>{val}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-16 pt-6">
            
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#051F20] mb-2">
                    <GraduationCap className="w-10 h-10" />
                    <h1 className="text-4xl font-extrabold text-[#051F20] tracking-tight">MATH 260</h1>
                </div>
                <h2 className="text-2xl font-semibold text-[#235347]">
                    1.1 & 1.2: Doğrusal Denklem Sistemleri ve Gauss Eliminasyonu
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
                    Bu bölümde doğrusal denklem sistemlerini (Systems of Linear Equations) nasıl çözeceğimizi öğreneceğiz. Denklemleri karmaşık harflerden arındırıp, bilgisayarların ve matematikçilerin çok sevdiği <strong>Matris (Matrix)</strong> yapısına dönüştürecek ve <strong>Gauss Eliminasyonu</strong> ile adım adım çözeceğiz.
                </p>
            </div>

            {/* Kapsamlı Konu Anlatımı */}
            <section className="space-y-12 mt-8">
                {/* BÖLÜM 1.1 */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1.5 bg-[#235347] rounded-full"></div>
                        <h2 className="text-3xl font-bold text-slate-800">1.1 Introduction to Systems of Linear Equations</h2>
                    </div>

                    <div className="prose prose-slate max-w-none space-y-6">
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Lineer (Doğrusal) Denklem Nedir?</h3>
                            <p className="text-slate-700 mb-4">
                                Bir denklemin "lineer" olabilmesi için değişkenlerin üslerinin <strong>1</strong> olması ve değişkenlerin birbirleriyle <strong>çarpılmamış</strong> veya trigonometrik/logaritmik fonksiyonların içine girmemiş olması gerekir. Lineer bir denklem şu temel forma sahiptir:
                            </p>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center mb-6">
                                <BlockMath math="a_1x_1 + a_2x_2 + \dots + a_nx_n = b" />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                                    <h4 className="font-bold text-emerald-800 mb-2">✅ Lineer Denklemler</h4>
                                    <ul className="text-emerald-700 text-sm space-y-2">
                                        <li><InlineMath math="3x + 2y = 7" /> (2 boyutlu doğru)</li>
                                        <li><InlineMath math="\frac{1}{2}x_1 - x_2 + \sqrt{3}x_3 = 0" /> (Sabitler köklü/kesirli olabilir)</li>
                                        <li><InlineMath math="x_1 + x_2 + x_3 + x_4 = 10" /> (Hiperdüzlem)</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
                                    <h4 className="font-bold text-rose-800 mb-2">❌ Lineer OLMAYAN Denklemler</h4>
                                    <ul className="text-rose-700 text-sm space-y-2">
                                        <li><InlineMath math="x_1x_2 + x_3 = 5" /> (İki değişken çarpılmış)</li>
                                        <li><InlineMath math="x_1^2 + 2x_2 = 4" /> (Üs 1'den büyük)</li>
                                        <li><InlineMath math="\sin(x_1) + x_2 = 0" /> (Trigonometrik fonksiyon)</li>
                                    </ul>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-3 mt-8">Geometrik Yorum: Çözüm Kümesi Ne Anlama Gelir?</h3>
                            <p className="text-slate-700 mb-4">
                                Bir lineer denklem 2 boyutta bir <strong>doğru (line)</strong>, 3 boyutta bir <strong>düzlem (plane)</strong> belirtir. 
                                "Denklem Sistemi" çözmek demek, uzayda bu doğruların veya düzlemlerin <strong>kesişim noktasını (veya noktalarını)</strong> bulmak demektir. Kesişim durumuna göre bir sistemin sadece 3 olası sonucu vardır:
                            </p>
                            
                            <div className="space-y-6 mt-8">
                                {/* 1. Unique Solution */}
                                <div className="p-6 bg-white border border-indigo-100 shadow-sm rounded-2xl">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">1</div>
                                        <h4 className="font-bold text-indigo-800 text-xl">Tek Çözüm (Unique Solution)</h4>
                                        <span className="ml-auto bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">Consistent (Tutarlı)</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-slate-700 text-sm mb-2"><strong>Geometri:</strong> Doğrular (veya düzlemler) uzayda tek bir spesifik noktada kesişir.</p>
                                            <p className="text-slate-700 text-sm"><strong>Cebir:</strong> Her değişken için tam olarak bir değer buluruz. Sistemin yeterli bilgisi vardır ve hiçbir denklem diğeriyle çelişmez.</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                            <p className="text-xs font-semibold text-slate-500 mb-2">Denklem Görünümü (İdeal):</p>
                                            <div className="flex justify-center text-sm">
                                                <BlockMath math="\begin{aligned} 1x + 0y + 0z &= 5 \\ 0x + 1y + 0z &= -2 \\ 0x + 0y + 1z &= 3 \end{aligned}" />
                                            </div>
                                            <p className="text-xs text-center text-indigo-600 mt-2">Sonuç direkt okunur: x=5, y=-2, z=3</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. No Solution */}
                                <div className="p-6 bg-white border border-rose-100 shadow-sm rounded-2xl">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold">2</div>
                                        <h4 className="font-bold text-rose-800 text-xl">Çözüm Yok (No Solution)</h4>
                                        <span className="ml-auto bg-rose-100 text-rose-800 text-xs font-bold px-2 py-1 rounded">Inconsistent (Tutarsız)</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-slate-700 text-sm mb-2"><strong>Geometri:</strong> Doğrular birbirine paraleldir ve asla kesişmezler. 3 Boyutta ise paralel düzlemler veya üç düzlemin aynı anda kesişmediği "üçgen çadır" benzeri yapılar oluşur.</p>
                                            <p className="text-slate-700 text-sm"><strong>Cebir:</strong> Denklemler birbiriyle mantıksal olarak çelişir (Örn: Hem x+y=5 hem de x+y=10 olamaz).</p>
                                        </div>
                                        <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                                            <p className="text-xs font-semibold text-slate-500 mb-2">Denklem Görünümü (Çelişki Patlaması!):</p>
                                            <div className="flex justify-center text-sm">
                                                <BlockMath math="\begin{aligned} x + 2y + 3z &= 4 \\ y - z &= 2 \\ 0x + 0y + 0z &= 5 \end{aligned}" />
                                            </div>
                                            <p className="text-xs text-center text-rose-600 font-bold mt-2">Son satır: 0 = 5 demektir. Matematikte bu büyük bir yalandır (İmkansız!).</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Infinite Solutions */}
                                <div className="p-6 bg-white border border-amber-100 shadow-sm rounded-2xl">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">3</div>
                                        <h4 className="font-bold text-amber-800 text-xl">Sonsuz Çözüm (Infinite Solutions)</h4>
                                        <span className="ml-auto bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">Consistent (Tutarlı)</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-slate-700 text-sm mb-2"><strong>Geometri:</strong> Doğrular tam olarak üst üstedir. 3 Boyutta ise düzlemler bir "doğru" boyunca kesişebilir (örneğin açık bir kitabın sayfalarının cilt kısmında buluşması gibi).</p>
                                            <p className="text-slate-700 text-sm"><strong>Cebir:</strong> Elimizde 3 değişkeni bulmak için yeterli sayıda farklı denklem yoktur. Bu durumda eksik olan değişkenleri "Serbest Değişken (Free Variable)" bırakırız (<InlineMath math="t, s" /> vb. atarız). <br/><span className="text-indigo-600 font-semibold mt-1 inline-block">💡 Yeni Öğrenen Notu:</span> "Sonsuz çözüm" demek "aklına gelen her sayı uyacak" demek DEĞİLDİR! Çözümler belli bir çizgi/düzlem üzerindeki noktalardır. Birini serbest seçersin, diğerleri mecburen ona uymak zorundadır.</p>
                                        </div>
                                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                            <p className="text-xs font-semibold text-slate-500 mb-2">Denklem Görünümü (Eksik Bilgi):</p>
                                            <div className="flex justify-center text-sm">
                                                <BlockMath math="\begin{aligned} x + 2z &= 5 \\ y - 3z &= 1 \\ 0 &= 0 \end{aligned}" />
                                            </div>
                                            <p className="text-xs text-center text-amber-700 mt-2">Son satır 0 = 0 (Doğru ama faydasız). z'yi bulacağımız denklem yok! Bu yüzden z serbest değişkendir (z = t).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mt-8">
                            <h3 className="text-2xl font-bold text-[#051F20] mb-4">Augmented Matrix (Genişletilmiş Matris)</h3>
                            <p className="text-slate-700 mb-4">
                                Bilgisayarlar (ve biz) değişkenleri (<InlineMath math="x, y, z" />) sürekli yazmak yerine, problemi sadece sayılardan oluşan bir yapıya (Matris) soyutlarız. 
                                Sadece eşitliğin solundaki katsayıları alırsak buna <strong>Coefficient Matrix (Katsayı Matrisi)</strong> denir. Eşitliğin sağındaki sonuçları da matrisin son sütununa eklersek buna <strong>Augmented Matrix</strong> deriz.
                            </p>
                            
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm mb-6 mt-4">
                                <p className="text-amber-800 text-sm font-bold flex items-center gap-2 mb-1">
                                    <AlertCircle className="w-4 h-4" /> Yeni Başlayanlar İçin Klasik Hatalar:
                                </p>
                                <ul className="text-amber-700 text-sm list-disc pl-5 space-y-1">
                                    <li>Denklemde sadece <InlineMath math="x" /> yazıyorsa, katsayısı <strong>0 değil 1'dir</strong> (Görünmez 1).</li>
                                    <li>Eğer <InlineMath math="-y" /> yazıyorsa, matrise geçerken bu <strong>-1</strong> olarak alınır (Eksi işaretini sakın unutmayın!).</li>
                                    <li>Denklemde bir değişken (örneğin <InlineMath math="z" />) hiç yoksa, onun katsayısı <strong>0'dır</strong>. Sütunu boş bırakamazsınız, 0 yazmak zorundasınız.</li>
                                    <li><strong>Sıraya Çok Dikkat!</strong> <InlineMath math="2y + x = 5" /> verilmişse, matrise heyecanla 2 ve 1 diye yazmayın. Önce hizalayın: <InlineMath math="x + 2y = 5" />. Yoksa sütunlar karışır ve soru baştan gider!</li>
                                </ul>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-slate-50 p-6 rounded-xl border border-slate-200 my-6">
                                <div>
                                    <BlockMath math="\begin{aligned} x + 2y - z &= 3 \\ 2x - y + 3z &= 7 \\ -x + 3y - 2z &= -2 \end{aligned}" />
                                </div>
                                <div className="hidden md:block text-2xl text-slate-400">➔</div>
                                <div className="md:hidden text-2xl text-slate-400">⬇</div>
                                <div>
                                    <BlockMath math="\begin{bmatrix} 1 & 2 & -1 & | & 3 \\ 2 & -1 & 3 & | & 7 \\ -1 & 3 & -2 & | & -2 \end{bmatrix}" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BÖLÜM 1.2 */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1.5 bg-[#235347] rounded-full"></div>
                        <h2 className="text-3xl font-bold text-slate-800">1.2 Gaussian Elimination (Gauss Yok Etme Metodu)</h2>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-slate-700 mb-6 text-lg">
                            Amacımız, karmaşık görünümlü bu Augmented Matrix'i alıp, <strong>Elementary Row Operations (Temel Satır Operasyonları)</strong> uygulayarak matrisi çok daha basit, cevabı direkt okuyabildiğimiz bir "Merdiven (Echelon)" formuna getirmektir.
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm mb-8">
                            <h3 className="text-lg font-bold text-blue-900 mb-3">Neden Sadece 3 Tane Satır Operasyonu Var?</h3>
                            <p className="text-blue-800 text-sm">
                                Bu operasyonların en büyük özelliği <strong>tersine çevrilebilir (reversible)</strong> olmalarıdır. Bir denklemi 2 ile çarparsanız, tekrar 2'ye bölerek eski haline getirebilirsiniz. Bu sayede, orijinal sistemin <strong>Çözüm Kümesi (Solution Set) KESİNLİKLE DEĞİŞMEZ</strong>. Orijinal zor sistem ile, en son bulduğumuz kolay matris "Denktir (Equivalent)".
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-blue-800 list-disc pl-5">
                                <li><strong>Swap (Takas):</strong> İki denklemin altlı-üstlü sırasını değiştirmek sonucu değiştirmez. (<InlineMath math="R_i \leftrightarrow R_j" />)</li>
                                <li><strong>Scale (Çarpma):</strong> Bir denklemin iki tarafını da 5 ile çarpmak kökleri değiştirmez. (<InlineMath math="R_i \leftarrow k R_i" />)</li>
                                <li><strong>Add (Toplama):</strong> Bir denklemi, diğer bir denkleme (belki k katıyla) ekleyerek değişkenleri yok edebiliriz. (<InlineMath math="R_i \leftarrow R_i + k R_j" />)</li>
                            </ul>
                            <div className="mt-4 p-3 bg-blue-100 rounded-lg text-blue-900 text-sm font-semibold flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span>ÖNEMLİ: Bu işlemleri yaparken matristeki o satırın TAMAMINA (en sağdaki çizginin ötesindeki Augmented sütun dahil!) uygulamalısınız. Sadece bir sayıyı çarpıp diğerlerini unutmak en sık yapılan hatadır.</span>
                            </div>
                        </div>

                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-sm mb-8">
                            <h3 className="text-lg font-bold text-emerald-900 mb-2">Peki Hangi Sırayla Gideceğiz? (Öğrenciler İçin Hayat Kurtaran Taktik)</h3>
                            <p className="text-emerald-800 text-sm">
                                Operasyonları rastgele yaparsanız matrisin içinde döner durursunuz! Şu stratejiyi (Algoritmayı) izleyin:
                            </p>
                            <ol className="mt-2 space-y-1 text-sm text-emerald-800 list-decimal pl-5">
                                <li><strong>Sol üstten başla:</strong> İlk sütundaki en üst sayıyı (tercihen 1 yaparak) <strong>Pivot</strong> seç.</li>
                                <li><strong>Aşağıyı temizle:</strong> Pivotun <em>altındaki</em> tüm sayıları "Add" operasyonu ile sıfırla.</li>
                                <li><strong>Çapraz in:</strong> Bir alt satıra ve bir sağ sütuna geç. Yeni Pivotunu belirle.</li>
                                <li>Merdiven (REF) bitene kadar böyle sağ-çapraz in (Forward Phase). Sonra en sağ alttaki pivottan başlayıp, yukarı doğru çıkarak Pivotların <em>üstünü</em> sıfırla (Backward Phase - RREF).</li>
                            </ol>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h4 className="text-xl font-bold text-[#051F20] border-b pb-2 mb-4">1. Row Echelon Form (REF)</h4>
                                <ul className="text-slate-600 text-sm space-y-2 list-decimal pl-4">
                                    <li>Tamamen sıfırlardan oluşan bir satır varsa, matrisin en altında olmalıdır.</li>
                                    <li>Sıfır olmayan her satırın sol baştaki ilk (sıfırdan farklı) sayısına <strong>Leading Entry (Pivot)</strong> denir. (1 olmak zorunda değildir!)</li>
                                    <li>Her Pivot, bir üstündeki satırın Pivot'una göre <strong>daha sağda</strong> olmalıdır (Merdiven basamağı).</li>
                                    <li>Bir Pivot'un <strong>altındaki</strong> tüm sayılar 0 olmalıdır.</li>
                                </ul>
                                <div className="mt-4 p-4 bg-slate-50 border rounded-xl flex justify-center">
                                    <BlockMath math="\begin{bmatrix} \blacksquare & * & * & | & * \\ 0 & \blacksquare & * & | & * \\ 0 & 0 & \blacksquare & | & * \end{bmatrix}" />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 text-center">Gaussian Elimination (Forward Phase)</p>
                            </div>
                            
                            <div>
                                <h4 className="text-xl font-bold text-[#051F20] border-b pb-2 mb-4">2. Reduced Row Echelon Form (RREF)</h4>
                                <ul className="text-slate-600 text-sm space-y-2 list-decimal pl-4">
                                    <li>REF formunun TÜM özelliklerini taşımalıdır.</li>
                                    <li>Bütün Pivotlar <strong>1</strong> olmalıdır (Leading 1).</li>
                                    <li>Bir sütunda Pivot varsa, o sütundaki <strong>diğer bütün sayılar (üstündekiler dahil) SIFIR olmalıdır.</strong></li>
                                    <li className="text-transparent">.</li>
                                </ul>
                                <div className="mt-4 p-4 bg-slate-50 border rounded-xl flex justify-center">
                                    <BlockMath math="\begin{bmatrix} 1 & 0 & 0 & | & 5 \\ 0 & 1 & 0 & | & -2 \\ 0 & 0 & 1 & | & 3 \end{bmatrix}" />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 text-center">Gauss-Jordan Elimination (Backward Phase) - Çözüm apaçık ortada!</p>
                            </div>
                        </div>

                        <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-2xl shadow-sm">
                            <div className="flex items-start gap-4">
                                <Lightbulb className="w-6 h-6 text-rose-600 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-rose-800 mb-2">Sınav Uyarısı: Nasıl Yanlış Yaparım?</h3>
                                    <p className="text-rose-800 text-sm">
                                        Eğer eliminasyon sonucunda matrisin bir satırı şu şekle dönüşürse: <InlineMath math="[0 \quad 0 \quad 0 \quad | \quad 5]" />. Bu denklem <InlineMath math="0x + 0y + 0z = 5" /> demektir. Yani <InlineMath math="0 = 5" />. Bu matematikte bir çelişkidir! Bu durumda hemen işlemi bırakıp <strong>"No Solution (Çözüm Yok - Inconsistent)"</strong> diyoruz.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BÖLÜM 1.3 */}
                <div className="mt-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1.5 bg-[#235347] rounded-full"></div>
                        <h2 className="text-3xl font-bold text-slate-800">1.3 Homogeneous Systems (Homojen Sistemler)</h2>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                        <p className="text-slate-700 text-lg">
                            Eğer bir lineer denklem sistemindeki <strong>bütün sabit terimler (eşitliğin sağ tarafındakiler) SIFIR</strong> ise, bu sisteme <strong>Homojen Sistem</strong> denir.
                        </p>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center mb-6">
                            <BlockMath math="\begin{aligned} a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n &= 0 \\ a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n &= 0 \\ \vdots \quad\quad\quad\quad\quad\quad\quad\quad &= \vdots \\ a_{m1}x_1 + a_{m2}x_2 + \dots + a_{mn}x_n &= 0 \end{aligned}" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl shadow-sm">
                                <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🎯</span> En Büyük Sır: Asla Çözümsüz Değildir!
                                </h3>
                                <p className="text-indigo-800 text-sm mb-4">
                                    Homojen bir sistemin <strong>asla "Çözümü Yok (Inconsistent)" olma ihtimali yoktur!</strong> Neden mi? Çünkü bütün değişkenlere 0 (sıfır) verdiğinizi düşünün:
                                </p>
                                <div className="bg-white/60 p-3 rounded-lg border border-indigo-100 text-center mb-4">
                                    <InlineMath math="x_1 = 0, \quad x_2 = 0, \quad \dots \quad x_n = 0" />
                                </div>
                                <p className="text-indigo-800 text-sm">
                                    0'ı hangi katsayı ile çarparsanız çarpın sonuç 0 çıkacaktır. Yani tüm denklemler kusursuz bir şekilde sağlanır. 
                                    Tüm değişkenlerin 0 olduğu bu garanti çözüme <strong>Trivial Solution (Aşikar Çözüm)</strong> denir. Geometrik olarak bu, orijinden geçen doğruların/düzlemlerin kesişim noktasıdır. Bütün orijinden geçen şeyler mecburen orijinde kesişir!
                                </p>
                            </div>

                            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl shadow-sm">
                                <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🤔</span> Asıl Soru: Başka Çözüm Var Mı?
                                </h3>
                                <p className="text-emerald-800 text-sm mb-4">
                                    Madem en az 1 çözüm (Trivial) kesin var, o zaman Gauss-Jordan yaparken sorduğumuz soru "Çözüm var mı?" değil, <strong>"Sadece Trivial çözüm mü var, yoksa Sonsuz (Nontrivial - Aşikar Olmayan) çözüm mü var?"</strong> şekline dönüşür.
                                </p>
                                <ul className="text-emerald-800 text-sm space-y-3 list-disc pl-4">
                                    <li><strong>Sadece Trivial Çözüm:</strong> Eğer matrisi RREF formuna getirdiğinizde her sütunda (sabitler hariç) bir Pivot (Leading 1) varsa, tüm değişkenler 0'a eşittir. Serbest değişken yoktur.</li>
                                    <li><strong>Nontrivial (Sonsuz) Çözüm:</strong> Eğer en az bir sütun Pivot'a sahip olamazsa, o sütun <strong>Serbest Değişken (Free Variable)</strong> olur. Serbest değişken demek, sonsuz çözüm (Nontrivial solution) demektir!</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm">
                            <h3 className="text-lg font-bold text-amber-900 mb-2">Çok Önemli Teorem: Bilinmeyen Sayısı Denklemlerden Fazlaysa</h3>
                            <p className="text-amber-800 text-sm">
                                Eğer homojen bir sistemde değişken sayısı (sütun), denklem sayısından (satır) <strong>daha fazlaysa</strong> (örneğin 2 denklem, 3 bilinmeyen), sistemin <strong>KESİNLİKLE Nontrivial (Sonsuz) çözümü vardır.</strong>
                            </p>
                            <p className="text-amber-800 text-sm mt-3">
                                <strong>Mantığı (Neden?):</strong> En iyi ihtimalle her satırda 1 tane Pivot olabilir. Eğer 2 satırımız varsa, en fazla 2 tane Pivot'umuz olabilir. Ama 3 değişkenimiz var! Bu durumda mutlaka en az 1 değişken Pivot'suz kalacaktır. Pivot'suz değişken = Serbest değişken. Serbest değişken = Sonsuz çözüm.
                            </p>
                        </div>

                        {/* Örnekler */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="border border-slate-200 p-5 rounded-xl bg-slate-50 flex flex-col items-center">
                                <h4 className="font-bold text-slate-700 text-center mb-4">Trivial Çözüm Örneği</h4>
                                <div className="text-center overflow-x-auto w-full">
                                    <BlockMath math="\begin{bmatrix} 1 & 0 & | & 0 \\ 0 & 1 & | & 0 \end{bmatrix}" />
                                </div>
                                <p className="text-xs text-slate-600 text-center mt-4 bg-white p-2 rounded border border-slate-200 w-full">
                                    <strong>Sonuç:</strong> x = 0, y = 0<br/>Her sütunda pivot var. Serbest değişken yok. Başka çözüm de yoktur!
                                </p>
                            </div>
                            <div className="border border-slate-200 p-5 rounded-xl bg-slate-50 flex flex-col items-center">
                                <h4 className="font-bold text-slate-700 text-center mb-4">Nontrivial (Sonsuz) Çözüm Örneği</h4>
                                <div className="text-center overflow-x-auto w-full">
                                    <BlockMath math="\begin{bmatrix} 1 & -2 & | & 0 \\ 0 & 0 & | & 0 \end{bmatrix}" />
                                </div>
                                <p className="text-xs text-slate-600 text-center mt-4 bg-white p-2 rounded border border-slate-200 w-full">
                                    <strong>Sonuç:</strong> 2. sütunda pivot yok (y serbest değişken).<br/>Eğer y=t derseniz x=2t olur. t yerine ne koyarsan çözüm olur! Sonsuz çözüm.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Interactive Tool Section */}
            <section className="space-y-6 mt-12">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-slate-800">İnteraktif Araç: Denklemden REF / RREF'e Adım Adım Çözüm</h2>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl flex flex-col items-center justify-center text-amber-800 my-8">
                    <AlertCircle className="w-12 h-12 mb-4 text-amber-600" />
                    <h3 className="text-xl font-bold mb-2">Araç Bakıma Alınmıştır</h3>
                    <p className="text-center max-w-lg">
                        Bu interaktif çözücü, üretilen sonuçların doğruluğunu ve pedagojik kalitesini artırmak amacıyla geçici olarak devre dışı bırakılmıştır. En kısa sürede çok daha güçlü bir algoritma ile tekrar eklenecektir.
                    </p>
                </div>
            </section>

            {/* Örnek Sorular */}
            <section className="space-y-8 mt-16 border-t pt-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1.5 bg-[#235347] rounded-full"></div>
                    <h2 className="text-3xl font-bold text-slate-800">Örnek Sorular</h2>
                </div>
                <p className="text-slate-600 mb-8">
                    Aşağıdaki 4 soru, sınavlarda en çok karşılaşılan tuzakları barındırır. Bu soruların <strong>adım adım çözümünü</strong> görmek için yukarıdaki İnteraktif Araçta ilgili soru butonuna tıklayabilirsiniz. Çözümleri yaparken aşağıdaki uyarılara mutlaka dikkat edin!
                </p>

                <div className="grid grid-cols-1 gap-8">
                    {/* Soru 1 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                        <div className="bg-slate-50 p-4 border-b border-slate-200">
                            <h3 className="font-bold text-slate-800">Soru 1: Çelişkili Sistem (Inconsistent)</h3>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="bg-slate-100 p-4 rounded-xl text-center mb-6 overflow-x-auto">
                                <BlockMath math="\begin{aligned} x + y + 2z &= 1 \\ y + 2z &= -3 \\ -2x - y - 2z &= 1 \end{aligned}" />
                            </div>
                            
                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-slate-700 mb-4">Adım Adım Gauss-Jordan Eliminasyonu (RREF'e Geçiş):</h4>
                                <div className="flex flex-wrap gap-4 items-center text-sm overflow-x-auto pb-4">
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <p className="text-xs text-slate-500 mb-1">Başlangıç (Augmented)</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & 2 & | & 1 \\ 0 & 1 & 2 & | & -3 \\ -2 & -1 & -2 & | & 1 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">R_3 + 2R_1</span></div>
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & 2 & | & 1 \\ 0 & 1 & 2 & | & -3 \\ 0 & 1 & 2 & | & 3 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">R_3 - R_2</span></div>
                                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & 2 & | & 1 \\ 0 & 1 & 2 & | & -3 \\ 0 & 0 & 0 & | & 6 \end{bmatrix}" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto bg-rose-50 border border-rose-200 p-4 rounded-xl text-sm">
                                <h4 className="font-bold text-rose-800 flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4"/> Ekstra Önemli Bilgi</h4>
                                <p className="text-rose-700">Yukarıdaki adımlarda göreceğiniz üzere, son satır <InlineMath math="[0 \ 0 \ 0 \ | \ 6]" /> şeklini alıyor. Yani <strong>0 = 6</strong> gibi imkansız bir eşitlik çıkıyor. Eliminasyon sırasında böyle bir satır görür görmez işlemi durdurun. Cevap: <strong>Çözüm Yok (No Solution)</strong>.</p>
                            </div>
                        </div>
                    </div>

                    {/* Soru 2 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                        <div className="bg-slate-50 p-4 border-b border-slate-200">
                            <h3 className="font-bold text-slate-800">Soru 2: Sıfır Tuzağı (Row Swap Gereksinimi)</h3>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="bg-slate-100 p-4 rounded-xl text-center mb-6 overflow-x-auto">
                                <BlockMath math="\begin{aligned} y + 2z &= 2 \\ -2x + y + 5z &= 1 \\ x + 2y + z &= 0 \end{aligned}" />
                            </div>
                            
                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-slate-700 mb-4">Adım Adım Gauss-Jordan Eliminasyonu:</h4>
                                <div className="flex flex-wrap gap-4 items-center text-sm overflow-x-auto pb-4">
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <p className="text-xs text-slate-500 mb-1">Başlangıç (Dikkat: Sol üst 0)</p>
                                        <BlockMath math="\begin{bmatrix} 0 & 1 & 2 & | & 2 \\ -2 & 1 & 5 & | & 1 \\ 1 & 2 & 1 & | & 0 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">R_1 \leftrightarrow R_3</span></div>
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 2 & 1 & | & 0 \\ -2 & 1 & 5 & | & 1 \\ 0 & 1 & 2 & | & 2 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">R_2 + 2R_1</span></div>
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 2 & 1 & | & 0 \\ 0 & 5 & 7 & | & 1 \\ 0 & 1 & 2 & | & 2 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">R_2 \leftrightarrow R_3</span></div>
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 2 & 1 & | & 0 \\ 0 & 1 & 2 & | & 2 \\ 0 & 5 & 7 & | & 1 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">R_3 - 5R_2</span></div>
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 2 & 1 & | & 0 \\ 0 & 1 & 2 & | & 2 \\ 0 & 0 & -3 & | & -9 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">R_3 / -3</span></div>
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <p className="text-xs font-bold text-indigo-500 mb-1">REF (Forward Bitti)</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 2 & 1 & | & 0 \\ 0 & 1 & 2 & | & 2 \\ 0 & 0 & 1 & | & 3 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">Backward (RREF)</span></div>
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                                        <p className="text-xs font-bold text-emerald-600 mb-1">Final RREF</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 0 & 0 & | & 5 \\ 0 & 1 & 0 & | & -4 \\ 0 & 0 & 1 & | & 3 \end{bmatrix}" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto bg-amber-50 border border-amber-200 p-4 rounded-xl text-sm">
                                <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4"/> Ekstra Önemli Bilgi</h4>
                                <p className="text-amber-700">İlk denkleme dikkat edin: x değişkeni yok! Bir denklemde değişken yoksa <strong>onun katsayısı (çarpanı) 0'dır</strong>. Matrise çevirdiğinizde sol üst köşe (pivot adayımız) <strong>0</strong> olur. Sıfırı pivot yapamayacağımız için ilk adımımız yukarıdaki gibi mutlaka <strong>Row Swap (Satır Değiştirme)</strong> olmalıdır. Son RREF halinden de görüldüğü gibi çözüm: <strong>x=5, y=-4, z=3</strong>.</p>
                            </div>
                        </div>
                    </div>

                    {/* Soru 3 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                        <div className="bg-slate-50 p-4 border-b border-slate-200">
                            <h3 className="font-bold text-slate-800">Soru 3: Eksik Katsayılar ve Serbest Değişken (Infinite Solutions)</h3>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="bg-slate-100 p-4 rounded-xl text-center mb-6 overflow-x-auto">
                                <BlockMath math="\begin{aligned} x_1 + x_2 + x_3 + x_4 &= -2 \\ 2x_1 - x_2 + x_3 &= 6 \\ x_1 - x_3 - 3x_4 &= 3 \\ x_1 + 2x_2 - x_4 &= -4 \end{aligned}" />
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-slate-700 mb-4">Adım Adım Gauss-Jordan (Özetlenmiş Adımlar):</h4>
                                <div className="flex flex-wrap gap-4 items-center text-sm overflow-x-auto pb-4">
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <p className="text-xs text-slate-500 mb-1">Başlangıç Matrisi</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & 1 & 1 & | & -2 \\ 2 & -1 & 1 & 0 & | & 6 \\ 1 & 0 & -1 & -3 & | & 3 \\ 1 & 2 & 0 & -1 & | & -4 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">Çoklu İndirgeme</span></div>
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <p className="text-xs text-slate-500 mb-1">REF'e Doğru</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & 1 & 1 & | & -2 \\ 0 & 1 & -1 & -2 & | & -2 \\ 0 & 0 & 1 & 2 & | & -1 \\ 0 & 0 & 0 & 0 & | & 0 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">Backward (RREF)</span></div>
                                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-center">
                                        <p className="text-xs font-bold text-indigo-600 mb-1">Final RREF</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 0 & 0 & -1 & | & 2 \\ 0 & 1 & 0 & 0 & | & -3 \\ 0 & 0 & 1 & 2 & | & -1 \\ 0 & 0 & 0 & 0 & | & 0 \end{bmatrix}" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-sm">
                                <h4 className="font-bold text-indigo-800 flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4"/> Ekstra Önemli Bilgi</h4>
                                <p className="text-indigo-700">Bu 4x4 sistemde en büyük hata, 2. denklemde <InlineMath math="x_4" />'ün yerine 0 koymayı unutmaktır! Son RREF matrisine baktığımızda 4. sütunda (yani <InlineMath math="x_4" />'te) <strong>Pivot (Leading 1) yoktur</strong>. Bu, <InlineMath math="x_4" />'ün bir <strong>Serbest Değişken (t)</strong> olduğu anlamına gelir. Çözüm: <InlineMath math="x_1 = 2 + t" />, <InlineMath math="x_2 = -3" />, <InlineMath math="x_3 = -1 - 2t" />, <InlineMath math="x_4 = t" /> (Sonsuz Çözüm).</p>
                            </div>
                        </div>
                    </div>

                    {/* Soru 4 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                        <div className="bg-slate-50 p-4 border-b border-slate-200">
                            <h3 className="font-bold text-slate-800">Soru 4: Homojen Sistemler (Trivial Solution)</h3>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="bg-slate-100 p-4 rounded-xl text-center mb-6 overflow-x-auto">
                                <BlockMath math="\begin{aligned} 2x - y - 3z &= 0 \\ -x + 2y - 3z &= 0 \\ x + y + 4z &= 0 \end{aligned}" />
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-slate-700 mb-4">Adım Adım Gauss-Jordan (RREF):</h4>
                                <div className="flex flex-wrap gap-4 items-center text-sm overflow-x-auto pb-4">
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <p className="text-xs text-slate-500 mb-1">Başlangıç (Sağ Taraf Hep 0)</p>
                                        <BlockMath math="\begin{bmatrix} 2 & -1 & -3 & | & 0 \\ -1 & 2 & -3 & | & 0 \\ 1 & 1 & 4 & | & 0 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">R_1 \leftrightarrow R_3</span><br/><span className="text-xs">Sıfırlamalar</span></div>
                                    <div className="bg-white border rounded-lg p-3 text-center">
                                        <p className="text-xs text-slate-500 mb-1">REF Aşaması</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & 4 & | & 0 \\ 0 & 3 & 1 & | & 0 \\ 0 & 0 & 1 & | & 0 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400">➔<br/><span className="text-xs">Backward</span></div>
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                                        <p className="text-xs font-bold text-emerald-600 mb-1">Final RREF</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 0 & 0 & | & 0 \\ 0 & 1 & 0 & | & 0 \\ 0 & 0 & 1 & | & 0 \end{bmatrix}" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-sm">
                                <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4"/> Ekstra Önemli Bilgi</h4>
                                <p className="text-emerald-700">Eşitliğin sağ tarafı tamamen sıfırsa buna <strong>Homojen Sistem</strong> denir. Adımlardan da gördüğünüz gibi, sağ taraftaki sıfırlar (augmented column) hiçbir satır operasyonuyla etkilenmez ve bozulmaz. En son RREF'te <InlineMath math="x=0, y=0, z=0" /> cevabını buluruz. Buna <strong>Trivial Solution (Aşikar Çözüm)</strong> denir.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ekstra Sorular */}
            <section className="space-y-8 mt-16 border-t pt-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-slate-800">Sizin Seçtiğiniz Ekstra Sorular</h2>
                </div>
                <p className="text-slate-600 mb-8">
                    Aşağıdaki sorular tarafınızca özel olarak seçilmiş, sınav formatında ve her biri farklı bir lineer cebir kuralını test eden matrislerdir. Çözümü görmek için detayları açabilirsiniz.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Soru 1 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 flex flex-col">
                        <h3 className="font-bold text-slate-800 mb-4">Soru 1: Overdetermined (Fazla Denklem)</h3>
                        <div className="bg-slate-50 p-4 rounded-xl text-center mb-4 overflow-x-auto flex-1">
                            <BlockMath math="\begin{bmatrix} 3 & 4 & | & 5 \\ 1 & -1 & | & 2 \\ 2 & 3 & | & 4 \end{bmatrix}" />
                        </div>
                        <details className="group">
                            <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors">
                                Çözümü Gör
                            </summary>
                            <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700">
                                <p className="mb-2"><strong>Tuzak:</strong> 2 bilinmeyen ama 3 denklem var.</p>
                                <BlockMath math="\text{RREF: } \begin{bmatrix} 1 & 0 & | & 2 \\ 0 & 1 & | & 0 \\ 0 & 0 & | & -1 \end{bmatrix}" />
                                <p><strong>Sonuç:</strong> Son satır <strong>0 = -1</strong> çelişkisini verdiği için sistem <strong>Inconsistent (Çözüm Yok)</strong>'dur.</p>
                            </div>
                        </details>
                    </div>

                    {/* Soru 2 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 flex flex-col">
                        <h3 className="font-bold text-slate-800 mb-4">Soru 2: Paralel Düzlemler</h3>
                        <div className="bg-slate-50 p-4 rounded-xl text-center mb-4 overflow-x-auto flex-1">
                            <BlockMath math="\begin{bmatrix} 1 & -2 & 3 & | & 1 \\ 2 & -4 & 6 & | & 3 \\ -1 & 2 & -3 & | & -2 \end{bmatrix}" />
                        </div>
                        <details className="group">
                            <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors">
                                Çözümü Gör
                            </summary>
                            <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700">
                                <p className="mb-2"><strong>Tuzak:</strong> Sol taraftaki katsayılar birbiriyle orantılı (katı), ancak sağ taraf (sabitler) aynı oranda artmıyor.</p>
                                <BlockMath math="\text{RREF: } \begin{bmatrix} 1 & -2 & 3 & | & 1 \\ 0 & 0 & 0 & | & 1 \\ 0 & 0 & 0 & | & -1 \end{bmatrix}" />
                                <p><strong>Sonuç:</strong> 2. satırda yine <strong>0 = 1</strong> çelişkisi doğar. <strong>Çözüm Yok (Inconsistent)</strong>.</p>
                            </div>
                        </details>
                    </div>

                    {/* Soru 3 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 flex flex-col">
                        <h3 className="font-bold text-slate-800 mb-4">Soru 3: Tam Bağımlılık (Lineer Dependent)</h3>
                        <div className="bg-slate-50 p-4 rounded-xl text-center mb-4 overflow-x-auto flex-1">
                            <BlockMath math="\begin{bmatrix} 1 & 2 & -1 & 2 & | & 2 \\ 2 & 4 & -2 & 4 & | & 4 \\ -1 & -2 & 1 & -2 & | & -2 \end{bmatrix}" />
                        </div>
                        <details className="group">
                            <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors">
                                Çözümü Gör
                            </summary>
                            <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700">
                                <p className="mb-2"><strong>Tuzak:</strong> Alt satırlar tamamen 1. satırın katlarıdır.</p>
                                <BlockMath math="\text{RREF: } \begin{bmatrix} 1 & 2 & -1 & 2 & | & 2 \\ 0 & 0 & 0 & 0 & | & 0 \\ 0 & 0 & 0 & 0 & | & 0 \end{bmatrix}" />
                                <p><strong>Sonuç:</strong> 2 satır sıfırlandı. 4 değişken var, sadece 1 pivot var. Bu yüzden 3 adet <strong>Serbest Değişken</strong> çıkar. <strong>Sonsuz Çözüm</strong>.</p>
                            </div>
                        </details>
                    </div>

                    {/* Soru 4 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 flex flex-col">
                        <h3 className="font-bold text-slate-800 mb-4">Soru 4: Standart Tek Çözüm</h3>
                        <div className="bg-slate-50 p-4 rounded-xl text-center mb-4 overflow-x-auto flex-1">
                            <BlockMath math="\begin{bmatrix} 1 & 1 & 1 & | & 6 \\ 2 & -1 & 1 & | & 3 \\ 1 & 2 & -1 & | & 2 \end{bmatrix}" />
                        </div>
                        <details className="group">
                            <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors">
                                Çözümü Gör
                            </summary>
                            <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700">
                                <p className="mb-2"><strong>Durum:</strong> En yaygın sınav tipi, standart 3 bilinmeyenli sistem.</p>
                                <BlockMath math="\text{RREF: } \begin{bmatrix} 1 & 0 & 0 & | & 1 \\ 0 & 1 & 0 & | & 2 \\ 0 & 0 & 1 & | & 3 \end{bmatrix}" />
                                <p><strong>Sonuç:</strong> Temiz bir <strong>Tek Çözüm</strong>. x = 1, y = 2, z = 3.</p>
                            </div>
                        </details>
                    </div>

                    {/* Soru 5 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 flex flex-col md:col-span-2">
                        <h3 className="font-bold text-slate-800 mb-4">Soru 5: Parametrik Sistem Analizi</h3>
                        <div className="bg-slate-50 p-4 rounded-xl text-center mb-4 overflow-x-auto flex-1">
                            <BlockMath math="\begin{bmatrix} 1 & 1 & 1 & | & 2 \\ 1 & 2 & 3 & | & 3 \\ 1 & 2 & (k^2-5) & | & k \end{bmatrix}" />
                        </div>
                        <details className="group">
                            <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors w-full md:w-1/3 mx-auto">
                                Çözümü Gör
                            </summary>
                            <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700 text-center">
                                <p className="mb-2"><strong>Adımlar:</strong> İlk iki satırı kullanarak 3. satırı sıfırladığımızda şu denkleme ulaşırız:</p>
                                <BlockMath math="(k^2-8)z = k - 3" />
                                <p><strong>Sonuç Analizi:</strong></p>
                                <ul className="text-left list-disc pl-5 mt-2 space-y-2 inline-block">
                                    <li>Eğer <InlineMath math="k^2 - 8 = 0" /> (Yani <InlineMath math="k = \pm\sqrt{8}" />) ise, sol taraf 0, sağ taraf 0'dan farklı olur. <strong>Çözüm Yok</strong>.</li>
                                    <li>Eğer <InlineMath math="k \neq \pm\sqrt{8}" /> ise z'yi bölebiliriz. <strong>Tek Çözüm</strong> vardır.</li>
                                    <li>Sonsuz çözüm olması için solun ve sağın aynı anda 0 olması gerekirdi (k=3 ve k=√8 aynı anda sağlanamaz), dolayısıyla bu sistemin <strong>Sonsuz Çözümü Olamaz</strong>.</li>
                                </ul>
                            </div>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
}
