"use client";

import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "connecting" | "transmitting" | "success" | "error">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("connecting");
    setLogs([]);
    addLog("Initializing sub-space resonance bridge...");
    
    // Connect state
    await new Promise((resolve) => setTimeout(resolve, 800));
    addLog("Locking scientific telemetry coordinates...");
    setStatus("transmitting");
    
    // Transmit state
    await new Promise((resolve) => setTimeout(resolve, 1000));
    addLog("Uploading data stream packets (Type: QUANTUM_SIGNAL)...");
    
    // Success state
    await new Promise((resolve) => setTimeout(resolve, 700));
    addLog("Packet fully uploaded. Parity checking complete (Errors: 0).");
    addLog("TRANSMISSION COMPLETED SUCCESSFULLY.");
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleReset = () => {
    setStatus("idle");
    setLogs([]);
  };

  return (
    <section className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto z-10">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
            Get in touch
          </h2>
          <p className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Contact
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-5 flex flex-col justify-between rounded-2xl p-8 space-y-8 bg-white/[0.02] border border-white/5">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold tracking-tight text-white">Reach Out</h4>
              <p className="text-gray-400 text-base leading-relaxed font-sans">
                Whether you have a question about my studies, Olympiad preparation, or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            {/* Information readout */}
            <div className="border border-white/5 rounded-xl p-5 bg-black/40 font-mono text-[11px] text-gray-500 space-y-3 select-none">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>LOCATION:</span>
                <span className="text-indigo-400">Earth</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>STATUS:</span>
                <span className="text-white">Active Student</span>
              </div>
              <div className="flex justify-between">
                <span>RESPONSE TIME:</span>
                <span className="text-gray-400">Within 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Form console */}
          <div className="md:col-span-7 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden bg-white/[0.02] border border-white/5">

            {status === "idle" && (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[11px] font-mono text-gray-400 tracking-wider">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="w-full bg-black/40 border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-colors duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[11px] font-mono text-gray-400 tracking-wider">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="w-full bg-black/40 border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-colors duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-[11px] font-mono text-gray-400 tracking-wider">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Write your message..."
                    className="w-full bg-black/40 border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white hover:bg-gray-200 rounded-xl text-black font-semibold text-sm transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            )}

            {/* Connecting HUD */}
            {(status === "connecting" || status === "transmitting") && (
              <div className="flex flex-col justify-center items-center h-full min-h-[350px] space-y-8 py-10 relative z-10 select-none">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-pink-500/20 animate-ping" />
                  <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-cyan-500/40 animate-spin" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <p className="font-mono text-xs text-white tracking-widest animate-pulse uppercase">
                    {status === "connecting" ? "Locking bridge..." : "Modulating frequencies..."}
                  </p>
                  <span className="font-mono text-[9px] text-gray-500">PARITY STATUS: RESOLVING</span>
                </div>
              </div>
            )}

            {/* SUCCESS HUDS */}
            {status === "success" && (
              <div className="flex flex-col justify-center items-center h-full min-h-[350px] space-y-6 text-center py-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-400/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold tracking-tight text-white">Message Sent</h4>
                  <p className="text-gray-400 text-sm max-w-xs font-sans">
                    Thanks for reaching out! I'll get back to you as soon as possible.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-colors duration-300 mt-6"
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
