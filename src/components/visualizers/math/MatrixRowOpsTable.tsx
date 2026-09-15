"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { MathFormula } from "../shared/MathFormula";

interface MatrixRowOpsTableProps {
    matrix: string[][];
    pivot: { row: number; col: number } | null;
    activeRows: number[];
}

export const MatrixRowOpsTable: React.FC<MatrixRowOpsTableProps> = ({
    matrix,
    pivot,
    activeRows,
}) => {
    if (!matrix || matrix.length === 0) return null;

    const numRows = matrix.length;
    const numCols = matrix[0].length;
    
    // ODTÜ'de genellikle son sütun genişletilmiş (augmented) sütundur.
    const isAugmented = numCols > 1;

    return (
        <div className="flex justify-center my-8 overflow-x-auto">
            <div className="relative inline-flex flex-col bg-[#F2F7F4] border border-slate-200/80 p-6 rounded-2xl shadow-inner">
                
                {/* Sol ve Sağ Köşeli Parantezler (Matris Görünümü) */}
                <div className="absolute left-2 top-4 bottom-4 w-4 border-l-2 border-t-2 border-b-2 border-slate-300 rounded-l-lg pointer-events-none"></div>
                <div className="absolute right-2 top-4 bottom-4 w-4 border-r-2 border-t-2 border-b-2 border-slate-300 rounded-r-lg pointer-events-none"></div>

                <div className="flex flex-col gap-2">
                    {matrix.map((row, rowIndex) => {
                        const isActive = activeRows.includes(rowIndex);
                        
                        return (
                            <div 
                                key={`row-${rowIndex}`} 
                                className={cn(
                                    "flex items-center gap-4 px-4 py-2 rounded-xl transition-all duration-300",
                                    isActive ? "bg-white shadow-sm ring-1 ring-slate-200" : "hover:bg-slate-50"
                                )}
                            >
                                {row.map((cell, colIndex) => {
                                    const isPivot = pivot?.row === rowIndex && pivot?.col === colIndex;
                                    const isAugmentedLine = isAugmented && colIndex === numCols - 1;

                                    return (
                                        <div key={`cell-${rowIndex}-${colIndex}`} className="flex items-center">
                                            {/* Genişletilmiş Matris Çizgisi */}
                                            {isAugmentedLine && (
                                                <div className="h-10 w-px bg-slate-300 mx-2"></div>
                                            )}
                                            
                                            {/* Hücre */}
                                            <div 
                                                className={cn(
                                                    "min-w-[3.5rem] h-12 flex items-center justify-center transition-all duration-500 rounded-md bg-white border border-slate-200 text-[#051F20] font-mono shadow-sm",
                                                    isPivot 
                                                        ? "bg-[#235347] border-2 border-[#163832] scale-110 z-10 font-bold shadow-md"
                                                        : isActive 
                                                            ? "font-semibold"
                                                            : "font-medium"
                                                )}
                                            >
                                                <MathFormula math={cell} className={cn(isPivot ? "font-bold text-white" : "text-[#051F20]")} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
