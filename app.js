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
  const nbodyToggle = document.getElementById("nbody-toggle");
  const collisionToggle = document.getElementById("collision-toggle");
  const keplerToggle = document.getElementById("kepler-toggle");

  // Kepler's 2nd law polygon area calculator
  function calculateWedgeArea(points, cx, cy) {
    let area = 0;
    for (let k = 0; k < points.length - 1; k++) {
      const x1 = points[k].x - cx;
      const y1 = points[k].y - cy;
      const x2 = points[k + 1].x - cx;
      const y2 = points[k + 1].y - cy;
      area += 0.5 * Math.abs(x1 * y2 - x2 * y1);
    }
    return area;
  }

  // HUD elements
  const hudCount = document.getElementById("hud-count");
  const hudEnergy = document.getElementById("hud-energy");
  const hudOrbit = document.getElementById("hud-orbit");
  const hudEcc = document.getElementById("hud-ecc");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let animationId;
  let planets = [];
  let sunMass = 5000;
  
  // Drag and launch state
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };
  let dragCurrent = { x: 0, y: 0 };
  const speedScale = 0.018; // Calibrated for launching
  
  // Hover state
  let hoveredPlanet = null;
  let canvasMouse = { x: 0, y: 0 };

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
      hoveredPlanet = null;
    });
  }

  // Helper for Keplerian orbital speed
  const G = 0.05;

  // Presets launch mechanics
  const presetBtns = document.querySelectorAll(".preset-btn");
  presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      planets = [];
      hoveredPlanet = null;
      const preset = btn.getAttribute("data-preset");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (preset === "circular") {
        const r = 120;
        const speed = Math.sqrt((G * sunMass) / r);
        planets.push({
          x: centerX,
          y: centerY - r,
          vx: speed,
          vy: 0,
          mass: 4,
          color: "#22d3ee",
          trail: []
        });
      } else if (preset === "binary") {
        const r1 = 100;
        const speed1 = Math.sqrt((G * sunMass) / r1);
        planets.push({
          x: centerX,
          y: centerY - r1,
          vx: speed1,
          vy: 0,
          mass: 3,
          color: "#8b5cf6",
          trail: []
        });

        const r2 = 170;
        const speed2 = Math.sqrt((G * sunMass) / r2);
        planets.push({
          x: centerX,
          y: centerY + r2,
          vx: -speed2, // Orbiting opposite direction
          vy: 0,
          mass: 5,
          color: "#ec4899",
          trail: []
        });
      } else if (preset === "elliptical") {
        const r = 120;
        // Keplerian elliptic: launch with 65% of circular speed
        const speed = Math.sqrt((G * sunMass) / r) * 0.65;
        planets.push({
          x: centerX,
          y: centerY - r,
          vx: speed,
          vy: 0,
          mass: 4,
          color: "#4ade80",
          trail: []
        });
      } else if (preset === "moon") {
        // Sun-Planet-Moon system
        // Auto-enable N-body gravity so moon actually orbits planet
        if (nbodyToggle) nbodyToggle.checked = true;

        const rPlanet = 135;
        const speedPlanet = Math.sqrt((G * sunMass) / rPlanet);
        
        // Heavy planet
        planets.push({
          id: 1,
          x: centerX,
          y: centerY - rPlanet,
          vx: speedPlanet,
          vy: 0,
          mass: 16,
          color: "#22d3ee",
          trail: []
        });

        // Small moon orbiting planet
        const rMoon = 22;
        const speedMoon = Math.sqrt((G * 16) / rMoon); // GM_planet / r_moon
        planets.push({
          id: 2,
          x: centerX,
          y: centerY - rPlanet - rMoon,
          vx: speedPlanet + speedMoon, // Orbiting in the same direction
          vy: 0,
          mass: 2.5,
          color: "#fde047",
          trail: []
        });
      }
    });
  });

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Spawning mechanics on click and drag
  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const r = Math.sqrt(dx * dx + dy * dy);

    if (r < 25) return; // Don't allow drag start inside the Sun

    isDragging = true;
    dragStart = { x, y };
    dragCurrent = { x, y };
  });

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    canvasMouse.x = e.clientX - rect.left;
    canvasMouse.y = e.clientY - rect.top;

    if (isDragging) {
      dragCurrent.x = canvasMouse.x;
      dragCurrent.y = canvasMouse.y;
    } else {
      // Find nearest planet to hover
      let nearest = null;
      let minDist = 20; // Hover radius threshold
      planets.forEach((p) => {
        const dx = p.x - canvasMouse.x;
        const dy = p.y - canvasMouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < minDist) {
          nearest = p;
          minDist = d;
        }
      });
      hoveredPlanet = nearest;
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;

    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const dx = endX - dragStart.x;
    const dy = endY - dragStart.y;
    const dragDist = Math.sqrt(dx * dx + dy * dy);

    if (dragDist < 5) {
      // Circular launch on a simple click
      launchCircularPlanet(dragStart.x, dragStart.y);
    } else {
      // Custom velocity launch
      const vx = dx * speedScale;
      const vy = dy * speedScale;
      
      const colors = ["#22d3ee", "#8b5cf6", "#ec4899", "#4ade80", "#a78bfa", "#fde047"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      planets.push({
        x: dragStart.x,
        y: dragStart.y,
        vx,
        vy,
        mass: Math.random() * 2.5 + 2.5,
        color: randomColor,
        trail: []
      });
    }
  });

  function launchCircularPlanet(x, y) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const r = Math.sqrt(dx * dx + dy * dy);
    
    if (r < 25) return;

    const orbitalSpeed = Math.sqrt((G * sunMass) / r);

    // Tangential direction
    const tx = -dy / r;
    const ty = dx / r;

    const vx = tx * orbitalSpeed;
    const vy = ty * orbitalSpeed;

    const colors = ["#22d3ee", "#8b5cf6", "#ec4899", "#4ade80", "#a78bfa", "#fde047"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    planets.push({
      x,
      y,
      vx,
      vy,
      mass: Math.random() * 2.5 + 2.5,
      color: randomColor,
      trail: []
    });
  }

  // Pre-calculate Keplerian predicted orbit for dragging visualization
  function getOrbitPrediction(startX, startY, startVx, startVy, steps = 300) {
    let simX = startX;
    let simY = startY;
    let simVx = startVx;
    let simVy = startVy;
    const path = [];
    const dt = 1;

    for (let i = 0; i < steps; i++) {
      const dx = canvas.width / 2 - simX;
      const dy = canvas.height / 2 - simY;
      const r = Math.sqrt(dx * dx + dy * dy);

      if (r < 12) break;

      const acceleration = (G * sunMass) / (r * r);
      simVx += (dx / r) * acceleration;
      simVy += (dy / r) * acceleration;
      simX += simVx;
      simY += simVy;

      path.push({ x: simX, y: simY });
    }
    return path;
  }

  // Acceleration calculations for Verlet Integrator
  function getAccelerationNBody(x, y, pIndex, allPlanets, nBodyEnabled) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Accel due to central sun
    const dxSun = centerX - x;
    const dySun = centerY - y;
    const rSun = Math.sqrt(dxSun * dxSun + dySun * dySun);
    let ax = 0;
    let ay = 0;
    if (rSun > 0.1) {
      const fSun = (G * sunMass) / (rSun * rSun * rSun);
      ax += dxSun * fSun;
      ay += dySun * fSun;
    }

    // Accel due to other planets
    if (nBodyEnabled) {
      allPlanets.forEach((other, index) => {
        if (index === pIndex) return;
        const dx = other.x - x;
        const dy = other.y - y;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r > 8) { // softening factor
          const f = (G * other.mass) / (r * r * r);
          ax += dx * f;
          ay += dy * f;
        }
      });
    }

    return { ax, ay };
  }

  // Specific orbital specs for HUD
  function getOrbitTypeAndSpecs(p) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const rx = p.x - centerX;
    const ry = p.y - centerY;
    const r = Math.sqrt(rx * rx + ry * ry);
    const mu = G * sunMass;
    
    if (r < 0.1) return { energy: "-", eccentricity: "-", type: "-" };

    const v2 = p.vx * p.vx + p.vy * p.vy;
    
    // E/m = v²/2 - mu/r
    const energy = v2 / 2 - mu / r;
    
    // h = r x v
    const h = rx * p.vy - ry * p.vx;
    
    // e² = 1 + (2 * E/m * h²) / mu²
    const eSq = 1 + (2 * energy * h * h) / (mu * mu);
    const eccentricity = Math.sqrt(Math.max(0, eSq));
    
    let type = "Elliptical";
    if (eccentricity < 0.08) {
      type = "Circular";
    } else if (energy >= 0) {
      type = "Hyperbolic (Escape)";
    }
    
    return {
      energy: energy.toFixed(2),
      eccentricity: eccentricity.toFixed(3),
      type: type
    };
  }

  // Newtonian simulation physics loop
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const nBodyEnabled = nbodyToggle ? nbodyToggle.checked : false;
    const collisionEnabled = collisionToggle ? collisionToggle.checked : true;

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

    // 2. Draw drag line and orbit prediction
    if (isDragging) {
      ctx.save();
      // Spawn point dot
      ctx.beginPath();
      ctx.arc(dragStart.x, dragStart.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      // Get initial velocity vector from dragging
      const vx = (dragCurrent.x - dragStart.x) * speedScale;
      const vy = (dragCurrent.y - dragStart.y) * speedScale;

      // Draw path prediction
      const path = getOrbitPrediction(dragStart.x, dragStart.y, vx, vy, 300);
      if (path.length > 1) {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw vector line
      ctx.beginPath();
      ctx.moveTo(dragStart.x, dragStart.y);
      ctx.lineTo(dragCurrent.x, dragCurrent.y);
      ctx.strokeStyle = "#818cf8";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw arrowhead
      const angle = Math.atan2(dragCurrent.y - dragStart.y, dragCurrent.x - dragStart.x);
      ctx.beginPath();
      ctx.moveTo(dragCurrent.x, dragCurrent.y);
      ctx.lineTo(dragCurrent.x - 10 * Math.cos(angle - Math.PI / 6), dragCurrent.y - 10 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(dragCurrent.x - 10 * Math.cos(angle + Math.PI / 6), dragCurrent.y - 10 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fillStyle = "#818cf8";
      ctx.fill();
      ctx.restore();
    }

    // 3. Collision and Merger Logic
    if (collisionEnabled && planets.length > 1) {
      for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
          const p1 = planets[i];
          const p2 = planets[j];
          if (p1.deleted || p2.deleted) continue;

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const collisionDist = p1.mass + p2.mass;

          if (dist < collisionDist) {
            const primary = p1.mass >= p2.mass ? p1 : p2;
            const secondary = p1.mass < p2.mass ? p1 : p2;

            const mSum = primary.mass + secondary.mass;
            
            // Conserve Momentum
            primary.vx = (primary.mass * primary.vx + secondary.mass * secondary.vx) / mSum;
            primary.vy = (primary.mass * primary.vy + secondary.mass * secondary.vy) / mSum;
            
            // Center of Mass Position
            primary.x = (primary.mass * primary.x + secondary.mass * secondary.x) / mSum;
            primary.y = (primary.mass * primary.y + secondary.mass * secondary.y) / mSum;
            
            primary.mass = Math.min(mSum, 24); // Cap max size
            
            secondary.deleted = true;
            if (hoveredPlanet === secondary) {
              hoveredPlanet = primary;
            }
          }
        }
      }
      planets = planets.filter((p) => !p.deleted);
    }

    // 4. Velocity Verlet Symplectic Integration Step
    const dt = 1;
    
    // a. Compute accelerations at current positions
    const accs = planets.map((p, index) => {
      return getAccelerationNBody(p.x, p.y, index, planets, nBodyEnabled);
    });

    // b. Update positions using current velocity & acceleration (x = x + v*dt + 0.5*a*dt^2)
    planets.forEach((p, index) => {
      const dxSun = centerX - p.x;
      const dySun = centerY - p.y;
      const r = Math.sqrt(dxSun * dxSun + dySun * dySun);
      if (r < 12) {
        p.destroyed = true; // Crashed into sun
        return;
      }

      p.x += p.vx * dt + 0.5 * accs[index].ax * dt * dt;
      p.y += p.vy * dt + 0.5 * accs[index].ay * dt * dt;
    });

    // Filter out destroyed planets
    planets = planets.filter((p) => !p.destroyed && (Math.sqrt((centerX - p.x)**2 + (centerY - p.y)**2) < 1200));

    // c. Recompute accelerations at new positions
    const newAccs = planets.map((p, index) => {
      return getAccelerationNBody(p.x, p.y, index, planets, nBodyEnabled);
    });

    // d. Update velocities using average of old & new acceleration (v = v + 0.5*(a + a_new)*dt)
    planets.forEach((p, index) => {
      p.vx += 0.5 * (accs[index].ax + newAccs[index].ax) * dt;
      p.vy += 0.5 * (accs[index].ay + newAccs[index].ay) * dt;
    });

    const keplerEnabled = keplerToggle ? keplerToggle.checked : false;

    // 5. Draw planets and trails
    planets.forEach((p) => {
      // Kepler's 2nd Law Area Sweep calculation
      if (keplerEnabled) {
        if (!p.wedges) {
          p.wedges = [];
          p.currentWedgePoints = [{ x: p.x, y: p.y }];
        } else {
          p.currentWedgePoints.push({ x: p.x, y: p.y });
          if (p.currentWedgePoints.length >= 45) { // every 45 frames
            const area = calculateWedgeArea(p.currentWedgePoints, centerX, centerY);
            p.wedges.push({
              points: [...p.currentWedgePoints],
              area: area,
              color: p.wedges.length % 2 === 0 ? "rgba(99, 102, 241, 0.16)" : "rgba(34, 211, 238, 0.16)"
            });
            if (p.wedges.length > 6) {
              p.wedges.shift();
            }
            p.currentWedgePoints = [{ x: p.x, y: p.y }];
          }
        }

        // Draw completed wedges
        p.wedges.forEach((w) => {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          w.points.forEach((pt) => {
            ctx.lineTo(pt.x, pt.y);
          });
          ctx.closePath();
          ctx.fillStyle = w.color;
          ctx.fill();

          ctx.strokeStyle = w.color.replace("0.16", "0.35");
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Text label
          const midPt = w.points[Math.floor(w.points.length / 2)];
          const dx = midPt.x - centerX;
          const dy = midPt.y - centerY;
          const textX = centerX + dx * 0.65;
          const textY = centerY + dy * 0.65;

          ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
          ctx.font = "8px var(--font-mono)";
          ctx.textAlign = "center";
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(1, 3, 7, 0.9)";
          ctx.fillText(`A: ${Math.round(w.area)}`, textX, textY);
          ctx.restore();
        });
      } else {
        p.wedges = null;
        p.currentWedgePoints = null;
      }

      // Log trails
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 55) {
        p.trail.shift();
      }

      // Draw trails
      if (p.trail.length > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let i = 1; i < p.trail.length; i++) {
          ctx.lineTo(p.trail[i].x, p.trail[i].y);
        }
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = 0.18;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // Draw planet body
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.mass, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.fill();

      // Draw a subtle ring around hovered planet
      if (hoveredPlanet === p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.mass + 5, 0, Math.PI * 2);
        ctx.strokeStyle = "#ffffff";
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    });

    // 6. Update HUD display
    if (hudCount) {
      hudCount.textContent = planets.length;
    }
    
    // Choose which planet's stats to show in HUD (hovered first, else latest active)
    let displayPlanet = hoveredPlanet;
    if (!displayPlanet && planets.length > 0) {
      displayPlanet = planets[planets.length - 1];
    }

    if (displayPlanet) {
      const specs = getOrbitTypeAndSpecs(displayPlanet);
      if (hudEnergy) hudEnergy.textContent = specs.energy;
      if (hudOrbit) {
        hudOrbit.textContent = specs.type;
        // Color code escape vs bound
        hudOrbit.style.color = specs.type.includes("Escape") ? "#f87171" : "#4ade80";
      }
      if (hudEcc) hudEcc.textContent = specs.eccentricity;
    } else {
      if (hudEnergy) hudEnergy.textContent = "-";
      if (hudOrbit) {
        hudOrbit.textContent = "-";
        hudOrbit.style.color = "#4ade80";
      }
      if (hudEcc) hudEcc.textContent = "-";
    }

    animationId = requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================
   Cosmic Lounge Controller
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Only execute if on the Lounge page
  const loungeGrid = document.getElementById("lounge-grid");
  if (!loungeGrid) return;

  const searchInput = document.getElementById("lounge-search");
  const tabs = document.querySelectorAll(".lounge-tab");
  const syncBtn = document.getElementById("sync-btn");
  const syncPlatform = document.getElementById("sync-platform");
  const syncUsername = document.getElementById("sync-username");
  const syncStatus = document.getElementById("sync-status");
  const tabSyncedBtn = document.getElementById("tab-synced");

  // Keep track of dynamically synced cards
  let syncedItems = [];

  // Initialize collapsible personal reviews
  initCollapsibleReviews();

  // Search Filter event
  if (searchInput) {
    searchInput.addEventListener("input", filterGallery);
  }

  // Category Tabs click event
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      filterGallery();
    });
  });

  // Toggling collapsible reviews helper
  function initCollapsibleReviews() {
    const reviewToggles = document.querySelectorAll(".review-toggle-btn");
    reviewToggles.forEach(btn => {
      // Remove old listener to avoid duplicate bindings
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      const content = newBtn.nextElementSibling;
      newBtn.addEventListener("click", () => {
        newBtn.classList.toggle("expanded");
        content.classList.toggle("show");
      });
    });
  }

  // Live filter cards by category and keyword search
  function filterGallery() {
    const activeTab = document.querySelector(".lounge-tab.active");
    const category = activeTab ? activeTab.getAttribute("data-category") : "all";
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const cards = loungeGrid.querySelectorAll(".lounge-card");

    cards.forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      const searchStr = card.getAttribute("data-search").toLowerCase();
      
      const matchesCategory = (category === "all" && cardCategory !== "sync") || 
                              (category === cardCategory);
      
      const matchesKeyword = !keyword || searchStr.includes(keyword);

      if (matchesCategory && matchesKeyword) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Synchronize watchlist listener
  if (syncBtn) {
    syncBtn.addEventListener("click", async () => {
      const platform = syncPlatform.value;
      const username = syncUsername.value.trim();

      if (!username) {
        showStatus("Please enter a username.", "#f87171");
        return;
      }

      // Show loader
      loungeGrid.innerHTML = `
        <div class="sync-loader-container">
          <div class="galaxy-loader"></div>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; letter-spacing: 0.05em;">Accessing external grid... Syncing ${platform === "anilist" ? "AniList" : "MAL"} history</span>
        </div>
      `;
      syncStatus.textContent = "Connecting to API...";
      syncStatus.style.color = "var(--accent-indigo)";
      syncBtn.disabled = true;

      try {
        if (platform === "anilist") {
          syncedItems = await fetchAniList(username);
        } else {
          syncedItems = await fetchMAL(username);
        }

        if (!syncedItems || syncedItems.length === 0) {
          throw new Error("No completed items found or user does not exist.");
        }

        // Render synced cards
        renderSyncedCards(syncedItems);

        // Show Synced tab and select it
        if (tabSyncedBtn) {
          tabSyncedBtn.style.display = "inline-block";
          tabs.forEach(t => t.classList.remove("active"));
          tabSyncedBtn.classList.add("active");
        }

        showStatus(`Synced ${syncedItems.length} completed titles successfully!`, "#4ade80");
        filterGallery();

      } catch (err) {
        console.error(err);
        showStatus(`Sync error: ${err.message}`, "#f87171");
        // Restore grid by reloading page or resetting to fallback
        restoreCuratedGrid();
      } finally {
        syncBtn.disabled = false;
      }
    });
  }

  function showStatus(msg, color) {
    if (syncStatus) {
      syncStatus.textContent = msg;
      syncStatus.style.color = color;
    }
  }

  // Fetch Watchlist from AniList (GraphQL)
  async function fetchAniList(username) {
    const query = `
      query ($username: String) {
        MediaListCollection(userName: $username, type: ANIME, status: COMPLETED) {
          lists {
            entries {
              score(format: POINT_10)
              progress
              media {
                title {
                  english
                  romaji
                }
                coverImage {
                  large
                }
                genres
                description
                episodes
                siteUrl
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        query: query,
        variables: { username: username }
      })
    });

    if (!response.ok) {
      throw new Error("AniList user not found or API limits exceeded.");
    }

    const json = await response.json();
    const lists = json.data.MediaListCollection.lists;
    let items = [];

    lists.forEach(list => {
      list.entries.forEach(entry => {
        const media = entry.media;
        items.push({
          title: media.title.english || media.title.romaji,
          cover: media.coverImage.large,
          rating: entry.score > 0 ? `${entry.score} / 10` : "Unrated",
          episodes: media.episodes || "?",
          genres: media.genres.slice(0, 3),
          description: cleanHTMLDescription(media.description || "No synopsis available."),
          url: media.siteUrl
        });
      });
    });

    // Sort by rating descending
    return items.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Fetch Watchlist from MAL (Jikan REST API v4)
  async function fetchMAL(username) {
    const url = `https://api.jikan.moe/v4/users/${username}/animelist?status=completed`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("MyAnimeList user not found or Jikan API rate limit hit.");
    }

    const json = await response.json();
    if (!json.data || json.data.length === 0) {
      return [];
    }

    return json.data.map(item => {
      const anime = item.anime;
      return {
        title: anime.title,
        cover: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
        rating: item.score > 0 ? `${item.score} / 10` : "Unrated",
        episodes: anime.episodes || "?",
        genres: [anime.type || "Anime"],
        description: `Successfully watched ${anime.episodes || "?"} episodes. Completed score logged as ${item.score || "N/A"}.`,
        url: anime.url
      };
    });
  }

  // Strips AniList description HTML tags
  function cleanHTMLDescription(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    let text = div.textContent || div.innerText || "";
    if (text.length > 180) {
      text = text.substring(0, 180) + "...";
    }
    return text;
  }

  // Render dynamically fetched watchlist items to the grid
  function renderSyncedCards(items) {
    loungeGrid.innerHTML = "";
    items.forEach((item, index) => {
      const searchKeywords = `${item.title} ${item.genres.join(" ")} ${item.description}`.toLowerCase();
      const card = document.createElement("div");
      card.className = "glass-panel lounge-card";
      card.setAttribute("data-category", "sync");
      card.setAttribute("data-search", searchKeywords);
      
      // Delay fade animations staggered
      card.style.animationDelay = `${index * 0.05}s`;

      card.innerHTML = `
        <div class="lounge-card-img-wrap">
          <img src="${item.cover}" alt="${item.title} Cover" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300'">
          <div class="lounge-category-badge">Synced</div>
          <div class="lounge-rating-badge">${item.rating}</div>
        </div>
        <div class="lounge-card-content">
          <h3 class="lounge-card-title">${item.title}</h3>
          <div class="lounge-tags">
            ${item.genres.map(g => `<span class="lounge-tag">${g}</span>`).join("")}
            <span class="lounge-tag" style="border-color: rgba(99,102,241,0.25); color: var(--accent-indigo);">${item.episodes} Eps</span>
          </div>
          <p class="lounge-card-desc">${item.description}</p>
          <div class="lounge-review-block" style="border:none; padding-top:0;">
            <a href="${item.url}" target="_blank" rel="noreferrer" class="review-toggle-btn" style="text-decoration:none; display:flex; align-items:center;">
              <span>View on Platform</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      `;
      loungeGrid.appendChild(card);
    });
  }

  // Restore grid back to initial curated favorites
  function restoreCuratedGrid() {
    // Simply reload the initial HTML block or let them browse original tabs
    setTimeout(() => {
      // Toggle back to "All Content"
      const defaultTab = document.querySelector('.lounge-tab[data-category="all"]');
      if (defaultTab) {
        defaultTab.click();
      }
      // Re-trigger static grid contents
      window.location.reload();
    }, 2500);
  }
});

