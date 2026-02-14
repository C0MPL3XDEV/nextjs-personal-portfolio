"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { SiGithub, SiLinkedin, SiInstagram, SiX } from "react-icons/si";
import { Menu, X } from "lucide-react";

export function Navbar({ className }: { className?: string }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] max-w-[1100px] rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg flex items-center justify-between px-5 h-16",
                className
            )}
        >
            <div className="flex items-center gap-2">
                <Link
                    href="/"
                    className="font-bold text-xl flex items-center gap-2"
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
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4 decoration-indigo-500"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
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
                            className="text-lg font-medium text-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="flex gap-4 pt-4 border-t border-border">
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
                </div>
            )}
        </nav>
    );
}
