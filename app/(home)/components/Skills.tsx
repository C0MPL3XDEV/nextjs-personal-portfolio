"use client";

import React from 'react';
import Title from "@/app/(home)/components/Title";
import {HoverEffect} from "@/components/ui/card-hover-effect";
import {
    TbBrandMysql,
    TbBrandJavascript,
    TbBrandHtml5,
    TbBrandCss3,
    TbBrandPython,
    TbBrandFirebase,
    TbBrandNextjs,
    TbBrandAngular
} from "react-icons/tb";

import { LiaJava } from "react-icons/lia";
import { SiPhp, SiLinuxprofessionalinstitute, SiTypescript, SiElastic } from "react-icons/si";
import { FaLaravel, FaDocker } from "react-icons/fa";

export default function Skills() {

    const skills = [
        {
            title: "Java",
            Icon: LiaJava,
        },
        {
            title: "PHP",
            Icon: SiPhp,
        },
        {
            title: "Laravel",
            Icon: FaLaravel, 
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
            title: "TypeScript",
            Icon: SiTypescript,
            
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
            title: "Angular",
            Icon: TbBrandAngular,
        },
        {
            title: "Docker",
            Icon: FaDocker,
        },
        {
            title: "Elastic",
            Icon: SiElastic,
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
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-8">
            <Title title={"Skills 🔪"} className="flex flex-col items-center justify-center -rotate-6" />
            <HoverEffect items={skills} ></HoverEffect>
        </div>

    )
}