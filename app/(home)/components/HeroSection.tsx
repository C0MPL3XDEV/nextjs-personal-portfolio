"use client"

import {useRef} from 'react';
import {motion} from "framer-motion";
import {Code, Database, Globe, Palette} from "lucide-react";

export default function HeroSection () {

    const CleanButton = ({children, className = "", variant = "default", href, ...props}: any) => {
        const ref = useRef<HTMLButtonElement>(null);

        const variants: any = {
            default: "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-sm",
            outline:
                "border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
            ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
            accent: "bg-green-300 hover:bg-green-400 text-slate-900 shadow-sm",
        }

        const Component = href ? "a" : "button";
        return (
            <Component
                ref={ref}
                href={href}
                className={`relative px-6 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${variants[variant]} ${className}`}
                data-magnetic
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">{children}</span>
            </Component>
        )
    }

    return (
        <div className="pt-16 pb-10 px-6 relative z-10 animate-move-up">
            <div className="max-w-6xl mx-auto text-center">
                <div
                    className="inline-flex items-center gap-2 bg-green-100 dark: bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Open to opportunities
                </div>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-slate-900 dark:text-slate-100">
                    The interactive{" "}
                    <span className="relative">
                        full-stack
                        <motion.div
                            initial={{width: 0}}
                            animate={{width: "100%"}}
                            transition={{delay: 1, duration: 1}}
                            className="absolute bottom-2 left-0 h-1 bg-green-300 -z-10"
                        />
                    </span>{" "}
                    developer
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                    Bridge between a failing system and a working solution: Where
                    creativity meets functionality, and innovation drives progress.
                </p>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.6}}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <CleanButton target="blank" variant="accent" className="px-8 py-4 text-base"
                                 href="https://drive.google.com/">Visit My Resume</CleanButton>
                    <CleanButton variant="outline" className="px-8 py-4 text-base" href="#contacts">Let&apos;s
                        Connect</CleanButton>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.8}}
                    className="flex flex-wrap justify-center gap-6 mt-16"
                >
                    {[
                        {icon: <Code className="w-5 h-5"/>, name: "Frontend"},
                        {icon: <Database className="w-5 h-5"/>, name: "Backend"},
                        {icon: <Palette className="w-5 h-5"/>, name: "Design"},
                        {icon: <Globe className="w-5 h-5"/>, name: "Full-stack"},
                    ].map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{delay: 1 + index * 0.1}}
                            className="flex items-center gap-3 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-lg shadow-sm"
                        >
                            <div className="text-slate-600 dark:text-zinc-400">{item.icon}</div>
                            <div className="text-sm font-medium text-slate-700 dark:text-zinc-300">{item.name}</div>
                        </motion.div>
                    ))
                    }
                </motion.div>
            </div>
        </div>
    )
}