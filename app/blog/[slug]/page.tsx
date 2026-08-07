import React from 'react';
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/ui/reveal";
import { CodeBlock } from "@/components/mdx/code-block";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

const mdxComponents = {
    pre: CodeBlock,
};

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {};
    }

    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground">
            <div className="dark:bg-grid-white/[0.05] bg-grid-black/[0.02] relative pb-20">
                <Navbar />

                <article className="max-w-3xl mx-auto px-4 md:px-8 pt-32 md:pt-48 pb-20">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Writing
                    </Link>

                    <Reveal>
                        <header className="mb-10 space-y-4">
                            <time className="text-xs uppercase tracking-wider text-muted-foreground">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                                {" · "}{post.readingTime} min read
                            </time>
                            <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </header>
                    </Reveal>

                    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary prose-code:text-primary">
                        <MDXRemote source={post.content} components={mdxComponents} />
                    </div>
                </article>

                <Footer />
            </div>
        </div>
    );
}
