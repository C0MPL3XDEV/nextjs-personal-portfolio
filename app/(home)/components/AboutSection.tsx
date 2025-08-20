"use client"

import {motion} from "framer-motion";
import React from "react";

export default function AboutSection() {
    const experience = [
        {
            company: "WordPower S.R.L",
            role: "Full Stack Web Developer",
            period: "2024 - Present",
            description:
                "Worked on large-scale enterprise applications using Angular, Laravel, Docker, Argo Workflows and Elasticsearch. Built micro-frontend modules, optimized UI performance, integrated REST APIs, and contributed to production-ready dashboards."
        },
        {
            company: "Denso Manufacturing",
            role: "IT Help Desk Intern",
            period: "2022",
            description:
                "Completed a school internship providing IT support to end users. Assisted in troubleshooting hardware and software issues, managing user accounts, and ensuring smooth operation of workstations and office systems. Gained hands-on experience in technical support and enterprise IT environments.",
        },
        {
            company: "Independent Learning & Practice",
            role: "Self-Directed Learner",
            period: "Always",
            description:
                "Built real-world projects to deepen skills in full-stack development using React, Angular, MongoDB, Next.js, and Tailwind CSS. Focused on writing clean, maintainable code and improving user experience.",
        },
    ]

    return (
        <div className="max-w-6xl mx-auto px-8">
            <section id="about" className="py-10 px-6 relative z-10 mb-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <motion.h2
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                className="text-4xl md:text-5xl font-bold mb-8 text-zinc-900 dark:text-zinc-100"
                            >
                                About Me
                            </motion.h2>

                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{delay: 0.2}}
                                className="space-y-6 text-zinc-600 dark:text-zinc-300 leading-relaxed"
                            >
                                <p>
                                    Hi 👋, I&apos;m Carmine - a junior full-stack developer based in 🇮🇹 with passion for
                                    web and mobile development.
                                    I work with modern frameworks
                                    like <strong>Angular</strong> and <strong>Laravel</strong>, and I enjoy building
                                    clean, responsive and scalable applications with a strong focus on user experience
                                    and performance.
                                </p>
                                <p>
                                    On the backend, I use <strong>Laravel</strong> and <strong>PHP</strong> to build
                                    robust REST APIs, implement authentication and role-based access control (Spatie
                                    Permissions), and manage data
                                    with <strong>MySQL</strong> and <strong>Elasticsearch</strong>.
                                    On the frontend, I create dynamic interfaces
                                    using <strong>Angular</strong>, <strong>TypeScript</strong>, and <strong>Tailwind
                                    CSS</strong>.
                                </p>
                                <p>
                                    I’m passionate about <strong>cybersecurity</strong> and continuously improving my
                                    skills in both development and security testing.
                                    My goal is to build applications that are not only functional but also secure,
                                    maintainable, and enjoyable to use.
                                </p>
                            </motion.div>
                        </div>
                        <div>
                            <motion.h3
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                className="text-2xl font-semibold mb-8 text-zinc-900 dark:text-zinc-100"
                            >
                                My Journey
                            </motion.h3>
                            <div className="space-y-8">
                                {experience.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{opacity: 0, y: 30}}
                                        whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true}}
                                        transition={{delay: index * 0.1}}
                                        className="border-l-2 border-green-300 pl-6 relative"
                                    >
                                        <div className="absolute -left-2 top-0 w-4 h-4 bg-green-300 rounded-full"></div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{exp.role}</h4>
                                            <span
                                                className="font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <p className="text-zinc-700 dark:text-zinc-300 mb-2 font-medium">{exp.company}</p>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{exp.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}