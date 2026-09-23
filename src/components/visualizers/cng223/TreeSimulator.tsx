"use client";

import React, { useState } from 'react';
import { calculateMaryTree, getTreeTraversal } from '@/lib/algorithms/treeAnalyzer';
import { MaryCalculationResult, MaryInputType, TraversalType, TreeNode } from '@/lib/types/cng223Trees';
import { BlockMath } from 'react-katex';

// A fixed binary tree for Traversal Simulation
const traversalTree: Record<string, TreeNode> = {
  'A': { id: 'A', left: 'B', right: 'C' },
  'B': { id: 'B', left: 'D', right: 'E' },
  'C': { id: 'C', left: 'F', right: 'G' },
  'D': { id: 'D' },
  'E': { id: 'E' },
  'F': { id: 'F' },
  'G': { id: 'G' },
};

// Fixed positions for SVG drawing
const treeNodesSVG = {
  'A': { x: 200, y: 40 },
  'B': { x: 100, y: 100 },
  'C': { x: 300, y: 100 },
  'D': { x: 50, y: 160 },
  'E': { x: 150, y: 160 },
  'F': { x: 250, y: 160 },
  'G': { x: 350, y: 160 },
};

export default function TreeSimulator() {
  // Calculator State
  const [m, setM] = useState<number>(3);
  const [inputType, setInputType] = useState<MaryInputType>('i');
  const [val, setVal] = useState<number>(100);
  const [calcResult, setCalcResult] = useState<MaryCalculationResult | null>(null);

  // Traversal State
  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCalculate = () => {
    setCalcResult(calculateMaryTree(m, inputType, val));
  };

  const handleTraversal = (type: TraversalType) => {
    if (isPlaying) return;
    setIsPlaying(true);
    setActiveNodes([]);
    
    const { path } = getTreeTraversal(traversalTree, 'A', type);
    
    // Animate the traversal
    path.forEach((nodeId, idx) => {
      setTimeout(() => {
        setActiveNodes(prev => [...prev, nodeId]);
        if (idx === path.length - 1) {
          setIsPlaying(false);
        }
      }, (idx + 1) * 800);
    });
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Full m-Ary Tree Calculator */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        {/* Left: Input */}
        <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Full m-Ary Calculator</h3>
            <p className="text-sm text-slate-500">Ağaç yaprak/düğüm hesaplayıcı</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">m (Ağaç Tipi):</label>
              <input type="number" min="2" value={m} onChange={e => setM(parseInt(e.target.value) || 2)} className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-mono" />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Bilinen Değer:</label>
              <select value={inputType} onChange={e => setInputType(e.target.value as MaryInputType)} className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-mono">
                <option value="i">Internal Vertices (i)</option>
                <option value="l">Leaves (l)</option>
                <option value="n">Total Vertices (n)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Değeri Girin:</label>
              <input type="number" min="1" value={val} onChange={e => setVal(parseInt(e.target.value) || 1)} className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-mono" />
            </div>

            <button onClick={handleCalculate} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-colors">Hesapla</button>
          </div>
        </div>

        {/* Right: Steps */}
        <div className="w-full md:w-2/3 bg-white p-6 flex flex-col min-h-[300px]">
          <h4 className="font-bold text-indigo-900 mb-4 border-b pb-2">Adım Adım Çözüm</h4>
          <div className="flex-1 space-y-4 overflow-y-auto">
            {calcResult?.stepsTex.map((step, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-3 shadow-sm text-sm overflow-x-auto animate-fade-in">
                <BlockMath math={step} />
              </div>
            ))}
            {!calcResult && (
              <div className="h-full flex items-center justify-center text-slate-400">
                Hesaplamak için değerleri girip "Hesapla"ya tıklayın.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Traversal Visualizer */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Tree Traversal Visualizer</h3>
            <p className="text-sm text-slate-500">Binary Tree (İkili Ağaç) üzerinde gezinme algoritmaları animasyonu.</p>
          </div>
          <div className="flex gap-2">
            <button disabled={isPlaying} onClick={() => handleTraversal('preorder')} className="px-4 py-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg font-bold transition-colors disabled:opacity-50">Preorder (NLR)</button>
            <button disabled={isPlaying} onClick={() => handleTraversal('inorder')} className="px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg font-bold transition-colors disabled:opacity-50">Inorder (LNR)</button>
            <button disabled={isPlaying} onClick={() => handleTraversal('postorder')} className="px-4 py-2 bg-sky-100 text-sky-700 hover:bg-sky-200 rounded-lg font-bold transition-colors disabled:opacity-50">Postorder (LRN)</button>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-center justify-center">
          {/* SVG Tree */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <svg width="400" height="220" className="overflow-visible">
              {/* Edges */}
              <line x1={treeNodesSVG['A'].x} y1={treeNodesSVG['A'].y} x2={treeNodesSVG['B'].x} y2={treeNodesSVG['B'].y} stroke="#cbd5e1" strokeWidth="3" />
              <line x1={treeNodesSVG['A'].x} y1={treeNodesSVG['A'].y} x2={treeNodesSVG['C'].x} y2={treeNodesSVG['C'].y} stroke="#cbd5e1" strokeWidth="3" />
              <line x1={treeNodesSVG['B'].x} y1={treeNodesSVG['B'].y} x2={treeNodesSVG['D'].x} y2={treeNodesSVG['D'].y} stroke="#cbd5e1" strokeWidth="3" />
              <line x1={treeNodesSVG['B'].x} y1={treeNodesSVG['B'].y} x2={treeNodesSVG['E'].x} y2={treeNodesSVG['E'].y} stroke="#cbd5e1" strokeWidth="3" />
              <line x1={treeNodesSVG['C'].x} y1={treeNodesSVG['C'].y} x2={treeNodesSVG['F'].x} y2={treeNodesSVG['F'].y} stroke="#cbd5e1" strokeWidth="3" />
              <line x1={treeNodesSVG['C'].x} y1={treeNodesSVG['C'].y} x2={treeNodesSVG['G'].x} y2={treeNodesSVG['G'].y} stroke="#cbd5e1" strokeWidth="3" />

              {/* Nodes */}
              {Object.entries(treeNodesSVG).map(([id, pos]) => {
                const isActive = activeNodes.includes(id);
                return (
                  <g key={id} className="transition-all duration-500">
                    <circle 
                      cx={pos.x} cy={pos.y} r="18" 
                      fill={isActive ? "#4f46e5" : "#fff"} 
                      stroke={isActive ? "#312e81" : "#94a3b8"} 
                      strokeWidth="3" 
                      className="transition-colors duration-500"
                    />
                    <text 
                      x={pos.x} y={pos.y} textAnchor="middle" dy=".3em" 
                      fill={isActive ? "#fff" : "#334155"} 
                      fontSize="14" fontWeight="bold"
                    >
                      {id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Result Array */}
          <div className="w-full xl:w-1/3 flex flex-col items-center justify-center bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6 min-h-[220px]">
            <h5 className="font-bold text-indigo-900 mb-4">Traversal Dizisi (Sonuç)</h5>
            <div className="flex flex-wrap gap-2 justify-center">
              {activeNodes.length === 0 && <span className="text-indigo-300">Dizi boş... Yukarıdan başlatın.</span>}
              {activeNodes.map((id, index) => (
                <div key={index} className="w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-md animate-fade-in transform scale-110">
                  {id}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
