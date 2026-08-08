"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Sparkles } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaDocker, FaLaravel, FaReact, FaVuejs } from "react-icons/fa";
import { TbBrandAngular, TbBrandNextjs } from "react-icons/tb";
import { SiGit, SiPhp, SiPostgresql, SiTypescript } from "react-icons/si";

const TECH_ITEMS: { icon: IconType; label: string }[] = [
    { icon: FaReact, label: "React" },
    { icon: TbBrandNextjs, label: "Next.js" },
    { icon: SiTypescript, label: "TypeScript" },
    { icon: FaLaravel, label: "Laravel" },
    { icon: FaDocker, label: "Docker" },
    { icon: SiPostgresql, label: "PostgreSQL" },
    { icon: TbBrandAngular, label: "Angular" },
    { icon: FaVuejs, label: "Vue.js" },
    { icon: SiPhp, label: "PHP" },
    { icon: SiGit, label: "Git" },
];

function fibonacciSphere(count: number, radius: number): [number, number, number][] {
    const points: [number, number, number][] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;
        points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
    }

    return points;
}

function TechBadge({ icon: Icon, label }: { icon: IconType; label: string }) {
    return (
        <div className="pointer-events-none flex items-center gap-2 px-3 py-2 rounded-full bg-card/90 backdrop-blur border border-border/50 shadow-lg whitespace-nowrap select-none">
            <Icon className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-medium text-foreground">{label}</span>
        </div>
    );
}

function TechSphere() {
    const positions = useMemo(() => fibonacciSphere(TECH_ITEMS.length, 2.4), []);

    return (
        <>
            {TECH_ITEMS.map((item, idx) => (
                <Html key={item.label} position={positions[idx]} center distanceFactor={8}>
                    <TechBadge icon={item.icon} label={item.label} />
                </Html>
            ))}
        </>
    );
}

export default function PlaygroundScene() {
    const shouldReduceMotion = !!useReducedMotion();

    return (
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <TechSphere />
            {!shouldReduceMotion && <Sparkles count={60} scale={7} size={1.5} speed={0.25} color="#a3e635" />}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={!shouldReduceMotion}
                autoRotateSpeed={0.8}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={(2 * Math.PI) / 3}
            />
        </Canvas>
    );
}
