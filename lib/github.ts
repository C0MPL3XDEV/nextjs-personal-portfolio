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
    fork: boolean;
}

export interface GithubStats {
    publicRepos: number;
    followers: number;
    totalStars: number;
    topLanguages: { language: string; count: number }[];
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

export async function getGithubStats(): Promise<GithubStats | null> {
    const username = "C0MPL3XDEV";

    try {
        const [profileRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`, {
                next: { revalidate: 3600 },
                headers: { "Accept": "application/vnd.github.v3+json" },
            }),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
                next: { revalidate: 3600 },
                headers: { "Accept": "application/vnd.github.v3+json" },
            }),
        ]);

        if (!profileRes.ok || !reposRes.ok) {
            console.error("Failed to fetch GitHub stats");
            return null;
        }

        const profile = await profileRes.json();
        const repos: Repo[] = await reposRes.json();

        // Only count original work, not forks, so stars/languages reflect what was actually built.
        const ownRepos = repos.filter((repo) => !repo.fork);
        const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

        const languageCounts = new Map<string, number>();
        for (const repo of ownRepos) {
            if (!repo.language) continue;
            languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
        }

        const topLanguages = Array.from(languageCounts.entries())
            .map(([language, count]) => ({ language, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        return {
            publicRepos: profile.public_repos ?? ownRepos.length,
            followers: profile.followers ?? 0,
            totalStars,
            topLanguages,
        };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return null;
    }
}
