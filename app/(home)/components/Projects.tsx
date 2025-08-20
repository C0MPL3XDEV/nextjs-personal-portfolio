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

export default function Projects() {
    const projects = [
        {
            title: 'Next.JS Personal Portfolio',
            tech: [SiNextdotjs, SiTailwindcss, SiReact, SiShadcnui],
            link: 'https://github.com/C0MPL3XDEV/nextjs-personal-portfolio',
            cover: "/portfolio-img.png",
        },
        {
            title: 'PHP Auth System and Social Network',
            tech: [SiPhp, SiMysql, SiBootstrap, SiHtml5, SiCss3],
            link: "https://github.com/C0MPL3XDEV/PHP-AuthSystem",
            cover: "/php-social-img.png",
        },
        {
            title: "Java CLI Chat TCP/UDP",
            tech: [RiJavaLine],
            link: "https://github.com/C0MPL3XDEV/Java-Chat-UDP",
            cover: "/img.png",
        },
        {
            title: "E4GL3OS1NT",
            tech: [SiPython],
            link: "https://github.com/C0MPL3XDEV/E4GL3OS1NT",
            cover: "/eagle-osint-image.png",
        }
    ]

    return <div className="py-10 p-5 sm:p-0">
        <Title title={"Projects 🎨" } className="flex flex-col items-center justify-center rotate-6" />
    </div>

}