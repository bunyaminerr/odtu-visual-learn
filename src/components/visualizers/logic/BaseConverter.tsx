"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

type Base = 2 | 8 | 10 | 16;

export const BaseConverter = () => {
    const [inputValue, setInputValue] = useState('729');
    const [fromBase, setFromBase] = useState<Base>(10);
    const [toBase, setToBase] = useState<Base>(2);

    const handleSwap = () => {
        setFromBase(toBase);
        setToBase(fromBase);
        setInputValue('');
    };

    const renderSteps = () => {
        if (!inputValue) return null;
        
        let value = inputValue.trim().toUpperCase();
        
        // Validation basic
        if (fromBase === 10 && !/^[0-9.]+$/.test(value)) return <div className="text-red-500 mt-4">Invalid decimal number</div>;
        if (fromBase === 2 && !/^[01.]+$/.test(value)) return <div className="text-red-500 mt-4">Invalid binary number</div>;
        if (fromBase === 8 && !/^[0-7.]+$/.test(value)) return <div className="text-red-500 mt-4">Invalid octal number</div>;
        if (fromBase === 16 && !/^[0-9A-F.]+$/.test(value)) return <div className="text-red-500 mt-4">Invalid hex number</div>;

        const parts = value.split('.');
        const intPart = parts[0] || '0';
        const fracPart = parts[1] || '';

        // If from base 10 to anything else
        if (fromBase === 10 && toBase !== 10) {
            let n = parseInt(intPart, 10);
            let steps = [];
            while (n > 0) {
                let r = n % toBase;
                steps.push({ q: Math.floor(n / toBase), r, n });
                n = Math.floor(n / toBase);
            }
            if (steps.length === 0) steps.push({ q: 0, r: 0, n: 0 });

            // Fractional part
            let fn = fracPart ? parseFloat('0.' + fracPart) : 0;
            let fracSteps = [];
            let loopLimit = 0;
            let tempFn = fn;
            while (tempFn > 0 && loopLimit < 5) {
                let next = tempFn * toBase;
                let coeff = Math.floor(next);
                fracSteps.push({ fn: tempFn, next, coeff });
                tempFn = next - coeff;
                loopLimit++;
            }

            const chars = "0123456789ABCDEF";
            const resInt = steps.map(s => chars[s.r]).reverse().join('');
            const resFrac = fracSteps.map(s => chars[s.coeff]).join('');
            const finalRes = resFrac ? `${resInt}.${resFrac}` : resInt;

            return (
                <div className="mt-6 flex flex-col gap-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                        <h3 className="font-bold text-[#051F20] mb-4 text-lg border-b pb-2">1. Integer Conversion (Division by {toBase})</h3>
                        <div className="flex flex-col gap-2 font-mono text-sm">
                            <div className="grid grid-cols-3 font-bold text-slate-500 border-b pb-2">
                                <div>Operation</div>
                                <div>Quotient</div>
                                <div>Remainder</div>
                            </div>
                            {steps.map((s, i) => (
                                <div key={i} className="grid grid-cols-3 py-1 items-center hover:bg-slate-100 rounded px-1 transition-colors">
                                    <div className="text-[#051F20]">{s.n} / {toBase}</div>
                                    <div className="text-[#235347]">{s.q}</div>
                                    <div className="font-bold text-blue-600">
                                        {s.r} {toBase === 16 && s.r > 9 ? `(${chars[s.r]})` : ''} 
                                        {i === 0 ? ' (LSB)' : i === steps.length - 1 ? ' (MSB)' : ''}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {fracPart && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                            <h3 className="font-bold text-[#051F20] mb-4 text-lg border-b pb-2">2. Fractional Conversion (Multiplication by {toBase})</h3>
                            <div className="flex flex-col gap-2 font-mono text-sm">
                                <div className="grid grid-cols-3 font-bold text-slate-500 border-b pb-2">
                                    <div>Operation</div>
                                    <div>Integer (Coefficient)</div>
                                    <div>Fraction</div>
                                </div>
                                {fracSteps.map((s, i) => (
                                    <div key={'f'+i} className="grid grid-cols-3 py-1 items-center hover:bg-slate-100 rounded px-1 transition-colors">
                                        <div className="text-[#051F20]">{s.fn.toFixed(4)} * {toBase} = {s.next.toFixed(4)}</div>
                                        <div className="font-bold text-blue-600">{chars[s.coeff]}</div>
                                        <div className="text-[#235347]">{(s.next - s.coeff).toFixed(4)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-[#235347] text-white p-4 rounded-xl flex items-center justify-between shadow-sm">
                        <span className="font-medium">Final Result:</span>
                        <span className="font-mono text-xl font-bold border border-white/20 px-3 py-1 rounded bg-black/20">
                            ({finalRes}){toBase}
                        </span>
                    </div>
                </div>
            );
        }

        // If from base to Decimal
        if (toBase === 10 && fromBase !== 10) {
            let resInt = 0;
            let sumSteps = [];
            const chars = "0123456789ABCDEF";
            for (let i = 0; i < intPart.length; i++) {
                let digit = chars.indexOf(intPart[i]);
                let weight = Math.pow(fromBase, intPart.length - 1 - i);
                resInt += digit * weight;
                sumSteps.push(`${digit} × ${fromBase}<sup class="text-[10px]">${intPart.length - 1 - i}</sup>`);
            }
            
            let resFrac = 0;
            let fracSumSteps = [];
            for (let i = 0; i < fracPart.length; i++) {
                let digit = chars.indexOf(fracPart[i]);
                let weight = Math.pow(fromBase, -(i + 1));
                resFrac += digit * weight;
                fracSumSteps.push(`${digit} × ${fromBase}<sup class="text-[10px]">-${i + 1}</sup>`);
            }
            
            return (
                <div className="mt-6 flex flex-col gap-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                        <h3 className="font-bold text-[#051F20] mb-4 text-lg border-b pb-2">Sum of "Digit x Weight"</h3>
                        
                        <div className="flex flex-col gap-4 font-mono text-sm">
                            <div className="flex flex-wrap items-center gap-2 text-base">
                                <div className="text-[#051F20]">Integer Part:</div>
                                <div dangerouslySetInnerHTML={{__html: sumSteps.join(' + ')}} className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded border border-blue-100" />
                                <div>= {resInt}</div>
                            </div>
                            
                            {fracPart && (
                                <div className="flex flex-wrap items-center gap-2 text-base">
                                    <div className="text-[#051F20]">Fractional Part:</div>
                                    <div dangerouslySetInnerHTML={{__html: fracSumSteps.join(' + ')}} className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded border border-blue-100" />
                                    <div>= {resFrac}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#235347] text-white p-4 rounded-xl flex items-center justify-between shadow-sm">
                        <span className="font-medium">Final Result:</span>
                        <span className="font-mono text-xl font-bold border border-white/20 px-3 py-1 rounded bg-black/20">
                            ({resInt + resFrac})10
                        </span>
                    </div>
                </div>
            );
        }

        // Direct conversions for 2 <-> 8, 2 <-> 16
        if ((fromBase === 2 && toBase === 8) || (fromBase === 8 && toBase === 2) || (fromBase === 2 && toBase === 16) || (fromBase === 16 && toBase === 2)) {
            // we can convert to binary as intermediate or direct grouping
            return (
                <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-600">
                    <p>Hint: Each Octal digit is exactly 3 bits. Each Hexadecimal digit is exactly 4 bits.</p>
                    <p className="mt-2 text-sm">For direct binary grouping, you can mentally group the bits from right to left (integer) or left to right (fraction).</p>
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded text-blue-700 font-mono font-bold text-lg">
                        Result: ({parseInt(intPart, fromBase).toString(toBase).toUpperCase()}{fracPart ? '.' + parseInt(fracPart, fromBase).toString(toBase).toUpperCase() : ''}){toBase}
                    </div>
                </div>
            );
        }

        return <div className="mt-4 text-slate-500">Select base conversion. Note: Usually we use Decimal as intermediate.</div>;
    };

    return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <Calculator className="w-6 h-6 text-[#235347]" />
                <h2 className="text-xl font-bold text-[#051F20]">Base Conversion Visualizer</h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
                <div className="flex-1 w-full">
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">From Base</label>
                    <select 
                        value={fromBase}
                        onChange={(e) => setFromBase(Number(e.target.value) as Base)}
                        className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#235347]/50"
                    >
                        <option value={2}>Binary (2)</option>
                        <option value={8}>Octal (8)</option>
                        <option value={10}>Decimal (10)</option>
                        <option value={16}>Hexadecimal (16)</option>
                    </select>
                </div>
                
                <Button variant="outline" size="icon" onClick={handleSwap} className="mt-5 shrink-0 rounded-full h-10 w-10 hover:bg-slate-100 hover:text-[#235347] transition-colors border-slate-300">
                    <ArrowRight className="w-4 h-4" />
                </Button>
                
                <div className="flex-1 w-full">
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">To Base</label>
                    <select 
                        value={toBase}
                        onChange={(e) => setToBase(Number(e.target.value) as Base)}
                        className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#235347]/50"
                    >
                        <option value={2}>Binary (2)</option>
                        <option value={8}>Octal (8)</option>
                        <option value={10}>Decimal (10)</option>
                        <option value={16}>Hexadecimal (16)</option>
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Input Number</label>
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter number (e.g. 729 or 101.01)"
                    className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#235347] font-mono text-lg transition-colors"
                />
            </div>

            {renderSteps()}
        </div>
    );
};
