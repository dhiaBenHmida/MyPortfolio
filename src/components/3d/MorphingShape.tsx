import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MorphingShapeProps {
  position?: [number, number, number];
  color?: string;
}

export default function MorphingShape({ 
  position = [0, 0, 0],
  color = '#fbbf24'
}: MorphingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create geometries for morphing
  const geometries = useMemo(() => {
    return [
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.TorusGeometry(1.2, 0.5, 16, 100),
      new THREE.OctahedronGeometry(1.5, 0),
    ];
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.5;
      
      // Scale pulse
      const scale = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometries[0]}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
}

