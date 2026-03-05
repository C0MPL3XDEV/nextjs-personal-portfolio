import React from 'react';
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
    const experienceData: TimelineEntry[] = [
        {
            title: "Junior Full Stack Developer",
            company: "Wordpower S.r.l.",
            date: "2024 - Present",
            description: "Developing and maintaining Z-Laser, a comprehensive web application for the management, monitoring, and analytics of Zimbra mail infrastructure.",
            points: [
                "Built and maintained resilient REST APIs using Laravel.",
                "Developed a responsive admin UI with Angular and role-based access control.",
                "Integrated Elasticsearch for high-performance searching across domains, mailboxes, and servers.",
                "Orchestrated Docker containers and Kubernetes clusters for scalable deployment.",
                "Implemented Argo Workflows for distributed scraping and load balancing."
            ],
            tech: ["Angular", "Laravel", "MySQL", "Elasticsearch", "Docker", "Kubernetes", "Argo"]
        },
        {
            title: "Software Technologies Student",
            company: "University of Molise (UniMol)",
            date: "2025 - Present",
            description: "Pursuing a degree in Software Technologies (L-31) at the Termoli campus, focusing on advanced software engineering principles and modern application development.",
            points: [
                "Focus on object-oriented programming and software design patterns.",
                "Studying database management systems and web technologies."
            ],
            tech: ["Java", "C", "Algorithms", "Data Structures"]
        },
        {
            title: "Open Source Contributor",
            company: "GitHub / Community",
            date: "2022 - Present",
            description: "Contributing to various open source projects and building personal tools to share with the developer community.",
            points: [
                "Contributing to open source projects on GitHub.",
            ],
            tech: ["GitHub", "Community", "Open Source"]
        },
    ];

    return (
        <div className="flex flex-col gap-10">
            <SectionHeading
                title="Experience"
                subtitle="My professional journey and academic background."
            />
            <Timeline data={experienceData} />
        </div>
    );
}
