export type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  images: SpotifyImage[];
  genres: string[];
  external_urls: { spotify: string };
  followers: { total: number };
  popularity: number;
};

export type SpotifyTrack = {
  id: string;
  name: string;
  album: {
    id: string;
    name: string;
    images: SpotifyImage[];
  };
  artists: {
    id: string;
    name: string;
  }[];
  duration_ms: number;
  explicit: boolean;
  external_urls: { spotify: string };
  popularity: number;
  preview_url: string | null;
};

export type SpotifyAudioFeatures = {
  id: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
};

export type SpotifyTopItems<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

export type SpotifyRecentlyPlayed = {
  items: {
    track: SpotifyTrack;
    played_at: string;
  }[];
};
