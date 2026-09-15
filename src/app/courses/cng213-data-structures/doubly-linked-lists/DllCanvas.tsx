import React, { useEffect } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  Position,
  Handle,
  useNodesState,
  useEdgesState,
  EdgeProps,
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DListStep, DNodeState } from '../../../../lib/types/dll';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface DllCanvasProps {
  frame: DListStep;
}

// ------------------------------------------
// 1. Custom Bidirectional Edge: NEXT (green, top path)
// ------------------------------------------
const NextEdge = ({
  id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY: sourceY - 12,
    sourcePosition,
    targetX,
    targetY: targetY - 12,
    targetPosition,
    curvature: 0.3,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: '#10b981', strokeWidth: 2.5 }} markerEnd="url(#arrow-green)" />
      <defs>
        <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
        </marker>
      </defs>
    </>
  );
};

// ------------------------------------------
// 2. Custom Bidirectional Edge: PREV (blue, bottom path)
// ------------------------------------------
const PrevEdge = ({
  id, sourceX, sourceY, targetX, targetY,
}: EdgeProps) => {
  // Path goes FROM the right node (targetX) BACK TO the left node (sourceX)
  // We draw it as a curve below the chain
  const [edgePath] = getBezierPath({
    sourceX: targetX,
    sourceY: targetY + 16,
    sourcePosition: Position.Right,
    targetX: sourceX,
    targetY: sourceY + 16,
    targetPosition: Position.Left,
    curvature: 0.35,
  });
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: '#3b82f6', strokeWidth: 2.5, strokeDasharray: '6 3' }}
        // markerStart puts the arrow at the beginning of the path (= right node side),
        // pointing LEFTWARD → arrow tip is visible, not hidden behind any node box
        markerStart="url(#arrow-blue-start)"
      />
      <defs>
        <marker
          id="arrow-blue-start"
          markerWidth="10"
          markerHeight="10"
          refX="3"
          refY="3"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
        </marker>
      </defs>
    </>
  );
};

const edgeTypes = {
  next: NextEdge,
  prev: PrevEdge,
};

// ------------------------------------------
// 3. Custom Node
// ------------------------------------------
const DllFlowNode = ({ data }: { data: any }) => {
  const node = data.node as DNodeState;
  const pointers = data.pointers as { current: boolean; tmp: boolean; target: boolean };

  const renderPointer = (name: string, isActive: boolean, colorClass: string) => {
    if (!isActive) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={`absolute -top-12 flex flex-col items-center font-bold text-xs ${colorClass} z-20`}
      >
        <span className="bg-white px-2 py-0.5 rounded-full shadow-sm border whitespace-nowrap">{name}</span>
        <ArrowDown size={16} className="mt-1" />
      </motion.div>
    );
  };

  const borderClass = node.isTarget
    ? 'border-rose-400 shadow-md ring-2 ring-rose-200'
    : node.isTemp
    ? 'border-amber-400 ring-2 ring-amber-100'
    : 'border-slate-300';

  return (
    <div className={`relative flex flex-col w-44 rounded-xl border-2 bg-white shadow-sm ${borderClass}`}>
      {/* Left handle (for PREV incoming / NEXT outgoing to left) */}
      <Handle type="target" id="left" position={Position.Left} style={{ background: 'transparent', border: 'none' }} />
      {/* Right handle */}
      <Handle type="source" id="right" position={Position.Right} style={{ background: 'transparent', border: 'none' }} />

      {/* Pointer labels */}
      <div className="absolute top-0 w-full flex justify-center h-full pointer-events-none">
        {renderPointer('current', pointers.current, 'text-blue-600')}
        {renderPointer('temp', pointers.tmp, 'text-amber-600')}
        {renderPointer('X', pointers.target, 'text-rose-600')}
      </div>

      {/* Temp badge */}
      {node.isTemp && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm z-20">
          Yeni Düğüm
        </div>
      )}

      {/* Node body: [prev | val | next] */}
      <div className="flex items-stretch h-16">
        <div className="w-12 bg-blue-50 border-r border-slate-200 flex flex-col items-center justify-center">
          <span className="text-[9px] text-blue-500 font-bold font-mono">←prev</span>
        </div>
        <div className="flex-1 flex items-center justify-center font-bold text-2xl font-mono text-[#051F20]">
          {node.val}
        </div>
        <div className="w-12 bg-emerald-50 border-l border-slate-200 flex flex-col items-center justify-center">
          <span className="text-[9px] text-emerald-600 font-bold font-mono">next→</span>
        </div>
      </div>

      {/* Address footer */}
      <div className="bg-black/5 px-2 py-1 flex justify-between items-center text-[10px] font-mono border-t border-slate-200">
        <span className="text-blue-600 font-bold">{node.prevAddress ? '← ' + node.prevAddress.slice(-3) : 'NULL'}</span>
        <span className="text-slate-500 font-bold">{node.address.slice(-3)}</span>
        <span className="text-emerald-600 font-bold">{node.nextAddress ? node.nextAddress.slice(-3) + ' →' : 'NULL'}</span>
      </div>
    </div>
  );
};

const nodeTypes = {
  dllNode: DllFlowNode,
};

// ------------------------------------------
// 4. Main Canvas Component
// ------------------------------------------
export const DllCanvas: React.FC<DllCanvasProps> = ({ frame }) => {
  const { nodes, listRecord, pointers } = frame;

  const [rfNodes, setNodes, onNodesChange] = useNodesState([]);
  const [rfEdges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const fNodes: Node[] = [];
    const fEdges: Edge[] = [];

    // Build ordered chain
    const orderedNodes: DNodeState[] = [];
    let curr = listRecord.headAddress;
    const visited = new Set<string>();

    while (curr && !visited.has(curr)) {
      visited.add(curr);
      const node = nodes.find(n => n.address === curr);
      if (node) {
        orderedNodes.push(node);
        curr = node.nextAddress || '';
      } else {
        break;
      }
    }

    const floatingNodes = nodes.filter(n => !visited.has(n.address));

    const startX = 60;
    const startY = 150;
    const gapX = 240;

    orderedNodes.forEach((node, index) => {
      fNodes.push({
        id: node.address,
        type: 'dllNode',
        position: { x: startX + index * gapX, y: startY },
        data: {
          node,
          pointers: {
            current: pointers.current === node.address,
            tmp: pointers.tmp === node.address,
            target: pointers.target === node.address,
          },
        },
      });

      // NEXT edge (green, forward): current → next
      if (node.nextAddress && visited.has(node.nextAddress)) {
        fEdges.push({
          id: `next-${node.address}`,
          source: node.address,
          target: node.nextAddress,
          type: 'next',
          animated: true,
          sourceHandle: 'right',
          targetHandle: 'left',
        });
      }

      // PREV edge (blue, backward): next → current (drawn as bottom curve going back)
      if (node.nextAddress && visited.has(node.nextAddress)) {
        fEdges.push({
          id: `prev-${node.nextAddress}`,
          source: node.address,
          target: node.nextAddress,
          type: 'prev',
          animated: false,
          sourceHandle: 'right',
          targetHandle: 'left',
        });
      }
    });

    floatingNodes.forEach((node, index) => {
      fNodes.push({
        id: node.address,
        type: 'dllNode',
        position: { x: startX + index * gapX, y: startY + 220 },
        data: {
          node,
          pointers: {
            current: pointers.current === node.address,
            tmp: pointers.tmp === node.address,
            target: pointers.target === node.address,
          },
        },
      });
    });

    setNodes(fNodes);
    setEdges(fEdges);
  }, [nodes, listRecord, pointers, setNodes, setEdges]);

  return (
    <div className="w-full h-full flex flex-col relative bg-[#F2F7F4] rounded-2xl border border-[#8EB69B]/40 shadow-inner overflow-hidden min-h-[420px]">

      {/* ListRecord Metadata */}
      <div className="absolute top-4 left-4 z-10 flex gap-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-slate-200 text-xs font-mono">
        <div className="flex flex-col">
          <span className="text-slate-400 font-sans font-bold uppercase">List-&gt;head</span>
          <span className="text-emerald-700 font-bold">{listRecord.headAddress || 'NULL'}</span>
        </div>
        <div className="w-px bg-slate-200" />
        <div className="flex flex-col">
          <span className="text-slate-400 font-sans font-bold uppercase">List-&gt;tail</span>
          <span className="text-emerald-700 font-bold">{listRecord.tailAddress || 'NULL'}</span>
        </div>
        <div className="w-px bg-slate-200" />
        <div className="flex flex-col">
          <span className="text-slate-400 font-sans font-bold uppercase">List-&gt;size</span>
          <span className="text-emerald-700 font-bold">{listRecord.size}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm border border-slate-200 text-[10px] font-bold">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-[3px] bg-emerald-500 rounded" />
          <span className="text-emerald-700">next →</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-[3px] bg-blue-400 rounded" style={{ borderTop: '2px dashed #3b82f6', background: 'none' }} />
          <span className="text-blue-700">← prev</span>
        </div>
      </div>

      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
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
