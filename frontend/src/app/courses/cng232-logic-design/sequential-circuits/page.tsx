"use strict";
"use client";

import React, { useState } from "react";
import { Cpu, MemoryStick, Activity, Zap, Info, Clock, AlertTriangle, PenTool, LayoutTemplate, Network, Layers, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FlipFlopVisualizer } from "@/components/visualizers/logic/FlipFlopVisualizer";

export default function SequentialCircuitsPage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-4 sm:p-8 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col gap-10">
                
                {/* Header */}
                <header className="border-b border-slate-300 pb-6">
                    <div className="flex items-center gap-3 text-[#051F20] mb-2">
                        <Cpu className="w-10 h-10 text-[#235347]" />
                        <h1 className="text-3xl font-extrabold tracking-tight">CNG 232</h1>
                    </div>
                    <h2 className="text-lg font-semibold text-[#235347] flex items-center gap-2 mt-1">
                        <MemoryStick className="w-5 h-5" /> 
                        5. Ardışıl Devreler (Sequential Circuits)
                    </h2>
                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                        <AlertOctagon className="w-6 h-6 text-amber-600 flex-shrink-0" />
                        <p className="text-sm text-amber-900 font-medium leading-relaxed">
                            <strong>Sınav Öncesi Kritik Uyarı:</strong> Bu bölüm ODTÜ sınavlarının merkezini oluşturur. Sadece combinational devreleri anlamak yetmez; zamanın (clock) ve geçmişin (memory) devre üzerindeki etkisini çok iyi analiz etmelisiniz. Özellikle "Master-Slave" yapısı, "Setup/Hold Time" kuralları ve "Uyarma Tabloları (Excitation Tables)" teorik sorularda hayat kurtarır.
                        </p>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap bg-white rounded-2xl shadow-sm border border-slate-200 p-2 gap-2">
                    {[
                        { id: "overview", label: "Giriş ve Kavramlar", icon: <Info className="w-4 h-4" /> },
                        { id: "latches", label: "Latches (Tutucular)", icon: <Activity className="w-4 h-4" /> },
                        { id: "flipflops", label: "Flip-Flops (Kenar Tetiklemeli)", icon: <Clock className="w-4 h-4" /> },
                        { id: "analysis", label: "Mealy/Moore ve Analiz", icon: <Zap className="w-4 h-4" /> },
                        { id: "reduction", label: "State Reduction (İndirgeme)", icon: <LayoutTemplate className="w-4 h-4" /> },
                        { id: "design", label: "Uyarma Tabloları ve Tasarım", icon: <PenTool className="w-4 h-4" /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all",
                                activeTab === tab.id 
                                    ? "bg-[#235347] text-white shadow-md" 
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Ardışıl Devre (Sequential Circuit) Nedir?</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6 text-lg">
                                <p>
                                    Bileşik (Combinational) devrelerde çıkış sadece o anki girişlere bağlıdır. Ardışıl (Sequential) devreler ise <strong>Memory (Bellek/Hafıza)</strong> elemanları içerir. Çıkışlar, mevcut girişlerin yanı sıra <strong>geçmiş aktivitelere (past activity)</strong> yani devrenin o anki <em>Durumuna (State)</em> bağlıdır.
                                </p>
                                
                                <div className="bg-[#F2F7F4] border border-[#DAF1DE] rounded-2xl p-8 mt-6">
                                    <h3 className="font-bold text-[#163832] text-xl mb-4">Senkron vs Asenkron</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-white p-5 rounded-xl border border-[#DAF1DE]/50">
                                            <h4 className="font-bold text-[#235347] mb-3 flex items-center gap-2 text-lg"><Activity className="w-5 h-5"/> Asenkron Devreler</h4>
                                            <p className="text-base text-slate-600">Davranış, sinyallerin sürekli zamanlı (continuous time) değişimine bağlıdır. Girişteki en ufak değişim anında tüm devreyi tetikler. Karmaşık sistemlerde zamanlama hatası (race condition) çok yaşanır. Tasarımı çok zordur.</p>
                                        </div>
                                        <div className="bg-white p-5 rounded-xl border border-[#DAF1DE]/50 shadow-sm border-l-4 border-l-[#235347]">
                                            <h4 className="font-bold text-[#235347] mb-3 flex items-center gap-2 text-lg"><Clock className="w-5 h-5 text-emerald-600"/> Senkron Devreler</h4>
                                            <p className="text-base text-slate-600">Endüstri standardıdır. Davranış, sadece belirli ayrık zaman dilimlerinde değişir. Bunu sağlayan şey <strong>Clock (Saat)</strong> sinyalidir. Tüm bellek elemanları sadece clock vurduğunda (pulse) senkronize olarak güncellenir.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* LATCHES TAB */}
                    {activeTab === "latches" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Latches (Tutucular)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                <p>Latch'ler asenkron bellek yapıtaşlarıdır. Çapraz bağlı kapılarla (feedback loop) oluşurlar ve gücü kesmediğiniz sürece bilgiyi "sonsuza kadar" tutarlar.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                                        <h3 className="font-bold text-indigo-900 text-xl mb-3">1. NOR Tabanlı SR Latch</h3>
                                        <p className="text-base mb-3">Girişler: <strong>S (Set)</strong> ve <strong>R (Reset)</strong>. Active-High (1 ile aktif) çalışır.</p>
                                        <ul className="list-disc pl-5 text-base space-y-1 text-slate-700">
                                            <li><code className="bg-white px-1">S=1, R=0</code> &rarr; Set (Q=1)</li>
                                            <li><code className="bg-white px-1">S=0, R=1</code> &rarr; Reset (Q=0)</li>
                                            <li><code className="bg-white px-1">S=0, R=0</code> &rarr; Hold (Eski durumu koru)</li>
                                            <li><code className="bg-white px-1 text-rose-600 font-bold">S=1, R=1</code> &rarr; Invalid (Geçersiz). Q ve Q' aynı anda 0 olmaya çalışır.</li>
                                        </ul>
                                    </div>
                                    <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                                        <h3 className="font-bold text-indigo-900 text-xl mb-3">2. NAND Tabanlı S'R' Latch</h3>
                                        <p className="text-base mb-3">Sınavlarda kafa karıştırmak için sıkça sorulur. <strong>Active-Low (0 ile aktif)</strong> çalışır!</p>
                                        <ul className="list-disc pl-5 text-base space-y-1 text-slate-700">
                                            <li><code className="bg-white px-1">S=0, R=1</code> &rarr; Set (Q=1)</li>
                                            <li><code className="bg-white px-1">S=1, R=0</code> &rarr; Reset (Q=0)</li>
                                            <li><code className="bg-white px-1">S=1, R=1</code> &rarr; Hold (Eski durumu koru)</li>
                                            <li><code className="bg-white px-1 text-rose-600 font-bold">S=0, R=0</code> &rarr; Invalid (Geçersiz). Q ve Q' aynı anda 1 olmaya çalışır.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#235347] text-xl mb-3 mt-4">3. D Latch ve Şeffaflık Problemi (Transparency Problem)</h3>
                                    <p className="text-base mb-4">SR Latch'teki geçersiz durumu çözmek için, S'ye "D" verilirken, R'ye "D'nin değili" bağlanır. Bir de sistemi kontrol etmek için "Enable (C)" pini eklenir.</p>
                                    
                                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
                                        <AlertTriangle className="w-10 h-10 text-rose-600 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-rose-900 text-lg mb-2">Level-Triggered (Şeffaflık) Sorunu</h4>
                                            <p className="text-base text-rose-800">
                                                D Latch <strong>seviye duyarlıdır (Level-Triggered)</strong>. Yani Enable (C) sinyali "1" olduğu sürece kapılar tamamen "şeffaf"tır; girişte (D) olan her değişim saniyesinde çıkışa (Q) yansır.
                                                <br/><br/>
                                                Eğer bu Latch'in çıkışı alıp tekrar kendi girişine (veya önündeki devrenin girişine) geri beslenirse (feedback), Enable=1 kaldığı süre boyunca sinyal sürekli kendi etrafında döner (Oscillatory Behavior) ve sonucun ne çıkacağı öngörülemez (unreliable state). <strong>Kural:</strong> Asenkron bir Latch'in çıkışı, doğrudan geri beslenemez!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* FLIP-FLOPS TAB */}
                    {activeTab === "flipflops" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Flip-Flops ve Master-Slave Mimarisi</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                
                                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                                    <h3 className="font-bold text-blue-900 text-xl mb-3 flex items-center gap-2">
                                        <Layers className="w-6 h-6"/> Şeffaflığın Çözümü: Master-Slave D Flip-Flop
                                    </h3>
                                    <p className="text-base text-blue-800 mb-4">
                                        Latch'lerdeki geri besleme (şeffaflık) sorununu çözmek için sinyali kapıda "kitlememiz" gerekir. Bunun için <strong>iki adet D-Latch seri olarak birbirine bağlanır</strong>.
                                    </p>
                                    <ul className="list-disc pl-5 text-base text-blue-900 font-medium space-y-2">
                                        <li>Birinci Latch'e <strong>Master (Usta)</strong>, ikinciye <strong>Slave (Köle)</strong> denir.</li>
                                        <li>Master'ın saat (clock) girişi normalken, Slave'in saat girişi <strong>NOT (Değil)</strong> kapısıyla terslenir.</li>
                                        <li>Clock=1 olduğunda: Master şeffaftır (girişi alır) ama Slave kapalıdır. (Sinyal dışarı sızamaz).</li>
                                        <li>Clock=0 olduğunda: Master kilitlenir (giriş almayı bırakır), Slave şeffaflaşır ve Master'ın içindeki değeri çıkışa aktarır.</li>
                                        <li><strong>Sonuç: Edge-Triggered (Kenar Tetiklemeli)</strong>. Çıkış sadece ve sadece Clock sinyali 1'den 0'a (Negative Edge) veya 0'dan 1'e (Positive Edge) geçerken güncellenir.</li>
                                    </ul>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="border border-slate-200 rounded-2xl p-6">
                                        <h4 className="font-bold text-[#163832] border-b pb-2 mb-3">JK Flip-Flop</h4>
                                        <p className="text-base mb-3">SR'daki geçersiz durumu çözer. Her ikisi de 1 ise çıkışı tersler (Toggle).</p>
                                        <ul className="text-sm list-disc pl-5 text-slate-600 mb-4 space-y-1">
                                            <li>J=0, K=0 &rarr; Hold</li>
                                            <li>J=1, K=0 &rarr; Set</li>
                                            <li>J=0, K=1 &rarr; Reset</li>
                                            <li>J=1, K=1 &rarr; Toggle (Q' olur)</li>
                                        </ul>
                                        <code className="text-base bg-[#F2F7F4] text-[#235347] font-bold block p-3 rounded-lg text-center">Q(t+1) = JQ' + K'Q</code>
                                    </div>
                                    <div className="border border-slate-200 rounded-2xl p-6">
                                        <h4 className="font-bold text-[#163832] border-b pb-2 mb-3">T (Toggle) Flip-Flop</h4>
                                        <p className="text-base mb-3">JK'nın J ve K uçlarının kısa devre edilip tek bir pin (T) yapılmasıyla oluşur.</p>
                                        <ul className="text-sm list-disc pl-5 text-slate-600 mb-4 space-y-1">
                                            <li>T=0 &rarr; Hold (Aynı kal)</li>
                                            <li>T=1 &rarr; Toggle (Tersini al)</li>
                                        </ul>
                                        <code className="text-base bg-[#F2F7F4] text-[#235347] font-bold block p-3 rounded-lg text-center mt-9">Q(t+1) = T ⊕ Q</code>
                                    </div>
                                </div>

                                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-4">
                                    <h3 className="font-bold text-amber-900 text-lg mb-2">Zamanlama Kısıtlamaları (Sınav Konusu)</h3>
                                    <ul className="space-y-3 text-base text-amber-800">
                                        <li><strong>Setup Time (t<sub>s</sub>):</strong> Clock sinyalinin tetikleme anından (kenarından) <em>önce</em> verinin (D) stabil kalması gereken minimum süredir. Veri bu sürede değişirse sinyal doğru kaydedilemez.</li>
                                        <li><strong>Hold Time (t<sub>h</sub>):</strong> Clock sinyali tetiklendikten <em>sonra</em> verinin stabil kalmaya devam etmesi gereken minimum süredir.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ANALYSIS TAB */}
                    {activeTab === "analysis" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Devre Analizi: Moore ve Mealy Modelleri</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                
                                <p>Bir ardışıl devre analiz edilirken temel amaç, kapı ve kablo yığınına bakarak o devrenin "State Table" (Durum Tablosu) ve "State Diagram"ını (Durum Diyagramı) çıkarmaktır. Önce devrenin hangi modele ait olduğunu anlamak gerekir:</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="border-2 border-blue-200 rounded-2xl p-6 bg-blue-50">
                                        <h3 className="text-2xl font-bold text-blue-900 mb-3">Moore Makinesi</h3>
                                        <p className="mb-4 text-base text-blue-800">Çıkışlar <strong>SADECE</strong> mevcut durumlara (Flip-Flop çıkışlarına) bağlıdır. Girişlerin (X) çıkış üzerinde doğrudan, anlık bir etkisi yoktur.</p>
                                        <ul className="list-disc pl-5 text-base space-y-2 text-blue-900 font-medium">
                                            <li>Output Denklemi: <code className="bg-white px-2 py-1 rounded">Z = f(Q)</code> (İçinde X harfi geçemez!)</li>
                                            <li>Çıkışlar senkrondur, clock ile değişir.</li>
                                            <li>State Diagram'da: Çıkış doğrudan dairenin içine yazılır. Örn: <code className="bg-white px-2 py-1 rounded">S0 / 1</code>.</li>
                                        </ul>
                                    </div>
                                    <div className="border-2 border-purple-200 rounded-2xl p-6 bg-purple-50">
                                        <h3 className="text-2xl font-bold text-purple-900 mb-3">Mealy Makinesi</h3>
                                        <p className="mb-4 text-base text-purple-800">Çıkışlar hem mevcut duruma (Q) <strong>HEM DE girişlere (X)</strong> bağlıdır. Giriş aniden değişirse, clock'u beklemeden çıkış aniden değişebilir.</p>
                                        <ul className="list-disc pl-5 text-base space-y-2 text-purple-900 font-medium">
                                            <li>Output Denklemi: <code className="bg-white px-2 py-1 rounded">Z = f(Q, X)</code></li>
                                            <li>Çıkış asenkron bir tepki verebilir (False output riski vardır).</li>
                                            <li>State Diagram'da: Çıkışlar daireye değil, okların (transition) üzerine yazılır. Örn: <code className="bg-white px-2 py-1 rounded">0 / 1</code>.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-[#F2F7F4] border border-[#DAF1DE] rounded-2xl p-6">
                                    <h3 className="font-bold text-[#163832] text-xl mb-4">Adım Adım Devre Analizi</h3>
                                    <ol className="list-decimal pl-5 space-y-3 text-base">
                                        <li><strong>Giriş Denklemlerini (State Equations) Çıkarma:</strong> Lojik diyagrama bakarak her bir Flip-Flop'un girişine (D, J, K veya T pini) gelen formül yazılır. (Örn: <code>D<sub>A</sub> = A·X + B·X</code>)</li>
                                        <li><strong>Çıkış Denklemini Bulma:</strong> Dışarı giden çıkış pini (Z, Y vb.) formüle edilir. Eğer formülde X (devre girişi) varsa, devre "Mealy" dir.</li>
                                        <li><strong>Durum Tablosu (State Table):</strong> Çıkarılan denklemler kullanılarak her Present State ve Input kombinasyonu için "Next State" (Q(t+1)) ve "Output" hesaplanıp tabloya dökülür. (Mealy ise Output kısmı Input'a göre ikiye bölünür, Moore ise Output tek bir sütundur).</li>
                                        <li><strong>Durum Diyagramı (State Diagram):</strong> Tablodaki veriler daireler (state) ve yönlü oklar (transition) ile haritalandırılır.</li>
                                    </ol>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* REDUCTION TAB */}
                    {activeTab === "reduction" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">State Reduction & Assignment</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                
                                <div>
                                    <h3 className="text-xl font-bold text-[#235347] mb-3">State Reduction (Durum İndirgeme)</h3>
                                    <p className="mb-4">Eğer bir State Diagram'da gereksiz (fazladan) state'ler varsa, fazladan Flip-Flop kullanmamıza sebep olabilir. İki state'in (örneğin a ve b) <strong>eşdeğer (equivalent)</strong> olabilmesi için kural çok nettir:</p>
                                    <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl font-medium text-emerald-900 text-base mb-4">
                                        1. Her giriş kombinasyonu için aynı çıkışı (Output) vermelidirler.<br/>
                                        2. Her giriş kombinasyonu için gidecekleri "Next State"ler aynı olmalı veya zaten eşdeğer oldukları bilinen state'ler olmalıdır.
                                    </div>
                                    <p className="text-base">Bu işlem Durum Tablosu üzerinde satır satır taranarak iteratif olarak yapılır. Aynı satıra sahip state'ler tespit edilir, biri silinir ve tabloda silinenin yerine kalan yazılır.</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#235347] mb-4 border-t border-slate-100 pt-6">State Assignment (Durum Atama)</h3>
                                    <p className="mb-4">İndirgeme bittikten sonra kalan harf (a, b, c) şeklindeki durumlara donanımın anlayacağı 1 ve 0'ları atamamız gerekir. 3 farklı popüler yöntem vardır:</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                        <div className="border border-slate-200 rounded-2xl p-5 shadow-sm">
                                            <h4 className="font-bold text-[#163832] border-b pb-2 mb-3">Binary (İkili)</h4>
                                            <p className="text-sm mb-3">Sırayla artan atama (00, 01, 10, 11). En az sayıda FF kullanır ancak çok bit değiştiği için güç tüketimi fazladır.</p>
                                            <code className="text-xs bg-slate-100 p-1 rounded">S0: 00, S1: 01, S2: 10</code>
                                        </div>
                                        <div className="border border-slate-200 rounded-2xl p-5 shadow-sm bg-slate-50">
                                            <h4 className="font-bold text-[#163832] border-b pb-2 mb-3">Gray Code</h4>
                                            <p className="text-sm mb-3">Ardışık durumlar arasında <strong>sadece 1 bit değişir</strong> (00, 01, 11, 10). Elektriksel gürültüyü ve gecikmeyi önler. K-Map ile doğrudan uyumludur.</p>
                                            <code className="text-xs bg-slate-100 p-1 rounded">S0: 00, S1: 01, S2: 11</code>
                                        </div>
                                        <div className="border border-slate-200 rounded-2xl p-5 shadow-sm">
                                            <h4 className="font-bold text-[#163832] border-b pb-2 mb-3">One-Hot</h4>
                                            <p className="text-sm mb-3">Her bir durum için 1 adet FF atanır ve sadece o durumun FF'si '1' olur. Donanım maliyeti yüksektir (çok FF) ama kodlaması (design equations) inanılmaz basittir.</p>
                                            <code className="text-xs bg-slate-100 p-1 rounded">S0: 001, S1: 010, S2: 100</code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* DESIGN EXAMPLES TAB */}
                    {activeTab === "design" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Tasarım Prosedürü ve Uyarma Tabloları</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                
                                <div className="bg-[#163832] text-white p-6 rounded-2xl shadow-md">
                                    <h3 className="font-bold text-xl mb-3 text-emerald-400">Genel Tasarım Adımları</h3>
                                    <ol className="list-decimal pl-5 space-y-2 text-base text-slate-100 font-medium">
                                        <li>Şartnameyi anlayıp <strong>State Diagram</strong>'ı çiz (Mealy mi Moore mu belirle).</li>
                                        <li>State Diagram'ı <strong>State Table</strong>'a (Durum Tablosu) dönüştür.</li>
                                        <li>Gerekiyorsa State Reduction (İndirgeme) yap.</li>
                                        <li>Durumlara 0,1 değerlerini (State Assignment) ata.</li>
                                        <li>Kullanılacak FF tipine (D, JK, T) karar verip <strong>Uyarma Tablolarını</strong> kullanarak FF giriş (Input) denklemlerini bul (K-Map ile).</li>
                                        <li>Çıkış denklemini bul ve Lojik diyagramı çiz.</li>
                                    </ol>
                                </div>

                                <div className="border-2 border-amber-200 bg-amber-50 rounded-2xl p-6">
                                    <h3 className="text-2xl font-bold text-amber-900 mb-4 text-center">Excitation Tables (Uyarma Tabloları)</h3>
                                    <p className="text-base text-amber-800 mb-6 text-center font-medium">
                                        Tasarım yaparken elimizde Present State (Q) ve gitmek istediğimiz Next State (Q(t+1)) vardır. 
                                        Bu geçişi sağlamak için <strong>FF giriş pinlerine hangi değeri vermemiz gerektiğini</strong> Uyarma Tabloları söyler!
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* D FF */}
                                        <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
                                            <div className="bg-amber-100 p-2 font-bold text-center text-amber-900">D Flip-Flop</div>
                                            <table className="w-full text-center text-sm border-collapse">
                                                <thead><tr className="border-b"><th className="p-2 border-r">Q &rarr; Q+</th><th className="p-2">D</th></tr></thead>
                                                <tbody>
                                                    <tr className="border-b"><td className="p-2 border-r text-slate-500">0 &rarr; 0</td><td className="p-2 font-bold">0</td></tr>
                                                    <tr className="border-b"><td className="p-2 border-r text-slate-500">0 &rarr; 1</td><td className="p-2 font-bold">1</td></tr>
                                                    <tr className="border-b"><td className="p-2 border-r text-slate-500">1 &rarr; 0</td><td className="p-2 font-bold">0</td></tr>
                                                    <tr><td className="p-2 border-r text-slate-500">1 &rarr; 1</td><td className="p-2 font-bold">1</td></tr>
                                                </tbody>
                                            </table>
                                            <div className="bg-amber-50 p-2 text-xs text-center border-t border-amber-200">D = Q+ (En kolayı)</div>
                                        </div>

                                        {/* JK FF */}
                                        <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
                                            <div className="bg-amber-100 p-2 font-bold text-center text-amber-900">JK Flip-Flop</div>
                                            <table className="w-full text-center text-sm border-collapse">
                                                <thead><tr className="border-b"><th className="p-2 border-r">Q &rarr; Q+</th><th className="p-2 border-r">J</th><th className="p-2">K</th></tr></thead>
                                                <tbody>
                                                    <tr className="border-b"><td className="p-2 border-r text-slate-500">0 &rarr; 0</td><td className="p-2 font-bold text-[#235347]">0</td><td className="p-2 text-rose-500 font-bold">X</td></tr>
                                                    <tr className="border-b"><td className="p-2 border-r text-slate-500">0 &rarr; 1</td><td className="p-2 font-bold text-[#235347]">1</td><td className="p-2 text-rose-500 font-bold">X</td></tr>
                                                    <tr className="border-b"><td className="p-2 border-r text-slate-500">1 &rarr; 0</td><td className="p-2 text-rose-500 font-bold border-r">X</td><td className="p-2 font-bold text-[#235347]">1</td></tr>
                                                    <tr><td className="p-2 border-r text-slate-500">1 &rarr; 1</td><td className="p-2 text-rose-500 font-bold border-r">X</td><td className="p-2 font-bold text-[#235347]">0</td></tr>
                                                </tbody>
                                            </table>
                                            <div className="bg-amber-50 p-2 text-xs text-center border-t border-amber-200">X = Don't Care (Çok faydalı!)</div>
                                        </div>

                                        {/* T FF */}
                                        <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
                                            <div className="bg-amber-100 p-2 font-bold text-center text-amber-900">T Flip-Flop</div>
                                            <table className="w-full text-center text-sm border-collapse">
                                                <thead><tr className="border-b"><th className="p-2 border-r">Q &rarr; Q+</th><th className="p-2">T</th></tr></thead>
                                                <tbody>
                                                    <tr className="border-b"><td className="p-2 border-r text-slate-500">0 &rarr; 0</td><td className="p-2 font-bold">0</td></tr>
                                                    <tr className="border-b"><td className="p-2 border-r text-slate-500">0 &rarr; 1</td><td className="p-2 font-bold text-[#235347]">1</td></tr>
                                                    <tr className="border-b"><td className="p-2 border-r text-slate-500">1 &rarr; 0</td><td className="p-2 font-bold text-[#235347]">1</td></tr>
                                                    <tr><td className="p-2 border-r text-slate-500">1 &rarr; 1</td><td className="p-2 font-bold">0</td></tr>
                                                </tbody>
                                            </table>
                                            <div className="bg-amber-50 p-2 text-xs text-center border-t border-amber-200">T = Değişim var mı? (Evet:1, Hayır:0)</div>
                                        </div>
                                    </div>
                                    <p className="text-sm mt-4 text-amber-900 font-medium">
                                        * Yukarıdaki tabloları State Table'ınızın yanına ek sütunlar açarak (J_A, K_A, T_B vb.) kopyalayın, ardından K-Map ile sadece o sütunları haritalandırın.
                                    </p>
                                </div>

                            </div>
                        </section>
                    )}

                    {/* VISUALIZER (Shown in both Latches and FlipFlops tabs) */}
                    {(activeTab === "latches" || activeTab === "flipflops") && (
                        <div className="mt-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in">
                            <h3 className="text-xl font-bold text-[#163832] mb-4 flex items-center gap-2">
                                <Cpu className="w-6 h-6 text-[#235347]"/> Etkileşimli Donanım Simülatörü
                            </h3>
                            <FlipFlopVisualizer />
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
                                <p className="text-sm text-slate-700 leading-relaxed text-center font-medium">
                                    Simülatör üzerinden devreyi değiştirerek Latch (Seviye Duyarlı/Asenkron) ve Flip-Flop (Kenar Tetiklemeli/Senkron) davranış farklarını inceleyin. Saat (Clock) sinyalinin sadece pozitif kenarlarında (yukarı ok) verinin nasıl kilitlendiğini gözlemleyin.
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
