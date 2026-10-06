"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TOPICS = [
  { id: 'matrix-elimination', label: '1.1 & 1.2 Matrix Elimination', path: '/courses/math260-linear-algebra/matrix-elimination' },
  { id: 'matrices-and-inverses', label: '1.3 & 1.4 Matrices, Operations, Inverses', path: '/courses/math260-linear-algebra/matrices-and-inverses' },
  { id: 'questions', label: 'Questions & Proofs', path: '/courses/math260-linear-algebra/questions' },
];

export default function Math260Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F4F7F5] font-sans flex flex-col">
      {/* Sticky Header with Navigation Pills */}
      <div className="sticky top-0 z-50 bg-[#F4F7F5]/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-1.5 -ml-1.5 text-slate-400 hover:text-[#235347] transition-colors rounded-lg hover:bg-slate-100 flex items-center justify-center group" title="Ana Menüye Dön">
                <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              </Link>
              <h1 className="text-xl font-extrabold text-[#051F20]">MATH 260: Basic Linear Algebra</h1>
            </div>
            
            <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
              {TOPICS.map((topic) => {
                const isActive = pathname.startsWith(topic.path);
                return (
                  <Link
                    key={topic.id}
                    href={topic.path}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#235347] text-white shadow-sm ring-2 ring-[#235347]/20'
                        : 'bg-white text-[#051F20] border border-slate-200 hover:bg-[#DAF1DE]'
                    }`}
                  >
                    {topic.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        <div 
          className="absolute inset-0 z-0 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.4
          }}
        />
        <div className="relative z-10 w-full h-full p-6 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
