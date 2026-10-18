import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { FolderGit2, Plus, Trash2, ExternalLink, GitFork, Star } from 'lucide-react';

interface ProjectsEditorProps {
  projects: ProjectItem[];
  onChange: (projects: ProjectItem[]) => void;
}

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ projects, onChange }) => {
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
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-cyan-400" />
          <span>Featured Projects Showcase</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Highlight your best repos, apps, and libraries with tech badges and live links.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((proj, idx) => (
          <div key={proj.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400">Project #{idx + 1}</span>
              <button
                onClick={() => handleRemove(proj.id)}
                className="text-slate-500 hover:text-red-400 p-1 transition"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Project Name</label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => handleUpdate(proj.id, { title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
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
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-400 block mb-1">Short Description</label>
                <input
                  type="text"
                  value={proj.description}
                  onChange={(e) => handleUpdate(proj.id, { description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Repo URL</label>
                <input
                  type="text"
                  value={proj.repoUrl}
                  onChange={(e) => handleUpdate(proj.id, { repoUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Live Demo URL (optional)</label>
                <input
                  type="text"
                  value={proj.liveUrl || ''}
                  onChange={(e) => handleUpdate(proj.id, { liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Project Card */}
      <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 border-dashed space-y-3">
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>Add New Featured Project</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Project Title (e.g. ⚡ NovaDB)"
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
          />
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="Tech tags (e.g. Rust, Tokio, Wasm)"
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
          />
          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="One line punchy description..."
            className="sm:col-span-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
          />
          <input
            type="text"
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
            placeholder="GitHub Repo URL"
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono"
          />
          <input
            type="text"
            value={newLive}
            onChange={(e) => setNewLive(e.target.value)}
            placeholder="Live Demo URL"
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono"
          />
        </div>

        <button
          onClick={handleAddProject}
          disabled={!newTitle.trim()}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-300 text-xs font-semibold rounded-lg transition"
        >
          Add to Showcase
        </button>
      </div>
    </div>
  );
};

