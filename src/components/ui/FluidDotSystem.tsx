import React, { useEffect, useRef } from 'react';

export const FluidDotSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Denser, smoother grid
    const spacing = 16;
    const minRadius = 0.8;
    const maxRadius = 6.5;
    
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse tracking for fluid touch (only swelling, no pushing)
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
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = window.innerWidth;
      const height = window.innerHeight;

      // invisible wave centers
      const c1 = { x: width * 0.18, y: height * 0.28 };
      const c2 = { x: width * 0.82, y: height * 0.18 };
      const c3 = { x: width * 0.68, y: height * 0.82 };

      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          
          const d1 = Math.hypot(x - c1.x, y - c1.y);
          const d2 = Math.hypot(x - c2.x, y - c2.y);
          const d3 = Math.hypot(x - c3.x, y - c3.y);

          // Smooth radial interference waves with slow animation over time
          const wave =
            Math.sin(d1 * 0.018 - time) * 0.55 +
            Math.sin(d2 * 0.016 - time * 0.8) * 0.35 +
            Math.sin(d3 * 0.020 - time * 1.2) * 0.40;

          // normalize
          const t = (wave + 1.3) / 2.6;

          let radius = minRadius + t * (maxRadius - minRadius);

          // Mouse interaction (only swell dots)
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - dist / 180);

          radius += influence * 3;

          // Base opacity tied to dot size (halftone effect)
          let opacity = 0.15 + t * 0.65;
          
          // READABILITY FIX: Fade out heavily in the top-left quadrant where the text sits
          const textZoneX = Math.max(0, 1 - (x / (width * 0.6))); 
          const textZoneY = Math.max(0, 1 - Math.abs(y - height * 0.4) / (height * 0.5));
          
          const readabilityReduction = textZoneX * textZoneY * 0.85;
          opacity -= readabilityReduction;
          
          // Edge fading
          const fadeLeft = Math.min(x / 100, 1);
          const fadeTop = Math.min(y / 100, 1);
          opacity *= fadeLeft * fadeTop;

          // Color with subtle hue shift based on wave field
          const hue = 185 + t * 15;

          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.1, radius), 0, Math.PI * 2);
          
          // Add tiny blur for soft dots
          ctx.shadowBlur = 2;
          ctx.shadowColor = "rgba(0,180,200,0.25)";
          
          ctx.fillStyle = `hsla(${hue}, 85%, 45%, ${Math.max(0, opacity)})`;
          ctx.fill();
        }
      }

      time += 0.012;
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

