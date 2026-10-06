"use client";

import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { AlertTriangle } from 'lucide-react';

export default function MatricesAndInversesPage() {
  const [step, setStep] = useState(0);

  const steps = [
    <BlockMath key="0">
      {`\\begin{bmatrix} \\color{red}1 & \\color{red}2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} \\color{blue}5 & 6 \\\\ \\color{blue}7 & 8 \\end{bmatrix} = \\begin{bmatrix} \\color{green}1\\cdot5 + 2\\cdot7 & \\cdot \\\\ \\cdot & \\cdot \\end{bmatrix} = \\begin{bmatrix} 19 & \\cdot \\\\ \\cdot & \\cdot \\end{bmatrix}`}
    </BlockMath>,
    <BlockMath key="1">
      {`\\begin{bmatrix} \\color{red}1 & \\color{red}2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 5 & \\color{blue}6 \\\\ 7 & \\color{blue}8 \\end{bmatrix} = \\begin{bmatrix} 19 & \\color{green}1\\cdot6 + 2\\cdot8 \\\\ \\cdot & \\cdot \\end{bmatrix} = \\begin{bmatrix} 19 & 22 \\\\ \\cdot & \\cdot \\end{bmatrix}`}
    </BlockMath>,
    <BlockMath key="2">
      {`\\begin{bmatrix} 1 & 2 \\\\ \\color{red}3 & \\color{red}4 \\end{bmatrix} \\begin{bmatrix} \\color{blue}5 & 6 \\\\ \\color{blue}7 & 8 \\end{bmatrix} = \\begin{bmatrix} 19 & 22 \\\\ \\color{green}3\\cdot5 + 4\\cdot7 & \\cdot \\end{bmatrix} = \\begin{bmatrix} 19 & 22 \\\\ 43 & \\cdot \\end{bmatrix}`}
    </BlockMath>,
    <BlockMath key="3">
      {`\\begin{bmatrix} 1 & 2 \\\\ \\color{red}3 & \\color{red}4 \\end{bmatrix} \\begin{bmatrix} 5 & \\color{blue}6 \\\\ 7 & \\color{blue}8 \\end{bmatrix} = \\begin{bmatrix} 19 & 22 \\\\ 43 & \\color{green}3\\cdot6 + 4\\cdot8 \\end{bmatrix} = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}`}
    </BlockMath>
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* HEADER SECTION */}
      <section className="bg-[#235347] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            Part 1.3 & 1.4
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Matrices & Inverses
          </h1>
          <p className="text-lg text-emerald-50 leading-relaxed">
            Şimdi 1.1 ve 1.2'de öğrendiğin denklem sistemlerini çok daha güçlü bir araca dönüştürüyoruz: Matrisler! Sadece işlem yapmayı değil, "neden" sorusunu sormayı ve sınavdaki o meşhur ODTÜ "Tuzaklarını" nasıl aşacağını öğreneceksin.
          </p>
        </div>
      </section>

      {/* MATRIX FUNDAMENTALS (NEW SECTION) */}
      <section className="space-y-6">
        <h2 className="text-3xl font-extrabold text-[#051F20] tracking-tight border-b-2 border-slate-100 pb-4">
          Matris Nedir ve Temel Türleri
        </h2>
        
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="font-bold text-xl text-slate-800 mb-3 text-[#235347]">Matris Nedir? (Matrix)</h3>
          <p className="text-slate-600 leading-relaxed">
            Sayıların, sembollerin veya ifadelerin satırlar (rows) ve sütunlar (columns) halinde düzenlendiği dikdörtgensel tablolara <strong>Matris (Matrix)</strong> denir. Lineer cebirin yapı taşıdır; karmaşık denklem sistemlerini bilgisayarların ve matematiğin anlayabileceği kompakt bir dile çevirir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-indigo-800 mb-2">Kare Matris (Square Matrix)</h4>
            <p className="text-slate-600 text-sm mb-4">
              Satır sayısının sütun sayısına eşit olduğu (<InlineMath>n \times n</InlineMath>) matrislerdir. Ders boyunca göreceğimiz determinant hesapları, ters matris (inverse) işlemleri her zaman <strong>kare matrisler</strong> üzerinden döner.
            </p>
            <BlockMath>{`\\begin{bmatrix} 1 & 5 \\\\ 3 & -2 \\end{bmatrix}_{2 \\times 2}`}</BlockMath>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-bl-lg">En Önemlisi!</div>
            <h4 className="font-bold text-emerald-800 mb-2">Köşegen Matris (Diagonal Matrix)</h4>
            <p className="text-slate-600 text-sm mb-4">
              Sadece ana köşegeni (main diagonal) üzerinde sayılar barındıran, geri kalan TAVAN ve TABAN elemanları <strong>sıfır</strong> olan kare matristir. 
              <br/><br/>
              <strong>İleride nerede kullanacağız?</strong> Dönem sonuna doğru <em>Özdeğerler ve Özvektörler (Eigenvalues & Eigenvectors)</em> konusunda matrisleri "köşegenleştirme (diagonalization)" işlemine sokacağız. Bu işlem, karmaşık diferansiyel denklemleri çözmeyi ve büyük verileri (PageRank vb.) analiz etmeyi saniyeler içine sığdıracak!
            </p>
            <BlockMath>{`\\begin{bmatrix} \\mathbf{5} & 0 & 0 \\\\ 0 & \\mathbf{-3} & 0 \\\\ 0 & 0 & \\mathbf{2} \\end{bmatrix}`}</BlockMath>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden md:col-span-2">
            <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
            <h4 className="font-bold text-blue-700 mb-2">Birim Matris (Identity Matrix - <InlineMath>I</InlineMath>)</h4>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              Köşegen matrisin çok özel bir halidir: Ana köşegendeki tüm elemanları <strong>1</strong>, geri kalan tüm elemanları <strong>0</strong> olan kare matristir. <br/><br/>
              <strong>Çarpmadaki Rolü:</strong> Normal sayılardaki "1" rakamı neyse, matris dünyasında da Birim Matris (<InlineMath>I</InlineMath>) odur! Bir matrisi birim matrisle çarparsanız (sağdan veya soldan fark etmez), matrisin kendisini elde edersiniz: <InlineMath>A \cdot I = I \cdot A = A</InlineMath>. Bu özellik ters matris bulmada ve denklemleri sadeleştirmede hayat kurtarır.
            </p>
            <BlockMath>{`I_3 = \\begin{bmatrix} \\mathbf{1} & 0 & 0 \\\\ 0 & \\mathbf{1} & 0 \\\\ 0 & 0 & \\mathbf{1} \\end{bmatrix}`}</BlockMath>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-amber-700 mb-2">Üst Üçgen Matris (Upper Triangular Matrix)</h4>
            <p className="text-slate-600 text-sm mb-4">
              Ana köşegenin <strong>ALTINDAKİ</strong> tüm elemanları sıfır olan matrislerdir. İsim kafa karıştırabilir: Sayıların, köşegenin üst tarafında üçgen şeklinde kümelendiğini hayal edersen "Üst Üçgen" mantığını anlarsın. (LU ayrışımında göreceğiz).
            </p>
            <BlockMath>{`\\begin{bmatrix} 2 & 1 & 4 \\\\ \\mathbf{0} & 5 & -1 \\\\ \\mathbf{0} & \\mathbf{0} & 3 \\end{bmatrix}`}</BlockMath>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-purple-700 mb-2">Alt Üçgen Matris (Lower Triangular Matrix)</h4>
            <p className="text-slate-600 text-sm mb-4">
              Ana köşegenin <strong>ÜSTÜNDEKİ</strong> tüm elemanları sıfır olan matrislerdir. Bu kez de sayılar aşağı tarafta üçgen şeklinde kümelenmiştir.
            </p>
            <BlockMath>{`\\begin{bmatrix} 2 & \\mathbf{0} & \\mathbf{0} \\\\ 4 & 5 & \\mathbf{0} \\\\ 1 & -2 & 3 \\end{bmatrix}`}</BlockMath>
          </div>

        </div>
      </section>

      {/* SECTION 1.3: MATRICES */}
      <section className="space-y-6">
        <h2 className="text-3xl font-extrabold text-[#051F20] tracking-tight border-b-2 border-slate-100 pb-4">
          1.3: Matrix Operations (Matris İşlemleri)
        </h2>

        {/* Basic Operations */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6">
          <h3 className="font-bold text-2xl text-[#235347] mb-6">1. Toplama, Çıkarma ve Skaler Çarpım</h3>
          
          <div className="space-y-6">
            {/* Toplama & Çıkarma */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-xl text-indigo-800 mb-3">Toplama & Çıkarma (Addition & Subtraction)</h4>
              
              <div className="flex items-start gap-3 mb-4 bg-indigo-100/50 p-4 rounded-lg border border-indigo-200 text-indigo-900">
                <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <strong className="block mb-1">Gerekli Koşul (Ön Şart):</strong>
                  İki matrisi toplayabilmek veya çıkarabilmek için <strong>boyutları (Satır x Sütun) TIPATIP AYNI</strong> olmalıdır. <InlineMath>2 \times 3</InlineMath> bir matris, SADECE <InlineMath>2 \times 3</InlineMath> boyutundaki başka bir matrisle toplanabilir. Boyutlar uyuşmuyorsa işlem matematikte <strong>"Undefined" (Tanımsız)</strong> olarak kabul edilir.
                </div>
              </div>

              <p className="text-slate-600 text-md mb-4 leading-relaxed">
                Koşul sağlanıyorsa işlem çok basittir: Her eleman, tam olarak kendisiyle aynı konumda (aynı satır ve sütunda) olan karşıdaki elemanla eşleşir ve toplanır/çıkarılır.
              </p>
              
              <div className="overflow-x-auto w-full flex justify-center py-4 bg-white rounded-lg border border-slate-100">
                <BlockMath>{`\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} + \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix} = \\begin{bmatrix} 1+5 & 2+6 \\\\ 3+7 & 4+8 \\end{bmatrix} = \\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}`}</BlockMath>
              </div>
              <div className="overflow-x-auto w-full flex justify-center py-4 bg-white rounded-lg border border-slate-100 mt-2">
                <BlockMath>{`\\begin{bmatrix} 5 & 0 \\\\ -2 & 3 \\end{bmatrix} - \\begin{bmatrix} 1 & 4 \\\\ -1 & 3 \\end{bmatrix} = \\begin{bmatrix} 5-1 & 0-4 \\\\ -2-(-1) & 3-3 \\end{bmatrix} = \\begin{bmatrix} 4 & -4 \\\\ -1 & 0 \\end{bmatrix}`}</BlockMath>
              </div>
            </div>

            {/* Skaler Çarpım */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-xl text-emerald-800 mb-3">Skaler Çarpım (Scalar Multiplication)</h4>
              <p className="text-slate-600 text-md mb-4 leading-relaxed">
                Bir matrisi dışarıdan reel bir sayıyla (skaler, örn: <InlineMath>c</InlineMath>) çarpmak, o sayıyı matrisin <strong>içindeki HER BİR elemana tek tek dağıtmak (çarpmak)</strong> demektir. Bu işlem matrisin boyutunu asla değiştirmez.
              </p>
              <div className="overflow-x-auto w-full flex justify-center py-4 bg-white rounded-lg border border-slate-100">
                <BlockMath>{`\\color{red}3 \\cdot \\begin{bmatrix} 1 & -2 \\\\ 0 & 4 \\end{bmatrix} = \\begin{bmatrix} \\color{red}3 \\cdot 1 & \\color{red}3 \\cdot (-2) \\\\ \\color{red}3 \\cdot 0 & \\color{red}3 \\cdot 4 \\end{bmatrix} = \\begin{bmatrix} 3 & -6 \\\\ 0 & 12 \\end{bmatrix}`}</BlockMath>
              </div>
            </div>
          </div>
        </div>

        {/* Matrix Multiplication Concept */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-2xl text-[#235347] mb-4">2. İki Matrisin Çarpımı (Matrix Multiplication)</h3>
          
          <div className="flex items-start gap-3 mb-6 bg-red-50 p-5 rounded-xl border border-red-200 text-red-900">
            <AlertTriangle className="w-8 h-8 shrink-0 mt-1" />
            <div>
              <strong className="block mb-2 text-lg">ZORUNLU KOŞUL (Domino Kuralı):</strong>
              <p className="leading-relaxed mb-3">
                İki matrisi sadece yan yana koyup çarpamazsınız. Çarpım işleminin yapılabilmesi için <strong>Birinci matrisin SÜTUN sayısı ile İkinci matrisin SATIR sayısı birbirine EŞİT olmak zorundadır.</strong> Bu kurala "İç boyutların eşleşmesi" (Domino Kuralı) denir.
              </p>
              <BlockMath>{`(m \\times \\color{red}n) \\cdot (\\color{red}n \\times p) \\longrightarrow (m \\times p)`}</BlockMath>
              <p className="mt-3 text-sm">
                Buradaki Kırmızı <InlineMath>n</InlineMath>'ler birbirine değen iç kısımlardır ve eşit olmak zorundadırlar. Geriye kalan dıştaki <InlineMath>m</InlineMath> ve <InlineMath>p</InlineMath> sayıları ise, çarpım sonucunda oluşacak YENİ matrisin boyutlarını belirler!
              </p>
            </div>
          </div>

          <p className="text-slate-700 mb-4 leading-relaxed font-medium">
            Önemli Uyarı: Matrislerde çarpma işleminin <strong>değişme özelliği YOKTUR (<InlineMath>AB \neq BA</InlineMath>)</strong>. Neden mi? <InlineMath>A</InlineMath> matrisi <InlineMath>2 \times 3</InlineMath> ve <InlineMath>B</InlineMath> matrisi <InlineMath>3 \times 4</InlineMath> boyutunda olsun. <InlineMath>AB</InlineMath> işleminin iç boyutları (3 ve 3) eşleştiği için sonuç <InlineMath>2 \times 4</InlineMath> boyutunda bir matris çıkar. Ancak <InlineMath>B \cdot A</InlineMath> yazarsanız boyutlar <InlineMath>(3 \times 4) \cdot (2 \times 3)</InlineMath> olur; iç boyutlar (4 ve 2) eşleşmediği için <InlineMath>BA</InlineMath> işlemi <strong>TANIMSIZDIR!</strong>
          </p>
        </div>

        {/* Etkileşimli Çarpım */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-xl text-slate-800 mb-2">3. Görsel Öğrenme: Satır ile Sütunu Çarpıştırmak</h3>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Hadi <InlineMath>2 \times 2</InlineMath> iki matrisi çarpalım. Birinci matrisin satırları (yatay eksen), ikinci matrisin sütunları (dikey eksen) üzerine devrilir. Karşılıklı sayılar çarpılıp toplanır. Adımları incele:
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center">
            <div className="w-full overflow-x-auto pb-4">
              <div className="min-h-[140px] flex items-center justify-center text-lg min-w-max px-4">
                {steps[step]}
              </div>
            </div>
            
            <div className="flex justify-center items-center gap-4 mt-2">
              <button 
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="px-5 py-2.5 bg-[#235347] text-white text-sm font-semibold rounded-xl disabled:opacity-50 hover:bg-[#1a4036] transition-colors"
              >
                Geri
              </button>
              <span className="font-medium text-slate-600 text-sm bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                Adım {step + 1} / 4
              </span>
              <button 
                onClick={() => setStep(Math.min(3, step + 1))}
                disabled={step === 3}
                className="px-5 py-2.5 bg-[#235347] text-white text-sm font-semibold rounded-xl disabled:opacity-50 hover:bg-[#1a4036] transition-colors"
              >
                İleri
              </button>
            </div>
          </div>
        </div>

        {/* Transpose Concept */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-xl text-slate-800 mb-2">4. Matrisin Devriği (Transpose)</h3>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Bir matrisin devriğini (Transpose) almak, onun <strong>satırlarını sütun, sütunlarını satır</strong> yapmak demektir. Orijinal matrisin sağ üst köşesine <InlineMath>T</InlineMath> harfi yazılarak gösterilir (<InlineMath>A^T</InlineMath>). 
          </p>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col items-center">
            <div className="overflow-x-auto w-full flex justify-center">
              <BlockMath>{`A = \\begin{bmatrix} \\color{red}1 & \\color{red}2 & \\color{red}3 \\\\ \\color{blue}4 & \\color{blue}5 & \\color{blue}6 \\end{bmatrix}_{2 \\times 3} \\implies A^T = \\begin{bmatrix} \\color{red}1 & \\color{blue}4 \\\\ \\color{red}2 & \\color{blue}5 \\\\ \\color{red}3 & \\color{blue}6 \\end{bmatrix}_{3 \\times 2}`}</BlockMath>
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center">Dikkat ederseniz, boyutlar da yer değiştiriyor! <InlineMath>2 \times 3</InlineMath> olan boyut <InlineMath>3 \times 2</InlineMath> oldu. Yatay olan kırmızı satır, dikey bir sütuna dönüştü.</p>
          </div>
        </div>

        {/* Combined Examples (Transpose + Operations) */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6">
          <h3 className="font-bold text-2xl text-[#235347] mb-6">5. Sınav Pratiği: İşlemleri ve Devriği (Transpose) Birleştirmek</h3>
          
          <div className="space-y-6">
            
            {/* Example 1: Transpose with Addition */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-lg text-indigo-800 mb-3">Örnek 1: Boyut Kurtarıcı Olarak Transpose (Toplama)</h4>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                Elinde <InlineMath math={`A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}_{2 \\times 3}`} /> ve <InlineMath math={`B = \\begin{bmatrix} 0 & 1 \\\\ -1 & 2 \\\\ 3 & 0 \\end{bmatrix}_{3 \\times 2}`} /> matrisleri var.
                <br/><br/>
                Soru: <strong><InlineMath>A + B</InlineMath> işlemini yapabilir misin?</strong>
                <br/>
                Cevap: <strong>HAYIR!</strong> Çünkü boyutları uyuşmuyor. İşlem <em>Undefined</em>.
                <br/><br/>
                Soru: <strong>Peki <InlineMath>A + B^T</InlineMath> işlemini yapabilir misin?</strong>
                <br/>
                Cevap: <strong>EVET!</strong> Çünkü B matrisinin devriğini aldığında boyutu <InlineMath>3 \times 2</InlineMath>'den <InlineMath>2 \times 3</InlineMath>'e döner. Artık toplanabilirler!
              </p>
              <div className="overflow-x-auto w-full flex justify-center py-4 bg-white rounded-lg border border-slate-100">
                <BlockMath>{`A + B^T = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix} + \\begin{bmatrix} 0 & -1 & 3 \\\\ 1 & 2 & 0 \\end{bmatrix} = \\begin{bmatrix} 1 & 1 & 6 \\\\ 5 & 7 & 6 \\end{bmatrix}`}</BlockMath>
              </div>
            </div>

            {/* Example 2: Transpose with Multiplication */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-lg text-emerald-800 mb-3">Örnek 2: Nokta Çarpımı (Dot Product) Yaratmak (Çarpma)</h4>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                Elinde sadece satırdan oluşan iki tane vektör matrisi olsun: <InlineMath math={`u = \\begin{bmatrix} 2 & 3 \\end{bmatrix}_{1 \\times 2}`} /> ve <InlineMath math={`v = \\begin{bmatrix} 4 & -1 \\end{bmatrix}_{1 \\times 2}`} />.
                <br/><br/>
                Domino kuralına göre <InlineMath>(1 \times 2) \cdot (1 \times 2)</InlineMath> çarpılamaz (iç boyutlar 2 ve 1 eşleşmiyor). Fakat ikincinin devriğini (<InlineMath>v^T</InlineMath>) alırsan:
                <br/>
                <InlineMath>(1 \times \mathbf{2}) \cdot (\mathbf{2} \times 1) \rightarrow (1 \times 1)</InlineMath>
                <br/><br/>
                Yani sonuç tek bir sayı (skaler) çıkar! Buna İç Çarpım (Dot Product) denir.
              </p>
              <div className="overflow-x-auto w-full flex justify-center py-4 bg-white rounded-lg border border-slate-100">
                <BlockMath>{`u \\cdot v^T = \\begin{bmatrix} 2 & 3 \\end{bmatrix} \\begin{bmatrix} 4 \\\\ -1 \\end{bmatrix} = \\begin{bmatrix} (2)(4) + (3)(-1) \\end{bmatrix} = \\begin{bmatrix} 5 \\end{bmatrix}`}</BlockMath>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1.4: INVERSES */}
      <section className="space-y-6 pt-6">
        <h2 className="text-3xl font-extrabold text-[#051F20] tracking-tight border-b-2 border-slate-100 pb-4">
          1.4: Inverses & Properties
        </h2>

        {/* CRITICAL WARNING */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-orange-100 text-orange-600 p-3 rounded-full shrink-0">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-xl text-orange-800 mb-2">En Ölümcül Hata: Commutativity (Değişme Özelliği)</h3>
            <p className="text-orange-700 leading-relaxed mb-4">
              Reel sayılarda <InlineMath>3 \times 5 = 5 \times 3</InlineMath> yapar, ama matrislerde <strong><InlineMath>AB \neq BA</InlineMath></strong>. Çarpımın sırasını asla kendi kafana göre değiştiremezsin! Bir denklemi çözerken her iki tarafı matrisin tersi ile çarpman gerekirse, ya her iki tarafı <strong>soldan</strong> ya da <strong>sağdan</strong> çarpmalısın.
            </p>
            <details className="group">
              <summary className="list-none cursor-pointer bg-orange-100 text-orange-800 font-semibold px-4 py-2 rounded-lg text-sm inline-block hover:bg-orange-200 transition-colors">
                Bunun Sınavdaki Yansımasını Gör (T/F Sorusu)
              </summary>
              <div className="mt-4 p-4 border border-orange-200 bg-white rounded-xl text-sm text-slate-700">
                <p className="mb-2"><strong>Soru (T/F):</strong> <InlineMath>(A+B)^2 = A^2 + 2AB + B^2</InlineMath> doğru mudur?</p>
                <p className="mb-2"><strong>Çözüm:</strong> <strong>FALSE!</strong> <InlineMath>(A+B)(A+B) = A^2 + AB + BA + B^2</InlineMath> olarak açılır. <InlineMath>AB</InlineMath> ve <InlineMath>BA</InlineMath> eşit olmadığı için <InlineMath>2AB</InlineMath> olarak toplanamazlar! Sadece soruda "A and B commute" denirse doğru olur.</p>
              </div>
            </details>
          </div>
        </div>

        {/* Identity & Inverses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col">
            <h3 className="font-bold text-slate-800 mb-3 text-lg">Invertible Matrices (Tersi Olan Matrisler)</h3>
            <p className="text-slate-600 text-sm mb-4">
              Her matrisin tersi YOKTUR (tersi olmayana <strong>Singular</strong> denir). Eğer bir <InlineMath>A</InlineMath> matrisinin tersi (<InlineMath>A^{"{-1}"}</InlineMath>) varsa, onu kendisiyle çarptığında Birim Matrisi (<InlineMath>I</InlineMath>) elde edersin: <InlineMath>A \cdot A^{"{-1}"} = I</InlineMath>.
            </p>
            <details className="group mt-auto">
              <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors">
                2x2 Matris Ters Formülünü Gör
              </summary>
              <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700 text-center">
                <BlockMath>{`A^{-1} = \\frac{1}{ad - bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}`}</BlockMath>
                <p className="mt-2 text-xs"><strong>Not:</strong> Eğer <InlineMath>ad - bc = 0</InlineMath> ise bölme yapılamayacağı için matris Singular'dır.</p>
              </div>
            </details>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col">
            <h3 className="font-bold text-slate-800 mb-3 text-lg">Shoe-Sock Theorem (Çorap-Ayakkabı Kuralı)</h3>
            <p className="text-slate-600 text-sm mb-4">
              Birden fazla matrisin çarpımının tersini (veya transpozunu) alırken parantezi açtığında <strong>sıralama tamamen tersine döner</strong>. (Çorabın üstüne ayakkabı giyersin, ama çıkarırken önce ayakkabıyı çıkarırsın).
            </p>
            <details className="group mt-auto">
              <summary className="list-none cursor-pointer bg-indigo-50 text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors">
                Kuralı ve Uygulamasını İncele
              </summary>
              <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-sm text-slate-700 text-center">
                <BlockMath>{`(AB)^{-1} = B^{-1} A^{-1}`}</BlockMath>
                <BlockMath>{`(AB)^T = B^T A^T`}</BlockMath>
                <p className="mt-2 text-xs text-left">Üçlü olsa da kural aynıdır: <InlineMath>(ABC)^{-1} = C^{-1}B^{-1}A^{-1}</InlineMath></p>
              </div>
            </details>
          </div>
        </div>
      </section>

    </div>
  );
}
