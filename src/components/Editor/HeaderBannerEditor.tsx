import React, { useState } from 'react';
import { ProfileConfig } from '../../types';
import { Sparkles, Plus, Trash2, Palette, Type, Image as ImageIcon, Scan } from 'lucide-react';
import { AsciiDotMatrix } from '../AsciiDotMatrix';

interface HeaderBannerEditorProps {
  config: ProfileConfig;
  onChange: (updated: Partial<ProfileConfig>) => void;
}

export const HeaderBannerEditor: React.FC<HeaderBannerEditorProps> = ({ config, onChange }) => {
  const [newLineText, setNewLineText] = useState('');

  const bannerTypes = [
    { id: 'ascii-dots', label: 'Holographic ASCII Dots', desc: 'Matrix green dot matrix portrait animation' },
    { id: 'typing', label: 'Animated Typing SVG', desc: 'Sleek typewriter animation of multiple roles/lines' },
    { id: 'wave', label: 'Dynamic Wave Banner', desc: 'Flowing animated gradient wave with your name' },
    { id: 'retro', label: 'Retro Capsule', desc: 'Smooth time-gradient capsule header' },
    { id: 'custom', label: 'Custom Image URL', desc: 'Use your own hosted header art or GIF' },
    { id: 'minimal', label: 'Minimalist Clean', desc: 'No decorative banner, pure typography' }
  ] as const;

  const colorPresets = [
    { label: 'Matrix Green', hex: '00FF66' },
    { label: 'Cyber Cyan', hex: '38BDF8' },
    { label: 'Neon Purple', hex: 'C084FC' },
    { label: 'Electric Pink', hex: 'F43F5E' },
    { label: 'Gold Amber', hex: 'F59E0B' },
    { label: 'Pure White', hex: 'FFFFFF' }
  ];

  const fonts = [
    { id: 'Fira+Code', name: 'Fira Code (Hacker Monospace)' },
    { id: 'Plus+Jakarta+Sans', name: 'Plus Jakarta Sans (Modern Clean)' },
    { id: 'Inter', name: 'Inter (Minimalist Swiss)' },
    { id: 'Press+Start+2P', name: 'Press Start 2P (8-Bit Arcade)' }
  ];

  const handleAddLine = () => {
    if (!newLineText.trim()) return;
    onChange({
      typingText: [...config.typingText, newLineText.trim()]
    });
    setNewLineText('');
  };

  const handleRemoveLine = (index: number) => {
    onChange({
      typingText: config.typingText.filter((_, i) => i !== index)
    });
  };

  const handleUpdateLine = (index: number, val: string) => {
    const updated = [...config.typingText];
    updated[index] = val;
    onChange({ typingText: updated });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Aesthetic Header & Animations</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Pick your header showcase style, animated typewriter lines, and custom color accents.
        </p>
      </div>

      {/* Banner Type Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Header Banner Style</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {bannerTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onChange({ bannerType: type.id })}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                config.bannerType === type.id
                  ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200 shadow-md shadow-cyan-500/10'
                  : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              <div className="font-semibold text-xs text-white">{type.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{type.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Banner URL */}
      {config.bannerType === 'custom' && (
        <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Custom Banner Image or GIF URL</span>
          </label>
          <input
            type="text"
            value={config.customBannerUrl || ''}
            onChange={(e) => onChange({ customBannerUrl: e.target.value })}
            placeholder="https://example.com/my-cool-aesthetic-banner.gif"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {/* Holographic ASCII Dot Matrix Preview */}
      {config.bannerType === 'ascii-dots' && (
        <div className="space-y-4 p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-2">
              <Scan className="w-3.5 h-3.5" />
              <span>Interactive ASCII Dot Matrix Hologram</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Active</span>
          </div>

          <AsciiDotMatrix
            imageSrc={config.avatarUrl || '/suraj-portrait.jpg'}
            dotColor={`#${config.typingColor.replace('#', '') || '00FF66'}`}
            className="my-2"
          />

          <p className="text-[11px] text-slate-400">
            This dot matrix animation transforms portrait pixels into responsive ASCII dot values with vertical laser scanning.
          </p>
        </div>
      )}

      {/* Animated Typing SVG Options */}
      {(config.bannerType === 'typing' || config.bannerType === 'ascii-dots') && (
        <div className="space-y-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Type className="w-3.5 h-3.5 text-cyan-400" />
              <span>Animated Typing Lines</span>
            </label>
            <span className="text-[11px] font-mono text-slate-400">{config.typingText.length} lines configured</span>
          </div>

          {/* Lines list */}
          <div className="space-y-2">
            {config.typingText.map((line, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-500 w-5 text-right">{idx + 1}.</span>
                <input
                  type="text"
                  value={line}
                  onChange={(e) => handleUpdateLine(idx, e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => handleRemoveLine(idx)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition"
                  title="Remove line"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add new line */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
            <input
              type="text"
              value={newLineText}
              onChange={(e) => setNewLineText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddLine()}
              placeholder="e.g. Building next-gen autonomous systems 🤖"
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleAddLine}
              className="px-3 py-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-semibold hover:bg-cyan-500/30 cursor-pointer transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {/* Font & Color Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80">
            {/* Font */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Typing Font</label>
              <select
                value={config.typingFont}
                onChange={(e) => onChange({ typingFont: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {fonts.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-slate-400" />
                <span>Typing Glow Color</span>
              </label>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md border border-white/20 shrink-0"
                  style={{ backgroundColor: `#${config.typingColor.replace('#', '')}` }}
                />
                <input
                  type="text"
                  value={config.typingColor}
                  onChange={(e) => onChange({ typingColor: e.target.value.replace('#', '') })}
                  placeholder="00FF66"
                  className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
                <div className="flex items-center gap-1">
                  {colorPresets.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => onChange({ typingColor: c.hex })}
                      title={c.label}
                      className="w-4 h-4 rounded-full border border-white/20 hover:scale-110 cursor-pointer transition"
                      style={{ backgroundColor: `#${c.hex}` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

