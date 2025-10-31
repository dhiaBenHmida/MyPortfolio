import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  mouseInfluence?: boolean;
}

export default function ParticleField({ 
  count = 2000, 
  radius = 15,
  mouseInfluence = true 
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  // Generate particle positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius * Math.cbrt(Math.random());
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      temp.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        scale: Math.random() * 0.5 + 0.5,
      });
    }
    return temp;
  }, [count, radius]);

  // Mouse move handler
  if (mouseInfluence) {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', (e) => {
        mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      });
    }
  }

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();

    particles.forEach((particle, i) => {
      // Update position with velocity
      particle.position.add(particle.velocity);

      // Boundary check - keep particles within sphere
      if (particle.position.length() > radius) {
        particle.position.normalize().multiplyScalar(radius);
        particle.velocity.multiplyScalar(-1);
      }

      // Mouse influence
      if (mouseInfluence) {
        const mouseInfluenceStrength = 0.5;
        const mouseVec = new THREE.Vector3(
          mousePos.current.x * 10,
          mousePos.current.y * 10,
          0
        );
        const direction = mouseVec.clone().sub(particle.position);
        const distance = direction.length();
        
        if (distance < 5) {
          direction.normalize().multiplyScalar(mouseInfluenceStrength / (distance + 1));
          particle.position.add(direction);
        }
      }

      // Set matrix for instanced mesh
      dummy.position.copy(particle.position);
      dummy.scale.setScalar(particle.scale * (1 + Math.sin(time + i) * 0.1));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial 
        color="#3498db" 
        emissive="#3498db"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

