"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import studentData from "../../data/studentData.json";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  }),
};

export default function Hero() {
  const { name, class: className, tagline } = studentData.profile;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden px-6">
      {/* Elegant Background Gradients */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen opacity-60 translate-x-1/4 -translate-y-1/4 animate-pulse-slow" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen opacity-60 -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 pt-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Status Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium text-gray-300 mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>IPhO & IIT-JEE Candidate • Class {className}</span>
          </motion.div>

          {/* Main Typography */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-normal text-white mb-6 leading-snug"
          >
            Decoding the mechanics of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">universe.</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {tagline} I am {name}, an aspiring physicist and engineer driven by a relentless curiosity to understand reality at its fundamental level.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto"
          >
            <Link href="/resources" className="w-full sm:w-auto">
              <button className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center">
                Explore Resources
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <Link href="/syllabus" className="w-full sm:w-auto">
              <button className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors flex items-center justify-center backdrop-blur-md">
                <FileText className="w-4 h-4 mr-2 text-gray-400 group-hover:text-white transition-colors" />
                View Syllabus
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Minimal Decorative Grid line */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
          className="mt-24 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>
    </section>
  );
}
