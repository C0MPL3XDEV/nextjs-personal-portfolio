"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const PlaygroundScene = dynamic(() => import("@/components/three/PlaygroundScene"), {
    ssr: false,
});

export default function Playground() {
    const ref = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col gap-10">
            <SectionHeading
                title="Tech Orbit"
                subtitle="The stack I build with, floating in 3D — drag to look around."
            />

            <Reveal>
                <div
                    ref={ref}
                    className="relative w-full h-[420px] md:h-[520px] rounded-2xl border border-border/50 bg-card/40 dark:bg-grid-white/[0.04] bg-grid-black/[0.02] overflow-hidden cursor-grab active:cursor-grabbing"
                >
                    {shouldLoad ? (
                        <PlaygroundScene />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            Scroll to load
                        </div>
                    )}
                </div>
            </Reveal>
        </div>
    );
}
