"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface CommandItem {
    label: string;
    hint: string;
    href: string;
}

export function CommandPalette({ posts }: { posts: { title: string; slug: string }[] }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    const items: CommandItem[] = useMemo(() => {
        const navItems = siteConfig.navItems.map((item) => ({
            label: item.label,
            href: item.href,
            hint: "Section",
        }));
        const postItems = posts.map((post) => ({
            label: post.title,
            href: `/blog/${post.slug}`,
            hint: "Blog post",
        }));
        return [...navItems, ...postItems];
    }, [posts]);

    const filtered = useMemo(() => {
        if (!query) return items;
        return items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
    }, [items, query]);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
        }
        function onOpenEvent() {
            setOpen(true);
        }

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("open-command-palette", onOpenEvent);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("open-command-palette", onOpenEvent);
        };
    }, []);

    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    useEffect(() => {
        if (!open) {
            setQuery("");
        }
    }, [open]);

    function navigate(href: string) {
        setOpen(false);
        router.push(href);
    }

    if (!open) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
        >
            <div
                className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 px-4 border-b border-border/50">
                    <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                                e.preventDefault();
                                setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
                            } else if (e.key === "ArrowUp") {
                                e.preventDefault();
                                setActiveIndex((i) => Math.max(i - 1, 0));
                            } else if (e.key === "Enter" && filtered[activeIndex]) {
                                navigate(filtered[activeIndex].href);
                            }
                        }}
                        placeholder="Jump to a section or post..."
                        aria-label="Search sections and posts"
                        className="w-full h-14 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                    <kbd className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">
                        Esc
                    </kbd>
                </div>

                <ul className="max-h-80 overflow-y-auto py-2">
                    {filtered.length === 0 && (
                        <li className="px-4 py-6 text-center text-sm text-muted-foreground">No results found.</li>
                    )}
                    {filtered.map((item, idx) => (
                        <li key={item.href + item.label}>
                            <button
                                onClick={() => navigate(item.href)}
                                onMouseEnter={() => setActiveIndex(idx)}
                                className={cn(
                                    "w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                                    idx === activeIndex ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary/60"
                                )}
                            >
                                <span className="truncate">{item.label}</span>
                                <span className="text-xs text-muted-foreground shrink-0">{item.hint}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
