import React from 'react';
import TruthTableVisualizer from '@/components/visualizers/cng223/TruthTableVisualizer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { AlertTriangle } from 'lucide-react';

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

      {/* SECTION: Implication Traps (from PPTX) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-pink-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Sınavların Vazgeçilmezi: Implication İfadeleri</h2>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg text-pink-800 mb-3">1. Converse, Inverse ve Contrapositive</h3>
            <p className="text-sm text-slate-600 mb-3">Verilen bir <InlineMath math="p \rightarrow q" /> önermesinden 3 yeni önerme türetilebilir. Sınavlarda kelime oyunu olarak çok sorulur.</p>
            <ul className="text-sm space-y-2">
              <li><strong>Converse:</strong> <InlineMath math="q \rightarrow p" /> (Tersi)</li>
              <li><strong>Inverse:</strong> <InlineMath math="\neg p \rightarrow \neg q" /> (Karşıtı)</li>
              <li><strong>Contrapositive:</strong> <InlineMath math="\neg q \rightarrow \neg p" /> (Karşıt Tersi)</li>
            </ul>
            <div className="mt-3 p-3 bg-pink-50 text-pink-900 text-sm font-semibold rounded-lg border border-pink-100">
              Kritik Kural: Sadece <InlineMath math="p \rightarrow q \equiv \neg q \rightarrow \neg p" /> (Contrapositive) birbirine denktir! Converse ve Inverse orijinal ifadeye denk DEĞİLDİR.
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg text-pink-800 mb-3">2. İngilizce'den Mantığa Çeviri Tuzakları (English to Logic)</h3>
            <p className="text-sm text-slate-600 mb-3"><InlineMath math="p \rightarrow q" /> ifadesi İngilizcede birçok farklı şekilde söylenebilir. En çok şaşırtanlar:</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>if p, then q</li>
                <li>p implies q</li>
                <li><strong>p is sufficient for q</strong> (p, q için yeterlidir)</li>
                <li><strong>q if p</strong></li>
              </ul>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li><strong>p only if q</strong></li>
                <li><strong>q unless ¬p</strong></li>
                <li>q whenever p</li>
                <li><strong>q is necessary for p</strong> (q, p için zorunludur)</li>
              </ul>
            </div>
          </div>
          
          <div>
             <h3 className="font-bold text-lg text-pink-800 mb-3">3. Niceleyicilerle İngilizce Çeviriler</h3>
             <p className="text-sm text-slate-600 mb-2"><strong>Domain Tuzağı:</strong> Eğer domain (Evrensel Küme) "sınıftaki öğrenciler" ise çeviri farklı, "tüm insanlar" ise farklıdır!</p>
             <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-slate-700 space-y-3 border border-slate-200">
                <div>
                   <span className="text-slate-500">// "Sınıftaki HER öğrenci Java dersi almıştır"</span><br/>
                   Domain = Sınıftaki öğrenciler {'->'} <InlineMath math="\forall x J(x)" /><br/>
                   Domain = Tüm insanlar {'->'} <InlineMath math="\forall x (S(x) \rightarrow J(x))" /> <span className="text-red-500">(DİKKAT: <InlineMath math="\land" /> KULLANILMAZ)</span>
                </div>
                <div>
                   <span className="text-slate-500">// "Sınıftaki BAZI öğrenciler Java dersi almıştır"</span><br/>
                   Domain = Tüm insanlar {'->'} <InlineMath math="\exists x (S(x) \land J(x))" /> <span className="text-red-500">(DİKKAT: <InlineMath math="\rightarrow" /> KULLANILMAZ)</span>
                </div>
             </div>
          </div>
        </div>
      </section>
      {/* SECTION: Logical Equivalences & Normal Forms */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-violet-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">İleri Seviye Mantıksal Denklikler ve Formlar</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Logical Equivalences Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
              <h3 className="font-bold text-slate-700">Kritik Mantıksal Denklikler (Slaytlardaki Kurallar)</h3>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Identity (Birim)</td>
                    <td className="py-3 px-4 font-mono"><InlineMath math="p \land T \equiv p" /><br/><InlineMath math="p \lor F \equiv p" /></td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-600">Domination (Baskınlık)</td>
                    <td className="py-3 px-4 font-mono"><InlineMath math="p \lor T \equiv T" /><br/><InlineMath math="p \land F \equiv F" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Idempotent (Tek Kuvvet)</td>
                    <td className="py-3 px-4 font-mono"><InlineMath math="p \lor p \equiv p" /><br/><InlineMath math="p \land p \equiv p" /></td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-600">Double Negation</td>
                    <td className="py-3 px-4 font-mono"><InlineMath math="\neg(\neg p) \equiv p" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Absorption (Yutma)</td>
                    <td className="py-3 px-4 font-mono text-violet-700 font-bold"><InlineMath math="p \lor (p \land q) \equiv p" /><br/><InlineMath math="p \land (p \lor q) \equiv p" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Normal Forms & Circuits */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3 border-b pb-2">Normal Formlar (DNF ve CNF)</h3>
              <p className="text-sm text-slate-600 mb-4">Herhangi bir önerme iki standart forma dönüştürülebilir. Bu formlar AI (Artificial Intelligence) algoritmaları ve devre tasarımında kullanılır.</p>
              
              <div className="space-y-3">
                <div className="bg-violet-50 p-3 rounded-lg border border-violet-100">
                  <h4 className="text-xs font-bold text-violet-800 uppercase tracking-wider mb-1">Disjunctive Normal Form (DNF)</h4>
                  <p className="text-xs text-slate-600 mb-1">"VE"lerin "VEYA"sı (Or of ANDs). Olası True durumlarının toplamıdır.</p>
                  <div className="font-mono text-xs text-violet-900"><InlineMath math="(p \land q) \lor (\neg p \land r)" /></div>
                </div>
                
                <div className="bg-fuchsia-50 p-3 rounded-lg border border-fuchsia-100">
                  <h4 className="text-xs font-bold text-fuchsia-800 uppercase tracking-wider mb-1">Conjunctive Normal Form (CNF)</h4>
                  <p className="text-xs text-slate-600 mb-1">"VEYA"ların "VE"si (AND of ORs). AI Resolution algoritmasında bu kullanılır.</p>
                  <div className="font-mono text-xs text-fuchsia-900"><InlineMath math="(p \lor q) \land (\neg p \lor r)" /></div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 text-slate-300 p-5 rounded-2xl shadow-sm">
              <h3 className="font-bold text-white mb-2">Mantık Devreleri ve Bit İşlemleri</h3>
              <p className="text-xs mb-3 text-slate-400">Mantık kuralları bilgisayar mimarisinde Bitwise Logic ve Logic Gates olarak kullanılır.</p>
              <ul className="text-xs font-mono space-y-2">
                <li><span className="text-sky-400">NOT Gate (Inverter):</span> <InlineMath math="\neg p" /> (Tersini alır)</li>
                <li><span className="text-emerald-400">AND Gate:</span> <InlineMath math="p \land q" /> (Bitwise AND)</li>
                <li><span className="text-amber-400">OR Gate:</span> <InlineMath math="p \lor q" /> (Bitwise OR)</li>
                <li><span className="text-rose-400">XOR Gate:</span> <InlineMath math="p \oplus q" /> (Bitwise XOR)</li>
              </ul>
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

      {/* SECTION: Quantifiers & Nested Quantifiers */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-purple-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Quantifiers (Niceleyiciler) ve İç İçe (Nested) Kullanımları</h2>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <p className="text-slate-700">
            Sınavlarda sıkça sorulan konulardan biri de <strong>Universal <InlineMath math="\forall" /> (Her)</strong> ve <strong>Existential <InlineMath math="\exists" /> (Bazı/En az bir)</strong> niceleyicilerinin birlikte (nested) kullanılmasıdır. İç içe niceleyicilerde <strong>sıra çok önemlidir</strong>! <InlineMath math="\forall x \exists y" /> ile <InlineMath math="\exists y \forall x" /> tamamen farklı anlamlara gelir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-indigo-800 mb-2">Matematiksel Örnek</h4>
              <BlockMath math="\forall x \exists y (x + y = 0)" />
              <p className="text-sm text-slate-600 mt-2">
                "Her <InlineMath math="x" /> için öyle bir <InlineMath math="y" /> vardır ki toplamları sıfır eder." (Burada <InlineMath math="y = -x" /> olur. Bu doğrudur.)
              </p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-emerald-800 mb-2">Sınav Tarzı Klasik Örnekler</h4>
              <p className="text-sm text-slate-700 mb-2 font-mono bg-white p-2 rounded border border-slate-200">
                B(x,y): x, y'nin erkek kardeşidir.<br/>
                S(x,y): x ve y kardeştir.<br/>
                L(x,y): x, y'yi sever.
              </p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                <li><InlineMath math="\forall x \forall y (B(x,y) \rightarrow S(x,y))" /> (Erkek kardeşler kardeştir)</li>
                <li><InlineMath math="\forall x \exists y L(x,y)" /> (Herkes birini sever)</li>
                <li><InlineMath math="\exists x \forall y L(y,x)" /> (Öyle biri var ki, herkes onu sever)</li>
                <li><InlineMath math="\forall x L(x,x)" /> (Herkes kendisini sever)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Advanced Translations */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-yellow-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">İngilizceden Mantığa İleri Seviye Çeviriler</h2>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <p className="text-sm text-slate-600">Slaytlarda bolca örneği verilen, anlamsız kelimelerle (Fleegles, Snurds) veya Lewis Carroll (Alice Harikalar Diyarı'nın yazarı) cümleleriyle yapılan çeviriler:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-yellow-800 border-b pb-2">Örnek 1: Fleegles & Snurds</h3>
              <p className="text-xs text-slate-500">Domain: {`{fleegles, snurds, thingamabobs}`}. F(x): x bir fleegle'dır. S(x): x bir snurd'dur. T(x): x bir thingamabob'dur.</p>
              <ul className="text-sm space-y-2 font-mono text-slate-700">
                <li><span className="text-slate-500 block text-xs font-sans">"Everything is a fleegle"</span> <InlineMath math="\forall x F(x)" /></li>
                <li><span className="text-slate-500 block text-xs font-sans">"Nothing is a snurd"</span> <InlineMath math="\neg\exists x S(x) \equiv \forall x \neg S(x)" /></li>
                <li><span className="text-slate-500 block text-xs font-sans">"All fleegles are snurds"</span> <InlineMath math="\forall x (F(x) \rightarrow S(x))" /></li>
                <li><span className="text-slate-500 block text-xs font-sans">"Some fleegles are thingamabobs"</span> <InlineMath math="\exists x (F(x) \land T(x))" /></li>
                <li><span className="text-slate-500 block text-xs font-sans">"No snurd is a thingamabob"</span> <InlineMath math="\neg\exists x (S(x) \land T(x))" /></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-yellow-800 border-b pb-2">Örnek 2: Lewis Carroll Aslanları</h3>
              <p className="text-xs text-slate-500">P(x): x aslandır. Q(x): x vahşidir. R(x): x kahve içer.</p>
              <ul className="text-sm space-y-2 font-mono text-slate-700">
                <li><span className="text-slate-500 block text-xs font-sans">"All lions are fierce."</span> <InlineMath math="\forall x (P(x) \rightarrow Q(x))" /></li>
                <li><span className="text-slate-500 block text-xs font-sans">"Some lions do not drink coffee."</span> <InlineMath math="\exists x (P(x) \land \neg R(x))" /></li>
                <li><span className="text-slate-500 block text-xs font-sans">"Some fierce creatures do not drink coffee."</span> <InlineMath math="\exists x (Q(x) \land \neg R(x))" /></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Rules of Inference */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-orange-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Rules of Inference (Çıkarım Kuralları)</h2>
        </div>
        
        <p className="text-slate-600">
          Argümanların (arguments) geçerliliğini ispatlarken kullandığımız temel kurallardır. Bu kuralları formal ispatlarda (Formal Proofs) adım adım kullanacaksınız.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <h4 className="font-bold text-orange-800 mb-2 border-b pb-1 text-sm">Modus Ponens</h4>
            <BlockMath math="p \rightarrow q" />
            <BlockMath math="p" />
            <div className="w-full h-px bg-slate-300 my-1"></div>
            <BlockMath math="\therefore q" />
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <h4 className="font-bold text-orange-800 mb-2 border-b pb-1 text-sm">Modus Tollens</h4>
            <BlockMath math="p \rightarrow q" />
            <BlockMath math="\neg q" />
            <div className="w-full h-px bg-slate-300 my-1"></div>
            <BlockMath math="\therefore \neg p" />
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <h4 className="font-bold text-orange-800 mb-2 border-b pb-1 text-sm">Hypothetical Syllogism</h4>
            <BlockMath math="p \rightarrow q" />
            <BlockMath math="q \rightarrow r" />
            <div className="w-full h-px bg-slate-300 my-1"></div>
            <BlockMath math="\therefore p \rightarrow r" />
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <h4 className="font-bold text-orange-800 mb-2 border-b pb-1 text-sm">Disjunctive Syllogism</h4>
            <BlockMath math="p \lor q" />
            <BlockMath math="\neg p" />
            <div className="w-full h-px bg-slate-300 my-1"></div>
            <BlockMath math="\therefore q" />
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <h4 className="font-bold text-orange-800 mb-2 border-b pb-1 text-sm">Addition</h4>
            <BlockMath math="p" />
            <div className="w-full h-px bg-slate-300 my-1"></div>
            <BlockMath math="\therefore p \lor q" />
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <h4 className="font-bold text-orange-800 mb-2 border-b pb-1 text-sm">Simplification</h4>
            <BlockMath math="p \land q" />
            <div className="w-full h-px bg-slate-300 my-1"></div>
            <BlockMath math="\therefore p" />
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <h4 className="font-bold text-orange-800 mb-2 border-b pb-1 text-sm">Conjunction</h4>
            <BlockMath math="p" />
            <BlockMath math="q" />
            <div className="w-full h-px bg-slate-300 my-1"></div>
            <BlockMath math="\therefore p \land q" />
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
            <h4 className="font-bold text-orange-800 mb-2 border-b pb-1 text-sm">Resolution</h4>
            <BlockMath math="p \lor r" />
            <BlockMath math="\neg p \lor s" />
            <div className="w-full h-px bg-slate-300 my-1"></div>
            <BlockMath math="\therefore r \lor s" />
          </div>
        </div>
      </section>

      {/* SECTION: Quantifier Rules Detailed */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Niceleyiciler İçin Çıkarım Kuralları (U.I, U.G, E.I, E.G)</h2>
        </div>
        
        <p className="text-slate-600">
          Önermeler mantığındaki Modus Ponens gibi kuralları, "Herkes" (<InlineMath math="\forall" />) ve "Bazıları" (<InlineMath math="\exists" />) içeren cümlelere doğrudan uygulayamayız. Önce bu niceleyicilerden kurtulmamız gerekir. İşte bu 4 kural bu işe yarar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Universal Instantiation (U.I) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <h3 className="font-bold text-indigo-800">1. Universal Instantiation (U.I)</h3>
              <div className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded">Genelden Özele</div>
            </div>
            <p className="text-sm text-slate-600 mb-3">Eğer bir kural <strong>herkes</strong> için geçerliyse, evrendeki <strong>spesifik herhangi bir eleman</strong> için de geçerlidir.</p>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-sm mb-3">
              <InlineMath math="\forall x P(x)" /><br/>
              <div className="w-full h-px bg-slate-300 my-1"></div>
              <InlineMath math="\therefore P(c)" /> <span className="text-xs text-slate-400">(Herhangi bir 'c' için)</span>
            </div>
            <div className="text-xs text-slate-500 bg-indigo-50 p-2 rounded">
              <strong>Örnek:</strong> "Bütün köpekler sevimlidir." kuralından "Öyleyse Fido sevimlidir." sonucunu çıkarmak.
            </div>
          </div>

          {/* Universal Generalization (U.G) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <h3 className="font-bold text-indigo-800">2. Universal Generalization (U.G)</h3>
              <div className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded">Özelden Genele</div>
            </div>
            <p className="text-sm text-slate-600 mb-3">Eğer tamamen <strong>rastgele (arbitrary)</strong> seçilmiş bir 'c' elemanı bir özelliği sağlıyorsa, <strong>herkes</strong> o özelliği sağlar.</p>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-sm mb-3">
              <InlineMath math="P(c)" /> <span className="text-xs text-slate-400">(Rastgele bir 'c' için)</span><br/>
              <div className="w-full h-px bg-slate-300 my-1"></div>
              <InlineMath math="\therefore \forall x P(x)" />
            </div>
            <div className="text-xs text-slate-500 bg-indigo-50 p-2 rounded">
              <strong>Not:</strong> Matematiksel ispatlarda çok sık kullanılır. "n rastgele bir çift sayı olsun" diye başlarsınız, ispat bitince kuralın tüm çift sayılar için geçerli olduğunu söylersiniz.
            </div>
          </div>

          {/* Existential Instantiation (E.I) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-fuchsia-500">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <h3 className="font-bold text-fuchsia-800">3. Existential Instantiation (E.I)</h3>
              <div className="bg-fuchsia-100 text-fuchsia-800 text-xs font-bold px-2 py-1 rounded">Varlıktan İsime</div>
            </div>
            <p className="text-sm text-slate-600 mb-3">Eğer bir özelliği sağlayan <strong>en az bir kişi</strong> olduğunu biliyorsak, o spesifik kişiye bir isim (örn: 'a') verebiliriz.</p>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-sm mb-3">
              <InlineMath math="\exists x P(x)" /><br/>
              <div className="w-full h-px bg-slate-300 my-1"></div>
              <InlineMath math="\therefore P(a)" /> <span className="text-xs text-slate-400">(Bunu sağlayan spesifik 'a' için)</span>
            </div>
            <div className="text-xs text-slate-500 bg-fuchsia-50 p-2 rounded">
              <strong>Örnek:</strong> "Sınıfta A alan biri var." kuralından "Gel bu kişiye Ayşe diyelim, Ayşe A almıştır." sonucunu çıkarmak.
            </div>
          </div>

          {/* Existential Generalization (E.G) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-fuchsia-500">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <h3 className="font-bold text-fuchsia-800">4. Existential Generalization (E.G)</h3>
              <div className="bg-fuchsia-100 text-fuchsia-800 text-xs font-bold px-2 py-1 rounded">İsimden Varlığa</div>
            </div>
            <p className="text-sm text-slate-600 mb-3">Eğer evrende belirli bir 'c' kişisinin bu özelliği sağladığını bulursak, "Demek ki bunu sağlayan <strong>en az biri var</strong>" diyebiliriz.</p>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-sm mb-3">
              <InlineMath math="P(c)" /> <span className="text-xs text-slate-400">(Belli bir 'c' sağladığına göre)</span><br/>
              <div className="w-full h-px bg-slate-300 my-1"></div>
              <InlineMath math="\therefore \exists x P(x)" />
            </div>
            <div className="text-xs text-slate-500 bg-fuchsia-50 p-2 rounded">
              <strong>Örnek:</strong> "Michelle dersten A aldı." kuralından "Demek ki dersten A alan (en az) biri var." sonucunu çıkarmak.
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-5 border border-red-200 rounded-xl mt-4">
          <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Sınav Tuzağı: E.I ve U.I Sıralaması
          </h4>
          <p className="text-sm text-red-700">
            Eğer bir ispat sorusunda hem <InlineMath math="\exists" /> hem de <InlineMath math="\forall" /> kullanmanız gerekiyorsa, <strong>HER ZAMAN ÖNCE E.I (Existential Instantiation) YAPMALISINIZ.</strong>
            Çünkü E.I rastgele biri değildir; o özelliği sağlayan spesifik, özel bir "a" kişisidir. Evrensel kural (U.I) herkes için geçerli olduğundan, bu özel "a" kişisine sonradan rahatlıkla uygulanabilir. Tersi yapılamaz!
          </p>
        </div>
      </section>

      {/* SECTION: Formal Proofs */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-red-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Formal İspatlar (Formal Proofs)</h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6">
            <h3 className="font-bold text-slate-800 mb-4">Klasik "Sokrates Ölümlüdür" İspatı</h3>
            <p className="text-sm text-slate-600 mb-4">
              Öncüller:<br/>
              1) Bütün insanlar ölümlüdür. <InlineMath math="\forall x (\text{Man}(x) \rightarrow \text{Mortal}(x))" /><br/>
              2) Sokrates bir insandır. <InlineMath math="\text{Man}(\text{Socrates})" />
            </p>
            
            <div className="bg-slate-800 text-slate-200 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-600 text-emerald-400">
                    <th className="pb-2">Adım</th>
                    <th className="pb-2">İfade</th>
                    <th className="pb-2">Sebep (Reason)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 pr-4">1</td>
                    <td className="pr-4"><InlineMath math="\forall x (\text{Man}(x) \rightarrow \text{Mortal}(x))" /></td>
                    <td className="text-slate-400">Premise (Verilen)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">2</td>
                    <td className="pr-4"><InlineMath math="\text{Man}(\text{Socrates}) \rightarrow \text{Mortal}(\text{Socrates})" /></td>
                    <td className="text-slate-400">U.I (Adım 1'e Universal Instantiation uygulandı)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">3</td>
                    <td className="pr-4"><InlineMath math="\text{Man}(\text{Socrates})" /></td>
                    <td className="text-slate-400">Premise (Verilen)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">4</td>
                    <td className="text-white font-bold"><InlineMath math="\text{Mortal}(\text{Socrates})" /></td>
                    <td className="text-slate-400">Modus Ponens (2, 3)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Çözümlü Sınav Örnekleri: Adım Adım Formal İspatlar</h3>
              <p className="text-sm text-slate-600 mb-6">
                Aşağıdaki örnekler, sınavlarda karşınıza çıkacak tipik ispat sorularıdır. Her adımda "Neden?" (Reason) kısmının yanına "Nasıl Düşünmeliyiz?" açıklaması eklenmiştir. <strong>DİKKAT:</strong> Sınavlarda sadece "Step" ve "Reason" sütunlarını yazmanız yeterlidir.
              </p>

              <div className="space-y-8">
                {/* Example 1 */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-indigo-600 text-white px-4 py-2 font-bold flex justify-between items-center">
                    <span>Örnek 1: Temel Çıkarım (Simplification & Modus Ponens)</span>
                  </div>
                  <div className="p-4 border-b border-slate-200 bg-white">
                    <span className="font-semibold text-slate-700">İspatla:</span> <InlineMath math="p \land (p \rightarrow q) \vdash q" />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                          <th className="p-3 w-16">Adım</th>
                          <th className="p-3 w-1/3">İfade (Step)</th>
                          <th className="p-3 w-1/4">Sebep (Reason)</th>
                          <th className="p-3">Nasıl Düşünmeliyiz?</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">1</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="p \land (p \rightarrow q)" /></td>
                          <td className="p-3 text-slate-600">Premise (Verilen)</td>
                          <td className="p-3 text-slate-500 text-xs">Soruda bize verilen başlangıç hipotezi.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">2</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="p" /></td>
                          <td className="p-3 text-slate-600">Simplification (1)</td>
                          <td className="p-3 text-slate-500 text-xs">1. adımdaki <InlineMath math="\land" /> (VE) bağlacı her iki tarafın da doğru olduğunu söyler. Dolayısıyla sadece <InlineMath math="p" />'yi çekip alabiliriz.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">3</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="p \rightarrow q" /></td>
                          <td className="p-3 text-slate-600">Simplification (1)</td>
                          <td className="p-3 text-slate-500 text-xs">Aynı şekilde 1. adımdan diğer kısmı olan <InlineMath math="p \rightarrow q" />'yu da çekip alıyoruz.</td>
                        </tr>
                        <tr className="bg-emerald-50/50">
                          <td className="p-3 text-center text-slate-500 font-mono">4</td>
                          <td className="p-3 font-mono font-bold text-emerald-700"><InlineMath math="q" /></td>
                          <td className="p-3 font-bold text-slate-700">Modus Ponens (2, 3)</td>
                          <td className="p-3 text-slate-500 text-xs">Elimizde <InlineMath math="p" /> var (Adım 2) ve <InlineMath math="p \rightarrow q" /> var (Adım 3). Bu ikisini birleştirerek <InlineMath math="q" /> sonucuna ulaşırız. İspat tamamlandı!</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-indigo-600 text-white px-4 py-2 font-bold flex justify-between items-center">
                    <span>Örnek 2: Zincirleme Çıkarım (Modus Tollens)</span>
                  </div>
                  <div className="p-4 border-b border-slate-200 bg-white">
                    <span className="font-semibold text-slate-700">Verilenler:</span> <InlineMath math="\neg p \land q" />, <InlineMath math="r \rightarrow p" />, <InlineMath math="\neg r \rightarrow s" />, <InlineMath math="s \rightarrow t" /> <br/>
                    <span className="font-semibold text-slate-700">İspatla:</span> <InlineMath math="t" />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                          <th className="p-3 w-16">Adım</th>
                          <th className="p-3 w-1/3">İfade (Step)</th>
                          <th className="p-3 w-1/4">Sebep (Reason)</th>
                          <th className="p-3">Nasıl Düşünmeliyiz?</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">1</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="\neg p \land q" /></td>
                          <td className="p-3 text-slate-600">Premise</td>
                          <td className="p-3 text-slate-500 text-xs">Başlangıç noktamız. <InlineMath math="\land" /> bağlacı olduğu için içindeki her şeyi koparıp kullanabiliriz.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">2</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="\neg p" /></td>
                          <td className="p-3 text-slate-600">Simplification (1)</td>
                          <td className="p-3 text-slate-500 text-xs">1. adımdan <InlineMath math="\neg p" />'yi kopardık. (Şu an <InlineMath math="q" />'ya da ihtiyacımız var mı bilmiyoruz, gerekirse onu da koparırız).</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">3</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="r \rightarrow p" /></td>
                          <td className="p-3 text-slate-600">Premise</td>
                          <td className="p-3 text-slate-500 text-xs">Diğer verilen ifadeyi sahaya sürüyoruz. Neden bunu seçtik? Çünkü içinde <InlineMath math="p" /> var! 2. adımla birleştirebiliriz.</td>
                        </tr>
                        <tr className="bg-amber-50">
                          <td className="p-3 text-center text-slate-500 font-mono">4</td>
                          <td className="p-3 font-mono font-bold text-amber-700"><InlineMath math="\neg r" /></td>
                          <td className="p-3 font-bold text-slate-700">Modus Tollens (2, 3)</td>
                          <td className="p-3 text-slate-500 text-xs">"Eğer r ise p" kuralımız var. Ama biliyoruz ki p değil (<InlineMath math="\neg p" />). O zaman r de olamaz! Modus Tollens.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">5</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="\neg r \rightarrow s" /></td>
                          <td className="p-3 text-slate-600">Premise</td>
                          <td className="p-3 text-slate-500 text-xs">Yeni bulduğumuz <InlineMath math="\neg r" /> bilgisini kullanabileceğimiz diğer premise'i sahaya sürüyoruz.</td>
                        </tr>
                        <tr className="bg-sky-50">
                          <td className="p-3 text-center text-slate-500 font-mono">6</td>
                          <td className="p-3 font-mono font-bold text-sky-700"><InlineMath math="s" /></td>
                          <td className="p-3 font-bold text-slate-700">Modus Ponens (4, 5)</td>
                          <td className="p-3 text-slate-500 text-xs">"Eğer <InlineMath math="\neg r" /> ise s" (Adım 5). Ve bizde <InlineMath math="\neg r" /> var (Adım 4). O zaman sonuç <InlineMath math="s" /> çıkar.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">7</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="s \rightarrow t" /></td>
                          <td className="p-3 text-slate-600">Premise</td>
                          <td className="p-3 text-slate-500 text-xs">Son premise'imiz. İçinde aradığımız hedef olan <InlineMath math="t" /> var.</td>
                        </tr>
                        <tr className="bg-emerald-50/50">
                          <td className="p-3 text-center text-slate-500 font-mono">8</td>
                          <td className="p-3 font-mono font-bold text-emerald-700"><InlineMath math="t" /></td>
                          <td className="p-3 font-bold text-slate-700">Modus Ponens (6, 7)</td>
                          <td className="p-3 text-slate-500 text-xs">"Eğer s ise t" (Adım 7) kuralına elimizdeki <InlineMath math="s" /> bilgisini (Adım 6) veriyoruz. Ve <InlineMath math="t" /> sonucuna ulaşıyoruz!</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-teal-600 text-white px-4 py-2 font-bold flex justify-between items-center">
                    <span>Örnek 3: Niceleyiciler (Quantifiers) ve Instantiation</span>
                  </div>
                  <div className="p-4 border-b border-slate-200 bg-white">
                    <span className="font-semibold text-slate-700">Verilenler:</span> <InlineMath math="\forall x (M(x) \rightarrow L(x))" />, <InlineMath math="M(J.S)" /> <br/>
                    <span className="font-semibold text-slate-700">İspatla:</span> <InlineMath math="L(J.S)" />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                          <th className="p-3 w-16">Adım</th>
                          <th className="p-3 w-1/3">İfade (Step)</th>
                          <th className="p-3 w-1/4">Sebep (Reason)</th>
                          <th className="p-3">Nasıl Düşünmeliyiz?</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">1</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="\forall x (M(x) \rightarrow L(x))" /></td>
                          <td className="p-3 text-slate-600">Premise</td>
                          <td className="p-3 text-slate-500 text-xs">"HERKES" için geçerli olan kuralımız.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">2</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="M(J.S) \rightarrow L(J.S)" /></td>
                          <td className="p-3 font-bold text-teal-700">Universal Instantiation (1)</td>
                          <td className="p-3 text-slate-500 text-xs"><strong>Kritik Adım:</strong> Kural herkes için (<InlineMath math="\forall" />) geçerliyse, özel bir kişi olan "J.S" (John Smith) için de geçerlidir. <InlineMath math="x" /> yerine J.S yazarak genel kuralı özelleştiriyoruz.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">3</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="M(J.S)" /></td>
                          <td className="p-3 text-slate-600">Premise</td>
                          <td className="p-3 text-slate-500 text-xs">Bize verilen diğer bilgi. John Smith'in M özelliğine sahip olduğunu biliyoruz.</td>
                        </tr>
                        <tr className="bg-emerald-50/50">
                          <td className="p-3 text-center text-slate-500 font-mono">4</td>
                          <td className="p-3 font-mono font-bold text-emerald-700"><InlineMath math="L(J.S)" /></td>
                          <td className="p-3 font-bold text-slate-700">Modus Ponens (2, 3)</td>
                          <td className="p-3 text-slate-500 text-xs">Artık önermeler mantığına döndük! <InlineMath math="A \rightarrow B" /> kuralımız var ve <InlineMath math="A" /> var. O zaman <InlineMath math="B" /> sonucunu çıkartırız.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Example 4 */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-fuchsia-600 text-white px-4 py-2 font-bold flex justify-between items-center">
                    <span>Örnek 4: Masterclass (E.I, U.I, E.G Bir Arada)</span>
                  </div>
                  <div className="p-4 border-b border-slate-200 bg-white">
                    <span className="font-semibold text-slate-700">Verilenler:</span> <InlineMath math="\exists x (C(x) \land \neg B(x))" />, <InlineMath math="\forall x (C(x) \rightarrow P(x))" /> <br/>
                    <span className="font-semibold text-slate-700">İspatla:</span> <InlineMath math="\exists x (P(x) \land \neg B(x))" />
                  </div>
                  <div className="p-3 bg-red-50 text-red-900 text-xs border-b border-red-100">
                    <strong>ALTIN KURAL:</strong> Eğer elinizde hem <InlineMath math="\exists" /> hem <InlineMath math="\forall" /> varsa, <strong>ÖNCE <InlineMath math="\exists" /> (Existential Instantiation) YAPILMALIDIR!</strong> Çünkü E.I rastgele seçilmemiş, o özelliği sağlayan belirli bir "a" kişisi yaratır. U.I ise herkese uygulandığı için o "a" kişisine de uygulanabilir. Tersi yapılamaz!
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                          <th className="p-3 w-16">Adım</th>
                          <th className="p-3 w-1/3">İfade (Step)</th>
                          <th className="p-3 w-1/4">Sebep (Reason)</th>
                          <th className="p-3">Nasıl Düşünmeliyiz?</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">1</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="\exists x (C(x) \land \neg B(x))" /></td>
                          <td className="p-3 text-slate-600">Premise</td>
                          <td className="p-3 text-slate-500 text-xs">Altın kural gereği "Bazı x'ler için..." ile başlıyoruz.</td>
                        </tr>
                        <tr className="bg-red-50/30">
                          <td className="p-3 text-center text-slate-500 font-mono">2</td>
                          <td className="p-3 font-mono font-bold text-fuchsia-700"><InlineMath math="C(a) \land \neg B(a)" /></td>
                          <td className="p-3 font-bold text-fuchsia-700">Existential Inst. (1)</td>
                          <td className="p-3 text-slate-500 text-xs">Madem böyle bir <InlineMath math="x" /> var, gel biz ona <strong>"a"</strong> ismini verelim. Artık değişken değil, sabit bir "a" kişisi hakkında konuşuyoruz.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">3</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="\forall x (C(x) \rightarrow P(x))" /></td>
                          <td className="p-3 text-slate-600">Premise</td>
                          <td className="p-3 text-slate-500 text-xs">Şimdi de "Herkes için geçerli" kuralını sahaya sürüyoruz.</td>
                        </tr>
                        <tr className="bg-blue-50/50">
                          <td className="p-3 text-center text-slate-500 font-mono">4</td>
                          <td className="p-3 font-mono font-bold text-blue-700"><InlineMath math="C(a) \rightarrow P(a)" /></td>
                          <td className="p-3 font-bold text-blue-700">Universal Inst. (3)</td>
                          <td className="p-3 text-slate-500 text-xs">Kural herkes için geçerliyse, 2. adımda isimlendirdiğimiz "a" kişisi için de geçerlidir. Evrensel kuralı "a" kişisine özelleştirdik.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">5</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="C(a)" /></td>
                          <td className="p-3 text-slate-600">Simplification (2)</td>
                          <td className="p-3 text-slate-500 text-xs">Adım 2'deki <InlineMath math="\land" /> (VE) ifadesinden <InlineMath math="C(a)" />'yı kopardık.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">6</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="\neg B(a)" /></td>
                          <td className="p-3 text-slate-600">Simplification (2)</td>
                          <td className="p-3 text-slate-500 text-xs">Adım 2'deki ifadeden diğer parçayı (<InlineMath math="\neg B(a)" />) kopardık. İlerde lazım olacak.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">7</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="P(a)" /></td>
                          <td className="p-3 font-bold text-slate-700">Modus Ponens (4, 5)</td>
                          <td className="p-3 text-slate-500 text-xs">Adım 4'te <InlineMath math="C(a) \rightarrow P(a)" /> vardı. Adım 5'te <InlineMath math="C(a)" /> bulduk. İkisini Modus Ponens ile birleştirince <InlineMath math="P(a)" /> çıktı.</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-center text-slate-500 font-mono">8</td>
                          <td className="p-3 font-mono text-indigo-900"><InlineMath math="P(a) \land \neg B(a)" /></td>
                          <td className="p-3 font-bold text-slate-700">Conjunction (7, 6)</td>
                          <td className="p-3 text-slate-500 text-xs">Hem <InlineMath math="P(a)" /> doğru (Adım 7), hem <InlineMath math="\neg B(a)" /> doğru (Adım 6). Bunları "VE" bağlacı ile birbirine yapıştırıyoruz (Conjunction kuralı).</td>
                        </tr>
                        <tr className="bg-emerald-50/50">
                          <td className="p-3 text-center text-slate-500 font-mono">9</td>
                          <td className="p-3 font-mono font-bold text-emerald-700"><InlineMath math="\exists x (P(x) \land \neg B(x))" /></td>
                          <td className="p-3 font-bold text-fuchsia-700">Existential Gen. (8)</td>
                          <td className="p-3 text-slate-500 text-xs">"a" isimli özel kişinin <InlineMath math="P(a) \land \neg B(a)" /> şartını sağladığını kanıtladık. Madem "a" diye biri bunu sağlıyor, o zaman "Dünyada bu şartı sağlayan EN AZ BİR x vardır" diye genelleyebiliriz (Existential Generalization). İspat bitti!</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION: Proof Terminology */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-purple-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">İspat Terminolojisi (Proof Terminology)</h2>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-600 mb-4">Matematiksel ispatlarda sıkça karşılaşacağınız terimler:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
              <span className="font-bold text-purple-900 block mb-1">Theorem (Teorem)</span>
              <span className="text-slate-700">Doğruluğu ispatlanmış olan ifadedir.</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Axiom (Aksiyom / Postulate)</span>
              <span className="text-slate-700">Doğruluğu ispat gerektirmeden, baştan kabul edilen temel kurallardır.</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Lemma</span>
              <span className="text-slate-700">Büyük bir teoremi ispatlarken basamak olarak kullanılan "küçük teorem"dir.</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Corollary (Sonuç Teoremi)</span>
              <span className="text-slate-700">Büyük bir teoremin ispatlanmasıyla doğrudan, çok kolay bir şekilde ortaya çıkan yeni kurallardır.</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 md:col-span-2">
              <span className="font-bold text-slate-800 block mb-1">Conjecture (Varsayım)</span>
              <span className="text-slate-700">Doğru olduğuna inanılan ama <strong>henüz ispatlanamamış</strong> iddialardır.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Proof Methods (from PPTX) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-sky-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">İspat Yöntemleri (Proof Methods)</h2>
        </div>
        
        <p className="text-slate-600">
          Bir <InlineMath math="p \rightarrow q" /> önermesini ispatlamak için 223 dersinde sorumlu olduğunuz 5 temel yöntem vardır (Ders slaytlarındaki "Proof Methods for Implications" konusu).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sky-800 mb-2 border-b pb-2">1. Doğrudan İspat (Direct Proof)</h4>
            <p className="text-sm text-slate-600 mb-2"><strong>Varsayım:</strong> <InlineMath math="p" /> doğru kabul edilir.</p>
            <p className="text-sm text-slate-600"><strong>Hedef:</strong> Çıkarım kurallarını kullanarak <InlineMath math="q" />'nun da doğru olduğunu göstermek.</p>
            <div className="mt-3 bg-sky-50 p-3 rounded-lg text-xs font-mono text-sky-900 border border-sky-100">
              Örnek: "n tek sayı ise, n² de tek sayıdır." ispatı.
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sky-800 mb-2 border-b pb-2">2. Dolaylı İspat (Proof by Contraposition)</h4>
            <p className="text-sm text-slate-600 mb-2"><strong>Varsayım:</strong> <InlineMath math="\neg q" /> doğru kabul edilir.</p>
            <p className="text-sm text-slate-600"><strong>Hedef:</strong> <InlineMath math="\neg p" />'nin doğru olduğunu göstermek.</p>
            <div className="mt-3 bg-sky-50 p-3 rounded-lg text-xs font-mono text-sky-900 border border-sky-100">
              Mantık: <InlineMath math="p \rightarrow q \equiv \neg q \rightarrow \neg p" /> (İkisi birbirine denktir)
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sky-800 mb-2 border-b pb-2">3. Çelişki ile İspat (Proof by Contradiction)</h4>
            <p className="text-sm text-slate-600 mb-2"><strong>Varsayım:</strong> Önermenin tamamen tersi (<InlineMath math="\neg(p \rightarrow q)" />) doğru kabul edilir.</p>
            <p className="text-sm text-slate-600"><strong>Hedef:</strong> Bunun matematiksel bir çelişkiye (Reductio ad absurdum) yol açtığını göstermek.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-sky-800 mb-1">4. Vacuous Proof</h4>
              <p className="text-sm text-slate-600">Sadece <InlineMath math="\neg p" />'nin (hipotezin yanlış olduğunun) ispatlanması yeterlidir. Çünkü <InlineMath math="F \rightarrow q" /> daima True verir.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-sky-800 mb-1">5. Trivial Proof</h4>
              <p className="text-sm text-slate-600">Sadece <InlineMath math="q" />'nun (sonucun her durumda doğru olduğunun) ispatlanması yeterlidir. Çünkü <InlineMath math="p \rightarrow T" /> daima True verir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Mathematical Proof Examples */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Klasik Sınav Soruları: Matematiksel İspatlar</h2>
        </div>
        
        <p className="text-slate-600">
          Slaytlarda yer alan ve sınavlarda yazılı olarak çözmeniz beklenen 3 popüler matematiksel ispat sorusu ve çözümü:
        </p>

        <div className="space-y-6">
          {/* Math Proof 1 */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-blue-50 border-b border-slate-200 px-5 py-3">
              <h3 className="font-bold text-blue-900">1. Doğrudan İspat (Direct Proof) Örneği 1</h3>
            </div>
            <div className="p-5 space-y-3">
              <p className="font-semibold text-slate-800">Soru: "Eğer n bir tek tam sayı (odd integer) ise, n² de tek tam sayıdır." ispatlayınız.</p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700 space-y-2 border border-slate-200">
                <div className="text-emerald-600 font-bold mb-2">// Çözüm:</div>
                <p>1. n'nin tek sayı olduğunu varsayalım (Assume p is true).</p>
                <p>2. Tek sayı tanımı gereği: <InlineMath math="n = 2k + 1" /> (k bir tam sayı).</p>
                <p>3. İki tarafın karesini alalım:</p>
                <div className="pl-4">
                  <InlineMath math="n^2 = (2k + 1)^2" /><br/>
                  <InlineMath math="n^2 = 4k^2 + 4k + 1" /><br/>
                  <InlineMath math="n^2 = 2(2k^2 + 2k) + 1" />
                </div>
                <p>4. <InlineMath math="r = 2k^2 + 2k" /> dersek (r bir tam sayıdır), <InlineMath math="n^2 = 2r + 1" /> elde ederiz.</p>
                <p>5. Bu ifade tek sayı tanımına uyduğundan, n²'nin tek sayı olduğu doğrudan ispatlanmıştır. □</p>
              </div>
            </div>
          </div>

          {/* Math Proof 2 */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-blue-50 border-b border-slate-200 px-5 py-3">
              <h3 className="font-bold text-blue-900">2. Doğrudan İspat (Direct Proof) Örneği 2</h3>
            </div>
            <div className="p-5 space-y-3">
              <p className="font-semibold text-slate-800">Soru: "İki rasyonel sayının toplamı rasyoneldir." ispatlayınız.</p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700 space-y-2 border border-slate-200">
                <div className="text-emerald-600 font-bold mb-2">// Çözüm:</div>
                <p>1. Rasyonel sayı tanımı gereği: r = p/q ve s = t/u (<InlineMath math="q \neq 0, u \neq 0" />).</p>
                <p>2. Toplam: <InlineMath math="r + s = \frac{p}{q} + \frac{t}{u} = \frac{pu + qt}{qu}" /></p>
                <p>3. p, q, t, u tam sayı olduğundan (pu + qt) ve (qu) da tam sayıdır.</p>
                <p>4. Ayrıca <InlineMath math="q \neq 0" /> ve <InlineMath math="u \neq 0" /> olduğundan <InlineMath math="qu \neq 0" />.</p>
                <p>5. Sonuç da iki tam sayının bölümü şeklinde yazılabildiği için rasyoneldir. □</p>
              </div>
            </div>
          </div>

          {/* Math Proof 3 */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-blue-50 border-b border-slate-200 px-5 py-3">
              <h3 className="font-bold text-blue-900">3. Dolaylı İspat (Proof by Contraposition) Örneği</h3>
            </div>
            <div className="p-5 space-y-3">
              <p className="font-semibold text-slate-800">Soru: "Eğer 3n + 2 tek sayı ise, n tek sayıdır." ispatlayınız.</p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700 space-y-2 border border-slate-200">
                <div className="text-emerald-600 font-bold mb-2">// Çözüm (Contraposition kullanarak):</div>
                <p>Mantık: <InlineMath math="p \rightarrow q" /> yerine <InlineMath math="\neg q \rightarrow \neg p" /> ispatlayacağız.</p>
                <p>1. q'nun tersi: n'nin çift (even) sayı olduğunu varsayalım.</p>
                <p>2. Çift sayı tanımı gereği: <InlineMath math="n = 2k" />.</p>
                <p>3. 3n + 2 ifadesinde yerine koyalım:</p>
                <div className="pl-4">
                  <InlineMath math="3(2k) + 2 = 6k + 2 = 2(3k + 1)" />
                </div>
                <p>4. <InlineMath math="j = 3k + 1" /> dersek, sonuç <InlineMath math="2j" /> olur. Bu çift sayı tanımıdır!</p>
                <p>5. Yani n çift ise 3n+2 çifttir. Karşıt-tersi de doğrudur: 3n+2 tek ise n tektir. □</p>
              </div>
            </div>
          </div>
          {/* Math Proof 4 - Contradiction */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-blue-50 border-b border-slate-200 px-5 py-3">
              <h3 className="font-bold text-blue-900">4. Çelişki İle İspat (Proof by Contradiction) Örneği</h3>
            </div>
            <div className="p-5 space-y-3">
              <p className="font-semibold text-slate-800">Soru: "<InlineMath math="\sqrt{2}" /> irrasyoneldir." ispatlayınız. <span className="text-red-500 text-xs ml-2 font-normal">(Çok Önemli Sınav Sorusu)</span></p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700 space-y-2 border border-slate-200">
                <div className="text-emerald-600 font-bold mb-2">// Çözüm (Reductio ad absurdum):</div>
                <p>Mantık: İfadenin tam tersinin doğru olduğunu varsayıp, matematiği çökerteceğiz (çelişki bulacağız).</p>
                <p>1. Varsayalım ki <InlineMath math="\sqrt{2}" /> rasyonel olsun.</p>
                <p>2. O zaman, ortak bölenleri olmayan (aralarında asal) iki tam sayı p ve q için <InlineMath math="\sqrt{2} = \frac{p}{q}" /> diyebiliriz.</p>
                <p>3. Her iki tarafın karesini alalım:</p>
                <div className="pl-4">
                  <InlineMath math="2 = \frac{p^2}{q^2} \implies p^2 = 2q^2" />
                </div>
                <p>4. Bu eşitlik p²'nin çift sayı olduğunu gösterir. p² çiftse, p'nin kendisi de çifttir. Yani <InlineMath math="p = 2k" /> yazabiliriz.</p>
                <p>5. Bunu tekrar yerine koyalım:</p>
                <div className="pl-4">
                  <InlineMath math="(2k)^2 = 2q^2 \implies 4k^2 = 2q^2 \implies q^2 = 2k^2" />
                </div>
                <p>6. Bu sefer de q²'nin çift olduğunu, dolayısıyla q'nun da çift olduğunu bulduk!</p>
                <p className="text-red-600 font-bold">7. ÇELİŞKİ (Contradiction)! Hem p hem q çift çıktı, yani ikisi de 2'ye bölünebilir. Oysa Adım 2'de bunların "ortak böleni yok" demiştik. Varsayımımız matematiği çökertti. Öyleyse <InlineMath math="\sqrt{2}" /> irrasyonel olmak ZORUNDADIR. □</p>
              </div>
            </div>
          </div>

          {/* Math Proof 5 - Vacuous */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-blue-50 border-b border-slate-200 px-5 py-3">
              <h3 className="font-bold text-blue-900">5. Vacuous Proof Örneği</h3>
            </div>
            <div className="p-5 space-y-3">
              <p className="font-semibold text-slate-800">Soru: "Herhangi bir n tam sayısı için, eğer n hem tek hem de çift ise, <InlineMath math="n^2 = n + n" /> olur." ispatlayınız.</p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700 space-y-2 border border-slate-200">
                <div className="text-emerald-600 font-bold mb-2">// Çözüm:</div>
                <p>1. Hipotezimiz (p): "n hem tek hem de çifttir."</p>
                <p>2. Hiçbir sayı aynı anda hem tek hem çift olamayacağı için p = False.</p>
                <p>3. Önermemiz <InlineMath math="p \rightarrow q" /> yapısındadır. p False olduğu için kural gereği (<InlineMath math="F \rightarrow q \equiv T" />) sonuç doğrudan True çıkar.</p>
                <p>4. Sonuç (q) ifadesinin (<InlineMath math="n^2 = n + n" />) hiçbir önemi kalmamıştır. Vacuously true. □</p>
              </div>
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
