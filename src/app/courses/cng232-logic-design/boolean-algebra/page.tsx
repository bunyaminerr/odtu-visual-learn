"use client";

import React from "react";
import { Cpu, CircleDot, Activity, Zap } from "lucide-react";
import { TruthTableGenerator } from "@/components/visualizers/logic/TruthTableGenerator";
import { TheoremProver } from "@/components/visualizers/logic/TheoremProver";

export default function BooleanAlgebraPage() {
    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-6 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col gap-10">
                
                <header className="border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-3 text-[#051F20] mb-2">
                        <Cpu className="w-8 h-8" />
                        <h1 className="text-2xl font-bold tracking-tight text-[#051F20]">CNG 232</h1>
                    </div>
                    <h2 className="text-sm font-medium text-[#235347] flex items-center gap-2">
                        <CircleDot className="w-4 h-4" /> 
                        Boolean Algebra and Logic Gates (Boolean Cebiri ve Mantık Kapıları)
                    </h2>
                </header>

                <div className="flex flex-col gap-12">
                    
                    {/* Topic 1: Boolean Algebra Intro */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4 text-[#235347]">
                            <Activity className="w-6 h-6" />
                            <h2 className="text-xl font-bold">1. Boolean Cebiri (Boolean Algebra) Nedir?</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-4">
                            <p>
                                <strong>Boolean Cebiri</strong>, sadece iki değer alabilen (0 ve 1, True ve False) değişkenler üzerinde işlem yapan matematiksel bir yapıdır. Bilgisayarların ve dijital devrelerin mantıksal temelini oluşturur.
                                Normal cebirden farklı olarak, toplama (+) işlemi mantıksal <strong>OR (VEYA)</strong>, çarpma (·) işlemi ise mantıksal <strong>AND (VE)</strong> anlamına gelir.
                            </p>
                            <h3 className="font-bold text-[#163832] mt-4">Temel Kurallar ve Aksiyomlar (Postulates & Theorems):</h3>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>Identity (Birim Eleman):</strong> $x + 0 = x$, $x \cdot 1 = x$</li>
                                <li><strong>Null (Sıfırlama):</strong> $x + 1 = 1$, $x \cdot 0 = 0$</li>
                                <li><strong>Idempotency (Tek Kuvvetlilik):</strong> $x + x = x$, $x \cdot x = x$</li>
                                <li><strong>Involution (Tersinin Tersi):</strong> $(x')' = x$</li>
                                <li><strong>Commutative (Değişme):</strong> $x + y = y + x$, $x \cdot y = y \cdot x$</li>
                                <li><strong>Distributive (Dağılma):</strong> $x(y + z) = xy + xz$ ve (normal matematikte olmayan) $x + yz = (x+y)(x+z)$</li>
                                <li><strong>Absorption (Yutma):</strong> $x + xy = x$, $x(x+y) = x$</li>
                            </ul>

                            <div className="mt-4 bg-[#F2F7F4] p-4 rounded-xl border border-[#DAF1DE]">
                                <h3 className="font-bold mb-2 text-[#163832]">De Morgan Kuralları (De Morgan's Theorems)</h3>
                                <p className="text-sm text-[#235347]">
                                    Dijital tasarımın en kritik kuralıdır. Bir ifadenin tersi (tümleyeni) alınırken değişkenlerin tümleyeni alınır, <strong>AND'ler OR'a, OR'lar AND'e</strong> dönüşür.
                                    <br/><br/>
                                    1. $(x + y)' = x' \cdot y'$ (NOR = AND with inverted inputs)<br/>
                                    2. $(x \cdot y)' = x' + y'$ (NAND = OR with inverted inputs)
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Topic 2: Logic Gates Visualizer */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4 text-[#235347]">
                            <Zap className="w-6 h-6" />
                            <h2 className="text-xl font-bold">2. Mantık Kapıları (Logic Gates)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-4 mb-8">
                            <p>Boolean fonksiyonlarını fiziksel dünyada (elektronikte) uygulayan donanım devrelerine mantık kapıları denir. Transistörler kullanılarak üretilirler.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>AND (VE):</strong> Çarpma işlemi. Bütün girişler 1 ise çıkış 1'dir.</li>
                                <li><strong>OR (VEYA):</strong> Toplama işlemi. Girişlerden herhangi biri 1 ise çıkış 1'dir.</li>
                                <li><strong>NOT (DEĞİL):</strong> Tersleme (Inverter) işlemi. 0'ı 1, 1'i 0 yapar.</li>
                                <li><strong>NAND ve NOR:</strong> Sırasıyla AND ve OR'un terslenmiş halleridir. (Universal, yani evrensel kapılardır. Bütün bilgisayar donanımı tek başına NAND kapısı kullanılarak yapılabilir).</li>
                                <li><strong>XOR (Exclusive-OR):</strong> Girişler <em>farklıysa</em> 1, aynıysa 0 verir. "Teklik" dedektörüdür. ($x \oplus y = xy' + x'y$)</li>
                                <li><strong>XNOR:</strong> XOR'un tersidir. Girişler <em>aynıysa</em> 1, farklıysa 0 verir. "Eşitlik" dedektörüdür.</li>
                            </ul>
                        </div>
                        
                        <TheoremProver />
                    </section>

                    {/* Topic 3: Truth Tables */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4 text-[#235347]">
                            <Activity className="w-6 h-6" />
                            <h2 className="text-xl font-bold">3. Boolean Fonksiyonları ve Doğruluk Tabloları (Truth Tables)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-4 mb-8">
                            <p>Bir Boolean fonksiyonu, giriş değişkenlerinin her olası kombinasyonunu (0 veya 1) tek bir çıkış değerine eşler. $n$ adet değişken varsa, $2^n$ adet farklı kombinasyon (satır) vardır.</p>
                            <p><strong>Öncelik Sırası (Operator Precedence):</strong> Fonksiyon hesaplanırken sırasıyla Parantezler $\rightarrow$ NOT (') $\rightarrow$ AND ($\cdot$) $\rightarrow$ OR (+) işlemleri yapılır.</p>
                            <p className="text-sm bg-amber-50 p-3 rounded-lg border border-amber-200">
                                <em>İpucu: Bir Boolean fonksiyonu sonsuz farklı şekilde cebirsel olarak yazılabilir (Örn: $F = x'y'z + x'yz = x'z$). Ancak doğruluk tablosu <strong>tektir ve benzersizdir</strong>.</em>
                            </p>
                        </div>
                        
                        <TruthTableGenerator />
                    </section>

                </div>
            </div>
        </div>
    );
}
