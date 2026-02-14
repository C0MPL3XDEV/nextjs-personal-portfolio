
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { SiSpotify } from "react-icons/si";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SpotifyData {
    isPlaying: boolean;
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
    lastPlayed?: boolean;
}

export function SpotifyWidget({ compact = false }: { compact?: boolean }) {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpotify = async () => {
            try {
                const res = await fetch('/api/spotify');
                const json = await res.json();
                if (json) {
                    setData(json);
                }
            } catch (error) {
                console.error("Error fetching spotify data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpotify();
        const interval = setInterval(fetchSpotify, 30000); // Poll every 30s

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/20 border border-white/5 w-fit backdrop-blur-md animate-pulse">
                <div className="w-10 h-10 rounded-md bg-white/10" />
                <div className="space-y-2">
                    <div className="w-24 h-3 rounded-full bg-white/10" />
                    <div className="w-16 h-2 rounded-full bg-white/10" />
                </div>
            </div>
        );
    }

    if (!data || (!data.isPlaying && !data.lastPlayed && !data.title)) {
        return null; // Don't show anything if no data
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
            >
                <Link
                    href={data.songUrl || "#"}
                    target="_blank"
                    className={cn(
                        "group relative flex items-center gap-3 p-3 pr-4 rounded-2xl bg-black/20 hover:bg-black/40 border border-white/5 hover:border-white/10 backdrop-blur-md transition-all duration-300 cursor-pointer",
                        compact ? "w-fit max-w-[320px]" : "w-full sm:w-fit"
                    )}
                >
                    {/* Album Art (vinyl) */}
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm flex-shrink-0">
                        {data.albumImageUrl ? (
                            <>
                                {/* Rotating disc */}
                                <div className={cn("absolute inset-0", data.isPlaying && "animate-[spin_6s_linear_infinite]")}>
                                    <NextImage
                                        src={data.albumImageUrl}
                                        alt={data.album}
                                        fill
                                        sizes="40px"
                                        className="object-cover rounded-full"
                                        unoptimized
                                    />
                                </div>

                                {/* Vinyl grooves overlay */}
                                <div className="pointer-events-none absolute inset-0 rounded-full
                                    bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0px,rgba(255,255,255,0.10)_2px,transparent_3px),
                                        radial-gradient(circle_at_center,transparent_0px,transparent_9px,rgba(255,255,255,0.10)_10px,transparent_11px),
                                        radial-gradient(circle_at_center,transparent_0px,transparent_14px,rgba(255,255,255,0.08)_15px,transparent_16px),
                                        radial-gradient(circle_at_center,transparent_0px,transparent_18px,rgba(255,255,255,0.06)_19px,transparent_20px)]
                                    opacity-70"
                                />

                                {/* Outer subtle ring */}
                                <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/15" />

                                {/* Center label + hole */}
                                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                                    <div className="w-3.5 h-3.5 rounded-full bg-black/55 backdrop-blur-sm ring-1 ring-white/20" />
                                    <div className="absolute w-1 h-1 rounded-full bg-black/80" />
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center rounded-full">
                                <SiSpotify className="w-5 h-5 text-green-500" />
                            </div>
                        )}
                    </div>

                    {/* Metadata */}
                    <div className={cn(
                        "flex flex-col gap-0.5 min-w-0",
                        compact ? "max-w-[200px]" : "max-w-full sm:max-w-[220px]"
                    )}>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                {data.isPlaying ? (
                                    <>
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Now Playing
                                    </>
                                ) : (
                                    <>
                                        <SiSpotify className="w-3 h-3 text-[#1DB954]" />
                                        Last Played
                                    </>
                                )}
                            </span>
                        </div>
                        <p className="text-xs font-semibold text-foreground truncate group-hover:text-green-400 transition-colors">
                            {data.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                            {data.artist}
                        </p>
                    </div>

                    {/* Subtle External Icon on Hover */}
                    <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Optional: could place an icon here, but keeping it clean */}
                    </div>
                </Link>
            </motion.div>
        </AnimatePresence>
    );
}
