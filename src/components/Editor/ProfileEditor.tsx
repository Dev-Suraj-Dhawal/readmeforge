import React, { useRef, useState, useCallback } from 'react';
import { ProfileConfig } from '../../types';
import { optimizeAvatarImage } from '../../utils/imageOptimizer';
import { 
  User, 
  MapPin, 
  Building, 
  Globe, 
  AtSign, 
  Upload, 
  Link as LinkIcon, 
  Camera, 
  Sparkles, 
  Sliders,
  Check,
  RefreshCw,
  Palette,
  Shield,
  Download
} from 'lucide-react';

interface ProfileEditorProps {
  config: ProfileConfig;
  onChange: (updated: Partial<ProfileConfig>) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ config, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMode, setUploadMode] = useState<'upload' | 'link'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAdvancedTuning, setShowAdvancedTuning] = useState(false);

  // Current values with robust fallbacks
  const currentShape = config.avatarShape || 'circle';
  const currentStyle = config.avatarStyle || 'crisp';
  const currentBorderColor = config.avatarBorderColor || '#00FF66';
  const currentBorderWidth = typeof config.avatarBorderWidth === 'number' ? config.avatarBorderWidth : 3;
  const currentZoom = config.avatarZoom || 1.0;
  const currentPanX = config.avatarPanX || 0;
  const currentPanY = config.avatarPanY || 0;
  const rawSource = config.avatarRawSource || config.avatarUrl || '/suraj-portrait.jpg';

  // Process & Optimize Image dynamically in milliseconds
  const triggerImageOptimization = useCallback(async (
    source: File | string,
    overrides?: {
      shape?: ProfileConfig['avatarShape'];
      style?: ProfileConfig['avatarStyle'];
      zoom?: number;
      panX?: number;
      panY?: number;
      borderColor?: string;
      borderWidth?: number;
    }
  ) => {
    setIsProcessing(true);
    try {
      const shape = overrides?.shape !== undefined ? overrides.shape : currentShape;
      const style = overrides?.style !== undefined ? overrides.style : currentStyle;
      const zoom = overrides?.zoom !== undefined ? overrides.zoom : currentZoom;
      const panX = overrides?.panX !== undefined ? overrides.panX : currentPanX;
      const panY = overrides?.panY !== undefined ? overrides.panY : currentPanY;
      const borderColor = overrides?.borderColor !== undefined ? overrides.borderColor : currentBorderColor;
      const borderWidth = overrides?.borderWidth !== undefined ? overrides.borderWidth : currentBorderWidth;

      const optimizedDataUrl = await optimizeAvatarImage(source, {
        shape,
        style,
        zoom,
        panX,
        panY,
        borderColor,
        borderWidth,
        outputSize: 512
      });

      const updates: Partial<ProfileConfig> = {
        avatarUrl: optimizedDataUrl,
        showAvatarInReadme: true,
        avatarShape: shape,
        avatarStyle: style,
        avatarZoom: zoom,
        avatarPanX: panX,
        avatarPanY: panY,
        avatarBorderColor: borderColor,
        avatarBorderWidth: borderWidth
      };

      if (typeof source === 'string') {
        updates.avatarRawSource = source;
      }

      onChange(updates);
    } catch (err) {
      console.warn('Image optimization fallback:', err);
      if (typeof source === 'string') {
        onChange({
          avatarUrl: source,
          avatarRawSource: source,
          showAvatarInReadme: true,
          ...overrides
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }, [
    currentShape,
    currentStyle,
    currentZoom,
    currentPanX,
    currentPanY,
    currentBorderColor,
    currentBorderWidth,
    onChange
  ]);

  // Handle local file upload
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP, GIF)');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      alert('File is too large (max 15MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const resultStr = e.target?.result as string;
      if (resultStr) {
        onChange({
          avatarRawSource: resultStr,
          avatarUrl: resultStr,
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
    const ghUrl = `https://avatars.githubusercontent.com/u/195623319?v=4`;
    onChange({
      avatarUrl: ghUrl,
      avatarRawSource: ghUrl,
      showAvatarInReadme: true
    });
  };

  const handleUseSurajPortrait = () => {
    onChange({
      avatarUrl: '/suraj-portrait.jpg',
      avatarRawSource: '/suraj-portrait.jpg',
      showAvatarInReadme: true
    });
  };

  const handleShapeChange = (shape: ProfileConfig['avatarShape']) => {
    onChange({ avatarShape: shape });
  };

  const handleStyleChange = (style: ProfileConfig['avatarStyle']) => {
    onChange({ avatarStyle: style });
  };

  const handleColorChange = (borderColor: string) => {
    onChange({ avatarBorderColor: borderColor });
  };

  const handleBorderWidthChange = (borderWidth: number) => {
    onChange({ avatarBorderWidth: borderWidth });
  };

  const handleZoomChange = (zoom: number) => {
    onChange({ avatarZoom: zoom });
  };

  const handlePanChange = (panX: number, panY: number) => {
    onChange({ avatarPanX: panX, avatarPanY: panY });
  };

  const handleDownloadOptimizedImage = async () => {
    const src = config.avatarRawSource || config.avatarUrl || '/suraj-portrait.jpg';
    setIsProcessing(true);
    try {
      const optimized = await optimizeAvatarImage(src, {
        shape: currentShape,
        style: currentStyle,
        zoom: currentZoom,
        panX: currentPanX,
        panY: currentPanY,
        borderColor: currentBorderColor,
        borderWidth: currentBorderWidth,
        outputSize: 512
      });
      const a = document.createElement('a');
      a.href = optimized;
      a.download = `${config.githubUsername || 'avatar'}-${currentShape}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to export avatar image', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Instant CSS mapping functions for 0ms sub-millisecond responsiveness
  const getShapeStyle = (shape: string) => {
    switch (shape) {
      case 'circle': return { borderRadius: '50%' };
      case 'squircle': return { borderRadius: '26%' };
      case 'square': return { borderRadius: '14px' };
      case 'diamond': return { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' };
      case 'hexagon': return { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' };
      default: return { borderRadius: '50%' };
    }
  };

  const getFilterStyle = (style: string) => {
    switch (style) {
      case 'cyber-glow': return 'saturate(1.35) contrast(1.15)';
      case 'matrix-green': return 'sepia(1) hue-rotate(80deg) saturate(2.5) contrast(1.2)';
      case 'monochrome': return 'grayscale(1) contrast(1.2)';
      case 'synthwave': return 'saturate(1.5) hue-rotate(295deg) contrast(1.2)';
      case 'crisp': default: return 'contrast(1.06) brightness(1.02) saturate(1.05)';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Profile Identity & Avatar Studio</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Upload any photo or paste an image URL. Instant client-side optimization formats your avatar with custom shapes, HD clarity filters, glowing rings, and responsive README integration.
        </p>
      </div>

      {/* Modern Avatar Studio Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#090e17] border border-slate-800 shadow-xl space-y-5">
        
        {/* Header Toggle (Upload vs URL) */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>Profile Photo & Shape Studio</span>
            {isProcessing && (
              <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Optimizing...
              </span>
            )}
          </span>

          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
            <button
              type="button"
              onClick={() => setUploadMode('upload')}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition ${
                uploadMode === 'upload' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Upload Local
            </button>
            <button
              type="button"
              onClick={() => setUploadMode('link')}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition ${
                uploadMode === 'link' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Image Link
            </button>
          </div>
        </div>

        {/* Studio Workspace: Visual Preview + Controls */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Active Image View with Live Styled Border & Glow */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="relative group p-1">
              <div 
                className="w-32 h-32 overflow-hidden bg-slate-950 flex items-center justify-center transition-all duration-150"
                style={{
                  ...getShapeStyle(currentShape),
                  border: currentBorderWidth > 0 ? `${currentBorderWidth}px solid ${currentBorderColor}` : 'none',
                  boxShadow: currentBorderWidth > 0 ? `0 0 25px ${currentBorderColor}66` : 'none'
                }}
              >
                <img
                  src={config.avatarUrl || '/suraj-portrait.jpg'}
                  alt={config.displayName || 'Profile Avatar'}
                  className="w-full h-full object-cover transition-transform duration-150"
                  style={{
                    filter: getFilterStyle(currentStyle),
                    transform: `scale(${currentZoom}) translate(${currentPanX * 15}px, ${currentPanY * 15}px)`
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/suraj-portrait.jpg';
                  }}
                />

                {isProcessing && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-semibold gap-1 rounded-2xl cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={handleDownloadOptimizedImage}
                title="Download this styled avatar PNG"
                className="text-[10px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition"
              >
                <Download className="w-3 h-3" />
                <span>Save PNG</span>
              </button>
            </div>
          </div>

          {/* Upload / Link Zone */}
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
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 text-slate-400'
                }`}
              >
                <Upload className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-semibold text-white">Click or Drag & Drop photo here</span>
                <span className="text-[11px] text-slate-500">
                  Instant client-side optimization • JPG, PNG, WebP up to 15MB
                </span>
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={typeof rawSource === 'string' && !rawSource.startsWith('data:') ? rawSource : ''}
                    onChange={(e) => {
                      const url = e.target.value.trim();
                      if (url) {
                        onChange({
                          avatarUrl: url,
                          avatarRawSource: url,
                          showAvatarInReadme: true
                        });
                        triggerImageOptimization(url, {});
                      }
                    }}
                    placeholder="https://example.com/my-photo.jpg"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-500 font-mono">Quick Set:</span>
              <button
                type="button"
                onClick={handleUseSurajPortrait}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60 cursor-pointer transition"
              >
                Suraj's Real Photo
              </button>
              <button
                type="button"
                onClick={handleUseGithubAvatar}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer transition"
              >
                Fetch GitHub Avatar
              </button>
            </div>
          </div>
        </div>

        {/* 1. SHAPE SELECTOR */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Avatar Shape</span>
            </span>
            <span className="text-[11px] text-slate-500 capitalize">Active: {currentShape}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'circle', label: 'Circle', icon: '⭕' },
              { id: 'squircle', label: 'Squircle', icon: '🔲' },
              { id: 'hexagon', label: 'Hexagon', icon: '⬡' },
              { id: 'square', label: 'Square', icon: '⏹' },
              { id: 'diamond', label: 'Diamond', icon: '🔷' }
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleShapeChange(s.id as any)}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition ${
                  currentShape === s.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. STYLE / FILTER STUDIO */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Clarity & Aesthetic Filter</span>
            </span>
            <span className="text-[11px] text-slate-500 capitalize">Active: {currentStyle}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'crisp', label: 'Studio HD', desc: 'Flawless clarity' },
              { id: 'cyber-glow', label: 'Cyber Glow', desc: 'Neon vibrance' },
              { id: 'matrix-green', label: 'Matrix', desc: 'Tech green tint' },
              { id: 'monochrome', label: 'Monochrome', desc: 'Pro B&W' },
              { id: 'synthwave', label: 'Synthwave', desc: 'Sunset pop' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleStyleChange(f.id as any)}
                className={`p-2 rounded-xl text-left transition flex flex-col justify-between cursor-pointer ${
                  currentStyle === f.id
                    ? 'bg-purple-950/40 text-purple-200 border border-purple-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span className="text-xs font-semibold">{f.label}</span>
                <span className="text-[10px] text-slate-500">{f.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. BORDER & GLOW CUSTOMIZATION */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span>Border Ring & Glow Color</span>
            </span>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-slate-500">Width:</span>
              {[0, 2, 4, 6].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => handleBorderWidthChange(w)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer transition ${
                    currentBorderWidth === w
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {w === 0 ? 'None' : `${w}px`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { color: '#00FF66', name: 'Emerald' },
              { color: '#00e5ff', name: 'Cyan' },
              { color: '#bd00ff', name: 'Purple' },
              { color: '#f59e0b', name: 'Amber' },
              { color: '#f43f5e', name: 'Rose' },
              { color: '#ffffff', name: 'White' },
              { color: '#38bdf8', name: 'Sky' }
            ].map((c) => (
              <button
                key={c.color}
                type="button"
                onClick={() => handleColorChange(c.color)}
                style={{ backgroundColor: c.color }}
                className={`w-7 h-7 rounded-lg cursor-pointer transition-transform ${
                  currentBorderColor.toLowerCase() === c.color.toLowerCase()
                    ? 'ring-2 ring-white scale-110 shadow-lg'
                    : 'opacity-75 hover:opacity-100 hover:scale-105'
                }`}
                title={c.name}
              />
            ))}

            <label className="relative cursor-pointer flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 hover:border-slate-700">
              <input
                type="color"
                value={currentBorderColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                title="Custom Color"
              />
              <span className="font-mono text-[10px]">{currentBorderColor.toUpperCase()}</span>
            </label>
          </div>
        </div>

        {/* 4. FINE-TUNING & FRAMING (Zoom & Centering) */}
        <div className="pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setShowAdvancedTuning(!showAdvancedTuning)}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-medium cursor-pointer transition"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showAdvancedTuning ? 'Hide Framing & Position Controls' : 'Adjust Framing, Zoom & Face Position'}</span>
          </button>

          {showAdvancedTuning && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 mt-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Zoom: {currentZoom.toFixed(1)}x</span>
                  <button
                    type="button"
                    onClick={() => handleZoomChange(1.0)}
                    className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.1"
                  value={currentZoom}
                  onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Pan X (Left/Right)</span>
                  <button
                    type="button"
                    onClick={() => handlePanChange(0, currentPanY)}
                    className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                  >
                    Center
                  </button>
                </div>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.05"
                  value={currentPanX}
                  onChange={(e) => handlePanChange(parseFloat(e.target.value), currentPanY)}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Pan Y (Up/Down)</span>
                  <button
                    type="button"
                    onClick={() => handlePanChange(currentPanX, 0)}
                    className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                  >
                    Center
                  </button>
                </div>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.05"
                  value={currentPanY}
                  onChange={(e) => handlePanChange(currentPanX, parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* 5. README EMBED SETTINGS */}
        <div className="pt-2 border-t border-slate-800/80 space-y-3">
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
            <div className="pl-6 pt-1 flex items-center gap-3">
              <span className="text-[11px] text-slate-400">Display Size in README:</span>
              <div className="flex items-center gap-1.5">
                {[120, 160, 200, 240].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => onChange({ avatarWidth: sz })}
                    className={`px-2.5 py-1 text-[11px] rounded-lg cursor-pointer transition ${
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

        {/* Title & Headline Look Theme */}
        <div className="space-y-2 sm:col-span-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Title & Headline Theme Style</span>
            </label>
            <span className="text-[11px] text-cyan-400 font-mono">Modern GitHub Ready</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              {
                id: 'cyber-badge',
                label: '⚡ Cyber Neon',
                desc: 'Wave + Neon Capsule',
                badge: 'Popular'
              },
              {
                id: 'gradient-glow',
                label: '✨ Gradient Hero',
                desc: 'Wave + Italic Glow',
                badge: 'Aesthetic'
              },
              {
                id: 'terminal-code',
                label: '💻 Hacker CLI',
                desc: '$ whoami Prompt',
                badge: 'Dev Favorite'
              },
              {
                id: 'minimal-modern',
                label: '💎 Modern Clean',
                desc: 'Centered Minimalist',
                badge: 'Clean'
              }
            ].map((theme) => {
              const isSelected = (config.titleStyle || 'cyber-badge') === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onChange({ titleStyle: theme.id as any })}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-xs font-bold">{theme.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <span className="text-[10px] text-slate-400 block">{theme.desc}</span>
                  <span className={`text-[9px] font-mono mt-2 px-1.5 py-0.5 rounded w-fit ${
                    isSelected ? 'bg-cyan-500/30 text-cyan-200 font-semibold' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {theme.badge}
                  </span>
                </button>
              );
            })}
          </div>
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
