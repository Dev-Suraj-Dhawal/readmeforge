import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sparkles, RefreshCw, Sliders, Play, Pause, Scan, Zap } from 'lucide-react';

interface AsciiDotMatrixProps {
  imageSrc?: string;
  dotColor?: string;
  className?: string;
  interactive?: boolean;
}

interface MatrixSample {
  cols: number;
  rows: number;
  data: Float32Array;
  aspect: number;
}

// Global in-memory cache to guarantee 0ms instant synchronous re-render across component lifecycles
const MATRIX_CACHE = new Map<string, MatrixSample>();

/**
 * Generates an instant high-fidelity mathematical cyberpunk face hologram
 * Used at frame 0 (0ms synchronous) so user never sees a black screen.
 */
function generateProceduralHologram(cols: number, rows: number): Float32Array {
  const data = new Float32Array(cols * rows);
  const cx = cols / 2;
  const cy = rows / 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c - cx) / (cols * 0.28);
      const dy = (r - cy) / (rows * 0.36);
      const distSq = dx * dx + dy * dy;
      
      // Anatomical head & shoulder silhouette
      let val = Math.exp(-distSq * 0.95);
      
      // Face geometry contours (eye sockets, cheekbones, nose bridge, jawline)
      const eyeL = Math.exp(-((c - (cx - cols * 0.12)) ** 2 / 5 + (r - (cy - rows * 0.08)) ** 2 / 3.5));
      const eyeR = Math.exp(-((c - (cx + cols * 0.12)) ** 2 / 5 + (r - (cy - rows * 0.08)) ** 2 / 3.5));
      const mouth = Math.exp(-((c - cx) ** 2 / 12 + (r - (cy + rows * 0.18)) ** 2 / 3));
      val = Math.max(0, val - eyeL * 0.65 - eyeR * 0.65 - mouth * 0.4);
      
      // Shoulder drape
      if (r > cy + rows * 0.22) {
        const shoulderW = ((r - (cy + rows * 0.22)) / (rows * 0.3)) * cols * 0.45;
        if (Math.abs(c - cx) < shoulderW + cols * 0.18) {
          val = Math.max(val, 0.45 * (1 - (r - cy) / (rows * 0.5)));
        }
      }

      // Cyber scan grid micro-accent
      val += Math.sin(r * 0.85) * 0.06 * val;
      data[r * cols + c] = Math.max(0, Math.min(1, val));
    }
  }
  return data;
}

/**
 * Samples an HTML Image into a high-contrast dot luminance matrix
 */
function sampleImageToMatrix(img: HTMLImageElement, cols: number, rows: number): Float32Array {
  const sampleCanvas = document.createElement('canvas');
  sampleCanvas.width = cols;
  sampleCanvas.height = rows;
  const sCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
  if (!sCtx) return generateProceduralHologram(cols, rows);

  sCtx.drawImage(img, 0, 0, cols, rows);
  const imgData = sCtx.getImageData(0, 0, cols, rows).data;
  const matrix = new Float32Array(cols * rows);

  for (let i = 0; i < cols * rows; i++) {
    const idx = i * 4;
    const r = imgData[idx];
    const g = imgData[idx + 1];
    const b = imgData[idx + 2];
    const a = imgData[idx + 3];
    if (a < 25) {
      matrix[i] = 0;
    } else {
      // Perceived luminance with gamma contrast enhancement for crisp cyber dots
      const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      matrix[i] = Math.pow(lum, 1.12);
    }
  }
  return matrix;
}

export const AsciiDotMatrix: React.FC<AsciiDotMatrixProps> = ({
  imageSrc = '/suraj-portrait.jpg',
  dotColor = '#00FF66',
  className = '',
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dotSize, setDotSize] = useState<number>(3.5);
  const [colorScheme, setColorScheme] = useState<string>(dotColor);
  const [mode, setMode] = useState<'halftone-dots' | 'ascii-chars' | 'binary'>('halftone-dots');
  const [status, setStatus] = useState<'hologram' | 'synced'>('hologram');

  // Real-time animation refs to decouple render loop from React state re-mounts
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const colorSchemeRef = useRef(colorScheme);
  colorSchemeRef.current = colorScheme;

  const modeRef = useRef(mode);
  modeRef.current = mode;

  const dotSizeRef = useRef(dotSize);
  dotSizeRef.current = dotSize;

  const mousePos = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const animFrameId = useRef<number | null>(null);

  // Active matrix sample data ref (starts with instant synchronous procedural hologram)
  const activeMatrixRef = useRef<{ cols: number; rows: number; data: Float32Array }>({
    cols: 70,
    rows: 48,
    data: generateProceduralHologram(70, 48)
  });

  // Start the 60fps render loop IMMEDIATELY on mount (0ms delay)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Responsive initial dimensions
    const displayWidth = Math.min(360, window.innerWidth - 60) || 320;
    const displayHeight = Math.round(displayWidth * 0.68);
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const asciiRamp = [' ', '.', '·', ':', '•', '●', '#', '█'];
    let scanY = 0;
    let waveTime = 0;

    const render = () => {
      if (!isPlayingRef.current) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      const activeCols = activeMatrixRef.current.cols;
      const activeRows = activeMatrixRef.current.rows;
      const activeData = activeMatrixRef.current.data;
      const currentDotSize = dotSizeRef.current;
      const currentColor = colorSchemeRef.current;
      const currentMode = modeRef.current;

      // Dark futuristic CRT background
      ctx.fillStyle = '#04080e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveTime += 0.045;
      scanY = (scanY + 2.2) % canvas.height;

      // Draw Matrix Dots / ASCII Characters
      for (let r = 0; r < activeRows; r++) {
        for (let c = 0; c < activeCols; c++) {
          const brightness = activeData[r * activeCols + c];
          if (brightness < 0.06) continue;

          const posX = c * currentDotSize + currentDotSize / 2;
          const posY = r * currentDotSize + currentDotSize / 2;

          // Distance to holographic scanline
          const distToScan = Math.abs(posY - scanY);
          let scanBoost = 1.0;
          if (distToScan < 32) {
            scanBoost = 1.0 + (1 - distToScan / 32) * 0.95;
          }

          // Mouse ripple interactivity
          if (mousePos.current.active) {
            const dx = posX - mousePos.current.x;
            const dy = posY - mousePos.current.y;
            const distToMouse = Math.sqrt(dx * dx + dy * dy);
            if (distToMouse < 65) {
              scanBoost += (1 - distToMouse / 65) * 1.1;
            }
          }

          // Cyber matrix pulsating wave
          const wave = Math.sin(waveTime + r * 0.22 + c * 0.12) * 0.12;
          const finalBrightness = Math.min(1, Math.max(0, (brightness + wave) * scanBoost));

          if (currentMode === 'halftone-dots') {
            const maxRadius = (currentDotSize / 2) * 0.95;
            const radius = Math.max(0.6, maxRadius * finalBrightness);

            ctx.beginPath();
            ctx.arc(posX, posY, radius, 0, Math.PI * 2);
            ctx.fillStyle = currentColor;
            ctx.globalAlpha = Math.min(1, 0.22 + finalBrightness * 0.78);
            ctx.fill();

            // Extra neon glow for brightest dots
            if (finalBrightness > 0.82) {
              ctx.shadowColor = currentColor;
              ctx.shadowBlur = 8;
            } else {
              ctx.shadowBlur = 0;
            }
          } else if (currentMode === 'ascii-chars') {
            const charIdx = Math.floor(finalBrightness * (asciiRamp.length - 1));
            const char = asciiRamp[charIdx];

            ctx.font = `${Math.round(currentDotSize * 1.1)}px monospace`;
            ctx.fillStyle = currentColor;
            ctx.globalAlpha = 0.3 + finalBrightness * 0.7;
            ctx.fillText(char, posX - currentDotSize / 3, posY + currentDotSize / 3);
          } else {
            // Binary 0/1 Matrix Stream
            const char = (r + c + Math.floor(waveTime * 3)) % 2 === 0 ? '1' : '0';
            ctx.font = `${Math.round(currentDotSize * 0.95)}px monospace`;
            ctx.fillStyle = currentColor;
            ctx.globalAlpha = 0.3 + finalBrightness * 0.7;
            ctx.fillText(char, posX - currentDotSize / 3, posY + currentDotSize / 3);
          }
        }
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      // CRT retro scanline overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1.5);
      }

      // Animated glowing laser scanline beam
      const gradient = ctx.createLinearGradient(0, scanY - 18, 0, scanY + 18);
      gradient.addColorStop(0, 'rgba(0, 255, 102, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 102, 0.28)');
      gradient.addColorStop(1, 'rgba(0, 255, 102, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 18, canvas.width, 36);

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Synchronous and asynchronous image loader with memory cache & zero CORS block
  useEffect(() => {
    const targetSrc = imageSrc || '/suraj-portrait.jpg';

    // 1. Check in-memory cache for synchronous 0ms load
    if (MATRIX_CACHE.has(targetSrc)) {
      const cached = MATRIX_CACHE.get(targetSrc)!;
      activeMatrixRef.current = {
        cols: cached.cols,
        rows: cached.rows,
        data: cached.data
      };
      if (canvasRef.current) {
        const displayWidth = Math.min(360, window.innerWidth - 60) || 320;
        canvasRef.current.width = displayWidth;
        canvasRef.current.height = Math.round(displayWidth * cached.aspect);
      }
      setStatus('synced');
      return;
    }

    // 2. Safe image loading pipeline
    const img = new Image();
    const isSameOrigin =
      targetSrc.startsWith('/') ||
      targetSrc.startsWith('./') ||
      (typeof window !== 'undefined' && targetSrc.startsWith(window.location.origin));

    // Only set crossOrigin for third-party remote URLs to prevent local same-origin CORS blocks
    if (!isSameOrigin && !targetSrc.startsWith('data:') && !targetSrc.startsWith('blob:')) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = () => {
      const aspect = img.height / img.width || 0.68;
      const displayWidth = Math.min(360, window.innerWidth - 60) || 320;
      const displayHeight = Math.round(displayWidth * aspect);

      if (canvasRef.current) {
        canvasRef.current.width = displayWidth;
        canvasRef.current.height = displayHeight;
      }

      const cols = Math.floor(displayWidth / dotSizeRef.current);
      const rows = Math.floor(displayHeight / dotSizeRef.current);
      const sampledData = sampleImageToMatrix(img, cols, rows);

      MATRIX_CACHE.set(targetSrc, {
        cols,
        rows,
        data: sampledData,
        aspect
      });

      activeMatrixRef.current = {
        cols,
        rows,
        data: sampledData
      };
      setStatus('synced');
    };

    img.onerror = () => {
      // Fallback cleanly to local portrait without crossOrigin
      if (targetSrc !== '/suraj-portrait.jpg') {
        const fallback = new Image();
        fallback.onload = () => {
          const aspect = fallback.height / fallback.width || 0.68;
          const displayWidth = Math.min(360, window.innerWidth - 60) || 320;
          const displayHeight = Math.round(displayWidth * aspect);

          if (canvasRef.current) {
            canvasRef.current.width = displayWidth;
            canvasRef.current.height = displayHeight;
          }

          const cols = Math.floor(displayWidth / dotSizeRef.current);
          const rows = Math.floor(displayHeight / dotSizeRef.current);
          const sampledData = sampleImageToMatrix(fallback, cols, rows);

          MATRIX_CACHE.set(targetSrc, { cols, rows, data: sampledData, aspect });
          activeMatrixRef.current = { cols, rows, data: sampledData };
          setStatus('synced');
        };
        fallback.src = '/suraj-portrait.jpg';
      }
    };

    img.src = targetSrc;
  }, [imageSrc]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  const handleMouseLeave = () => {
    mousePos.current.active = false;
  };

  return (
    <div className={`relative flex flex-col items-center p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#0a101d] via-[#060b13] to-[#04070c] border border-emerald-500/30 shadow-2xl overflow-hidden group ${className}`}>
      {/* Decorative Matrix Glow Background */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Label */}
      <div className="w-full flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono font-bold text-emerald-400 tracking-wider uppercase text-[11px] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Holographic ASCII Matrix Dot Matrix</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 hidden sm:inline-block">
            {status === 'synced' ? '● SYNCED HD' : '● HOLOGRAM'}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer transition"
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Canvas Viewport with Corner Reticles */}
      <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-black shadow-inner shadow-emerald-950/60 cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="block mx-auto max-w-full"
        />
        
        {/* Futuristic Corner HUD Markers */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-emerald-400 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-400 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-emerald-400 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-emerald-400 pointer-events-none" />
      </div>

      {/* Interactive Controls Bar */}
      <div className="w-full mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Mode Selector */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800">
          <button
            onClick={() => setMode('halftone-dots')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition ${
              mode === 'halftone-dots' ? 'bg-emerald-500 text-black font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dot Matrix
          </button>
          <button
            onClick={() => setMode('ascii-chars')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition ${
              mode === 'ascii-chars' ? 'bg-emerald-500 text-black font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            ASCII Chars
          </button>
          <button
            onClick={() => setMode('binary')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition ${
              mode === 'binary' ? 'bg-emerald-500 text-black font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Binary 0/1
          </button>
        </div>

        {/* Phosphor Color Pickers */}
        <div className="flex items-center gap-2">
          {[
            { name: 'Matrix Green', color: '#00FF66' },
            { name: 'Cyber Cyan', color: '#00F0FF' },
            { name: 'Neon Violet', color: '#C084FC' },
            { name: 'Amber Gold', color: '#F59E0B' },
            { name: 'Pure White', color: '#FFFFFF' }
          ].map((c) => (
            <button
              key={c.color}
              onClick={() => setColorScheme(c.color)}
              title={c.name}
              className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                colorScheme === c.color ? 'scale-125 border-white ring-2 ring-emerald-400/50' : 'border-white/30 hover:scale-110'
              }`}
              style={{ backgroundColor: c.color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
