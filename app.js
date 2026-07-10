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
    planets = planets.filter((p) => !p.destroyed && (Math.sqrt((centerX - p.x) ** 2 + (centerY - p.y) ** 2) < 1200));

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
document.addEventListener("DOMContentLoaded", async () => {
  const loungeGrid = document.getElementById("lounge-grid");
  if (!loungeGrid) return;

  const searchInput = document.getElementById("lounge-search");
  const tabs = document.querySelectorAll(".lounge-tab");

  // Default curation list containing Sci-Fi, Anime, Marvel, and DC Curations
  const defaultCurationList = [
    {
      id: "9253",
      type: "TV",
      category: "anime",
      rating: "10.0 / 10",
      tags: ["Time Travel", "Sci-Fi"],
      desc: "A self-proclaimed mad scientist and his lab members accidentally invent a microwave-based time travel device, triggering a desperate fight to change worldlines.",
      badge: "SUB/DUB",
      fallbackTitle: "Steins;Gate",
      fallbackCover: "https://cdn.myanimelist.net/images/anime/1935/127974.jpg",
      fallbackEps: "24 Eps"
    },
    {
      id: "interstellar",
      title: "Interstellar",
      type: "Movie",
      category: "movie",
      rating: "9.9 / 10",
      tags: ["Astrophysics", "Relativity"],
      desc: "A team of astronauts travel through a wormhole in search of a new home for humanity, navigating extreme time dilation near Gargantua.",
      synopsis: "A team of explorers travel through a newly discovered wormhole in an attempt to surpass the limitations on human space travel and ensure the survival of mankind.",
      cover: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      duration: "169 Min",
      badge: "4K IMAX",
      url: "https://www.themoviedb.org/movie/157336"
    },
    {
      id: "30",
      type: "TV",
      category: "anime",
      rating: "9.8 / 10",
      tags: ["Psychological", "Existential"],
      desc: "In a post-apocalyptic world, a teenager is pressured to pilot a giant bio-mechanical construct to defend humanity from mysterious, alien Angels.",
      badge: "SUB/DUB",
      fallbackTitle: "Neon Genesis Evangelion",
      fallbackCover: "https://cdn.myanimelist.net/images/anime/1314/108941.jpg",
      fallbackEps: "26 Eps"
    },
    {
      id: "1726",
      title: "Iron Man",
      type: "Movie",
      category: "movie",
      rating: "7.7 / 10",
      tags: ["Action", "Science Fiction"],
      desc: "Heroes aren't born. They're built.",
      synopsis: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
      cover: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
      duration: "126 Min",
      badge: "HD 1080p",
      url: "https://www.themoviedb.org/movie/1726"
    },
    {
      id: "10138",
      title: "Iron Man 2",
      type: "Movie",
      category: "movie",
      rating: "6.9 / 10",
      tags: ["Adventure", "Action"],
      desc: "It's not the armor that makes the hero, but the man inside.",
      synopsis: "With the world now aware of his dual life as the armored superhero Iron Man, billionaire inventor Tony Stark faces pressure from the government, the press and the public to share his technology with the military. Unwilling to let go of his invention, Stark, with Pepper Potts and James 'Rhodey' Rhodes at his side, must forge new alliances – and confront powerful enemies.",
      cover: "https://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg",
      duration: "124 Min",
      badge: "HD 1080p",
      url: "https://www.themoviedb.org/movie/10138"
    },
    {
      id: "68721",
      title: "Iron Man 3",
      type: "Movie",
      category: "movie",
      rating: "6.9 / 10",
      tags: ["Action", "Adventure"],
      desc: "Unleash the power behind the armor.",
      synopsis: "When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.",
      cover: "https://image.tmdb.org/t/p/w500/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg",
      duration: "130 Min",
      badge: "HD 1080p",
      url: "https://www.themoviedb.org/movie/68721"
    },
    {
      id: "1771",
      title: "Captain America: The First Avenger",
      type: "Movie",
      category: "movie",
      rating: "7.0 / 10",
      tags: ["Action", "Adventure"],
      desc: "The one who never gives up awakens.",
      synopsis: "During World War II, Steve Rogers is a sickly man from Brooklyn who's transformed into super-soldier Captain America to aid in the war effort. Rogers must stop the Red Skull – Adolf Hitler's ruthless head of weaponry, and the leader of an organization that intends to use a mysterious device of untold powers for world domination.",
      cover: "https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
      duration: "124 Min",
      badge: "HD 1080p",
      url: "https://www.themoviedb.org/movie/1771"
    },
    {
      id: "100402",
      title: "Captain America: The Winter Soldier",
      type: "Movie",
      category: "movie",
      rating: "7.7 / 10",
      tags: ["Action", "Adventure"],
      desc: "In heroes we trust.",
      synopsis: "After the cataclysmic events in New York with The Avengers, Steve Rogers, aka Captain America is living quietly in Washington, D.C. and trying to adjust to the modern world. But when a S.H.I.E.L.D. colleague comes under attack, Steve becomes embroiled in a web of intrigue that threatens to put the world at risk. Joining forces with the Black Widow, Captain America struggles to expose the ever-widening conspiracy while fighting off professional assassins sent to silence him at every turn. When the full scope of the villainous plot is revealed, Captain America and the Black Widow enlist the help of a new ally, the Falcon. However, they soon find themselves up against an unexpected and formidable enemy—the Winter Soldier.",
      cover: "https://image.tmdb.org/t/p/w500/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg",
      duration: "136 Min",
      badge: "HD 1080p",
      url: "https://www.themoviedb.org/movie/100402"
    },
    {
      id: "24428",
      title: "The Avengers",
      type: "Movie",
      category: "movie",
      rating: "8.1 / 10",
      tags: ["Science Fiction", "Action"],
      desc: "Some assembly required.",
      synopsis: "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
      cover: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
      duration: "143 Min",
      badge: "HD 1080p",
      url: "https://www.themoviedb.org/movie/24428"
    },
    {
      id: "99861",
      title: "Avengers: Age of Ultron",
      type: "Movie",
      category: "movie",
      rating: "7.3 / 10",
      tags: ["Action", "Adventure"],
      desc: "A new age has come.",
      synopsis: "When Tony Stark tries to jumpstart a dormant peacekeeping program, things go awry and Earth’s Mightiest Heroes are put to the ultimate test as the fate of the planet hangs in the balance. As the villainous Ultron emerges, it is up to The Avengers to stop him from enacting his terrible plans, and soon uneasy alliances and unexpected action pave the way for an epic and unique global adventure.",
      cover: "https://image.tmdb.org/t/p/w500/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg",
      duration: "141 Min",
      badge: "IMAX 4K",
      url: "https://www.themoviedb.org/movie/99861"
    },
    {
      id: "118340",
      title: "Guardians of the Galaxy",
      type: "Movie",
      category: "movie",
      rating: "7.9 / 10",
      tags: ["Action", "Science Fiction"],
      desc: "When things get bad, they'll do their worst.",
      synopsis: "Light years from Earth, 26 years after being abducted, Peter Quill finds himself the prime target of a manhunt after discovering an orb wanted by Ronan the Accuser.",
      cover: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
      duration: "121 Min",
      badge: "HD 1080p",
      url: "https://www.themoviedb.org/movie/118340"
    },
    {
      id: "299536",
      title: "Avengers: Infinity War",
      type: "Movie",
      category: "movie",
      rating: "8.2 / 10",
      tags: ["Adventure", "Action"],
      desc: "Destiny arrives all the same.",
      synopsis: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
      cover: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      duration: "149 Min",
      badge: "IMAX 4K",
      url: "https://www.themoviedb.org/movie/299536"
    },
    {
      id: "299534",
      title: "Avengers: Endgame",
      type: "Movie",
      category: "movie",
      rating: "8.2 / 10",
      tags: ["Adventure", "Science Fiction"],
      desc: "Avenge the fallen.",
      synopsis: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
      cover: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
      duration: "181 Min",
      badge: "IMAX 4K",
      url: "https://www.themoviedb.org/movie/299534"
    },
    {
      id: "324857",
      title: "Spider-Man: Into the Spider-Verse",
      type: "Movie",
      category: "movie",
      rating: "8.4 / 10",
      tags: ["Animation", "Action"],
      desc: "Enter a universe where more than one wears the mask.",
      synopsis: "Struggling to find his place in the world while juggling school and family, Brooklyn teenager Miles Morales is unexpectedly bitten by a radioactive spider and develops unfathomable powers just like the one and only Spider-Man. While wrestling with the implications of his new abilities, Miles discovers a super collider created by the madman Wilson \"Kingpin\" Fisk, causing others from across the Spider-Verse to be inadvertently transported to his dimension.",
      cover: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
      duration: "117 Min",
      badge: "HD 1080p",
      url: "https://www.themoviedb.org/movie/324857"
    },
    {
      id: "634649",
      title: "Spider-Man: No Way Home",
      type: "Movie",
      category: "movie",
      rating: "7.9 / 10",
      tags: ["Action", "Adventure"],
      desc: "The Multiverse unleashed.",
      synopsis: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
      cover: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      duration: "148 Min",
      badge: "HD 1080p",
      url: "https://www.themoviedb.org/movie/634649"
    },
    {
      id: "tenet",
      title: "Tenet",
      type: "Movie",
      category: "movie",
      rating: "9.4 / 10",
      tags: ["Entropy", "Thermodynamics"],
      desc: "A secret agent is recruited to prevent armageddon triggered by technology that can invert entropy, causing objects and people to move backward in time.",
      synopsis: "Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
      cover: "https://image.tmdb.org/t/p/w500/aCIFMriQh8rvhxpN1IWGgvH0Tlg.jpg",
      duration: "150 Min",
      badge: "CPT Inv",
      url: "https://www.themoviedb.org/movie/577922"
    },
    {
      id: "127585",
      title: "X-Men: Days of Future Past",
      type: "Movie",
      category: "movie",
      rating: "7.5 / 10",
      tags: ["Action", "Adventure"],
      desc: "To save the future, they must alter the past.",
      synopsis: "The ultimate X-Men ensemble fights a war for the survival of the species across two time periods as they join forces with their younger selves in an epic battle that must change the past – to save our future.",
      cover: "https://image.tmdb.org/t/p/w500/tYfijzolzgoMOtegh1Y7j2Enorg.jpg",
      duration: "132 Min",
      badge: "HD 1080p",
      url: "https://www.themoviedb.org/movie/127585"
    },
    {
      id: "155",
      title: "The Dark Knight",
      type: "Movie",
      category: "movie",
      rating: "8.5 / 10",
      tags: ["Action", "Crime"],
      desc: "Welcome to a world without rules.",
      synopsis: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
      cover: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      duration: "152 Min",
      badge: "IMAX 4K",
      url: "https://www.themoviedb.org/movie/155"
    },
    {
      id: "49521",
      title: "Man of Steel",
      type: "Movie",
      category: "movie",
      rating: "6.7 / 10",
      tags: ["Action", "Adventure"],
      desc: "You are not alone.",
      synopsis: "A young boy learns that he has extraordinary powers and is not of this earth. As a young man, he journeys to discover where he came from and what he was sent here to do. But the hero in him must emerge if he is to save the world from annihilation and become the symbol of hope for all mankind.",
      cover: "https://image.tmdb.org/t/p/w500/8GFtkImmK0K1VaUChR0n9O61CFU.jpg",
      duration: "143 Min",
      badge: "HD 1080p",
      url: "https://www.themoviedb.org/movie/49521"
    },
    {
      id: "209112",
      title: "Batman v Superman: Dawn of Justice",
      type: "Movie",
      category: "movie",
      rating: "6.0 / 10",
      tags: ["Action", "Adventure"],
      desc: "The greatest gladiator match in the history of the world.",
      synopsis: "Fearing the actions of a god-like Super Hero left unchecked, Gotham City’s own formidable, forceful vigilante takes on Metropolis’s most revered, modern-day savior, while the world wrestles with what sort of hero it really needs. And with Batman and Superman at war with one another, a new threat quickly arises, putting mankind in greater danger than it’s ever known before.",
      cover: "https://image.tmdb.org/t/p/w500/5UsK3grJvtQrtzEgqNlDljJW96w.jpg",
      duration: "152 Min",
      badge: "IMAX 4K",
      url: "https://www.themoviedb.org/movie/209112"
    },
    {
      id: "32281",
      type: "Movie",
      category: "anime",
      rating: "9.5 / 10",
      tags: ["Space-Time", "Drama"],
      desc: "Two high school students swap bodies periodically, leading to a desperate attempt to warn and save a town from an impending orbital comet impact.",
      badge: "SUB/DUB",
      fallbackTitle: "Your Name",
      fallbackCover: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
      fallbackEps: "106 Min"
    },
    {
      id: "coherence",
      title: "Coherence",
      type: "Movie",
      category: "movie",
      rating: "9.5 / 10",
      tags: ["Quantum", "Thriller"],
      desc: "During a comet pass, a dinner party of friends experiences a power outage, only to discover that the comet has created a quantum coherence event, splitting reality.",
      synopsis: "On the night of a astronomical anomaly, eight friends at a dinner party experience a troubling chain of reality-bending events.",
      cover: "https://image.tmdb.org/t/p/w500/ezUtb9m5DeLwL2gxi4gktzNCvQv.jpg",
      duration: "89 Min",
      badge: "Decoh",
      url: "https://www.themoviedb.org/movie/220289"
    },
    {
      id: "arrival",
      title: "Arrival",
      type: "Movie",
      category: "movie",
      rating: "9.7 / 10",
      tags: ["Linguistics", "Spacetime"],
      desc: "A linguist is recruited by the military to translate alien glyphs, discovering that learning their non-linear language alters her brain's perception of time.",
      synopsis: "Taking place after alien crafts land around the world, an expert linguist is recruited by the military to determine whether they come in peace or are a threat.",
      cover: "https://image.tmdb.org/t/p/w500/3b4fRUYXFaGVDqkb0ikjB4cn7ub.jpg",
      duration: "116 Min",
      badge: "Least T",
      url: "https://www.themoviedb.org/movie/329865"
    }
  ];

  const LIST_STORAGE_KEY = "lounge_user_curations_list_v3";
  const CACHE_STORAGE_KEY = "lounge_curated_grid_cache_v3";

  // State
  let curationList = [];
  let resolvedItems = [];

  // Initialize Lists
  const savedList = localStorage.getItem(LIST_STORAGE_KEY);
  if (savedList) {
    curationList = JSON.parse(savedList);
    // Auto-migrate old watchlists to include the refined Marvel, DC, and X-Men films
    const hasUnwatchedDC = curationList.some(item => item.id === "13183" || item.id === "272");
    if (hasUnwatchedDC || curationList.length < 15) {
      curationList = [...defaultCurationList];
      localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(curationList));
      localStorage.removeItem(CACHE_STORAGE_KEY); // clear cache to force render
    }
  } else {
    curationList = [...defaultCurationList];
    localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(curationList));
  }

  // Load Render Cache
  const cachedData = localStorage.getItem(CACHE_STORAGE_KEY);
  if (cachedData) {
    resolvedItems = JSON.parse(cachedData);
    renderCards(resolvedItems);
  } else {
    await refreshCuratedGrid();
  }

  // Hook Search filter field
  if (searchInput) {
    searchInput.addEventListener("input", filterGallery);
  }

  // Hook Category tabs triggers
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      filterGallery();
    });
  });

  // Fetch MAL/TMDB data and update local cached layouts
  async function refreshCuratedGrid() {
    loungeGrid.innerHTML = `
      <div class="sync-loader-container" style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 250px; gap: 1.25rem; width: 100%;">
        <div class="galaxy-loader"></div>
        <span style="font-family: var(--font-mono); font-size: 0.85rem; letter-spacing: 0.05em; color: var(--accent-indigo); text-align: center; max-width: 320px;">Fetching dynamic data from public endpoints...</span>
      </div>
    `;

    resolvedItems = await fetchCuratedData();
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(resolvedItems));
    renderCards(resolvedItems);
  }

  // Dynamic fetch scheduler
  async function fetchCuratedData() {
    const list = [];
    const JIKAN_DELAY = 350;

    for (const item of curationList) {
      if (item.category === "anime") {
        try {
          await new Promise(resolve => setTimeout(resolve, JIKAN_DELAY));

          const res = await fetch(`https://api.jikan.moe/v4/anime/${item.id}`);
          if (!res.ok) throw new Error(`Jikan error ${res.status}`);

          const json = await res.json();
          const data = json.data;

          list.push({
            id: item.id,
            category: item.category,
            title: data.title_english || data.title,
            cover: data.images.webp.large_image_url || data.images.jpg.large_image_url || item.fallbackCover,
            episodes: `${data.episodes || "?"} Eps`,
            badge: item.badge,
            rating: item.rating,
            tags: data.genres ? data.genres.map(g => g.name).slice(0, 3) : item.tags,
            desc: item.desc,
            synopsis: data.synopsis || item.desc,
            url: data.url || `https://myanimelist.net/anime/${item.id}`,
            type: data.type || item.type
          });
        } catch (err) {
          console.warn(`Error resolving Jikan MAL ID ${item.id}, using static fallback...`, err);
          list.push({
            id: item.id,
            category: item.category,
            title: item.fallbackTitle || "Curated Anime",
            cover: item.fallbackCover || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300",
            episodes: item.fallbackEps || "? Eps",
            badge: item.badge,
            rating: item.rating,
            tags: item.tags,
            desc: item.desc,
            synopsis: item.desc,
            url: `https://myanimelist.net/anime/${item.id}`,
            type: item.type
          });
        }
      } else {
        // Movies use configured TMDB detail strings
        const movieSynopsis = item.synopsis || item.desc || "A curated science fiction cinematic experience.";
        let movieDesc = item.desc || item.synopsis || "A curated watch.";
        
        // If desc and synopsis are exactly the same, split desc to show just the first sentence
        if (movieDesc === movieSynopsis) {
          movieDesc = movieSynopsis.split(".")[0] + ".";
        }

        list.push({
          id: item.id,
          category: item.category,
          title: item.title || "Curated Movie",
          cover: item.cover || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300",
          episodes: item.duration || item.fallbackEps || "120 Min",
          badge: item.badge || "HD 1080p",
          rating: item.rating || "9.0 / 10",
          tags: item.tags && item.tags.length > 0 ? item.tags : ["Sci-Fi", "Cinema"],
          desc: movieDesc.length > 200 ? movieDesc.substring(0, 200) + "..." : movieDesc,
          synopsis: movieSynopsis,
          url: item.url || `https://www.themoviedb.org/movie/${item.id}`,
          type: item.type || "Movie"
        });
      }
    }
    return list;
  }

  // Generate Fallback Data Array directly
  function getFallbackData() {
    return curationList.map(item => {
      if (item.category === "anime") {
        return {
          id: item.id,
          category: item.category,
          title: item.fallbackTitle || "Curated Anime",
          cover: item.fallbackCover || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300",
          episodes: item.fallbackEps || "? Eps",
          badge: item.badge || "SUB/DUB",
          rating: item.rating || "8.5 / 10",
          tags: item.tags && item.tags.length > 0 ? item.tags : ["Anime"],
          desc: item.desc || "A curated watch.",
          synopsis: item.desc || "No synopsis available.",
          url: `https://myanimelist.net/anime/${item.id}`,
          type: item.type || "TV"
        };
      } else {
        const movieSynopsis = item.synopsis || item.desc || "A curated science fiction cinematic experience.";
        let movieDesc = item.desc || item.synopsis || "A curated watch.";
        
        if (movieDesc === movieSynopsis) {
          movieDesc = movieSynopsis.split(".")[0] + ".";
        }

        return {
          id: item.id,
          category: item.category,
          title: item.title || "Curated Movie",
          cover: item.cover || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300",
          episodes: item.duration || item.fallbackEps || "120 Min",
          badge: item.badge || "HD 1080p",
          rating: item.rating || "9.0 / 10",
          tags: item.tags && item.tags.length > 0 ? item.tags : ["Sci-Fi", "Cinema"],
          desc: movieDesc.length > 200 ? movieDesc.substring(0, 200) + "..." : movieDesc,
          synopsis: movieSynopsis,
          url: item.url || `https://www.themoviedb.org/movie/${item.id}`,
          type: item.type || "Movie"
        };
      }
    });
  }

  // Dynamic card builder
  function renderCards(items) {
    loungeGrid.innerHTML = "";

    if (items.length === 0) {
      loungeGrid.innerHTML = `
        <div style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px; color: #94a3b8; font-family: var(--font-mono);">
          <span>No items found in lounge watchlist.</span>
        </div>
      `;
      return;
    }

    items.forEach((item, index) => {
      const searchKeywords = `${item.title} ${item.tags.join(" ")} ${item.synopsis}`.toLowerCase();
      const card = document.createElement("div");
      card.className = "lounge-card";
      card.setAttribute("data-category", item.category);
      card.setAttribute("data-search", searchKeywords);
      card.style.animationDelay = `${index * 0.05}s`;

      card.innerHTML = `
        <div class="lounge-card-inner">
          <!-- Front Face -->
          <div class="lounge-card-front">
            <div class="lounge-poster-wrapper">
              <img src="${item.cover}" alt="${item.title} Poster" onerror="this.src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300'">
              <span class="media-type-badge type-${item.category === 'anime' ? 'tv' : 'movie'}">${item.type}</span>
            </div>
            <div class="lounge-card-meta">
              <span class="meta-item">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path><path d="M12 6v6l4 2"></path></svg>
                ${item.episodes}
              </span>
              <span class="meta-item">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                ${item.badge}
              </span>
            </div>
            <h3 class="lounge-anime-title">${item.title}</h3>
          </div>
          <!-- Back Face -->
          <div class="lounge-card-back glass-panel">
            <div class="lounge-back-header">
              <h4>${item.title}</h4>
              <span class="back-rating">${item.rating}</span>
            </div>
            <div class="lounge-back-tags">
              ${item.tags.map(t => `<span class="lounge-tag">${t}</span>`).join("")}
            </div>
            <p class="lounge-back-desc" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${item.desc}</p>
            <div class="lounge-back-review" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-bottom: 0.6rem;">
              <h5>Official Synopsis</h5>
              <p style="overflow-y: auto; flex: 1; margin: 0; padding-right: 0.25rem;">${item.synopsis}</p>
            </div>
            <a href="${item.url}" target="_blank" class="lounge-redirect-btn">
              <span>View Detailed Analytics</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      `;

      // Track touch dragging state to block scroll-trigger card flips on mobile
      let startX = 0;
      let startY = 0;
      let isDragging = false;

      card.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = false;
      }, { passive: true });

      card.addEventListener("touchmove", (e) => {
        const diffX = Math.abs(e.touches[0].clientX - startX);
        const diffY = Math.abs(e.touches[0].clientY - startY);
        if (diffX > 10 || diffY > 10) {
          isDragging = true;
        }
      }, { passive: true });

      card.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        startY = e.clientY;
        isDragging = false;
      });

      card.addEventListener("mouseup", (e) => {
        const diffX = Math.abs(e.clientX - startX);
        const diffY = Math.abs(e.clientY - startY);
        if (diffX > 10 || diffY > 10) {
          isDragging = true;
        }
      });

      card.addEventListener("click", (e) => {
        // Prevent click triggers on redirection buttons or external links
        if (e.target.closest("a") || e.target.tagName === "A") return;

        // Skip flip if user was scrolling
        if (isDragging) {
          isDragging = false;
          return;
        }

        card.classList.toggle("flipped");

        // Unflip all sibling cards
        const allCards = loungeGrid.querySelectorAll(".lounge-card");
        allCards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove("flipped");
          }
        });
      });

      loungeGrid.appendChild(card);
    });
  }

  // Live filter cards
  function filterGallery() {
    const activeTab = document.querySelector(".lounge-tab.active");
    const category = activeTab ? activeTab.getAttribute("data-category") : "all";
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const cards = loungeGrid.querySelectorAll(".lounge-card");

    cards.forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      const searchStr = card.getAttribute("data-search").toLowerCase();

      const matchesCategory = (category === "all") || (category === cardCategory);
      const matchesKeyword = !keyword || searchStr.includes(keyword);

      card.classList.remove("flipped");

      if (matchesCategory && matchesKeyword) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  /* ==========================================
     Curator Console Modal Controller
     ========================================== */
  const modalOverlay = document.getElementById("curator-modal");
  const openModalBtn = document.getElementById("open-curator-btn");
  const closeModalBtn = document.getElementById("close-curator-btn");

  const curatorLookup = document.getElementById("curator-lookup");
  const curatorType = document.getElementById("curator-type");
  const curatorRating = document.getElementById("curator-rating");
  const curatorTags = document.getElementById("curator-tags");
  const fetchBtn = document.getElementById("curator-fetch-btn");

  const statusMsg = document.getElementById("curator-status-msg");
  const curatorListBody = document.getElementById("curator-items-list");

  const saveBtn = document.getElementById("curator-save-btn");
  const exportBtn = document.getElementById("curator-export-btn");
  const resetBtn = document.getElementById("curator-reset-btn");

  // Open modal
  if (openModalBtn && modalOverlay) {
    openModalBtn.addEventListener("click", () => {
      renderCuratorListTable();
      showStatus("Curator console loaded successfully.", "info");
      modalOverlay.classList.add("active");
    });
  }

  // Close modal
  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener("click", () => {
      modalOverlay.classList.remove("active");
    });
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("active");
      }
    });
  }

  // Render Curator List Rows
  function renderCuratorListTable() {
    if (!curatorListBody) return;
    curatorListBody.innerHTML = "";

    curationList.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="font-weight: 600;">${item.fallbackTitle || item.title || item.id}</td>
        <td style="font-family: var(--font-mono); text-transform: uppercase; font-size: 0.65rem;">${item.category}</td>
        <td style="font-family: var(--font-mono); color: #64748b;">${item.id}</td>
        <td style="text-align: center;">
          <button class="curator-item-delete" data-id="${item.id}" aria-label="Delete">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
        </td>
      `;

      tr.querySelector(".curator-item-delete").addEventListener("click", (e) => {
        const idToDelete = e.currentTarget.getAttribute("data-id");
        curationList = curationList.filter(item => item.id !== idToDelete);
        renderCuratorListTable();
        showStatus("Removed item from queue. Save changes to update lounge.", "info");
      });

      curatorListBody.appendChild(tr);
    });
  }

  // Handle Fetch/Lookup Trigger
  if (fetchBtn) {
    fetchBtn.addEventListener("click", async () => {
      const lookupVal = curatorLookup.value.trim();
      const type = curatorType.value;

      if (!lookupVal) {
        showStatus("Please enter a valid lookup name, URL, or ID.", "error");
        return;
      }

      showStatus("Resolving metadata query... please wait.", "info");

      // Auto-detect TMDB URLs regardless of dropdown selection
      const isTmdbUrl = /themoviedb\.org\/movie\//i.test(lookupVal);

      if (isTmdbUrl || type === "movie") {
        await resolveMovieLookup(lookupVal);
      } else {
        await resolveAnimeLookup(lookupVal);
      }
    });
  }

  // Resolve Anime Lookups (MAL ID, search query, or Anisuge URL)
  async function resolveAnimeLookup(val) {
    let malId = "";
    let jikanQuery = val;

    // Check if Anisuge Watch Link
    const anisugeMatch = val.match(/anisuge\.tv\/watch\/([a-zA-Z0-9\-]+)/);
    if (anisugeMatch && anisugeMatch[1]) {
      let slug = anisugeMatch[1];
      slug = slug.replace(/\-[a-zA-Z0-9]{5}$/, ""); // remove -2obfr style codes
      jikanQuery = slug.replace(/\-/g, " "); // Replace dashes with spaces
    }

    // Check if direct MAL URL
    const malUrlMatch = val.match(/myanimelist\.net\/anime\/([0-9]+)/);
    if (malUrlMatch && malUrlMatch[1]) {
      malId = malUrlMatch[1];
    } else if (/^\d+$/.test(val)) {
      malId = val;
    }

    try {
      let animeData = null;

      if (malId) {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
        if (!res.ok) throw new Error("Anime ID lookup failed.");
        const json = await res.json();
        animeData = json.data;
      } else {
        // Query search
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(jikanQuery)}&limit=1`);
        if (!res.ok) throw new Error("Anime search failed.");
        const json = await res.json();
        if (!json.data || json.data.length === 0) {
          throw new Error("No anime found matching this query.");
        }
        animeData = json.data[0];
        malId = animeData.mal_id.toString();
      }

      // Check if duplicate
      if (curationList.some(item => item.id === malId)) {
        showStatus(`"${animeData.title_english || animeData.title}" is already in the list!`, "error");
        return;
      }

      // Retrieve overrides
      const overrideRating = curatorRating.value.trim() || `${animeData.score ? animeData.score.toFixed(1) : "8.5"} / 10`;
      const overrideTags = curatorTags.value.trim() ? curatorTags.value.trim().split(",").map(t => t.trim()) : (animeData.genres ? animeData.genres.slice(0, 2).map(g => g.name) : ["Anime"]);

      const newAnimeItem = {
        id: malId,
        type: animeData.type || "TV",
        category: "anime",
        rating: overrideRating,
        tags: overrideTags,
        desc: animeData.synopsis ? (animeData.synopsis.split("\n")[0]) : "No description available.",
        badge: "SUB/DUB",
        fallbackTitle: animeData.title_english || animeData.title,
        fallbackCover: animeData.images.webp.large_image_url || animeData.images.jpg.large_image_url,
        fallbackEps: `${animeData.episodes || "?"} Eps`
      };

      curationList.push(newAnimeItem);
      renderCuratorListTable();
      curatorLookup.value = "";
      curatorRating.value = "";
      curatorTags.value = "";
      showStatus(`Successfully resolved and queued "${newAnimeItem.fallbackTitle}".`, "success");

    } catch (err) {
      showStatus(`Lookup Failed: ${err.message}`, "error");
    }
  }

  // Resolve Movie details from TMDB URLs, TMDB IDs, or plain titles
  async function resolveMovieLookup(val) {
    let movieId = "";
    let titleSlug = "";
    let tmdbPageUrl = "";
    
    // Extract TMDB ID and title slug from URL like /movie/13505-captain-america-the-first-avenger
    const tmdbMatch = val.match(/themoviedb\.org\/movie\/(\d+)(?:\-([a-zA-Z0-9\-]+))?/);
    if (tmdbMatch) {
      movieId = tmdbMatch[1];
      tmdbPageUrl = val.startsWith("http") ? val : `https://www.themoviedb.org/movie/${movieId}`;
      if (tmdbMatch[2]) {
        titleSlug = tmdbMatch[2].replace(/\-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      }
    } else if (/^\d+$/.test(val)) {
      movieId = val;
      tmdbPageUrl = `https://www.themoviedb.org/movie/${movieId}`;
    } else {
      // Plain text title input
      movieId = "";
      titleSlug = val;
    }

    // Check for duplicates
    if (movieId && curationList.some(item => item.id === movieId)) {
      showStatus(`Movie ID ${movieId} is already in the list!`, "error");
      return;
    }

    let resolvedTitle = titleSlug || `Movie ${movieId}`;
    let coverUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300";
    let resolvedDesc = "A curated cinematic experience.";
    let resolvedSynopsis = "A curated cinematic experience exploring cosmic wonders, advanced physics, or space-time anomalies.";
    let resolvedDuration = "120 Min";
    let resolvedTags = curatorTags.value.trim() ? curatorTags.value.trim().split(",").map(t => t.trim()) : ["Sci-Fi", "Cinema"];

    const apiKey = "04c35731a5ee918f014970082a0088b1";
    let resolvedSuccessfully = false;

    // 1. Primary Lookup: TMDb API (highly reliable, CORS-enabled for public reads)
    try {
      showStatus("Resolving movie details from TMDb...", "info");
      
      if (!movieId && titleSlug) {
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(titleSlug)}&language=en-US`;
        const searchRes = await fetch(searchUrl);
        if (searchRes.ok) {
          const searchData = await searchRes.json();
          if (searchData.results && searchData.results.length > 0) {
            movieId = searchData.results[0].id.toString();
            tmdbPageUrl = `https://www.themoviedb.org/movie/${movieId}`;
          }
        }
      }

      if (movieId) {
        const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
        const detailRes = await fetch(detailUrl);
        if (detailRes.ok) {
          const movieData = await detailRes.json();
          resolvedTitle = movieData.title || resolvedTitle;
          resolvedSynopsis = movieData.overview || resolvedSynopsis;
          
          // Use movie tagline for description, otherwise use first sentence of overview
          resolvedDesc = movieData.tagline || (resolvedSynopsis.split(".")[0] + ".");
          resolvedDuration = movieData.runtime ? `${movieData.runtime} Min` : resolvedDuration;
          
          if (movieData.poster_path) {
            coverUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
          }
          if (movieData.genres && movieData.genres.length > 0) {
            resolvedTags = movieData.genres.map(g => g.name).slice(0, 3);
          }
          resolvedSuccessfully = true;
          showStatus(`TMDb metadata successfully resolved for "${resolvedTitle}".`, "success");
        }
      }
    } catch (err) {
      console.warn("TMDb API lookup failed, falling back to DuckDuckGo/iTunes:", err);
    }

    // 2. Fallback: DuckDuckGo Instant Answer API (JSONP bypasses CORS)
    if (!resolvedSuccessfully && titleSlug) {
      try {
        showStatus(`TMDb failed. Searching DuckDuckGo for "${titleSlug}"...`, "info");
        
        const ddgPromise = new Promise((resolve) => {
          const callbackName = 'ddgCallback_' + Math.round(100000 * Math.random());
          window[callbackName] = (data) => {
            delete window[callbackName];
            const scriptEl = document.getElementById(callbackName);
            if (scriptEl) scriptEl.remove();
            resolve(data);
          };
          
          const script = document.createElement('script');
          script.id = callbackName;
          script.src = `https://api.duckduckgo.com/?q=${encodeURIComponent(titleSlug)}&format=json&no_redirect=1&no_html=1&callback=${callbackName}`;
          script.onerror = () => {
            delete window[callbackName];
            const scriptEl = document.getElementById(callbackName);
            if (scriptEl) scriptEl.remove();
            resolve(null);
          };
          document.body.appendChild(script);
        });

        const ddgData = await ddgPromise;
        if (ddgData && (ddgData.AbstractText || ddgData.Image)) {
          resolvedTitle = ddgData.Heading || resolvedTitle;
          resolvedSynopsis = ddgData.AbstractText || resolvedSynopsis;
          resolvedDesc = resolvedSynopsis.split(".")[0] + ".";
          if (ddgData.Image) {
            coverUrl = ddgData.Image.startsWith("http") ? ddgData.Image : `https://duckduckgo.com${ddgData.Image}`;
          }
          resolvedSuccessfully = true;
          showStatus(`DuckDuckGo metadata resolved for "${resolvedTitle}".`, "success");
        }
      } catch (err) {
        console.warn("DuckDuckGo fallback lookup failed:", err);
      }
    }

    // 3. Second Fallback: iTunes Search API (JSONP bypasses CORS)
    if (!resolvedSuccessfully && titleSlug) {
      try {
        showStatus(`Searching iTunes fallback for "${titleSlug}"...`, "info");
        
        const itunesPromise = new Promise((resolve) => {
          const callbackName = 'itunesCallback_' + Math.round(100000 * Math.random());
          window[callbackName] = (data) => {
            delete window[callbackName];
            const scriptEl = document.getElementById(callbackName);
            if (scriptEl) scriptEl.remove();
            resolve(data);
          };
          
          const script = document.createElement('script');
          script.id = callbackName;
          script.src = `https://itunes.apple.com/search?term=${encodeURIComponent(titleSlug)}&media=movie&limit=5&callback=${callbackName}`;
          script.onerror = () => {
            delete window[callbackName];
            const scriptEl = document.getElementById(callbackName);
            if (scriptEl) scriptEl.remove();
            resolve(null);
          };
          document.body.appendChild(script);
        });

        const itunesData = await itunesPromise;
        if (itunesData && itunesData.resultCount > 0) {
          const searchLower = titleSlug.toLowerCase();
          let bestMatch = itunesData.results[0];
          for (const result of itunesData.results) {
            if (result.trackName && result.trackName.toLowerCase().includes(searchLower.split(" ")[0])) {
              bestMatch = result;
              break;
            }
          }

          resolvedTitle = bestMatch.trackName || resolvedTitle;
          coverUrl = bestMatch.artworkUrl100 ? bestMatch.artworkUrl100.replace("100x100bb", "600x600bb") : coverUrl;
          resolvedSynopsis = bestMatch.longDescription || bestMatch.shortDescription || resolvedSynopsis;
          resolvedDesc = resolvedSynopsis.split(".")[0] + ".";
          if (bestMatch.trackTimeMillis) {
            resolvedDuration = `${Math.round(bestMatch.trackTimeMillis / 60000)} Min`;
          }
          if (bestMatch.primaryGenreName) {
            resolvedTags = [bestMatch.primaryGenreName];
            if (bestMatch.genres && bestMatch.genres.length > 1) {
              resolvedTags = bestMatch.genres.slice(0, 3);
            }
          }
          resolvedSuccessfully = true;
          showStatus(`iTunes metadata resolved for "${resolvedTitle}".`, "success");
        }
      } catch (err) {
        console.warn("iTunes fallback lookup failed:", err);
      }
    }

    if (!resolvedSuccessfully) {
      showStatus("Could not fetch metadata online. Using default placeholders.", "info");
    }

    const customRating = curatorRating.value.trim() || "9.0 / 10";

    const newMovieItem = {
      id: movieId || "movie_" + Date.now(),
      title: resolvedTitle,
      type: "Movie",
      category: "movie",
      rating: customRating,
      tags: resolvedTags,
      desc: resolvedDesc.length > 200 ? resolvedDesc.substring(0, 200) + "..." : resolvedDesc,
      synopsis: resolvedSynopsis,
      cover: coverUrl,
      duration: resolvedDuration,
      badge: "HD 1080p",
      url: tmdbPageUrl || `https://www.google.com/search?q=${encodeURIComponent(resolvedTitle)}+movie`
    };

    curationList.push(newMovieItem);
    renderCuratorListTable();
    curatorLookup.value = "";
    curatorRating.value = "";
    curatorTags.value = "";
    showStatus(`Queued movie "${newMovieItem.title}" successfully.`, "success");
  }

  // Save changes locally and clear grid cache
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(curationList));
      localStorage.removeItem(CACHE_STORAGE_KEY); // clear cache

      showStatus("Saving curations and compiling lounge grid... please wait.", "info");
      await refreshCuratedGrid();

      showStatus("Lounge configurations saved locally!", "success");
    });
  }

  // Reset to default curation list
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset your Cosmic Lounge list to the default watch history? This will erase all custom additions.")) {
        curationList = [...defaultCurationList];
        localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(curationList));
        localStorage.removeItem(CACHE_STORAGE_KEY);

        renderCuratorListTable();
        refreshCuratedGrid();
        showStatus("Reset lounge to default settings.", "info");
      }
    });
  }

  // Copy Config Array to Clipboard
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const codeString = `const curationList = ${JSON.stringify(curationList, null, 2)};`;
      navigator.clipboard.writeText(codeString)
        .then(() => {
          showStatus("JavaScript config array copied to clipboard! Paste this into app.js.", "success");
        })
        .catch(err => {
          showStatus("Failed to copy code: " + err, "error");
        });
    });
  }

  // Helper status alert manager
  function showStatus(text, type) {
    if (!statusMsg) return;
    statusMsg.className = `curator-status ${type}`;
    statusMsg.textContent = text;
  }

  /* ==========================================
     Secret Curator Access (Ctrl+Shift+K)
     Only the site owner knows this shortcut.
     ========================================== */
  // Create and inject a sleek passcode challenge overlay dynamically
  function showPasscodePrompt(onSuccess) {
    const existing = document.getElementById("lounge-passcode-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "lounge-passcode-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(10, 10, 15, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      opacity: 0;
      transition: opacity 0.3s ease;
      font-family: var(--font-mono);
    `;

    overlay.innerHTML = `
      <div class="glass-panel" style="
        width: 100%;
        max-width: 400px;
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(15, 23, 42, 0.4);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        text-align: center;
        transform: translateY(20px);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        <h4 style="margin-top: 0; margin-bottom: 0.5rem; color: #fff; font-size: 1.1rem; letter-spacing: 0.05em;">Curator Decryption</h4>
        <p style="color: #94a3b8; font-size: 0.8rem; margin-bottom: 1.5rem;">Enter security passcode to unlock admin console</p>
        
        <input type="password" id="passcode-input" placeholder="••••••••" style="
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          color: #fff;
          font-size: 1rem;
          text-align: center;
          margin-bottom: 1rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        ">
        
        <div style="display: flex; gap: 0.75rem; justify-content: center;">
          <button id="passcode-cancel" style="
            padding: 0.5rem 1.25rem;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 6px;
            color: #94a3b8;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
          ">Cancel</button>
          <button id="passcode-submit" style="
            padding: 0.5rem 1.25rem;
            background: linear-gradient(135deg, var(--accent-indigo), var(--accent-purple));
            border: none;
            border-radius: 6px;
            color: #fff;
            font-weight: 500;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
          ">Decrypt</button>
        </div>
        <div id="passcode-error" style="color: #ef4444; font-size: 0.75rem; margin-top: 1rem; height: 1.2rem; display: flex; align-items: center; justify-content: center;"></div>
      </div>
    `;

    document.body.appendChild(overlay);
    
    const input = overlay.querySelector("#passcode-input");
    const errorDiv = overlay.querySelector("#passcode-error");
    const submitBtn = overlay.querySelector("#passcode-submit");
    const cancelBtn = overlay.querySelector("#passcode-cancel");
    const container = overlay.querySelector(".glass-panel");

    setTimeout(() => {
      overlay.style.opacity = "1";
      container.style.transform = "translateY(0)";
      input.focus();
    }, 50);

    function closeOverlay() {
      overlay.style.opacity = "0";
      container.style.transform = "translateY(20px)";
      setTimeout(() => overlay.remove(), 300);
    }

    async function sha256(message) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function handleVerify() {
      const hash = await sha256(input.value);
      // Secure hash of default passcode "cosmos"
      const expectedHash = "4cbe19716b1aa73a67dc4b28c34391879b503259fc76852082b4dafcf0de85b2";
      
      if (hash === expectedHash) {
        closeOverlay();
        onSuccess();
      } else {
        errorDiv.textContent = "Decryption Failed: Invalid Passcode.";
        input.value = "";
        input.style.borderColor = "#ef4444";
        input.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.2)";
        setTimeout(() => {
          input.style.borderColor = "rgba(255, 255, 255, 0.15)";
          input.style.boxShadow = "none";
        }, 1500);
      }
    }

    submitBtn.addEventListener("click", handleVerify);
    cancelBtn.addEventListener("click", closeOverlay);
    
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") handleVerify();
      if (ev.key === "Escape") closeOverlay();
    });

    input.onfocus = () => {
      input.style.borderColor = "var(--accent-indigo)";
      input.style.boxShadow = "0 0 10px rgba(129, 140, 248, 0.2)";
    };
    input.onblur = () => {
      input.style.borderColor = "rgba(255, 255, 255, 0.15)";
      input.style.boxShadow = "none";
    };
  }

  /* ==========================================
     Secret Curator Access (Ctrl+Shift+K)
     Only the site owner knows this shortcut.
     ========================================== */
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "K") {
      e.preventDefault();
      if (!openModalBtn) return;
      
      const isCurrentlyHidden = openModalBtn.style.display === "none" || !openModalBtn.style.display;
      
      if (!isCurrentlyHidden) {
        // Locked/Close action
        openModalBtn.style.display = "none";
        modalOverlay.classList.remove("active");
        showStatus("Curator console locked.", "info");
      } else {
        // Prompt passcode challenge to unlock
        showPasscodePrompt(() => {
          openModalBtn.style.display = "inline-flex";
          renderCuratorListTable();
          showStatus("Curator console decrypted. Welcome back, admin.", "success");
          modalOverlay.classList.add("active");
        });
      }
    }
  });
});



