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
    <section id="skills" className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto z-10">
      {/* Background radial potential visualizer */}
      <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-16 relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
            Curriculum
          </h2>
          <p className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Syllabus & Core Topics
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-6" />
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
                className={`group w-full text-left rounded-2xl p-5 flex items-center justify-between border cursor-pointer transition-colors transition-shadow duration-300 backdrop-blur-md ${
                  activeDomain === index
                    ? "border-indigo-500/50 bg-white/10 shadow-lg"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-500`}
                    style={{
                      backgroundColor: activeDomain === index ? currentColor : "#374151"
                    }}
                  />
                  <div>
                    <h4 className={`font-semibold text-lg transition-colors duration-300 ${activeDomain === index ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                      {domain.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`font-mono text-xs transition-colors duration-300 ${activeDomain === index ? "text-indigo-400" : "text-gray-500"}`}>
                    {domain.energyLevel}%
                  </span>
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
                className="rounded-3xl p-8 relative overflow-hidden min-h-[420px] flex flex-col justify-between border border-white/5 bg-white/[0.02] backdrop-blur-2xl"
              >
                {/* Minimal radial glow behind content */}
                <div
                  className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-1000 ${
                    activeDomain % 2 === 0 ? "bg-indigo-500" : "bg-purple-500"
                  }`}
                />

                <div className="space-y-8 relative z-10">
                  {/* Visualizer header */}
                  <div className="flex justify-between items-start border-b border-white/10 pb-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-indigo-400 font-semibold tracking-wider flex items-center">
                        <Activity className="w-3 h-3 mr-1" />
                        CONCEPT NODE // 0{activeDomain + 1}
                      </span>
                      <h3 className="text-3xl font-extrabold text-white tracking-tight">
                        {domains[activeDomain].name}
                      </h3>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-gray-400 block mb-1">CONCEPT INTEGRITY</span>
                      <span className="text-3xl font-mono font-extrabold text-white">
                        {domains[activeDomain].energyLevel}%
                      </span>
                    </div>
                  </div>

                  {/* Analytical details */}
                  <div className="space-y-6">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {domains[activeDomain].description}
                    </p>

                    {/* Core Topics list */}
                    <div className="space-y-4">
                      <h5 className="text-[9px] font-mono text-white/50 font-bold uppercase tracking-widest flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-2" />
                        ACTIVE DIRECTIVES
                      </h5>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {domains[activeDomain].features.map((feature: string, i: number) => (
                          <div 
                            key={i}
                            className="flex items-start space-x-2 text-xs text-gray-400 bg-white/5 p-3 rounded-lg border border-white/5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Index Bar */}
                <div className="pt-8 border-t border-white/10 mt-8 relative z-10">
                  <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 mb-2">
                    <span className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                      STATUS: ACTIVE
                    </span>
                    <span>PROGRESS_LEVEL</span>
                  </div>
                  
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${domains[activeDomain].energyLevel}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="h-full bg-indigo-500 rounded-full"
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
