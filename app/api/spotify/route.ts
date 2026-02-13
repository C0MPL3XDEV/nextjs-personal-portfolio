
import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const response = await getNowPlaying();

        if (response.status === 204 || response.status > 400) {
            // Not playing or error, fall back to recently played
            const recentResponse = await getRecentlyPlayed();
            const recentData = await recentResponse.json();

            if (!recentData || !recentData.items || recentData.items.length === 0) {
                return NextResponse.json({ isPlaying: false });
            }

            const track = recentData.items[0].track;
            const title = track.name;
            const artist = track.artists.map((_artist: any) => _artist.name).join(', ');
            const album = track.album.name;
            const albumImageUrl = track.album.images[0].url;
            const songUrl = track.external_urls.spotify;

            return NextResponse.json({
                isPlaying: false,
                title,
                artist,
                album,
                albumImageUrl,
                songUrl,
                lastPlayed: true // Marker for UI
            });
        }

        const song = await response.json();

        if (song.item === null) {
            return NextResponse.json({ isPlaying: false });
        }

        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images[0].url;
        const songUrl = song.item.external_urls.spotify;

        return NextResponse.json({
            isPlaying,
            title,
            artist,
            album,
            albumImageUrl,
            songUrl,
        });
    } catch (error) {
        console.error('Error fetching Spotify data', error);
        return NextResponse.json({ isPlaying: false }, { status: 500 });
    }
}
