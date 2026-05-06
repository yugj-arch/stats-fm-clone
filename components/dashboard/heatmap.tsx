import { useMemo } from "react"

export function Heatmap({ recentTracks }: { recentTracks: any[] }) {
  // Generate a mock 7-day heatmap by hour since we only have 50 recent tracks
  const heatmapData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
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

  const getColor = (val: number) => {
    if (val === 0) return 'bg-zinc-800'
    const intensity = val / maxVal
    if (intensity < 0.25) return 'bg-[#1DB954]/30'
    if (intensity < 0.5) return 'bg-[#1DB954]/50'
    if (intensity < 0.75) return 'bg-[#1DB954]/75'
    return 'bg-[#1DB954]'
  }

  if (recentTracks.length === 0) {
    return <div className="text-zinc-400 text-center py-12">No recent listening history found.</div>
  }

  return (
    <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Listening Activity</h3>
        <p className="text-sm text-zinc-400">Based on your 50 most recently played tracks.</p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="flex mb-2">
            <div className="w-12 text-xs text-zinc-500"></div>
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="flex-1 text-center text-xs text-zinc-500">
                {i % 3 === 0 ? `${i}h` : ''}
              </div>
            ))}
          </div>

          {heatmapData.days.map((day, dayIndex) => (
            <div key={day} className="flex items-center mb-1">
              <div className="w-12 text-xs text-zinc-400 font-medium">{day}</div>
              {heatmapData.data[dayIndex].map((val, hourIndex) => (
                <div 
                  key={hourIndex} 
                  className="flex-1 px-0.5"
                  title={`${val} plays on ${day} at ${hourIndex}:00`}
                >
                  <div className={`h-4 rounded-sm ${getColor(val)} transition-colors hover:ring-2 ring-white/50 cursor-pointer`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-6 text-xs text-zinc-400">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-zinc-800"></div>
        <div className="w-3 h-3 rounded-sm bg-[#1DB954]/30"></div>
        <div className="w-3 h-3 rounded-sm bg-[#1DB954]/50"></div>
        <div className="w-3 h-3 rounded-sm bg-[#1DB954]/75"></div>
        <div className="w-3 h-3 rounded-sm bg-[#1DB954]"></div>
        <span>More</span>
      </div>
    </div>
  )
}
