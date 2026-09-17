"use client";

import React, { useState } from "react";
import { Cpu, MemoryStick, Activity, Info, AlertTriangle, Layers, ListChecks, Network, ShieldCheck, Zap, ArrowRight, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { RegisterVisualizer } from "@/components/visualizers/logic/RegisterVisualizer";

export default function RegistersCountersPage() {
    const [activeTab, setActiveTab] = useState("registers");

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
                        6. Kaydediciler (Registers) ve Sayıcılar (Counters)
                    </h2>
                    <p className="mt-4 text-slate-600 font-medium leading-relaxed text-lg">
                        Bu bölümde ardışıl devrelerin en yaygın yapıtaşları olan Register'ları (veri tutucular) ve Counter'ları (sayıcılar) inceliyoruz. Sınavlarda özellikle <strong>tasarım mantığı, MUX bağlantıları ve kullanılmayan durumların (unused states) analizi</strong> sorgulanır.
                    </p>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap bg-white rounded-2xl shadow-sm border border-slate-200 p-2 gap-2">
                    {[
                        { id: "registers", label: "Registers & Shift Reg", icon: <Layers className="w-4 h-4" /> },
                        { id: "counters", label: "Ripple vs Senkron", icon: <Activity className="w-4 h-4" /> },
                        { id: "ring", label: "Ring & Johnson", icon: <Network className="w-4 h-4" /> },
                        { id: "solved", label: "Hoca Gözünden Çözümler", icon: <ListChecks className="w-4 h-4" /> }
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
                    
                    {/* REGISTERS TAB */}
                    {activeTab === "registers" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Registers (Kaydediciler)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                <p>
                                    Register, n-bitlik dijital veriyi saklamak için yan yana dizilmiş n adet Flip-Flop (genelde D-FF) grubudur. Tüm FF'ler aynı Clock (Saat) ve Clear (Temizleme) sinyaline bağlıdır.
                                </p>
                                
                                <div className="space-y-6">
                                    <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                                        <h3 className="font-bold text-[#163832] text-xl mb-3 flex items-center gap-2"><ArrowDown className="w-5 h-5 text-[#235347]"/> Parallel Load Register (Paralel Yükleme)</h3>
                                        <p className="text-base mb-4">Paralel yükleme, tüm bitlerin <strong>aynı anda</strong> register'a yazılmasıdır. Bir D-FF'in saat (clock) pinine kapı bağlamak tehlikeli olduğu için (clock skew problemi yaratır), yükleme işlemi <strong>2x1 MUX (Multiplexer)</strong> kullanılarak D girişinde kontrol edilir.</p>
                                        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center">
                                            <div className="text-sm font-mono text-center mb-2 font-bold text-slate-500">MUX Bağlantı Mantığı (Tek Bit İçin)</div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <div className="bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-lg text-sm text-right">Eski Değer (Q) &rarr; Giriş 0</div>
                                                    <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg text-sm text-right">Yeni Değer (Data) &rarr; Giriş 1</div>
                                                </div>
                                                <div className="bg-slate-800 text-white p-3 rounded-lg flex items-center justify-center font-bold">2x1 MUX</div>
                                                <ArrowRight className="text-slate-400" />
                                                <div className="bg-rose-50 text-rose-800 border border-rose-200 p-4 rounded-lg font-bold">D Flip-Flop</div>
                                            </div>
                                            <div className="mt-3 text-sm text-[#235347] bg-[#DAF1DE] px-3 py-1 rounded-full font-bold">Select Pini = Load Sinyali</div>
                                        </div>
                                    </div>

                                    <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                                        <h3 className="font-bold text-[#163832] text-xl mb-3 flex items-center gap-2"><ArrowRight className="w-5 h-5 text-[#235347]"/> Shift Register (Kaydırmalı Kaydedici)</h3>
                                        <p className="text-base mb-4">Flip-Flop'ların seri olarak birbirine bağlandığı yapıdır. Birinci FF'in çıkışı (Q), ikinci FF'in girişine (D) bağlanır. Her clock vuruşunda veri 1 bit yana kayar.</p>
                                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-sm text-amber-900 mb-4 font-medium">
                                            <strong>Sınav Tüyosu:</strong> Seri kaydırmada en soldan giren veriye "Serial Input (SI)", en sağdan dışarı düşen veriye "Serial Output (SO)" denir. Eğer kaybolmasını istemiyorsak SO'yu tekrar başa bağlarız (Bkz: Ring Counter).
                                        </div>
                                    </div>

                                    <div className="border border-blue-200 rounded-2xl p-6 bg-blue-50">
                                        <h3 className="font-bold text-blue-900 text-xl mb-3 flex items-center gap-2"><Zap className="w-5 h-5"/> Universal Shift Register (Evrensel)</h3>
                                        <p className="text-base text-blue-800 mb-4">En kompleks register türüdür. Her D-FF'in önünde bir <strong>4x1 MUX</strong> bulunur. MUX'un seçici pinleri (S1, S0) devrenin ne yapacağına karar verir. Bir hocanın size soracağı tasarım şu şekildedir:</p>
                                        <div className="overflow-x-auto bg-white rounded-xl border border-blue-200">
                                            <table className="w-full text-center text-sm">
                                                <thead className="bg-blue-900 text-white">
                                                    <tr><th className="p-2 border-r border-blue-800">S1</th><th className="p-2 border-r border-blue-800">S0</th><th className="p-2 border-r border-blue-800">İşlem (Operation)</th><th className="p-2">4x1 MUX'un Bağlandığı Yer</th></tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b"><td className="p-2 font-bold border-r">0</td><td className="p-2 font-bold border-r">0</td><td className="p-2 border-r text-slate-600">Hold (Durumu Koru)</td><td className="p-2 text-left text-slate-700">Kendi FF'inin çıkışına (Q)</td></tr>
                                                    <tr className="border-b"><td className="p-2 font-bold border-r">0</td><td className="p-2 font-bold border-r">1</td><td className="p-2 border-r text-slate-600">Shift Right (Sağa Kaydır)</td><td className="p-2 text-left text-slate-700">Solundaki FF'in çıkışına (Q_L)</td></tr>
                                                    <tr className="border-b"><td className="p-2 font-bold border-r">1</td><td className="p-2 font-bold border-r">0</td><td className="p-2 border-r text-slate-600">Shift Left (Sola Kaydır)</td><td className="p-2 text-left text-slate-700">Sağındaki FF'in çıkışına (Q_R)</td></tr>
                                                    <tr><td className="p-2 font-bold border-r">1</td><td className="p-2 font-bold border-r">1</td><td className="p-2 border-r text-slate-600">Parallel Load (Paralel Yükle)</td><td className="p-2 text-left text-slate-700">Dışarıdan gelen paralel Data pinine</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 bg-[#F2F7F4] border border-[#DAF1DE] rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-[#163832] mb-4">Evrensel Shift Register Simülatörü</h3>
                                <RegisterVisualizer />
                            </div>
                        </section>
                    )}

                    {/* COUNTERS TAB */}
                    {activeTab === "counters" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Sayıcılar (Counters): Ripple vs Senkron</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-white border-2 border-rose-200 rounded-2xl p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Asenkron</div>
                                        <h3 className="font-bold text-rose-900 text-xl mb-4 mt-2">1. Ripple Counters</h3>
                                        <p className="text-base mb-4 text-slate-600">Flip-Flop'lar <strong>aynı Clock sinyalini kullanmaz</strong>. Sadece ilk FF (LSB) harici clock'a bağlıdır. Sonraki FF'lerin clock'u, bir önceki FF'in çıkışından tetiklenir.</p>
                                        <ul className="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
                                            <li>Tasarımı çok basittir, daha az donanım (kapı) gerektirir.</li>
                                            <li>Genelde T veya J-K (iki ucu 1'e bağlanmış) Flip-Flop ile yapılır.</li>
                                        </ul>
                                        <div className="mt-4 bg-rose-50 p-4 rounded-xl border border-rose-100">
                                            <h4 className="font-bold text-rose-900 text-sm mb-1 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Hız Sorunu (Propagation Delay)</h4>
                                            <p className="text-sm text-rose-800">Sinyal FF'ler üzerinden dalgalanarak (ripple) ilerlediği için her FF'in gecikmesi birbirine eklenir. <br/>Toplam Gecikme = <code>N &times; t<sub>pd</sub></code><br/>Hızlı sistemlerde asla kullanılmaz!</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Senkron</div>
                                        <h3 className="font-bold text-emerald-900 text-xl mb-4 mt-2">2. Synchronous Counters</h3>
                                        <p className="text-base mb-4 text-slate-600">Tüm Flip-Flop'lar <strong>aynı Clock sinyaline</strong> doğrudan bağlıdır. Tüm bitler aynı anda güncellenir.</p>
                                        <ul className="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
                                            <li>"Hangi FF durum değiştirecek?" sorusunu kapılar (AND gates) çözer.</li>
                                            <li>Örneğin bir FF sadece kendinden önceki tüm FF'ler '1' ise durum değiştirir.</li>
                                        </ul>
                                        <div className="mt-4 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                            <h4 className="font-bold text-emerald-900 text-sm mb-1 flex items-center gap-2"><Zap className="w-4 h-4"/> Hız Avantajı</h4>
                                            <p className="text-sm text-emerald-800">Kaç bit olursa olsun, toplam gecikme süresi sadece <strong>tek bir FF gecikmesi + tek bir AND kapısı gecikmesi</strong> kadardır.<br/>Modern işlemcilerde standarttır.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 mt-6">
                                    <h3 className="font-bold text-[#163832] text-xl mb-4 border-b border-slate-200 pb-2">BCD (Decade) Ripple Counter Tasarım Mantığı</h3>
                                    <p className="text-base mb-4">BCD sayıcı 0'dan 9'a kadar sayar. 9'dan sonra 10 (<code>1010</code>) olduğunda kendini 0'a sıfırlamalıdır. Bunu yapmak için donanımda <strong>Asenkron Clear</strong> pinleri kullanılır.</p>
                                    <div className="bg-white border border-slate-200 rounded-xl p-5 font-medium text-sm text-slate-700 leading-relaxed shadow-sm">
                                        Hocanın sorusu: "Neden AND değil de NAND kapısı kullanıyoruz?"
                                        <br/><br/>
                                        <strong>Cevap:</strong> Çünkü piyasadaki Flip-Flop'ların `Clear` pinleri genelde <strong>Active-Low</strong>'dur (Üzerinde çizgi vardır). Yani 0 volt verirseniz içini temizler.
                                        10 (<code>Q3=1, Q2=0, Q1=1, Q0=0</code>) değerini yakaladığımız anda devreyi temizlemek için Q3 ve Q1'i bir NAND kapısına sokarız. İkisi de 1 olduğunda NAND `0` üretir ve tüm FF'lerin Clear pinine giderek devreyi anında `0000` yapar. 
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* RING & JOHNSON TAB */}
                    {activeTab === "ring" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Ring ve Johnson Counters</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                
                                <p>Her ikisi de aslında birer <strong>Shift Register</strong> devresidir, sayıcı (counter) gibi kullanılmalarının sebebi kendilerini tekrar eden döngüsel (cyclic) bir yapıya sahip olmalarıdır.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* RING */}
                                    <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col">
                                        <div className="bg-indigo-50 border-b border-indigo-100 p-5">
                                            <h3 className="text-xl font-bold text-indigo-900 mb-2">Ring Counter (Halka Sayıcı)</h3>
                                            <p className="text-sm text-indigo-800 font-medium">Son FF'in çıkışının (Q), ilk FF'in girişine bağlandığı devredir.</p>
                                        </div>
                                        <div className="p-5 flex-1">
                                            <ul className="list-disc pl-5 text-sm space-y-2 mb-4 text-slate-600">
                                                <li>Başlangıçta mutlaka içinde <strong>sadece bir adet '1'</strong> olan bir değere (örn: 1000) initialize edilmelidir. Yoksa 0000'da kalır.</li>
                                                <li>N adet FF ile sadece <strong>N adet state</strong> oluşturur. State israfı çoktur (MOD-N).</li>
                                            </ul>
                                            <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden mt-auto">
                                                <div className="bg-slate-200 p-2 text-xs font-bold text-center text-slate-700">4-Bit Ring Sayıcı Dizilimi</div>
                                                <table className="w-full text-center text-sm font-mono">
                                                    <tbody>
                                                        <tr className="border-b"><td className="p-2 text-indigo-600 font-bold bg-indigo-50">1</td><td className="p-2">0</td><td className="p-2">0</td><td className="p-2">0</td></tr>
                                                        <tr className="border-b"><td className="p-2">0</td><td className="p-2 text-indigo-600 font-bold bg-indigo-50">1</td><td className="p-2">0</td><td className="p-2">0</td></tr>
                                                        <tr className="border-b"><td className="p-2">0</td><td className="p-2">0</td><td className="p-2 text-indigo-600 font-bold bg-indigo-50">1</td><td className="p-2">0</td></tr>
                                                        <tr><td className="p-2">0</td><td className="p-2">0</td><td className="p-2">0</td><td className="p-2 text-indigo-600 font-bold bg-indigo-50">1</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* JOHNSON */}
                                    <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col">
                                        <div className="bg-emerald-50 border-b border-emerald-100 p-5">
                                            <h3 className="text-xl font-bold text-emerald-900 mb-2">Johnson (Switch-Tail) Counter</h3>
                                            <p className="text-sm text-emerald-800 font-medium">Son FF'in <strong>Ters (Inverted) çıkışının (Q')</strong>, ilk FF'in girişine bağlandığı devredir.</p>
                                        </div>
                                        <div className="p-5 flex-1">
                                            <ul className="list-disc pl-5 text-sm space-y-2 mb-4 text-slate-600">
                                                <li>Başlangıçta <code>0000</code> olarak initialize edilebilir. Önce 1'ler dolar, sonra 0'lar dolar.</li>
                                                <li>N adet FF ile <strong>2N adet state</strong> oluşturur. Ring'e göre çok daha verimlidir (MOD-2N).</li>
                                            </ul>
                                            <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden mt-auto">
                                                <div className="bg-slate-200 p-2 text-xs font-bold text-center text-slate-700">4-Bit Johnson Sayıcı Dizilimi</div>
                                                <table className="w-full text-center text-sm font-mono">
                                                    <tbody>
                                                        <tr className="border-b"><td className="p-1 text-slate-400">0</td><td className="p-1 text-slate-400">0</td><td className="p-1 text-slate-400">0</td><td className="p-1 text-slate-400">0</td></tr>
                                                        <tr className="border-b"><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 text-slate-400">0</td><td className="p-1 text-slate-400">0</td><td className="p-1 text-slate-400">0</td></tr>
                                                        <tr className="border-b"><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 text-slate-400">0</td><td className="p-1 text-slate-400">0</td></tr>
                                                        <tr className="border-b"><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 text-slate-400">0</td></tr>
                                                        <tr className="border-b"><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td></tr>
                                                        <tr className="border-b"><td className="p-1 text-slate-400">0</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td></tr>
                                                        <tr className="border-b"><td className="p-1 text-slate-400">0</td><td className="p-1 text-slate-400">0</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td></tr>
                                                        <tr><td className="p-1 text-slate-400">0</td><td className="p-1 text-slate-400">0</td><td className="p-1 text-slate-400">0</td><td className="p-1 font-bold text-emerald-600 bg-emerald-50">1</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* SOLVED QUESTIONS TAB */}
                    {activeTab === "solved" && (
                        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-2xl font-bold text-[#163832] mb-6 border-b border-slate-100 pb-4">Hoca Gözünden Çözümler (Self-Correcting Counters)</h2>
                            <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                                
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl">
                                    <h3 className="font-bold text-amber-900 text-xl mb-3 flex items-center gap-2"><ShieldCheck className="w-6 h-6"/> Self-Correcting (Kendini Düzülten) Sayıcı Nedir?</h3>
                                    <p className="text-base text-amber-900 leading-relaxed">
                                        Sınavda 3 bitlik bir sayıcı tasarladınız diyelim. Sayıcınızın dizilimi <code>000 &rarr; 001 &rarr; 010 &rarr; 011 &rarr; 100 &rarr; 101 &rarr; 110 &rarr; 000</code> olsun. 
                                        Dikkat ederseniz <code>111</code> durumu hiç kullanılmıyor (Unused State). 
                                        Tasarım (K-Map) aşamasında bu kullanılmayan durumun Next State'ine "Don't Care (X)" verdiniz ve haritanızı sadeleştirdiniz.
                                        <br/><br/>
                                        <strong>Peki elektrik kesintisi veya kozmik bir gürültü sonucu devreniz kazara <code>111</code> state'ine düşerse ne olur?</strong>
                                        <br/>
                                        Hoca sizden devreyi tasarladıktan sonra, devrenin giriş denklemlerini kullanarak "Acaba 111'deyken clock vurduğunda Next State ne çıkıyor?" diye test etmenizi ister. 
                                        Eğer 111'den çıkıp tanımlı olan (000'dan 110'a kadar) state'lerden birine düşüyorsa, devre kendi kendini kurtarmıştır <strong>(Self-Correcting)</strong>. 
                                        Eğer 111'den çıkıp yine 111'e (kilitlenme) dönüyorsa tasarımınız patlamıştır!
                                    </p>
                                </div>

                                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mt-6">
                                    <div className="bg-slate-50 border-b border-slate-200 p-6">
                                        <h3 className="font-bold text-[#163832] text-xl mb-2">Çözümlü Soru: Adım Adım Analiz</h3>
                                        <p className="text-sm text-slate-600 font-medium">J-K FF'ler ile tasarlanmış ve yukarıdaki gibi (0'dan 6'ya sayan) devrenin K-Map sonucu giriş denklemleri şu çıkmıştır:</p>
                                        <div className="bg-white border border-slate-200 rounded-lg p-3 mt-3 font-mono text-sm grid grid-cols-2 gap-2 text-[#235347] font-bold">
                                            <div>J_A = B · C</div><div>K_A = B</div>
                                            <div>J_B = C</div><div>K_B = A + C</div>
                                            <div>J_C = A' + B'</div><div>K_C = 1</div>
                                        </div>
                                    </div>
                                    <div className="p-6 text-base space-y-4">
                                        <p><strong>Görev:</strong> Bu devre self-correcting midir? Yani kazara <code>A=1, B=1, C=1</code> state'ine düşerse bir sonraki adımda nereye gider?</p>
                                        
                                        <div className="bg-[#F2F7F4] border border-[#DAF1DE] rounded-xl p-5 space-y-3">
                                            <p className="font-bold text-[#163832]">Adım 1: A=1, B=1, C=1 değerlerini formüllerde yerine koyalım:</p>
                                            <ul className="list-disc pl-5 font-mono text-sm space-y-1">
                                                <li>J_A = 1 · 1 = <span className="font-bold text-emerald-600">1</span>  |  K_A = <span className="font-bold text-emerald-600">1</span></li>
                                                <li>J_B = <span className="font-bold text-emerald-600">1</span>          |  K_B = 1 + 1 = <span className="font-bold text-emerald-600">1</span></li>
                                                <li>J_C = 0 + 0 = <span className="font-bold text-rose-600">0</span>  |  K_C = <span className="font-bold text-emerald-600">1</span></li>
                                            </ul>
                                        </div>

                                        <div className="bg-[#F2F7F4] border border-[#DAF1DE] rounded-xl p-5 space-y-3">
                                            <p className="font-bold text-[#163832]">Adım 2: JK FF Uyarma (Çalışma) kurallarına göre Next State (A+, B+, C+) bulalım:</p>
                                            <ul className="list-disc pl-5 font-mono text-sm space-y-2">
                                                <li>A FF için J=1, K=1. Bu <strong>Toggle</strong> (Tersle) demektir. Eski A=1 idi, o zaman <strong>A+ = 0</strong> olur.</li>
                                                <li>B FF için J=1, K=1. Bu <strong>Toggle</strong> (Tersle) demektir. Eski B=1 idi, o zaman <strong>B+ = 0</strong> olur.</li>
                                                <li>C FF için J=0, K=1. Bu <strong>Reset</strong> demektir. O zaman doğrudan <strong>C+ = 0</strong> olur.</li>
                                            </ul>
                                        </div>

                                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                                            <h4 className="font-bold text-emerald-900 mb-4 text-lg">Sonuç (Görsel State Diagram Analizi)</h4>
                                            
                                            <div className="flex flex-col items-center gap-6 mb-6">
                                                {/* Normal Sayım Döngüsü */}
                                                <div className="flex flex-wrap justify-center gap-3 bg-white p-4 rounded-xl border border-emerald-200 shadow-sm relative w-full">
                                                    <div className="absolute -top-3 left-4 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">Normal Döngü (Valid States)</div>
                                                    
                                                    {["000", "001", "010", "011", "100", "101", "110"].map((state, idx, arr) => (
                                                        <div key={state} className="flex items-center gap-3">
                                                            <div className="w-12 h-12 rounded-full border-2 border-[#235347] bg-[#DAF1DE] flex items-center justify-center font-bold text-[#163832] font-mono shadow-sm">
                                                                {state}
                                                            </div>
                                                            {idx < arr.length - 1 && <ArrowRight className="text-[#235347]" />}
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <ArrowDown className="text-emerald-500 w-8 h-8 -mt-2 animate-bounce" />
                                                
                                                {/* Unused State */}
                                                <div className="flex items-center gap-6 bg-white p-4 rounded-xl border border-rose-200 shadow-sm relative">
                                                    <div className="absolute -top-3 left-4 bg-rose-100 text-rose-800 text-xs font-bold px-2 py-1 rounded">Kullanılmayan Durum (Unused State)</div>
                                                    
                                                    <div className="w-12 h-12 rounded-full border-2 border-rose-500 bg-rose-50 flex items-center justify-center font-bold text-rose-700 font-mono shadow-sm shadow-rose-200">
                                                        111
                                                    </div>
                                                    
                                                    <div className="flex flex-col items-center text-emerald-600 font-bold text-sm">
                                                        <span>Self-Corrects to</span>
                                                        <ArrowRight className="text-emerald-500" />
                                                    </div>
                                                    
                                                    <div className="w-12 h-12 rounded-full border-2 border-[#235347] bg-[#DAF1DE] flex items-center justify-center font-bold text-[#163832] font-mono shadow-sm">
                                                        000
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-emerald-800 text-base font-medium">
                                                Görselde de görüldüğü gibi, devre kazara <code>111</code> state'ine düşerse, saat vurduğu anda Next State <code>000</code> olacaktır. 000 bizim normal sayım döngümüzün bir parçası olduğu için devre kurtulmuştur. <strong>Evet, bu devre Self-Correcting'dir!</strong>
                                            </p>
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
