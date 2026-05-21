"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function LabTerminal() {
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING LAB_TERMINAL v2.0.1...",
    "SECURE CONNECTION ESTABLISHED.",
    "AWAITING AUTHENTICATION.",
    "Type 'auth <passphrase>' to unlock the agentic core.",
  ]);
  const [input, setInput] = useState("");
  const [passphrase, setPassphrase] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const addLog = (text: string, prefix = ">") => {
    setLogs((prev) => [...prev, `${prefix} ${text}`]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const command = input.trim();
    setInput("");
    addLog(command, "root@lab:~#");

    // Handle Auth
    if (!passphrase) {
      if (command.startsWith("auth ")) {
        const pass = command.split(" ")[1];
        setPassphrase(pass);
        addLog("AUTHENTICATION KEY ACCEPTED.", "SYSTEM:");
        addLog("Agentic Core Unlocked. Type your natural language command to update the portfolio.", "SYSTEM:");
      } else {
        addLog("ACCESS DENIED. PLEASE AUTHENTICATE FIRST.", "ERROR:");
      }
      return;
    }

    // Handle generic commands (clear, etc)
    if (command.toLowerCase() === "clear") {
      setLogs([]);
      return;
    }

    // Agentic processing
    setIsProcessing(true);
    addLog("Transmitting instruction to Agentic Core...", "SYSTEM:");
    
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: command,
          passphrase: passphrase,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        addLog(`AGENT FAILURE: ${data.error || "Unknown Error"}`, "ERROR:");
        // If auth failed, reset passphrase
        if (response.status === 401) {
          setPassphrase(null);
        }
      } else {
        addLog(`AGENT SUCCESS: ${data.message}`, "SUCCESS:");
        if (data.rebuildTriggered) {
          addLog("GitHub commit pushed. Cloudflare is now rebuilding the site.", "SYSTEM:");
          addLog("Your updates will be live in ~60 seconds.", "SYSTEM:");
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      addLog(`NETWORK ERROR: ${errorMessage}`, "ERROR:");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-500 font-mono p-4 sm:p-8 flex flex-col relative overflow-hidden">
      {/* Background Matrix/Grid effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none" />

      <header className="mb-6 border-b border-cyan-900 pb-4 relative z-10 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-cyan-400">AGENTIC_TERMINAL</h1>
          <p className="text-xs text-cyan-700 mt-1">SECURE ACCESS NODE // QUANTUM LINK ACTIVE</p>
        </div>
        <div className="text-xs flex flex-col items-end">
          <span className={passphrase ? "text-green-500" : "text-red-500"}>
            {passphrase ? "STATUS: UNLOCKED" : "STATUS: LOCKED"}
          </span>
          <Link href="/" className="text-cyan-800 hover:text-cyan-400 underline mt-2 transition-colors">RETURN TO SURFACE</Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col relative z-10 overflow-hidden">
        <div className="flex-grow overflow-y-auto space-y-2 mb-4 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-black pr-2 text-sm sm:text-base leading-relaxed">
          {logs.map((log, i) => {
            const isError = log.includes("ERROR:");
            const isSuccess = log.includes("SUCCESS:");
            const isSystem = log.includes("SYSTEM:");
            
            return (
              <div 
                key={i} 
                className={`break-words ${
                  isError ? "text-red-500 font-bold" : 
                  isSuccess ? "text-green-400 font-bold" : 
                  isSystem ? "text-purple-400" : "text-cyan-300"
                }`}
              >
                {log}
              </div>
            );
          })}
          {isProcessing && (
            <div className="text-purple-400 animate-pulse">
              SYSTEM: Agent is thinking and executing code... please wait...
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex mt-auto border-t border-cyan-900 pt-4">
          <div className="flex items-center text-cyan-600 mr-2 shrink-0">
            {passphrase ? "root@agent:~#" : "guest@lab:~#"}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            autoFocus
            autoComplete="off"
            spellCheck="false"
            className="flex-grow bg-transparent border-none outline-none text-cyan-300 placeholder-cyan-900 disabled:opacity-50"
            placeholder={passphrase ? "Instruct the agent..." : "Enter command..."}
          />
        </form>
      </main>
    </div>
  );
}
