import React from 'react';
import { Code2, Sparkles, Copy, Check, RotateCcw } from 'lucide-react';

interface RawMarkdownEditorProps {
  markdown: string;
  onChangeMarkdown: (md: string) => void;
  onResetToGenerated: () => void;
  onCopy: () => void;
}

export const RawMarkdownEditor: React.FC<RawMarkdownEditorProps> = ({
  markdown,
  onChangeMarkdown,
  onResetToGenerated,
  onCopy
}) => {
  const insertSnippet = (snippet: string) => {
    onChangeMarkdown(markdown + '\n' + snippet);
  };

  return (
    <div className="space-y-4 animate-fadeIn h-full flex flex-col">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
        <div className="flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-white">Direct Markdown Source</span>
          <span className="text-[11px] font-mono text-slate-500">({markdown.split('\n').length} lines)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Snippet Inserts */}
          <button
            onClick={() => insertSnippet('### 🚀 Section Title\n\nWrite your content here...')}
            className="text-[11px] px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
          >
            + Heading
          </button>
          <button
            onClick={() => insertSnippet('| Column 1 | Column 2 |\n| :--- | :--- |\n| Data A | Data B |')}
            className="text-[11px] px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
          >
            + Table
          </button>
          <button
            onClick={() => insertSnippet('> [!NOTE]\n> Highlights or important tips appear in special GitHub callout boxes!')}
            className="text-[11px] px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
          >
            + Alert Box
          </button>

          <button
            onClick={onResetToGenerated}
            title="Recompile from Builder Settings"
            className="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 border border-slate-700"
          >
            <RotateCcw className="w-3 h-3 text-cyan-400" />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      {/* Textarea Code Editor */}
      <div className="relative flex-1 min-h-[500px] rounded-2xl overflow-hidden border border-slate-800 bg-[#090d16]">
        <textarea
          value={markdown}
          onChange={(e) => onChangeMarkdown(e.target.value)}
          spellCheck={false}
          className="w-full h-full p-4 bg-transparent text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-cyan-500/30"
          placeholder="# Your README.md code..."
        />
      </div>
    </div>
  );
};

