import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface MouseFollowingSphereProps {
  sectionColor?: string;
}

export default function MouseFollowingSphere({ sectionColor = '#fbbf24' }: MouseFollowingSphereProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!sphereRef.current) return;

    // Smooth follow with lerp
    targetPosition.current.x = mousePos.current.x * 5;
    targetPosition.current.y = mousePos.current.y * 5;

    sphereRef.current.position.lerp(targetPosition.current, 0.1);
    
    // Gentle rotation
    sphereRef.current.rotation.x += 0.01;
    sphereRef.current.rotation.y += 0.01;
  });

  return (
    <Sphere ref={sphereRef} args={[0.8, 32, 32]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color={sectionColor}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

