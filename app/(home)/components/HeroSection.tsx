"use client";

import react, {useState} from 'react';
import Link from "next/link";
import {MovingBorderBtn} from "@/components/ui/moving-border";
import Errormsg from "@/app/(home)/components/Errormsg";
import TimeLeftUpdateChip from "@/app/(home)/components/TimeLeftUpdate";

export default function HeroSection() {
    const [cvLink] = useState('');
    const [error, setError] = useState(false);

    const handleDownload = (e: { preventDefault: () => void; }) => {
        if (!cvLink) {
            e.preventDefault();
            setError(true);
        } else {
            setError(false);
        }
    };

    return (
        <div
            className="min-h-[60vh] flex flex-col-reverse lg:flex-row gap-14 lg:gap-0 items-center justify-between animate-move-up">
            <div className="space-y-10 text-center lg:text-left">
                <TimeLeftUpdateChip/>
                <h1 className="text-4xl lg:text-6xl font-bold">
                    Nice to meet you! 👋 <br/>{" "}
                    <span className="underline underline-offset-8 decoration-green-500">{"I'm COMPLEXDEV"}</span>
                </h1>
                <p className="md:w-96 text-lg text-gray-300">
                    {
                        "Based in 🇮🇹, I'm CS Student studying to become a " +
                        "Full Stack Developer, with passion for developing web application " +
                        "and desktop application that users love "
                    }
                </p>
                <Link href={"mailto:complexdev3@gmail.com"} className="inline-block group">
                    <div>
                        <h1 className="text-3xl font-bold group-hover:text-green-400 transition-all">Connect Me 📭</h1>
                        <div className="w-40 h-2 bg-green-500 rounded-full hover:translate-x-4 transition-all"></div>
                        <div
                            className="w-40 h-2 bg-indigo-500 rounded-full translate-x-2 hover:translate-x-4 transition-all"></div>
                    </div>
                </Link>
            </div>
            <div className="relative">
                <div className="w-72 h-72 space-y-3 -rotate-[30deg] relative">
                    <div className="flex gap-3 translate-x-8">

                        <div className="w-32 h-32 rounded-2xl bg-green-500"></div>

                        <div className="w-32 h-32 rounded-full bg-indigo-500"></div>

                    </div>
                    <div className="flex gap-3 -translate-x-8">

                        <div className="w-32 h-32 rounded-2xl bg-indigo-500"></div>

                        <div className="w-32 h-32 rounded-full bg-green-500"></div>

                    </div>
                    <div className="glow absolute top-[40%] right-1/2 -z-20"></div>
                </div>
                <div className="absolute bottom-5 sm:bottom-14 left-0 sm:-left-10">
                    <MovingBorderBtn borderRadius="0.5rem" className="p-3 font-semibold">
                        <a href={cvLink} onClick={handleDownload}>Download My CV</a>
                    </MovingBorderBtn>
                    {error && <Errormsg/>}
                </div>
            </div>
        </div>
    )
}