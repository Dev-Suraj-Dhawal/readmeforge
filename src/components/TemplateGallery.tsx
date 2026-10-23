import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TEMPLATE_PRESETS } from '../data/templates';
import { TemplatePreset } from '../types';
import { Sparkles, ArrowRight, Eye, CheckCircle2, Shield, Flame, Terminal, Star } from 'lucide-react';
import { cyberAudio } from '../utils/audioFx';

interface TemplateGalleryProps {
  onSelectTemplate: (template: TemplatePreset) => void;
  activeTemplateId: string;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onSelectTemplate,
  activeTemplateId
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Cyberpunk', 'Minimalist', 'Lofi & Anime', 'Gamified 3D', 'AI & Data', 'Full-Stack'];

  const filteredTemplates = selectedCategory === 'All'
    ? TEMPLATE_PRESETS
    : TEMPLATE_PRESETS.filter((t) => t.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-8 mb-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Aesthetic Templates
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Crazy Aesthetic GitHub README Templates
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Pick from 6 signature high-end archetypes with animated typing banners, dynamic snake contribution matrices, 3D trophies, and glowing badges. One-click load into your editor, customize your details, and copy your instant markdown.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                cyberAudio.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Templates Grid with Framer Motion hover & spring */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, idx) => {
          const isActive = activeTemplateId === template.id;

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.25 }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
              className={`group relative flex flex-col rounded-2xl overflow-hidden bg-slate-900/80 border transition-all duration-300 shadow-xl ${
                isActive ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-cyan-500/15' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header Preview Area */}
              <div className={`h-40 p-5 bg-gradient-to-br ${template.previewGradient} relative flex flex-col justify-between overflow-hidden border-b border-slate-800/80`}>
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-cyan-300 border border-white/10">
                    {template.category}
                  </span>
                  {isActive && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>

                <div className="z-10">
                  <div className="text-xs text-slate-300 font-mono mb-1 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>@{template.config.githubUsername}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {template.title}
                  </h3>
                </div>

                {/* Decorative glow in background */}
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {template.subtitle}
                  </p>

                  {/* Highlights / Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Tech stack badges sample */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800/60">
                    <Shield className="w-3 h-3 text-slate-500" />
                    <span>{template.config.techBadges.length} Tech Badges</span>
                    <span>•</span>
                    <Flame className="w-3 h-3 text-amber-500" />
                    <span>Theme: {template.config.stats.statsTheme}</span>
                  </div>
                </div>

                {/* Action button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectTemplate(template)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 hover:bg-slate-700'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/20'
                  }`}
                >
                  <span>{isActive ? 'Current Active Template' : 'Use This Template'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

