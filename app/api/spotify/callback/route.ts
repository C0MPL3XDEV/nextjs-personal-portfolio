import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
        return NextResponse.json({error}, {status: 400});
    }

    if (!code) {
        return NextResponse.json({error: "Missing code parameter"}, {status: 400});
    }

    const client_id = process.env.SPOTIFY_CLIENT_ID!;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri,
        }).toString()
    })

    const json = await res.json();

    return NextResponse.json({
        message: "Salva SPOTIFY_REFRESH_TOKEN nelle env.",
        refresh_token: json.refresh_token,
        scope: json.scope,
    });
}