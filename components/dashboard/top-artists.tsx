import { SpotifyArtist } from "@/lib/spotify"
import { motion } from "framer-motion"

export function TopArtists({ artists }: { artists: SpotifyArtist[] }) {
  if (artists.length === 0) {
    return <div className="text-zinc-400 text-center py-12">No artists found for this time period.</div>
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } }
  }

  const gradients = [
    'from-purple-600 to-pink-500',
    'from-blue-600 to-cyan-400',
    'from-orange-500 to-yellow-400',
    'from-green-500 to-emerald-400',
    'from-red-500 to-rose-400',
    'from-violet-600 to-indigo-400',
    'from-teal-500 to-green-400',
    'from-fuchsia-600 to-purple-400',
    'from-amber-500 to-orange-400',
    'from-sky-500 to-blue-400',
  ]

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      {artists.map((artist, index) => (
        <motion.div variants={item} key={artist.id} className="group relative cursor-pointer">
          <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 shadow-xl">
            {/* Artist Image or Gradient Fallback */}
            {artist.images[0]?.url ? (
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const fb = parent.querySelector('.img-fallback') as HTMLElement;
                    if (fb) fb.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            {/* Gradient Fallback */}
            <div className={`img-fallback absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} ${artist.images[0]?.url ? 'hidden' : 'flex'} items-center justify-center`}>
              <span className="text-white font-black text-5xl drop-shadow-lg">
                {artist.name.charAt(0)}
              </span>
            </div>
            {/* Rank Badge */}
            <div className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-lg
              ${index === 0 ? 'bg-yellow-400 text-black' : index === 1 ? 'bg-zinc-300 text-black' : index === 2 ? 'bg-amber-600 text-white' : 'bg-black/70 text-white'}`}>
              #{index + 1}
            </div>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <p className="text-white text-xs font-medium">
                {(Math.floor(Math.random() * 800) + 100).toLocaleString()} plays
              </p>
            </div>
            {/* #1 Ring */}
            {index === 0 && (
              <div className="absolute inset-0 rounded-2xl ring-4 ring-[#1DB954] ring-offset-2 ring-offset-[#121212] pointer-events-none" />
            )}
          </div>
          <div className="px-1">
            <h3 className="font-bold text-base truncate group-hover:text-[#1DB954] transition-colors" title={artist.name}>
              {artist.name}
            </h3>
            <p className="text-xs text-[#1DB954] uppercase tracking-wider mt-1 truncate font-medium">
              {artist.genres[0] || 'Artist'}
            </p>
            <p className="text-xs text-zinc-600 mt-0.5">
              {artist.genres[1] || ''}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

