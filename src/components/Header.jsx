import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Trophy } from 'lucide-react';

export default function Header({ isMuted, onToggleMute, currentLevelTitle, currentRegs }) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Trophy className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300">
                EYFI Reward Ladder
              </span>
              <span className="text-[10px] font-mono-tech uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                SPEC-001 v1.1
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Campus Ambassador Program • Traction Simulator & Reward Engine
            </p>
          </div>
        </div>

        {/* Live Level Badge & Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Current Level Pill */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-900/90 border border-slate-700/60 rounded-full px-3.5 py-1.5 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs text-slate-400 font-medium">Status:</span>
            <span className="text-xs font-semibold text-emerald-300 font-heading">
              {currentLevelTitle} ({currentRegs} Regs)
            </span>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? "Enable Sound FX" : "Mute Sound FX"}
            className={`p-2.5 rounded-xl border transition-all duration-200 ${
              isMuted
                ? "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300"
                : "bg-indigo-950/60 text-indigo-400 border-indigo-500/30 hover:bg-indigo-900/50 shadow-md shadow-indigo-500/10"
            }`}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
          </button>

          {/* View Spec Button */}
          <a
            href="https://github.com/nanthitha25/Polygnan_assignment"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs shadow-lg shadow-indigo-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub Spec</span>
          </a>
        </div>
      </div>
    </header>
  );
}
