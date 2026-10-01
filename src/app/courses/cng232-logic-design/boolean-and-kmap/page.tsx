"use client";

import React, { useState } from "react";
import { Cpu, Table, ListTree, CheckCircle2, AlertTriangle, Layers, Grid } from "lucide-react";
import { cn } from "@/lib/utils";
import { KMapGrid } from "@/components/visualizers/logic/KMapGrid";
import { analyzeKMap } from "@/lib/algorithms/logicSolver";

export default function BooleanAndKMapPage() {
    const [numVars, setNumVars] = useState<number>(4);
    
    const [cells, setCells] = useState<any[]>(Array(16).fill(0));
    const [solution, setSolution] = useState<any>(null);

    const handleNumVarsChange = (vars: number) => {
        setNumVars(vars);
        setCells(Array(Math.pow(2, vars)).fill(0));
        setSolution(null);
    };

    const handleCellClick = (minterm: number) => {
        const newCells = [...cells];
        const current = newCells[minterm];
        if (current === 0) newCells[minterm] = 1;
        else if (current === 1) newCells[minterm] = 'X';
        else newCells[minterm] = 0;
        setCells(newCells);
        setSolution(null);
    };

    const handleSolve = () => {
        const result = analyzeKMap(cells, numVars);
        setSolution(result);
    };

    const loadPreset = (presetType: string) => {
        let newCells;
        if (presetType === "slide16") {
            handleNumVarsChange(4);
            // Slide 16 mapping (minterms: 1, 4, 5, 6, 7, 8, 9, 10, 11, 13)
            newCells = Array(16).fill(0);
            [1, 4, 5, 6, 7, 8, 9, 10, 11, 13].forEach(m => newCells[m] = 1);
            setCells(newCells);
            setSolution(null);
        } else if (presetType === "slide24") {
            handleNumVarsChange(3);
            newCells = Array(8).fill(0);
            [0, 1, 2, 3, 5, 6].forEach(m => newCells[m] = 1);
            setCells(newCells);
            setSolution(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAF9] text-[#051F20] p-4 sm:p-8 flex justify-center">
            <div className="max-w-5xl w-full flex flex-col gap-10">
                
                {/* Header */}
                <header className="border-b border-slate-300 pb-6">
                    <div className="flex items-center gap-3 text-[#051F20] mb-2">
                        <Cpu className="w-10 h-10 text-[#235347]" />
                        <h1 className="text-3xl font-extrabold tracking-tight">CNG 232</h1>
                    </div>
                    <h2 className="text-lg font-semibold text-[#235347] flex items-center gap-2 mt-1">
                        <Table className="w-5 h-5" /> 
                        3. Boolean Algebra & K-Maps (Karnaugh Haritaları)
                    </h2>
                    <p className="mt-3 text-slate-600 font-medium leading-relaxed">
                        Boolean fonksiyonlarını kapı seviyesinde sadeleştirmek (Gate-level minimisation) donanım maliyetini düşürmek için şarttır. Cebirsel kurallarla (Algebraic Manipulation) sadeleştirme yapmak belirli bir kural seti olmadığı için zordur. Bunun yerine görsel ve hatasız bir yöntem olan <strong>Karnaugh Haritalarını (K-Map)</strong> kullanırız.
                    </p>
                </header>

                <div className="flex flex-col gap-12">
                    
                    {/* Topic 1: K-Map Fundamentals */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><Grid className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">1. Harita Yapısı ve Gray Code (Gray Kodu)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-5 text-lg">
                            <p>
                                Karnaugh Haritası, doğruluk tablosunun (Truth Table) pikseller (kareler) halinde görselleştirilmiş halidir. Değişken sayısına (n) göre 2<sup>n</sup> adet kareden oluşur (2 değişken = 4 kare, 3 değişken = 8 kare, 4 değişken = 16 kare).
                            </p>
                            
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                                <h3 className="font-bold text-blue-900 mb-2 text-xl">Neden Normal Binary Değil de Gray Code?</h3>
                                <p className="text-base text-blue-800">
                                    Satır ve sütun dizilimleri (00, 01, 10, 11) şeklinde sayılmaz. Haritada sıralama <strong>00, 01, 11, 10</strong> şeklindedir. Buna <strong>Gray Code</strong> denir.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-3 text-base text-blue-900 font-medium">
                                    <li>Gray kodunda yan yana olan herhangi iki kare arasında sadece <strong>tek bir bit (değişken)</strong> değişir.</li>
                                    <li>Bu sayede yan yana (komşu) olan iki kareyi birleştirip ortak paranteze alabiliriz. Örneğin: <strong>X'YZ + XYZ = YZ(X' + X) = YZ</strong>.</li>
                                    <li>K-Map'in alt kısmı en üst kısımla, sağ kısmı en sol kısımla komşudur (harita küre gibi birbirine katlanabilir).</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Topic 2: Grouping Rules */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><Layers className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">2. Gruplama Kuralları ve Dikdörtgenler</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-5 text-lg">
                            <p>Amaç, haritadaki tüm 1'leri gruplamaktır (SOP - Sum of Products elde etmek için). Gruplama yaparken donanım maliyetini minimize etmek için iki altın kuralımız vardır:</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-3 border-b pb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Kural 1: En Az Grup
                                    </h4>
                                    <p className="text-base">Mümkün olan <strong>en az sayıda</strong> dikdörtgen çizmeliyiz. Her yeni dikdörtgen devrede yeni bir AND kapısı demektir. Grup sayısı azaldıkça devre ucuzlar.</p>
                                </div>
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-3 border-b pb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Kural 2: En Büyük Grup
                                    </h4>
                                    <p className="text-base">Çizdiğimiz dikdörtgenler <strong>olabildiğince büyük</strong> olmalıdır. (1, 2, 4, 8, 16 karelik gruplar). Grup büyüdükçe ifadedeki değişken sayısı (literal) düşer.</p>
                                </div>
                            </div>

                            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200 mt-6 flex items-start gap-4">
                                <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-rose-900 mb-2">Redundant (Gereksiz) Gruplar</h3>
                                    <p className="text-base text-rose-800">
                                        Eğer çizdiğiniz bir grubun içindeki tüm 1'ler zaten başka gruplar tarafından kapsanıyorsa, bu grup gereksizdir (redundant). Fonksiyonel olarak yanlış olmasa da, <strong>optimal değildir</strong> ve tam puan alamazsınız. K-Map her zaman en sade hali ister.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Topic 3: POS and Don't Cares */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><ListTree className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">3. POS Bulma ve Don't Care Durumları</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-6 text-lg">
                            
                            <div className="border border-indigo-200 bg-indigo-50 rounded-2xl p-6">
                                <h3 className="font-bold text-indigo-900 text-xl mb-3">POS (Product of Sums) Nasıl Bulunur?</h3>
                                <p className="text-base text-indigo-800 mb-4">Eğer soru bizden Mintermlerin toplamı yerine Maxtermlerin çarpımını (POS) istiyorsa en kolay yöntem şudur:</p>
                                <ol className="list-decimal pl-5 space-y-2 text-indigo-800 text-base">
                                    <li>Haritadaki 1'leri değil, <strong>0'ları</strong> gruplayın.</li>
                                    <li>Bu size fonksiyonun değili olan <strong>F'</strong> ifadesini SOP formunda verecektir. (Örn: F' = A + BC')</li>
                                    <li>Bulduğunuz F' ifadesine <strong>De Morgan</strong> uygulayarak F'yi bulun.</li>
                                    <li>F = (A + BC')' = A' · (BC')' = <strong>A' · (B' + C)</strong> &nbsp;&nbsp;&larr; POS Formu!</li>
                                </ol>
                            </div>

                            <div className="border border-emerald-200 bg-emerald-50 rounded-2xl p-6">
                                <h3 className="font-bold text-emerald-900 text-xl mb-3">Don't Care Durumları (X)</h3>
                                <p className="text-base text-emerald-800">
                                    Bazen bazı girdilerin gelmesi imkansızdır (örneğin BCD kodunda 1010 gelmesi imkansızdır). Bu durumda sonucun 0 veya 1 olması umrumuzda olmaz. Bunları haritada <strong>X (Don't Care)</strong> ile gösteririz.
                                </p>
                                <ul className="list-disc pl-5 mt-3 space-y-2 text-emerald-800 text-base font-medium">
                                    <li>X'leri eğer grubumuzu (dikdörtgeni) <strong>büyütmeye</strong> yarıyorsa 1 olarak kabul edebiliriz.</li>
                                    <li>Eğer işimize yaramıyorsa onları 0 olarak kabul edip gruplamayız.</li>
                                    <li>Sırf bir X'i kapsamak için yeni bir grup <strong>ASLA</strong> açılmaz! Sadece var olan grubu büyütmek için kullanılır.</li>
                                </ul>
                            </div>
                            
                        </div>
                    </section>

                    {/* Interactive Section */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-100 pb-4">
                            <h2 className="text-2xl font-bold text-[#163832]">K-Map Çözücü Simülatörü</h2>
                            <div className="flex items-center gap-4">
                                <div className="text-base font-medium text-slate-500">Değişken:</div>
                                <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                                    {[2, 3, 4].map(v => (
                                        <button
                                            key={v}
                                            onClick={() => handleNumVarsChange(v)}
                                            className={cn(
                                                "px-4 py-1.5 rounded-md font-bold transition-all text-sm",
                                                numVars === v 
                                                    ? "bg-[#235347] text-white shadow-sm" 
                                                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
                                            )}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-8 bg-amber-50 p-4 rounded-xl border border-amber-200">
                            <div className="text-sm font-bold text-amber-900 w-full sm:w-auto">Slayt Örnekleri:</div>
                            <button onClick={() => loadPreset("slide24")} className="px-4 py-2 bg-white border border-amber-300 text-amber-800 font-bold rounded-lg hover:bg-amber-100 text-sm shadow-sm transition-all">Slayt 24 (3 Değişken)</button>
                            <button onClick={() => loadPreset("slide16")} className="px-4 py-2 bg-white border border-amber-300 text-amber-800 font-bold rounded-lg hover:bg-amber-100 text-sm shadow-sm transition-all">Slayt 16 (4 Değişken)</button>
                            <p className="text-xs text-amber-700 w-full mt-1">Karelere tıklayarak değerini değiştirebilirsiniz (0, 1, X)</p>
                        </div>

                        <div className="overflow-x-auto pb-4">
                            <KMapGrid 
                                cells={cells} 
                                numVars={numVars} 
                                onCellClick={handleCellClick} 
                                groups={solution?.groups || []}
                            />
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleSolve}
                                className="px-10 py-4 bg-[#235347] text-white text-lg font-bold rounded-2xl hover:bg-[#163832] transition-colors shadow-lg hover:shadow-xl active:translate-y-0.5"
                            >
                                En Sade Hali Bul (Minimize)
                            </button>
                        </div>
                        
                        {solution && (
                            <div className="mt-10 p-8 bg-[#F2F7F4] border border-[#DAF1DE] rounded-2xl animate-in fade-in slide-in-from-bottom-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-[#163832] flex items-center gap-2 border-b border-[#235347]/20 pb-2">
                                            SOP (Sum of Products)
                                        </h3>
                                        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#235347]/10 font-mono text-xl text-[#235347]">
                                            F = {solution.sop.expression || '0'}
                                        </div>
                                        <div className="text-base text-slate-700 mt-4 bg-white p-4 rounded-xl border border-slate-100">
                                            <p className="font-bold text-slate-900 mb-2">Prime Implicants (Olası Gruplar):</p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {solution.sop.primeImplicants.map((pi: string, i: number) => (
                                                    <li key={i}>{pi}</li>
                                                ))}
                                                {solution.sop.primeImplicants.length === 0 && <li>Bulunamadı (0)</li>}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-[#163832] flex items-center gap-2 border-b border-[#235347]/20 pb-2">
                                            POS (Product of Sums)
                                        </h3>
                                        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#235347]/10 font-mono text-xl text-[#235347]">
                                            F = {solution.pos.expression || '1'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
