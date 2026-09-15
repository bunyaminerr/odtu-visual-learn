"use client";

import React from "react";
import { Cpu, Binary, Calculator, Activity, GitBranch } from "lucide-react";
import { BaseConverter } from "@/components/visualizers/logic/BaseConverter";
import { BinaryArithmetic } from "@/components/visualizers/logic/BinaryArithmetic";

export default function DigitalSystemsPage() {
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
                        <Binary className="w-4 h-4" /> 
                        Digital Systems and Binary Numbers (Dijital Sistemler ve İkili Sayılar)
                    </h2>
                </header>

                <div className="flex flex-col gap-12">
                    
                    {/* Section 1: Intro */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4 text-[#235347]">
                            <Activity className="w-6 h-6" />
                            <h2 className="text-xl font-bold">1. Analog ve Dijital Sistemler (Analog vs Digital)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-4">
                            <p>Dünya analogdur, ancak bilgiyi işlemek için dijital sistemler kullanırız. <strong>Analog sinyaller</strong> sürekli (continuous) değerler alırken, <strong>Dijital sinyaller</strong> sadece belirli ayrık (discrete) değerleri alırlar.</p>
                            <p>Bilgisayarlar dijitaldir ve <strong>Binary (İkili)</strong> sayı sistemini kullanırlar. Voltaj seviyeleri iki durumu ifade eder:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>Positive Logic (Pozitif Mantık):</strong> Yüksek Voltaj (High) = 1 (True), Düşük Voltaj (Low) = 0 (False). (En çok bu kullanılır)</li>
                                <li><strong>Negative Logic (Negatif Mantık):</strong> Yüksek Voltaj (High) = 0 (False), Düşük Voltaj (Low) = 1 (True).</li>
                            </ul>
                            <div className="mt-4 bg-[#F2F7F4] p-4 rounded-xl border border-[#DAF1DE]">
                                <h3 className="font-bold mb-2 text-[#163832]">Tasarım Soyutlama Seviyeleri (Design Abstraction Levels)</h3>
                                <p className="text-sm text-[#235347]">Elektronik cihazları anlamak için tasarımları soyutlarız: <br/><strong>Cihaz (Transistor) $\rightarrow$ Devre (Circuit) $\rightarrow$ Kapı (Gate) $\rightarrow$ Modül (Module) $\rightarrow$ Sistem (System)</strong></p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Base Conversions */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4 text-[#235347]">
                            <GitBranch className="w-6 h-6" />
                            <h2 className="text-xl font-bold">2. Sayı Sistemleri ve Taban Dönüşümleri (Base Conversion)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-4 mb-8">
                            <p>Bilgisayar mimarisinde genellikle dört taban kullanılır: <strong>Ondalık (Decimal - 10)</strong>, <strong>İkili (Binary - 2)</strong>, <strong>Sekizli (Octal - 8)</strong>, ve <strong>Onaltılı (Hexadecimal - 16)</strong>.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>Decimal'den Binary'e Geçiş:</strong> Tam sayı kısmı 2'ye bölünerek kalanlar (remainders) tersten alınır. Kesirli (fractional) kısım ise 2 ile çarpılarak tam sayı olan katsayılar düz sırayla alınır.</li>
                                <li><strong>Octal (8) ve Hexadecimal (16):</strong> $2^3 = 8$ olduğu için Octal sistemdeki her basamak tam olarak <strong>3 bite</strong> eşittir. $2^4 = 16$ olduğu için Hexadecimal sistemdeki her basamak <strong>4 bite</strong> eşittir. Bu yüzden Binary'den Octal veya Hexadecimal'e geçerken sayıları üçerli veya dörderli gruplamak yeterlidir.</li>
                            </ul>
                        </div>
                        
                        {/* Interactive Base Converter */}
                        <BaseConverter />
                    </section>

                    {/* Section 3: Arithmetic */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4 text-[#235347]">
                            <Calculator className="w-6 h-6" />
                            <h2 className="text-xl font-bold">3. İkili Aritmetik (Binary Arithmetic)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-4 mb-8">
                            <p>Binary (ikili) matematikteki toplama ve çıkarma, günlük hayattaki ondalık matematikle tamamen aynıdır, sadece taban 2'dir. Toplamada, bir sütun 2'ye (veya daha fazlasına) ulaşırsa bir sonraki basamağa <strong>Elde (Carry)</strong> gönderilir. Çıkarmada, üstteki sayı küçükse bir yandaki basamaktan <strong>Borç (Borrow)</strong> alınır ve bu borç ondalık sistemdeki gibi 10 değil, <strong>2 değerindedir</strong>.</p>
                        </div>
                        
                        {/* Interactive Arithmetic */}
                        <BinaryArithmetic />
                    </section>

                    {/* Section 4: Complements */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4 text-[#235347]">
                            <Activity className="w-6 h-6" />
                            <h2 className="text-xl font-bold">4. Negatif Sayılar ve Tümleyen (Complements) Algoritması</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-4">
                            <p>Bilgisayarların eksi (-) işareti yoktur, sadece 0 ve 1'leri vardır. Bu yüzden negatif sayıları hafızada tutmak için tümleyen (complement) kullanırız. 3 farklı metot vardır:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>Signed Magnitude (İşaret-Büyüklük):</strong> En sol basamak (MSB - Most Significant Bit) işareti belirler. (0 = Pozitif, 1 = Negatif). Geri kalan bitler sayının büyüklüğünü temsil eder.</li>
                                <li><strong>1's Complement (1'in Tümleyeni / Diminished Radix):</strong> Tüm 0'ları 1, 1'leri 0 yaparak elde edilir. Matematiksel olarak $(2^n - 1) - N$ formülüne denktir.</li>
                                <li><strong>2's Complement (2'nin Tümleyeni / Radix):</strong> 1'in Tümleyenine sadece "1" eklenerek bulunur. Modern bilgisayarların kullandığı standart metottur. Çünkü bu metotta toplama donanımı kullanılarak çıkarma da yapılabilir (Donanım maliyetini inanılmaz düşürür).</li>
                            </ul>
                            <div className="mt-4 bg-amber-50 p-4 rounded-xl border border-amber-200">
                                <h3 className="font-bold mb-2 text-amber-800 text-sm">Örnek: +85 ve -85 sayılarının 8-bit gösterimi</h3>
                                <p className="font-mono text-sm text-amber-900">
                                    +85: 01010101<br/><br/>
                                    <strong>Signed Magnitude (-85):</strong> 11010101 (Sadece en soldaki bit değişti)<br/>
                                    <strong>1's Complement (-85):</strong> 10101010 (Bütün bitler tersine çevrildi)<br/>
                                    <strong>2's Complement (-85):</strong> 10101011 (1's complement'e +1 eklendi)
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
