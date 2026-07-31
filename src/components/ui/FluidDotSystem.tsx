import React, { useEffect, useRef } from 'react';

export const FluidDotSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Grid & Halftone Settings — Bold, dramatic scaling for PETRONAS-style impact
    const spacing = 24;
    const minRadius = 2.0;
    const defaultMaxRadius = 15.5;

    // Seeded PRNG (mulberry32) — stable organic scatter, no flicker between frames
    const mulberry32 = (a: number) => () => {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    // Precomputed per-cell scatter offsets so the field never looks row-aligned.
    // Rebuilt on resize. Grid cells keep even coverage, but dots sit organically.
    let scatter = new Map<number, { jx: number; jy: number; rScale: number; rShift: number }>();
    let scatterCols = 0;
    let scatterRows = 0;

    const rebuildScatter = (w: number, h: number) => {
      scatterCols = Math.ceil((w + spacing) / spacing);
      scatterRows = Math.ceil((h + spacing) / spacing);
      const rng = mulberry32(0xB0B1E5); // fixed seed → deterministic, stable pattern
      scatter.clear();
      for (let i = 0; i < scatterCols; i++) {
        for (let j = 0; j < scatterRows; j++) {
          scatter.set(i * scatterRows + j, {
            jx: (rng() - 0.5) * spacing * 0.9,
            jy: (rng() - 0.5) * spacing * 0.9,
            rScale: 0.72 + rng() * 0.56,
            rShift: rng() * 4 - 2,
          });
        }
      }
    };


    // Brand Palette — Electric Vivid Cyan to Deep PETRONAS Teal
    const colorCyan = { r: 0, g: 220, b: 255 };    // Ultra Electric Cyan (#00DCF0)
    const colorTeal = { r: 14, g: 130, b: 160 };   // Deep Rich Teal (#0E82A0)

    // Handle DPR and Resizing efficiently
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2 for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildScatter(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Mouse Tracking with smooth Lerp
    let mouse = { x: -1000, y: -1000 };
    let targetMouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouse.x = -1000;
      targetMouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Multi-Zone Opacity Mask Function using fast squared distance
    const computeOpacityMask = (x: number, y: number, w: number, h: number): number => {
      const cx = w * 0.84;
      const cy = h * 0.45;
      const rx = w * 0.44;
      const ry = h * 0.58;

      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const distSq = dx * dx + dy * dy;

      let arcMask = 1.0;
      if (distSq > 1.21) { // 1.10^2
        arcMask = 0.02; // Ghost level behind headline
      } else if (distSq > 0.4225) { // 0.65^2
        const dist = Math.sqrt(distSq);
        const fadeT = 1.0 - (dist - 0.65) / 0.45;
        const smoothT = fadeT * fadeT * (3 - 2 * fadeT);
        arcMask = 0.02 + smoothT * 0.98;
      }

      // Zone D: Metrics Row Elevation
      const metricsY = h * 0.82;
      const metricsHeight = h * 0.12;
      const metricsFade = 40;
      let metricsBoost = 0;

      if (y > metricsY - metricsFade && y < metricsY + metricsHeight + metricsFade) {
        const distFromCenter = Math.abs(y - (metricsY + metricsHeight / 2));
        const metricsT = Math.max(0, 1 - distFromCenter / (metricsHeight / 2 + metricsFade));
        metricsBoost = metricsT * 0.06;
      }

      // Edge Fade & Top Navbar Sanctuary (ZERO dots touching the top navbar links)
      const edgeDist = 40;
      const edgeLeft = Math.min(x / edgeDist, 1);
      const edgeTop = Math.min(Math.max(0, y - 85) / 35, 1); // 0 dots above y = 85px
      const edgeRight = Math.min((w - x) / edgeDist, 1);
      const edgeBottom = Math.min((h - y) / edgeDist, 1);

      return Math.min(1.0, arcMask + metricsBoost) * (edgeLeft * edgeTop * edgeRight * edgeBottom);
    };

    // Main Zero-Lag Animation Draw Loop
    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      // Mouse Lerp
      mouse.x = lerp(mouse.x, targetMouse.x, 0.08);
      mouse.y = lerp(mouse.y, targetMouse.y, 0.08);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const maxRadius = height < 600 ? 11.0 : defaultMaxRadius;

      ctx.clearRect(0, 0, width, height);

      // ── LAYER 1: Ambient background radial glow (GPU accelerated) ──
      const glowGrad = ctx.createRadialGradient(
        width * 0.85, height * 0.35, 0,
        width * 0.85, height * 0.35, width * 0.45
      );
      glowGrad.addColorStop(0, 'rgba(0, 220, 255, 0.14)');
      glowGrad.addColorStop(0.6, 'rgba(14, 130, 160, 0.05)');
      glowGrad.addColorStop(1, 'rgba(0, 220, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Explicitly disable shadowBlur inside loop for zero-lag performance
      ctx.shadowBlur = 0;

      // Mouse interaction radius squared (210^2 = 44100)
      const mouseRepelRadiusSq = 44100;

      // ── LAYER 2: The halftone dot field ──
      for (let i = 0; i < scatterCols; i++) {
        for (let j = 0; j < scatterRows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          const cell = scatter.get(i * scatterRows + j) || { jx: 0, jy: 0, rScale: 1, rShift: 0 };

          // Organic scatter — break the row/column alignment
          const ox = x + cell.jx;
          const oy = y + cell.jy;

          const diagonalPos = (x / width + y / height) / 2;
          const curvePos = Math.pow(diagonalPos, 0.75);

          let radius = Math.max(0.6, (minRadius + curvePos * (maxRadius - minRadius)) * cell.rScale + cell.rShift);

          // Fast Mouse Interaction Check (skips Math.sqrt when out of mouse range)
          const dx = mouse.x - ox;
          const dy = mouse.y - oy;
          const distSq = dx * dx + dy * dy;

          let finalX = ox;
          let finalY = oy;

          if (distSq < mouseRepelRadiusSq) {
            const dist = Math.sqrt(distSq);
            const repelForce = 1 - dist / 210;
            finalX = ox - dx * repelForce * 0.10;
            finalY = oy - dy * repelForce * 0.10;
            radius += repelForce * 2.5;
          }

          // Compute Layered Arc Opacity Mask (evaluated at the scattered position)
          const mask = computeOpacityMask(ox, oy, width, height);
          const baseOpacity = 0.10 + curvePos * 0.32;
          const opacity = baseOpacity * mask;

          if (opacity < 0.003) continue;

          // Color Interpolation: Ultra Electric Cyan → Deep Teal
          const r = Math.round(lerp(colorCyan.r, colorTeal.r, diagonalPos));
          const g = Math.round(lerp(colorCyan.g, colorTeal.g, diagonalPos));
          const b = Math.round(lerp(colorCyan.b, colorTeal.b, diagonalPos));

          ctx.beginPath();
          ctx.arc(finalX, finalY, Math.max(0.5, radius), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none transform-gpu"
      aria-hidden="true"
    />
  );
};
