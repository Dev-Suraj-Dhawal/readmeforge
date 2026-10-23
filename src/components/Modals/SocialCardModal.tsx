import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileConfig } from '../../types';
import { TECH_BADGES } from '../../data/techStackBadges';
import { X, Download, Copy, Check, Share2, Sparkles, Award, ExternalLink } from 'lucide-react';
import { cyberAudio } from '../../utils/audioFx';
import confetti from 'canvas-confetti';

interface SocialCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProfileConfig;
  score: number;
  grade: string;
}

export const SocialCardModal: React.FC<SocialCardModalProps> = ({
  isOpen,
  onClose,
  config,
  score,
  grade
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [isRendering, setIsRendering] = useState(true);

  const activeColor = config.typingColor ? `#${config.typingColor.replace('#', '')}` : '#00FF66';
  const username = config.githubUsername || 'developer';
  const name = (config.displayName || username).toUpperCase();
  const headline = config.headline || 'Full-Stack Software Architect // Open Source Builder';

  useEffect(() => {
    if (!isOpen) return;

    setIsRendering(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1200x630 High-Resolution OpenGraph dimensions
    canvas.width = 1200;
    canvas.height = 630;

    // Base background
    ctx.fillStyle = '#04080e';
    ctx.fillRect(0, 0, 1200, 630);

    // Glowing Ambient Radial Gradients
    const bgGrad1 = ctx.createRadialGradient(250, 200, 50, 250, 200, 500);
    bgGrad1.addColorStop(0, `${activeColor}22`);
    bgGrad1.addColorStop(1, 'rgba(4, 8, 14, 0)');
    ctx.fillStyle = bgGrad1;
    ctx.fillRect(0, 0, 1200, 630);

    const bgGrad2 = ctx.createRadialGradient(1000, 500, 40, 1000, 500, 400);
    bgGrad2.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
    bgGrad2.addColorStop(1, 'rgba(4, 8, 14, 0)');
    ctx.fillStyle = bgGrad2;
    ctx.fillRect(0, 0, 1200, 630);

    // CRT Scanlines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    for (let y = 0; y < 630; y += 4) {
      ctx.fillRect(0, y, 1200, 1.5);
    }

    // Outer Neon Border Frame
    ctx.strokeStyle = `${activeColor}88`;
    ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, 1144, 574);

    // Corner Accents
    const cornerSize = 24;
    ctx.fillStyle = activeColor;
    ctx.fillRect(28, 28, cornerSize, 4);
    ctx.fillRect(28, 28, 4, cornerSize);
    ctx.fillRect(1172 - cornerSize, 28, cornerSize, 4);
    ctx.fillRect(1168, 28, 4, cornerSize);
    ctx.fillRect(28, 598, cornerSize, 4);
    ctx.fillRect(28, 602 - cornerSize, 4, cornerSize);
    ctx.fillRect(1172 - cornerSize, 598, cornerSize, 4);
    ctx.fillRect(1168, 602 - cornerSize, 4, cornerSize);

    // Header Bar Text
    ctx.fillStyle = activeColor;
    ctx.font = 'bold 15px monospace';
    ctx.fillText('■■■ SYSTEM INTERFACE // VERIFIED DEVELOPER PASSPORT', 54, 68);

    ctx.fillStyle = '#64748B';
    ctx.font = '13px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`READ ME FORGE v2.0 • GITHUB: @${username}`, 1146, 68);
    ctx.textAlign = 'left';

    // Top Divider Line
    ctx.strokeStyle = `${activeColor}40`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(54, 85);
    ctx.lineTo(1146, 85);
    ctx.stroke();

    // Top 5-6 Tech Badges
    const techBadges = (config.techBadges && config.techBadges.length > 0)
      ? config.techBadges.slice(0, 6).map((id) => {
          const b = TECH_BADGES.find((x) => x.id === id);
          return b ? b.name : id;
        })
      : ['TypeScript', 'React', 'Node.js', 'Docker', 'AWS', 'PostgreSQL'];

    // Load and draw avatar
    const avatar = new Image();
    const isSuraj = !username || username.toLowerCase().includes('suraj') || username === 'your-username';
    const avatarSrc = config.avatarUrl && !config.avatarUrl.startsWith('data:')
      ? (config.avatarUrl.startsWith('/') ? '/suraj-portrait.jpg' : config.avatarUrl)
      : (!isSuraj ? `https://github.com/${username}.png` : '/suraj-portrait.jpg');

    if (!avatarSrc.startsWith('/') && !avatarSrc.startsWith('data:')) {
      avatar.crossOrigin = 'anonymous';
    }

    const renderContent = () => {
      // Left Column: Avatar Enclosure
      const ax = 75;
      const ay = 135;
      const aw = 190;

      // Glow behind avatar
      ctx.shadowColor = activeColor;
      ctx.shadowBlur = 25;
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(ax, ay, aw, aw);
      ctx.shadowBlur = 0;

      // Draw Avatar
      try {
        ctx.drawImage(avatar, ax + 6, ay + 6, aw - 12, aw - 12);
      } catch (e) {
        // Fallback procedural placeholder
        ctx.fillStyle = '#090d16';
        ctx.fillRect(ax + 6, ay + 6, aw - 12, aw - 12);
        ctx.fillStyle = activeColor;
        ctx.font = 'bold 36px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(name.slice(0, 2), ax + aw / 2, ay + aw / 2 + 12);
        ctx.textAlign = 'left';
      }

      // Avatar sub-label
      ctx.fillStyle = `${activeColor}bb`;
      ctx.font = '11px monospace';
      ctx.fillText('> portrait.svg // 100% verified', ax, ay + aw + 22);

      // Right Column: Identity details
      const tx = 310;
      let ty = 160;

      // Status Pill
      ctx.fillStyle = config.availableForHire ? '#10B98122' : '#0284C722';
      ctx.fillRect(tx, ty - 24, config.availableForHire ? 165 : 120, 26);
      ctx.strokeStyle = config.availableForHire ? '#10B98188' : '#0284C788';
      ctx.lineWidth = 1;
      ctx.strokeRect(tx, ty - 24, config.availableForHire ? 165 : 120, 26);

      ctx.fillStyle = config.availableForHire ? '#10B981' : '#38BDF8';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(config.availableForHire ? '● AVAILABLE FOR HIRE' : '● ACTIVE BUILDER', tx + 10, ty - 7);

      // Display Name
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 48px monospace';
      ctx.fillText(`${name}_`, tx, ty + 38);

      // Headline
      ctx.fillStyle = `${activeColor}ee`;
      ctx.font = '600 20px monospace';
      ctx.fillText(headline.length > 55 ? `${headline.slice(0, 52)}...` : headline, tx, ty + 78);

      // Location / Meta
      if (config.location || config.company) {
        ctx.fillStyle = '#94A3B8';
        ctx.font = '14px monospace';
        const meta = [config.location ? `📍 ${config.location}` : '', config.company ? `💼 ${config.company}` : ''].filter(Boolean).join('  •  ');
        ctx.fillText(meta, tx, ty + 112);
      }

      // Tech Stack Capsules
      let pillX = tx;
      const pillY = ty + 145;
      ctx.font = 'bold 13px monospace';

      techBadges.forEach((t) => {
        const text = `[ ${t} ]`;
        const metrics = ctx.measureText(text);
        const pw = metrics.width + 18;

        if (pillX + pw > 1130) return;

        ctx.fillStyle = `${activeColor}15`;
        ctx.fillRect(pillX, pillY - 18, pw, 28);
        ctx.strokeStyle = `${activeColor}55`;
        ctx.strokeRect(pillX, pillY - 18, pw, 28);

        ctx.fillStyle = activeColor;
        ctx.fillText(text, pillX + 9, pillY + 1);

        pillX += pw + 10;
      });

      // Bottom Metrics Cards Bar
      const bY = 480;

      // Card 1: Score & Tier
      ctx.fillStyle = '#090d16';
      ctx.fillRect(ax, bY, 320, 85);
      ctx.strokeStyle = '#1E293B';
      ctx.strokeRect(ax, bY, 320, 85);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px monospace';
      ctx.fillText('PROFILE READINESS AUDIT', ax + 18, bY + 28);

      ctx.fillStyle = score >= 90 ? '#10B981' : '#38BDF8';
      ctx.font = '900 28px monospace';
      ctx.fillText(`${score}%`, ax + 18, bY + 62);

      ctx.fillStyle = '#F8FAFC';
      ctx.font = 'bold 15px monospace';
      ctx.fillText(`GRADE: ${grade}-TIER`, ax + 95, bY + 60);

      // Card 2: Mission / Working on
      const cw = 746;
      ctx.fillStyle = '#090d16';
      ctx.fillRect(ax + 340, bY, cw, 85);
      ctx.strokeStyle = '#1E293B';
      ctx.strokeRect(ax + 340, bY, cw, 85);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px monospace';
      ctx.fillText('CURRENT MISSION OBJECTIVE', ax + 358, bY + 28);

      ctx.fillStyle = '#F8FAFC';
      ctx.font = '600 15px monospace';
      const missionText = config.workingOn || 'Secure APIs, high-scale SaaS products, creative developer tooling';
      ctx.fillText(missionText.length > 58 ? `${missionText.slice(0, 55)}...` : missionText, ax + 358, bY + 60);

      setIsRendering(false);
    };

    avatar.onload = renderContent;
    avatar.onerror = renderContent;
    avatar.src = avatarSrc;

    // Safety timeout in case image takes time
    const timer = setTimeout(renderContent, 800);
    return () => clearTimeout(timer);
  }, [isOpen, config, score, grade, activeColor]);

  const handleDownload = () => {
    cyberAudio.playSuccess();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${username}-developer-card.png`;
    a.click();

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.3, x: 0.5 }
      });
    } catch (e) {}
  };

  const handleCopy = async () => {
    cyberAudio.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    } catch (err) {
      alert('Clipboard write not supported in this browser. Please use Download PNG.');
    }
  };

  const handleShareTwitter = () => {
    cyberAudio.playSwitch();
    const text = encodeURIComponent(
      `Check out my new aesthetic GitHub profile architected with ReadmeForge Studio! ⚡\n\nhttps://github.com/${username}\n\n#GitHub #ReadmeForge #OpenSource #DevCommunity`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    cyberAudio.playSwitch();
    const url = encodeURIComponent(`https://github.com/${username}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
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
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#090d16] border border-slate-800 p-5 sm:p-7 shadow-2xl overflow-hidden z-10"
        >
        
        {/* Glow Ambient */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Developer Passport & Social Card</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  1200 x 630 HD
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                High-resolution OpenGraph preview card ready to share on Twitter/X, LinkedIn, or Discord.
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

        {/* Card Canvas Container */}
        <div className="flex-1 overflow-y-auto py-5 flex flex-col items-center justify-center relative z-10">
          <div className="w-full max-w-3xl rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#04080e]">
            <canvas
              ref={canvasRef}
              className="w-full h-auto block"
              style={{ aspectRatio: '1200 / 630' }}
            />
          </div>
          {isRendering && (
            <span className="text-xs text-slate-500 mt-2 font-mono animate-pulse">
              Synthesizing holographic canvas...
            </span>
          )}
        </div>

        {/* Actions Bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 relative z-10 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareTwitter}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Share on X</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </button>
            <button
              onClick={handleShareLinkedIn}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Share on LinkedIn</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Image</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download 1200x630 PNG</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  </AnimatePresence>
);
};

