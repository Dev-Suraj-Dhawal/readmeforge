import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UI_THEMES, UIThemeItem } from '../../data/uiThemes';
import { X, Sparkles, Check, Palette, Search, Shuffle, Zap, Flame, Eye } from 'lucide-react';
import { cyberAudio } from '../../utils/audioFx';
import confetti from 'canvas-confetti';

interface ThemesVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeThemeId?: string;
  onApplyTheme: (theme: UIThemeItem) => void;
}

const CATEGORIES = [
  'All (21)',
  'Cyber & Hacker',
  'Pastel & Cozy',
  'Dark Modern',
  'Retro & Synth',
  'Minimalist',
  'Nature & Warm'
] as const;

export const ThemesVaultModal: React.FC<ThemesVaultModalProps> = ({
  isOpen,
  onClose,
  activeThemeId = 'matrix',
  onApplyTheme
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All (21)');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThemes = useMemo(() => {
    return UI_THEMES.filter((theme) => {
      const matchesCategory =
        selectedCategory === 'All (21)' || theme.category === selectedCategory;
      const matchesSearch =
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.vibe.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleApply = (theme: UIThemeItem) => {
    cyberAudio.playHarmonize();
    onApplyTheme(theme);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.2, x: 0.5 },
        colors: [theme.dotColor, theme.secondaryColor, '#ffffff']
      });
    } catch (e) {}

    onClose();
  };

  const handleRandomTheme = () => {
    cyberAudio.playSuccess();
    const randomIndex = Math.floor(Math.random() * UI_THEMES.length);
    const chosen = UI_THEMES[randomIndex];
    onApplyTheme(chosen);

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.2, x: 0.5 },
        colors: [chosen.dotColor, chosen.secondaryColor, '#ffffff']
      });
    } catch (e) {}

    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 350 }}
          className="relative w-full max-w-5xl rounded-3xl bg-[#090d16] border border-slate-800 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-fuchsia-500 p-[1.5px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#090d16] rounded-[14px] flex items-center justify-center">
                  <Palette className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Framer Studio // 21 Curated UI Themes
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
                    21 PRESETS
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Full ecosystem synchronization: live stats, typing banner, badges, avatars & widgets.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRandomTheme}
                title="Surprise me with a random theme"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-semibold cursor-pointer transition"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Random Theme</span>
              </motion.button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Controls: Search & Category Pills */}
          <div className="p-4 sm:px-6 sm:py-3.5 border-b border-slate-800/80 bg-slate-950/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search themes by name or vibe..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-medium">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      cyberAudio.playClick();
                      setSelectedCategory(category);
                    }}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of 21 Themes */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredThemes.map((theme, idx) => {
              const isCurrent = (activeThemeId || '').toLowerCase() === theme.id.toLowerCase();

              return (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02, duration: 0.2 }}
                  whileHover={{ y: -4, transition: { duration: 0.15 } }}
                  onClick={() => handleApply(theme)}
                  className={`relative p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between group overflow-hidden ${
                    isCurrent
                      ? 'bg-slate-900/90 border-cyan-400 shadow-xl shadow-cyan-500/15 ring-1 ring-cyan-400/80'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  {/* Glowing Top Edge Strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-all opacity-80 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, ${theme.dotColor}, ${theme.secondaryColor})`
                    }}
                  />

                  {/* Top Bar: Title & Swatch */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      {/* Dual Color Swatch Dot */}
                      <div className="relative flex items-center justify-center w-8 h-8 rounded-xl p-[1.5px] border border-white/10 shadow-sm shrink-0">
                        <div
                          className="w-full h-full rounded-[10px]"
                          style={{
                            background: `linear-gradient(135deg, ${theme.dotColor} 50%, ${theme.secondaryColor} 50%)`
                          }}
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {theme.name}
                          </h4>
                          {isCurrent && (
                            <span className="p-0.5 rounded-full bg-cyan-500 text-slate-950">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {theme.category}
                        </span>
                      </div>
                    </div>

                    <span
                      className="text-[9px] font-mono px-2 py-0.5 rounded-md font-bold uppercase border"
                      style={{
                        color: theme.dotColor,
                        borderColor: `${theme.dotColor}40`,
                        backgroundColor: `${theme.dotColor}15`
                      }}
                    >
                      #{theme.id}
                    </span>
                  </div>

                  {/* Vibe Description */}
                  <p className="text-[11px] text-slate-400 mb-3.5 line-clamp-2 leading-relaxed">
                    {theme.vibe}
                  </p>

                  {/* Live Mini Preview Bar */}
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.dotColor }} />
                      <span style={{ color: theme.dotColor }}>{theme.config.stats.statsTheme}</span>
                    </div>
                    <span className="text-slate-600">•</span>
                    <span>{theme.config.themeAesthetic}</span>
                    <span className="text-slate-600">•</span>
                    <span style={{ color: theme.secondaryColor }}>{theme.config.widgets.leetcodeTheme}</span>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(theme);
                    }}
                    className={`w-full py-1.5 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Active Theme</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3 h-3 text-cyan-400" />
                        <span>Apply Theme</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-3.5 sm:px-6 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-300">{filteredThemes.length}</strong> of 21 themes
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-cyan-400">
              ⚡ Powered by Framer Motion & Web Audio API
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

