"use client";

import React, { useState, useEffect } from 'react';
import { ExtendedEuclideanResult } from '@/lib/types/cng223NumberTheory';
import { calculateExtendedEuclidean } from '@/lib/algorithms/numberTheorySimulator';

export default function ExtendedEuclideanVisualizer() {
  const [valA, setValA] = useState<string>('43');
  const [valB, setValB] = useState<string>('17');
  const [result, setResult] = useState<ExtendedEuclideanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const aNum = parseInt(valA, 10);
    const bNum = parseInt(valB, 10);

    if (isNaN(aNum) || isNaN(bNum)) {
      setError("Lütfen geçerli tam sayılar girin.");
      setResult(null);
      return;
    }

    if (aNum <= 0 || bNum <= 0) {
      setError("A ve B pozitif tam sayılar olmalıdır.");
      setResult(null);
      return;
    }

    if (aNum < bNum) {
      // Extended Euclidean Algorithm typically requires A >= B for standard display
      // We can swap them, but let's just show an error or auto-swap
      setError("Standart gösterim için A sayısı B'den büyük veya eşit olmalıdır.");
      setResult(null);
      return;
    }

    try {
      const res = calculateExtendedEuclidean(aNum, bNum);
      setResult(res);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
  }, [valA, valB]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
      
      {/* Controls */}
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Genişletilmiş Öklid (Extended Euclidean) Hesaplayıcı</h3>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex items-center gap-3">
            <label className="font-bold text-slate-700">A = </label>
            <input 
              type="number" 
              value={valA} 
              onChange={e => setValA(e.target.value)}
              className="w-24 px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="font-bold text-slate-700">B = </label>
            <input 
              type="number" 
              value={valB} 
              onChange={e => setValB(e.target.value)}
              className="w-24 px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
            />
          </div>
        </div>
        {error && (
          <div className="mt-4 text-sm text-rose-600 bg-rose-50 px-4 py-2 rounded-lg border border-rose-100 font-medium">
            {error}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-50/50 overflow-auto">
        {result && (
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                <span className="text-sm font-semibold text-slate-500 mb-1">EBOB (GCD)</span>
                <span className="text-3xl font-black text-indigo-600">{result.gcd}</span>
                <span className="text-xs text-slate-400 mt-1">gcd({result.a}, {result.b})</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="text-sm font-semibold text-slate-500 mb-1">Bezout Katsayıları (s, t)</span>
                <span className="text-xl font-bold text-emerald-600 mt-1">
                  s = {result.s}, t = {result.t}
                </span>
                <span className="text-xs text-slate-500 mt-1 font-mono">
                  {result.a}({result.s}) + {result.b}({result.t}) = {result.gcd}
                </span>
              </div>
              <div className={`p-4 rounded-xl border shadow-sm flex flex-col items-center justify-center text-center transition-colors
                ${result.modularInverse !== null ? 'bg-amber-50 border-amber-200' : 'bg-slate-100 border-slate-200'}
              `}>
                <span className="text-sm font-semibold text-slate-600 mb-1">Modüler Ters (A⁻¹ mod B)</span>
                {result.modularInverse !== null ? (
                  <>
                    <span className="text-3xl font-black text-amber-600">{result.modularInverse}</span>
                    <span className="text-xs text-amber-700/70 mt-1 font-mono">
                      ({result.a} * {result.modularInverse}) ≡ 1 mod {result.b}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl font-bold text-slate-400">YOK</span>
                    <span className="text-xs text-slate-500 mt-1">A ve B aralarında asal değil (GCD ≠ 1)</span>
                  </>
                )}
              </div>
            </div>

            {/* Step-by-Step Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <h4 className="font-bold text-slate-700">Algoritma Adımları (Tablo)</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center">
                  <thead className="bg-slate-100/50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Adım</th>
                      <th className="px-4 py-3 font-semibold border-l border-slate-200 bg-indigo-50/30 text-indigo-800">a</th>
                      <th className="px-4 py-3 font-semibold bg-indigo-50/30 text-indigo-800">b</th>
                      <th className="px-4 py-3 font-semibold bg-indigo-50/30 text-indigo-800">q (Bölüm)</th>
                      <th className="px-4 py-3 font-semibold bg-indigo-50/30 text-indigo-800">r (Kalan)</th>
                      
                      <th className="px-4 py-3 font-semibold border-l border-slate-200 bg-emerald-50/30 text-emerald-800">s1</th>
                      <th className="px-4 py-3 font-semibold bg-emerald-50/30 text-emerald-800">s2</th>
                      <th className="px-4 py-3 font-semibold bg-emerald-50/30 text-emerald-800">s (s1 - q*s2)</th>
                      
                      <th className="px-4 py-3 font-semibold border-l border-slate-200 bg-amber-50/30 text-amber-800">t1</th>
                      <th className="px-4 py-3 font-semibold bg-amber-50/30 text-amber-800">t2</th>
                      <th className="px-4 py-3 font-semibold bg-amber-50/30 text-amber-800">t (t1 - q*t2)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {result.steps.map((step, idx) => {
                      const isLast = idx === result.steps.length - 1;
                      return (
                        <tr key={step.step} className={`hover:bg-slate-50 ${isLast ? 'bg-slate-50/80 font-bold' : ''}`}>
                          <td className="px-4 py-2 text-slate-400">{step.step}</td>
                          <td className="px-4 py-2 border-l border-slate-100 text-indigo-600">{step.a}</td>
                          <td className="px-4 py-2 text-indigo-600">{step.b}</td>
                          <td className="px-4 py-2 text-slate-700">{step.q}</td>
                          <td className="px-4 py-2 text-rose-500">{step.r}</td>
                          
                          <td className="px-4 py-2 border-l border-slate-100 text-emerald-600">{step.s1}</td>
                          <td className="px-4 py-2 text-emerald-600">{step.s2}</td>
                          <td className="px-4 py-2 text-slate-700">{step.s}</td>
                          
                          <td className="px-4 py-2 border-l border-slate-100 text-amber-600">{step.t1}</td>
                          <td className="px-4 py-2 text-amber-600">{step.t2}</td>
                          <td className="px-4 py-2 text-slate-700">{step.t}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
