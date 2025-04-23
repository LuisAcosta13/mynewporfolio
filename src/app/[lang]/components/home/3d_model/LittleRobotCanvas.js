'use client'

import { LittleRobot } from "./littleRobot/LittleRobot"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage, Environment } from '@react-three/drei'
import { useTheme } from "@/app/[lang]/ThemeContext";
import '../../../styles/robotModel.scss'

export default function LittleRobotCanvas({isThinking}) {
    const { theme } = useTheme();
    return (
        <div className="robotModel">
            <Canvas shadows camera={{ position: [0, 1, 6], fov: 50, near: 0.1, far: 1000 }}>
                <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minDistance={1} maxDistance={10} />
                <ambientLight intensity={0.1} />
                <spotLight position={[8, 0, 5]} angle={0.4} penumbra={10} intensity={theme === "dark" ? 10 : 100} />
                <directionalLight position={[5, 5, 5]} intensity={0.1} />
                <Stage environment={theme === "light" && "warehouse"} intensity={0.8} contactShadow={true} shadows={true}>
                    <LittleRobot isThinking={isThinking} />
                </Stage>
                <OrbitControls />
            </Canvas>
        </div >
    )
}