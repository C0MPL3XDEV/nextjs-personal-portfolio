import React from 'react';
import { getRepos } from "@/lib/github";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SiGithub } from "react-icons/si";

export async function Projects() {
    const projects = await getRepos();
    const [featured, ...rest] = projects;

    return (
        <div className="flex flex-col gap-10">
            <SectionHeading
                title="Projects"
                subtitle="Recent open source contributions and personal projects."
            />

            {featured && (
                <Reveal className="group relative rounded-2xl bg-card border border-primary/30 overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                    <div className="p-6 md:p-10 flex flex-col gap-6">
                        <span className="w-fit text-xs font-semibold uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                            Latest Project
                        </span>

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                            <h3 className="font-heading text-2xl lg:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors">
                                {featured.name}
                            </h3>
                            <SiGithub className="w-7 h-7 text-muted-foreground shrink-0 hidden md:block" />
                        </div>

                        <p className="text-muted-foreground text-base leading-relaxed max-w-3xl">
                            {featured.description || "No description available."}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {featured.topics.slice(0, 6).map((topic) => (
                                <span key={topic} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                                    {topic}
                                </span>
                            ))}
                            {featured.language && (
                                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {featured.language}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                href={featured.html_url}
                                target="_blank"
                                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                            >
                                <SiGithub className="w-4 h-4" /> View code
                            </Link>
                            {featured.homepage && (
                                <Link
                                    href={featured.homepage}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                >
                                    Live demo
                                </Link>
                            )}
                        </div>
                    </div>
                </Reveal>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((project, idx) => (
                    <Reveal key={project.id} delay={idx * 0.05}>
                        <SpotlightCard
                            href={project.html_url}
                            target="_blank"
                            className="rounded-xl bg-card border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 h-full"
                        >
                            <div className="p-5 flex flex-col h-full gap-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-heading text-xl font-bold truncate group-hover:text-primary transition-colors">
                                        {project.name}
                                    </h3>
                                    <SiGithub className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </div>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                    {project.description || "No description available."}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.topics.slice(0, 3).map((topic) => (
                                        <span key={topic} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                                            {topic}
                                        </span>
                                    ))}
                                    {project.language && (
                                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                            {project.language}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </SpotlightCard>
                    </Reveal>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center text-muted-foreground">
                    <p>Could not fetch projects from GitHub.</p>
                    <Link href="https://github.com/C0MPL3XDEV" className="text-primary hover:underline">
                        Visit my profile
                    </Link>
                </div>
            )}
        </div>
    );
}