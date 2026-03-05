"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const SectionHeading = ({
    title,
    subtitle,
    className,
}: {
    title: string;
    subtitle?: string;
    className?: string;
}) => {
    return (
        <div className={cn("text-center mb-10 block", className)}>
            <h2 className="inline-block text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-3 leading-[1.15]">
                {title}
            </h2>
            {subtitle && (
                <p className="text-muted-foreground max-w-2xl text-lg mx-auto mb-[18px] leading-[1.6]">
                    {subtitle}
                </p>
            )}
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto" />
        </div>
    );
};
