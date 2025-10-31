import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function SceneTransition() {
  const groupRef = useRef<THREE.Group>(null);
  const geometryRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!groupRef.current || !geometryRef.current) return;

    const offset = scroll.offset;
    const time = state.clock.getElapsedTime();

    // Rotate based on scroll
    groupRef.current.rotation.x = offset * Math.PI * 2;
    groupRef.current.rotation.y = offset * Math.PI * 3;
    
    // Morph between shapes based on scroll position
    const section = Math.floor(offset * 5); // 5 sections
    const sectionProgress = (offset * 5) % 1;

    // Scale and position changes
    const scale = 1 + Math.sin(sectionProgress * Math.PI) * 0.5;
    groupRef.current.scale.setScalar(scale);

    // Continuous rotation
    geometryRef.current.rotation.x += 0.005;
    geometryRef.current.rotation.y += 0.003;

    // Color shift based on section
    const material = geometryRef.current.material as THREE.MeshStandardMaterial;
    const colors = [
      new THREE.Color('#3498db'), // Hero - Blue
      new THREE.Color('#34495e'), // Experience - Dark Blue
      new THREE.Color('#2c3e50'), // Projects - Darker Blue
      new THREE.Color('#3498db'), // Skills - Blue
      new THREE.Color('#2c3e50'), // Contact - Dark
    ];
    
    const currentColor = colors[section] || colors[0];
    const nextColor = colors[section + 1] || colors[0];
    material.color.lerpColors(currentColor, nextColor, sectionProgress);

    // Emissive pulse
    material.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={geometryRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial
          color="#3498db"
          emissive="#3498db"
          emissiveIntensity={0.3}
          wireframe={false}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Add wireframe overlay for extra effect */}
      <mesh>
        <icosahedronGeometry args={[2.05, 1]} />
        <meshBasicMaterial
          color="#3498db"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

