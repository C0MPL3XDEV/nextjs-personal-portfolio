
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

export function SpotifyWidget() {
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
                    className="group relative flex items-center gap-3 p-3 pr-4 rounded-2xl bg-black/20 hover:bg-black/40 border border-white/5 hover:border-white/10 backdrop-blur-md transition-all duration-300 w-fit cursor-pointer"
                >
                    {/* Album Art */}
                    <div className="relative w-10 h-10 rounded-md overflow-hidden shadow-sm flex-shrink-0">
                        {data.albumImageUrl ? (
                            <NextImage
                                src={data.albumImageUrl}
                                alt={data.album}
                                fill
                                className={cn("object-cover", data.isPlaying && "animate-[spin_10s_linear_infinite]")}
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                <SiSpotify className="w-5 h-5 text-green-500" />
                            </div>
                        )}
                        {/* Center dot for vinyl effect if playing */}
                        {data.isPlaying && <div className="absolute inset-0 m-auto w-2 h-2 bg-black/50 rounded-full backdrop-blur-sm border border-white/20" />}
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-col gap-0.5 min-w-[100px] max-w-[200px]">
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
