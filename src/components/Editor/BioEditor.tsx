import React from 'react';
import { ProfileConfig } from '../../types';
import { FileText, Quote, Sparkles } from 'lucide-react';

interface BioEditorProps {
  config: ProfileConfig;
  onChange: (updated: Partial<ProfileConfig>) => void;
}

export const BioEditor: React.FC<BioEditorProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>About Me & Narrative</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Share your daily dev activities, tech goals, what you are building, and an inspiring quote.
        </p>
      </div>

      <div className="space-y-4">
        {/* Working on */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>🔭 Currently working on</span>
          </label>
          <input
            type="text"
            value={config.workingOn}
            onChange={(e) => onChange({ workingOn: e.target.value })}
            placeholder="Autonomous AI agents, distributed storage engine, or next-gen Web3 protocol"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Learning */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>🌱 Currently learning</span>
          </label>
          <input
            type="text"
            value={config.learning}
            onChange={(e) => onChange({ learning: e.target.value })}
            placeholder="Rust async runtimes, eBPF kernel instrumentation, CUDA shaders"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Looking to collaborate on */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>👯 Looking to collaborate on</span>
          </label>
          <input
            type="text"
            value={config.collaborateOn}
            onChange={(e) => onChange({ collaborateOn: e.target.value })}
            placeholder="High-impact open source tools, developer utilities, indie products"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Ask me about */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>💬 Ask me about</span>
          </label>
          <input
            type="text"
            value={config.askMeAbout}
            onChange={(e) => onChange({ askMeAbout: e.target.value })}
            placeholder="React 19, TypeScript, Distributed consensus, Next.js, System Design"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* How to reach me */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>📫 How to reach me</span>
          </label>
          <input
            type="text"
            value={config.reachMe}
            onChange={(e) => onChange({ reachMe: e.target.value })}
            placeholder="dev@myemail.com or @myhandle on X/Twitter"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Fun fact */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>⚡ Fun fact</span>
          </label>
          <input
            type="text"
            value={config.funFact}
            onChange={(e) => onChange({ funFact: e.target.value })}
            placeholder="I drink 4 espressos a day and type at 135 WPM."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Quote Block */}
        <div className="pt-2">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Quote className="w-3.5 h-3.5 text-cyan-400" />
              <span>Inspiring Dev Quote / Motto</span>
            </div>
            <textarea
              rows={2}
              value={config.quote}
              onChange={(e) => onChange({ quote: e.target.value })}
              placeholder="Simplicity is prerequisite for reliability."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 italic"
            />
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium">Author:</span>
              <input
                type="text"
                value={config.quoteAuthor}
                onChange={(e) => onChange({ quoteAuthor: e.target.value })}
                placeholder="Edsger W. Dijkstra"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

