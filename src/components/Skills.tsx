"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CheckCircle2, Activity, ShieldCheck, Cpu } from "lucide-react";
import studentData from "../../data/studentData.json";

interface Domain {
  name: string;
  category: string;
  energyLevel: number;
  description: string;
  features: string[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

export default function Skills() {
  const [activeDomain, setActiveDomain] = useState<number>(0);
  const domains = studentData.domains;

  return (
    <section id="skills" className="relative min-h-screen page-section px-6 max-w-5xl mx-auto z-10">
      {/* Ambient glow */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-indigo-600/4 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="space-y-12 relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="space-y-3 max-w-xl">
          <span className="text-[11px] font-medium tracking-widest text-indigo-400 uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> Curriculum Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Syllabus & Core Topics
          </h2>
          <div className="w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Domain Selectors */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-2">
            {domains.map((domain: Domain, index: number) => {
              const isActive = activeDomain === index;
              return (
                <motion.button
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  key={domain.name}
                  onClick={() => setActiveDomain(index)}
                  className={`group w-full text-left rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-500/[0.06] border border-indigo-500/25 shadow-lg shadow-indigo-500/5"
                      : "bg-white/[0.02] border border-white/[0.04] hover:border-white/8 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full transition-all duration-400"
                      style={{
                        backgroundColor: isActive ? "#6366f1" : "#374151",
                        boxShadow: isActive ? "0 0 8px rgba(99,102,241,0.5)" : "none"
                      }}
                    />
                    <div>
                      <h4 className={`font-bold text-sm tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}>
                        {domain.name}
                      </h4>
                      <span className="text-[9px] font-mono text-gray-600 tracking-wider block mt-0.5">{domain.category}</span>
                    </div>
                  </div>

                  <span className={`font-mono text-xs font-semibold transition-colors duration-300 ${isActive ? "text-indigo-400" : "text-gray-600"}`}>
                    {domain.energyLevel}%
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Detail Card */}
          <motion.div variants={itemVariants} className="lg:col-span-7 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeDomain}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="glass-panel rounded-2xl p-7 relative overflow-hidden h-full min-h-[420px] flex flex-col justify-between gap-6"
              >
                {/* Subtle glow */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-8 pointer-events-none bg-indigo-500" />

                <div className="space-y-5 relative z-10">
                  {/* Header */}
                  <div className="flex justify-between items-start border-b border-white/5 pb-5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-indigo-400 font-medium tracking-wider flex items-center gap-1.5">
                        <Activity className="w-3 h-3" />
                        Topic {String(activeDomain + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                        {domains[activeDomain].name}
                      </h3>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-gray-600 block mb-1">Strength</span>
                      <span className="text-2xl font-mono font-bold text-white">
                        {domains[activeDomain].energyLevel}%
                      </span>
                    </div>
                  </div>

                  {/* Description & Features */}
                  <div className="space-y-5">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {domains[activeDomain].description}
                    </p>

                    <div className="space-y-3">
                      <h5 className="text-[10px] font-mono text-gray-500 font-medium tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400/60" />
                        Core Topics
                      </h5>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {domains[activeDomain].features.map((feature: string, i: number) => (
                          <div 
                            key={i}
                            className="flex items-start gap-2 text-xs text-gray-400 bg-white/[0.03] p-3 rounded-lg border border-white/[0.04] hover:border-white/8 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400/70 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="pt-5 border-t border-white/5 relative z-10 mt-auto">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-600 mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                      Active
                    </span>
                    <span>Progress</span>
                  </div>
                  
                  <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${domains[activeDomain].energyLevel}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
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
