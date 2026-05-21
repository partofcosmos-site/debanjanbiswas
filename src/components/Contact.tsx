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
    <section id="contact" className="relative min-h-screen py-24 px-6 max-w-7xl mx-auto z-10 space-grid">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-xs font-mono tracking-[0.3em] text-pink-500 font-bold uppercase">
            RESONANCE BRIDGE
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Lab Connection Console
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Scientific lab telemetry board */}
          <div className="md:col-span-5 flex flex-col justify-between glass-panel rounded-2xl p-6 sm:p-8 space-y-8 bg-black/40">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-pink-500">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
                <span className="font-mono text-xs font-bold tracking-widest">BRIDGE_ACTIVE</span>
              </div>
              <h4 className="text-xl font-bold tracking-tight text-white font-serif">Laboratory Comms</h4>
              <p className="text-gray-400 text-sm leading-relaxed font-sans">
                Establish direct vector links. Enter your identity coordinates and logs to communicate with Debanjan&apos;s academic terminal. Messages are encoded and transmitted via sub-space propagation resonance.
              </p>
            </div>

            {/* Readout hud */}
            <div className="border border-purple-500/10 rounded-xl p-4 bg-black/70 font-mono text-[9px] text-gray-500 space-y-2.5 select-none">
              <div className="flex justify-between border-b border-purple-500/10 pb-1.5">
                <span>LAB_COORD:</span>
                <span className="text-purple-400">LAT.540F_LNG.4618</span>
              </div>
              <div className="flex justify-between">
                <span>FREQUENCY:</span>
                <span className="text-cyan-400">1420.405 MHz (Hydrogen)</span>
              </div>
              <div className="flex justify-between">
                <span>RESONANCE:</span>
                <span className="text-pink-500">ACTIVE_LOCKED</span>
              </div>
              <div className="flex justify-between">
                <span>TELEMETRY:</span>
                <span className="text-white">OPTIMAL // OK</span>
              </div>
            </div>
          </div>

          {/* Form console */}
          <div className="md:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-black/25">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.05),transparent_50%)] pointer-events-none" />

            {status === "idle" && (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Identity */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[9px] font-mono text-cyan-400 tracking-wider">
                    SENDER // IDENTITY_ID
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="w-full bg-black/55 border border-purple-500/20 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
                  />
                </div>

                {/* Return Route */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[9px] font-mono text-cyan-400 tracking-wider">
                    RETURN ROUTE // DEST_EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="w-full bg-black/55 border border-purple-500/20 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
                  />
                </div>

                {/* Packet payload */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-[9px] font-mono text-cyan-400 tracking-wider">
                    LOG PAYLOAD // MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Transcribe scientific logs..."
                    className="w-full bg-black/55 border border-purple-500/20 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Transmit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 rounded-xl text-white font-mono text-xs font-bold tracking-wider cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.2)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all duration-300"
                >
                  TRANSMIT SIGNAL
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
                <div className="w-16 h-16 rounded-full bg-cyan-950/40 border border-cyan-400/50 flex items-center justify-center glow-cyan shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-float">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold tracking-tight text-white font-serif">Signal Resonated</h4>
                  <p className="text-gray-400 text-sm max-w-xs font-sans">
                    Quantum sub-space tunnel fully locked onto destination frequency. Message archived.
                  </p>
                </div>

                {/* Console Log display */}
                <div className="w-full border border-cyan-500/20 rounded-xl p-4 bg-black/60 font-mono text-[9px] text-cyan-500 text-left space-y-1.5 max-h-28 overflow-y-auto">
                  {logs.map((log, i) => (
                    <div key={i} className="leading-tight">{log}</div>
                  ))}
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 border border-cyan-500/30 hover:border-cyan-500 text-cyan-300 hover:text-white rounded-lg font-mono text-[10px] tracking-widest cursor-pointer transition-all duration-300"
                >
                  TRANSMIT NEW STREAM
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
