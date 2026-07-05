"use client";

import React from "react";
import { Mail } from "lucide-react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf00WVa0AIokq2kGWtIKxVLVksvPGe6kXFIzKiharMi5Ymn0A/viewform?embedded=true";

export default function Contact() {
  return (
    <section className="relative min-h-screen px-6 flex flex-col justify-start items-center z-10 pt-48 sm:pt-52 md:pt-56 pb-20">
      {/* Background ambient lighting */}
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-violet-600/3 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-indigo-600/3 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto space-y-10 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="space-y-3 text-center max-w-xl">
          <span className="text-[11px] font-mono font-medium tracking-widest text-indigo-400 uppercase flex items-center justify-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
            Contact
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto pt-1">
            Have questions about Physics Olympiad prep, advanced mechanics, or just want to connect? Drop a message below.
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 rounded-full mx-auto" />
        </div>

        {/* Google Form Embed */}
        <div className="w-full max-w-2xl glass-panel rounded-2xl overflow-hidden border border-white/[0.04] bg-[#040813]/40">
          <iframe
            src={GOOGLE_FORM_URL}
            width="100%"
            height="700"
            className="w-full border-0"
            title="Contact Form"
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>

        {/* Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          <div className="glass-panel rounded-xl p-4 text-center space-y-1">
            <span className="text-[10px] font-mono text-gray-500 tracking-wider">Location</span>
            <p className="text-sm font-medium text-indigo-400">West Bengal, India</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center space-y-1">
            <span className="text-[10px] font-mono text-gray-500 tracking-wider">Focus</span>
            <p className="text-sm font-medium text-white">INPhO &amp; JEE Advanced</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center space-y-1">
            <span className="text-[10px] font-mono text-gray-500 tracking-wider">Availability</span>
            <p className="text-sm font-medium text-emerald-400 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
              Open to connect
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
