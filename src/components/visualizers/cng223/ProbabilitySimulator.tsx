"use client";

import React, { useState, useEffect } from 'react';
import { analyzeProbabilityDistribution } from '@/lib/algorithms/probabilityAnalyzer';
import { ProbabilityVariable, ExpectedValueResult } from '@/lib/types/cng223Probability';
import { BlockMath } from 'react-katex';

export default function ProbabilitySimulator() {
  const [variables, setVariables] = useState<ProbabilityVariable[]>([
    { id: '1', x: 1, px: 0.16666 }, // Die roll simulation roughly
    { id: '2', x: 2, px: 0.16666 },
    { id: '3', x: 3, px: 0.16666 },
    { id: '4', x: 4, px: 0.16666 },
    { id: '5', x: 5, px: 0.16666 },
    { id: '6', x: 6, px: 0.1667 }
  ]);

  const [result, setResult] = useState<ExpectedValueResult | null>(null);

  useEffect(() => {
    setResult(analyzeProbabilityDistribution(variables));
  }, [variables]);

  const updateVar = (id: string, field: 'x' | 'px', value: string) => {
    const num = parseFloat(value);
    setVariables(prev => prev.map(v => 
      v.id === id ? { ...v, [field]: isNaN(num) ? 0 : num } : v
    ));
  };

  const addVar = () => {
    setVariables(prev => [...prev, { id: Math.random().toString(), x: 0, px: 0 }]);
  };

  const removeVar = (id: string) => {
    if (variables.length > 1) {
      setVariables(prev => prev.filter(v => v.id !== id));
    }
  };

  // SVG Drawing Math
  const maxPx = Math.max(...variables.map(v => v.px), 0.1);
  const chartHeight = 200;
  const chartWidth = 400;
  const padding = 40;
  const usableHeight = chartHeight - padding * 2;
  const usableWidth = chartWidth - padding * 2;
  const barWidth = Math.min(40, usableWidth / variables.length - 10);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col xl:flex-row">
      
      {/* Left: Input Table */}
      <div className="w-full xl:w-1/2 bg-slate-50 border-r border-slate-200 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Random Variable X ve Olasılıkları P(X)</h3>
            <p className="text-sm text-slate-500">Değerleri değiştirerek E(X) ve V(X)'i canlı analiz edin.</p>
          </div>
          <button onClick={addVar} className="px-3 py-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-lg font-bold text-sm transition-colors">+ Ekle</button>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex gap-2 px-2 pb-2 border-b border-slate-200 text-slate-500 font-bold text-sm">
            <div className="flex-1">Olay x</div>
            <div className="flex-1">Olasılık P(X=x)</div>
            <div className="w-8"></div>
          </div>
          {variables.map(v => (
            <div key={v.id} className="flex gap-2 items-center">
              <input 
                type="number" 
                value={v.x} 
                onChange={(e) => updateVar(v.id, 'x', e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono"
              />
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="1"
                value={v.px} 
                onChange={(e) => updateVar(v.id, 'px', e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono"
              />
              <button onClick={() => removeVar(v.id)} className="w-8 h-8 flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
        </div>

        <div className={`p-4 rounded-xl font-bold flex justify-between items-center ${result?.isValid ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
          <span>Toplam Olasılık: Σ P(X)</span>
          <span className="text-xl">{result?.totalProbability}</span>
        </div>
      </div>

      {/* Right: SVG & Solution */}
      <div className="w-full xl:w-1/2 bg-white p-6 flex flex-col">
        <h4 className="font-bold text-indigo-900 mb-4 border-b pb-2">Analiz ve PMF Grafiği</h4>
        
        {/* SVG PMF Chart */}
        <div className="flex justify-center mb-6 bg-slate-50 rounded-xl border border-slate-100 p-4">
          <svg width={chartWidth} height={chartHeight} className="overflow-visible">
            {/* Y Axis */}
            <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#cbd5e1" strokeWidth="2" />
            <text x={padding - 10} y={padding} textAnchor="end" fontSize="10" fill="#64748b">P(X)</text>
            <text x={padding - 10} y={chartHeight - padding} textAnchor="end" fontSize="10" fill="#64748b">0</text>
            
            {/* X Axis */}
            <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#cbd5e1" strokeWidth="2" />
            
            {/* Bars */}
            {variables.map((v, i) => {
              const xPos = padding + 20 + i * (usableWidth / variables.length);
              const barH = (v.px / maxPx) * usableHeight;
              const yPos = chartHeight - padding - barH;
              
              return (
                <g key={`bar-${v.id}`} className="transition-all duration-500 hover:opacity-80">
                  <rect 
                    x={xPos - barWidth/2} 
                    y={yPos} 
                    width={barWidth} 
                    height={barH} 
                    fill="#6366f1" 
                    rx="4" 
                    className="transition-all duration-500"
                  />
                  <text x={xPos} y={yPos - 5} textAnchor="middle" fontSize="10" fill="#4338ca" fontWeight="bold">
                    {v.px}
                  </text>
                  <text x={xPos} y={chartHeight - padding + 15} textAnchor="middle" fontSize="12" fill="#334155" fontWeight="bold">
                    x={v.x}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Steps */}
        <div className="flex-1 space-y-3 overflow-y-auto pr-2">
          {result?.stepsTex.map((step, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-3 shadow-sm text-sm overflow-x-auto">
              <BlockMath math={step} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
