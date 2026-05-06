import { SpotifyArtist } from "@/lib/spotify"
import Image from "next/image"

export function TopArtists({ artists }: { artists: SpotifyArtist[] }) {
  if (artists.length === 0) {
    return <div className="text-zinc-400 text-center py-12">No artists found for this time period.</div>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {artists.map((artist, index) => (
        <div key={artist.id} className="group relative">
          <div className="relative aspect-square overflow-hidden rounded-full border-4 border-transparent hover:border-[#1DB954] transition-all duration-300 shadow-lg mb-4">
            {artist.images[0]?.url ? (
              <Image 
                src={artist.images[0].url} 
                alt={artist.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                <span className="text-zinc-500 text-2xl">{artist.name.charAt(0)}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">#{index + 1}</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg truncate" title={artist.name}>{artist.name}</h3>
            <p className="text-xs text-[#1DB954] uppercase tracking-wider mt-1 truncate">
              {artist.genres[0] || 'Artist'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
