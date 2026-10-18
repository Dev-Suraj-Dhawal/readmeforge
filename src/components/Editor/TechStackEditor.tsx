import React, { useState } from 'react';
import { ProfileConfig, BadgeStyle } from '../../types';
import { TECH_BADGES, BADGE_CATEGORIES } from '../../data/techStackBadges';
import { Cpu, Search, Check, X, Sparkles, Sliders } from 'lucide-react';

interface TechStackEditorProps {
  config: ProfileConfig;
  onChange: (updated: Partial<ProfileConfig>) => void;
}

export const TechStackEditor: React.FC<TechStackEditorProps> = ({ config, onChange }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const badgeStyles: { id: BadgeStyle; name: string }[] = [
    { id: 'for-the-badge', name: 'For the Badge (High Impact)' },
    { id: 'flat-square', name: 'Flat Square (Minimal)' },
    { id: 'flat', name: 'Flat (Classic)' },
    { id: 'plastic', name: 'Plastic (Glossy 3D)' }
  ];

  const filteredBadges = TECH_BADGES.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || b.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const toggleBadge = (id: string) => {
    const exists = config.techBadges.includes(id);
    if (exists) {
      onChange({ techBadges: config.techBadges.filter((b) => b !== id) });
    } else {
      onChange({ techBadges: [...config.techBadges, id] });
    }
  };

  const applyPreset = (presetBadges: string[]) => {
    onChange({ techBadges: Array.from(new Set([...config.techBadges, ...presetBadges])) });
  };

  const clearAll = () => {
    onChange({ techBadges: [] });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Badge Style Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Tech Stack Badges ({config.techBadges.length} selected)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Pick from 60+ official Shield.io technology badges. Search or filter by category.
          </p>
        </div>

        {/* Badge Style Picker */}
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">Style:</span>
          <select
            value={config.badgeStyle}
            onChange={(e) => onChange({ badgeStyle: e.target.value as BadgeStyle })}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-semibold focus:outline-none focus:border-cyan-500"
          >
            {badgeStyles.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Quick Packs:
        </span>
        <button
          onClick={() => applyPreset(['typescript', 'javascript', 'react', 'nextjs', 'tailwind', 'nodejs', 'postgresql', 'docker', 'git'])}
          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
        >
          Full-Stack Web
        </button>
        <button
          onClick={() => applyPreset(['python', 'pytorch', 'tensorflow', 'huggingface', 'openai', 'pandas', 'numpy', 'docker'])}
          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
        >
          AI & ML Engineer
        </button>
        <button
          onClick={() => applyPreset(['rust', 'go', 'cpp', 'linux', 'docker', 'kubernetes', 'postgresql', 'git', 'neovim'])}
          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
        >
          Systems & Cyber
        </button>
        <button
          onClick={() => applyPreset(['docker', 'kubernetes', 'aws', 'gcp', 'linux', 'githubactions', 'terraform', 'nginx'])}
          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
        >
          DevOps & Cloud
        </button>
        {config.techBadges.length > 0 && (
          <button
            onClick={clearAll}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-red-950/40 text-red-400 border border-red-800/40 hover:bg-red-900/40 transition ml-auto"
          >
            Clear Selected
          </button>
        )}
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search technologies (e.g. React, Rust, Docker, PyTorch)..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {BADGE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                activeCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-300 border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected badges preview list */}
      {config.techBadges.length > 0 && (
        <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
          <span className="text-[11px] font-mono text-slate-400 block">Selected Order:</span>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {config.techBadges.map((id) => {
              const badge = TECH_BADGES.find((b) => b.id === id);
              if (!badge) return null;
              return (
                <span
                  key={id}
                  onClick={() => toggleBadge(id)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 text-xs hover:bg-red-950/50 hover:text-red-300 hover:border-red-500/40 border border-slate-700 cursor-pointer transition group"
                  title="Click to remove"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `#${badge.bgColor}` }} />
                  <span>{badge.name}</span>
                  <X className="w-3 h-3 text-slate-400 group-hover:text-red-400" />
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-96 overflow-y-auto p-1">
        {filteredBadges.map((b) => {
          const isSelected = config.techBadges.includes(b.id);
          return (
            <button
              key={b.id}
              onClick={() => toggleBadge(b.id)}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-cyan-950/50 border-cyan-500 text-white shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: `#${b.bgColor}` }}
                />
                <span className="text-xs font-medium truncate">{b.name}</span>
              </div>
              {isSelected ? (
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              ) : (
                <span className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

