import React from 'react';
import FunctionMappingVisualizer from '@/components/visualizers/cng223/FunctionMappingVisualizer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SetsAndFunctionsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Sets and Functions</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Matematiksel yapıların temel taşları olan <strong>Kümeler (Sets)</strong> ve aralarındaki eşleşmeleri (mapping) tanımlayan <strong>Fonksiyonlar (Functions)</strong> konusuna hoş geldiniz.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Fonksiyon Haritalama (Mapping) Simülatörü</h2>
        </div>
        <p className="text-slate-600">
          Aşağıdaki araçta <strong>Domain (A)</strong> kümesindeki bir elemana tıklayıp, ardından <strong>Codomain (B)</strong> kümesindeki bir elemana tıklayarak ok çizebilirsiniz. 
          Çizdiğiniz grafiğin geçerli bir fonksiyon olup olmadığını ve birebir/örten özelliklerini sağ panelden adım adım analiz edebilirsiniz.
        </p>
        <div className="mt-4">
          <FunctionMappingVisualizer />
        </div>
      </section>

      {/* Theoretical Content */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Fonksiyon Özellikleri (Injective & Surjective)</h2>
        </div>
        
        <div className="prose prose-slate max-w-none">
          <p>
            Bir <InlineMath math="f: A \rightarrow B" /> eşleşmesinin fonksiyon olabilmesi için, A (Tanım Kümesi) içindeki <strong>her</strong> elemanın B (Değer Kümesi) içindeki <strong>tam olarak bir</strong> elemana gitmesi şarttır.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-indigo-800 mb-3 border-b pb-2">Injective (Birebir / One-to-one)</h3>
              <p className="text-sm text-slate-600 mb-3">Farklı girdiler her zaman farklı çıktılara gitmelidir. Yani Değer kümesindeki hiçbir elemana 1'den fazla ok gelemez.</p>
              <BlockMath math="\forall a, b \in A, \;\; f(a) = f(b) \implies a = b" />
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-emerald-800 mb-3 border-b pb-2">Surjective (Örten / Onto)</h3>
              <p className="text-sm text-slate-600 mb-3">Değer kümesindeki (Codomain) her eleman en az bir ok almalıdır. Yani boşta eleman kalamaz (Görüntü Kümesi = Değer Kümesi).</p>
              <BlockMath math="\forall y \in B, \;\; \exists x \in A \text{ s.t. } f(x) = y" />
            </div>
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
              <h3 className="text-lg font-bold text-rose-800 mb-2">ODTÜ Sınav Tuzağı: Codomain vs Range</h3>
              <p className="text-rose-700">
                Sınavlarda "Değer Kümesi" (Codomain) ile "Görüntü Kümesi" (Range) kavramları genellikle karıştırılır. 
                <strong>Codomain</strong>, fonksiyonun <em>tanımlandığı</em> hedef kümedir (Örn: Bütün tam sayılar). 
                <strong>Range</strong> ise A'daki elemanların <em>gerçekte gittiği</em> elemanların kümesidir.
                <br /><br />
                Bir fonksiyon ancak ve ancak <strong>Range = Codomain</strong> ise Örten (Surjective) olur!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Question */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">Global Örnek Soru: Composition of Functions</h2>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <span className="font-semibold text-slate-700">UC Berkeley - CS70 Sınav Sorusu</span>
            <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-md">Zorluk: Zor (İspat)</span>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-700">
              <InlineMath math="f: A \rightarrow B" /> ve <InlineMath math="g: B \rightarrow C" /> olmak üzere iki fonksiyon verilmiştir. 
              Eğer bileşke fonksiyon <InlineMath math="g \circ f" /> <strong>birebir (injective)</strong> ise, <InlineMath math="f" />'nin de kesinlikle <strong>birebir</strong> olmak zorunda olduğunu ispatlayınız. 
              Ancak <InlineMath math="g" />'nin birebir olmak zorunda olmadığını bir karşıt örnek (counter-example) ile gösteriniz.
            </p>
            
            <div className="bg-slate-800 text-slate-300 rounded-xl p-5 font-mono text-sm leading-relaxed">
              <div className="text-emerald-400 mb-3">// 1. f'nin birebir (Injective) olduğunun ispatı:</div>
              <div className="mb-2">Çelişki (Contradiction) yöntemini kullanalım.</div>
              <div>Varsayalım ki <InlineMath math="f" /> birebir DEĞİL. Bu durumda <InlineMath math="A" /> kümesinde <InlineMath math="x_1 \neq x_2" /> olacak şekilde iki farklı eleman vardır ki <InlineMath math="f(x_1) = f(x_2)" /> olur.</div>
              <div className="mt-2">Eğer <InlineMath math="f(x_1) = f(x_2)" /> ise, her iki tarafı <InlineMath math="g" /> fonksiyonuna soktuğumuzda:</div>
              <div className="pl-4 my-2"><InlineMath math="g(f(x_1)) = g(f(x_2))" /></div>
              <div>Yani <InlineMath math="(g \circ f)(x_1) = (g \circ f)(x_2)" /> olur.</div>
              <div className="mt-2 text-rose-400 font-bold">
                Fakat bize soruda <InlineMath math="g \circ f" />'nin birebir olduğu verilmişti! Birebir bir fonksiyonda <InlineMath math="x_1 \neq x_2" /> iken sonuçlar aynı çıkamaz. 
                Bu bir ÇELİŞKİDİR. O halde varsayımımız yanlıştır ve <InlineMath math="f" /> kesinlikle birebirdir.
              </div>

              <div className="text-amber-400 mt-6 mb-3">// 2. g'nin birebir olmak zorunda olmadığına karşıt örnek:</div>
              <div className="text-slate-400">
                A = {"{1}"}, B = {"{X, Y}"}, C = {"{Z}"} olsun.<br/>
                f(1) = X (f birebirdir).<br/>
                g(X) = Z, g(Y) = Z (g birebir DEĞİLDİR, çünkü iki farklı eleman Z'ye gidiyor).<br/>
                <br/>
                Bileşke fonksiyon (g ◦ f)(1) = g(f(1)) = g(X) = Z. <br/>
                Tanım kümesi A'da sadece 1 olduğu için bileşke fonksiyon birebirdir. Ancak gördüğünüz gibi g birebir değildir!
                <br/><br/>
                <em>* Bu senaryoyu yukarıdaki haritalama simülatöründe üç küme varmış gibi hayal ederek çizebilirsiniz.</em>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
