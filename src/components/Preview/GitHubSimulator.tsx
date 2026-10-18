import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ProfileConfig } from '../../types';
import { 
  BookOpen, 
  FolderGit2, 
  Boxes, 
  Star, 
  MapPin, 
  Building, 
  Link as LinkIcon, 
  Users, 
  Pencil, 
  Smile,
  Moon,
  Sun,
  Laptop
} from 'lucide-react';

interface GitHubSimulatorProps {
  config: ProfileConfig;
  markdown: string;
}

export const GitHubSimulator: React.FC<GitHubSimulatorProps> = ({ config, markdown }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const username = config.githubUsername || 'your-username';
  const displayName = config.displayName || username;
  const avatarUrl =
    config.avatarUrl ||
    `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80`;

  // Realistic mock contributions grid for simulation
  const contributionWeeks = Array.from({ length: 50 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const val = (w * 7 + d * 13) % 5;
      return val;
    })
  );

  const getHeatmapColor = (level: number) => {
    if (theme === 'dark') {
      switch (level) {
        case 0: return '#161b22';
        case 1: return '#0e4429';
        case 2: return '#006d32';
        case 3: return '#26a641';
        case 4: return '#39d353';
        default: return '#161b22';
      }
    } else {
      switch (level) {
        case 0: return '#ebedf0';
        case 1: return '#9be9a8';
        case 2: return '#40c463';
        case 3: return '#30a14e';
        case 4: return '#216e39';
        default: return '#ebedf0';
      }
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`w-full rounded-2xl overflow-hidden border transition-all ${
      isDark 
        ? 'bg-[#0d1117] text-[#e6edf3] border-[#30363d]' 
        : 'bg-[#ffffff] text-[#1f2328] border-[#d0d7de]'
    }`}>
      {/* Top GitHub Simulator Controls Bar */}
      <div className={`px-4 py-2.5 flex items-center justify-between border-b text-xs ${
        isDark ? 'bg-[#161b22] border-[#30363d] text-slate-400' : 'bg-[#f6f8fa] border-[#d0d7de] text-slate-600'
      }`}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-[11px] ml-2 font-medium">
            github.com/{username}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px]">Simulator Mode:</span>
          <button
            onClick={() => setTheme('dark')}
            className={`p-1.5 rounded-md flex items-center gap-1 ${
              isDark ? 'bg-[#30363d] text-white' : 'hover:bg-slate-200 text-slate-600'
            }`}
            title="GitHub Dark Mode"
          >
            <Moon className="w-3 h-3" />
            <span className="text-[10px]">Dark</span>
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`p-1.5 rounded-md flex items-center gap-1 ${
              !isDark ? 'bg-slate-300 text-slate-900' : 'hover:bg-[#30363d] text-slate-400'
            }`}
            title="GitHub Light Mode"
          >
            <Sun className="w-3 h-3" />
            <span className="text-[10px]">Light</span>
          </button>
        </div>
      </div>

      {/* GitHub Secondary Tab Navigation */}
      <div className={`px-4 sm:px-8 border-b ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'}`}>
        <div className="flex items-center gap-6 overflow-x-auto text-xs font-medium">
          <div className={`flex items-center gap-2 py-3 border-b-2 font-semibold ${
            isDark ? 'border-[#f78166] text-[#e6edf3]' : 'border-[#fd8c73] text-[#1f2328]'
          }`}>
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Overview</span>
          </div>

          <div className="flex items-center gap-2 py-3 text-slate-400 hover:text-slate-200 cursor-pointer">
            <FolderGit2 className="w-4 h-4" />
            <span>Repositories</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              isDark ? 'bg-[#30363d] text-slate-300' : 'bg-[#afb8c1]/20 text-slate-700'
            }`}>
              34
            </span>
          </div>

          <div className="flex items-center gap-2 py-3 text-slate-400 hover:text-slate-200 cursor-pointer">
            <Boxes className="w-4 h-4" />
            <span>Projects</span>
          </div>

          <div className="flex items-center gap-2 py-3 text-slate-400 hover:text-slate-200 cursor-pointer">
            <Star className="w-4 h-4" />
            <span>Stars</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              isDark ? 'bg-[#30363d] text-slate-300' : 'bg-[#afb8c1]/20 text-slate-700'
            }`}>
              128
            </span>
          </div>
        </div>
      </div>

      {/* GitHub Profile Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: User Profile Info */}
          <div className="md:col-span-4 lg:col-span-3 space-y-4">
            {/* Avatar & Status */}
            <div className="relative inline-block w-40 sm:w-56 md:w-full max-w-[260px]">
              <img
                src={avatarUrl}
                alt={displayName}
                className={`w-full aspect-square rounded-full object-cover border-2 ${
                  isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'
                }`}
              />
              <div className={`absolute bottom-2 right-2 p-1.5 rounded-full border shadow-md flex items-center justify-center ${
                isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-[#d0d7de]'
              }`}>
                <Smile className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Names & Pronouns */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                {displayName}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-base font-light font-mono ${isDark ? 'text-[#7d8590]' : 'text-[#656d76]'}`}>
                  {username}
                </span>
                {config.pronouns && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isDark ? 'bg-[#21262d] text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {config.pronouns}
                  </span>
                )}
              </div>
            </div>

            {/* Headline Bio */}
            {config.headline && (
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#e6edf3]' : 'text-[#1f2328]'}`}>
                {config.headline}
              </p>
            )}

            {/* Edit Profile Button Mock */}
            <button className={`w-full py-1.5 text-xs font-semibold rounded-md border text-center transition ${
              isDark
                ? 'bg-[#21262d] border-[#30363d] text-slate-200 hover:bg-[#30363d]'
                : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f] hover:bg-[#ebedf0]'
            }`}>
              Edit profile
            </button>

            {/* Followers / Following */}
            <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-[#7d8590]' : 'text-[#656d76]'}`}>
              <Users className="w-4 h-4" />
              <span className="font-semibold text-slate-200">412</span> followers ·
              <span className="font-semibold text-slate-200">188</span> following
            </div>

            {/* Meta Attributes */}
            <div className={`space-y-1.5 text-xs pt-2 border-t ${
              isDark ? 'border-[#30363d] text-[#7d8590]' : 'border-[#d0d7de] text-[#656d76]'
            }`}>
              {config.company && (
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{config.company}</span>
                </div>
              )}
              {config.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{config.location}</span>
                </div>
              )}
              {config.website && (
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-3.5 h-3.5" />
                  <a href={config.website} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline truncate">
                    {config.website.replace('https://', '')}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: README.md Container & Pinned Repos */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            
            {/* The Special GitHub README Container */}
            <div className={`rounded-lg border overflow-hidden shadow-sm ${
              isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-[#ffffff] border-[#d0d7de]'
            }`}>
              {/* README Header Bar */}
              <div className={`px-4 py-2.5 flex items-center justify-between border-b text-xs font-mono ${
                isDark ? 'bg-[#161b22] border-[#30363d] text-[#7d8590]' : 'bg-[#f6f8fa] border-[#d0d7de] text-[#656d76]'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-400">{username}</span>
                  <span>/</span>
                  <span className="text-[11px] font-bold text-white">README.md</span>
                </div>

                <div className="flex items-center gap-2">
                  <Pencil className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Rendered README Markdown Content */}
              <div className="p-6 sm:p-8 overflow-x-auto markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    img: ({ node, ...props }) => (
                      <img {...props} className="inline-block max-w-full my-1 mr-1.5 rounded align-middle" alt={props.alt || ''} loading="lazy" decoding="async" />
                    ),
                    a: ({ node, ...props }) => (
                      <a {...props} className="text-[#58a6ff] hover:underline" target="_blank" rel="noreferrer" />
                    )
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>

            {/* Pinned Repositories Mock Section */}
            {config.projects && config.projects.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Pinned Repositories
                  </h4>
                  <span className="text-[11px] text-cyan-400 hover:underline cursor-pointer">Customize pins</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {config.projects.slice(0, 4).map((proj) => (
                    <div
                      key={proj.id}
                      className={`p-3.5 rounded-lg border text-xs flex flex-col justify-between gap-3 ${
                        isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-white border-[#d0d7de]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-cyan-400 hover:underline cursor-pointer">
                            {proj.title}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full border ${
                            isDark ? 'border-[#30363d] text-slate-400' : 'border-[#d0d7de] text-slate-600'
                          }`}>
                            Public
                          </span>
                        </div>
                        <p className={`text-[11px] line-clamp-2 ${isDark ? 'text-[#7d8590]' : 'text-[#656d76]'}`}>
                          {proj.description}
                        </p>
                      </div>

                      <div className={`flex items-center gap-4 text-[11px] ${
                        isDark ? 'text-[#7d8590]' : 'text-[#656d76]'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                          <span>{proj.tech[0] || 'TypeScript'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          <span>{proj.stars || 142}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contribution Activity Graph Mock */}
            <div className={`p-4 rounded-lg border ${
              isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-white border-[#d0d7de]'
            }`}>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold">
                  1,842 contributions in the last year
                </span>
                <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Contribution settings
                </span>
              </div>

              {/* Heatmap grid */}
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-[3px] min-w-[680px]">
                  {contributionWeeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((level, dIdx) => (
                        <div
                          key={dIdx}
                          style={{ backgroundColor: getHeatmapColor(level) }}
                          className="w-[10px] h-[10px] rounded-[2px]"
                          title={`${level * 3} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-1.5 mt-2 text-[10px] text-slate-500">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <div
                    key={lvl}
                    style={{ backgroundColor: getHeatmapColor(lvl) }}
                    className="w-[10px] h-[10px] rounded-[2px]"
                  />
                ))}
                <span>More</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

