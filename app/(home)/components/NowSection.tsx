import React from 'react';
import { Hammer, GraduationCap, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const NOW_ITEMS = [
    {
        icon: Hammer,
        label: "Building",
        text: "Polishing this portfolio's design system and shipping a full MDX-powered blog on top of it.",
    },
    {
        icon: GraduationCap,
        label: "Learning",
        text: "Going deeper on Kubernetes and Argo Workflows for the distributed backend systems I work on at Wordpower.",
    },
    {
        icon: Sparkles,
        label: "Exploring",
        text: "How far React Server Components patterns in Next.js can be pushed before a client boundary is really needed.",
    },
];

export default function NowSection() {
    return (
        <div className="flex flex-col gap-10">
            <SectionHeading
                title="Now"
                subtitle="A quick snapshot of what I'm currently building, learning, and exploring."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {NOW_ITEMS.map((item, idx) => (
                    <Reveal key={item.label} delay={idx * 0.05}>
                        <div className="h-full rounded-2xl bg-card/60 border border-border/50 p-6 flex flex-col gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-heading text-lg font-bold tracking-tight">{item.label}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    );
}
