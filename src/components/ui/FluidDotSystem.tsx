import React, { useEffect, useRef } from 'react';

export const FluidDotSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Grid settings — tighter spacing for a denser, more seamless pattern
    const spacing = 22;
    const minRadius = 0.3;
    const maxRadius = 12.0;

    // Three-stop palette matching the reference image
    const colorCyan = { r: 6, g: 182, b: 212 };    // #06B6D4  → bottom-left
    const colorTeal = { r: 14, g: 116, b: 144 };   // #0E7490  → middle
    const colorPurple = { r: 124, g: 58, b: 237 }; // #7C3AED  → top-right

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // setTransform prevents scale-compounding on repeated resizes
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse tracking for the fluid touch
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

    const draw = () => {
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          // Diagonal position: 0 at bottom-left, 1 at top-right
          const diagonalPos = (x / width + y / height) / 2;

          // Non-linear curve so the growth accelerates toward the purple corner
          const curvePos = Math.pow(diagonalPos, 0.8);
          let radius = minRadius + curvePos * (maxRadius - minRadius);

          // Fluid mouse interaction (repel & swell)
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelForce = Math.max(0, 1 - dist / 200);

          const displaceX = dx * repelForce * 0.15;
          const displaceY = dy * repelForce * 0.15;

          const finalX = x + displaceX;
          const finalY = y + displaceY;

          // Swell dot size near cursor
          radius += repelForce * 2.5;

          // Three-color interpolation
          let r: number, g: number, b: number;
          if (diagonalPos < 0.5) {
            const t = diagonalPos * 2; // 0 → 1
            r = Math.round(colorCyan.r * (1 - t) + colorTeal.r * t);
            g = Math.round(colorCyan.g * (1 - t) + colorTeal.g * t);
            b = Math.round(colorCyan.b * (1 - t) + colorTeal.b * t);
          } else {
            const t = (diagonalPos - 0.5) * 2; // 0 → 1
            r = Math.round(colorTeal.r * (1 - t) + colorPurple.r * t);
            g = Math.round(colorTeal.g * (1 - t) + colorPurple.g * t);
            b = Math.round(colorTeal.b * (1 - t) + colorPurple.b * t);
          }

          // Opacity rises with dot size for a richer halftone feel
          let opacity = 0.25 + curvePos * 0.55;

          // Seamless edge fading on all four sides
          const fadeDist = 60;
          const fadeLeft = Math.min(x / fadeDist, 1);
          const fadeTop = Math.min(y / fadeDist, 1);
          const fadeRight = Math.min((width - x) / fadeDist, 1);
          const fadeBottom = Math.min((height - y) / fadeDist, 1);
          opacity *= fadeLeft * fadeTop * fadeRight * fadeBottom;

          ctx.beginPath();
          ctx.arc(finalX, finalY, Math.max(0.1, radius), 0, Math.PI * 2);
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
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #06B6D4 0%, #0E7490 35%, #7C3AED 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />
    </div>
  );
};
