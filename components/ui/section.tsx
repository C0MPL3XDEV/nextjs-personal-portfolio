import React from 'react';
import { cn } from "@/lib/utils";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const Section = ({ children, className, id }: SectionProps) => {
    return (
        <section id={id} className={cn("max-w-7xl mx-auto px-5 py-10 md:py-20", className)}>
            {children}
        </section>
    );
};
