"use client";

import React, { useState } from "react";
import projectsData from "../../data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  demoLink: string;
  category: string;
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Web App", "Canvas"];

  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter((project) => project.category === filter);

  return (
    <section id="projects" className="relative min-h-screen py-24 px-6 max-w-7xl mx-auto z-10">
      {/* Visual background helper */}
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="space-y-12">
        {/* Title */}
        <div className="text-center space-y-4">
          <h2 className="text-sm font-mono tracking-[0.3em] text-cyan-400 font-bold uppercase">
            Catalogued Operations
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Digital Sector Deployments
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full" />
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center space-x-2 md:space-x-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-lg font-mono text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? "bg-gradient-to-r from-cyan-900/40 to-purple-900/40 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                  : "bg-black/30 text-gray-400 border border-gray-800 hover:border-gray-600 hover:text-white"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {filteredProjects.map((project: Project) => (
            <div
              key={project.id}
              className="glass-panel group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
            >
              {/* Internal abstract grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.06),transparent_60%)] pointer-events-none" />

              <div className="space-y-6">
                {/* Category Pill & ID */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-gray-500 tracking-wider">
                    SECTOR // {project.id.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-950/40 border border-purple-500/25 text-purple-300">
                    {project.category}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-cyan-400 border border-cyan-950/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action links */}
              <div className="flex items-center space-x-6 pt-8 border-t border-purple-500/10 mt-6">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-xs font-mono text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  <span>SOURCE_CODE</span>
                </a>
                
                <a
                  href={project.demoLink}
                  className="flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>LIVE_LAUNCH</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
