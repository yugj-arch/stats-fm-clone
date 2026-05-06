import { useMemo } from "react"
import { motion } from "framer-motion"

export function Heatmap({ recentTracks }: { recentTracks: any[] }) {
  // Generate a mock 7-day heatmap by hour
  const heatmapData = useMemo(() => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const data = Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => 0))

    recentTracks.forEach(item => {
      const date = new Date(item.played_at)
      const day = date.getDay()
      const hour = date.getHours()
      data[day][hour] += 1
    })

    return { days, data }
  }, [recentTracks])

  const getMaxVal = () => {
    let max = 1
    heatmapData.data.forEach(day => {
      day.forEach(val => {
        if (val > max) max = val
      })
    })
    return max
  }

  const maxVal = getMaxVal()

  const getColorClass = (val: number) => {
    if (val === 0) return 'bg-zinc-800/40'
    const intensity = val / maxVal
    if (intensity < 0.25) return 'bg-[#1DB954]/20 shadow-[0_0_10px_rgba(29,185,84,0.1)]'
    if (intensity < 0.5) return 'bg-[#1DB954]/40 shadow-[0_0_15px_rgba(29,185,84,0.2)]'
    if (intensity < 0.75) return 'bg-[#1DB954]/70 shadow-[0_0_20px_rgba(29,185,84,0.3)]'
    return 'bg-[#1DB954] shadow-[0_0_25px_rgba(29,185,84,0.5)]'
  }

  if (recentTracks.length === 0) {
    return <div className="text-zinc-400 text-center py-12 font-medium">No recent listening history found.</div>
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/30 p-8 rounded-[2rem] border border-zinc-800/50 backdrop-blur-sm"
    >
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
          <h3 className="text-xl font-black text-white tracking-tight uppercase">Listening Heatmap</h3>
        </div>
        <p className="text-sm text-zinc-500 font-medium">Your activity patterns across the last 50 plays.</p>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          {/* Hour labels */}
          <div className="flex mb-4">
            <div className="w-16 flex-shrink-0"></div>
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-zinc-600 font-bold tracking-tighter">
                {i % 4 === 0 ? `${i}H` : ''}
              </div>
            ))}
          </div>

          {/* Heatmap rows */}
          <div className="space-y-2">
            {heatmapData.days.map((day, dayIndex) => (
              <div key={day} className="flex items-center group">
                <div className="w-16 flex-shrink-0 text-[10px] text-zinc-500 font-black tracking-widest group-hover:text-zinc-300 transition-colors">
                  {day}
                </div>
                <div className="flex-1 flex gap-1.5">
                  {heatmapData.data[dayIndex].map((val, hourIndex) => (
                    <motion.div 
                      key={hourIndex} 
                      className="flex-1"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: (dayIndex * 24 + hourIndex) * 0.002 }}
                    >
                      <div 
                        className={`h-5 rounded-md ${getColorClass(val)} transition-all hover:scale-125 hover:z-10 cursor-pointer relative group/cell`}
                        title={`${val} plays on ${day} at ${hourIndex}:00`}
                      >
                        {/* Custom Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover/cell:opacity-100 pointer-events-none whitespace-nowrap z-20 shadow-xl transition-opacity">
                          {val} plays at {hourIndex}:00
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-3 mt-10">
        <span className="text-[10px] text-zinc-600 font-black tracking-widest uppercase">Less</span>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-zinc-800/40"></div>
          <div className="w-3 h-3 rounded-sm bg-[#1DB954]/20"></div>
          <div className="w-3 h-3 rounded-sm bg-[#1DB954]/40"></div>
          <div className="w-3 h-3 rounded-sm bg-[#1DB954]/70"></div>
          <div className="w-3 h-3 rounded-sm bg-[#1DB954]"></div>
        </div>
        <span className="text-[10px] text-zinc-600 font-black tracking-widest uppercase">More</span>
      </div>
    </motion.div>
  )
}

