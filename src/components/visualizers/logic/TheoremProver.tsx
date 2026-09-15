"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

const THEOREMS = [
    {
        id: "demorgan-or",
        name: "De Morgan's Law (OR)",
        exprL: "(X + Y)'",
        exprR: "X'.Y'",
        evalL: (x: number, y: number) => (!(x || y)) ? 1 : 0,
        evalR: (x: number, y: number) => ((!x) && (!y)) ? 1 : 0,
    },
    {
        id: "demorgan-and",
        name: "De Morgan's Law (AND)",
        exprL: "(X . Y)'",
        exprR: "X' + Y'",
        evalL: (x: number, y: number) => (!(x && y)) ? 1 : 0,
        evalR: (x: number, y: number) => ((!x) || (!y)) ? 1 : 0,
    },
    {
        id: "distributive-and",
        name: "Distributivity of AND over OR",
        exprL: "X . (Y + Z)",
        exprR: "X.Y + X.Z",
        vars: 3,
        evalL: (x: number, y: number, z: number) => (x && (y || z)) ? 1 : 0,
        evalR: (x: number, y: number, z: number) => ((x && y) || (x && z)) ? 1 : 0,
    },
    {
        id: "distributive-or",
        name: "Distributivity of OR over AND",
        exprL: "X + (Y . Z)",
        exprR: "(X + Y) . (X + Z)",
        vars: 3,
        evalL: (x: number, y: number, z: number) => (x || (y && z)) ? 1 : 0,
        evalR: (x: number, y: number, z: number) => ((x || y) && (x || z)) ? 1 : 0,
    },
    {
        id: "consensus",
        name: "Consensus Theorem",
        exprL: "X.Y + X'.Z + Y.Z",
        exprR: "X.Y + X'.Z",
        vars: 3,
        evalL: (x: number, y: number, z: number) => ((x&&y) || ((!x)&&z) || (y&&z)) ? 1 : 0,
        evalR: (x: number, y: number, z: number) => ((x&&y) || ((!x)&&z)) ? 1 : 0,
    }
];

export const TheoremProver = () => {
    const [selected, setSelected] = useState(THEOREMS[0]);

    const vars = selected.vars || 2;
    const rows = vars === 2 ? 4 : 8;
    
    let table = [];
    for (let i = 0; i < rows; i++) {
        let X = vars === 2 ? ((i >> 1) & 1) : ((i >> 2) & 1);
        let Y = vars === 2 ? (i & 1) : ((i >> 1) & 1);
        let Z = vars === 3 ? (i & 1) : 0;
        
        // @ts-ignore
        let resL = vars === 2 ? selected.evalL(X, Y) : selected.evalL(X, Y, Z);
        // @ts-ignore
        let resR = vars === 2 ? selected.evalR(X, Y) : selected.evalR(X, Y, Z);
        
        table.push({ X, Y, Z, resL, resR });
    }

    return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <FlaskConical className="w-6 h-6 text-[#235347]" />
                <h2 className="text-xl font-bold text-[#051F20]">Boolean Theorem Prover</h2>
            </div>
            
            <p className="text-sm text-slate-500 mb-6">
                Select a Boolean theorem. The truth table proves that the Left Hand Side (LHS) and Right Hand Side (RHS) are strictly equal for all input combinations.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
                {THEOREMS.map(t => (
                    <Button 
                        key={t.id}
                        variant={selected.id === t.id ? 'default' : 'outline'}
                        onClick={() => setSelected(t)}
                        className={cn("rounded-full", selected.id === t.id && "bg-[#235347] hover:bg-[#163832]")}
                    >
                        {t.name}
                    </Button>
                ))}
            </div>

            <div className="flex justify-center mb-6">
                <div className="flex items-center gap-4 text-xl md:text-2xl font-mono font-bold">
                    <span className="text-blue-600">{selected.exprL}</span>
                    <span className="text-slate-400">=</span>
                    <span className="text-green-600">{selected.exprR}</span>
                </div>
            </div>

            <div className="overflow-hidden border border-slate-200 rounded-xl">
                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="py-3 px-4 border-b border-r border-slate-200 font-bold text-[#051F20]">X</th>
                            <th className="py-3 px-4 border-b border-r border-slate-200 font-bold text-[#051F20]">Y</th>
                            {vars === 3 && <th className="py-3 px-4 border-b border-r border-slate-200 font-bold text-[#051F20]">Z</th>}
                            
                            <th className="py-3 px-4 border-b border-r font-bold text-blue-700 bg-blue-50/50">LHS: {selected.exprL}</th>
                            <th className="py-3 px-4 border-b font-bold text-green-700 bg-green-50/50">RHS: {selected.exprR}</th>
                            <th className="py-3 px-4 border-b font-bold text-slate-500">Match?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, idx) => {
                            const isMatch = row.resL === row.resR;
                            return (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3 px-4 border-b border-r border-slate-100 text-slate-600">{row.X}</td>
                                    <td className="py-3 px-4 border-b border-r border-slate-100 text-slate-600">{row.Y}</td>
                                    {vars === 3 && <td className="py-3 px-4 border-b border-r border-slate-100 text-slate-600">{row.Z}</td>}
                                    
                                    <td className="py-3 px-4 border-b border-r font-mono font-bold text-lg text-blue-700 bg-blue-50/20">
                                        {row.resL}
                                    </td>
                                    <td className="py-3 px-4 border-b font-mono font-bold text-lg text-green-700 bg-green-50/20 border-r">
                                        {row.resR}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        {isMatch ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                                        ) : (
                                            <span className="text-red-500 font-bold">Error</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
