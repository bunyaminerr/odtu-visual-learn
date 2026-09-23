"use client";

import React, { useState, useEffect } from 'react';
import { solveRecurrence } from '@/lib/algorithms/recurrenceSolver';
import { RecurrenceInput, RecurrenceSolution } from '@/lib/types/cng223AdvancedCounting';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function RecurrenceSolverVisualizer() {
  const [c1, setC1] = useState<number>(1);
  const [c2, setC2] = useState<number>(2);
  const [a0, setA0] = useState<number>(2);
  const [a1, setA1] = useState<number>(7);
  const [result, setResult] = useState<RecurrenceSolution | null>(null);

  useEffect(() => {
    try {
      const res = solveRecurrence({ c1, c2, a0, a1 });
      setResult(res);
    } catch (e) {
      console.error(e);
    }
  }, [c1, c2, a0, a1]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      
      {/* Left: Controls */}
      <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Recurrence Equation Solver</h3>
          <p className="text-sm text-slate-500">2. Dereceden Lineer Homojen Özyinelemeli Bağıntılar</p>
        </div>

        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-sm text-indigo-800 font-mono text-center">
            a_n = c_1 a_&#123;n-1&#125; + c_2 a_&#123;n-2&#125;
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">c₁ Katsayısı:</label>
            <input 
              type="number" 
              value={c1} 
              onChange={e => setC1(parseInt(e.target.value || '0', 10))}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">c₂ Katsayısı:</label>
            <input 
              type="number" 
              value={c2} 
              onChange={e => setC2(parseInt(e.target.value || '0', 10))}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>

          <hr className="border-slate-200 my-4" />

          <div>
            <label className="block font-bold text-slate-700 mb-1">a₀ (Başlangıç 0):</label>
            <input 
              type="number" 
              value={a0} 
              onChange={e => setA0(parseInt(e.target.value || '0', 10))}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">a₁ (Başlangıç 1):</label>
            <input 
              type="number" 
              value={a1} 
              onChange={e => setA1(parseInt(e.target.value || '0', 10))}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Right: Steps and Result */}
      <div className="w-full md:w-2/3 bg-white p-6 flex flex-col">
        <h4 className="font-bold text-indigo-900 mb-4 border-b pb-2">Adım Adım Çözüm (Step-by-step Solution)</h4>
        
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {result?.stepsTex.map((step, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-3 shadow-sm text-sm overflow-x-auto animate-fade-in" style={{ animationDelay: (idx * 100) + 'ms' }}>
              <BlockMath math={step} />
            </div>
          ))}

          {/* Final Result Emphasis */}
          {result && (
            <div className="mt-8 bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-5 shadow-md flex flex-col items-center justify-center transform transition-all hover:scale-[1.02]">
              <span className="text-emerald-800 font-bold mb-2 uppercase tracking-wide text-sm">Nihai Kapalı Form (Closed Form)</span>
              <div className="text-2xl font-bold text-emerald-900">
                <BlockMath math={result.finalTex} />
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
