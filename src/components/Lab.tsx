"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Activity, ShieldCheck, Sun, Star } from "lucide-react";
import studentData from "../../data/studentData.json";

interface Planet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  color: string;
  trail: { x: number; y: number }[];
}

interface Domain {
  name: string;
  category: string;
  description: string;
  features: string[];
}

const conqueredProblems: Record<string, string[]> = {
  "Classical Mechanics": [
    "I.E. Irodov: Part 1 - Kinematics & Mechanics (Problems 1.1 - 1.180)",
    "Pathfinder: Chapter 2 (Newton's Laws) MCQ & Build Up Your Understanding",
    "Pathfinder: Chapter 3 (Work, Power, Energy) & Circular Motion Problems",
    "IIT-JEE Advanced: Past 10 Years Rotational Dynamics questions"
  ],
  "Electrodynamics": [
    "Resnick Halliday: Chapter 21-28 Complete Theory & Concepts",
    "I.E. Irodov: Problems 3.1 - 3.75 (Basic Electrostatic Fields)",
    "Pathfinder: Electrostatics Chapter MCQ & review tasks"
  ],
  "Thermodynamics & KTG": [
    "I.E. Irodov: Problems 2.1 - 2.50 (KTG & Heat capacity vectors)",
    "IIT-JEE Advanced: Carnot Cycle & Entropy probability graphs"
  ],
  "Optics & Waves": [
    "I.E. Irodov: Problems 4.120 - 4.180 (Acoustic Doppler shifts & waves)",
    "Resnick Halliday: Interference & Young's Double Slit experiment analysis"
  ],
  "Modern & Quantum Physics": [
    "I.E. Irodov: Problems 6.1 - 6.40 (Photoelectric effect voltage, de Broglie thresholds)",
    "Bohr Atomic Model: Energy orbital transitions & spectral calculations"
  ]
};

export default function Lab() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Simulator State
  const [sunMass, setSunMass] = useState<number>(15000);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const planetsRef = useRef<Planet[]>([]);

  const domains = studentData.domains;

  // Sync state with ref for canvas animation loop
  useEffect(() => {
    planetsRef.current = planets;
  }, [planets]);

  // Newtonian Gravity Orbit Simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const G = 0.05; // Gravitational constant for sandbox scale

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 1. Draw central gravitational mass (The Sun/Star)
      ctx.save();
      const shadowGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 24);
      shadowGlow.addColorStop(0, "rgba(253, 224, 71, 1)");
      shadowGlow.addColorStop(0.3, "rgba(234, 88, 12, 0.8)");
      shadowGlow.addColorStop(1, "rgba(234, 88, 12, 0)");
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
      ctx.fillStyle = shadowGlow;
      ctx.fill();

      // Core star
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#fde047";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#fde047";
      ctx.fill();
      ctx.restore();

      // 2. Physics updates for spawned planets
      const currentPlanets = planetsRef.current;
      const updatedPlanets = currentPlanets.map((p) => {
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Physics limits (prevent singularity division by zero)
        if (dist > 10) {
          // F = G * (M1 * M2) / r^2
          const force = (G * sunMass) / (dist * dist);
          const ax = force * (dx / dist);
          const ay = force * (dy / dist);

          p.vx += ax;
          p.vy += ay;
        }

        // Apply velocity to coordinates
        p.x += p.vx;
        p.y += p.vy;

        // Record trailing orbit path
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 90) {
          p.trail.shift();
        }

        // Draw Orbit Trail
        ctx.beginPath();
        if (p.trail.length > 1) {
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
        }
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Planet Body
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.mass, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();

        return p;
      });

      // Filter out planets that fly too far out of frame (bounds check)
      const visiblePlanets = updatedPlanets.filter((p) => {
        const maxDist = Math.max(canvas.width, canvas.height) * 2;
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        return Math.sqrt(dx * dx + dy * dy) < maxDist;
      });

      // Only update state if count or position has changed to prevent React lag
      planetsRef.current = visiblePlanets;

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [sunMass]);

  // Click on Canvas to launch an orbiting satellite planet
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const dx = clickX - centerX;
    const dy = clickY - centerY;
    const r = Math.sqrt(dx * dx + dy * dy);

    if (r < 25) return; // Prevent spawning inside the Sun

    // Launch with perfect Newtonian circular orbital velocity: v = sqrt(G * M / r)
    const G = 0.05;
    const orbitalSpeed = Math.sqrt((G * sunMass) / r);

    // Tangential direction vector relative to central sun
    const tx = -dy / r;
    const ty = dx / r;

    // Apply speed to tangential vector
    const vx = tx * orbitalSpeed;
    const vy = ty * orbitalSpeed;

    const colors = ["#22d3ee", "#8b5cf6", "#ec4899", "#4ade80", "#a78bfa"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newPlanet: Planet = {
      x: clickX,
      y: clickY,
      vx,
      vy,
      mass: Math.random() * 2.5 + 2.5,
      color: randomColor,
      trail: []
    };

    setPlanets((prev) => [...prev, newPlanet]);
  };

  const clearSandbox = () => {
    setPlanets([]);
  };

  return (
    <section className="relative min-h-screen px-6 max-w-5xl mx-auto z-10 pt-16 sm:pt-20 pb-20 flex flex-col justify-start items-center">
      <div className="space-y-12 relative z-10 w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="space-y-3 text-center max-w-xl">
          <span className="text-[11px] font-mono font-medium tracking-widest text-indigo-400 uppercase flex items-center justify-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> Physics Sandbox Node
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-none">
            The Cosmos Lab
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto pt-1">
            Newtonian mechanics sandbox simulator alongside study quest landmarks.
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto" />
        </div>

        {/* Sandbox */}
        <div className="w-full max-w-3xl space-y-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-mono font-semibold text-gray-400 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-yellow-400" /> Orbit Mechanics
            </span>
            <button 
              onClick={clearSandbox}
              className="text-[10px] font-mono text-gray-500 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Clear Sandbox
            </button>
          </div>

          {/* Interactive Canvas Container */}
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden glass-panel border border-white/[0.04] bg-[#02050c]/60">
            <canvas 
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="absolute inset-0 w-full h-full block cursor-crosshair"
            />
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none text-center">
              <span className="text-[10px] font-mono text-gray-600 tracking-wide bg-[#010307]/80 px-3 py-1.5 rounded-full border border-white/[0.03]">
                Click inside canvas to launch a satellite planet
              </span>
            </div>
          </div>

          {/* Simulation Variables controls */}
          <div className="p-5 rounded-2xl glass-panel border border-white/[0.04] bg-[#02050c]/40 font-mono text-[10px] text-gray-400 space-y-4">
            <div className="flex justify-between items-center">
              <span>Central Star Mass ($M$):</span>
              <span className="text-indigo-400 font-semibold">{sunMass} kg</span>
            </div>
            <input 
              type="range"
              min="5000"
              max="30000"
              step="1000"
              value={sunMass}
              onChange={(e) => setSunMass(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[9px] text-gray-600 pt-1">
              <span>Weak gravity</span>
              <span>Strong gravity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
