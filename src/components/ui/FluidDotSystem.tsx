import React, { useEffect, useRef } from 'react';

export const FluidDotSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Tighter grid so large dots overlap & merge in the dense corner
    const spacing = 22;
    const minRadius = 0.4;
    const maxRadius = 14.0;

    // Palette: Cyan → Teal → Purple
    const colorCyan = { r: 6, g: 182, b: 212 };    // #06B6D4
    const colorTeal = { r: 14, g: 116, b: 144 };   // #0E7490
    const colorPurple = { r: 124, g: 58, b: 237 }; // #7C3AED

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // setTransform avoids the scale-compounding bug on repeated resizes
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse state with gentle lag
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

    const getGradientColor = (t: number) => {
      let r: number, g: number, b: number;
      if (t < 0.5) {
        const p = t * 2;
        r = lerp(colorCyan.r, colorTeal.r, p);
        g = lerp(colorCyan.g, colorTeal.g, p);
        b = lerp(colorCyan.b, colorTeal.b, p);
      } else {
        const p = (t - 0.5) * 2;
        r = lerp(colorTeal.r, colorPurple.r, p);
        g = lerp(colorTeal.g, colorPurple.g, p);
        b = lerp(colorTeal.b, colorPurple.b, p);
      }
      return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
    };

    const draw = () => {
      // Smooth mouse follow
      mouse.x = lerp(mouse.x, targetMouse.x, 0.08);
      mouse.y = lerp(mouse.y, targetMouse.y, 0.08);

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          // 0 = bottom-left, 1 = top-right
          const diagonalPos = (x / width + y / height) / 2;
          // Non-linear curve: stays tiny longer, then explodes into dense halftone
          const curvePos = Math.pow(diagonalPos, 0.65);

          let radius = minRadius + curvePos * (maxRadius - minRadius);

          // ---- Fluid mouse interaction ----
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelForce = Math.max(0, 1 - dist / 220);

          // Push dots away from cursor
          const displaceX = dx * repelForce * 0.2;
          const displaceY = dy * repelForce * 0.2;
          const finalX = x - displaceX;
          const finalY = y - displaceY;

          // Swell radius near mouse for a tactile "liquid" feel
          radius += repelForce * 4.0;

          // ---- Color ----
          const col = getGradientColor(diagonalPos);

          // ---- Opacity ----
          // Base: stronger presence in the dense purple corner
          let opacity = 0.18 + curvePos * 0.5;

          // TEXT SAFE-ZONE: Top-left quadrant where the headline sits.
          // x: 0→55% width, y: 0→45% height gets heavily faded.
          const textFadeX = Math.max(0, 1 - x / (width * 0.55));
          const textFadeY = Math.max(0, 1 - y / (height * 0.45));
          const textFade = textFadeX * textFadeY;
          opacity *= (1 - textFade * 0.95); // up to 95% reduction

          // Seamless edge fading on all four sides
          const fadeDist = 50;
          const fadeLeft = Math.min(x / fadeDist, 1);
          const fadeTop = Math.min(y / fadeDist, 1);
          const fadeRight = Math.min((width - x) / fadeDist, 1);
          const fadeBottom = Math.min((height - y) / fadeDist, 1);
          opacity *= fadeLeft * fadeTop * fadeRight * fadeBottom;

          if (opacity < 0.003) continue;

          ctx.beginPath();
          ctx.arc(finalX, finalY, Math.max(0.1, radius), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${opacity})`;
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
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};
