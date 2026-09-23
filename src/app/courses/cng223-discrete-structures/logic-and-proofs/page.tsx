import React from 'react';
import TruthTableVisualizer from '@/components/visualizers/cng223/TruthTableVisualizer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function LogicAndProofsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Logic and Proofs</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Matematiksel düşünmenin ve bilgisayar bilimlerinin temel taşı olan <strong>Önermeler Mantığı (Propositional Logic)</strong> ve <strong>İspat Teknikleri</strong> konusuna hoş geldiniz.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Doğruluk Tablosu (Truth Table) Simülatörü</h2>
        </div>
        <p className="text-slate-600">
          Aşağıdaki araca herhangi bir mantıksal formül girerek adım adım doğruluk tablosunu (Truth Table) otomatik olarak oluşturabilirsiniz. 
          Örneğin <InlineMath math="p \rightarrow q" /> için <code>p -{'>'} q</code> veya <InlineMath math="\neg (p \land q)" /> için <code>!(p && q)</code> yazmayı deneyin.
        </p>
        <div className="mt-4">
          <TruthTableVisualizer />
        </div>
      </section>

      {/* Theoretical Content */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Temel Kavramlar ve Mantıksal Operatörler</h2>
        </div>
        
        <div className="prose prose-slate max-w-none">
          <p>
            Bir <strong>Önerme (Proposition)</strong> kesin olarak doğru veya yanlış olan, ancak aynı anda ikisi birden olamayan bildirim cümlesidir.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3 border-b pb-2">De Morgan Kuralları</h3>
              <p className="text-sm text-slate-600 mb-3">ODTÜ sınavlarında en sık kullandırılan mantıksal denklik kuralı:</p>
              <BlockMath math="\neg(p \land q) \equiv \neg p \lor \neg q" />
              <BlockMath math="\neg(p \lor q) \equiv \neg p \land \neg q" />
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3 border-b pb-2">Implication (İma) Denkliği</h3>
              <p className="text-sm text-slate-600 mb-3">Herhangi bir <InlineMath math="p \rightarrow q" /> ifadesi, "VEYA" bağlacı kullanılarak yeniden yazılabilir:</p>
              <BlockMath math="p \rightarrow q \equiv \neg p \lor q" />
              <p className="text-xs text-slate-500 mt-2 italic">Not: Bu denklik, devre tasarımı (Logic Design) yaparken çok işinize yarayacaktır.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pitfalls & Alerts */}
      <section className="space-y-6">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-800 mb-2">ODTÜ Sınav Tuzağı: Vacuously True</h3>
              <p className="text-amber-700">
                <InlineMath math="p \rightarrow q" /> ifadesinde eğer <InlineMath math="p" /> (hipotez) <strong>Yanlış (False)</strong> ise, <InlineMath math="q" />'nun ne olduğuna bakılmaksızın tüm ifade <strong>Doğru (True)</strong> kabul edilir.
                Sınavlarda "Eğer 1=0 ise domuzlar uçabilir" tarzı önermeler verildiğinde sonucun True olduğunu unutmayın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Question */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Global Örnek Soru: Knights and Knaves</h2>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <span className="font-semibold text-slate-700">Stanford University - CS103 Sınav Sorusu</span>
            <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-md">Zorluk: Orta</span>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-700">
              Şövalyeler (Knights) her zaman doğruyu, Yalancılar (Knaves) ise her zaman yalan söyler. A kişisi <em>"B bir şövalyedir"</em> der. B kişisi ise <em>"A ve ben farklı türdeniz"</em> der.
            </p>
            <p className="text-slate-700 font-medium">A ve B'nin kimliklerini önermeler mantığı kurarak bulunuz.</p>
            
            <div className="bg-slate-800 text-slate-300 rounded-xl p-5 font-mono text-sm">
              <div className="text-emerald-400 mb-2">// Çözüm Adımları</div>
              <div>A'nın doğru söyleme durumu: <InlineMath math="A \leftrightarrow B" /></div>
              <div>B'nin doğru söyleme durumu: <InlineMath math="B \leftrightarrow \neg(A \leftrightarrow B)" /></div>
              <div className="mt-3 text-slate-400">
                Bu ifadeleri yukarıdaki doğruluk tablosu simülatörüne <code>B &lt;-&gt; !(A &lt;-&gt; B)</code> şeklinde girerek deneyebilirsiniz. Göreceksiniz ki B'nin ifadesi her durumda çelişki (Contradiction) yaratır. 
                Dolayısıyla B kesinlikle yalan söylüyordur (Knave). B bir Knave ise ve A "B şövalyedir" diyorsa, A da yalan söylüyordur (Knave).
              </div>
              <div className="mt-4 font-bold text-white">Cevap: A = Knave, B = Knave</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
