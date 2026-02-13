import { siteConfig } from "@/lib/site-config";

export interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string; // link
    homepage: string | null; // live demo
    topics: string[];
    stargazers_count: number;
    language: string;
}

export async function getRepos(): Promise<Repo[]> {
    // Extract username from github link in siteConfig or hardcode
    // siteConfig.links.github is "https://github.com/C0MPL3XDEV/"
    const username = "C0MPL3XDEV";

    try {
        const res = await fetch(
            `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=6`,
            {
                next: { revalidate: 3600 }, // Revalidate every hour
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                    // Add token if rate limited: "Authorization": `token ${process.env.GITHUB_TOKEN}`
                }
            }
        );

        if (!res.ok) {
            console.error("Failed to fetch repos", res.statusText);
            return [];
        }

        const repos: Repo[] = await res.json();

        // Optional: Filter by topic if needed, e.g. repos.filter(r => r.topics.includes('portfolio'))
        // For now return top 6 sorted by pushed
        return repos;

    } catch (error) {
        console.error("Error fetching repos:", error);
        return [];
    }
}
