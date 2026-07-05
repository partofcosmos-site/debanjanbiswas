// Debanjan Biswas Portfolio App JS
// Handles navbar, particle background, parallax, scroll color shifting, and Lab sandbox physics.

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initCosmicBackground();
  initResourcesAccordions();
  initLabSandbox();
});

/* ==========================================
   1. NAVBAR DROPDOWN LOGIC
   ========================================== */
function initNavbar() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = mobileMenu.style.display === "block";
    mobileMenu.style.display = isExpanded ? "none" : "block";
    toggleBtn.innerHTML = isExpanded 
      ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`
      : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
  });
}

/* ==========================================
   2. COSMIC BACKGROUND PARTICLES & COLOR SHIFTS
   ========================================== */
function initCosmicBackground() {
  const canvas = document.querySelector(".cosmic-canvas");
  const planet = document.querySelector(".planet-sphere");
  const glowLeft = document.querySelector(".glow-left");
  const glowRight = document.querySelector(".glow-right");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Particle simulation values
  let particles = [];
  const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#22d3ee", "#ffffff"];
  const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
  let scrollPercent = 0;
  let parallax = { x: 0, y: 0 };

  // Set sizing
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 18000), 110);
    for (let i = 0; i < count; i++) {
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
  }

  window.addEventListener("resize", resize);
  resize();

  // Mouse tracking
  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;

    if (planet) {
      const px = ((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * 25;
      const py = ((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * 25;
      parallax.x = px;
      parallax.y = py;
      updatePlanetParallax();
    }
  });

  document.addEventListener("mouseleave", () => {
    mouse.targetX = -1000;
    mouse.targetY = -1000;
    parallax.x = 0;
    parallax.y = 0;
    updatePlanetParallax();
  });

  function updatePlanetParallax() {
    if (!planet) return;
    planet.style.transform = `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(${1 + scrollPercent * 0.05})`;
  }

  // Scroll Tracking & Planet Color Shift
  function handleScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollPercent = docHeight <= 0 ? 0 : Math.min(Math.max(window.scrollY / docHeight, 0), 1);
    updatePlanetColors();
    updatePlanetParallax();
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  function interpolateRgb(c1, c2, t) {
    return {
      r: Math.round(c1.r + (c2.r - c1.r) * t),
      g: Math.round(c1.g + (c2.g - c1.g) * t),
      b: Math.round(c1.b + (c2.b - c1.b) * t)
    };
  }

  function rgbToString({ r, g, b }, alpha = 1) {
    return alpha === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function updatePlanetColors() {
    const c1_inner = hexToRgb("#4ade80");
    const c1_mid = hexToRgb("#3b82f6");
    const c1_outer = hexToRgb("#1d4ed8");

    const c2_inner = hexToRgb("#f472b6");
    const c2_mid = hexToRgb("#8b5cf6");
    const c2_outer = hexToRgb("#4c1d95");

    const c3_inner = hexToRgb("#fde047");
    const c3_mid = hexToRgb("#ea580c");
    const c3_outer = hexToRgb("#7c2d12");

    let inner, mid, outer;

    if (scrollPercent <= 0.5) {
      const t = scrollPercent * 2;
      inner = interpolateRgb(c1_inner, c2_inner, t);
      mid = interpolateRgb(c1_mid, c2_mid, t);
      outer = interpolateRgb(c1_outer, c2_outer, t);
    } else {
      const t = (scrollPercent - 0.5) * 2;
      inner = interpolateRgb(c2_inner, c3_inner, t);
      mid = interpolateRgb(c2_mid, c3_mid, t);
      outer = interpolateRgb(c2_outer, c3_outer, t);
    }

    const innerStr = rgbToString(inner);
    const midStr = rgbToString(mid);
    const outerStr = rgbToString(outer);
    const glowStr = rgbToString(mid, 0.35);

    if (planet) {
      planet.style.background = `radial-gradient(circle at 30% 30%, ${innerStr} 0%, ${midStr} 45%, ${outerStr} 100%)`;
      planet.style.boxShadow = `0 0 80px 20px ${glowStr}, inset -40px -40px 100px rgba(0, 0, 0, 0.95), inset 20px 20px 80px rgba(255, 255, 255, 0.2)`;
    }

    if (glowLeft) glowLeft.style.backgroundColor = glowStr;
    if (glowRight) glowRight.style.backgroundColor = glowStr;
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Cursor repulsion
      if (mouse.x > 0 && mouse.y > 0) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 180;

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const forcePower = 1.6;
          const ax = (dx / dist) * force * forcePower;
          const ay = (dy / dist) * force * forcePower;

          p.vx += ax * 0.15;
          p.vy += ay * 0.15;

          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          const maxSpeed = 3.5;
          if (speed > maxSpeed) {
            p.vx = (p.vx / speed) * maxSpeed;
            p.vy = (p.vy / speed) * maxSpeed;
          }
        }
      }

      p.vx *= 0.96;
      p.vy *= 0.96;

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const targetSpeed = 0.2;
      if (speed < targetSpeed) {
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;
      }

      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;

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

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================
   3. ACCORDIONS / COLLAPSIBLES (Resources page)
   ========================================== */
function initResourcesAccordions() {
  // Blog Articles expansion
  const blogCards = document.querySelectorAll(".blog-card");
  blogCards.forEach((card) => {
    const trigger = card.querySelector(".blog-trigger");
    const content = card.querySelector(".blog-content");
    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isExpanded = card.classList.contains("expanded");
      
      // Close other blogs
      blogCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("expanded");
          const otherContent = otherCard.querySelector(".blog-content");
          if (otherContent) otherContent.style.display = "none";
        }
      });

      if (isExpanded) {
        card.classList.remove("expanded");
        content.style.display = "none";
      } else {
        card.classList.add("expanded");
        content.style.display = "flex";
      }
    });
  });

  // Collapsible Stack (Bottom section)
  const stackWrapper = document.querySelector(".study-stack-wrapper");
  if (stackWrapper) {
    const headerBtn = stackWrapper.querySelector(".stack-header-btn");
    const content = stackWrapper.querySelector(".collapsible-stack-content");
    if (headerBtn && content) {
      headerBtn.addEventListener("click", () => {
        const isExpanded = stackWrapper.classList.contains("expanded");
        if (isExpanded) {
          stackWrapper.classList.remove("expanded");
          content.style.display = "none";
        } else {
          stackWrapper.classList.add("expanded");
          content.style.display = "flex";
        }
      });
    }
  }
}

/* ==========================================
   4. NEWTONIAN PHYSICS SANDBOX (Lab page)
   ========================================== */
function initLabSandbox() {
  const canvas = document.querySelector(".sandbox-canvas-el");
  const clearBtn = document.querySelector(".sandbox-clear-btn");
  const sliderInput = document.querySelector(".sandbox-slider-input");
  const massValSpan = document.querySelector(".mass-val");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let animationId;
  let planets = [];
  let sunMass = 5000;

  // Sync state with UI elements
  if (sliderInput && massValSpan) {
    sunMass = Number(sliderInput.value);
    massValSpan.textContent = `${sunMass} kg`;

    sliderInput.addEventListener("input", (e) => {
      sunMass = Number(e.target.value);
      massValSpan.textContent = `${sunMass} kg`;
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      planets = [];
    });
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Spawning mechanics on click
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const dx = clickX - centerX;
    const dy = clickY - centerY;
    const r = Math.sqrt(dx * dx + dy * dy);

    if (r < 25) return; // Prevent spawning inside solar sphere

    // Circular orbital speed: v = sqrt(G * M / r)
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

    planets.push({
      x: clickX,
      y: clickY,
      vx,
      vy,
      mass: Math.random() * 2.5 + 2.5,
      color: randomColor,
      trail: []
    });
  });

  // Newtonian simulation physics loop
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 1. Draw central star (Sun)
    ctx.save();
    const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 24);
    glowGradient.addColorStop(0, "#fef08a");
    glowGradient.addColorStop(0.3, "#eab308");
    glowGradient.addColorStop(1, "rgba(234, 179, 8, 0)");
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
    ctx.fill();

    // Solid core sun
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#facc15";
    ctx.fill();
    ctx.restore();

    const G = 0.05;
    const newPlanets = [];

    planets.forEach((p) => {
      const dx = centerX - p.x;
      const dy = centerY - p.y;
      const r = Math.sqrt(dx * dx + dy * dy);

      // Collided with Sun
      if (r < 12) return;

      // Newtonian gravity force: F = G * M1 * M2 / r^2
      // Acceleration: a = F / M2 = G * M1 / r^2
      const acceleration = (G * sunMass) / (r * r);
      p.vx += (dx / r) * acceleration;
      p.vy += (dy / r) * acceleration;

      // Position update
      p.x += p.vx;
      p.y += p.vy;

      // Log trails
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 45) {
        p.trail.shift();
      }

      // Draw trails
      if (p.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let i = 1; i < p.trail.length; i++) {
          ctx.lineTo(p.trail[i].x, p.trail[i].y);
        }
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = 0.15;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // Draw planet
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.mass, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.restore();

      // Max boundaries removal
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1000) {
        newPlanets.push(p);
      }
    });

    planets = newPlanets;
    animationId = requestAnimationFrame(draw);
  }

  draw();
}
