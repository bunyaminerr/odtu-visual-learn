"use client";

import React, { useState, useEffect } from 'react';
import { analyzeGraph } from '@/lib/algorithms/graphAnalyzer';
import { AdjacencyMatrix, GraphAnalysisResult } from '@/lib/types/cng223Graphs';

export default function GraphMatrixVisualizer() {
  const n = 5; // Fixed 5 nodes for simplicity in drawing
  const [matrix, setMatrix] = useState<AdjacencyMatrix>([]);
  const [result, setResult] = useState<GraphAnalysisResult | null>(null);

  // Initialize empty matrix
  useEffect(() => {
    setMatrix(Array(n).fill(null).map(() => Array(n).fill(0)));
  }, [n]);

  // Analyze when matrix changes
  useEffect(() => {
    if (matrix.length > 0) {
      setResult(analyzeGraph(matrix));
    }
  }, [matrix]);

  const updateCell = (i: number, j: number, value: number) => {
    const newMat = matrix.map((row, rIdx) => 
      row.map((val, cIdx) => (rIdx === i && cIdx === j ? value : val))
    );
    setMatrix(newMat);
  };

  const clearMatrix = () => setMatrix(Array(n).fill(null).map(() => Array(n).fill(0)));
  
  const setCompleteGraph = () => {
    setMatrix(Array(n).fill(null).map((_, r) => Array(n).fill(0).map((__, c) => r === c ? 0 : 1)));
  };

  // --- SVG Drawing Logic ---
  const radius = 100;
  const centerX = 150;
  const centerY = 150;
  
  const getNodePos = (index: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2; // Start from top
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  const nodes = Array(n).fill(0).map((_, i) => getNodePos(i));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col xl:flex-row">
      
      {/* Left: Matrix Input */}
      <div className="w-full xl:w-1/2 bg-slate-50 border-r border-slate-200 p-6 flex flex-col items-center">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Adjacency Matrix (Komşuluk Matrisi)</h3>
        <p className="text-sm text-slate-500 mb-6 text-center">Değerleri artırarak (1, 2) grafı değiştirin. (Multigraph için &gt;1 yapabilirsiniz)</p>

        {/* Matrix Grid */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 mb-1">
            <div className="w-8 h-8"></div>
            {Array(n).fill(null).map((_, i) => (
              <div key={i} className="w-10 h-8 flex items-center justify-center font-bold text-slate-400">v{i + 1}</div>
            ))}
          </div>
          {matrix.map((row, i) => (
             <div key={i} className="flex gap-1 items-center">
              <div className="w-8 h-10 flex items-center justify-center font-bold text-slate-400">v{i + 1}</div>
              {row.map((cell, j) => (
                <input
                  key={j}
                  type="number"
                  min="0"
                  max="9"
                  value={cell}
                  onChange={(e) => updateCell(i, j, parseInt(e.target.value) || 0)}
                  className={`w-10 h-10 rounded-lg font-bold text-lg text-center transition-all focus:ring-2 focus:ring-indigo-500 outline-none
                    ${cell > 0 ? 'bg-indigo-500 text-white border-none' : 'bg-white border-2 border-slate-200 text-slate-600'}
                  `}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={clearMatrix} className="px-4 py-2 text-sm font-semibold bg-white border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-600">Temizle (Empty Graph)</button>
          <button onClick={setCompleteGraph} className="px-4 py-2 text-sm font-semibold bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 text-indigo-700">K₅ (Complete Graph)</button>
        </div>
      </div>

      {/* Right: SVG Visualizer & Analysis */}
      <div className="w-full xl:w-1/2 bg-white p-6 flex flex-col">
        <h4 className="font-bold text-indigo-900 mb-4 border-b pb-2">Graf Çizimi ve Analizi</h4>
        
        <div className="flex justify-center mb-6">
          <svg width="300" height="300" className="overflow-visible">
            {/* Draw Edges */}
            {matrix.map((row, i) => 
              row.map((val, j) => {
                if (val > 0) {
                  if (i === j) {
                    // Draw Loop
                    const pos = nodes[i];
                    return (
                      <circle 
                        key={`loop-${i}`}
                        cx={pos.x} cy={pos.y - 25} r="20"
                        fill="none" stroke="#6366f1" strokeWidth="2"
                        className="animate-fade-in"
                      />
                    );
                  } else {
                    // Draw Line
                    // For undirected, we draw it once. But user might input asymmetric (directed).
                    // We'll just draw a line. If directed, add a marker (arrow) maybe. 
                    // To keep it simple, we draw lines. Opacity or strokeWidth can increase for val > 1.
                    return (
                      <line 
                        key={`edge-${i}-${j}`}
                        x1={nodes[i].x} y1={nodes[i].y}
                        x2={nodes[j].x} y2={nodes[j].y}
                        stroke={result?.isDirected ? "#f43f5e" : "#6366f1"} 
                        strokeWidth={val > 1 ? val * 1.5 : 2}
                        opacity={result?.isDirected && i > j ? 0.4 : 0.8} // if directed, slightly offset visually
                        className="animate-fade-in"
                      />
                    );
                  }
                }
                return null;
              })
            )}

            {/* Draw Nodes */}
            {nodes.map((pos, i) => (
              <g key={`node-${i}`} className="transform transition-transform hover:scale-110">
                <circle cx={pos.x} cy={pos.y} r="16" fill="#1e1b4b" />
                <text x={pos.x} y={pos.y} textAnchor="middle" dy=".3em" fill="white" fontSize="12" fontWeight="bold">
                  v{i + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Info Panel */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Graf Türü</span>
            <p className="text-lg font-bold text-slate-800">{result?.graphType}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Toplam Kenar (m)</span>
            <p className="text-lg font-bold text-slate-800">{result?.totalEdges}</p>
          </div>
        </div>

        {/* Handshaking Theorem Panel */}
        <div className="bg-emerald-50 border-2 border-emerald-500 p-4 rounded-xl shadow-sm">
          <h5 className="font-bold text-emerald-900 mb-2 border-b border-emerald-200 pb-1">Handshaking Theorem</h5>
          <div className="flex gap-2 text-sm text-emerald-800 mb-2">
            {result?.degrees.map(d => (
              <span key={d.nodeIndex} className="bg-white px-2 py-1 rounded-md shadow-sm font-mono">
                deg(v{d.nodeIndex + 1})={d.degree}
              </span>
            ))}
          </div>
          <div className="text-lg font-bold text-emerald-900">
            Σ deg(v) = {result?.sumOfDegrees} = 2 × {result?.isDirected ? '(m directed)' : result?.totalEdges}
          </div>
        </div>

      </div>
    </div>
  );
}
