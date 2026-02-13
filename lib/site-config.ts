export const siteConfig = {
    name: "C0MPL3XDEV",
    title: "Full Stack Developer",
    description: "Software Technologies student and Junior Full Stack Developer with 2 years of experience. Passionate about web development, cybersecurity, and software architecture.",
    email: "complexdev3@gmail.com",
    links: {
        github: "https://github.com/C0MPL3XDEV/",
        linkedin: "https://www.linkedin.com/in/carmine-giuseppe-chessa-018750261/",
        instagram: "https://instagram.com/carmine.developer/",
        x: "https://x.com/COMPLEXDEV2/",
    },
    contact: {
        formspreeEndpoint: "https://formspree.io/f/mnjbqbwp",
    },
    navItems: [
        { label: "Home", href: "/" },
        { label: "Skills", href: "#skills" },
        { label: "Experience", href: "#experience" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
    ]
}

export type SiteConfig = typeof siteConfig;
