import React from 'react';
import { Users, DollarSign, Shirt, GraduationCap, TrendingUp, Sparkles } from 'lucide-react';

export default function ImpactCalculator({ currentRegs }) {
  // Estimated metrics calculations
  const estimatedReach = currentRegs * 15; // 15 campus impressions per registration
  const totalGrantFunds = currentRegs >= 200 ? 1000 : currentRegs >= 75 ? 500 : currentRegs >= 50 ? 200 : 0;
  const swagItemsCount = currentRegs >= 200 ? 12 : currentRegs >= 100 ? 8 : currentRegs >= 50 ? 5 : currentRegs >= 25 ? 3 : 1;
  const internshipScore = Math.min(100, Math.round((currentRegs / 100) * 100));

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold font-heading text-white">Ambassador Impact Dashboard</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time projection of your campus influence & accrued rewards.
          </p>
        </div>
        <span className="text-[10px] font-mono-tech px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Live Projections
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        
        {/* Metric 1: Campus Impressions */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Campus Reach</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-extrabold font-heading text-white">
            ~{estimatedReach.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 font-mono-tech">Est. Student Impressions</span>
        </div>

        {/* Metric 2: Campus Event Funds */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Event Grants Unlocked</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-extrabold font-heading text-emerald-400">
            ${totalGrantFunds}
          </div>
          <span className="text-[10px] text-slate-500 font-mono-tech">Direct Workshop Budget</span>
        </div>

        {/* Metric 3: Swag Packages */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Swag Kit Drops</span>
            <Shirt className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-extrabold font-heading text-purple-300">
            {swagItemsCount} Items
          </div>
          <span className="text-[10px] text-slate-500 font-mono-tech">Merch & Gear Package</span>
        </div>

        {/* Metric 4: Internship Qualification */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Internship Score</span>
            <GraduationCap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-extrabold font-heading text-amber-300">
            {internshipScore}%
          </div>
          <span className="text-[10px] text-slate-500 font-mono-tech">
            {internshipScore >= 100 ? "Fully Eligible" : `${100 - currentRegs} Regs to 100%`}
          </span>
        </div>

      </div>
    </div>
  );
}
