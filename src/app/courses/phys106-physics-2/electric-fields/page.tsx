'use client';
import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import Link from 'next/link';
import { Lightbulb, BookOpen, Target, Brain, CheckCircle2, AlertTriangle, Calculator, Sparkles, MoveRight, Activity, Zap, ArrowLeft } from 'lucide-react';
import PointChargesScene from '@/components/phys106/Simulations/PointChargesScene';
import ContinuousChargeScene from '@/components/phys106/Simulations/ContinuousChargeScene';
import Chapter22Exercises from '@/components/phys106/Chapter22Exercises';
import { PointCharge } from '@/lib/types/cng106ElectricFields';

const ExampleProblem = ({ title, question, steps, answer }: { title: string, question: React.ReactNode, steps: React.ReactNode[], answer: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm my-8">
            <div className="bg-slate-50 p-5 border-b border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#235347]/10 flex items-center justify-center text-[#235347]">
                        <Target className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">{title}</h3>
                </div>
                <div className="text-slate-700">
                    {question}
                </div>
            </div>
            {open ? (
                <div className="p-5 bg-white space-y-6">
                    <h4 className="font-bold text-[#235347] border-b border-[#235347]/10 pb-2 flex items-center gap-2">
                        <Brain className="w-5 h-5" /> Adım Adım Çözüm
                    </h4>
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center font-bold text-slate-500 text-sm">
                                {i + 1}
                            </div>
                            <div className="flex-1 pt-1 text-slate-700">
                                {step}
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100 flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold text-emerald-900 block mb-1">Sonuç:</span>
                            <div className="text-emerald-800 font-medium">
                                {answer}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setOpen(false)} className="text-sm font-medium text-slate-500 hover:text-slate-800 mt-4 px-2">Çözümü Gizle</button>
                </div>
            ) : (
                <div className="p-4 bg-white flex justify-center">
                    <button onClick={() => setOpen(true)} className="flex items-center gap-2 text-[#235347] font-semibold hover:text-[#1a3e35] transition-colors bg-[#235347]/5 px-6 py-2.5 rounded-full">
                        <Calculator className="w-5 h-5" />
                        Ayrıntılı Çözümü İncele
                    </button>
                </div>
            )}
        </div>
    );
};

export default function ElectricFieldsPage() {
  const [pointCharges, setPointCharges] = useState<PointCharge[]>([
    { id: '1', position: [-2, 0, 0], charge: 1e-9 },
    { id: '2', position: [2, 0, 0], charge: -1e-9 },
  ]);

  const [ringZ, setRingZ] = useState(2);
  const [ringQ, setRingQ] = useState(5e-9);

  const addRandomCharge = () => {
    const isPos = Math.random() > 0.5;
    setPointCharges(prev => [...prev, {
      id: Date.now().toString(),
      position: [(Math.random()-0.5)*5, (Math.random()-0.5)*5, (Math.random()-0.5)*5],
      charge: isPos ? 1e-9 : -1e-9
    }]);
  };

  const clearCharges = () => setPointCharges([]);

  return (
    <main className="min-h-screen bg-[#F4F7F5] text-slate-800 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation */}
        <div className="-mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-[#235347] font-bold hover:text-emerald-600 transition-all bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 hover:shadow-md transform hover:-translate-y-0.5">
            <ArrowLeft className="w-5 h-5" />
            Ana Menüye Dön
          </Link>
        </div>

        {/* Header */}
        <header className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#235347] to-emerald-400"></div>
          <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-[#235347]" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Chapter 22: Electric Fields</h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            Evrendeki en temel kuvvetlerden biri olan Elektromanyetizmanın giriş kapısı.
            ODTÜ PHYS 106 müfredatına birebir uygun olarak hazırlanmış detaylı rehber.
          </p>
        </header>

        {/* 0. Seviye Giriş (Kanca) */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Lightbulb className="w-7 h-7 text-amber-500" /> Neden "Alan" Kavramına İhtiyacımız Var?
          </h2>
          <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
            <p>
              Güneş Dünya'yı çeker. Mıknatıslar birbirini iter. Yükler birbirine kuvvet uygular. Peki ama <strong>arada hiçbir şey yokken</strong> (uzay boşluğu) bir cisim diğerine nasıl dokunmadan kuvvet uygulayabilir? Buna "Action at a Distance" (Uzaktan Etki) denir ve Newton'u bile rahatsız etmiştir.
            </p>
            <p>
              İşte <strong>Michael Faraday</strong>, bu kafa karışıklığını efsanevi bir kavramla çözdü: <strong>Alan (Field)</strong>.
            </p>
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mt-6">
              <h4 className="font-bold text-amber-900 mb-2">Örümcek Ağı Analojisi</h4>
              <p className="text-amber-800 text-base">
                Uzayı devasa, görünmez bir örümcek ağı olarak düşünün. Bir <InlineMath math="+Q" /> yükü bu ağın ortasına oturduğunda, ağın her yerini gerer ve kendi varlığını tüm uzaya yayar (İşte bu <strong>Elektrik Alandır</strong>). Başka bir zavallı <InlineMath math="q" /> yükü bu ağa yakalandığında, doğrudan ilk yüke değil, bulunduğu noktadaki "gerilmiş ağa" (alana) tepki verir.
              </p>
            </div>
          </div>
        </section>

        {/* 1. İletkenler, Yalıtkanlar ve Elektrik Alan Çizgileri */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <Zap className="w-7 h-7 text-[#235347]" /> 1. Yüklerin Doğası ve Alan Çizgileri
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              Maddeler elektriği iletme yeteneklerine göre ikiye ayrılır:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>İletkenler (Conductors):</strong> Metaller gibi. Elektronlar atomlarına sıkı sıkıya bağlı değildir, madde içinde serbestçe dolaşabilirler (Elektron Denizi). Fazla yük verildiğinde, yükler birbirini iterek <strong>daima dış yüzeye</strong> toplanır. İçeride net elektrik alan sıfırdır!</li>
              <li><strong>Yalıtkanlar (Insulators):</strong> Cam, plastik gibi. Bütün elektronlar atomlara hapsolmuştur. Yük verdiğinizde, verdiğiniz yerde kalır, dağılamaz.</li>
            </ul>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mt-4">
              <h4 className="font-bold text-blue-900 mb-2">Elektrik Alan Çizgileri (Görselleştirme)</h4>
              <p className="text-blue-800 text-base">
                Görünmez alanı çizmek için oklar kullanırız. Kurallar şunlardır:
                <br/>1. Çizgiler HER ZAMAN <InlineMath math="(+)" /> yükten çıkar, <InlineMath math="(-)" /> yüke girer.
                <br/>2. Çizgiler asla birbirini kesmez (kesişseydi, o noktada elektrik alanın iki farklı yönü olurdu ki bu fiziken imkansızdır).
                <br/>3. Çizgilerin birbirine yakın/sık olduğu yerlerde elektrik alan daha güçlüdür.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Coulomb's Law & E-Field */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <BookOpen className="w-7 h-7 text-[#235347]" /> 2. Coulomb Yasası ve Elektrik Alan Tanımı
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              İki yük arasındaki elektriksel kuvvet (Coulomb Kuvveti) şu şekilde tanımlanır:
            </p>
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm text-xl text-center overflow-x-auto text-emerald-900">
              <BlockMath math="\vec{F} = \frac{1}{4\pi\epsilon_0} \frac{q_1 q_2}{r^2} \hat{r}" />
            </div>
            <p>
              Ancak biz "kuvvet" yerine "alan" kullanmak istiyoruz. Elektrik alan (<InlineMath math="\vec{E}" />), uzaydaki herhangi bir noktaya konulan pozitif bir <strong>birim test yüküne (+1 Coulomb)</strong> etki eden kuvvettir.
            </p>
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm text-xl text-center overflow-x-auto text-emerald-900">
              <BlockMath math="\vec{E} = \frac{\vec{F}}{q_0} \quad \Rightarrow \quad \vec{E} = \frac{1}{4\pi\epsilon_0} \frac{q}{r^2} \hat{r}" />
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-2xl mt-4">
              <p className="text-amber-900 text-base font-medium m-0">
                <strong>Süperpozisyon Kuralı:</strong> Elektrik alan bir vektördür! Eğer ortamda birden fazla yük varsa, toplam elektrik alanı bulmak için sayıları dümdüz toplayamazsınız. <strong>Vektörel toplama</strong> yapmak ZORUNDASINIZ!
              </p>
            </div>
          </div>

          <ExampleProblem 
            title="ODTÜ/MIT Klasik Soru: Karedeki Yükler"
            question={
              <p>
                Kenar uzunluğu <InlineMath math="a" /> olan bir karenin köşelerine sırasıyla <InlineMath math="+q, +q, -q, -q" /> yükleri yerleştirilmiştir (Saat yönünde). Karenin tam merkezindeki elektrik alanın büyüklüğü ve yönü nedir?
              </p>
            }
            steps={[
              <p>Merkez noktasının köşelere olan uzaklığı (pisagordan) <InlineMath math="r = \frac{a\sqrt{2}}{2}" /> dir.</p>,
              <p>Her bir yükün merkezde yarattığı elektrik alanın büyüklüğü eşittir ve <InlineMath math="E_0 = k \frac{q}{r^2} = k \frac{q}{(a^2/2)} = \frac{2kq}{a^2}" /> olarak bulunur.</p>,
              <p>Şimdi YÖNLERE (Vektörlere) dikkat edelim: Merkezdeki bir "+1" test yükünü hayal et.<br/>
              - <InlineMath math="+q" /> yükleri (diyelim ki sol ve sağ üst köşede) test yükünü <strong>iter</strong> (aşağı doğru).<br/>
              - <InlineMath math="-q" /> yükleri (alt köşelerde) test yükünü <strong>çeker</strong> (aşağı doğru).</p>,
              <p>Çaprazdaki itme ve çekme kuvvetleri birleşir. Üstteki yüklerin itmesiyle alttaki yüklerin çekmesi aynı yöndedir. İki diyagonalin de bileşkeleri aşağı doğru (y-ekseni negatif yönde) toplanır, x-bileşenleri simetriden dolayı birbirini <strong>yok eder (iptal eder)</strong>.</p>,
              <p>Bir diyagonaldeki toplam alan: <InlineMath math="2 E_0" />. Bu köşegenin y ekseniyle yaptığı açı 45 derecedir.<br/> 
              Toplam <InlineMath math="E_{net} = 2 \times (2 E_0 \cos 45^\circ) = 4 E_0 \frac{\sqrt{2}}{2} = 2\sqrt{2} E_0" /></p>
            ]}
            answer={
              <BlockMath math="\vec{E}_{net} = - \frac{4\sqrt{2} k q}{a^2} \hat{j}" />
            }
          />
        </section>

        {/* 3. Düzgün Alanda Parçacık Hareketi */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <Activity className="w-7 h-7 text-[#235347]" /> 3. Düzgün Alanda Yüklü Parçacık Hareketi
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              Newton'un İkinci Yasasını (<InlineMath math="\vec{F} = m\vec{a}" />) hatırlayın. Bir elektronu veya protonu düzgün (sabit) bir elektrik alanına fırlatırsanız, üzerine sabit bir kuvvet etki eder: <InlineMath math="\vec{F} = q\vec{E}" />. 
            </p>
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm text-xl text-center overflow-x-auto text-emerald-900">
              <BlockMath math="\vec{a} = \frac{q\vec{E}}{m}" />
            </div>
            <p>
              Elektron gibi negatif yükler, elektrik alanın <strong>tersi yönünde</strong> ivmelenir! Fizik 1 (PHYS 105) dersindeki Eğik Atış (Projectile Motion) denklemlerinin tamamen aynısı bu sefer yerçekimi yerine elektrik alan için uygulanır.
            </p>
          </div>

          <ExampleProblem 
            title="Sınav Favorisi: Kondansatöre Giren Elektron"
            question={
              <p>
                Bir elektron (<InlineMath math="m_e, -e" />), yatayda <InlineMath math="v_0" /> hızıyla x-ekseni boyunca ilerlerken, aralarında <InlineMath math="L" /> mesafe bulunan iki yüklü paralel plaka arasına giriyor. Plakalar arasında aşağı yönde düzgün bir <InlineMath math="E" /> elektrik alanı vardır. Elektron plakalardan çıkarken düşeyde (y ekseninde) ne kadar sapmış olur? (Yerçekimini ihmal edin)
              </p>
            }
            steps={[
              <p>1. Elektron yatayda (x-ekseni) sabit hızla gider çünkü x yönünde kuvvet yoktur. Plakaların içinden geçme süresi: <InlineMath math="t = \frac{L}{v_0}" /></p>,
              <p>2. Düşey yönde (y-ekseni) etki eden kuvvet: Elektrik alan aşağı doğru ama elektron negatif (<InlineMath math="-e" />) olduğu için kuvvet <strong>YUKARI</strong> doğrudur! <InlineMath math="F_y = eE" /></p>,
              <p>3. Newton yasasından y-eksenindeki ivme: <InlineMath math="a_y = \frac{eE}{m_e}" /></p>,
              <p>4. Kinematik denklem (ilk hızın y bileşeni 0): <InlineMath math="\Delta y = \frac{1}{2} a_y t^2" /></p>,
              <p>5. İvme ve süre değerlerini yerine koyalım: <InlineMath math="\Delta y = \frac{1}{2} \left(\frac{eE}{m_e}\right) \left(\frac{L}{v_0}\right)^2" /></p>
            ]}
            answer={
              <BlockMath math="\Delta y = \frac{e E L^2}{2 m_e v_0^2} \quad \text{(Yukarı yönde sapar)}" />
            }
          />
        </section>

        {/* 4. Interactive Point Charges */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <Target className="w-7 h-7 text-[#235347]" /> 4. Süperpozisyon Simülasyonu
          </h2>
          <p className="leading-relaxed text-slate-600 text-lg mb-8">
            Az önce bahsettiğimiz "vektörel toplama" mantığını anlamanın en iyi yolu görselleştirmektir. 
            Aşağıdaki 3 Boyutlu uzaya (+) ve (-) yükler ekleyin. Kırmızı okların 
            yeni yüklerden nasıl etkilendiğini izleyin.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <button 
              onClick={addRandomCharge}
              className="bg-[#235347] hover:bg-[#1a3e35] text-white px-6 py-3 rounded-xl font-semibold transition shadow-md flex items-center gap-2"
            >
              <Lightbulb className="w-5 h-5" /> Rastgele Yük Ekle
            </button>
            <button 
              onClick={clearCharges}
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              Temizle
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50">
             <PointChargesScene charges={pointCharges} />
          </div>
        </section>

        {/* 5. Continuous Charge Distributions */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <Calculator className="w-7 h-7 text-[#235347]" /> 5. Sürekli Yük Dağılımları (Zor Kısım!)
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              Burası çoğu öğrencinin zorlandığı yerdir çünkü Calculus (İntegral) işin içine girer. 
              Elinizde noktasal bir yük yoksa (örneğin uzun yüklü bir çubuk veya bir disk varsa), Coulomb yasasını 
              doğrudan kullanamazsınız. Çünkü yük tek bir noktada değil, cismin üzerine yayılmıştır.
            </p>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl">
              <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Evrensel Çözüm Algoritması (5 Adım)
              </h4>
              <ol className="list-decimal pl-5 space-y-2 text-red-800 font-medium">
                <li>Cismi gözle görülemeyecek kadar küçük parçalara ( <InlineMath math="dq" /> ) böl. (Artık her bir dq noktasal yük gibi davranır!)</li>
                <li>Geometriye göre <InlineMath math="dq" />'yu uzunluk, alan veya hacim cinsinden yaz: 
                   <br/> Çizgi ise: <InlineMath math="dq = \lambda dx" />
                   <br/> Yüzey ise: <InlineMath math="dq = \sigma dA" />
                   <br/> Hacim ise: <InlineMath math="dq = \rho dV" />
                </li>
                <li>Bu minik <InlineMath math="dq" /> yükünün yarattığı <InlineMath math="d\vec{E}" /> alanını yaz: <InlineMath math="d\vec{E} = k \frac{dq}{r^2} \hat{r}" /></li>
                <li><strong>SİMETRİYİ KULLAN!</strong> (Hangi bileşenler birbirini iptal ediyor? Örneğin çubuğun üst yarısı ile alt yarısı birbirini iptal ediyor mu? Bunu fark edersen hayatın kurtulur).</li>
                <li>Hayatta kalan bileşenlerin integralini al.</li>
              </ol>
            </div>

            {/* Simülasyonlu Örnek: Yüklü Halka */}
            <h3 className="text-xl font-extrabold text-slate-900 mt-10 mb-4 flex items-center gap-2">
              <MoveRight className="w-5 h-5 text-[#235347]" /> Klasik Örnek: Yüklü Halkanın (Ring) Ekseni
            </h3>
            <p>
              Yukarıdaki 5 adımı bir halkaya (Ring) uygulayalım. Halka y-z düzleminde olsun, biz x eksenindeki (merkezden <InlineMath math="x" /> kadar uzakta) elektrik alanı arıyoruz. Halkanın yarıçapı <InlineMath math="a" /> olsun.
            </p>
            
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl overflow-x-auto shadow-sm text-emerald-900 space-y-4">
              <p className="text-emerald-700 font-mono text-sm font-bold">// 1. Simetri Analizi: Halkanın üstünden gelen dq ile altından gelen dq'nun yatay(y,z) bileşenleri birbirini götürür. Sadece x ekseni yönündeki bileşen (kosinüs bileşeni) hayatta kalır.</p>
              <BlockMath math="dE_x = dE \cos\theta = \left( k \frac{dq}{a^2 + x^2} \right) \left( \frac{x}{\sqrt{a^2 + x^2}} \right)" />
              <p className="text-emerald-700 font-mono text-sm font-bold">// 2. x (noktanın uzaklığı) ve a (yarıçap) tüm dq'lar için SABİTTİR! İntegralin dışına çıkarlar.</p>
              <BlockMath math="E_x = \int dE_x = \frac{k x}{(a^2 + x^2)^{3/2}} \int dq = \frac{k Q x}{(a^2 + x^2)^{3/2}}" />
            </div>
            
            {/* Interactive Ring Simulation */}
            <div className="mt-8 border border-slate-200 rounded-2xl p-6 bg-slate-50">
              <h4 className="font-bold text-slate-900 mb-6 text-lg">Simülasyon: Halka Merkezinden Uzaklaştıkça Alanın Değişimi</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8 flex flex-col justify-center">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-slate-700">X Ekseni Mesafesi (x)</label>
                      <span className="text-sm text-slate-500 font-mono">{ringZ.toFixed(1)} m</span>
                    </div>
                    <input 
                      type="range" min="-5" max="5" step="0.1" 
                      value={ringZ} onChange={(e) => setRingZ(Number(e.target.value))}
                      className="w-full accent-[#235347]"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-slate-700">Halka Yükü (Q)</label>
                      <span className="text-sm text-slate-500 font-mono">{(ringQ * 1e9).toFixed(1)} nC</span>
                    </div>
                    <input 
                      type="range" min="-10e-9" max="10e-9" step="1e-9" 
                      value={ringQ} onChange={(e) => setRingQ(Number(e.target.value))}
                      className="w-full accent-[#235347]"
                    />
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <strong>Gizli Detay:</strong> Formüle dikkat ederseniz, <InlineMath math="x = 0" /> noktasında (merkezde) pay 0 olduğu için elektrik alan sıfırdır! Şaşırtıcı değil mi? Halkanın tam ortasında sizi çeken/iten net bir kuvvet yoktur. <InlineMath math="x" /> çok büyüdüğünde ise payda <InlineMath math="x^3" /> gibi davranır, formül <InlineMath math="kQ/x^2" /> olur. Yani çok uzaktan bakınca halka, bir <strong>noktasal yük</strong> gibi görünür!
                    </p>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden border border-slate-200">
                  <ContinuousChargeScene chargeQ={ringQ} radius={2} distanceZ={ringZ} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Electric Dipole */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <Sparkles className="w-7 h-7 text-[#235347]" /> 6. Elektrik Dipolleri (Electric Dipoles)
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              Birbirinden <InlineMath math="d" /> mesafesiyle ayrılmış <InlineMath math="+q" /> ve <InlineMath math="-q" /> yük çiftine <strong>Elektrik Dipolü</strong> denir. Doğadaki su molekülü (<InlineMath math="H_2O" />) kusursuz bir dipoldür (Oksijen eksi, Hidrojenler artıdır).
            </p>
            <p>
              Dipol momenti (<InlineMath math="\vec{p}" />) negatiften pozitife doğru çizilen bir vektördür:
            </p>
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm text-xl text-center overflow-x-auto text-emerald-900">
              <BlockMath math="\vec{p} = q \vec{d}" />
            </div>
            
            <ExampleProblem 
              title="Dipolün Elektrik Alan İçindeki Torku (Tork = Döndürme Etkisi)"
              question={
                <p>
                  Düzgün bir <InlineMath math="\vec{E}" /> elektrik alanına, alan çizgileriyle <InlineMath math="\theta" /> açısı yapacak şekilde bir dipol yerleştirilirse ne olur? Neden su molekülleri mikrodalga fırında ısınır?
                </p>
              }
              steps={[
                <p>Artı yüke elektrik alan yönünde bir kuvvet etki eder: <InlineMath math="\vec{F}_+ = q\vec{E}" />.</p>,
                <p>Eksi yüke elektrik alanın <strong>tersi</strong> yönünde bir kuvvet etki eder: <InlineMath math="\vec{F}_- = -q\vec{E}" />.</p>,
                <p>Sistemin üzerine etki eden <strong>NET KUVVET SIFIRDIR</strong> (<InlineMath math="qE - qE = 0" />). Yani dipol sağa sola öteleme hareketi yapmaz.</p>,
                <p>ANCAK! Bu iki kuvvet aynı hiza üzerinde (collinear) değildir. Tıpkı bir direksiyonu iki elinizle zıt yönde çevirmeniz gibi bir <strong>Döndürme Etkisi (Tork)</strong> yaratırlar.</p>,
                <p>Mikrodalga fırınlar, elektromanyetik dalgalar (elektrik alanlar) göndererek yemeğin içindeki su dipollerini sürekli sağa sola döndürür (Tork uygular). Sürtünen moleküller ısı açığa çıkarır!</p>
              ]}
              answer={
                <BlockMath math="\vec{\tau} = \vec{p} \times \vec{E} \quad \Rightarrow \quad \tau = p E \sin\theta" />
              }
            />
          </div>
        </section>

        {/* Exercises from PDF */}
        <Chapter22Exercises />

      </div>
    </main>
  );
}
