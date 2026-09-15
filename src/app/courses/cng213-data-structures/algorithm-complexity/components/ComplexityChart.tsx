"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const FUNCTIONS = [
  { id: 'O(1)', name: 'O(1)', color: '#22c55e', calc: (n: number) => 10, label: 'Constant (Sabit)' },
  { id: 'O(logN)', name: 'O(log N)', color: '#0ea5e9', calc: (n: number) => Math.log2(n || 1) * 15, label: 'Logarithmic' },
  { id: 'O(N)', name: 'O(N)', color: '#eab308', calc: (n: number) => n, label: 'Linear (Doğrusal)' },
  { id: 'O(NlogN)', name: 'O(N log N)', color: '#f97316', calc: (n: number) => n * Math.log2(n || 1) * 0.5, label: 'Linearithmic' },
  { id: 'O(N^2)', name: 'O(N²)', color: '#ef4444', calc: (n: number) => Math.pow(n, 2) / 4, label: 'Quadratic (Karesel)' },
  { id: 'O(2^N)', name: 'O(2ⁿ)', color: '#9333ea', calc: (n: number) => Math.pow(2, n / 4), label: 'Exponential (Üstel)' },
];

export function ComplexityChart() {
  const [currentN, setCurrentN] = useState(10);
  const maxN = 50;
  const maxHeight = 300; // SVG coordinate max height

  const pathData = useMemo(() => {
    return FUNCTIONS.map(func => {
      let d = "";
      for (let i = 1; i <= currentN; i++) {
        // x scales from 1 to maxN (0 to 1000px)
        const x = (i / maxN) * 800;
        
        // y scales dynamically based on function
        let val = func.calc(i);
        if (val > maxHeight) val = maxHeight;
        const y = 400 - (val * (400 / maxHeight)); // Flip Y axis (400 is svg height)

        if (i === 1) d += `M ${x} ${y} `;
        else d += `L ${x} ${y} `;
      }
      return { id: func.id, d, color: func.color };
    });
  }, [currentN]);

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Controls & Info */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-[#051F20] mb-2">Girdi Boyutu (N)</h3>
            <p className="text-sm text-slate-500 mb-4">
              N = {currentN} eleman işlenirken algoritmaların harcadığı operasyon sayısını görün.
            </p>
            <input 
              type="range" 
              min="1" 
              max={maxN} 
              value={currentN}
              onChange={(e) => setCurrentN(Number(e.target.value))}
              className="w-full accent-[#235347]"
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <h3 className="font-semibold text-[#051F20] mb-1">Lejant</h3>
            {FUNCTIONS.map(f => (
              <div key={f.id} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: f.color }} />
                <span className="text-sm font-medium text-slate-700 w-16">{f.name}</span>
                <span className="text-xs text-slate-400">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Graph */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col">
          <h3 className="font-semibold text-[#051F20] mb-4 text-center">İşlem Sayısı vs Girdi Boyutu (N)</h3>
          
          <div className="relative w-full h-[400px] border-l-2 border-b-2 border-slate-300">
            {/* Y Axis Label */}
            <div className="absolute -left-12 top-1/2 -rotate-90 text-xs font-semibold text-slate-400 tracking-wider">
              İşlem Süresi
            </div>
            
            {/* X Axis Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-400 tracking-wider">
              N (Girdi Boyutu)
            </div>

            {/* SVG Graph */}
            <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="none" className="overflow-visible">
              {pathData.map(path => (
                <motion.path
                  key={path.id}
                  d={path.d}
                  fill="transparent"
                  stroke={path.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              ))}
              
              {/* Vertical Guide for current N */}
              <line 
                x1={(currentN / maxN) * 800} y1="0" 
                x2={(currentN / maxN) * 800} y2="400" 
                stroke="#94a3b8" 
                strokeWidth="1" 
                strokeDasharray="4 4" 
              />
            </svg>
          </div>
          
          <div className="mt-8 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <strong className="text-slate-800">Çıkarım:</strong> Grafikte gördüğünüz gibi <span className="text-red-500 font-medium">O(N²)</span> ve <span className="text-purple-600 font-medium">O(2ⁿ)</span> N değeri biraz arttığında bile inanılmaz bir hızla yükselir. Bu algoritmalar büyük veriler için kullanışsızdır. İdeal olan algoritmaları <span className="text-green-600 font-medium">O(1)</span>, <span className="text-blue-500 font-medium">O(log N)</span> veya <span className="text-yellow-600 font-medium">O(N)</span> seviyesinde tutabilmektir.
          </div>
        </div>
        
      </div>
    </div>
  );
}
