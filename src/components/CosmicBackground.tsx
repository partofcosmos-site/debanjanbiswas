"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

// Helper to convert hex to RGB
function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

// Helper to interpolate RGB values
function interpolateRgb(c1: RGB, c2: RGB, t: number): RGB {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  };
}

// Helper to turn RGB object into string
function rgbToString({ r, g, b }: RGB, alpha = 1): string {
  return alpha === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Compute scroll-interpolated planet color scheme
function getPlanetColors(scrollPercent: number) {
  // Earth (0.0): Inner #4ade80, Mid #3b82f6, Outer #1d4ed8
  // Nebula (0.5): Inner #f472b6, Mid #8b5cf6, Outer #4c1d95
  // Supernova (1.0): Inner #fde047, Mid #ea580c, Outer #7c2d12
  
  const c1_inner = hexToRgb("#4ade80");
  const c1_mid = hexToRgb("#3b82f6");
  const c1_outer = hexToRgb("#1d4ed8");
  
  const c2_inner = hexToRgb("#f472b6");
  const c2_mid = hexToRgb("#8b5cf6");
  const c2_outer = hexToRgb("#4c1d95");
  
  const c3_inner = hexToRgb("#fde047");
  const c3_mid = hexToRgb("#ea580c");
  const c3_outer = hexToRgb("#7c2d12");
  
  let inner: RGB, mid: RGB, outer: RGB;
  
  if (scrollPercent <= 0.5) {
    const t = scrollPercent * 2; // scale 0-0.5 to 0-1
    inner = interpolateRgb(c1_inner, c2_inner, t);
    mid = interpolateRgb(c1_mid, c2_mid, t);
    outer = interpolateRgb(c1_outer, c2_outer, t);
  } else {
    const t = (scrollPercent - 0.5) * 2; // scale 0.5-1 to 0-1
    inner = interpolateRgb(c2_inner, c3_inner, t);
    mid = interpolateRgb(c2_mid, c3_mid, t);
    outer = interpolateRgb(c2_outer, c3_outer, t);
  }
  
  return {
    inner: rgbToString(inner),
    mid: rgbToString(mid),
    outer: rgbToString(outer),
    glow: rgbToString(mid, 0.35)
  };
}

// Core background component
export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  
  // Mouse position reference for canvas thread
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  // Scroll listener for planet color transitions
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.min(Math.max(window.scrollY / docHeight, 0), 1);
      setScrollPercent(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial load check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mousemove listener for parallax & repulsion target tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // For Canvas physics repulsion
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;

      // For Planet Parallax shift (max 25px offset)
      const px = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2) * 25;
      const py = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2) * 25;
      setParallax({ x: px, y: py });
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
      setParallax({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Canvas Antigravity Particle Physics simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 18000), 110);
      
      const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#22d3ee", "#ffffff"];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Render & Update particles
      particles.forEach((p) => {
        // Natural drift
        p.x += p.vx;
        p.y += p.vy;

        // Antigravity repulsion physics
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 180;

          if (dist < repulsionRadius) {
            // Repulsion strength increases closer to cursor
            const force = (repulsionRadius - dist) / repulsionRadius;
            const forcePower = 1.6;
            
            // Push away
            const ax = (dx / dist) * force * forcePower;
            const ay = (dy / dist) * force * forcePower;

            p.vx += ax * 0.15;
            p.vy += ay * 0.15;

            // Apply speed limit
            const maxSpeed = 3.5;
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > maxSpeed) {
              p.vx = (p.vx / speed) * maxSpeed;
              p.vy = (p.vy / speed) * maxSpeed;
            }
          }
        }

        // Return forces (friction/drag back to standard speed)
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Add subtle default kinetic energy to keep particles moving
        const targetSpeed = 0.2;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < targetSpeed) {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
        }

        // Screen boundary wrap around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Compute scroll-interpolated planet color scheme
  const planetColors = getPlanetColors(scrollPercent);

  // Styling properties updated in real time
  const planetStyle = {
    background: `radial-gradient(circle at 30% 30%, ${planetColors.inner} 0%, ${planetColors.mid} 45%, ${planetColors.outer} 100%)`,
    boxShadow: `0 0 80px 20px ${planetColors.glow}, inset -40px -40px 100px rgba(0, 0, 0, 0.95), inset 20px 20px 80px rgba(255, 255, 255, 0.2)`,
    transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(${1 + scrollPercent * 0.05})`,
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
  };

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[#020408]">
      {/* 1. HTML5 Canvas: Interactive repelling particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block z-10 pointer-events-auto"
      />

      {/* 2. Color-shifting, Parallax-tilting Earth Sphere */}
      <div 
        className="absolute -right-24 md:right-8 lg:right-20 top-1/4 md:top-[18%] w-80 h-80 md:w-[450px] md:h-[450px] rounded-full z-0 flex items-center justify-center overflow-hidden"
        style={planetStyle}
      >
        {/* Subtle cloud rotation overlay layer */}
        <div 
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay animate-[spin_100s_linear_infinite]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 2px, transparent 40px)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      {/* 3. Global ambient lighting glows */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[160px] -left-48 -top-48 transition-colors duration-1000"
          style={{ backgroundColor: planetColors.glow }}
        />
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[180px] right-0 bottom-0 opacity-30 transition-colors duration-1000"
          style={{ backgroundColor: planetColors.glow }}
        />
      </div>
    </div>
  );
}
