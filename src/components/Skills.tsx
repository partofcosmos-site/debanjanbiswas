"use client";

import React, { useState } from "react";
import studentData from "../../data/studentData.json";

interface Domain {
  name: string;
  category: string;
  energyLevel: number;
  description: string;
  features: string[];
}

export default function Skills() {
  const [activeDomain, setActiveDomain] = useState<number>(0);
  const domains = studentData.domains;

  const colors = ["#06b6d4", "#8b5cf6", "#ec4899", "#06b6d4", "#8b5cf6"];

  return (
    <section id="skills" className="relative min-h-screen py-24 px-6 max-w-7xl mx-auto z-10 space-grid">
      {/* Background radial potential visualizer */}
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-xs font-mono tracking-[0.3em] text-purple-400 font-bold uppercase">
            OLYMPIAD SYLLABUS
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Physics Concept Constellations
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Orbital Selectors (Left side) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {domains.map((domain: Domain, index: number) => (
              <button
                key={domain.name}
                onClick={() => setActiveDomain(index)}
                className={`glass-panel w-full text-left rounded-xl p-4 flex items-center justify-between border cursor-pointer transition-all duration-350 ${
                  activeDomain === index
                    ? "border-cyan-500/40 bg-gradient-to-r from-cyan-950/20 to-purple-950/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    : "border-gray-800/40 bg-black/25 hover:border-gray-700/60"
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Glowing atomic dot */}
                  <div
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{
                      backgroundColor: colors[index % colors.length],
                      boxShadow: `0 0 10px ${colors[index % colors.length]}`
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-white tracking-tight font-serif">{domain.name}</h4>
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider">
                      {domain.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs text-gray-300">{domain.energyLevel}%</span>
                  <span className="font-mono text-[9px] text-gray-500 tracking-tighter">PREP_INDEX</span>
                </div>
              </button>
            ))}
          </div>

          {/* Central Holographic Visualizer Card (Right side) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
              {/* Radial gradient glow behind content */}
              <div
                className="absolute -top-1/4 -right-1/4 w-80 h-80 rounded-full blur-[110px] transition-all duration-700 pointer-events-none opacity-30"
                style={{
                  backgroundColor: colors[activeDomain % colors.length]
                }}
              />

              {/* Holographic grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.015)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none" />

              <div className="space-y-8 relative z-10">
                {/* Visualizer header */}
                <div className="flex justify-between items-start border-b border-purple-500/10 pb-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider">
                      CONCEPT NODE // 0{activeDomain + 1}
                    </span>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight font-serif">
                      {domains[activeDomain].name}
                    </h3>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-gray-500 block">CONCEPT INTEGRITY</span>
                    <span className="text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {domains[activeDomain].energyLevel}%
                    </span>
                  </div>
                </div>

                {/* Analytical details */}
                <div className="space-y-6">
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-sans">
                    {domains[activeDomain].description}
                  </p>

                  {/* Core Topics list */}
                  <div className="space-y-3">
                    <h5 className="text-[9px] font-mono text-purple-400 font-bold uppercase tracking-widest">
                      ACTIVE DIRECTIVES // PROBLEMS SOLVED
                    </h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {domains[activeDomain].features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-gray-300">
                          {/* Dotted vector outline check */}
                          <svg
                            className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Index Bar */}
              <div className="pt-8 border-t border-purple-500/10 mt-8 relative z-10">
                <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mb-2">
                  <span>ORBIT_STATUS: CONNECTED</span>
                  <span>PREPARATION INDEX</span>
                </div>
                
                <div className="w-full h-2.5 bg-black/60 rounded-full border border-gray-900 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all duration-1000 ease-out"
                    style={{ width: `${domains[activeDomain].energyLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
