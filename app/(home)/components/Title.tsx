import React from 'react';

export default function Title({ title, className }: { title: string, className?: string }) {
    return (
        <div className={className}>
            <h1 className="text-3xl font-bold group-hover:text-green-400 transition-all">{title}</h1>
            <div className="w-40 h-2 bg-green-500 rounded-full hover:translate-x-4 transition-all"></div>
            <div className="w-40 h-2 bg-indigo-500 rounded-full translate-x-2 hover:translate-x-4 transition-all"></div>
        </div>
    )
}