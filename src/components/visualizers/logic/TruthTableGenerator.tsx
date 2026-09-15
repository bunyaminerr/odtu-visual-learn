"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, Play, AlertCircle } from "lucide-react";

// A simple boolean evaluator for expressions with A, B, C
const evaluateBoolean = (expr: string, A: number, B: number, C: number): number | null => {
    try {
        // Replace variables
        let e = expr.toUpperCase();
        
        // Remove spaces
        e = e.replace(/\s+/g, '');
        
        // Custom simple parser or just convert to JS bitwise
        // We need to handle X' -> !X. Since JS doesn't support postfix !, we have to be careful.
        // It's easier to just use standard JS syntax for the evaluator and let the user type JS-like logic,
        // BUT the user is a logic design student. They know: A.B + C'
        // Let's implement a hacky postfix NOT replacer for single variables and parentheses:
        
        let prev;
        do {
            prev = e;
            // Handle (expr)'
            e = e.replace(/\(([^()]+)\)'/g, '(!($1))');
        } while (e !== prev);
        
        // Handle variable' -> !variable
        e = e.replace(/([ABC])'/g, '(!$1)');
        
        // Replace . with &&, + with ||
        e = e.replace(/\./g, '&&').replace(/\+/g, '||');
        
        // Replace variables with actual values
        e = e.replace(/A/g, A.toString());
        e = e.replace(/B/g, B.toString());
        e = e.replace(/C/g, C.toString());
        
        // Now e should be something like (1&&0)||(!1)
        // eslint-disable-next-line no-eval
        const result = eval(e);
        return result ? 1 : 0;
    } catch (err) {
        return null;
    }
};

export const TruthTableGenerator = () => {
    const [expr, setExpr] = useState("A.B + C'");
    const [table, setTable] = useState<Array<{A: number, B: number, C: number, out: number | null}>>([]);
    const [error, setError] = useState(false);

    const generateTable = () => {
        let newTable = [];
        let hasError = false;
        
        for (let i = 0; i < 8; i++) {
            const A = (i >> 2) & 1;
            const B = (i >> 1) & 1;
            const C = i & 1;
            const out = evaluateBoolean(expr, A, B, C);
            
            if (out === null) hasError = true;
            newTable.push({ A, B, C, out });
        }
        
        setError(hasError);
        setTable(newTable);
    };

    return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <Table className="w-6 h-6 text-[#235347]" />
                <h2 className="text-xl font-bold text-[#051F20]">Interactive Truth Table Generator</h2>
            </div>
            
            <p className="text-sm text-slate-500 mb-6">
                Enter a boolean expression using <strong>A, B, C</strong>. Use <strong>.</strong> for AND, <strong>+</strong> for OR, and <strong>'</strong> for NOT (e.g. <code>A'</code> or <code>(A+B)'</code>).
            </p>

            <div className="flex gap-4 mb-8">
                <input 
                    type="text" 
                    value={expr}
                    onChange={(e) => setExpr(e.target.value)}
                    placeholder="e.g. A.B + C'"
                    className="flex-1 h-12 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#235347] font-mono text-lg transition-colors"
                />
                <Button 
                    onClick={generateTable}
                    className="h-12 px-6 bg-[#235347] hover:bg-[#163832] font-bold text-white rounded-lg flex gap-2 items-center"
                >
                    <Play className="w-4 h-4 fill-current" />
                    Generate
                </Button>
            </div>

            {error && (
                <div className="mb-6 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <p>Syntax Error in expression. Please use A, B, C, +, ., ', (, )</p>
                </div>
            )}

            {table.length > 0 && !error && (
                <div className="overflow-hidden border border-slate-200 rounded-xl">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="py-3 px-4 border-b border-r border-slate-200 font-bold text-[#051F20]">A</th>
                                <th className="py-3 px-4 border-b border-r border-slate-200 font-bold text-[#051F20]">B</th>
                                <th className="py-3 px-4 border-b border-r border-slate-200 font-bold text-[#051F20]">C</th>
                                <th className="py-3 px-4 border-b font-bold text-[#235347] bg-[#DAF1DE]/30">f(A, B, C) = {expr}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3 px-4 border-b border-r border-slate-100 text-slate-600">{row.A}</td>
                                    <td className="py-3 px-4 border-b border-r border-slate-100 text-slate-600">{row.B}</td>
                                    <td className="py-3 px-4 border-b border-r border-slate-100 text-slate-600">{row.C}</td>
                                    <td className="py-3 px-4 border-b font-mono font-bold text-lg text-[#235347] bg-[#DAF1DE]/10">
                                        {row.out}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
