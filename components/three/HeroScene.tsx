"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type * as THREE from "three";

function RotatingIcosahedron({ paused }: { paused: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (paused || !meshRef.current) return;
        meshRef.current.rotation.x += delta * 0.15;
        meshRef.current.rotation.y += delta * 0.2;
    });

    return (
        <Float speed={paused ? 0 : 1.5} rotationIntensity={paused ? 0 : 0.3} floatIntensity={paused ? 0 : 0.6}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.6, 1]} />
                <meshBasicMaterial color="#a3e635" wireframe transparent opacity={0.35} />
            </mesh>
        </Float>
    );
}

function CameraRig({ paused }: { paused: boolean }) {
    const { camera } = useThree();
    const target = useRef({ x: 0, y: 0 });

    useFrame(() => {
        if (paused) return;
        camera.position.x += (target.current.x - camera.position.x) * 0.03;
        camera.position.y += (target.current.y - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
    });

    useEffect(() => {
        if (paused) return;

        function onMove(e: PointerEvent) {
            target.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 1.2,
                y: -(e.clientY / window.innerHeight - 0.5) * 0.8,
            };
        }

        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
    }, [paused]);

    return null;
}

export default function HeroScene() {
    const shouldReduceMotion = !!useReducedMotion();

    return (
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={0.6} />
            <RotatingIcosahedron paused={shouldReduceMotion} />
            {!shouldReduceMotion && <Sparkles count={40} scale={6} size={2} speed={0.3} color="#a3e635" />}
            <CameraRig paused={shouldReduceMotion} />
        </Canvas>
    );
}
