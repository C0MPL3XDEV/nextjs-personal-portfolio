"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
    href: string;
    target?: string;
    className?: string;
    children: React.ReactNode;
}

const TILT_SPRING = { stiffness: 150, damping: 20, mass: 0.5 };
const TILT_INTENSITY = 10;

export function SpotlightCard({ href, target, className, children }: SpotlightCardProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

    const rotateXRaw = useMotionValue(0);
    const rotateYRaw = useMotionValue(0);
    const rotateX = useSpring(rotateXRaw, TILT_SPRING);
    const rotateY = useSpring(rotateYRaw, TILT_SPRING);

    function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        if (!shouldReduceMotion) {
            rotateYRaw.set((px - 0.5) * TILT_INTENSITY);
            rotateXRaw.set((0.5 - py) * TILT_INTENSITY);
        }

        setGlow({ x: px * 100, y: py * 100, opacity: 1 });
    }

    function handleMouseLeave() {
        rotateXRaw.set(0);
        rotateYRaw.set(0);
        setGlow((g) => ({ ...g, opacity: 0 }));
    }

    return (
        <div style={{ perspective: 1000 }}>
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
                <Link
                    href={href}
                    target={target}
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={cn("group relative block", className)}
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 transition-opacity duration-300"
                        style={{
                            opacity: glow.opacity,
                            background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, hsl(var(--primary) / 0.15), transparent 70%)`,
                        }}
                    />
                    {children}
                </Link>
            </motion.div>
        </div>
    );
}
