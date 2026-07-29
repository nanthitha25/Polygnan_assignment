import React from 'react';

export default function BackgroundMesh({ level }) {
  // Determine ambient glow colors based on current unlocked level
  let glowGradient = "from-indigo-900/30 via-slate-950 to-cyan-950/20";
  if (level >= 5) {
    glowGradient = "from-amber-900/40 via-purple-950/30 to-slate-950";
  } else if (level >= 4) {
    glowGradient = "from-emerald-900/30 via-slate-950 to-teal-950/30";
  } else if (level >= 3) {
    glowGradient = "from-purple-900/30 via-indigo-950/30 to-slate-950";
  } else if (level >= 1) {
    glowGradient = "from-cyan-900/30 via-slate-950 to-blue-950/30";
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Background Mesh Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${glowGradient} transition-colors duration-1000`} />

      {/* Floating Animated Orbs */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/6 w-[30rem] h-[30rem] bg-cyan-600/10 rounded-full blur-[140px] animate-float" style={{ animationDelay: '-3s' }} />
      {level >= 5 && (
        <div className="absolute top-1/3 right-1/3 w-[35rem] h-[35rem] bg-amber-500/15 rounded-full blur-[150px] animate-pulse" />
      )}
    </div>
  );
}
