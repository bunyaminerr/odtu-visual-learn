"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, XCircle } from 'lucide-react';

export function StackApplications() {
  const [activeApp, setActiveApp] = useState<'parenthesis' | 'palindrome'>('parenthesis');
  
  // App 1: Parentheses Matching
  const [expr, setExpr] = useState<string>('{[()]}');
  const [parStep, setParStep] = useState(0);
  const [parStack, setParStack] = useState<string[]>([]);
  const [parStatus, setParStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  
  // App 2: Palindrome
  const [palText, setPalText] = useState<string>('racecar');
  const [palStep, setPalStep] = useState(0);
  const [palPhase, setPalPhase] = useState<'push' | 'compare' | 'done'>('push');
  const [palStack, setPalStack] = useState<string[]>([]);
  const [palStatus, setPalStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  // Logic for Parentheses Matching
  const simulateParenthesis = () => {
    let stack: string[] = [];
    let valid = true;
    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      if (char === '(' || char === '{' || char === '[') {
        stack.push(char);
      } else if (char === ')' || char === '}' || char === ']') {
        if (stack.length === 0) { valid = false; break; }
        const top = stack.pop();
        if ((char === ')' && top !== '(') ||
            (char === '}' && top !== '{') ||
            (char === ']' && top !== '[')) {
          valid = false;
          break;
        }
      }
    }
    if (stack.length > 0) valid = false;
    
    setParStack(stack);
    setParStatus(valid ? 'valid' : 'invalid');
  };

  const handleParRun = () => {
    simulateParenthesis();
  };

  // Logic for Palindrome Check
  const simulatePalindrome = () => {
    const cleanStr = palText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let valid = true;
    let stack: string[] = [];
    
    // Push half or all
    for (let i = 0; i < cleanStr.length; i++) {
      stack.push(cleanStr[i]);
    }

    let reversed = '';
    while (stack.length > 0) {
      reversed += stack.pop();
    }

    if (reversed === cleanStr) valid = true;
    else valid = false;

    setPalStatus(valid ? 'valid' : 'invalid');
  };

  const handlePalRun = () => {
    simulatePalindrome();
  };

  return (
    <div className="flex flex-col gap-8 h-full bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      
      {/* App Selector */}
      <div className="flex gap-4 border-b border-slate-200 pb-4">
        <button 
          onClick={() => { setActiveApp('parenthesis'); setParStatus('idle'); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeApp === 'parenthesis' ? 'bg-[#235347] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          1. Parenthesis Matching (Worksheet 6a)
        </button>
        <button 
          onClick={() => { setActiveApp('palindrome'); setPalStatus('idle'); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeApp === 'palindrome' ? 'bg-[#235347] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          2. Palindrome Checker (Worksheet 6b)
        </button>
      </div>

      {activeApp === 'parenthesis' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-[#051F20]">Parantez Eşleştirme (Parenthesis Matching)</h3>
            <p className="text-sm text-slate-600">
              Stack'in en yaygın kullanım alanlarından biridir. Bir ifade içerisindeki açılan parantezlerin ( <code>{'( { ['}</code> ) 
              doğru sırada kapanıp kapanmadığını ( <code>{') } ]'}</code> ) kontrol etmek için açılanları Stack'e atar, kapananlar gelince Stack'ten çıkarıp kontrol ederiz.
            </p>
          </div>
          
          <div className="flex items-end gap-4">
            <div className="flex flex-col gap-1 w-full max-w-sm">
              <label className="text-sm font-semibold text-slate-700">İfadeyi Girin:</label>
              <input 
                type="text" 
                value={expr}
                onChange={e => setExpr(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#235347]"
              />
            </div>
            <button 
              onClick={handleParRun}
              className="px-6 py-2 bg-[#235347] text-white font-medium rounded-lg hover:bg-[#1a3d34] transition-colors"
            >
              Test Et
            </button>
          </div>

          {parStatus !== 'idle' && (
            <div className={`p-4 rounded-xl border ${parStatus === 'valid' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} flex items-center gap-3`}>
              {parStatus === 'valid' ? <CheckCircle2 className="text-green-600" /> : <XCircle className="text-red-600" />}
              <span className="font-semibold text-lg">
                {parStatus === 'valid' ? 'Parantezler Hatasız (Valid)!' : 'Parantez Hatası (Invalid)! Mismatch veya kapanmayan parantez.'}
              </span>
            </div>
          )}
        </div>
      )}

      {activeApp === 'palindrome' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-[#051F20]">Palindrom Kontrolü (Palindrome Checker)</h3>
            <p className="text-sm text-slate-600">
              Bir kelimenin tersten okunuşu kendisiyle aynıysa Palindromdur. Worksheet 6b Soru 7'ye göre, cümleyi harf harf Stack'e atıp
              geri çıkardığımızda elde ettiğimiz string (ters çevrilmiş hali), baştaki string ile aynı ise kelime palindromdur.
            </p>
          </div>
          
          <div className="flex items-end gap-4">
            <div className="flex flex-col gap-1 w-full max-w-md">
              <label className="text-sm font-semibold text-slate-700">Cümle veya Kelime Girin:</label>
              <input 
                type="text" 
                value={palText}
                onChange={e => setPalText(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#235347]"
                placeholder="Örn: racecar"
              />
            </div>
            <button 
              onClick={handlePalRun}
              className="px-6 py-2 bg-[#235347] text-white font-medium rounded-lg hover:bg-[#1a3d34] transition-colors"
            >
              Kontrol Et
            </button>
          </div>

          {palStatus !== 'idle' && (
            <div className={`p-4 rounded-xl border ${palStatus === 'valid' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} flex items-center gap-3`}>
              {palStatus === 'valid' ? <CheckCircle2 className="text-green-600" /> : <XCircle className="text-red-600" />}
              <span className="font-semibold text-lg">
                {palStatus === 'valid' ? 'Bu ifade bir PALİNDROM!' : 'Bu ifade Palindrom DEĞİL!'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
