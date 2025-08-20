"use client"

import {useEffect, useState} from "react";
import {motion} from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [isHovering, setIsHovering] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));

        let ticking = false;
        const updateMousePosition = (e: MouseEvent) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setMousePosition({x: e.clientX, y: e.clientY});
                    ticking = false;
                })
                ticking = true;
            }
        }

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        })

        observer.observe(document.documentElement, {attributes: true, attributeFilter: ["class"]});

        window.addEventListener("mousemove", updateMousePosition, {passive: true});

        const interactiveElements = document.querySelectorAll("button, a, [data-magnetic]");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        })

        return () => {
            observer.disconnect();
            window.removeEventListener("mousemove", updateMousePosition);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            })
        }
    }, [])

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-zinc-900 dark:bg-zinc-100 rounded-full pointer-events-none z-50 mix-blend-difference"
                animate={{
                    x: mousePosition.x - 6,
                    y: mousePosition.y - 6,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "tween",
                    ease: "backOut",
                    duration: 0.15,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-zinc-400/30 rounded-full pointer-events-none z-40"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.2 : 1,
                }}
                transition={{
                    type: "tween",
                    ease: "backOut",
                    duration: 0.2,
                }}
            />
        </>
    )
}