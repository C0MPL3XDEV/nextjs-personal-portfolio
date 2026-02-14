"use client";

import React from 'react';
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import {SpotifyWidget} from "@/components/spotify-widget";

export default function HeroSection() {

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const child = {
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
    };

    return (
        <div className="min-h-[80vh] flex flex-col-reverse lg:flex-row gap-10 items-center justify-between pb-10">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={container}
                className="space-y-6 text-center lg:text-left flex-1"
            >
                <motion.div variants={child} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-500 text-sm font-medium">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Available for work
                </motion.div>

                <h1 className="text-4xl lg:text-7xl font-bold tracking-tight">
                    <motion.div variants={child}>Building digital</motion.div>
                    <motion.div variants={child} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                        experiences
                    </motion.div>
                    <motion.div variants={child}>that matter.</motion.div>
                </h1>

                <motion.p variants={child} className="md:w-3/4 text-lg text-muted-foreground mx-auto lg:mx-0 leading-relaxed">
                    I&apos;m a <strong>Software Technologies student</strong> and <strong>Junior Full Stack Developer</strong> with ~2 years of experience.
                    I build secure, scalable web applications with a focus on architecture, fueled by <strong>music</strong> and creativity.
                </motion.p>

                <motion.div
                    variants={child}
                    className="mt-4 w-full max-w-[520px]"
                >
                    <div className="flex flex-col items-start gap-2">
                        <motion.span
                            variants={child}
                            className="text-[11px] text-muted-foreground uppercase tracking-wider"
                        >
                            Currently listening
                        </motion.span>

                        <SpotifyWidget compact />
                    </div>
                </motion.div>

                <motion.div variants={child} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                    <Link href="#contact" scroll={true}>
                        <Button size="lg" className="h-12 px-8 text-base rounded-full gap-2 group bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40 focus-visible:ring-indigo-500">
                            Contact Me
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>

                    <Link href="/cv.pdf" target="_blank">
                        {/* We keep the fancy button for CV or replace it? Detailed plan said: "Make the button a proper primary/secondary shadcn-style button". I will replace it with a clean Secondary/Outline button to match the system. */}
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full gap-2 border-slate-700 hover:bg-slate-800">
                            Download CV <Download className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative flex-1 flex justify-center lg:justify-end"
            >
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 bg-zinc-900/50 backdrop-blur-sm group">
                        {/* Placeholder for Profile Image or abstract interactive element */}
                        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,10%,#000,100%)]" />
                        <div className="flex items-center justify-center h-full text-zinc-500 font-mono text-sm">
                            {`< Code / >`}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}