"use strict";
"use client";

import React, { useState } from "react";
import { Cpu, Zap, Info, Clock, AlertTriangle, PenTool, LayoutTemplate, Activity, AlertOctagon, Repeat, Table, ListChecks, CheckCircle2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AsynchronousCircuitsPage() {
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
                        <Zap className="w-5 h-5" /> 
                        9. Asenkron Devreler (Asynchronous Sequential Circuits)
                    </h2>
                    <div className="mt-4 bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3">
                        <AlertOctagon className="w-6 h-6 text-rose-600 flex-shrink-0" />
                        <p className="text-sm text-rose-900 font-medium leading-relaxed">
                            <strong>Sınav Öncesi Kritik Uyarı:</strong> Asenkron devrelerde <em>Saat (Clock) yoktur!</em> Bu yüzden tasarımlar son derece hassastır ve sinyallerdeki mikro saniyelik gecikmeler (delay) bile devrenin yanlış duruma gitmesine sebep olabilir. Sınavlarda genellikle "Race Condition (Yarış Durumu)" analizi, "Flow Table (Akış Tablosu)" oluşturma ve "Stable/Unstable State" tespiti soruları ağırlıktadır. 
                        </p>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap bg-white rounded-2xl shadow-sm border border-slate-200 p-2 gap-2">
                    {[
                        { id: "overview", label: "Giriş & Fundamental Mode", icon: <Info className="w-4 h-4" /> },
                        { id: "tables", label: "Transition & Flow Tabloları", icon: <Table className="w-4 h-4" /> },
                        { id: "race", label: "Yarış (Race) & Döngü (Cycle)", icon: <AlertTriangle className="w-4 h-4" /> },
                        { id: "latch", label: "S-R Latch ile Tasarım", icon: <LayoutTemplate className="w-4 h-4" /> },
                        { id: "solved", label: "Çözümlü Sorular (Adım Adım)", icon: <ListChecks className="w-4 h-4" /> }
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
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Asenkron Devre Kavramları</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6 text-lg">
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                                        <Clock className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-100 opacity-50" />
                                        <h3 className="font-bold text-[#235347] mb-3 text-xl">Senkron Devreler</h3>
                                        <p className="text-base text-slate-600 mb-4">Clock (Saat) sinyali vardır. Flip-Flop'lar kullanılır. Tüm sistem belirli aralıklarla (saat vurduğunda) hep birlikte durum değiştirir. Tasarımı daha kolay ve güvenlidir.</p>
                                    </div>
                                    <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                                        <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-rose-100 opacity-50" />
                                        <h3 className="font-bold text-rose-900 mb-3 text-xl">Asenkron Devreler</h3>
                                        <p className="text-base text-rose-800 mb-4">Clock (Saat) sinyali YOKTUR. Saatli Flip-Flop yerine saf Latch'ler veya gecikmeli geribeslemeler (feedback) kullanılır. Durum değişimi, dışarıdan gelen bir <strong>giriş (input) değiştiği anda</strong> hemen gerçekleşir.</p>
                                        <p className="text-sm font-bold text-rose-900 mt-2">Avantaj: Saati beklemediği için çok hızlıdır. <br/>Dezavantaj: İstikrarsızlığa (instability) çok müsaittir.</p>
                                    </div>
                                </div>

                                <div className="bg-[#F2F7F4] border border-[#DAF1DE] rounded-2xl p-6 shadow-sm">
                                    <h3 className="font-bold text-[#163832] mb-3 flex items-center gap-2 text-xl">
                                        <ShieldAlert className="w-6 h-6 text-emerald-600"/> Fundamental Mode (Temel Çalışma Modu)
                                    </h3>
                                    <p className="text-base text-slate-700 mb-4">Asenkron devrelerin çıldırmadan düzgün çalışabilmesi için <strong>Fundamental Mode</strong> kuralına uyması beklenir. Bu kuralın iki katı şartı vardır:</p>
                                    <ul className="list-disc pl-5 text-base space-y-2 text-[#163832] font-medium bg-white p-4 rounded-xl border border-emerald-100">
                                        <li>Dış giriş sinyalleri (x1, x2 vb.) <strong>sadece teker teker (one at a time)</strong> değişebilir.</li>
                                        <li>Giriş sinyallerinden biri değiştikten sonra, devre kendi içinde tamamen tepki verip <strong>Stable (Kararlı) bir duruma gelmeden</strong> başka bir giriş kesinlikle değiştirilemez!</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#163832] text-xl mt-8 mb-3">Total State ve Stability (Kararlılık)</h3>
                                    <p className="text-base text-slate-700 mb-3">
                                        Asenkron sistemlerde devrenin nerede olduğunu tanımlamak için <strong>Total State (Toplam Durum)</strong> kullanılır. Total State = İç Durum (y) + Giriş (x) kombinasyonudur.
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                                        <div className="flex-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
                                            <h4 className="font-bold text-emerald-900 mb-2">Stable (Kararlı) Durum</h4>
                                            <p className="text-sm text-slate-600">Devrenin "Şu anki durumu" ile hesapladığı "Bir sonraki durumu" AYNI ise devre kararlıdır. Yani <code className="bg-emerald-50 text-emerald-700 px-1 font-bold">y = Y</code> ise devre artık değişmez, bekler.</p>
                                        </div>
                                        <div className="flex-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-rose-500">
                                            <h4 className="font-bold text-rose-900 mb-2">Unstable (Kararsız) Durum</h4>
                                            <p className="text-sm text-slate-600">Devrenin hesapladığı bir sonraki durum, şu anki durumundan FARKLI ise devre kararsızdır. Yani <code className="bg-rose-50 text-rose-700 px-1 font-bold">y ≠ Y</code> ise devre mecburen state değiştirecektir (Transition).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* TRANSITION & FLOW TABLES TAB */}
                    {activeTab === "tables" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Transition ve Flow Tabloları</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                <p>
                                    Senkron devrelerde State Table kullanırdık. Asenkron devrelerde ise bunun yerine <strong>Transition Table</strong> ve <strong>Flow Table</strong> ikilisini kullanırız. Temel fark, asenkron tablolarda saatin olmaması ve devrenin anlık olarak kararlı durum (Stable State) arayışıdır.
                                </p>

                                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="bg-slate-50 p-5 border-b border-slate-200">
                                        <h3 className="font-bold text-indigo-900 text-xl">Transition Table (Geçiş Tablosu)</h3>
                                    </div>
                                    <div className="p-6 text-base space-y-4">
                                        <p className="text-sm text-slate-600">Bu tablo K-Map yapısına benzer. Satırlar mevcut durumu (y), sütunlar ise girişleri (x) temsil eder. Hücrelerin içindeki değerler ise Sonraki Durumu (Y) gösterir.</p>
                                        
                                        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-xl border border-slate-200">
                                            <div className="flex-1">
                                                <h4 className="font-bold text-[#163832] mb-2 text-center">Örnek Transition Table</h4>
                                                <table className="w-full text-center border-collapse">
                                                    <thead>
                                                        <tr className="text-xs text-slate-500">
                                                            <th className="border-b border-r p-2">y1 y2 \ x</th>
                                                            <th className="border-b p-2">0</th>
                                                            <th className="border-b p-2">1</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="font-mono text-lg text-slate-800">
                                                        <tr>
                                                            <td className="border-r border-b text-xs text-slate-500 font-bold p-2">0 0</td>
                                                            <td className="border border-slate-200 p-2 bg-emerald-50"><span className="inline-block border-2 border-emerald-500 rounded-full px-2 text-emerald-700 font-bold">00</span></td>
                                                            <td className="border border-slate-200 p-2 text-slate-400">01</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border-r border-b text-xs text-slate-500 font-bold p-2">0 1</td>
                                                            <td className="border border-slate-200 p-2 text-slate-400">00</td>
                                                            <td className="border border-slate-200 p-2 bg-emerald-50"><span className="inline-block border-2 border-emerald-500 rounded-full px-2 text-emerald-700 font-bold">01</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border-r border-b text-xs text-slate-500 font-bold p-2">1 1</td>
                                                            <td className="border border-slate-200 p-2 bg-emerald-50"><span className="inline-block border-2 border-emerald-500 rounded-full px-2 text-emerald-700 font-bold">11</span></td>
                                                            <td className="border border-slate-200 p-2 bg-emerald-50"><span className="inline-block border-2 border-emerald-500 rounded-full px-2 text-emerald-700 font-bold">11</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border-r text-xs text-slate-500 font-bold p-2">1 0</td>
                                                            <td className="border border-slate-200 p-2 text-slate-400">00</td>
                                                            <td className="border border-slate-200 p-2 bg-emerald-50"><span className="inline-block border-2 border-emerald-500 rounded-full px-2 text-emerald-700 font-bold">10</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="flex-1 bg-[#F2F7F4] p-5 rounded-lg text-sm text-[#163832] font-medium border border-[#DAF1DE]">
                                                <ul className="space-y-3">
                                                    <li><strong>Yuvarlak İçi (Stable):</strong> Eğer hücre içindeki değer (Y), satırın başındaki değerle (y) aynıysa, orası "Kararlı"dır ve yuvarlak (circle) içine alınır. </li>
                                                    <li><strong>Örnek Okuma:</strong> Devre (y=00) durumunda, dışarıdan x=1 gelirse hedefi (Y=01) olur. Bu değer satır başından (00) farklı olduğu için Unstable'dır. Devre hızla (y=01) satırına atlar. O satırda x=1 sütunu 01 (Stable) olduğu için devre orada durur ve bekler.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mt-6">
                                    <div className="bg-slate-50 p-5 border-b border-slate-200">
                                        <h3 className="font-bold text-indigo-900 text-xl">Flow Table (Akış Tablosu)</h3>
                                    </div>
                                    <div className="p-6 text-base space-y-4">
                                        <p className="text-sm text-slate-600">Flow Table, Transition Table'ın 0 ve 1'lerden arındırılmış, <strong>sembolik (harflerle)</strong> gösterilmiş halidir. İnsanın okumasını ve anlamasını kolaylaştırır. `00 -&gt; a`, `01 -&gt; b` gibi atamalar yapılır.</p>
                                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900 text-sm">
                                            <strong>Primitive Flow Table:</strong> Eğer bir akış tablosunun <em>her bir satırında sadece ve sadece 1 tane Stable (yuvarlaklı) state</em> varsa, buna Primitive Flow Table denir. Asenkron tasarımda genellikle önce Primitive Flow Table çıkarılır, sonra indirgeme (State Reduction) yapılarak normal Flow Table'a dönüştürülür.
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    )}

                    {/* RACE CONDITIONS TAB */}
                    {activeTab === "race" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Race (Yarış) Durumları ve Cycles (Döngüler)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                <p>
                                    Asenkron devrelerde saat olmadığı için sinyaller kapılardan ve kablolardan kendi fiziksel hızlarıyla akar. Eğer bir state değişiminde birden fazla bit aynı anda değişmek zorundaysa (Örn: <code>00 &rarr; 11</code> geçişi), fiziksel olarak iki tel aynı anda şarj olamayacağı için biri diğerini geçer. Buna <strong>Race Condition (Yarış Durumu)</strong> denir.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Non-Critical Race */}
                                    <div className="border border-slate-200 rounded-2xl p-6 bg-blue-50/50 relative overflow-hidden">
                                        <CheckCircle2 className="absolute top-4 right-4 text-blue-200 w-16 h-16" />
                                        <h3 className="font-bold text-blue-900 text-xl mb-3">Non-critical Race</h3>
                                        <p className="text-sm text-blue-800 mb-4">Eğer yarışan değişkenlerden hangisi kazanırsa kazansın, devre eninde sonunda (belki ara durumlara uğrayarak) hedeflediğimiz <strong>doğru stabil duruma</strong> varıyorsa bu zararsız bir yarıştır.</p>
                                        <div className="bg-white p-3 rounded-lg border border-blue-200 text-sm font-mono text-center">
                                            Örn: 00 &rarr; 11 hedefleniyor.<br/>
                                            Yol 1: 00 &rarr; 01 &rarr; (11 Stabil)<br/>
                                            Yol 2: 00 &rarr; 10 &rarr; (11 Stabil)<br/>
                                            Sonuç aynı. Sorun yok.
                                        </div>
                                    </div>

                                    {/* Critical Race */}
                                    <div className="border border-slate-200 rounded-2xl p-6 bg-rose-50/50 relative overflow-hidden shadow-sm">
                                        <AlertTriangle className="absolute top-4 right-4 text-rose-200 w-16 h-16" />
                                        <h3 className="font-bold text-rose-900 text-xl mb-3">Critical Race (Kritik Yarış)</h3>
                                        <p className="text-sm text-rose-800 mb-4">Eğer yarışan değişkenlerden biri önce gittiğinde devre <strong>yanlış bir stabil duruma</strong> saplanıp kalıyorsa, bu sistemin bozulması demektir ve donanım hatasıdır!</p>
                                        <div className="bg-white p-3 rounded-lg border border-rose-200 text-sm font-mono text-center">
                                            Örn: 00 &rarr; 11 hedefleniyor.<br/>
                                            Yol 1: 00 &rarr; 01 &rarr; (11 Stabil) <br/>
                                            Yol 2: 00 &rarr; 10 &rarr; (10 Stabil - HATA!)<br/>
                                            Devre hedefe ulaşamadı.
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#F2F7F4] border border-[#DAF1DE] rounded-2xl p-6 mt-6">
                                    <h3 className="font-bold text-[#163832] text-xl mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600"/> Çözüm: State Assignment (Durum Ataması)</h3>
                                    <p className="text-base text-slate-700">Yarış durumlarını engellemenin tek yolu, Transition Tablosunda hareket ederken bir seferde sadece 1 bitin değiştiği rotalar çizmek (örneğin <strong>Gray Code</strong> ataması kullanmak) veya araya bilerek Unstable State'ler yerleştirerek trafiği yönlendirmektir (00 &rarr; 01 &rarr; 11 gibi).</p>
                                </div>

                                <div className="border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm mt-8">
                                    <div className="bg-amber-50 p-5 border-b border-amber-200">
                                        <h3 className="font-bold text-amber-900 text-xl flex items-center gap-2"><Repeat className="w-5 h-5"/> Unstable Circuits ve Cycles (Döngüler)</h3>
                                    </div>
                                    <div className="p-6 text-base bg-white space-y-4">
                                        <p className="text-sm text-slate-700">Eğer Transition tablosunda belirli bir giriş (x) için o sütunda <strong>hiçbir Stabil Durum (yuvarlak) yoksa</strong>, devre sürekli olarak Unstable durumlardan Unstable durumlara seker.</p>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center font-mono text-lg text-slate-600">
                                            00 &rarr; 01 &rarr; 11 &rarr; 10 &rarr; 00 &rarr; ... (Sonsuz Döngü)
                                        </div>
                                        <p className="text-sm text-slate-700">Bu davranışa <strong>Cycle (Döngü)</strong> denir. Normal mantık devrelerinde bu bir hata kabul edilirken, <strong>Oscillator (Saat Jeneratörü)</strong> yapmak istiyorsak bilerek bu şekilde Unstable devreler tasarlarız.</p>
                                    </div>
                                </div>

                            </div>
                        </section>
                    )}

                    {/* S-R LATCH TAB */}
                    {activeTab === "latch" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">S-R Latch Kullanarak Asenkron Tasarım</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                <p>
                                    Asenkron devrelerde geribeslemeyi (feedback) düz kabloyla yapmak yerine genellikle S-R (Set-Reset) Latch'ler kullanırız. Bu devreleri daha düzenli hale getirir.
                                </p>
                                
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                        <h3 className="font-bold text-indigo-900 text-lg mb-3">NOR Tabanlı S-R Latch</h3>
                                        <p className="text-sm text-slate-600 mb-2">Denklem: <code>Y = S + y.R'</code></p>
                                        <p className="text-sm text-slate-600 mb-4"><strong>S=1, R=1 girişi YASAKTIR.</strong> Çıkışı tanımsız yapar. Bu yüzden asenkron tasarımda her zaman <code>S.R = 0</code> (ikisi aynı anda 1 olamaz) kuralı geçerlidir.</p>
                                    </div>
                                    <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                        <h3 className="font-bold text-indigo-900 text-lg mb-3">NAND Tabanlı S'-R' Latch</h3>
                                        <p className="text-sm text-slate-600 mb-2">Denklem: <code>Y = R'.y + S</code></p>
                                        <p className="text-sm text-slate-600 mb-4">Burada girişler active-low'dur. Yani <strong>S=0, R=0 girişi YASAKTIR.</strong></p>
                                    </div>
                                </div>

                                <div className="bg-[#163832] text-white rounded-2xl p-6 shadow-md mt-6">
                                    <h3 className="font-bold text-emerald-400 text-xl mb-4 flex items-center gap-2"><PenTool className="w-5 h-5"/> Latch Bazlı Tasarım Prosedürü</h3>
                                    <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-100">
                                        <li>Probleme ait <strong>Transition Table</strong> çıkarılır.</li>
                                        <li>Elde edilen tablo ve hedeflenen <code>Y</code> değişkenleri, S-R Latch <strong>Excitation Table (Uyarma Tablosu)</strong> kullanılarak her bir Latch için ayrı ayrı `S` ve `R` tablolarına dönüştürülür.</li>
                                        <li>Oluşan `S` ve `R` tabloları K-Map ile sadeleştirilerek giriş denklemleri bulunur.</li>
                                        <li>Bulunan denklemler SR Latch kutularının S ve R pinlerine bağlanarak lojik diyagram çizilir.</li>
                                    </ol>
                                </div>

                            </div>
                        </section>
                    )}

                    {/* SOLVED QUESTIONS TAB */}
                    {activeTab === "solved" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Çözümlü Sorular (Chapter 9 PDF)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-12">
                                
                                {/* Soru 1 */}
                                <div className="border border-[#DAF1DE] rounded-2xl overflow-hidden shadow-sm bg-white">
                                    <div className="bg-[#F2F7F4] p-5 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 1: Asenkron Devre Analizi</h3>
                                        <p className="text-sm text-[#235347] mt-2 font-medium">Asenkron bir devre Y = x1.x2 + (x1+x2)y ve Z = Y denklemleriyle verilmiştir. Lojik diyagramı çizin, Transition, Flow ve Output tablolarını oluşturun. Stabil durumları bulun.</p>
                                    </div>
                                    <div className="p-6 text-sm space-y-6">
                                        <p><strong>Çözüm:</strong> Lojik diyagramda, Y çıkışından alınıp doğrudan geri besleme (feedback) olarak 'y' girişine bağlanan gecikmesiz bir tel (delay element) çizilir.</p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="border border-slate-200 p-4 rounded-xl">
                                                <h4 className="font-bold text-center text-slate-800 mb-3 border-b pb-2">Transition Table (Y)</h4>
                                                <table className="w-full text-center border-collapse">
                                                    <thead><tr className="text-xs text-slate-500"><th className="border-b border-r">y \ x1x2</th><th>00</th><th>01</th><th>11</th><th>10</th></tr></thead>
                                                    <tbody className="font-mono text-base font-bold text-slate-800">
                                                        <tr><td className="border-r border-b text-slate-500">0</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(0)</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(0)</td><td className="border border-slate-200 text-rose-500">1</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(0)</td></tr>
                                                        <tr><td className="border-r text-slate-500">1</td><td className="border border-slate-200 text-rose-500">0</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(1)</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(1)</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(1)</td></tr>
                                                    </tbody>
                                                </table>
                                                <p className="mt-3 text-xs text-slate-600">Parantez/Yuvarlak içindekiler Stable Durumlardır. (y=Y).<br/>Unstable Durumlar: (y=0, x=11) ve (y=1, x=00).</p>
                                            </div>
                                            <div className="border border-slate-200 p-4 rounded-xl">
                                                <h4 className="font-bold text-center text-slate-800 mb-3 border-b pb-2">Flow Table</h4>
                                                <p className="text-center text-xs mb-2">0 = a, 1 = b atamasıyla</p>
                                                <table className="w-full text-center border-collapse">
                                                    <thead><tr className="text-xs text-slate-500"><th className="border-b border-r">y \ x1x2</th><th>00</th><th>01</th><th>11</th><th>10</th></tr></thead>
                                                    <tbody className="font-mono text-base font-bold text-slate-800">
                                                        <tr><td className="border-r border-b text-slate-500">a</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(a)</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(a)</td><td className="border border-slate-200 text-rose-500">b</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(a)</td></tr>
                                                        <tr><td className="border-r text-slate-500">b</td><td className="border border-slate-200 text-rose-500">a</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(b)</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(b)</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">(b)</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Soru 2 */}
                                <div className="border border-[#DAF1DE] rounded-2xl overflow-hidden shadow-sm bg-white">
                                    <div className="bg-[#F2F7F4] p-5 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 2: Race Condition ve Stabilite Analizi</h3>
                                        <p className="text-sm text-[#235347] mt-2 font-medium">Verilen Transition tablolarında Race (Yarış) olup olmadığını, varsa tipini (Critical/Non-critical) bulun.</p>
                                    </div>
                                    <div className="p-6 text-sm space-y-6">
                                        <ul className="space-y-6">
                                            <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                                <strong>Tablo A:</strong> Hiçbir giriş değişiminde y1 ve y2 aynı anda değişmiyor. Sadece 1 bit değişiyor (Örn: 00 &rarr; 01). 
                                                <br/><span className="text-emerald-700 font-bold">&rarr; No Race Condition (Yarış Yok). Circuit is Stable.</span>
                                            </li>
                                            <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                                <strong>Tablo B:</strong> (00) satırından x=1 sütununa geçildiğinde hedef 11 oluyor. Yani hem y1 hem y2 aynı anda değişmeli (00 &rarr; 11). Bu bir yarıştır. Eğer gecikmelerden dolayı önce (01) durumuna düşerse, orada stabil bir durum olan (01)'de hapsoluyor. Önce (10) durumuna düşerse orada da stabil (10)'da hapsoluyor. Yani hedeflenen (11)'e ulaşamıyor. 
                                                <br/><span className="text-rose-700 font-bold">&rarr; Critical Race (Kritik Yarış) meydana gelir.</span>
                                            </li>
                                            <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                                <strong>Tablo C:</strong> (00) &rarr; (01) &rarr; (11) &rarr; (10) &rarr; (01) şeklinde sütun içinde hiçbir yuvarlak (Stable State) yok.
                                                <br/><span className="text-purple-700 font-bold">&rarr; Unstable circuit (Cycle condition happening).</span> Sonsuz döngü.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Soru 4 */}
                                <div className="border border-[#DAF1DE] rounded-2xl overflow-hidden shadow-sm bg-white">
                                    <div className="bg-[#F2F7F4] p-5 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 4: Latch Kullanarak Devre Gerçekleme</h3>
                                        <p className="text-sm text-[#235347] mt-2 font-medium">Y = x1.x2 + (x1+x2)y ve Z = Y formülleriyle verilen devreyi (a) D Latch, (b) J-K Latch kullanarak tasarlayın.</p>
                                    </div>
                                    <div className="p-6 text-sm space-y-6">
                                        <p><strong>(a) D-Latch ile:</strong> D Latch'in karakteristik denklemi <code>Y = D</code> şeklindedir. Bu yüzden ekstra bir çabaya gerek yoktur, doğrudan verilen Y denklemi D pinine bağlanarak D-Latch devresi çizilir.</p>
                                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                                            <strong>(b) J-K Latch ile:</strong>
                                            <p className="mt-2">J-K Latch için J ve K denklemlerini bulmamız gerekir. Bunun için Transition Table'ı (Soru 1'deki tablo) J-K Excitation Tablosu ile birleştiririz.</p>
                                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                                <li><code>0 &rarr; 0</code> için <code>J=0, K=X</code></li>
                                                <li><code>0 &rarr; 1</code> için <code>J=1, K=X</code></li>
                                                <li><code>1 &rarr; 0</code> için <code>J=X, K=1</code></li>
                                                <li><code>1 &rarr; 1</code> için <code>J=X, K=0</code></li>
                                            </ul>
                                            <p className="mt-3">Bu kurallarla oluşturulan J ve K K-Map'lerinden (Don't care'ler (X) kullanılarak) şu sonuçlar çıkar:</p>
                                            <div className="mt-2 font-mono font-bold text-center text-indigo-800 text-base bg-white p-3 border border-amber-300 rounded shadow-sm">
                                                J = x1.x2 <br/>
                                                K = (x1+x2)' = x1'.x2'
                                            </div>
                                            <p className="mt-2">Lojik diyagram çizilirken, x1 ve x2'nin bir AND kapısı çıkışı J pinine; x1 ve x2'nin NOR kapısı (veya ayrı ayrı değilleyip AND) çıkışı K pinine bağlanır.</p>
                                        </div>
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
