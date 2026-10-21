import React from 'react';
import { SectionItem, SectionId, DEFAULT_SECTION_ORDER } from '../../types';
import { 
  ArrowUpDown, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Check, 
  Layers,
  Sparkles,
  BarChart3,
  Cpu,
  FileText,
  FolderGit2,
  Share2,
  Coffee,
  Quote,
  ShieldCheck
} from 'lucide-react';

interface SectionOrderEditorProps {
  sectionOrder?: SectionItem[];
  onChange: (newOrder: SectionItem[]) => void;
}

const SECTION_DESCRIPTIONS: Record<SectionId, { description: string; icon: React.FC<{ className?: string }> }> = {
  header: {
    description: 'Hero greeting, Cyber HUD enclosure, banner, and customized avatar',
    icon: Sparkles
  },
  views: {
    description: 'Komarev dynamic profile views counter and Available for Hire badge',
    icon: Eye
  },
  about: {
    description: 'Interactive bio bullets (working on, learning, ask me, fun facts)',
    icon: FileText
  },
  tech: {
    description: 'Visual category-grouped tech stack badges and arsenals',
    icon: Cpu
  },
  stats: {
    description: 'GitHub cards, commit streak tracker, top languages, and snake animation',
    icon: BarChart3
  },
  widgets: {
    description: 'Real-time LeetCode card, Daily Dev quotes, and coding jokes',
    icon: Layers
  },
  projects: {
    description: 'Featured project showcases with live demo links and tags',
    icon: FolderGit2
  },
  socials: {
    description: 'Social networking badges (GitHub, LinkedIn, X, Discord)',
    icon: Share2
  },
  support: {
    description: 'BuyMeACoffee, Ko-fi, and GitHub Sponsors badges',
    icon: Coffee
  },
  quote: {
    description: 'Inspirational developer philosophy or quote block',
    icon: Quote
  }
};

export const SectionOrderEditor: React.FC<SectionOrderEditorProps> = ({
  sectionOrder,
  onChange
}) => {
  // Safe fallback to default order
  const currentSections = React.useMemo(() => {
    if (!sectionOrder || sectionOrder.length === 0) {
      return DEFAULT_SECTION_ORDER;
    }
    // Fill in any sections that might be missing from an older saved state
    const existingIds = new Set(sectionOrder.map((s) => s.id));
    const missing = DEFAULT_SECTION_ORDER.filter((s) => !existingIds.has(s.id));
    return [...sectionOrder, ...missing];
  }, [sectionOrder]);

  const moveUp = (index: number) => {
    if (index <= 0) return;
    const updated = [...currentSections];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    onChange(updated);
  };

  const moveDown = (index: number) => {
    if (index >= currentSections.length - 1) return;
    const updated = [...currentSections];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    onChange(updated);
  };

  const toggleVisibility = (id: SectionId) => {
    const updated = currentSections.map((item) => {
      if (item.id === id) {
        return { ...item, enabled: !item.enabled };
      }
      return item;
    });
    onChange(updated);
  };

  const handleReset = () => {
    onChange(DEFAULT_SECTION_ORDER);
  };

  const handleShowAll = () => {
    onChange(currentSections.map((s) => ({ ...s, enabled: true })));
  };

  const handleMinimalMode = () => {
    // Keep essentials: header, tech, stats, projects, socials
    const essentials = new Set<SectionId>(['header', 'tech', 'stats', 'projects', 'socials']);
    onChange(
      currentSections.map((s) => ({
        ...s,
        enabled: essentials.has(s.id)
      }))
    );
  };

  const visibleCount = currentSections.filter((s) => s.enabled).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-cyan-400" />
            <span>Section Architecture & Ordering</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Rearrange the flow of your README with 1 click. Toggle visibility to craft minimalist or full-length profiles.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono font-medium">
            {visibleCount} of {currentSections.length} Active
          </span>
          <button
            onClick={handleReset}
            title="Reset layout to default order"
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Quick Action Presets */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleShowAll}
          className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition cursor-pointer flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Show All Sections</span>
        </button>
        <button
          onClick={handleMinimalMode}
          className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition cursor-pointer flex items-center gap-1.5"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Minimalist Clean Preset</span>
        </button>
      </div>

      {/* Sections List */}
      <div className="space-y-2.5">
        {currentSections.map((section, idx) => {
          const meta = SECTION_DESCRIPTIONS[section.id] || {
            description: 'Custom profile section',
            icon: Layers
          };
          const Icon = meta.icon;
          const isFirst = idx === 0;
          const isLast = idx === currentSections.length - 1;

          return (
            <div
              key={section.id}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                section.enabled
                  ? 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700 shadow-sm'
                  : 'bg-slate-950/40 border-slate-900/80 opacity-60'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <span className="w-6 text-center font-mono text-[11px] font-bold text-slate-500">
                  #{idx + 1}
                </span>

                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    section.enabled
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      : 'bg-slate-800/40 border-slate-800 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold truncate ${
                        section.enabled ? 'text-white' : 'text-slate-400 line-through'
                      }`}
                    >
                      {section.label}
                    </span>
                    {!section.enabled && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/60 border border-red-800/40 text-red-400 font-mono">
                        HIDDEN
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {meta.description}
                  </p>
                </div>
              </div>

              {/* Right Controls: Up, Down, Visibility Toggle */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Move Up */}
                <button
                  type="button"
                  disabled={isFirst}
                  onClick={() => moveUp(idx)}
                  title="Move section up"
                  className={`p-1.5 rounded-lg border transition ${
                    isFirst
                      ? 'opacity-25 cursor-not-allowed border-transparent text-slate-600'
                      : 'bg-slate-800/70 hover:bg-slate-700 border-slate-700/80 text-slate-300 hover:text-white cursor-pointer'
                  }`}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>

                {/* Move Down */}
                <button
                  type="button"
                  disabled={isLast}
                  onClick={() => moveDown(idx)}
                  title="Move section down"
                  className={`p-1.5 rounded-lg border transition ${
                    isLast
                      ? 'opacity-25 cursor-not-allowed border-transparent text-slate-600'
                      : 'bg-slate-800/70 hover:bg-slate-700 border-slate-700/80 text-slate-300 hover:text-white cursor-pointer'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Toggle Visibility */}
                <button
                  type="button"
                  onClick={() => toggleVisibility(section.id)}
                  title={section.enabled ? 'Hide this section' : 'Show this section'}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-xl border transition cursor-pointer ${
                    section.enabled
                      ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-300 hover:bg-emerald-900/40'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {section.enabled ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="hidden sm:inline">Visible</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                      <span className="hidden sm:inline">Hidden</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

