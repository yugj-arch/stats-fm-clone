"use client"

import { useRef, useState, useEffect } from "react"
import { SpotifyTrack, SpotifyArtist, getAudioFeatures } from "@/lib/spotify"
import { Button } from "@/components/ui/button"
import { Download, Sparkles } from "lucide-react"
import html2canvas from "html2canvas"

export function PersonalityCard({ tracks, artists, session }: { tracks: SpotifyTrack[], artists: SpotifyArtist[], session: any }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [mood, setMood] = useState<{ energy: number, valence: number, danceability: number } | null>(null)

  useEffect(() => {
    async function fetchMood() {
      if (tracks.length > 0 && session) {
        const features = await getAudioFeatures(session.provider_token, tracks.slice(0, 20).map(t => t.id))
        if (features.length > 0) {
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
      }
    }
    fetchMood()
  }, [tracks, session])

  const handleDownload = async () => {
    if (!cardRef.current) return
    setIsDownloading(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#121212',
        useCORS: true,
      })
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = 'my-music-personality.png'
      link.href = url
      link.click()
    } catch (err) {
      console.error("Failed to generate image", err)
    } finally {
      setIsDownloading(false)
    }
  }

  const getMoodProfile = () => {
    if (!mood) return "Loading..."
    if (mood.valence > 0.6 && mood.energy > 0.6) return "Euphoric & Energetic"
    if (mood.valence > 0.6 && mood.energy <= 0.6) return "Chill & Happy"
    if (mood.valence <= 0.6 && mood.energy > 0.6) return "Intense & Dark"
    return "Melancholic & Calm"
  }

  const topGenres = Array.from(new Set(artists.flatMap(a => a.genres))).slice(0, 3)

  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      <div 
        ref={cardRef}
        className="w-full aspect-[4/5] relative rounded-3xl overflow-hidden p-8 flex flex-col justify-between bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 shadow-2xl"
      >
        {/* Aesthetic Background Accents */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#1DB954]/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-[#1DB954]" />
              <span className="text-[#1DB954] font-bold tracking-widest text-sm uppercase">stats.fm</span>
            </div>
            <h2 className="text-3xl font-black text-white mt-4 tracking-tight leading-tight">
              Music<br/>Personality
            </h2>
          </div>
          <div className="w-12 h-12 rounded-full border border-zinc-700 overflow-hidden">
            {/* User Avatar Placeholder */}
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-sm font-bold">
              ME
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1 font-semibold">Primary Vibe</div>
            <div className="text-2xl font-bold text-white">
              {getMoodProfile()}
            </div>
          </div>

          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-semibold">Sonic DNA</div>
            <div className="flex flex-wrap gap-2">
              {topGenres.map(genre => (
                <span key={genre} className="px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-200 text-sm border border-zinc-700 capitalize">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Audio Attributes</div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-400">Positivity</span>
                <span className="text-white">{mood ? Math.round(mood.valence * 100) : 0}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-green-400" style={{ width: `${mood ? mood.valence * 100 : 0}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-400">Energy</span>
                <span className="text-white">{mood ? Math.round(mood.energy * 100) : 0}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-red-500" style={{ width: `${mood ? mood.energy * 100 : 0}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-400">Danceability</span>
                <span className="text-white">{mood ? Math.round(mood.danceability * 100) : 0}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${mood ? mood.danceability * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleDownload} 
        disabled={isDownloading || !mood}
        className="mt-8 bg-white text-black hover:bg-zinc-200 rounded-full px-8 font-bold"
      >
        <Download className="w-4 h-4 mr-2" />
        {isDownloading ? 'Generating...' : 'Save Image'}
      </Button>
    </div>
  )
}
