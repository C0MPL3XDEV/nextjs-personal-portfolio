"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

function extractText(node: React.ReactNode): string {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (React.isValidElement(node)) return extractText(node.props.children);
    return "";
}

export function CodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        const text = extractText(props.children);
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }

    return (
        <div className="relative group">
            <pre {...props} />
            <button
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy code"}
                className="absolute top-3 right-3 p-1.5 rounded-md bg-secondary/80 text-muted-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:text-primary transition-all"
            >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
        </div>
    );
}
