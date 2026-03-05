"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const codeLines = [
    { line: '<HeroSection>', color: 'text-[var(--code-blue)]' },
    { line: '  <ProfileData', color: 'text-[var(--code-purple)]', indent: 1 },
    { line: '    role="Full Stack Developer"', color: 'text-[var(--code-green)]', indent: 2 },
    { line: '    stack={["Angular", "React", "Laravel"]}', color: 'text-[var(--code-yellow)]', indent: 2 },
    { line: '  />', color: 'text-[var(--code-purple)]', indent: 1 },
    { line: '  <Terminal>', color: 'text-[var(--code-purple)]', indent: 1 },
    { line: '    npm run dev', color: 'text-[var(--text-terminal)]', indent: 2 },
    { line: '  </Terminal>', color: 'text-[var(--code-purple)]', indent: 1 },
    { line: '</HeroSection>', color: 'text-[var(--code-blue)]' }
];

export default function CodeEditorMock() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div
            style={{ boxShadow: 'var(--panel-glow)' }}
            className="w-full h-full flex flex-col rounded-2xl overflow-hidden bg-[var(--bg-panel)] border border-[var(--border-panel)] backdrop-blur-md relative"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />

            {/* Editor Header */}
            <div className="h-10 w-full flex items-center px-4 border-b border-[var(--border-panel)] bg-foreground/5 relative z-10">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>
                <div className="flex-1 text-center flex justify-center text-xs font-mono text-muted-foreground/80">
                    portfolio.tsx
                </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 p-6 font-mono text-sm sm:text-base overflow-hidden relative z-10 flex flex-col justify-center">
                {codeLines.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="flex items-center group relative z-10"
                    >
                        <span className="w-6 text-right mr-4 text-muted-foreground/40 select-none text-xs hidden sm:inline-block">
                            {index + 1}
                        </span>
                        <div style={{ paddingLeft: `${(item.indent || 0) * 1.5}rem` }} className="flex-1">
                            <span className={item.color}>{item.line}</span>
                        </div>
                    </motion.div>
                ))}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-2 h-5 bg-primary/80 mt-1 ml-10 sm:ml-16 inline-block"
                />
            </div>

            {/* Terminal Panel */}
            <div className="h-24 sm:h-32 border-t border-[var(--border-panel)] bg-[var(--bg-terminal)] p-4 font-mono text-xs sm:text-sm text-[var(--text-terminal)] relative z-10 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>terminal</span>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-1 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 1.2 }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-[var(--code-green)]">➜</span>
                        <span className="text-[var(--code-purple)]">~</span>
                        <span>npm run dev</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.8 }}
                        className="text-[var(--text-terminal)] opacity-70"
                    >
                        ready - started server on 0.0.0.0:3000, url: http://localhost:3000
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
