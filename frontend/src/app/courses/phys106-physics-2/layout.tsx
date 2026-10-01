"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TOPICS = [
  { id: 'electric-fields', label: 'Ch 22. Electric Fields', path: '/courses/phys106-physics-2/electric-fields' },
  { id: 'gauss-law', label: 'Ch 23. Gauss’s Law', path: '/courses/phys106-physics-2/gauss-law' },
  { id: 'electric-potential', label: 'Ch 24. Electric Potential', path: '/courses/phys106-physics-2/electric-potential' },
  { id: 'capacitance', label: 'Ch 25. Capacitance', path: '/courses/phys106-physics-2/capacitance' },
  { id: 'current-and-resistance', label: 'Ch 26. Current & Resistance', path: '/courses/phys106-physics-2/current-and-resistance' },
  { id: 'dc-circuits', label: 'Ch 27. DC Circuits', path: '/courses/phys106-physics-2/dc-circuits' },
  { id: 'magnetic-fields', label: 'Ch 28. Magnetic Fields', path: '/courses/phys106-physics-2/magnetic-fields' },
  { id: 'magnetic-field-sources', label: 'Ch 29. Sources of B Field', path: '/courses/phys106-physics-2/magnetic-field-sources' },
  { id: 'faradays-law', label: 'Ch 30. Faraday’s Law', path: '/courses/phys106-physics-2/faradays-law' },
];

export default function PHYS106Layout({ children }: { children: React.ReactNode }) {
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
              <h1 className="text-xl font-extrabold text-[#051F20]">PHYS 106: Physics 2</h1>
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
      <div className="flex-1 max-w-7xl w-full mx-auto p-6">
        {children}
      </div>
    </div>
  );
}
