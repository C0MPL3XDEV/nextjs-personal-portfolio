
import React from 'react'
import { Navbar } from "@/components/navbar";
import HeroSection from "@/app/(home)/components/HeroSection";
import Skills from "@/app/(home)/components/Skills";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import GithubActivity from "@/app/(home)/components/GithubActivity";
import LatestWriting from "@/app/(home)/components/LatestWriting";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { Section } from '@/components/ui/section';

export default function page() {
    return <div className="min-h-screen bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground">
        <div className="dark:bg-grid-white/[0.05] bg-grid-black/[0.02] relative pb-20">

            <Navbar />

            <Section id="home" className="pt-32 md:pt-48">
                <HeroSection />
            </Section>

            <Section id="skills">
                <Skills />
            </Section>

            <Section id="experience">
                <Experience />
            </Section>

            <Section id="projects" className="pb-32">
                <Projects />
            </Section>

            <Section id="github" className="pb-32">
                <GithubActivity />
            </Section>

            <Section id="blog" className="pb-32">
                <LatestWriting />
            </Section>

            <Section id="contact" className="pt-10 pb-20">
                <SectionHeading
                    title="Contact"
                    subtitle="Have a project in mind? Let’s build something awesome together."
                />
                <ContactForm />
            </Section>

            <Footer />
        </div>
    </div>
}
