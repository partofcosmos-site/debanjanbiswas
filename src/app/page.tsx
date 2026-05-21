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
    <div className="relative min-h-screen bg-[#030308] text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* 60FPS Interactive Canvas Starfield */}
      <CosmicBackground />

      {/* Sticky Holographic Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-purple-500/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Insignia */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-5 h-5 rounded bg-gradient-to-tr from-cyan-400 to-purple-600 group-hover:rotate-45 transition-transform duration-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]" />
            <span className="font-mono text-sm font-extrabold tracking-[0.2em] text-white">
              PART OF <span className="text-cyan-400">COSMOS</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-xs font-mono font-medium tracking-widest text-gray-400 hover:text-cyan-300 transition-colors duration-300 cursor-pointer"
            >
              [ PROJECTS ]
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-xs font-mono font-medium tracking-widest text-gray-400 hover:text-purple-300 transition-colors duration-300 cursor-pointer"
            >
              [ SKILLS ]
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-xs font-mono font-medium tracking-widest text-gray-400 hover:text-pink-300 transition-colors duration-300 cursor-pointer"
            >
              [ TRANSMIT ]
            </button>
          </nav>

          {/* System status node identifier */}
          <div className="flex items-center space-x-2 font-mono text-[9px] text-purple-400/80 border border-purple-500/20 px-3 py-1 rounded bg-black/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">FREQUENCY_LOCKED // </span>
            <span>SEC_01</span>
          </div>
        </div>
      </header>

      {/* Main Assembly Stream */}
      <main className="flex-grow flex flex-col relative z-10 pt-16">
        {/* Section 0: The Hero Welcome */}
        <Hero />

        {/* Section 1: Dynamic Project Showcase */}
        <Projects />

        {/* Section 2: Stellar Skills Constellation */}
        <Skills />

        {/* Section 3: Quantum Contact Terminal */}
        <Contact />
      </main>

      {/* Futuristic footer terminal display */}
      <footer className="relative z-10 glass-panel border-t border-purple-500/10 py-8 bg-black/45 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
            <span>TRANSMITTING FREQUENCY: © {new Date().getFullYear()} PART_OF_COSMOS</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <span>COSMIC_COORD // LAT.540F_LNG.4618</span>
            <span className="text-cyan-400 animate-pulse">CONNECTION // STABLE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

