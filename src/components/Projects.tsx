"use client";

import React, { useState } from "react";
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

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Theory Base", "Core Problems", "Olympiad Math"];

  const filteredBooks = filter === "All"
    ? studentData.books
    : studentData.books.filter((book: Book) => book.category === filter);

  return (
    <section id="books" className="relative min-h-screen py-24 px-6 max-w-7xl mx-auto z-10 space-grid">
      {/* Decorative field coordinates in background */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-xs font-mono tracking-[0.3em] text-cyan-400 font-bold uppercase">
            LITERATURE SHELF
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Study Resources & Textbooks
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full" />
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-lg font-mono text-[10px] tracking-wider transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? "bg-gradient-to-r from-cyan-950/40 to-purple-950/40 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                  : "bg-black/30 text-gray-400 border border-gray-800/40 hover:border-gray-700 hover:text-white"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Textbooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {filteredBooks.map((book: Book) => (
            <div
              key={book.id}
              className="glass-panel textbook-spine group relative rounded-2xl pl-10 pr-6 py-8 flex flex-col justify-between overflow-hidden h-full"
            >
              {/* Cover texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-black/35 pointer-events-none" />
              <div className="absolute right-0 top-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_60%)] pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Header catalog code */}
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-gray-500 tracking-wider">
                    CATALOGUE // 00_{book.id.toUpperCase()}
                  </span>
                  
                  <span className={`text-[9px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                    book.status === "Active"
                      ? "bg-cyan-950/40 border-cyan-500/20 text-cyan-400"
                      : book.status === "Reference"
                      ? "bg-purple-950/40 border-purple-500/20 text-purple-400"
                      : "bg-gray-950/40 border-gray-800 text-gray-500"
                  }`}>
                    {book.status.toUpperCase()}
                  </span>
                </div>

                {/* Title & Author details */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-300 font-serif">
                    {book.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400">
                    BY {book.author.toUpperCase()}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed pt-2">
                    {book.description}
                  </p>
                </div>
              </div>

              {/* Progress & Directive indicator */}
              <div className="pt-8 border-t border-purple-500/10 mt-8 relative z-10">
                <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mb-2">
                  <span>PREPARATION INDEX</span>
                  <span className="text-cyan-400">{book.progress}% COMPLETE</span>
                </div>
                
                <div className="w-full h-1.5 bg-black/60 rounded-full border border-gray-900 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-all duration-1000"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscriptions / Interactive coaching platforms sub-grid */}
        <div className="pt-24 space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-xs font-mono tracking-[0.3em] text-purple-400 font-bold uppercase">
              ACTIVE ACADEMIC DIRECTIVES
            </h3>
            <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Coaching Feeds & Virtual Subscriptions
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
            <p className="text-gray-400 text-sm font-sans max-w-xl mx-auto pt-2">
              Academic resources, lectures, and visual module platforms utilized in daily preparation matrices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentData.subscriptions.map((sub) => (
              <div 
                key={sub.id} 
                className="glass-panel p-5 rounded-xl bg-black/35 border border-purple-500/5 hover:border-purple-500/30 flex flex-col justify-between space-y-4 h-full"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                      {sub.type.toUpperCase()}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight font-serif">{sub.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-sans">{sub.description}</p>
                </div>

                <div className="pt-3 border-t border-purple-500/5 flex justify-between items-center text-[9px] font-mono text-gray-500">
                  <span>PLATFORM</span>
                  <span className="text-white font-semibold">{sub.platform.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
