"use client";

import { Canvas } from "@react-three/fiber";
import { Model } from "./robot/Scene"
import "../../../styles/robotModel.scss"
import { OrbitControls } from "@react-three/drei";
import { PerformanceMonitor } from '@react-three/drei';
import { useTheme } from "@/app/[lang]/ThemeContext";
import { Suspense } from "react";

export default function RobotModel() {

    const { theme } = useTheme();

    return (
        <div className="robotModel">
            <Suspense fallback={<span>Loading...</span>}>
                <Canvas fov={50} near={0.1} far={1000}>
                    <PerformanceMonitor>
                        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minDistance={1} maxDistance={10}/>
                        <ambientLight intensity={5} />
                        <spotLight position={[8, 0, 10]} angle={0.4} penumbra={0.2} intensity={theme === "dark" ? 250 : 1000} />
                        <pointLight position={[-10, -10, -10]} intensity={0.8} />
                        <meshStandardMaterial roughness={0.3} metalness={0.7} />

                        <Model position={[0, -2, 2]} scale={[1, 1, 1]} rotation={[220, -100, 0]} />
                    </PerformanceMonitor>
                </Canvas>
            </Suspense>
        </div>

    )
}