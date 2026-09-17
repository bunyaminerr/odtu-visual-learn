"use strict";
"use client";

import React, { useState } from "react";
import { Cpu, MemoryStick, Target, PenTool, LayoutTemplate, ShieldAlert, ListChecks, ServerCog, Activity, AlertOctagon, Clock, Zap, Network, Table, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { DatapathVisualizer } from "@/components/visualizers/logic/DatapathVisualizer";

export default function FSMsDatapathsPage() {
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
                        <ServerCog className="w-5 h-5" /> 
                        8. FSMs ve Datapaths (Veriyolları)
                    </h2>
                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                        <AlertOctagon className="w-6 h-6 text-amber-600 flex-shrink-0" />
                        <p className="text-sm text-amber-900 font-medium leading-relaxed">
                            <strong>Sınav Öncesi Kritik Uyarı:</strong> Bu bölüm, dijital sistem tasarımının zirvesidir. Sadece bir Flip-Flop tasarlamakla kalmayıp, karmaşık bir işlemcinin nasıl çalıştığını (Veriyolu ve Kontrol Ünitesi ayrımı) göreceğiz. Sınavlarda genellikle "Şu işlemi yapan Datapath'i çizin" veya "Verilen Datapath için Control FSM tasarlayın" şeklinde kapsamlı sistem soruları gelir.
                        </p>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap bg-white rounded-2xl shadow-sm border border-slate-200 p-2 gap-2">
                    {[
                        { id: "overview", label: "Giriş ve Kavramlar", icon: <LayoutTemplate className="w-4 h-4" /> },
                        { id: "rt_operations", label: "Register Transfer (RT)", icon: <MemoryStick className="w-4 h-4" /> },
                        { id: "adder_sub", label: "Adder/Subtracter Sistemi", icon: <Target className="w-4 h-4" /> },
                        { id: "fsm_design", label: "FSM Örnekleri", icon: <PenTool className="w-4 h-4" /> },
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
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Dijital Sistem Tasarımı: FSM ve Datapath</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6 text-lg">
                                <p>
                                    Karmaşık dijital sistemler (örneğin işlemciler, ALU'lar) tek bir devasa durum makinesi olarak tasarlanamaz. Tasarımı yönetilebilir kılmak için sistem <strong>iki ana hiyerarşik parçaya</strong> bölünür: <strong>Datapath (Veriyolu)</strong> ve <strong>Control Unit (Kontrol Birimi)</strong>.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                                    <div className="bg-[#F2F7F4] border border-[#DAF1DE] rounded-2xl p-6 shadow-sm">
                                        <h3 className="font-bold text-[#235347] mb-3 flex items-center gap-2 text-xl"><Network className="w-6 h-6"/> Datapath (Veriyolu)</h3>
                                        <p className="text-base text-slate-700 mb-4">Verinin fiziksel olarak depolandığı, işlendiği ve bir yerden bir yere aktarıldığı (Register Transfer) "kas gücü" bölümüdür.</p>
                                        <ul className="list-disc pl-5 text-base space-y-2 text-[#163832] font-medium">
                                            <li><strong>İçindekiler:</strong> Register'lar (geçici veri tutucular), Multiplexer'lar (yönlendiriciler), ALU, Adder, Decoder gibi Combinational Logic blokları.</li>
                                            <li>Kendi başına karar veremez; sadece dışarıdan gelen kontrol sinyallerine itaat eder.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 shadow-sm border-l-4 border-l-purple-600">
                                        <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2 text-xl"><Cpu className="w-6 h-6"/> Control Unit (FSM)</h3>
                                        <p className="text-base text-slate-700 mb-4">Datapath'in ne zaman ne yapacağını yöneten "beyin" bölümüdür. Bir <strong>Sonlu Durum Makinesi (FSM)</strong> olarak tasarlanır.</p>
                                        <ul className="list-disc pl-5 text-base space-y-2 text-purple-900 font-medium">
                                            <li><strong>Görevi:</strong> Dış dünyadan gelen komutları (Start, Mode, Reset) ve Datapath'ten gelen geri bildirimleri okur.</li>
                                            <li>Buna karşılık Datapath'e <code>Load</code>, <code>Clear</code>, <code>Add</code>, <code>Shift</code> gibi emir sinyalleri (Control Signals) gönderir.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-200">
                                    <h4 className="font-bold text-blue-900 text-lg mb-2 flex items-center gap-2">
                                        <Zap className="w-5 h-5" /> Neden İkiye Bölüyoruz?
                                    </h4>
                                    <p className="text-base text-blue-800">
                                        Eğer 32-bitlik iki sayıyı toplayan bir sistemin tamamını tek bir FSM olarak yapsaydık, <code>2^64</code> tane state'e (duruma) ihtiyacımız olurdu ki bu imkansızdır. Datapath sayesinde donanımı modüler hale getirip, veriyi ayrı (32-bit adder), bu donanımı tetikleyen "Topla!" komutunu ayrı (FSM ile) yönetebiliriz.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* RT OPERATIONS TAB */}
                    {activeTab === "rt_operations" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Register Transfer (RT) Operasyonları</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                <p>
                                    Datapath tasarımı, verilerin Register'lar arasında nasıl dolaşacağını tanımlamakla başlar. Bu hareketlere <strong>Register Transfer (RT)</strong> veya mikro-operasyonlar denir. Donanım (MUX'lar, kablolar) bu RT denklemlerine bakılarak çizilir.
                                </p>

                                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="bg-slate-50 p-5 border-b border-slate-200">
                                        <h3 className="font-bold text-indigo-900 text-xl flex items-center gap-2">
                                            <Activity className="w-6 h-6"/> Örnek 1: Tek Saat Döngüsünde Veri Aktarımı
                                        </h3>
                                    </div>
                                    <div className="p-6 text-base space-y-4">
                                        <p>Aşağıdaki 3 aktarım işlemini <strong>aynı saat döngüsünde (1 clock cycle)</strong> gerçekleştirmek istiyoruz:</p>
                                        <ul className="list-disc pl-5 font-mono text-indigo-800 bg-indigo-50 p-4 rounded-lg inline-block shadow-inner space-y-1">
                                            <li>RA &larr; RB <span className="text-slate-500 text-sm ml-2">// RB'nin içeriğini RA'ya at</span></li>
                                            <li>RB &larr; RC <span className="text-slate-500 text-sm ml-2">// RC'nin içeriğini RB'ye at</span></li>
                                            <li>RA &larr; RC <span className="text-slate-500 text-sm ml-2">// RC'nin içeriğini RA'ya at (FARKLI ZAMANDA veya KOŞULDA!)</span></li>
                                        </ul>
                                        <div className="bg-rose-50 border border-rose-200 p-5 rounded-xl text-rose-900 mt-4">
                                            <strong className="flex items-center gap-2"><ShieldAlert className="w-5 h-5"/> Çakışma ve MUX Çözümü:</strong>
                                            <p className="mt-2">
                                                Aynı hedefe (RA) hem RB'den hem RC'den veri gidemez! (Kısa devre olur). Datapath çizerken RA'nın <code>D</code> girişine bir <strong>2x1 Multiplexer (MUX)</strong> bağlamak ZORUNDAYIZ.
                                                MUX'un girişlerine RB ve RC bağlanır. FSM'den gelen bir kontrol sinyali (örn: <code>Sel_A</code>) ile o an hangi işlemin yapılacağı seçilir. RB'nin hedefine ise sadece RC bağlandığı için MUX'a gerek yoktur, doğrudan bağlanabilir.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mt-6">
                                    <div className="bg-slate-50 p-5 border-b border-slate-200">
                                        <h3 className="font-bold text-indigo-900 text-xl">Örnek 2: Mod Seçimli 4-bit Register Tasarımı</h3>
                                    </div>
                                    <div className="p-6 text-base space-y-4">
                                        <p>Dışarıdan gelen S1 ve S0 pinlerine göre farklı davranış sergileyen 4-bitlik bir Register (Datapath) tasarlanmak isteniyor:</p>
                                        <table className="w-full text-center border-collapse border border-slate-300 mt-4 bg-white shadow-sm rounded-lg overflow-hidden">
                                            <thead>
                                                <tr className="bg-slate-100 text-slate-700">
                                                    <th className="p-3 border border-slate-300">S1</th>
                                                    <th className="p-3 border border-slate-300">S0</th>
                                                    <th className="p-3 border border-slate-300">İşlem (Operation)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td className="p-3 border border-slate-300">0</td><td className="p-3 border border-slate-300">0</td><td className="p-3 border border-slate-300">Kendi değerini tut (Hold)</td></tr>
                                                <tr><td className="p-3 border border-slate-300">0</td><td className="p-3 border border-slate-300">1</td><td className="p-3 border border-slate-300">Sıfırla (Clear)</td></tr>
                                                <tr><td className="p-3 border border-slate-300">1</td><td className="p-3 border border-slate-300">0</td><td className="p-3 border border-slate-300">Tersini al (Complement)</td></tr>
                                                <tr><td className="p-3 border border-slate-300">1</td><td className="p-3 border border-slate-300">1</td><td className="p-3 border border-slate-300">Dışarıdan yükle (Load DataIn)</td></tr>
                                            </tbody>
                                        </table>
                                        
                                        <div className="mt-6 bg-[#F2F7F4] border border-[#DAF1DE] p-5 rounded-xl">
                                            <h4 className="font-bold text-[#163832] mb-2">Çözüm (Bit-sliced Implementation):</h4>
                                            <p className="text-sm">
                                                4 bitin hepsi aynı mantıkla çalıştığı için "Bit-Slice" yöntemi kullanılır. Tek bir bit için 1 adet <strong>D-Flip Flop</strong> ve onun girişini besleyen 1 adet <strong>4x1 MUX</strong> çizilir.
                                                MUX'un Seçici pinleri (Select lines) S1 ve S0'dır. MUX Girişleri sırasıyla: (0) Q'nun kendisi, (1) GND (0V), (2) Q'nun Değili (NOT kapısı ile), (3) Dışarıdan gelen Data pini. Bu hücreden yan yana 4 tane kopyalanarak sistem tamamlanır.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    )}

                    {/* ADDER/SUBTRACTER TAB */}
                    {activeTab === "adder_sub" && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            
                            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 mb-8">
                                <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Kapsamlı Örnek: Adder/Subtracter Sistemi</h2>
                                <div className="text-slate-700 leading-relaxed space-y-6 text-lg">
                                    <p>
                                        <strong>Görev:</strong> İki adet 4-bit sayıyı (A ve B) sırasıyla R1 ve R2 registerlarına yüklemek. Ardından dışarıdan gelen <code>SUBTRACT</code> pini 1 ise A-B, 0 ise A+B işlemini yapıp sonucu tekrar R1'e yazmak. Başlangıca dönmek için <code>START</code> pininin 0 olmasını beklemek.
                                    </p>
                                    
                                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                                        <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2"><Settings className="w-5 h-5"/> Kontrol Sinyalleri (FSM Çıkışları)</h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
                                            <li className="bg-white p-3 rounded shadow-sm border border-slate-100"><strong className="text-blue-700">LOAD_R1:</strong> 1 olduğunda DataIn (veya ALU sonucu) R1'e yazılır.</li>
                                            <li className="bg-white p-3 rounded shadow-sm border border-slate-100"><strong className="text-blue-700">LOAD_R2:</strong> 1 olduğunda DataIn R2'ye yazılır.</li>
                                            <li className="bg-white p-3 rounded shadow-sm border border-slate-100"><strong className="text-blue-700">ADD/SUB:</strong> 0 ise ALU toplar, 1 ise ALU çıkarır.</li>
                                            <li className="bg-white p-3 rounded shadow-sm border border-slate-100"><strong className="text-blue-700">RST:</strong> Register'ları sıfırlar.</li>
                                        </ul>
                                    </div>

                                    <h3 className="font-bold text-[#163832] mt-6 text-xl border-b pb-2">Zamanlama Analizi (Timing Waveform)</h3>
                                    <p className="text-sm">
                                        FSM durum (State) değiştirdikçe, kontrol sinyalleri datapath'i nasıl etkiler? (Aşağıdaki tablo PPTX'teki animasyonlu dalga formunun özetidir).
                                    </p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-center border-collapse border border-slate-300 text-sm mt-2">
                                            <thead>
                                                <tr className="bg-slate-800 text-white">
                                                    <th className="p-3 border border-slate-600">Saat (Clock)</th>
                                                    <th className="p-3 border border-slate-600">FSM State</th>
                                                    <th className="p-3 border border-slate-600">Giriş (DataIn)</th>
                                                    <th className="p-3 border border-slate-600">Aktif Olan Sinyal</th>
                                                    <th className="p-3 border border-slate-600">R1 İçeriği</th>
                                                    <th className="p-3 border border-slate-600">R2 İçeriği</th>
                                                    <th className="p-3 border border-slate-600">ALU Çıkışı (R1±R2)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                <tr><td className="p-2 border">1</td><td className="p-2 border font-bold text-slate-500">S0 (Bekle)</td><td className="p-2 border">A</td><td className="p-2 border">RST=1</td><td className="p-2 border">0</td><td className="p-2 border">0</td><td className="p-2 border">0</td></tr>
                                                <tr><td className="p-2 border bg-blue-50">2</td><td className="p-2 border font-bold text-blue-700 bg-blue-50">S1 (R1'e Yükle)</td><td className="p-2 border bg-blue-50">A</td><td className="p-2 border bg-blue-50">LOAD_R1=1</td><td className="p-2 border font-bold text-rose-600 bg-blue-50">A (Clock Edge'de)</td><td className="p-2 border bg-blue-50">0</td><td className="p-2 border bg-blue-50">A</td></tr>
                                                <tr><td className="p-2 border">3</td><td className="p-2 border font-bold text-slate-700">S2 (R2'ye Yükle)</td><td className="p-2 border">B</td><td className="p-2 border">LOAD_R2=1</td><td className="p-2 border text-rose-600 font-bold">A</td><td className="p-2 border font-bold text-emerald-600">B (Clock Edge'de)</td><td className="p-2 border font-bold text-purple-700">A+B</td></tr>
                                                <tr><td className="p-2 border bg-blue-50">4</td><td className="p-2 border font-bold text-blue-700 bg-blue-50">S3/S4 (İşlem)</td><td className="p-2 border bg-blue-50">X</td><td className="p-2 border bg-blue-50">LOAD_R1=1, ADD=1</td><td className="p-2 border font-bold text-purple-700 bg-blue-50">A+B (Yazıldı)</td><td className="p-2 border text-emerald-600 font-bold bg-blue-50">B</td><td className="p-2 border bg-blue-50">A+B+B</td></tr>
                                                <tr><td className="p-2 border">5</td><td className="p-2 border font-bold text-slate-500">S5 (Bitiş)</td><td className="p-2 border">X</td><td className="p-2 border">Hiçbiri</td><td className="p-2 border font-bold text-purple-700">A+B</td><td className="p-2 border text-emerald-600 font-bold">B</td><td className="p-2 border">A+B+B</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-2">* <strong>Setup Time Notu:</strong> Sinyaller clock gelmeden (edge) önce hazır edilir. Sinyaller verilir verilmez R1 değişmez, tablo satırındaki değerler saat vurduğu AN'daki güncellemeyi gösterir.</p>

                                </div>
                            </div>

                            {/* VISUALIZER */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                                <h3 className="text-xl font-bold text-[#163832] mb-4 flex items-center gap-2">
                                    <Cpu className="w-6 h-6 text-[#235347]"/> Etkileşimli Datapath Simülatörü
                                </h3>
                                <DatapathVisualizer />
                            </div>

                        </section>
                    )}

                    {/* FSM DESIGN TAB */}
                    {activeTab === "fsm_design" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">FSM Tasarım Örnekleri</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                
                                <div className="border border-slate-200 rounded-2xl p-8 relative bg-slate-50">
                                    <ShieldAlert className="absolute top-8 right-8 text-slate-300 w-16 h-16 opacity-50" />
                                    <h3 className="font-bold text-[#163832] text-xl mb-4">Örnek 3: Senkron Test Cihazı (Synchronous Tester)</h3>
                                    <p className="text-base mb-4">Seri olarak gelen Ölçülen (Measured Vector - <code>MV</code>) ve Beklenen (Expected Vector - <code>EV</code>) bitlerini her saat döngüsünde karşılaştıran bir sistem.</p>
                                    
                                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-4">
                                        <h4 className="font-bold text-indigo-900 mb-2">Çıkış Kuralları:</h4>
                                        <ul className="list-disc pl-5 text-sm space-y-2">
                                            <li><strong>Random Error (RE):</strong> Eşleşmeme (mismatch) anında 1 olur.</li>
                                            <li><strong>Oscillating Error (OE):</strong> Mismatch &rarr; Match &rarr; Mismatch dizilimi (örn: 1, 0, 1) görüldüğünde 1 olur. Bu ardışıklığı hatırlamak için ekstra state'ler (hafıza) gerekir.</li>
                                            <li><strong>Test Fail (TF):</strong> Test bitip Start=0 olduğunda, test boyunca <em>hiç hata olduysa</em> 1 kalır. Sistem ancak Start tekrar 1 olunca kendini sıfırlar.</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                                        <div className="flex-1 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                                            <h4 className="font-bold text-emerald-900 mb-1">Mealy mi Moore mu?</h4>
                                            <p className="text-sm text-emerald-800">Çıkışların (RE, OE, TF) değişimleri doğrudan <strong>clock kenarını beklediği için</strong> (anında girişlerle değişmediği için) bu bir <strong>Moore Makinesidir</strong>.</p>
                                        </div>
                                        <div className="flex-1 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                            <h4 className="font-bold text-amber-900 mb-1">State & FF Hesabı</h4>
                                            <p className="text-sm text-amber-800">Tasarım 5-6 farklı State içerir. <code>2^n {'>'}= State Sayısı</code>. <code>2^3 = 8 {'>'} 6</code> olduğu için <strong>En az 3 adet Flip-Flop</strong> gerekir. Eğer One-Hot Assignment yapılsaydı her state için bir FF atanacağından <strong>7 adet FF</strong> gerekirdi.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-slate-200 rounded-2xl p-8">
                                    <h3 className="font-bold text-[#163832] text-xl mb-4">Örnek 4: Skipping Sequencer (Atlayan Sayıcı)</h3>
                                    <p className="text-base mb-4">
                                        Normalde 0'dan 15'e kadar sayan bir sayıcı (Up-Counter) tasarlanacak. Ancak <strong>2, 6, 10 ve 14</strong> sayıları atlanmalıdır (skip).
                                    </p>
                                    <p className="text-base">
                                        <strong>Mühendislik Çözümü:</strong> Sayıcıyı baştan FSM olarak kodlamak yerine donanımı modüler tasarlarız. Elimizde standart bir 4-bit Up-Counter (Sayma özelliği olan Register) var. Sayıcının çıkış pinlerine (Q3 Q2 Q1 Q0) bir kombinasyonel lojik kapı devresi bağlarız. Sistem ne zaman "1, 5, 9, 13" (Yani atlanacak sayının bir altındayken) değerini okursa, o an Sayıcının <code>Load</code> (Dışarıdan Yükle) pini tetiklenir ve sıradaki olması gereken değer (3, 7, 11, 15) sabit kablolardan sayıcıya zorla basılır. Böylece donanımı modifiye etmeden FSM mantığını kombinasyonel kapılarla çözmüş oluruz.
                                    </p>
                                </div>

                            </div>
                        </section>
                    )}

                    {/* SOLVED QUESTIONS TAB */}
                    {activeTab === "solved" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Çözümlü Soru Arşivi (Adım Adım)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-10">
                                
                                {/* Soru 1 */}
                                <div className="border-2 border-[#DAF1DE] rounded-2xl overflow-hidden shadow-sm">
                                    <div className="bg-[#F2F7F4] p-6 border-b border-[#DAF1DE]">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-[#163832] text-xl flex items-center gap-2">
                                                <PenTool className="w-5 h-5"/> Soru 1: Flowchart ve Blok Diyagramı
                                            </h3>
                                        </div>
                                        <p className="text-base text-[#235347] font-medium">
                                            A logic circuit with active-low reset has two control inputs x and y. If x=1 and y=0, register R is incremented and control goes to a second state. If x=0 and y=1, register R is cleared to 0 and control goes to the third state. Otherwise control stays in the initial state.
                                        </p>
                                    </div>
                                    <div className="p-6 md:p-8 text-base space-y-8 bg-white">
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-lg mb-3">a) Flow Chart (Akış Şeması) Çizimi:</h4>
                                            <p className="text-slate-600 mb-4">Soru metnini akış şemasına dökerken Karar yapılarını (Elmas biçimi) girişler için, İşlem yapılarını (Dikdörtgen biçimi) çıkışlar/durumlar için kullanırız.</p>
                                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-sm leading-8 whitespace-pre-wrap overflow-x-auto text-slate-700">
{`   [ State: S1 ] <----------------------------
         |                                   |
         v                                   | (No)
    < Reset = 0? > ---> (Yes) ----------------
         | (No / Active-Low'da 1)
         v
      < x = 1? > --- (No, x=0) ---> < y = 1? >
         | (Yes)                        | (Yes)
         v                              v
      < y = 0? >                     [ Clr-R ] (Register'ı temizle)
         | (Yes)                        |
         v                              v
    [ Inc-R ] (Register artır)       [ S3 ] (State 3'e geç)
         |                              |
         v                              |
       [ S2 ] (State 2'ye geç)          |`}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-lg mb-3">b) Control ve Datapath Blok Diyagramı:</h4>
                                            <p className="text-slate-600 mb-4">Sistemi <strong>Beyin (FSM)</strong> ve <strong>Kas (Datapath)</strong> olarak ayırıyoruz. Dış girişler (x,y, reset) doğrudan FSM'e girer. FSM içerideki mantığa (akış şemasına) göre çıkarımlarda bulunup, Kas tarafına (Datapath içindeki Register R'ye) sadece <code>CLR-R</code> veya <code>INC-R</code> tellerinden sinyal yollar.</p>
                                            <div className="flex justify-center items-center gap-8 py-6 bg-slate-50 rounded-xl border border-slate-200 flex-col md:flex-row">
                                                {/* Control Unit */}
                                                <div className="border-2 border-purple-500 bg-purple-50 w-48 h-32 flex items-center justify-center rounded relative shadow-sm">
                                                    <div className="font-bold text-purple-900 text-lg">FSM (Control)</div>
                                                    {/* Inputs */}
                                                    <div className="absolute -left-12 top-4 text-xs font-bold">x &rarr;</div>
                                                    <div className="absolute -left-12 top-10 text-xs font-bold">y &rarr;</div>
                                                    <div className="absolute -left-16 bottom-4 text-xs font-bold flex items-center gap-1">CLr' <span>&rarr;</span></div>
                                                    <div className="absolute -left-3 bottom-5 w-2 h-2 rounded-full border-2 border-purple-500 bg-white"></div> {/* Active low circle */}
                                                </div>
                                                
                                                {/* Wires */}
                                                <div className="flex flex-col gap-4 text-xs font-bold text-slate-500 md:w-32 items-center">
                                                    <div>&rarr; CLR-R &rarr;</div>
                                                    <div>&rarr; INC-R &rarr;</div>
                                                </div>

                                                {/* Datapath */}
                                                <div className="border-2 border-blue-500 bg-blue-50 w-48 h-32 flex items-center justify-center rounded shadow-sm">
                                                    <div className="border border-blue-400 bg-white px-6 py-2 font-bold text-blue-900 rounded">Register R</div>
                                                    <div className="absolute mt-24 font-bold text-blue-800">Datapath</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Soru 2 */}
                                <div className="border-2 border-[#DAF1DE] rounded-2xl overflow-hidden shadow-sm">
                                    <div className="bg-[#F2F7F4] p-6 border-b border-[#DAF1DE]">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-[#163832] text-xl flex items-center gap-2">
                                                <Table className="w-5 h-5"/> Soru 2: State Diagram'dan Devre Tasarımına (D-FF)
                                            </h3>
                                        </div>
                                        <p className="text-base text-[#235347] font-medium">
                                            Dört state (S0, S1, S2, S3) olan ve girişleri x, y olan bir durum makinesinin diyagramı verilmiştir. (S0=00, S1=01, S2=10, S3=11 atamasıyla). State Table'ı çıkarın, D-FF kullanarak Next-State denklemlerini bulup lojik devresini çizin.
                                        </p>
                                    </div>
                                    <div className="p-6 md:p-8 text-base space-y-10 bg-white">
                                        
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-lg mb-4 border-b border-slate-100 pb-2">1. State Table Oluşturma (Durum Tablosu)</h4>
                                            <p className="text-slate-600 mb-4 text-sm">A ve B Flip-Flop'ları için Mevcut Durum (A, B) ve Giriş (x, y) kombinasyonlarından Sonraki Duruma (A+, B+) geçişler haritalanır. Toplam 4 değişken olduğu için tabloda 16 satır vardır. D-FF kullanıldığı için A+ doğrudan D_A'ya, B+ ise D_B'ye eşittir.</p>
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-center text-sm font-mono">
                                                <div className="bg-slate-50 p-2 border rounded">00 (S0) + x=1 &rarr; 01 (S1)</div>
                                                <div className="bg-slate-50 p-2 border rounded">00 (S0) + x=0 &rarr; 00 (S0)</div>
                                                <div className="bg-slate-50 p-2 border rounded">01 (S1) + y=0 &rarr; 10 (S2)</div>
                                                <div className="bg-slate-50 p-2 border rounded">01 (S1) + y=1 &rarr; 11 (S3)</div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 text-lg mb-4 border-b border-slate-100 pb-2">2. Karnaugh Map (K-Map) ve Denklemler</h4>
                                            <p className="text-slate-600 mb-6 text-sm">Tablodan elde edilen "1"ler A+ ve B+ için ayrı ayrı 4 değişkenli (AB satır, xy sütun) K-Map'lere yerleştirilir.</p>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="bg-[#F9FAF9] p-4 rounded-xl border border-slate-200 shadow-inner">
                                                    <h5 className="font-bold text-center text-rose-700 mb-4">A+ İçin K-Map (D_A Girişi)</h5>
                                                    {/* Fake K-map visualization */}
                                                    <table className="w-full text-center border-collapse bg-white">
                                                        <thead>
                                                            <tr className="text-xs text-slate-400">
                                                                <th className="border-b border-r">A\B \ x\y</th><th>00</th><th>01</th><th>11</th><th>10</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="font-mono text-lg font-bold text-slate-800">
                                                            <tr><td className="border-r border-b text-xs text-slate-400">00</td><td className="border border-slate-200">0</td><td className="border border-slate-200">0</td><td className="border border-slate-200 text-rose-600 bg-rose-50">1</td><td className="border border-slate-200 text-rose-600 bg-rose-50">1</td></tr>
                                                            <tr><td className="border-r border-b text-xs text-slate-400">01</td><td className="border border-slate-200 text-blue-600 bg-blue-50">1</td><td className="border border-slate-200 text-blue-600 bg-blue-50">1</td><td className="border border-slate-200 text-rose-600 bg-rose-50">1</td><td className="border border-slate-200 text-rose-600 bg-rose-50">1</td></tr>
                                                            <tr><td className="border-r border-b text-xs text-slate-400">11</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">1</td><td className="border border-slate-200 text-emerald-600 bg-emerald-50">1</td><td className="border border-slate-200">0</td><td className="border border-slate-200">0</td></tr>
                                                            <tr><td className="border-r border-b text-xs text-slate-400">10</td><td className="border border-slate-200">0</td><td className="border border-slate-200">0</td><td className="border border-slate-200">0</td><td className="border border-slate-200">0</td></tr>
                                                        </tbody>
                                                    </table>
                                                    <div className="mt-4 text-center font-bold font-mono text-base bg-white border border-slate-200 p-2 rounded text-slate-800">
                                                        A<sup>+</sup> = A'B + AB'x + Bx'
                                                    </div>
                                                </div>

                                                <div className="bg-[#F9FAF9] p-4 rounded-xl border border-slate-200 shadow-inner">
                                                    <h5 className="font-bold text-center text-purple-700 mb-4">B+ İçin K-Map (D_B Girişi)</h5>
                                                    <table className="w-full text-center border-collapse bg-white">
                                                        <thead>
                                                            <tr className="text-xs text-slate-400">
                                                                <th className="border-b border-r">A\B \ x\y</th><th>00</th><th>01</th><th>11</th><th>10</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="font-mono text-lg font-bold text-slate-800">
                                                            <tr><td className="border-r border-b text-xs text-slate-400">00</td><td className="border border-slate-200">0</td><td className="border border-slate-200">0</td><td className="border border-slate-200 text-amber-600 bg-amber-50">1</td><td className="border border-slate-200 text-amber-600 bg-amber-50">1</td></tr>
                                                            <tr><td className="border-r border-b text-xs text-slate-400">01</td><td className="border border-slate-200">0</td><td className="border border-slate-200 text-indigo-600 bg-indigo-50">1</td><td className="border border-slate-200 text-amber-600 bg-amber-50">1</td><td className="border border-slate-200">0</td></tr>
                                                            <tr><td className="border-r border-b text-xs text-slate-400">11</td><td className="border border-slate-200">0</td><td className="border border-slate-200 text-indigo-600 bg-indigo-50">1</td><td className="border border-slate-200">0</td><td className="border border-slate-200">0</td></tr>
                                                            <tr><td className="border-r border-b text-xs text-slate-400">10</td><td className="border border-slate-200 text-teal-600 bg-teal-50">1</td><td className="border border-slate-200">0</td><td className="border border-slate-200">0</td><td className="border border-slate-200">0</td></tr>
                                                        </tbody>
                                                    </table>
                                                    <div className="mt-4 text-center font-bold font-mono text-base bg-white border border-slate-200 p-2 rounded text-slate-800">
                                                        B<sup>+</sup> = A'Bx + A'By + Bx'y' + B'xy
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 text-lg mb-4 border-b border-slate-100 pb-2">3. Implementation (Devre Çizimi)</h4>
                                            <p className="text-slate-600 mb-4 text-sm">Yukarıda bulduğumuz Boolean denklemleri doğrudan lojik kapılara (AND, OR, NOT) ve 2 adet D-Flip Flop'a dönüştürülür.</p>
                                            
                                            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                                                <ul className="list-disc pl-5 space-y-3 text-amber-900 font-medium">
                                                    <li><strong>FF-A Girişi (D_A):</strong> <code>A'B</code>, <code>AB'x</code> ve <code>Bx'</code> ifadelerini hesaplamak için 3 adet AND kapısı kullanılır. Bu AND kapılarının çıkışları 3 girişli devasa bir OR kapısında birleşerek A Flip-Flop'unun D pinine girer.</li>
                                                    <li><strong>FF-B Girişi (D_B):</strong> Benzer şekilde <code>A'Bx</code>, <code>A'By</code>, <code>Bx'y'</code> ve <code>B'xy</code> için 4 adet AND kapısı kullanılır. Çıkışları 4 girişli bir OR kapısında toplanarak B Flip-Flop'unun D pinine girer.</li>
                                                    <li>Dışarıdan gelen saat (Clock) her iki FF'ye ortak (senkron) olarak bağlanır. Dış girişler (x, y) gerektiğinde NOT kapılarıyla terslenip devrenin her iki yanına dağıtılır.</li>
                                                </ul>
                                                <div className="mt-4 bg-white p-3 rounded shadow-sm border border-amber-100 text-xs italic text-center">
                                                    Not: "Eğer State Reduction (İndirgeme) yapılsaydı, FF sayısı veya kapı sayısı azalarak implementasyon çok daha basit çıkabilirdi."
                                                </div>
                                            </div>
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
