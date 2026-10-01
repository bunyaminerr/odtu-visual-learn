"use client";

import React, { useState, useEffect } from 'react';
import { simulateCounting } from '@/lib/algorithms/countingSimulator';
import { CountingResult } from '@/lib/types/cng223Counting';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function CountingVisualizer() {
  const [n, setN] = useState<number>(4);
  const [r, setR] = useState<number>(2);
  const [orderMatters, setOrderMatters] = useState<boolean>(false);
  const [repetitionAllowed, setRepetitionAllowed] = useState<boolean>(false);
  const [result, setResult] = useState<CountingResult | null>(null);

  useEffect(() => {
    try {
      const res = simulateCounting(n, r, orderMatters, repetitionAllowed);
      setResult(res);
    } catch (e) {
      console.error(e);
    }
  }, [n, r, orderMatters, repetitionAllowed]);

  // Titles based on combination of switches
  const getMethodTitle = () => {
    if (orderMatters && !repetitionAllowed) return 'Permütasyon (Permutations without Repetition)';
    if (!orderMatters && !repetitionAllowed) return 'Kombinasyon (Combinations without Repetition)';
    if (orderMatters && repetitionAllowed) return 'Tekrarlı Permütasyon (Permutations with Repetition)';
    if (!orderMatters && repetitionAllowed) return 'Tekrarlı Kombinasyon (Stars and Bars)';
    return '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
      
      {/* Left: Controls */}
      <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">The Fourfold Way</h3>
          <p className="text-sm text-slate-500">Kombinatorik Simülatörü</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">N (Toplam Eleman):</label>
            <input 
              type="number" 
              min={1} 
              max={10} 
              value={n} 
              onChange={e => setN(Math.min(10, Math.max(1, parseInt(e.target.value || '1', 10))))}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-mono"
            />
            <p className="text-xs text-slate-400 mt-1">Havuzdaki nesneler: A, B, C...</p>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">r (Seçilecek Eleman):</label>
            <input 
              type="number" 
              min={1} 
              max={10} 
              value={r} 
              onChange={e => setR(Math.min(10, Math.max(1, parseInt(e.target.value || '1', 10))))}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={orderMatters} 
                onChange={() => setOrderMatters(!orderMatters)} 
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${orderMatters ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${orderMatters ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <span className="font-semibold text-slate-700">Sıra Önemli mi? (Order Matters)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={repetitionAllowed} 
                onChange={() => setRepetitionAllowed(!repetitionAllowed)} 
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${repetitionAllowed ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${repetitionAllowed ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <span className="font-semibold text-slate-700">Tekrar Serbest mi? (Repetition)</span>
          </label>
        </div>
      </div>

      {/* Right: Results */}
      <div className="w-full md:w-2/3 bg-white p-6 flex flex-col">
        <h4 className="font-bold text-indigo-900 mb-2">{getMethodTitle()}</h4>
        
        {/* Formula Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 flex justify-center items-center shadow-inner min-h-[80px]">
          {result ? (
             <BlockMath math={result.formulaTex} />
          ) : (
            <span className="text-slate-400">Hesaplanıyor...</span>
          )}
        </div>

        {/* Sample Space Visualization */}
        <div className="flex-1 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-slate-700">Olası Durumlar (Sample Space)</h4>
            <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Toplam: {result?.total || 0}</span>
          </div>

          <div className="bg-slate-800 rounded-xl p-4 min-h-[250px] max-h-[350px] overflow-y-auto">
            {result?.sampleSpace ? (
              <div className="flex flex-wrap gap-2">
                {result.sampleSpace.map((item, idx) => (
                  <div key={idx} className="bg-slate-700 border border-slate-600 text-slate-200 px-3 py-1.5 rounded-lg font-mono text-sm shadow-sm animate-fade-in transition-all hover:bg-indigo-600 hover:border-indigo-500">
                    {orderMatters ? `(${item.join(', ')})` : `{${item.join(', ')}}`}
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 italic text-sm text-center px-6">
                {result?.message || 'Listelenecek durum yok.'}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
