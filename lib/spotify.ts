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

// Rich realistic mock data
const mockArtists: SpotifyArtist[] = [
  { id: 'a1', name: 'The Weeknd', images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb', height: 640, width: 640 }], genres: ['canadian pop', 'r&b', 'dark pop'] },
  { id: 'a2', name: 'Drake', images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9', height: 640, width: 640 }], genres: ['canadian hip hop', 'rap', 'trap'] },
  { id: 'a3', name: 'Taylor Swift', images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb5ef0a4f42e386e6b58f1b5c3', height: 640, width: 640 }], genres: ['pop', 'country pop', 'indie pop'] },
  { id: 'a4', name: 'Kendrick Lamar', images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022', height: 640, width: 640 }], genres: ['conscious hip hop', 'west coast rap', 'rap'] },
  { id: 'a5', name: 'Billie Eilish', images: [{ url: 'https://i.scdn.co/image/ab6761610000e5ebd8b9980db67272cb4d2c5fcd', height: 640, width: 640 }], genres: ['electropop', 'indie pop', 'alt pop'] },
  { id: 'a6', name: 'Bad Bunny', images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb4f073c4076da9f5e1bc29b09', height: 640, width: 640 }], genres: ['reggaeton', 'latin trap', 'urbano latino'] },
  { id: 'a7', name: 'Doja Cat', images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb1f6c1f4d83ebfb69f0657c1c', height: 640, width: 640 }], genres: ['pop rap', 'r&b', 'dance pop'] },
  { id: 'a8', name: 'SZA', images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb5b76e27e7e6d05d8fbe89eb0', height: 640, width: 640 }], genres: ['r&b', 'neo soul', 'alternative r&b'] },
  { id: 'a9', name: 'Harry Styles', images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb2d0871a2db3cef3acd2f1d12', height: 640, width: 640 }], genres: ['pop', 'soft rock', 'glam rock'] },
  { id: 'a10', name: 'Olivia Rodrigo', images: [{ url: 'https://i.scdn.co/image/ab6761610000e5eb8285b5de2d1c78e38a77e892', height: 640, width: 640 }], genres: ['pop', 'bedroom pop', 'pop rock'] },
];

const mockTracks: SpotifyTrack[] = [
  { id: 't1', name: 'Blinding Lights', artists: [{ id: 'a1', name: 'The Weeknd' }], album: { name: 'After Hours', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36', height: 640, width: 640 }] }, duration_ms: 200040 },
  { id: 't2', name: 'God\'s Plan', artists: [{ id: 'a2', name: 'Drake' }], album: { name: 'Scorpion', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5', height: 640, width: 640 }] }, duration_ms: 198973 },
  { id: 't3', name: 'Anti-Hero', artists: [{ id: 'a3', name: 'Taylor Swift' }], album: { name: 'Midnights', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5', height: 640, width: 640 }] }, duration_ms: 200692 },
  { id: 't4', name: 'HUMBLE.', artists: [{ id: 'a4', name: 'Kendrick Lamar' }], album: { name: 'DAMN.', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2732d52f0a52d4bae9ca4be7757', height: 640, width: 640 }] }, duration_ms: 177000 },
  { id: 't5', name: 'bad guy', artists: [{ id: 'a5', name: 'Billie Eilish' }], album: { name: 'WHEN WE ALL FALL ASLEEP', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce', height: 640, width: 640 }] }, duration_ms: 194088 },
  { id: 't6', name: 'Tití Me Preguntó', artists: [{ id: 'a6', name: 'Bad Bunny' }], album: { name: 'Un Verano Sin Ti', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273e85259a1cae29a8d91f2093d', height: 640, width: 640 }] }, duration_ms: 238920 },
  { id: 't7', name: 'Say So', artists: [{ id: 'a7', name: 'Doja Cat' }], album: { name: 'Hot Pink', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273c5f9f7e6e60c14f88d18b6e2', height: 640, width: 640 }] }, duration_ms: 237720 },
  { id: 't8', name: 'Kill Bill', artists: [{ id: 'a8', name: 'SZA' }], album: { name: 'SOS', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273cddc1b9fafb64d2e7b2f1b7a', height: 640, width: 640 }] }, duration_ms: 153946 },
  { id: 't9', name: 'As It Was', artists: [{ id: 'a9', name: 'Harry Styles' }], album: { name: 'Harry\'s House', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0', height: 640, width: 640 }] }, duration_ms: 167303 },
  { id: 't10', name: 'drivers license', artists: [{ id: 'a10', name: 'Olivia Rodrigo' }], album: { name: 'SOUR', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b27390f7b827c4f02fc7e3f00c83', height: 640, width: 640 }] }, duration_ms: 242014 },
  { id: 't11', name: 'Starboy', artists: [{ id: 'a1', name: 'The Weeknd' }], album: { name: 'Starboy', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452', height: 640, width: 640 }] }, duration_ms: 230453 },
  { id: 't12', name: 'One Dance', artists: [{ id: 'a2', name: 'Drake' }], album: { name: 'Views', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b27397d8d4af35a2ab5bb7bbc9bc', height: 640, width: 640 }] }, duration_ms: 173987 },
  { id: 't13', name: 'Shake It Off', artists: [{ id: 'a3', name: 'Taylor Swift' }], album: { name: '1989', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2732b36ebee6a82c3afc4d15e9c', height: 640, width: 640 }] }, duration_ms: 219200 },
  { id: 't14', name: 'SICKO MODE', artists: [{ id: 'a2', name: 'Drake' }], album: { name: 'Astroworld', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3', height: 640, width: 640 }] }, duration_ms: 312820 },
  { id: 't15', name: 'Therefore I Am', artists: [{ id: 'a5', name: 'Billie Eilish' }], album: { name: 'Therefore I Am', images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273f9bb8be1e5f68faba00d0d60', height: 640, width: 640 }] }, duration_ms: 173920 },
];

async function fetchWebApi(endpoint: string, method: string, accessToken: string | null, body?: any) {
  if (!accessToken) throw new Error('No access token provided');

  const options: RequestInit = {
    headers: { Authorization: `Bearer ${accessToken}` },
    method,
  };
  if (body && method !== 'GET') options.body = JSON.stringify(body);

  const res = await fetch(`${SPOTIFY_API_BASE}/${endpoint}`, options);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = errorData?.error?.message || res.statusText || 'Unknown error';
    console.error(`Spotify API Error (${res.status}): ${message} at ${endpoint}`);
    if (res.status === 401) throw new Error('401');
    throw new Error(`${res.status}`);
  }

  return await res.json();
}

export async function getTopTracks(accessToken: string | null, timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'): Promise<SpotifyTrack[]> {
  if (!accessToken) return mockTracks;
  try {
    const data = await fetchWebApi(`me/top/tracks?time_range=${timeRange}&limit=20`, 'GET', accessToken);
    return data.items?.length ? data.items : mockTracks;
  } catch {
    return mockTracks;
  }
}

export async function getTopArtists(accessToken: string | null, timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'): Promise<SpotifyArtist[]> {
  if (!accessToken) return mockArtists;
  try {
    const data = await fetchWebApi(`me/top/artists?time_range=${timeRange}&limit=20`, 'GET', accessToken);
    return data.items?.length ? data.items : mockArtists;
  } catch {
    return mockArtists;
  }
}

export async function getRecentlyPlayed(accessToken: string | null): Promise<any[]> {
  const fallback = Array.from({ length: 50 }).map((_, i) => ({
    track: mockTracks[i % mockTracks.length],
    played_at: new Date(Date.now() - i * 3600000 - Math.random() * 1800000).toISOString(),
  }));
  if (!accessToken) return fallback;
  try {
    const data = await fetchWebApi(`me/player/recently-played?limit=50`, 'GET', accessToken);
    return data.items?.length ? data.items : fallback;
  } catch {
    return fallback;
  }
}

export async function getAudioFeatures(accessToken: string | null, trackIds: string[]): Promise<any[]> {
  if (trackIds.length === 0) return [];
  const fallback = trackIds.map(id => ({
    id, valence: Math.random() * 0.4 + 0.4, energy: Math.random() * 0.4 + 0.4, danceability: Math.random() * 0.4 + 0.4,
  }));
  if (!accessToken) return fallback;
  try {
    const ids = trackIds.slice(0, 100).join(',');
    const data = await fetchWebApi(`audio-features?ids=${ids}`, 'GET', accessToken);
    return data.audio_features?.length ? data.audio_features : fallback;
  } catch {
    return fallback;
  }
}

export async function getMe(accessToken: string | null): Promise<any> {
  if (!accessToken) return { display_name: 'Music Lover', email: '' };
  try {
    return await fetchWebApi('me', 'GET', accessToken);
  } catch {
    return { display_name: 'Music Lover', email: '' };
  }
}



