import React from 'react';
import { ProfileConfig } from '../../types';
import { FileText, Quote, Sparkles, Wand2, Dices, Check } from 'lucide-react';

interface BioEditorProps {
  config: ProfileConfig;
  onChange: (updated: Partial<ProfileConfig>) => void;
}

const SMART_ARCHETYPES = [
  {
    id: 'saas',
    label: '🚀 Full-Stack SaaS Architect',
    data: {
      workingOn: 'High-scale multi-tenant SaaS architectures, real-time sync engines, and polished user experiences',
      learning: 'Event-driven microservices, distributed transaction coordination, and Edge runtimes',
      collaborateOn: 'Production-grade open-source SaaS kits, developer utilities, and modern React libraries',
      askMeAbout: 'Next.js, TypeScript, PostgreSQL, System Design, and UI/UX Craftsmanship',
      funFact: 'I believe the best code is the code you never had to write.',
      quote: 'First, solve the problem. Then, write the code.',
      quoteAuthor: 'John Johnson'
    }
  },
  {
    id: 'systems',
    label: '🛡️ Systems & Security Specialist',
    data: {
      workingOn: 'High-throughput network proxies, zero-trust cryptographic protocols, and Linux kernel observability',
      learning: 'eBPF tracing, memory-safe systems in Rust, and WebAssembly sandbox runtimes',
      collaborateOn: 'Open-source security scanners, low-overhead performance profiling, and reverse engineering tools',
      askMeAbout: 'Rust, Go, C++, Linux Internals, Memory Safety, and Network Protocols',
      funFact: 'There are 10 types of people: those who understand binary, and those who don\'t.',
      quote: 'Simplicity is prerequisite for reliability.',
      quoteAuthor: 'Edsger W. Dijkstra'
    }
  },
  {
    id: 'ai',
    label: '🤖 AI & Agentic Systems Engineer',
    data: {
      workingOn: 'Multi-agent autonomous coding loops, semantic search retrieval pipelines, and localized LLM fine-tuning',
      learning: 'Reinforcement learning from human feedback (RLHF), speculative decoding, and CUDA kernels',
      collaborateOn: 'Autonomous AI developer assistants, multimodal reasoning engines, and vector database benchmarks',
      askMeAbout: 'Python, PyTorch, LangChain, Transformers, Vector Search, and Agent Workflows',
      funFact: 'I trained an AI to remind me to drink water, but it hallucinated a coffee shop.',
      quote: 'The question of whether machines can think is about as relevant as whether submarines can swim.',
      quoteAuthor: 'Edsger W. Dijkstra'
    }
  },
  {
    id: 'cloud',
    label: '⚡ Cloud & DevOps Architect',
    data: {
      workingOn: 'Kubernetes cluster orchestration, automated GitOps deployment pipelines, and zero-downtime database migrations',
      learning: 'Terraform CDKs, service mesh traffic topologies, and cloud cost-optimization heuristics',
      collaborateOn: 'Cloud-native infrastructure boilerplates, automated reliability testing, and monitoring dashboards',
      askMeAbout: 'Docker, Kubernetes, AWS, Terraform, CI/CD Pipelines, and High Availability',
      funFact: 'It worked on my machine, so we shipped my machine to production via Docker.',
      quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      quoteAuthor: 'Martin Fowler'
    }
  },
  {
    id: 'oss',
    label: '🌱 Open Source Toolmaker',
    data: {
      workingOn: 'Intuitive developer tools, accessible CLI binaries, and comprehensive architectural documentation',
      learning: 'Developer ergonomics, cross-platform terminal TUI rendering, and community governance',
      collaborateOn: 'High-impact open-source libraries that make developer lives 10x easier',
      askMeAbout: 'Open Source Sustainability, CLI Design, TypeScript, and UI Engineering',
      funFact: 'I turned a 10-minute manual task into a 3-week automation project and loved every second.',
      quote: 'Programs must be written for people to read, and only incidentally for machines to execute.',
      quoteAuthor: 'Harold Abelson'
    }
  }
];

export const BioEditor: React.FC<BioEditorProps> = ({ config, onChange }) => {
  const [appliedId, setAppliedId] = React.useState<string | null>(null);

  const applyArchetype = (arch: typeof SMART_ARCHETYPES[0]) => {
    onChange(arch.data);
    setAppliedId(arch.id);
    setTimeout(() => setAppliedId(null), 2000);
  };

  const handleShuffleRandom = () => {
    const random = SMART_ARCHETYPES[Math.floor(Math.random() * SMART_ARCHETYPES.length)];
    applyArchetype(random);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>About Me Narrative & Philosophy</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Share what you are building, learning, tech discussions, and your engineering quote.
          </p>
        </div>

        <button
          type="button"
          onClick={handleShuffleRandom}
          title="Randomize narrative with an AI developer archetype"
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-800/40 transition cursor-pointer self-start sm:self-auto"
        >
          <Dices className="w-3.5 h-3.5" />
          <span>Shuffle Pitch</span>
        </button>
      </div>

      {/* Smart Archetype Pitch Enhancer */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-purple-400" />
            <span>1-Click Smart Narrative Archetypes</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
            AUTO-POLISH
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {SMART_ARCHETYPES.map((arch) => (
            <button
              key={arch.id}
              type="button"
              onClick={() => applyArchetype(arch)}
              className={`p-2.5 rounded-xl border text-left cursor-pointer transition flex items-center justify-between gap-2 text-xs font-medium ${
                appliedId === arch.id
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-purple-500/40 text-slate-300 hover:text-white'
              }`}
            >
              <span className="truncate">{arch.label}</span>
              {appliedId === arch.id ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Sparkles className="w-3 h-3 text-purple-400 shrink-0 opacity-60" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Narrative Fields */}
      <div className="space-y-4">
        {/* Working on */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>🔭 Currently working on</span>
          </label>
          <input
            type="text"
            value={config.workingOn}
            onChange={(e) => onChange({ workingOn: e.target.value })}
            placeholder="Autonomous AI agents, distributed storage engine, or next-gen Web3 protocol"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Learning */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>🌱 Currently learning</span>
          </label>
          <input
            type="text"
            value={config.learning}
            onChange={(e) => onChange({ learning: e.target.value })}
            placeholder="Rust async runtimes, eBPF kernel instrumentation, CUDA shaders"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Looking to collaborate on */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>👯 Looking to collaborate on</span>
          </label>
          <input
            type="text"
            value={config.collaborateOn}
            onChange={(e) => onChange({ collaborateOn: e.target.value })}
            placeholder="High-performance open-source tools, distributed databases, developer tooling"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Ask me about */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>💬 Ask me about</span>
          </label>
          <input
            type="text"
            value={config.askMeAbout}
            onChange={(e) => onChange({ askMeAbout: e.target.value })}
            placeholder="TypeScript, React, Node.js, Systems Architecture, Performance Tuning"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Reach me */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>📫 How to reach me</span>
          </label>
          <input
            type="text"
            value={config.reachMe}
            onChange={(e) => onChange({ reachMe: e.target.value })}
            placeholder="email@example.com or DM on Twitter/X @username"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Fun fact */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>⚡ Fun fact</span>
          </label>
          <input
            type="text"
            value={config.funFact}
            onChange={(e) => onChange({ funFact: e.target.value })}
            placeholder="I convert complex distributed systems problems into clean elegant code."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Quote Block */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white">Inspirational Quote Block</span>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Quote Text</label>
              <textarea
                rows={2}
                value={config.quote}
                onChange={(e) => onChange({ quote: e.target.value })}
                placeholder="Simplicity is prerequisite for reliability."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div className="space-y-1 sm:w-1/2">
              <label className="text-[11px] font-semibold text-slate-300">Author / Source</label>
              <input
                type="text"
                value={config.quoteAuthor}
                onChange={(e) => onChange({ quoteAuthor: e.target.value })}
                placeholder="Edsger W. Dijkstra"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
