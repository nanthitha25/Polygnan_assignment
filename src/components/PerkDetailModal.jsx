import React, { useState } from 'react';
import { X, CheckCircle2, Copy, Check, ExternalLink, ShieldCheck, Gift, Award, Share2 } from 'lucide-react';

export default function PerkDetailModal({ tier, currentRegs, onClose }) {
  if (!tier) return null;

  const isUnlocked = currentRegs >= tier.threshold;
  const [copied, setCopied] = useState(false);
  const refLink = `https://ambassador.eyfichallenge.com/ref/${tier.title.toLowerCase().replace(/\s+/g, '-')}-2026`;

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header background gradient */}
        <div className={`h-32 bg-gradient-to-r ${tier.badgeColor} p-6 flex justify-between items-start relative`}>
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
          
          <div className="relative z-10">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-200">
              Level {tier.level} • {tier.threshold === 0 ? "Scout Access" : `${tier.threshold}+ Registrations`}
            </span>
            <h2 className="text-2xl font-black font-heading text-white mt-1">
              {tier.title} Perks & Benefits
            </h2>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Unlock Status Alert */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isUnlocked
              ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
              : "bg-slate-950/60 border-slate-800 text-slate-400"
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isUnlocked ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-500"
              }`}>
                {isUnlocked ? <CheckCircle2 className="w-5 h-5" /> : <Award className="w-4 h-4" />}
              </div>
              <div>
                <span className="text-xs font-heading font-bold block text-white">
                  {isUnlocked ? "Unlocked & Ready to Claim!" : "Locked Milestone"}
                </span>
                <span className="text-xs text-slate-400">
                  {isUnlocked
                    ? "You meet or exceed the required registration milestone."
                    : `Requires ${tier.threshold - currentRegs} more registrations to unlock.`}
                </span>
              </div>
            </div>

            <span className="text-xs font-mono-tech px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
              Value: {tier.perkValue}
            </span>
          </div>

          {/* Detailed Perks Breakdown */}
          <div>
            <h4 className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 mb-3">
              Included Privileges & Perks
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tier.perks.map((perk, index) => (
                <div key={index} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-3">
                  <Gift className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 font-medium">
                    {perk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Referral Link Generator Preview */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-heading font-semibold text-slate-300 flex items-center space-x-1.5">
                <Share2 className="w-4 h-4 text-indigo-400" />
                <span>Simulated Ambassador Referral Link</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono-tech">Unique ID: EYFI-{tier.level}</span>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={refLink}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-mono-tech text-cyan-300 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-heading font-semibold flex items-center space-x-1.5 transition-colors shrink-0 shadow-md shadow-indigo-600/20"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Footer Close / Apply Action */}
          <div className="flex justify-end space-x-3 pt-2 border-t border-slate-800">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-heading font-semibold transition-colors"
            >
              Close Window
            </button>
            <button
              onClick={() => {
                alert(`Applying for ${tier.title} Perks! Request submitted to Polygnan Growth Team.`);
                onClose();
              }}
              disabled={!isUnlocked}
              className={`px-6 py-2.5 rounded-xl text-xs font-heading font-bold flex items-center space-x-2 transition-all ${
                isUnlocked
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isUnlocked ? "Claim Perks Now" : "Locked (Reach Milestone)"}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
