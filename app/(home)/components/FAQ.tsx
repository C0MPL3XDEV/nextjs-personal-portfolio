import React from 'react';
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_ITEMS = [
    {
        question: "Are you available for freelance or full-time work?",
        answer: "Yes — I'm open to freelance projects and full-time opportunities that align with backend architecture, full-stack web development, or DevOps-adjacent work. Reach out via the contact form below.",
    },
    {
        question: "What kind of projects do you build?",
        answer: "Mostly full-stack web applications — REST APIs in Laravel, admin interfaces in Angular or React, and the infrastructure around them (Docker, Kubernetes). I also maintain a few smaller open-source tools on the side.",
    },
    {
        question: "What's your usual engagement style?",
        answer: "Clear scope up front, async communication, and shipping in small, reviewable increments rather than long silent stretches followed by one big reveal.",
    },
    {
        question: "Do you take on cybersecurity-focused work?",
        answer: "I have a strong interest in it and apply secure-by-default practices in everything I build, though my primary focus is full-stack development rather than dedicated security consulting.",
    },
];

export default function FAQ() {
    return (
        <div className="flex flex-col gap-10">
            <SectionHeading
                title="FAQ"
                subtitle="Answers to the questions I get asked most often."
            />

            <Reveal>
                <div className="max-w-2xl mx-auto w-full rounded-2xl bg-card/60 border border-border/50 px-6">
                    <Accordion type="single" collapsible>
                        {FAQ_ITEMS.map((item, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </Reveal>
        </div>
    );
}
