"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SetElement, MappingEdge, FunctionAnalysisResult } from '@/lib/types/cng223Sets';
import { analyzeFunctionMapping } from '@/lib/algorithms/setsSimulator';

const INITIAL_DOMAIN: SetElement[] = [
  { id: 'a1', label: '1' },
  { id: 'a2', label: '2' },
  { id: 'a3', label: '3' },
];

const INITIAL_CODOMAIN: SetElement[] = [
  { id: 'b1', label: 'A' },
  { id: 'b2', label: 'B' },
  { id: 'b3', label: 'C' },
  { id: 'b4', label: 'D' },
];

export default function FunctionMappingVisualizer() {
  const [domain, setDomain] = useState<SetElement[]>(INITIAL_DOMAIN);
  const [codomain, setCodomain] = useState<SetElement[]>(INITIAL_CODOMAIN);
  const [edges, setEdges] = useState<MappingEdge[]>([]);
  
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<FunctionAnalysisResult | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [svgPaths, setSvgPaths] = useState<{ id: string; d: string; isActive: boolean }[]>([]);

  // Update Analysis whenever edges change
  useEffect(() => {
    setAnalysis(analyzeFunctionMapping(domain, codomain, edges));
  }, [domain, codomain, edges]);

  // Recalculate SVG lines
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updatePaths = () => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const newPaths: { id: string; d: string; isActive: boolean }[] = [];

      edges.forEach((edge, i) => {
        const fromEl = document.getElementById(`node-${edge.from}`);
        const toEl = document.getElementById(`node-${edge.to}`);
        
        if (fromEl && toEl) {
          const fromRect = fromEl.getBoundingClientRect();
          const toRect = toEl.getBoundingClientRect();

          const startX = fromRect.right - containerRect.left;
          const startY = fromRect.top + fromRect.height / 2 - containerRect.top;
          const endX = toRect.left - containerRect.left;
          const endY = toRect.top + toRect.height / 2 - containerRect.top;

          // Cubic bezier curve
          const controlX1 = startX + (endX - startX) / 2;
          const controlY1 = startY;
          const controlX2 = startX + (endX - startX) / 2;
          const controlY2 = endY;

          const d = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
          
          newPaths.push({
            id: `${edge.from}-${edge.to}`,
            d,
            isActive: selectedDomain === edge.from
          });
        }
      });
      setSvgPaths(newPaths);
    };

    // Small delay to ensure DOM is ready
    setTimeout(updatePaths, 10);
    window.addEventListener('resize', updatePaths);
    return () => window.removeEventListener('resize', updatePaths);
  }, [edges, selectedDomain, domain, codomain]);

  const handleDomainClick = (id: string) => {
    setSelectedDomain(id === selectedDomain ? null : id);
  };

  const handleCodomainClick = (id: string) => {
    if (selectedDomain) {
      // Create or toggle edge
      const edgeExists = edges.find(e => e.from === selectedDomain && e.to === id);
      if (edgeExists) {
        setEdges(edges.filter(e => !(e.from === selectedDomain && e.to === id))); // Remove
      } else {
        // If we want standard function simulation, usually people replace the edge. 
        // But to let them test "NOT a function", we allow multiple edges!
        setEdges([...edges, { from: selectedDomain, to: id }]);
      }
      setSelectedDomain(null);
    }
  };

  const handleClear = () => setEdges([]);

  const addDomainNode = () => {
    if (domain.length >= 6) return;
    setDomain([...domain, { id: `a${Date.now()}`, label: `${domain.length + 1}` }]);
  };

  const removeDomainNode = () => {
    if (domain.length <= 1) return;
    const newDomain = [...domain];
    const removed = newDomain.pop();
    setDomain(newDomain);
    setEdges(edges.filter(e => e.from !== removed?.id));
  };

  const addCodomainNode = () => {
    if (codomain.length >= 6) return;
    const letter = String.fromCharCode(65 + codomain.length); // A, B, C...
    setCodomain([...codomain, { id: `b${Date.now()}`, label: letter }]);
  };

  const removeCodomainNode = () => {
    if (codomain.length <= 1) return;
    const newCodomain = [...codomain];
    const removed = newCodomain.pop();
    setCodomain(newCodomain);
    setEdges(edges.filter(e => e.to !== removed?.id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[500px]">
      
      {/* Visualization Canvas */}
      <div className="flex-1 relative p-8 flex flex-col bg-slate-50/50" ref={containerRef}>
        
        {/* Controls */}
        <div className="flex justify-between mb-8 z-10">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-600 mr-2">Domain (Tanım Kümesi) Boyutu:</span>
            <button onClick={removeDomainNode} className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600">-</button>
            <span className="w-4 text-center font-mono">{domain.length}</span>
            <button onClick={addDomainNode} className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600">+</button>
          </div>
          
          <button onClick={handleClear} className="px-4 py-1.5 text-sm bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-medium transition-colors border border-rose-200">
            Okları Temizle
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-600 mr-2">Codomain (Değer Kümesi) Boyutu:</span>
            <button onClick={removeCodomainNode} className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600">-</button>
            <span className="w-4 text-center font-mono">{codomain.length}</span>
            <button onClick={addCodomainNode} className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600">+</button>
          </div>
        </div>

        {/* SVG Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
            </marker>
            <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f43f5e" />
            </marker>
          </defs>
          {svgPaths.map(p => (
            <path
              key={p.id}
              d={p.d}
              fill="none"
              stroke={p.isActive ? "#f43f5e" : "#6366f1"}
              strokeWidth={p.isActive ? 3 : 2}
              markerEnd={p.isActive ? "url(#arrowhead-active)" : "url(#arrowhead)"}
              className="transition-all duration-300"
            />
          ))}
        </svg>

        {/* Nodes */}
        <div className="flex-1 flex justify-between items-center z-10 px-10">
          {/* Domain (A) */}
          <div className="flex flex-col gap-6 relative">
            <div className="absolute -inset-6 border-2 border-dashed border-indigo-200 rounded-3xl -z-10 bg-indigo-50/30"></div>
            <div className="text-center font-bold text-indigo-800 -mt-10 mb-2 bg-white px-3 py-1 rounded-full shadow-sm text-sm mx-auto border border-indigo-100">Domain (A)</div>
            {domain.map(node => (
              <button
                key={node.id}
                id={`node-${node.id}`}
                onClick={() => handleDomainClick(node.id)}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all shadow-sm
                  ${selectedDomain === node.id 
                    ? 'bg-indigo-500 text-white border-indigo-600 scale-110 ring-4 ring-indigo-200' 
                    : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400 hover:text-indigo-600'
                  }
                `}
              >
                {node.label}
              </button>
            ))}
          </div>

          {/* Codomain (B) */}
          <div className="flex flex-col gap-6 relative">
            <div className="absolute -inset-6 border-2 border-dashed border-emerald-200 rounded-3xl -z-10 bg-emerald-50/30"></div>
            <div className="text-center font-bold text-emerald-800 -mt-10 mb-2 bg-white px-3 py-1 rounded-full shadow-sm text-sm mx-auto border border-emerald-100">Codomain (B)</div>
            {codomain.map(node => {
              const incomingCount = edges.filter(e => e.to === node.id).length;
              return (
                <div key={node.id} className="relative group">
                  <button
                    id={`node-${node.id}`}
                    onClick={() => handleCodomainClick(node.id)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all shadow-sm
                      ${selectedDomain 
                        ? 'cursor-pointer hover:bg-emerald-50 hover:border-emerald-400 hover:scale-110' 
                        : 'cursor-default'
                      }
                      bg-white text-slate-700 border-slate-300
                    `}
                  >
                    {node.label}
                  </button>
                  {/* Incoming Count Badge */}
                  {incomingCount > 0 && (
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm border-2 border-white
                      ${incomingCount > 1 ? 'bg-rose-500' : 'bg-emerald-500'}
                    `}>
                      {incomingCount}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
          Eşleştirme yapmak için önce <strong className="text-indigo-600">Domain</strong> elemanına, sonra <strong className="text-emerald-600">Codomain</strong> elemanına tıklayın.
        </div>
      </div>

      {/* Analysis Panel */}
      <div className="w-full lg:w-80 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-6 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Fonksiyon Analizi
        </h3>

        {analysis ? (
          <div className="space-y-4 flex-1">
            
            {/* Function Check */}
            <div className={`p-4 rounded-xl border ${analysis.isFunction ? 'bg-green-50 border-green-200' : 'bg-rose-50 border-rose-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{analysis.isFunction ? '✅' : '❌'}</span>
                <span className={`font-bold ${analysis.isFunction ? 'text-green-800' : 'text-rose-800'}`}>
                  {analysis.isFunction ? 'Valid Function' : 'Not a Function'}
                </span>
              </div>
            </div>

            {analysis.isFunction && (
              <>
                {/* Injective */}
                <div className={`p-3 rounded-xl border ${analysis.isInjective ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-100 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Injective (1-1)</span>
                    <span className="text-lg">{analysis.isInjective ? '✅' : '❌'}</span>
                  </div>
                </div>

                {/* Surjective */}
                <div className={`p-3 rounded-xl border ${analysis.isSurjective ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-100 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Surjective (Onto)</span>
                    <span className="text-lg">{analysis.isSurjective ? '✅' : '❌'}</span>
                  </div>
                </div>

                {/* Bijective */}
                <div className={`p-3 rounded-xl border ${analysis.isBijective ? 'bg-amber-100 border-amber-300 shadow-sm' : 'bg-slate-100 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Bijective</span>
                    <span className="text-lg">{analysis.isBijective ? '🏆' : '❌'}</span>
                  </div>
                </div>
              </>
            )}

            {/* Explanations */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Açıklamalar</h4>
              <ul className="space-y-3">
                {analysis.reasons.map((r, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ) : (
          <div className="text-slate-400 text-sm italic">
            Analiz edilecek eşleşme bekleniyor...
          </div>
        )}
      </div>

    </div>
  );
}
