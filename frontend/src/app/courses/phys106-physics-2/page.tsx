"use client";

import React from 'react';
import Link from 'next/link';

export default function PHYS106LandingPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 md:p-12 border-b border-slate-100 bg-gradient-to-br from-[#F4F7F5] to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            {/* Simple abstract physics atom icon */}
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"></ellipse>
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"></ellipse>
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#051F20] tracking-tight mb-4 relative z-10">
            Physics 2 <span className="text-[#235347] font-light">| PHYS 106</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed relative z-10">
            Welcome to the Physics 2 module! This course covers Electromagnetism, including Electric Fields, Gauss's Law, Electric Potential, Capacitance, DC Circuits, Magnetic Fields, and Faraday's Law.
          </p>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Course Modules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ModuleCard 
              title="Ch 22. Electric Fields" 
              desc="Understand electric charges, Coulomb's law, and how to calculate electric fields for discrete and continuous charge distributions."
              href="/courses/phys106-physics-2/electric-fields" 
            />
            <ModuleCard 
              title="Ch 23. Gauss's Law" 
              desc="Learn about electric flux and how to apply Gauss's Law for highly symmetric charge distributions using 3D visualizations."
              href="/courses/phys106-physics-2/gauss-law" 
            />
            <ModuleCard 
              title="Ch 24. Electric Potential" 
              desc="Explore electric potential energy, potential difference, and how potential relates to the electric field."
              href="/courses/phys106-physics-2/electric-potential" 
            />
            <ModuleCard 
              title="Ch 25. Capacitance" 
              desc="Study capacitors, dielectrics, and energy stored in an electric field."
              href="/courses/phys106-physics-2/capacitance" 
            />
            <ModuleCard 
              title="Ch 26. Current & Resistance" 
              desc="Dive into electric current, Ohm's law, resistivity, and electrical power."
              href="/courses/phys106-physics-2/current-and-resistance" 
            />
            <ModuleCard 
              title="Ch 27. DC Circuits" 
              desc="Analyze direct-current circuits using Kirchhoff's rules and study RC circuits."
              href="/courses/phys106-physics-2/dc-circuits" 
            />
            <ModuleCard 
              title="Ch 28. Magnetic Fields" 
              desc="Visualize magnetic fields, magnetic force on moving charges, and the Hall effect."
              href="/courses/phys106-physics-2/magnetic-fields" 
            />
            <ModuleCard 
              title="Ch 29. Sources of B Field" 
              desc="Calculate magnetic fields using the Biot-Savart Law and Ampere's Law."
              href="/courses/phys106-physics-2/magnetic-field-sources" 
            />
            <ModuleCard 
              title="Ch 30. Faraday's Law" 
              desc="Understand magnetic induction, Lenz's law, and induced EMF."
              href="/courses/phys106-physics-2/faradays-law" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ title, desc, href }: { title: string, desc: string, href: string }) {
  return (
    <Link href={href} className="group block h-full">
      <div className="bg-white border border-slate-200 rounded-xl p-5 h-full transition-all duration-300 hover:border-[#235347] hover:shadow-md hover:-translate-y-1 flex flex-col">
        <h3 className="font-bold text-slate-800 group-hover:text-[#235347] transition-colors mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1">{desc}</p>
        <div className="mt-4 flex items-center text-[#235347] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          İncele
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
