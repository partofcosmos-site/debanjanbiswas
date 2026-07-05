"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, BookOpen, Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import studentData from "../../data/studentData.json";

interface Highlight {
  label: string;
  detail: string;
  featured?: boolean;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  const { name, class: className, school, tagline, highlights } = studentData.profile;

  return (
    <section className="relative min-h-screen flex flex-col justify-start overflow-hidden px-6 pt-48 sm:pt-52 md:pt-56 pb-20">
      {/* Soft background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[140px] top-[10%] right-[15%] animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] bg-violet-600/6 rounded-full blur-[140px] bottom-[20%] left-[10%]" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* INTRO */}
        <div className="mb-24">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="text-sm text-gray-500 mb-4"
          >
            {className} · {school}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]"
          >
            Hey, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400">
              {name}
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mb-12 leading-relaxed"
          >
            {tagline}
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="flex flex-wrap items-center gap-3.5 mb-6"
          >
            <Link href="/contact">
              <button className="group px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center shadow-lg shadow-white/5 cursor-pointer">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/resources">
              <button className="group px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/8 hover:border-white/15 transition-all flex items-center backdrop-blur-md cursor-pointer">
                <BookOpen className="w-4 h-4 mr-2 text-gray-400 group-hover:text-white transition-colors" />
                My Reading List
              </button>
            </Link>
          </motion.div>
        </div>

        {/* ABOUT + HIGHLIGHTS */}
        <div className="border-t border-white/5 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* About Me */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="space-y-6"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-indigo-500 to-transparent" />
              About Me
            </h2>
            <div className="space-y-6">
              <p className="text-gray-300 text-sm leading-[1.85]">
                I&apos;m a {className} student from West Bengal, India. I love physics, astronomy, and building things on the internet. Most of my time goes into preparing for the Physics Olympiad and JEE — solving problems from Irodov, Krotov, and Pathfinder, and trying to build real intuition for how the universe works.
              </p>
              <p className="text-gray-400 text-sm leading-[1.85]">
                Outside of academics, I&apos;m a member of Hack Club, where I get to build and ship projects with a global community of young makers. I also participate in various physics, math, and coding competitions — I&apos;m not a pro by any means, but I believe in showing up and learning from every contest.
              </p>
              <p className="text-gray-400 text-sm leading-[1.85]">
                My long-term dream is to study physics at one of the world&apos;s best programs and eventually contribute to fundamental research.
              </p>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="space-y-5"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-pink-500 to-transparent" />
              Highlights
            </h2>
            <div className="space-y-3">
              {highlights.map((item: Highlight, idx: number) => (
                <div
                  key={idx}
                  className={`rounded-xl p-4 transition-all duration-300 ${
                    item.featured
                      ? "bg-indigo-500/[0.06] border border-indigo-500/20 shadow-lg shadow-indigo-500/5"
                      : "glass-panel"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {item.featured ? (
                      <Star className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className={`text-sm font-semibold ${item.featured ? "text-white" : "text-gray-200"}`}>
                        {item.label}
                        {item.featured && (
                          <span className="ml-2 text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/15 align-middle">
                            Featured
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary links */}
            <div className="pt-3 flex flex-wrap gap-2">
              <Link href="/lab" className="text-xs text-gray-500 hover:text-indigo-400 transition-colors border border-white/5 hover:border-indigo-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Topics I Study
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
