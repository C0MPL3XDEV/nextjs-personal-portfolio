"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface TimelineEntry {
    title: string;
    company: string;
    date: string;
    description: string;
    points?: string[];
    tech?: string[];
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {data.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >

                    {/* Timeline Dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                        <div className="w-3 h-3 bg-primary rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300" />
                    </div>

                    {/* Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card/60 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 group-hover:-translate-y-1">

                        {/* Header */}
                        <div className="flex flex-col mb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                <h3 className="font-bold text-lg text-foreground tracking-tight">{item.title}</h3>
                                <div className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground bg-secondary/50">
                                    {item.date}
                                </div>
                            </div>
                            <div className="text-primary font-medium text-sm">{item.company}</div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {item.description}
                        </p>

                        {/* Bullet Points */}
                        {item.points && (
                            <ul className="list-disc list-outside ml-4 mb-4 space-y-1 text-sm text-muted-foreground/90">
                                {item.points.map((point, idx) => (
                                    <li key={idx} className="pl-1 marker:text-primary/70">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Tech Stack */}
                        {item.tech && (
                            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                                {item.tech.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground font-medium border border-border/50"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
