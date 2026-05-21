"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  alpha: number;
  twinkleSpeed: number;
  originalAlpha: number;
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const particleCount = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 9000));

    // Handle high DPI displays
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const colors = [
        "rgba(6, 182, 212, ",   // Cyan
        "rgba(139, 92, 246, ",  // Purple
        "rgba(236, 72, 153, ",  // Pink
        "rgba(255, 255, 255, "  // White
      ];

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 0.5;
        const alpha = Math.random() * 0.6 + 0.1;
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          alpha,
          originalAlpha: alpha,
          twinkleSpeed: Math.random() * 0.02 + 0.005
        });
      }
    };

    // Tracking mouse with smooth interpolation
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const drawBackgroundGradient = () => {
      // Draw a very subtle radial glow corresponding to mouse position
      const mouse = mouseRef.current;
      if (mouse.x > -500 && mouse.y > -500) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 400
        );
        gradient.addColorStop(0, "rgba(139, 92, 246, 0.04)");
        gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.02)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Interpolate mouse coordinates for fluid animation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      drawBackgroundGradient();

      // Render and update particles
      particles.forEach((p) => {
        // Star Twinkle Effect
        p.alpha += p.twinkleSpeed;
        if (p.alpha > p.originalAlpha + 0.25 || p.alpha < p.originalAlpha - 0.25) {
          p.twinkleSpeed = -p.twinkleSpeed;
        }
        // Clamping alpha between 0.05 and 0.95
        p.alpha = Math.max(0.05, Math.min(0.95, p.alpha));

        // Base physics
        let dx = p.speedX;
        let dy = p.speedY;

        // Gravitational drift from mouse
        if (mouse.x > -500 && mouse.y > -500) {
          const distX = mouse.x - p.x;
          const distY = mouse.y - p.y;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          if (distance < 250) {
            const force = (250 - distance) / 250;
            // Push particles slightly away or drag them depending on physics
            dx += (distX / distance) * force * 0.2;
            dy += (distY / distance) * force * 0.2;
          }
        }

        p.x += dx;
        p.y += dy;

        // Boundary checks (wrapping around screen)
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        
        // Add custom glow to bright stars
        if (p.size > 1.8) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(139, 92, 246, 0.5)";
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
