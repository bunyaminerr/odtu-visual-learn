"use client";

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SNIPPETS = [
  {
    id: 'o1',
    name: 'O(1) - Sabit Zaman',
    code: `void printFirst(int arr[]) {\n  printf("%d", arr[0]); // O(1)\n}`,
    explanation: "Dizinin boyutu ne olursa olsun, sadece 0. indekse erişilir. İşlem sayısı N'ye bağlı değildir.",
    complexity: 'O(1)',
    color: 'text-green-500'
  },
  {
    id: 'on',
    name: 'O(N) - Doğrusal Zaman',
    code: `void printAll(int arr[], int n) {\n  for (int i = 0; i < n; i++) {\n    printf("%d", arr[i]); // N kere çalışır\n  }\n}`,
    explanation: "Döngü 0'dan N'e kadar döner. Dizideki her eleman için 1 işlem yapılır. Toplam N işlem.",
    complexity: 'O(N)',
    color: 'text-yellow-600'
  },
  {
    id: 'on2',
    name: 'O(N²) - Karesel Zaman',
    code: `void printPairs(int arr[], int n) {\n  for (int i = 0; i < n; i++) {       // N kere\n    for (int j = 0; j < n; j++) {     // N kere\n      printf("%d, %d", arr[i], arr[j]); // N * N kere\n    }\n  }\n}`,
    explanation: 'İç içe iki döngü vardır. Dıştaki döngü N kere, içteki döngü de her seferinde N kere çalışır. Toplam işlem sayısı N x N = N² olur.',
    complexity: 'O(N²)',
    color: 'text-red-500'
  },
  {
    id: 'ologn',
    name: 'O(log N) - Logaritmik Zaman',
    code: `void halve(int n) {\n  for (int i = n; i > 0; i = i / 2) {\n    printf("%d", i); // Her adımda yarıya düşer\n  }\n}`,
    explanation: "Döngü değişkeni her adımda 2'ye bölünür. Örneğin N=16 için i sırasıyla 16, 8, 4, 2, 1 olur (5 adım). Yani N büyüse bile adım sayısı çok yavaş artar.",
    complexity: 'O(log N)',
    color: 'text-blue-500'
  },
  {
    id: 'on_m',
    name: 'O(N + M) - Ardışık Döngüler',
    code: `void printTwoArrays(int a[], int n, int b[], int m) {\n  for (int i = 0; i < n; i++) {\n    printf("%d", a[i]); // N kere\n  }\n  for (int j = 0; j < m; j++) {\n    printf("%d", b[j]); // M kere\n  }\n}`,
    explanation: 'Ardışık döngüler çarpılmaz, toplanır. Birinci döngü N kere, ikinci döngü M kere döner. İç içe olmadıkları için karmaşıklık O(N + M) olur.',
    complexity: 'O(N + M)',
    color: 'text-orange-500'
  }
];

export function LoopAnalyzer() {
  const [activeSnippet, setActiveSnippet] = useState(SNIPPETS[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* List of snippets */}
      <div className="lg:col-span-1 flex flex-col gap-3">
        <h3 className="font-semibold text-[#051F20] mb-2">Kod Örnekleri</h3>
        {SNIPPETS.map(snippet => (
          <button
            key={snippet.id}
            onClick={() => setActiveSnippet(snippet)}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeSnippet.id === snippet.id
                ? 'bg-white border-[#235347] shadow-sm ring-1 ring-[#235347]'
                : 'bg-transparent border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="font-medium text-sm text-slate-800">{snippet.name}</div>
          </button>
        ))}
      </div>

      {/* Code Viewer and Explanation */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg border border-slate-700">
          <div className="bg-[#2D2D2D] px-4 py-2 border-b border-slate-600 flex items-center">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="ml-4 text-xs font-mono text-slate-400">example.c</span>
          </div>
          <div className="p-4 text-sm">
            <SyntaxHighlighter
              language="c"
              style={vscDarkPlus}
              customStyle={{ margin: 0, background: 'transparent' }}
            >
              {activeSnippet.code}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-[#051F20] mb-4">Analiz & Sonuç</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {activeSnippet.explanation}
          </p>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-sm font-medium text-slate-500">Zaman Karmaşıklığı (Time Complexity):</div>
            <div className={`text-2xl font-bold font-mono tracking-tight ${activeSnippet.color}`}>
              {activeSnippet.complexity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
