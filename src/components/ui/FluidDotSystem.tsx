import React, { useEffect, useRef } from 'react';

export const FluidDotSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // Grid settings matching the clean reference image
    const spacing = 28;
    const minRadius = 1.0;
    const maxRadius = 4.0;
    
    // Theme Colors
    const colorTeal = { r: 14, g: 116, b: 144 }; // #0E7490
    const colorCyan = { r: 6, g: 182, b: 212 };  // #06B6D4

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

    // Mouse tracking for the "fluid touch" they liked
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

      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          
          // Diagonal halftone calculation (0 to 1)
          // Creates a smooth gradient from top-left to bottom-right
          const diagonalPos = (x / width + y / height) / 2;
          
          // Base halftone radius
          let radius = minRadius + diagonalPos * (maxRadius - minRadius);

          // Fluid mouse interaction (repel & swell)
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelForce = Math.max(0, 1 - dist / 200); // 0 to 1
          
          const displaceX = dx * repelForce * 0.15;
          const displaceY = dy * repelForce * 0.15;
          
          const finalX = x + displaceX;
          const finalY = y + displaceY;

          // Swell dot size near mouse
          radius += repelForce * 2.5;

          // Color shifts diagonally
          const r = Math.round(colorCyan.r * (1 - diagonalPos) + colorTeal.r * diagonalPos);
          const g = Math.round(colorCyan.g * (1 - diagonalPos) + colorTeal.g * diagonalPos);
          const b = Math.round(colorCyan.b * (1 - diagonalPos) + colorTeal.b * diagonalPos);

          // READABILITY FIX: Fade out heavily in the top-left quadrant where the text sits
          // The text is roughly in x: 0->800, y: 100->500
          let opacity = 0.4; // Base elegant opacity
          
          const textZoneX = Math.max(0, 1 - (x / (width * 0.6))); // 1 at left, 0 at 60% width
          const textZoneY = Math.max(0, 1 - Math.abs(y - height * 0.4) / (height * 0.5)); // 1 near middle-top
          
          // Reduce opacity up to 90% in the text zone for perfect readability
          const readabilityReduction = textZoneX * textZoneY * 0.85;
          opacity -= readabilityReduction;
          
          // Edge fading for seamless blending
          const fadeLeft = Math.min(x / 100, 1);
          const fadeTop = Math.min(y / 100, 1);
          opacity *= fadeLeft * fadeTop;

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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

