import React from 'react';
import { Target, Sparkles, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { EYFI_TIERS } from '../data/tiers';

export default function DynamicCalloutBanner({ currentRegs }) {
  // Find next tier target
  const nextTier = EYFI_TIERS.find(t => t.threshold > currentRegs);
  const currentUnlockedTier = [...EYFI_TIERS].reverse().find(t => currentRegs >= t.threshold) || EYFI_TIERS[0];

  const delta = nextTier ? nextTier.threshold - currentRegs : 0;
  const isMaxTier = !nextTier;

  // Calculate percentage to next milestone
  let prevThreshold = currentUnlockedTier.threshold;
  let nextThreshold = nextTier ? nextTier.threshold : 200;
  let segmentProgress = 100;

  if (nextTier) {
    const range = nextThreshold - prevThreshold;
    const current = currentRegs - prevThreshold;
    segmentProgress = Math.min(100, Math.max(0, (current / range) * 100));
  }

  return (
    <div className="relative rounded-2xl p-6 overflow-hidden border transition-all duration-300 shadow-xl bg-slate-900/90 backdrop-blur-xl border-slate-800">
      
      {/* Background ambient lighting */}
      <div className={`absolute top-0 right-0 w-96 h-full opacity-20 pointer-events-none bg-gradient-to-l ${
        isMaxTier ? "from-amber-500 via-orange-500 to-transparent" : "from-indigo-500 via-cyan-500 to-transparent"
      }`} />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        
        {/* Banner Callout Text */}
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
            isMaxTier
              ? "bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 neon-glow-amber animate-bounce"
              : "bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white neon-glow-cyan"
          }`}>
            {isMaxTier ? <Award className="w-7 h-7" /> : <Target className="w-6 h-6 animate-pulse" />}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-400">
                Milestone Status
              </span>
              <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded-full border ${
                isMaxTier 
                  ? "bg-amber-500/10 text-amber-300 border-amber-500/30" 
                  : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
              }`}>
                FR-4 Callout Banner
              </span>
            </div>

            {isMaxTier ? (
              <div className="mt-1">
                <h2 className="text-xl sm:text-2xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                  🏆 MAXIMUM TIER ACHIEVED!
                </h2>
                <p className="text-sm text-slate-300 mt-0.5">
                  You unlocked <strong className="text-amber-300 font-semibold">Founding Tier</strong>! You are under direct consideration for the EYFI Founding Team.
                </p>
              </div>
            ) : (
              <div className="mt-1">
                <h2 className="text-lg sm:text-xl font-bold font-heading text-white flex items-center flex-wrap gap-2">
                  <span>Just</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono-tech text-xl font-extrabold">
                    {delta}
                  </span>
                  <span>more registrations to unlock</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 font-extrabold">
                    {nextTier.title}!
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1.5">
                  <span>Next Reward:</span>
                  <span className="text-slate-200 font-medium">{nextTier.perks[0]}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Track & Delta Meter */}
        <div className="lg:w-80 shrink-0 bg-slate-950/80 p-4 rounded-xl border border-slate-800 shadow-inner">
          <div className="flex justify-between items-center text-xs font-mono-tech mb-2">
            <span className="text-slate-400">Target Progress</span>
            <span className="text-cyan-400 font-bold">
              {isMaxTier ? "100%" : `${Math.round(segmentProgress)}%`}
            </span>
          </div>

          {/* Progress fill bar */}
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 relative">
            <div
              className={`h-full rounded-full transition-all duration-300 shadow-md ${
                isMaxTier
                  ? "bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400"
                  : "bg-gradient-to-r from-cyan-500 to-indigo-500"
              }`}
              style={{ width: `${isMaxTier ? 100 : segmentProgress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
            <span>{currentUnlockedTier.title} ({prevThreshold} Regs)</span>
            {nextTier && (
              <span className="text-indigo-300 font-semibold">{nextTier.title} ({nextThreshold} Regs)</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
