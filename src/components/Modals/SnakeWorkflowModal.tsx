import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Terminal, ExternalLink, Sparkles, FolderGit2 } from 'lucide-react';
import { cyberAudio } from '../../utils/audioFx';
import confetti from 'canvas-confetti';

interface SnakeWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export const SnakeWorkflowModal: React.FC<SnakeWorkflowModalProps> = ({
  isOpen,
  onClose,
  username
}) => {
  const [copied, setCopied] = useState(false);
  const cleanUser = username || '<your-username>';

  const workflowYaml = `name: Generate Contribution Snake Matrix

on:
  schedule:
    # Run automatically every 12 hours
    - cron: "0 */12 * * *"
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - name: Generate GitHub Contribution Snake SVG
        uses: Platane/snk@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: Deploy SVGs to Output Branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`;

  const handleCopy = () => {
    cyberAudio.playSuccess();
    navigator.clipboard.writeText(workflowYaml);
    setCopied(true);
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.3, x: 0.7 }
      });
    } catch (e) {}
    setTimeout(() => setCopied(false), 2200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 350 }}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#090d16] border border-slate-800 p-6 sm:p-7 shadow-2xl overflow-hidden z-10"
        >
        
        {/* Glow Ambient */}
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl">
              🐍
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Contribution Snake Automation Setup</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  GITHUB ACTIONS
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                1-Click setup to keep your contribution snake animation eating dots automatically.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4 pr-1 relative z-10">
          
          {/* 3 Simple Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
              <span className="font-mono text-cyan-400 font-bold block">STEP 1</span>
              <p className="text-slate-300">
                In your special repository <code className="text-cyan-300 font-mono">{cleanUser}</code>, create a new file:
              </p>
              <code className="text-[11px] font-mono text-slate-400 block bg-slate-950 p-1 rounded">
                .github/workflows/snake.yml
              </code>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
              <span className="font-mono text-cyan-400 font-bold block">STEP 2</span>
              <p className="text-slate-300">
                Paste the YAML workflow below and commit the file to your <code className="text-cyan-300 font-mono">main</code> branch.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
              <span className="font-mono text-cyan-400 font-bold block">STEP 3</span>
              <p className="text-slate-300">
                Go to Repo Settings → Actions → General → Workflow permissions → Select <strong>"Read and write permissions"</strong>.
              </p>
            </div>
          </div>

          {/* Workflow Code Block */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">.github/workflows/snake.yml</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 cursor-pointer transition font-semibold"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy YAML</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
              {workflowYaml}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 relative z-10 shrink-0">
          <span className="text-[11px] text-slate-500">
            Runs via official GitHub Actions free runner quota.
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition cursor-pointer flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Workflow YAML'}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  </AnimatePresence>
);
};

