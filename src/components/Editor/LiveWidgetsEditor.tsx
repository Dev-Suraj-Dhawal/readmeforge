import React from 'react';
import { LiveWidgetsConfig, DEFAULT_LIVE_WIDGETS } from '../../types';
import { Sparkles, Terminal, Code2, Quote, Smile, ExternalLink, RefreshCw, Clock } from 'lucide-react';

interface LiveWidgetsEditorProps {
  widgets?: LiveWidgetsConfig;
  onChange: (widgets: LiveWidgetsConfig) => void;
  githubUsername?: string;
}

const LEETCODE_THEMES = [
  { id: 'nord', label: 'Nord Ice' },
  { id: 'dark', label: 'GitHub Dark' },
  { id: 'forest', label: 'Emerald Forest' },
  { id: 'unicorn', label: 'Neon Unicorn' },
  { id: 'radical', label: 'Radical Cyber' },
  { id: 'dracula', label: 'Dracula Purple' },
  { id: 'light', label: 'Crisp Minimal' }
];

const QUOTE_THEMES = [
  { id: 'radical', label: 'Radical Cyber' },
  { id: 'tokyonight', label: 'Tokyo Night' },
  { id: 'solarized-dark', label: 'Solarized Dark' },
  { id: 'dracula', label: 'Dracula' },
  { id: 'nord', label: 'Nord Ice' },
  { id: 'github_dark', label: 'GitHub Dark' }
];

const JOKE_THEMES = [
  { id: 'dark', label: 'Classic Dark' },
  { id: 'radical', label: 'Radical Pink' },
  { id: 'dracula', label: 'Dracula Gothic' },
  { id: 'nightowl', label: 'Night Owl' },
  { id: 'matrix', label: 'Matrix Hacker' }
];

export const LiveWidgetsEditor: React.FC<LiveWidgetsEditorProps> = ({
  widgets = DEFAULT_LIVE_WIDGETS,
  onChange,
  githubUsername = 'your-username'
}) => {
  const currentWidgets = { ...DEFAULT_LIVE_WIDGETS, ...widgets };

  const update = (patch: Partial<LiveWidgetsConfig>) => {
    onChange({ ...currentWidgets, ...patch });
  };

  const leetUser = (currentWidgets.leetcodeUsername || githubUsername || 'your-username').trim();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="pb-3 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Dynamic Live Widgets</span>
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            AUTO-UPDATING CARDS
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Add live cloud-hosted cards that update automatically on your GitHub profile without running manual workflows.
        </p>
      </div>

      {/* WIDGET 1: LEETCODE STATS */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                LeetCode Performance Card
              </span>
              <span className="text-[11px] text-slate-400">
                Displays solved problems, easy/medium/hard breakdown & acceptance rate.
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={currentWidgets.showLeetCode}
              onChange={(e) => update({ showLeetCode: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        {currentWidgets.showLeetCode && (
          <div className="pt-2 border-t border-slate-800/80 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* LeetCode Username */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  LeetCode Username
                </label>
                <input
                  type="text"
                  value={currentWidgets.leetcodeUsername}
                  onChange={(e) => update({ leetcodeUsername: e.target.value })}
                  placeholder={githubUsername || 'username'}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* LeetCode Theme */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Card Theme
                </label>
                <select
                  value={currentWidgets.leetcodeTheme}
                  onChange={(e) => update({ leetcodeTheme: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {LEETCODE_THEMES.map((th) => (
                    <option key={th.id} value={th.id}>
                      {th.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Widget Live Visual Preview */}
            <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">LIVE WIDGET PREVIEW</span>
              <img
                src={`https://leetcard.jacoblin.cool/${encodeURIComponent(
                  leetUser
                )}?theme=${encodeURIComponent(
                  currentWidgets.leetcodeTheme || 'nord'
                )}&font=Fira+Code&ext=activity`}
                alt="LeetCode Stats Preview"
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>

      {/* WIDGET 2: DAILY DEV QUOTE */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Daily Dev Quotes Card
              </span>
              <span className="text-[11px] text-slate-400">
                Rotating daily inspiration from legendary computer scientists and philosophers.
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={currentWidgets.showDevQuote}
              onChange={(e) => update({ showDevQuote: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>

        {currentWidgets.showDevQuote && (
          <div className="pt-2 border-t border-slate-800/80 space-y-3 animate-fadeIn">
            <div className="space-y-1 max-w-xs">
              <label className="text-[11px] font-semibold text-slate-300">
                Card Theme
              </label>
              <select
                value={currentWidgets.quoteTheme}
                onChange={(e) => update({ quoteTheme: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {QUOTE_THEMES.map((th) => (
                  <option key={th.id} value={th.id}>
                    {th.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Widget Live Visual Preview */}
            <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">LIVE WIDGET PREVIEW</span>
              <img
                src={`https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${encodeURIComponent(
                  currentWidgets.quoteTheme || 'radical'
                )}`}
                alt="Dev Quote Preview"
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>

      {/* WIDGET 3: RANDOM DEV JOKES */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Smile className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Random Dev Jokes Card
              </span>
              <span className="text-[11px] text-slate-400">
                Clever programming humor that refreshes dynamically on profile visits.
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={currentWidgets.showDevJoke}
              onChange={(e) => update({ showDevJoke: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        {currentWidgets.showDevJoke && (
          <div className="pt-2 border-t border-slate-800/80 space-y-3 animate-fadeIn">
            <div className="space-y-1 max-w-xs">
              <label className="text-[11px] font-semibold text-slate-300">
                Card Theme
              </label>
              <select
                value={currentWidgets.jokeTheme}
                onChange={(e) => update({ jokeTheme: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {JOKE_THEMES.map((th) => (
                  <option key={th.id} value={th.id}>
                    {th.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Widget Live Visual Preview */}
            <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">LIVE WIDGET PREVIEW</span>
              <img
                src={`https://readme-jokes.vercel.app/api?theme=${encodeURIComponent(
                  currentWidgets.jokeTheme || 'dark'
                )}`}
                alt="Dev Joke Preview"
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>

      {/* WIDGET 4: WAKATIME WEEKLY CODING STATS */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                WakaTime Weekly Coding Stats
              </span>
              <span className="text-[11px] text-slate-400">
                Displays active hours spent in code editors, top languages, and daily velocity.
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(currentWidgets.showWakatime)}
              onChange={(e) => update({ showWakatime: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500"></div>
          </label>
        </div>

        {currentWidgets.showWakatime && (
          <div className="pt-2 border-t border-slate-800/80 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  WakaTime Username
                </label>
                <input
                  type="text"
                  value={currentWidgets.wakatimeUsername || ''}
                  onChange={(e) => update({ wakatimeUsername: e.target.value })}
                  placeholder={githubUsername || 'username'}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Card Theme
                </label>
                <select
                  value={currentWidgets.wakatimeTheme || 'radical'}
                  onChange={(e) => update({ wakatimeTheme: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {QUOTE_THEMES.map((th) => (
                    <option key={th.id} value={th.id}>
                      {th.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Widget Live Visual Preview */}
            <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">LIVE WAKATIME PREVIEW</span>
              <img
                src={`https://github-readme-stats.vercel.app/api/wakatime?username=${encodeURIComponent(
                  currentWidgets.wakatimeUsername || githubUsername || 'anuraghazra'
                )}&theme=${encodeURIComponent(
                  currentWidgets.wakatimeTheme || 'radical'
                )}&layout=compact`}
                alt="WakaTime Preview"
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

