import React from 'react';
import { ProfileConfig } from '../../types';
import { User, MapPin, Building, Globe, AtSign, CheckCircle2 } from 'lucide-react';

interface ProfileEditorProps {
  config: ProfileConfig;
  onChange: (updated: Partial<ProfileConfig>) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Profile Identity & Essentials</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Configure your core profile identity. The GitHub username connects all your dynamic live stats, streak counter, and repo widgets!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* GitHub Username */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <AtSign className="w-3.5 h-3.5 text-cyan-400" />
            <span>GitHub Username <span className="text-cyan-400">*</span></span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">github.com/</span>
            <input
              type="text"
              value={config.githubUsername}
              onChange={(e) => onChange({ githubUsername: e.target.value.trim() })}
              placeholder="torvalds"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-24 pr-4 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <span className="text-[11px] text-slate-500">
            Vital for auto-generating your live contribution stats and snake animation.
          </span>
        </div>

        {/* Display Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Display Name</label>
          <input
            type="text"
            value={config.displayName}
            onChange={(e) => onChange({ displayName: e.target.value })}
            placeholder="Linus Torvalds"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Pronouns */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Pronouns</label>
          <input
            type="text"
            value={config.pronouns}
            onChange={(e) => onChange({ pronouns: e.target.value })}
            placeholder="they/them, he/him, she/her"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Headline */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-slate-300">Catchy Subtitle / Headline</label>
          <input
            type="text"
            value={config.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
            placeholder="Full-Stack Craftsman // Designing high-throughput distributed architectures"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Avatar URL */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-slate-300">Avatar Image URL (for Simulator)</label>
          <input
            type="text"
            value={config.avatarUrl}
            onChange={(e) => onChange({ avatarUrl: e.target.value })}
            placeholder="https://github.com/your-username.png"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Company */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>Company / Org</span>
          </label>
          <input
            type="text"
            value={config.company}
            onChange={(e) => onChange({ company: e.target.value })}
            placeholder="Linux Foundation"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Location</span>
          </label>
          <input
            type="text"
            value={config.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="Portland, Oregon // Remote"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Personal Website */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>Personal Portfolio / Website</span>
          </label>
          <input
            type="text"
            value={config.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="https://myportfolio.dev"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Available For Hire Toggle */}
        <div className="sm:col-span-2 pt-2">
          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              checked={config.availableForHire}
              onChange={(e) => onChange({ availableForHire: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-0 cursor-pointer"
            />
            <div>
              <span className="text-xs font-semibold text-white block">Display "Available for Hire" Badge</span>
              <span className="text-[11px] text-slate-400 block">Adds a glowing green indicator to your profile header.</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

