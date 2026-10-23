import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, ExternalLink, Copy, Terminal } from 'lucide-react';
import { GithubIcon } from '../Icons';

interface GitHubGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export const GitHubGuideModal: React.FC<GitHubGuideModalProps> = ({
  isOpen,
  onClose,
  username
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'Create Your Special Repository',
      desc: (
        <>
          Go to{' '}
          <a
            href="https://github.com/new"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 font-mono underline inline-flex items-center gap-1"
          >
            github.com/new <ExternalLink className="w-3 h-3" />
          </a>
          . Name the repository exactly the same as your GitHub username:{' '}
          <code className="text-cyan-300 font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
            {username || '<your-username>'}
          </code>
          .
        </>
      ),
      tip: 'GitHub will display a secret banner: "✨ You found a secret! This is a special repository..."'
    },
    {
      num: '02',
      title: 'Make it Public & Add README',
      desc: 'Set the repository visibility to Public. Check the box "Add a README file" if prompted, then click "Create repository".',
      tip: 'The repository MUST be public for your profile to display it to everyone.'
    },
    {
      num: '03',
      title: 'Paste Your Generated Markdown',
      desc: 'In ReadmeForge, click the "Copy README" button in the top right. Open the README.md in your new GitHub repository, click the pencil edit icon, select all existing text, and paste your new markdown.',
      tip: 'Preview it directly on GitHub to verify all animated badges & stats cards are fetching.'
    },
    {
      num: '04',
      title: 'Commit Changes & Enjoy!',
      desc: 'Scroll down and click "Commit changes...". Visit your GitHub profile page to see your insane new aesthetic profile!',
      tip: 'Your animated typing banner and stats update dynamically on every visit.'
    }
  ];

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
          className="relative w-full max-w-2xl rounded-3xl bg-[#090d16] border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden z-10"
        >
        {/* Glow backdrop */}
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <GithubIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>How to Apply to Your GitHub Profile</span>
            </h2>
            <p className="text-xs text-slate-400">
              4 simple steps to make your profile look insane in under 60 seconds
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((s, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-4">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 px-2 py-1 rounded-lg shrink-0">
                {s.num}
              </span>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">{s.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                <div className="text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800/60 font-mono mt-2">
                  💡 {s.tip}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://github.com/new"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 flex items-center gap-1.5 transition"
          >
            <span>Open GitHub.com/new</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-xs font-bold hover:brightness-110 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
          >
            Got it, Let's Build!
          </motion.button>
        </div>
      </motion.div>
    </div>
  </AnimatePresence>
);
};

