import React from 'react';
import CountingVisualizer from '@/components/visualizers/cng223/CountingVisualizer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function CountingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Counting (Sayma ve Kombinatorik)</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Algoritma analizi, olasılık hesaplamaları ve şifreleme bilimi (kriptografi), arka planda her zaman <strong>Kaç farklı durum var?</strong> sorusuna yanıt arar. Bu bölümde, ODTÜ CNG 223 müfredatının en önemli araçlarından olan Sayma Kurallarını, Güvercin Yuvası Prensibini ve Kombinasyon/Permütasyon mekaniklerini inceleyeceğiz.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Kombinatorik Görselleştirici (The Fourfold Way)</h2>
        </div>
        <p className="text-slate-600">
          Öğrencilerin sınavlarda en çok hata yaptığı yer, "Hangi formülü kullanmalıyım?" sorusudur. 
          Aşağıdaki araçtan eleman sayısını (<InlineMath math="N" />) ve seçilecek sayıyı (<InlineMath math="r" />) belirleyin. Ardından <strong>Sıra Önemli mi?</strong> ve <strong>Tekrar Serbest mi?</strong> koşullarını değiştirerek formüllerin nasıl şekil değiştirdiğini ve arka planda <em>tam olarak hangi kümeleri ürettiğini</em> görsel olarak inceleyin.
        </p>
        <div className="mt-4">
          <CountingVisualizer />
        </div>
      </section>

      {/* Detailed Theoretical Content */}
      <section className="space-y-10 mt-12">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-slate-800">Kapsamlı Konu Anlatımı (ODTÜ Ders Notları)</h2>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          
          {/* 1. Basic Rules */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">1. Temel Sayma Kuralları (Basics of Counting)</h3>
            
            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Çarpım Kuralı (The Product Rule)</h4>
            <p className="text-slate-700 mb-3">
              Eğer bir süreç birbirini takip eden iki (veya daha fazla) bağımsız göreve ayrılabiliyorsa ve birinci görev <InlineMath math="n_1" /> şekilde, ikinci görev <InlineMath math="n_2" /> şekilde yapılabiliyorsa; tüm süreç <InlineMath math="n_1 \cdot n_2" /> farklı şekilde yapılabilir. Kümeler dilinde Kartezyen Çarpım (<InlineMath math="|A \times B|" />) anlamına gelir.
            </p>
            <div className="bg-slate-50 px-6 py-4 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-700">Örnek: Alt Kümelerin Sayısı (Subsets of a finite set)</span>
              <p className="text-sm mt-2">
                <InlineMath math="S" /> kümesinin kaç tane alt kümesi vardır? Her eleman için 2 seçenek vardır: Ya alt kümeye dahil edilir (1) ya da edilmez (0). Toplam <InlineMath math="|S|" /> eleman olduğu için çarpım kuralı gereği <InlineMath math="2 \cdot 2 \dots 2 = 2^{|S|}" /> alt küme vardır.
              </p>
            </div>

            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-8">Toplam Kuralı (The Sum Rule)</h4>
            <p className="text-slate-700 mb-3">
              Bir işlem <InlineMath math="n_1" /> farklı şekilde veya tamamen farklı bir yöntemle <InlineMath math="n_2" /> şekilde yapılabiliyorsa (ortak bir durum yoksa), işlem <InlineMath math="n_1 + n_2" /> şekilde yapılabilir. Kümeler dilinde Ayrık Kümelerin Birleşimi (<InlineMath math="|A \cup B| = |A| + |B|" />) anlamına gelir.
            </p>

            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-8">Çıkarma Kuralı (The Subtraction Rule / Inclusion-Exclusion)</h4>
            <p className="text-slate-700 mb-3">
              Toplam kuralının genelleştirilmiş halidir. Eğer iki görevi yapma yöntemleri arasında "ortak" olan durumlar varsa, bunları bir kez çıkarmamız gerekir:
            </p>
            <BlockMath math="|A \cup B| = |A| + |B| - |A \cap B|" />

            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-8">Bölme Kuralı (The Division Rule)</h4>
            <p className="text-slate-700 mb-3">
              Eğer bir süreci <InlineMath math="n" /> farklı yolla yapabiliyorsak ama her <InlineMath math="w" /> yöntemi tam olarak <InlineMath math="d" /> defa tekrar sayılmışsa, doğru sonuç <InlineMath math="n / d" /> olur. Yuvarlak masa (circular permutations) etrafında oturtma problemleri (n!/n) bu kurala dayanır.
            </p>
          </div>

          {/* 2. Pigeonhole Principle */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">2. Güvercin Yuvası Prensibi (The Pigeonhole Principle)</h3>
            <p className="text-slate-700 mb-4">
              Eğer <InlineMath math="k+1" /> veya daha fazla nesne (güvercin), <InlineMath math="k" /> adet kutuya (yuvaya) yerleştirilirse; en az bir kutuda iki veya daha fazla nesne olmak zorundadır.
            </p>
            
            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Genelleştirilmiş Güvercin Yuvası Prensibi (Generalized Pigeonhole Principle)</h4>
            <p className="text-slate-700 mb-3">
              Eğer <InlineMath math="N" /> nesne, <InlineMath math="k" /> kutuya yerleştirilirse, en az bir kutuda en az <InlineMath math="\lceil N/k \rceil" /> adet nesne bulunur. (Burada tavan/ceiling fonksiyonu kullanılır).
            </p>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 mt-4">
              <span className="font-bold text-indigo-800">Örnek:</span> Sınıfta 280 öğrenci var (N=280). Bir yılda 12 ay var (k=12). Aynı ayda doğan en az kaç öğrenci olmalıdır?<br/>
              <InlineMath math="\lceil 280 / 12 \rceil = \lceil 23.33 \rceil = 24" /> öğrenci.
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
                <h3 className="text-lg font-bold text-rose-800 mb-2">ODTÜ Sınav Tuzağı: Pigeonhole Yuvarlama Hatası</h3>
                <p className="text-rose-700">
                  Öğrenciler genellikle <InlineMath math="\lceil N/k \rceil" /> hesabını yaparken klasik "yakına yuvarlama" (round) kullanır. Örneğin 280/12 = 23.33 çıktığında bunu 23'e yuvarlarlar. Ancak matematikte 23.0001 bile olsa <strong>tavan (ceiling)</strong> gereği 24'e yuvarlamak ZORUNDASINIZ. Aksi takdirde sorunun puanını alamazsınız!
                </p>
              </div>
            </div>
          </div>

          {/* 3. Permutations and Combinations */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">3. Permütasyon ve Kombinasyon (Sıra ve Seçim)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-indigo-800 border-b pb-2 mb-3">Permütasyon: Sıra Önemlidir</h4>
                <p className="text-sm text-slate-700 mb-2">
                  <InlineMath math="n" /> elemandan <InlineMath math="r" /> tanesini seçip yan yana <strong>dizme (sıralama)</strong> işlemidir. Formülü:
                </p>
                <BlockMath math="P(n, r) = \frac{n!}{(n - r)!}" />
                <p className="text-xs text-slate-500 mt-2">Örn: Yarışmada 1., 2. ve 3.'yü belirlemek.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-emerald-800 border-b pb-2 mb-3">Kombinasyon: Sıra Önemsizdir</h4>
                <p className="text-sm text-slate-700 mb-2">
                  <InlineMath math="n" /> elemandan <InlineMath math="r" /> tanesini sadece <strong>seçme (alt küme oluşturma)</strong> işlemidir. Seçilenlerin kendi arasındaki sırası dikkate alınmaz. Formülü:
                </p>
                <BlockMath math="C(n, r) = \binom{n}{r} = \frac{n!}{r!(n - r)!}" />
                <p className="text-xs text-slate-500 mt-2">Örn: 52 karttan 5'li bir poker eli dağıtılması.</p>
              </div>
            </div>

            <p className="text-slate-700">
              Bu iki temel kural, "Tekrar serbest (with repetition)" durumlara da genelleştirilebilir. Bu 4 duruma (The Fourfold Way) sayfanın yukarısındaki simülatör aracılığıyla göz atabilirsiniz.
            </p>
          </div>

          {/* Example Question */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-8">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <span className="font-semibold text-slate-700">ODTÜ Sınav Sorusu: Parola (Password) Sayımı</span>
              <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-md">Zorluk: Sum & Subtraction Rule</span>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-slate-700">
                Bir bilgisayar sistemindeki her parolanın uzunluğu 6 ile 8 karakter arasında olmalıdır. Her karakter bir büyük harf (26 seçenek) veya bir rakam (10 seçenek) olmalıdır. <strong>Her parola en az bir adet rakam içermek ZORUNDADIR.</strong> Kaç farklı parola oluşturulabilir?
              </p>
              
              <div className="bg-slate-800 text-slate-300 rounded-xl p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="text-emerald-400 mb-3">// Çözüm: (Dolaylı Sayma - Indirect Counting yöntemi kullanacağız)</div>
                <div className="text-amber-400">1. Toplam Kuralı (Uzunluklara göre ayırma):</div>
                <div className="pl-4">
                  P = P6 + P7 + P8  (Sırasıyla 6, 7 ve 8 uzunluğundaki parolalar)<br/>
                  Karakter havuzu: 26 harf + 10 rakam = Toplam 36 karakter.
                </div>
                
                <div className="text-amber-400 mt-4">2. Çıkarma Kuralı (En az bir rakam şartını sağlamak):</div>
                <div className="pl-4">
                  "En az bir rakam içerenler" sayısını bulmak çok zordur. Bunun yerine "Tüm olasılıklar - Hiç rakam içermeyenler (Sadece harf olanlar)" hesabını yaparız.<br/>
                  <br/>
                  P6 = 36^6 - 26^6<br/>
                  P7 = 36^7 - 26^7<br/>
                  P8 = 36^8 - 26^8
                </div>
                
                <div className="mt-4 text-emerald-400 font-bold">
                  // Sonuç:<br/>
                  Toplam P = (36^6 - 26^6) + (36^7 - 26^7) + (36^8 - 26^8)<br/>
                  P = 2,684,483,063,360 farklı parola vardır.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
