import {NextResponse} from "next/server";

export async function GET() {
    const res = await fetch("https://api.github.com/repos/C0MPL3XDEV/nextjs-personal-portfolio/merges", {
        method: "POST",
        headers: {
            "Authorization": `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github+json',
        },
        body: JSON.stringify({
            base: "main",
            head: "update/restyle"
        })
    });

    if (!res.ok) {
        const error = await res.json();
        return NextResponse.json({error});
    }

    return NextResponse.json({success: true});
}