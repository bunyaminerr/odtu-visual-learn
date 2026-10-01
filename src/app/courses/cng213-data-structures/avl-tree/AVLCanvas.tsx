"use client";

import React, { useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { AVLNodeState, AVLRecord, AVLPointers } from '../../../../lib/types/avl';

interface AVLCanvasProps {
  nodes: AVLNodeState[];
  treeRecord: AVLRecord;
  pointers: AVLPointers;
  className?: string;
  traversalResult?: number[];
}

interface LayoutNode extends AVLNodeState {
  x: number;
  y: number;
}

const NODE_WIDTH = 60;
const LEVEL_HEIGHT = 80;

export const AVLCanvas: React.FC<AVLCanvasProps> = ({ 
  nodes, treeRecord, pointers, className = '', traversalResult
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Independent Pan and Zoom State
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Native event listener for wheel to properly prevent default page scrolling
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault(); // This stops the page from scrolling
      const rect = el.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      const deltaY = e.deltaY;
      
      setScale(s => {
        const newScale = Math.min(Math.max(0.2, s + -deltaY * 0.002), 2.5);
        if (newScale !== s) {
          setPan(p => {
            const mouseX = clientX - rect.left - rect.width / 2;
            const mouseY = clientY - rect.top - rect.height / 2;
            return {
              x: p.x - (mouseX - p.x) * (newScale / s - 1),
              y: p.y - (mouseY - p.y) * (newScale / s - 1)
            };
          });
        }
        return newScale;
      });
    };

    el.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleNativeWheel);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only left click
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setPan(p => ({ x: p.x + dx, y: p.y + dy }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const layoutNodes = useMemo(() => {
    const layout = new Map<string, LayoutNode>();
    
    const getDepth = (addr: string | null): number => {
      if (!addr) return 0;
      const node = nodes.find(n => n.address === addr);
      if (!node) return 0;
      return 1 + Math.max(getDepth(node.leftAddress), getDepth(node.rightAddress));
    };

    const maxDepth = getDepth(treeRecord.rootAddress);
    const canvasWidth = 2000; // Large logical canvas width
    
    const calculateLayout = (addr: string | null, depth: number, currentX: number): number => {
      if (!addr) return 0;
      const node = nodes.find(n => n.address === addr);
      if (!node) return 0;

      const leftWidth = node.leftAddress ? calculateLayout(node.leftAddress, depth + 1, currentX) : 0;
      const myX = leftWidth === 0 ? currentX : currentX + leftWidth;
      
      layout.set(addr, { ...node, x: myX, y: depth * LEVEL_HEIGHT + 350 });
      
      const rightWidth = node.rightAddress ? calculateLayout(node.rightAddress, depth + 1, myX + NODE_WIDTH) : 0;
      
      return Math.max(NODE_WIDTH, leftWidth + rightWidth + NODE_WIDTH);
    };

    if (treeRecord.rootAddress) {
      calculateLayout(treeRecord.rootAddress, 0, canvasWidth / 2 - 200);
    }
    
    // Add any unlinked nodes
    let unlinkedX = (canvasWidth / 2) - 400; // Start unlinked nodes left of center
    nodes.forEach(n => {
      if (!layout.has(n.address)) {
        layout.set(n.address, { ...n, x: unlinkedX, y: maxDepth * LEVEL_HEIGHT + 450 });
        unlinkedX += 80;
      }
    });

    return layout;
  }, [nodes, treeRecord]);

  const edges = useMemo(() => {
    const lines: { id: string; x1: number; y1: number; x2: number; y2: number }[] = [];
    layoutNodes.forEach(node => {
      if (node.leftAddress && layoutNodes.has(node.leftAddress)) {
        const child = layoutNodes.get(node.leftAddress)!;
        lines.push({ id: `${node.address}-L`, x1: node.x, y1: node.y, x2: child.x, y2: child.y });
      }
      if (node.rightAddress && layoutNodes.has(node.rightAddress)) {
        const child = layoutNodes.get(node.rightAddress)!;
        lines.push({ id: `${node.address}-R`, x1: node.x, y1: node.y, x2: child.x, y2: child.y });
      }
    });
    return lines;
  }, [layoutNodes]);

  return (
    <div 
      ref={containerRef}
      className={`w-full relative overflow-hidden cursor-grab active:cursor-grabbing shadow-inner flex-1 bg-[#F2F7F4] border border-[#8EB69B]/40 p-0 ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      <div 
        className="absolute top-1/2 left-1/2 origin-center"
        style={{ 
          width: '2000px', 
          height: '1000px',
          transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${scale})`,
          transition: isDragging.current ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        
        {/* SVG layer for edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {edges.map(edge => (
            <motion.line
              key={edge.id}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
              x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2}
              stroke="#8EB69B"
              strokeWidth={3}
            />
          ))}
        </svg>

        {/* Nodes layer */}
        {Array.from(layoutNodes.values()).map(node => {
          const leftHeight = node.leftAddress ? (nodes.find(n => n.address === node.leftAddress)?.height ?? -1) : -1;
          const rightHeight = node.rightAddress ? (nodes.find(n => n.address === node.rightAddress)?.height ?? -1) : -1;
          const bf = leftHeight - rightHeight;
          const bfColor = Math.abs(bf) > 1 ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white';

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0, x: node.x - 24, y: node.y - 24 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: node.x - 24,
                y: node.y - 24 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`absolute w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold font-mono text-lg shadow-md z-10 ${
                node.isActive ? 'bg-amber-300 border-amber-500 text-amber-900 ring-4 ring-amber-200' :
                node.isTarget ? 'bg-emerald-500 border-emerald-700 text-white ring-4 ring-emerald-200' :
                node.isTemp ? 'bg-purple-100 border-purple-400 text-purple-800 border-dashed' :
                'bg-white border-slate-300 text-slate-700'
              }`}
            >
              {node.val}
              
              {/* Height Badge */}
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm border border-indigo-200">
                h:{node.height}
              </div>
              
              {/* Balance Factor Badge */}
              <div className={`absolute -top-2 -left-2 text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm border border-white ${bfColor}`}>
                BF:{bf}
              </div>
            </motion.div>
          );
        })}

        {/* Pointers */}
        {['t', 'k1', 'k2', 'k3'].map((ptrName, i) => {
          const addr = (pointers as any)[ptrName];
          if (addr && layoutNodes.has(addr)) {
            const yOffset = -12 - (i * 24); // Stack pointer labels vertically
            return (
              <motion.div
                key={ptrName}
                initial={{ 
                  opacity: 0,
                  x: layoutNodes.get(addr)!.x + 28,
                  y: layoutNodes.get(addr)!.y + yOffset
                }}
                animate={{ 
                  opacity: 1,
                  x: layoutNodes.get(addr)!.x + 28,
                  y: layoutNodes.get(addr)!.y + yOffset
                }}
                className="absolute z-20 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded shadow-sm border border-blue-200"
              >
                {ptrName}
              </motion.div>
            );
          }
          return null;
        })}
        
      </div>
      
      {/* Traversal Result Display */}
      {traversalResult && traversalResult.length > 0 && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 z-30 max-w-[80%]">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Dolaşım Çıktısı (Traversal)</div>
          <div className="flex flex-wrap gap-2">
            {traversalResult.map((val, idx) => (
              <motion.div 
                key={`${idx}-${val}`}
                initial={{ opacity: 0, scale: 0.5, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-lg font-mono font-bold shadow-sm"
              >
                {val}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Helper Text */}
      <div className="absolute bottom-2 left-2 text-[#8EB69B] text-xs font-medium pointer-events-none opacity-60">
        Fare topu ile yakınlaştır, sürükleyerek kaydır
      </div>
    </div>
  );
};
