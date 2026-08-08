import React from 'react';
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const ENGAGEMENT_TYPES = ["Freelance", "Full-time", "Consulting"];

export default function AvailabilityBanner() {
    return (
        <Reveal>
            <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-8 md:p-14 overflow-hidden text-center flex flex-col items-center gap-6">
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />

                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-500 text-sm font-medium relative z-10">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    Currently available
                </span>

                <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight relative z-10 max-w-2xl">
                    Got a project in mind? Let&apos;s build it together.
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-2 relative z-10">
                    {ENGAGEMENT_TYPES.map((type) => (
                        <span key={type} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {type}
                        </span>
                    ))}
                </div>

                <Link
                    href="/#contact"
                    className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                    Let&apos;s talk <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </Reveal>
    );
}
