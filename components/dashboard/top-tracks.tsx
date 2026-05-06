import { SpotifyTrack } from "@/lib/spotify"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

export function TopTracks({ tracks }: { tracks: SpotifyTrack[] }) {
  if (tracks.length === 0) {
    return <div className="text-zinc-400 text-center py-12 font-medium">No tracks found for this time period.</div>
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } }
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-1"
    >
      {tracks.map((track, index) => (
        <motion.div 
          variants={item}
          key={track.id} 
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-800/40 transition-all group cursor-default"
        >
          {/* Index / Play Button */}
          <div className="w-8 flex justify-center items-center relative">
            <span className="text-zinc-500 font-bold text-sm group-hover:opacity-0 transition-opacity">
              {index + 1}
            </span>
            <Play className="w-4 h-4 text-[#1DB954] absolute opacity-0 group-hover:opacity-100 transition-opacity fill-[#1DB954]" />
          </div>

          {/* Album Art */}
          <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            {track.album.images[0]?.url ? (
              <img 
                src={track.album.images[0].url} 
                alt={track.album.name} 
                className="w-full h-full object-cover rounded-md shadow-lg"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 rounded-md flex items-center justify-center">
                <span className="text-zinc-500 text-[10px]">T</span>
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-base truncate text-white group-hover:text-[#1DB954] transition-colors">
              {track.name}
            </h4>
            <div className="flex items-center gap-1.5 text-sm text-zinc-500 truncate mt-0.5">
              <span className="hover:text-zinc-300 cursor-pointer">{track.artists[0].name}</span>
              <span className="text-zinc-700">•</span>
              <span className="truncate hover:text-zinc-300 cursor-pointer">{track.album.name}</span>
            </div>
          </div>

          {/* Duration */}
          <div className="text-sm text-zinc-500 font-medium tabular-nums px-4">
            {formatDuration(track.duration_ms)}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

