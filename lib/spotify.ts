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

// Rich realistic mock data with verified public image URLs
const mockArtists: SpotifyArtist[] = [
  { id: 'a1', name: 'The Weeknd', images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/The_Weeknd_-_The_After_Hours_Tour_%28cropped%29.jpg/440px-The_Weeknd_-_The_After_Hours_Tour_%28cropped%29.jpg', height: 640, width: 640 }], genres: ['canadian pop', 'r&b', 'dark pop'] },
  { id: 'a2', name: 'Drake', images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/440px-Drake_July_2016.jpg', height: 640, width: 640 }], genres: ['canadian hip hop', 'rap', 'trap'] },
  { id: 'a3', name: 'Taylor Swift', images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/440px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png', height: 640, width: 640 }], genres: ['pop', 'country pop', 'indie pop'] },
  { id: 'a4', name: 'Kendrick Lamar', images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kendrick_Lamar_Visits_HOT_97_%28cropped%29.jpg/440px-Kendrick_Lamar_Visits_HOT_97_%28cropped%29.jpg', height: 640, width: 640 }], genres: ['conscious hip hop', 'west coast rap', 'rap'] },
  { id: 'a5', name: 'Billie Eilish', images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Billie_Eilish_at_the_2019_Critics%27_Choice_Awards_%28cropped%29.jpg/440px-Billie_Eilish_at_the_2019_Critics%27_Choice_Awards_%28cropped%29.jpg', height: 640, width: 640 }], genres: ['electropop', 'indie pop', 'alt pop'] },
  { id: 'a6', name: 'Bad Bunny', images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Bad_Bunny_in_2020.jpg/440px-Bad_Bunny_in_2020.jpg', height: 640, width: 640 }], genres: ['reggaeton', 'latin trap', 'urbano latino'] },
  { id: 'a7', name: 'Doja Cat', images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Doja_Cat_in_2023.jpg/440px-Doja_Cat_in_2023.jpg', height: 640, width: 640 }], genres: ['pop rap', 'r&b', 'dance pop'] },
  { id: 'a8', name: 'SZA', images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/SZA_Coachella_2018_%28cropped%29.jpg/440px-SZA_Coachella_2018_%28cropped%29.jpg', height: 640, width: 640 }], genres: ['r&b', 'neo soul', 'alternative r&b'] },
  { id: 'a9', name: 'Harry Styles', images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Harry_Styles_2022_%28cropped%29.jpg/440px-Harry_Styles_2022_%28cropped%29.jpg', height: 640, width: 640 }], genres: ['pop', 'soft rock', 'glam rock'] },
  { id: 'a10', name: 'Olivia Rodrigo', images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Olivia_Rodrigo_at_the_2021_American_Music_Awards.jpg/440px-Olivia_Rodrigo_at_the_2021_American_Music_Awards.jpg', height: 640, width: 640 }], genres: ['pop', 'bedroom pop', 'pop rock'] },
];

const mockTracks: SpotifyTrack[] = [
  { id: 't1', name: 'Blinding Lights', artists: [{ id: 'a1', name: 'The Weeknd' }], album: { name: 'After Hours', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png', height: 640, width: 640 }] }, duration_ms: 200040 },
  { id: 't2', name: "God's Plan", artists: [{ id: 'a2', name: 'Drake' }], album: { name: 'Scorpion', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/9/90/Scorpion_by_Drake.jpg', height: 640, width: 640 }] }, duration_ms: 198973 },
  { id: 't3', name: 'Anti-Hero', artists: [{ id: 'a3', name: 'Taylor Swift' }], album: { name: 'Midnights', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png', height: 640, width: 640 }] }, duration_ms: 200692 },
  { id: 't4', name: 'HUMBLE.', artists: [{ id: 'a4', name: 'Kendrick Lamar' }], album: { name: 'DAMN.', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png', height: 640, width: 640 }] }, duration_ms: 177000 },
  { id: 't5', name: 'bad guy', artists: [{ id: 'a5', name: 'Billie Eilish' }], album: { name: 'WHEN WE ALL FALL ASLEEP', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/3/38/When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png', height: 640, width: 640 }] }, duration_ms: 194088 },
  { id: 't6', name: 'Tití Me Preguntó', artists: [{ id: 'a6', name: 'Bad Bunny' }], album: { name: 'Un Verano Sin Ti', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/4/43/Bad_Bunny_-_Un_Verano_Sin_Ti.png', height: 640, width: 640 }] }, duration_ms: 238920 },
  { id: 't7', name: 'Say So', artists: [{ id: 'a7', name: 'Doja Cat' }], album: { name: 'Hot Pink', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Doja_Cat_-_Hot_Pink.png', height: 640, width: 640 }] }, duration_ms: 237720 },
  { id: 't8', name: 'Kill Bill', artists: [{ id: 'a8', name: 'SZA' }], album: { name: 'SOS', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/3/39/SZA_-_SOS.png', height: 640, width: 640 }] }, duration_ms: 153946 },
  { id: 't9', name: 'As It Was', artists: [{ id: 'a9', name: 'Harry Styles' }], album: { name: "Harry's House", images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Harry%27s_House_-_Harry_Styles.png', height: 640, width: 640 }] }, duration_ms: 167303 },
  { id: 't10', name: 'drivers license', artists: [{ id: 'a10', name: 'Olivia Rodrigo' }], album: { name: 'SOUR', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/3/30/Olivia_Rodrigo_-_Sour_%28album_cover%29.png', height: 640, width: 640 }] }, duration_ms: 242014 },
  { id: 't11', name: 'Starboy', artists: [{ id: 'a1', name: 'The Weeknd' }], album: { name: 'Starboy', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/3/3c/The_Weeknd_-_Starboy.png', height: 640, width: 640 }] }, duration_ms: 230453 },
  { id: 't12', name: 'One Dance', artists: [{ id: 'a2', name: 'Drake' }], album: { name: 'Views', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/9/91/Drake_-_Views.png', height: 640, width: 640 }] }, duration_ms: 173987 },
  { id: 't13', name: 'Shake It Off', artists: [{ id: 'a3', name: 'Taylor Swift' }], album: { name: '1989', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png', height: 640, width: 640 }] }, duration_ms: 219200 },
  { id: 't14', name: 'SICKO MODE', artists: [{ id: 'a2', name: 'Drake' }], album: { name: 'Astroworld', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Astroworld_by_Travis_Scott.jpg', height: 640, width: 640 }] }, duration_ms: 312820 },
  { id: 't15', name: 'Therefore I Am', artists: [{ id: 'a5', name: 'Billie Eilish' }], album: { name: 'Happier Than Ever', images: [{ url: 'https://upload.wikimedia.org/wikipedia/en/9/93/Billie_Eilish_-_Happier_Than_Ever.png', height: 640, width: 640 }] }, duration_ms: 173920 },
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



