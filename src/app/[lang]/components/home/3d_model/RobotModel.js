"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./robot/Scene"
import "../../../styles/robotModel.scss"
import { OrbitControls } from "@react-three/drei";
import { PerformanceMonitor } from '@react-three/drei'
import { applyTheme } from "@/app/[lang]/toggleDarkMode";

export default function RobotModel() {

    const [lightsOn, setLightsOn] = useState(1000);

    return (
        <div className="robotModel">
            <Canvas fov={50} near={0.1} far={1000}>
                <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} />
                <ambientLight intensity={5} />
                <spotLight position={[0, 0, 10]} angle={0.4} penumbra={0.2} intensity={lightsOn} />
                <pointLight position={[-10, -10, -10]} intensity={0.8} />
                <meshStandardMaterial roughness={0.3} metalness={0.7} />
                <PerformanceMonitor>
                    <Model position={[0, -2, 2]} scale={[1, 1, 1]} rotation={[220, -100, 0]} />
                </PerformanceMonitor>
            </Canvas>
        </div>

    )
}