"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Award, GraduationCap, ChevronRight, Zap } from "lucide-react";
import studentData from "../../data/studentData.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 50, damping: 15 },
  },
};

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
      {/* Background vector flares representing field potentials */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "2s" }} />

      {/* Floating Mathematical Constants in the background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute top-[20%] right-[15%] font-serif text-2xl italic text-cyan-400 select-none animate-float pointer-events-none formula-glow"
      >
        G = 6.674 × 10⁻¹¹ m³ kg⁻¹ s⁻²
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="absolute bottom-[25%] left-[10%] font-serif text-3xl italic text-purple-400 select-none animate-float pointer-events-none formula-glow" style={{ animationDelay: "1.5s" }}
      >
        iℏ(∂/∂t)Ψ = ĤΨ
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute top-[60%] right-[25%] font-serif text-4xl italic text-pink-500 select-none animate-float pointer-events-none formula-glow" style={{ animationDelay: "3s" }}
      >
        E = mc²
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
        {/* Textbook Profile Details Card (Left side) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 text-left space-y-8 flex flex-col justify-center order-2 lg:order-1"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-cyan-950/40 border border-cyan-500/30 px-4 py-1.5 rounded-full text-[10px] font-mono text-cyan-400 w-fit backdrop-blur-md">
            <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>ACADEMIC VECTOR // CLASS 11 INDUCTION</span>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-none text-white drop-shadow-lg">
              {name}
            </h1>
            <div className="flex items-center space-x-3 text-cyan-400 font-mono text-xs font-semibold tracking-widest">
              <span>{className.toUpperCase()}</span>
              <span>•</span>
              <span>IPHO / IIT-JEE CANDIDATE</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {aspirations.map((asp: string, idx: number) => (
                <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-500/30 text-purple-200 backdrop-blur-sm">
                  {asp}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl font-sans">
            {tagline}
          </motion.p>

          {/* Target Milestone Indicators */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {targets.map((target, idx) => (
              <motion.div 
                key={target.id}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative overflow-hidden rounded-xl border border-cyan-500/10 hover:border-cyan-400/40 bg-black/40 backdrop-blur-xl p-4 flex items-center justify-between transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center space-x-3">
                  <Target className="w-5 h-5 text-cyan-500 group-hover:text-cyan-300 transition-colors" />
                  <div>
                    <span className="text-[9px] font-mono text-cyan-400/80 block uppercase">TARGET CORE</span>
                    <span className="font-bold text-sm sm:text-base text-white tracking-tight">{target.name}</span>
                  </div>
                </div>
                <div className="relative z-10 text-right flex-shrink-0">
                  <span className="text-[9px] font-mono text-purple-400 font-semibold px-2 py-0.5 rounded-full bg-purple-950/50 border border-purple-500/30">
                    {target.timeline}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Academic Achievements Sub-Drawer */}
          <motion.div variants={itemVariants} className="border-t border-purple-500/20 pt-6 max-w-2xl space-y-3">
            <h4 className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold flex items-center">
              <Award className="w-3 h-3 mr-2 text-purple-400" />
              ESTABLISHED VECTOR CREDENTIALS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {studentData.profile.credentials.map((cred, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="p-3 rounded-lg border border-purple-500/10 hover:border-purple-500/30 bg-purple-950/20 backdrop-blur-md font-mono text-[9px] space-y-1 transition-colors"
                >
                  <span className="text-purple-300 font-bold block flex items-center">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    {cred.name.toUpperCase()}
                  </span>
                  <span className="text-white block font-sans text-xs font-semibold">{cred.value}</span>
                  <span className="text-gray-400 block leading-tight">{cred.info}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("books")}
              className="group px-8 py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 flex items-center"
            >
              BROWSE RESOURCE SHELF
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              CALIBRATE CONNECTION
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating holographic atomic orbit graphic (Right side) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] flex items-center justify-center">
            {/* Coordinate circles and axes */}
            <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-spin-slow shadow-[0_0_30px_rgba(6,182,212,0.1)]" />
            <div className="absolute w-[80%] h-[80%] border border-dashed border-purple-500/20 rounded-full animate-spin-slower" style={{ animationDirection: "reverse" }} />
            
            {/* Holographic grid crosshairs */}
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />

            {/* Electron shell nodes orbiting */}
            <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-cyan-500/20 animate-spin-slow" />
            <div className="absolute w-[50%] h-[50%] rounded-full border border-dotted border-purple-500/40 animate-spin-slower" style={{ animationDirection: "reverse" }} />

            {/* Main Center Atomic Element */}
            <svg
              viewBox="0 0 100 100"
              className="w-[60%] h-[60%] text-cyan-400 drop-shadow-[0_0_40px_rgba(6,182,212,0.6)] animate-float"
            >
              <defs>
                <linearGradient id="academicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              
              <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="url(#academicGrad)" strokeWidth="0.8" transform="rotate(30, 50, 50)" strokeDasharray="3 3" />
              <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="url(#academicGrad)" strokeWidth="0.8" transform="rotate(150, 50, 50)" />
              <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="url(#academicGrad)" strokeWidth="0.8" transform="rotate(90, 50, 50)" strokeDasharray="2 1" />

              <circle cx="50" cy="50" r="7" fill="url(#academicGrad)" className="animate-pulse" />
              <circle cx="50" cy="50" r="2.5" fill="#ffffff" />
              
              <circle cx="20" cy="33" r="2" fill="#ffffff" />
              <circle cx="80" cy="67" r="2.5" fill="#06b6d4" />
              <circle cx="50" cy="10" r="1.8" fill="#a855f7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
