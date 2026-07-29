import React from 'react';
import { 
  Shield, 
  Star, 
  Zap, 
  GraduationCap, 
  Briefcase, 
  Crown, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';

const iconMap = {
  Shield,
  Star,
  Zap,
  GraduationCap,
  Briefcase,
  Crown
};

export default function TierCard({ data, currentRegs, onSelectTier }) {
  const IconComponent = iconMap[data.iconName] || Shield;
  
  const isUnlocked = currentRegs >= data.threshold;
  const isNextTarget = !isUnlocked && currentRegs < data.threshold;
  const delta = data.threshold - currentRegs;

  // Calculate percentage toward this specific card if locked
  const cardProgressPercent = Math.min(100, Math.max(0, (currentRegs / data.threshold) * 100));

  return (
    <div
      onClick={() => onSelectTier(data)}
      className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border ${
        isUnlocked
          ? `glass-card border-emerald-500/40 hover:border-emerald-400 bg-gradient-to-b ${data.unlockedBg} shadow-xl`
          : isNextTarget
          ? "glass-card border-indigo-500/70 neon-glow-indigo bg-slate-900/90 hover:border-indigo-400"
          : "glass-card border-slate-800/80 bg-slate-950/40 opacity-75 hover:opacity-100 hover:border-slate-700"
      }`}
    >
      {/* Background Glow Effect */}
      {isUnlocked && (
        <div className="absolute -right-16 -top-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
      )}
      {isNextTarget && (
        <div className="absolute -right-16 -top-16 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" />
      )}

      {/* Card Header: Level Badge & State Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${
              isUnlocked
                ? `bg-gradient-to-tr ${data.badgeColor} text-white shadow-emerald-500/20`
                : isNextTarget
                ? "bg-slate-800 text-indigo-400 border border-indigo-500/50 shadow-indigo-500/20"
                : "bg-slate-900 text-slate-600 border border-slate-800"
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400">
              Level {data.level}
            </span>
            <h3 className="font-heading font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors">
              {data.title}
            </h3>
          </div>
        </div>

        {/* Status Badge Tag */}
        <div>
          {isUnlocked ? (
            <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-heading font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Unlocked</span>
            </span>
          ) : isNextTarget ? (
            <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[11px] font-heading font-bold animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Next Goal</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-900 text-slate-500 border border-slate-800 text-[11px] font-mono-tech">
              <Lock className="w-3 h-3" />
              <span>Locked</span>
            </span>
          )}
        </div>
      </div>

      {/* Threshold Metric */}
      <div className="mb-4 pt-2 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-xs text-slate-400">Milestone:</span>
        <span className={`text-xs font-mono-tech font-bold ${isUnlocked ? "text-emerald-400" : "text-slate-300"}`}>
          {data.threshold === 0 ? "Initial Access" : `${data.threshold}+ Registrations`}
        </span>
      </div>

      {/* Description Snippet */}
      <p className="text-xs text-slate-400 mb-4 line-clamp-2">
        {data.description}
      </p>

      {/* Perks List */}
      <div className="space-y-2 mb-5">
        {data.perks.map((perk, index) => (
          <div key={index} className="flex items-start space-x-2 text-xs">
            {isUnlocked ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0 mt-1.5" />
            )}
            <span className={isUnlocked ? "text-slate-200 font-medium" : "text-slate-500"}>
              {perk}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar or Action Link */}
      {!isUnlocked && (
        <div className="mt-4 pt-3 border-t border-slate-800/60">
          <div className="flex justify-between items-center text-[10px] font-mono-tech mb-1.5">
            <span className="text-slate-400">Distance to Unlock</span>
            <span className="text-indigo-400 font-semibold">{delta} Regs needed</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${cardProgressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer Details Button */}
      <div className="mt-4 flex items-center justify-between text-xs font-heading font-semibold text-slate-400 group-hover:text-cyan-400 transition-colors pt-2">
        <span className="flex items-center space-x-1">
          <Info className="w-3.5 h-3.5" />
          <span>Inspect Perks</span>
        </span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
