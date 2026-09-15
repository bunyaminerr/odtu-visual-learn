"use client";

import React, { useState } from "react";
import { Cpu, MemoryStick, Activity, Zap, Info, Clock, AlertTriangle, Layers, ListChecks, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import { RegisterVisualizer } from "@/components/visualizers/logic/RegisterVisualizer";

export default function RegistersCountersPage() {
    const [activeTab, setActiveTab] = useState("registers");

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
                        Bölüm 6: Kaydediciler (Registers) ve Sayıcılar (Counters)
                    </h2>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap bg-white rounded-xl shadow-sm border border-slate-200 p-2 gap-2">
                    {[
                        { id: "registers", label: "Registers & Shift Registers", icon: <Layers className="w-4 h-4" /> },
                        { id: "counters", label: "Sayıcılar (Ripple vs Sync)", icon: <Activity className="w-4 h-4" /> },
                        { id: "ring", label: "Ring & Johnson Counters", icon: <Network className="w-4 h-4" /> },
                        { id: "solved", label: "Çözümlü Sorular (PDF)", icon: <ListChecks className="w-4 h-4" /> }
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
                    
                    {/* REGISTERS TAB */}
                    {activeTab === "registers" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Registers (Kaydediciler)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                <p>
                                    Register, birden fazla Flip-Flop'un bir araya getirilerek oluşturulduğu ve ortak kontrol sinyalleriyle (Clock, Enable, Load, Clear) yönetildiği bir bellek grubudur. 
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="border rounded-xl p-5 bg-slate-50">
                                        <h3 className="font-bold text-[#163832] text-lg mb-2">Parallel Load Register</h3>
                                        <p className="text-sm">Paralel yükleme (Parallel Load), tüm register bitlerinin aynı anda clock sinyaliyle yüklenmesidir. (Sırayla, bit bit yüklemeye ise <em>Serial</em> denir). Donanımda D-FF'in D girişine bir 2x1 MUX bağlanarak yapılır: Load=1 ise yeni veri, Load=0 ise eski veri girer.</p>
                                    </div>
                                    <div className="border rounded-xl p-5 bg-slate-50">
                                        <h3 className="font-bold text-[#163832] text-lg mb-2">Universal Shift Register (Evrensel Kaydırmalı Kaydedici)</h3>
                                        <p className="text-sm">İçinde 4x1 MUX barındıran gelişmiş bir registerdır. Seçici pinler (S1, S0) ile birden fazla işlemi yapabilir:</p>
                                        <ul className="list-disc pl-5 text-sm mt-2 font-mono">
                                            <li>S1 S0 = 00 : Hold (Durumu Koru)</li>
                                            <li>S1 S0 = 01 : Shift Right (Sağa Kaydır)</li>
                                            <li>S1 S0 = 10 : Shift Left (Sola Kaydır)</li>
                                            <li>S1 S0 = 11 : Parallel Load (Paralel Yükle)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-[#163832] mb-4">Evrensel Shift Register Simülatörü</h3>
                                <RegisterVisualizer />
                            </div>
                        </section>
                    )}

                    {/* COUNTERS TAB */}
                    {activeTab === "counters" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Sayıcılar (Counters)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                <p>Sayıcılar, belirli bir olayın kaç kere gerçekleştiğini sayan donanımlardır. Temelde Asenkron (Ripple) ve Senkron (Synchronous) olarak ikiye ayrılırlar.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#F2F7F4] border border-[#DAF1DE] rounded-xl p-6">
                                        <h3 className="font-bold text-[#163832] text-lg mb-3">1. Ripple Counters (Asenkron)</h3>
                                        <p className="text-sm mb-3">Flip-Flop'lar aynı Clock sinyalini kullanmaz. Sadece ilk FF'e (LSB) clock verilir. Sonraki her FF'in clock girişi, bir önceki FF'in çıkışından (Q) alınır. Bu sebeple sinyal devrede dalgalanarak (ripple) ilerler.</p>
                                        <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm">
                                            <strong className="text-amber-800">Dezavantaj:</strong> Propagation Delay (Yayılma gecikmesi). Her FF'in gecikmesi birbirine eklenir. Büyük sayıcılarda hız çok düşer.
                                        </div>
                                    </div>
                                    
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                        <h3 className="font-bold text-blue-900 text-lg mb-3">2. Synchronous Counters (Senkron)</h3>
                                        <p className="text-sm mb-3">Tüm Flip-Flop'lar <strong>AYNI ANDA</strong> aynı Clock sinyali ile tetiklenir. Hangi FF'in durum değiştireceği, kapılarla (AND gates) belirlenir.</p>
                                        <div className="bg-white/50 border border-blue-100 rounded p-3 text-sm">
                                            <strong className="text-blue-800">Avantaj:</strong> Gecikme süresi (Propagation delay) her zaman sadece 1 FF kadardır. Çok daha hızlı çalışır.
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded-xl p-5 mt-6">
                                    <h3 className="font-bold text-[#163832] text-lg mb-2">Özel Sayıcılar</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-sm">
                                        <li><strong>MOD-16 Counter:</strong> 4-bitlik sayıcıdır (0'dan 15'e sayar).</li>
                                        <li><strong>BCD Counter (MOD-10):</strong> 0'dan 9'a kadar sayar. 9'dan sonra 10 (1010) olmak yerine kendini sıfırlar. 4 FF gerektirir ama sadece ilk 10 state'i kullanır.</li>
                                        <li><strong>Up-Down Counter:</strong> Bir kontrol pini ile (Up/Down) hem ileri hem geri sayabilen sayıcıdır. <em>(T Flip-Flop veya D Flip-Flop ile tasarlanabilir).</em></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* RING & JOHNSON TAB */}
                    {activeTab === "ring" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Ring ve Johnson Counters</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                
                                <div className="flex flex-col gap-6">
                                    <div className="border rounded-xl p-6 bg-slate-50">
                                        <h3 className="text-xl font-bold text-[#163832] mb-3">1. Ring Counter (Halka Sayıcı)</h3>
                                        <p className="mb-4">Son FF'in çıkışının (Q), ilk FF'in girişine bağlandığı bir <strong>Shift Register</strong> devresidir. Dairesel olarak aynı veriyi kaydırır.</p>
                                        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
                                            <li>Başlangıçta mutlaka <code>1000</code>, <code>0100</code> gibi içinde tek bir '1' olan değere initialize (preset) edilmelidir.</li>
                                            <li>N adet FF ile, <strong>N adet state</strong> oluşturur. (Örn 4 FF: 1000, 0100, 0010, 0001)</li>
                                        </ul>
                                    </div>

                                    <div className="border rounded-xl p-6 bg-slate-50">
                                        <h3 className="text-xl font-bold text-[#163832] mb-3">2. Johnson Counter (Switch-Tail Ring)</h3>
                                        <p className="mb-4">Ring sayıcıdan tek farkı: Son FF'in <strong>Ters (Inverted)</strong> çıkışının (Q'), ilk FF'in girişine bağlanmasıdır.</p>
                                        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
                                            <li>Başlangıçta <code>0000</code> olarak initialize edilebilir.</li>
                                            <li>Ters besleme sayesinde 1'ler dolar ve sonra 0'lar boşalır. (0000 &rarr; 1000 &rarr; 1100 &rarr; 1110 &rarr; 1111 &rarr; 0111 &rarr; 0011 ...)</li>
                                            <li>N adet FF ile, <strong>2N adet state</strong> oluşturur. (Örn 4 FF: 8 State)</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </section>
                    )}

                    {/* SOLVED QUESTIONS TAB */}
                    {activeTab === "solved" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Çözümlü Örnekler (Chapter 6 Solved Questions)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8">
                                
                                {/* Q1 */}
                                <div className="border border-[#DAF1DE] rounded-xl overflow-hidden">
                                    <div className="bg-[#F2F7F4] p-4 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 1: Shift Register İz Sürme (Trace)</h3>
                                        <p className="text-sm text-[#235347]">4-bitlik bir register'ın başlangıç değeri `0110`'dır. Seri giriş (Serial Input) dizisi `0011101` uygulanarak 7 kez sağa kaydırılırsa register içerikleri ne olur?</p>
                                    </div>
                                    <div className="p-5 font-mono text-sm bg-slate-50">
                                        <p className="mb-2 text-slate-500">Adım adım sağa kaydırma işlemi (En soldan girenler yeni biti temsil eder, en sağdaki bit dışarı düşer SO - Serial Output):</p>
                                        <ul className="space-y-1">
                                            <li>Başlangıç: <span className="font-bold text-[#163832] ml-4 bg-white px-2 rounded border">0 1 1 0</span></li>
                                            <li>1. Giriş (1): <span className="font-bold text-[#163832] ml-4 bg-white px-2 rounded border text-blue-600">1</span> 0 1 1</li>
                                            <li>2. Giriş (0): <span className="font-bold text-[#163832] ml-4 bg-white px-2 rounded border text-blue-600">0</span> 1 0 1</li>
                                            <li>3. Giriş (1): <span className="font-bold text-[#163832] ml-4 bg-white px-2 rounded border text-blue-600">1</span> 0 1 0</li>
                                            <li>4. Giriş (1): <span className="font-bold text-[#163832] ml-4 bg-white px-2 rounded border text-blue-600">1</span> 1 0 1</li>
                                            <li>5. Giriş (1): <span className="font-bold text-[#163832] ml-4 bg-white px-2 rounded border text-blue-600">1</span> 1 1 0</li>
                                            <li>6. Giriş (0): <span className="font-bold text-[#163832] ml-4 bg-white px-2 rounded border text-blue-600">0</span> 1 1 1</li>
                                            <li>7. Giriş (0): <span className="font-bold text-[#163832] ml-4 bg-white px-2 rounded border text-blue-600">0</span> 0 1 1</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Q2 */}
                                <div className="border border-[#DAF1DE] rounded-xl overflow-hidden">
                                    <div className="bg-[#F2F7F4] p-4 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 2: 2-bit Register Tasarımı</h3>
                                        <p className="text-sm text-[#235347]">2 adet D-FF ve 2 adet 4x1 MUX kullanılarak S1,S0 modlarına sahip register tasarlayınız. (00: No change, 01: Clear, 10: Complement, 11: Parallel Load)</p>
                                    </div>
                                    <div className="p-5 text-sm">
                                        <p className="mb-2"><strong>Çözüm Yöntemi:</strong> MUX'ların çıkışları doğrudan D-FF'lerin (FFA ve FFB) D girişlerine bağlanır. MUX'un seçici (select) uçlarına S1 ve S0 bağlanır.</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li><strong>Giriş 0 (00 - No change):</strong> D-FF'in kendi çıkışı (Q) MUX'un 0. pinine bağlanır. (A için A, B için B).</li>
                                            <li><strong>Giriş 1 (01 - Clear):</strong> MUX'un 1. pinine lojik `0` bağlanır.</li>
                                            <li><strong>Giriş 2 (10 - Complement):</strong> D-FF'in ters çıkışı (Q') MUX'un 2. pinine bağlanır. (A için A', B için B').</li>
                                            <li><strong>Giriş 3 (11 - Parallel Load):</strong> Dışarıdan gelen paralel data kabloları (I_A ve I_B) MUX'un 3. pinine bağlanır.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Q3 */}
                                <div className="border border-[#DAF1DE] rounded-xl overflow-hidden">
                                    <div className="bg-[#F2F7F4] p-4 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 3: BCD Ripple Counter (10'a gelince silinen)</h3>
                                        <p className="text-sm text-[#235347]">4-bit Ripple sayıcıyı asenkron clear ve bir NAND kapısı kullanarak `1010` (decimal 10) gördüğünde kendini sıfırlayacak şekilde tasarlayınız.</p>
                                    </div>
                                    <div className="p-5 text-sm">
                                        <p><strong>Çözüm Yöntemi:</strong><br/>
                                        Ripple counter normalde 0'dan 15'e sayar. Biz 1010 (Q3=1, Q2=0, Q1=1, Q0=0) state'ine ulaştığı anda devreyi sıfırlamak istiyoruz. <br/><br/>
                                        Flip-Flop'ların Asenkron Clear pinleri <strong>Active-Low</strong>'dur (Yani 0 gelirse sıfırlar). Bu yüzden `1010` değerini gördüğünde `0` üretecek bir NAND kapısına ihtiyacımız var. NAND kapısının girişlerine Q3 (1) ve Q1 (1) bağlanır. Q3 ve Q1 aynı anda 1 olduğunda NAND kapısı 0 üretir ve sayıcıyı anında temizler (Clear).
                                        </p>
                                    </div>
                                </div>

                                {/* Q4 */}
                                <div className="border border-[#DAF1DE] rounded-xl overflow-hidden">
                                    <div className="bg-[#F2F7F4] p-4 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 4: J-K Flip Flop ile Özel Sayıcı Tasarımı</h3>
                                        <p className="text-sm text-[#235347]">Sadece 0, 1, 2, 3, 4, 5, 6 sıralamasını tekrar eden bir sayıcıyı JK Flip-Flop kullanarak tasarlayınız.</p>
                                    </div>
                                    <div className="p-5 text-sm">
                                        <p><strong>Çözüm Yöntemi:</strong> (Bu soru senkron sayaç tasarımının en temel örneğidir).</p>
                                        <ol className="list-decimal pl-5 mt-2 space-y-2">
                                            <li>0'dan 6'ya kadar saymak için 3 Flip-Flop (A, B, C) gerekir. State Transition table oluşturulur. (Present State: 110 &rarr; Next State: 000).</li>
                                            <li>JK Flip-Flop'un <strong>Excitation Tablosu</strong> (Uyarma Tablosu) kullanılarak her state geçişi için J_A, K_A, J_B, K_B, J_C, K_C değerleri bulunur. (Örn: Q=0 &rarr; Q+=1 için J=1, K=X).</li>
                                            <li>111 durumu unused (kullanılmayan) state olduğu için Next state çıkışlarına X (Don't care) yazılır.</li>
                                            <li>Her JK pini için ayrı bir K-Map (Karnaugh Haritası) çizilerek denklemler çıkarılır:
                                                <ul className="list-disc pl-5 mt-1 font-mono">
                                                    <li>J_A = B C</li>
                                                    <li>K_A = B</li>
                                                    <li>J_B = C</li>
                                                    <li>K_B = A + C</li>
                                                    <li>J_C = A' + B'</li>
                                                    <li>K_C = 1</li>
                                                </ul>
                                            </li>
                                        </ol>
                                    </div>
                                </div>

                            </div>
                        </section>
                    )}

                </div>
            </div>
        </div>
    );
}
