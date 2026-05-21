"use client";

import React, { useEffect, useRef } from "react";

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  radius: number;
  color: string;
  history: { x: number; y: number }[];
  maxHistory: number;
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, isDown: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let bodies: Body[] = [];
    
    // Central attractor (representing the Core of Academic Focus)
    const centralAttractor = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      mass: 8000,
      radius: 8,
      color: "rgba(6, 182, 212, 0.85)" // Glowing Cyan
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      
      centralAttractor.x = window.innerWidth / 2;
      centralAttractor.y = window.innerHeight / 2;
      initPhysicsSystem();
    };

    const initPhysicsSystem = () => {
      bodies = [];
      const particleCount = Math.min(25, Math.floor(window.innerWidth / 60));
      
      const colors = [
        "rgba(6, 182, 212, ",   // Cyan
        "rgba(139, 92, 246, ",  // Purple
        "rgba(236, 72, 153, "   // Pink
      ];

      for (let i = 0; i < particleCount; i++) {
        // Place bodies in circular orbits around the center
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * (Math.min(window.innerWidth, window.innerHeight) * 0.45) + 60;
        
        const x = centralAttractor.x + Math.cos(angle) * dist;
        const y = centralAttractor.y + Math.sin(angle) * dist;
        
        // Orbital velocity calculation: v = sqrt(G * M / r)
        const G = 0.8;
        const speed = Math.sqrt((G * centralAttractor.mass) / dist) * 0.9;
        
        // Velocity vector perpendicular to distance vector
        const vx = -Math.sin(angle) * speed + (Math.random() - 0.5) * 0.2;
        const vy = Math.cos(angle) * speed + (Math.random() - 0.5) * 0.2;

        bodies.push({
          x,
          y,
          vx,
          vy,
          mass: Math.random() * 4 + 1,
          radius: Math.random() * 1.5 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          history: [],
          maxHistory: Math.floor(Math.random() * 40 + 20)
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseDown = () => {
      mouseRef.current.isDown = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
      mouseRef.current.isDown = false;
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Mouse coordinate interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw faint grid coordinate markings
      ctx.strokeStyle = "rgba(139, 92, 246, 0.03)";
      ctx.lineWidth = 0.5;

      // Render Central attractors glow
      const attractorGlow = ctx.createRadialGradient(
        centralAttractor.x, centralAttractor.y, 0,
        centralAttractor.x, centralAttractor.y, 120
      );
      attractorGlow.addColorStop(0, "rgba(6, 182, 212, 0.06)");
      attractorGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = attractorGlow;
      ctx.beginPath();
      ctx.arc(centralAttractor.x, centralAttractor.y, 120, 0, Math.PI * 2);
      ctx.fill();

      // Render custom electrostatic charge fields from mouse click
      if (mouse.x > -500 && mouse.isDown) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 160
        );
        mouseGlow.addColorStop(0, "rgba(236, 72, 153, 0.08)");
        mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = "rgba(236, 72, 153, 0.15)";
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 40, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Physics Engine
      const G = 0.8; // Gravitational Constant multiplier
      
      bodies.forEach((body) => {
        // Gravitational force from Central Attractor
        const dxCenter = centralAttractor.x - body.x;
        const dyCenter = centralAttractor.y - body.y;
        const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
        
        if (distCenter > 10) {
          // Newton's law: F = G * M * m / r^2
          const force = (G * centralAttractor.mass * body.mass) / (distCenter * distCenter);
          // Acceleration: a = F / m = G * M / r^2
          const ax = (dxCenter / distCenter) * (force / body.mass);
          const ay = (dyCenter / distCenter) * (force / body.mass);
          
          body.vx += ax * 0.15;
          body.vy += ay * 0.15;
        }

        // Electrostatic perturbation force from Mouse
        if (mouse.x > -500) {
          const dxMouse = mouse.x - body.x;
          const dyMouse = mouse.y - body.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          if (distMouse < 200 && distMouse > 5) {
            // Click to attract, hover to gently deflect (Simulates Charge polarization)
            const chargeCoeff = mouse.isDown ? 300 : -50; 
            const forceMouse = (G * chargeCoeff * body.mass) / (distMouse * distMouse);
            
            body.vx += (dxMouse / distMouse) * forceMouse * 0.1;
            body.vy += (dyMouse / distMouse) * forceMouse * 0.1;
          }
        }

        // Speed limits
        const speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);
        const maxSpeed = 10;
        if (speed > maxSpeed) {
          body.vx = (body.vx / speed) * maxSpeed;
          body.vy = (body.vy / speed) * maxSpeed;
        }

        // Apply velocity vectors
        body.x += body.vx * 0.8;
        body.y += body.vy * 0.8;

        // Record history trails
        body.history.push({ x: body.x, y: body.y });
        if (body.history.length > body.maxHistory) {
          body.history.shift();
        }

        // Render Orbit Trails
        if (body.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(body.history[0].x, body.history[0].y);
          for (let k = 1; k < body.history.length; k++) {
            ctx.lineTo(body.history[k].x, body.history[k].y);
          }
          ctx.strokeStyle = `${body.color}0.08)`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        // Render Vector link to attraction core
        ctx.beginPath();
        ctx.moveTo(body.x, body.y);
        ctx.lineTo(centralAttractor.x, centralAttractor.y);
        ctx.strokeStyle = "rgba(139, 92, 246, 0.015)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Render orbiting physical body
        ctx.beginPath();
        ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${body.color}0.65)`;
        
        if (body.radius > 1.8) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(6, 182, 212, 0.4)";
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });

      // Render Central Attractor Core Dot
      ctx.beginPath();
      ctx.arc(centralAttractor.x, centralAttractor.y, centralAttractor.radius, 0, Math.PI * 2);
      ctx.fillStyle = centralAttractor.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
      ctx.fill();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
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
