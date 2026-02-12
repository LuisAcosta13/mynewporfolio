'use client';

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useState, useRef } from 'react';
import * as THREE from 'three';
import "../../../styles/robotModel.scss"

function SkillNode({ position, name }) {
  const [hovered, setHovered] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const pulseRef = useRef(0);
  const meshRef = useRef();
  const nodeRef = useRef();

  const color1 = new THREE.Color('#ffffaa'); // color base
  const color2 = new THREE.Color('#ffd700'); // color más intenso

  const targetScale = hovered ? 1.5 : 1; // Escala objetivo cuando el nodo está hoverado

  // Actualizamos la escala suavemente usando `lerp`
  useFrame((state, delta) => {
    if (meshRef.current && nodeRef.current) {
      const currentScale = meshRef.current.scale;
      const target = new THREE.Vector3(targetScale, targetScale, targetScale);
      currentScale.lerp(target, 0.05);

      const color = new THREE.Color(hovered ? '#ffd700' : '#ffffff');
      meshRef.current.material.color.lerp(color, 0.1);

      pulseRef.current += delta;

      const pulseSpeed = userInteracted ? 1.5 : 5; // Pulso más lento después de interactuar
      const pulseStrength = userInteracted ? 0.05 : 0.2; // Pulso más sutil después de interactuar

      const intensity = 0.5 + Math.sin(pulseRef.current * pulseSpeed) * pulseStrength;
      nodeRef.current.material.opacity = THREE.MathUtils.clamp(intensity, 0, 1);

      const t = (Math.sin(pulseRef.current * pulseSpeed) + 1) / 2;

      const pulsingColor = new THREE.Color();
      pulsingColor.lerpColors(color1, color2, t);
      nodeRef.current.material.color.copy(pulsingColor);

      // Cambio en opacidad:
      nodeRef.current.material.opacity = userInteracted
        ? THREE.MathUtils.clamp(0.8 + 0.2 * t, 1, 1) // después de interactuar, casi siempre opaco
        : THREE.MathUtils.clamp(0.5 + 0.5 * t, 0.1, 1);

    }
  });

  return (
    <group position={position}>
      {/* Resplandor alrededor del nodo */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => {
          setHovered(true)
          setUserInteracted(true)
        }}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          emissiveIntensity={hovered ? 2 : 1}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Nodo principal */}
      <mesh ref={nodeRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"  // <--- color base
          emissive='#fffefc'
          emissiveIntensity={1.8}
          transparent // <--- necesario para que la opacidad funcione
          opacity={1}
        />
      </mesh>

      {hovered && (
        <Html center style={{ position: 'relative' }}>
          <div style={{ color: 'white', backgroundColor: 'black', padding: '8px', borderRadius: '4px', position: 'absolute', top: '-60px' }}>
            {name}
          </div>
        </Html>
      )}
    </group>
  )
}

function Connections({ from, to }) {
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([...from, ...to])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="white"
        linewidth={2}
        emissive="#ffffff" // Resplandor suave sobre la línea
      />
    </line>
  );
}

export default function SkillMap({ skills }) {
  return (
    <Canvas className="SkillsMap" camera={{ position: [0, 0, 12], fov: 50 }}>
      <OrbitControls minDistance={1} maxDistance={20} enableZoom={false} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <directionalLight position={[0, 10, 0]} intensity={0.5} castShadow />
      {skills.map(skill => (
        <SkillNode key={skill.id} position={skill.position} name={skill.name} />
      ))}
      {skills.map(skill =>
        skill.connections.map(connId => {
          const target = skills.find(s => s.id === connId);
          return (
            <Connections
              key={`${skill.id}-${connId}`}
              from={skill.position}
              to={target.position}
            />
          )
        })
      )}
    </Canvas>
  )
}
