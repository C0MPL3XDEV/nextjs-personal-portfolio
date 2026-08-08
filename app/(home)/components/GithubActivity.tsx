import React from 'react';
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { ArrowRight, Star, Users, FolderGit2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { siteConfig } from "@/lib/site-config";
import { getGithubStats } from "@/lib/github";

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    PHP: "bg-indigo-400",
    Java: "bg-orange-500",
    Python: "bg-emerald-500",
    HTML: "bg-red-500",
    CSS: "bg-pink-500",
    Vue: "bg-green-500",
    Shell: "bg-zinc-400",
};

export default async function GithubActivity() {
    const stats = await getGithubStats();

    if (!stats) {
        return null;
    }

    const maxCount = stats.topLanguages[0]?.count ?? 1;

    return (
        <div className="flex flex-col gap-10">
            <SectionHeading
                title="Open Source Footprint"
                subtitle="A live snapshot of my public GitHub activity."
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 [grid-auto-flow:dense]">
                <Reveal className="col-span-2 rounded-2xl bg-card/60 border border-border/50 p-6 md:p-8 flex flex-col justify-between gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Top Languages</span>
                        <SiGithub className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col gap-3">
                        {stats.topLanguages.map(({ language, count }) => (
                            <div key={language} className="flex items-center gap-3">
                                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${LANGUAGE_COLORS[language] ?? "bg-primary"}`} />
                                <span className="text-sm font-medium w-20 shrink-0 truncate">{language}</span>
                                <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${LANGUAGE_COLORS[language] ?? "bg-primary"}`}
                                        style={{ width: `${(count / maxCount) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-muted-foreground w-6 text-right shrink-0">{count}</span>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.05}>
                    <StatTile icon={Star} label="Total Stars" value={stats.totalStars} />
                </Reveal>
                <Reveal delay={0.1}>
                    <StatTile icon={FolderGit2} label="Public Repos" value={stats.publicRepos} />
                </Reveal>
                <Reveal delay={0.15}>
                    <StatTile icon={Users} label="Followers" value={stats.followers} />
                </Reveal>

                <Reveal delay={0.2}>
                    <Link
                        href={siteConfig.links.github}
                        target="_blank"
                        className="rounded-2xl bg-primary/10 border border-primary/20 p-6 flex flex-col items-center justify-center gap-2 text-center hover:bg-primary/15 transition-colors group h-full"
                    >
                        <SiGithub className="w-6 h-6 text-primary" />
                        <span className="text-sm font-medium text-primary">View full profile</span>
                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Reveal>
            </div>
        </div>
    );
}

function StatTile({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: number;
}) {
    return (
        <div className="rounded-2xl bg-card/60 border border-border/50 p-6 flex flex-col items-center justify-center gap-2 text-center h-full">
            <Icon className="w-5 h-5 text-primary" />
            <AnimatedCounter value={value} className="font-heading text-3xl font-bold tracking-tight" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        </div>
    );
}
