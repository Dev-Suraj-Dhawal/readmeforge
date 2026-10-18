import React from 'react';
import { SocialLink, SupportPlatform } from '../../types';
import { Share2, Coffee, Heart, Globe, Plus, Trash2 } from 'lucide-react';

interface SocialsEditorProps {
  socials: SocialLink[];
  support: SupportPlatform[];
  onSocialsChange: (updated: SocialLink[]) => void;
  onSupportChange: (updated: SupportPlatform[]) => void;
}

export const SocialsEditor: React.FC<SocialsEditorProps> = ({
  socials,
  support,
  onSocialsChange,
  onSupportChange
}) => {
  const commonPlatforms = ['GitHub', 'LinkedIn', 'X / Twitter', 'Discord', 'YouTube', 'Dev.to', 'Medium'];

  const handleToggleSocial = (index: number) => {
    const updated = [...socials];
    updated[index].enabled = !updated[index].enabled;
    onSocialsChange(updated);
  };

  const handleUpdateSocialUrl = (index: number, url: string) => {
    const updated = [...socials];
    updated[index].url = url;
    onSocialsChange(updated);
  };

  const handleAddCustomSocial = () => {
    onSocialsChange([
      ...socials,
      { platform: 'Link', username: '', url: 'https://', enabled: true }
    ]);
  };

  const handleRemoveSocial = (index: number) => {
    onSocialsChange(socials.filter((_, i) => i !== index));
  };

  // Support
  const handleToggleSupport = (platform: SupportPlatform['platform']) => {
    const exists = support.find((s) => s.platform === platform);
    if (exists) {
      onSupportChange(
        support.map((s) => (s.platform === platform ? { ...s, enabled: !s.enabled } : s))
      );
    } else {
      onSupportChange([...support, { platform, username: '', enabled: true }]);
    }
  };

  const handleUpdateSupportUsername = (platform: SupportPlatform['platform'], username: string) => {
    onSupportChange(
      support.map((s) => (s.platform === platform ? { ...s, username } : s))
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Social Links */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>Social Links & Presence</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Add your social media channels with auto-styled modern badges.
            </p>
          </div>
          <button
            onClick={handleAddCustomSocial}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Link</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {socials.map((soc, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-center gap-3 transition ${
                soc.enabled
                  ? 'bg-slate-950/70 border-slate-700'
                  : 'bg-slate-950/30 border-slate-800/60 opacity-60'
              }`}
            >
              <input
                type="checkbox"
                checked={soc.enabled}
                onChange={() => handleToggleSocial(idx)}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
              />

              <div className="w-28">
                <span className="text-xs font-semibold text-white truncate block">
                  {soc.platform}
                </span>
              </div>

              <input
                type="text"
                value={soc.url}
                onChange={(e) => handleUpdateSocialUrl(idx, e.target.value)}
                placeholder={`https://${soc.platform.toLowerCase()}.com/username`}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />

              <button
                onClick={() => handleRemoveSocial(idx)}
                className="p-1 text-slate-500 hover:text-red-400 transition"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Support & Monetization */}
      <div className="pt-4 border-t border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
          <Coffee className="w-4 h-4 text-amber-400" />
          <span>Support & Sponsor Buttons</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Allow sponsors and users to fuel your open source journey.
        </p>

        <div className="space-y-3">
          {/* Buy Me a Coffee */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(support.find((s) => s.platform === 'buymeacoffee')?.enabled)}
                onChange={() => handleToggleSupport('buymeacoffee')}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
              />
              <span className="text-xs font-semibold text-white">☕ Buy Me A Coffee</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-mono">buymeacoffee.com/</span>
              <input
                type="text"
                value={support.find((s) => s.platform === 'buymeacoffee')?.username || ''}
                onChange={(e) => handleUpdateSupportUsername('buymeacoffee', e.target.value)}
                placeholder="yourusername"
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-amber-300 font-mono w-40"
              />
            </div>
          </div>

          {/* Ko-fi */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(support.find((s) => s.platform === 'kofi')?.enabled)}
                onChange={() => handleToggleSupport('kofi')}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
              />
              <span className="text-xs font-semibold text-white">❤️ Ko-fi</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-mono">ko-fi.com/</span>
              <input
                type="text"
                value={support.find((s) => s.platform === 'kofi')?.username || ''}
                onChange={(e) => handleUpdateSupportUsername('kofi', e.target.value)}
                placeholder="yourusername"
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-red-300 font-mono w-40"
              />
            </div>
          </div>

          {/* GitHub Sponsors */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(support.find((s) => s.platform === 'github')?.enabled)}
                onChange={() => handleToggleSupport('github')}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
              />
              <span className="text-xs font-semibold text-white">💖 GitHub Sponsors</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-mono">github.com/sponsors/</span>
              <input
                type="text"
                value={support.find((s) => s.platform === 'github')?.username || ''}
                onChange={(e) => handleUpdateSupportUsername('github', e.target.value)}
                placeholder="yourusername"
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-pink-300 font-mono w-40"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

