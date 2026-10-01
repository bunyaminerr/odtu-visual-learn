"use client";

import React from "react";
import { Cpu, CircleDot, Activity, Zap, Layers, Beaker, FileSignature } from "lucide-react";
import { TruthTableGenerator } from "@/components/visualizers/logic/TruthTableGenerator";
import { TheoremProver } from "@/components/visualizers/logic/TheoremProver";

export default function BooleanAlgebraPage() {
    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-4 sm:p-8 flex justify-center">
            <div className="max-w-5xl w-full flex flex-col gap-10">
                
                {/* Header */}
                <header className="border-b border-slate-300 pb-6">
                    <div className="flex items-center gap-3 text-[#051F20] mb-2">
                        <Cpu className="w-10 h-10 text-[#235347]" />
                        <h1 className="text-3xl font-extrabold tracking-tight">CNG 232</h1>
                    </div>
                    <h2 className="text-lg font-semibold text-[#235347] flex items-center gap-2 mt-1">
                        <CircleDot className="w-5 h-5" /> 
                        2. Boolean Algebra and Logic Gates (Boolean Cebiri ve Mantık Kapıları)
                    </h2>
                    <p className="mt-3 text-slate-600 font-medium leading-relaxed">
                        Boolean cebiri, sadece 0 ve 1 (True/False) ile çalışan matematiksel bir yapıdır. Bu bölümde temel mantık kurallarını, fonksiyonları sadeleştirmeyi (Algebraic Manipulation), Minterm/Maxterm gibi sınavların temelini oluşturan standart formları ve donanımda kullanılan Mantık Kapılarını öğreneceğiz.
                    </p>
                </header>

                <div className="flex flex-col gap-12">
                    
                    {/* Topic 1: Basic Definitions */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><Activity className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">1. Temel Tanımlar ve Kurallar (Huntington Postulates)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-5 text-lg">
                            <p>
                                Normal cebirden farklı olarak Boolean cebirinde: <strong>Toplama (+) OR (VEYA)</strong> kapısını, <strong>Çarpma (·) AND (VE)</strong> kapısını temsil eder.
                            </p>
                            
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-4 text-xl border-b pb-2">Huntington Postulatları (Aksiyomlar)</h3>
                                <ul className="list-disc pl-6 space-y-4 text-base">
                                    <li><strong>Closure (Kapalılık):</strong> {"{"}0, 1{"}"} kümesinde yapılan tüm AND ve OR işlemleri yine {"{"}0, 1{"}"} sonucunu verir.</li>
                                    <li>
                                        <strong>Identity (Birim Eleman):</strong> 
                                        <br/>OR (+) için etkisiz eleman 0'dır: <code className="bg-white px-2 py-1 rounded text-[#235347]">X + 0 = X</code>
                                        <br/>AND (·) için etkisiz eleman 1'dir: <code className="bg-white px-2 py-1 rounded text-[#235347]">X · 1 = X</code>
                                    </li>
                                    <li><strong>Commutativity (Değişme):</strong> <code className="bg-white px-2 py-1 rounded text-[#235347]">X + Y = Y + X</code> ve <code className="bg-white px-2 py-1 rounded text-[#235347]">X · Y = Y · X</code></li>
                                    <li>
                                        <strong>Distributivity (Dağılma):</strong> Normal matematikte olduğu gibi AND, OR üzerine dağılır: <code className="bg-white px-2 py-1 rounded text-[#235347]">X · (Y + Z) = (X · Y) + (X · Z)</code>. 
                                        <br/>Ancak Boolean cebirinde <strong>OR da AND üzerine dağılır!</strong> (Bu kural çok önemlidir): 
                                        <code className="bg-[#DAF1DE] px-2 py-1 rounded text-[#163832] font-bold block w-max mt-2">X + (Y · Z) = (X + Y) · (X + Z)</code>
                                    </li>
                                    <li><strong>Complement (Tümleyen):</strong> Her X için bir X' vardır öyle ki: <code className="bg-white px-2 py-1 rounded text-[#235347]">X + X' = 1</code> ve <code className="bg-white px-2 py-1 rounded text-[#235347]">X · X' = 0</code></li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                                <h3 className="font-bold text-blue-900 mb-2 text-xl">Duality Principle (Dualite / İkilik İlkesi)</h3>
                                <p className="text-base text-blue-800">
                                    Boolean cebirinde bir ifade geçerliyse (doğruysa), onun <strong>"Dual"</strong> (ikiz) hali de kesinlikle geçerlidir. Bir ifadenin Dual'ini almak için:
                                </p>
                                <ul className="list-disc pl-6 space-y-1 mt-3 text-base text-blue-900 font-medium">
                                    <li>Tüm <strong>+ (OR)</strong> operatörlerini <strong>· (AND)</strong> yapın.</li>
                                    <li>Tüm <strong>· (AND)</strong> operatörlerini <strong>+ (OR)</strong> yapın.</li>
                                    <li>Tüm <strong>0</strong>'ları <strong>1</strong>, tüm <strong>1</strong>'leri <strong>0</strong> yapın.</li>
                                    <li><em className="text-sm opacity-80">(Dikkat: Değişkenlerin tümleyenini (NOT) ALMAYIN! Dualite ile De Morgan farklı şeylerdir.)</em></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Topic 2: Theorems and Algebraic Manipulation */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><Beaker className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">2. Teoremler ve Fonksiyon Sadeleştirme (Simplification)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-5 text-lg">
                            <p>Bir Boolean fonksiyonunu lojik kapılarla donanıma dökerken, ifadedeki <strong>Terim sayısı (term)</strong> kadar kapıya ve <strong>Literal sayısı</strong> (değişken sayısı) kadar kabloya/girişe ihtiyaç duyarız. Daha ucuz ve az yer kaplayan devreler tasarlamak için ifadeleri <strong>sadeleştirmeliyiz</strong>.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Önemli Teoremler</h4>
                                    <ul className="space-y-3 text-base font-mono text-sm">
                                        <li className="flex justify-between items-center bg-white p-2 rounded"><span>Idempotent:</span> <strong>X + X = X</strong>, <strong>X · X = X</strong></li>
                                        <li className="flex justify-between items-center bg-white p-2 rounded"><span>Null:</span> <strong>X + 1 = 1</strong>, <strong>X · 0 = 0</strong></li>
                                        <li className="flex justify-between items-center bg-white p-2 rounded"><span>Involution:</span> <strong>(X')' = X</strong></li>
                                        <li className="flex justify-between items-center bg-[#DAF1DE] p-2 rounded"><span>Absorption 1:</span> <strong>X + XY = X</strong></li>
                                        <li className="flex justify-between items-center bg-[#DAF1DE] p-2 rounded"><span>Absorption 2:</span> <strong>X + X'Y = X + Y</strong></li>
                                    </ul>
                                </div>
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">De Morgan Kuralları</h4>
                                    <p className="text-sm mb-3">Tüm ifade terslenirken (NOT alınırken) uygulanır:</p>
                                    <ul className="space-y-3 text-base font-mono text-sm">
                                        <li className="bg-white p-3 rounded text-center font-bold text-rose-700 border border-rose-100">(X + Y)' = X' · Y'</li>
                                        <li className="bg-white p-3 rounded text-center font-bold text-rose-700 border border-rose-100">(X · Y)' = X' + Y'</li>
                                    </ul>
                                    <p className="text-xs text-slate-500 mt-2 text-center">Tüm değişkenler terslenir, işaretler yer değiştirir!</p>
                                </div>
                            </div>

                            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 mt-6">
                                <h3 className="font-bold text-amber-900 mb-4">Sadeleştirme Örneği (Algebraic Manipulation)</h3>
                                <p className="text-base text-amber-900 font-mono">
                                    Soru: <strong>(X + Y) (X + Y')</strong> ifadesini sadeleştirin.<br/><br/>
                                    <strong>Çözüm:</strong><br/>
                                    = X·X + X·Y' + X·Y + Y·Y' &nbsp; &nbsp; (Dağılma kuralı)<br/>
                                    = X + X·Y' + X·Y + 0 &nbsp; &nbsp; &nbsp; &nbsp;(X·X=X ve Y·Y'=0)<br/>
                                    = X + X(Y' + Y) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(X parantezine alma)<br/>
                                    = X + X(1) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(Y'+Y=1)<br/>
                                    = X + X = <strong>X</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(Sonuç!)
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Topic 3: Minterms and Maxterms */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><FileSignature className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">3. Standart Formlar (Minterms & Maxterms)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-6 text-lg">
                            <p>Bir Boolean fonksiyonunu tamamen standart (kanonik) bir şekilde ifade etmek için kullanılırlar. Herhangi bir fonksiyon, Minterm'lerin toplamı (Sum of Minterms) veya Maxterm'lerin çarpımı (Product of Maxterms) şeklinde ifade edilebilir.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border border-indigo-200 bg-indigo-50 rounded-2xl p-6">
                                    <h3 className="font-bold text-indigo-900 text-xl mb-3">Minterm (Standart Çarpım)</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-indigo-800 text-base">
                                        <li>Tüm değişkenlerin <strong>AND</strong> (·) ile birleştiği terimlerdir.</li>
                                        <li>Değişken <strong>1 ise düz (X)</strong>, <strong>0 ise ters (X')</strong> yazılır.</li>
                                        <li>Küçük <strong>m</strong> harfiyle gösterilir. Örn: 010 (X=0, Y=1, Z=0) → m<sub>2</sub> = X'YZ'</li>
                                        <li>Bir fonksiyon, çıkışın (sonucun) <strong>1</strong> olduğu Minterm'lerin toplamıdır: Σm(1, 3, 4)</li>
                                    </ul>
                                </div>
                                <div className="border border-emerald-200 bg-emerald-50 rounded-2xl p-6">
                                    <h3 className="font-bold text-emerald-900 text-xl mb-3">Maxterm (Standart Toplam)</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-emerald-800 text-base">
                                        <li>Tüm değişkenlerin <strong>OR</strong> (+) ile birleştiği terimlerdir.</li>
                                        <li>Minterm'in tam tersi mantık çalışır! Değişken <strong>0 ise düz (X)</strong>, <strong>1 ise ters (X')</strong> yazılır.</li>
                                        <li>Büyük <strong>M</strong> harfiyle gösterilir. Örn: 010 (X=0, Y=1, Z=0) → M<sub>2</sub> = X + Y' + Z</li>
                                        <li>Bir fonksiyon, çıkışın (sonucun) <strong>0</strong> olduğu Maxterm'lerin çarpımıdır: ΠM(0, 2, 5)</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <p className="text-sm bg-slate-100 p-3 rounded-lg border border-slate-200 mt-4 text-center">
                                <strong>Kritik Kural:</strong> Bir terimin Minterm'inin tersi, onun Maxterm'ine eşittir. (m<sub>j</sub>)' = M<sub>j</sub>
                            </p>
                        </div>
                        
                        <div className="mt-8">
                            <h3 className="font-bold text-[#163832] mb-4">Doğruluk Tablosu ve Fonksiyon (Truth Tables)</h3>
                            <TruthTableGenerator />
                        </div>
                    </section>

                    {/* Topic 4: Logic Gates Visualizer */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><Zap className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">4. Mantık Kapıları (Logic Gates)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-4 mb-8 text-lg">
                            <p>Fiziksel dünyada (devre kartlarında) lojik denklemleri transistör bazlı entegre devrelerle çalıştırırız. Temel mantık kapıları şunlardır:</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-base">
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                    <strong>AND (VE):</strong> X · Y<br/>Bütün girişler 1 ise çıkış 1'dir.
                                </div>
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                    <strong>OR (VEYA):</strong> X + Y<br/>Herhangi bir giriş 1 ise çıkış 1'dir.
                                </div>
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                    <strong>NOT (DEĞİL / Inverter):</strong> X'<br/>0'ı 1, 1'i 0 yapar.
                                </div>
                                <div className="p-4 bg-[#DAF1DE] border border-[#235347]/20 rounded-xl">
                                    <strong>NAND:</strong> (X · Y)'<br/>AND'in tersidir. (Universal Kapı)
                                </div>
                                <div className="p-4 bg-[#DAF1DE] border border-[#235347]/20 rounded-xl">
                                    <strong>NOR:</strong> (X + Y)'<br/>OR'un tersidir. (Universal Kapı)
                                </div>
                                <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                                    <strong>XOR (Özel VEYA):</strong> X ⊕ Y<br/>Girişler farklıysa 1, aynıysa 0 (Teklik dedektörü).
                                </div>
                                <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl lg:col-start-2">
                                    <strong>XNOR:</strong> (X ⊕ Y)'<br/>Girişler aynıysa 1, farklıysa 0 (Eşitlik dedektörü).
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 border-t pt-8">
                            <TheoremProver />
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
