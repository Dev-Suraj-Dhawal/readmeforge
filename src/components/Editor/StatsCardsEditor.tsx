import React from 'react';
import { StatsConfig, BadgeStyle } from '../../types';
import { BarChart3, Flame, Trophy, Eye, CheckCircle2, Sliders, Palette } from 'lucide-react';

interface StatsCardsEditorProps {
  stats: StatsConfig;
  onChange: (updated: Partial<StatsConfig>) => void;
  username: string;
}

export const StatsCardsEditor: React.FC<StatsCardsEditorProps> = ({ stats, onChange, username }) => {
  const themes = [
    { id: 'radical', name: 'Radical (Neon Pink & Cyan)' },
    { id: 'tokyonight', name: 'Tokyo Night (Deep Indigo)' },
    { id: 'synthwave', name: 'Synthwave 84 (Vibrant Retro)' },
    { id: 'dark', name: 'Dark Mode (GitHub Classic)' },
    { id: 'dracula', name: 'Dracula (Purple & Green)' },
    { id: 'catppuccin_latte', name: 'Catppuccin Latte (Pastel Warm)' },
    { id: 'gruvbox', name: 'Gruvbox (Retro Earthy)' },
    { id: 'highcontrast', name: 'High Contrast (Pure Mono)' },
    { id: 'matrix', name: 'Matrix (Cybernetic Green)' }
  ];

  const trophyThemes = [
    { id: 'radical', name: 'Radical' },
    { id: 'matrix', name: 'Matrix' },
    { id: 'tokyonight', name: 'Tokyo Night' },
    { id: 'juicy', name: 'Juicy 3D Gold' },
    { id: 'dark', name: 'Dark' },
    { id: 'flat', name: 'Flat Minimal' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>Dynamic Stats & Milestone Widgets</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Auto-fetch your real-time GitHub commit count, streaks, language distribution, and 3D trophies for @{username || 'username'}.
        </p>
      </div>

      <div className="space-y-4">
        {/* Profile Views Counter */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-xs font-semibold text-white block">Profile Views Counter</span>
                <span className="text-[11px] text-slate-400">Shows live count of visitors viewing your GitHub README</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={stats.showProfileViews}
              onChange={(e) => onChange({ showProfileViews: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
          </div>

          {stats.showProfileViews && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-300 font-medium">Counter Badge Color</label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded border border-white/20 shrink-0"
                    style={{ backgroundColor: `#${stats.viewsColor.replace('#', '')}` }}
                  />
                  <input
                    type="text"
                    value={stats.viewsColor}
                    onChange={(e) => onChange({ viewsColor: e.target.value.replace('#', '') })}
                    className="w-28 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono text-cyan-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-300 font-medium">Badge Shape</label>
                <select
                  value={stats.viewsStyle}
                  onChange={(e) => onChange({ viewsStyle: e.target.value as BadgeStyle })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                >
                  <option value="for-the-badge">For the Badge</option>
                  <option value="flat-square">Flat Square</option>
                  <option value="flat">Flat</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* GitHub Stats Card */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-xs font-semibold text-white block">GitHub Readme Stats Card</span>
                <span className="text-[11px] text-slate-400">Total stars, commits, PRs, and calculated ranking</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={stats.showStatsCard}
              onChange={(e) => onChange({ showStatsCard: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
          </div>

          {stats.showStatsCard && (
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-medium">Card Color Theme</label>
                  <select
                    value={stats.statsTheme}
                    onChange={(e) => onChange({ statsTheme: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                  >
                    {themes.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={stats.showIcons}
                      onChange={(e) => onChange({ showIcons: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                    />
                    <span>Show Icons</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={stats.showRank}
                      onChange={(e) => onChange({ showRank: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                    />
                    <span>Show Rank</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={stats.hideBorder}
                      onChange={(e) => onChange({ hideBorder: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                    />
                    <span>Borderless</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GitHub Streak Stats */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <div>
                <span className="text-xs font-semibold text-white block">GitHub Contribution Streak Stats</span>
                <span className="text-[11px] text-slate-400">Current consecutive commit streak and longest streak records</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={stats.showStreak}
              onChange={(e) => onChange({ showStreak: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
          </div>

          {stats.showStreak && (
            <div className="pt-2 border-t border-slate-800/80">
              <label className="text-[11px] text-slate-300 font-medium block mb-1">Streak Theme</label>
              <select
                value={stats.streakTheme}
                onChange={(e) => onChange({ streakTheme: e.target.value })}
                className="w-full sm:w-1/2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
              >
                {themes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Top Languages Card */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <div>
                <span className="text-xs font-semibold text-white block">Top Languages Chart</span>
                <span className="text-[11px] text-slate-400">Most used programming languages across your public repositories</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={stats.showTopLangs}
              onChange={(e) => onChange({ showTopLangs: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
          </div>

          {stats.showTopLangs && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-300 font-medium">Languages Theme</label>
                <select
                  value={stats.topLangsTheme}
                  onChange={(e) => onChange({ topLangsTheme: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                >
                  {themes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-300 font-medium">Card Layout</label>
                <select
                  value={stats.topLangsLayout}
                  onChange={(e) => onChange({ topLangsLayout: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                >
                  <option value="compact">Compact Bars</option>
                  <option value="donut">Donut Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* 3D Trophies */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-xs font-semibold text-white block">3D GitHub Trophies</span>
                <span className="text-[11px] text-slate-400">Gamified trophies for stars, commits, PRs, and account age</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={stats.showTrophies}
              onChange={(e) => onChange({ showTrophies: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
          </div>

          {stats.showTrophies && (
            <div className="pt-2 border-t border-slate-800/80">
              <label className="text-[11px] text-slate-300 font-medium block mb-1">Trophies Theme</label>
              <select
                value={stats.trophiesTheme}
                onChange={(e) => onChange({ trophiesTheme: e.target.value })}
                className="w-full sm:w-1/2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
              >
                {trophyThemes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Contribution Snake Animation */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🐍</span>
              <div>
                <span className="text-xs font-semibold text-white block">Contribution Eating Snake Animation</span>
                <span className="text-[11px] text-slate-400">Animated retro arcade snake eating your contribution green dots</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={stats.showActivitySnake}
              onChange={(e) => onChange({ showActivitySnake: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

