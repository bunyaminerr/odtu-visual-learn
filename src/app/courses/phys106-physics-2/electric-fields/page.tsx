'use client';
import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import PointChargesScene from '@/components/phys106/Simulations/PointChargesScene';
import ContinuousChargeScene from '@/components/phys106/Simulations/ContinuousChargeScene';
import { PointCharge } from '@/lib/types/cng106ElectricFields';

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
    <main className="min-h-screen bg-[#F4F7F5] text-slate-800 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">PHYS 106 - Bölüm 22: Elektrik Alanlar</h1>
          <p className="text-slate-500 text-lg font-medium">Noktasal Yükler, Sürekli Yük Dağılımları ve Vektör Alanları Analizi</p>
        </header>

        {/* Section 1: Coulomb's Law & E-Field Definition */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-[#235347] pl-4">1. Elektrik Alanın Tanımı</h2>
          <p className="leading-relaxed text-slate-600 text-lg">
            Elektrik alan, bir yükün etrafındaki uzayda oluşturduğu elektriksel etkinin ölçüsüdür. 
            Uzaydaki herhangi bir noktaya yerleştirilen <InlineMath math="q_0" /> test yüküne etki eden elektriksel kuvvet <InlineMath math="\vec{F}_e" /> ise, elektrik alan <InlineMath math="\vec{E}" /> şu şekilde tanımlanır:
          </p>
          <div className="bg-[#051F20] p-6 rounded-xl shadow-inner text-xl text-[#DAF1DE]">
            <BlockMath math="\vec{E} = \lim_{q_0 \to 0} \frac{\vec{F}_e}{q_0}" />
          </div>
          <p className="leading-relaxed text-slate-600 text-lg">
            Noktasal bir <InlineMath math="q" /> yükü için Coulomb yasasını yerine koyduğumuzda elektrik alan vektörünü elde ederiz:
          </p>
          <div className="bg-[#051F20] p-6 rounded-xl shadow-inner text-xl text-[#DAF1DE]">
            <BlockMath math="\vec{E} = k_e \frac{q}{r^2} \hat{r} = \frac{1}{4\pi\epsilon_0} \frac{q}{r^2} \hat{r}" />
          </div>
        </section>

        {/* Section 2: Interactive Point Charges */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-[#235347] pl-4">2. Noktasal Yükler ve Süperpozisyon</h2>
          <p className="leading-relaxed text-slate-600 text-lg">
            Fizikte en güçlü prensiplerden biri <strong>Süperpozisyon Prensibi</strong>'dir. Bir sistemdeki toplam elektrik alanı, bireysel yüklerin oluşturduğu alanların vektörel toplamıdır:
            <InlineMath math="\vec{E}_{net} = \sum \vec{E}_i" />. Aşağıdaki 3D uzaya yükler ekleyerek elektrik alan oklarının nasıl şekillendiğini inceleyin.
          </p>
          
          <div className="flex gap-4 mb-4">
            <button 
              onClick={addRandomCharge}
              className="bg-[#235347] hover:bg-[#1a3e35] text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-md"
            >
              + Rastgele Yük Ekle
            </button>
            <button 
              onClick={clearCharges}
              className="bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 px-6 py-2.5 rounded-lg font-semibold transition"
            >
              Sahneyi Temizle
            </button>
          </div>

          <PointChargesScene charges={pointCharges} />
        </section>

        {/* Section 3: Continuous Charge Distributions */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-[#235347] pl-4">3. Sürekli Yük Dağılımları (Calculus Yaklaşımı)</h2>
          <p className="leading-relaxed text-slate-600 text-lg">
            Mühendislik problemlerinde yükler genellikle noktasal değil; bir çubuk, disk veya küre boyunca dağılmıştır. Bir cismin elektrik alanını bulmak için cismi sonsuz küçüklükte <InlineMath math="dq" /> yük elemanlarına ayırır ve integral kullanırız:
          </p>
          <div className="bg-[#051F20] p-6 rounded-xl shadow-inner text-xl text-[#DAF1DE]">
            <BlockMath math="d\vec{E} = k_e \frac{dq}{r^2} \hat{r} \quad \Rightarrow \quad \vec{E} = \int k_e \frac{dq}{r^2} \hat{r}" />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-[#235347] mb-4">İspat: Yüklü Halkanın Eksenindeki Elektrik Alanı</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              Toplam <InlineMath math="Q" /> yüküne ve <InlineMath math="R" /> yarıçapına sahip bir halkanın merkez ekseni (<InlineMath math="z" /> ekseni) üzerindeki alan: Simetriden dolayı elektrik alanın yatay bileşenleri birbirini götürür (her <InlineMath math="dq" /> elemanı için tam karşısında zıt yönlü yatay bileşen üreten bir başka eleman vardır). Sadece z-bileşeni (kosinüs bileşeni) hayatta kalır.
            </p>
            <div className="bg-[#051F20] p-6 rounded-xl my-6 overflow-x-auto shadow-inner text-[#DAF1DE]">
              <BlockMath math="dE_z = dE \cos\theta = \left( k_e \frac{dq}{R^2 + z^2} \right) \left( \frac{z}{\sqrt{R^2 + z^2}} \right)" />
              <BlockMath math="E_z = \int \frac{k_e z}{(R^2 + z^2)^{3/2}} dq = \frac{k_e z}{(R^2 + z^2)^{3/2}} \int dq = \frac{k_e Q z}{(R^2 + z^2)^{3/2}}" />
            </div>
            
            {/* Interactive Ring Simulation */}
            <div className="mt-12">
              <h4 className="font-bold text-slate-900 mb-6 text-lg border-b border-slate-200 pb-2">Simülasyon: Halka Merkezinden Uzaklaştıkça Alanın Değişimi</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-8 flex flex-col justify-center">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-slate-700">Z Ekseni Mesafesi (z)</label>
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

                  <div className="p-5 bg-[#F2F7F4] rounded-lg border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <strong>Fiziksel Not:</strong> <InlineMath math="z = 0" /> noktasında (halkanın tam merkezinde) simetriden dolayı net elektrik alan <strong>sıfırdır</strong>. Z değeri çok büyüdüğünde ise formül <InlineMath math="E \approx k_e Q / z^2" /> halini alır ve halka noktasal bir yük gibi davranır. Slider'ı hareket ettirerek turuncu test noktasındaki alan vektörünün (kırmızı ok) nasıl değiştiğini inceleyin.
                    </p>
                  </div>
                </div>
                
                <ContinuousChargeScene chargeQ={ringQ} radius={2} distanceZ={ringZ} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
