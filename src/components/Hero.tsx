"use client";

import React from "react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden z-10 px-6 max-w-7xl mx-auto">
      {/* Decorative Glow Orbs in the background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Text Section */}
        <div className="lg:col-span-7 text-left space-y-8 flex flex-col justify-center order-2 lg:order-1">
          <div className="inline-flex items-center space-x-2 bg-purple-950/30 border border-purple-500/25 px-4 py-1.5 rounded-full text-xs font-mono text-purple-300 w-fit animate-float">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>TRANSMITTING PORTFOLIO FROM SECTOR 01</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-none">
            Part of
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 glow-text-purple">
              Cosmos
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl font-sans max-w-xl leading-relaxed">
            Full-stack software architect designing applications across the digital void. Specialize in Next.js, immersive interfaces, and optimized performance systems.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3.5 rounded-xl font-mono text-sm font-semibold tracking-wide bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              EXPLORE PROJECTS
            </button>
            
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3.5 rounded-xl font-mono text-sm font-semibold tracking-wide bg-black/40 hover:bg-black/60 text-purple-300 border border-purple-500/30 hover:border-purple-500/60 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              TRANSMIT SIGNAL
            </button>
          </div>
        </div>

        {/* Abstract Graphic Section */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] flex items-center justify-center">
            {/* Background glowing circles */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-full animate-spin-slow border border-cyan-500/10" />
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-bl from-purple-500/5 to-pink-500/5 rounded-full animate-spin-slower border border-purple-500/10" />
            
            {/* Orbit rings */}
            <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-purple-500/20 animate-spin-slow" />
            <div className="absolute w-[60%] h-[60%] rounded-full border border-dotted border-cyan-500/35 animate-spin-slower" style={{ animationDirection: "reverse" }} />

            {/* Glowing planetary nodes */}
            <div className="absolute top-1/2 left-0 w-4 h-4 bg-cyan-400 rounded-full glow-cyan animate-bounce" style={{ transform: "translateY(-50%)", animationDuration: "3s" }} />
            <div className="absolute bottom-6 right-10 w-3 h-3 bg-pink-500 rounded-full glow-purple animate-pulse" />

            {/* Main Center Constellation Element */}
            <svg
              viewBox="0 0 100 100"
              className="w-[70%] h-[70%] text-purple-400 drop-shadow-[0_0_30px_rgba(139,92,246,0.55)] animate-float"
            >
              <defs>
                <linearGradient id="cosmicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              {/* Stars connected in a constellation */}
              <line x1="20" y1="50" x2="50" y2="20" stroke="url(#cosmicGrad)" strokeWidth="0.75" strokeDasharray="2 1" />
              <line x1="50" y1="20" x2="80" y2="50" stroke="url(#cosmicGrad)" strokeWidth="0.75" />
              <line x1="80" y1="50" x2="60" y2="80" stroke="url(#cosmicGrad)" strokeWidth="0.75" strokeDasharray="3 2" />
              <line x1="60" y1="80" x2="40" y2="80" stroke="url(#cosmicGrad)" strokeWidth="0.75" />
              <line x1="40" y1="80" x2="20" y2="50" stroke="url(#cosmicGrad)" strokeWidth="0.75" />
              <line x1="20" y1="50" x2="50" y2="50" stroke="url(#cosmicGrad)" strokeWidth="0.5" />
              <line x1="50" y1="20" x2="50" y2="50" stroke="url(#cosmicGrad)" strokeWidth="0.5" />
              <line x1="80" y1="50" x2="50" y2="50" stroke="url(#cosmicGrad)" strokeWidth="0.5" />

              {/* Stellar nodes */}
              <circle cx="50" cy="20" r="4.5" fill="#ffffff" className="animate-pulse" />
              <circle cx="50" cy="20" r="2" fill="#8b5cf6" />
              
              <circle cx="20" cy="50" r="3.5" fill="#00f0ff" />
              <circle cx="80" cy="50" r="3.5" fill="#ec4899" />
              
              <circle cx="60" cy="80" r="3" fill="#ffffff" />
              <circle cx="40" cy="80" r="3.5" fill="#00f0ff" />

              <circle cx="50" cy="50" r="6" fill="url(#cosmicGrad)" />
              <circle cx="50" cy="50" r="2" fill="#ffffff" />
            </svg>
          </div>
        </div>
      </div>

      {/* Downward navigation indicator */}
      <div className="absolute bottom-6 flex flex-col items-center space-y-2 cursor-pointer" onClick={() => scrollToSection("projects")}>
        <span className="font-mono text-[10px] text-gray-500 tracking-[0.25em]">SCROLL ORBIT</span>
        <div className="w-5 h-9 rounded-full border border-gray-700 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDuration: "2s" }} />
        </div>
      </div>
    </section>
  );
}
