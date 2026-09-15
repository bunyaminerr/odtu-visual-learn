"use client";

import React from "react";
import { CellValue, KMapGroup } from "@/lib/types/logic";
import { cn } from "@/lib/utils";

interface KMapGridProps {
    cells: CellValue[]; // Uzunluğu 4, 8 veya 16 olan dizi
    onCellClick: (minterm: number) => void;
    groups: KMapGroup[];
    hoveredGroupId?: string | null;
    numVars: number;
}

export const KMapGrid: React.FC<KMapGridProps> = ({ cells, onCellClick, groups, hoveredGroupId, numVars }) => {
    const getGridConfig = () => {
        if (numVars === 2) return { rows: ['0', '1'], cols: ['0', '1'], colsClass: 'grid-cols-2', rowsClass: 'grid-rows-2', title: 'A \ B' };
        if (numVars === 3) return { rows: ['0', '1'], cols: ['00', '01', '11', '10'], colsClass: 'grid-cols-4', rowsClass: 'grid-rows-2', title: 'A \ BC' };
        return { rows: ['00', '01', '11', '10'], cols: ['00', '01', '11', '10'], colsClass: 'grid-cols-4', rowsClass: 'grid-rows-4', title: 'AB \ CD' };
    };

    const config = getGridConfig();

    return (
        <div className="flex flex-col items-center select-none relative">
            {/* Üst CD/BC/B Etiketi */}
            <div className="flex w-full ml-12 mb-2">
                <div className="w-12"></div> {/* Boşluk */}
                <div className="flex-1 flex text-[#051F20] font-mono text-sm">
                    {config.cols.map(c => (
                        <div key={`col-${c}`} className="flex-1 text-center font-bold">{c}</div>
                    ))}
                </div>
            </div>

            <div className="flex w-full max-w-[400px]">
                {/* Sol AB/A Etiketi */}
                <div className="w-12 flex flex-col justify-between text-[#051F20] font-mono text-sm py-4">
                    {config.rows.map(r => (
                        <div key={`row-${r}`} className="flex-1 flex items-center justify-end pr-4 font-bold">{r}</div>
                    ))}
                </div>

                {/* Grid */}
                <div className={cn("flex-1 grid bg-slate-200 border-2 border-slate-200 gap-[2px] p-[2px] rounded-xl shadow-sm relative", config.colsClass, config.rowsClass)}>
                    {config.rows.map((r) => 
                        config.cols.map((c) => {
                            const minterm = parseInt(r + c, 2);
                            const val = cells[minterm];

                            // Hücrenin ait olduğu gruplar
                            const cellGroups = groups.filter(g => g.cells.includes(minterm));
                            
                            // Eğer bir grubun üstüne gelindiyse, o gruba ait mi?
                            const isHovered = hoveredGroupId 
                                ? groups.find(g => g.id === hoveredGroupId)?.cells.includes(minterm)
                                : false;

                            // Hücre rengi hesaplama
                            let cellBg = "bg-white";
                            let cellBorder = "border-transparent";

                            if (isHovered) {
                                const hoveredGroup = groups.find(g => g.id === hoveredGroupId);
                                if (hoveredGroup) {
                                    cellBg = hoveredGroup.color.split(" ")[0]; // "bg-red-500/30" vs
                                    cellBorder = hoveredGroup.color.split(" ")[1]; 
                                }
                            } else if (cellGroups.length > 0) {
                                cellBg = cellGroups[0].color.split(" ")[0].replace("30", "10"); 
                            }

                            return (
                                <div 
                                    key={minterm}
                                    onClick={() => onCellClick(minterm)}
                                    className={cn(
                                        "relative flex items-center justify-center h-16 w-16 cursor-pointer border-2 transition-all duration-200",
                                        cellBg,
                                        cellBorder,
                                        "hover:bg-slate-50 rounded-md"
                                    )}
                                >
                                    {/* Minterm Index Göstergesi */}
                                    <span className="absolute top-1 left-1 text-[9px] text-[#163832]/60 font-mono">
                                        m{minterm}
                                    </span>
                                    
                                    {/* Hücre Değeri */}
                                    <span className={cn(
                                        "text-2xl font-bold font-mono transition-colors",
                                        val === 1 ? "text-[#235347]" : 
                                        val === 'X' ? "text-[#163832]/80" : "text-[#051F20]/30"
                                    )}>
                                        {val !== undefined ? val : 0}
                                    </span>

                                    {/* Birden fazla gruba aitse ufak nokta belirteçleri */}
                                    {!isHovered && cellGroups.length > 1 && (
                                        <div className="absolute bottom-1 right-1 flex gap-0.5 flex-wrap w-8 justify-end">
                                            {cellGroups.map(g => (
                                                <div key={g.id} className={cn("w-1.5 h-1.5 rounded-full mb-0.5", g.color.split(" ")[1].replace("border", "bg"))}></div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            
            {/* Eksen İsimleri */}
            <div className="absolute top-2 left-6 text-[#051F20]/60 font-bold text-sm">{config.title}</div>
        </div>
    );
};
