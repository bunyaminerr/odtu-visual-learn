"use client";

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeapNodeState, HeapRecord, HeapPointers } from '../../../../lib/types/heap';

interface HeapCanvasProps {
  nodes: HeapNodeState[];
  record: HeapRecord;
  pointers: HeapPointers;
  className?: string;
}

const LEVEL_HEIGHT = 70;
const NODE_WIDTH = 50;

export const HeapCanvas: React.FC<HeapCanvasProps> = ({ nodes, record, pointers, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      const deltaY = e.deltaY;
      
      setScale(s => {
        const newScale = Math.min(Math.max(0.4, s + -deltaY * 0.002), 2.0);
        if (newScale !== s) {
          setPan(p => ({
            x: p.x - (clientX - rect.left - rect.width / 2 - p.x) * (newScale / s - 1),
            y: p.y - (clientY - rect.top - rect.height / 2 - p.y) * (newScale / s - 1)
          }));
        }
        return newScale;
      });
    };
    el.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleNativeWheel);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPan(p => ({ x: p.x + (e.clientX - lastPos.current.x), y: p.y + (e.clientY - lastPos.current.y) }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Calculate positions for a perfect binary tree
  const treeNodes = useMemo(() => {
    const maxDepth = Math.ceil(Math.log2(record.capacity + 1));
    const layout = new Map<number, { x: number, y: number }>();
    
    const calculateLayout = (index: number, depth: number, x: number, horizontalSpacing: number) => {
      if (index > record.capacity) return;
      layout.set(index, { x, y: depth * LEVEL_HEIGHT + 180 });
      calculateLayout(index * 2, depth + 1, x - horizontalSpacing, horizontalSpacing / 2);
      calculateLayout(index * 2 + 1, depth + 1, x + horizontalSpacing, horizontalSpacing / 2);
    };

    const initialSpacing = Math.pow(2, maxDepth - 2) * NODE_WIDTH * 1.2;
    calculateLayout(1, 0, 1000, initialSpacing);
    return layout;
  }, [record.capacity]);

  // Edges for the tree
  const edges = useMemo(() => {
    const lines = [];
    for (let i = 1; i <= record.size; i++) {
      const leftChild = i * 2;
      const rightChild = i * 2 + 1;
      const parentPos = treeNodes.get(i);
      
      if (leftChild <= record.size) {
        const childPos = treeNodes.get(leftChild);
        if (parentPos && childPos) lines.push({ id: `${i}-L`, x1: parentPos.x, y1: parentPos.y, x2: childPos.x, y2: childPos.y });
      }
      if (rightChild <= record.size) {
        const childPos = treeNodes.get(rightChild);
        if (parentPos && childPos) lines.push({ id: `${i}-R`, x1: parentPos.x, y1: parentPos.y, x2: childPos.x, y2: childPos.y });
      }
    }
    return lines;
  }, [treeNodes, record.size]);

  // Sort nodes by index for array display
  const sortedNodes = [...nodes].sort((a, b) => a.index - b.index);
  const ARRAY_CELL_WIDTH = 50;

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing shadow-inner flex flex-col bg-[#F5F7FA] border border-slate-200 p-0 select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      <div className="flex-1 relative overflow-hidden">
        <div 
          className="absolute top-0 left-1/2 origin-top"
          style={{ 
            width: '2000px', 
            height: '1000px',
            marginLeft: '-1000px',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          {/* SVG Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {edges.map(edge => (
              <line key={edge.id} x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} stroke="#CBD5E1" strokeWidth={3} />
            ))}
          </svg>

          {/* Tree Nodes */}
          {nodes.map(node => {
            const pos = treeNodes.get(node.index);
            if (!pos) return null;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: pos.x - 24, y: pos.y - 24 }}
                animate={{ opacity: 1, x: pos.x - 24, y: pos.y - 24 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`absolute w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold font-mono text-lg shadow-md z-10 ${
                  node.isTarget ? 'bg-amber-300 border-amber-500 text-amber-900 ring-4 ring-amber-200' :
                  node.isTemp ? 'bg-purple-100 border-purple-400 text-purple-800 border-dashed' :
                  'bg-white border-slate-300 text-slate-700'
                }`}
              >
                {node.val}
                <div className="absolute -top-2 -left-2 bg-slate-800 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
                  {node.index}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Array Representation Fixed at Bottom */}
      <div className="w-full bg-white/90 backdrop-blur-md p-4 shadow-lg border-t border-slate-200 z-30 shrink-0">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">Array Representation (Memory)</div>
        <div className="flex gap-1 justify-center overflow-x-auto pb-2">
          {/* Index 0 (INT_MIN/Unused) */}
          <div className="flex flex-col items-center shrink-0">
            <div className="text-[10px] font-mono text-slate-400 mb-1">0</div>
            <div className="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-400 font-mono text-sm">-</div>
          </div>
          
          {/* Active Nodes */}
          {Array.from({ length: record.capacity }).map((_, i) => {
            const index = i + 1;
            const node = sortedNodes.find(n => n.index === index);
            
            const isPointerI = pointers.i === index;
            const isPointerChild = pointers.child === index;
            const isPointerParent = pointers.parent === index;

            return (
              <div key={index} className="flex flex-col items-center relative shrink-0">
                {/* Pointer Indicators */}
                <div className="absolute -top-6 flex flex-col items-center gap-1">
                  {isPointerI && <span className="bg-blue-500 text-white text-[9px] px-1 rounded font-bold">i</span>}
                  {isPointerChild && <span className="bg-purple-500 text-white text-[9px] px-1 rounded font-bold">child</span>}
                  {isPointerParent && <span className="bg-emerald-500 text-white text-[9px] px-1 rounded font-bold">parent</span>}
                </div>

                <div className="text-[10px] font-mono text-slate-500 mb-1">{index}</div>
                <div className={`w-12 h-12 flex items-center justify-center border rounded font-mono text-sm font-bold shadow-sm ${
                  !node ? 'bg-slate-50 border-slate-200 text-transparent' :
                  node.isTarget ? 'bg-amber-300 border-amber-500 text-amber-900' :
                  node.isTemp ? 'bg-purple-100 border-purple-400 text-purple-800' :
                  'bg-white border-slate-400 text-slate-700'
                }`}>
                  {node ? node.val : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
