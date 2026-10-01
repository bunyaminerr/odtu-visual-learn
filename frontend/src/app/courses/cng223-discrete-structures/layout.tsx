"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TOPICS = [
  { id: 'logic-and-proofs', label: '1. Logic and Proofs', path: '/courses/cng223-discrete-structures/logic-and-proofs' },
  { id: 'sets-and-functions', label: '2. Sets and Functions', path: '/courses/cng223-discrete-structures/sets-and-functions' },
  { id: 'algorithms-integers-matrices', label: '3. Algorithms, Integers, Matrices', path: '/courses/cng223-discrete-structures/algorithms-integers-matrices' },
  { id: 'induction-and-recursion', label: '4. Induction and Recursion', path: '/courses/cng223-discrete-structures/induction-and-recursion' },
  { id: 'counting', label: '5. Counting', path: '/courses/cng223-discrete-structures/counting' },
  { id: 'advanced-counting', label: '6. Advanced Counting Techniques', path: '/courses/cng223-discrete-structures/advanced-counting' },
  { id: 'relations', label: '7. Relations', path: '/courses/cng223-discrete-structures/relations' },
  { id: 'graphs', label: '8. Graphs', path: '/courses/cng223-discrete-structures/graphs' },
  { id: 'trees', label: '9. Trees', path: '/courses/cng223-discrete-structures/trees' },
  { id: 'discrete-probability', label: '10. Discrete Probability', path: '/courses/cng223-discrete-structures/discrete-probability' },
  { id: 'exams', label: '🎓 Exam Hub', path: '/courses/cng223-discrete-structures/exams' },
];

export default function CNG223Layout({ children }: { children: React.ReactNode }) {
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
              <h1 className="text-xl font-extrabold text-[#051F20]">CNG 223: Discrete Structures</h1>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => {
                const isActive = pathname.startsWith(topic.path);
                return (
                  <Link
                    key={topic.id}
                    href={topic.path}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
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
        {/* Abstract Background for all child pages */}
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
