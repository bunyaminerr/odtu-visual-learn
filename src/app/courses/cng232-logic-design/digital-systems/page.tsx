"use client";

import React from "react";
import { Cpu, Binary, Calculator, Activity, GitBranch, Key, Hash, SplitSquareHorizontal } from "lucide-react";
import { BaseConverter } from "@/components/visualizers/logic/BaseConverter";
import { BinaryArithmetic } from "@/components/visualizers/logic/BinaryArithmetic";

export default function DigitalSystemsPage() {
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
                        <Binary className="w-5 h-5" /> 
                        1. Digital Systems and Binary Numbers (Dijital Sistemler ve İkili Sayılar)
                    </h2>
                    <p className="mt-3 text-slate-600 font-medium leading-relaxed">
                        Bu bölüm, dijital sistemlerin temellerini atar. Sayı sistemleri, taban dönüşümleri, ikili aritmetik, tümleyen (complement) kavramı ve bilgisayarların veriyi saklamak için kullandığı özel ikili kodları (BCD, Gray, ASCII vb.) detaylıca öğrenip sınavlara tam hazırlıklı olabilirsiniz.
                    </p>
                </header>

                <div className="flex flex-col gap-12">
                    
                    {/* Section 1: Intro */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><Activity className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">1. Analog ve Dijital Sistemler (Analog vs Digital)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-5 text-lg">
                            <p>Dünyamız ve içindeki fiziksel büyüklükler (sıcaklık, basınç, ses) <strong>Analog</strong> (sürekli) yapıdadır. Ancak bu bilgileri bilgisayarlarda işlemek için onları <strong>Dijital</strong> (ayrık/kesikli) sinyallere çeviririz. Dijital sinyaller yalnızca belirli değerleri alabilir (örneğin 0 ve 1).</p>
                            
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-3 text-xl">Mantık Seviyeleri (Logic Levels)</h3>
                                <p>Dijital sistemlerde voltaj seviyeleri bilgiyi temsil eder. İki ana gösterim vardır:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-3 text-base">
                                    <li><strong>Positive Logic (Pozitif Mantık):</strong> Yüksek Voltaj (High) = 1 (True), Düşük Voltaj (Low) = 0 (False). <em>(Sınavlarda ve endüstride standart olarak bu varsayılır.)</em></li>
                                    <li><strong>Negative Logic (Negatif Mantık):</strong> Yüksek Voltaj (High) = 0 (False), Düşük Voltaj (Low) = 1 (True).</li>
                                </ul>
                            </div>

                            <div className="bg-[#F2F7F4] p-6 rounded-2xl border border-[#DAF1DE]">
                                <h3 className="font-bold text-[#163832] mb-3 text-xl">Tasarım Soyutlama Seviyeleri (Design Abstraction Levels)</h3>
                                <p className="text-[#235347] mb-3 text-base">Karmaşık dijital sistemleri (örneğin bir işlemciyi) tasarlarken her detayı aynı anda düşünemeyiz. Bu yüzden aşağıdan yukarıya doğru "soyutlama" yaparız:</p>
                                <ol className="list-decimal pl-6 space-y-2 text-[#163832] text-base font-medium">
                                    <li><strong>Cihaz (Device):</strong> Transistörler (NMOS, PMOS).</li>
                                    <li><strong>Devre (Circuit):</strong> Transistörlerin birleşimiyle oluşan elektriksel yapılar.</li>
                                    <li><strong>Kapı (Gate):</strong> Lojik kapılar (AND, OR, NOT). (CNG 232'nin ana odak noktası)</li>
                                    <li><strong>Modül (Module):</strong> Kapıların birleşimi (Toplayıcılar, Multiplexer'lar, Register'lar).</li>
                                    <li><strong>Sistem (System):</strong> Modüllerin birleşimi (Örn: Komple bir Bilgisayar veya Mikrodenetleyici).</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Base Conversions */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><GitBranch className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">2. Sayı Sistemleri ve Taban Dönüşümleri (Base Conversion)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-5 text-lg mb-8">
                            <p>Bilgisayar mimarisinde genellikle dört taban kullanılır: <strong>Ondalık (Decimal - 10)</strong>, <strong>İkili (Binary - 2)</strong>, <strong>Sekizli (Octal - 8)</strong>, ve <strong>Onaltılı (Hexadecimal - 16)</strong>.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-base">
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Decimal'den Binary'e Geçiş</h4>
                                    <p className="mb-2"><strong>Tam Sayılar İçin:</strong> Sayıyı sürekli 2'ye böleriz. Kalanları (remainders) yazarız ve sonucu tersten okuruz (Son kalan MSB'dir).</p>
                                    <p><strong>Kesirli Sayılar İçin:</strong> Kesirli kısmı 2 ile çarparız. Çıkan sonucun tam sayı kısmını alırız (0 veya 1). Kalan kesirli kısmı tekrar 2 ile çarparız. Bu sefer yukarıdan aşağıya (düz) okuruz.</p>
                                </div>
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Binary'den Octal ve Hexadecimal'e Geçiş</h4>
                                    <p><strong>Octal (8'lik):</strong> $2^3 = 8$ olduğundan, Binary sayıyı virgül noktasından (radix point) başlayarak <strong>3'erli gruplara</strong> ayırıp her grubun Decimal karşılığını yazarız.</p>
                                    <p className="mt-2"><strong>Hexadecimal (16'lık):</strong> $2^4 = 16$ olduğundan, Binary sayıyı <strong>4'erli gruplara</strong> ayırırız. (10=A, 11=B, 12=C, 13=D, 14=E, 15=F)</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Interactive Base Converter */}
                        <div className="border border-slate-200 rounded-2xl overflow-hidden">
                            <BaseConverter />
                        </div>
                    </section>

                    {/* Section 3: Arithmetic */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><Calculator className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">3. İkili Aritmetik (Binary Arithmetic)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-6 text-lg mb-8">
                            <p>Binary matematikteki işlemler günlük hayattaki ondalık matematikle tamamen aynıdır, tek fark tabanın 10 yerine 2 olmasıdır.</p>
                            
                            <div className="space-y-4">
                                <div className="p-5 border-l-4 border-[#235347] bg-slate-50 rounded-r-2xl">
                                    <h3 className="font-bold text-slate-800 mb-2 text-lg">Toplama (Addition)</h3>
                                    <p className="text-base mb-2">1 + 1 = 10 (Yani sonuç 0, elde (carry) var 1). 1 + 1 + 1 = 11 (Sonuç 1, elde var 1).</p>
                                </div>
                                
                                <div className="p-5 border-l-4 border-amber-500 bg-amber-50 rounded-r-2xl">
                                    <h3 className="font-bold text-slate-800 mb-2 text-lg">Çıkarma (Subtraction) ve "Borç Alma" (Borrow)</h3>
                                    <p className="text-base mb-2">Çıkarmada, üstteki basamak küçükse bir yandaki (soldaki) basamaktan borç alınır. Ondalık sistemde borç aldığımızda +10 ekleriz. <strong>Binary sistemde borç alındığında +2 (yani 10 in binary) eklenir.</strong></p>
                                    <pre className="text-sm bg-white p-3 rounded-xl border border-amber-200 font-mono text-amber-900 overflow-x-auto">
{`   0 2  (Borç alındıktan sonra)
   1 0 1  (5)
 - 0 1 1  (3)
---------
   0 1 0  (2)`}
                                    </pre>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-5 border-l-4 border-blue-500 bg-blue-50 rounded-r-2xl">
                                        <h3 className="font-bold text-slate-800 mb-2 text-lg">Çarpma (Multiplication)</h3>
                                        <p className="text-base text-slate-700">Binary çarpma, ondalık çarpmadan bile kolaydır. Çünkü çarpan (multiplier) sadece 0 veya 1 olabilir. Çarpan 1 ise üstteki sayı aynen yazılır, 0 ise sıfır yazılır. Sonra yana kaydırılarak toplanır.</p>
                                    </div>
                                    <div className="p-5 border-l-4 border-purple-500 bg-purple-50 rounded-r-2xl">
                                        <h3 className="font-bold text-slate-800 mb-2 text-lg">Bölme (Division)</h3>
                                        <p className="text-base text-slate-700">Uzun bölme algoritması ondalık sistemdeki gibidir. Bölünen sayının solundan başlayarak bölen sayının sığıp sığmadığına bakılır. Sığıyorsa (≥) bölüme 1 yazılıp çıkarma yapılır, sığmıyorsa 0 yazılıp bir basamak yana kayılır.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Interactive Arithmetic */}
                        <div className="border border-slate-200 rounded-2xl overflow-hidden">
                            <BinaryArithmetic />
                        </div>
                    </section>

                    {/* Section 4: Complements */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><SplitSquareHorizontal className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">4. Negatif Sayılar ve Tümleyen (Complements)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-6 text-lg">
                            <p>Bilgisayarların eksi (-) işareti tutabilecek özel bir bileşeni yoktur; sadece 0 ve 1'leri vardır. Bu yüzden negatif sayıları hafızada tutmak için özel gösterimler veya tümleyen (complement) kullanırız.</p>
                            
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-xl text-slate-800 mb-3">1. İşaret-Büyüklük (Signed Magnitude) Gösterimi</h3>
                                    <p className="text-base">En sol basamak (MSB - Most Significant Bit) işareti belirler. (0 = Pozitif, 1 = Negatif). Geri kalan bitler sayının büyüklüğünü temsil eder. Sıfırın hem +0 (00000000) hem de -0 (10000000) olarak iki gösterimi olması dezavantajdır.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-xl text-slate-800 mb-3">2. 1'in Tümleyeni (1's Complement / Diminished Radix)</h3>
                                    <p className="text-base">Bir sayının 1'in tümleyenini bulmak için <strong>tüm 0'ları 1, tüm 1'leri 0</strong> yaparız. Örneğin <code>01010101 (+85)</code> sayısının 1'in tümleyeni <code>10101010 (-85)</code> olur. Bunda da +0 ve -0 problemi vardır.</p>
                                </div>

                                <div className="bg-[#235347] text-white p-6 rounded-2xl shadow-md">
                                    <h3 className="font-bold text-xl mb-3 flex items-center gap-2 text-[#DAF1DE]">
                                        3. 2'nin Tümleyeni (2's Complement / Radix) 
                                        <span className="text-xs bg-white text-[#235347] px-2 py-1 rounded-full font-bold ml-2">Standart</span>
                                    </h3>
                                    <p className="text-sm md:text-base opacity-90 mb-4">
                                        Modern bilgisayarların kullandığı standart metottur. 1'in Tümleyenine sadece <strong>"+ 1"</strong> eklenerek bulunur. 
                                    </p>
                                    <p className="text-sm md:text-base font-semibold mb-2">Pratik Yol (Sınav Taktiği):</p>
                                    <p className="text-sm md:text-base opacity-90 mb-4 border-l-2 border-[#DAF1DE] pl-4">
                                        Sayının sağından (LSB) sola doğru okumaya başla. Karşılaştığın ilk "1"i dahil olmak üzere aynen yaz. Geri kalan tüm bitleri ters çevir!
                                    </p>
                                    <div className="bg-[#163832] p-4 rounded-xl font-mono text-sm">
                                        Sayı: 10110<strong>100</strong> <br/>
                                        2's Comp: 01001<strong>100</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-200">
                                <h3 className="font-bold mb-3 text-blue-900 text-xl">2's Complement Aritmetiği (Çıkarma İşlemi)</h3>
                                <p className="text-base text-blue-800 mb-3">
                                    2's complement kullanmanın en büyük avantajı: <strong>A - B</strong> işlemini yapmak için çıkarma devresi kurmak zorunda değiliz! Bunun yerine <strong>A + (B'nin 2's complementi)</strong> işlemi yaparız ve normal toplama devresini kullanırız.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-base text-blue-900 mb-4">
                                    <li>Eğer en sonda (MSB dışında) bir elde (carry) oluşursa, onu atarız (ignore carry). Sonuç pozitiftir.</li>
                                    <li>Eğer elde (carry) oluşmazsa, sonuç negatiftir. Sonucun mutlak değerini bulmak için sonucun tekrar 2's complementi alınır.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Binary Codes (NEW) */}
                    <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-6 text-[#235347] border-b border-slate-100 pb-4">
                            <div className="p-3 bg-[#DAF1DE] rounded-xl"><Hash className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">5. İkili Kodlar (Binary Codes)</h2>
                        </div>
                        <div className="text-slate-700 leading-relaxed space-y-8 text-lg">
                            <p>Bilgisayarlar sadece sayıları değil, metinleri ve günlük hayatta kullandığımız desimal sistemin basamaklarını da Binary formatta saklamak zorundadır. Bunun için çeşitli kodlamalar geliştirilmiştir.</p>
                            
                            {/* BCD */}
                            <div className="border border-slate-200 rounded-2xl overflow-hidden">
                                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                                    <h3 className="font-bold text-slate-800 text-xl">Binary-Coded Decimal (BCD)</h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-base mb-4">
                                        Günlük hayattaki ondalık sayıları insanların daha kolay okuması için geliştirilmiştir. BCD kodlamasında, ondalık (decimal) sayının <strong>her bir basamağı 4-bitlik binary</strong> ile temsil edilir. Sadece 0 ile 9 (0000 ile 1001) arası kullanılır. 1010'dan 1111'e kadar olan 6 kombinasyon BCD'de <strong>GEÇERSİZ (invalid)</strong> olarak kabul edilir.
                                    </p>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 font-mono text-sm overflow-x-auto text-slate-800">
                                        Decimal 185 = (0001) (1000) (0101) BCD<br/>
                                        (Binary karşılığı ise tamamen farklıdır: 10111001)
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-lg mb-2">BCD Toplaması (BCD Addition)</h4>
                                    <p className="text-base mb-3">BCD sayıları toplanırken normal binary toplama yapılır. Ancak sonuç 9'u geçerse (yani 1010 veya daha büyük bir değer çıkarsa) sonuç "Geçersiz BCD" olur. Bunu düzeltmek için sonuca <strong>+6 (0110)</strong> eklenir ve bir sonraki gruba elde (carry) gönderilir.</p>
                                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 font-mono text-sm text-rose-900 overflow-x-auto">
                                        Örnek: 5 + 9 = 14 (BCD)<br/>
                                        &nbsp;&nbsp;0101 (5)<br/>
                                        + 1001 (9)<br/>
                                        -------<br/>
                                        &nbsp;&nbsp;1110 (14 - Geçersiz! &gt; 9)<br/>
                                        + 0110 (Düzeltme için +6 ekle)<br/>
                                        -------<br/>
                                        1 0100 (Elde var 1, sonuç 4. Yani: 1 4)
                                    </div>
                                </div>
                            </div>

                            {/* Gray Code */}
                            <div className="border border-slate-200 rounded-2xl overflow-hidden">
                                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                                    <h3 className="font-bold text-slate-800 text-xl">Gray Code</h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-base mb-4">
                                        Gray kodun en önemli özelliği, ardışık herhangi iki sayı arasında <strong>sadece 1 bitin</strong> değişmesidir. Normal binary saymada (örneğin 3'ten 4'e geçerken: 011 -&gt; 100) aynı anda 3 bit değişir, bu da elektronik sensörlerde anlık okuma hatalarına (glitch) sebep olabilir. Gray Code bunu önler. Karnaugh Haritalarında (K-Map) da kullanılır.
                                    </p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left text-slate-700 border-collapse">
                                            <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                                                <tr>
                                                    <th className="px-4 py-3 border">Decimal</th>
                                                    <th className="px-4 py-3 border">Binary</th>
                                                    <th className="px-4 py-3 border bg-[#DAF1DE]">Gray Code</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td className="px-4 py-2 border">0</td><td className="px-4 py-2 border">000</td><td className="px-4 py-2 border font-bold">000</td></tr>
                                                <tr><td className="px-4 py-2 border">1</td><td className="px-4 py-2 border">001</td><td className="px-4 py-2 border font-bold">001</td></tr>
                                                <tr><td className="px-4 py-2 border">2</td><td className="px-4 py-2 border">010</td><td className="px-4 py-2 border font-bold">011</td></tr>
                                                <tr><td className="px-4 py-2 border">3</td><td className="px-4 py-2 border">011</td><td className="px-4 py-2 border font-bold">010</td></tr>
                                                <tr><td className="px-4 py-2 border">4</td><td className="px-4 py-2 border">100</td><td className="px-4 py-2 border font-bold">110</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* ASCII & Parity */}
                            <div className="border border-slate-200 rounded-2xl overflow-hidden">
                                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                                    <h3 className="font-bold text-slate-800 text-xl flex items-center gap-2">
                                        ASCII Karakter Kodu ve Parity Bit (Hata Tespiti)
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-base mb-4">
                                        <strong>ASCII (American Standard Code for Information Interchange):</strong> Klavyedeki harfleri, rakamları ve sembolleri bilgisayara aktarmak için kullanılan 7-bitlik standart kodlamadır. (Toplam $2^7 = 128$ karakter). Örn: 'A' harfi = 1000001 (Decimal 65).
                                    </p>
                                    <p className="text-base mb-4">
                                        <strong>Parity Bit (Eşlik Biti):</strong> 7-bitlik ASCII kodu genellikle hafızaya 8-bit (1 byte) olarak yazılır. Kalan 8. bit, veri iletimi sırasında oluşabilecek hataları tespit etmek için <strong>Parity Bit</strong> olarak kullanılır.
                                    </p>
                                    <ul className="list-disc pl-6 space-y-3 text-base text-slate-700">
                                        <li><strong>Even Parity (Çift Eşlik):</strong> Mesajdaki toplam "1" sayısının <em>çift</em> olması istenir. Gerekirse Parity biti 1 yapılarak toplam sayı çiftlenir. <br/><span className="text-sm opacity-80">(Örn 'A' = 1000001. İki tane 1 var, zaten çift. O yüzden Even Parity bit = 0. Gönderilen mesaj: 01000001)</span></li>
                                        <li><strong>Odd Parity (Tek Eşlik):</strong> Mesajdaki toplam "1" sayısının <em>tek</em> olması istenir. Gerekirse Parity biti 1 yapılarak toplam sayı teklenir. <br/><span className="text-sm opacity-80">(Örn 'A' = 1000001. İki tane 1 var (çift). Toplamı tek yapmak için Odd Parity bit = 1 olmalı. Gönderilen mesaj: 11000001)</span></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
