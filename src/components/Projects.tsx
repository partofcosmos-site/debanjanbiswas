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
    <section className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto z-10">
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute left-0 bottom-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" style={{ animationDelay: "2s" }} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-16 relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
            Curated Library
          </h2>
          <p className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Resource Shelf
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Filter Navigation */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                filter === cat
                  ? "bg-white text-black shadow-md"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
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
                className="group relative rounded-2xl pl-10 pr-6 py-8 flex flex-col overflow-hidden h-auto min-h-full border border-white/5 hover:border-white/10 bg-white/[0.02] backdrop-blur-xl transition-colors duration-300 gap-6"
              >
                {/* Book Spine Aesthetic */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 border-r border-white/5" />
                
                {/* Cover texture / Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-purple-500/5 pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
                <div className="absolute right-0 top-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.1),transparent_60%)] pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                <div className="flex-1 space-y-6 relative z-10">
                  {/* Header catalog code */}
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-gray-400 tracking-wider flex items-center">
                      <Layers className="w-3 h-3 mr-1 opacity-50" />
                      CATALOGUE // 00_{book.id.toUpperCase()}
                    </span>
                    
                    <span className={`text-[9px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                      book.status === "Active"
                        ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
                        : book.status === "Reference"
                        ? "bg-purple-500/10 border-purple-500/20 text-purple-300"
                        : "bg-white/5 border-white/10 text-gray-400"
                    }`}>
                      {book.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Title & Author details */}
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-normal text-white transition-colors duration-300 font-serif leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 transition-colors duration-300">
                      BY {book.author.toUpperCase()}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed pt-2">
                      {book.description}
                    </p>
                  </div>
                </div>

                {/* Progress & Directive indicator */}
                <div className="pt-6 border-t border-white/5 relative z-10 transition-colors duration-300 mt-auto">
                  <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 mb-2">
                    <span>PREPARATION INDEX</span>
                    <span className="text-indigo-400 font-bold">{book.progress}% COMPLETE</span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${book.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                      className="h-full rounded-full bg-indigo-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Subscriptions / Interactive coaching platforms sub-grid */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="pt-24 space-y-12">
          <motion.div variants={itemVariants} className="text-center space-y-4 max-w-2xl mx-auto">
            <h3 className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
              Subscriptions
            </h3>
            <p className="text-3xl md:text-4xl font-bold tracking-normal text-white leading-snug">
              Coaching Feeds & Virtual Subscriptions
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-6" />
            <p className="text-gray-400 text-sm max-w-xl mx-auto pt-4 leading-relaxed">
              Academic resources, lectures, and visual module platforms utilized in daily preparation matrices.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentData.subscriptions.map((sub) => (
              <motion.div 
                key={sub.id} 
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 flex flex-col justify-between space-y-4 h-full transition-colors duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium border border-indigo-500/20">
                      {sub.type.toUpperCase()}
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight font-serif group-hover:text-purple-300 transition-colors">
                    {sub.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-sans">{sub.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 transition-colors flex justify-between items-center text-[9px] font-mono text-gray-500">
                  <span className="flex items-center">
                    PLATFORM
                  </span>
                  <span className="text-gray-300 font-semibold">{sub.platform.toUpperCase()}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
