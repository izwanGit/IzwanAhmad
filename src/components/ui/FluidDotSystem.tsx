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
    
    // Grid settings
    const spacing = 35;
    const baseRadius = 1.2;
    const maxRadius = 4.5;
    
    // Colors
    const colorTeal = { r: 14, g: 116, b: 144 }; // #0E7490
    const colorCyan = { r: 6, g: 182, b: 212 };  // #06B6D4

    // Resize handler
    const handleResize = () => {
      // Handle high DPI displays for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse tracking for interactive repel effect
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
      // Smooth mouse interpolation
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      // Clear canvas with perfect transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Draw dot grid
      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          
          // Organic fluid wave math using overlapping sine waves
          const wave1 = Math.sin(x * 0.002 + time * 1.2) * Math.cos(y * 0.003 + time * 0.8);
          const wave2 = Math.sin(x * 0.004 - time * 0.5) * Math.cos(y * 0.005 + time * 1.5);
          const noise = wave1 * 0.5 + wave2 * 0.5; // -1 to 1

          // Mouse repel logic
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelForce = Math.max(0, 1 - dist / 250); // 0 to 1
          
          // Displacement
          const displaceY = noise * 40 - (dy * repelForce * 0.2);
          const displaceX = (dx * repelForce * 0.2);
          
          const finalX = x + displaceX;
          const finalY = y + displaceY;

          // Determine dot size (halftone effect)
          // Larger where the wave peaks, plus mouse repel swells the dots
          let radius = baseRadius + ((noise + 1) / 2) * (maxRadius - baseRadius);
          radius += repelForce * 3; // Swell on hover

          // Blend color based on vertical position and wave height
          const mix = (noise + 1) / 2; // 0 to 1
          const r = Math.round(colorTeal.r * (1 - mix) + colorCyan.r * mix);
          const g = Math.round(colorTeal.g * (1 - mix) + colorCyan.g * mix);
          const b = Math.round(colorTeal.b * (1 - mix) + colorCyan.b * mix);

          // Fade out edges so it blends beautifully into background
          const fadeLeft = Math.min(x / 200, 1);
          const fadeRight = Math.min((width - x) / 200, 1);
          const fadeTop = Math.min(y / 200, 1);
          const fadeBottom = Math.min((height - y) / 200, 1);
          
          // Keep center-left relatively clean for typography
          const textZoneDistance = Math.max(0, 1 - Math.sqrt(Math.pow((x - width * 0.3), 2) + Math.pow((y - height * 0.5), 2)) / 600);
          
          const opacity = Math.max(0.05, 0.6 * fadeLeft * fadeRight * fadeTop * fadeBottom * (1 - textZoneDistance * 0.6));

          ctx.beginPath();
          ctx.arc(finalX, finalY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fill();
        }
      }

      time += 0.012; // Speed of the fluid motion
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
