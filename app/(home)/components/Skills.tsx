"use client";

import React from 'react';
import Title from "@/app/(home)/components/Title";
import {HoverEffect} from "@/components/ui/card-hover-effect";
import { TbBrandCpp, TbBrandMysql, TbBrandJavascript, TbBrandHtml5, TbBrandCss3, TbBrandPython, TbBrandFirebase, TbBrandNextjs } from "react-icons/tb";
import { LiaJava } from "react-icons/lia";
import { SiPhp, SiLinuxprofessionalinstitute } from "react-icons/si";
import { FaVuejs } from "react-icons/fa";

export default function Skills() {

    const skills = [
        {
            title: "C++",
            Icon: TbBrandCpp
        },
        {
            title: "Java",
            Icon: LiaJava,
        },
        {
            title: "PHP",
            Icon: SiPhp,
        },
        {
            title: "MySQL",
            Icon: TbBrandMysql
        },
        {
            title: "Javascript",
            Icon: TbBrandJavascript,
        },
        {
            title: "HTML5",
            Icon: TbBrandHtml5,
        },
        {
            title: "CSS3",
            Icon: TbBrandCss3,
        },
        {
            title: "Python",
            Icon: TbBrandPython,
        },
        {
            title: "Firebase",
            Icon: TbBrandFirebase,
        },
        {
            title: "Next.js",
            Icon: TbBrandNextjs,
        },
        {
            title: "Linux",
            Icon: SiLinuxprofessionalinstitute,
        },
        {
            title: "Vue.js",
            Icon: FaVuejs,
        }
    ];

    return (
        <div className="max-w-5xl mx-auto px-8">
            <Title title={"Skills 🔪"} className="flex flex-col items-center justify-center -rotate-6" />
            <HoverEffect items={skills} ></HoverEffect>
        </div>

    )
}