import React from 'react';
import TreeSimulator from '@/components/visualizers/cng223/TreeSimulator';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function TreesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Trees (Ağaçlar)</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Bilgisayar bilimlerinde dosya sistemlerinden veritabanı indekslerine kadar pek çok hiyerarşik yapı <strong>Trees (Ağaçlar)</strong> ile modellenir. Ağaçlar aslında döngüsü olmayan bağlı graflardır. Bu bölümde ağaç terminolojisini, matematiksel formüllerini (m-ary), gezinme algoritmalarını (Preorder, Inorder, Postorder) ve arama algoritmalarını (DFS/BFS) inceleyeceğiz.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">İnteraktif Araç: Tree Analyzer & Traversal Visualizer</h2>
        </div>
        <p className="text-slate-600">
          Sınavlarda "Full 3-ary bir ağacın 100 iç düğümü varsa kaç yaprağı vardır?" gibi sorular sıklıkla gelir. Üstteki hesaplayıcıya değerleri girerek <strong>ODTÜ formüllerinin adım adım çalışmasını</strong> izleyebilirsiniz. Alt kısımdaki görselleştiricide ise meşhur ağaç üzerinde gezinme (Tree Traversal) algoritmalarının nasıl çalıştığını animasyonlarla deneyimleyebilirsiniz.
        </p>
        <div className="mt-4">
          <TreeSimulator />
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
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">1. Tree Terminolojisi</h3>
            <p className="text-slate-700 mb-4">
              <strong>Tree (Ağaç):</strong> Döngü içermeyen (no simple circuits) bağlı ve yönsüz graftır. <br/>
              <strong>Forest (Orman):</strong> Döngü içermeyen ancak bağlı olmayan graflardır. (Ağaçların birleşimi).
            </p>
            <ul className="space-y-4">
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <strong className="text-indigo-800">Root (Kök):</strong> Ağacın en tepesindeki başlangıç noktasıdır. Diğer tüm düğümlere yön okları root'tan dışarı doğru çıkar.
              </li>
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <strong className="text-indigo-800">Parent / Child / Sibling:</strong> Kendisinden ok çıkan düğüme <em>Parent</em>, ok giren düğüme <em>Child</em> denir. Aynı Parent'a sahip düğümlere <em>Sibling (Kardeş)</em> denir.
              </li>
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <strong className="text-indigo-800">Leaf (Yaprak) / Internal Node (İç Düğüm):</strong> Hiç çocuğu olmayan düğümlere <em>Leaf</em> denir. En az bir çocuğu olan düğümlere ise <em>Internal Vertex</em> denir.
              </li>
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <strong className="text-indigo-800">Ancestors / Descendants:</strong> Root'tan bir düğüme giden yoldaki tüm üst düğümlere <em>Ancestor (Ata)</em>, o düğümün altındaki tüm düğümlere <em>Descendant (Soy)</em> denir.
              </li>
            </ul>
          </div>

          {/* 2. m-Ary Trees & Formulas */}
          <div className="bg-indigo-50 border-2 border-indigo-200 p-8 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-200 pb-3 mb-5">2. m-Ary Ağaçlar ve Sınav Formülleri</h3>
            <p className="text-indigo-800 mb-4">
              Her iç düğümünün (internal vertex) <strong>en fazla m tane</strong> çocuğu olan ağaçlara <em>m-ary tree</em> denir. Eğer <InlineMath math="m = 2" /> ise buna <strong>Binary Tree</strong> denir.
            </p>
            
            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg mb-6">
              <strong className="text-rose-800">ODTÜ Sınav Tuzağı:</strong> Her m-ary ağaç <em>Full m-ary</em> değildir! Bir ağacın <strong>Full m-ary</strong> olması için, içindeki HER iç düğümün tam olarak (eksiksiz) <InlineMath math="m" /> tane çocuğu olmalıdır. Kimi düğümde 2, kimi düğümde 3 çocuk varsa o ağaç "Full" olamaz.
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-indigo-900">Theorem 3 & 4 (Altın Formüller):</h4>
              <p className="text-sm text-indigo-700">Full m-ary bir ağaçta; <InlineMath math="n" />: Toplam Düğüm, <InlineMath math="i" />: İç Düğüm, <InlineMath math="l" />: Yaprak sayısı olmak üzere:</p>
              <div className="bg-white p-5 rounded-xl border border-indigo-200 text-center text-lg font-bold text-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><BlockMath math="n = m \cdot i + 1" /></div>
                <div><BlockMath math="l = (m - 1)i + 1" /></div>
                <div><BlockMath math="n = l + i" /></div>
                <div><BlockMath math="i = \frac{l - 1}{m - 1}" /></div>
              </div>
            </div>
          </div>

          {/* 3. Tree Traversal Algorithms */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">3. Tree Traversal (Ağaçta Gezinme) Algoritmaları</h3>
            <p className="text-slate-700 mb-4">
              Bir ağaçtaki tüm düğümleri belirli bir kurala göre ziyaret etme işlemidir. Root (Node - N), Sol alt ağaç (Left - L) ve Sağ alt ağaç (Right - R) kelimelerinin baş harfleriyle kodlanır.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-rose-50 border border-rose-200 rounded-xl">
                <h4 className="font-bold text-rose-800 text-xl mb-2">Preorder (N L R)</h4>
                <p className="text-sm text-rose-700"><strong>Root (N) önce yazılır.</strong> Sonra sol alt ağaç bitene kadar gidilir, en son sağ alt ağaca geçilir. Kitap okumak (Bölüm -&gt; Alt başlıklar) gibidir.</p>
              </div>
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <h4 className="font-bold text-emerald-800 text-xl mb-2">Inorder (L N R)</h4>
                <p className="text-sm text-emerald-700"><strong>Root (N) ortada yazılır.</strong> Önce en sol dibe inilir, sonra parent alınır, sonra sağa geçilir. İkili ağaçlarda sayıları küçükten büyüğe sıralar.</p>
              </div>
              <div className="p-5 bg-sky-50 border border-sky-200 rounded-xl">
                <h4 className="font-bold text-sky-800 text-xl mb-2">Postorder (L R N)</h4>
                <p className="text-sm text-sky-700"><strong>Root (N) en son yazılır.</strong> Çocuklar tamamen bitmeden babaya dönülmez. Matematiksel işlemlerde bağımlılıkları çözmek için kullanılır.</p>
              </div>
            </div>
          </div>

          {/* 4. Spanning Trees (DFS & BFS) */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900 border-b pb-3 mb-5">4. Spanning Trees (Kapsayan Ağaçlar)</h3>
            <p className="text-slate-700 mb-4">
              Basit bir grafın (içinde döngüler olan) bazı kenarlarını silerek onu bir ağaca dönüştürürsek, bu yeni alt grafa <strong>Spanning Tree</strong> denir. Bunu yapmanın 2 temel algoritması vardır:
            </p>
            <ul className="space-y-4 text-slate-700">
              <li>
                <strong className="text-indigo-800">1. Depth-First Search (DFS) / Derinlik Öncelikli Arama:</strong> Bir noktadan başla ve gidebildiğin kadar derine in. Çıkmaz sokağa girersen (veya döngü olacaksa) bir geri dön (backtrack) ve başka bir yoldan tekrar derine in. Bu işlem <em>recursive</em> (özyinelemeli) çalışır ve ince-uzun (derin) ağaçlar oluşturur.
              </li>
              <li>
                <strong className="text-indigo-800">2. Breadth-First Search (BFS) / Genişlik Öncelikli Arama:</strong> Bir düğümün tüm komşularını aynı anda (seviye seviye) ağaca ekle. Sonra o komşuların komşularını ekle. Dalga dalga yayılan bu yöntem, kısa-geniş ağaçlar oluşturur.
              </li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
}
