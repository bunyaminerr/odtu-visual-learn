"use client";

import React, { useState } from 'react';
import { ComplexityChart } from './components/ComplexityChart';
import { LoopAnalyzer } from './components/LoopAnalyzer';
import { BestWorstAverage } from './components/BestWorstAverage';

const TABS = [
  { id: 'growth', label: '1. Asymptotic Growth (Big-O)' },
  { id: 'loops', label: '2. Loop Analysis' },
  { id: 'cases', label: '3. Best, Worst & Average Cases' }
];

export default function AlgorithmComplexityPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-slate-800 font-sans">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#051F20] tracking-tight mb-3">
            Algorithm Complexity (Zaman Karmaşıklığı)
          </h1>
          <p className="text-slate-600 max-w-3xl leading-relaxed">
            Algoritmaların veri boyutu (N) arttıkça ne kadar zaman harcadığını inceleyelim.
            Big-O (O) notasyonu, kodunuzun büyüme oranının "en kötü" senaryodaki sınırını ifade eder.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-300/60 mb-8 overflow-x-auto pb-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-t-lg font-medium text-sm transition-colors whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-white text-[#235347] border-t border-x border-slate-200 shadow-sm relative top-[1px]' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-[#F2F7F4]/80 backdrop-blur-sm border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm min-h-[600px]">
          {activeTab === 'growth' && <ComplexityChart />}
          {activeTab === 'loops' && <LoopAnalyzer />}
          {activeTab === 'cases' && <BestWorstAverage />}
        </div>
      </div>
    </div>
  );
}
