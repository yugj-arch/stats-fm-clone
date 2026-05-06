"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { getTopArtists, getTopTracks, getRecentlyPlayed, getMe, SpotifyArtist, SpotifyTrack } from "@/lib/spotify"
import { Button } from "@/components/ui/button"
import { LogOut, Music, User, Activity, Sparkles } from "lucide-react"
import { TopArtists } from "@/components/dashboard/top-artists"
import { TopTracks } from "@/components/dashboard/top-tracks"
import { Heatmap } from "@/components/dashboard/heatmap"
import { PersonalityCard } from "@/components/dashboard/personality-card"

type TimeRange = 'short_term' | 'medium_term' | 'long_term'

export default function DashboardPage() {
  const { user, session, isLoading, signOut } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'artists' | 'tracks' | 'heatmap' | 'personality'>('artists')
  const [timeRange, setTimeRange] = useState<TimeRange>('medium_term')
  
  const [artists, setArtists] = useState<SpotifyArtist[]>([])
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [recentTracks, setRecentTracks] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user && (session || !isLoading)) {
      fetchData()
    }
  }, [user, session, timeRange, isLoading])

  const fetchData = async () => {
    setIsFetching(true)
    setError(null)
    const token = session?.provider_token || localStorage.getItem('spotify_token')

    // Fetch profile (never throws)
    try {
      const meData = await getMe(token)
      setProfile(meData)
    } catch {}

    // Fetch artists
    try {
      const artistsData = await getTopArtists(token, timeRange)
      setArtists(artistsData)
    } catch (err: any) {
      console.error('Artists fetch failed:', err.message)
      if (err.message?.includes('403')) {
        setError('Spotify returned 403 Forbidden. Your account may not be whitelisted yet in the Developer Dashboard, or the token has expired. Please sign out and log in again.')
      } else {
        setError(err.message)
      }
    }

    // Fetch tracks
    try {
      const tracksData = await getTopTracks(token, timeRange)
      setTracks(tracksData)
    } catch {}

    // Fetch recently played
    try {
      const recentData = await getRecentlyPlayed(token)
      setRecentTracks(recentData)
    } catch {}

    setIsFetching(false)
  }

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">Loading...</div>
  }

  const isDemo = !session?.provider_token && !localStorage.getItem('spotify_token')

  const tabs = [
    { id: 'artists', label: 'Top Artists', icon: User },
    { id: 'tracks', label: 'Top Tracks', icon: Music },
    { id: 'heatmap', label: 'Listening Activity', icon: Activity },
    { id: 'personality', label: 'Personality Card', icon: Sparkles },
  ] as const

  return (
    <div className="min-h-screen bg-[#121212] text-white selection:bg-[#1DB954] selection:text-white">
      {/* Demo Banner */}
      {isDemo && (
        <div className="bg-[#1DB954]/10 border-b border-[#1DB954]/20 py-2 text-center text-[#1DB954] text-xs font-medium tracking-wide uppercase">
          Viewing Demo Data — Sign in with Spotify for real stats
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="text-[#1DB954]">stats</span>.fm clone
          </div>
          <div className="flex items-center gap-4">
            {profile && (
              <div className="hidden sm:flex items-center gap-3 mr-4 border-r border-zinc-800 pr-4">
                <div className="text-right">
                  <p className="text-xs font-bold text-white leading-tight">{profile.display_name || 'Spotify User'}</p>
                  <p className="text-[10px] text-zinc-500 leading-tight">{profile.email}</p>
                </div>
                {profile.images?.[0]?.url ? (
                  <img src={profile.images[0].url} className="w-8 h-8 rounded-full border border-zinc-700" alt="Avatar" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                    {(profile.display_name || 'U').charAt(0)}
                  </div>
                )}
              </div>
            )}
            <Button variant="ghost" className="text-zinc-400 hover:text-white" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8 mb-8 items-start md:items-center justify-between">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'bg-[#1DB954] text-black shadow-[0_0_15px_rgba(29,185,84,0.3)]' 
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Time Range Selector (Only show for artists/tracks) */}
          {(activeTab === 'artists' || activeTab === 'tracks') && (
            <div className="flex gap-2 bg-zinc-900 p-1 rounded-full">
              {[
                { id: 'short_term', label: '4 Weeks' },
                { id: 'medium_term', label: '6 Months' },
                { id: 'long_term', label: 'All Time' },
              ].map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id as TimeRange)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${timeRange === range.id ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'}`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
          {isFetching ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1DB954]"></div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              {activeTab === 'artists' && <TopArtists artists={artists} />}
              {activeTab === 'tracks' && <TopTracks tracks={tracks} />}
              {activeTab === 'heatmap' && <Heatmap recentTracks={recentTracks} />}
              {activeTab === 'personality' && <PersonalityCard tracks={tracks} artists={artists} session={session} />}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
