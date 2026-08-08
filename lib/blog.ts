import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const WORDS_PER_MINUTE = 200;

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    readingTime: number;
}

export interface Post extends PostMeta {
    content: string;
}

function calculateReadingTime(content: string): number {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function getAllPosts(): PostMeta[] {
    const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".mdx"));

    const posts = files.map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
        const { data, content } = matter(raw);

        return {
            slug,
            title: data.title as string,
            date: data.date as string,
            excerpt: data.excerpt as string,
            tags: (data.tags ?? []) as string[],
            readingTime: calculateReadingTime(content),
        };
    });

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        tags: (data.tags ?? []) as string[],
        readingTime: calculateReadingTime(content),
        content,
    };
}
