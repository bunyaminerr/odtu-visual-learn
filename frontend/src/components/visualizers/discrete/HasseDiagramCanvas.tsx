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
import dagre from 'dagre';
import { HasseNode, HasseEdge } from "@/lib/types/discrete";

const HasseDotNode = ({ data }: { data: { label: string } }) => (
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
        const dagreGraph = new dagre.graphlib.Graph();
        dagreGraph.setDefaultEdgeLabel(() => ({}));
        // BT = Bottom to Top. Hasse edges point upward, so rankdir BT makes higher levels visually higher.
        dagreGraph.setGraph({ rankdir: 'BT', nodesep: 60, ranksep: 100 });

        nodes.forEach(n => {
            dagreGraph.setNode(n.id, { width: 48, height: 48 });
        });
        
        edges.forEach(e => {
            dagreGraph.setEdge(e.source, e.target);
        });

        dagre.layout(dagreGraph);

        const flowNodes: Node[] = nodes.map((n) => {
            const nodeWithPosition = dagreGraph.node(n.id);
            return {
                id: n.id,
                type: "hasseDot",
                position: { x: nodeWithPosition.x - 24, y: nodeWithPosition.y - 24 },
                data: { label: n.label },
                draggable: true,
            };
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
