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

    // Grid & Halftone Settings — Slightly larger dots for rich halftone texture
    const spacing = 21;
    const minRadius = 2.0;
    const defaultMaxRadius = 10.5;

    // Brand Palette — Electric Vivid Cyan to Deep PETRONAS Teal
    const colorCyan = { r: 0, g: 220, b: 255 };    // Ultra Electric Cyan (#00DCF0)
    const colorTeal = { r: 14, g: 130, b: 160 };   // Deep Rich Teal (#0E82A0)

    // Handle DPR and Resizing
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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

    // Multi-Zone Opacity Mask Function using a balanced curved arc boundary
    const computeOpacityMask = (x: number, y: number, w: number, h: number): number => {
      // Showcase focal center (right side)
      const cx = w * 0.84;
      const cy = h * 0.45;

      // Balanced arc radius framing the laptop showcase
      const rx = w * 0.44;
      const ry = h * 0.58;

      // Normalized distance from showcase center
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const dist = Math.hypot(dx, dy);

      // Arc boundary transition
      let arcMask = 1.0;
      if (dist > 1.10) {
        arcMask = 0.02; // Ghost level behind headline
      } else if (dist > 0.65) {
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

      // Edge Fade on all four borders
      const edgeDist = 40;
      const edgeLeft = Math.min(x / edgeDist, 1);
      const edgeTop = Math.min(y / edgeDist, 1);
      const edgeRight = Math.min((w - x) / edgeDist, 1);
      const edgeBottom = Math.min((h - y) / edgeDist, 1);
      const edgeMask = edgeLeft * edgeTop * edgeRight * edgeBottom;

      return Math.min(1.0, arcMask + metricsBoost) * edgeMask;
    };

    // Main Animation Draw Loop
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

      // Scaled max radius for short viewports
      const maxRadius = height < 600 ? 8.5 : defaultMaxRadius;

      ctx.clearRect(0, 0, width, height);

      // ── LAYER 1: Vivid ambient glow behind showcase ──
      const glowGrad = ctx.createRadialGradient(
        width * 0.85, height * 0.35, 0,
        width * 0.85, height * 0.35, width * 0.45
      );
      glowGrad.addColorStop(0, 'rgba(0, 220, 255, 0.16)');
      glowGrad.addColorStop(0.6, 'rgba(14, 130, 160, 0.07)');
      glowGrad.addColorStop(1, 'rgba(0, 220, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Configure soft cyan glow blur on the dots
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(0, 220, 255, 0.35)';

      // ── LAYER 2: The halftone dot field ──
      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          // 0 = top-left, 1 = bottom-right
          const diagonalPos = (x / width + y / height) / 2;
          const curvePos = Math.pow(diagonalPos, 0.75);

          let radius = minRadius + curvePos * (maxRadius - minRadius);

          // Liquid Mouse Interaction
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelForce = Math.max(0, 1 - dist / 210);

          const displaceX = dx * repelForce * 0.10;
          const displaceY = dy * repelForce * 0.10;
          const finalX = x - displaceX;
          const finalY = y - displaceY;

          radius += repelForce * 2.5;

          // Color Interpolation: Ultra Electric Cyan → Deep Teal
          const r = Math.round(lerp(colorCyan.r, colorTeal.r, diagonalPos));
          const g = Math.round(lerp(colorCyan.g, colorTeal.g, diagonalPos));
          const b = Math.round(lerp(colorCyan.b, colorTeal.b, diagonalPos));

          // Softened opacity scale (0.10 → 0.42 max)
          const baseOpacity = 0.10 + curvePos * 0.32;

          // Compute Layered Arc Opacity Mask
          const mask = computeOpacityMask(x, y, width, height);
          const opacity = baseOpacity * mask;

          if (opacity < 0.003) continue;

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
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        /* Balanced radial mask around showcase area */
        maskImage: `
          radial-gradient(
            ellipse 75% 85% at 84% 45%,
            black 0%,
            rgba(0,0,0,0.7) 40%,
            rgba(0,0,0,0.2) 70%,
            transparent 100%
          )
        `,
        WebkitMaskImage: `
          radial-gradient(
            ellipse 75% 85% at 84% 45%,
            black 0%,
            rgba(0,0,0,0.7) 40%,
            rgba(0,0,0,0.2) 70%,
            transparent 100%
          )
        `,
      }}
    />
  );
};
