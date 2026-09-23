"use client";

import React, { useState, useEffect } from 'react';
import { analyzeRelation } from '@/lib/algorithms/relationAnalyzer';
import { Matrix2D, RelationAnalysisResult } from '@/lib/types/cng223Relations';

export default function RelationMatrixVisualizer() {
  const [n, setN] = useState<number>(4);
  const [matrix, setMatrix] = useState<Matrix2D>([]);
  const [result, setResult] = useState<RelationAnalysisResult | null>(null);

  // Initialize matrix
  useEffect(() => {
    const initMat: Matrix2D = Array(n).fill(null).map(() => Array(n).fill(0));
    setMatrix(initMat);
  }, [n]);

  // Analyze whenever matrix changes
  useEffect(() => {
    if (matrix.length > 0) {
      setResult(analyzeRelation(matrix));
    }
  }, [matrix]);

  const toggleCell = (i: number, j: number) => {
    const newMat = matrix.map((row, rIdx) => 
      row.map((val, cIdx) => (rIdx === i && cIdx === j ? (val === 1 ? 0 : 1) : val))
    );
    setMatrix(newMat);
  };

  const clearMatrix = () => {
    setMatrix(Array(n).fill(null).map(() => Array(n).fill(0)));
  };

  const setIdentityMatrix = () => {
    setMatrix(Array(n).fill(null).map((_, r) => Array(n).fill(0).map((__, c) => r === c ? 1 : 0)));
  };

  const PropertyRow = ({ name, data }: { name: string, data?: { isTrue: boolean, reason?: string } }) => {
    if (!data) return null;
    return (
      <div className={`p-4 rounded-xl border flex flex-col gap-1 transition-all ${data.isTrue ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
        <div className="flex items-center justify-between">
          <span className={`font-bold ${data.isTrue ? 'text-emerald-800' : 'text-rose-800'}`}>{name}</span>
          {data.isTrue ? (
            <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        {!data.isTrue && data.reason && (
          <p className="text-xs text-rose-600 mt-1">{data.reason}</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col xl:flex-row">
      
      {/* Left: Matrix Input */}
      <div className="w-full xl:w-1/3 bg-slate-50 border-r border-slate-200 p-6 flex flex-col items-center">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Zero-One Matrix (M_R)</h3>
        <p className="text-sm text-slate-500 mb-6 text-center">Hücrelere tıklayarak (i, j) bağıntılarını ekleyip çıkarın.</p>

        {/* Matrix Grid */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 mb-1">
            <div className="w-8 h-8"></div>
            {Array(n).fill(null).map((_, i) => (
              <div key={i} className="w-12 h-8 flex items-center justify-center font-bold text-slate-400">{i + 1}</div>
            ))}
          </div>
          {matrix.map((row, i) => (
            <div key={i} className="flex gap-1">
              <div className="w-8 h-12 flex items-center justify-center font-bold text-slate-400">{i + 1}</div>
              {row.map((cell, j) => (
                <button
                  key={j}
                  onClick={() => toggleCell(i, j)}
                  className={`w-12 h-12 rounded-lg font-bold text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center
                    ${cell === 1 ? 'bg-indigo-500 text-white shadow-md' : 'bg-white border-2 border-slate-200 text-slate-300 hover:border-indigo-300'}
                  `}
                >
                  {cell}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={clearMatrix} className="px-4 py-2 text-sm font-semibold bg-white border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-600">Temizle</button>
          <button onClick={setIdentityMatrix} className="px-4 py-2 text-sm font-semibold bg-white border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-600">Sadece Köşegenler</button>
        </div>
      </div>

      {/* Right: Properties Dashboard */}
      <div className="w-full xl:w-2/3 bg-white p-6 flex flex-col">
        <h4 className="font-bold text-indigo-900 mb-4 border-b pb-2">Properties Dashboard (Özellik Paneli)</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PropertyRow name="Reflexive" data={result?.reflexive} />
          <PropertyRow name="Irreflexive" data={result?.irreflexive} />
          <PropertyRow name="Symmetric" data={result?.symmetric} />
          <PropertyRow name="Asymmetric" data={result?.asymmetric} />
          <PropertyRow name="Antisymmetric" data={result?.antisymmetric} />
          <PropertyRow name="Transitive" data={result?.transitive} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {/* Equivalence Relation Badge */}
          <div className={`flex-1 p-5 rounded-2xl border-2 flex items-center justify-between transition-colors ${result?.isEquivalence ? 'bg-indigo-50 border-indigo-500' : 'bg-slate-50 border-slate-200'}`}>
            <div>
              <h5 className={`font-bold text-lg ${result?.isEquivalence ? 'text-indigo-800' : 'text-slate-400'}`}>Equivalence Relation</h5>
              <p className="text-xs text-slate-500 mt-1">Reflexive + Symmetric + Transitive</p>
            </div>
            {result?.isEquivalence && (
              <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Yes</span>
            )}
          </div>

          {/* Poset Badge */}
          <div className={`flex-1 p-5 rounded-2xl border-2 flex items-center justify-between transition-colors ${result?.isPoset ? 'bg-fuchsia-50 border-fuchsia-500' : 'bg-slate-50 border-slate-200'}`}>
            <div>
              <h5 className={`font-bold text-lg ${result?.isPoset ? 'text-fuchsia-800' : 'text-slate-400'}`}>Partial Ordering (Poset)</h5>
              <p className="text-xs text-slate-500 mt-1">Reflexive + Antisymmetric + Transitive</p>
            </div>
            {result?.isPoset && (
              <span className="bg-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Yes</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
