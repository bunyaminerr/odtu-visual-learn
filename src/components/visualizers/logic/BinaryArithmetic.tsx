"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus, X, Divide, Sigma } from "lucide-react";
import { cn } from "@/lib/utils";

type Operation = '+' | '-' | '*' | '/';

export const BinaryArithmetic = () => {
    const [num1, setNum1] = useState('101101');
    const [num2, setNum2] = useState('1101');
    const [operation, setOperation] = useState<Operation>('+');

    const renderAddition = (a: string, b: string) => {
        let maxLen = Math.max(a.length, b.length);
        let aPad = a.padStart(maxLen, '0');
        let bPad = b.padStart(maxLen, '0');
        
        let carry = Array(maxLen + 1).fill('0');
        let result = Array(maxLen).fill('0');
        
        for (let i = maxLen - 1; i >= 0; i--) {
            let sum = parseInt(aPad[i]) + parseInt(bPad[i]) + parseInt(carry[i + 1]);
            result[i] = (sum % 2).toString();
            carry[i] = Math.floor(sum / 2).toString();
        }

        return (
            <div className="font-mono text-xl flex flex-col items-end gap-1 select-none">
                <div className="flex gap-2 text-red-500 text-sm mb-1 font-bold">
                    {carry.map((c, i) => (
                        <span key={'c'+i} className={c === '1' ? 'opacity-100' : 'opacity-0'}>{c}</span>
                    ))}
                </div>
                <div className="flex gap-2 text-[#051F20]">
                    <span className="opacity-0">0</span>
                    {aPad.split('').map((c, i) => <span key={'a'+i}>{c}</span>)}
                </div>
                <div className="flex gap-2 text-[#051F20] border-b-2 border-slate-300 pb-2">
                    <span className="mr-2">+</span>
                    {bPad.split('').map((c, i) => <span key={'b'+i}>{c}</span>)}
                </div>
                <div className="flex gap-2 font-bold text-[#235347] pt-2">
                    <span className={carry[0] === '1' ? 'opacity-100' : 'opacity-0'}>{carry[0]}</span>
                    {result.map((c, i) => <span key={'r'+i}>{c}</span>)}
                </div>
                <div className="mt-4 text-sm text-slate-500 font-sans text-right max-w-[300px]">
                    <p>Red small numbers indicate <strong className="text-red-500">Carry (Elde)</strong>.</p>
                </div>
            </div>
        );
    };

    const renderSubtraction = (a: string, b: string) => {
        // Assume a >= b for simplicity of unsigned
        let n1 = parseInt(a, 2);
        let n2 = parseInt(b, 2);
        if (n2 > n1) {
            return <div className="text-red-500">Negative result (2's complement needed). Not supported in basic unsigned visualizer.</div>;
        }

        let maxLen = Math.max(a.length, b.length);
        let aPad = a.padStart(maxLen, '0');
        let bPad = b.padStart(maxLen, '0');
        
        let borrows = Array(maxLen).fill(0);
        let result = Array(maxLen).fill('0');
        let aVals = aPad.split('').map(Number);
        
        for (let i = maxLen - 1; i >= 0; i--) {
            if (aVals[i] < parseInt(bPad[i])) {
                // borrow
                borrows[i] = 2; // indicating a borrow occurred here
                aVals[i] += 2;
                let j = i - 1;
                while (j >= 0 && aVals[j] === 0) {
                    aVals[j] = 1;
                    borrows[j] = 1; // borrowed from here and passed on
                    j--;
                }
                if (j >= 0) {
                    aVals[j] -= 1;
                    borrows[j] = -1; // origin of borrow
                }
            }
            result[i] = (aVals[i] - parseInt(bPad[i])).toString();
        }

        return (
            <div className="font-mono text-xl flex flex-col items-end gap-1 select-none">
                <div className="flex gap-2 text-blue-500 text-sm mb-1 font-bold">
                    {borrows.map((c, i) => (
                        <span key={'b'+i} className={c === 2 ? 'text-red-500' : c === -1 ? 'line-through text-slate-400' : c === 1 ? 'text-orange-500' : 'opacity-0'}>
                            {c === 2 ? '2' : c === -1 ? '0' : c === 1 ? '1' : '0'}
                        </span>
                    ))}
                </div>
                <div className="flex gap-2 text-[#051F20]">
                    {aPad.split('').map((c, i) => (
                        <span key={'a'+i} className={borrows[i] === -1 || borrows[i] === 2 ? 'line-through text-slate-400' : ''}>{c}</span>
                    ))}
                </div>
                <div className="flex gap-2 text-[#051F20] border-b-2 border-slate-300 pb-2">
                    <span className="mr-2">-</span>
                    {bPad.split('').map((c, i) => <span key={'b'+i}>{c}</span>)}
                </div>
                <div className="flex gap-2 font-bold text-[#235347] pt-2">
                    {result.map((c, i) => <span key={'r'+i}>{c}</span>)}
                </div>
            </div>
        );
    };

    const renderMultiplication = (a: string, b: string) => {
        let lines = [];
        let shifts = 0;
        let sum = 0;
        
        for (let i = b.length - 1; i >= 0; i--) {
            if (b[i] === '1') {
                lines.push({ val: a, shift: shifts });
                sum += parseInt(a, 2) << shifts;
            } else {
                lines.push({ val: Array(a.length).fill('0').join(''), shift: shifts });
            }
            shifts++;
        }

        let resultStr = sum.toString(2);

        return (
            <div className="font-mono text-xl flex flex-col items-end gap-1 select-none">
                <div className="text-[#051F20] tracking-[0.5em]">{a}</div>
                <div className="text-[#051F20] tracking-[0.5em] border-b-2 border-slate-300 pb-2 flex gap-4">
                    <span>×</span>
                    <span>{b}</span>
                </div>
                
                {lines.map((l, i) => (
                    <div key={'l'+i} className="text-slate-600 tracking-[0.5em]" style={{ paddingRight: `${l.shift * 1.5}em` }}>
                        {l.val}
                    </div>
                ))}
                
                <div className="font-bold text-[#235347] tracking-[0.5em] border-t-2 border-slate-300 pt-2">
                    {resultStr}
                </div>
            </div>
        );
    };

    const renderContent = () => {
        if (!/^[01]+$/.test(num1) || !/^[01]+$/.test(num2)) {
            return <div className="text-red-500 mt-4 p-6 bg-red-50 rounded-xl">Please enter valid binary numbers (only 0 and 1).</div>;
        }

        return (
            <div className="mt-8 flex justify-center bg-slate-50 border border-slate-200 rounded-xl p-8 overflow-x-auto">
                {operation === '+' && renderAddition(num1, num2)}
                {operation === '-' && renderSubtraction(num1, num2)}
                {operation === '*' && renderMultiplication(num1, num2)}
                {operation === '/' && (
                    <div className="text-center font-mono">
                        <div className="text-lg mb-4 text-[#051F20]">
                            {num1} ÷ {num2}
                        </div>
                        <div className="bg-white p-4 rounded-lg border inline-block text-left">
                            <p>Quotient: <strong className="text-[#235347]">{Math.floor(parseInt(num1, 2) / parseInt(num2, 2)).toString(2)}</strong></p>
                            <p>Remainder: <strong className="text-blue-600">{(parseInt(num1, 2) % parseInt(num2, 2)).toString(2)}</strong></p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <Sigma className="w-6 h-6 text-[#235347]" />
                <h2 className="text-xl font-bold text-[#051F20]">Binary Arithmetic Visualizer</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Operand 1 (Binary)</label>
                    <input 
                        type="text" 
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#235347] font-mono text-lg transition-colors"
                    />
                </div>
                
                <div className="flex flex-col justify-end">
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase text-center">Operation</label>
                    <div className="flex gap-2 justify-center">
                        <Button 
                            variant={operation === '+' ? 'default' : 'outline'}
                            onClick={() => setOperation('+')}
                            className={cn("w-12 h-12 rounded-xl", operation === '+' && "bg-[#235347] hover:bg-[#163832]")}
                        >
                            <Plus className="w-5 h-5" />
                        </Button>
                        <Button 
                            variant={operation === '-' ? 'default' : 'outline'}
                            onClick={() => setOperation('-')}
                            className={cn("w-12 h-12 rounded-xl", operation === '-' && "bg-[#235347] hover:bg-[#163832]")}
                        >
                            <Minus className="w-5 h-5" />
                        </Button>
                        <Button 
                            variant={operation === '*' ? 'default' : 'outline'}
                            onClick={() => setOperation('*')}
                            className={cn("w-12 h-12 rounded-xl", operation === '*' && "bg-[#235347] hover:bg-[#163832]")}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                        <Button 
                            variant={operation === '/' ? 'default' : 'outline'}
                            onClick={() => setOperation('/')}
                            className={cn("w-12 h-12 rounded-xl", operation === '/' && "bg-[#235347] hover:bg-[#163832]")}
                        >
                            <Divide className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Operand 2 (Binary)</label>
                    <input 
                        type="text" 
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#235347] font-mono text-lg transition-colors"
                    />
                </div>
            </div>

            {renderContent()}
        </div>
    );
};
