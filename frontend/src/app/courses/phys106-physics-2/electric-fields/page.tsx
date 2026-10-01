'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import PointChargesSimulation from './components/PointChargesSimulation';
import ContinuousChargeSimulation from './components/ContinuousChargeSimulation';

export default function ElectricFieldsPage() {
  return (
    <div className="min-h-screen bg-[#F4F7F5] p-4 md:p-8 text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-bold text-[#051F20]">PHYS 106 - Ch 22. Electric Fields</h1>
          <p className="text-lg text-slate-600">
            Elektrik Alan (<InlineMath math="\vec{E}" />), elektrik yüklerinin çevrelerindeki uzayda yarattıkları ve diğer yüklere 
            kuvvet uygulamalarına sebep olan vektörel bir fiziksel alandır.
          </p>
        </header>

        {/* Section 1: Coulomb's Law and Point Charges */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#235347] flex items-center gap-2">
            1. Noktasal Yükler ve Coulomb Yasası
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
            <p className="text-slate-700 leading-relaxed">
              İki noktasal yük arasındaki elektriksel kuvvet Coulomb Yasası ile ifade edilir. <InlineMath math="q_0" /> test yüküne, 
              <InlineMath math="q" /> yükü tarafından uygulanan kuvvet:
            </p>
            <div className="bg-[#F2F7F4] py-4 rounded border border-slate-100">
              <BlockMath math="\vec{F}_e = k_e \frac{q q_0}{r^2} \hat{r}" />
            </div>
            <p className="text-slate-700 leading-relaxed">
              Elektrik alan ise birim yüke etki eden kuvvet olarak tanımlanır (<InlineMath math="\vec{E} = \vec{F}_e / q_0" />). 
              Noktasal bir <InlineMath math="q" /> yükünün <InlineMath math="r" /> mesafesinde oluşturduğu elektrik alan şöyledir:
            </p>
            <div className="bg-[#F2F7F4] py-4 rounded border border-slate-100">
              <BlockMath math="\vec{E} = k_e \frac{q}{r^2} \hat{r}" />
            </div>
            <p className="text-slate-700 leading-relaxed">
              Birden fazla yük olması durumunda (Süperpozisyon İlkesi), uzayın herhangi bir noktasındaki net elektrik alan, 
              her bir yükün o noktada oluşturduğu elektrik alanların vektörel toplamına eşittir:
            </p>
            <div className="bg-[#F2F7F4] py-4 rounded border border-slate-100">
              <BlockMath math="\vec{E}_{net} = \sum_{i=1}^{n} \vec{E}_i = k_e \sum_{i=1}^{n} \frac{q_i}{r_i^2} \hat{r}_i" />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Simülasyon 1: Noktasal Yüklerin Vektör Alanı</h3>
          <p className="text-sm text-slate-500 mb-2">Aşağıdaki 3D uzaya yükler ekleyerek (veya silerek) oluşan elektrik alan vektörlerini (Kırmızı oklar) inceleyebilirsiniz. Pozitif yükler Kırmızı/Rose, negatif yükler Mavi ile gösterilmektedir.</p>
          <PointChargesSimulation />
        </section>

        {/* Section 2: Continuous Charge Distributions */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#235347] flex items-center gap-2">
            2. Sürekli Yük Dağılımları (Calculus)
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
            <p className="text-slate-700 leading-relaxed">
              Yük uzayda ayrık noktalar halinde değil de sürekli bir şekilde dağılmışsa (örneğin bir tel, yüzey veya hacim boyunca), 
              toplam (sum) işlemi yerine integral işlemi kullanılır. Yük dağılımı küçük <InlineMath math="dq" /> parçalarına bölünür 
              ve her bir <InlineMath math="dq" /> elemanının test noktasında oluşturduğu <InlineMath math="d\vec{E}" /> alanları toplanır (integre edilir).
            </p>
            <div className="bg-[#F2F7F4] py-4 rounded border border-slate-100">
              <BlockMath math="d\vec{E} = k_e \frac{dq}{r^2} \hat{r} \quad \implies \quad \vec{E} = k_e \int \frac{dq}{r^2} \hat{r}" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border border-slate-200 rounded p-4 bg-slate-50">
                <h4 className="font-bold text-slate-800 mb-2">Yüklü Halka (Ring of Charge)</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Yarıçapı <InlineMath math="R" /> olan ve <InlineMath math="Q" /> yükü homojen olarak dağıtılmış bir halkanın merkezinden geçen <InlineMath math="z" /> eksenindeki alan:
                </p>
                <BlockMath math="E_z = \frac{k_e z Q}{(z^2 + R^2)^{3/2}}" />
              </div>
              <div className="border border-slate-200 rounded p-4 bg-slate-50">
                <h4 className="font-bold text-slate-800 mb-2">Yüklü Çubuk (Line of Charge)</h4>
                <p className="text-sm text-slate-600 mb-4">
                  <InlineMath math="z" /> ekseni üzerine yerleştirilmiş uzunluğu <InlineMath math="L" />, toplam yükü <InlineMath math="Q" /> olan çubuğun, <InlineMath math="z" /> eksenindeki (çubuğun dışında kalan) elektrik alanı (İntegrasyonla elde edilir).
                </p>
                <BlockMath math="\lambda = \frac{Q}{L}, \quad dq = \lambda dz'" />
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Simülasyon 2: Çubuk ve Halka Dağılımları</h3>
          <p className="text-sm text-slate-500 mb-2">Halka ve çubuk etrafındaki elektrik alanın Z-eksenindeki davranışını inceleyin. Yeşil küre test noktasını, Kırmızı ok ise o noktadaki net Elektrik Alan vektörünü gösterir.</p>
          <ContinuousChargeSimulation />
        </section>

      </div>
    </div>
  );
}
