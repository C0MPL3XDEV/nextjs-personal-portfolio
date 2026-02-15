"use client";

import React, { useState } from 'react';
import { SectionHeading } from "@/components/ui/section-heading";
import { TbBrandCpp, TbBrandMysql, TbBrandJavascript, TbBrandHtml5, TbBrandCss3, TbBrandPython, TbBrandFirebase, TbBrandNextjs, TbBrandAngular } from "react-icons/tb";
import { LiaJava } from "react-icons/lia";
import { SiPhp, SiLinux, SiTypescript, SiElastic, SiTailwindcss, SiPostgresql, SiGit } from "react-icons/si";
import { FaLaravel, FaDocker, FaVuejs, FaReact } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Define categories
type Category = "All" | "Frontend" | "Backend" | "DevOps" | "Data/Tools";

interface Skill {
    title: string;
    icon: React.ElementType;
    category: Category[];
    description: string;
}

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");

    const skills: Skill[] = [
        // Frontend
        { title: "React", icon: FaReact, category: ["Frontend"], description: "Component-based UI architecture" },
        { title: "Next.js", icon: TbBrandNextjs, category: ["Frontend", "Backend"], description: "App Router, SSR, Server Actions" },
        { title: "TypeScript", icon: SiTypescript, category: ["Frontend", "Backend"], description: "Type-safe scalability" },
        { title: "Tailwind CSS", icon: SiTailwindcss, category: ["Frontend"], description: "Rapid styling framework" },
        { title: "Angular", icon: TbBrandAngular, category: ["Frontend"], description: "Enterprise-grade SPA framework" },
        { title: "Vue.js", icon: FaVuejs, category: ["Frontend"], description: "Progressive JavaScript Framework" },
        { title: "JavaScript", icon: TbBrandJavascript, category: ["Frontend"], description: "ES6+ Modern Standards" },
        { title: "HTML5", icon: TbBrandHtml5, category: ["Frontend"], description: "Semantic markup" },
        { title: "CSS3", icon: TbBrandCss3, category: ["Frontend"], description: "Modern layouts & animations" },

        // Backend
        { title: "Laravel", icon: FaLaravel, category: ["Backend"], description: "PHP Framework for Artisans" },
        { title: "PHP", icon: SiPhp, category: ["Backend"], description: "Server-side scripting" },
        { title: "Java", icon: LiaJava, category: ["Backend"], description: "Enterprise OOP backend" },
        { title: "Python", icon: TbBrandPython, category: ["Backend", "Data/Tools"], description: "Automation & scripting" },

        // Data / Tools
        { title: "MySQL", icon: TbBrandMysql, category: ["Backend", "Data/Tools"], description: "Relational database management" },
        { title: "PostgreSQL", icon: SiPostgresql, category: ["Backend", "Data/Tools"], description: "Advanced open source database" },
        { title: "Firebase", icon: TbBrandFirebase, category: ["Backend", "Data/Tools"], description: "Real-time NoSQL cloud DB" },
        { title: "Elasticsearch", icon: SiElastic, category: ["Data/Tools"], description: "Search & analytics engine" },
        { title: "Git", icon: SiGit, category: ["Data/Tools", "DevOps"], description: "Version control system" },

        // DevOps
        { title: "Docker", icon: FaDocker, category: ["DevOps"], description: "Containerization & deployment" },
        { title: "Linux", icon: SiLinux, category: ["DevOps"], description: "Server administration" },
    ];

    const categories: Category[] = ["All", "Frontend", "Backend", "DevOps", "Data/Tools"];

    const filteredSkills = skills.filter(skill => activeCategory === "All" || skill.category.includes(activeCategory));

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
            <SectionHeading
                title="Skills"
                subtitle="A curated stack of technologies I use to build scalable, high-performance digital products."
            />

            {/* Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                            activeCategory === category
                                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-105"
                                : "bg-card/50 text-muted-foreground border-border hover:bg-card hover:text-foreground hover:border-primary/50"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Skills Grid */}
            <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredSkills.map((skill) => (
                        <SkillCard key={skill.title} skill={skill} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

function SkillCard({ skill }: { skill: Skill }) {
    const Icon = skill.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="group relative h-full"
        >
            <div className="relative h-full p-6 rounded-2xl bg-card/60 hover:bg-card/80 border border-border/50 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm overflow-hidden flex flex-col items-center text-center gap-4 hover:shadow-xl hover:shadow-primary/5 group-hover:-translate-y-1">

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="relative p-3 rounded-xl bg-background/50 border border-border/50 text-muted-foreground group-hover:text-primary group-hover:border-primary/20 transition-colors duration-300 ring-1 ring-transparent group-hover:ring-primary/20 shadow-sm">
                    <Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="space-y-1 relative z-10">
                    <h3 className="font-semibold text-foreground tracking-tight">{skill.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 px-2">
                        {skill.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}