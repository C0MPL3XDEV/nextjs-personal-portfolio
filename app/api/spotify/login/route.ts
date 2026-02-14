import { NextResponse } from "next/server";

export async function GET() {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

    if (!client_id || !redirect_uri) {
        return NextResponse.json(
            { error: "Missing SPOTIFY_CLIENT_ID or SPOTIFY_REDIRECT_URI in env" },
            { status: 500 }
        );
    }

    const scope = [
        "user-read-currently-playing",
        "user-read-recently-played",
    ].join(" ");

    const params = new URLSearchParams({
        response_type: "code",
        client_id,
        scope,
        redirect_uri,
    });

    return NextResponse.redirect(
        `https://accounts.spotify.com/authorize?${params.toString()}`
    );
}