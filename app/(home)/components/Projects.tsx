import React from 'react';
import {
    SiNextdotjs,
    SiTailwindcss,
    SiReact,
    SiShadcnui,
    SiPhp,
    SiMysql,
    SiBootstrap,
    SiHtml5,
    SiCss3,
    SiPython
} from "react-icons/si";

import { RiJavaLine } from "react-icons/ri";
import Title from "@/app/(home)/components/Title";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {DirectionAwareHover} from "@/components/ui/direction-aware-hover";
import {Icon} from "lucide-react";

export default function Projects() {
    const projects = [
        {
            title: 'Next.JS Personal Portfolio',
            tech: [SiNextdotjs, SiTailwindcss, SiReact, SiShadcnui],
            link: 'https://github.com/C0MPL3XDEV/nextjs-personal-portfolio',
            cover: "/portfolio-img.png",
            background: "bg-blue-500",
        },
        {
            title: 'PHP Auth System and Social Network',
            tech: [SiPhp, SiMysql, SiBootstrap, SiHtml5, SiCss3],
            link: "https://github.com/C0MPL3XDEV/PHP-AuthSystem",
            cover: "/php-social-img.png",
            background: "bg-green-500",
        },
        {
            title: "Java CLI Chat TCP/UDP",
            tech: [RiJavaLine],
            link: "https://github.com/C0MPL3XDEV/Java-Chat-UDP",
            cover: "/img.png",
            background: "bg-violet-500",
        },
        {
            title: "E4GL3OS1NT",
            tech: [SiPython],
            link: "https://github.com/C0MPL3XDEV/E4GL3OS1NT",
            cover: "/eagle-osint-image.png",
            background: "bg-red-500",
        }
    ]

    return <div className="py-10 p-5 sm:p-0">
        <Title title={"Projects 🎨" } className="flex flex-col items-center justify-center rotate-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 pt-20 gap-5">

            {projects.map((item, idx) => {
                return <Link href={item.link} key={idx}>
                    <div className={cn("p-0 rounded-md sm:p-3", item.background)}>

                        <DirectionAwareHover imageUrl={item.cover} className="w-full space-y-5 cursor-pointer">

                            <div className="space-y-5">
                                <h1 className="text-2xl font-bold">{item.title}</h1>
                                <div className="flex items-center gap-5">
                                    {item.tech.map((TechIcon, idx2) => {
                                        return <TechIcon key={idx2} size={24} className="w-8 h-8"/>
                                    })}
                                </div>
                            </div>
                        </DirectionAwareHover>
                    </div>
                </Link>;
            })}

        </div>
    </div>

}