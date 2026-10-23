import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileAuditResult } from '../../utils/profileAuditor';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Flame, 
  Target, 
  ShieldCheck,
  TrendingUp,
  Briefcase
} from 'lucide-react';

interface ProfileAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  audit: ProfileAuditResult;
  onNavigateTab: (tab: any) => void;
}

export const ProfileAuditModal: React.FC<ProfileAuditModalProps> = ({
  isOpen,
  onClose,
  audit,
  onNavigateTab
}) => {
  if (!isOpen) return null;

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (audit.totalScore / 100) * circumference;

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
        
        {/* Glow backdrop */}
        <div className="absolute -right-24 -top-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Close */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Award className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Profile Readiness & Recruiter Score</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  AUDIT
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Automated profile health, recruiter visibility & conversion analyzer.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-1 relative z-10">
          
          {/* Top Score Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-5 justify-between">
            {/* Circular Gauge */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Animated Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={audit.totalScore >= 90 ? '#10B981' : audit.totalScore >= 75 ? '#06B6D4' : '#F59E0B'}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white font-mono leading-none">
                  {audit.totalScore}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  / 100
                </span>
              </div>
            </div>

            {/* Score Summary & Grade */}
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`text-base font-extrabold ${audit.gradeColor}`}>
                  {audit.gradeTitle}
                </span>
                <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                  Grade: {audit.grade}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {audit.summary}
              </p>
              <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-center sm:justify-start gap-3">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <strong>{audit.passedCount}</strong> / {audit.totalCount} Checks Passed
                </span>
              </div>
            </div>
          </div>

          {/* Recruiter Insights Bar */}
          <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 text-xs flex items-start gap-3">
            <Briefcase className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-cyan-300 block">Recruiter Conversion Tip</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Hiring managers spend an average of 6 seconds skimming candidate GitHub profiles. An interactive 
                Cyber HUD terminal and live stats immediately establish senior technical authority.
              </p>
            </div>
          </div>

          {/* Checklist Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full Audit Checklist ({audit.items.length} Metrics)</span>
            </h3>

            <div className="space-y-2">
              {audit.items.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    item.passed
                      ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                      : 'bg-amber-950/10 border-amber-800/30 hover:border-amber-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0">
                      {item.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold truncate ${item.passed ? 'text-white' : 'text-amber-200'}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          +{item.score}/{item.maxScore} pts
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {item.tip}
                      </p>
                    </div>
                  </div>

                  {!item.passed && (
                    <button
                      type="button"
                      onClick={() => {
                        onNavigateTab(item.targetTab);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 cursor-pointer transition shrink-0 flex items-center gap-1"
                    >
                      <span>Fix</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 relative z-10 shrink-0">
          <span className="text-[11px] text-slate-500">
            Real-time score updates automatically as you build.
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
          >
            Got it, back to builder
          </motion.button>
        </div>
      </motion.div>
    </div>
  </AnimatePresence>
);
};

