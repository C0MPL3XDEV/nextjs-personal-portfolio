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
        <div className={cn("flex flex-col items-center justify-center text-center space-y-4 mb-10", className)}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                {title}
            </h2>
            {subtitle && (
                <p className="text-muted-foreground max-w-2xl text-lg">
                    {subtitle}
                </p>
            )}
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
        </div>
    );
};
