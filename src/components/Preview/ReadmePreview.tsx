import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Eye, Code2, Copy, Check, Download, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AsciiDotMatrix } from '../AsciiDotMatrix';

interface ReadmePreviewProps {
  markdown: string;
  username: string;
  avatarUrl?: string;
  dotColor?: string;
  onCopy: () => void;
  onDownload: () => void;
}

export const ReadmePreview: React.FC<ReadmePreviewProps> = ({
  markdown,
  username,
  avatarUrl,
  dotColor = '#00FF66',
  onCopy,
  onDownload
}) => {
  const [viewMode, setViewMode] = useState<'rendered' | 'raw'>('rendered');
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    onCopy();
    setCopied(true);
    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.2, x: 0.8 }
      });
    } catch (e) {}
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#0d1117] flex flex-col h-full shadow-xl">
      {/* Top Header */}
      <div className="px-4 py-2.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-medium text-slate-300">
            {username || 'user'} / <strong className="text-white">README.md</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('rendered')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                viewMode === 'rendered'
                  ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                viewMode === 'raw'
                  ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Raw</span>
            </button>
          </div>

          {/* Quick Copy */}
          <button
            onClick={handleCopyClick}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Download */}
          <button
            onClick={onDownload}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition"
            title="Download README.md"
          >
            <Download className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Body View */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        {viewMode === 'rendered' ? (
          <div className="markdown-body max-w-4xl mx-auto">
            <ReactMarkdown
              urlTransform={(url) => url}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ node, ...props }) => {
                  let src = props.src || '';
                  if (src.includes('ascii-portrait.png')) {
                    return (
                      <div className="my-1 flex justify-center w-full">
                        <AsciiDotMatrix 
                          imageSrc={avatarUrl || '/suraj-portrait.jpg'} 
                          dotColor={dotColor}
                          hideHeader={true}
                          hideControls={true}
                          className="w-full bg-black border-0 shadow-none" 
                        />
                      </div>
                    );
                  }

                  const isAvatar =
                    Boolean(props.alt && (props.alt.toLowerCase().includes('suraj') || props.alt.toLowerCase().includes('avatar'))) ||
                    src.includes('portrait') ||
                    Boolean(avatarUrl && src === avatarUrl) ||
                    src.includes('readmeforge/main/public');

                  if (isAvatar) {
                    src = avatarUrl || '/suraj-portrait.jpg';
                  }

                  // Normalize github-readme-stats URLs to prevent 500 FUNCTION_INVOCATION_FAILED
                  if (src.includes('github-readme-stats.vercel.app')) {
                    if (src.includes('theme=matrix')) {
                      src = src.replace('theme=matrix', 'title_color=00FF66&text_color=FFFFFF&icon_color=00FF66&bg_color=04080e&border_color=00FF66');
                    }
                    if (src.includes('/api/top-langs/')) {
                      src = src.replace('/api/top-langs/', '/api/top-langs');
                    }
                  }

                  return (
                    <img
                      {...props}
                      src={src}
                      style={props.style}
                      className={`inline-block max-w-full my-1 mr-1.5 align-middle ${
                        isAvatar ? 'transition-all duration-150 will-change-transform' : ''
                      }`}
                      alt={props.alt || ''}
                      loading={isAvatar ? 'eager' : 'lazy'}
                      decoding={isAvatar ? 'sync' : 'async'}
                      {...(isAvatar ? { fetchPriority: 'high' } : {})}
                      onError={(e) => {
                        if (isAvatar) {
                          e.currentTarget.src = avatarUrl || '/suraj-portrait.jpg';
                        } else if (src.includes('github-readme-stats.vercel.app/api/top-langs')) {
                          const fallbackUrl = `https://github-readme-stats.vercel.app/api/top-langs?username=${username}&layout=compact&title_color=00FF66&text_color=FFFFFF&icon_color=00FF66&bg_color=04080e`;
                          if (e.currentTarget.src !== fallbackUrl) {
                            e.currentTarget.src = fallbackUrl;
                          }
                        } else if (src.includes('github-readme-stats.vercel.app/api')) {
                          const fallbackUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&title_color=00FF66&text_color=FFFFFF&icon_color=00FF66&bg_color=04080e`;
                          if (e.currentTarget.src !== fallbackUrl) {
                            e.currentTarget.src = fallbackUrl;
                          }
                        }
                      }}
                    />
                  );
                },
                h1: ({ node, ...props }) => {
                  if (props.style?.color) {
                    return (
                      <h1
                        {...props}
                        style={props.style}
                        className="text-2xl sm:text-3xl font-extrabold tracking-tight inline-block border-b-0 pb-0 my-2"
                      />
                    );
                  }
                  return (
                    <div className="my-5 text-center">
                      <h1
                        {...props}
                        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent inline-flex items-center justify-center gap-2 border-b-0 pb-0"
                      />
                      <div className="h-0.5 w-24 mx-auto mt-2 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-blue-500 shadow-md shadow-cyan-500/50" />
                    </div>
                  );
                },
                h3: ({ node, ...props }) => (
                  <div className="my-3 text-center">
                    <h3
                      {...props}
                      className="text-xs sm:text-sm font-semibold text-cyan-200 inline-block px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 tracking-wide font-mono"
                    />
                  </div>
                ),
                code: ({ node, inline, className, children, ...props }: any) => {
                  return (
                    <code
                      {...props}
                      className="px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold shadow-md shadow-cyan-500/15 inline-block my-1"
                    >
                      {children}
                    </code>
                  );
                },
                a: ({ node, ...props }) => (
                  <a {...props} className="text-[#58a6ff] hover:underline" target="_blank" rel="noreferrer" />
                )
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        ) : (
          <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
            {markdown}
          </pre>
        )}
      </div>
    </div>
  );
};
