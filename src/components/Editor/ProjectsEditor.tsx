import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { FolderGit2, Plus, Trash2, ExternalLink, GitFork, Star, LayoutGrid, Table } from 'lucide-react';

interface ProjectsEditorProps {
  projects: ProjectItem[];
  onChange: (projects: ProjectItem[]) => void;
  displayMode?: 'table' | 'pinned-cards';
  onDisplayModeChange?: (mode: 'table' | 'pinned-cards') => void;
  username?: string;
}

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ 
  projects, 
  onChange,
  displayMode = 'table',
  onDisplayModeChange,
  username = 'your-username'
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [newLive, setNewLive] = useState('');

  const handleAddProject = () => {
    if (!newTitle.trim()) return;

    const techArray = newTech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newProject: ProjectItem = {
      id: `p-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'A high-impact open source project.',
      tech: techArray.length > 0 ? techArray : ['TypeScript', 'React'],
      repoUrl: newRepo.trim(),
      liveUrl: newLive.trim()
    };

    onChange([...projects, newProject]);
    setNewTitle('');
    setNewDesc('');
    setNewTech('');
    setNewRepo('');
    setNewLive('');
  };

  const handleRemove = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: string, updated: Partial<ProjectItem>) => {
    onChange(projects.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Display Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            <span>Featured Projects Showcase</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Highlight your best repos, apps, and libraries with tech badges and live links.
          </p>
        </div>

        {/* Display Mode Toggle */}
        {onDisplayModeChange && (
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onDisplayModeChange('table')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cursor-pointer transition ${
                displayMode === 'table'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => onDisplayModeChange('pinned-cards')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cursor-pointer transition ${
                displayMode === 'pinned-cards'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Pinned Cards</span>
            </button>
          </div>
        )}
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((proj, idx) => {
          let repoName = proj.title.replace(/\s+/g, '-');
          if (proj.repoUrl) {
            const match = proj.repoUrl.match(/github\.com\/[^/]+\/([^/]+)/);
            if (match && match[1]) repoName = match[1];
          }

          return (
            <div key={proj.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold">Project #{idx + 1}</span>
                <button
                  onClick={() => handleRemove(proj.id)}
                  className="text-slate-500 hover:text-red-400 p-1 transition cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Project / Repo Name</label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => handleUpdate(proj.id, { title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={proj.tech.join(', ')}
                    onChange={(e) =>
                      handleUpdate(proj.id, {
                        tech: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] text-slate-400 block mb-1">Short Description</label>
                  <input
                    type="text"
                    value={proj.description}
                    onChange={(e) => handleUpdate(proj.id, { description: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Repository URL</label>
                  <input
                    type="text"
                    value={proj.repoUrl}
                    onChange={(e) => handleUpdate(proj.id, { repoUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Live Demo URL (optional)</label>
                  <input
                    type="text"
                    value={proj.liveUrl || ''}
                    onChange={(e) => handleUpdate(proj.id, { liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Pinned Card Live Preview if in Pinned Mode */}
              {displayMode === 'pinned-cards' && (
                <div className="pt-2 border-t border-slate-800/80 flex flex-col items-center gap-1.5 bg-slate-900/40 p-2.5 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-500">GITHUB PINNED CARD PREVIEW</span>
                  <img
                    src={`https://github-readme-stats.vercel.app/api/pin/?username=${encodeURIComponent(
                      username || 'Dev-Suraj-Dhawal'
                    )}&repo=${encodeURIComponent(repoName)}&theme=radical`}
                    alt={`${proj.title} card`}
                    className="max-w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Project Form */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 border-dashed space-y-3">
        <span className="text-xs font-semibold text-slate-300 block">Add New Project</span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              placeholder="Project Name / Repo Name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Tech Stack (comma separated: React, Node, AWS)"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2">
            <input
              type="text"
              placeholder="Description: What does this project do and what problem does it solve?"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="GitHub Repo URL (e.g. https://github.com/user/repo)"
              value={newRepo}
              onChange={(e) => setNewRepo(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Live Demo URL (optional)"
              value={newLive}
              onChange={(e) => setNewLive(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <button
          onClick={handleAddProject}
          disabled={!newTitle.trim()}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs cursor-pointer transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project Showcase</span>
        </button>
      </div>
    </div>
  );
};
