import React from 'react';
import RecursionVisualizer from '@/components/visualizers/cng223/RecursionVisualizer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function InductionAndRecursionPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Induction and Recursion</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Matematiğin en güçlü ispat tekniklerinden biri olan <strong>Tümevarım (Mathematical Induction)</strong> ve bilgisayar bilimlerindeki doğrudan yansıması olan <strong>Özyinelemeli Algoritmalar (Recursive Algorithms)</strong> dünyasına hoş geldiniz.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Call Stack & Özyineleme (Recursion) Simülatörü</h2>
        </div>
        <p className="text-slate-600">
          Matematiksel tümevarımın kodlamaya dökülmüş hali olan <strong>Recursion</strong>, başlangıçta anlaşılması en zor kavramlardan biridir. 
          Aşağıdaki araç ile <code>Fibonacci</code> veya <code>Factorial</code> gibi fonksiyonların bilgisayar belleğinde (Call Stack) nasıl dallandığını ve geriye dönerek (Backtracking) sonucu nasıl bulduğunu <strong>Play</strong> tuşuna basarak adım adım izleyebilirsiniz.
        </p>
        <div className="mt-4">
          <RecursionVisualizer />
        </div>
      </section>

      {/* Detailed Theoretical Content */}
      <section className="space-y-10 mt-12">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-slate-800">Kapsamlı Konu Anlatımı (ODTÜ Ders Notları)</h2>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          
          {/* 1. Mathematical Induction */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">1. Matematiksel Tümevarım (Mathematical Induction)</h3>
            <p className="text-slate-700">
              <InlineMath math="P(n)" /> bir önerme olsun. Matematiksel tümevarım, bu önermenin <strong>tüm pozitif tam sayılar</strong> (<InlineMath math="n \geq 1" />) için doğru olduğunu kanıtlamak için kullanılan "domino taşı" prensibidir.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-800 mb-2">Climbing an Infinite Ladder</h4>
                <p className="text-sm text-slate-700">
                  Sonsuz bir merdiven hayal edin:<br/>
                  1. Merdivenin ilk basamağına ulaşabiliyoruz.<br/>
                  2. Eğer herhangi bir basamağa ulaşabiliyorsak, kesinlikle bir sonraki basamağa da ulaşabiliyoruz.<br/>
                  <em>Sonuç: O halde merdivendeki her basamağa ulaşabiliriz!</em>
                </p>
              </div>
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Domino Taşı Etkisi</h4>
                <p className="text-sm text-slate-700">
                  Yan yana dizilmiş sonsuz domino taşları düşünün:<br/>
                  1. İlk taşı devirirsek (<InlineMath math="P(1)" />)...<br/>
                  2. Ve her taş devrildiğinde bir sonrakini de devirmeyi garantiliyorsa (<InlineMath math="P(k) \rightarrow P(k+1)" />)...<br/>
                  <em>Sonuç: Tüm taşlar devrilir!</em>
                </p>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-slate-800 mb-3">Tümevarım İspatının Adımları</h4>
            <ul className="list-decimal pl-6 space-y-3 text-slate-700 mb-6">
              <li>
                <strong>Basis Step (Temel Durum):</strong> <InlineMath math="P(1)" />'in doğru olduğu gösterilir. (İlk taşı devirme adımı).
              </li>
              <li>
                <strong>Inductive Step (Tümevarım Adımı):</strong> <InlineMath math="P(k)" />'nın doğru olduğu varsayılır (Inductive Hypothesis). Bu varsayım kullanılarak <InlineMath math="P(k+1)" />'in de doğru olmak zorunda olduğu ispatlanır.
              </li>
            </ul>
            <div className="bg-slate-100 px-6 py-4 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-700 block mb-2">Mantıksal Çıkarım Kuralı Olarak İfadesi:</span>
              <BlockMath math="[P(1) \land \forall k (P(k) \rightarrow P(k + 1))] \rightarrow \forall n P(n)" />
            </div>
          </div>

          {/* Pitfalls & Alerts */}
          <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-2xl shadow-sm my-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-rose-800 mb-2">ODTÜ Sınav Tuzağı: Base Case Unutkanlığı</h3>
                <p className="text-rose-700">
                  Öğrenciler genellikle <InlineMath math="P(k) \rightarrow P(k+1)" /> adımındaki yoğun cebirsel denklemlere odaklanırlar ve ispatın en başında <InlineMath math="P(1)" />'i yazmayı unuturlar. 
                  Bu durum kağıdınıza "0" verilmesiyle sonuçlanır. Neden mi? Çünkü <strong>ilk domino taşını devirmezseniz</strong>, taşların birbirini devirme yeteneği hiçbir işe yaramaz. Base Case olmadan Inductive Step'in hiçbir anlamı yoktur!
                </p>
              </div>
            </div>
          </div>

          {/* 2. Strong Induction and Well-Ordering */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">2. Güçlü Tümevarım (Strong Induction)</h3>
            <p className="text-slate-700 mb-4">
              Bazen bir önermenin <InlineMath math="P(k+1)" /> için doğru olduğunu göstermek için sadece <InlineMath math="P(k)" />'nın doğru olduğunu bilmek yetmez; <strong>k'ya kadar olan tüm önceki adımların</strong> doğru olduğunu varsaymamız gerekir.
            </p>
            <div className="bg-slate-50 px-6 py-4 rounded-xl border border-slate-200">
              <ul className="list-decimal pl-6 space-y-2 text-slate-700">
                <li><strong>Basis Step:</strong> <InlineMath math="P(1)" /> doğrudur.</li>
                <li><strong>Inductive Step:</strong> Tüm <InlineMath math="j \leq k" /> değerleri için <InlineMath math="P(j)" />'nin doğru olduğunu varsay ve bunun <InlineMath math="P(k+1)" />'i doğru yaptığını kanıtla.</li>
              </ul>
              <BlockMath math="[P(1) \land \forall k ([P(1) \land P(2) \land \dots \land P(k)] \rightarrow P(k + 1))] \rightarrow \forall n P(n)" />
            </div>

            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-8">İyi Sıralama Özelliği (Well-Ordering Property)</h4>
            <p className="text-slate-700">
              "Her boştan farklı negatif olmayan tam sayı kümesinin <strong>en küçük (minimum) bir elemanı</strong> vardır." <br/>
              Tümevarım ve Güçlü Tümevarım ilkeleri aslında bu basit özelliğin mantıksal bir sonucudur. Matematikçiler genellikle tümevarımla ispatlanamayan çok zor problemleri <em>Well-Ordering</em> kullanarak "çelişkiyle" ispatlarlar (En küçük karşıt örneğin (smallest counterexample) varlığını varsayarak).
            </p>
          </div>

          {/* 3. Recursive Definitions */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">3. Özyinelemeli Tanımlar (Recursive Definitions)</h3>
            <p className="text-slate-700 mb-4">
              Fonksiyonları, dizileri veya kümeleri kendileri cinsinden tanımlama işlemine <strong>Recursion</strong> denir. Matematiksel tümevarımın tam tersi yönde çalışır:
              Problemi daha küçük parçalara (subproblems) ayırır ve en sonunda temel duruma (Base Case) ulaşıp geri sarar.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-indigo-800 border-b pb-2 mb-3">Faktöriyel (Factorial)</h4>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                  <li><strong>Base Case:</strong> <InlineMath math="f(0) = 1" /></li>
                  <li><strong>Recursive Step:</strong> <InlineMath math="f(n) = n \cdot f(n-1)" /></li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-emerald-800 border-b pb-2 mb-3">Fibonacci Dizisi</h4>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                  <li><strong>Base Cases:</strong> <InlineMath math="f_0 = 0, \quad f_1 = 1" /></li>
                  <li><strong>Recursive Step:</strong> <InlineMath math="f_n = f_{n-1} + f_{n-2}" /></li>
                </ul>
              </div>
            </div>
            <p className="text-slate-500 mt-4 text-sm italic">
              * Bu iki fonksiyonun bilgisayar belleğindeki adım adım yığılmasını yukarıdaki simülatörden izleyebilirsiniz. Simülatördeki "Call Stack", Base Case'e inene kadar nasıl biriktiğini açıkça gösterecektir.
            </p>
          </div>

          {/* Example Question */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-8">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <span className="font-semibold text-slate-700">ODTÜ Sınav Sorusu: Tümevarım İspatı</span>
              <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-md">Zorluk: Klasik İspat</span>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-slate-700">
                Matematiksel tümevarım kullanarak, ilk <InlineMath math="n" /> pozitif tek sayının toplamının <InlineMath math="n^2" /> olduğunu ispatlayınız.
              </p>
              <div className="flex justify-center my-4">
                <span className="text-lg font-bold bg-slate-100 px-6 py-3 rounded-xl border border-slate-200">
                  <InlineMath math="1 + 3 + 5 + \dots + (2n - 1) = n^2" />
                </span>
              </div>
              
              <div className="bg-slate-800 text-slate-300 rounded-xl p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="text-emerald-400 mb-3">// Çözüm:</div>
                <div className="text-amber-400">1. BASIS STEP (Temel Durum):</div>
                <div className="pl-4">
                  n = 1 için sol taraf: İlk tek sayı 1'dir.<br/>
                  Sağ taraf: 1² = 1.<br/>
                  1 = 1 olduğu için P(1) doğrudur.
                </div>
                
                <div className="text-amber-400 mt-4">2. INDUCTIVE HYPOTHESIS (Tümevarım Varsayımı):</div>
                <div className="pl-4">
                  P(k)'nın doğru olduğunu varsayalım. Yani:<br/>
                  <span className="text-indigo-300">1 + 3 + 5 + ... + (2k - 1) = k²</span>
                </div>

                <div className="text-amber-400 mt-4">3. INDUCTIVE STEP (P(k) → P(k+1)):</div>
                <div className="pl-4">
                  P(k+1) için denklemimizin sol tarafına bir sonraki tek sayıyı ekleyelim. Bir sonraki tek sayı: [2(k+1) - 1] = 2k + 1<br/>
                  Sol taraf: <br/>
                  [1 + 3 + 5 + ... + (2k - 1)] + (2k + 1)<br/>
                  <br/>
                  Inductive Hypothesis (Varsayım) adımını kullanarak köşeli parantez içini k² ile değiştirelim:<br/>
                  = k² + (2k + 1)<br/>
                  = k² + 2k + 1<br/>
                  <br/>
                  Bu ifade tam karedir:<br/>
                  = (k + 1)²<br/>
                </div>
                
                <div className="mt-4 text-emerald-400 font-bold">
                  // Sonuç:<br/>
                  Sol tarafı P(k) varsayımını kullanarak P(k+1)'in sağ tarafına ( (k+1)² ) eşitledik.<br/>
                  P(1) doğru, ve P(k) → P(k+1) doğru olduğuna göre, Matematiksel Tümevarım İlkesi gereği önerme tüm n ≥ 1 için DOĞRUDUR! ∎
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
