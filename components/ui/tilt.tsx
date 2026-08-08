"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const TILT_SPRING = { stiffness: 150, damping: 20, mass: 0.5 };

export function Tilt({
    children,
    className,
    intensity = 10,
}: {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const rotateXRaw = useMotionValue(0);
    const rotateYRaw = useMotionValue(0);
    const rotateX = useSpring(rotateXRaw, TILT_SPRING);
    const rotateY = useSpring(rotateYRaw, TILT_SPRING);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (shouldReduceMotion) return;

        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        rotateYRaw.set((px - 0.5) * intensity);
        rotateXRaw.set((0.5 - py) * intensity);
    }

    function handleMouseLeave() {
        rotateXRaw.set(0);
        rotateYRaw.set(0);
    }

    return (
        <div style={{ perspective: 1000 }} className={className}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="h-full w-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
