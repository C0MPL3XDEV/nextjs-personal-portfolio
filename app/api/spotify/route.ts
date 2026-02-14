import { NextResponse } from "next/server";
import { getNowPlaying, getRecentlyPlayed } from "@/lib/spotify"; // adatta path

export const revalidate = 30;

function mapTrack(track: any) {
    return {
        title: track?.name ?? "",
        artist: track?.artists?.map((a: any) => a.name).join(", ") ?? "",
        album: track?.album?.name ?? "",
        albumImageUrl: track?.album?.images?.[0]?.url ?? "",
        songUrl: track?.external_urls?.spotify ?? "",
    };
}

export async function GET() {
    try {
        const nowRes = await getNowPlaying();

        if (nowRes.status === 204 || nowRes.status > 400) {
            // 2) fallback: Recently Played
            const recentRes = await getRecentlyPlayed();
            if (!recentRes.ok) {
                return NextResponse.json(null, { status: 200 });
            }

            const recent = await recentRes.json();
            const item = recent?.items?.[0];
            const track = item?.track;

            if (!track) return NextResponse.json(null, { status: 200 });

            return NextResponse.json({
                isPlaying: false,
                lastPlayed: true,
                ...mapTrack(track),
            });
        }

        if (!nowRes.ok) {
            return NextResponse.json(null, { status: 200 });
        }

        const now = await nowRes.json();
        const track = now?.item;

        if (!track) return NextResponse.json(null, { status: 200 });

        return NextResponse.json({
            isPlaying: Boolean(now?.is_playing),
            lastPlayed: false,
            ...mapTrack(track),
        });
    } catch (e) {
        return NextResponse.json(null, { status: 200 });
    }
}