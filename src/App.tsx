import React, { useState, useEffect, useMemo } from 'react';
import { ProfileConfig, TemplatePreset } from './types';
import { TEMPLATE_PRESETS } from './data/templates';
import { generateMarkdown } from './utils/markdownGenerator';
import { Navbar } from './components/Navbar';
import { TemplateGallery } from './components/TemplateGallery';
import { ProfileEditor } from './components/Editor/ProfileEditor';
import { HeaderBannerEditor } from './components/Editor/HeaderBannerEditor';
import { BioEditor } from './components/Editor/BioEditor';
import { TechStackEditor } from './components/Editor/TechStackEditor';
import { StatsCardsEditor } from './components/Editor/StatsCardsEditor';
import { SocialsEditor } from './components/Editor/SocialsEditor';
import { ProjectsEditor } from './components/Editor/ProjectsEditor';
import { RawMarkdownEditor } from './components/Editor/RawMarkdownEditor';
import { SectionOrderEditor } from './components/Editor/SectionOrderEditor';
import { LiveWidgetsEditor } from './components/Editor/LiveWidgetsEditor';
import { GitHubSimulator } from './components/Preview/GitHubSimulator';
import { ReadmePreview } from './components/Preview/ReadmePreview';
import { GitHubGuideModal } from './components/Modals/GitHubGuideModal';
import { ProfileAuditModal } from './components/Modals/ProfileAuditModal';
import { calculateProfileScore } from './utils/profileAuditor';
import { 
  User, 
  Sparkles, 
  FileText, 
  Cpu, 
  BarChart3, 
  Share2, 
  FolderGit2, 
  Code2, 
  Eye, 
  PanelLeftClose, 
  PanelRightClose,
  Zap,
  Layers,
  ArrowUpDown,
  Award
} from 'lucide-react';

const STORAGE_KEY = 'readme_forge_config_v5_avatar_studio';

export default function App() {
  // Initial state from localStorage or Default Cyberpunk template
  const [config, setConfig] = useState<ProfileConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved config', e);
    }
    return TEMPLATE_PRESETS[0].config;
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'templates' | 'simulator' | 'raw'>('editor');
  const [editorSubTab, setEditorSubTab] = useState<'profile' | 'layout' | 'header' | 'badges' | 'stats' | 'widgets' | 'bio' | 'socials' | 'projects'>('profile');
  const [activeTemplateId, setActiveTemplateId] = useState<string>(TEMPLATE_PRESETS[0].id);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'builder' | 'preview'>('builder');

  // Custom markdown buffer when in raw mode
  const [customMarkdownText, setCustomMarkdownText] = useState<string>('');

  // Auto-generate markdown whenever config changes
  const generatedMarkdown = useMemo(() => {
    return generateMarkdown(config);
  }, [config]);

  // Real-time Profile Readiness & Recruiter Score Audit
  const profileAudit = useMemo(() => {
    return calculateProfileScore(config);
  }, [config]);

  // Sync custom markdown text on initial load or regenerate
  useEffect(() => {
    setCustomMarkdownText(generatedMarkdown);
  }, [generatedMarkdown]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [config]);

  const updateConfig = (updated: Partial<ProfileConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleSelectTemplate = (template: TemplatePreset) => {
    setConfig(template.config);
    setActiveTemplateId(template.id);
    setActiveTab('editor');
  };

  const handleReset = () => {
    if (confirm('Reset your profile configuration to default?')) {
      setConfig(TEMPLATE_PRESETS[0].config);
      setActiveTemplateId(TEMPLATE_PRESETS[0].id);
    }
  };

  const handleCopyMarkdown = () => {
    const textToCopy = activeTab === 'raw' ? customMarkdownText : generatedMarkdown;
    navigator.clipboard.writeText(textToCopy);
  };

  const handleDownloadMarkdown = () => {
    const textToDownload = activeTab === 'raw' ? customMarkdownText : generatedMarkdown;
    const blob = new Blob([textToDownload], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `readmeforge-${config.githubUsername || 'profile'}-config.json`);
    dlAnchorElem.click();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported && typeof imported === 'object') {
          setConfig(imported);
        }
      } catch (err) {
        alert('Invalid JSON configuration file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const editorTabs = [
    { id: 'profile', label: 'Identity', icon: User },
    { id: 'layout', label: 'Layout', icon: ArrowUpDown },
    { id: 'header', label: 'Animations', icon: Sparkles },
    { id: 'badges', label: 'Tech Stack', icon: Cpu },
    { id: 'stats', label: 'Live Stats', icon: BarChart3 },
    { id: 'widgets', label: 'Live Widgets', icon: Layers },
    { id: 'bio', label: 'Bio Bullets', icon: FileText },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'socials', label: 'Connect', icon: Share2 }
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 bg-grid-pattern">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCopyMarkdown={handleCopyMarkdown}
        onDownloadMarkdown={handleDownloadMarkdown}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenAudit={() => setIsAuditOpen(true)}
        profileScore={profileAudit.totalScore}
        profileGrade={profileAudit.grade}
        onReset={handleReset}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        githubUsername={config.githubUsername}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        {/* VIEW 1: TEMPLATES VAULT */}
        {activeTab === 'templates' && (
          <TemplateGallery
            onSelectTemplate={handleSelectTemplate}
            activeTemplateId={activeTemplateId}
          />
        )}

        {/* VIEW 2: GITHUB SIMULATOR FULL VIEW */}
        {activeTab === 'simulator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fadeIn">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <span>Real-time GitHub Profile Simulation</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Exact visual representation of how your README renders on official GitHub web & mobile interfaces.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('editor')}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition"
              >
                Back to Builder
              </button>
            </div>

            <GitHubSimulator config={config} markdown={generatedMarkdown} />
          </div>
        )}

        {/* VIEW 3: RAW MARKDOWN EDITOR */}
        {activeTab === 'raw' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col animate-fadeIn">
            <RawMarkdownEditor
              markdown={customMarkdownText}
              onChangeMarkdown={setCustomMarkdownText}
              onResetToGenerated={() => setCustomMarkdownText(generatedMarkdown)}
              onCopy={handleCopyMarkdown}
            />
          </div>
        )}

        {/* VIEW 4: VISUAL STUDIO BUILDER (SPLIT VIEW) */}
        {activeTab === 'editor' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
            
            {/* Quick Hero Banner */}
            <div className="flex items-center justify-between p-3.5 mb-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">
                    Designing for: <span className="font-mono text-cyan-300">@{config.githubUsername || 'username'}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Live changes compile immediately. Switch between tabs on the left or preview tabs on the right.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAuditOpen(true)}
                  className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition flex items-center gap-1.5 ${
                    profileAudit.totalScore >= 90
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
                      : profileAudit.totalScore >= 75
                      ? 'bg-cyan-950/50 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50'
                      : 'bg-amber-950/50 border-amber-500/40 text-amber-300 hover:bg-amber-900/50'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Audit: <strong>{profileAudit.totalScore}%</strong></span>
                  <span className="text-[10px] opacity-75 font-bold">({profileAudit.grade})</span>
                </button>

                <button
                  onClick={() => setActiveTab('templates')}
                  className="text-xs text-purple-300 hover:text-purple-200 bg-purple-950/50 hover:bg-purple-900/50 border border-purple-800/50 px-3 py-1.5 rounded-lg cursor-pointer transition"
                >
                  ⚡ Browse Templates
                </button>
              </div>
            </div>

            {/* Mobile View Toggle (visible only on small/medium screens, hidden on desktop lg) */}
            <div className="lg:hidden flex items-center p-1 mb-4 bg-slate-900/90 border border-slate-800 rounded-xl">
              <button
                onClick={() => setMobileView('builder')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition ${
                  mobileView === 'builder'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Visual Builder</span>
              </button>
              <button
                onClick={() => setMobileView('preview')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition ${
                  mobileView === 'preview'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live README Preview</span>
              </button>
            </div>

            {/* Split Screen Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
              
              {/* Left Column: Visual Builder Controls */}
              <div className={`lg:col-span-6 flex flex-col rounded-3xl border border-slate-800 bg-[#0d121f]/90 backdrop-blur-xl p-4 sm:p-5 shadow-2xl ${
                mobileView === 'builder' ? 'flex' : 'hidden lg:flex'
              }`}>
                
                {/* Builder Sub-tabs Navigation */}
                <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-5 border-b border-slate-800 text-xs">
                  {editorTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = editorSubTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setEditorSubTab(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Subtab Panels */}
                <div className="flex-1 overflow-y-auto pr-1">
                  {editorSubTab === 'profile' && (
                    <ProfileEditor config={config} onChange={updateConfig} />
                  )}
                  {editorSubTab === 'layout' && (
                    <SectionOrderEditor
                      sectionOrder={config.sectionOrder}
                      onChange={(sectionOrder) => updateConfig({ sectionOrder })}
                    />
                  )}
                  {editorSubTab === 'header' && (
                    <HeaderBannerEditor config={config} onChange={updateConfig} />
                  )}
                  {editorSubTab === 'badges' && (
                    <TechStackEditor config={config} onChange={updateConfig} />
                  )}
                  {editorSubTab === 'stats' && (
                    <StatsCardsEditor
                      stats={config.stats}
                      onChange={(st) => updateConfig({ stats: { ...config.stats, ...st } })}
                      username={config.githubUsername}
                    />
                  )}
                  {editorSubTab === 'widgets' && (
                    <LiveWidgetsEditor
                      widgets={config.widgets}
                      onChange={(widgets) => updateConfig({ widgets })}
                      githubUsername={config.githubUsername}
                    />
                  )}
                  {editorSubTab === 'bio' && (
                    <BioEditor config={config} onChange={updateConfig} />
                  )}
                  {editorSubTab === 'projects' && (
                    <ProjectsEditor
                      projects={config.projects}
                      onChange={(projects) => updateConfig({ projects })}
                    />
                  )}
                  {editorSubTab === 'socials' && (
                    <SocialsEditor
                      socials={config.socials}
                      support={config.support}
                      onSocialsChange={(socials) => updateConfig({ socials })}
                      onSupportChange={(support) => updateConfig({ support })}
                    />
                  )}
                </div>
              </div>

              {/* Right Column: Live README Preview Pane */}
              <div className={`lg:col-span-6 lg:sticky lg:top-20 self-start ${
                mobileView === 'preview' ? 'block' : 'hidden lg:block'
              }`}>
                <div className="h-[600px] sm:h-[700px] lg:h-[750px]">
                  <ReadmePreview
                    markdown={generatedMarkdown}
                    username={config.githubUsername}
                    avatarUrl={config.avatarUrl}
                    dotColor={`#${config.typingColor.replace('#', '') || '00FF66'}`}
                    onCopy={handleCopyMarkdown}
                    onDownload={handleDownloadMarkdown}
                  />
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* GitHub Deployment Guide Modal */}
      <GitHubGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        username={config.githubUsername}
      />

      {/* Profile Readiness & Recruiter Score Audit Modal */}
      <ProfileAuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        audit={profileAudit}
        onNavigateTab={(tab) => {
          setEditorSubTab(tab);
          setActiveTab('editor');
        }}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/60 bg-[#090d16] py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>ReadmeForge Studio • 100% Client-Side High-Performance Architecture</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-cyan-400 transition"
            >
              How it works
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className="hover:text-cyan-400 transition"
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className="hover:text-cyan-400 transition"
            >
              Simulator
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
