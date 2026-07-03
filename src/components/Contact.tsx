"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Mail, User, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "connecting" | "transmitting" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("connecting");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("transmitting");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleReset = () => {
    setStatus("idle");
  };

  return (
    <section className="relative min-h-screen page-section px-6 max-w-5xl mx-auto z-10">
      {/* Background ambience */}
      <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-violet-600/4 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-indigo-600/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-xl">
          <span className="text-[11px] font-medium tracking-widest text-indigo-400 uppercase flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Contact
          </h2>
          <div className="w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Info Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl p-7 gap-6 glass-panel">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white tracking-tight">Let&apos;s Connect</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Whether you have inquiries regarding Physics Olympiad preparation, advanced JEE mechanics, or research collaborations — feel free to reach out.
              </p>
            </div>

            {/* Info Readout */}
            <div className="border border-white/[0.04] rounded-xl p-5 bg-[#020408]/60 font-mono text-[11px] text-gray-600 space-y-3">
              <div className="flex justify-between border-b border-white/[0.04] pb-2.5">
                <span>Location</span>
                <span className="text-indigo-400 font-medium">West Bengal, India</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2.5">
                <span>Current Focus</span>
                <span className="text-white font-medium">IPhO & JEE Advanced</span>
              </div>
              <div className="flex justify-between">
                <span>Availability</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                  Open to connect
                </span>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-7 rounded-2xl p-7 flex flex-col justify-center relative overflow-hidden glass-panel">
            {status === "idle" && (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10 w-full">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono text-gray-500 tracking-wider font-medium flex items-center gap-1.5">
                    <User className="w-3 h-3 text-indigo-400/60" /> Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-white/[0.02] border border-white/[0.06] focus:border-indigo-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/8 transition-all duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono text-gray-500 tracking-wider font-medium flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-indigo-400/60" /> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-white/[0.02] border border-white/[0.06] focus:border-indigo-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/8 transition-all duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] font-mono text-gray-500 tracking-wider font-medium flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3 text-indigo-400/60" /> Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Write your message here..."
                    className="w-full bg-white/[0.02] border border-white/[0.06] focus:border-indigo-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/8 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white hover:bg-gray-100 rounded-xl text-black font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5"
                >
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </form>
            )}

            {/* Loading State */}
            {(status === "connecting" || status === "transmitting") && (
              <div className="flex flex-col justify-center items-center h-full min-h-[320px] gap-6 py-8 relative z-10">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ping" />
                  <div className="absolute w-[75%] h-[75%] rounded-full border border-dashed border-violet-400/30 animate-spin" />
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 animate-pulse shadow-lg shadow-indigo-500/30" />
                </div>
                <div className="text-center space-y-1.5">
                  <p className="font-mono text-xs text-white tracking-wide animate-pulse font-medium">
                    {status === "connecting" ? "Connecting..." : "Sending message..."}
                  </p>
                  <span className="font-mono text-[9px] text-gray-600 tracking-wider">Please wait</span>
                </div>
              </div>
            )}

            {/* Success State */}
            {status === "success" && (
              <div className="flex flex-col justify-center items-center h-full min-h-[320px] gap-5 text-center py-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-emerald-500/8 border border-emerald-400/20 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold tracking-tight text-white">Message Sent</h4>
                  <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                    Thanks for reaching out! I&apos;ll get back to you as soon as possible.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 border border-white/8 hover:bg-white/[0.03] text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-all duration-300 mt-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
