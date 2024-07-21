"use client"

import React from 'react';
import {SiGithub, SiInstagram, SiLinkedin, SiX} from "react-icons/si";
import Link from "next/link";
import {cn} from "@/lib/utils";

export default function Navbar({className}: {className?: string}) {
    const socialMedias = [
        {
            link: 'https://github.com/C0MPL3XDEV/',
            label: "GitHub",
            icon: SiGithub,
        },
        {
            link: 'https://linkedin.com/in/carmine-giuseppe-chessa/',
            label: "LinkedIn",
            icon: SiLinkedin,
        },
        {
            link: 'https://instagram.com/carmine.developer/',
            label: "Instagram",
            icon: SiInstagram,
        },
        {
            link: 'https://x.com/COMPLEXDEV2/',
            label: "X",
            icon: SiX,
        }
    ]


    return (
      <nav className={cn("py-5 flex justify-between items-center animate-move-down", className)}>
          <h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-2">COMPLEXDEV 🧑🏻‍💻</h1>
          <div className="flex items-center gap-5">
              {/* map() -> JS Function used to iterate over all objects in an array
                           and returns a new array with the results of the function being passed
              */}
              {socialMedias.map((social, i)=> {
                  const Icon = social.icon // Get Icon property of current item

                  {/* For each current element it generates a Link tag with the properties */}
                  return <Link href={social.link} key={i} aria-label={social.label}>
                      <Icon className="w-5 h-5 hover:scale-125 transition-all" />
                  </Link>
              })}
          </div>
      </nav>
    );
}