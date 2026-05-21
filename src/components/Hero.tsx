"use client";

import React from "react";
import studentData from "../../data/studentData.json";

export default function Hero() {
  const { name, class: className, aspirations, tagline, targets } = studentData.profile;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden z-10 px-6 max-w-7xl mx-auto space-grid">
      {/* Visual background vector flares representing field potentials */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "2s" }} />

      {/* Floating Mathematical Constants in the background */}
      <div className="absolute top-[20%] right-[15%] opacity-20 font-serif text-2xl italic text-cyan-400 select-none animate-float pointer-events-none formula-glow">
        G = 6.674 × 10⁻¹¹ m³ kg⁻¹ s⁻²
      </div>
      <div className="absolute bottom-[25%] left-[10%] opacity-25 font-serif text-3xl italic text-purple-400 select-none animate-float pointer-events-none formula-glow" style={{ animationDelay: "1.5s" }}>
        iℏ(∂/∂t)Ψ = ĤΨ
      </div>
      <div className="absolute top-[60%] right-[25%] opacity-15 font-serif text-4xl italic text-pink-500 select-none animate-float pointer-events-none formula-glow" style={{ animationDelay: "3s" }}>
        E = mc²
      </div>
      <div className="absolute top-[15%] left-[25%] opacity-20 font-serif text-xl italic text-slate-500 select-none animate-float pointer-events-none formula-glow" style={{ animationDelay: "4.5s" }}>
        ∇ × B = μ₀J + μ₀ε₀(∂E/∂t)
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
        {/* Textbook Profile Details Card (Left side) */}
        <div className="lg:col-span-7 text-left space-y-8 flex flex-col justify-center order-2 lg:order-1">
          <div className="inline-flex items-center space-x-2 bg-cyan-950/20 border border-cyan-500/20 px-4 py-1.5 rounded-full text-[10px] font-mono text-cyan-400 w-fit animate-float">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>ACADEMIC VECTOR // CLASS 11 INDUCTION</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-none text-white">
              {name}
            </h1>
            <div className="flex items-center space-x-3 text-cyan-400 font-mono text-xs font-semibold tracking-widest">
              <span>{className.toUpperCase()}</span>
              <span>•</span>
              <span>IPHO / IIT-JEE CANDIDATE</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {aspirations.map((asp: string, idx: number) => (
                <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-purple-950/30 border border-purple-500/20 text-purple-300">
                  {asp}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl font-sans">
            {tagline}
          </p>

          {/* Target Milestone Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {targets.map((target) => (
              <div 
                key={target.id}
                className="glass-panel border border-cyan-500/10 hover:border-cyan-500/30 rounded-xl p-4 bg-black/35 flex items-center justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-cyan-400/80 block uppercase">TARGET CORE</span>
                  <span className="font-bold text-sm sm:text-base text-white tracking-tight">{target.name}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-[9px] font-mono text-purple-400 font-semibold px-2 py-0.5 rounded-full bg-purple-950/40 border border-purple-500/25">
                    {target.timeline}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Academic Achievements Sub-Drawer */}
          <div className="border-t border-purple-500/10 pt-6 max-w-2xl space-y-3">
            <h4 className="text-[10px] font-mono tracking-widest text-gray-500 uppercase font-bold">
              ESTABLISHED VECTOR CREDENTIALS // BASELINE EXCELLENCE
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {studentData.profile.credentials.map((cred, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-purple-500/5 bg-purple-950/5 font-mono text-[9px] space-y-1">
                  <span className="text-purple-400 font-bold block">{cred.name.toUpperCase()}</span>
                  <span className="text-white block font-sans text-xs font-semibold">{cred.value}</span>
                  <span className="text-gray-500 block leading-tight">{cred.info}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => scrollToSection("books")}
              className="px-8 py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              BROWSE RESOURCE SHELF
            </button>
            
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider bg-black/40 hover:bg-black/60 text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/50 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              CALIBRATE CONNECTION
            </button>
          </div>
        </div>

        {/* Floating holographic atomic orbit graphic (Right side) */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] flex items-center justify-center">
            {/* Coordinate circles and axes */}
            <div className="absolute inset-0 border border-cyan-500/10 rounded-full animate-spin-slow" />
            <div className="absolute w-[80%] h-[80%] border border-dashed border-purple-500/10 rounded-full animate-spin-slower" style={{ animationDirection: "reverse" }} />
            
            {/* Holographic grid crosshairs */}
            <div className="absolute w-full h-[0.5px] bg-cyan-500/5" />
            <div className="absolute h-full w-[0.5px] bg-cyan-500/5" />

            {/* Electron shell nodes orbiting */}
            <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-cyan-500/15 animate-spin-slow" />
            <div className="absolute w-[50%] h-[50%] rounded-full border border-dotted border-purple-500/30 animate-spin-slower" style={{ animationDirection: "reverse" }} />

            {/* Main Center Atomic Element */}
            <svg
              viewBox="0 0 100 100"
              className="w-[60%] h-[60%] text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.45)] animate-float"
            >
              <defs>
                <linearGradient id="academicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              
              {/* Planetary / Atomic shell orbits */}
              <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="url(#academicGrad)" strokeWidth="0.5" transform="rotate(30, 50, 50)" strokeDasharray="3 3" />
              <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="url(#academicGrad)" strokeWidth="0.5" transform="rotate(150, 50, 50)" />
              <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="url(#academicGrad)" strokeWidth="0.5" transform="rotate(90, 50, 50)" strokeDasharray="2 1" />

              {/* Central high-density nucleus */}
              <circle cx="50" cy="50" r="7" fill="url(#academicGrad)" className="animate-pulse" />
              <circle cx="50" cy="50" r="2.5" fill="#ffffff" />
              
              {/* Electrons floating on pathways */}
              <circle cx="20" cy="33" r="2" fill="#ffffff" />
              <circle cx="80" cy="67" r="2.5" fill="#00f0ff" />
              <circle cx="50" cy="10" r="1.8" fill="#8b5cf6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
