"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Clock, Share2, Sparkles, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function HomePage() {
  const router = useRouter()

  const features = [
    {
      icon: BarChart3,
      title: "Deep Analytics",
      description: "Discover your top tracks, artists, and genres with precise historical data.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Clock,
      title: "Listening Patterns",
      description: "Visualize when you listen the most with our interactive activity heatmaps.",
      color: "from-[#1DB954] to-emerald-400"
    },
    {
      icon: Sparkles,
      title: "Personality Insights",
      description: "Get a comprehensive analysis of your music mood, energy, and danceability.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Share2,
      title: "Shareable Cards",
      description: "Generate beautiful, shareable aesthetic cards of your music personality.",
      color: "from-orange-500 to-yellow-400"
    },
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#1DB954] selection:text-black font-sans overflow-x-hidden">
      {/* Texture & Grid Overlays */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center flex-col px-6 overflow-hidden">
        {/* Background glow effects */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#1DB954]/20 blur-[150px] rounded-full pointer-events-none" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" 
        />
        
        <div className="container relative z-10 mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 text-zinc-400 text-xs font-black tracking-[0.2em] uppercase border border-zinc-800 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1DB954]" />
            Your Music DNA, Decoded
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-10"
          >
            YOUR STATS.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DB954] via-emerald-400 to-teal-400">
              REIMAGINED.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-xl text-zinc-500 font-medium leading-relaxed max-w-xl mx-auto mb-12"
          >
            Go beyond simple top charts. Explore your listening habits with high-fidelity analytics and beautiful visual insights.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="px-10 py-8 text-base bg-white hover:bg-zinc-100 text-black font-black rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] group"
              onClick={() => router.push('/dashboard')}
            >
              EXPLORE MY STATS
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-zinc-800 to-transparent" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-32 border-t border-zinc-900/50">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={feature.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-[2rem] bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 transition-all hover:bg-zinc-900/40"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-8 rotate-3 group-hover:rotate-6 transition-transform`}>
                <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="font-black text-xl mb-4 tracking-tight uppercase">{feature.title}</h3>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed group-hover:text-zinc-400 transition-colors">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center border-t border-zinc-900/50">
        <p className="text-[10px] text-zinc-700 font-black tracking-[0.3em] uppercase">Stats.fm Clone • Created with Love</p>
      </footer>
    </div>
  )
}

