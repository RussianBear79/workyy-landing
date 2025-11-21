import { useState } from 'react'

export const DecisionSimulator = () => {
  const [budget, setBudget] = useState(40)
  const [conversion, setConversion] = useState(3.5)
  const visitors = 1200 + budget * 18
  const projectedRevenue = Math.round(visitors * (conversion / 100) * 42)

  return (
    <div className="bg-[#07122b] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
      <div>
        <p className="text-sm text-gray-400 mb-1">Marketing Budget</p>
        <input
          type="range"
          min={10}
          max={100}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-brand-green"
        />
        <p className="text-sm text-gray-300 mt-1">{budget}K $</p>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-1">Conversion Rate</p>
        <input
          type="range"
          min={1}
          max={7}
          step={0.1}
          value={conversion}
          onChange={(e) => setConversion(Number(e.target.value))}
          className="w-full accent-purple-400"
        />
        <p className="text-sm text-gray-300 mt-1">{conversion.toFixed(1)}%</p>
      </div>
      <div className="mt-2">
        <p className="text-xs uppercase text-brand-green tracking-[0.3em] mb-2">Projection</p>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-sm text-gray-400">Visitors</p>
          <p className="text-2xl font-bold">{visitors.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-4">Projected Revenue</p>
          <p className="text-3xl font-bold text-brand-green">${projectedRevenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

