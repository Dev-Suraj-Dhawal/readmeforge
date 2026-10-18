import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Eye, Code2, Copy, Check, Download, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReadmePreviewProps {
  markdown: string;
  username: string;
  onCopy: () => void;
  onDownload: () => void;
}

export const ReadmePreview: React.FC<ReadmePreviewProps> = ({
  markdown,
  username,
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
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ node, ...props }) => (
                  <img {...props} className="inline-block max-w-full my-1 rounded" alt={props.alt || ''} />
                ),
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

