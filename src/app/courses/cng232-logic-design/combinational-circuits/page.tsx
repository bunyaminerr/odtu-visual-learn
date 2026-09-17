"use client";

import React, { useState } from "react";
import { Cpu, Server, Network, AlignEndVertical, BookOpen, AlertCircle, Zap, Table as TableIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DecoderVisualizer } from "@/components/visualizers/logic/DecoderVisualizer";
import { EncoderVisualizer } from "@/components/visualizers/logic/EncoderVisualizer";
import { MuxVisualizer } from "@/components/visualizers/logic/MuxVisualizer";

const TABS = [
    { id: 'design', label: 'Tasarım Süreci', icon: Cpu },
    { id: 'decoder', label: 'Decoder (Kod Çözücü)', icon: Server },
    { id: 'encoder', label: 'Encoder (Kodlayıcı)', icon: AlignEndVertical },
    { id: 'mux', label: 'Multiplexer (Çoklayıcı)', icon: Network },
];

export default function CombinationalCircuitsPage() {
    const [activeTab, setActiveTab] = useState(TABS[0].id);

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-4 sm:p-8 flex justify-center">
            <div className="max-w-5xl w-full flex flex-col gap-8">
                
                {/* Header */}
                <header className="border-b border-slate-300 pb-6">
                    <div className="flex items-center gap-3 text-[#051F20] mb-2">
                        <Cpu className="w-10 h-10 text-[#235347]" />
                        <h1 className="text-3xl font-extrabold tracking-tight">CNG 232</h1>
                    </div>
                    <h2 className="text-lg font-semibold text-[#235347] flex items-center gap-2 mt-1">
                        <Network className="w-5 h-5" /> 
                        4. Birleşik Mantık Devreleri (Combinational Logic Circuits)
                    </h2>
                    <p className="mt-3 text-slate-600 font-medium leading-relaxed">
                        Combinational devrelerin çıkışları, sadece o anki girişlerin durumuna bağlıdır. İçlerinde bellek (memory) veya geri besleme (feedback) elemanı bulunmaz. Bu bölümde temel tasarım adımlarını ve yaygın olarak kullanılan hazır blokları (Decoder, Encoder, MUX) inceleyeceğiz.
                    </p>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-all",
                                    isActive 
                                        ? "bg-[#235347] text-white shadow-sm" 
                                        : "bg-transparent text-slate-500 hover:text-[#051F20] hover:bg-slate-50"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10 min-h-[600px]">
                    
                    {/* DESIGN TAB */}
                    {activeTab === 'design' && (
                        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold text-[#163832] border-b border-slate-100 pb-4">Tasarım Prosedürü ve Optimizasyon</h2>
                            
                            <p className="text-slate-700 text-lg leading-relaxed">
                                Bir combinational devre tasarlamak için standart 5 adım uygulanır:
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { step: 1, title: "Specification (Spesifikasyon)", desc: "Devrenin ne yapacağı belirlenir (Örn: 2 bit toplayıcı)." },
                                    { step: 2, title: "Truth Table (Doğruluk Tablosu)", desc: "Giriş ve çıkış ilişkileri tabloya dökülür." },
                                    { step: 3, title: "Optimization (Sadeleştirme)", desc: "K-Map ile en sade Boolean fonksiyonu bulunur." },
                                    { step: 4, title: "Netlist / Mapping", desc: "Sadeleştirilmiş denklem, eldeki mantık kapılarıyla çizilir." },
                                    { step: 5, title: "Verification (Doğrulama)", desc: "Devrenin doğru çalışıp çalışmadığı test edilir." }
                                ].map((s) => (
                                    <div key={s.step} className="flex gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#8EB69B] transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-[#DAF1DE] text-[#235347] flex items-center justify-center font-black text-xl shrink-0">
                                            {s.step}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#051F20]">{s.title}</h3>
                                            <p className="text-base text-slate-600 mt-1">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="bg-[#F2F7F4] p-6 rounded-2xl border border-[#DAF1DE]">
                                    <h3 className="font-bold text-[#163832] text-xl mb-3 flex items-center gap-2">
                                        <BookOpen className="w-6 h-6 text-[#235347]"/> Functionally Complete Sets
                                    </h3>
                                    <p className="text-base text-[#051F20] leading-relaxed">
                                        Bir mantık kapısı kümesi, <strong>herhangi bir Boolean fonksiyonunu</strong> tek başına ifade edebiliyorsa "Functionally Complete" (İşlevsel Olarak Tam) denir.
                                    </p>
                                    <ul className="list-disc pl-5 mt-3 space-y-2 text-[#051F20] font-medium">
                                        <li><code className="bg-white px-2 py-1 rounded text-[#235347] border">+, ·, ' (OR, AND, NOT)</code> (Klasik)</li>
                                        <li><code className="bg-white px-2 py-1 rounded text-[#235347] border">NAND</code> tek başına yeterlidir.</li>
                                        <li><code className="bg-white px-2 py-1 rounded text-[#235347] border">NOR</code> tek başına yeterlidir.</li>
                                    </ul>
                                </div>

                                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                                    <h3 className="font-bold text-blue-900 text-xl mb-3 flex items-center gap-2">
                                        <Zap className="w-6 h-6 text-blue-700"/> 3-State Buffers (Tri-State)
                                    </h3>
                                    <p className="text-base text-blue-800 leading-relaxed mb-3">
                                        Normal bir buffer sadece 0 ve 1 çıkışı verirken, Tri-State buffer'ın 3. bir durumu vardır: <strong>High-Impedance (Hi-Z)</strong>.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 text-blue-900 font-medium text-sm">
                                        <li><strong>E (Enable) = 1:</strong> Buffer aktiftir. Giriş (X) neyse çıkış (F) odur (Normal Buffer gibi davranır).</li>
                                        <li><strong>E (Enable) = 0:</strong> Buffer kapalıdır (Hi-Z). Açık devre gibi davranır, akım geçirmez.</li>
                                        <li><strong>Neden Kullanılır?</strong> Aynı bus (veri yolu) üzerine birden fazla çipin veri yazmasını sağlarken kısa devre oluşmasını (biri 0 diğeri 1 gönderdiğinde) engellemek için.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 mt-2">
                                <h3 className="font-bold text-amber-900 text-xl mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-6 h-6"/> Multiple-Level Optimization (Çok Seviyeli İndirgeme)
                                </h3>
                                <p className="text-base text-amber-800 leading-relaxed">
                                    K-Map bize her zaman <strong>2-Seviyeli (2-level)</strong> SOP veya POS formunu verir. Ancak ortak paranteze alma işlemleriyle kapı sayısını daha da düşürebiliriz (Multi-level).
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="bg-white p-4 rounded-xl border border-amber-200">
                                        <h4 className="font-bold text-slate-800 mb-2">Başlangıç (2-Level SOP):</h4>
                                        <code className="text-amber-700 font-bold block mb-2">G = ABC + ABD + E + ACF + ADF</code>
                                        <ul className="text-sm text-slate-600 space-y-1">
                                            <li>• 5 adet mantık kapısı (4 AND, 1 OR)</li>
                                            <li>• 13 literal (değişken sayısı)</li>
                                            <li>• 17 toplam kapı girişi</li>
                                            <li>• Gecikme (Delay): Sadece 2 kapı gecikmesi.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-amber-200">
                                        <h4 className="font-bold text-slate-800 mb-2">Ortak Paranteze Alınmış (3-Level):</h4>
                                        <code className="text-amber-700 font-bold block mb-2">G = A(C+D)(B+F) + E</code>
                                        <ul className="text-sm text-slate-600 space-y-1">
                                            <li>• 4 adet mantık kapısı</li>
                                            <li>• Sadece 6 literal</li>
                                            <li>• 9 toplam kapı girişi</li>
                                            <li>• Gecikme (Delay): Artık 3 kapı gecikmesi! (Yavaşladı)</li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm font-bold text-amber-900">
                                    Sonuç: Multi-level tasarım maliyeti (kapı/transistör sayısı) düşürür ancak veri yolu uzadığı için devreyi yavaşlatır!
                                </p>
                            </div>
                        </div>
                    )}

                    {/* DECODER TAB */}
                    {activeTab === 'decoder' && (
                        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold text-[#163832] border-b border-slate-100 pb-4">Decoder (Kod Çözücü)</h2>
                            
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-slate-700 text-lg leading-relaxed space-y-4">
                                <p>
                                    <strong>Decoding (Kod Çözme)</strong>, n-bitlik bir giriş kodunun m-bitlik bir çıkış koduna dönüştürülmesidir ($n \le m \le 2^n$). Decoder, n-bit binary (ikili) giriş uygulandığında, bunu çıkışlara yansıtan combinational bir devredir.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>En yaygın türü <strong>n-to-2<sup>n</sup></strong> (Örn: 2-to-4, 3-to-8) decoder'dır.</li>
                                    <li>Girişteki sayısal değerin ondalık (decimal) karşılığına denk gelen <strong>sadece 1 çıkış pini</strong> aktif (1) olur, diğer tüm pinler kapalı (0) kalır. (Eğer Active Low çıkışlıysa, sadece 1 çıkış 0 olur, diğerleri 1 olur).</li>
                                </ul>
                            </div>

                            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl">
                                <h3 className="font-bold text-indigo-900 text-xl mb-4 flex items-center gap-2">
                                    <Cpu className="w-6 h-6 text-indigo-700"/> Klasik Sınav Sorusu: Decoder ile Full Adder Tasarımı
                                </h3>
                                <p className="text-base text-indigo-800 mb-4">
                                    Decoder'lar aslen birer <strong>Minterm üreticileridir</strong>. Bir 3-to-8 decoder'ın 8 çıkışı, 3 değişkenli bir fonksiyonun 8 farklı mintermine denk gelir. Bu sayede istediğimiz devreyi ekstra kapı kullanmadan tasarlayabiliriz.
                                </p>
                                <div className="bg-white p-5 rounded-xl border border-indigo-100 grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-bold text-indigo-900 mb-2">1. Full Adder Doğruluk Tablosu:</h4>
                                        <p className="text-sm text-slate-600 mb-2">S (Sum) = Σm(1, 2, 4, 7)<br/>C (Carry) = Σm(3, 5, 6, 7)</p>
                                        <ul className="text-sm text-slate-700 list-disc pl-4 space-y-1">
                                            <li>Eğer normal bir Decoder (Active High) kullansaydık, bu minterm çıkışlarını alıp büyük bir <strong>OR</strong> kapısına bağlamamız yeterli olacaktı.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-indigo-900 mb-2">2. NAND ile Gerçekleme:</h4>
                                        <p className="text-sm text-slate-600 mb-2">
                                            Fakat sorularda genelde "Active Low (Değillenmiş) çıkışlı bir Decoder ve NAND kapıları" kullanmanız istenir.
                                        </p>
                                        <ul className="text-sm text-slate-700 list-disc pl-4 space-y-1">
                                            <li>Active Low Decoder çıkışları Mintermlerin değilini üretir: (m<sub>1</sub>)' (m<sub>2</sub>)' gibi.</li>
                                            <li>Bu değil çıkışlarını bir <strong>NAND</strong> kapısına sokarsak, De Morgan kuralı gereği çıkışlar toplanır: <code className="bg-slate-100 px-1 rounded">((m1)' · (m2)')' = m1 + m2</code></li>
                                            <li>Böylece kocaman bir Full Adder sadece tek bir çip (Decoder) ve iki adet NAND kapısı ile tasarlanmış olur!</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-bold text-slate-800 text-lg mb-4">Etkileşimli Decoder Simülatörü</h3>
                                <DecoderVisualizer />
                            </div>
                        </div>
                    )}

                    {/* ENCODER TAB */}
                    {activeTab === 'encoder' && (
                        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold text-[#163832] border-b border-slate-100 pb-4">Encoder ve Priority Encoder</h2>
                            
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-slate-700 text-lg leading-relaxed space-y-4">
                                <p>
                                    <strong>Encoder (Kodlayıcı)</strong>, Decoder'ın yaptığının tam tersini yapar. $2^n$ giriş hattından hangisi aktif (1) ise, o girişin sırasını n-bitlik binary (ikili) bir sayı olarak çıkışa verir.
                                </p>
                                <p className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-800 text-base">
                                    <strong>Sorun:</strong> Standart bir Encoder'da aynı anda 2 giriş aktif olursa (Örn: D<sub>1</sub> ve D<sub>3</sub> aynı anda 1 gelirse) çıkışta istenmeyen bir sonuç oluşur. Bunu çözmek için <strong>Priority Encoder (Öncelikli Kodlayıcı)</strong> icat edilmiştir.
                                </p>
                            </div>

                            <div className="bg-[#F2F7F4] border border-[#DAF1DE] p-6 rounded-2xl">
                                <h3 className="font-bold text-[#163832] text-xl mb-4 flex items-center gap-2">
                                    <TableIcon className="w-6 h-6 text-[#235347]"/> 4-to-2 Priority Encoder Doğruluk Tablosu
                                </h3>
                                <p className="text-base text-slate-700 mb-4">
                                    Birden fazla giriş aktif olursa, <strong>indexi en büyük olan girişe öncelik (priority)</strong> verilir. Alt numaralı girişler "Don't care (X)" kabul edilir. Ayrıca, <strong>V (Valid)</strong> biti hiçbir tuşa basılmaması durumunu (0) gösterir.
                                </p>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                                        <thead className="bg-[#235347] text-white">
                                            <tr>
                                                <th className="p-3 text-center border-r border-[#163832]/20" colSpan={4}>Girişler (Inputs)</th>
                                                <th className="p-3 text-center" colSpan={3}>Çıkışlar (Outputs)</th>
                                            </tr>
                                            <tr className="bg-[#163832]">
                                                <th className="p-2 text-center w-12">D<sub>3</sub></th>
                                                <th className="p-2 text-center w-12">D<sub>2</sub></th>
                                                <th className="p-2 text-center w-12">D<sub>1</sub></th>
                                                <th className="p-2 text-center w-12 border-r border-[#163832]/50">D<sub>0</sub></th>
                                                <th className="p-2 text-center w-12 text-amber-300">A<sub>1</sub></th>
                                                <th className="p-2 text-center w-12 text-amber-300">A<sub>0</sub></th>
                                                <th className="p-2 text-center w-12 text-emerald-300 font-bold">V</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center font-mono">
                                            <tr className="border-b border-slate-100 hover:bg-slate-50">
                                                <td className="p-3">0</td><td className="p-3">0</td><td className="p-3">0</td><td className="p-3 border-r border-slate-200">0</td>
                                                <td className="p-3 text-slate-400">X</td><td className="p-3 text-slate-400">X</td><td className="p-3 font-bold text-rose-500 bg-rose-50">0</td>
                                            </tr>
                                            <tr className="border-b border-slate-100 hover:bg-slate-50">
                                                <td className="p-3">0</td><td className="p-3">0</td><td className="p-3">0</td><td className="p-3 font-bold text-[#235347] border-r border-slate-200">1</td>
                                                <td className="p-3 font-bold">0</td><td className="p-3 font-bold">0</td><td className="p-3 font-bold text-emerald-600 bg-emerald-50">1</td>
                                            </tr>
                                            <tr className="border-b border-slate-100 hover:bg-slate-50">
                                                <td className="p-3">0</td><td className="p-3">0</td><td className="p-3 font-bold text-[#235347]">1</td><td className="p-3 text-slate-400 border-r border-slate-200">X</td>
                                                <td className="p-3 font-bold">0</td><td className="p-3 font-bold">1</td><td className="p-3 font-bold text-emerald-600 bg-emerald-50">1</td>
                                            </tr>
                                            <tr className="border-b border-slate-100 hover:bg-slate-50">
                                                <td className="p-3">0</td><td className="p-3 font-bold text-[#235347]">1</td><td className="p-3 text-slate-400">X</td><td className="p-3 text-slate-400 border-r border-slate-200">X</td>
                                                <td className="p-3 font-bold">1</td><td className="p-3 font-bold">0</td><td className="p-3 font-bold text-emerald-600 bg-emerald-50">1</td>
                                            </tr>
                                            <tr className="hover:bg-slate-50">
                                                <td className="p-3 font-bold text-[#235347]">1</td><td className="p-3 text-slate-400">X</td><td className="p-3 text-slate-400">X</td><td className="p-3 text-slate-400 border-r border-slate-200">X</td>
                                                <td className="p-3 font-bold">1</td><td className="p-3 font-bold">1</td><td className="p-3 font-bold text-emerald-600 bg-emerald-50">1</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-bold text-slate-800 text-lg mb-4">Etkileşimli Encoder Simülatörü</h3>
                                <EncoderVisualizer />
                            </div>
                        </div>
                    )}

                    {/* MUX TAB */}
                    {activeTab === 'mux' && (
                        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold text-[#163832] border-b border-slate-100 pb-4">Multiplexer (MUX - Çoklayıcı)</h2>
                            
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-slate-700 text-lg leading-relaxed space-y-4">
                                <p>
                                    <strong>Multiplexer (MUX)</strong>, dijital bir yönlendiricidir (switch). Birden fazla veri girişini (I<sub>0</sub>, I<sub>1</sub>, ... I<sub>n</sub>), <strong>Seçici (Select)</strong> pinlerden gelen komuta göre tek bir çıkış hattına (Y) yönlendirir.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Bir MUX'un giriş sayısı 2<sup>n</sup> ise, bu girişlerden hangisinin seçileceğine karar veren <strong>n adet Select (Seçici)</strong> pini bulunmak zorundadır (Örn: 8 girişli bir MUX için n=3 adet S pini gerekir).</li>
                                    <li>MUX sadece veriyi yönlendirmekle kalmaz, aynı zamanda <strong>Logic tasarımında doğrudan kullanılır</strong>. Bir 2<sup>n</sup>-to-1 MUX kullanılarak, (n+1) değişkene sahip <strong>herhangi bir Boolean fonksiyonu</strong> ekstra hiçbir mantık kapısına ihtiyaç duymadan gerçeklenebilir (Shannon Expansion Teoremi).</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-bold text-slate-800 text-lg mb-4">Etkileşimli MUX Simülatörü</h3>
                                <MuxVisualizer />
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
