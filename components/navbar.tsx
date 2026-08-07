"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { SiGithub, SiLinkedin, SiInstagram, SiX } from "react-icons/si";
import { Menu, Search, X } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";

export function Navbar({ className }: { className?: string }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/") return;

        const sections = Array.from(document.querySelectorAll("section[id]"));
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [pathname]);

    function isActive(href: string) {
        if (href === "/blog") return pathname.startsWith("/blog");
        if (href === "/") return pathname === "/" && activeSection === "home";

        const hash = href.split("#")[1];
        return pathname === "/" && activeSection === hash;
    }

    const socials = [
        {
            link: siteConfig.links.github,
            label: "GitHub",
            icon: SiGithub,
        },
        {
            link: siteConfig.links.linkedin,
            label: "LinkedIn",
            icon: SiLinkedin,
        },
        {
            link: siteConfig.links.instagram,
            label: "Instagram",
            icon: SiInstagram,
        },
        {
            link: siteConfig.links.x,
            label: "X",
            icon: SiX,
        },
    ];

    return (
        <nav
            className={cn(
                "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] max-w-[1100px] rounded-full border border-border bg-background/80 backdrop-blur-xl shadow-lg flex items-center justify-between px-5 h-16",
                className
            )}
        >
            <div className="flex items-center gap-2">
                <Link
                    href="/"
                    className="font-heading font-bold text-xl flex items-center gap-2"
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    <span className="text-primary">{siteConfig.name}</span>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
                {siteConfig.navItems.map((item, idx) => (
                    <Link
                        key={idx}
                        href={item.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:underline underline-offset-4 decoration-primary",
                            isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
                    aria-label="Open command palette"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs text-muted-foreground border border-border hover:border-primary/50 hover:text-primary transition-colors"
                >
                    <Search className="w-3.5 h-3.5" />
                    <kbd className="font-sans">⌘K</kbd>
                </button>

                {socials.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                        <Link
                            key={idx}
                            href={social.link}
                            aria-label={social.label}
                            target="_blank"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Icon className="w-5 h-5" />
                        </Link>
                    );
                })}
                <ModeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden p-2 text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-background/95 backdrop-blur-md border rounded-2xl border-border p-5 flex flex-col gap-5 md:hidden shadow-2xl">
                    {siteConfig.navItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className={cn(
                                "text-lg font-medium",
                                isActive(item.href) ? "text-primary" : "text-foreground hover:text-primary"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="flex gap-4 pt-4 border-t border-border items-center justify-between">
                        <div className="flex gap-4">
                            {socials.map((social, idx) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={idx}
                                        href={social.link}
                                        aria-label={social.label}
                                        target="_blank"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </Link>
                                );
                            })}
                        </div>
                        <ModeToggle />
                    </div>
                </div>
            )}
        </nav>
    );
}
