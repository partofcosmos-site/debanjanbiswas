"use client";

import React, { useState } from "react";
import { BookOpen, Layers, Sparkles, Lightbulb, Target, Zap, ChevronDown, ChevronUp } from "lucide-react";
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

const blogPosts = [
  {
    id: "how-i-approach-irodov",
    title: "How I Actually Approach Irodov Problems",
    summary: "Most people either skip Irodov or brute-force it. Here's the method I've settled on after 200+ problems — start with the physics, not the math.",
    icon: Target,
    tags: ["Problem Solving", "Mechanics"],
    content: [
      "The biggest mistake I made early on was jumping straight to equations. Irodov problems are designed to punish that. Every problem has a physical picture — if you can't draw it and explain what's happening in plain words, you're not ready to write F=ma.",
      "My workflow: (1) Read the problem twice. (2) Draw the setup — forces, constraints, reference frames. (3) Identify what's conserved. (4) Only then pick your equations. This sounds slow but it cuts my average solve time in half because I stop going down wrong paths.",
      "For mechanics specifically, always check: Is this a conservation problem? Is there a constraint I'm missing? Can I pick a smarter reference frame? These three questions solve 70% of Irodov mechanics."
    ]
  },
  {
    id: "jee-vs-olympiad-prep",
    title: "JEE vs Olympiad: They're Not the Same Fight",
    summary: "People assume Olympiad prep automatically covers JEE. It doesn't. Here's how I balance both without losing my mind.",
    icon: Zap,
    tags: ["Strategy", "JEE", "Olympiad"],
    content: [
      "JEE rewards speed and pattern recognition. Olympiad rewards depth and creative thinking. Training for one doesn't automatically make you good at the other.",
      "My split: weekdays I focus on JEE-style timed problem sets (Pathfinder, previous year papers). Weekends I go deep — one or two hard Irodov/Krotov problems with no time pressure, just understanding.",
      "The overlap is in fundamentals. If your Newton's laws intuition is rock solid, both exams become easier. So I spend dedicated time on conceptual clarity using Halliday before touching any problem book."
    ]
  },
  {
    id: "building-physics-intuition",
    title: "Building Real Physics Intuition (Not Just Formula Memory)",
    summary: "Formulas are tools, not understanding. Here's how I train myself to think like a physicist rather than a formula-matching machine.",
    icon: Lightbulb,
    tags: ["Learning", "Physics"],
    content: [
      "Every time I learn a new formula, I force myself to derive it from scratch at least once. Not memorize the derivation — actually re-derive it. If I can't, I don't understand the physics behind it.",
      "I also do 'what-if' exercises: What if gravity was repulsive? What if friction was velocity-dependent? These aren't exam questions, but they train the kind of thinking that makes hard problems feel natural.",
      "The best test of intuition: can you predict the answer's behavior before solving? Should it increase or decrease? What happens at extreme values? If your final answer contradicts your prediction, either your intuition or your math is wrong — figure out which."
    ]
  }
];

export default function Projects() {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [showStack, setShowStack] = useState(false);

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
        className="space-y-20 relative z-10 w-full"
      >
        {/* Page Header */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Resources
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Notes, strategies, and lessons from my Physics Olympiad and JEE preparation. 
            Not textbook advice — just things I&apos;ve figured out through trial and error.
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </motion.div>

        {/* Blog-style Posts */}
        <motion.div variants={containerVariants} className="space-y-6">
          {blogPosts.map((post) => {
            const isExpanded = expandedPost === post.id;
            const Icon = post.icon;
            return (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="glass-panel rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                  className="w-full text-left p-6 sm:p-8 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/8 border border-indigo-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                          {post.title}
                        </h3>
                        <div className="flex-shrink-0 mt-1">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mt-2">
                        {post.summary}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono text-indigo-300/70 bg-indigo-500/8 border border-indigo-500/10 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-8 pl-[4.5rem] sm:pl-[5.5rem] space-y-4 border-t border-white/5 pt-6">
                        {post.content.map((para, i) => (
                          <p key={i} className="text-gray-300 text-sm leading-[1.85]">
                            {para}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* My Study Stack — collapsible bottom section */}
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
                <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
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
