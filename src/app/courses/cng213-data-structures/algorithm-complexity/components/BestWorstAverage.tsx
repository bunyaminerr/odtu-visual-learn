"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export function BestWorstAverage() {
  const [array] = useState([2, 5, 8, 12, 16, 23, 38, 56, 72, 91]);
  const [searchTarget, setSearchTarget] = useState<number | null>(null);
  
  // Scenarios for Linear Search
  const scenarios = [
    { type: 'Best Case', target: 2, desc: 'Aranan eleman dizinin İLK sırasındadır. Algoritma hemen bulur.', steps: 1, complexity: 'O(1)' },
    { type: 'Average Case', target: 16, desc: 'Aranan eleman dizinin ORTALARINDADIR. Dizinin yarısı taranır.', steps: 5, complexity: 'O(N)' },
    { type: 'Worst Case', target: 91, desc: 'Aranan eleman dizinin SONUNDADIR (veya yoktur). Tüm dizi taranır.', steps: 10, complexity: 'O(N)' }
  ];

  const activeScenario = scenarios.find(s => s.target === searchTarget);

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-[#051F20] mb-2">Linear Search (Doğrusal Arama) Senaryoları</h3>
        <p className="text-sm text-slate-500 mb-8">
          Bir algoritmaya vereceğiniz veri her zaman en kötü durumda olmayabilir. Aşağıdaki sıralı dizide,
          farklı elemanları aradığımızda Linear Search'ün kaç adım attığına bakın. Big-O her zaman <strong>Worst Case</strong>'i ifade eder.
        </p>

        {/* Array Visualization */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {array.map((num, idx) => {
            const isTarget = num === searchTarget;
            const isSearched = activeScenario && idx < activeScenario.steps;
            const isFound = isTarget && isSearched;

            return (
              <motion.div
                key={idx}
                layout
                className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold text-lg border-2 transition-colors duration-300
                  ${isFound ? 'bg-green-100 border-green-500 text-green-700' : 
                    isSearched ? 'bg-red-50 border-red-200 text-red-400' : 
                    'bg-white border-slate-200 text-slate-700'
                  }
                `}
              >
                {num}
              </motion.div>
            );
          })}
        </div>

        {/* Scenario Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map(scenario => (
            <button
              key={scenario.type}
              onClick={() => setSearchTarget(scenario.target)}
              className={`p-4 flex flex-col items-center gap-3 rounded-xl border-2 transition-all
                ${searchTarget === scenario.target 
                  ? 'border-[#235347] bg-[#F2F7F4]' 
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }
              `}
            >
              <div className="font-semibold text-[#051F20]">{scenario.type}</div>
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200">
                <Search size={14} />
                <span>Bul: {scenario.target}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Results Panel */}
      {activeScenario && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-[#051F20] text-white p-6 rounded-xl shadow-md">
            <div className="text-slate-400 text-sm mb-1">Durum</div>
            <div className="text-2xl font-bold mb-4">{activeScenario.type}</div>
            <div className="text-slate-300 text-sm leading-relaxed">
              {activeScenario.desc}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
            <div className="text-slate-500 text-sm mb-2">Harcanan Adım (İşlem Sayısı)</div>
            <div className="text-5xl font-black text-[#235347] mb-4">{activeScenario.steps}</div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500">Karmaşıklık Sınırı:</span>
              <span className="px-2 py-1 bg-slate-100 rounded text-sm font-mono font-bold text-slate-700">
                {activeScenario.complexity}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
