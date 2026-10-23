import React, { useRef, useState, useCallback } from 'react';
import { ProfileConfig } from '../../types';
import { optimizeAvatarImage } from '../../utils/imageOptimizer';
import { fetchGitHubProfile } from '../../utils/githubFetcher';
import confetti from 'canvas-confetti';
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
  Download, 
  Zap, 
  Loader2,
  Languages
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
  const [isFetchingGitHub, setIsFetchingGitHub] = useState(false);
  const [fetchStatus, setFetchStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

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

  // One-click GitHub Profile & Repos Auto-Importer
  const handleAutoFetchGitHub = async () => {
    const username = config.githubUsername.trim();
    if (!username) {
      setFetchStatus({ type: 'error', message: 'Please enter a GitHub username first.' });
      return;
    }

    setIsFetchingGitHub(true);
    setFetchStatus(null);
    try {
      const { configUpdates, reposCount } = await fetchGitHubProfile(username);
      onChange(configUpdates);

      // Auto-tune avatar if image found
      if (configUpdates.avatarUrl) {
        triggerImageOptimization(configUpdates.avatarUrl);
      }

      setFetchStatus({
        type: 'success',
        message: `Synced @${configUpdates.githubUsername || username} profile & ${reposCount} featured projects!`
      });

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } catch (err: any) {
      setFetchStatus({
        type: 'error',
        message: err.message || 'Failed to fetch GitHub profile.'
      });
    } finally {
      setIsFetchingGitHub(false);
    }
  };

  // Handle local file upload
  // Handle local file upload with instant 0ms ObjectURL
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP, GIF)');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert('File is too large (max 20MB).');
      return;
    }

    // 1. Instantaneous 0ms memory URL for immediate rendering
    const objectUrl = URL.createObjectURL(file);
    onChange({
      avatarRawSource: objectUrl,
      avatarUrl: objectUrl,
      showAvatarInReadme: true
    });

    // 2. Background non-blocking persistence into DataURL
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
  const getShapeStyle = (shape: string): React.CSSProperties => {
    switch (shape) {
      case 'circle': return { borderRadius: '50%' };
      case 'squircle': return { borderRadius: '26%' };
      case 'shield': return { clipPath: 'polygon(50% 0%, 100% 15%, 100% 68%, 50% 100%, 0% 68%, 0% 15%)' };
      case 'octagon': return { clipPath: 'polygon(28% 0%, 72% 0%, 100% 28%, 100% 72%, 72% 100%, 28% 100%, 0% 72%, 0% 28%)' };
      case 'hexagon': return { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' };
      case 'diamond': return { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' };
      case 'cut-corner': return { clipPath: 'polygon(18% 0, 100% 0, 100% 82%, 82% 100%, 0 100%, 0 18%)' };
      case 'leaf': return { borderRadius: '4px 50% 50% 50%' };
      case 'square': default: return { borderRadius: '16px' };
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

  const SHAPES_LIST: Array<{
    id: ProfileConfig['avatarShape'];
    label: string;
    sublabel: string;
    badge: string;
    renderSvg: (active: boolean) => React.ReactNode;
  }> = [
    {
      id: 'circle',
      label: 'Neo-Circle',
      sublabel: 'Classic',
      badge: 'Popular',
      renderSvg: (active) => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={active ? 2.5 : 2}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
    },
    {
      id: 'squircle',
      label: 'Squircle',
      sublabel: 'Curved',
      badge: 'Apple',
      renderSvg: (active) => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={active ? 2.5 : 2}>
          <rect x="3" y="3" width="18" height="18" rx="6" />
        </svg>
      )
    },
    {
      id: 'shield',
      label: 'Cyber Shield',
      sublabel: 'Hero Crest',
      badge: 'Top Pick',
      renderSvg: (active) => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={active ? 2.5 : 2}>
          <path d="M12 2 L21 5 L21 14 C21 18.5 16 22 12 23 C8 22 3 18.5 3 14 L3 5 Z" />
        </svg>
      )
    },
    {
      id: 'octagon',
      label: 'Cyber Octagon',
      sublabel: 'Chamfered',
      badge: 'Sci-Fi',
      renderSvg: (active) => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={active ? 2.5 : 2}>
          <polygon points="7,2 17,2 22,7 22,17 17,22 7,22 2,17 2,7" />
        </svg>
      )
    },
    {
      id: 'hexagon',
      label: 'Tech Hex',
      sublabel: 'Matrix',
      badge: 'Futuristic',
      renderSvg: (active) => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={active ? 2.5 : 2}>
          <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
        </svg>
      )
    },
    {
      id: 'diamond',
      label: 'Radiant Diamond',
      sublabel: '45° Tilt',
      badge: 'Vibrant',
      renderSvg: (active) => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={active ? 2.5 : 2}>
          <polygon points="12,2 22,12 12,22 2,12" />
        </svg>
      )
    },
    {
      id: 'cut-corner',
      label: 'Chamfer Cut',
      sublabel: 'Asymmetric',
      badge: 'Stealth',
      renderSvg: (active) => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={active ? 2.5 : 2}>
          <polygon points="6,2 22,2 22,18 18,22 2,22 2,6" />
        </svg>
      )
    },
    {
      id: 'leaf',
      label: 'Organic Leaf',
      sublabel: 'Modern Drop',
      badge: 'Aesthetic',
      renderSvg: (active) => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={active ? 2.5 : 2}>
          <path d="M4 4 C16 4 21 9 21 16 C21 21 16 21 9 21 C4 21 4 16 4 4 Z" />
        </svg>
      )
    },
    {
      id: 'square',
      label: 'Soft Square',
      sublabel: 'Refined',
      badge: 'Minimal',
      renderSvg: (active) => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={active ? 2.5 : 2}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Profile Identity & Avatar Studio</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Sub-millisecond instant preview • 9 modern geometric shapes • HD clarity filters • GPU accelerated responsive styling.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            0ms Instant Sync
          </span>
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            GPU Active
          </span>
        </div>
      </div>

      {/* Modern Avatar Studio Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0c1424] via-[#090e17] to-[#070b12] border border-cyan-950/80 shadow-2xl space-y-6">
        
        {/* Header Toggle (Upload vs URL) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <span className="text-xs font-semibold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>Active Silhouette: <span className="text-cyan-400 capitalize font-mono">{currentShape}</span></span>
          </span>

          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
            <button
              type="button"
              onClick={() => setUploadMode('upload')}
              className={`px-3 py-1 rounded-md font-medium cursor-pointer transition ${
                uploadMode === 'upload' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Upload Local
            </button>
            <button
              type="button"
              onClick={() => setUploadMode('link')}
              className={`px-3 py-1 rounded-md font-medium cursor-pointer transition ${
                uploadMode === 'link' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Direct Link
            </button>
          </div>
        </div>

        {/* Studio Workspace: Visual Preview Stage + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Holographic Showcase Pedestal (Left / Center) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 relative overflow-hidden group">
            {/* Ambient Dynamic Background Glow */}
            <div 
              className="absolute inset-0 opacity-25 blur-2xl pointer-events-none transition-colors duration-300"
              style={{ backgroundColor: currentBorderColor }}
            />

            {/* Corner Tech Reticles */}
            <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-500/40 select-none">┌</div>
            <div className="absolute top-2 right-2 text-[10px] font-mono text-cyan-500/40 select-none">┐</div>
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-cyan-500/40 select-none">└</div>
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-cyan-500/40 select-none">┘</div>

            {/* Live Shaped Avatar Container */}
            <div className="relative my-2">
              <div 
                className="w-36 h-36 sm:w-40 sm:h-40 overflow-hidden bg-slate-900/90 flex items-center justify-center transition-all duration-150 will-change-transform"
                style={{
                  ...getShapeStyle(currentShape),
                  border: currentBorderWidth > 0 ? `${currentBorderWidth}px solid ${currentBorderColor}` : 'none',
                  boxShadow: currentBorderWidth > 0 ? `0 0 28px ${currentBorderColor}80` : '0 10px 25px rgba(0,0,0,0.5)'
                }}
              >
                <img
                  src={config.avatarUrl || '/suraj-portrait.jpg'}
                  alt={config.displayName || 'Profile Avatar'}
                  className="w-full h-full object-cover transition-transform duration-150 will-change-transform"
                  loading="eager"
                  decoding="sync"
                  style={{
                    filter: getFilterStyle(currentStyle),
                    transform: `scale(${currentZoom}) translate(${currentPanX * 15}px, ${currentPanY * 15}px)`
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/suraj-portrait.jpg';
                  }}
                />
              </div>

              {/* Hover Quick Overlay */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 flex flex-col items-center justify-center text-white text-[11px] font-semibold gap-1 rounded-2xl cursor-pointer"
                style={getShapeStyle(currentShape)}
              >
                <Upload className="w-5 h-5 text-cyan-300" />
                <span>Replace Photo</span>
              </button>
            </div>

            {/* Active Matrix Badge */}
            <div className="mt-2 text-center">
              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 inline-flex items-center gap-1">
                <span>⚡</span>
                <span className="uppercase">{currentShape} MATRIX</span>
                <span>•</span>
                <span>512×512 HD</span>
              </span>
            </div>

            {/* Quick Pedestal Actions */}
            <div className="flex items-center gap-2 mt-3 w-full justify-center">
              <button
                type="button"
                onClick={handleDownloadOptimizedImage}
                title="Download this styled avatar PNG"
                className="text-xs text-cyan-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-700/60 hover:bg-cyan-900/60 cursor-pointer transition font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Masked PNG</span>
              </button>
              <button
                type="button"
                onClick={() => handlePanChange(0, 0)}
                title="Center Framing"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Center</span>
              </button>
            </div>
          </div>

          {/* Upload / Source Controls (Right Column) */}
          <div className="lg:col-span-7 space-y-4">
            {uploadMode === 'upload' ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-5 rounded-2xl border-2 border-dashed cursor-pointer transition text-center flex flex-col items-center justify-center gap-2 ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-950/50 text-cyan-200'
                    : 'border-slate-800 hover:border-cyan-500/60 bg-slate-950/60 hover:bg-slate-900/60 text-slate-400'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">Drop photo here, or browse files</span>
                  <span className="text-[11px] text-slate-400">Sub-millisecond 0ms instant display • Up to 20MB JPG, PNG, WebP</span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileInputChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Direct Web Image URL</span>
                </label>
                <input
                  type="text"
                  value={typeof rawSource === 'string' && !rawSource.startsWith('data:') && !rawSource.startsWith('blob:') ? rawSource : ''}
                  onChange={(e) => {
                    const url = e.target.value.trim();
                    if (url) {
                      onChange({
                        avatarUrl: url,
                        avatarRawSource: url,
                        showAvatarInReadme: true
                      });
                    }
                  }}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <span className="text-[11px] text-slate-500 block">
                  Paste any hosted image URL. Instant dynamic sync without waiting.
                </span>
              </div>
            )}

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400 font-mono">Quick Load:</span>
              <button
                type="button"
                onClick={handleUseSurajPortrait}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60 cursor-pointer transition flex items-center gap-1.5"
              >
                <span>👤</span>
                <span>Suraj's Real Photo</span>
              </button>
              <button
                type="button"
                onClick={handleUseGithubAvatar}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white cursor-pointer transition flex items-center gap-1.5"
              >
                <span>🐙</span>
                <span>GitHub Avatar</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. SHAPE SELECTOR MATRIX (9 Futuristic Geometric Silhouettes) */}
        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Avatar Shape & Form Matrix (9 Styles)</span>
            </span>
            <span className="text-[11px] text-cyan-400 font-mono">Instant GPU Compositing</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {SHAPES_LIST.map((s) => {
              const isSelected = currentShape === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleShapeChange(s.id)}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                      : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={isSelected ? 'text-cyan-400' : 'text-slate-400'}>
                      {s.renderSvg(isSelected)}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold block">{s.label}</span>
                    <span className="text-[10px] text-slate-500">{s.sublabel}</span>
                  </div>
                  <span className={`text-[9px] font-mono mt-1.5 px-1.5 py-0.5 rounded w-fit ${
                    isSelected ? 'bg-cyan-500/30 text-cyan-200 font-semibold' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {s.badge}
                  </span>
                </button>
              );
            })}
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
        {/* GitHub Username with Auto-Fetch Action */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <AtSign className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub Username <span className="text-cyan-400">*</span></span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Press Enter or click Auto-Fetch</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">github.com/</span>
              <input
                type="text"
                value={config.githubUsername}
                onChange={(e) => onChange({ githubUsername: e.target.value.trim() })}
                onKeyDown={(e) => e.key === 'Enter' && handleAutoFetchGitHub()}
                placeholder="Dev-Suraj-Dhawal"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-24 pr-4 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={handleAutoFetchGitHub}
              disabled={isFetchingGitHub || !config.githubUsername.trim()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-500/10 shrink-0"
              title="Automatically import profile details, avatar, and top repos from GitHub"
            >
              {isFetchingGitHub ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Auto-Fetch</span>
                </>
              )}
            </button>
          </div>

          {/* Feedback Toast */}
          {fetchStatus && (
            <div className={`text-[11px] font-mono px-3 py-2 rounded-xl border flex items-center justify-between transition-all ${
              fetchStatus.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/40 border-red-500/40 text-red-300'
            }`}>
              <span>{fetchStatus.message}</span>
              <button 
                type="button" 
                onClick={() => setFetchStatus(null)} 
                className="text-xs hover:text-white ml-2 opacity-75 hover:opacity-100 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          <span className="text-[11px] text-slate-500 block">
            Auto-fills your real avatar, bio, location, company, website, and top starred repositories!
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

        {/* README Section Header Regionalizer (i18n) */}
        <div className="sm:col-span-2 pt-2 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-cyan-400" />
              <span>README Section Language Regionalizer</span>
            </label>
            <span className="text-[10px] text-cyan-400 font-mono">i18n Multi-Language</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Automatically translates section headlines (About Me, Tech Stack, Live Stats, Pinned Repos, Connect) into your target regional language.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { id: 'en', label: 'English', flag: '🇬🇧' },
              { id: 'es', label: 'Español', flag: '🇪🇸' },
              { id: 'ja', label: '日本語', flag: '🇯🇵' },
              { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
              { id: 'fr', label: 'Français', flag: '🇫🇷' },
              { id: 'pt', label: 'Português', flag: '🇧🇷' },
              { id: 'zh', label: '简体中文', flag: '🇨🇳' }
            ].map((lang) => {
              const isSelected = (config.readmeLanguage || 'en') === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => onChange({ readmeLanguage: lang.id as any })}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium cursor-pointer transition flex items-center gap-2 ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/20 font-semibold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              );
            })}
          </div>
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
