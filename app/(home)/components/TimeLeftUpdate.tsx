"use client"

import {useEffect, useState} from "react";

export default function TimeLeftUpdateChip() {
    const targetDate = new Date("2025-08-30T12:00:00");

    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance <= 1) {
                setTimeLeft("Update Released");
                clearInterval(timer);
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft(`${days}d:${hours}h:${minutes}m:${seconds}s`);
            }
        }, 1000);

        return () => clearInterval(timer);

    }, []);

    return (
        <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/40 text-green-400 text-sm font-medium mx-auto">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>Portfolio update in <strong>{timeLeft}</strong></span>
        </div>
    );
}