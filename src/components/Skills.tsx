"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, CheckCircle2, Activity, ShieldCheck } from "lucide-react";
import studentData from "../../data/studentData.json";

interface Domain {
  name: string;
  category: string;
  energyLevel: number;
  description: string;
  features: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

export default function Skills() {
  const [activeDomain, setActiveDomain] = useState<number>(0);
  const domains = studentData.domains;

  const colors = ["#06b6d4", "#8b5cf6", "#ec4899", "#06b6d4", "#8b5cf6"];
  const currentColor = colors[activeDomain % colors.length];

  return (
    <section id="skills" className="relative min-h-screen py-24 px-6 max-w-7xl mx-auto z-10 space-grid">
      {/* Background radial potential visualizer */}
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[130px] pointer-events-none animate-pulse-slow" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-16 relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h2 className="text-xs font-mono tracking-[0.3em] text-purple-400 font-bold uppercase flex items-center justify-center">
            <Atom className="w-4 h-4 mr-2" />
            OLYMPIAD SYLLABUS
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
            Physics Concept Constellations
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Orbital Selectors (Left side) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col space-y-3">
            {domains.map((domain: Domain, index: number) => (
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                key={domain.name}
                onClick={() => setActiveDomain(index)}
                className={`group w-full text-left rounded-xl p-4 flex items-center justify-between border cursor-pointer transition-all duration-300 backdrop-blur-md ${
                  activeDomain === index
                    ? "border-cyan-500/50 bg-gradient-to-r from-cyan-950/40 to-purple-950/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    : "border-gray-800/50 bg-black/40 hover:border-cyan-500/30 hover:bg-black/60"
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Glowing atomic dot */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${activeDomain === index ? "animate-pulse" : ""}`}
                    style={{
                      backgroundColor: activeDomain === index ? currentColor : "#374151",
                      boxShadow: activeDomain === index ? `0 0 10px ${currentColor}` : "none"
                    }}
                  />
                  <div>
                    <h4 className={`font-bold text-sm sm:text-base tracking-tight font-serif transition-colors duration-300 ${activeDomain === index ? "text-white" : "text-gray-400 group-hover:text-cyan-300"}`}>
                      {domain.name}
                    </h4>
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider">
                      {domain.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`font-mono text-xs transition-colors duration-300 ${activeDomain === index ? "text-cyan-300" : "text-gray-500"}`}>
                    {domain.energyLevel}%
                  </span>
                  <span className="font-mono text-[9px] text-gray-600 tracking-tighter hidden sm:block">PREP_INDEX</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Central Holographic Visualizer Card (Right side) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeDomain}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden min-h-[420px] flex flex-col justify-between border border-cyan-500/10 bg-black/50 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              >
                {/* Radial gradient glow behind content */}
                <div
                  className="absolute -top-1/4 -right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20 transition-colors duration-700"
                  style={{ backgroundColor: currentColor }}
                />

                {/* Holographic grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

                <div className="space-y-8 relative z-10">
                  {/* Visualizer header */}
                  <div className="flex justify-between items-start border-b border-purple-500/20 pb-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider flex items-center">
                        <Activity className="w-3 h-3 mr-1" />
                        CONCEPT NODE // 0{activeDomain + 1}
                      </span>
                      <h3 className="text-3xl font-extrabold text-white tracking-tight font-serif drop-shadow-lg">
                        {domains[activeDomain].name}
                      </h3>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-gray-400 block mb-1">CONCEPT INTEGRITY</span>
                      <span className="text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-sm">
                        {domains[activeDomain].energyLevel}%
                      </span>
                    </div>
                  </div>

                  {/* Analytical details */}
                  <div className="space-y-6">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                      {domains[activeDomain].description}
                    </p>

                    {/* Core Topics list */}
                    <div className="space-y-4">
                      <h5 className="text-[9px] font-mono text-purple-400 font-bold uppercase tracking-widest flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-2" />
                        ACTIVE DIRECTIVES // PROBLEMS SOLVED
                      </h5>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {domains[activeDomain].features.map((feature: string, i: number) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="flex items-start space-x-2 text-xs text-gray-300 bg-black/40 p-2 rounded-lg border border-white/5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Index Bar */}
                <div className="pt-8 border-t border-purple-500/20 mt-8 relative z-10">
                  <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 mb-2">
                    <span className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse shadow-[0_0_5px_#22c55e]" />
                      ORBIT_STATUS: CONNECTED
                    </span>
                    <span>PREPARATION INDEX</span>
                  </div>
                  
                  <div className="w-full h-2 bg-black/80 rounded-full border border-gray-800 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${domains[activeDomain].energyLevel}%` }}
                      transition={{ duration: 1, delay: 0.2, type: "spring" }}
                      className="absolute left-0 top-0 bottom-0 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                      style={{ 
                        background: `linear-gradient(90deg, ${colors[activeDomain % colors.length]}, #a855f7)` 
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
