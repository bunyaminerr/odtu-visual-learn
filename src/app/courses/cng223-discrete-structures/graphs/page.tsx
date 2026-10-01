import React from 'react';
import GraphMatrixVisualizer from '@/components/visualizers/cng223/GraphMatrixVisualizer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function GraphsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Graphs (Graf Teorisi)</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Bilgisayar Ağlarından Sosyal Medyaya, Harita Uygulamalarından Yazılım Tasarımlarına kadar her şeyin temelinde <strong>Graflar</strong> yatar. Bu bölümde Graf terminolojisini (Vertices, Edges, Degrees), Özel Grafları (Complete, Bipartite vb.), Tokalaşma Teoremini (Handshaking Theorem) ve Grafların Matris ile gösterimlerini öğreneceğiz.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">İnteraktif Araç: Matrix-to-Graph Çizim Motoru</h2>
        </div>
        <p className="text-slate-600">
          Graf çizimleri bazen kafa karıştırıcı olabilir. Ancak her graf aslında bir <strong>Adjacency Matrix (Komşuluk Matrisi)</strong> ile ifade edilebilir! Aşağıdaki 5x5 matriste hücre değerlerini değiştirin. Sağ tarafta <strong>SVG tabanlı grafın</strong> anında çizildiğini göreceksiniz. Ayrıca sistem, her düğümün derecesini hesaplayarak meşhur <strong>Handshaking Theorem'i</strong> sizin için canlı olarak ispatlayacaktır.
        </p>
        <div className="mt-4">
          <GraphMatrixVisualizer />
        </div>
      </section>

      {/* Detailed Theoretical Content */}
      <section className="space-y-10 mt-12">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-slate-800">Kapsamlı Konu Anlatımı (ODTÜ Ders Notları)</h2>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          
          {/* 1. Basic Definitions */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">1. Graf Taksonomisi (Graph Taxonomy)</h3>
            <p className="text-slate-700 mb-4">
              Bir graf <InlineMath math="G = (V, E)" /> ikilisiyle tanımlanır. <InlineMath math="V" /> (Vertices) düğümleri, <InlineMath math="E" /> (Edges) ise düğümleri birleştiren kenarları temsil eder. Kenarların özelliklerine göre graflar sınıflandırılır:
            </p>
            <ul className="space-y-4">
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <strong className="text-indigo-800">Simple Graph (Basit Graf):</strong> Yönsüzdür. İki düğüm arasında en fazla 1 kenar olabilir. Hiçbir düğüm kendi kendine dönen bir kenara (loop) sahip olamaz.
              </li>
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <strong className="text-indigo-800">Multigraph:</strong> Yönsüzdür ancak iki düğüm arasında <strong>birden fazla kenar (multiple edges)</strong> bulunabilir. (Örn: İki şehir arasındaki 3 farklı otoyol).
              </li>
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <strong className="text-indigo-800">Pseudograph:</strong> Multigraph özelliklerini taşır, ilave olarak düğümlerin kendi kendisine döndüğü <strong>Döngüler (Loops)</strong> içerebilir.
              </li>
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <strong className="text-indigo-800">Directed Graph (Digraph):</strong> Kenarlar yöne sahiptir. Okun başladığı düğüme initial, bittiği düğüme terminal vertex denir. (Örn: Web sayfalarındaki linkler veya Twitter'daki takip ilişkisi).
              </li>
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
                <h3 className="text-lg font-bold text-rose-800 mb-2">ODTÜ Sınav Tuzağı: Handshaking Loop Tuzağı!</h3>
                <p className="text-rose-700">
                  Bir matris üzerinden derece (degree) hesaplarken, ana köşegendeki (diagonal) 1 değeri <strong>Loop (Döngü)</strong> anlamına gelir. Sınavlarda öğrenciler satır toplamını alıp geçer. Ancak kural der ki: <strong>"A loop at a vertex contributes TWO (2) to the degree of that vertex!"</strong>. Yani <InlineMath math="M[i][i] = 1" /> ise, o düğümün derecesine +2 eklemelisiniz.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Handshaking Theorem */}
          <div className="bg-emerald-50 border-2 border-emerald-500 p-8 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold text-emerald-900 border-b border-emerald-200 pb-3 mb-5">2. Handshaking Theorem (Tokalaşma Teoremi)</h3>
            <p className="text-emerald-800 mb-4">
              Bir partide gerçekleşen tüm tokalaşmaların sayısını bulmak için herkesin kaç kere tokalaştığını toplarız. Ancak her tokalaşma 2 kişiyi ilgilendirdiği için toplam sayı, gerçek tokalaşma sayısının tam iki katı olur.
            </p>
            <div className="bg-white p-5 rounded-xl border border-emerald-200 text-center text-xl font-bold text-slate-800 my-6">
              <BlockMath math="\sum_{v \in V} \deg(v) = 2m" />
            </div>
            <h4 className="font-bold text-emerald-800 mb-2">Theorem 2 (Sınav Favorisi)</h4>
            <p className="text-emerald-700">
              Undirected (yönsüz) bir grafta, derecesi <strong>TEK (Odd)</strong> olan düğümlerin sayısı daima <strong>ÇİFT (Even)</strong> sayıdadır. (Örn: 5 düğümlü bir grafta her düğümün derecesi 3 olamaz! Çünkü <InlineMath math="5 \times 3 = 15" /> eder ve 15 çift bir sayı olmadığı için <InlineMath math="2m = 15" /> çözülemez).
            </p>
          </div>

          {/* 3. Special Graphs */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">3. Özel Graflar (Special Graphs)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 border rounded-xl">
                <h4 className="font-bold text-indigo-700 text-lg">Complete Graph (<InlineMath math="K_n" />)</h4>
                <p className="text-sm text-slate-600 mt-2">Her düğümün diğer TÜM düğümlere bağlı olduğu basit graftır. Toplam kenar sayısı <InlineMath math="\frac{n(n-1)}{2}" /> formülüyle hesaplanır. Her düğümün derecesi <InlineMath math="n-1" />'dir.</p>
              </div>
              <div className="p-4 bg-slate-50 border rounded-xl">
                <h4 className="font-bold text-indigo-700 text-lg">Cycle (<InlineMath math="C_n" />)</h4>
                <p className="text-sm text-slate-600 mt-2"><InlineMath math="n \ge 3" /> olmak üzere düğümlerin bir çember oluşturduğu graftır. Tüm düğümlerin derecesi 2'dir.</p>
              </div>
              <div className="p-4 bg-slate-50 border rounded-xl">
                <h4 className="font-bold text-indigo-700 text-lg">Wheel (<InlineMath math="W_n" />)</h4>
                <p className="text-sm text-slate-600 mt-2"><InlineMath math="C_n" /> grafının ortasına yepyeni bir düğüm eklenir ve bu merkez düğüm çemberdeki tüm düğümlere bağlanır.</p>
              </div>
              <div className="p-4 bg-slate-50 border rounded-xl">
                <h4 className="font-bold text-indigo-700 text-lg">Hypercube (<InlineMath math="Q_n" />)</h4>
                <p className="text-sm text-slate-600 mt-2"><InlineMath math="2^n" /> tane düğümü olan ve düğüm isimleri n-bitlik stringler olan graftır. Sadece tek 1 biti farklı olan düğümler arasında kenar vardır.</p>
              </div>
            </div>
          </div>

          {/* 4. Bipartite Graphs */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">4. Bipartite (İki Parçalı) Graflar</h3>
            <p className="text-slate-700 mb-4">
              Bir grafın düğümleri <InlineMath math="V_1" /> ve <InlineMath math="V_2" /> olmak üzere iki ayrık (disjoint) kümeye ayrılabiliyorsa ve <strong>TÜM kenarlar sadece <InlineMath math="V_1" />'deki bir düğüm ile <InlineMath math="V_2" />'deki bir düğüm arasında</strong> yer alıyorsa buna Bipartite Graf denir. Kendi kümesi içindeki elemanlar arasında asla kenar olamaz!
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-4">
              <strong className="text-amber-800">Test Yöntemi (Coloring):</strong> Düğümleri sırasıyla Kırmızı ve Mavi renklere boyamaya çalışın. Eğer birbirine komşu olan iki düğüm aynı renge boyanmak zorunda kalmıyorsa, o graf Bipartite'tır. (Örn: Üçgen formundaki <InlineMath math="C_3" /> Bipartite değildir, çünkü 3. düğüm komşularının iki rengiyle de çakışır).
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
