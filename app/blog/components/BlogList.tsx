"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";

const POSTS_PER_PAGE = 6;

export function BlogList({ posts }: { posts: PostMeta[] }) {
    const [activeTag, setActiveTag] = useState<string>("All");
    const [page, setPage] = useState(1);

    const tags = useMemo(() => {
        const set = new Set<string>();
        posts.forEach((post) => post.tags.forEach((tag) => set.add(tag)));
        return ["All", ...Array.from(set).sort()];
    }, [posts]);

    const filtered = useMemo(
        () => (activeTag === "All" ? posts : posts.filter((post) => post.tags.includes(activeTag))),
        [posts, activeTag]
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
    const currentPage = Math.min(page, totalPages);
    const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

    function selectTag(tag: string) {
        setActiveTag(tag);
        setPage(1);
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {tags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => selectTag(tag)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                            activeTag === tag
                                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-105"
                                : "bg-card/50 text-muted-foreground border-border hover:bg-card hover:text-foreground hover:border-primary/50"
                        )}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {paginated.length === 0 ? (
                <p className="text-center text-muted-foreground">No posts match this tag yet.</p>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {paginated.map((post, idx) => (
                            <motion.div
                                key={post.slug}
                                layout
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.3, delay: idx * 0.04 }}
                                className={cn(currentPage === 1 && idx === 0 && "md:col-span-2")}
                            >
                                <SpotlightCard
                                    href={`/blog/${post.slug}`}
                                    className="rounded-xl bg-card border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 p-6 flex flex-col gap-4 h-full"
                                >
                                    <time className="text-xs uppercase tracking-wider text-muted-foreground">
                                        {new Date(post.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                        {" · "}{post.readingTime} min read
                                    </time>
                                    <h3
                                        className={cn(
                                            "font-heading font-bold tracking-tight group-hover:text-primary transition-colors",
                                            currentPage === 1 && idx === 0 ? "text-2xl lg:text-3xl" : "text-xl"
                                        )}
                                    >
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        aria-label="Previous page"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <button
                            key={n}
                            onClick={() => setPage(n)}
                            className={cn(
                                "w-9 h-9 rounded-full text-sm font-medium transition-colors",
                                n === currentPage
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                            )}
                            aria-current={n === currentPage ? "page" : undefined}
                        >
                            {n}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        aria-label="Next page"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
