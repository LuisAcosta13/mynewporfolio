/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 scene.gltf 
Author: OSCAR CREATIVO (https://sketchfab.com/oscar_creativo)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/free-droide-de-seguridad-k-2so-by-oscar-creativo-e4c65688ae1b47ec9e1dd6acec2dcadd
Title: Free Droide De Seguridad K-2SO By Oscar Creativo
*/

import React from 'react'
import { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Model(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF("/assets/3d_robot/scene.gltf", '/draco-gltf/')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions) {
      // Play the first animation in the list, or use a specific animation name
      actions[Object.keys(actions)[0]].play()

      // To loop or control animations, you can add other parameters here
    }
    
    // Clean up on unmount
    return () => actions && Object.values(actions).forEach(action => action.stop())
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[1.571, 0, 0]} scale={1.442}>
          <group name="f95ba1337bf34cbaa688b750654cb3acfbx" rotation={[-Math.PI, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <group name="Object_6" />
                  <group name="Droide_de_seguridad_Star_Wars_KX" />
                  <skinnedMesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials.Body} skeleton={nodes.Object_7.skeleton} morphTargetDictionary={nodes.Object_7.morphTargetDictionary} morphTargetInfluences={nodes.Object_7.morphTargetInfluences} />
                  <skinnedMesh name="Object_8" geometry={nodes.Object_8.geometry} material={materials.Head} skeleton={nodes.Object_8.skeleton} morphTargetDictionary={nodes.Object_8.morphTargetDictionary} morphTargetInfluences={nodes.Object_8.morphTargetInfluences} />
                  <skinnedMesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.Misc} skeleton={nodes.Object_9.skeleton} morphTargetDictionary={nodes.Object_9.morphTargetDictionary} morphTargetInfluences={nodes.Object_9.morphTargetInfluences} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/3d_robot/scene.gltf')
