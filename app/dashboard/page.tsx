"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getTopArtists, getTopTracks, getRecentlyPlayed, getMe, SpotifyArtist, SpotifyTrack } from "@/lib/spotify"
import { Button } from "@/components/ui/button"
import { LogOut, Music, User, Activity, Sparkles } from "lucide-react"
import { TopArtists } from "@/components/dashboard/top-artists"
import { TopTracks } from "@/components/dashboard/top-tracks"
import { Heatmap } from "@/components/dashboard/heatmap"
import { PersonalityCard } from "@/components/dashboard/personality-card"

type TimeRange = 'short_term' | 'medium_term' | 'long_term'

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'artists' | 'tracks' | 'heatmap' | 'personality'>('artists')
  const [timeRange, setTimeRange] = useState<TimeRange>('medium_term')
  
  const [artists, setArtists] = useState<SpotifyArtist[]>([])
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [recentTracks, setRecentTracks] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    fetchData()
  }, [timeRange])

  const fetchData = async () => {
    setIsFetching(true)
    const [artistsData, tracksData, recentData, meData] = await Promise.all([
      getTopArtists(null, timeRange),
      getTopTracks(null, timeRange),
      getRecentlyPlayed(null),
      getMe(null)
    ])
    setArtists(artistsData)
    setTracks(tracksData)
    setRecentTracks(recentData)
    setProfile(meData)
    setIsFetching(false)
  }

  const tabs = [
    { id: 'artists', label: 'Top Artists', icon: User },
    { id: 'tracks', label: 'Top Tracks', icon: Music },
    { id: 'heatmap', label: 'Listening Activity', icon: Activity },
    { id: 'personality', label: 'Personality Card', icon: Sparkles },
  ] as const

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#1DB954] selection:text-black font-sans overflow-x-hidden">
      {/* Texture & Grid Overlays */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-[60] bg-[#050505]/60 backdrop-blur-xl border-b border-zinc-900">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 font-black text-2xl tracking-tighter uppercase group cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 rounded-lg bg-[#1DB954] flex items-center justify-center group-hover:rotate-6 transition-transform">
              <Sparkles className="w-5 h-5 text-black fill-black" />
            </div>
            <span>stats<span className="text-[#1DB954]">.fm</span></span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 pl-6 border-l border-zinc-900">
              <div className="text-right">
                <p className="text-xs font-black text-white leading-none tracking-tight uppercase">Yug Jain</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">PRO EXPLORER</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1DB954] to-emerald-600 flex items-center justify-center text-xs font-black text-black shadow-lg shadow-[#1DB954]/10">
                YJ
              </div>
            </div>
            <Button variant="ghost" className="text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-full h-10 w-10 p-0" onClick={() => router.push('/')}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 mb-12 items-start lg:items-center justify-between">
          {/* Tabs */}
          <div className="flex gap-2 bg-zinc-900/40 p-1.5 rounded-[2rem] border border-zinc-900/50 backdrop-blur-sm overflow-x-auto max-w-full hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'bg-white text-black shadow-xl scale-105' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'}`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-black' : 'text-zinc-500'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Time Range Selector */}
          {(activeTab === 'artists' || activeTab === 'tracks') && (
            <div className="flex gap-1.5 bg-zinc-900/40 p-1.5 rounded-full border border-zinc-900/50 backdrop-blur-sm">
              {[
                { id: 'short_term', label: '4W' },
                { id: 'medium_term', label: '6M' },
                { id: 'long_term', label: 'ALL' },
              ].map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id as TimeRange)}
                  className={`w-12 h-10 rounded-full text-[10px] font-black transition-all
                    ${timeRange === range.id ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="min-h-[600px]">
          {isFetching ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-zinc-800 border-t-[#1DB954] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
              {activeTab === 'artists' && <TopArtists artists={artists} />}
              {activeTab === 'tracks' && <TopTracks tracks={tracks} />}
              {activeTab === 'heatmap' && <Heatmap recentTracks={recentTracks} />}
              {activeTab === 'personality' && <PersonalityCard tracks={tracks} artists={artists} session={null} />}
            </div>
          )}
        </div>
      </main>
    </div>

  )
}
