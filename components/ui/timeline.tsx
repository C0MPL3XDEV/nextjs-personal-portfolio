"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Timeline = ({ data }: { data: { title: string; date: string; description: string; company?: string }[] }) => {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {data.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >

                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full ring-2 ring-indigo-500/20 group-hover:scale-125 transition-transform" />
                    </div>

                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-4 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                            <span className="font-bold text-lg">{item.title}</span>
                            <time className="font-mono text-xs text-muted-foreground">{item.date}</time>
                        </div>
                        {item.company && <div className="text-secondary-foreground text-sm font-medium mb-2">{item.company}</div>}
                        <p className="text-muted-foreground text-sm">
                            {item.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
