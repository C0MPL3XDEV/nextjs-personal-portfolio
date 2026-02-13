import React from 'react';
import { Timeline } from "@/components/ui/timeline";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
    const experienceData = [
        {
            title: "Full Stack Developer",
            company: "Freelance",
            date: "2024 - Present",
            description: "Developing modern web applications using Next.js, React, and TailwindCSS. Building custom solutions for clients defined by performance and aesthetics."
        },
        {
            title: "Computer Science Student",
            company: "University",
            date: "2023 - Present",
            description: "Studying fundamental computer science concepts, algorithms, and software engineering principles."
        },
        {
            title: "Open Source Contributor",
            company: "GitHub / Community",
            date: "2022 - Present",
            description: "Contributing to various open source projects and building personal tools to share with the developer community."
        }
    ];

    return (
        <div className="flex flex-col gap-10">
            <SectionHeading
                title="Experience"
                subtitle="My professional journey and education."
            />
            <Timeline data={experienceData} />
        </div>
    );
}
