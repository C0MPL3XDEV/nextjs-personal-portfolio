import React from 'react';
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { getAllPosts } from "@/lib/blog";

export default function LatestWriting() {
    const posts = getAllPosts().slice(0, 3);

    if (posts.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-10">
            <SectionHeading
                title="Latest Writing"
                subtitle="Thoughts on backend architecture, frontend engineering, and the tools I use to build."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post, idx) => (
                    <Reveal key={post.slug} delay={idx * 0.05}>
                        <SpotlightCard
                            href={`/blog/${post.slug}`}
                            className="rounded-xl bg-card border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 p-6 flex flex-col gap-3 h-full"
                        >
                            <time className="text-xs uppercase tracking-wider text-muted-foreground">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                                {" · "}{post.readingTime} min read
                            </time>
                            <h3 className="font-heading text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                                {post.excerpt}
                            </p>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                                Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </SpotlightCard>
                    </Reveal>
                ))}
            </div>

            <div className="text-center">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                    View all posts <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
