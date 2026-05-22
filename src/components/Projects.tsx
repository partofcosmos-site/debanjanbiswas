"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Layers, Zap, GraduationCap } from "lucide-react";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 60, damping: 15 },
  },
};

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Theory Base", "Core Problems", "Olympiad Math"];

  const filteredBooks = filter === "All"
    ? studentData.books
    : studentData.books.filter((book: Book) => book.category === filter);

  return (
    <section id="books" className="relative min-h-screen py-24 px-6 max-w-7xl mx-auto z-10 space-grid">
      {/* Decorative field coordinates in background */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" style={{ animationDelay: "2s" }} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-16 relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h2 className="text-xs font-mono tracking-[0.3em] text-cyan-400 font-bold uppercase flex items-center justify-center">
            <BookOpen className="w-4 h-4 mr-2" />
            LITERATURE SHELF
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
            Study Resources & Textbooks
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </motion.div>

        {/* Filter Navigation */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-lg font-mono text-[10px] tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-md ${
                filter === cat
                  ? "bg-cyan-950/60 text-cyan-300 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  : "bg-black/40 text-gray-400 border border-gray-800/60 hover:border-cyan-500/30 hover:text-white"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Textbooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {filteredBooks.map((book: Book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl pl-10 pr-6 py-8 flex flex-col justify-between overflow-hidden h-full border border-cyan-500/10 hover:border-cyan-400/50 bg-black/40 backdrop-blur-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                {/* Book Spine Aesthetic */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-cyan-900/40 to-purple-900/40 border-r border-cyan-500/20" />
                
                {/* Cover texture / Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/5 pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
                <div className="absolute right-0 top-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.1),transparent_60%)] pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                <div className="space-y-6 relative z-10">
                  {/* Header catalog code */}
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-gray-400 tracking-wider flex items-center">
                      <Layers className="w-3 h-3 mr-1 opacity-50" />
                      CATALOGUE // 00_{book.id.toUpperCase()}
                    </span>
                    
                    <span className={`text-[9px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                      book.status === "Active"
                        ? "bg-cyan-950/60 border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                        : book.status === "Reference"
                        ? "bg-purple-950/60 border-purple-500/30 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                        : "bg-gray-950/60 border-gray-700 text-gray-400"
                    }`}>
                      {book.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Title & Author details */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-300 font-serif">
                      {book.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-600/80 group-hover:text-cyan-400 transition-colors duration-300">
                      BY {book.author.toUpperCase()}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed pt-2">
                      {book.description}
                    </p>
                  </div>
                </div>

                {/* Progress & Directive indicator */}
                <div className="pt-8 border-t border-cyan-500/10 mt-8 relative z-10 group-hover:border-cyan-500/30 transition-colors duration-300">
                  <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 mb-2">
                    <span>PREPARATION INDEX</span>
                    <span className="text-cyan-400 font-bold">{book.progress}% COMPLETE</span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-black/80 rounded-full border border-gray-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${book.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Subscriptions / Interactive coaching platforms sub-grid */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="pt-24 space-y-12">
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h3 className="text-xs font-mono tracking-[0.3em] text-purple-400 font-bold uppercase flex items-center justify-center">
              <Zap className="w-4 h-4 mr-2" />
              ACTIVE ACADEMIC DIRECTIVES
            </h3>
            <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              Coaching Feeds & Virtual Subscriptions
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <p className="text-gray-400 text-sm font-sans max-w-xl mx-auto pt-2">
              Academic resources, lectures, and visual module platforms utilized in daily preparation matrices.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentData.subscriptions.map((sub) => (
              <motion.div 
                key={sub.id} 
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-5 rounded-xl bg-black/40 backdrop-blur-md border border-purple-500/10 hover:border-purple-400/50 flex flex-col justify-between space-y-4 h-full shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">
                      {sub.type.toUpperCase()}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight font-serif group-hover:text-purple-300 transition-colors">
                    {sub.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-sans">{sub.description}</p>
                </div>

                <div className="pt-3 border-t border-purple-500/10 group-hover:border-purple-500/30 transition-colors flex justify-between items-center text-[9px] font-mono text-gray-500">
                  <span className="flex items-center">
                    <GraduationCap className="w-3 h-3 mr-1 opacity-50" />
                    PLATFORM
                  </span>
                  <span className="text-white font-semibold">{sub.platform.toUpperCase()}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
