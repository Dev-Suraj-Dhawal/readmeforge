import React, { useState } from 'react';
import { ProfileConfig, BadgeStyle, CustomBadgeItem } from '../../types';
import { TECH_BADGES, BADGE_CATEGORIES, getBadgeUrl } from '../../data/techStackBadges';
import { Cpu, Search, Check, X, Sparkles, Sliders, Eye, Plus, Trash2, Tag } from 'lucide-react';

interface TechStackEditorProps {
  config: ProfileConfig;
  onChange: (updated: Partial<ProfileConfig>) => void;
}

export const TechStackEditor: React.FC<TechStackEditorProps> = ({ config, onChange }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Custom Badge Forge Form State
  const [customLabel, setCustomLabel] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [customColor, setCustomColor] = useState('00FF66');
  const [customLogo, setCustomLogo] = useState('');

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

  const handleAddCustomBadge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLabel.trim() || !customMessage.trim()) return;

    const newBadge: CustomBadgeItem = {
      id: `custom-${Date.now()}`,
      label: customLabel.trim(),
      message: customMessage.trim(),
      color: customColor.replace('#', '') || '00FF66',
      logo: customLogo.trim() || undefined
    };

    const updated = [...(config.customBadges || []), newBadge];
    onChange({ customBadges: updated });

    setCustomLabel('');
    setCustomMessage('');
    setCustomLogo('');
  };

  const handleRemoveCustomBadge = (id: string) => {
    const updated = (config.customBadges || []).filter((b) => b.id !== id);
    onChange({ customBadges: updated });
  };

  const customBadgePreviewUrl = customLabel && customMessage
    ? `https://img.shields.io/badge/${encodeURIComponent(customLabel)}-${encodeURIComponent(customMessage)}-${customColor.replace('#', '')}?style=${config.badgeStyle}${customLogo ? `&logo=${encodeURIComponent(customLogo)}` : ''}`
    : null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Badge Style Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Tech Stack Badges ({config.techBadges.length + (config.customBadges?.length || 0)} active)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Pick from 60+ official Shield.io technology badges or craft custom specialty badges.
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
          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer transition"
        >
          Full-Stack Web
        </button>
        <button
          onClick={() => applyPreset(['python', 'pytorch', 'tensorflow', 'huggingface', 'openai', 'pandas', 'numpy', 'docker'])}
          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer transition"
        >
          AI & ML Engineer
        </button>
        <button
          onClick={() => applyPreset(['rust', 'go', 'cpp', 'linux', 'docker', 'kubernetes', 'postgresql', 'git', 'neovim'])}
          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer transition"
        >
          Systems & Cyber
        </button>
        <button
          onClick={() => applyPreset(['java', 'springboot', 'typescript', 'docker', 'aws', 'postgresql', 'redis'])}
          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer transition"
        >
          Enterprise Backend
        </button>

        {config.techBadges.length > 0 && (
          <button
            onClick={clearAll}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 cursor-pointer transition ml-auto"
          >
            Clear Selected
          </button>
        )}
      </div>

      {/* CUSTOM BADGE FORGE */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Custom Badge Forge (Shields.io Architect)</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            CUSTOM SHIELDS
          </span>
        </div>

        <form onSubmit={handleAddCustomBadge} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div>
              <label className="text-[10px] font-semibold text-slate-400 block mb-1">Left Label</label>
              <input
                type="text"
                placeholder="Architecture"
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-400 block mb-1">Right Message</label>
              <input
                type="text"
                placeholder="Microservices"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-400 block mb-1">Badge Color (Hex)</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="00FF66"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
                <div
                  className="w-7 h-7 rounded-lg border border-slate-700 shrink-0"
                  style={{ backgroundColor: `#${customColor.replace('#', '') || '00FF66'}` }}
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-400 block mb-1">Optional Logo</label>
              <input
                type="text"
                placeholder="docker / github / react"
                value={customLogo}
                onChange={(e) => setCustomLogo(e.target.value)}
                className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              {customBadgePreviewUrl ? (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">PREVIEW:</span>
                  <img src={customBadgePreviewUrl} alt="Custom Badge Preview" className="h-6 object-contain" />
                </div>
              ) : (
                <span className="text-[11px] text-slate-500">
                  Fill in label and message to generate badge.
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!customLabel.trim() || !customMessage.trim()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed text-slate-950 font-bold text-xs cursor-pointer transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Badge</span>
            </button>
          </div>
        </form>

        {/* Existing Custom Badges */}
        {config.customBadges && config.customBadges.length > 0 && (
          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
            {config.customBadges.map((cb) => {
              const url = `https://img.shields.io/badge/${encodeURIComponent(cb.label)}-${encodeURIComponent(cb.message)}-${cb.color}?style=${config.badgeStyle}${cb.logo ? `&logo=${encodeURIComponent(cb.logo)}` : ''}`;
              return (
                <div
                  key={cb.id}
                  className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800"
                >
                  <img src={url} alt={`${cb.label}: ${cb.message}`} className="h-5" />
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomBadge(cb.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 cursor-pointer transition"
                    title="Remove custom badge"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technologies (e.g. Rust, React, AWS, Docker, PyTorch)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Selected Count Indicator */}
          <div className="text-xs text-slate-400 font-mono self-center">
            {config.techBadges.length} selected
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {BADGE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition ${
                activeCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Currently Selected Badges Bar */}
      {config.techBadges.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Active Weaponry Preview:</span>
            <span className="text-[11px] text-slate-500">Click any badge to remove</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
            {config.techBadges.map((id) => {
              const badge = TECH_BADGES.find((b) => b.id === id);
              if (!badge) return null;
              return (
                <button
                  key={id}
                  onClick={() => toggleBadge(id)}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 text-[11px] hover:bg-red-950/60 hover:text-red-300 hover:border-red-500/40 border border-slate-700/80 cursor-pointer transition group"
                  title="Click to remove"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `#${badge.bgColor}` }} />
                  <span>{badge.name}</span>
                  <X className="w-3 h-3 text-slate-400 group-hover:text-red-400" />
                </button>
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
              className={`flex items-center justify-between p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
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
