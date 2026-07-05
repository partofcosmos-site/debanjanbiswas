"use client";

import React, { useState } from "react";
import { BookOpen, Layers, Bookmark, Sparkles } from "lucide-react";
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
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Theory Base", "Core Problems", "Olympiad Math"];

  const filteredBooks = filter === "All"
    ? studentData.books
    : studentData.books.filter((book: Book) => book.category === filter);

  return (
    <section className="relative min-h-screen px-6 max-w-5xl mx-auto z-10 pt-48 sm:pt-52 md:pt-56 pb-20 flex flex-col justify-start items-center">
      {/* Background Ambience */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-indigo-600/4 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-violet-600/3 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="space-y-12 relative z-10 w-full"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="space-y-3 max-w-xl">
          <span className="text-[11px] font-medium tracking-widest text-indigo-400 uppercase flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Curated Library
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Resource Shelf
          </h2>
          <div className="w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </motion.div>

        {/* Filter Navigation */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-[12px] font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? "bg-white text-black shadow-lg shadow-white/5"
                  : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06] border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Book Cards Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book: Book) => (
              <motion.div
                layout
                key={book.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="group glass-panel rounded-2xl p-6 flex flex-col justify-between overflow-hidden min-h-[240px] gap-5"
              >
                {/* Book Spine */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/30 via-violet-500/20 to-pink-500/30 group-hover:from-indigo-400/60 group-hover:to-pink-400/60 transition-all duration-500" />
                
                <div className="space-y-3 relative z-10 pl-3">
                  {/* Catalog & Status */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-gray-600 tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-indigo-400/60" />
                      {book.id.toUpperCase()}
                    </span>
                    
                    <span className={`text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${
                      book.status === "Active"
                        ? "bg-indigo-500/8 border-indigo-500/20 text-indigo-300"
                        : book.status === "Reference"
                        ? "bg-violet-500/8 border-violet-500/20 text-violet-300"
                        : "bg-white/[0.03] border-white/8 text-gray-500"
                    }`}>
                      {book.status}
                    </span>
                  </div>

                  {/* Title & Details */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold tracking-tight text-white leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-[11px] font-mono text-gray-500 tracking-wide">
                      {book.author}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed pt-1">
                      {book.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Subscriptions Section */}
        <motion.div variants={containerVariants} className="pt-16 space-y-10">
          <motion.div variants={itemVariants} className="space-y-3 max-w-xl">
            <span className="text-[11px] font-medium tracking-widest text-pink-400 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Subscriptions
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Coaching & Platforms
            </h3>
            <div className="w-10 h-0.5 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg pt-1">
              Academic resources and lecture platforms utilized in daily preparation.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studentData.subscriptions.map((sub) => (
              <motion.div 
                key={sub.id} 
                whileHover={{ y: -4 }}
                className="group glass-panel p-5 rounded-xl flex flex-col justify-between gap-4 h-full transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="bg-indigo-500/8 text-indigo-300 px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide border border-indigo-500/15 font-mono">
                      {sub.type}
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-indigo-300 transition-colors">
                    {sub.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{sub.description}</p>
                </div>

                <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-600">
                  <span>Platform</span>
                  <span className="text-gray-400 font-medium">{sub.platform}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
