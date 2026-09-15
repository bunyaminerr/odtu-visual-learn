"use client";

import React, { useState } from "react";
import { Cpu, Server, Network, AlignEndVertical, BookOpen, AlertCircle } from "lucide-react";
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
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-6 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col gap-6">
                
                {/* Header */}
                <header className="border-b border-slate-200 pb-4 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-3 text-[#051F20] mb-2">
                            <Cpu className="w-8 h-8" />
                            <h1 className="text-2xl font-bold tracking-tight text-[#051F20]">CNG 232</h1>
                        </div>
                        <h2 className="text-sm font-medium text-[#235347] flex items-center gap-2">
                            Birleşik Mantık Devreleri (Combinational Logic Circuits)
                        </h2>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg transition-all",
                                    isActive 
                                        ? "bg-[#235347] text-white shadow-sm" 
                                        : "bg-transparent text-slate-500 hover:text-[#051F20] hover:bg-slate-50"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[500px]">
                    {activeTab === 'design' && (
                        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold text-[#163832]">Combinational Logic Design Procedure</h2>
                            <p className="text-slate-600">
                                Combinational (Birleşik) devreler, çıkışları tamamen ve anında girişlerine bağlı olan mantık devreleridir (Hafızaları yoktur). Bir combinational devre tasarlamak için standart 5 adım uygulanır:
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {[
                                    { step: 1, title: "Specification (Spesifikasyon)", desc: "Devrenin ne yapması gerektiği metinsel olarak belirlenir (Örn: 2 sayıyı toplayan devre)." },
                                    { step: 2, title: "Truth Table (Doğruluk Tablosu)", desc: "Giriş ve çıkışlar arasındaki ilişkiyi gösteren tüm olasılıklar (0 ve 1) listelenir." },
                                    { step: 3, title: "Optimization (İndirgeme)", desc: "K-Map veya Boolean cebiri kullanılarak 2-seviyeli (SOP/POS) veya Çoklu-seviyeli (Multi-level) en sade denklem bulunur." },
                                    { step: 4, title: "Netlist / Mapping", desc: "Sadeleştirilmiş denklem, eldeki donanım teknolojisine (Sadece NAND, sadece NOR vb.) dönüştürülür." },
                                    { step: 5, title: "Verification (Doğrulama)", desc: "Nihai tasarımın doğruluk tablosu ile tamamen aynı sonucu verip vermediği test edilir." }
                                ].map((s) => (
                                    <div key={s.step} className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#8EB69B] transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-[#DAF1DE] text-[#235347] flex items-center justify-center font-bold text-lg shrink-0">
                                            {s.step}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#051F20]">{s.title}</h3>
                                            <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 bg-[#F2F7F4] p-6 rounded-xl border border-[#DAF1DE]">
                                <h3 className="font-bold text-[#163832] mb-2 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-[#235347]"/> Functionally Complete Sets
                                </h3>
                                <p className="text-sm text-[#051F20] leading-relaxed">
                                    Bir mantık kapısı kümesi, eğer <strong>herhangi bir Boolean fonksiyonunu</strong> tek başına ifade edebiliyorsa "Functionally Complete (İşlevsel Olarak Tam)" olarak adlandırılır. Örneğin:
                                    <br/>
                                    • <span className="font-mono bg-white px-1 border rounded text-[#235347]">+ , . , ' (OR, AND, NOT)</span> kümesi tamdır (SOP ve POS).
                                    <br/>
                                    • <span className="font-mono bg-white px-1 border rounded text-[#235347]">AND, NOT</span> veya <span className="font-mono bg-white px-1 border rounded text-[#235347]">OR, NOT</span> kümeleri de tamdır.
                                    <br/>
                                    • De Morgan kuralı sayesinde, <strong>sadece NAND</strong> veya <strong>sadece NOR</strong> kapıları kullanarak yapılamayacak hiçbir elektronik devre yoktur.
                                </p>
                            </div>

                            <div className="mt-4 bg-amber-50 p-6 rounded-xl border border-amber-200">
                                <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5"/> Multiple-Level Optimization (Çok Seviyeli İndirgeme)
                                </h3>
                                <p className="text-sm text-amber-700 leading-relaxed">
                                    Normalde SOP veya POS formları <strong>2-level (2 seviyeli)</strong> devrelerdir (Önce AND'le, sonra OR'la). Ancak ortak paranteze alma işlemleriyle K-level (maksimum ardışık kapı sayısı) artırılabilir (Örn: G = ABC + ABD + E + ACF + ADF $\Rightarrow$ A(C+D)(B+F) + E). 
                                    <br/><br/>
                                    <strong>Avantajı:</strong> Kullanılan kapı (gate) ve sinyal (literal) sayısını azaltarak üretim maliyetini düşürür.<br/>
                                    <strong>Dezavantajı:</strong> Sinyal çıkışa ulaşana kadar daha fazla kapıdan geçeceği için devrede <em>gecikme (gate delay)</em> artar, yani hız düşer.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'decoder' && (
                        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold text-[#163832]">Decoder (Kod Çözücü)</h2>
                            
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-slate-700 text-sm leading-relaxed space-y-4">
                                <p>
                                    <strong>Decoding (Kod Çözme)</strong>, n-bitlik bir giriş kodunun m-bitlik bir çıkış koduna dönüştürülmesidir ($n \le m \le 2^n$). Decoder, n-bit binary (ikili) giriş uygulandığında, bunu çıkışlara yansıtan bir combinational (birleşik) devredir.
                                </p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>En yaygın türü <strong>n-to-2ⁿ</strong> (Örn: 2'den 4'e, 3'ten 8'e) decoder'dır.</li>
                                    <li>Girişteki sayısal değerin ondalık karşılığına denk gelen <strong>sadece 1 çıkış pini</strong> aktif (1) olur, diğer tüm pinler kapalı (0) kalır. (Eğer Active Low çıkışlıysa, sadece 1 çıkış 0 olur, diğerleri 1 olur).</li>
                                    <li><strong>Uygulama Alanı:</strong> Decoder'lar kullanılarak istenilen herhangi bir Boolean fonksiyonu tasarlanabilir (Örn: Full Adder devresi, bir 3-to-8 decoder ve OR/NAND kapılarıyla yapılabilir). Ayrıca bilgisayarlarda "Memory Address Decoding (Hafıza Adresi Çözme)" işlemlerinde kullanılır.</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <DecoderVisualizer />
                            </div>
                        </div>
                    )}

                    {activeTab === 'encoder' && (
                        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold text-[#163832]">Encoder & Priority Encoder (Öncelikli Kodlayıcı)</h2>
                            
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-slate-700 text-sm leading-relaxed space-y-4">
                                <p>
                                    <strong>Encoder (Kodlayıcı)</strong>, Decoder'ın yaptığı işlemin tam tersini yapan dijital bir fonksiyondur. $2^n$ giriş hattından aktif (1) olanını bulur ve onu n-bitlik binary (ikili) bir sayıya dönüştürür.
                                </p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li><strong>Sorun:</strong> Standart bir Encoder'da aynı anda 2 giriş aktif olursa (Örn: D1 ve D3 aynı anda 1 gelirse) çıkışta kaos oluşur.</li>
                                    <li><strong>Çözüm (Priority Encoder):</strong> Bu sorunu çözmek için Öncelikli Kodlayıcı tasarlanmıştır. Birden fazla giriş aynı anda aktif olursa, <strong>indexi en büyük olan girişe öncelik (priority)</strong> verilir. Alt numaralı girişler "Don't care (X)" kabul edilir.</li>
                                    <li>Priority Encoder devresinde ayrıca bir <strong>V (Valid)</strong> çıkışı bulunur. Bu çıkış, eğer <em>hiçbir</em> giriş sinyali aktif değilse 0, en az 1 giriş aktifse 1 değerini alır. Böylece D0 (Giriş 0) durumu ile "hiçbir şeye basılmama" durumu birbirinden ayrılmış olur.</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <EncoderVisualizer />
                            </div>
                        </div>
                    )}

                    {activeTab === 'mux' && (
                        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold text-[#163832]">Multiplexer (MUX - Çoklayıcı)</h2>
                            
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-slate-700 text-sm leading-relaxed space-y-4">
                                <p>
                                    <strong>Multiplexer</strong>, dijital bir yönlendiricidir (switch). Birden fazla veri girişini ($I_0, I_1, ... I_n$), <strong>Seçici (Select)</strong> pinlerden gelen komuta göre tek bir çıkış hattına ($Y$) yönlendirir.
                                </p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Bir MUX'un giriş sayısı $2^n$ ise, bu girişlerden hangisinin seçileceğine karar veren <strong>$n$ adet Select (Seçici)</strong> pini bulunmak zorundadır (Örn: 8 girişli bir MUX için $n=3$ adet S pini gerekir).</li>
                                    <li>MUX sadece veriyi yönlendirmekle kalmaz, aynı zamanda <strong>Logic tasarımında doğrudan kullanılır</strong>. Bir $2^n$-to-1 MUX kullanılarak, $(n+1)$ değişkene sahip <strong>herhangi bir Boolean fonksiyonu</strong> ekstra hiçbir mantık kapısına ihtiyaç duymadan gerçeklenebilir (Shannon Expansion Teoremi).</li>
                                    <li>Ayrıca 2-to-1 MUX'lar kullanılarak daha büyük (4-to-1 veya 8-to-1) MUX'lar kaskad (peş peşe) bağlanarak tasarlanabilir.</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <MuxVisualizer />
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
