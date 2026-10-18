import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  Layers, 
  Code2, 
  Eye, 
  RotateCcw, 
  HelpCircle,
  Share2,
  Terminal
} from 'lucide-react';
import { GithubIcon } from './Icons';
import confetti from 'canvas-confetti';

interface NavbarProps {
  activeTab: 'editor' | 'templates' | 'simulator' | 'raw';
  setActiveTab: (tab: 'editor' | 'templates' | 'simulator' | 'raw') => void;
  onCopyMarkdown: () => void;
  onDownloadMarkdown: () => void;
  onOpenGuide: () => void;
  onReset: () => void;
  githubUsername: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onCopyMarkdown,
  onDownloadMarkdown,
  onOpenGuide,
  onReset,
  githubUsername
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyMarkdown();
    setCopied(true);
    
    // Aesthetic celebratory confetti blast
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.1, x: 0.85 },
        colors: ['#00FF66', '#38BDF8', '#818CF8', '#F43F5E']
      });
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Readme<span className="text-cyan-400">Forge</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                Studio 2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Next-Gen Aesthetic GitHub Profile Architect
            </p>
          </div>
        </div>

        {/* Center Mode Switcher Tabs */}
        <nav className="flex items-center p-0.5 sm:p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-medium max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shrink-0 ${
              activeTab === 'editor'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shrink-0 ${
              activeTab === 'templates'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/20 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Templates</span>
            <span className="text-[9px] px-1 py-0.2 rounded-full bg-pink-500/20 text-pink-300 font-mono">6</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shrink-0 ${
              activeTab === 'simulator'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub <span className="hidden sm:inline">Profile</span></span>
          </button>

          <button
            onClick={() => setActiveTab('raw')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shrink-0 ${
              activeTab === 'raw'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Markdown</span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Guide Tutorial */}
          <button
            onClick={onOpenGuide}
            title="How to add to GitHub"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 transition"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Setup Guide</span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            title="Reset to defaults"
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Download README.md */}
          <button
            onClick={onDownloadMarkdown}
            title="Download README.md"
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-200 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/80 hover:bg-slate-700/80 transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span>Export .md</span>
          </button>

          {/* Instant Copy Markdown Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-lg transition-all shadow-md ${
              copied
                ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:brightness-110 shadow-cyan-500/25'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Copied .md!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy README</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};

