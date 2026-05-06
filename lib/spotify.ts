export const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

// Types
export interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  genres: string[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    name: string;
    images: { url: string; height: number; width: number }[];
  };
  duration_ms: number;
}

// Mock Data Generators
const mockArtists: SpotifyArtist[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `mock_artist_${i}`,
  name: `Mock Artist ${i + 1}`,
  images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb5b4f7224dc981daf09eb195f', height: 640, width: 640 }],
  genres: ['pop', 'mockwave', 'synthpop'],
}));

const mockTracks: SpotifyTrack[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `mock_track_${i}`,
  name: `Mock Track ${i + 1}`,
  artists: [{ id: `mock_artist_0`, name: `Mock Artist 1` }],
  album: {
    name: `Mock Album`,
    images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273b3780a426ffeb5f2b2c954e7', height: 640, width: 640 }],
  },
  duration_ms: 200000 + Math.random() * 60000,
}));

async function fetchWebApi(endpoint: string, method: string, accessToken: string | null, body?: any) {
  if (!accessToken) {
    throw new Error('No access token provided');
  }

  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method,
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${SPOTIFY_API_BASE}/${endpoint}`, options);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Spotify API Error:', {
      status: res.status,
      statusText: res.statusText,
      endpoint,
      errorData
    });
    
    if (res.status === 401) {
      throw new Error('Spotify session expired. Please sign out and sign in again.');
    }
    throw new Error(`Spotify API error: ${res.statusText}`);
  }

  return await res.json();
}

export async function getTopTracks(accessToken: string | null, timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'): Promise<SpotifyTrack[]> {
  if (!accessToken) return mockTracks;
  try {
    const data = await fetchWebApi(`me/top/tracks?time_range=${timeRange}&limit=20`, 'GET', accessToken);
    return data.items;
  } catch (err) {
    console.error('getTopTracks failed:', err);
    throw err;
  }
}

export async function getTopArtists(accessToken: string | null, timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'): Promise<SpotifyArtist[]> {
  if (!accessToken) return mockArtists;
  try {
    const data = await fetchWebApi(`me/top/artists?time_range=${timeRange}&limit=20`, 'GET', accessToken);
    return data.items;
  } catch (err) {
    console.error('getTopArtists failed:', err);
    throw err;
  }
}

export async function getRecentlyPlayed(accessToken: string | null): Promise<any[]> {
  if (!accessToken) {
    return Array.from({ length: 50 }).map(() => ({
      track: mockTracks[0],
      played_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    }));
  }
  try {
    const data = await fetchWebApi(`me/player/recently-played?limit=50`, 'GET', accessToken);
    return data.items;
  } catch (err) {
    console.error('getRecentlyPlayed failed:', err);
    throw err;
  }
}

export async function getAudioFeatures(accessToken: string | null, trackIds: string[]): Promise<any[]> {
  if (trackIds.length === 0) return [];
  if (!accessToken) {
    return trackIds.map(id => ({
      id,
      valence: Math.random(),
      energy: Math.random(),
      danceability: Math.random(),
    }));
  }
  try {
    const ids = trackIds.slice(0, 100).join(',');
    const data = await fetchWebApi(`audio-features?ids=${ids}`, 'GET', accessToken);
    return data.audio_features;
  } catch (err) {
    console.error('getAudioFeatures failed:', err);
    throw err;
  }
}
