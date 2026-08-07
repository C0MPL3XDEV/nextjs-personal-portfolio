"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
    href: string;
    target?: string;
    className?: string;
    children: React.ReactNode;
}

export function SpotlightCard({ href, target, className, children }: SpotlightCardProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [opacity, setOpacity] = useState(0);

    return (
        <Link
            href={href}
            target={target}
            ref={ref}
            onMouseMove={(e) => {
                const rect = ref.current?.getBoundingClientRect();
                if (!rect) return;
                setPosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                });
            }}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={cn("group relative block", className)}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}% ${position.y}%, hsl(var(--primary) / 0.15), transparent 70%)`,
                }}
            />
            {children}
        </Link>
    );
}
