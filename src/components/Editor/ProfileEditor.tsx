import React, { useRef, useState } from 'react';
import { ProfileConfig } from '../../types';
import { 
  User, 
  MapPin, 
  Building, 
  Globe, 
  AtSign, 
  CheckCircle2, 
  Upload, 
  Link as LinkIcon, 
  Camera, 
  Sparkles, 
  RotateCcw,
  Sliders,
  Check
} from 'lucide-react';

interface ProfileEditorProps {
  config: ProfileConfig;
  onChange: (updated: Partial<ProfileConfig>) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ config, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMode, setUploadMode] = useState<'upload' | 'link'>('upload');

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP, GIF)');
      return;
    }

    // Maximum 5MB client-side check
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size is too large (max 5MB). Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        onChange({
          avatarUrl: dataUrl,
          showAvatarInReadme: true
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleUseGithubAvatar = () => {
    const username = config.githubUsername || 'Dev-Suraj-Dhawal';
    onChange({
      avatarUrl: `https://avatars.githubusercontent.com/u/195623319?v=4`,
      showAvatarInReadme: true
    });
  };

  const handleUseSurajPortrait = () => {
    onChange({
      avatarUrl: '/suraj-portrait.jpg',
      showAvatarInReadme: true
    });
  };

  const avatarDisplayShape =
    config.avatarShape === 'circle'
      ? 'rounded-full'
      : config.avatarShape === 'rounded'
      ? 'rounded-2xl'
      : 'rounded-lg';

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Profile Identity & Avatar Studio</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Upload your personal photo or paste any link. Changes dynamically update your README, GitHub profile simulator, and Holographic ASCII dot matrix!
        </p>
      </div>

      {/* Avatar Upload & Configuration Card */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>Profile Photo & Avatar</span>
          </span>
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
            <button
              onClick={() => setUploadMode('upload')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                uploadMode === 'upload' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Upload Local
            </button>
            <button
              onClick={() => setUploadMode('link')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                uploadMode === 'link' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Image Link
            </button>
          </div>
        </div>

        {/* Avatar Preview & Dropzone */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Active Image View */}
          <div className="relative group shrink-0">
            <div className={`w-28 h-28 ${avatarDisplayShape} overflow-hidden border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/20 bg-slate-900`}>
              <img
                src={config.avatarUrl || '/suraj-portrait.jpg'}
                alt={config.displayName || 'Profile Avatar'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/suraj-portrait.jpg';
                }}
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-semibold gap-1 rounded-full cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Change</span>
            </button>
          </div>

          {/* Action Zone */}
          <div className="flex-1 w-full space-y-3">
            {uploadMode === 'upload' ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition text-center flex flex-col items-center justify-center gap-1.5 ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/50 hover:bg-slate-900/80 text-slate-400'
                }`}
              >
                <Upload className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-semibold text-white">Click or Drag & Drop photo here</span>
                <span className="text-[11px] text-slate-500">Supports JPG, PNG, WebP up to 5MB</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileInputChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                  <LinkIcon className="w-3 h-3 text-cyan-400" />
                  <span>Direct Image / Web URL</span>
                </label>
                <input
                  type="text"
                  value={config.avatarUrl}
                  onChange={(e) => onChange({ avatarUrl: e.target.value.trim(), showAvatarInReadme: true })}
                  placeholder="https://example.com/my-photo.jpg"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-500 font-mono">Quick Set:</span>
              <button
                type="button"
                onClick={handleUseSurajPortrait}
                className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60 transition"
              >
                Suraj's Real Photo
              </button>
              <button
                type="button"
                onClick={handleUseGithubAvatar}
                className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                Fetch GitHub Avatar
              </button>
            </div>
          </div>
        </div>

        {/* Embed Avatar in README Controls */}
        <div className="pt-3 border-t border-slate-800/80 space-y-3">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(config.showAvatarInReadme)}
              onChange={(e) => onChange({ showAvatarInReadme: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
            <div>
              <span className="text-xs font-semibold text-white block">Embed Profile Picture in README Header</span>
              <span className="text-[11px] text-slate-400">Dynamically displays your photo centered at the top of your GitHub README.</span>
            </div>
          </label>

          {config.showAvatarInReadme && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6 pt-1">
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Avatar Shape in README</span>
                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'circle', label: 'Circle' },
                    { id: 'rounded', label: 'Rounded Square' },
                    { id: 'square', label: 'Square' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onChange({ avatarShape: s.id as any })}
                      className={`px-2.5 py-1 text-[11px] rounded-lg transition ${
                        (config.avatarShape || 'circle') === s.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Size: {config.avatarWidth || 160}px</span>
                <div className="flex items-center gap-1.5">
                  {[120, 160, 200].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => onChange({ avatarWidth: sz })}
                      className={`px-2.5 py-1 text-[11px] rounded-lg transition ${
                        (config.avatarWidth || 160) === sz
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {sz}px
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Details Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* GitHub Username */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <AtSign className="w-3.5 h-3.5 text-cyan-400" />
            <span>GitHub Username <span className="text-cyan-400">*</span></span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">github.com/</span>
            <input
              type="text"
              value={config.githubUsername}
              onChange={(e) => onChange({ githubUsername: e.target.value.trim() })}
              placeholder="Dev-Suraj-Dhawal"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-24 pr-4 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <span className="text-[11px] text-slate-500">
            Connects your real repositories, contribution streaks, language chart, and 3D trophies!
          </span>
        </div>

        {/* Display Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Display Name</label>
          <input
            type="text"
            value={config.displayName}
            onChange={(e) => onChange({ displayName: e.target.value })}
            placeholder="Suraj Dhawal"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Pronouns */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Pronouns</label>
          <input
            type="text"
            value={config.pronouns}
            onChange={(e) => onChange({ pronouns: e.target.value })}
            placeholder="he/him"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Headline */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-slate-300">Catchy Subtitle / Headline</label>
          <input
            type="text"
            value={config.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
            placeholder="Full-Stack Developer & Systems Architect // Building Scalable Software"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Company */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>Company / Role</span>
          </label>
          <input
            type="text"
            value={config.company}
            onChange={(e) => onChange({ company: e.target.value })}
            placeholder="Open Source Architect"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Location</span>
          </label>
          <input
            type="text"
            value={config.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="Nepal // Remote"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Personal Website */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>Personal Portfolio / Website</span>
          </label>
          <input
            type="text"
            value={config.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="https://surajdhawal.com.np/"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Available For Hire Toggle */}
        <div className="sm:col-span-2 pt-2">
          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              checked={config.availableForHire}
              onChange={(e) => onChange({ availableForHire: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-0 cursor-pointer"
            />
            <div>
              <span className="text-xs font-semibold text-white block">Display "Available for Hire" Badge</span>
              <span className="text-[11px] text-slate-400 block">Adds a glowing green status badge to your profile header.</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
