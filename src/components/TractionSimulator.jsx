import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, Flame, Zap, ArrowUpRight } from 'lucide-react';

export default function TractionSimulator({
  value,
  onChange,
  isAutoPlaying,
  onToggleAutoPlay,
  maxSimValue = 250
}) {
  const percentage = Math.min(100, Math.max(0, (value / maxSimValue) * 100));

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-slate-800 shadow-2xl">
      {/* Background glow behind slider */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
            <h3 className="text-lg font-bold font-heading text-white">Traction Simulator</h3>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              FR-1 Interactive Slider
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Drag the scrub slider to simulate potential student registrations and preview unlocked perks in real time.
          </p>
        </div>

        {/* Numeric Counter & Controls */}
        <div className="flex items-center space-x-3">
          <div className="bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2 flex items-baseline space-x-1.5 shadow-inner">
            <span className="font-heading font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 font-mono-tech">
              {value}
            </span>
            <span className="text-xs text-slate-400 font-medium">Registrations</span>
          </div>

          {/* Auto Play Simulation Toggle */}
          <button
            onClick={onToggleAutoPlay}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-heading text-xs font-semibold transition-all duration-200 shadow-md ${
              isAutoPlaying
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 animate-pulse"
                : "bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-indigo-600/25"
            }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause Demo</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Simulate Growth</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Draggable Slider Control */}
      <div className="relative py-4">
        {/* Track Glow Line */}
        <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 relative shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-75 shadow-lg shadow-indigo-500/50"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* HTML5 Range Input overlay */}
        <input
          type="range"
          min="0"
          max={maxSimValue}
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="absolute top-4 left-0 w-full h-4 opacity-0 cursor-grab active:cursor-grabbing"
        />

        {/* Milestone Tick Marks below slider */}
        <div className="flex justify-between items-center text-[11px] font-mono-tech text-slate-400 mt-3 px-1">
          <span className={value >= 0 ? "text-cyan-400 font-bold" : ""}>0 (Scout)</span>
          <span className={value >= 25 ? "text-cyan-400 font-bold" : ""}>25 (Ambassador)</span>
          <span className={value >= 50 ? "text-indigo-400 font-bold" : ""}>50 (Captain)</span>
          <span className={value >= 75 ? "text-purple-400 font-bold" : ""}>75 (Lead)</span>
          <span className={value >= 100 ? "text-emerald-400 font-bold" : ""}>100 (Legend)</span>
          <span className={value >= 200 ? "text-amber-400 font-bold" : ""}>200+ (Founding)</span>
        </div>
      </div>

      {/* Quick Jump Modifiers */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-slate-400 font-medium">Quick Boost:</span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onChange(0)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-mono-tech border border-slate-800 transition-colors"
          >
            Reset (0)
          </button>
          <button
            onClick={() => onChange(Math.min(maxSimValue, value + 10))}
            className="px-2.5 py-1 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 text-xs font-mono-tech border border-indigo-500/20 transition-colors"
          >
            +10 Regs
          </button>
          <button
            onClick={() => onChange(Math.min(maxSimValue, value + 25))}
            className="px-2.5 py-1 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 text-xs font-mono-tech border border-indigo-500/20 transition-colors"
          >
            +25 Regs
          </button>
          <button
            onClick={() => onChange(Math.min(maxSimValue, value + 50))}
            className="px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 text-xs font-mono-tech border border-purple-500/20 transition-colors"
          >
            +50 Regs
          </button>
          <button
            onClick={() => onChange(200)}
            className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-heading font-bold transition-all shadow-md shadow-amber-500/20"
          >
            Max Tier (200+)
          </button>
        </div>
      </div>
    </div>
  );
}
