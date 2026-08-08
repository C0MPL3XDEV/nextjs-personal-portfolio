import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${siteConfig.url}blog/${post.slug}`,
        lastModified: post.date,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [
        {
            url: siteConfig.url,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${siteConfig.url}blog`,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        ...postEntries,
    ];
}
