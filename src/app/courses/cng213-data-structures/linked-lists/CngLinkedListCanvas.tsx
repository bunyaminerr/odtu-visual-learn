import React, { useEffect, useMemo } from 'react';
import { 
  ReactFlow, 
  Background, 
  BackgroundVariant, 
  Node, 
  Edge, 
  Position, 
  Handle,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CngNode, CngPointerState, CngLinkedListFrame } from '../../../../lib/types/cng213LinkedList';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface CngLinkedListCanvasProps {
  frame: CngLinkedListFrame;
}

// ------------------------------------------
// 1. Custom Node Definition
// ------------------------------------------
const CngFlowNode = ({ data }: { data: any }) => {
  const node = data.node as CngNode;
  const pointers = data.pointers as { [key: string]: boolean };

  const renderPointer = (name: string, isActive: boolean, colorClass: string) => {
    if (!isActive) return null;
    return (
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0 }}
        className={`absolute -top-12 flex flex-col items-center font-bold text-xs ${colorClass}`}
      >
        <span className="bg-white px-2 py-0.5 rounded-full shadow-sm border whitespace-nowrap">{name}</span>
        <ArrowDown size={16} className="mt-1" />
      </motion.div>
    );
  };

  const getNodeColor = (node: CngNode) => {
    if (node.value === 'DUMMY') return 'bg-slate-200 border-slate-300 text-slate-500';
    if (node.isTemp) return 'bg-amber-100 border-amber-300 text-amber-900 shadow-md ring-2 ring-amber-400 z-10';
    if (node.isTarget) return 'bg-rose-50 border-rose-300 text-rose-900 border-dashed border-2 ring-2 ring-rose-400 z-10 opacity-70';
    return 'bg-white border-slate-200 text-[#051F20] shadow-sm';
  };

  return (
    <div className={`relative flex flex-col w-32 rounded-xl border ${getNodeColor(node)}`}>
      <Handle type="target" position={Position.Left} style={{ background: 'transparent', border: 'none' }} />
      
      {/* Pointers Container */}
      <div className="absolute top-0 w-full flex justify-center h-full">
        {renderPointer('current', pointers.current, 'text-blue-600')}
        {renderPointer('tmp', pointers.tmp, 'text-amber-600')}
        {renderPointer('removeNode', pointers.removeNode, 'text-rose-600')}
        {renderPointer('first', pointers.first, 'text-purple-600')}
        {renderPointer('second', pointers.second, 'text-pink-600')}
      </div>

      {node.value === 'DUMMY' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap z-20">
          DUMMY HEAD
        </div>
      )}
      {node.isTemp && !node.nextAddress && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm z-20">
          Floating Heap
        </div>
      )}

      <div className="flex-1 p-4 flex items-center justify-center border-b border-inherit">
        <span className="font-bold text-2xl font-mono">
          {node.value === 'DUMMY' ? 'Ø' : node.value}
        </span>
      </div>
      <div className="bg-black/5 px-2 py-1 flex justify-between items-center text-[10px] font-mono border-t border-inherit">
        <span className="text-slate-500">{node.address}</span>
        <span className="text-emerald-600 font-bold ml-1">{node.nextAddress ? '→ '+node.nextAddress.slice(-3) : 'NULL'}</span>
      </div>

      <Handle type="source" position={Position.Right} style={{ background: 'transparent', border: 'none' }} />
    </div>
  );
};

const nodeTypes = {
  cngNode: CngFlowNode,
};

// ------------------------------------------
// 2. Main Canvas Component
// ------------------------------------------
export const CngLinkedListCanvas: React.FC<CngLinkedListCanvasProps> = ({ frame }) => {
  const { nodes, listRecord, pointers } = frame;
  
  const [rfNodes, setNodes, onNodesChange] = useNodesState([]);
  const [rfEdges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const fNodes: Node[] = [];
    const fEdges: Edge[] = [];
    
    // First, find the connected chain
    const orderedNodes: CngNode[] = [];
    let curr = nodes.find(n => n.address === listRecord.headAddress);
    const visited = new Set<string>();
    
    while (curr && !visited.has(curr.address)) {
      orderedNodes.push(curr);
      visited.add(curr.address);
      curr = nodes.find(n => n.address === curr?.nextAddress);
    }
    
    // Remaining are floating nodes
    const floatingNodes = nodes.filter(n => !visited.has(n.address));

    // Layout config
    const startX = 50;
    const startY = 150;
    const gapX = 220;

    orderedNodes.forEach((node, index) => {
      fNodes.push({
        id: node.address,
        type: 'cngNode',
        position: { x: startX + index * gapX, y: startY },
        data: {
          node,
          pointers: {
            current: pointers.current === node.address,
            tmp: pointers.tmp === node.address,
            removeNode: pointers.removeNode === node.address,
            first: pointers.first === node.address,
            second: pointers.second === node.address,
          }
        },
      });

      if (node.nextAddress) {
        fEdges.push({
          id: `e-${node.address}-${node.nextAddress}`,
          source: node.address,
          target: node.nextAddress,
          animated: true,
          style: { stroke: '#94a3b8', strokeWidth: 3 },
        });
      }
    });

    floatingNodes.forEach((node, index) => {
      fNodes.push({
        id: node.address,
        type: 'cngNode',
        position: { x: startX + index * gapX, y: startY + 200 }, // place floating below
        data: {
          node,
          pointers: {
            current: pointers.current === node.address,
            tmp: pointers.tmp === node.address,
            removeNode: pointers.removeNode === node.address,
            first: pointers.first === node.address,
            second: pointers.second === node.address,
          }
        },
      });

      if (node.nextAddress) {
        fEdges.push({
          id: `e-${node.address}-${node.nextAddress}`,
          source: node.address,
          target: node.nextAddress,
          animated: true,
          style: { stroke: '#f59e0b', strokeWidth: 3, strokeDasharray: '5, 5' },
        });
      }
    });

    // Update state to render
    setNodes(fNodes);
    setEdges(fEdges);
  }, [nodes, listRecord, pointers, setNodes, setEdges]);

  return (
    <div className="w-full h-full flex flex-col relative bg-[#F2F7F4] rounded-2xl border border-[#8EB69B]/40 shadow-inner overflow-hidden min-h-[400px]">
      
      {/* ListRecord Metadata */}
      <div className="absolute top-4 left-4 z-10 flex gap-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-slate-200 text-xs font-mono">
        <div className="flex flex-col">
          <span className="text-slate-400 font-sans font-bold uppercase">List-&gt;head</span>
          <span className="text-emerald-700 font-bold">{listRecord.headAddress}</span>
        </div>
        <div className="w-px bg-slate-200" />
        <div className="flex flex-col">
          <span className="text-slate-400 font-sans font-bold uppercase">List-&gt;tail</span>
          <span className="text-emerald-700 font-bold">{listRecord.tailAddress}</span>
        </div>
        <div className="w-px bg-slate-200" />
        <div className="flex flex-col">
          <span className="text-slate-400 font-sans font-bold uppercase">List-&gt;size</span>
          <span className="text-emerald-700 font-bold">{listRecord.size}</span>
        </div>
      </div>

      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#cbd5e1" />
        </ReactFlow>
      </div>

    </div>
  );
};
