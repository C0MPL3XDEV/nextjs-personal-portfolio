import React from 'react';
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogList } from "@/app/blog/components/BlogList";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

const description = "Notes on backend architecture, frontend engineering, and the tools I use to build.";

export const metadata: Metadata = {
    title: "Blog",
    description,
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        type: "website",
        title: `Blog | ${siteConfig.name}`,
        description,
        url: "/blog",
    },
    twitter: {
        card: "summary_large_image",
        title: `Blog | ${siteConfig.name}`,
        description,
    },
};

export default function BlogPage() {
    const posts = getAllPosts();

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: `${siteConfig.name} — Writing`,
        url: `${siteConfig.url}blog`,
        blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: `${siteConfig.url}blog/${post.slug}`,
            datePublished: post.date,
        })),
    };

    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground">
            <JsonLd data={blogSchema} />

            <div className="dark:bg-grid-white/[0.05] bg-grid-black/[0.02] relative pb-20">
                <Navbar />

                <div className="max-w-6xl mx-auto px-4 md:px-8 pt-32 md:pt-48 pb-20">
                    <SectionHeading
                        as="h1"
                        title="Writing"
                        subtitle="Notes on backend architecture, frontend engineering, and everything in between."
                    />

                    {posts.length === 0 ? (
                        <p className="text-center text-muted-foreground">No posts yet — check back soon.</p>
                    ) : (
                        <BlogList posts={posts} />
                    )}
                </div>

                <Footer />
            </div>
        </div>
    );
}
