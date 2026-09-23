import React from 'react';
import RelationMatrixVisualizer from '@/components/visualizers/cng223/RelationMatrixVisualizer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function RelationsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Relations (Bağıntılar)</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Veritabanı (RDBMS) tasarımlarından, sosyal ağlardaki arkadaşlık modellerine kadar pek çok bilgisayar bilimleri problemi nesneler arasındaki <strong>Bağıntılar (Relations)</strong> üzerine kuruludur. Bu bölümde, bağıntıların temel matematiksel özelliklerini (Symmetric, Transitive vb.), Matris/Digraph gösterimlerini ve özellikle Equivalence ile Partial Ordering (Poset) gibi ileri düzey yapıları öğreneceğiz.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">İnteraktif Araç: Matrix Property Analyzer</h2>
        </div>
        <p className="text-slate-600">
          Aşağıdaki <InlineMath math="4 \times 4" /> boyutundaki "Zero-One Matrix" üzerinde hücrelere tıklayarak (<InlineMath math="1" /> veya <InlineMath math="0" /> yaparak) kendi bağıntınızı (<InlineMath math="R" />) oluşturun. Sistem anlık olarak bu matrisi tarayacak ve Reflexive, Symmetric, Transitive gibi 6 temel özelliği test edecektir. Hangi kuralın neden bozulduğunu kırmızı hata mesajlarıyla görebilir, Equivalence veya Poset statülerini anında keşfedebilirsiniz!
        </p>
        <div className="mt-4">
          <RelationMatrixVisualizer />
        </div>
      </section>

      {/* Detailed Theoretical Content */}
      <section className="space-y-10 mt-12">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-slate-800">Kapsamlı Konu Anlatımı (ODTÜ Ders Notları)</h2>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          
          {/* 1. Basic Definitions and Properties */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">1. Bağıntıların Temel Özellikleri</h3>
            <p className="text-slate-700 mb-4">
              <InlineMath math="A" /> kümesi üzerinde tanımlı bir <InlineMath math="R" /> bağıntısı (<InlineMath math="R \subseteq A \times A" />), belirli matematiksel özellikleri sağlayabilir. ODTÜ CNG 223 sınavlarında bu tanımlar mantıksal notasyonlarla (<InlineMath math="\forall, \to" />) sorulur.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reflexive */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-indigo-800 mb-2">Reflexive (Yansıyan)</h4>
                <p className="text-sm text-slate-600 mb-2">Her eleman kendisiyle ilişkilidir.</p>
                <BlockMath math="\forall x \in A \implies (x,x) \in R" />
                <p className="text-xs text-slate-500 mt-2">Matris: Ana köşegenin tamamı 1'dir.</p>
              </div>

              {/* Irreflexive */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-indigo-800 mb-2">Irreflexive</h4>
                <p className="text-sm text-slate-600 mb-2">Hiçbir eleman kendisiyle ilişkili değildir.</p>
                <BlockMath math="\forall x \in A \implies (x,x) \notin R" />
                <p className="text-xs text-slate-500 mt-2">Matris: Ana köşegenin tamamı 0'dır.</p>
              </div>

              {/* Symmetric */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-indigo-800 mb-2">Symmetric (Simetrik)</h4>
                <p className="text-sm text-slate-600 mb-2">Eğer x, y'ye gidiyorsa, y de x'e geri döner.</p>
                <BlockMath math="\forall x, y \in A, (x,y) \in R \implies (y,x) \in R" />
                <p className="text-xs text-slate-500 mt-2">Matris: Matris kendi transpozuna (<InlineMath math="M^T" />) eşittir.</p>
              </div>

              {/* Antisymmetric */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-indigo-800 mb-2">Antisymmetric (Ters-Simetrik)</h4>
                <p className="text-sm text-slate-600 mb-2">x y'ye ve y x'e gidiyorsa, x ve y aynı elemandır.</p>
                <BlockMath math="\forall x, y, ((x,y) \in R \land (y,x) \in R) \implies x = y" />
              </div>

              {/* Transitive */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 md:col-span-2">
                <h4 className="font-bold text-indigo-800 mb-2">Transitive (Geçişli)</h4>
                <p className="text-sm text-slate-600 mb-2">Eğer x y'ye gidiyor ve y de z'ye gidiyorsa, x doğrudan z'ye de gitmelidir. Akrabalık örneği: Alice Bob'un Atası (Ancestor), Bob da Claire'in Atası ise Alice Claire'in Atasıdır.</p>
                <BlockMath math="\forall x, y, z, ((x,y) \in R \land (y,z) \in R) \implies (x,z) \in R" />
              </div>
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
                <h3 className="text-lg font-bold text-rose-800 mb-2">ODTÜ Sınav Tuzağı: Antisymmetric, Symmetric'in zıttı değildir!</h3>
                <p className="text-rose-700">
                  Öğrenciler isimlerinden dolayı bu iki özelliğin birbirini dışladığını düşünür. Ancak bu büyük bir hatadır! Sadece <InlineMath math="(1,1)" /> elemanından oluşan <InlineMath math="R = \{(1,1)\}" /> bağıntısı hem <strong>Symmetric</strong> hem de <strong>Antisymmetric</strong>'tir. (Antisymmetric kuralını bozması için farklı iki eleman arasında karşılıklı ok olması gerekir).
                </p>
              </div>
            </div>
          </div>

          {/* 2. Equivalence vs Partial Order */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">2. Özel Bağıntı Türleri: Equivalence ve Poset</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-emerald-800 mb-2">Equivalence Relations (Denklik Bağıntıları)</h4>
                <p className="text-slate-700 mb-4">
                  Bir bağıntı eğer <strong>Reflexive</strong>, <strong>Symmetric</strong> ve <strong>Transitive</strong> ise bir Denklik Bağıntısıdır. Bir kümedeki elemanları eşit özelliklere sahip gruplara (Equivalence Classes) ayırır.
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-sm">
                  <strong>Örnek:</strong> İngilizce kelimeler kümesinde "aynı uzunlukta olma" (<InlineMath math="l(a) = l(b)" />) bağıntısı.
                  <ul className="list-disc pl-5 mt-2">
                    <li>Reflexive: l(a) = l(a)</li>
                    <li>Symmetric: l(a)=l(b) ise l(b)=l(a)</li>
                    <li>Transitive: l(a)=l(b) ve l(b)=l(c) ise l(a)=l(c)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-fuchsia-800 mb-2">Partial Orderings (Kısmi Sıralamalar)</h4>
                <p className="text-slate-700 mb-4">
                  Bir bağıntı eğer <strong>Reflexive</strong>, <strong>Antisymmetric</strong> ve <strong>Transitive</strong> ise bir Poset (Partially Ordered Set) oluşturur. Elemanlar arasında bir "büyüklük/üstünlük" hiyerarşisi kurar.
                </p>
                <div className="bg-fuchsia-50 p-4 rounded-lg border border-fuchsia-100 text-sm">
                  <strong>Örnek:</strong> Tam sayılarda Bölünebilme (Divisibility: <InlineMath math="a \mid b" />) veya alt küme olma (<InlineMath math="A \subseteq B" />) ilişkisi. Dikkat edin, <InlineMath math="2 \mid 4" /> iken <InlineMath math="4 \nmid 2" /> olduğu için bu ilişki Simetrik değil, Antisimetriktir.
                </div>
              </div>
            </div>
          </div>

          {/* 3. Hasse Diagrams */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">3. Hasse Diagrams (Poset Görselleştirmesi)</h3>
            <p className="text-slate-700 mb-4">
              Partial Ordering (Poset) grafiklerini (Digraph) çizerken, ok karmaşasını engellemek için Hasse Diagramları kullanılır. Hasse diagramı oluşturulurken 3 adım izlenir:
            </p>
            <ol className="list-decimal list-inside text-slate-700 space-y-2 mb-4">
              <li><strong>Reflexive</strong> olduğu bilindiği için tüm elemanların kendi üzerindeki döngüleri (loops) silinir.</li>
              <li><strong>Transitive</strong> olduğu bilindiği için geçişken olan gereksiz uzun oklar silinir. (Örn: A-B ve B-C arası ok varsa, A-C oku silinir).</li>
              <li>Tüm oklar <strong>Aşağıdan Yukarıya</strong> doğru çizildiği için okların uçları (yön belirteçleri) silinir.</li>
            </ol>
          </div>

        </div>
      </section>

    </div>
  );
}
