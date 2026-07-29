import React, { useEffect, useRef } from 'react';

export const FluidDotSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // TIGHT grid so big dots overlap and merge like the PETRONAS ref
    const spacing = 20;
    const minRadius = 1.5;
    const maxRadius = 13.0;

    // Your brand palette only
    const colorCyan = { r: 6, g: 182, b: 212 };   // #06B6D4
    const colorTeal = { r: 14, g: 116, b: 144 };  // #0E7490

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

    const draw = () => {
      mouse.x = lerp(mouse.x, targetMouse.x, 0.08);
      mouse.y = lerp(mouse.y, targetMouse.y, 0.08);

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          // 0 = top-left, 1 = bottom-right
          const diagonalPos = (x / width + y / height) / 2;
          // Aggressive curve: dots stay small longer then explode
          const curvePos = Math.pow(diagonalPos, 0.7);

          let radius = minRadius + curvePos * (maxRadius - minRadius);

          // Fluid mouse interaction
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelForce = Math.max(0, 1 - dist / 220);

          const displaceX = dx * repelForce * 0.12;
          const displaceY = dy * repelForce * 0.12;
          const finalX = x - displaceX;
          const finalY = y - displaceY;

          // Swell near mouse
          radius += repelForce * 3.5;

          // Color: Cyan → Teal
          const r = Math.round(lerp(colorCyan.r, colorTeal.r, diagonalPos));
          const g = Math.round(lerp(colorCyan.g, colorTeal.g, diagonalPos));
          const b = Math.round(lerp(colorCyan.b, colorTeal.b, diagonalPos));

          // ---- BOLDER opacity ----
          // Strong enough to see the halftone pattern, but not muddy
          let opacity = 0.12 + curvePos * 0.35; // 0.12 → 0.47

          // ---- SMART TEXT SAFE-ZONE ----
          // Fades dots behind the LEFT text column only.
          // The right side (laptop showcase) stays fully visible.
          const textZoneLeft = Math.max(0, 1 - x / (width * 0.58));
          const textZoneTop = Math.max(0, 1 - y / (height * 0.55));
          const textFade = textZoneLeft * textZoneTop;
          opacity *= (1 - textFade * 0.88); // 88% reduction in text area

          // Also fade behind the metrics row at the bottom-left
          const metricsFadeX = Math.max(0, 1 - x / (width * 0.65));
          const metricsFadeY = Math.max(0, 1 - Math.abs(y - height * 0.82) / (height * 0.15));
          const metricsFade = metricsFadeX * metricsFadeY;
          opacity *= (1 - metricsFade * 0.75);

          // Edge fade for seamless blending
          const fadeDist = 50;
          const fadeLeft = Math.min(x / fadeDist, 1);
          const fadeTop = Math.min(y / fadeDist, 1);
          const fadeRight = Math.min((width - x) / fadeDist, 1);
          const fadeBottom = Math.min((height - y) / fadeDist, 1);
          opacity *= fadeLeft * fadeTop * fadeRight * fadeBottom;

          if (opacity < 0.005) continue;

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
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};
