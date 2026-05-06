import { SpotifyTrack } from "@/lib/spotify"
import Image from "next/image"
import { motion } from "framer-motion"

export function TopTracks({ tracks }: { tracks: SpotifyTrack[] }) {
  if (tracks.length === 0) {
    return <div className="text-zinc-400 text-center py-12">No tracks found for this time period.</div>
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {tracks.map((track, index) => (
        <motion.div 
          variants={item}
          key={track.id} 
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors group"
        >
          <div className="w-8 text-center text-zinc-500 font-medium group-hover:text-[#1DB954] transition-colors">
            {index + 1}
          </div>
          <div className="relative w-12 h-12 flex-shrink-0">
            {track.album.images[0]?.url ? (
              <Image 
                src={track.album.images[0].url} 
                alt={track.album.name} 
                fill 
                className="object-cover rounded shadow-md"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 rounded flex items-center justify-center">
                <span className="text-zinc-500 text-xs text-center">No Img</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-base truncate text-white group-hover:text-[#1DB954] transition-colors">
              {track.name}
            </h4>
            <p className="text-sm text-zinc-400 truncate">
              {track.artists.map(a => a.name).join(', ')} • {track.album.name}
            </p>
          </div>
          <div className="text-sm text-zinc-500 pr-4">
            {formatDuration(track.duration_ms)}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
