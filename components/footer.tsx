
import React from 'react';
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { SiGithub, SiLinkedin, SiInstagram, SiX } from "react-icons/si";
import { cn } from "@/lib/utils";
import { SpotifyWidget } from "@/components/spotify-widget";

export function Footer() {
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
        }
    ];

    return (
        <footer className="relative pt-20 pb-10 px-5">
            <div className="max-w-6xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5">

                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold tracking-tight">{siteConfig.name}</h2>
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                            Crafting scalable, high-performance digital solutions with a focus on user experience and clean architecture.
                        </p>
                        <div className="pt-2">
                            <SpotifyWidget />
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Navigation</h3>
                        <nav className="flex flex-col gap-2">
                            {siteConfig.navItems.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    className="text-sm text-muted-foreground hover:text-indigo-400 transition-colors w-fit leading-7 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded-sm"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Column 3: Socials & CTA */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Connect</h3>
                        <div className="flex gap-4">
                            {socials.map((social, idx) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={idx}
                                        href={social.link}
                                        aria-label={social.label}
                                        target="_blank"
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all hover:scale-110 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                                    >
                                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                                    </Link>
                                );
                            })}
                        </div>
                        <Link
                            href="#contact"
                            className="mt-4 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors w-fit text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ring-offset-2 ring-offset-black"
                        >
                            Contact Me
                        </Link>
                    </div>
                </div>

                {/* Bottom Divider & Copyright */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        Built with <span className="text-foreground font-semibold">Next.js</span> & <span className="text-foreground font-semibold">Tailwind</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
