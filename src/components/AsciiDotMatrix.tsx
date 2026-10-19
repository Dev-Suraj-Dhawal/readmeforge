import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, RefreshCw, Sliders, Play, Pause, Scan } from 'lucide-react';

interface AsciiDotMatrixProps {
  imageSrc?: string;
  dotColor?: string;
  className?: string;
  interactive?: boolean;
}

export const AsciiDotMatrix: React.FC<AsciiDotMatrixProps> = ({
  imageSrc = '/ascii-portrait.png',
  dotColor = '#00FF66',
  className = '',
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dotSize, setDotSize] = useState<number>(3.5);
  const [scanSpeed, setScanSpeed] = useState<number>(2);
  const [colorScheme, setColorScheme] = useState<string>(dotColor);
  const [mode, setMode] = useState<'halftone-dots' | 'ascii-chars' | 'binary'>('halftone-dots');
  const animFrameId = useRef<number | null>(null);
  const mousePos = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    if (!imageSrc.startsWith('data:') && !imageSrc.startsWith('blob:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onerror = () => {
      if (img.src !== window.location.origin + '/suraj-portrait.jpg' && !img.src.includes('suraj-portrait.jpg')) {
        img.src = '/suraj-portrait.jpg';
      }
    };
    img.src = imageSrc;

    let scanY = 0;
    let waveTime = 0;

    img.onload = () => {
      // Calculate responsive dimensions
      const aspect = img.height / img.width;
      const displayWidth = Math.min(360, window.innerWidth - 60);
      const displayHeight = Math.round(displayWidth * aspect);

      canvas.width = displayWidth;
      canvas.height = displayHeight;

      // Offscreen canvas for sampling
      const sampleCanvas = document.createElement('canvas');
      const sampleCtx = sampleCanvas.getContext('2d');
      if (!sampleCtx) return;

      const cols = Math.floor(displayWidth / dotSize);
      const rows = Math.floor(displayHeight / dotSize);

      sampleCanvas.width = cols;
      sampleCanvas.height = rows;
      sampleCtx.drawImage(img, 0, 0, cols, rows);

      const sampleData = sampleCtx.getImageData(0, 0, cols, rows).data;

      const asciiRamp = [' ', '.', '·', ':', '•', '●', '#', '█'];

      const render = () => {
        if (!ctx) return;

        // Dark background
        ctx.fillStyle = '#050a0e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        waveTime += 0.04;
        scanY = (scanY + scanSpeed) % canvas.height;

        // Draw Matrix Dots / ASCII
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const index = (r * cols + c) * 4;
            const rVal = sampleData[index];
            const gVal = sampleData[index + 1];
            const bVal = sampleData[index + 2];
            const aVal = sampleData[index + 3];

            if (aVal < 30) continue;

            // Perceived luminance
            let brightness = (rVal * 0.299 + gVal * 0.587 + bVal * 0.114) / 255;
            if (brightness < 0.08) continue;

            const posX = c * dotSize + dotSize / 2;
            const posY = r * dotSize + dotSize / 2;

            // Distance to scanline
            const distToScan = Math.abs(posY - scanY);
            let scanBoost = 1.0;
            if (distToScan < 30) {
              scanBoost = 1.0 + (1 - distToScan / 30) * 0.8;
            }

            // Mouse ripple interaction
            if (mousePos.current.active) {
              const dx = posX - mousePos.current.x;
              const dy = posY - mousePos.current.y;
              const distToMouse = Math.sqrt(dx * dx + dy * dy);
              if (distToMouse < 60) {
                scanBoost += (1 - distToMouse / 60) * 0.9;
              }
            }

            // Wave micro-pulsation
            const wave = Math.sin(waveTime + (r * 0.2) + (c * 0.1)) * 0.15;
            const finalBrightness = Math.min(1, Math.max(0, (brightness + wave) * scanBoost));

            if (mode === 'halftone-dots') {
              const maxRadius = (dotSize / 2) * 0.95;
              const radius = Math.max(0.5, maxRadius * finalBrightness);

              ctx.beginPath();
              ctx.arc(posX, posY, radius, 0, Math.PI * 2);
              ctx.fillStyle = colorScheme;
              ctx.globalAlpha = Math.min(1, 0.25 + finalBrightness * 0.75);
              ctx.fill();

              // Extra glow for brightest dots
              if (finalBrightness > 0.8) {
                ctx.shadowColor = colorScheme;
                ctx.shadowBlur = 6;
              } else {
                ctx.shadowBlur = 0;
              }
            } else if (mode === 'ascii-chars') {
              const charIdx = Math.floor(finalBrightness * (asciiRamp.length - 1));
              const char = asciiRamp[charIdx];

              ctx.font = `${Math.round(dotSize * 1.1)}px monospace`;
              ctx.fillStyle = colorScheme;
              ctx.globalAlpha = 0.3 + finalBrightness * 0.7;
              ctx.fillText(char, posX - dotSize / 3, posY + dotSize / 3);
            } else {
              // Binary 0/1
              const char = (r + c + Math.floor(waveTime * 2)) % 2 === 0 ? '1' : '0';
              ctx.font = `${Math.round(dotSize * 0.9)}px monospace`;
              ctx.fillStyle = colorScheme;
              ctx.globalAlpha = 0.3 + finalBrightness * 0.7;
              ctx.fillText(char, posX - dotSize / 3, posY + dotSize / 3);
            }
          }
        }

        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // Subtle CRT scanline effect over canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        for (let y = 0; y < canvas.height; y += 4) {
          ctx.fillRect(0, y, canvas.width, 1.5);
        }

        // Animated laser scanline beam
        const gradient = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15);
        gradient.addColorStop(0, 'rgba(0, 255, 102, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 255, 102, 0.25)');
        gradient.addColorStop(1, 'rgba(0, 255, 102, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, scanY - 15, canvas.width, 30);

        if (isPlaying) {
          animFrameId.current = requestAnimationFrame(render);
        }
      };

      render();
    };

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [imageSrc, dotSize, scanSpeed, colorScheme, mode, isPlaying]);

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
    <div className={`relative flex flex-col items-center p-4 rounded-3xl bg-[#090d16] border border-emerald-500/30 shadow-2xl overflow-hidden group ${className}`}>
      {/* Decorative Matrix Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Label */}
      <div className="w-full flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono font-bold text-emerald-400 tracking-wider uppercase text-[11px]">
            Holographic ASCII Matrix Dot Matrix
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Canvas viewport */}
      <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-black shadow-inner shadow-emerald-950/60 cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="block mx-auto max-w-full"
        />
        
        {/* Corner HUD markers */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400 pointer-events-none" />
      </div>

      {/* Interactive Controls Bar */}
      <div className="w-full mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Mode selector */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800">
          <button
            onClick={() => setMode('halftone-dots')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition ${
              mode === 'halftone-dots' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dot Matrix
          </button>
          <button
            onClick={() => setMode('ascii-chars')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition ${
              mode === 'ascii-chars' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            ASCII Chars
          </button>
          <button
            onClick={() => setMode('binary')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition ${
              mode === 'binary' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Binary 0/1
          </button>
        </div>

        {/* Color pickers */}
        <div className="flex items-center gap-1.5">
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
              className={`w-4 h-4 rounded-full border transition-transform ${
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

