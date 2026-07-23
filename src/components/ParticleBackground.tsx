import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Generate a random sphere of points
  const [positions] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 20 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return [positions];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0E7490"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.15}
        />
      </Points>
    </group>
  );
};

const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ParticleSwarm />
      </Canvas>
      {/* Subtle overlay gradient to blend into the #F5F9FA background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
    </div>
  );
};

export default ParticleBackground;
