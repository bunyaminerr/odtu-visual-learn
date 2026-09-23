"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { generateTruthTable } from '@/lib/algorithms/propositionalSimulator';
import { TruthTableResult } from '@/lib/types/cng223Logic';

export default function TruthTableVisualizer() {
  const [expression, setExpression] = useState('p AND (q OR NOT r)');
  const [result, setResult] = useState<TruthTableResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // debounce to avoid crashing on every keystroke
    const timer = setTimeout(() => {
      if (!expression.trim()) {
        setResult(null);
        setError(null);
        return;
      }
      const res = generateTruthTable(expression);
      if (res.error) {
        setError(res.error);
        setResult(null);
      } else {
        setResult(res);
        setError(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [expression]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
      {/* Header & Controls */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Truth Table Generator</h3>
          <p className="text-sm text-slate-500">
            Desteklenen operatörler: <code className="bg-white px-1 py-0.5 rounded border border-slate-200">AND (&&)</code>, 
            <code className="bg-white px-1 py-0.5 rounded border border-slate-200 ml-1">OR (||)</code>, 
            <code className="bg-white px-1 py-0.5 rounded border border-slate-200 ml-1">NOT (!)</code>, 
            <code className="bg-white px-1 py-0.5 rounded border border-slate-200 ml-1">IMPLIES (->)</code>, 
            <code className="bg-white px-1 py-0.5 rounded border border-slate-200 ml-1">IFF (&lt;-&gt;)</code>,
            <code className="bg-white px-1 py-0.5 rounded border border-slate-200 ml-1">XOR (^)</code>
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className={`flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition-all font-mono text-sm ${
              error 
                ? 'border-red-300 focus:ring-red-200 bg-red-50 text-red-900' 
                : 'border-slate-200 focus:ring-indigo-100 bg-white'
            }`}
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g. (p -> q) <-> (!q -> !p)"
          />
        </div>
        {error && (
          <div className="text-sm text-red-500 font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-100">
            Hata: {error}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
        {result && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="flex flex-wrap gap-3 mb-4">
              {result.isTautology && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                  ✓ Tautology (Her zaman doğru)
                </span>
              )}
              {result.isContradiction && (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold border border-red-200">
                  ✗ Contradiction (Her zaman yanlış)
                </span>
              )}
              {result.isContingency && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold border border-amber-200">
                  ⚠ Contingency (Duruma bağlı)
                </span>
              )}
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    {result.variables.map(v => (
                      <th key={v} className="px-4 py-3 text-center border-r border-slate-200 bg-slate-100/50">
                        {v}
                      </th>
                    ))}
                    {result.headers.map((h, idx) => (
                      <th 
                        key={idx} 
                        className={`px-4 py-3 text-center font-mono ${
                          idx === result.headers.length - 1 ? 'bg-indigo-50 text-indigo-700' : 'border-l border-slate-100'
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                      {result.variables.map(v => (
                        <td key={v} className="px-4 py-2 text-center border-r border-slate-100 font-mono">
                          <span className={row.inputs[v] ? "text-green-600 font-bold" : "text-red-500"}>
                            {row.inputs[v] ? 'T' : 'F'}
                          </span>
                        </td>
                      ))}
                      {result.headers.map((h, hIdx) => {
                        const val = row.intermediateSteps[h];
                        const isFinal = hIdx === result.headers.length - 1;
                        return (
                          <td 
                            key={hIdx} 
                            className={`px-4 py-2 text-center font-mono ${
                              isFinal ? 'bg-indigo-50/30' : 'border-l border-slate-50'
                            }`}
                          >
                            <span className={`
                              px-2 py-0.5 rounded
                              ${val 
                                ? isFinal ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-green-600'
                                : isFinal ? 'bg-rose-50 text-rose-500' : 'text-red-400'
                              }
                            `}>
                              {val ? 'T' : 'F'}
                            </span>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}
        {!result && !error && (
          <div className="flex items-center justify-center h-full text-slate-400">
            Formül girerek tabloyu oluşturun.
          </div>
        )}
      </div>
    </div>
  );
}
