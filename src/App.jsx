import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import TractionSimulator from './components/TractionSimulator';
import DynamicCalloutBanner from './components/DynamicCalloutBanner';
import TierGrid from './components/TierGrid';
import PerkDetailModal from './components/PerkDetailModal';
import ImpactCalculator from './components/ImpactCalculator';
import BackgroundMesh from './components/BackgroundMesh';
import { EYFI_TIERS } from './data/tiers';
import { soundManager } from './utils/soundFX';
import { triggerConfetti } from './utils/confetti';
import { Sparkles, Trophy, ExternalLink, RefreshCw } from 'lucide-react';

export default function App() {
  const [regs, setRegs] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const previousLevelRef = useRef(0);

  // Determine currently unlocked highest tier
  const currentUnlockedTier = [...EYFI_TIERS].reverse().find(t => regs >= t.threshold) || EYFI_TIERS[0];
  const currentLevel = currentUnlockedTier.level;

  // Handle sound FX & confetti triggers when crossing level thresholds
  useEffect(() => {
    if (currentLevel > previousLevelRef.current) {
      if (currentLevel === 5) {
        soundManager.playFanfare();
        triggerConfetti();
      } else {
        soundManager.playLevelUp();
        triggerConfetti();
      }
    }
    previousLevelRef.current = currentLevel;
  }, [currentLevel]);

  // Handle slider scrub change
  const handleRegsChange = (newValue) => {
    if (Math.abs(newValue - regs) > 2) {
      soundManager.playTick(300 + newValue * 2);
    }
    setRegs(newValue);
  };

  // Sound mute toggle
  const handleToggleMute = () => {
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);
    soundManager.setMuted(nextMuteState);
  };

  // Auto-play simulation loop
  useEffect(() => {
    let interval = null;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setRegs((prev) => {
          if (prev >= 250) {
            setIsAutoPlaying(false);
            return 250;
          }
          const step = prev < 50 ? 2 : prev < 100 ? 3 : 5;
          const nextVal = prev + step;
          soundManager.playTick(400 + (nextVal % 200));
          return nextVal;
        });
      }, 120);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Mesh Gradient */}
      <BackgroundMesh level={currentLevel} />

      {/* Main App Navigation Header */}
      <Header
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        currentLevelTitle={currentUnlockedTier.title}
        currentRegs={regs}
      />

      {/* Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 relative z-10">
        
        {/* Hero Banner Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono-tech shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>EYFI Ambassador Reward Ladder Specification Demo</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200 tracking-tight">
            Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-300">Campus Traction</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
            Scrub the Traction Simulator below to preview how your registrations unlock exclusive swag drops, campus event grants, founder mentorship, and paid internship opportunities.
          </p>
        </div>

        {/* Dynamic Callout Banner (FR-4) */}
        <DynamicCalloutBanner currentRegs={regs} />

        {/* Interactive Traction Simulator Slider (FR-1 & FR-2) */}
        <TractionSimulator
          value={regs}
          onChange={handleRegsChange}
          isAutoPlaying={isAutoPlaying}
          onToggleAutoPlay={() => setIsAutoPlaying(!isAutoPlaying)}
        />

        {/* Ambassador Impact Real-Time Dashboard */}
        <ImpactCalculator currentRegs={regs} />

        {/* Stateful Tier Cards Grid & Stepper (FR-3 & FR-5) */}
        <TierGrid
          currentRegs={regs}
          onSelectTier={(tier) => setSelectedTier(tier)}
        />

      </main>

      {/* Detailed Perk Inspection Modal */}
      {selectedTier && (
        <PerkDetailModal
          tier={selectedTier}
          currentRegs={regs}
          onClose={() => setSelectedTier(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 relative z-10 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <span>EYFI Campus Ambassador Program</span>
          <span>•</span>
          <span>Polygnan Growth Engineering</span>
        </div>
        <p className="text-[11px] text-slate-600">
          Built with React 19, Tailwind CSS, Framer Motion, and Web Audio API FX.
        </p>
      </footer>
    </div>
  );
}
