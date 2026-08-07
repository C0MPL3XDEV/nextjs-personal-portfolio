import React from 'react';
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

export const metadata = {
    title: "Blog",
    description: "Notes on backend architecture, frontend engineering, and the tools I use to build.",
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground">
            <div className="dark:bg-grid-white/[0.05] bg-grid-black/[0.02] relative pb-20">
                <Navbar />

                <div className="max-w-6xl mx-auto px-4 md:px-8 pt-32 md:pt-48 pb-20">
                    <SectionHeading
                        title="Writing"
                        subtitle="Notes on backend architecture, frontend engineering, and everything in between."
                    />

                    {posts.length === 0 ? (
                        <p className="text-center text-muted-foreground">No posts yet — check back soon.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {posts.map((post, idx) => (
                                <Link
                                    href={`/blog/${post.slug}`}
                                    key={post.slug}
                                    className={cn(
                                        "group relative rounded-xl bg-card border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 p-6 flex flex-col gap-4",
                                        idx === 0 && "md:col-span-2"
                                    )}
                                >
                                    <time className="text-xs uppercase tracking-wider text-muted-foreground">
                                        {new Date(post.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </time>
                                    <h3
                                        className={cn(
                                            "font-heading font-bold tracking-tight group-hover:text-primary transition-colors",
                                            idx === 0 ? "text-2xl lg:text-3xl" : "text-xl"
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
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    );
}
