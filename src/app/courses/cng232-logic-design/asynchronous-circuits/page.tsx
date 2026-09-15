"use client";

import React, { useState } from "react";
import { Cpu, Wind, Activity, CheckCircle, AlertTriangle, FastForward, Table, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import { RaceConditionVisualizer } from "@/components/visualizers/logic/RaceConditionVisualizer";

export default function AsynchronousCircuitsPage() {
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
                        <Wind className="w-4 h-4" /> 
                        Bölüm 9: Asenkron Ardışıl Devreler (Asynchronous Sequential Circuits)
                    </h2>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap bg-white rounded-xl shadow-sm border border-slate-200 p-2 gap-2">
                    {[
                        { id: "overview", label: "Asenkron vs Senkron", icon: <Activity className="w-4 h-4" /> },
                        { id: "tables", label: "State & Flow Tables", icon: <Table className="w-4 h-4" /> },
                        { id: "races", label: "Race Conditions (Yarış)", icon: <FastForward className="w-4 h-4" /> },
                        { id: "design", label: "Latch Tasarımı", icon: <CheckCircle className="w-4 h-4" /> },
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
                    
                    {/* OVERVIEW TAB */}
                    {activeTab === "overview" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Asenkron ve Senkron Mimari</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="border rounded-xl p-5 bg-slate-50">
                                        <h3 className="text-xl font-bold text-slate-800 mb-2">Senkron Devreler (Önceki Konular)</h3>
                                        <p className="mb-3 text-sm">Devrenin durumu (state) sadece <strong>Clock (Saat) sinyali</strong> geldiğinde değişir. Saat sinyali tüm flip-flop'ları aynı anda tetiklediği için devrenin tasarımı ve analizi kolaydır.</p>
                                    </div>
                                    <div className="border rounded-xl p-5 bg-[#F2F7F4] border-[#DAF1DE]">
                                        <h3 className="text-xl font-bold text-[#163832] mb-2">Asenkron Devreler</h3>
                                        <p className="mb-3 text-sm">Clock sinyali yoktur. Devrenin durumu, <strong>giriş (input) sinyallerinden biri değiştiği anda</strong> hemen değişir. Saat beklemeyeceği için daha hızlı tepki verirler ama tasarımları çok daha zordur çünkü anlık gecikmeler sistemi bozabilir.</p>
                                    </div>
                                </div>

                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4 text-amber-900">
                                    <h4 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> Fundamental Mode (Temel Çalışma Modu)</h4>
                                    <p className="text-sm">Asenkron devre tasarımında karmaşayı önlemek için şu kural kabul edilir: <strong>"Aynı anda sadece TEK BİR giriş değişebilir ve devrenin içi tamamen dengeye (stable state) oturmadan yeni bir giriş değişimi yapılamaz."</strong></p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* TABLES TAB */}
                    {activeTab === "tables" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">State Tables ve Flow Tables (Akış Tabloları)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                
                                <p>Asenkron devrelerde geribesleme (feedback) yolları, sistemin state'ini (y1, y2 vb.) oluşturur. Sistem girişlere göre yeni state'leri (Y1, Y2) hesaplar.</p>

                                <div className="space-y-4">
                                    <div className="border p-4 rounded-xl">
                                        <h4 className="font-bold text-[#163832] mb-2">Kararlılık (Stability) Kavramı</h4>
                                        <p className="text-sm">Eğer hesaplanan Next State (Y), mevcut Present State'e (y) eşitse sistem dengeye ulaşmıştır ve bir sonraki giriş değişimine kadar bekler. Bu duruma <strong>Stable State (Kararlı Durum)</strong> denir ve tabloda daire (circle) içine alınır.<br/><br/>
                                        Eğer <code>Y &ne; y</code> ise, sistem anında <code>y = Y</code> olana kadar yeni değerleri geribesleme olarak kendi içine tekrar sokar. Bu geçiş anlarına <strong>Unstable State (Kararsız Durum)</strong> denir.</p>
                                    </div>
                                    <div className="border p-4 rounded-xl bg-slate-50">
                                        <h4 className="font-bold text-[#163832] mb-2">Flow Table (Akış Tablosu) Nedir?</h4>
                                        <p className="text-sm">State Table (Durum tablosu) ile aynı mantıktadır ancak 00, 01, 10 gibi binary değerler yerine <code>a, b, c, d</code> gibi sembolik harfler kullanılır. <br/>Eğer her satırda sadece BİR TANE stable state varsa buna <strong>Primitive Flow Table</strong> denir.</p>
                                    </div>
                                    <div className="border p-4 rounded-xl bg-amber-50 border-amber-200">
                                        <h4 className="font-bold text-amber-900 mb-2">Cycles (Döngüler / Unstable Circuits)</h4>
                                        <p className="text-sm text-amber-800">Eğer sistem sürekli <code>y &ne; Y</code> üretiyorsa, devrede hiç durmadan bir state'den diğerine atlama olur (örneğin 0 &rarr; 1 &rarr; 0 &rarr; 1). Buna Cycle (Döngü) denir. Osilatör (Clock jeneratörü) yapılmak isteniyorsa faydalıdır, aksi halde hatalı bir tasarımdır.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* RACES TAB */}
                    {activeTab === "races" && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
                                <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Race Conditions (Yarış Durumları)</h2>
                                <div className="text-slate-700 leading-relaxed space-y-6">
                                    <p>Asenkron bir devrede, giriş değişimi sonucunda <strong>iki veya daha fazla state değişkeni aynı anda değişmek zorundaysa</strong> (Örneğin <code>00 &rarr; 11</code>), buna <strong>Yarış (Race)</strong> denir. Kabloların ve kapıların gecikme süreleri (propagation delay) hiçbir zaman birebir aynı olamayacağı için, y1 ve y2 sinyallerinden biri hedefe daha önce varacaktır (örn: 00 &rarr; 10 &rarr; 11).</p>
                                    
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li><strong>Noncritical Race (Tehlikesiz):</strong> Sinyallerin hangisinin hızlı gittiği önemli değildir. Sistem hangi ara duruma (10 veya 01) düşerse düşsün, o ara durumlardaki yönlendirmeler de hedeflenen asıl duruma (11) gittiği için sonuç değişmez.</li>
                                        <li><strong>Critical Race (Kritik - Hatalı):</strong> Eğer sistemin düştüğü ara durum (örn: 10), onu hedeflenen duruma değil de başka bir stable state'e kilitliyorsa sistem hatalı çalışır.</li>
                                    </ul>
                                </div>
                            </div>

                            <RaceConditionVisualizer />

                        </section>
                    )}

                    {/* DESIGN TAB */}
                    {activeTab === "design" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Latch Tasarımı</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                
                                <p>Asenkron devre tasarımında, denklemler direkt lojik kapılarla çizilebileceği gibi hazır SR veya JK Latch'ler kullanılarak da tasarlanabilir.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="border p-5 rounded-xl">
                                        <h3 className="font-bold text-[#235347] mb-2">SR Latch ile Tasarım</h3>
                                        <p className="text-sm">SR Latch'in karakteristik denklemi: <code>Y = S + y.R'</code> şeklindedir (S=1, R=1 olmaması koşuluyla). Sistemin K-Map (Harita) sonuçları S ve R pinlerine göre ayarlanır. (Excitation tablosundan S ve R değerleri çekilir).</p>
                                    </div>
                                    <div className="border p-5 rounded-xl">
                                        <h3 className="font-bold text-[#235347] mb-2">Tasarım Adımları</h3>
                                        <ol className="list-decimal pl-5 text-sm space-y-1">
                                            <li>Probleme ait Transition Table (Geçiş tablosu) çıkarılır.</li>
                                            <li>Seçilen Latch'in (Örn SR veya JK) Excitation Table'ı (Uyarma Tablosu) kullanılarak her giriş pininin K-Map'i doldurulur.</li>
                                            <li>Denklemler sadeleştirilerek çizim yapılır.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* SOLVED QUESTIONS TAB */}
                    {activeTab === "solved" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Çözümlü Örnekler (Chapter 9 PDF)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8">
                                
                                {/* Q1 */}
                                <div className="border border-[#DAF1DE] rounded-xl overflow-hidden">
                                    <div className="bg-[#F2F7F4] p-4 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 1: Asenkron Devre Analizi</h3>
                                        <p className="text-sm text-[#235347]">Excitation: <code>Y = x1.x2 + (x1+x2)y</code> ve Output: <code>Z = Y</code> olan devrenin; a) Lojik diyagramı, b) Transition, Flow ve Output tablolarını oluşturunuz.</p>
                                    </div>
                                    <div className="p-5 text-sm space-y-4">
                                        <p><strong>Çözüm A:</strong> İki AND ve bir OR kapısı kullanılarak çizilir. Y çıkışından alınan hat geri besleme (feedback) olarak y girişine (gecikme hattı) bağlanır.</p>
                                        <p><strong>Çözüm B:</strong><br/>
                                        Transition Table: <code>y</code> ve <code>x1,x2</code> girişlerine göre Y çıkışları hesaplanır. Eğer y=Y ise o hücre yuvarlak içine alınır (Stable state).<br/>
                                        Stable States: 000, 001, 010, 101, 111, 110<br/>
                                        Unstable States: 011, 100<br/>
                                        Flow Table: 0 yerine <code>a</code>, 1 yerine <code>b</code> yazılarak aynı tablo harflerle temsil edilir.
                                        </p>
                                    </div>
                                </div>

                                {/* Q2 */}
                                <div className="border border-[#DAF1DE] rounded-xl overflow-hidden">
                                    <div className="bg-[#F2F7F4] p-4 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 2: Yarış ve Kararlılık (Race & Stability) Tespiti</h3>
                                        <p className="text-sm text-[#235347]">Verilen 3 farklı Transition Table'ı inceleyerek Race Condition (Yarış durumu) olup olmadığını ve stabiliteyi belirleyiniz.</p>
                                    </div>
                                    <div className="p-5 text-sm space-y-4">
                                        <ul className="space-y-4">
                                            <li><strong>Tablo A:</strong> Geçişler <code>00 &rarr; 01 &rarr; 11 &rarr; 10</code> (hepsinde sadece tek bir bit değişiyor). Bu nedenle <strong>Race Yoktur</strong>. Sistem stabil duruma (10) varır.</li>
                                            <li><strong>Tablo B:</strong> Geçiş <code>00 &rarr; 11</code> şeklindedir (İki bit birden değişiyor). Bu nedenle <strong>Race Vardır</strong>. Üstelik ara durumlara düşüldüğünde oralarda hapsolma (kilitlenme) ihtimali olduğu için bu bir <strong>Critical Race</strong>'dir.</li>
                                            <li><strong>Tablo C:</strong> Geçiş <code>00 &rarr; 01 &rarr; 11 &rarr; 10 &rarr; 00</code> şeklinde dönmektedir. Tek bit değiştiği için race yoktur ancak sistem bir türlü kararlı duruma ulaşamayıp döngüye (cycle) girdiği için <strong>Unstable (Kararsız) Circuit</strong> olarak adlandırılır.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Q3 & Q4 */}
                                <div className="border border-[#DAF1DE] rounded-xl overflow-hidden">
                                    <div className="bg-[#F2F7F4] p-4 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 3 ve 4: Latch ile Gerçekleme (Implementation)</h3>
                                        <p className="text-sm text-[#235347]">Soru 1'deki devreyi (Y = x1.x2 + (x1+x2)y) D Latch ve JK Latch kullanarak yeniden tasarlayınız.</p>
                                    </div>
                                    <div className="p-5 text-sm space-y-4">
                                        <p><strong>D Latch:</strong> Çok basittir. Y formülünden çıkan kablo doğrudan D Latch'in D girişine bağlanır.</p>
                                        <p><strong>JK Latch:</strong> Önce Transition table çizilir. Ardından JK Latch'in "Excitation Table" (Uyarma Tablosu) kullanılarak J ve K pinleri için haritalar çıkarılır. Çıkan sonuç:
                                        <br/><code>J = x1.x2</code>
                                        <br/><code>K = x1'.x2'</code>
                                        <br/>Devre bu yeni J ve K formüllerine göre çizilir.</p>
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
