"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, GraduationCap, Atom, Telescope, BookOpen } from "lucide-react";
import Link from "next/link";
import studentData from "../../data/studentData.json";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  const { name, class: className, credentials } = studentData.profile;

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 pt-32 pb-20">
      {/* Soft background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[140px] top-[10%] right-[15%] animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] bg-violet-600/6 rounded-full blur-[140px] bottom-[20%] left-[10%]" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* PERSONAL INTRO — This is about Debanjan, not resources */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 mb-24">
          
          {/* Left: Personal intro */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 bg-indigo-500/8 border border-indigo-500/15 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide text-indigo-300 mb-6 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span>{className} · West Bengal, India</span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.08]"
            >
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400">
                {name}
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="text-base sm:text-lg text-gray-400 font-light max-w-lg mb-8 leading-relaxed"
            >
              An aspiring physicist preparing for the International Physics Olympiad and IIT-JEE Advanced. I spend my days solving problems in classical mechanics, building intuition for physical systems, and working towards joining the world&apos;s best physics programs.
            </motion.p>

            {/* CTA — About Me focus, not Resources */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <Link href="/contact">
                <button className="group px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center shadow-lg shadow-white/5 cursor-pointer">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link href="/syllabus">
                <button className="group px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/8 hover:border-white/15 transition-all flex items-center justify-center backdrop-blur-md cursor-pointer">
                  <BookOpen className="w-4 h-4 mr-2 text-gray-400 group-hover:text-white transition-colors" />
                  What I Study
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Quick stats / identity card */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="glass-panel rounded-2xl p-6 w-full lg:max-w-xs space-y-5"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/15">
                DB
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">{name}</h3>
                <p className="text-gray-500 text-xs">{className} · Physics Aspirant</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Atom className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-xs font-medium">IPhO Candidate</p>
                  <p className="text-gray-500 text-[11px]">India team aspirant · 2028 target</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Telescope className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-xs font-medium">Dream Schools</p>
                  <p className="text-gray-500 text-[11px]">MIT & Stanford Physics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-xs font-medium">JEE Advanced</p>
                  <p className="text-gray-500 text-[11px]">IITs / IISc / CMI / ISI</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ABOUT ME Section */}
        <div className="border-t border-white/5 pt-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            custom={0}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {/* My Story */}
            <div className="space-y-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-indigo-500 to-transparent" />
                About Me
              </h2>
              <p className="text-gray-300 text-sm leading-[1.8]">
                I&apos;m a student from West Bengal, India, currently in {className}. My journey into physics started from a government school, and through dedication and curiosity, I earned my way into the Jawahar Navodaya Vidyalaya system and received the National Means Cum Merit Scholarship.
              </p>
              <p className="text-gray-400 text-sm leading-[1.8]">
                Right now, I&apos;m deep into preparing for the International Physics Olympiad — grinding through Irodov, Krotov, and Pathfinder problems daily. My goal is to represent India at IPhO and eventually study physics at MIT or Stanford.
              </p>
              <p className="text-gray-400 text-sm leading-[1.8]">
                When I&apos;m not solving physics problems, I&apos;m exploring the edges of classical mechanics, building mathematical intuition, and working on understanding the universe at its most fundamental level.
              </p>
            </div>

            {/* Credentials */}
            <div className="space-y-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-pink-500 to-transparent" />
                Credentials
              </h2>
              <div className="space-y-3">
                {credentials.map((cred, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                    className="glass-panel rounded-xl p-5 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-indigo-400" />
                        <h4 className="text-white font-semibold text-sm">{cred.name}</h4>
                      </div>
                      <p className="text-xs text-gray-500">{cred.info}</p>
                    </div>
                    <div className="bg-indigo-500/8 border border-indigo-500/15 text-indigo-300 font-mono text-[11px] px-3 py-1 rounded-full tracking-wide whitespace-nowrap">
                      {cred.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick links to other sections */}
              <div className="pt-4 flex flex-wrap gap-2">
                <Link href="/resources" className="text-xs text-gray-500 hover:text-indigo-400 transition-colors border border-white/5 hover:border-indigo-500/20 px-3 py-1.5 rounded-lg">
                  📚 My Reading List
                </Link>
                <Link href="/syllabus" className="text-xs text-gray-500 hover:text-indigo-400 transition-colors border border-white/5 hover:border-indigo-500/20 px-3 py-1.5 rounded-lg">
                  🔬 Topics I Cover
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
