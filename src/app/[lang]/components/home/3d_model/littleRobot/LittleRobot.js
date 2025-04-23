
import { useGLTF, useAnimations } from '@react-three/drei'
import React, { useEffect } from 'react'
import * as THREE from 'three';

export function LittleRobot(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/littleRobot.gltf')
  const { actions } = useAnimations(animations, group)
  const [colorIndex, setColorIndex] = React.useState(0)

  const colors = [
    new THREE.Color(0x00ffff), // Cian eléctrico
    new THREE.Color(0x0088ff), // Azul neón
    new THREE.Color(0x00ff88), // Verde neón
    new THREE.Color(0x8800ff), // Púrpura brillante
    new THREE.Color(0x6666ff), // Azul metálico suave
  ]

  const handleColorChange = () => {
    const nextIndex = (colorIndex + 1) % colors.length
    setColorIndex(nextIndex)

    const newColor = colors[nextIndex]

    // Aplicar el nuevo color al material del robot
    const robotMaterial = nodes.Robot_Blue_Light_0?.material
    if (robotMaterial) {
      robotMaterial.color = newColor
      robotMaterial.emissive = newColor
    }

    // También podés cambiar los ojos si querés
    const eyesMaterial = nodes.Eyes_Blue_Light_0?.material
    if (eyesMaterial) {
      eyesMaterial.color = newColor
      eyesMaterial.emissive = newColor
    }
  }

  useEffect(() => {
    if (props.isThinking) {
      const robotMaterial = nodes.Robot_Blue_Light_0?.material;
      const eyesMaterial = nodes.Eyes_Blue_Light_0?.material;
  
      if (!robotMaterial || !eyesMaterial) return;
  
      // Guardar colores originales
      const originalColor = robotMaterial.color.clone();
      const originalEmissive = robotMaterial.emissive.clone();
  
      let startTime = Date.now();
      let animationFrameId;
  
      const animateRoboticGradient = () => {
        const elapsed = Date.now() - startTime;
        const duration = 1000;
        const t = (elapsed % duration) / duration;
  
        // Interpolar entre colores
        const index = Math.floor(t * colors.length);
        const nextIndex = (index + 1) % colors.length;
        const localT = (t * colors.length) % 1;
  
        const currentColor = colors[index].clone().lerp(colors[nextIndex], localT);
  
        robotMaterial.color.copy(currentColor);
        robotMaterial.emissive.copy(currentColor);
        eyesMaterial.color.copy(currentColor);
        eyesMaterial.emissive.copy(currentColor);
  
        if (elapsed < duration) {
          animationFrameId = requestAnimationFrame(animateRoboticGradient);
        } else {
          // Restaurar colores originales
          robotMaterial.color.copy(originalColor);
          robotMaterial.emissive.copy(originalEmissive);
          eyesMaterial.color.copy(originalColor);
          eyesMaterial.emissive.copy(originalEmissive);
        }
      };
  
      animateRoboticGradient();
  
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [props.isThinking]);

  useEffect(() => {
    if (actions) {
      actions[Object.keys(actions)[0]].play()
    }

    // Clean up on unmount
    //return () => actions && Object.values(actions).forEach(action => action.stop())
  }, [actions])

  useEffect(() => {
    if (actions) {
      actions[Object.keys(actions)[0]].play();
    }

    if (nodes.Robot_Blue_Light_0) {
      const eyesMaterial = nodes.Robot_Blue_Light_0.material;
      if (eyesMaterial) {
        eyesMaterial.emissive = new THREE.Color(0x00ffff); // Azul cian brillante
        eyesMaterial.emissiveIntensity = 1; // ¡Mucho más brillante!
        eyesMaterial.color = new THREE.Color(0x0088ff); // Color base más saturado
        eyesMaterial.roughness = 0.1; // Más suave aún
        eyesMaterial.metalness = 1; // Totalmente metálico
        eyesMaterial.toneMapped = false; // ¡Importante! Permite que se vea el brillo extremo
      }
    }
  }, [actions, nodes]);

  return (
    <group ref={group} {...props} dispose={null} onClick={handleColorChange}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0.4]} scale={0.246}>
          <group name="a45b6f53b9cc462a82863bb5898bf730fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Robot_Origin" position={[0, 9.763, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Mouth" position={[0, -0.504, 2.573]} scale={[1, 1, 2.881]}>
                    <mesh name="Mouth_Blue_Light_0" geometry={nodes.Mouth_Blue_Light_0.geometry} material={materials.Blue_Light} />
                  </group>
                  <group name="Wave" position={[0, 0, 0.113]} scale={[1, 1, 0.186]}>
                    <mesh name="Wave_Blue_Light_0" geometry={nodes.Wave_Blue_Light_0.geometry} material={materials.Blue_Light} />
                  </group>
                  <group name="Wave002" position={[0, 0, 0.879]} scale={[1, 1, 0.889]}>
                    <mesh name="Wave002_Blue_Light_0" geometry={nodes.Wave002_Blue_Light_0.geometry} material={materials.Blue_Light} />
                  </group>
                  <group name="Wave001" position={[0, 0, -0.089]} scale={[1, 1, 0.001]}>
                    <mesh name="Wave001_Blue_Light_0" geometry={nodes.Wave001_Blue_Light_0.geometry} material={materials.Blue_Light} />
                  </group>
                  <group name="Wave003" position={[0, 0, 0.511]} scale={[1, 1, 0.552]}>
                    <mesh name="Wave003_Blue_Light_0" geometry={nodes.Wave003_Blue_Light_0.geometry} material={materials.Blue_Light} />
                  </group>
                  <group name="Ears" position={[0, 0, 2.967]}>
                    <mesh name="Ears_Black_Matt_0" geometry={nodes.Ears_Black_Matt_0.geometry} material={materials.Black_Matt} />
                  </group>
                  <group name="Empty" position={[0, -0.06, 2.786]}>
                    <group name="Eyes" position={[0, -0.431, 0.076]}>
                      <mesh name="Eyes_Blue_Light_0" geometry={nodes.Eyes_Blue_Light_0.geometry} material={materials.Blue_Light} />
                    </group>
                  </group>
                  <group name="Hand_origin" position={[0.723, 0, 2.015]} rotation={[0, -0.064, 0]}>
                    <group name="hANDS" position={[-0.723, 0, -1.963]}>
                      <mesh name="hANDS_White_Glossy_0" geometry={nodes.hANDS_White_Glossy_0.geometry} material={materials.White_Glossy} />
                    </group>
                  </group>
                  <group name="Hand_origin002" position={[-0.723, 0, 2.015]} rotation={[0, 0.064, -Math.PI]}>
                    <group name="hANDS002" position={[-0.723, 0, -1.963]}>
                      <mesh name="hANDS002_White_Glossy_0" geometry={nodes.hANDS002_White_Glossy_0.geometry} material={materials.White_Glossy} />
                    </group>
                  </group>
                  <group name="Robot" position={[0, 0, 0.051]}>
                    <mesh name="Robot_White_Glossy_0" geometry={nodes.Robot_White_Glossy_0.geometry} material={materials.White_Glossy} />
                    <mesh name="Robot_Blue_Light_0" geometry={nodes.Robot_Blue_Light_0.geometry} material={materials.Blue_Light} />
                    <mesh name="Robot_Black_Matt_0" geometry={nodes.Robot_Black_Matt_0.geometry} material={materials.Black_Matt} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/littleRobot.gltf')