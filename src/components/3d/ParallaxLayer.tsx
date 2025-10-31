import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  zOffset?: number;
}

export default function ParallaxLayer({ children, speed = 1, zOffset = 0 }: ParallaxLayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!groupRef.current) return;

    const scrollOffset = scroll.offset;
    
    // Move based on scroll with parallax speed
    groupRef.current.position.y = scrollOffset * speed * 10;
    
    // Subtle rotation based on scroll
    groupRef.current.rotation.z = scrollOffset * speed * 0.5;
  });

  return (
    <group ref={groupRef} position={[0, 0, zOffset]}>
      {children}
    </group>
  );
}

