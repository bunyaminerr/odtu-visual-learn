"use client";

import React, { useMemo } from "react";
import { RecurrenceResult, RecurrenceNode } from "@/lib/types/discrete";
import { MathFormula } from "@/components/visualizers/shared/MathFormula";

interface RecurrenceTreeVisualizerProps {
    result: RecurrenceResult;
    a: number; // dallanma faktörü
}

export const RecurrenceTreeVisualizer: React.FC<RecurrenceTreeVisualizerProps> = ({ result, a }) => {
    const { nodes, links, maxDepth } = useMemo(() => {
        // Ağacı düzleştirip (x, y) koordinatları atayalım
        const flatNodes: any[] = [];
        const flatLinks: any[] = [];
        
        const SVG_WIDTH = 800;
        const SVG_HEIGHT = 500;
        
        // Derinliği bulalım
        let maxD = 0;
        const findDepth = (n: RecurrenceNode, d: number) => {
            if (d > maxD) maxD = d;
            n.children?.forEach(c => findDepth(c, d + 1));
        };
        findDepth(result.tree, 0);

        const ySpacing = SVG_HEIGHT / (maxD + 1);

        // Koordinat atama
        const layout = (node: RecurrenceNode, depth: number, indexAtDepth: number, totalAtDepth: number) => {
            // X eksenini eşit parçalara böl
            const sectionWidth = SVG_WIDTH / totalAtDepth;
            const x = sectionWidth * indexAtDepth + (sectionWidth / 2);
            const y = depth * ySpacing + 50;

            const layoutNode = { ...node, x, y, depth };
            flatNodes.push(layoutNode);

            if (node.children) {
                node.children.forEach((child, i) => {
                    const childLayout = layout(child, depth + 1, indexAtDepth * a + i, totalAtDepth * a);
                    flatLinks.push({
                        source: layoutNode,
                        target: childLayout
                    });
                });
            }
            return layoutNode;
        };

        layout(result.tree, 0, 0, 1);

        return { nodes: flatNodes, links: flatLinks, maxDepth: maxD };
    }, [result, a]);

    return (
        <div className="w-full h-full bg-[#F2F7F4] rounded-2xl border border-slate-200/80 overflow-hidden relative shadow-inner p-4">
            
            <svg width="100%" height="100%" viewBox="0 0 800 500">
                {/* Kenarlar */}
                {links.map((l, i) => (
                    <line
                        key={`link-${i}`}
                        x1={l.source.x}
                        y1={l.source.y}
                        x2={l.target.x}
                        y2={l.target.y}
                        stroke="#8EB69B"
                        strokeWidth="2"
                    />
                ))}

                {/* Düğümler */}
                {nodes.map((n, i) => (
                    <g key={`node-${i}`} transform={`translate(${n.x},${n.y})`}>
                        <circle r={25} fill="#FFFFFF" stroke="#235347" strokeWidth={2} />
                        {/* İç Metin T(n) */}
                        <foreignObject x="-25" y="-12" width="50" height="24" className="overflow-visible pointer-events-none text-center">
                            <div className="text-[10px] flex items-center justify-center w-full h-full text-[#051F20]">
                                <MathFormula math={n.name} />
                            </div>
                        </foreignObject>
                        
                        {/* Yanına Maliyet Etiketi */}
                        {n.depth <= 3 && (
                            <foreignObject x="30" y="-10" width="80" height="20" className="pointer-events-none">
                                <div className="text-[11px] text-[#235347] font-bold whitespace-nowrap">
                                    <MathFormula math={n.cost} />
                                </div>
                            </foreignObject>
                        )}
                    </g>
                ))}
            </svg>

            {/* Bilgi Paneli */}
            <div className="absolute top-4 left-4 bg-white/95 p-4 rounded-xl border border-slate-200/90 backdrop-blur-sm shadow-sm">
                <div className="flex flex-col gap-2 text-sm text-[#051F20]">
                    <div className="flex justify-between gap-4">
                        <span className="text-[#051F20]/80">Ağaç Derinliği (Depth):</span>
                        <span className="font-mono text-[#235347] font-bold"><MathFormula math={result.depth} /></span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-[#051F20]/80">Yaprak Sayısı:</span>
                        <span className="font-mono text-[#235347] font-bold"><MathFormula math={result.leaves} /></span>
                    </div>
                    <div className="border-t border-slate-200 my-1"></div>
                    <div className="flex justify-between gap-4 font-bold text-[#051F20]">
                        <span>Toplam Maliyet:</span>
                        <span className="text-[#235347]"><MathFormula math={`\\Theta(${result.totalWork})`} /></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
