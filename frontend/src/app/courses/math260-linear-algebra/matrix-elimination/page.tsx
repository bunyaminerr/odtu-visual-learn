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
    q1: "x + y + 2z = 1\ny + 2z = -3\n-2x - y - 2z = 1",
    q2: "y + 2z = 2\n-2x + y + 5z = 1\nx + 2y + z = 0",
    q3: "x1 + x2 + x3 + x4 = -2\n2x1 - x2 + x3 = 6\nx1 - x3 - 3x4 = 3\nx1 + 2x2 - x4 = -4",
    q4: "2x - y - 3z = 0\n-x + 2y - 3z = 0\nx + y + 4z = 0",
};

export default function LinearEquationsPage() {
    const [equationInput, setEquationInput] = useState<string>(PRESET_EQUATIONS.q1);
    const [solveData, setSolveData] = useState<MatrixSolveResponse | null>(null);
    const [variables, setVariables] = useState<string[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSolve = async (equationsStr: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 50)); 
            
            const parsed = parseSystemOfEquations(equationsStr);
            if (parsed.error || parsed.matrix.length === 0) {
                throw new Error(parsed.error || "Geçersiz denklem sistemi.");
            }
            
            setVariables(parsed.variables);
            const data: MatrixSolveResponse = solveGaussJordan(parsed.matrix);
            setSolveData(data);
            setCurrentStepIndex(0);
            
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
                                            <p className="text-xs font-semibold text-slate-500 mb-2">RREF Matris Görünümü (İdeal):</p>
                                            <div className="flex justify-center text-sm">
                                                <BlockMath math="\begin{bmatrix} 1 & 0 & 0 & | & 5 \\ 0 & 1 & 0 & | & -2 \\ 0 & 0 & 1 & | & 3 \end{bmatrix}" />
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
                                            <p className="text-xs font-semibold text-slate-500 mb-2">REF/RREF Matris Görünümü (Çelişki Patlaması!):</p>
                                            <div className="flex justify-center text-sm">
                                                <BlockMath math="\begin{bmatrix} 1 & 2 & 3 & | & 4 \\ 0 & 1 & -1 & | & 2 \\ 0 & 0 & 0 & | & 5 \end{bmatrix}" />
                                            </div>
                                            <p className="text-xs text-center text-rose-600 font-bold mt-2">Son satır: 0 = 5 demektir. İmkansız!</p>
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
                                            <p className="text-slate-700 text-sm"><strong>Cebir:</strong> Elimizde 3 değişkeni bulmak için yeterli sayıda farklı denklem yoktur (bazı denklemler aslında diğerlerinin katıdır ve yok olup sıfırlanırlar). Bu durumda eksik olan değişkenleri "Serbest Değişken (Free Variable)" bırakırız ve onlara <InlineMath math="t, s" /> gibi parametreler atarız.</p>
                                        </div>
                                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                            <p className="text-xs font-semibold text-slate-500 mb-2">RREF Matris Görünümü (Serbest Değişken):</p>
                                            <div className="flex justify-center text-sm">
                                                <BlockMath math="\begin{bmatrix} 1 & 0 & 2 & | & 5 \\ 0 & 1 & -3 & | & 1 \\ 0 & 0 & 0 & | & 0 \end{bmatrix}" />
                                            </div>
                                            <p className="text-xs text-center text-amber-700 mt-2">3. sütunda (z sütunu) Pivot yok (Leading 1 eksik). Demek ki z serbest değişkendir (z = t).</p>
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h4 className="text-xl font-bold text-[#051F20] border-b pb-2 mb-4">1. Row Echelon Form (REF)</h4>
                                <ul className="text-slate-600 text-sm space-y-2 list-decimal pl-4">
                                    <li>Tamamen sıfırlardan oluşan bir satır varsa, matrisin en altında olmalıdır.</li>
                                    <li>Sıfır olmayan her satırın sol baştaki ilk sayısına <strong>Leading 1 (Pivot)</strong> denir ve 1 olmalıdır.</li>
                                    <li>Her Leading 1, bir üstündeki satırın Leading 1'ine göre <strong>daha sağda</strong> olmalıdır (Merdiven basamağı).</li>
                                    <li>Bir Leading 1'in <strong>altındaki</strong> tüm sayılar 0 olmalıdır.</li>
                                </ul>
                                <div className="mt-4 p-4 bg-slate-50 border rounded-xl flex justify-center">
                                    <BlockMath math="\begin{bmatrix} 1 & * & * & | & * \\ 0 & 1 & * & | & * \\ 0 & 0 & 1 & | & * \end{bmatrix}" />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 text-center">Gaussian Elimination (Forward Phase)</p>
                            </div>
                            
                            <div>
                                <h4 className="text-xl font-bold text-[#051F20] border-b pb-2 mb-4">2. Reduced Row Echelon Form (RREF)</h4>
                                <ul className="text-slate-600 text-sm space-y-2 list-decimal pl-4">
                                    <li>REF formunun TÜM özelliklerini taşımalıdır.</li>
                                    <li>Bir sütunda Leading 1 (Pivot) varsa, o sütundaki <strong>diğer bütün sayılar (üstündekiler dahil) SIFIR olmalıdır.</strong></li>
                                    <li className="text-transparent">.</li>
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
            </section>

            {/* Interactive Tool Section */}
            <section className="space-y-6 mt-12">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-slate-800">İnteraktif Araç: Denklemden RREF'e Adım Adım Çözüm</h2>
                </div>
                <p className="text-slate-600">
                    Aşağıdaki kutuya denklemlerinizi alt alta yazın. Araç bunu önce Augmented Matrix'e (Genişletilmiş Matris) dönüştürecek, ardından <strong>Gauss-Jordan Eliminasyon</strong> adımlarını tek tek gösterecektir.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Sol Panel: Girdi */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-5">
                            <h3 className="font-bold text-[#163832] mb-3 flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-[#235347]" />
                                Denklem Sistemi
                            </h3>
                            
                            <div className="flex flex-col gap-2 mb-4">
                                <Button 
                                    variant="outline" 
                                    className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] border border-[#8EB69B]/40 shadow-sm transition-all text-xs justify-start"
                                    onClick={() => setEquationInput(PRESET_EQUATIONS.q1)}
                                >
                                    Soru 1 (No Solution Örneği)
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] border border-[#8EB69B]/40 shadow-sm transition-all text-xs justify-start"
                                    onClick={() => setEquationInput(PRESET_EQUATIONS.q2)}
                                >
                                    Soru 2 (Row Swap Örneği)
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] border border-[#8EB69B]/40 shadow-sm transition-all text-xs justify-start"
                                    onClick={() => setEquationInput(PRESET_EQUATIONS.q3)}
                                >
                                    Soru 3 (4 Değişkenli Sistem)
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="bg-[#DAF1DE] hover:bg-[#8EB69B]/30 text-[#051F20] border border-[#8EB69B]/40 shadow-sm transition-all text-xs justify-start"
                                    onClick={() => setEquationInput(PRESET_EQUATIONS.q4)}
                                >
                                    Soru 4 (Homojen Sistem)
                                </Button>
                            </div>

                            <label className="text-xs font-semibold text-[#051F20] mb-1 block">Denklemleriniz (Her satıra bir denklem):</label>
                            <textarea
                                value={equationInput}
                                onChange={(e) => setEquationInput(e.target.value)}
                                className="w-full h-40 bg-[#051F20] border border-[#163832] shadow-inner rounded-xl p-3 text-[#DAF1DE] font-mono text-sm focus:ring-2 focus:ring-[#8EB69B] outline-none resize-none"
                                placeholder="2x + y = 5&#10;-x + 3y = 7"
                            />
                            
                            {error && (
                                <div className="mt-2 text-rose-700 text-xs flex items-center gap-1 bg-rose-50 p-2 rounded-lg border border-rose-200">
                                    <AlertCircle className="w-4 h-4" /> {error}
                                </div>
                            )}

                            <Button 
                                onClick={() => handleSolve(equationInput)}
                                disabled={isLoading}
                                className="w-full mt-4 bg-[#235347] hover:bg-[#163832] text-white font-medium text-sm rounded-lg shadow-sm transition-all"
                            >
                                {isLoading ? "Hesaplanıyor..." : "Adım Adım Çöz"}
                            </Button>
                        </div>
                    </div>

                    {/* Sağ Panel: Görselleştirici */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {solveData && currentStep ? (
                            <>
                                <StepExplanationCard 
                                    title={currentStep.title}
                                    explanation={currentStep.explanation}
                                    latexAnnotation={currentStep.operation?.latexExplanation}
                                />
                                
                                <div className="flex-1 bg-[#F2F7F4] border border-[#8EB69B]/40 rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-inner">
                                    {currentStepIndex === 0 && variables.length > 0 && (
                                        <div className="absolute top-4 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-sm font-medium text-slate-600 mb-4 flex items-center gap-1">
                                            Tespit edilen değişkenler (Sütun sırasıyla): 
                                            {variables.map((v, i) => (
                                                <React.Fragment key={v}>
                                                    <InlineMath math={v} />
                                                    {i < variables.length - 1 && ", "}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    )}
                                    <MatrixRowOpsTable 
                                        matrix={currentStep.matrix} 
                                        pivot={currentStep.pivot}
                                        activeRows={currentStep.activeRows}
                                    />
                                </div>

                                <TimeTravelControls 
                                    currentStep={currentStepIndex}
                                    totalSteps={solveData.totalSteps}
                                    onStepChange={setCurrentStepIndex}
                                />
                            </>
                        ) : (
                            <div className="flex-1 bg-white border border-slate-200/80 shadow-sm p-5 rounded-xl flex flex-col items-center justify-center text-[#163832] font-medium min-h-[400px]">
                                <BookOpen className="w-16 h-16 mb-4 opacity-20" />
                                <p>Hesaplamayı başlatmak için soldaki paneli kullanın.</p>
                                <p className="text-sm mt-2 opacity-50">Sistem önce denklemi matrise çevirecek, sonra Gauss Eliminasyonu yapacaktır.</p>
                            </div>
                        )}
                    </div>
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
                                <p className="text-amber-700">İlk denkleme dikkat edin: x değişkeni yok! Matrise çevirdiğinizde sol üst köşe (pivot adayımız) <strong>0</strong> olur. Sıfırı pivot yapamayacağımız için ilk adımımız yukarıdaki gibi mutlaka <strong>Row Swap (Satır Değiştirme)</strong> olmalıdır. Son RREF halinden de görüldüğü gibi çözüm: <strong>x=5, y=-4, z=3</strong>.</p>
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
                    <h2 className="text-3xl font-bold text-slate-800">Ekstra Sorular (Düşündürücü ve Tuzaklı)</h2>
                </div>
                <p className="text-slate-600 mb-8">
                    Bu sorular ilk bakışta kolay görünebilir ancak her birinin içinde sınavda puan kaybettirebilecek bir <strong>tuzak</strong> gizlidir. Kendinizi test edin ve ardından tuzağı ve çözümü görmek için butonlara tıklayın!
                </p>

                <div className="grid grid-cols-1 gap-8">
                    {/* Soru 1 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 flex flex-col">
                        <h3 className="font-bold text-slate-800 mb-4">Ekstra Soru 1: Gizli İkizler</h3>
                        <div className="bg-slate-50 p-4 rounded-xl text-center mb-4 overflow-x-auto">
                            <BlockMath math="\begin{aligned} x + 2y - z &= 4 \\ 2x - y + 3z &= 5 \\ 4x - 2y + 6z &= 10 \end{aligned}" />
                        </div>
                        <details className="group mt-auto">
                            <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors">
                                Çözümü ve Matrisi Gör
                            </summary>
                            <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700">
                                <p className="mb-4"><strong>Tuzak:</strong> 2. ve 3. denklemlere dikkatli bakarsanız, 3. denklemin tamamen 2. denklemin 2 katı olduğunu görürsünüz! (Lineer Bağımlı)</p>
                                <div className="flex flex-wrap gap-4 items-center overflow-x-auto pb-4 mb-4">
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-xs text-slate-500 mb-1">Başlangıç</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 2 & -1 & | & 4 \\ 2 & -1 & 3 & | & 5 \\ 4 & -2 & 6 & | & 10 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400 text-xs">➔<br/>R_2-2R_1<br/>R_3-4R_1</div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 2 & -1 & | & 4 \\ 0 & -5 & 5 & | & -3 \\ 0 & -10 & 10 & | & -6 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400 text-xs">➔<br/>R_3-2R_2</div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-xs text-indigo-500 font-bold mb-1">Sonuç (Sıfır Satırı)</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 2 & -1 & | & 4 \\ 0 & -5 & 5 & | & -3 \\ 0 & 0 & 0 & | & 0 \end{bmatrix}" />
                                    </div>
                                </div>
                                <p><strong>Sonuç:</strong> 3. satır tamamen sıfırlandı <InlineMath math="[0 \ 0 \ 0 \ | \ 0]" />. Geriye 3 değişken ve bağımsız 2 denklem kaldı. <strong>Sonsuz Çözüm (Infinite Solutions)</strong> vardır.</p>
                            </div>
                        </details>
                    </div>

                    {/* Soru 2 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 flex flex-col">
                        <h3 className="font-bold text-slate-800 mb-4">Ekstra Soru 2: Karmaşa Tuzağı</h3>
                        <div className="bg-slate-50 p-4 rounded-xl text-center mb-4 overflow-x-auto">
                            <BlockMath math="\begin{aligned} z + 2y - x &= 5 \\ 3x - y + 4z &= 2 \\ y - z + x &= 1 \end{aligned}" />
                        </div>
                        <details className="group mt-auto">
                            <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors">
                                Çözümü ve Matrisi Gör
                            </summary>
                            <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700">
                                <p className="mb-4"><strong>Tuzak:</strong> Değişkenlerin sırası her denklemde farklı yazılmış! Önce denklemleri <InlineMath math="x, y, z" /> sırasına göre dizmelisiniz.</p>
                                <div className="flex flex-wrap gap-4 items-center overflow-x-auto pb-4 mb-4">
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-xs text-slate-500 mb-1">Düzeltilmiş Başlangıç</p>
                                        <BlockMath math="\begin{bmatrix} -1 & 2 & 1 & | & 5 \\ 3 & -1 & 4 & | & 2 \\ 1 & 1 & -1 & | & 1 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400 text-xs">➔<br/>R_1 \leftrightarrow R_3</div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & -1 & | & 1 \\ 3 & -1 & 4 & | & 2 \\ -1 & 2 & 1 & | & 5 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400 text-xs">➔<br/>İndirgemeler</div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-xs text-indigo-500 font-bold mb-1">Final RREF</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 0 & 0 & | & -1 \\ 0 & 1 & 0 & | & 2 \\ 0 & 0 & 1 & | & 1 \end{bmatrix}" />
                                    </div>
                                </div>
                                <p><strong>Sonuç:</strong> Değişkenleri doğru hizaladığımızda sistemin düzgün bir <strong>Tek Çözümü (x=-1, y=2, z=1)</strong> olduğu ortaya çıkar.</p>
                            </div>
                        </details>
                    </div>

                    {/* Soru 3 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 flex flex-col">
                        <h3 className="font-bold text-slate-800 mb-4">Ekstra Soru 3: Fazlalık İllüzyonu (Overdetermined)</h3>
                        <div className="bg-slate-50 p-4 rounded-xl text-center mb-4 overflow-x-auto">
                            <BlockMath math="\begin{aligned} x + y &= 3 \\ x - y &= 1 \\ 2x + 3y &= 7 \end{aligned}" />
                        </div>
                        <details className="group mt-auto">
                            <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors">
                                Çözümü ve Matrisi Gör
                            </summary>
                            <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700">
                                <p className="mb-4"><strong>Tuzak:</strong> 2 değişken ama 3 denklem var. "Fazla denklem var, kesin çözümsüz" illüzyonu.</p>
                                <div className="flex flex-wrap gap-4 items-center overflow-x-auto pb-4 mb-4">
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-xs text-slate-500 mb-1">Başlangıç</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & | & 3 \\ 1 & -1 & | & 1 \\ 2 & 3 & | & 7 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400 text-xs">➔<br/>R_2-R_1<br/>R_3-2R_1</div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & | & 3 \\ 0 & -2 & | & -2 \\ 0 & 1 & | & 1 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400 text-xs">➔<br/>R_2/-2</div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & | & 3 \\ 0 & 1 & | & 1 \\ 0 & 1 & | & 1 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400 text-xs">➔<br/>R_3-R_2<br/>R_1-R_2</div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-xs text-indigo-500 font-bold mb-1">Final</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 0 & | & 2 \\ 0 & 1 & | & 1 \\ 0 & 0 & | & 0 \end{bmatrix}" />
                                    </div>
                                </div>
                                <p><strong>Sonuç:</strong> Son denklem aslında ilk ikisiyle tamamen uyumludur (0=0 çıkar). <strong>Tek Çözüm (x=2, y=1)</strong> vardır.</p>
                            </div>
                        </details>
                    </div>

                    {/* Soru 4 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 flex flex-col">
                        <h3 className="font-bold text-slate-800 mb-4">Ekstra Soru 4: Yetersiz Bilgi Tuzağı (Underdetermined)</h3>
                        <div className="bg-slate-50 p-4 rounded-xl text-center mb-4 overflow-x-auto">
                            <BlockMath math="\begin{aligned} x + y + z &= 5 \\ 2x + 2y + 2z &= 12 \end{aligned}" />
                        </div>
                        <details className="group mt-auto">
                            <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors">
                                Çözümü ve Matrisi Gör
                            </summary>
                            <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700">
                                <p className="mb-4"><strong>Tuzak:</strong> Değişken fazla olduğu için "kesin sonsuz çözüm vardır" yanılgısı.</p>
                                <div className="flex flex-wrap gap-4 items-center overflow-x-auto pb-4 mb-4">
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-xs text-slate-500 mb-1">Başlangıç</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & 1 & | & 5 \\ 2 & 2 & 2 & | & 12 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400 text-xs">➔<br/>R_2-2R_1</div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-xs text-rose-500 font-bold mb-1">Çelişki!</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 1 & 1 & | & 5 \\ 0 & 0 & 0 & | & 2 \end{bmatrix}" />
                                    </div>
                                </div>
                                <p><strong>Sonuç:</strong> Denklemler birbirine paralel düzlemleri temsil ettiği için (katsayılar 2 katıyken sonuç 2 katı değil) matris <strong>0 = 2</strong> çelişkisine düşer. <strong>Çözüm Yok (No Solution)</strong>.</p>
                            </div>
                        </details>
                    </div>

                    {/* Soru 5 */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 md:col-span-2">
                        <h3 className="font-bold text-slate-800 mb-4">Ekstra Soru 5: Sparse (Seyrek) Sistem</h3>
                        <div className="bg-slate-50 p-4 rounded-xl text-center mb-4 overflow-x-auto">
                            <BlockMath math="\begin{aligned} x_1 + x_4 &= 5 \\ x_2 - x_3 &= 2 \\ x_1 + x_2 &= 3 \\ x_3 + x_4 &= 4 \end{aligned}" />
                        </div>
                        <details className="group">
                            <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors w-full md:w-1/2 mx-auto">
                                Çözümü ve Matrisi Gör
                            </summary>
                            <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700">
                                <p className="mb-4"><strong>Tuzak:</strong> Matriste çok fazla 0 olduğu için göz korkutur ve sanki bağımlı denklemler varmış gibi görünür.</p>
                                <div className="flex flex-wrap gap-4 items-center overflow-x-auto pb-4 mb-4">
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-xs text-slate-500 mb-1">Başlangıç</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 0 & 0 & 1 & | & 5 \\ 0 & 1 & -1 & 0 & | & 2 \\ 1 & 1 & 0 & 0 & | & 3 \\ 0 & 0 & 1 & 1 & | & 4 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400 text-xs">➔<br/>R_3-R_1</div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 0 & 0 & 1 & | & 5 \\ 0 & 1 & -1 & 0 & | & 2 \\ 0 & 1 & 0 & -1 & | & -2 \\ 0 & 0 & 1 & 1 & | & 4 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400 text-xs">➔<br/>R_3-R_2<br/>R_4-R_3</div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <BlockMath math="\begin{bmatrix} 1 & 0 & 0 & 1 & | & 5 \\ 0 & 1 & -1 & 0 & | & 2 \\ 0 & 0 & 1 & -1 & | & -4 \\ 0 & 0 & 0 & 2 & | & 8 \end{bmatrix}" />
                                    </div>
                                    <div className="text-slate-400 text-xs">➔<br/>R_4/2<br/>Backward</div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-xs text-indigo-500 font-bold mb-1">Final RREF</p>
                                        <BlockMath math="\begin{bmatrix} 1 & 0 & 0 & 0 & | & 1 \\ 0 & 1 & 0 & 0 & | & 2 \\ 0 & 0 & 1 & 0 & | & 0 \\ 0 & 0 & 0 & 1 & | & 4 \end{bmatrix}" />
                                    </div>
                                </div>
                                <p><strong>Sonuç:</strong> Korkutucu görünmesine rağmen matris mükemmel bir şekilde çözülür. Herhangi bir çelişki yoktur, tam tersine <strong>Tek Çözüm (x1=1, x2=2, x3=0, x4=4)</strong> bulunur. Gauss-Jordan'ın gücü budur; sezgilere güvenmek yerine algoritmayı takip etmek sizi her zaman doğruya götürür!</p>
                            </div>
                        </details>
                    </div>
                </div>
            </section>

        </div>
    );
}
