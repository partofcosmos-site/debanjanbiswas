"use client";

import React from "react";
import CosmicBackground from "../components/CosmicBackground";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#04060a] text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* 60FPS Gravitational Orbit Physics Simulation backdrop */}
      <CosmicBackground />

      {/* Sticky Holographic Scientific Telemetry Header */}
      <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-cyan-500/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Insignia */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] animate-pulse" />
            <span className="font-mono text-xs font-extrabold tracking-[0.25em] text-white">
              DEBANJAN <span className="text-cyan-400">BISWAS</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("books")}
              className="text-[10px] font-mono font-bold tracking-widest text-gray-400 hover:text-cyan-300 transition-colors duration-300 cursor-pointer"
            >
              [ RESOURCES ]
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-[10px] font-mono font-bold tracking-widest text-gray-400 hover:text-purple-300 transition-colors duration-300 cursor-pointer"
            >
              [ SYLLABUS ]
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-[10px] font-mono font-bold tracking-widest text-gray-400 hover:text-pink-300 transition-colors duration-300 cursor-pointer"
            >
              [ LAB_COMMS ]
            </button>
          </nav>

          {/* System status coordinate node identifier */}
          <div className="flex items-center space-x-2 font-mono text-[8px] text-cyan-400/80 border border-cyan-500/20 px-3 py-1.5 rounded bg-black/40">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            <span className="hidden sm:inline">TELEMETRY_LOCKED // </span>
            <span>IPHO_AIR_100</span>
          </div>
        </div>
      </header>

      {/* Main Assembly Stream */}
      <main className="flex-grow flex flex-col relative z-10 pt-16">
        {/* Section 0: The Profile Welcome */}
        <Hero />

        {/* Section 1: Dynamic Resource Shelf */}
        <Projects />

        {/* Section 2: Stellar Concept Constellations */}
        <Skills />

        {/* Section 3: Lab Connection Console */}
        <Contact />
      </main>

      {/* Textbook copyright footer display */}
      <footer className="relative z-10 glass-panel border-t border-purple-500/10 py-8 bg-black/45 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[9px] text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/30" />
            <span>TRANSMITTING FREQUENCY: © {new Date().getFullYear()} DEBANJAN_BISWAS // STUDENT_PORTFOLIO</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <span>OLYMPIAD // JEE_PREPARATION_COGNATE</span>
            <span className="text-cyan-400 animate-pulse">CONNECTION // OPTIMAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


