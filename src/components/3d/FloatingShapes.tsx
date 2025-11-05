import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../../hooks/useIsMobile';

interface Shape {
  position: [number, number, number];
  geometry: 'box' | 'sphere' | 'torus' | 'octahedron' | 'dodecahedron';
  color: string;
  scale: number;
  speed: number;
}

export default function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const isMobile = useIsMobile();

  const allShapes: Shape[] = [
    { position: [-8, 4, -5], geometry: 'dodecahedron', color: '#fbbf24', scale: 1.5, speed: 0.5 },
    { position: [8, -3, -8], geometry: 'octahedron', color: '#f59e0b', scale: 1.2, speed: 0.7 },
    { position: [-5, -5, -3], geometry: 'torus', color: '#fb923c', scale: 1, speed: 0.6 },
    { position: [6, 5, -6], geometry: 'box', color: '#fbbf24', scale: 1.3, speed: 0.8 },
    { position: [0, -8, -10], geometry: 'sphere', color: '#f59e0b', scale: 1.8, speed: 0.4 },
    { position: [-10, 0, -7], geometry: 'octahedron', color: '#fb923c', scale: 1.1, speed: 0.9 },
    { position: [10, 8, -4], geometry: 'dodecahedron', color: '#fbbf24', scale: 1.4, speed: 0.55 },
  ];

  const shapes = isMobile ? allShapes.slice(0, 3) : allShapes;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const renderGeometry = (type: Shape['geometry']) => {
    switch (type) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => (
        <Float
          key={index}
          speed={shape.speed}
          rotationIntensity={1}
          floatIntensity={2}
        >
          <mesh position={shape.position} scale={shape.scale}>
            {renderGeometry(shape.geometry)}
            <MeshDistortMaterial
              color={shape.color}
              transparent
              opacity={0.6}
              distort={0.3}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

