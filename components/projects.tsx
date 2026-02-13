import React from 'react';
import { getRepos } from "@/lib/github";
import { SectionHeading } from "@/components/ui/section-heading";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SiGithub } from "react-icons/si";

export async function Projects() {
    const projects = await getRepos();

    return (
        <div className="flex flex-col gap-10">
            <SectionHeading
                title="Projects"
                subtitle="Recent open source contributions and personal projects."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => {
                    // Provide a default image or map topics to images if possible. 
                    // Since we can't easily screenshot URLs, we'll use a placeholder or a consistent pattern.
                    // For a premium look, we can use a generated gradient or abstract pattern if no image.
                    const imageUrl = "/project-placeholder.png"; // We might need to handle this.

                    return (
                        <Link href={project.html_url} key={project.id} target="_blank">
                            <div className="relative group rounded-xl bg-card border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
                                <div className="p-5 flex flex-col h-full gap-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold truncate group-hover:text-indigo-400 transition-colors">
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
                                            <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                                {project.language}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            {projects.length === 0 && (
                <div className="text-center text-muted-foreground">
                    <p>Could not fetch projects from GitHub.</p>
                    <Link href="https://github.com/C0MPL3XDEV" className="text-indigo-500 hover:underline">
                        Visit my profile
                    </Link>
                </div>
            )}
        </div>
    );
}
