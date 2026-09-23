import React from 'react';
import ProbabilitySimulator from '@/components/visualizers/cng223/ProbabilitySimulator';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function DiscreteProbabilityPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Discrete Probability (Ayrık Olasılık)</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Hayatta hiçbir şey kesin değildir, algoritmaların çalışma süreleri ve yapay zeka modelleri bile! Bu bölümde şansın matematiği olan <strong>Olasılık</strong> teorisini işleyeceğiz. Temel olasılık tanımlarından başlayarak; Koşullu Olasılık (Conditional Probability), Makine Öğrenmesinin temeli olan Bayes Teoremi (Bayes' Theorem) ve Rastgele Değişkenlerin Beklenen Değerlerini (Expected Value) öğreneceğiz.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">İnteraktif Araç: Expected Value & Variance Simulator</h2>
        </div>
        <p className="text-slate-600">
          Sınavlarda "Zar atışından kazanılacak para miktarı" gibi Rastgele Değişken (Random Variable) soruları bolca sorulur. Aşağıdaki araca <InlineMath math="x" /> (Olayın sayısal değeri) ve <InlineMath math="P(x)" /> (Olasılığı) değerlerini girin. Sistem anında <strong>Probability Mass Function (PMF)</strong> grafiğini çizecek ve formülleri adım adım yazarak Beklenen Değer <InlineMath math="E(X)" /> ve Varyansı <InlineMath math="V(X)" /> hesaplayacaktır.
        </p>
        <div className="mt-4">
          <ProbabilitySimulator />
        </div>
      </section>

      {/* Detailed Theoretical Content */}
      <section className="space-y-10 mt-12">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-slate-800">Kapsamlı Konu Anlatımı</h2>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          
          {/* 1. Finite Probability */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">1. Finite Probability (Sonlu Olasılık)</h3>
            <p className="text-slate-700 mb-4">
              Olasılık hesaplamalarındaki en temel kural (Laplace tanımı), tüm çıktıların eşit ihtimalli olduğu durumlarda istenen olayın (<InlineMath math="E" />), tüm olası durumların sayısına (<InlineMath math="S" />) oranıdır:
            </p>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-center text-xl font-bold text-slate-800 my-4">
              <BlockMath math="P(E) = \frac{|E|}{|S|}" />
            </div>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Tümleyen (Complement):</strong> Bir olayın GERÇEKLEŞMEME olasılığı: <InlineMath math="P(\overline{E}) = 1 - P(E)" /></li>
              <li><strong>Birleşim Kuralı:</strong> <InlineMath math="P(E_1 \cup E_2) = P(E_1) + P(E_2) - P(E_1 \cap E_2)" /></li>
            </ul>
          </div>

          {/* 2. Conditional Probability & Independence */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">2. Conditional Probability (Koşullu Olasılık) ve Bağımsızlık</h3>
            <p className="text-slate-700 mb-4">
              Eğer <InlineMath math="F" /> olayının kesinlikle gerçekleştiğini biliyorsak, bu yeni bilgi <InlineMath math="E" /> olayının olasılığını değiştirir. Buna Koşullu Olasılık (<InlineMath math="P(E|F)" />) denir. "F verilmişken E'nin olma olasılığı" şeklinde okunur.
            </p>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-center text-lg font-bold text-slate-800 my-4">
              <BlockMath math="P(E|F) = \frac{P(E \cap F)}{P(F)}" />
            </div>
            
            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg my-6">
              <strong className="text-rose-800">ODTÜ Sınav Tuzağı:</strong> Formüldeki paydaya DİKKAT! Paydada her zaman "verilen (given)" olayın olasılığı yani <InlineMath math="P(F)" /> yer almalıdır. Öğrenciler sıkça paydaya <InlineMath math="P(E)" /> yazarak soruyu kaybeder.
            </div>

            <h4 className="font-bold text-indigo-800">Bağımsızlık (Independence)</h4>
            <p className="text-slate-700">
              Eğer <InlineMath math="F" /> olayının gerçekleşmesi <InlineMath math="E" />'yi hiç etkilemiyorsa (Örn: İki farklı zar atılması), bu olaylar bağımsızdır ve şu şartı sağlarlar:
              <BlockMath math="P(E \cap F) = P(E)P(F)" />
            </p>
          </div>

          {/* 3. Bayes' Theorem */}
          <div className="bg-indigo-50 border-2 border-indigo-200 p-8 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-200 pb-3 mb-5">3. Bayes' Theorem (Bayes Teoremi)</h3>
            <p className="text-indigo-800 mb-4">
              Yapay zeka (Naive Bayes) ve tıbbi testlerin temelini oluşturur. Bir olayın sonucunu gördükten sonra, bu sonuca neyin sebep olduğuna dair olasılığımızı güncellediğimiz muazzam bir formüldür.
            </p>
            <div className="bg-white p-5 rounded-xl border border-indigo-200 text-center text-lg font-bold text-slate-800 my-4">
              <BlockMath math="P(F|E) = \frac{P(E|F)P(F)}{P(E|F)P(F) + P(E|\overline{F})P(\overline{F})}" />
            </div>
            <p className="text-sm text-indigo-700">
              <strong>Örnek:</strong> Bir hastalığın testi %99 doğru sonuç veriyor. Ancak hastalığın toplumda görülme sıklığı sadece binde 1 (<InlineMath math="P(F) = 0.001" />). Testiniz pozitif (<InlineMath math="E" />) çıkarsa gerçekten hasta olma olasılığınız <InlineMath math="P(F|E)" /> nedir? (Cevap %99 değil, Bayes Teoremi sayesinde sadece %9 çıkar! Çünkü False Positive ihtimali, hastalığın nadirliğinden daha büyüktür.)
            </p>
          </div>

          {/* 4. Random Variables, Expected Value, Variance */}
          <div className="bg-emerald-50 border-2 border-emerald-500 p-8 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold text-emerald-900 border-b border-emerald-200 pb-3 mb-5">4. Expected Value (Beklenen Değer) ve Variance (Varyans)</h3>
            <p className="text-emerald-800 mb-4">
              <strong>Random Variable (Rastgele Değişken - <InlineMath math="X" />):</strong> Örneklem uzayındaki her bir çıktıya reel bir sayı atayan fonksiyondur. (Örn: Zar atışından kazanılacak para).
            </p>
            
            <h4 className="font-bold text-emerald-900">Expected Value <InlineMath math="E(X)" /></h4>
            <p className="text-emerald-800">
              Deney sonsuz kere tekrarlandığında elde edilecek "ortalama" değerdir. Her bir olası sonucun (<InlineMath math="x" />), kendi olasılığıyla (<InlineMath math="P(x)" />) çarpılıp toplanmasıyla bulunur.
            </p>
            <div className="bg-white p-4 rounded-xl border border-emerald-200 text-center font-bold mb-4">
              <BlockMath math="E(X) = \sum_{s \in S} X(s) \cdot P(s)" />
            </div>

            <h4 className="font-bold text-emerald-900">Variance <InlineMath math="V(X)" /></h4>
            <p className="text-emerald-800">
              Sonuçların beklenen değer etrafında ne kadar "dağınık" (riskli) olduğunu ölçer.
            </p>
            <div className="bg-white p-4 rounded-xl border border-emerald-200 text-center font-bold mb-4">
              <BlockMath math="V(X) = E(X^2) - [E(X)]^2" />
            </div>

            <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-r-lg text-amber-900 mt-4">
              <strong>Kritik Hata (Sınav Favorisi):</strong> <InlineMath math="V(X)" /> hesaplarken, önce <InlineMath math="X" />'in karelerinin beklenen değerini (<InlineMath math="E(X^2)" />) bulmalısınız. Sonra da bulduğunuz normal beklenen değerin karesini (<InlineMath math="[E(X)]^2" />) çıkaracaksınız. Yukarıdaki simülatörde bu adımları mutlaka inceleyin!
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
