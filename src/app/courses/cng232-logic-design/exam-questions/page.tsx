"use client";

import React, { useState } from "react";
import { PenTool, Target, Layers, FileQuestion, CheckCircle, AlertTriangle, ArrowRight, BookOpen, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  { id: "ch1", num: 1, title: "Digital Systems & Binary Numbers" },
  { id: "ch2", num: 2, title: "Boolean Algebra & Logic Gates" },
  { id: "ch3", num: 3, title: "Boolean Algebra & K-Maps" },
  { id: "ch4", num: 4, title: "Combinational Circuits" },
  { id: "ch5", num: 5, title: "Sequential Circuits" },
  { id: "ch6", num: 6, title: "Registers & Counters" },
  { id: "ch8", num: 8, title: "FSMs & Datapaths" },
  { id: "ch9", num: 9, title: "Asynchronous Circuits" },
];

export default function ExamQuestionsPage() {
    const [activeChapter, setActiveChapter] = useState("ch6");

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-4 sm:p-8 flex justify-center">
            <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8">
                
                {/* Left Sidebar for Chapters */}
                <aside className="w-full md:w-80 flex-shrink-0">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto style-scroll">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                            <PenTool className="w-6 h-6 text-[#235347]" />
                            <h2 className="text-xl font-extrabold tracking-tight">Sınav Soruları</h2>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            {CHAPTERS.map(ch => (
                                <button
                                    key={ch.id}
                                    onClick={() => setActiveChapter(ch.id)}
                                    className={cn(
                                        "flex flex-col text-left px-4 py-3 rounded-xl transition-all border",
                                        activeChapter === ch.id 
                                            ? "bg-[#235347] border-[#235347] text-white shadow-md" 
                                            : "bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200"
                                    )}
                                >
                                    <span className={cn("text-xs font-bold mb-1", activeChapter === ch.id ? "text-emerald-300" : "text-slate-400")}>
                                        Chapter {ch.num}
                                    </span>
                                    <span className="font-semibold text-sm">{ch.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Right Content Area */}
                <main className="flex-1 min-w-0">
                    
                    {/* CHAPTER 6: Registers & Counters */}
                    {activeChapter === "ch6" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h2 className="text-2xl font-bold text-[#163832] flex items-center gap-2">
                                    <Layers className="w-6 h-6 text-[#235347]" /> 
                                    Chapter 6: Registers & Counters
                                </h2>
                                <p className="text-slate-500 mt-2 text-sm font-medium">Bu bölümde Sayıcılar (Counters) ve Kaydediciler (Registers) ile ilgili çıkmış vize/final sorularını bulabilirsiniz.</p>
                            </div>

                            {/* Prob 1 */}
                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                {/* Header */}
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">MIT 6.111</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2003 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 1: Counter Design (Sayıcı Tasarımı)</h3>
                                </div>

                                {/* Question Section */}
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                                Aşağıdaki State Transition (Durum Geçiş) tablosuna sahip bir sayıcı (counter) tasarlanacaktır. Tabloda <code>Q2, Q1, Q0</code> sistemin mevcut durumunu (Present State); <code>N2, N1, N0</code> ise sistemin sonraki durumunu (Next State) ifade etmektedir.
                                            </p>
                                            
                                            {/* Data Table */}
                                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full max-w-lg">
                                                <table className="w-full text-center border-collapse font-mono text-sm">
                                                    <thead>
                                                        <tr className="bg-slate-100 text-slate-600">
                                                            <th className="p-2 border">Q2</th><th className="p-2 border">Q1</th><th className="p-2 border border-r-2 border-r-slate-400">Q0</th>
                                                            <th className="p-2 border">N2</th><th className="p-2 border">N1</th><th className="p-2 border">N0</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border border-r-2 border-r-slate-400">0</td><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border">1</td></tr>
                                                        <tr className="bg-slate-50"><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border border-r-2 border-r-slate-400">1</td><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border">1</td></tr>
                                                        <tr><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border border-r-2 border-r-slate-400">0</td><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border">0</td></tr>
                                                        <tr className="bg-slate-50"><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border border-r-2 border-r-slate-400">1</td><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border">0</td></tr>
                                                        <tr><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border border-r-2 border-r-slate-400">0</td><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border">0</td></tr>
                                                        <tr className="bg-slate-50"><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border border-r-2 border-r-slate-400">1</td><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border">0</td></tr>
                                                        <tr><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border border-r-2 border-r-slate-400">0</td><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border">1</td></tr>
                                                        <tr className="bg-slate-50"><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border border-r-2 border-r-slate-400">1</td><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border">1</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="space-y-2 mt-4 bg-white p-4 rounded-xl border border-slate-200">
                                                <p className="text-sm font-semibold text-slate-800">Sizden İstenenler:</p>
                                                <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                    <li><strong>(a)</strong> N2, N1 ve N0 sinyallerini Q2, Q1 ve Q0 cinsinden "Sum of Products" (Çarpımların Toplamı) formatında K-Map kullanarak bulun (Sadeleştirme zorunlu değil).</li>
                                                    <li><strong>(b)</strong> Başlangıç durumu <code>000</code> olacak şekilde sistemin State Diagram'ını (Durum Geçiş Diyagramı) çizin.</li>
                                                    <li><strong>(c)</strong> Bu sayıcıyı 3 adet T-Flip Flop kullanarak tasarlayın. T2, T1 ve T0 için giriş mantık denklemlerini yazın.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Solution Section */}
                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    {/* 1b */}
                                    <div className="bg-[#F2F7F4] border border-[#DAF1DE] rounded-xl p-5 space-y-4 shadow-sm">
                                        <h5 className="font-bold text-[#163832] border-b border-emerald-200 pb-2">(b) State Diagram (Durum Akışı)</h5>
                                        <p className="text-sm text-slate-700">Tablodaki değerleri sırasıyla takip ettiğimizde (örn: 000 &rarr; 001 &rarr; 011 ...) tüm durumları kapsayan tek bir kapalı sayma halkası (ring) oluşur:</p>
                                        <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-lg border border-emerald-200 font-mono text-sm font-bold justify-center shadow-inner">
                                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">000</span> &rarr;
                                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">001</span> &rarr;
                                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">011</span> &rarr;
                                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">010</span> &rarr;
                                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">110</span> &rarr;
                                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">111</span> &rarr;
                                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">101</span> &rarr;
                                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">100</span> &rarr;
                                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">000</span>
                                        </div>
                                        <p className="text-xs text-slate-500 italic mt-2">Bu bir 3-bit Gray Code dizilimidir. Her adımda sadece tek bir bit değişerek ilerler.</p>
                                    </div>

                                    {/* 1a */}
                                    <div className="border border-blue-200 bg-blue-50/30 rounded-xl p-5 shadow-sm">
                                        <h5 className="font-bold text-blue-900 mb-4 border-b border-blue-200 pb-2">(a) K-Map ile Next State Denklemleri</h5>
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            <div className="bg-white p-3 rounded border border-slate-200">
                                                <div className="font-bold text-center text-slate-700 mb-2">N2 Haritası</div>
                                                <table className="w-full text-center border-collapse font-mono text-sm">
                                                    <thead><tr><th className="border p-1">Q2 \ Q1Q0</th><th className="border p-1">00</th><th className="border p-1">01</th><th className="border p-1">11</th><th className="border p-1">10</th></tr></thead>
                                                    <tbody>
                                                        <tr><td className="border p-1 font-bold bg-slate-50">0</td><td className="border p-1 text-slate-300">0</td><td className="border p-1 text-slate-300">0</td><td className="border p-1 text-slate-300">0</td><td className="border p-1 bg-amber-100 font-bold text-amber-700">1</td></tr>
                                                        <tr><td className="border p-1 font-bold bg-slate-50">1</td><td className="border p-1 text-slate-300">0</td><td className="border p-1 bg-sky-100 font-bold text-sky-700">1</td><td className="border p-1 bg-emerald-100 font-bold text-emerald-700">1</td><td className="border p-1 bg-amber-100 font-bold text-amber-700">1</td></tr>
                                                    </tbody>
                                                </table>
                                                <div className="mt-2 text-xs font-mono font-bold text-indigo-700 text-center">N2 = Q2·Q1 + Q2·Q0 + Q1·Q0'</div>
                                            </div>

                                            <div className="bg-white p-3 rounded border border-slate-200">
                                                <div className="font-bold text-center text-slate-700 mb-2">N1 Haritası</div>
                                                <table className="w-full text-center border-collapse font-mono text-sm">
                                                    <thead><tr><th className="border p-1">Q2 \ Q1Q0</th><th className="border p-1">00</th><th className="border p-1">01</th><th className="border p-1">11</th><th className="border p-1">10</th></tr></thead>
                                                    <tbody>
                                                        <tr><td className="border p-1 font-bold bg-slate-50">0</td><td className="border p-1 text-slate-300">0</td><td className="border p-1 bg-sky-100 font-bold text-sky-700">1</td><td className="border p-1 bg-emerald-100 font-bold text-emerald-700">1</td><td className="border p-1 bg-amber-100 font-bold text-amber-700">1</td></tr>
                                                        <tr><td className="border p-1 font-bold bg-slate-50">1</td><td className="border p-1 text-slate-300">0</td><td className="border p-1 text-slate-300">0</td><td className="border p-1 text-slate-300">0</td><td className="border p-1 bg-amber-100 font-bold text-amber-700">1</td></tr>
                                                    </tbody>
                                                </table>
                                                <div className="mt-2 text-xs font-mono font-bold text-indigo-700 text-center">N1 = Q2'·Q1 + Q2'·Q0 + Q1·Q0'</div>
                                            </div>

                                            <div className="bg-white p-3 rounded border border-slate-200">
                                                <div className="font-bold text-center text-slate-700 mb-2">N0 Haritası</div>
                                                <table className="w-full text-center border-collapse font-mono text-sm">
                                                    <thead><tr><th className="border p-1">Q2 \ Q1Q0</th><th className="border p-1">00</th><th className="border p-1">01</th><th className="border p-1">11</th><th className="border p-1">10</th></tr></thead>
                                                    <tbody>
                                                        <tr><td className="border p-1 font-bold bg-slate-50">0</td><td className="border p-1 bg-sky-100 font-bold text-sky-700">1</td><td className="border p-1 bg-sky-100 font-bold text-sky-700">1</td><td className="border p-1 text-slate-300">0</td><td className="border p-1 text-slate-300">0</td></tr>
                                                        <tr><td className="border p-1 font-bold bg-slate-50">1</td><td className="border p-1 text-slate-300">0</td><td className="border p-1 text-slate-300">0</td><td className="border p-1 bg-emerald-100 font-bold text-emerald-700">1</td><td className="border p-1 bg-emerald-100 font-bold text-emerald-700">1</td></tr>
                                                    </tbody>
                                                </table>
                                                <div className="mt-2 text-xs font-mono font-bold text-indigo-700 text-center">N0 = Q2'·Q1' + Q2·Q1</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 1c */}
                                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl shadow-sm">
                                        <h5 className="font-bold text-amber-900 mb-3">(c) T-Flip Flop ile Devre Tasarımı</h5>
                                        <p className="text-sm text-slate-700 mb-4">
                                            T (Toggle) Flip-Flop'un özelliği: Eğer Sonraki Durum (N) ile Mevcut Durum (Q) <strong>farklıysa</strong> T=1 (Toggle), aynıysa T=0 (Koru). Bu işlem <strong>XOR</strong> kapısı ile elde edilir: <code>T = Q ⊕ N</code>. Soru "sadeleştirmeden yazın" dediği için direkt K-Map denklemlerinden yararlanılır:
                                        </p>
                                        <div className="bg-white border border-amber-200 p-4 rounded-lg font-mono text-sm font-bold text-slate-800 space-y-3">
                                            <div className="flex items-center gap-2"><span className="text-amber-600">T2</span> = Q2 ⊕ N2 <ArrowRight className="w-4 h-4 text-slate-400" /> <span className="text-[#235347]">Q2'·Q1·Q0' + Q2·Q1'·Q0'</span></div>
                                            <div className="flex items-center gap-2"><span className="text-amber-600">T1</span> = Q1 ⊕ N1 <ArrowRight className="w-4 h-4 text-slate-400" /> <span className="text-[#235347]">Q2'·Q1'·Q0 + Q2·Q1·Q0</span></div>
                                            <div className="flex items-center gap-2"><span className="text-amber-600">T0</span> = Q0 ⊕ N0 <ArrowRight className="w-4 h-4 text-slate-400" /> <span className="text-[#235347]">Q2'·Q1'·Q0' + Q2'·Q1·Q0 + Q2·Q1'·Q0 + Q2·Q1·Q0'</span></div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Quiz 3</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 2: Sequence Detector via Shift Register</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıda verilen 4-bitlik Shift Register (Kaydırmalı Kaydedici), istediğiniz boyutta bir <strong>Decoder</strong>, sınırsız Inverter ve en fazla dört adet <strong>2-girişli mantık kapısı</strong> kullanarak bir dizi tespit edici (sequence detector) tasarlayınız.</p>
                                            <p>Sistem tek bitlik <strong>X</strong> girişi almaktadır. Eğer gelen son 3 bit <code>001</code> ise VEYA gelen son 2 bit <code>11</code> ise, <strong>Y_out</strong> çıkışı 1 (high) olmalıdır.</p>
                                            <p className="font-bold text-indigo-900 mt-2">Shift Register Özellikleri:</p>
                                            <ul className="list-disc pl-5">
                                                <li>Yükselen kenarda (rising edge), X girişi (Shift in) <strong>Y[0]</strong>'a yazılır.</li>
                                                <li>Y[0]'ın eski değeri Y[1]'e, Y[1]'in eski değeri Y[2]'ye geçer vb.</li>
                                                <li>Yani Y[0] en yeni gelen bit, Y[1] bir önceki, Y[2] iki önceki bittir.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm text-sm text-slate-700">
                                            <p className="mb-3">Problemde istenen koşulları Y dizisi üzerinden tanımlayalım. Y[0] en yeni, Y[2] ise en eski bit olmak üzere:</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong>Son 3 bit "001" ise:</strong> Bu, <code>Y[2]=0, Y[1]=0, Y[0]=1</code> demektir. (Sıralama: Eski -&gt; Yeni).</li>
                                                <li><strong>Son 2 bit "11" ise:</strong> Bu, <code>Y[1]=1, Y[0]=1</code> demektir. Y[2]'nin ne olduğu (0 veya 1) önemli değildir (Don't care).</li>
                                            </ul>
                                        </div>

                                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 shadow-sm rounded-r-xl">
                                            <h5 className="font-bold text-emerald-900 mb-3">Tasarım (3-to-8 Decoder Kullanarak):</h5>
                                            <p className="text-sm text-emerald-800 mb-4">Bir adet 3-to-8 Decoder alırız ve girişlerine Y[2], Y[1], Y[0] sinyallerini bağlarız (Y[2] MSB, Y[0] LSB olacak şekilde).</p>
                                            <div className="bg-white/60 p-4 rounded border border-emerald-200 text-sm text-emerald-900 font-medium space-y-3">
                                                <p><strong>Koşul 1:</strong> <code>001</code> durumu. Decoder'ın <code className="bg-emerald-100 px-1 rounded">Out_1</code> bacağından elde edilir.</p>
                                                <p><strong>Koşul 2:</strong> <code>x11</code> durumu. Bu durum iki ihtimal barındırır: <code>011 (3)</code> ve <code>111 (7)</code>. Dolayısıyla Decoder'ın <code className="bg-emerald-100 px-1 rounded">Out_3</code> ve <code className="bg-emerald-100 px-1 rounded">Out_7</code> bacaklarından elde edilir.</p>
                                                
                                                <div className="pt-3 border-t border-emerald-200">
                                                    <p className="font-bold mb-2">Mantık Kapısı Bağlantısı:</p>
                                                    <p>Bu 3 çıkıştan herhangi biri 1 olduğunda sonucun 1 olmasını istiyoruz. Bunun için iki adet 2-girişli <strong>OR</strong> kapısı kullanırız (İzin verilen 4 kapı sınırının altında kalırız).</p>
                                                    <p className="text-lg font-mono text-center mt-3 p-2 bg-emerald-100 rounded border border-emerald-300">
                                                        Y_out = Out_1 OR (Out_3 OR Out_7)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )}

                    {/* CHAPTER 4: Combinational Circuits */}
                    {activeChapter === "ch4" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h2 className="text-2xl font-bold text-[#163832] flex items-center gap-2">
                                    <BookOpen className="w-6 h-6 text-[#235347]" /> 
                                    Chapter 4: Combinational Circuits
                                </h2>
                                <p className="text-slate-500 mt-2 text-sm font-medium">Bu bölümde Adder'lar, Multiplexer'lar ve Kritik Yol (Critical Path) analizlerine dair sınav soruları yer almaktadır.</p>
                            </div>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">MIT 6.111</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2004 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 3: Arithmetic (Carry Bypass Adder)</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>16-bitlik bir Carry Bypass Adder tasarlanmıştır. Devre 4'er bitlik 4 adet bloktan (block size = 4) oluşmaktadır. Gecikme süreleri (delays) şu şekilde verilmiştir:</p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>PG (Propagate/Generate) bloğu gecikmesi ($t_&#123;PG&#125;$) = 1</li>
                                                <li>CL (Carry Logic) bloğu gecikmesi ($t_&#123;CL&#125;$) = 1</li>
                                                <li>SL (Sum Logic) bloğu gecikmesi ($t_&#123;SL&#125;$) = 2</li>
                                                <li>Mux (2:1 Multiplexer) gecikmesi ($t_&#123;mux&#125;$) = 2</li>
                                                <li>Group Propagate ($GP_i$) hesaplama gecikmesi = 1</li>
                                            </ul>
                                            <p><strong>(a)</strong> Bu 16-bit toplayıcı için <em>Critical Path (Kritik Yol - En yavaş sinyal yolu)</em> gecikmesi nedir?</p>
                                            <p><strong>(b)</strong> Blok boyutu 4 olan <strong>N-bitlik</strong> bir Carry Bypass Adder için (N, 4'ün katı olmak şartıyla) toplam gecikme süresini (Total Delay) veren genel denklemi yazınız.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="bg-white border-2 border-amber-100 rounded-2xl p-6 shadow-sm">
                                        <h5 className="font-bold text-amber-900 mb-4">(a) 16-Bit Critical Path (Kritik Yol) Gecikmesi</h5>
                                        <p className="text-sm text-slate-700 mb-4">
                                            Kritik yol, sinyalin devrenin başından en sonuna kadar izlediği en uzun (en yavaş) yoldur. Carry Bypass Adder'da kritik yol genellikle şöyledir: İlk blokta Ripple Carry (içinden geçme), aradaki bloklarda Mux üzerinden Bypass (atlama), son blokta yine Ripple Carry.
                                        </p>
                                        <ul className="space-y-3 text-sm text-slate-700 font-mono">
                                            <li className="flex items-center gap-2"><span className="bg-amber-100 px-2 py-1 rounded font-bold">Adım 1:</span> P ve G sinyallerinin üretilmesi: $t_&#123;PG&#125;$ = <strong>1 birim</strong></li>
                                            <li className="flex items-center gap-2"><span className="bg-amber-100 px-2 py-1 rounded font-bold">Adım 2:</span> İlk blokta (Block 0) Carry'nin 4 bit boyunca dalgalanması (Ripple): 4 × $t_&#123;CL&#125;$ = 4 × 1 = <strong>4 birim</strong> (Zaman: 1+4 = 5)</li>
                                            <li className="flex items-center gap-2"><span className="bg-amber-100 px-2 py-1 rounded font-bold">Adım 3:</span> Ortadaki bloklardan Mux ile bypass edilmesi. Toplam 4 blok var. İlk ve son bloğu çıkarırsak ortada 2 blok kalır: 2 × $t_&#123;mux&#125;$ = 2 × 2 = <strong>4 birim</strong> (Zaman: 5+4 = 9)</li>
                                            <li className="flex items-center gap-2"><span className="bg-amber-100 px-2 py-1 rounded font-bold">Adım 4:</span> Son blokta (Block 3) Carry'nin en son S (Sum) bitine ulaşması. Carry son bloğa girdiğinde 3 CL bloğundan geçip son S15 için SL'ye girer: 3 × $t_&#123;CL&#125;$ = 3 × 1 = <strong>3 birim</strong></li>
                                            <li className="flex items-center gap-2"><span className="bg-amber-100 px-2 py-1 rounded font-bold">Adım 5:</span> Son Sum bitinin (S15) üretilmesi: $t_&#123;SL&#125;$ = <strong>2 birim</strong></li>
                                        </ul>
                                        <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900 font-bold text-center text-lg">
                                            Toplam Gecikme = 1 + 4 + 4 + 3 + 2 = 14 Birim
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                                        <h5 className="font-bold text-[#163832] mb-4">(b) N-Bit İçin Genel Gecikme Denklemi</h5>
                                        <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                            Yukarıdaki mantığı N-bit (4'er bitlik bloklar halinde) için genellersek:
                                            <br/> Toplam Blok Sayısı = N / 4.
                                            <br/> Bypass edilecek (Mux kullanılacak) ortadaki blok sayısı = (N / 4) - 2.
                                        </p>
                                        <div className="bg-white border-l-4 border-[#235347] p-5 rounded-r-xl shadow-sm text-sm">
                                            <p className="font-mono font-bold text-slate-800">
                                                $T_&#123;total&#125; = t_&#123;PG&#125; + (4 \times t_&#123;CL&#125;) + \left(\frac&#123;N&#125;&#123;4&#125; - 2\right) \times t_&#123;mux&#125; + (3 \times t_&#123;CL&#125;) + t_&#123;SL&#125;$
                                            </p>
                                            <p className="mt-3 text-slate-700">Değerleri yerine koyarsak: $1 + 4 + \left(\frac&#123;N&#125;&#123;4&#125; - 2\right) \times 2 + 3 + 2$</p>
                                            <p className="mt-2 text-emerald-700 font-bold text-lg">Sonuç: $T_&#123;total&#125; = \frac&#123;N&#125;&#123;2&#125; + 6$</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Midterm</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 3: Decoder Logic Implementation</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Sadece <strong>bir Decoder ve bir OR kapısı</strong> kullanarak aşağıdaki fonksiyonu implement ediniz:</p>
                                            <div className="bg-white p-3 rounded font-mono text-center shadow-sm">
                                                F = !(A + B) + A * C
                                            </div>
                                            <p>Bağlantıları ve etiketleri net bir şekilde gösteriniz.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">1. Fonksiyonu Minterm'lere Çevirme</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Öncelikle De Morgan kurallarını kullanarak fonksiyonu açalım:
                                                <br/><code>!(A + B) = !A * !B</code> (De Morgan)
                                                <br/>Yani fonksiyonumuz: <code>F = A'B' + AC</code> olur.
                                            </p>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Bu fonksiyonu A, B, C değişkenleri üzerinden (3-bit) tam minterm'lere (Canonical Sum of Products) dönüştürelim:
                                            </p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                <li><code>A'B'</code> terimi C'den bağımsızdır. Yani C=0 ve C=1 olabilir. &rarr; <code>A'B'C' + A'B'C</code> &rarr; <strong>m0, m1</strong></li>
                                                <li><code>AC</code> terimi B'den bağımsızdır. Yani B=0 ve B=1 olabilir. &rarr; <code>AB'C + ABC</code> &rarr; <strong>m5, m7</strong></li>
                                            </ul>
                                            <p className="text-sm text-slate-700 font-bold mt-2">
                                                Toplam Minterm Listesi: m0, m1, m5, m7
                                            </p>
                                        </div>

                                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-emerald-900 mb-2">2. Donanım (Decoder + OR Gate) Tasarımı</h5>
                                            <p className="text-sm text-slate-700">
                                                Bir <strong>3-to-8 Decoder</strong> kullanılır. 
                                                Girişlerine sırasıyla A, B ve C bağlanır (A=MSB, C=LSB).
                                                Decoder'ın çıkışlarından (out0, out1, out2 ... out7) bize gereken minterm'ler olan <strong>Out0, Out1, Out5, ve Out7</strong> alınarak bir <strong>4-girişli OR kapısına</strong> bağlanır. OR kapısının çıkışı aradığımız F fonksiyonudur.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Midterm</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 6: XNOR from MUXes</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Sadece <strong>iki adet 2:1 MUX (Multiplexer)</strong> kullanarak girişleri A ve B, çıkışı X olan bir <strong>XNOR</strong> kapısı tasarlayınız. Giriş olarak 0 ve 1 değerlerini serbestçe kullanabilirsiniz.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">Adım Adım Tasarım</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                XNOR fonksiyonunun denklemi şudur: <code>XNOR(A,B) = A·B + A'·B'</code>. <br/>
                                                Bunu A girişine göre MUX mantığıyla bölersek:
                                            </p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mb-4">
                                                <li>Eğer A = 1 ise &rarr; Çıkış <strong>B</strong> olmalı.</li>
                                                <li>Eğer A = 0 ise &rarr; Çıkış <strong>B' (NOT B)</strong> olmalı.</li>
                                            </ul>
                                            
                                            <p className="text-sm text-slate-700 mb-2">
                                                Ancak elimizde NOT kapısı yok, sadece 2:1 MUX var! O halde ilk MUX'umuzu bir NOT kapısı yapmak için kullanacağız:
                                            </p>
                                            <div className="bg-white border-l-4 border-indigo-500 p-4 shadow-sm text-sm font-medium">
                                                <strong>MUX 1 (NOT B İşlevi):</strong><br/>
                                                Seçici uç (Select) = B <br/>
                                                D0 girişi (B=0 iken) = 1 <br/>
                                                D1 girişi (B=1 iken) = 0 <br/>
                                                <em>Bu MUX'un çıkışı tam olarak B' dir.</em>
                                            </div>
                                            
                                            <div className="bg-white border-l-4 border-emerald-500 p-4 shadow-sm text-sm font-medium mt-4">
                                                <strong>MUX 2 (Asıl XNOR İşlevi):</strong><br/>
                                                Seçici uç (Select) = A <br/>
                                                D0 girişi (A=0 iken) = MUX 1'in çıkışı (Yani B') <br/>
                                                D1 girişi (A=1 iken) = B <br/>
                                                <em>Bu MUX'un çıkışı aradığımız X (XNOR) fonksiyonudur.</em>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Midterm</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 9: Arithmetic Circuit (X = 3*Z)</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Girişi <code>Z[3:0]</code> (4-bit) ve çıkışı <code>X[7:0]</code> (8-bit) olan bir devre tasarlayınız. İkisi de işaretsiz (unsigned) sayıdır.</p>
                                            <p>Devrenin yapması gereken işlem: <strong>X = 3 * Z</strong></p>
                                            <p>Kullanabileceğiniz malzemeler: <strong>Sadece bir adet 6-bit Adder (Toplayıcı), Maksimum 3 adet NOT kapısı (bubble dahil), VDD (Power) ve GND (Ground).</strong></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">Matematiksel Dönüşüm (Shift & Add)</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                3 ile çarpmak demek aslında sayıyı kendisiyle ve kendisinin 2 katıyla toplamak demektir.
                                                <br/><code>3 * Z = Z + 2 * Z</code>
                                            </p>
                                            <p className="text-sm text-slate-700 mb-2">
                                                İkilik tabanda (Binary) bir sayıyı 2 ile çarpmak, sayıyı 1 bit sola kaydırmak (Left Shift) anlamına gelir.
                                                Yani <code>2*Z</code> işlemi sadece uçlara sıfır eklemekle donanımsal olarak (hiçbir lojik kapı kullanmadan) gerçekleştirilebilir.
                                                <br/><code>Z = Z3 Z2 Z1 Z0</code>
                                                <br/><code>2*Z = Z3 Z2 Z1 Z0 0</code> (5 bit)
                                            </p>
                                        </div>

                                        <div className="bg-white border-l-4 border-indigo-500 p-5 shadow-sm text-sm font-medium">
                                            <h5 className="font-bold text-indigo-900 mb-2">6-bit Adder (Toplayıcı) Bağlantıları</h5>
                                            <p className="text-slate-700 mb-3">Toplayıcının A girişine Z'yi, B girişine ise 2*Z'yi bağlayacağız.</p>
                                            <ul className="list-disc pl-5 text-slate-700 space-y-1 mb-4">
                                                <li><strong>A Girişleri (Z):</strong> A5=0, A4=0, A3=Z3, A2=Z2, A1=Z1, A0=Z0</li>
                                                <li><strong>B Girişleri (2*Z):</strong> B5=0, B4=Z3, B3=Z2, B2=Z1, B1=Z0, B0=0</li>
                                                <li><strong>Cin (Carry In):</strong> 0 (Ground)</li>
                                            </ul>
                                            <p className="text-slate-700 mt-2 font-bold text-emerald-800">
                                                Sonuç Çıkışları (X[7:0]):
                                            </p>
                                            <ul className="list-disc pl-5 text-emerald-700 space-y-1">
                                                <li>Maksimum Z = 15'tir. X = 45 olur. 45 sayısı 6 bitliktir (101101).</li>
                                                <li>Bu yüzden Adder'ın 6 bitlik Sum çıkışı (S5..S0) yeterlidir. Cout her zaman 0 çıkar.</li>
                                                <li>X[7] = 0 (Ground)</li>
                                                <li>X[6] = 0 (Ground)</li>
                                                <li>X[5:0] = S5..S0 (Adder Çıkışları)</li>
                                            </ul>
                                            <p className="text-xs text-slate-500 mt-3">*NOT kapısına hiç ihtiyaç duyulmamıştır.</p>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Final</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 1(f,g): Adder Delays</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıdaki boşlukları doldurunuz (Seçenekler: 4 / 20 / 60 / 120 / 1024 ns):</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong>(f)</strong> Eğer 4-bit Ripple-Carry Adder (RCA) 1ns gecikmeye sahipse, 256-bit RCA'in gecikmesi yaklaşık _______ ns olur.</li>
                                                <li><strong>(g)</strong> Eğer 4-bit Carry Look-Ahead Adder (CLA) 1ns gecikmeye sahipse, 256-bit cascaded CLA (derste gösterilen 4-bit ağaç yapısında) gecikmesi yaklaşık _______ ns olur.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-800 font-bold mb-2">(f) Ripple-Carry Adder (RCA)</p>
                                            <p className="text-sm text-slate-700 mb-2">
                                                RCA'da gecikme bit sayısıyla <strong>doğrusal (linear)</strong> orantılıdır (O(N)).
                                            </p>
                                            <p className="text-sm text-slate-700 mb-2">
                                                <code>256 bit / 4 bit = 64 kat</code> daha uzun bir yol vardır.
                                                <br/><code>64 * 1ns = 64ns</code>
                                            </p>
                                            <p className="text-sm text-slate-700">
                                                Seçenekler arasındaki en yakın değer: <code className="bg-indigo-100 text-indigo-900 font-bold px-2 py-1 rounded">60 ns</code>
                                            </p>
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-800 font-bold mb-2">(g) Carry Look-Ahead (CLA)</p>
                                            <p className="text-sm text-slate-700 mb-2">
                                                CLA ağaç yapısında gecikme bit sayısının <strong>logaritması (O(log N))</strong> ile orantılıdır. 4-bitlik bloklar kullanıldığı için log4 tabanında artar.
                                            </p>
                                            <p className="text-sm text-slate-700 mb-2">
                                                <code>log₄(256) = 4 seviye (level)</code> vardır.
                                                <br/><code>4 seviye * 1ns = 4ns</code>
                                            </p>
                                            <p className="text-sm text-slate-700">
                                                Cevap: <code className="bg-indigo-100 text-indigo-900 font-bold px-2 py-1 rounded">4 ns</code>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Final</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 9: Circuit Implementations</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong>(a)</strong> Sadece 2-girişli AND/OR/XOR ve INVERTER kullanarak <code>B = y ? x : !x</code> mantığını en az sayıda kapı ile tasarlayınız.</li>
                                                <li><strong>(b)</strong> Yalnızca 2:1 MUX'lar (en az sayıda) kullanarak Half-Adder (A,B giriş, S, Cout çıkış) tasarlayınız.</li>
                                                <li><strong>(c)</strong> Sadece bir Decoder ve bir adet herhangi bir standart kapı kullanarak 2:1 MUX (A, B, select) tasarlayınız.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">(a) B = y ? x : !x (XNOR Kapısı)</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Verilen mantık bir MUX'tur: Eğer <code>y=1</code> ise <code>x</code>, <code>y=0</code> ise <code>x'</code> çıkar. Bu aslında tam olarak <strong>XNOR(x,y)</strong> mantığıdır. (Çünkü x ve y aynıysa 1, farklıysa 0 olur).
                                            </p>
                                            <div className="bg-white border-l-4 border-indigo-500 p-4 shadow-sm text-sm">
                                                <strong>Tasarım:</strong> Elimizde XNOR kapısı olmadığı için XOR ve INVERTER kullanarak tasarlarız.<br/>
                                                <code className="text-indigo-800 font-bold">B = NOT (x XOR y)</code> (Toplam 2 kapı)
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">(b) Half-Adder via MUXes</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Half-Adder formülleri: <code>S = A XOR B</code> ve <code>Cout = A AND B</code>.
                                            </p>
                                            <div className="bg-white border-l-4 border-emerald-500 p-4 shadow-sm text-sm">
                                                <strong>S (Sum) Çıkışı:</strong> A=0 ise B'yi, A=1 ise B' (NOT B) değerini seçmeliyiz. NOT B için de bir MUX lazımdır.
                                                <ul className="list-disc pl-5 mt-1">
                                                    <li>MUX 1 (NOT B): Select=B, D0=1, D1=0. Çıkışı B' dir.</li>
                                                    <li>MUX 2 (Sum): Select=A, D0=B, D1=MUX1_Out. Çıkışı S dir.</li>
                                                </ul>
                                                <br/>
                                                <strong>Cout (Carry) Çıkışı:</strong> A=0 ise 0, A=1 ise B çıkmalıdır.
                                                <ul className="list-disc pl-5 mt-1">
                                                    <li>MUX 3 (Carry): Select=A, D0=0, D1=B. Çıkışı Cout dur.</li>
                                                </ul>
                                                <p className="mt-2 font-bold text-emerald-800">Toplam MUX sayısı = 3</p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">(c) Decoder ile 2:1 MUX Tasarımı</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Bir 2:1 MUX fonksiyonu şudur: <code>X = S'A + SB</code>. (S=0 ise A, S=1 ise B).
                                                Bunu minterm cinsinden yazarsak 3 girişimiz var: Select, A, B.
                                            </p>
                                            <div className="bg-white border-l-4 border-amber-500 p-4 shadow-sm text-sm">
                                                <strong>Tasarım:</strong> Girişleri <code>(Select, A, B)</code> olan bir <strong>3-to-8 Decoder</strong> kullanırız.<br/>
                                                MUX çıkışının 1 olduğu minterm'ler:
                                                <ul className="list-disc pl-5 mt-1 mb-2">
                                                    <li>Select=0 ve A=1 olduğu durumlar: 010 (m2), 011 (m3)</li>
                                                    <li>Select=1 ve B=1 olduğu durumlar: 101 (m5), 111 (m7)</li>
                                                </ul>
                                                Bu nedenle Decoder'ın <strong>out2, out3, out5, out7</strong> çıkışlarını tek bir <strong>4-girişli OR kapısına</strong> bağlarız. Toplamda 1 Decoder ve 1 OR kapısı kullanılmış olur.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Final</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 10: Signed-Magnitude to 2's Complement</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>4-bit İşaret-Büyüklük (Signed-Magnitude) sayısını, 4-bit 2'ye tümleyen (2's complement) sayısına çeviren bir devre tasarlayınız.</p>
                                            <p><strong>Kullanılabilecekler:</strong> 4-bit Adder, 4-bit 2:1 MUX, maksimum 3 adet standart kapı ve istenildiği kadar INVERTER.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">Tasarım Mantığı</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                İşaret-Büyüklük formatında <code>S[3]</code> işaret bitidir (0=Pozitif, 1=Negatif). <code>S[2:0]</code> ise sayının mutlak büyüklüğüdür.
                                            </p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mb-4">
                                                <li>Eğer S[3] = 0 ise: Sayı pozitiftir ve 2's complement formatıyla aynıdır. Sonuç doğrudan <code>0, S[2], S[1], S[0]</code> olmalıdır.</li>
                                                <li>Eğer S[3] = 1 ise: Sayı negatiftir. Bu sayının 2's complement formatını bulmak için, sayının pozitif halinin tersini alıp (INVERT) 1 eklemeliyiz.</li>
                                            </ul>
                                        </div>

                                        <div className="bg-white border-l-4 border-indigo-500 p-5 shadow-sm text-sm font-medium">
                                            <h5 className="font-bold text-indigo-900 mb-2">Donanım Bağlantıları</h5>
                                            <p className="text-slate-700 mb-3">Bu seçimi yapmak için <strong>4-bit 2:1 MUX</strong> kullanırız. MUX'un seçici (Select) pini <code>S[3]</code> bitine bağlanır.</p>
                                            
                                            <p className="text-slate-800 font-bold mt-2">1) Negatif Durum İçin (Adder Bağlantıları):</p>
                                            <p className="text-slate-700 mb-2">Pozitif sayının (0, S[2], S[1], S[0]) 2's complement'ini Adder ile hesaplarız:</p>
                                            <ul className="list-disc pl-5 text-slate-700 space-y-1 mb-4">
                                                <li><strong>A Girişleri:</strong> Pozitif sayıyı Inverter'lardan geçiririz. A3 = 1 (NOT 0), A2 = NOT S[2], A1 = NOT S[1], A0 = NOT S[0].</li>
                                                <li><strong>B Girişleri:</strong> 0000 (Ground)</li>
                                                <li><strong>Cin (Carry In):</strong> 1 (VDD). (Böylece INVERT + 1 işlemi yapılmış olur).</li>
                                            </ul>

                                            <p className="text-slate-800 font-bold mt-2">2) MUX Bağlantıları:</p>
                                            <ul className="list-disc pl-5 text-slate-700 space-y-1">
                                                <li><strong>Select:</strong> S[3]</li>
                                                <li><strong>D0 (S[3]=0):</strong> Doğrudan <code>S[3:0]</code> girişleri bağlanır.</li>
                                                <li><strong>D1 (S[3]=1):</strong> 4-bit Adder'ın S çıkışları (S3, S2, S1, S0) bağlanır.</li>
                                                <li><strong>Çıkış:</strong> MUX'un çıkışı aranan 4-bit 2's complement sonucudur.</li>
                                            </ul>
                                            <p className="text-xs text-slate-500 mt-3">*Hiçbir standart AND/OR/XOR kapısına ihtiyaç duyulmamış, sadece Inverter, Adder ve MUX ile devre çözülmüştür.</p>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 4: Custom Datapath Design</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıdaki bileşenleri kullanarak, iki adet 3-bit işaretsiz (unsigned) sayıyı (C[2:0], D[2:0]) giriş olarak alan ve 4-bit işaretsiz bir X[3:0] sonucu üreten bir devre tasarlayınız:</p>
                                            <ul className="list-disc pl-5">
                                                <li>Eğer C=D ise, X çıkışı C ve D'nin <strong>bitwise AND</strong>'i olacak (ve X[3]=0 olacak).</li>
                                                <li>Değilse (C &ne; D ise), X çıkışı C ve D'nin <strong>toplamı (sum)</strong> olacak.</li>
                                            </ul>
                                            <p className="mt-3 font-bold text-slate-800">Kullanabileceğiniz Bileşenler:</p>
                                            <ul className="list-disc pl-5">
                                                <li>1 adet 3-bit 2-to-1 MUX</li>
                                                <li>4-to-2 Priority Encoder</li>
                                                <li>3-bit Unsigned Comparator (Equal ve Greater-than çıkışları var)</li>
                                                <li>3-bit Adder (Girişler: A, B, Cin. Çıkışlar: S[2:0], Cout)</li>
                                                <li>NOT kapıları</li>
                                                <li>2-girişli AND, OR, XOR ve XNOR kapıları</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-700 mb-4">Bu devreyi tasarlarken problemi 3 ana parçaya bölebiliriz: Karşılaştırma, İşlem Üretimi ve Sonuç Seçimi.</p>
                                            
                                            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-700">
                                                <li>
                                                    <strong>1. Kontrol Sinyali (Comparator):</strong><br/>
                                                    C ve D girişlerini <strong>3-bit Unsigned Comparator</strong>'a bağlarız. Buradan <code>Equal (EQ)</code> çıkışını alırız. 
                                                    <ul>
                                                        <li><code>EQ = 1</code> ise (C = D durumu)</li>
                                                        <li><code>EQ = 0</code> ise (C &ne; D durumu)</li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <strong>2. İşlem Sonuçlarını Üretme:</strong><br/>
                                                    <strong>Toplama İşlemi (Sum):</strong> C ve D'yi 3-bit Adder'a bağlarız. <code>Cin = 0</code> yaparız. Çıkışta <code>S[2:0]</code> (toplamın ilk 3 biti) ve <code>Cout</code> (elde) oluşur. Toplam sonucu = <code>{`{Cout, S[2:0]}`}</code><br/><br/>
                                                    <strong>Bitwise AND İşlemi:</strong> 3 adet 2-girişli AND kapısı kullanırız. 
                                                    <ul className="list-disc pl-5 text-indigo-900 font-mono text-xs mt-2 space-y-1">
                                                        <li>AND_0 = C[0] AND D[0]</li>
                                                        <li>AND_1 = C[1] AND D[1]</li>
                                                        <li>AND_2 = C[2] AND D[2]</li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <strong>3. Sonuç Seçimi (MUX ve Kapılar):</strong><br/>
                                                    Elindeki <strong>MUX sadece 3-bitliktir</strong>. Bu yüzden sonucun ilk 3 bitini (X[2:0]) MUX ile seçer, 4. biti (MSB, X[3]) ise mantık kapılarıyla ayrıca hesaplarız.<br/>
                                                    <br/>
                                                    <strong>Alt 3 Bitin (X[2:0]) Seçimi:</strong><br/>
                                                    MUX'un select (S) bacağına <code>EQ</code> sinyalini bağlarız.
                                                    <ul className="list-disc pl-5 mb-2 mt-1">
                                                        <li><code>D0</code> girişine (EQ=0 durumu için) Adder'ın <code>S[2:0]</code> çıkışını bağlarız.</li>
                                                        <li><code>D1</code> girişine (EQ=1 durumu için) bitwise AND sonucunu <code>{`{AND_2, AND_1, AND_0}`}</code> bağlarız.</li>
                                                    </ul>
                                                    MUX'un 3-bitlik çıkışı doğrudan <code>X[2:0]</code> olur.
                                                    <br/><br/>
                                                    <strong>En Anlamlı Bitin (X[3]) Hesaplanması:</strong><br/>
                                                    Eğer EQ=1 (C=D) ise, soruda istendiği üzere X[3] = 0 olmalıdır.<br/>
                                                    Eğer EQ=0 (C&ne;D) ise, X[3] değeri Adder'ın Cout çıkışı olmalıdır.<br/>
                                                    Bu mantığı şu Boolean denklemi ile kurarız: <code>X[3] = Cout AND (NOT EQ)</code>.<br/>
                                                    Yani EQ'nun tersini almak için 1 adet <strong>NOT</strong> kapısı, ardından Cout ile çarpmak için 1 adet <strong>AND</strong> kapısı kullanırız.
                                                </li>
                                            </ol>
                                        </div>

                                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 shadow-sm rounded-r-xl">
                                            <h5 className="font-bold text-emerald-900 mb-3">Donanım Haritası Özeti</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-emerald-800">
                                                <div className="bg-white/60 p-3 rounded border border-emerald-100">
                                                    <strong>Kullanılanlar:</strong>
                                                    <ul className="list-disc pl-5 mt-1">
                                                        <li>3-bit Comparator</li>
                                                        <li>3-bit Adder</li>
                                                        <li>4 adet AND Kapısı (3 tanesi bitwise AND, 1 tanesi X[3] için)</li>
                                                        <li>1 adet NOT Kapısı (EQ'yu terslemek için)</li>
                                                        <li>3-bit 2-to-1 MUX</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/60 p-3 rounded border border-emerald-100">
                                                    <strong>Kullanılmayanlar:</strong>
                                                    <ul className="list-disc pl-5 mt-1">
                                                        <li>4-to-2 Priority Encoder (İhtiyaç yok)</li>
                                                        <li>OR, XOR, XNOR Kapıları</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )}

                    {/* CHAPTER 5: Sequential Circuits */}
                    {activeChapter === "ch5" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h2 className="text-2xl font-bold text-[#163832] flex items-center gap-2">
                                    <BookOpen className="w-6 h-6 text-[#235347]" /> 
                                    Chapter 5: Sequential Circuits
                                </h2>
                                <p className="text-slate-500 mt-2 text-sm font-medium">Flip-Flop'lar, Latch'ler, VHDL zamanlama analizleri ve Setup/Hold Time hesaplamalarına dair sınav soruları.</p>
                            </div>

                            {/* Prob 2 */}
                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">MIT 6.111</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2003 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 2: VHDL Timing Analysis</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                                Aşağıdaki 4 farklı VHDL kodunu okuyun. Her bir process bloğunun sentezlendiğinde nasıl bir "Memory Element" (Hafıza Elemanı / Latch / Flip-Flop) oluşturacağını (Senkron/Asenkron Reset, Edge-Triggered vb. detayları ile birlikte) açıklayın.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* PART A */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-3">(a) VHDL Kodu A</h5>
                                            <pre className="bg-slate-800 text-slate-200 p-4 rounded-xl font-mono text-xs mb-4 shadow-inner">
{`process (reset, enable, clock, D)
if (reset = '0') then
  Q <= '0';
elsif (enable = '1' and clock = '1') then
  Q <= D;
else 
  Q <= Q;
end if;
end process;`}
                                            </pre>
                                            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-sm text-emerald-900">
                                                <strong>Analiz:</strong> `reset` sinyali sensitivity list'te olduğu ve ilk if koşulu saati (clock) beklemediği için bu devrede <strong>Asenkron Active-Low Reset</strong> vardır. Saat (clock) '1' olduğunda veriyi alır, kenar tetiklemesi (event) yoktur. Bu yüzden bu bir <strong>D-Latch</strong> oluşturur (Flip-Flop değil).
                                            </div>
                                        </div>

                                        {/* PART B */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-3">(b) VHDL Kodu B</h5>
                                            <pre className="bg-slate-800 text-slate-200 p-4 rounded-xl font-mono text-xs mb-4 shadow-inner">
{`process (reset, clock)
if (clock'event and clk = '0') then
  if (reset = '1') then 
    Q <= 0;
  elsif (enable = '1')
    Q <= D;
  end if;
end if;
end process;`}
                                            </pre>
                                            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-sm text-indigo-900">
                                                <strong>Analiz:</strong> Sadece <code>clock'event</code> kontrolü altında işlemler yapılıyor. Üstelik <code>clk = '0'</code> dendiği için <strong>Falling-Edge (Düşen Kenar) Tetiklemeli D-Flip Flop</strong> oluşturur. Reset işlemi de saati beklediği (clock if'inin içinde olduğu) için <strong>Senkron Active-High Reset</strong> mevcuttur.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Prob 3 */}
                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">MIT 6.111</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2003 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 3: Timing and Memory (Setup/Hold)</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            
                                            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-medium">
                                                <p><strong>(a) Setup / Hold Time İhlali:</strong> Arka arkaya (cascade) bağlanmış iki Flip-Flop düşünün. Özellikleri şunlardır:</p>
                                                <ul className="list-disc pl-5">
                                                    <li>Setup Time (T_setup) = 4ns</li>
                                                    <li>Hold Time (T_hold) = 3ns</li>
                                                    <li>Contamination Delay (T_cd) = 1ns</li>
                                                    <li>Propagation Delay (T_pd) = 4ns</li>
                                                </ul>
                                                <p>Bu devrede herhangi bir zamanlama ihlali (Timing Violation) var mıdır? Eğer varsa saati (clock) değiştirmeden bu sorunu nasıl çözersiniz?</p>
                                                
                                                <hr className="my-4 border-slate-200" />
                                                
                                                <p><strong>(b) Bus Contention:</strong> Bir bellek çipi (Memory) ortak bir veri yoluna (Data Bus) bağlıdır. Belleğin pasif duruma (High-Z) geçmesi <code>4ns</code> almaktadır. Sisteme bağlı olan Flip-Flop'un çıkış üretmesi <code>1ns</code>, buffer'ın aktifleşmesi ise <code>2ns</code> sürmektedir.</p>
                                                <p>Bellek çipi okunmayı bırakıp hemen ardından FF veri yazmaya çalışırsa Bus Contention (Kısa Devre / Veri Çakışması) yaşanır mı? Nedenini hesaplayarak açıklayın ve çözüm önerin.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-8">
                                        {/* 3a Setup Hold */}
                                        <div className="bg-white border-2 border-rose-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                                            <AlertTriangle className="absolute top-4 right-4 text-rose-100 w-16 h-16" />
                                            <h5 className="text-xl font-bold text-rose-900 mb-4">(a) Setup ve Hold Time İhlali Analizi</h5>
                                            
                                            <div className="flex flex-col md:flex-row gap-6 relative z-10">
                                                <div className="flex-1 text-slate-700 text-sm space-y-4">
                                                    <ul className="list-disc pl-5 space-y-2">
                                                        <li><strong>Hata Tespiti:</strong> Birinci FF'in çıkışı (Q), clock vurduktan sadece <code>1ns (T_cd)</code> sonra değişmeye başlayabilir. Ancak ikinci FF'in girişindeki (D) verinin, clock vurduktan sonra en az <code>3ns (T_hold)</code> boyunca sabit kalması gerekmektedir.</li>
                                                        <li><strong>Sonuç:</strong> <code>T_cd (1ns) &lt; T_hold (3ns)</code> olduğu için veriler ikinci FF tarafından okunamadan erken değişecek ve bozulacaktır. Bu bir <strong>Hold Time Violation (Hold Time İhlali)</strong> durumudur.</li>
                                                    </ul>
                                                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 font-medium mt-4 flex gap-3 items-center">
                                                        <Zap className="w-6 h-6 text-rose-600 flex-shrink-0" />
                                                        <p><strong className="text-rose-900">Çözüm:</strong> Birinci FF'in Q çıkışı ile ikinci FF'in D girişi arasına toplamı en az <code>2ns</code> olan bir <strong>Delay Buffer (Geciktirici Kapı)</strong> konulmalıdır. Bu sayede verinin değişmesi 3ns geciktirilerek Hold Time süresi kurtarılır.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3b Tri-State Bus Contention */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                                            <h5 className="text-xl font-bold text-slate-800 mb-4">(b) Tri-State Bus Contention (Veriyolu Çakışması)</h5>
                                            <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                                Sistemdeki bellek (Memory) çipinin aktiften pasife (high-Z) geçmesi tam <code>4ns</code> alıyor. Flip-Flop'un çıkışını üretmesi ise <code>1ns (Register Delay) + 2ns (Tri-state buffer açılma süresi) = 3ns</code> sürüyor.
                                            </p>
                                            <div className="bg-white border-l-4 border-[#235347] p-5 rounded-r-xl shadow-sm">
                                                <p className="text-sm text-slate-700 font-medium">
                                                    Eğer kontrol sinyali anında yollanırsa, FF'in buffer'ı <strong>3ns</strong> sonunda Data Bus'a veri yazmaya başlar. Ancak Memory çipi Bus'ı bırakmak için <strong>4ns</strong>'ye ihtiyaç duyar. Yani <code>4ns - 3ns = 1ns</code>'lik kritik bir süre boyunca iki cihaz da aynı Data Bus'a sinyal sürmeye çalışacak ve <strong>Bus Contention (Kısa Devre / Veri Çakışması)</strong> yaşanacaktır.
                                                </p>
                                                <p className="text-sm text-emerald-800 font-bold mt-3">
                                                    Çözüm: FF'in Tri-state buffer'ını kontrol eden Enable sinyaline en az <code>1ns</code> (güvenlik payı ile biraz daha fazla) bir Delay (Gecikme elemanı) eklenmelidir.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Prob 1: MIT 2004 - Sequential Building Block */}
                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">MIT 6.111</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2004 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 1: Sequential Building Block Characterization</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                                Bir kaydedicinin (register) Master-Slave Latch yapısıyla implementasyonu verilmiştir. Her bir Inverter'ın gecikmesinin <strong>1 birim</strong> olduğunu, anahtarların (switch) ideal olduğunu ve gecikmelerinin olmadığını varsayın. Anahtarlar, kontrol sinyali <strong>High (1)</strong> olduğunda kapanır (iletime geçer).
                                            </p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2 font-medium">
                                                <li><strong>Master (inverting) Latch:</strong> D girişinden sonra bir anahtar var (kontrolü CLK'), sonra peş peşe 2 Inverter var. İkinci Inverter'ın çıkışı ilk Inverter'ın girişine bir anahtar (kontrolü CLK) üzerinden geri besleniyor.</li>
                                                <li><strong>Slave (inverting) Latch:</strong> Master'ın çıkışından sonra bir anahtar (kontrolü CLK) var, sonra peş peşe 2 Inverter var. İkinci Inverter'ın çıkışı (Q) ilkine bir anahtar (kontrolü CLK') üzerinden geri besleniyor.</li>
                                            </ul>
                                            <div className="space-y-2 mt-4">
                                                <p className="text-sm font-semibold text-slate-800">Sizden İstenenler:</p>
                                                <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                    <li><strong>(a)</strong> Yukarıdaki devre ne tür bir kaydedicidir? (Pozitif kenar tetiklemeli mi, Negatif kenar tetiklemeli mi?)</li>
                                                    <li><strong>(b)</strong> Setup Time (t_su), Hold Time (t_hold) ve Propagation Delay (t_cq) sürelerini hesaplayın.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-3">(a) Tetikleme (Edge) Analizi</h5>
                                            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-sm text-emerald-900 space-y-2">
                                                <p><strong>CLK = 0 iken:</strong> CLK' = 1 olur. Master girişindeki anahtar kapanır (iletime geçer). D'deki veri Master Latch'in içine girer. Bu sırada Slave girişindeki anahtar (CLK=0) açıktır (kesimdedir). Slave önceki veriyi tutar. (Master is Transparent)</p>
                                                <p><strong>CLK = 1 olduğunda:</strong> Master girişindeki anahtar açılır (D ile bağlantı kesilir). Slave girişindeki anahtar (CLK=1) kapanır ve Master'ın içindeki veri Slave'e aktarılır. Q çıkışı güncellenir.</p>
                                                <p className="font-bold text-emerald-800 mt-2">Sonuç: Çıkış (Q), saat sinyalinin 0'dan 1'e geçtiği anda (Rising Edge) güncellendiği için bu devre Positive Edge-Triggered (Pozitif Kenar Tetiklemeli) bir Register'dır.</p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-3">(b) Gecikme (Timing) Hesaplamaları</h5>
                                            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-sm text-indigo-900 space-y-3">
                                                <p><strong>Setup Time (t_su):</strong> Saat 0'dan 1'e geçmeden önce D verisinin Master'ın içine tam olarak yerleşmesi gerekir. Master içinde 2 adet Inverter var (gecikme = 1+1=2). <br/><span className="font-bold">Cevap: t_su = 2</span></p>
                                                <p><strong>Hold Time (t_hold):</strong> Saat vurduğu anda (CLK=1 olduğunda) Master'ın giriş anahtarı (CLK') anında açılır (ideal switch). D'nin artık sabit kalmasına gerek yoktur. <br/><span className="font-bold">Cevap: t_hold = 0</span></p>
                                                <p><strong>Propagation Delay (t_cq):</strong> Saat vurduktan (CLK=1) sonra verinin Q çıkışına ulaşması için geçmesi gereken süre. Veri, Slave içindeki 2 Inverter'dan geçer (gecikme = 1+1=2). <br/><span className="font-bold">Cevap: t_cq = 2</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Prob 2: MIT 2004 - Clock Gating */}
                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">MIT 6.111</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2004 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 2: Clock Gating Circuit (Saat Kesme)</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Bir laboratuvar projesinde 1Hz'lik bir saat (clock) elde edilmek isteniyor. Bir ana sayıcı (Counter), 1.8432MHz hızında çalışmakta ve değeri "1843199" olduğunda bir Combinational Logic (Karşılaştırıcı) <code>1Hz Enable</code> sinyali üretmektedir.</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong>(a)</strong> İlk tasarımda, bu <code>1Hz Enable</code> sinyali doğrudan diğer kaydedicilerin (Register) "Clock" girişine bağlanmıştır. Bu tasarımın ana problemi nedir?</li>
                                                <li><strong>(b)</strong> Problemi çözmek için şöyle bir modifikasyon yapılıyor: Sayıcı (Counter) Negatif Kenar Tetiklemeli (Negative Edge-Triggered) yapılıyor. Ana <code>CLK</code> sinyali ile <code>1Hz Enable</code> sinyali bir <strong>AND kapısına</strong> sokuluyor ve AND kapısının çıkışı Register'ın Clock girişine bağlanıyor. Bu modifikasyon ilk problemdeki hatayı çözer mi? Neden? Hangi şartlar altında düzgün çalışır?</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-8">
                                        <div className="bg-white border-2 border-rose-100 rounded-2xl p-6 shadow-sm">
                                            <h5 className="text-xl font-bold text-rose-900 mb-4">(a) Doğrudan Bağlamanın Problemi (Glitches)</h5>
                                            <p className="text-sm text-slate-700 leading-relaxed">
                                                Combinational Logic (karşılaştırıcı), sayıcının bitleri değişirken <strong>Glitch (kısa süreli anlık hatalı palsler)</strong> üretebilir. <code>1Hz Enable</code> sinyalini doğrudan bir Register'ın Saat (Clock) girişine bağlarsanız, bu glitch'ler Register'ı sahte (false) kenarlar olarak tetikler ve verinin yanlış zamanda, defalarca kaydedilmesine sebep olur.
                                            </p>
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                                            <h5 className="text-xl font-bold text-slate-800 mb-4">(b) AND Kapısı ve Negatif Kenar (Negative Edge) Çözümü</h5>
                                            <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                                Counter negatif kenarda (düşen kenar, CLK=0'a geçerken) tetiklendiği için sayıcının çıkışları ve dolayısıyla karşılaştırıcının <code>1Hz Enable</code> çıkışındaki Glitch'ler <strong>CLK sinyali LOW (0) iken</strong> gerçekleşir.
                                            </p>
                                            <div className="bg-white border-l-4 border-[#235347] p-5 rounded-r-xl shadow-sm text-sm">
                                                <p className="font-medium text-slate-700">
                                                    AND kapısının girişlerinden biri ana <code>CLK</code> sinyalidir. CLK=0 olduğu sürece, <code>1Hz Enable</code> üzerinde ne kadar glitch olursa olsun AND kapısının çıkışı <strong>kesinlikle 0'a (LOW) bastırılır (Gated/Masked).</strong>
                                                </p>
                                                <p className="font-medium text-emerald-800 mt-3">
                                                    <strong>Sonuç:</strong> Evet, bu çözüm glitch problemini giderir.
                                                    <br/><strong>Şart:</strong> Düzgün çalışması için karşılaştırıcının ürettiği glitch'lerin ve gecikmelerin, saat sinyali tekrar HIGH (1) olmadan önce tamamen bitmiş/oturmuş (settled) olması gerekir. Aksi halde CLK=1 olduğunda hatalı bir sinyal AND kapısından geçebilir.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Midterm</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 2: SR Latch with Enable</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Sadece <strong>AND, OR ve NOT kapıları</strong> kullanarak (NOR veya NAND kapısı yasaktır) <strong>Enable (Yetki) girişli bir SR Latch</strong> tasarlayınız.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-700 mb-4">
                                                Standart bir SR Latch genellikle 2 adet Cross-Coupled (çapraz bağlı) NOR kapısıyla yapılır. Bir NOR kapısı aslında bir OR kapısı ve peşine takılmış bir NOT kapısıdır.
                                            </p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2 mb-4">
                                                <li><strong>Adım 1 (Enable Ekleme):</strong> S ve R sinyalleri yalnızca Enable (E) aktifken sisteme girmelidir. Bu yüzden iki giriş de ayrı ayrı AND kapısından geçirilir: <br/><code className="bg-slate-200 px-1">S_en = S · E</code> ve <code className="bg-slate-200 px-1">R_en = R · E</code>.</li>
                                                <li><strong>Adım 2 (NOR'u Oluşturma):</strong> NOR kapısı kullanmamız yasak olduğu için NOR işlemini açık açık OR + NOT şeklinde kuracağız.</li>
                                                <li><strong>Adım 3 (Çapraz Bağlantı):</strong> <br/>
                                                    Q = NOT( R_en OR Q' ) <br/>
                                                    Q' = NOT( S_en OR Q )
                                                </li>
                                            </ul>
                                            <div className="bg-white border-l-4 border-indigo-500 p-4 shadow-sm text-sm font-medium">
                                                <strong>Bağlantı Şeması (Netlist):</strong><br/>
                                                1. AND1: Girişler S ve E. Çıkışı S_en.<br/>
                                                2. AND2: Girişler R ve E. Çıkışı R_en.<br/>
                                                3. OR1: Girişler R_en ve Q'. Çıkışı OR1_out.<br/>
                                                4. OR2: Girişler S_en ve Q. Çıkışı OR2_out.<br/>
                                                5. NOT1: Girişi OR1_out, çıkışı Q.<br/>
                                                6. NOT2: Girişi OR2_out, çıkışı Q'.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Midterm</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 10: D Flip-Flop from JK</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Sadece <strong>bir JK flip-flop ve standart kapılar</strong> kullanarak <strong>Senkron Reset'li bir D Flip-Flop</strong> tasarlayınız.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-700 mb-2">
                                                Standart bir D Flip-Flop, JK Flip-Flop kullanılarak şu şekilde yapılır: <code>J = D</code> ve <code>K = D' (NOT D)</code>.
                                                <br/>Eğer devreye bir de <strong>Reset</strong> girişi (Aktif High) eklemek istiyorsak davranış şu şekilde olmalıdır:
                                            </p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mb-4">
                                                <li><strong>Reset = 1 ise:</strong> Çıkış 0 olmalıdır. Yani JK Flip-Flop'un Reset (Reset state) yapması için <code>J=0, K=1</code> olmalıdır.</li>
                                                <li><strong>Reset = 0 ise:</strong> Çıkış D girişini takip etmelidir. Yani <code>J=D, K=D'</code> olmalıdır.</li>
                                            </ul>
                                            <div className="bg-white border-l-4 border-emerald-500 p-4 shadow-sm text-sm font-medium">
                                                <strong>Kapı Tasarımı:</strong><br/>
                                                Bu mantığı Boolean denklemlerine dökersek: <br/>
                                                <code className="text-indigo-700 font-bold">J = D AND (NOT Reset)</code> <br/>
                                                Saat sinyali (CLK) doğrudan JK Flip-Flop'un CLK girişine bağlanır.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Final</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 2: Timing Violation Probability</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Bir asenkron giriş sinyali (asynchronous input) tamamen rastgele olarak saniyede 1 kez yön değiştirmektedir. Bu sinyal, <strong>100 MHz</strong> (Periyot = 10ns) frekansında çalışan bir D Flip-Flop'un D girişine bağlanmıştır.</p>
                                            <p>Kullanılan D Flip-Flop'un özellikleri şunlardır:</p>
                                            <ul className="list-disc pl-5">
                                                <li>Setup Time ({"$t_{setup}$"}) = 1.5ns</li>
                                                <li>Hold Time ({"$t_{hold}$"}) = 0.5ns</li>
                                            </ul>
                                            <p>Bir saniye içinde bu sistemde bir zamanlama ihlali (timing violation) yani verinin setup/hold penceresi (window of vulnerability) içinde değişme <strong>olasılığı (probability)</strong> nedir?</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                                        <p className="text-sm text-slate-700">
                                            Zamanlama ihlali, veri (D) sinyalinin Saat (Clock) kenarından hemen önceki Setup süresinde veya hemen sonraki Hold süresinde değişmesi durumunda oluşur. Bu tehlikeli zaman aralığına <strong>Window of Vulnerability ($T_w$)</strong> denir.
                                        </p>
                                        <div className="bg-white border-l-4 border-indigo-500 p-4 shadow-sm text-sm font-mono text-indigo-900">
                                            T_w = t_setup + t_hold<br/>
                                            T_w = 1.5ns + 0.5ns = 2.0ns
                                        </div>
                                        <p className="text-sm text-slate-700">
                                            Saat sinyalinin bir tam periyodu (T_clk) 100 MHz için şöyledir:
                                        </p>
                                        <div className="bg-white border-l-4 border-indigo-500 p-4 shadow-sm text-sm font-mono text-indigo-900">
                                            T_clk = 1 / f = 1 / (100 * 10^6) = 10ns
                                        </div>
                                        <p className="text-sm text-slate-700">
                                            Giriş sinyali rastgele olduğuna göre, periyodun herhangi bir anında değişebilir. İhlal olasılığı (Probability) basitçe tehlikeli pencerenin (Window of Vulnerability) toplam periyoda oranıdır:
                                        </p>
                                        <div className="bg-white border-l-4 border-emerald-500 p-4 shadow-sm font-bold text-emerald-900 text-center">
                                            Probability = T_w / T_clk = 2.0ns / 10.0ns = 0.2 (%20)
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Final</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 5: Hold Time Violation & Fix</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Arka arkaya (cascade) bağlı iki D Flip-Flop (FF1 ve FF2) arasında bir Lojik Kapı (Combinational Logic) bulunmaktadır.</p>
                                            <ul className="list-disc pl-5">
                                                <li><strong>D-FF Özellikleri:</strong> {"$t_{setup}$"} = 4ns, {"$t_{hold}$"} = 3ns, {"$t_{cq,cd}$"} (Contamination Delay) = 1ns, {"$t_{cq,pd}$"} (Propagation Delay) = 4ns</li>
                                                <li><strong>Lojik Kapı Özellikleri:</strong> {"$t_{logic,cd}$"} = 1ns, {"$t_{logic,pd}$"} = 3ns</li>
                                                <li><strong>Inverter (NOT) Kapısı (Eklenebilecek):</strong> {"$t_{inv,cd}$"} = 1ns, {"$t_{inv,pd}$"} = 2ns</li>
                                            </ul>
                                            <p><strong>Sorular:</strong></p>
                                            <ol className="list-decimal pl-5 space-y-1">
                                                <li>Bu devrede bir Hold Time ihlali (violation) var mıdır? Varsa devrenin mantığını bozmadan düzeltmek için araya <strong>en az kaç adet Inverter (NOT kapısı)</strong> eklenmelidir?</li>
                                                <li>Devre düzeltildikten sonra ulaşılabilecek <strong>maksimum saat frekansı (Max Clock Frequency)</strong> nedir?</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">1) Hold Time İhlali Kontrolü ve Düzeltilmesi</h5>
                                            <p className="text-sm text-slate-700 mb-2">Hold Time şartı şöyledir (En hızlı sinyal geçişinin, hold time'dan uzun sürmesi gerekir):</p>
                                            <div className="bg-white border-l-4 border-rose-500 p-4 shadow-sm text-sm font-mono text-rose-900 mb-3">
                                                t_cq,cd + t_logic,cd &ge; t_hold<br/>
                                                1ns + 1ns = 2ns &ge; 3ns &rarr; YANLIŞ!
                                            </div>
                                            <p className="text-sm text-slate-700">
                                                İhlal vardır (Violation). Gecikme eksikliği: <code>3ns - 2ns = 1ns</code>. 
                                                <br/>Mantığı bozmamak (sayıyı terslememek) için Inverter'lar <strong>çift (pair)</strong> halinde eklenmelidir. 
                                                <br/>Her bir Inverter'ın {"$t_{cd}$"}'si 1ns'dir. 2 Inverter eklersek ekstra {"$t_{cd}$"} = 2ns olur.
                                            </p>
                                            <div className="bg-emerald-50 border border-emerald-200 p-3 mt-3 rounded">
                                                <strong>Sonuç:</strong> Araya <strong>2 adet Inverter</strong> arka arkaya eklenmelidir. <br/>
                                                Yeni {"$t_{cd}$"} = 1ns (FF) + 1ns (Lojik) + 2ns (Inverters) = 4ns &ge; 3ns. (Sorun çözüldü)
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">2) Maksimum Saat Frekansı (Max Clock Frequency)</h5>
                                            <p className="text-sm text-slate-700 mb-2">Devre düzeltildikten sonra Propagation Delay (En uzun yol) hesaplanarak minimum saat periyodu (T_min) bulunur:</p>
                                            <div className="bg-white border-l-4 border-indigo-500 p-4 shadow-sm text-sm font-mono text-indigo-900 mb-3">
                                                T_min &ge; t_cq,pd + t_logic,pd + t_inv_pair,pd + t_setup<br/>
                                                t_inv_pair,pd = 2 * 2ns = 4ns<br/>
                                                T_min &ge; 4ns (FF) + 3ns (Lojik) + 4ns (Inverters) + 4ns (Setup)<br/>
                                                T_min = 15ns
                                            </div>
                                            <p className="text-sm text-slate-700">
                                                Maksimum Frekans ({"$F_{max}$"}) = 1 / {"$T_{min}$"}
                                            </p>
                                            <div className="bg-emerald-50 border border-emerald-200 p-3 mt-3 rounded font-bold text-emerald-900 text-center text-lg">
                                                F_max = 1 / 15ns &approx; 66.67 MHz
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">MIT 6.111</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2006 - Quiz</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 2: J-K Flip Flop &amp; Synchronous Counter</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium w-full">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p><strong>Part (b):</strong> Elinizde pozitif kenar tetiklemeli bir D Flip-Flop bulunmaktadır. Ekstra lojik kapılar ekleyerek, aşağıdaki doğruluk tablosunda (Truth Table) işlevi verilen bir J-K Flip-Flop tasarlayınız. <code>Q+</code> sonraki durumu (Next State) temsil etmektedir.</p>
                                            
                                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full max-w-sm">
                                                <table className="w-full text-center border-collapse font-mono text-sm">
                                                    <thead>
                                                        <tr className="bg-slate-100 text-slate-600">
                                                            <th className="p-2 border">J</th>
                                                            <th className="p-2 border">K</th>
                                                            <th className="p-2 border">Q+</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border">Q</td></tr>
                                                        <tr><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border">0</td></tr>
                                                        <tr><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border">1</td></tr>
                                                        <tr><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border">Q'</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <p className="mt-4"><strong>Part (c):</strong> Tasarladığınız bu J-K Flip-Flop'ları kullanarak 2-bit senkron bir sayıcı (Synchronous Counter) tasarlayınız. Sayıcı <code>00 &rarr; 01 &rarr; 10 &rarr; 11 &rarr; 00</code> şeklinde saymalıdır. İhtiyaç duyulan J ve K girişleri için (özellikle MSB için) K-Map (Karnaugh Haritası) optimizasyonunu gösteriniz.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        {/* Part B Çözümü */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm text-sm text-slate-700 space-y-4">
                                            <h5 className="font-bold text-indigo-900 text-base">Çözüm - Part (b): J-K Flip-Flop Karakteristik Denklemi</h5>
                                            <p>D Flip-Flop'un özelliği, girişindeki değeri (D) doğrudan çıkışa (Q+) aktarmasıdır (<code>Q+ = D</code>). Bu nedenle J-K tablosunu kullanarak <code>Q+</code> için (dolayısıyla D için) bir denklem bulmalıyız.</p>
                                            
                                            <div className="flex gap-4 items-start flex-wrap">
                                                <div className="bg-white p-3 rounded-lg border border-slate-200">
                                                    <table className="text-center border-collapse font-mono text-xs">
                                                        <thead>
                                                            <tr className="bg-slate-100 text-slate-600">
                                                                <th className="p-1 border">J</th>
                                                                <th className="p-1 border">K</th>
                                                                <th className="p-1 border">Q</th>
                                                                <th className="p-1 border font-bold text-indigo-600">Q+ (D)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border font-bold">0</td></tr>
                                                            <tr><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border font-bold">1</td></tr>
                                                            <tr><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border font-bold">0</td></tr>
                                                            <tr><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border font-bold">0</td></tr>
                                                            <tr><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border font-bold">1</td></tr>
                                                            <tr><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border font-bold">1</td></tr>
                                                            <tr><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border font-bold">1</td></tr>
                                                            <tr><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border font-bold">0</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded text-indigo-900 flex-1 min-w-[200px]">
                                                    <p className="mb-2">Tablodan 1 olan durumları (Mintermleri) alırsak:</p>
                                                    <p className="font-mono bg-white px-2 py-1 rounded inline-block text-sm border border-indigo-200">
                                                        D = J &middot; K' &middot; Q' + J &middot; K &middot; Q' + J &middot; K' &middot; Q + J' &middot; K' &middot; Q
                                                    </p>
                                                    <p className="mt-2">K-Map ile sadeleştirdiğimizde ünlü J-K karakteristik denklemini buluruz:</p>
                                                    <p className="font-mono font-bold bg-indigo-600 text-white px-3 py-2 rounded inline-block text-base mt-1 shadow-sm">
                                                        D = J &middot; Q' + K' &middot; Q
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Part C Çözümü */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm text-sm text-slate-700 space-y-4">
                                            <h5 className="font-bold text-indigo-900 text-base">Çözüm - Part (c): 2-bit Senkron Sayıcı Tasarımı</h5>
                                            <p>2-bit sayıcının (Q1, Q0) durum geçiş tablosunu (State Transition Table) ve J-K uyarma (Excitation) değerlerini yazalım.</p>
                                            
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-center border-collapse font-mono text-sm bg-white border border-slate-200">
                                                    <thead>
                                                        <tr className="bg-slate-100 text-slate-600">
                                                            <th className="p-2 border" colSpan={2}>Present State</th>
                                                            <th className="p-2 border" colSpan={2}>Next State</th>
                                                            <th className="p-2 border text-emerald-700" colSpan={2}>Flip-Flop 1 (MSB)</th>
                                                            <th className="p-2 border text-blue-700" colSpan={2}>Flip-Flop 0 (LSB)</th>
                                                        </tr>
                                                        <tr className="bg-slate-50 text-slate-500 text-xs">
                                                            <th className="p-1 border">Q1</th>
                                                            <th className="p-1 border">Q0</th>
                                                            <th className="p-1 border">Q1+</th>
                                                            <th className="p-1 border">Q0+</th>
                                                            <th className="p-1 border text-emerald-600">J1</th>
                                                            <th className="p-1 border text-emerald-600">K1</th>
                                                            <th className="p-1 border text-blue-600">J0</th>
                                                            <th className="p-1 border text-blue-600">K0</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border text-emerald-700 font-bold">0</td><td className="p-1 border text-emerald-700 font-bold">X</td><td className="p-1 border text-blue-700 font-bold">1</td><td className="p-1 border text-blue-700 font-bold">X</td></tr>
                                                        <tr><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border text-emerald-700 font-bold">1</td><td className="p-1 border text-emerald-700 font-bold">X</td><td className="p-1 border text-blue-700 font-bold">X</td><td className="p-1 border text-blue-700 font-bold">1</td></tr>
                                                        <tr><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border text-emerald-700 font-bold">X</td><td className="p-1 border text-emerald-700 font-bold">0</td><td className="p-1 border text-blue-700 font-bold">1</td><td className="p-1 border text-blue-700 font-bold">X</td></tr>
                                                        <tr><td className="p-1 border">1</td><td className="p-1 border">1</td><td className="p-1 border">0</td><td className="p-1 border">0</td><td className="p-1 border text-emerald-700 font-bold">X</td><td className="p-1 border text-emerald-700 font-bold">1</td><td className="p-1 border text-blue-700 font-bold">X</td><td className="p-1 border text-blue-700 font-bold">1</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                                                    <h6 className="font-bold text-emerald-900 mb-2">MSB (Q1) için J1 ve K1 K-Map</h6>
                                                    <p className="text-xs text-emerald-800 mb-3">J1 için X (Don't care) durumları 1 yapılarak grup oluşturulur. Aynı şekilde K1 için de gruplama yapılır.</p>
                                                    <div className="flex gap-4">
                                                        <table className="text-center border-collapse bg-white font-mono text-xs w-24">
                                                            <thead><tr><th colSpan={3} className="text-emerald-700 pb-1">J1 Map</th></tr><tr><th></th><th>Q0=0</th><th>Q0=1</th></tr></thead>
                                                            <tbody>
                                                                <tr><th className="pr-2">Q1=0</th><td className="border p-2">0</td><td className="border p-2 bg-emerald-100 font-bold">1</td></tr>
                                                                <tr><th className="pr-2">Q1=1</th><td className="border p-2 text-slate-400">X</td><td className="border p-2 text-slate-400 bg-emerald-100 font-bold">X</td></tr>
                                                            </tbody>
                                                        </table>
                                                        <table className="text-center border-collapse bg-white font-mono text-xs w-24">
                                                            <thead><tr><th colSpan={3} className="text-emerald-700 pb-1">K1 Map</th></tr><tr><th></th><th>Q0=0</th><th>Q0=1</th></tr></thead>
                                                            <tbody>
                                                                <tr><th className="pr-2">Q1=0</th><td className="border p-2 text-slate-400">X</td><td className="border p-2 text-slate-400 bg-emerald-100 font-bold">X</td></tr>
                                                                <tr><th className="pr-2">Q1=1</th><td className="border p-2">0</td><td className="border p-2 bg-emerald-100 font-bold">1</td></tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <p className="mt-3 font-mono font-bold text-emerald-900 bg-white px-2 py-1 rounded inline-block shadow-sm">J1 = Q0</p>
                                                    <p className="mt-3 ml-2 font-mono font-bold text-emerald-900 bg-white px-2 py-1 rounded inline-block shadow-sm">K1 = Q0</p>
                                                </div>
                                                
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                    <h6 className="font-bold text-blue-900 mb-2">LSB (Q0) için J0 ve K0 K-Map</h6>
                                                    <p className="text-xs text-blue-800 mb-3">Tabloya bakıldığında LSB'nin her saat vuruşunda (clock pulse) durum değiştirmesi (toggle) gerektiği görülür.</p>
                                                    <p className="font-mono text-xs bg-white px-2 py-1 border border-blue-100 mb-1">J0 değerleri: 1, X, 1, X &rarr; Tümü 1 kabul edilir.</p>
                                                    <p className="font-mono text-xs bg-white px-2 py-1 border border-blue-100 mb-3">K0 değerleri: X, 1, X, 1 &rarr; Tümü 1 kabul edilir.</p>
                                                    <p className="font-mono font-bold text-blue-900 bg-white px-2 py-1 rounded inline-block shadow-sm">J0 = 1</p>
                                                    <p className="ml-2 font-mono font-bold text-blue-900 bg-white px-2 py-1 rounded inline-block shadow-sm">K0 = 1</p>
                                                </div>
                                            </div>
                                            <p className="text-xs font-bold text-slate-500 mt-2">Sonuç: Bu sayıcıyı kurmak için LSB flip-flop'unun J ve K uçları VCC'ye (1) bağlanır. MSB flip-flop'unun J ve K uçları ise LSB'nin çıkışına (Q0) bağlanır.</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )}

                    {/* CHAPTER 8: FSMs & Datapaths */}
                    {activeChapter === "ch8" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h2 className="text-2xl font-bold text-[#163832] flex items-center gap-2">
                                    <BookOpen className="w-6 h-6 text-[#235347]" /> 
                                    Chapter 8: FSMs & Datapaths
                                </h2>
                                <p className="text-slate-500 mt-2 text-sm font-medium">Verilog ile State Machine tasarımı, Synchronizer'lar ve Combinational devre hataları.</p>
                            </div>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">MIT 6.111</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2004 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 5: Verilog Debugging</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            
                                            <p><strong>(a) Synchronizer:</strong> Aşağıdaki kod iki kaydedicili (register) bir synchronizer mıdır? Hatalıysa düzeltin.</p>
                                            <pre className="bg-slate-200 p-2 rounded text-xs">always @ (posedge clk) begin q1 = in; q2 = q1; end</pre>

                                            <p className="mt-4"><strong>(b) 3:1 MUX (Latch Inference):</strong> Aşağıdaki kodun saf bir kombinasyonel 3:1 Mux üretmesi beklenmektedir (sel=11 umursanmıyor). Öyle mi? Değilse düzeltin.</p>
                                            <pre className="bg-slate-200 p-2 rounded text-xs">always @ (a or b or c or sel) begin case(sel) 2'b00: out=a; 2'b01: out=b; 2'b10: out=c; endcase end</pre>

                                            <p className="mt-4"><strong>(c) FSM & Counter:</strong> 4 duruma sahip bir FSM kodlanmıştır. State "10" olduğunda, senkron bir 4-bit sayıcıyı arttırmalıdır. Reset sinyali asenkrondur ve hem FSM'i hem sayıcıyı sıfırlamaktadır. Kodda aşağıdaki <code>always @ (state or reset)</code> bloğu içinde sayıcıyı arttıran şu kısım vardır:</p>
                                            <pre className="bg-slate-200 p-2 rounded text-xs">2'b10: begin next = 2'b11; count = count + 1; end</pre>
                                            <p>Sentezlendiğinde yaşanacak en büyük problem nedir? Nasıl çözülür?</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        {/* A */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">(a) Synchronizer (Blocking vs Non-Blocking)</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Hayır, kod doğru bir synchronizer değildir. Kodda <strong>Blocking Assignment (=)</strong> kullanılmıştır. Bu durumda q1 güncellenir güncellenmez q2 anında q1'in yeni değerini alır. İki adet ardışık FF yerine tek bir kayıt (veya paralel çalışan iki aynı çıkış) sentezlenir.
                                            </p>
                                            <div className="bg-white border-l-4 border-[#235347] p-3 shadow-sm text-sm">
                                                <strong>Çözüm:</strong> Non-blocking assignment (<code>&lt;=</code>) kullanılmalıdır: 
                                                <br/><code>q1 &lt;= in;  q2 &lt;= q1;</code>
                                            </div>
                                        </div>

                                        {/* B */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">(b) Latch Inference (Unintended Memory)</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Hayır, saf kombinasyonel bir devre üretmez. <code>case</code> yapısında <code>2'b11</code> durumu eksiktir. Verilog'da eğer bir koşul belirtilmemişse, sentezleyici mevcut değeri korumak için <strong>Latch (Hafıza elemanı)</strong> üretir.
                                            </p>
                                            <div className="bg-white border-l-4 border-[#235347] p-3 shadow-sm text-sm">
                                                <strong>Çözüm:</strong> <code>endcase</code>'den hemen önce <code>default</code> durumunu eklemelisiniz.
                                                <br/><code>default: out = 1'bx;</code> (x koymak don't care anlamına gelir ve optimizasyon sağlar).
                                            </div>
                                        </div>

                                        {/* C */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-rose-800 mb-2">(c) FSM Counter (Kombinasyonel Loop)</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                En büyük problem, <code>count = count + 1;</code> işleminin saat (clk) olmayan bir <strong>Kombinasyonel (Combinational) always bloğu</strong> içinde (<code>always @ (state or reset)</code>) yapılmış olmasıdır.
                                                Saat vurmasını beklemediği için sayıcı, <code>state == 2'b10</code> olduğu sürece sonsuz bir döngüde asenkron olarak saymaya (osilasyon yapmaya) devam eder.
                                            </p>
                                            <div className="bg-rose-50 border-l-4 border-rose-500 p-3 shadow-sm text-sm font-medium">
                                                <strong>Çözüm:</strong> Kombinasyonel blok içinde sadece <code>count_enable = 1;</code> şeklinde bir kontrol sinyali (flag) üretilmelidir. Sayma işlemi ise ayrı bir Senkron (Clocked) bloğun içine alınmalıdır.
                                                <br/><code>always @(posedge clk or posedge reset) begin</code>
                                                <br/>&nbsp;&nbsp;<code>if (reset) count &lt;= 0;</code>
                                                <br/>&nbsp;&nbsp;<code>else if (count_enable) count &lt;= count + 1;</code>
                                                <br/><code>end</code>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Midterm</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 7: FSM Sequence Detectors</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıdaki durumlar için <strong>State Transition Diagram (Durum Geçiş Diyagramı)</strong> tasarlayınız:</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong>(a)</strong> Makinenin A girişi ve B çıkışı vardır. Çıkış B, son gelen A değerleri <code>101</code> veya <code>11</code> dizisini oluşturuyorsa 1 (high), aksi halde 0 (low) olacaktır.</li>
                                                <li><strong>(b)</strong> Makinenin C ve R girişleri, A çıkışı vardır. Çıkış A, en son <code>R=1</code> olduğundan beri (R'nin 1 olmasından sonra) <code>C</code> en az 2 saat döngüsü boyunca 1 (high) kaldıysa 1 olacaktır.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">(a) "101" veya "11" Dedektörü</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Bu bir dizi algılayıcıdır (Sequence Detector). Gelen bitleri akılda tutmak için durumlara (states) ihtiyacımız var:
                                            </p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                <li><strong>S0 (Başlangıç):</strong> Henüz 1 gelmedi.</li>
                                                <li><strong>S1 (Got 1):</strong> En son 1 geldi. Çıkış 0. (Eğer tekrar 1 gelirse "11" olur ve S3'e gidilir).</li>
                                                <li><strong>S2 (Got 10):</strong> En son 10 geldi. Çıkış 0. (Eğer 1 gelirse "101" olur ve S4'e gidilir).</li>
                                                <li><strong>S3 (Got 11):</strong> Hedef dizi "11" bulundu! <strong>Çıkış B = 1.</strong></li>
                                                <li><strong>S4 (Got 101):</strong> Hedef dizi "101" bulundu! <strong>Çıkış B = 1.</strong></li>
                                            </ul>
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">(b) R Sonrası 2 Döngü C Dedektörü</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Burada R sinyali sistemi bir nevi Resetliyor ve C'nin art arda değil, toplamda (veya R'den sonra ilk fırsatta) 2 kere 1 olmasını sayıyor:
                                            </p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                <li><strong>S0 (Reset State):</strong> En son R=1 oldu. Sayıcı sıfırlanmış durumda. Çıkış A = 0.</li>
                                                <li><strong>S1 (C=1 once):</strong> R'den beri ilk defa C=1 oldu (R=0 iken). Çıkış A = 0.</li>
                                                <li><strong>S2 (C=1 twice):</strong> R'den beri ikinci defa C=1 oldu. Artık şart sağlandı! <strong>Çıkış A = 1.</strong> (R=1 gelene kadar bu durumda kalır).</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Midterm</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 8: Verilog Module</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Görseldeki devreyi uygulayan <code>Bob</code> isimli bir Verilog modülü yazınız. Devrede A girişi ve bir XOR kapısı vardır. XOR'un çıkışı D Flip-Flop'a bağlıdır ve Flip-Flop'un Q çıkışı (Y) gerisingeri XOR'un B girişine bağlanmıştır.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-700 mb-4">
                                                Devrenin netlist analizini yapalım:
                                                <br/>Flip-Flop'un D girişi: <code>D = A XOR B</code>
                                                <br/>Geri besleme (Feedback): B girişi doğrudan Flip-Flop'un Q çıkışına (Y sinyaline) bağlıdır. Yani <code>B = Y</code>.
                                                <br/>Özetle: <code>D = A XOR Y</code>.
                                            </p>
                                            
                                            <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                                                <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
<span className="text-pink-400">module</span> Bob (
    <span className="text-pink-400">input</span> wire A,
    <span className="text-pink-400">input</span> wire CLK,
    <span className="text-pink-400">output</span> reg Y
);

    <span className="text-pink-400">always</span> @(<span className="text-indigo-300">posedge</span> CLK) <span className="text-pink-400">begin</span>
        Y &lt;= A ^ Y;  <span className="text-slate-500">// Non-blocking assignment for Flip-Flop, XOR operation</span>
    <span className="text-pink-400">end</span>

<span className="text-pink-400">endmodule</span>
                                                </pre>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-3 font-medium">Not: Devrede Asenkron veya Senkron Reset olmadığı için koda eklenmemiştir. Sadece saat kenarı (posedge CLK) tetiklemesi kullanılmıştır.</p>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Final</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 6: Moore State Machine Design</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Bir <strong>Moore</strong> tipi durum makinesi (FSM) tasarlayınız. FSM'nin tek bir girişi (<code>A</code>) ve tek bir çıkışı (<code>Y</code>) vardır.</p>
                                            <p><strong>Kural:</strong> Çıkış <code>Y=1</code> olması için, sistem sıfırlandığından (Reset) <strong>VEYA</strong> giriş A'da arka arkaya iki kez 0 (yani "00" dizilimi) görüldüğünden bu yana A girişinde <strong>toplamda tam olarak iki kez 1</strong> gelmiş olması gerekir. Aksi halde <code>Y=0</code> olur.</p>
                                            <p>Bu sistemi modelleyen bir Durum Geçiş Diyagramı (State Transition Diagram) oluşturunuz. (Mantık kapıları veya tablo istenmemektedir).</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4 text-sm text-slate-700">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="font-bold mb-3">Durum (State) Analizi:</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong>S_START (Y=0):</strong> Başlangıç veya "00" görüldükten sonraki durum. Hiç "1" gelmedi.</li>
                                                <li><strong>S_ONE1 (Y=0):</strong> Şu ana kadar bir tane "1" geldi.</li>
                                                <li><strong>S_TWO1 (Y=1):</strong> Şu ana kadar iki tane "1" geldi. (İstenen durum)</li>
                                                <li><strong>S_MORE1 (Y=0):</strong> İkiden fazla "1" geldi (Bu noktadan sonra "00" gelene kadar Y=0 kalacak).</li>
                                            </ul>
                                            <p className="mt-4 font-bold text-[#163832]">Ardışık 0'ları Sayma Durumları (Geçişler İçin):</p>
                                            <p className="mt-2">Herhangi bir durumda eğer bir "0" gelirse, FSM'nin bunun birinci "0" mı yoksa ikinci "0" mı olduğunu hatırlaması gerekir. Bu yüzden her temel duruma bir de "Şu an bir tane 0 geldi" alt-durumu eklemeliyiz.</p>
                                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                                <li><strong>S_ONE1_0 (Y=0):</strong> Bir "1" var, ardından bir "0" geldi.</li>
                                                <li><strong>S_TWO1_0 (Y=1):</strong> İki "1" var, ardından bir "0" geldi.</li>
                                                <li><strong>S_MORE1_0 (Y=0):</strong> İkiden fazla "1" var, ardından bir "0" geldi.</li>
                                                <li><em>Not: S_START'tayken 0 gelirse yine S_START'ta (veya eşdeğeri bir bekleme durumunda) kalır çünkü zaten "00" görse bile hiç 1 gelmediği için baştan başlar.</em></li>
                                            </ul>
                                        </div>
                                        
                                        <div className="bg-white border-l-4 border-emerald-500 p-5 shadow-sm overflow-x-auto">
                                            <p className="font-bold mb-4 text-emerald-900">Geçiş Mantığı (Transition Rules):</p>
                                            <table className="w-full text-left border-collapse text-xs md:text-sm">
                                                <thead>
                                                    <tr className="bg-slate-100 border-b-2 border-slate-200">
                                                        <th className="p-3">Current State</th>
                                                        <th className="p-3 text-rose-700">if A=0</th>
                                                        <th className="p-3 text-indigo-700">if A=1</th>
                                                        <th className="p-3 text-emerald-700">Output (Y)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-slate-100">
                                                        <td className="p-3 font-bold">S_START</td>
                                                        <td className="p-3 text-slate-500">S_START (Zaten 0'da)</td>
                                                        <td className="p-3">S_ONE1</td>
                                                        <td className="p-3 font-bold">0</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-100 bg-slate-50">
                                                        <td className="p-3 font-bold">S_ONE1</td>
                                                        <td className="p-3">S_ONE1_0</td>
                                                        <td className="p-3 font-bold text-indigo-700">S_TWO1</td>
                                                        <td className="p-3 font-bold">0</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-100">
                                                        <td className="p-3 font-bold">S_ONE1_0</td>
                                                        <td className="p-3 font-bold text-rose-700">S_START ("00" oldu)</td>
                                                        <td className="p-3 font-bold text-indigo-700">S_TWO1</td>
                                                        <td className="p-3 font-bold">0</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-100 bg-slate-50">
                                                        <td className="p-3 font-bold text-emerald-700">S_TWO1</td>
                                                        <td className="p-3">S_TWO1_0</td>
                                                        <td className="p-3">S_MORE1</td>
                                                        <td className="p-3 font-bold text-emerald-700">1</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-100">
                                                        <td className="p-3 font-bold text-emerald-700">S_TWO1_0</td>
                                                        <td className="p-3 font-bold text-rose-700">S_START ("00" oldu)</td>
                                                        <td className="p-3">S_MORE1</td>
                                                        <td className="p-3 font-bold text-emerald-700">1</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-100 bg-slate-50">
                                                        <td className="p-3 font-bold">S_MORE1</td>
                                                        <td className="p-3">S_MORE1_0</td>
                                                        <td className="p-3">S_MORE1</td>
                                                        <td className="p-3 font-bold">0</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-100">
                                                        <td className="p-3 font-bold">S_MORE1_0</td>
                                                        <td className="p-3 font-bold text-rose-700">S_START ("00" oldu)</td>
                                                        <td className="p-3">S_MORE1</td>
                                                        <td className="p-3 font-bold">0</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Final</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 7: Verilog Modeling of a Sequential Circuit</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>İki adet D Flip-Flop (FF1 ve FF2) içeren bir ardışıl devre tasarlanmıştır. Devrenin <code>X</code> isimli bir girişi ve <code>Y</code> isimli bir çıkışı (FF2'nin Q çıkışı) vardır.</p>
                                            <ul className="list-disc pl-5">
                                                <li><strong>FF1'in D girişi:</strong> <code>X XOR Y</code></li>
                                                <li><strong>FF2'nin D girişi:</strong> <code>FF1_Q AND X</code></li>
                                                <li><strong>Çıkış Y:</strong> <code>FF2_Q</code> (Doğrudan FF2'nin çıkışıdır)</li>
                                            </ul>
                                            <p>Bu sistemi donanım tanımlama diliyle (Verilog) modelleyiniz. Modül tanımınız <code>module circuit (input CLK, input X, output Y);</code> şeklinde olmalıdır.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
                                            <span className="text-xs font-mono text-slate-400">circuit.v</span>
                                            <div className="flex gap-1.5">
                                                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                                            </div>
                                        </div>
                                        <div className="p-5 overflow-x-auto">
                                            <pre className="text-sm font-mono leading-relaxed text-slate-300">
<span className="text-pink-400">module</span> <span className="text-emerald-300">circuit</span>(
    <span className="text-pink-400">input</span> CLK,
    <span className="text-pink-400">input</span> X,
    <span className="text-pink-400">output reg</span> Y
);

    <span className="text-slate-500">// İç sinyaller (Internal signals)</span>
    <span className="text-pink-400">reg</span> ff1_q;

    <span className="text-slate-500">// FF1: D = X XOR Y</span>
    <span className="text-pink-400">always</span> @(<span className="text-indigo-300">posedge</span> CLK) <span className="text-pink-400">begin</span>
        ff1_q &lt;= X ^ Y;
    <span className="text-pink-400">end</span>

    <span className="text-slate-500">// FF2: D = ff1_q AND X. Çıkışı Y'ye eşittir.</span>
    <span className="text-pink-400">always</span> @(<span className="text-indigo-300">posedge</span> CLK) <span className="text-pink-400">begin</span>
        Y &lt;= ff1_q &amp; X;
    <span className="text-pink-400">end</span>

<span className="text-pink-400">endmodule</span>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Final</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 8: State Minimization</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıda verilen durum tablosundaki (State Table) eşdeğer durumları bulup, makineyi mümkün olan en az sayıdaki durumla (State Reduction) yeniden tanımlayınız.</p>
                                            
                                            <div className="bg-white p-4 rounded shadow-sm border border-slate-200 w-full max-w-sm mt-3 font-mono">
                                                <table className="w-full text-center">
                                                    <thead>
                                                        <tr className="border-b bg-slate-100">
                                                            <th className="p-2">State</th>
                                                            <th className="p-2">X=0</th>
                                                            <th className="p-2">X=1</th>
                                                            <th className="p-2">Out (Z)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-b"><td className="p-2 font-bold">A</td><td className="p-2">B</td><td className="p-2">C</td><td className="p-2 text-rose-600">0</td></tr>
                                                        <tr className="border-b"><td className="p-2 font-bold">B</td><td className="p-2">D</td><td className="p-2">E</td><td className="p-2 text-rose-600">0</td></tr>
                                                        <tr className="border-b"><td className="p-2 font-bold">C</td><td className="p-2">B</td><td className="p-2">C</td><td className="p-2 text-indigo-600">1</td></tr>
                                                        <tr className="border-b"><td className="p-2 font-bold">D</td><td className="p-2">D</td><td className="p-2">E</td><td className="p-2 text-rose-600">0</td></tr>
                                                        <tr className="border-b"><td className="p-2 font-bold">E</td><td className="p-2">F</td><td className="p-2">C</td><td className="p-2 text-indigo-600">1</td></tr>
                                                        <tr><td className="p-2 font-bold">F</td><td className="p-2">B</td><td className="p-2">C</td><td className="p-2 text-rose-600">0</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-3">Adım 1: Implication Table (Eşdeğerlik Tablosu) Analizi</h5>
                                            <p className="text-sm text-slate-700 mb-2">Öncelikle çıkışları farklı olan (örneğin A'nın çıkışı 0, C'nin çıkışı 1) durumları eleriz. Geriye kalan durumları eşdeğerlik potansiyeli açısından kontrol ederiz.</p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                <li><strong>Çıkışı 0 olanlar:</strong> A, B, D, F</li>
                                                <li><strong>Çıkışı 1 olanlar:</strong> C, E</li>
                                            </ul>
                                            <p className="text-sm text-slate-700 mt-3 font-bold text-indigo-800">Çiftleri Karşılaştırma:</p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2 mt-1">
                                                <li><code className="bg-indigo-100 px-1 rounded">(B, D) Çifti:</code> X=0 için (D, D), X=1 için (E, E). İkisi de aynı yerlere gidiyor. <strong>B ve D kesinlikle eşdeğerdir. (B &equiv; D)</strong></li>
                                                <li><code className="bg-indigo-100 px-1 rounded">(A, F) Çifti:</code> İkisi de X=0'da B'ye, X=1'de C'ye gidiyor. İkisi de tamamen aynı geçişlere sahip. <strong>A ve F eşdeğerdir. (A &equiv; F)</strong></li>
                                                <li><code className="bg-indigo-100 px-1 rounded">(C, E) Çifti:</code> X=0 için C->B'ye, E->F'ye gidiyor. Ama az önce <strong>B &equiv; B</strong> (tabii ki) ve A &equiv; F dedik. Peki B ve F aynı mı?
                                                    <br/>B->D ve E. F->B ve C. (Farklı yerlere gidiyorlar). Dolayısıyla C ve E eşdeğer değildir.
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-sm">
                                            <h5 className="font-bold text-emerald-900 mb-2">Adım 2: İndirgenmiş (Minimized) Tablo</h5>
                                            <p className="text-sm text-emerald-800 mb-3">
                                                D'yi silip yerine B yazarız. F'yi silip yerine A yazarız.<br/>
                                                Geriye kalan durumlar: <strong>A, B, C, E</strong> (Toplam 4 durum).
                                            </p>
                                            
                                            <div className="bg-white p-4 rounded border border-emerald-200 w-full max-w-sm mt-3 font-mono text-sm">
                                                <table className="w-full text-center">
                                                    <thead>
                                                        <tr className="border-b bg-emerald-100/50">
                                                            <th className="p-2">State</th>
                                                            <th className="p-2">X=0</th>
                                                            <th className="p-2">X=1</th>
                                                            <th className="p-2">Out (Z)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-b"><td className="p-2 font-bold">A</td><td className="p-2">B</td><td className="p-2">C</td><td className="p-2">0</td></tr>
                                                        <tr className="border-b"><td className="p-2 font-bold">B</td><td className="p-2">B (D yerine)</td><td className="p-2">E</td><td className="p-2">0</td></tr>
                                                        <tr className="border-b"><td className="p-2 font-bold">C</td><td className="p-2">B</td><td className="p-2">C</td><td className="p-2">1</td></tr>
                                                        <tr><td className="p-2 font-bold">E</td><td className="p-2">A (F yerine)</td><td className="p-2">C</td><td className="p-2">1</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Quiz 4</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 2: FSM State Minimization</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıdaki State Table (Durum Tablosu)'nı inceleyiniz. Durum (State) sayısını <strong>minimize (indirgeme)</strong> ediniz.</p>
                                            
                                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full max-w-sm">
                                                <table className="w-full text-center border-collapse font-mono text-sm">
                                                    <thead>
                                                        <tr className="bg-slate-100 text-slate-600">
                                                            <th className="p-2 border" rowSpan={2}>State</th>
                                                            <th className="p-2 border" colSpan={2}>Next State</th>
                                                            <th className="p-2 border" rowSpan={2}>Output (W)</th>
                                                        </tr>
                                                        <tr className="bg-slate-50 text-slate-500">
                                                            <th className="p-1 border">X=0</th>
                                                            <th className="p-1 border">X=1</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr><td className="p-1 border font-bold">A</td><td className="p-1 border">A</td><td className="p-1 border">B</td><td className="p-1 border">0</td></tr>
                                                        <tr><td className="p-1 border font-bold">B</td><td className="p-1 border">A</td><td className="p-1 border">B</td><td className="p-1 border">1</td></tr>
                                                        <tr><td className="p-1 border font-bold">C</td><td className="p-1 border">E</td><td className="p-1 border">A</td><td className="p-1 border">1</td></tr>
                                                        <tr><td className="p-1 border font-bold">D</td><td className="p-1 border">D</td><td className="p-1 border">B</td><td className="p-1 border">0</td></tr>
                                                        <tr><td className="p-1 border font-bold">E</td><td className="p-1 border">C</td><td className="p-1 border">D</td><td className="p-1 border">1</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm text-sm text-slate-700 space-y-4">
                                            <p>Durum sayısını azaltmak için (State Minimization), durumları önce çıkışlarına (W) göre gruplar (Partition), ardından geçişlerinin (Next State) aynı gruba gidip gitmediğine bakarız.</p>
                                            
                                            <div className="p-4 bg-white rounded border border-slate-200">
                                                <h5 className="font-bold text-indigo-900 mb-2">Adım 1: Çıkışlara (Output W) Göre Gruplama (P1)</h5>
                                                <ul className="list-disc pl-5">
                                                    <li><strong>Grup 0:</strong> W=0 olanlar &rarr; <code>{"{A, D}"}</code></li>
                                                    <li><strong>Grup 1:</strong> W=1 olanlar &rarr; <code>{"{B, C, E}"}</code></li>
                                                </ul>
                                            </div>
                                            
                                            <div className="p-4 bg-white rounded border border-slate-200">
                                                <h5 className="font-bold text-indigo-900 mb-2">Adım 2: Geçişlere (Next States) Göre Ayrıştırma (P2)</h5>
                                                <p className="mb-2">Her bir durumun X=0 ve X=1 için hangi gruba (Grup 0 veya Grup 1) gittiğine bakarız:</p>
                                                
                                                <p className="font-bold text-slate-600">Grup 0 <code>{"{A, D}"}</code> için:</p>
                                                <ul className="list-disc pl-5 mb-3">
                                                    <li><strong>A:</strong> X=0 &rarr; A (Grup 0), X=1 &rarr; B (Grup 1)</li>
                                                    <li><strong>D:</strong> X=0 &rarr; D (Grup 0), X=1 &rarr; B (Grup 1)</li>
                                                </ul>
                                                <p className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block text-xs font-bold mb-4">A ve D tamamen aynı gruplara gittiği için BÖLÜNMEZLER. <code>{"{A, D}"}</code> birlikte kalır.</p>

                                                <p className="font-bold text-slate-600">Grup 1 <code>{"{B, C, E}"}</code> için:</p>
                                                <ul className="list-disc pl-5 mb-3">
                                                    <li><strong>B:</strong> X=0 &rarr; A (Grup 0), X=1 &rarr; B (Grup 1)</li>
                                                    <li><strong>C:</strong> X=0 &rarr; E (Grup 1), X=1 &rarr; A (Grup 0)</li>
                                                    <li><strong>E:</strong> X=0 &rarr; C (Grup 1), X=1 &rarr; D (Grup 0)</li>
                                                </ul>
                                                <p className="text-amber-700 bg-amber-50 px-2 py-1 rounded inline-block text-xs font-bold">C ve E aynı hedeflere (Grup 1, Grup 0) giderken, B farklı hedeflere (Grup 0, Grup 1) gitmektedir. Bu yüzden <strong>B</strong> ayrılır.</p>
                                                <p className="mt-2">Yeni Gruplar: <code>{"{A, D}"}</code>, <code>{"{B}"}</code>, <code>{"{C, E}"}</code></p>
                                            </div>

                                            <div className="p-4 bg-white rounded border border-slate-200">
                                                <h5 className="font-bold text-indigo-900 mb-2">Adım 3: Son Kontrol (P3)</h5>
                                                <p>Yeni oluşan <code>{"{A, D}"}</code> ve <code>{"{C, E}"}</code> grupları kendi içlerinde aynı hedeflere gitmeye devam ettikleri için (A ve D -&gt; P1, P2; C ve E -&gt; P3, P1) başka bölünme yaşanmaz. Minimization tamamlanmıştır.</p>
                                            </div>
                                        </div>

                                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 shadow-sm rounded-r-xl">
                                            <h5 className="font-bold text-emerald-900 mb-3">Minimize Edilmiş (Final) Durum Tablosu:</h5>
                                            <p className="text-sm text-emerald-800 mb-4">Birleşen durumlar tek bir satır olarak temsil edilir (A ve D yerine <strong>A</strong>, C ve E yerine <strong>C</strong> kullanabiliriz).</p>
                                            
                                            <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm w-full max-w-sm">
                                                <table className="w-full text-center border-collapse font-mono text-sm">
                                                    <thead>
                                                        <tr className="bg-emerald-100 text-emerald-800">
                                                            <th className="p-2 border border-emerald-200" rowSpan={2}>State</th>
                                                            <th className="p-2 border border-emerald-200" colSpan={2}>Next State</th>
                                                            <th className="p-2 border border-emerald-200" rowSpan={2}>Output (W)</th>
                                                        </tr>
                                                        <tr className="bg-emerald-50 text-emerald-700">
                                                            <th className="p-1 border border-emerald-200">X=0</th>
                                                            <th className="p-1 border border-emerald-200">X=1</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-emerald-900">
                                                        <tr><td className="p-1 border border-emerald-200 font-bold bg-emerald-50 text-xs">S0 (A,D)</td><td className="p-1 border border-emerald-200">S0</td><td className="p-1 border border-emerald-200">S1</td><td className="p-1 border border-emerald-200">0</td></tr>
                                                        <tr><td className="p-1 border border-emerald-200 font-bold bg-emerald-50 text-xs">S1 (B)</td><td className="p-1 border border-emerald-200">S0</td><td className="p-1 border border-emerald-200">S1</td><td className="p-1 border border-emerald-200">1</td></tr>
                                                        <tr><td className="p-1 border border-emerald-200 font-bold bg-emerald-50 text-xs">S2 (C,E)</td><td className="p-1 border border-emerald-200">S2</td><td className="p-1 border border-emerald-200">S0</td><td className="p-1 border border-emerald-200">1</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Quiz 5</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 2: Datapath Controller (FSM Design)</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıda özellikleri verilen veri yolu (Datapath) kullanılarak <strong>16 adet işaretsiz (unsigned) sayının maksimumunu bulan</strong> bir Moore tipi durum makinesi (FSM) tasarlayınız.</p>
                                            
                                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                                                <h5 className="font-bold text-indigo-900">Datapath (Veri Yolu) Özellikleri ve Sinyaller:</h5>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    <li><strong>START:</strong> Sistem başlar. (Sadece 1 kere 1 olur).</li>
                                                    <li><strong>DONE:</strong> İşlem bittiğinde 1 olmalı. DOUT'a sonuç yazılmalı.</li>
                                                    <li><strong>NEXT:</strong> Gelen sayıyı sıradaki veriye (Data element) geçirir.</li>
                                                    <li><strong>Reg A:</strong> Maksimum değeri tutacak kaydedici. (RA: Reset A, LA: Load A).</li>
                                                    <li><strong>Reg B:</strong> Sayacı (Counter) tutacak kaydedici. (RB: Reset B, LB: Load B).</li>
                                                    <li><strong>ALU (Aritmetik Birim):</strong> <code>cmd=2</code> durumunda, inA &lt; inB işlemini yapar. Eğer inA &lt; inB doğruysa çıkışı 1 (Bob1=1) olur.</li>
                                                    <li><strong>B16:</strong> Sayaç (Reg B) 16'ya ulaştığında 1 olur.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm text-sm text-slate-700 space-y-4">
                                            <p>Problemi çözmek için işlem adımlarını 5 ana duruma (State) bölelim:</p>
                                            
                                            <ul className="space-y-4">
                                                <li className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 flex-shrink-0">S0</div>
                                                    <div>
                                                        <strong className="text-slate-800 block mb-1">IDLE / INIT (Başlangıç ve Sıfırlama)</strong>
                                                        <p><code>START</code> sinyali beklenir. START geldiğinde, <strong>Reg A</strong> (Maksimum=0) ve <strong>Reg B</strong> (Sayaç=0) sıfırlanır (<code>RA=1, RB=1</code>). Unsigned sayılarda en küçük değer 0 olduğu için A'yı 0 ile başlatmak doğrudur.</p>
                                                    </div>
                                                </li>
                                                <li className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 flex-shrink-0">S1</div>
                                                    <div>
                                                        <strong className="text-slate-800 block mb-1">COMPARE (Karşılaştırma)</strong>
                                                        <p>Gelen yeni veri (DATA) ile Reg A karşılaştırılır. ALU komutu <code>cmd=2</code> (A &lt; DATA) yapılarak sonuç kontrol edilir. Eğer <code>Bob1=1</code> (DATA daha büyük) ise S2'ye geçilir. Değilse yeni değere gerek yoktur, sayaç artırmak için S3'e atlanır.</p>
                                                    </div>
                                                </li>
                                                <li className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 flex-shrink-0">S2</div>
                                                    <div>
                                                        <strong className="text-slate-800 block mb-1">UPDATE_MAX (Yeni Maksimumu Kaydet)</strong>
                                                        <p>Yeni gelen sayı (DATA) daha büyük olduğu için Reg A'ya yüklenir (<code>LA=1</code>). Ardından S3'e geçilir.</p>
                                                    </div>
                                                </li>
                                                <li className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 flex-shrink-0">S3</div>
                                                    <div>
                                                        <strong className="text-slate-800 block mb-1">INCREMENT (Sayaç Artırma)</strong>
                                                        <p>Sayaç (Reg B) 1 artırılır (<code>LB=1</code>). Aynı esnada <code>NEXT=1</code> yapılarak bir sonraki veriye geçilir.</p>
                                                    </div>
                                                </li>
                                                <li className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 flex-shrink-0">S4</div>
                                                    <div>
                                                        <strong className="text-slate-800 block mb-1">CHECK / DONE (Döngü Kontrolü)</strong>
                                                        <p>Eğer 16 sayı işlendiyse (<code>B16=1</code>), S5'e geçilir. Değilse yeni karşılaştırma için S1'e dönülür.</p>
                                                    </div>
                                                </li>
                                                <li className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 flex-shrink-0 border border-emerald-300">S5</div>
                                                    <div>
                                                        <strong className="text-emerald-800 block mb-1">FINISH (Bitiş)</strong>
                                                        <p>İşlem bitti! <code>DONE=1</code> yapılır ve DOUT çıkışına Reg A (En büyük sayı) verilir. Sonrasında START sinyali kesilene kadar burada beklenip S0'a dönülür.</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 shadow-sm rounded-r-xl">
                                            <h5 className="font-bold text-indigo-900 mb-4">State Transition Diagram (Durum Geçiş Şeması)</h5>
                                            
                                            <div className="bg-white p-6 rounded-xl border border-indigo-200 flex justify-center overflow-hidden">
                                                <pre className="mermaid text-sm">
                                                    {`
stateDiagram-v2
    [*] --> S0_IDLE
    
    S0_IDLE --> S0_IDLE: START=0
    S0_IDLE --> S1_COMPARE: START=1 (RA=1, RB=1)
    
    S1_COMPARE --> S2_UPDATE: Bob1=1 (DATA > A)
    S1_COMPARE --> S3_INC: Bob1=0 (DATA <= A)
    
    S2_UPDATE --> S3_INC: (LA=1)
    
    S3_INC --> S4_CHECK: (LB=1, NEXT=1)
    
    S4_CHECK --> S1_COMPARE: B16=0
    S4_CHECK --> S5_DONE: B16=1
    
    S5_DONE --> S5_DONE: START=1 (DONE=1)
    S5_DONE --> S0_IDLE: START=0
                                                    `}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">MIT 6.111</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2003 - Quiz 2</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 2(b): FSM Controller for ADC</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Ardışık Yaklaşımlı (Successive Approximation) bir A/D Çevirici'nin kontrol bloğundaki FSM'in Durum Geçiş Şemasını (State Transition Diagram) çiziniz.</p>
                                            
                                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                                                <h5 className="font-bold text-indigo-900">Sistem Özellikleri ve Sinyaller:</h5>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    <li>FSM, <code>Reset</code> sinyali geldiğinde bilinen bir <strong>IDLE</strong> durumuna geçer.</li>
                                                    <li><code>ADC_Initiate</code> sinyali geldiğinde (1-cycle pulse) çevrim işlemi başlar.</li>
                                                    <li>Çevrim işlemi başladığında, sayaç azalmaya başlar (FSM'nin çıkışı olan <code>Decrement</code> = 1 olur).</li>
                                                    <li>Datapath (Veri yolu) üzerinden gelen <code>Done</code> sinyali 1 olduğunda, Digital_Out'un hazır olduğu anlaşılır ve işlem biter.</li>
                                                    <li><strong>FSM Girişleri:</strong> <code>CLK</code>, <code>Reset</code>, <code>ADC_Initiate</code>, <code>Done</code></li>
                                                    <li><strong>FSM Çıkışları:</strong> <code>Decrement</code></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm text-sm text-slate-700 space-y-4">
                                            <p>Bu FSM, oldukça basit bir yapıda olup temel olarak iki durumda (State) çalışır. İşlem sürecini şöyle tasarlayabiliriz:</p>
                                            
                                            <ul className="space-y-4">
                                                <li className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 flex-shrink-0">S0</div>
                                                    <div>
                                                        <strong className="text-slate-800 block mb-1">IDLE (Bekleme Durumu)</strong>
                                                        <p>FSM bu durumdayken sayacı durdurur (<code>Decrement = 0</code>). <code>ADC_Initiate</code> sinyalinin gelmesini bekler. Gelirse, çevrim durumuna (CONVERT) geçer. Gelmezse bu durumda kalmaya devam eder.</p>
                                                    </div>
                                                </li>
                                                <li className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 flex-shrink-0 border border-indigo-300">S1</div>
                                                    <div>
                                                        <strong className="text-indigo-800 block mb-1">CONVERT (Çevrim Durumu)</strong>
                                                        <p>ADC dönüşümü başlamıştır. Datapath'teki sayacın geriye doğru sayması için FSM sürekli olarak <code>Decrement = 1</code> çıktısı üretir. Veri yolundan <code>Done = 1</code> sinyali geldiği anda işlem bittiği anlaşılarak tekrar IDLE durumuna dönülür.</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 shadow-sm rounded-r-xl">
                                            <h5 className="font-bold text-emerald-900 mb-4">State Transition Diagram (Durum Geçiş Şeması)</h5>
                                            
                                            <div className="bg-white p-6 rounded-xl border border-emerald-200 flex justify-center overflow-hidden">
                                                <pre className="mermaid text-sm">
                                                    {`
stateDiagram-v2
    [*] --> IDLE : Reset

    state IDLE {
        direction LR
        [*] --> Decrement_0
        Decrement_0 : Decrement = 0
    }

    state CONVERT {
        direction LR
        [*] --> Decrement_1
        Decrement_1 : Decrement = 1
    }
    
    IDLE --> IDLE : ADC_Initiate = 0
    IDLE --> CONVERT : ADC_Initiate = 1
    
    CONVERT --> CONVERT : Done = 0
    CONVERT --> IDLE : Done = 1
                                                    `}
                                                </pre>
                                            </div>
                                            <p className="text-xs text-emerald-700 mt-4 font-medium text-center">Not: State içinde yazan değerler, o durumdayken üretilen Moore tipi çıktıları temsil eder.</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )}

                    {/* CHAPTER 1: Digital Systems & Binary Numbers */}
                    {activeChapter === "ch1" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h2 className="text-2xl font-bold text-[#163832] flex items-center gap-2">
                                    <BookOpen className="w-6 h-6 text-[#235347]" /> 
                                    Chapter 1: Digital Systems & Binary Numbers
                                </h2>
                                <p className="text-slate-500 mt-2 text-sm font-medium">Sayı sistemleri, 2'ye tümleyen (2's complement) ve temel tanımlar üzerine çıkmış sorular.</p>
                            </div>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Midterm</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 1: Temel Kavramlar (Short Answers)</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıdaki boşlukları doldurunuz:</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong>(a)</strong> -7 sayısının 5-bit 2'ye tümleyen (2's complement) gösterimi _________ dir.</li>
                                                <li><strong>(b)</strong> 6-bit 2'ye tümleyen bir sayının alabileceği değer aralığı ______ ile ______ arasındadır.</li>
                                                <li><strong>(c)</strong> <code>(A + B')</code> fonksiyonunun Canonical Product-of-Sums (Çarpımların Toplamı) gösterimi _________ dir. <em>Not: Orijinal sorudaki <code>(AB + A'B')</code> fonksiyonu örneği kullanılmıştır.</em></li>
                                                <li><strong>(d)</strong> 20ns saat periyoduna sahip bir saatin frekansı _________ GHz'dir.</li>
                                                <li><strong>(e)</strong> D-Flip Flop'ta, saatin yükselen kenarından (rising edge) hemen sonra D girişinin sabit kalması gereken o kısa süreye _________ Time denir.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-800 font-medium mb-1"><strong>(a) 5-bit -7:</strong></p>
                                            <p className="text-sm text-slate-600">Önce +7'yi 5 bit yazarız: <code>00111</code>. Sonra bitleri ters çevirip (1's complement = <code>11000</code>) 1 ekleriz: <code className="bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded">11001</code>.</p>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-800 font-medium mb-1"><strong>(b) 6-bit Range:</strong></p>
                                            <p className="text-sm text-slate-600">N-bit 2's complement aralığı $-2^&#123;N-1&#125;$ ile $2^&#123;N-1&#125; - 1$ arasındadır. N=6 için $-2^5$ ile $2^5 - 1$ yani <code className="bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded">-32 ile 31</code> arasındadır.</p>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-800 font-medium mb-1"><strong>(c) Canonical POS:</strong></p>
                                            <p className="text-sm text-slate-600">Fonksiyon <code>AB + A'B'</code> (XNOR). Mintermleri $m_3$ ve $m_0$'dır. Maxtermleri (olmayan mintermler) ise $M_1$ ve $M_2$'dir. Canonical POS: <code className="bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded">(A + B') · (A' + B)</code>.</p>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-800 font-medium mb-1"><strong>(d) Frequency:</strong></p>
                                            <p className="text-sm text-slate-600">Frekans $f = 1/T$ dir. $1 / 20\text&#123;ns&#125; = 1 / (20 \times 10^&#123;-9&#125;) = 50 \times 10^6 \text&#123; Hz&#125; = 50 \text&#123; MHz&#125;$. Soru GHz cinsinden istiyor: $50 \text&#123; MHz&#125; = 0.05 \text&#123; GHz&#125;$. Cevap: <code className="bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded">0.05</code>.</p>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-800 font-medium mb-1"><strong>(e) Flip-Flop Time:</strong></p>
                                            <p className="text-sm text-slate-600">Saat vurduktan sonra verinin sabit tutulması gereken süreye <code className="bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded">Hold</code> Time (Tutma Süresi) denir.</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Final</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 1: Number Systems & Boolean Basics</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıdaki boşlukları doldurunuz:</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong>(a)</strong> -12 sayısının 5-bit 2'ye tümleyen (2's complement) gösterimi _________ dir.</li>
                                                <li><strong>(b)</strong> A, B ve C girişlerine sahip bir fonksiyonda, <code>A + !B</code> denklemi için _________ adet maxterm vardır.</li>
                                                <li><strong>(e)</strong> 16 tabanındaki "4A.C" sayısı 10 tabanında _________ değerine eşittir.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Part A */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-800 font-bold mb-2">(a) -12 (2's Complement)</p>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Önce +12'yi 5 bitle yazalım: <code>01100</code>
                                            </p>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Tersini al (1's complement): <code>10011</code>
                                            </p>
                                            <p className="text-sm text-slate-700">
                                                1 ekle: <code className="bg-indigo-100 text-indigo-900 font-bold px-2 py-1 rounded">10100</code>
                                            </p>
                                        </div>

                                        {/* Part B */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-800 font-bold mb-2">(b) Maxterm Sayısı</p>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Fonksiyon: <code>F = A + B'</code> (C değişkeni eksik).
                                            </p>
                                            <p className="text-sm text-slate-700 mb-2">
                                                POS (Product of Sums) formatında 0'lar (maxtermler) çarpılır. SOP (Sum of Products) formatında ise 1'ler (mintermler) toplanır. 
                                            </p>
                                            <p className="text-sm text-slate-700">
                                                Bu fonksiyon 6 minterm'e sahiptir. Toplam 8 durum (2^3) olduğu için geriye kalan <code className="bg-indigo-100 text-indigo-900 font-bold px-2 py-1 rounded">2</code> durum maxterm'dir. (A=0, B=1, C=0 ve A=0, B=1, C=1)
                                            </p>
                                        </div>

                                        {/* Part E */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="text-sm text-slate-800 font-bold mb-2">(e) 4A.C to Base 10</p>
                                            <p className="text-sm text-slate-700 mb-2">
                                                <code>4 * 16^1 = 64</code><br/>
                                                <code>A (10) * 16^0 = 10</code><br/>
                                                <code>C (12) * 16^-1 = 12/16 = 0.75</code>
                                            </p>
                                            <p className="text-sm text-slate-700">
                                                Toplam = <code className="bg-indigo-100 text-indigo-900 font-bold px-2 py-1 rounded">74.75</code>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 2: Number Representations (Fill-in-the-blank)</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <ol className="list-[lower-alpha] pl-5 space-y-2">
                                                <li>The 4-bit 2's complement number representation of -5 is _____________.</li>
                                                <li>The 6-bit signed-magnitude representation of -5 is ______________.</li>
                                                <li>The range of representation for a 5-bit 2's complement number is from _________ to __________.</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-3">a) 4-bit 2's Complement of -5</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                1. Öncelikle +5'in 4-bit karşılığını yazarız: <code className="bg-white px-2 py-1 rounded border border-slate-200">0101</code><br/>
                                                2. Tüm bitleri tersine çeviririz (1's complement): <code className="bg-white px-2 py-1 rounded border border-slate-200">1010</code><br/>
                                                3. Sonuca 1 ekleriz: <code className="bg-white px-2 py-1 rounded border border-slate-200">1010 + 1 = 1011</code>
                                            </p>
                                            <p className="text-sm font-bold text-emerald-700">Cevap: 1011</p>
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-3">b) 6-bit Signed-Magnitude of -5</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                Signed-magnitude gösteriminde en soldaki bit (MSB) işaret bitidir (1 = negatif, 0 = pozitif). Kalan bitler sayının büyüklüğünü (magnitude) ifade eder.<br/>
                                                1. Büyüklük (5) için kalan 5 biti kullanırız: <code className="bg-white px-2 py-1 rounded border border-slate-200">00101</code><br/>
                                                2. Negatif olduğu için MSB'yi 1 yaparız: <code className="bg-white px-2 py-1 rounded border border-slate-200">1</code><br/>
                                                3. Birleştiririz: <code className="bg-white px-2 py-1 rounded border border-slate-200">100101</code>
                                            </p>
                                            <p className="text-sm font-bold text-emerald-700">Cevap: 100101</p>
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-3">c) 5-bit 2's Complement Range</h5>
                                            <p className="text-sm text-slate-700 mb-2">
                                                <code>n</code> bitlik 2's complement sayıların aralığı formülü: <strong>[-2<sup>n-1</sup>, +2<sup>n-1</sup> - 1]</strong> şeklindedir.<br/>
                                                n = 5 için:<br/>
                                                Alt sınır: -2<sup>4</sup> = -16<br/>
                                                Üst sınır: +2<sup>4</sup> - 1 = +15
                                            </p>
                                            <p className="text-sm font-bold text-emerald-700">Cevap: -16 to +15</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )}

                    {/* CHAPTER 2: Boolean Algebra and Logic Gates */}
                    {activeChapter === "ch2" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h2 className="text-2xl font-bold text-[#163832] flex items-center gap-2">
                                    <BookOpen className="text-emerald-600" />
                                    Chapter 2: Boolean Algebra & Logic Gates
                                </h2>
                                <p className="text-slate-500 mt-2 text-sm font-medium">Sınavlarda çıkmış Boolean denklemleri, Minterm formları ve temel mantık kapıları tasarımı (XOR, NOR vb.) soruları.</p>
                            </div>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 1: Canonical Sum-of-Products</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıdaki fonksiyonu <strong>Canonical Sum-of-Products (Minterm)</strong> formuna dönüştürünüz.</p>
                                            <div className="bg-white p-3 rounded border border-slate-200 text-center font-mono text-lg text-indigo-900 shadow-sm inline-block">
                                                X = A*B + !A*C
                                            </div>
                                            <p>X = _____________________________________</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                                        <p className="text-sm text-slate-700">
                                            "Canonical Sum-of-Products" (Standart Çarpımların Toplamı) formunda, her çarpım teriminin (product term) <strong>tüm değişkenleri</strong> (A, B ve C) içermesi gerekir. Eksik değişkenleri eklemek için <code>(X + !X) = 1</code> özelliğini kullanırız.
                                        </p>
                                        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm font-mono text-sm space-y-2">
                                            <p>1. Terim (A*B): İçinde C eksik.</p>
                                            <p className="text-indigo-700 ml-4">A * B * (C + !C) = A*B*C + A*B*!C</p>
                                            
                                            <p className="mt-3">2. Terim (!A*C): İçinde B eksik.</p>
                                            <p className="text-indigo-700 ml-4">!A * C * (B + !B) = !A*B*C + !A*!B*C</p>
                                        </div>
                                        <p className="text-sm text-slate-700">
                                            Son olarak tüm terimleri birleştiririz. (Eğer aynı terimden iki tane olsaydı <code>X + X = X</code> kuralıyla birini silecektik, ancak burada tekrar eden terim yok).
                                        </p>
                                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 shadow-sm font-bold text-emerald-900 text-center text-lg">
                                            X = A*B*C + A*B*!C + !A*B*C + !A*!B*C
                                        </div>
                                        <p className="text-xs text-slate-500 text-center mt-2">(Minterm cinsinden: m7 + m6 + m3 + m1 = &Sigma;(1, 3, 6, 7))</p>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 2: Boolean Theorems (Fill-in-the-blank)</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <ol className="list-[lower-alpha] pl-5 space-y-3" start={4}>
                                                <li>According to the ________________ ________ theorem of Boolean algebra, <code>A*B = B*A</code>.</li>
                                                <li><code>(A+B)*(C+D) = ___________________</code> according to the distributive theorem.</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4 text-sm text-slate-700">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">d) A*B = B*A</h5>
                                            <p>
                                                Boolean cebirinde değişkenlerin yer değiştirmesinin sonucu değiştirmemesine <strong>Commutative Theorem (Değişme Özelliği)</strong> denir.
                                            </p>
                                            <p className="text-sm font-bold text-emerald-700 mt-2">Cevap: Commutative / Commutativity</p>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <h5 className="font-bold text-[#163832] mb-2">e) Distributive Theorem</h5>
                                            <p>
                                                Dağılma (Distributive) özelliğine göre <code>(A+B)*(C+D)</code> çarpımı tek tek içerilere dağıtılır. FOIL (First, Outer, Inner, Last) metodu uygulanır.
                                            </p>
                                            <p className="text-sm font-bold text-emerald-700 mt-2">Cevap: A*C + A*D + B*C + B*D</p>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Quiz 1</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 3: XOR Gate Implementation Using NORs</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Implement a 2-input XOR gate using <strong>only 2-input NOR gates</strong>. For full credit, use 6 or fewer NOR gates.</p>
                                            <p className="text-xs text-slate-500 mt-2">(Sadece 2-girişli NOR kapıları kullanarak 2-girişli bir XOR kapısı tasarlayınız. En fazla 6 adet NOR kapısı kullanabilirsiniz.)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6 text-sm text-slate-700">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <p className="mb-3">
                                                Öncelikle XOR fonksiyonunun Boolean denklemini yazalım ve De Morgan kuralları uygulayarak onu sadece NOR formuna (Yani <code>(X + Y)'</code>) benzetmeye çalışalım.
                                            </p>
                                            <div className="bg-white p-4 rounded shadow-sm font-mono text-sm border-l-4 border-indigo-500 space-y-2">
                                                <p>A &oplus; B = A*!B + !A*B</p>
                                            </div>
                                            <p className="mt-4 mb-2">XOR kapısını <strong>tam olarak 5 adet NOR kapısı</strong> ile gerçekleştirebiliriz. Algoritma şöyledir:</p>
                                            <ol className="list-decimal pl-5 space-y-3">
                                                <li>
                                                    <strong>Adım 1: Girdilerin Tersini Almak (Inverters via NOR)</strong><br/>
                                                    NOR kapısının iki girişini birbirine bağlarsak bir NOT kapısı elde ederiz: <code>!A = (A + A)'</code>. <br/>
                                                    İki kapı kullanarak <code>!A</code> ve <code>!B</code> sinyallerini elde edelim. <em>(Kapı Sayısı: 2)</em>
                                                </li>
                                                <li>
                                                    <strong>Adım 2: İkili NOR İşlemleri</strong><br/>
                                                    A ve <code>!B</code> sinyallerini bir NOR kapısına sokalım: <code>(A + !B)' = !A * B</code> <br/>
                                                    <code>!A</code> ve B sinyallerini diğer NOR kapısına sokalım: <code>(!A + B)' = A * !B</code> <br/>
                                                    Fark ettiyseniz bunlar tam da XOR formülünün içindeki terimlerdir! <em>(Toplam Kapı: 4)</em>
                                                </li>
                                                <li>
                                                    <strong>Adım 3: Sonuçları Birleştirme</strong><br/>
                                                    Son olarak bu iki sonucu (<code>!A*B</code> ve <code>A*!B</code>) bir NOR kapısına daha sokarsak, ikisinin NOR'unu almış oluruz, yani <strong>XNOR</strong> elde ederiz: <br/>
                                                    <code>( (!A*B) + (A*!B) )' = (A &oplus; B)' = XNOR</code><br/>
                                                </li>
                                            </ol>
                                        </div>

                                        <div className="bg-rose-50 border-l-4 border-rose-500 p-4 shadow-sm text-rose-900">
                                            <p className="font-bold">Önemli Not:</p>
                                            <p className="text-sm">Yukarıdaki 5 kapılı yöntem bize <strong>XNOR</strong> verir. Soruda ise bizden <strong>XOR</strong> isteniyor! Bu durumda yukarıdaki 5 kapılı sistemin sonuna bir tane daha NOR kapısı (Inverter olarak) bağlarsak XNOR terslenip XOR olur. <strong>Toplam kapı sayısı 6'ya ulaşır (İstenen şarta tam uygun).</strong></p>
                                        </div>

                                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 shadow-sm rounded-r-xl">
                                            <h5 className="font-bold text-emerald-900 mb-2">Alternatif ve Daha İyi Yöntem (5 Kapı ile XOR):</h5>
                                            <p className="text-sm text-emerald-800 mb-3">Aslında sadece 5 NOR kapısıyla direkt XOR yapmak da mümkündür. Denklem manipülasyonu:</p>
                                            <div className="font-mono text-sm text-emerald-900 space-y-1 bg-white/50 p-3 rounded">
                                                <p>A &oplus; B = (A + B) * (!A + !B)</p>
                                                <p>İki tarafın iki kez komplementini alalım (ifade değişmez):</p>
                                                <p>((A + B) * (!A + !B))''</p>
                                                <p>De Morgan uygularsak:</p>
                                                <p>( (A + B)' + (!A + !B)' )'</p>
                                            </div>
                                            <p className="text-sm text-emerald-800 mt-3 font-bold">Kapı Planı:</p>
                                            <ul className="list-disc pl-5 text-sm text-emerald-800">
                                                <li><strong>Kapı 1 & 2:</strong> <code>!A = (A+A)'</code> ve <code>!B = (B+B)'</code></li>
                                                <li><strong>Kapı 3:</strong> <code>(A + B)'</code></li>
                                                <li><strong>Kapı 4:</strong> <code>(!A + !B)'</code> (Kapı 1 ve 2'den gelen girişlerle)</li>
                                                <li><strong>Kapı 5:</strong> Kapı 3 ve Kapı 4'ün çıkışlarını son bir NOR kapısına bağlayıp nihai XOR'u elde ederiz!</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )}

                    {/* CHAPTER 3: Boolean Algebra & K-Maps */}
                    {activeChapter === "ch3" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h2 className="text-2xl font-bold text-[#163832] flex items-center gap-2">
                                    <BookOpen className="w-6 h-6 text-[#235347]" /> 
                                    Chapter 3: Boolean Algebra & K-Maps
                                </h2>
                                <p className="text-slate-500 mt-2 text-sm font-medium">Karnaugh Haritaları (K-Map) ile fonksiyon sadeleştirme soruları.</p>
                            </div>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Midterm</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 5: K-Map Minimization</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıdaki fonksiyon için <strong>Minimum Sum-of-Products (SOP)</strong> denklemini bulunuz ve K-Map kullanarak çözümünüzü gösteriniz:</p>
                                            <p className="bg-slate-200 p-3 rounded font-mono text-center">F(W,X,Y,Z) = Σ(0,1,5,7,8,13,15) + d(10)</p>
                                            <p className="text-xs italic">Not: Orijinal sorudaki d(5,10) yazımı bir dizgi hatasıdır, 5 zaten minterm'dir.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center">
                                        <h5 className="font-bold text-[#163832] mb-4 w-full border-b pb-2">K-Map Doldurma ve Gruplama</h5>
                                        <table className="w-64 text-center border-collapse font-mono text-sm bg-white shadow-sm">
                                            <thead>
                                                <tr><th className="border p-2 bg-slate-100 text-slate-500">WX \ YZ</th><th className="border p-2 bg-slate-100">00</th><th className="border p-2 bg-slate-100">01</th><th className="border p-2 bg-slate-100">11</th><th className="border p-2 bg-slate-100">10</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr><th className="border p-2 bg-slate-100">00</th>
                                                    <td className="border p-2 bg-rose-100 font-bold text-rose-700">1 <span className="text-[10px] text-rose-400 absolute ml-1 -mt-2">(0)</span></td>
                                                    <td className="border p-2 bg-rose-100 font-bold text-rose-700">1 <span className="text-[10px] text-rose-400 absolute ml-1 -mt-2">(1)</span></td>
                                                    <td className="border p-2 text-slate-300">0 <span className="text-[10px] text-slate-200 absolute ml-1 -mt-2">(3)</span></td>
                                                    <td className="border p-2 text-slate-300">0 <span className="text-[10px] text-slate-200 absolute ml-1 -mt-2">(2)</span></td>
                                                </tr>
                                                <tr><th className="border p-2 bg-slate-100">01</th>
                                                    <td className="border p-2 text-slate-300">0 <span className="text-[10px] text-slate-200 absolute ml-1 -mt-2">(4)</span></td>
                                                    <td className="border p-2 bg-indigo-100 font-bold text-indigo-700">1 <span className="text-[10px] text-indigo-400 absolute ml-1 -mt-2">(5)</span></td>
                                                    <td className="border p-2 bg-indigo-100 font-bold text-indigo-700">1 <span className="text-[10px] text-indigo-400 absolute ml-1 -mt-2">(7)</span></td>
                                                    <td className="border p-2 text-slate-300">0 <span className="text-[10px] text-slate-200 absolute ml-1 -mt-2">(6)</span></td>
                                                </tr>
                                                <tr><th className="border p-2 bg-slate-100">11</th>
                                                    <td className="border p-2 text-slate-300">0 <span className="text-[10px] text-slate-200 absolute ml-1 -mt-2">(12)</span></td>
                                                    <td className="border p-2 bg-indigo-100 font-bold text-indigo-700">1 <span className="text-[10px] text-indigo-400 absolute ml-1 -mt-2">(13)</span></td>
                                                    <td className="border p-2 bg-indigo-100 font-bold text-indigo-700">1 <span className="text-[10px] text-indigo-400 absolute ml-1 -mt-2">(15)</span></td>
                                                    <td className="border p-2 text-slate-300">0 <span className="text-[10px] text-slate-200 absolute ml-1 -mt-2">(14)</span></td>
                                                </tr>
                                                <tr><th className="border p-2 bg-slate-100">10</th>
                                                    <td className="border p-2 bg-amber-100 font-bold text-amber-700">1 <span className="text-[10px] text-amber-400 absolute ml-1 -mt-2">(8)</span></td>
                                                    <td className="border p-2 text-slate-300">0 <span className="text-[10px] text-slate-200 absolute ml-1 -mt-2">(9)</span></td>
                                                    <td className="border p-2 text-slate-300">0 <span className="text-[10px] text-slate-200 absolute ml-1 -mt-2">(11)</span></td>
                                                    <td className="border p-2 font-bold text-slate-500 bg-slate-50">X <span className="text-[10px] text-slate-300 absolute ml-1 -mt-2">(10)</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                        <div className="w-full mt-6 space-y-3 text-sm text-slate-700 font-medium">
                                            <p className="flex items-center gap-2"><span className="w-4 h-4 bg-indigo-200 rounded block"></span> <strong>Grup 1 (Ortadaki Kare):</strong> m5, m7, m13, m15 &rarr; <span className="font-mono text-indigo-700 font-bold">X·Z</span></p>
                                            <p className="flex items-center gap-2"><span className="w-4 h-4 bg-rose-200 rounded block"></span> <strong>Grup 2 (Üst Kenar):</strong> m0, m1 &rarr; <span className="font-mono text-rose-700 font-bold">W'·X'·Y'</span></p>
                                            <p className="flex items-center gap-2"><span className="w-4 h-4 bg-amber-200 rounded block"></span> <strong>Grup 3 (Köşeler):</strong> m0 ve m8 birleştirilebilir. &rarr; <span className="font-mono text-amber-700 font-bold">X'·Y'·Z'</span></p>
                                            
                                            <div className="bg-white border-l-4 border-emerald-500 p-4 shadow-sm text-emerald-800 font-mono text-center font-bold text-lg mt-4">
                                                F = XZ + W'X'Y' + X'Y'Z'
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Final</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 1(h): Prime Implicants</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıdaki boşluğu doldurunuz:</p>
                                            <p className="bg-white p-3 rounded font-mono shadow-sm">
                                                __________ is a prime implicant of AB + !A!C but is not an essential prime implicant.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                                        <p className="text-sm text-slate-700">
                                            Verilen fonksiyon: <code>F = AB + A'C'</code>
                                            <br/>K-Map (Karnaugh Haritası) üzerinde minterm'leri bulalım:
                                        </p>
                                        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                            <li><code>AB</code> terimi: A=1, B=1 &rarr; <strong>m6 (110)</strong> ve <strong>m7 (111)</strong></li>
                                            <li><code>A'C'</code> terimi: A=0, C=0 &rarr; <strong>m0 (000)</strong> ve <strong>m2 (010)</strong></li>
                                        </ul>
                                        <p className="text-sm text-slate-700">
                                            K-Map üzerinde m2 (010) ve m6 (110) minterm'leri komşudur. A değişkeni değişirken B=1 ve C=0 sabittir.
                                            Bu nedenle ikisi birleştirilerek <code>BC'</code> (B ve C') grubu oluşturulabilir.
                                        </p>
                                        <div className="bg-white border-l-4 border-indigo-500 p-4 shadow-sm text-sm">
                                            <p>
                                                <strong>Sonuç:</strong> <code>BC'</code> terimi, oluşturulabilecek en büyük gruplardan biri olduğu için bir <strong>Prime Implicant</strong>'tır. Ancak m2 zaten <code>A'C'</code> tarafından, m6 da zaten <code>AB</code> tarafından tamamen kapsandığı için bu gruba ihtiyaç yoktur. Dolayısıyla <strong>Essential (Gerekli) DEĞİLDİR</strong>.
                                            </p>
                                            <p className="mt-2 text-indigo-800 font-bold">Cevap: B C' (veya B AND !C)</p>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Final</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 3: POS (Product-of-Sums) K-Map</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıdaki fonksiyon için K-Map kullanarak <strong>Minimal Product-of-Sums (POS)</strong> denklemini bulunuz:</p>
                                            <p className="bg-white p-3 rounded font-mono shadow-sm text-center">
                                                A(W,X,Y,Z) = Σ(1, 3, 4, 6, 7, 8, 12, 13) + d(9, 14)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <p className="text-sm text-slate-700">
                                            POS (Product-of-Sums) bulmak için fonksiyonun <strong>0 olduğu durumları (Maxterms)</strong> K-Map üzerinde gruplamamız gerekir. 
                                            Verilen minterm'ler ve don't care'ler (d) haricindeki tüm hücreler 0'dır.
                                            <br/>
                                            0 olan hücreler (Maxterm'ler): <strong>m0, m2, m5, m10, m11, m15</strong>.
                                        </p>

                                        {/* K-Map Table for 0s */}
                                        <div className="w-full max-w-sm">
                                            <table className="w-full text-center border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="border p-2 bg-slate-100">WX \ YZ</th>
                                                        <th className="border p-2 bg-slate-100">00</th>
                                                        <th className="border p-2 bg-slate-100">01</th>
                                                        <th className="border p-2 bg-slate-100">11</th>
                                                        <th className="border p-2 bg-slate-100">10</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="font-mono">
                                                    <tr>
                                                        <td className="border p-2 bg-slate-100 font-bold">00</td>
                                                        <td className="border p-2 bg-rose-100 text-rose-800 font-bold relative">0 <span className="text-[10px] text-slate-400 absolute ml-1 -mt-2">(0)</span></td>
                                                        <td className="border p-2 text-slate-300">1</td>
                                                        <td className="border p-2 text-slate-300">1</td>
                                                        <td className="border p-2 bg-rose-100 text-rose-800 font-bold relative">0 <span className="text-[10px] text-slate-400 absolute ml-1 -mt-2">(2)</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border p-2 bg-slate-100 font-bold">01</td>
                                                        <td className="border p-2 text-slate-300">1</td>
                                                        <td className="border p-2 bg-amber-100 text-amber-800 font-bold relative">0 <span className="text-[10px] text-slate-400 absolute ml-1 -mt-2">(5)</span></td>
                                                        <td className="border p-2 text-slate-300">1</td>
                                                        <td className="border p-2 text-slate-300">1</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border p-2 bg-slate-100 font-bold">11</td>
                                                        <td className="border p-2 text-slate-300">1</td>
                                                        <td className="border p-2 text-slate-300">1</td>
                                                        <td className="border p-2 bg-indigo-100 text-indigo-800 font-bold relative">0 <span className="text-[10px] text-slate-400 absolute ml-1 -mt-2">(15)</span></td>
                                                        <td className="border p-2 text-slate-400 bg-indigo-50 relative">d <span className="text-[10px] text-slate-300 absolute ml-1 -mt-2">(14)</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border p-2 bg-slate-100 font-bold">10</td>
                                                        <td className="border p-2 text-slate-300">1</td>
                                                        <td className="border p-2 text-slate-400">d <span className="text-[10px] text-slate-300 absolute ml-1 -mt-2">(9)</span></td>
                                                        <td className="border p-2 bg-indigo-100 text-indigo-800 font-bold relative">0 <span className="text-[10px] text-slate-400 absolute ml-1 -mt-2">(11)</span></td>
                                                        <td className="border p-2 bg-indigo-100 text-indigo-800 font-bold relative">0 <span className="text-[10px] text-slate-400 absolute ml-1 -mt-2">(10)</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                        <div className="w-full mt-6 space-y-3 text-sm text-slate-700 font-medium">
                                            <p className="flex items-center gap-2"><span className="w-4 h-4 bg-indigo-200 rounded block"></span> <strong>Grup 1 (4'lü Küme):</strong> m10, m11, d14, m15 &rarr; W,Y sabit (1,1). POS &rarr; <span className="font-mono text-indigo-700 font-bold">(W' + Y')</span></p>
                                            <p className="flex items-center gap-2"><span className="w-4 h-4 bg-rose-200 rounded block"></span> <strong>Grup 2 (Üst Köşeler):</strong> m0, m2 &rarr; W,X,Z sabit (0,0,0). POS &rarr; <span className="font-mono text-rose-700 font-bold">(W + X + Z)</span></p>
                                            <p className="flex items-center gap-2"><span className="w-4 h-4 bg-amber-200 rounded block"></span> <strong>Grup 3 (İzole):</strong> m5 komşusu olmayan yalnız bir 0'dır. &rarr; W,X,Y,Z (0,1,0,1). POS &rarr; <span className="font-mono text-amber-700 font-bold">(W + X' + Y + Z')</span></p>
                                            
                                            <div className="bg-white border-l-4 border-emerald-500 p-4 shadow-sm text-emerald-800 font-mono text-center font-bold text-lg mt-4">
                                                A(W,X,Y,Z) = (W' + Y')(W + X + Z)(W + X' + Y + Z')
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                                <div className="bg-indigo-50 border-b border-indigo-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EECS 270</span>
                                        <span className="bg-white text-indigo-800 text-xs font-bold px-2 py-1 rounded border border-indigo-200">Spring 2023 - Quiz 3</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950">Problem 1: K-Map Minimum Product-of-Sums (POS)</h3>
                                </div>
                                
                                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <FileQuestion className="w-6 h-6 text-slate-700 mt-1 flex-shrink-0" />
                                        <div className="space-y-4 text-sm text-slate-700 font-medium">
                                            <h4 className="text-lg font-bold text-slate-800">Soru (Question)</h4>
                                            <p>Aşağıda verilen fonksiyon için Karnaugh Haritası (K-Map) kullanarak <strong>Minimum Product-of-Sums (POS)</strong> denklemini bulunuz.</p>
                                            <div className="bg-white p-3 rounded border border-slate-200 text-center font-mono text-lg text-indigo-900 shadow-sm inline-block">
                                                F(A,B,C,D) = &Sigma;(1, 4, 6, 9, 11, 12, 13) + d(0, 15)
                                            </div>
                                            <p className="text-xs text-rose-600 font-bold uppercase mt-2">DİKKAT: Product-Of-Sums istenmektedir!</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-8 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h4 className="text-lg font-bold text-slate-800">Çözüm (Solution)</h4>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm text-sm text-slate-700">
                                            <p className="mb-3">
                                                Soru bizden <strong>Product-of-Sums (POS)</strong> istediği için, haritadaki 1'leri değil, <strong>0'ları (Maxterms)</strong> gruplamamız gerekir. 
                                            </p>
                                            <ul className="list-disc pl-5 space-y-1 mb-4">
                                                <li><strong>Mintermler (1):</strong> 1, 4, 6, 9, 11, 12, 13</li>
                                                <li><strong>Don't Cares (X):</strong> 0, 15</li>
                                                <li><strong>Maxtermler (0):</strong> Kalan tüm hücreler &rarr; 2, 3, 5, 7, 8, 10, 14</li>
                                            </ul>
                                            
                                            <div className="overflow-x-auto">
                                                <table className="w-full max-w-md mx-auto text-center border-collapse border border-slate-300">
                                                    <thead>
                                                        <tr className="bg-slate-100">
                                                            <th className="border border-slate-300 p-2 text-slate-500">A,B \ C,D</th>
                                                            <th className="border border-slate-300 p-2 font-mono">00</th>
                                                            <th className="border border-slate-300 p-2 font-mono">01</th>
                                                            <th className="border border-slate-300 p-2 font-mono">11</th>
                                                            <th className="border border-slate-300 p-2 font-mono">10</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="font-mono text-lg">
                                                        <tr>
                                                            <td className="border border-slate-300 p-2 bg-slate-50 text-sm"><strong>00</strong></td>
                                                            <td className="border border-slate-300 p-2 text-slate-400">X <span className="text-xs align-top">(0)</span></td>
                                                            <td className="border border-slate-300 p-2 text-emerald-600">1 <span className="text-xs align-top">(1)</span></td>
                                                            <td className="border border-slate-300 p-2 text-rose-600 font-bold bg-rose-50">0 <span className="text-xs align-top">(3)</span></td>
                                                            <td className="border border-slate-300 p-2 text-rose-600 font-bold bg-rose-50">0 <span className="text-xs align-top">(2)</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border border-slate-300 p-2 bg-slate-50 text-sm"><strong>01</strong></td>
                                                            <td className="border border-slate-300 p-2 text-emerald-600">1 <span className="text-xs align-top">(4)</span></td>
                                                            <td className="border border-slate-300 p-2 text-rose-600 font-bold bg-rose-50">0 <span className="text-xs align-top">(5)</span></td>
                                                            <td className="border border-slate-300 p-2 text-rose-600 font-bold bg-rose-50">0 <span className="text-xs align-top">(7)</span></td>
                                                            <td className="border border-slate-300 p-2 text-emerald-600">1 <span className="text-xs align-top">(6)</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border border-slate-300 p-2 bg-slate-50 text-sm"><strong>11</strong></td>
                                                            <td className="border border-slate-300 p-2 text-emerald-600">1 <span className="text-xs align-top">(12)</span></td>
                                                            <td className="border border-slate-300 p-2 text-emerald-600">1 <span className="text-xs align-top">(13)</span></td>
                                                            <td className="border border-slate-300 p-2 text-slate-400">X <span className="text-xs align-top">(15)</span></td>
                                                            <td className="border border-slate-300 p-2 text-rose-600 font-bold bg-rose-50">0 <span className="text-xs align-top">(14)</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border border-slate-300 p-2 bg-slate-50 text-sm"><strong>10</strong></td>
                                                            <td className="border border-slate-300 p-2 text-rose-600 font-bold bg-rose-50">0 <span className="text-xs align-top">(8)</span></td>
                                                            <td className="border border-slate-300 p-2 text-emerald-600">1 <span className="text-xs align-top">(9)</span></td>
                                                            <td className="border border-slate-300 p-2 text-emerald-600">1 <span className="text-xs align-top">(11)</span></td>
                                                            <td className="border border-slate-300 p-2 text-rose-600 font-bold bg-rose-50">0 <span className="text-xs align-top">(10)</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 shadow-sm rounded-r-xl">
                                            <h5 className="font-bold text-emerald-900 mb-3">0'ların Gruplanması (Maxterms):</h5>
                                            <ul className="list-disc pl-5 space-y-3 text-sm text-emerald-800">
                                                <li><strong>Dört Köşe (Corners):</strong> Hücreler 0(X), 2, 8, 10 dörtlü bir grup oluşturur. Ortak bitler B=0, D=0. POS ifadesi: <strong>(B + D)</strong></li>
                                                <li><strong>İkili Grup 1 (5 ve 7):</strong> 5 numaralı 0'ı kapsamak için tek seçenek 7 ile eşleştirmektir. A=0, B=1, D=1. POS ifadesi: <strong>(A + B' + D')</strong></li>
                                                <li><strong>İkili Grup 2 (10 ve 14):</strong> 14 numaralı 0'ı kapsamak için 10 ile eşleştiririz. A=1, C=1, D=0. POS ifadesi: <strong>(A' + C' + D)</strong> <br/><span className="text-xs opacity-80">(Alternatif olarak 14 ve 15(X) eşleştirilip (A' + B' + C') yazılabilir).</span></li>
                                                <li><strong>İkili Grup 3 (3 ve 7):</strong> 3 numaralı 0'ı kapsamak için 7 ile eşleştiririz. A=0, C=1, D=1. POS ifadesi: <strong>(A + C' + D')</strong> <br/><span className="text-xs opacity-80">(Alternatif olarak 2 ve 3 eşleştirilip (A + B + C') yazılabilir).</span></li>
                                            </ul>
                                            <div className="mt-5 p-4 bg-white rounded border border-emerald-200 text-center font-bold text-lg text-emerald-900">
                                                F = (B + D) &middot; (A + B' + D') &middot; (A' + C' + D) &middot; (A + C' + D')
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )}

                    {/* Placeholder for Empty Chapters */}
                    {["ch9"].includes(activeChapter) && (
                        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center animate-in fade-in flex flex-col items-center justify-center min-h-[400px]">
                            <BookOpen className="w-16 h-16 text-slate-200 mb-4" />
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Bu Konuya Ait Sınav Sorusu Bulunmuyor</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                Seçtiğiniz <strong>{CHAPTERS.find(c => c.id === activeChapter)?.title}</strong> konusu için henüz çıkmış bir vize/final sorusu eklenmedi. Yeni sorular eklendikçe burada listelenecektir.
                            </p>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}
