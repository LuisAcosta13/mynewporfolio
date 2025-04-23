'use client'

import { LittleRobot } from "./littleRobot/LittleRobot"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from '@react-three/drei'
import { useTheme } from "@/app/[lang]/ThemeContext";
import * as THREE from 'three';
import '../../../styles/robotModel.scss'

export default function LittleRobotCanvas({ isThinking }) {
    const { theme } = useTheme();
    return (
        <div className="robotModel">
            <Canvas
                shadows
                camera={{ position: [0, 1, 6], fov: 50, near: 0.1, far: 1000 }}
            >
                <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minDistance={1} maxDistance={10} />
                <ambientLight intensity={theme === "light" ? 0.5 : 0.2} />
                <directionalLight
                    intensity={theme === "light" ? 1 : 0.6}
                    position={[5, 10, 5]}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <spotLight position={[8, 0, 5]} angle={0.4} penumbra={10} intensity={theme === "dark" ? 10 : 100} />
                <Stage
                    environment={theme === "light" ? "park" : "night"}
                    intensity={0.5}
                    preset={theme === "light" ? "soft" : "rembrandt"}
                    contactShadow={true}
                    shadows={true}
                >
                    <LittleRobot isThinking={isThinking} />
                </Stage>
                <OrbitControls />
            </Canvas>
        </div >
    )
}