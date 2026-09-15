"use client";

import React, { useState } from "react";
import { Cpu, MemoryStick, Target, PenTool, LayoutTemplate, ShieldAlert, ListChecks, ServerCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { DatapathVisualizer } from "@/components/visualizers/logic/DatapathVisualizer";

export default function FSMsDatapathsPage() {
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
                        <ServerCog className="w-4 h-4" /> 
                        Bölüm 8: FSMs (Sonlu Durum Makineleri) ve Datapaths (Veriyolları)
                    </h2>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap bg-white rounded-xl shadow-sm border border-slate-200 p-2 gap-2">
                    {[
                        { id: "overview", label: "Datapath & Control Unit Nedir?", icon: <LayoutTemplate className="w-4 h-4" /> },
                        { id: "adder_sub", label: "Örnek: Adder/Subtracter Sistemi", icon: <Target className="w-4 h-4" /> },
                        { id: "rt_operations", label: "Register Transfer (RT) Operasyonları", icon: <MemoryStick className="w-4 h-4" /> },
                        { id: "fsm_design", label: "FSM Tasarım Örnekleri (PPT)", icon: <PenTool className="w-4 h-4" /> },
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
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Dijital Sistem Tasarımı: FSM ve Datapath</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                <p>
                                    Karmaşık dijital sistemler (örneğin işlemciler) genellikle iki ana parçadan oluşur: <strong>Datapath (Veriyolu)</strong> ve <strong>Control Unit (Kontrol Birimi - FSM)</strong>.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="border rounded-xl p-5 bg-blue-50/50 border-blue-200">
                                        <h3 className="text-xl font-bold text-blue-800 mb-2">Datapath (Veriyolu)</h3>
                                        <p className="mb-3 text-sm">Verinin depolandığı, işlendiği ve aktarıldığı kısımdır. İçerisinde geçici depolama için <strong>Register'lar</strong> (Kaydediciler) ve veriyi işlemek için <strong>Combinational Logic</strong> (ALU, Adder, Multiplexer) bulunur.</p>
                                        <p className="text-sm font-bold text-blue-700">Görevi: "İşi yapan kas gücü"</p>
                                    </div>
                                    <div className="border rounded-xl p-5 bg-purple-50/50 border-purple-200">
                                        <h3 className="text-xl font-bold text-purple-800 mb-2">Control Unit (FSM)</h3>
                                        <p className="mb-3 text-sm">Datapath'in ne zaman ne yapacağını yöneten beyindir. Bir Sonlu Durum Makinesi (FSM) olarak tasarlanır. Dışarıdan gelen komutlara (Start, Stop vb.) göre Datapath'e <strong>Kontrol Sinyalleri</strong> (Load, Clear, Add/Sub) gönderir.</p>
                                        <p className="text-sm font-bold text-purple-700">Görevi: "İşi yöneten beyin"</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ADDER/SUBTRACTER TAB */}
                    {activeTab === "adder_sub" && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
                                <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Örnek: Adder/Subtracter Sistemi</h2>
                                <div className="text-slate-700 leading-relaxed space-y-6">
                                    <p>Bu örnekte Datapath, iki adet Register (R1 ve R2) ve bir Toplayıcı/Çıkarıcı (ALU) içerir. Control Unit (FSM) ise sırasıyla verileri registerlara yükler, işlemi seçer ve sonucu kaydeder.</p>
                                    
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Girişler:</strong> START, SUBTRACT (0 ise topla, 1 ise çıkar).</li>
                                        <li><strong>FSM Çıkışları (Kontrol Sinyalleri):</strong> ADD/SUB, LOAD_R2, LOAD_R1, RST.</li>
                                        <li><strong>Durumlar (States):</strong> S0 (Bekleme), S1 (R1'e Yükle), S2 (R2'ye Yükle), S3 (Topla), S4 (Çıkar), S5 (Bitiş).</li>
                                    </ul>
                                </div>
                            </div>

                            {/* VISUALIZER */}
                            <DatapathVisualizer />

                        </section>
                    )}

                    {/* REGISTER TRANSFER TAB */}
                    {activeTab === "rt_operations" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Register Transfer (RT) Operasyonları</h2>
                            <div className="text-slate-700 leading-relaxed space-y-6">
                                
                                <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                                    <div className="bg-slate-100 p-4 border-b">
                                        <h3 className="font-bold text-[#163832] text-lg">Örnek 1: Tek Clock Cycle'da Veri Aktarımı</h3>
                                    </div>
                                    <div className="p-5 text-sm space-y-4">
                                        <p>Şu işlemleri <strong>aynı (tek) saat döngüsünde (1 clock cycle)</strong> yapmak istiyoruz:</p>
                                        <ul className="list-disc pl-5 font-mono mb-2">
                                            <li>RA &larr; RB (RB'nin içeriğini RA'ya at)</li>
                                            <li>RB &larr; RC (RC'nin içeriğini RB'ye at)</li>
                                            <li>RA &larr; RC (RC'nin içeriğini RA'ya at)</li>
                                        </ul>
                                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-amber-900">
                                            <strong>Dikkat:</strong> RA'ya aynı anda hem RB'den hem RC'den veri yazılamaz! Bu nedenle RA'nın girişine bir <strong>Multiplexer (MUX)</strong> konulmalıdır. MUX'un seçici pini, hangi kaynaktan veri alınacağını belirler. RB'nin girişine ise doğrudan RC bağlanabilir.
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-slate-200 rounded-xl overflow-hidden">
                                    <div className="bg-slate-100 p-4 border-b">
                                        <h3 className="font-bold text-[#163832] text-lg">Örnek 2: Mod Seçimli 4-bit Register Tasarımı</h3>
                                    </div>
                                    <div className="p-5 text-sm space-y-4">
                                        <p>4-bitlik bir register'ın S1 ve S0 pinleri ile davranışını kontrol etmek (Datapath tasarlamak).</p>
                                        <p><strong>Çözüm (Bit-sliced implementation):</strong> Her bir bit için (D-FF) ayrı ayrı 4x1 MUX kullanılır. 00'da kendi çıkışını alır (Hold), 01'de 0 alır (Clear), 10'da tersini alır (Complement), 11'de dışarıdan giriş alır (Load). Toplam 4 adet MUX ve 4 adet D-FF ile Datapath oluşturulur.</p>
                                    </div>
                                </div>

                            </div>
                        </section>
                    )}

                    {/* FSM DESIGN TAB */}
                    {activeTab === "fsm_design" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">FSM Tasarım Örnekleri (PPT)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8">
                                
                                <div className="border border-slate-200 rounded-xl p-6 relative">
                                    <ShieldAlert className="absolute top-6 right-6 text-slate-300 w-12 h-12" />
                                    <h3 className="font-bold text-[#163832] text-lg mb-2">Örnek 3: Senkron Test Cihazı (Moore Machine)</h3>
                                    <p className="text-sm mb-4">Seri olarak gelen Ölçülen (Measured Vector - MV) ve Beklenen (Expected Vector - EV) verileri karşılaştıran bir sistem.</p>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li><strong>Random Error (RE):</strong> Eşleşmeme (mismatch) anında 1 olur.</li>
                                        <li><strong>Oscillating Error (OE):</strong> Mismatch &rarr; Match &rarr; Mismatch dizilimi (101 veya 010 şeklinde salınım) görüldüğünde 1 olur.</li>
                                        <li><strong>Test Fail (TF):</strong> Test bitip Start=0 olduğunda, test boyunca hiç hata olduysa 1 kalır.</li>
                                    </ul>
                                    <div className="mt-4 p-4 bg-[#F2F7F4] border border-[#DAF1DE] rounded-lg text-sm">
                                        <strong>Moore vs Mealy:</strong> Çıkışlar clock kenarını beklediği için bu bir <strong>Moore Machine</strong>'dir. En az 3 adet Flip-Flop gerekir (Çünkü state sayısı 4 ile 8 arasındadır). Eğer One-Hot assignment yapılsaydı her state için ayrı FF gerekeceğinden 7 FF gerekirdi.
                                    </div>
                                </div>

                                <div className="border border-slate-200 rounded-xl p-6">
                                    <h3 className="font-bold text-[#163832] text-lg mb-2">Örnek 4: Skipping Sequencer (Atlayan Sayıcı)</h3>
                                    <p className="text-sm mb-4">Normalde 0, 1, ... 15, 0, 1 şeklinde sayan bir sayıcı (Up-Counter) var. Ancak <strong>2, 6, 10, 14</strong> sayılarını atlaması (skip) isteniyor.</p>
                                    <p className="text-sm"><strong>Çözüm Yolu:</strong> Sayıcının dışına eklenen kombinasyonel lojik ile, bu sayılara gelineceği anlaşıldığı an "Load" sinyali tetiklenerek sayıcının bir sonraki değere atlaması sağlanır. Gürültü (noise) sebebiyle yanlışlıkla 2, 6, 10, 14 değerlerine düşerse (forbidden states), sayıcı "Up-Counter" mantığıyla çalışmaya devam ettiği için 1 clock cycle sonra hemen 3, 7, 11, 15 gibi geçerli durumlara kendi kendini düzelterek (self-correcting) dönecektir.</p>
                                </div>

                            </div>
                        </section>
                    )}

                    {/* SOLVED QUESTIONS TAB */}
                    {activeTab === "solved" && (
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b pb-4">Çözümlü Sorular (Chapter 8 PDF)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8">
                                
                                {/* Q1 */}
                                <div className="border border-[#DAF1DE] rounded-xl overflow-hidden">
                                    <div className="bg-[#F2F7F4] p-4 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 1: FSM ve Datapath Blok Diyagramı</h3>
                                        <p className="text-sm text-[#235347]">Active-low reset'i olan ve x, y kontrol girişleri olan devre. x=1, y=0 ise Register R bir artırılır (Increment) ve S2'ye geçilir. x=0, y=1 ise Register R sıfırlanır (Clear) ve S3'e geçilir. Aksi halde başlangıç durumunda kalır.</p>
                                    </div>
                                    <div className="p-5 text-sm space-y-4">
                                        <p><strong>Çözüm A (Flow Chart / Akış Şeması):</strong><br/>
                                        S1 kutusundan çıkışta önce Reset (0 ise kendine, 1 ise devam), sonra x=1 ve y=0 kararları (baklava dilimi) çizilir. İlgili şart sağlandığında kutucuk içine Datapath işlemleri (Inc-R veya Clr-R) yazılır.
                                        </p>
                                        <p><strong>Çözüm B (Blok Diyagram):</strong><br/>
                                        Sistem iki kutuya bölünür: <strong>Control (FSM)</strong> ve <strong>Datapath</strong>.<br/>
                                        FSM'ye dışarıdan <code>x</code>, <code>y</code> ve <code>CLR</code> girişleri girer. FSM'den çıkan <code>CLR-R</code> ve <code>INC-R</code> okları Datapath'e gider. Datapath'in içinde ise sadece <code>R</code> (Register) çizimi bulunur.
                                        </p>
                                    </div>
                                </div>

                                {/* Q2 */}
                                <div className="border border-[#DAF1DE] rounded-xl overflow-hidden">
                                    <div className="bg-[#F2F7F4] p-4 border-b border-[#DAF1DE]">
                                        <h3 className="font-bold text-[#163832] text-lg">Soru 2: State Diagram'dan Devre Tasarımına (D-FF)</h3>
                                        <p className="text-sm text-[#235347]">4 durumlu (S0, S1, S2, S3) ve x, y girişli bir state diagram verilmiştir. Tablo oluşturup K-Map ile denklemleri bulunuz.</p>
                                    </div>
                                    <div className="p-5 text-sm space-y-4">
                                        <p><strong>Çözüm Adımları:</strong></p>
                                        <ol className="list-decimal pl-5 space-y-2">
                                            <li><strong>State Assignment:</strong> S0=00, S1=01, S2=10, S3=11 ataması (A ve B Flip-Flopları) yapıldı.</li>
                                            <li><strong>State Table:</strong> Present State (A, B) ve Input (x, y) değerlerine göre Next State (A+, B+) haritası çıkarıldı. (Örn: S0(00)'dan x=1 gelirse S1(01)'e gidiyor. Demek ki x=1, y=0 için A+=0, B+=1).</li>
                                            <li><strong>Next State Equations:</strong> 4 değişkenli (A, B, x, y) K-Map çizildi. A+ ve B+ için (D Flip Flop kullanıldığı için D_A = A+ ve D_B = B+ olur) denklemler bulundu:
                                                <ul className="list-disc pl-5 mt-1 font-mono bg-slate-50 p-2 rounded">
                                                    <li>A+ = A'B + AB'x + Bx'</li>
                                                    <li>B+ = A'Bx + A'By + Bx'y' + B'xy</li>
                                                </ul>
                                            </li>
                                            <li><strong>Implementation:</strong> Bulunan lojik denklemler AND, OR, NOT kapıları ve D Flip-Flop kutuları kullanılarak şematik olarak çizildi. (Eğer State Reduction yapılsaydı devrenin daha basit çıkacağı notu eklendi).</li>
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
