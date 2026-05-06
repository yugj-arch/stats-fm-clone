"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Clock, Share2, Sparkles } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

import { generateRandomString, generateCodeChallenge } from "@/lib/spotify-pkce"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  const handleSpotifyLogin = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "f9d8ce31ab9746c198dd7d218b19eba8"
      const redirectUri = `${window.location.origin}/dashboard`
      
      const codeVerifier = generateRandomString(128)
      const codeChallenge = await generateCodeChallenge(codeVerifier)
      
      localStorage.setItem('spotify_code_verifier', codeVerifier)
      
      const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        scope: 'user-top-read user-read-recently-played user-read-private user-read-email',
        show_dialog: 'true'
      })
      
      window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
    } catch (error: any) {
      toast.error("Failed to initiate Spotify login")
    }
  }


  const features = [
    {
      icon: BarChart3,
      title: "Deep Analytics",
      description: "Discover your top tracks, artists, and genres with precise historical data.",
    },
    {
      icon: Clock,
      title: "Listening Patterns",
      description: "Visualize when you listen the most with our interactive activity heatmaps.",
    },
    {
      icon: Sparkles,
      title: "Personality Insights",
      description: "Get a comprehensive analysis of your music mood, energy, and danceability.",
    },
    {
      icon: Share2,
      title: "Shareable Cards",
      description: "Generate beautiful, shareable aesthetic cards of your music personality.",
    },
  ]

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white selection:bg-[#1DB954] selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center flex-col">
        {/* Background gradient effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1DB954]/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-6 py-16 text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DB954]/10 text-[#1DB954] text-sm font-medium border border-[#1DB954]/20">
            <Sparkles className="w-4 h-4" />
            Your Music DNA, Decoded
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-balance">
            Your Spotify Stats,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DB954] to-[#1ed760]">
              Reimagined.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            Get deep analytics on your listening history. Top artists, tracks, unique listening heatmaps, and your personalized music personality card.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="px-8 py-7 text-lg bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold rounded-full transition-all hover:scale-105"
              onClick={handleSpotifyLogin}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Login with Spotify
            </Button>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-24 border-t border-zinc-800">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#1DB954]/10 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-[#1DB954]" />
              </div>
              <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
