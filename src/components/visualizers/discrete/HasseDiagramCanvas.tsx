"use client";

import React, { useMemo } from "react";
import {
    ReactFlow,
    Background,
    BackgroundVariant,
    Controls,
    Node,
    Edge,
    Handle,
    Position,
} from "@xyflow/react";
import { HasseNode, HasseEdge } from "@/lib/types/discrete";

const HasseDotNode = ({ data }: { data: any }) => (
    <div className="flex flex-col items-center justify-center w-12 h-12 bg-white border border-slate-200/80 rounded-full shadow-sm transition-all hover:scale-110 hover:border-[#235347] hover:bg-[#DAF1DE]/40">
        <Handle type="target" position={Position.Bottom} className="opacity-0" />
        <span className="font-bold font-mono text-[#051F20]">{data.label}</span>
        <Handle type="source" position={Position.Top} className="opacity-0" />
    </div>
);

const nodeTypes = { hasseDot: HasseDotNode };

interface HasseDiagramCanvasProps {
    nodes: HasseNode[];
    edges: HasseEdge[];
}

export const HasseDiagramCanvas: React.FC<HasseDiagramCanvasProps> = ({ nodes, edges }) => {
    const { flowNodes, flowEdges } = useMemo(() => {
        // Group nodes by level to distribute them horizontally
        const levels: Record<number, HasseNode[]> = {};
        nodes.forEach(n => {
            if (!levels[n.level]) levels[n.level] = [];
            levels[n.level].push(n);
        });

        const maxLevel = Math.max(...Object.keys(levels).map(Number));
        const flowNodes: Node[] = [];
        
        Object.entries(levels).forEach(([levelStr, levelNodes]) => {
            const level = parseInt(levelStr);
            const y = (maxLevel - level) * 120 + 50; // Yüksek level yukarıda (düşük Y)
            
            // X ekseninde merkeze hizalı yay
            const count = levelNodes.length;
            const spacing = 100;
            const startX = -((count - 1) * spacing) / 2;

            levelNodes.forEach((n, i) => {
                flowNodes.push({
                    id: n.id,
                    type: "hasseDot",
                    position: { x: startX + i * spacing, y },
                    data: { label: n.label },
                    draggable: true,
                });
            });
        });

        const flowEdges: Edge[] = edges.map((e, i) => ({
            id: `e-${e.source}-${e.target}`,
            source: e.source,
            target: e.target,
            style: { stroke: "#8EB69B", strokeWidth: 2 },
            animated: true,
        }));

        return { flowNodes, flowEdges };
    }, [nodes, edges]);

    return (
        <div className="w-full h-full min-h-[500px] bg-[#F2F7F4] rounded-2xl border border-slate-200/80 overflow-hidden shadow-inner">
            <ReactFlow
                nodes={flowNodes}
                edges={flowEdges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                proOptions={{ hideAttribution: true }}
            >
                <Background color="#94a3b8" gap={16} variant={BackgroundVariant.Dots} />
                <Controls className="bg-white border-slate-200 fill-slate-700" />
            </ReactFlow>
        </div>
    );
};
