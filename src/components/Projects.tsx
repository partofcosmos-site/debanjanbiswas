"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Layers, 
  Sparkles, 
  Lightbulb, 
  Target, 
  Code, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Compass,
  Heart
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import studentData from "../../data/studentData.json";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  status: string;
  progress: number;
  category: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

export default function Projects() {
  const [showStack, setShowStack] = useState(false);
  const [irodovExpanded, setIrodovExpanded] = useState(false);

  return (
    <section className="relative min-h-screen px-6 max-w-5xl mx-auto z-10 pt-16 sm:pt-20 pb-20 flex flex-col justify-start">
      {/* Background Ambience */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-indigo-600/4 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-violet-600/3 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="space-y-16 relative z-10 w-full"
      >
        {/* Page Header */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" /> Study Hub &amp; Experience
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
            Resources &amp; Experience
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            A raw compilation of my real experiences, preparation strategies, and resources I have been exposed to during my high school journey (updated as of July 5, 2026).
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </motion.div>

        {/* Feature Article: How I Approach Irodov */}
        <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/15">
                Core Strategy
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
                How I Actually Approach Irodov Problems
              </h2>
            </div>
            <button
              onClick={() => setIrodovExpanded(!irodovExpanded)}
              className="text-xs font-mono text-indigo-300 hover:text-indigo-200 transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
            >
              {irodovExpanded ? "Read Less" : "Read Full Guide"}
              {irodovExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className="space-y-4 text-gray-300 text-sm leading-[1.8]">
            <p>
              Your approach to I.E. Irodov&apos;s <em>Problems in General Physics</em> should depend entirely on your target objective.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase">
                  <Heart className="w-3.5 h-3.5 text-pink-400" /> Scenario A: Having Real Fun
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  If your goal is falling in love with physics, there is no set system. Just go ahead, try solving them, fail, come back, review your theory, and use AI or online resources to speed up your learning. Never compromise on depth—the process is about building deep intuition.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase">
                  <Target className="w-3.5 h-3.5" /> Scenario B: Under Time Constraints
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  If you are training under a strict timeline (e.g. for the Physics Olympiad / IPhO), do not solve every question. The book contains many research-level questions. Instead, solve selectively with a mentor. If you don&apos;t have one, feel free to <a href="/contact" className="text-indigo-400 hover:underline">contact me</a>—I keep a list of curated, high-value Irodov problems that target active exam topics.
                </p>
              </div>
            </div>

            <AnimatePresence>
              {irodovExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden space-y-4 pt-2 border-t border-white/5"
                >
                  <div className="bg-indigo-500/[0.03] border border-indigo-500/10 p-4 rounded-xl">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold block mb-1">
                      Rule #1: Solution Discipline
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Never look at the solution before deeply trying the problem. Always do the opposite: spend solid time wrestling with the question first, and only check the solution when you have exhausted all physics approaches. It&apos;s a simple rule, but it is the only way to build independent solving power.
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    When you sit down to solve, start by dissecting the dynamics and drawing the physical picture. Focus on what quantities are conserved (momentum, energy, angular momentum) and define your boundary conditions before doing any algebraic manipulation.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Resources Directories Grouped by Category */}
        <div className="space-y-10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
            <span className="w-6 h-px bg-gradient-to-r from-indigo-500 to-transparent" />
            Curated High School Directory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Coding & Computer Science */}
            <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-indigo-400">
                <Code className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Coding &amp; CS</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Platforms and references I recommend starting with to learn algorithms and logic:
              </p>
              <ul className="space-y-2.5 pt-1 text-xs">
                <li className="flex justify-between items-center text-gray-300 font-mono">
                  <span>CodeChef / Codeforces</span>
                  <span className="text-[10px] text-gray-500">Competitive programming</span>
                </li>
                <li className="flex justify-between items-center text-gray-300 font-mono">
                  <span>LeetCode</span>
                  <span className="text-[10px] text-gray-500">Interview &amp; logic practice</span>
                </li>
                <li className="flex justify-between items-center text-gray-300 font-mono">
                  <span>Python</span>
                  <span className="text-[10px] text-indigo-400 font-semibold">No alternative for starting out</span>
                </li>
              </ul>
              <div className="pt-3 border-t border-white/5 space-y-2">
                <a 
                  href="https://ioinformatics.org/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[11px] text-indigo-300 hover:text-indigo-200 transition-colors flex items-center gap-1 font-mono"
                >
                  International Olympiad in Informatics (IOI) Resources <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://ioai-official.org/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[11px] text-indigo-300 hover:text-indigo-200 transition-colors flex items-center gap-1 font-mono"
                >
                  International Olympiad of AI (IOAI) Resources <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>

            {/* Physics Olympiad & Prep */}
            <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-indigo-400">
                <BookOpen className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Physics Olympiad &amp; Prep</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Coaching options and methodologies that I have encountered and evaluated:
              </p>
              <ul className="space-y-3 pt-1 text-xs">
                <li className="text-gray-300">
                  <strong className="text-white font-mono block">Art of Problem Solving (AoPS) Physics</strong>
                  <span className="text-gray-500 text-[11px] leading-relaxed">The premier international physics training curriculum.</span>
                </li>
                <li className="text-gray-300">
                  <strong className="text-white font-mono block">Vedantu Olympiad School</strong>
                  <span className="text-gray-500 text-[11px] leading-relaxed">Personally enrolled here; I find it quite nice and highly functional as of July 2026.</span>
                </li>
                <li className="text-gray-300">
                  <strong className="text-white font-mono block">Cheenta (India)</strong>
                  <span className="text-gray-500 text-[11px] leading-relaxed">Attended their trial class; nice layout, but priced around ₹16,000 for 10 months.</span>
                </li>
                <li className="text-gray-300">
                  <strong className="text-white font-mono block">PhysicsWallah</strong>
                  <span className="text-gray-500 text-[11px] leading-relaxed">Very affordable courses covering the first stage of the Indian Physics Olympiad.</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-white/5 text-[10px] leading-relaxed text-gray-500">
                💡 <span className="italic">Note: Many successful participants are self-learners (autodidacts). Never feel discouraged if you aren&apos;t enrolled in specific programs; it&apos;s all about giving problems enough time.</span>
              </div>
            </motion.div>

            {/* Mathematics Olympiad */}
            <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-indigo-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Mathematics Olympiad</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Math is not my primary domain, so I don&apos;t add personal commentary, but I highly recommend visiting this resource sheet:
              </p>
              <div className="pt-1">
                <a 
                  href="https://www.rushilmathur.com/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group rounded-xl p-4 bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white font-mono">Rushil Mathur&apos;s Site</h4>
                    <p className="text-[10px] text-gray-500">Excellent index of Math Olympiad study logs &amp; links</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                </a>
              </div>
            </motion.div>

            {/* Research & Programs */}
            <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-indigo-400">
                <Lightbulb className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Research, Internships &amp; Programs</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Be careful not to fall into the FOMO trap. Keep this rule in mind: <span className="text-indigo-400 italic">the easier it is to get into a program, the less valuable it tends to be.</span>
              </p>
              <ul className="space-y-2 pt-1 text-xs">
                <li className="text-gray-300 flex justify-between items-center font-mono">
                  <span>Non-Trivial</span>
                  <span className="text-[10px] text-gray-500">Free program</span>
                </li>
                <li className="text-gray-300 flex justify-between items-center font-mono">
                  <span>LaunchX</span>
                  <span className="text-[10px] text-gray-500">Scholarships available on evaluation</span>
                </li>
                <li className="text-gray-300 flex justify-between items-center font-mono">
                  <span>TKS (The Knowledge Society)</span>
                  <span className="text-[10px] text-gray-500">Scholarships available on evaluation</span>
                </li>
                <li className="text-gray-300 flex justify-between items-center font-mono">
                  <span>Cheenta Research</span>
                  <span className="text-[10px] text-indigo-400">Only India-focused research mentor</span>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>

        {/* Life Lessons & Core Principles */}
        <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4 bg-gradient-to-r from-indigo-950/10 to-violet-950/10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
            <span className="w-6 h-px bg-gradient-to-r from-pink-500 to-transparent" />
            My Life Lessons
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-center sm:text-left">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
              <span className="text-[10px] font-mono text-gray-600 block mb-1">Principle 01</span>
              <p className="text-xs font-semibold text-white">Never give up.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
              <span className="text-[10px] font-mono text-gray-600 block mb-1">Principle 02</span>
              <p className="text-xs font-semibold text-white">Follow your passion.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
              <span className="text-[10px] font-mono text-gray-600 block mb-1">Principle 03</span>
              <p className="text-xs font-semibold text-white">Never stop.</p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Collapsible Study Stack */}
        <motion.div variants={containerVariants} className="space-y-8">
          <motion.div variants={itemVariants}>
            <button
              onClick={() => setShowStack(!showStack)}
              className="w-full text-left flex items-center justify-between cursor-pointer group"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-medium tracking-widest text-gray-500 uppercase flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-gray-600" /> What I personally use
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight group-hover:text-gray-200 transition-colors">
                  My Study Stack
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-lg">
                  The books and platforms I&apos;m currently studying from — not recommendations, just my setup.
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                {showStack ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                )}
              </div>
            </button>
          </motion.div>

          <AnimatePresence>
            {showStack && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden space-y-16"
              >
                {/* Books */}
                <div className="space-y-6 pt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                    <span className="w-6 h-px bg-gradient-to-r from-indigo-500 to-transparent" />
                    Books
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studentData.books.map((book: Book) => (
                      <div
                        key={book.id}
                        className="group glass-panel rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/30 to-violet-500/20 group-hover:from-indigo-400/50 group-hover:to-violet-400/50 transition-all duration-500" />
                        <div className="pl-3 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-gray-600 tracking-wider flex items-center gap-1.5">
                              <Layers className="w-3 h-3 text-indigo-400/60" />
                              {book.category}
                            </span>
                            <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${
                              book.status === "Active"
                                ? "bg-indigo-500/8 border-indigo-500/20 text-indigo-300"
                                : book.status === "Reference"
                                ? "bg-violet-500/8 border-violet-500/20 text-violet-300"
                                : "bg-white/[0.03] border-white/8 text-gray-500"
                            }`}>
                              {book.status}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white tracking-tight leading-snug">
                            {book.title}
                          </h4>
                          <p className="text-[11px] font-mono text-gray-500">{book.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coaching */}
                <div className="space-y-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                    <span className="w-6 h-px bg-gradient-to-r from-pink-500 to-transparent" />
                    Coaching &amp; Platforms
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {studentData.subscriptions.map((sub) => (
                      <div
                        key={sub.id}
                        className="group glass-panel p-5 rounded-xl flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex justify-between items-center">
                          <span className="bg-indigo-500/8 text-indigo-300 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide border border-indigo-500/15 font-mono">
                            {sub.type}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
                        </div>
                        <h4 className="text-sm font-bold text-white tracking-tight leading-snug group-hover:text-indigo-300 transition-colors">
                          {sub.title}
                        </h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{sub.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
