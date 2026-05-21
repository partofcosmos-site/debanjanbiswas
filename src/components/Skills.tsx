"use client";

import React, { useState } from "react";

interface Skill {
  name: string;
  category: string;
  energyLevel: number;
  description: string;
  features: string[];
  color: string;
  glowClass: string;
}

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<number>(0);

  const skills: Skill[] = [
    {
      name: "Next.js",
      category: "SYSTEM CORE",
      energyLevel: 95,
      description: "Advanced full-stack application development using App Router, Server Components, caching mechanisms, and optimal Static/Dynamic generation structures.",
      features: ["App Router Architecture", "Incremental Static Regeneration (ISR)", "Middleware & Edge Functions", "Turbopack Optimizations"],
      color: "#06b6d4",
      glowClass: "glow-cyan"
    },
    {
      name: "React 19",
      category: "INTERFACE CORE",
      energyLevel: 95,
      description: "Building immersive client user interfaces using React's declarative state engines, concurrent rendering, custom hooks, and the latest React 19 server actions.",
      features: ["Concurrent Features", "State Management & Actions", "Custom Hook Synthesis", "Ref & DOM Reconciliation"],
      color: "#8b5cf6",
      glowClass: "glow-purple"
    },
    {
      name: "TypeScript",
      category: "TYPE INTEGRITY",
      energyLevel: 90,
      description: "Ensuring codebase durability and architectural scaling through strict type checking, robust interface mapping, union types, and compiler optimizations.",
      features: ["Strict Type Protocols", "Generic Programming", "Decorators & Metadata", "ESLint Strict Alignment"],
      color: "#ec4899",
      glowClass: "glow-purple"
    },
    {
      name: "Tailwind CSS v4",
      category: "VISUAL STYLING",
      energyLevel: 92,
      description: "Fast-loading responsive layout orchestration. Leveraging the ultra-fast CSS compilation, custom theme inline systems, and fluid modern layouts.",
      features: ["Utility-First Layouts", "Custom Themes & Inlines", "Responsive Architecture", "High-performance CSS footprint"],
      color: "#06b6d4",
      glowClass: "glow-cyan"
    },
    {
      name: "Three.js / WebGL",
      category: "CANVAS GRAPHICS",
      energyLevel: 80,
      description: "Developing interactive 3D elements inside the browser, managing custom canvas animations, particle calculations, and math-based drift vectors.",
      features: ["Custom Shader Math", "Particle System Orchestration", "WebGL Canvas Integration", "Drift and Gravity physics"],
      color: "#ec4899",
      glowClass: "glow-purple"
    }
  ];

  return (
    <section id="skills" className="relative min-h-screen py-24 px-6 max-w-7xl mx-auto z-10">
      {/* Decorative cosmic nebula */}
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="space-y-16">
        {/* Section Title */}
        <div className="text-center space-y-4">
          <h2 className="text-sm font-mono tracking-[0.3em] text-purple-400 font-bold uppercase">
            TECHNICAL FREQUENCY
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Skill Constellation
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Orbital Selectors (Left / Top depending on screen) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {skills.map((skill, index) => (
              <button
                key={skill.name}
                onClick={() => setActiveSkill(index)}
                className={`glass-panel w-full text-left rounded-xl p-4 flex items-center justify-between border cursor-pointer ${
                  activeSkill === index
                    ? "border-cyan-500/40 bg-gradient-to-r from-cyan-950/20 to-purple-950/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    : "border-gray-800/40 bg-black/20 hover:border-gray-700/60"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full animate-pulse`}
                    style={{
                      backgroundColor: skill.color,
                      boxShadow: `0 0 10px ${skill.color}`
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-white tracking-tight">{skill.name}</h4>
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs text-gray-400">{skill.energyLevel}%</span>
                  <span className="font-mono text-[9px] text-gray-500 tracking-tighter">E_LVL</span>
                </div>
              </button>
            ))}
          </div>

          {/* Central Holographic Visualizer Card (Right / Bottom) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
              {/* Radial gradient glow in the card */}
              <div
                className="absolute -top-1/4 -right-1/4 w-80 h-80 rounded-full blur-[100px] transition-all duration-700 pointer-events-none opacity-40"
                style={{
                  backgroundColor: skills[activeSkill].color
                }}
              />

              {/* Holographic grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              <div className="space-y-8 relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-purple-500/10 pb-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
                      SYSTEM NODE // 0{activeSkill + 1}
                    </span>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">
                      {skills[activeSkill].name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-gray-500 block">COSMIC ENERGY LEVEL</span>
                    <span className="text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {skills[activeSkill].energyLevel}%
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="space-y-6">
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-sans">
                    {skills[activeSkill].description}
                  </p>

                  {/* Core Features list */}
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
                      Operative Directives
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {skills[activeSkill].features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-gray-300">
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

              {/* Progress Level bar */}
              <div className="pt-8 border-t border-purple-500/10 mt-8 relative z-10">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-2">
                  <span>ORBIT_STATUS: CONNECTED</span>
                  <span>BANDWIDTH: OPTIMAL</span>
                </div>
                <div className="w-full h-2.5 bg-black/60 rounded-full border border-gray-900 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-1000 ease-out"
                    style={{ width: `${skills[activeSkill].energyLevel}%` }}
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
