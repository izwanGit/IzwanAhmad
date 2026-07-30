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

    // Grid & Halftone Settings
    const spacing = 20;
    const minRadius = 1.5;
    const defaultMaxRadius = 13.0;

    // Brand Palette — Strictly Cyan to Teal
    const colorCyan = { r: 6, g: 182, b: 212 };   // #06B6D4
    const colorTeal = { r: 14, g: 116, b: 144 };  // #0E7490

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

    // Multi-Zone Opacity Mask Function
    const computeOpacityMask = (x: number, y: number, w: number, h: number): number => {
      // Responsive sanctuary boundary
      let sanctuaryRatio = 0.62;
      if (w < 768) {
        sanctuaryRatio = 0.90;
      } else if (w < 1024) {
        sanctuaryRatio = 0.75;
      }

      // Zone A: Text Sanctuary
      const sanctuaryRight = w * sanctuaryRatio;
      const sanctuaryFadeWidth = 60;
      let sanctuaryMask = 1.0;

      if (x < sanctuaryRight - sanctuaryFadeWidth) {
        sanctuaryMask = 0.03;
      } else if (x < sanctuaryRight) {
        const fadeT = (x - (sanctuaryRight - sanctuaryFadeWidth)) / sanctuaryFadeWidth;
        // Smooth ease-in-out instead of linear for a more organic transition
        const smoothT = fadeT * fadeT * (3 - 2 * fadeT);
        sanctuaryMask = 0.03 + smoothT * 0.97;
      }

      // Zone D: Metrics Row Elevation
      const metricsY = h * 0.82;
      const metricsHeight = h * 0.12;
      const metricsFade = 40;
      let metricsBoost = 0;

      if (y > metricsY - metricsFade && y < metricsY + metricsHeight + metricsFade) {
        const distFromCenter = Math.abs(y - (metricsY + metricsHeight / 2));
        const metricsT = Math.max(0, 1 - distFromCenter / (metricsHeight / 2 + metricsFade));
        metricsBoost = metricsT * 0.08;
      }

      // Edge Fade on all four borders
      const edgeDist = 40;
      const edgeLeft = Math.min(x / edgeDist, 1);
      const edgeTop = Math.min(y / edgeDist, 1);
      const edgeRight = Math.min((w - x) / edgeDist, 1);
      const edgeBottom = Math.min((h - y) / edgeDist, 1);
      const edgeMask = edgeLeft * edgeTop * edgeRight * edgeBottom;

      return Math.min(1.0, sanctuaryMask + metricsBoost) * edgeMask;
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

      // Adjust max radius for short viewports
      const maxRadius = height < 600 ? 10.0 : defaultMaxRadius;

      ctx.clearRect(0, 0, width, height);

      // ── LAYER 1: Ambient glow halos behind the dense corner ──
      // Creates a soft "light source" effect behind the halftone,
      // inspired by MagicUI's glow variant
      const glowGrad = ctx.createRadialGradient(
        width * 0.85, height * 0.3, 0,
        width * 0.85, height * 0.3, width * 0.45
      );
      glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      glowGrad.addColorStop(0.5, 'rgba(14, 116, 144, 0.04)');
      glowGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Second glow at bottom-right for depth
      const glowGrad2 = ctx.createRadialGradient(
        width * 0.95, height * 0.85, 0,
        width * 0.95, height * 0.85, width * 0.35
      );
      glowGrad2.addColorStop(0, 'rgba(14, 116, 144, 0.06)');
      glowGrad2.addColorStop(1, 'rgba(14, 116, 144, 0)');
      ctx.fillStyle = glowGrad2;
      ctx.fillRect(0, 0, width, height);

      // ── LAYER 2: The halftone dot field ──
      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          // 0 = top-left, 1 = bottom-right
          const diagonalPos = (x / width + y / height) / 2;
          const curvePos = Math.pow(diagonalPos, 0.7);

          let radius = minRadius + curvePos * (maxRadius - minRadius);

          // Liquid Mouse Interaction (repel & swell)
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelForce = Math.max(0, 1 - dist / 220);

          const displaceX = dx * repelForce * 0.12;
          const displaceY = dy * repelForce * 0.12;
          const finalX = x - displaceX;
          const finalY = y - displaceY;

          radius += repelForce * 3.5;

          // Color Interpolation: Cyan → Teal
          const r = Math.round(lerp(colorCyan.r, colorTeal.r, diagonalPos));
          const g = Math.round(lerp(colorCyan.g, colorTeal.g, diagonalPos));
          const b = Math.round(lerp(colorCyan.b, colorTeal.b, diagonalPos));

          // Base Halftone Opacity Gradient
          const baseOpacity = 0.12 + curvePos * 0.35;

          // Compute Layered Multi-Zone Opacity Mask
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
        /* MagicUI-inspired CSS mask: creates an organic radial fade
           so the dot field emerges beautifully from the right side
           instead of having hard rectangular sanctuary edges */
        maskImage: `
          linear-gradient(to right,
            transparent 0%,
            rgba(0,0,0,0.02) 15%,
            rgba(0,0,0,0.08) 45%,
            rgba(0,0,0,0.6) 65%,
            black 80%
          ),
          radial-gradient(
            ellipse 70% 80% at 85% 40%,
            black 0%,
            rgba(0,0,0,0.7) 40%,
            transparent 100%
          )
        `,
        maskComposite: 'intersect',
        WebkitMaskImage: `
          linear-gradient(to right,
            transparent 0%,
            rgba(0,0,0,0.02) 15%,
            rgba(0,0,0,0.08) 45%,
            rgba(0,0,0,0.6) 65%,
            black 80%
          ),
          radial-gradient(
            ellipse 70% 80% at 85% 40%,
            black 0%,
            rgba(0,0,0,0.7) 40%,
            transparent 100%
          )
        `,
        WebkitMaskComposite: 'source-in',
      }}
    />
  );
};
