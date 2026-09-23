import React from 'react';
import ExtendedEuclideanVisualizer from '@/components/visualizers/cng223/ExtendedEuclideanVisualizer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function AlgorithmsIntegersMatricesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Algorithms, Integers, Matrices</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Bilgisayar bilimlerinin kalbi olan <strong>Algoritma Karmaşıklığı (Big-O)</strong>, sayılar teorisi ve özellikle Kriptografinin temelini oluşturan <strong>Modüler Aritmetik</strong> konularına hoş geldiniz.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Genişletilmiş Öklid Algoritması (Extended Euclidean)</h2>
        </div>
        <p className="text-slate-600">
          Bu algoritma sadece iki sayının EBOB'unu (GCD) bulmakla kalmaz, aynı zamanda <InlineMath math="a \cdot s + b \cdot t = \text{gcd}(a,b)" /> eşitliğini sağlayan <strong>Bezout Katsayılarını (<InlineMath math="s, t"/>)</strong> bulur. 
          En büyük gücü ise, sayılar aralarında asalsa (<InlineMath math="\text{gcd}=1"/>) Modüler Tersi (Modular Inverse) anında verebilmesidir.
        </p>
        <div className="mt-4">
          <ExtendedEuclideanVisualizer />
        </div>
      </section>

      {/* Detailed Theoretical Content */}
      <section className="space-y-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-slate-800">Kapsamlı Konu Anlatımı</h2>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          
          {/* 1. Algorithms & Complexity */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">1. Algoritmalar ve Karmaşıklık (Algorithms & Complexity)</h3>
            <p className="text-slate-700">
              Bir <strong>Algoritma</strong>, bir problemi çözmek veya hesaplama yapmak için kullanılan sonlu sayıdaki kesin adımlar kümesidir.
              ODTÜ slaytlarına göre bir algoritmanın sağlaması gereken temel özellikler şunlardır:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Input/Output:</strong> Belirli bir kümeden girdi alır ve çıktı üretir.</li>
              <li><strong>Definiteness (Kesinlik):</strong> Her adım tam ve açık olarak tanımlanmalıdır.</li>
              <li><strong>Correctness (Doğruluk):</strong> Her girdi için doğru çıktıyı üretmelidir.</li>
              <li><strong>Finiteness (Sonluluk):</strong> Sonlu sayıda adımdan sonra mutlaka sonlanmalıdır.</li>
              <li><strong>Effectiveness (Etkililik):</strong> Her adım sonlu bir sürede gerçekleştirilebilmelidir.</li>
              <li><strong>Generality (Genellik):</strong> Sadece tek bir girdiye değil, problemin tüm formlarına çalışmalıdır.</li>
            </ul>

            <h4 className="text-xl font-semibold text-slate-800 mb-3">Asimptotik Büyüme (Growth of Functions)</h4>
            <p className="text-slate-700 mb-4">
              Algoritmaların maliyetini (zaman/hafıza) ölçmek için <strong>Asimptotik Notasyonlar</strong> kullanılır. Bunların en önemlisi Big-O notasyonudur.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h5 className="font-bold text-slate-800 mb-2">Big-O Notasyonu Tanımı:</h5>
              <p className="text-slate-700 mb-3">
                Eğer <InlineMath math="x > k" /> olan tüm <InlineMath math="x" /> değerleri için <InlineMath math="|f(x)| \leq C |g(x)|" /> eşitsizliğini sağlayan 
                <InlineMath math="C" /> ve <InlineMath math="k" /> sabitleri (witnesses) varsa, <InlineMath math="f(x)" /> fonksiyonuna <InlineMath math="O(g(x))" /> denir.
              </p>
              <BlockMath math="\exists C, k \in \mathbb{R}^+ \text{ s.t. } \forall x > k, \; |f(x)| \leq C|g(x)|" />
              <p className="text-sm text-slate-500 mt-2">
                * Sınavlarda bir fonksiyonun Big-O'sunu ispatlarken <InlineMath math="C" /> ve <InlineMath math="k" /> şahitlerini (witness) bularak eşitsizliği kanıtlamanız beklenir.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <h5 className="font-bold text-indigo-900">Big-Omega (<InlineMath math="\Omega" />) - Alt Sınır</h5>
                <p className="text-sm text-slate-700 mt-1">Eğer <InlineMath math="|f(x)| \geq C |g(x)|" /> ise <InlineMath math="f(x) \in \Omega(g(x))" />.</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <h5 className="font-bold text-emerald-900">Big-Theta (<InlineMath math="\Theta" />) - Kesin Sınır</h5>
                <p className="text-sm text-slate-700 mt-1">Hem Big-O hem Big-Omega ise, <InlineMath math="f(x) \in \Theta(g(x))" /> (Exact order of growth).</p>
              </div>
            </div>
          </div>

          {/* 2. Integers and Division */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">2. Tam Sayılar ve Bölünebilirlik (Integers & Division)</h3>
            <p className="text-slate-700 mb-4">
              <InlineMath math="a" /> ve <InlineMath math="b" /> tam sayı ve <InlineMath math="a \neq 0" /> olmak üzere, eğer <InlineMath math="b = a \cdot c" /> olacak şekilde bir <InlineMath math="c" /> tam sayısı varsa, 
              <strong>"a böler b"</strong> denir ve <InlineMath math="a \mid b" /> şeklinde gösterilir.
            </p>
            
            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Bölme Algoritması (Division Algorithm)</h4>
            <p className="text-slate-700 mb-3">
              Bir <InlineMath math="a" /> tam sayısı, pozitif bir <InlineMath math="d" /> tam sayısına bölündüğünde; benzersiz (unique) bir <strong>Bölüm (Quotient, q)</strong> ve <strong>Kalan (Remainder, r)</strong> vardır:
            </p>
            <BlockMath math="a = d \cdot q + r \quad (0 \leq r < d)" />
            <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm text-slate-700 inline-block">
              <InlineMath math="q = a \text{ div } d" /> (Bölüm) <br/>
              <InlineMath math="r = a \text{ mod } d" /> (Kalan)
            </div>

            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-8">Modüler Denkler (Congruence Modulo m)</h4>
            <p className="text-slate-700 mb-3">
              Eğer <InlineMath math="a" /> ve <InlineMath math="b" /> sayılarının <InlineMath math="m" /> ile bölümünden kalanlar eşitse, <strong>"a denktir b mod m"</strong> denir.
              Teorem olarak şu iki tanım birbirine tamamen eşdeğerdir:
            </p>
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
              <BlockMath math="a \equiv b \pmod m \iff m \mid (a - b) \iff a = b + k \cdot m" />
            </div>
            <p className="text-slate-700 mt-4">
              <strong>Önemli Kural:</strong> Eğer <InlineMath math="a \equiv b \pmod m" /> ve <InlineMath math="c \equiv d \pmod m" /> ise; <br/>
              <InlineMath math="(a+c) \equiv (b+d) \pmod m" /> ve <InlineMath math="(ac) \equiv (bd) \pmod m" />
            </p>
          </div>

          {/* 3. Primes and GCD */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">3. Asal Sayılar ve Öklid Algoritmaları</h3>
            <p className="text-slate-700 mb-4">
              Sadece 1 ve kendisine bölünebilen <InlineMath math="p > 1" /> sayılarına <strong>Asal Sayı (Prime)</strong> denir. 
              <strong>Aritmetiğin Temel Teoremi</strong>'ne göre her pozitif tam sayı asal sayıların çarpımı olarak <em>benzersiz</em> bir şekilde yazılabilir (Asal çarpanlara ayırma).
            </p>

            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-6">EBOB (Greatest Common Divisor)</h4>
            <p className="text-slate-700 mb-3">
              İki sayıyı aynı anda bölen en büyük pozitif tam sayıya EBOB (GCD) denir. 
              Eğer <InlineMath math="\text{gcd}(a,b) = 1" /> ise, bu iki sayı <strong>aralarında asaldır (Relatively Prime)</strong>.
            </p>
            
            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Bezout Teoremi ve Extended Euclidean</h4>
            <p className="text-slate-700 mb-3">
              Sınavların banko sorusu olan <strong>Bezout Kimliği (Bezout's Identity)</strong> der ki; <InlineMath math="a" /> ve <InlineMath math="b" /> tam sayı ise, öyle <InlineMath math="s" /> ve <InlineMath math="t" /> tam sayıları vardır ki:
            </p>
            <BlockMath math="a \cdot s + b \cdot t = \text{gcd}(a, b)" />
            <p className="text-slate-700 mt-4">
              İşte bu <InlineMath math="s" /> ve <InlineMath math="t" /> katsayılarını bulmak için <strong>Genişletilmiş Öklid Algoritması (Extended Euclidean Algorithm)</strong> kullanılır.
              Eğer sayılar aralarında asalsa (<InlineMath math="\text{gcd} = 1" />), formül <InlineMath math="a \cdot s + b \cdot t = 1" /> haline gelir. Bu denkleme mod <InlineMath math="b" /> uygulandığında <InlineMath math="b \cdot t \equiv 0" /> olacağından geriye <InlineMath math="a \cdot s \equiv 1 \pmod b" /> kalır. 
              İşte bu <strong>s katsayısı</strong>, <InlineMath math="a" />'nın <InlineMath math="b" /> modundaki <strong>Tersi (Modular Inverse)</strong> olur! Kriptografi sistemleri (RSA) tamamen bu mantık üzerine kuruludur.
            </p>
          </div>

        </div>
      </section>

      {/* Pitfalls & Alerts */}
      <section className="space-y-6">
        <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-2xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-800 mb-2">ODTÜ Sınav Tuzağı: Negatif Sayıların Modu</h3>
              <p className="text-rose-700">
                Öğrenciler genellikle <InlineMath math="-5 \pmod 7" /> sorulduğunda cevabı <InlineMath math="-5" /> olarak bırakırlar. Ancak modüler aritmetikte sonuç <strong>her zaman pozitif (0 ile m-1 arası)</strong> olmalıdır.
                Doğru sonucu bulmak için sayıya mod değerini (7) eklersiniz: <InlineMath math="-5 + 7 = 2" />.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Question */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Global Örnek Soru: Modular Inverse</h2>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <span className="font-semibold text-slate-700">MIT 6.042J (Mathematics for Computer Science) Sınav Sorusu</span>
            <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-md">Zorluk: Orta</span>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-700">
              Genişletilmiş Öklid Algoritmasını (Extended Euclidean Algorithm) kullanarak aşağıdaki denkliği sağlayan <InlineMath math="x" /> değerini (tersini) bulunuz:
            </p>
            <div className="flex justify-center my-4">
              <span className="text-xl font-bold bg-slate-100 px-6 py-3 rounded-xl border border-slate-200">
                <InlineMath math="17x \equiv 1 \pmod{43}" />
              </span>
            </div>
            
            <div className="bg-slate-800 text-slate-300 rounded-xl p-5 font-mono text-sm leading-relaxed">
              <div className="text-emerald-400 mb-3">// Çözüm Adımları</div>
              <div>Bu soru aslında 17'nin 43 modundaki tersini (inverse) bulmamızı istiyor.</div>
              <div>Bunun için Extended Euclidean (a=43, b=17) algoritmasını işletiyoruz.</div>
              <br/>
              <div className="text-slate-400">
                1. 43 = 2 * 17 + 9 <br/>
                2. 17 = 1 * 9 + 8 <br/>
                3. 9 = 1 * 8 + 1 (Kalan 1 olduğuna göre GCD=1, tersi var!)<br/>
              </div>
              <br/>
              <div>Şimdi geriye doğru giderek 1'i 43 ve 17 cinsinden ifade edeceğiz (s ve t katsayıları):</div>
              <div className="text-slate-400">
                1 = 9 - 1 * 8 <br/>
                1 = 9 - 1 * (17 - 1 * 9) = 2 * 9 - 1 * 17 <br/>
                1 = 2 * (43 - 2 * 17) - 1 * 17 = 2 * 43 - 5 * 17 <br/>
              </div>
              <br/>
              <div className="text-emerald-400 font-bold">
                Bezout Katsayıları: s = -5 (17'nin katsayısı), t = 2 (43'ün katsayısı)
              </div>
              <div className="mt-2 text-rose-400 font-bold">
                DİKKAT! Tersimiz -5 çıktı ancak modüler aritmetikte sonucu pozitif vermeliyiz. <br/>
                -5 + 43 = 38.
              </div>
              <div className="mt-4 font-bold text-white text-lg border-t border-slate-600 pt-3">
                Cevap: x = 38
              </div>
              <div className="mt-3 text-slate-400 italic">
                * Yukarıdaki hesaplayıcıya A=43 ve B=17 girerek tablonun s1 ve t1 sütunlarındaki değerlerin tam olarak nasıl bulunduğunu görebilirsiniz!
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
