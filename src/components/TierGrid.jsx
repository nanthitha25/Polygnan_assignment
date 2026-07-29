import React, { useState } from 'react';
import { LayoutGrid, ListFilter, Layers, Sparkles } from 'lucide-react';
import TierCard from './TierCard';
import { EYFI_TIERS } from '../data/tiers';

export default function TierGrid({ currentRegs, onSelectTier }) {
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' or 'stepper'

  return (
    <div className="space-y-6">
      
      {/* Grid Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-heading text-white">Reward Milestones</h2>
            <span className="text-xs font-mono-tech px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
              6 Levels Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Click any card to inspect full perk details, certificate previews, and ambassador rewards.
          </p>
        </div>

        {/* Layout Switcher Buttons */}
        <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setLayoutMode('grid')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all ${
              layoutMode === 'grid'
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>

          <button
            onClick={() => setLayoutMode('stepper')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all ${
              layoutMode === 'stepper'
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Vertical Stepper</span>
          </button>
        </div>
      </div>

      {/* Grid View Mode */}
      {layoutMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EYFI_TIERS.map((tier) => (
            <TierCard
              key={tier.threshold}
              data={tier}
              currentRegs={currentRegs}
              onSelectTier={onSelectTier}
            />
          ))}
        </div>
      ) : (
        /* Vertical Stepper View Mode */
        <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-indigo-500 before:to-amber-400">
          {EYFI_TIERS.map((tier) => {
            const isUnlocked = currentRegs >= tier.threshold;
            return (
              <div key={tier.threshold} className="relative pl-12">
                <div
                  className={`absolute left-3.5 top-6 w-5 h-5 rounded-full -translate-x-1/2 flex items-center justify-center border-2 transition-all ${
                    isUnlocked
                      ? "bg-emerald-500 border-white text-slate-950 shadow-lg shadow-emerald-500/50"
                      : "bg-slate-950 border-slate-700 text-slate-500"
                  }`}
                >
                  {isUnlocked && <Sparkles className="w-3 h-3" />}
                </div>

                <TierCard
                  data={tier}
                  currentRegs={currentRegs}
                  onSelectTier={onSelectTier}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
