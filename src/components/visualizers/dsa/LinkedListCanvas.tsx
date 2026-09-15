"use client";

import React, { useMemo } from "react";
import {
    ReactFlow,
    Background,
    BackgroundVariant,
    Controls,
    Node,
    Edge,
    MarkerType,
    Handle,
    Position,
} from "@xyflow/react";
import { LinkedListNode, MemoryPointer } from "@/lib/types/dsa";
import { cn } from "@/lib/utils";

// Custom Node Tasarımı: C struct node
const CStructNode = ({ data }: { data: any }) => {
    return (
        <div className={cn(
            "relative flex flex-col items-center",
            data.isHighlighted ? "scale-110 transition-transform duration-300 z-50" : "transition-transform duration-300"
        )}>
            {/* Pointer Etiketleri (Head, Temp vs) */}
            <div className="absolute -top-10 flex flex-col gap-1 items-center z-10">
                {data.pointers.map((p: string) => (
                    <span key={p} className="bg-[#235347] text-white text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full shadow-sm">
                        {p}
                    </span>
                ))}
            </div>

            {/* Struct Kutusu */}
            <div className={cn(
                "flex bg-white text-[#051F20] border border-slate-200 shadow-sm rounded-xl overflow-hidden",
                data.isHighlighted ? "border-[#235347] ring-2 ring-[#235347]/20 shadow-md" : ""
            )}>
                {/* Data Alanı */}
                <div className="w-16 h-12 flex items-center justify-center border-r border-slate-200 bg-white text-[#051F20] font-bold font-mono text-base">
                    {data.value}
                </div>
                {/* Next Pointer Alanı */}
                <div className="w-12 h-12 flex items-center justify-center bg-white relative">
                    <div className="w-3 h-3 rounded-full bg-[#235347]"></div>
                    <Handle 
                        type="source" 
                        position={Position.Right} 
                        className="opacity-0 absolute inset-0 w-full h-full" 
                        isConnectable={false} 
                    />
                </div>
            </div>

            {/* Input Handle for Target */}
            <Handle 
                type="target" 
                position={Position.Left} 
                className="opacity-0" 
                isConnectable={false} 
            />

            {/* Bellek Adresi */}
            <div className="mt-2 text-xs font-mono text-[#235347]">
                {data.address}
            </div>
        </div>
    );
};

const nodeTypes = { cStruct: CStructNode };

interface LinkedListCanvasProps {
    nodes: LinkedListNode[];
    pointers: MemoryPointer;
    highlightAddress?: string;
}

export const LinkedListCanvas: React.FC<LinkedListCanvasProps> = ({ nodes, pointers, highlightAddress }) => {
    // React Flow veri hazırlığı
    const { flowNodes, flowEdges } = useMemo(() => {
        const flowNodes: Node[] = [];
        const flowEdges: Edge[] = [];

        // Bellek tahsis sırasına (array index) göre yerleşim (Fiziksel bellek simülasyonu)
        nodes.forEach((n, index) => {
            // Hangi pointer'lar bu node'u gösteriyor?
            const pointingHere = Object.entries(pointers)
                .filter(([_, addr]) => addr === n.address)
                .map(([key, _]) => key); // "head", "temp", vs.

            flowNodes.push({
                id: n.address,
                type: "cStruct",
                position: { x: index * 220, y: 150 }, // Yatayda 220px aralıklarla
                data: {
                    value: n.value,
                    address: n.address,
                    pointers: pointingHere,
                    isHighlighted: highlightAddress === n.address,
                },
                draggable: true,
            });

            // Edge oluşturma (Next pointer)
            if (n.nextAddress) {
                // Kendi kendine dönüyorsa (Circular vs) veya sola dönüyorsa (Reverse) bezier eğrisi
                // React Flow bunu otomatik yapar.
                flowEdges.push({
                    id: `e-${n.address}-${n.nextAddress}`,
                    source: n.address,
                    target: n.nextAddress,
                    animated: true,
                    type: "smoothstep",
                    style: { stroke: "#235347", strokeWidth: 2 },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        color: "#235347",
                    },
                });
            }
        });

        return { flowNodes, flowEdges };
    }, [nodes, pointers, highlightAddress]);

    return (
        <div className="w-full h-full min-h-[400px] bg-[#F2F7F4] shadow-inner rounded-2xl border border-[#8EB69B]/40 overflow-hidden">
            <ReactFlow
                nodes={flowNodes}
                edges={flowEdges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.3 }}
                proOptions={{ hideAttribution: true }}
            >
                <Background color="#8EB69B40" gap={16} variant={BackgroundVariant.Dots} />
                <Controls className="bg-white border-[#8EB69B]/40 fill-[#051F20]" />
            </ReactFlow>
        </div>
    );
};
