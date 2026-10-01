import React from 'react';
import RecurrenceSolverVisualizer from '@/components/visualizers/cng223/RecurrenceSolverVisualizer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function AdvancedCountingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Advanced Counting Techniques</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Algoritmaların zaman karmaşıklığını (Time Complexity) hesaplamak için sadece döngüleri saymak yetmez. Özyinelemeli (Recursive) fonksiyonların performansını anlamak için <strong>Recurrence Relations</strong> (Özyinelemeli Bağıntılar) kullanılır. Bu bölümde, Lineer Homojen Bağıntıların çözümünü, Böl ve Yönet (Divide and Conquer) algoritmalarını ve çoklu kümeler için İçerme-Dışarma (Inclusion-Exclusion) prensibini inceleyeceğiz.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">İnteraktif Çözücü: 2. Derece Lineer Homojen Denklemler</h2>
        </div>
        <p className="text-slate-600">
          Sınavlarda en çok vakit kaybettiğiniz soru tipi <InlineMath math="a_n = c_1 a_{n-1} + c_2 a_{n-2}" /> formatındaki denklemlerin <strong>Kapalı Form (Closed Form)</strong> denklemini bulmaktır. Aşağıdaki araca <InlineMath math="c_1, c_2" /> katsayılarını ve başlangıç koşullarını (<InlineMath math="a_0, a_1" />) girerek sistemin karakteristik kökleri bulmasını ve denklem sistemini adım adım çözmesini izleyin.
        </p>
        <div className="mt-4">
          <RecurrenceSolverVisualizer />
        </div>
      </section>

      {/* Detailed Theoretical Content */}
      <section className="space-y-10 mt-12">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-slate-800">Kapsamlı Konu Anlatımı (ODTÜ Ders Notları)</h2>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          
          {/* 1. Recurrence Relations */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">1. Özyinelemeli Bağıntıların Uygulamaları</h3>
            
            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Rabbits ve Fibonacci Serisi</h4>
            <p className="text-slate-700 mb-3">
              Bir adaya bırakılan tavşanların üreme modellemesi, 13. yüzyılda Fibonacci tarafından bulunmuştur. Her yeni tavşan çifti, en az 2 aylık olduklarında yeni bir çift doğurur. Bu durum şu bağıntıyı oluşturur:
            </p>
            <BlockMath math="f_n = f_{n-1} + f_{n-2} \quad \text{for } n \ge 3 \text{ with } f_1 = 1, f_2 = 1" />

            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-8">Hanoi Kulesi (Tower of Hanoi)</h4>
            <p className="text-slate-700 mb-3">
              Bir kuledeki <InlineMath math="n" /> adet diski, büyük disk küçüğün üstüne gelmeyecek kurallara uyarak diğer çubuğa taşıma problemidir. <InlineMath math="n" /> diski taşımak için önce <InlineMath math="n-1" /> diski boş çubuğa taşırız (<InlineMath math="H_{n-1}" />), en büyük diski hedefe taşırız (+1), sonra <InlineMath math="n-1" /> diski tekrar en büyüğün üzerine taşırız (<InlineMath math="H_{n-1}" />).
            </p>
            <BlockMath math="H_n = 2H_{n-1} + 1 \quad \text{with } H_1 = 1" />
            <p className="text-slate-700 mt-2">
              Bunun kapalı formu iteratif yöntemle çözüldüğünde <InlineMath math="H_n = 2^n - 1" /> çıkar. 64 disk için evrenin yaşından fazla bir süre gerekir!
            </p>
          </div>

          {/* 2. Solving Linear Homogeneous */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">2. Lineer Homojen Bağıntıların Çözümü</h3>
            <p className="text-slate-700 mb-4">
              <InlineMath math="a_n = c_1 a_{n-1} + c_2 a_{n-2} + \dots + c_k a_{n-k}" /> şeklinde, sağ tarafında sabit bir sayı veya n'ye bağlı dışarıdan bir fonksiyon (nonhomogeneous) barındırmayan denklemlere <strong>Lineer Homojen</strong> denir. Temel yaklaşım <InlineMath math="a_n = r^n" /> formunda çözümler aramaktır.
            </p>
            
            <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-6">Karakteristik Denklem ve Kökler (Characteristic Roots)</h4>
            <p className="text-slate-700 mb-3">
              2. dereceden bir denklem için (<InlineMath math="a_n = c_1 a_{n-1} + c_2 a_{n-2}" />), her terimi <InlineMath math="r^{n-2}" />'ye bölersek karakteristik denklemi buluruz:
            </p>
            <BlockMath math="r^2 - c_1 r - c_2 = 0" />
            <p className="text-slate-700 mb-3">
              Kökler (<InlineMath math="r_1, r_2" />) bulunduktan sonra çözüm formu ikiye ayrılır:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li><strong>Farklı Kökler (Distinct Roots):</strong> <InlineMath math="a_n = \alpha_1 r_1^n + \alpha_2 r_2^n" /></li>
              <li><strong>Çakışık Kökler (Double Root):</strong> <InlineMath math="a_n = \alpha_1 r^n + \alpha_2 n r^n" /></li>
            </ul>
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
                <h3 className="text-lg font-bold text-rose-800 mb-2">ODTÜ Sınav Tuzağı: Çakışık Köklerde "n" Çarpanı</h3>
                <p className="text-rose-700">
                  Eğer kökleri bulduğunuzda <InlineMath math="r_1 = r_2" /> çıkarsa (örneğin <InlineMath math="r^2 - 4r + 4 = 0" /> denkleminde r=2), genel çözümü <InlineMath math="a_n = \alpha_1 (2)^n + \alpha_2 (2)^n" /> olarak yazarsanız <strong>büyük bir hata</strong> yaparsınız (çünkü iki terim birleşir tek sabit olur). Doğrusu, lineer bağımsızlığı sağlamak için ikinci terimi <strong><InlineMath math="n" /> ile çarpmaktır:</strong> <InlineMath math="a_n = \alpha_1 (2)^n + \alpha_2 n(2)^n" />. Sınavlarda bu detayı atlayanların puanı direkt kırılır!
                </p>
              </div>
            </div>
          </div>

          {/* 3. Divide and Conquer */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">3. Divide-and-Conquer Algoritmaları</h3>
            
            <p className="text-slate-700 mb-4">
              Bir problemi alt problemlere bölüp (Divide) çözme (Conquer) mantığıdır. En klasik iki örneği:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-indigo-800 border-b pb-2 mb-3">Binary Search (İkili Arama)</h4>
                <p className="text-sm text-slate-700 mb-2">
                  Diziyi her seferinde ortadan ikiye böler ve bir yarısında arama yapar. Her adımda karşılaştırma (<InlineMath math="+2" />) maliyeti vardır.
                </p>
                <BlockMath math="f(n) = f(n/2) + 2" />
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-indigo-800 border-b pb-2 mb-3">Merge Sort</h4>
                <p className="text-sm text-slate-700 mb-2">
                  Diziyi ikiye böler, her iki yarısını özyinelemeli olarak sıralar, ardından <InlineMath math="O(n)" /> sürede bunları birleştirir.
                </p>
                <BlockMath math="M(n) = 2M(n/2) + n" />
              </div>
            </div>
          </div>

          {/* 4. Inclusion-Exclusion */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">4. İçerme-Dışarma Prensibi (Inclusion-Exclusion)</h3>
            <p className="text-slate-700 mb-4">
              İki veya daha fazla sonlu kümenin birleşimindeki eleman sayısını bulmak için kesişimleri "çıkarıp-ekleme" yöntemidir.
            </p>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <BlockMath math="|A \cup B| = |A| + |B| - |A \cap B|" />
              <BlockMath math="|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|" />
            </div>
          </div>

          {/* Example Question */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-8">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <span className="font-semibold text-slate-700">ODTÜ Sınav Sorusu: 3 Kümeli PIE (İçerme-Dışarma)</span>
              <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-md">Zorluk: Orta</span>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-slate-700">
                A total of 1232 students have taken Spanish, 879 French, and 114 Russian. Further, 103 took Spanish & French, 23 Spanish & Russian, and 14 French & Russian. If 2092 students have taken <strong>at least one</strong> of these courses, how many took <strong>all 3 languages</strong>?
              </p>
              
              <div className="bg-slate-800 text-slate-300 rounded-xl p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="text-emerald-400 mb-3">// Çözüm: Inclusion-Exclusion Prensibi formülünü yazalım.</div>
                <div className="text-amber-400">Verilenler:</div>
                <div className="pl-4">
                  |S| = 1232, |F| = 879, |R| = 114<br/>
                  |S ∩ F| = 103, |S ∩ R| = 23, |F ∩ R| = 14<br/>
                  |S ∪ F ∪ R| = 2092
                </div>
                
                <div className="text-amber-400 mt-4">Formül Uygulaması:</div>
                <div className="pl-4">
                  |S ∪ F ∪ R| = |S| + |F| + |R| - |S ∩ F| - |S ∩ R| - |F ∩ R| + |S ∩ F ∩ R|<br/>
                  2092 = 1232 + 879 + 114 - 103 - 23 - 14 + |S ∩ F ∩ R|
                </div>
                
                <div className="mt-4 text-emerald-400 font-bold">
                  // Matematiksel işlem:<br/>
                  2092 = 2085 + |S ∩ F ∩ R|<br/>
                  |S ∩ F ∩ R| = 2092 - 2085 = 7 öğrenci 3 dili de almıştır.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
