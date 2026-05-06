"use client"

import { useRef, useState, useEffect } from "react"
import { SpotifyTrack, SpotifyArtist, getAudioFeatures } from "@/lib/spotify"
import { Button } from "@/components/ui/button"
import { Download, Sparkles, Music, Mic2 } from "lucide-react"
import html2canvas from "html2canvas"
import { motion } from "framer-motion"

export function PersonalityCard({ tracks, artists }: { tracks: SpotifyTrack[], artists: SpotifyArtist[], session: any }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [mood, setMood] = useState<{ energy: number, valence: number, danceability: number } | null>(null)

  useEffect(() => {
    // Generate mood based on rich mock data audio features
    const fetchMood = async () => {
      // Use the fallback logic from spotify.ts which returns realistic features
      const features = await getAudioFeatures(null, tracks.slice(0, 10).map(t => t.id))
      const avg = features.reduce((acc, curr) => ({
        energy: acc.energy + curr.energy,
        valence: acc.valence + curr.valence,
        danceability: acc.danceability + curr.danceability,
      }), { energy: 0, valence: 0, danceability: 0 })
      
      setMood({
        energy: avg.energy / features.length,
        valence: avg.valence / features.length,
        danceability: avg.danceability / features.length,
      })
    }
    fetchMood()
  }, [tracks])

  const handleDownload = async () => {
    if (!cardRef.current) return
    setIsDownloading(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // Higher scale for ultra-crisp sharing
        backgroundColor: '#121212',
        useCORS: true,
        logging: false,
      })
      const url = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.download = 'my-stats-fm-personality.png'
      link.href = url
      link.click()
    } catch (err) {
      console.error("Failed to generate image", err)
    } finally {
      setIsDownloading(false)
    }
  }

  const getMoodProfile = () => {
    if (!mood) return "Vibing..."
    if (mood.valence > 0.6 && mood.energy > 0.6) return "Euphoric & Energetic"
    if (mood.valence > 0.6 && mood.energy <= 0.6) return "Chill & Happy"
    if (mood.valence <= 0.6 && mood.energy > 0.6) return "Intense & Dark"
    return "Melancholic & Calm"
  }

  const topGenres = Array.from(new Set(artists.flatMap(a => a.genres))).slice(0, 3)
  const topArtist = artists[0]
  const topTrack = tracks[0]

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto w-full px-4">
      <div 
        ref={cardRef}
        className="w-full aspect-[4/5] relative rounded-[2.5rem] overflow-hidden p-10 flex flex-col justify-between bg-[#0a0a0a] border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Grain Overlay for Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Dynamic Background Gradients */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1DB954]/25 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] rounded-full" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20">
                <Sparkles className="w-5 h-5 text-[#1DB954]" />
              </div>
              <span className="text-zinc-500 font-bold tracking-[0.2em] text-[10px] uppercase">Stats.fm Identity</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[10px] text-zinc-400 font-bold">
              SPRING 2024
            </div>
          </div>

          <h2 className="text-4xl font-black text-white tracking-tighter leading-[0.9] mb-12">
            YOUR MUSIC<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DB954] via-emerald-400 to-teal-400">
              PERSONALITY.
            </span>
          </h2>

          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-black">Top Artist</div>
              <div className="flex items-center gap-3">
                {topArtist?.images[0]?.url && (
                  <img src={topArtist.images[0].url} className="w-8 h-8 rounded-full object-cover border border-zinc-800" alt="" />
                )}
                <div className="text-sm font-bold text-white truncate">{topArtist?.name}</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-black">Top Track</div>
              <div className="flex items-center gap-3">
                {topTrack?.album.images[0]?.url && (
                  <img src={topTrack.album.images[0].url} className="w-8 h-8 rounded-lg object-cover border border-zinc-800" alt="" />
                )}
                <div className="text-sm font-bold text-white truncate">{topTrack?.name}</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-black">Core Vibe</div>
              <div className="text-2xl font-bold text-white tracking-tight italic">
                "{getMoodProfile()}"
              </div>
            </div>

            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3 font-black">Sonic DNA</div>
              <div className="flex flex-wrap gap-1.5">
                {topGenres.map(genre => (
                  <span key={genre} className="px-3 py-1 rounded-lg bg-zinc-900/50 text-zinc-300 text-[11px] border border-zinc-800 font-medium capitalize">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-zinc-800/50">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-black uppercase tracking-wider">
                <div className="w-1 h-1 rounded-full bg-blue-500" />
                Mood
              </div>
              <div className="text-lg font-bold text-white leading-none">
                {mood ? Math.round(mood.valence * 100) : 0}%
              </div>
              <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${mood ? mood.valence * 100 : 0}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-black uppercase tracking-wider">
                <div className="w-1 h-1 rounded-full bg-red-500" />
                Energy
              </div>
              <div className="text-lg font-bold text-white leading-none">
                {mood ? Math.round(mood.energy * 100) : 0}%
              </div>
              <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${mood ? mood.energy * 100 : 0}%` }}
                  transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-black uppercase tracking-wider">
                <div className="w-1 h-1 rounded-full bg-[#1DB954]" />
                Dance
              </div>
              <div className="text-lg font-bold text-white leading-none">
                {mood ? Math.round(mood.danceability * 100) : 0}%
              </div>
              <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#1DB954] shadow-[0_0_10px_rgba(29,185,84,0.5)]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${mood ? mood.danceability * 100 : 0}%` }}
                  transition={{ duration: 1.5, ease: "circOut", delay: 0.4 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <Button 
          onClick={handleDownload} 
          disabled={isDownloading || !mood}
          className="bg-white text-black hover:bg-zinc-200 rounded-full px-10 py-6 font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
        >
          {isDownloading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isDownloading ? 'EXPORTING...' : 'EXPORT CARD'}
        </Button>
      </div>
    </div>
  )
}

