"use client";

import React, { useState } from "react";
import { Cpu, MemoryStick, Activity, Zap, Info, Clock, AlertTriangle, PenTool, LayoutTemplate, Braces } from "lucide-react";
import { cn } from "@/lib/utils";
import { FlipFlopVisualizer } from "@/components/visualizers/logic/FlipFlopVisualizer";

export default function SequentialCircuitsPage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-6 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col gap-10">
                
                {/* Header */}
                <header className="border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-3 text-[#051F20] mb-2">
                        <Cpu className="w-8 h-8" />
                        <h1 className="text-2xl font-bold tracking-tight text-[#051F20]">CNG 232</h1>
                    </div>
                    <h2 className="text-sm font-medium text-[#235347] flex items-center gap-2">
                        <MemoryStick className="w-4 h-4" /> 
                        Ardışıl Devreler (Sequential Circuits)
                    </h2>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap bg-white rounded-xl shadow-sm border border-slate-200 p-2 gap-2">
                    {[
                        { id: "overview", label: "Giriş ve Kavramlar", icon: <Info className="w-4 h-4" /> },
                        { id: "latches", label: "Latches (Tutucular)", icon: <Activity className="w-4 h-4" /> },
                        { id: "flipflops", label: "Flip-Flops (D, JK, T)", icon: <Clock className="w-4 h-4" /> },
                        { id: "analysis", label: "Analiz & Mealy/Moore", icon: <Zap className="w-4 h-4" /> },
                        { id: "reduction", label: "State Reduction & Assignment", icon: <LayoutTemplate className="w-4 h-4" /> },
                        { id: "design", label: "Tasarım Adımları & Örnekler", icon: <PenTool className="w-4 h-4" /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all",
                                activeTab === tab.id 
                                    ? "bg-[#235347] text-white shadow-md" 
                                    : "text-slate-600 hover:bg-slate-100"
                            )}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Contents */}
                <div className="flex flex-col gap-8">
                    
                    {/* OVERVIEW TAB */}
                    {activeTab === "overview" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Ardışıl Devre (Sequential Circuit) Nedir?</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                <p>
                                    Bileşik (Combinational) devrelerde çıkış sadece o anki girişlere bağlıdır. Ardışıl devreler ise <strong>Memory (Bellek)</strong> elemanları içerir. Çıkışlar, mevcut girişlerin yanı sıra <strong>geçmiş girişlere (past activity)</strong> yani devrenin o anki <em>Durumuna (State)</em> bağlıdır.
                                </p>
                                
                                <div className="bg-[#F2F7F4] border border-[#DAF1DE] rounded-xl p-6">
                                    <h3 className="font-bold text-[#163832] text-lg mb-3">Senkron vs Asenkron</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-bold text-[#235347] mb-2 flex items-center gap-2"><Activity className="w-4 h-4"/> Asenkron Devreler</h4>
                                            <p className="text-sm">Davranış, sinyallerin sürekli zamanlı (continuous time) değişimine bağlıdır. Devreyi senkronize etmek çok zordur (overhead yaratır).</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#235347] mb-2 flex items-center gap-2"><Clock className="w-4 h-4"/> Senkron Devreler</h4>
                                            <p className="text-sm">Davranış, ayrık zaman dilimlerinde (discrete instants) değişir. Bunu sağlayan şey <strong>Clock (Saat)</strong> sinyalidir. Tüm bellek elemanları sadece clock vurduğunda güncellenir. Endüstri standardıdır.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* LATCHES TAB */}
                    {activeTab === "latches" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Latches (Tutucular)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                <p>Latch'ler asenkron bellek yapıtaşlarıdır. Çapraz bağlı kapılarla (feedback) oluşur.</p>

                                <div>
                                    <h3 className="font-bold text-[#235347] text-lg mb-2">1. SR Latch (Set-Reset)</h3>
                                    <p>S=1 ise Set (Q=1), R=1 ise Reset (Q=0). İkisi 0 ise Hold (Tut). S=1 ve R=1 aynı anda verilirse <strong>Geçersiz (Invalid)</strong> durum oluşur (Q ve Q' aynı anda 0 olmaya çalışır).</p>
                                    <p className="text-sm font-mono bg-slate-100 p-2 rounded mt-2 border">Karakteristik Denklem: Q+ = S + R'Q (S=1, R=1 olmamak şartıyla)</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#235347] text-lg mb-2">2. D Latch (Data)</h3>
                                    <p>SR Latch'teki invalid durumu çözmek için, S'ye D verilirken R'ye D'nin değili verilir. Ayrıca devrenin kontrolü için bir <strong>C (Control)</strong> pini eklenir.</p>
                                    
                                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-3 flex gap-3">
                                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-amber-800">Transparency Problem (Şeffaflık Problemi)</h4>
                                            <p className="text-sm text-amber-900 mt-1">D Latch <strong>Level-Triggered</strong> çalışır. Yani C=1 olduğu sürece (şeffaf), girişteki her değişim anında çıkışa (Q) akar. Eğer devrede bir geri besleme (feedback) varsa, clock sinyali 1 kaldığı sürece sinyal sürekli devrede döner (oscillatory behavior) ve sonuç belirsiz (unreliable) olur. <strong>Kural:</strong> Bir Latch'in çıkışı, aynı türden başka bir Latch'in girişine doğrudan bağlanamaz.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* FLIP-FLOPS TAB */}
                    {activeTab === "flipflops" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Flip-Flops (Kenar Tetiklemeli)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                <p>Şeffaflık sorununu çözmek için <strong>Edge-Triggered</strong> (Kenar Tetiklemeli) bellek elemanları kullanılır. Veri sadece Clock sinyalinin kenarında (ör: 0'dan 1'e çıkarken) kilitlenir.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="border rounded-xl p-4 bg-slate-50">
                                        <h4 className="font-bold text-[#235347] border-b pb-2 mb-2">D Flip-Flop (Data)</h4>
                                        <p className="text-sm">Girişteki veriyi (D) clock kenarında çıkışa (Q) aktarır.</p>
                                        <code className="text-xs bg-white block p-2 mt-2 border rounded">Q+ = D</code>
                                    </div>
                                    <div className="border rounded-xl p-4 bg-slate-50">
                                        <h4 className="font-bold text-[#235347] border-b pb-2 mb-2">JK Flip-Flop</h4>
                                        <p className="text-sm">SR gibidir ama J=1, K=1 durumu geçerlidir (Toggle / Evirici yapar).</p>
                                        <code className="text-xs bg-white block p-2 mt-2 border rounded">Q+ = JQ' + K'Q</code>
                                    </div>
                                    <div className="border rounded-xl p-4 bg-slate-50">
                                        <h4 className="font-bold text-[#235347] border-b pb-2 mb-2">T Flip-Flop (Toggle)</h4>
                                        <p className="text-sm">T=1 ise çıkışı tersler, T=0 ise çıkışı korur.</p>
                                        <code className="text-xs bg-white block p-2 mt-2 border rounded">Q+ = T ⊕ Q</code>
                                    </div>
                                </div>

                                <div className="bg-[#F2F7F4] border border-[#DAF1DE] rounded-xl p-6 mt-4">
                                    <h3 className="font-bold text-[#163832] text-lg mb-2">Diğer Pinler: Enable ve Direct Inputs</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li><strong>Enable (EN):</strong> EN=0 ise Clock gelse bile durum değişmez.</li>
                                        <li><strong>Direct Inputs (Asynchronous Preset/Clear):</strong> Sistemi sıfırlamak için kullanılır. Clock sinyalinden bağımsız olarak <strong>anında</strong> etki eder. (Genelde active-low çalışırlar, yani 0 gelince sıfırlarlar).</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ANALYSIS TAB */}
                    {activeTab === "analysis" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Devre Analizi: Mealy vs Moore</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="border rounded-xl p-5 bg-blue-50/50 border-blue-200">
                                        <h3 className="text-xl font-bold text-blue-800 mb-2">Moore Machine</h3>
                                        <p className="mb-3 text-sm">Çıkışlar <strong>SADECE</strong> mevcut durumlara (states) bağlıdır. Girişler doğrudan çıkışı etkileyemez.</p>
                                        <ul className="list-disc pl-5 text-sm space-y-1">
                                            <li>Output Eq: <code>Z = f(Q)</code> (Giriş X yok)</li>
                                            <li>State Diagram'da: Dairelerin içinde <code>State / Output</code> şeklinde yazılır (örn: <code>S0 / 1</code>).</li>
                                        </ul>
                                    </div>
                                    <div className="border rounded-xl p-5 bg-purple-50/50 border-purple-200">
                                        <h3 className="text-xl font-bold text-purple-800 mb-2">Mealy Machine</h3>
                                        <p className="mb-3 text-sm">Çıkışlar hem mevcut duruma (states) <strong>HEM DE girişlere (inputs)</strong> bağlıdır.</p>
                                        <ul className="list-disc pl-5 text-sm space-y-1">
                                            <li>Output Eq: <code>Z = f(Q, X)</code></li>
                                            <li>State Diagram'da: Daireler sadece state adını içerir, okların (transition) üzerine <code>Input / Output</code> yazılır (örn: <code>0 / 1</code>).</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="font-bold text-[#235347] text-lg mb-2">Analiz Adımları</h3>
                                    <ol className="list-decimal pl-5 space-y-2">
                                        <li><strong>Next State (Input) Equations:</strong> Devredeki Flip-Flop giriş formülleri yazılır (Örn: <code>D_A = Q_A X + Q_B X</code>).</li>
                                        <li><strong>Output Equation:</strong> Çıkış formülü yazılır (Örn: <code>Y = (Q_A + Q_B)X'</code> - <em>İçinde X olduğu için bu bir Mealy devresidir.</em>)</li>
                                        <li><strong>State Table:</strong> Present State ve Input için, Next State ve Output değerlerinin yazıldığı tablodur.</li>
                                        <li><strong>State Diagram:</strong> Tablonun çemberler ve oklarla görselleştirilmesidir.</li>
                                    </ol>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* REDUCTION & ASSIGNMENT TAB */}
                    {activeTab === "reduction" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">State Reduction & Assignment</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                
                                <div>
                                    <h3 className="text-lg font-bold text-[#235347] mb-2">State Reduction (Durum İndirgeme)</h3>
                                    <p className="mb-2">Devrede gereksiz state'leri birleştirmek, donanım maliyetini (Flip-Flop sayısını) düşürür. İki state'in (örneğin S1 ve S2) <strong>eşdeğer</strong> sayılabilmesi için şartlar:</p>
                                    <ul className="list-disc pl-6 bg-slate-50 p-4 border rounded-xl">
                                        <li>Her giriş için ürettikleri <strong>çıkış (Output)</strong> aynı olmalıdır.</li>
                                        <li>Her giriş için gidecekleri <strong>bir sonraki durumlar (Next States)</strong> aynı veya eşdeğer olmalıdır.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-[#235347] mb-2 mt-6">State Assignment (Durum Atama)</h3>
                                    <p className="mb-2">S0, S1 gibi state'lere binary değerler atanmalıdır. Örneğin 3 state varsa (S0, S1, S2), en az 2 adet Flip-Flop gerekir (2^2 = 4 &gt; 3).</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        <div className="border rounded-xl p-4">
                                            <h4 className="font-bold text-[#163832] border-b pb-2 mb-2">Binary Assignment</h4>
                                            <p className="text-sm">S0=00, S1=01, S2=10, S3=11. En standart atamadır.</p>
                                        </div>
                                        <div className="border rounded-xl p-4">
                                            <h4 className="font-bold text-[#163832] border-b pb-2 mb-2">Gray Code Assignment</h4>
                                            <p className="text-sm">S0=00, S1=01, S2=11, S3=10. Ardışık state'ler arasında sadece tek bir bit değişir (Donanımda güç tasarrufu sağlar).</p>
                                        </div>
                                        <div className="border rounded-xl p-4">
                                            <h4 className="font-bold text-[#163832] border-b pb-2 mb-2">One-Hot Assignment</h4>
                                            <p className="text-sm">S0=0001, S1=0010, S2=0100, S3=1000. Her state için ayrı bir Flip-Flop gerekir. Maliyetli ama kodlaması/doğrulaması en kolay yöntemdir.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* DESIGN EXAMPLES TAB */}
                    {activeTab === "design" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Tasarım Adımları ve Örnekler</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                
                                <div className="bg-[#163832] text-white p-4 rounded-xl mb-6">
                                    <h3 className="font-bold text-lg mb-2">Genel Tasarım Prosedürü:</h3>
                                    <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-200">
                                        <li>Şartnameyi (Specification) anla (Mealy/Moore seçimi).</li>
                                        <li>State Diagram veya State Table oluştur.</li>
                                        <li>State Reduction yap (Gereksiz durumları sil).</li>
                                        <li>State Assignment (Durumlara bit ata).</li>
                                        <li>Next State (K-map ile FF Input Equations) ve Output denklemlerini bul.</li>
                                        <li>Lojik diyagramı çiz.</li>
                                    </ol>
                                </div>

                                {/* Example 1 */}
                                <div className="border border-slate-200 rounded-xl overflow-hidden">
                                    <div className="bg-slate-100 p-4 border-b">
                                        <h3 className="font-bold text-[#163832] text-lg">Örnek 1: Sequence Detector (101 Dizilimi) - Mealy</h3>
                                        <p className="text-sm text-slate-600">Giriş dizisinde "101" geldiğinde Z=1 yapan (clock ile eşzamanlı) Mealy devresi tasarımı.</p>
                                    </div>
                                    <div className="p-5 text-sm space-y-4">
                                        <p><strong>Adım 1 - Durumların Belirlenmesi:</strong><br/>
                                        <code>S0</code>: Reset/Başlangıç<br/>
                                        <code>S1</code>: İlk '1' geldi.<br/>
                                        <code>S2</code>: '10' geldi. (Buradan sonra 1 gelirse Z=1 olur ve ilk '1' geldiği için tekrar S1'e gidilir).
                                        </p>
                                        <p><strong>Adım 2 - Durum Ataması (Binary):</strong> 3 state olduğu için 2 FF (A, B) gerekir. S0=00, S1=01, S2=10.</p>
                                        <p><strong>Adım 3 - Denklemlerin Bulunması (D FF ile):</strong> K-Map çözümü sonucunda:<br/>
                                        <code className="bg-slate-50 px-2 rounded">D_A = B · X'</code> (Çünkü S1=01'deyken X=0 gelirse A=1 (S2=10) olur)<br/>
                                        <code className="bg-slate-50 px-2 rounded">D_B = X</code><br/>
                                        <code className="bg-slate-50 px-2 rounded">Z = A · X</code> (S2=10 iken X=1 gelirse çıkış Z=1 olur)
                                        </p>
                                    </div>
                                </div>

                                {/* Example 2 */}
                                <div className="border border-slate-200 rounded-xl overflow-hidden">
                                    <div className="bg-slate-100 p-4 border-b">
                                        <h3 className="font-bold text-[#163832] text-lg">Örnek 2: 3-bit Out-of-Order Counter</h3>
                                        <p className="text-sm text-slate-600">Geçiş dizilimi: <code>000 &rarr; 100 &rarr; 111 &rarr; 010 &rarr; 011 &rarr; 000</code> olan sayıcı tasarımı.</p>
                                    </div>
                                    <div className="p-5 text-sm space-y-4">
                                        <p><strong>Sorun:</strong> Bu dizilimde 001, 101, 110 durumları (states) tanımlı değil (Don't care kullanabiliriz ama devrenin bu tanımlanmamış durumlara düşerse geri kurtulup kurtulamayacağına "self-correcting" bakılmalıdır).</p>
                                        
                                        <p><strong>Çözüm D Flip-Flop ile:</strong><br/>
                                        Giriş denklemleri Next State K-Map ile aynıdır.<br/>
                                        <code className="bg-slate-50 px-2 rounded">D_A = B'</code><br/>
                                        <code className="bg-slate-50 px-2 rounded">D_B = A + BC'</code><br/>
                                        <code className="bg-slate-50 px-2 rounded">D_C = (A + B)C'</code>
                                        </p>

                                        <p><strong>Çözüm JK Flip-Flop ile:</strong><br/>
                                        Eğer JK kullanılacaksa, Next State haritası doğrudan kullanılamaz. JK'nın "Excitation Table"ı (Uyarma Tablosu) kullanılmalıdır.<br/>
                                        Örneğin Q:0 &rarr; Q+:1 geçişi için J=1, K=X olmalıdır. Bu tabloya göre her FF için (J_A, K_A vb.) ayrı K-Map çıkarılıp formüller bulunur.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </section>
                    )}

                    {/* VISUALIZER (Shown in both Latches and FlipFlops tabs) */}
                    {(activeTab === "latches" || activeTab === "flipflops") && (
                        <div className="mt-4 animate-in fade-in">
                            <h3 className="text-lg font-bold text-[#163832] mb-4">Donanım Simülatörü</h3>
                            <FlipFlopVisualizer />
                            <p className="text-xs text-slate-500 mt-2 text-center">
                                * Simülatörden devreyi değiştirerek Latch (Asenkron) ve Flip-Flop (Senkron) davranış farklarını inceleyin.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
