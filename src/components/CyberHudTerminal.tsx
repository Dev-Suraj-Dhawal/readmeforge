import React from 'react';
import { ProfileConfig } from '../types';
import { AsciiDotMatrix } from './AsciiDotMatrix';
import { TECH_BADGES } from '../data/techStackBadges';

interface CyberHudTerminalProps {
  config: ProfileConfig;
  className?: string;
  dotColor?: string;
}

export const CyberHudTerminal: React.FC<CyberHudTerminalProps> = ({
  config,
  className = '',
  dotColor = '#00FF66'
}) => {
  const name = (config.displayName || config.githubUsername || 'DEVELOPER').toUpperCase();
  const headline = config.headline || 'Senior Full-Stack Architect | Distributed Systems | Open Source';
  const mission = config.workingOn || 'secure APIs, high-scale SaaS products, creative developer tooling';

  // Extract selected tech badge names or use top defaults
  const techNames = React.useMemo(() => {
    if (config.techBadges && config.techBadges.length > 0) {
      return config.techBadges
        .map((id) => {
          const badge = TECH_BADGES.find((b) => b.id === id);
          return badge ? badge.name : id;
        })
        .slice(0, 6);
    }
    return ['Java 21', 'Spring Boot', 'TypeScript', 'Docker', 'AWS', 'PostgreSQL'];
  }, [config.techBadges]);

  const activeColor = dotColor || `#${config.typingColor.replace('#', '') || '00FF66'}`;

  return (
    <div
      className={`relative w-full max-w-4xl mx-auto rounded-3xl bg-[#04080e] border-2 shadow-[0_0_35px_rgba(0,255,102,0.22)] p-5 sm:p-7 overflow-hidden font-mono text-left my-4 ${className}`}
      style={{
        borderColor: activeColor,
        boxShadow: `0 0 35px ${activeColor}33`
      }}
    >
      {/* Subtle CRT Scanlines Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%)',
          backgroundSize: '100% 4px'
        }}
      />

      {/* Crosshair Lateral Reticles on Border */}
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#04080e] border border-current items-center justify-center text-[10px] select-none z-10 hidden sm:flex"
        style={{ color: activeColor }}
      >
        ┼
      </div>
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-[#04080e] border border-current items-center justify-center text-[10px] select-none z-10 hidden sm:flex"
        style={{ color: activeColor }}
      >
        ┼
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Developer Identity & CLI Console */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-3">
          
          {/* Top System Header Label */}
          <div 
            className="text-[11px] sm:text-xs font-bold tracking-widest uppercase flex items-center gap-1.5"
            style={{ color: activeColor }}
          >
            <span className="text-[10px]">■■■</span>
            <span>SYSTEM INTERFACE // ACTIVE</span>
          </div>

          {/* Sub-prompt */}
          <div 
            className="text-xs sm:text-sm font-bold tracking-wide"
            style={{ color: activeColor }}
          >
            &gt; HELLO, WORLD
          </div>

          {/* Hero Display Name with Blinking Cursor */}
          <div 
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase leading-tight"
            style={{ color: activeColor, textShadow: `0 0 12px ${activeColor}66` }}
          >
            {name}
            <span className="animate-pulse inline-block ml-0.5" style={{ color: activeColor }}>_</span>
          </div>

          {/* Subtitle / Headline */}
          <p 
            className="text-xs sm:text-sm font-semibold leading-relaxed"
            style={{ color: `${activeColor}dd` }}
          >
            {headline}
          </p>

          {/* Tech Capsule Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {techNames.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border transition-transform hover:scale-105 select-none"
                style={{
                  borderColor: `${activeColor}55`,
                  backgroundColor: `${activeColor}12`,
                  color: activeColor,
                  boxShadow: `0 0 8px ${activeColor}20`
                }}
              >
                [ {tech} ]
              </span>
            ))}
          </div>

          {/* Mission Status Line */}
          <div 
            className="pt-2 text-[11px] sm:text-xs flex items-center gap-1.5 border-t border-slate-800/80 mt-2"
            style={{ color: `${activeColor}bb` }}
          >
            <span className="font-bold">| mission -&gt;</span>
            <span className="font-medium text-white">{mission}</span>
          </div>
        </div>

        {/* Right Column: Holographic ASCII Portrait Terminal */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div 
            className="w-full max-w-[280px] p-3 sm:p-3.5 rounded-2xl bg-[#020508] border relative shadow-inner"
            style={{
              borderColor: `${activeColor}80`,
              boxShadow: `0 0 20px ${activeColor}22`
            }}
          >
            {/* Terminal Frame Header */}
            <div 
              className="w-full flex items-center justify-between text-[10px] font-bold tracking-wider mb-2"
              style={{ color: activeColor }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                <span>TERMINAL_01</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-black border border-current font-semibold text-[9px]">
                COMPLETE
              </span>
            </div>

            {/* Live Synchronous Halftone Dot Matrix - Clean pure CRT portrait without color picker or sync badge */}
            <div className="w-full overflow-hidden rounded-xl">
              <AsciiDotMatrix
                imageSrc={config.avatarUrl || '/suraj-portrait.jpg'}
                dotColor={activeColor}
                hideHeader={true}
                hideControls={true}
                className="w-full p-1 bg-black border-0 shadow-none"
              />
            </div>

            {/* Terminal Frame Footer Caption */}
            <div 
              className="w-full text-left text-[10px] font-mono mt-2"
              style={{ color: `${activeColor}aa` }}
            >
              &gt; portrait.svg loaded // terminal profile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

