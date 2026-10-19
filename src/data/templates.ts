import { TemplatePreset } from '../types';

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'cyberpunk-matrix',
    title: 'Cyberpunk // Matrix Architect',
    subtitle: 'High-contrast neon green & cyan glow with animated terminal typing and matrix snake',
    category: 'Cyberpunk',
    badgeStyle: 'for-the-badge',
    tags: ['Neon', 'Matrix', 'Terminal', 'Animated Snake', 'Dark Mode'],
    previewGradient: 'from-emerald-950 via-slate-900 to-cyan-950 border-emerald-500/30',
    config: {
      githubUsername: 'Dev-Suraj-Dhawal',
      displayName: 'Suraj Dhawal',
      headline: 'Full-Stack Developer & Systems Architect // Building Scalable Software',
      avatarUrl: '/suraj-portrait.jpg',
      showAvatarInReadme: true,
      avatarShape: 'circle',
      avatarWidth: 160,
      location: 'Nepal // Remote',
      company: 'Open Source Architect',
      website: 'https://surajdhawal.com.np/',
      pronouns: 'he/him',
      availableForHire: true,
      themeAesthetic: 'matrix',
      bannerType: 'ascii-dots',
      showAsciiHologram: true,
      asciiDotColor: '#00FF66',
      typingText: [
        'Full-Stack Developer & Systems Architect',
        'React, TypeScript, Node.js & Cloud Infrastructure',
        'Crafting crazy aesthetic developer tools ⚡',
        'Open Source Contributor & Problem Solver'
      ],
      typingColor: '00FF66',
      typingFont: 'Fira+Code',
      workingOn: 'Next-gen developer tooling and ultra-scalable web platforms',
      learning: 'Distributed systems, WebAssembly runtimes, and eBPF instrumentation',
      collaborateOn: 'High-impact open source tools, developer utilities, and modern SaaS',
      askMeAbout: 'TypeScript, React, Node.js, System Architecture, UI/UX Craftsmanship',
      reachMe: 'https://github.com/Dev-Suraj-Dhawal | blog: https://surajdhawal.com.np/',
      funFact: 'I convert complex ideas into elegant, high-performance code.',
      quote: 'Simplicity is prerequisite for reliability.',
      quoteAuthor: 'Edsger W. Dijkstra',
      techBadges: [
        'typescript', 'javascript', 'react', 'nextjs', 'nodejs', 'python', 'rust',
        'docker', 'postgresql', 'redis', 'tailwind', 'git', 'githubactions'
      ],
      badgeStyle: 'for-the-badge',
      socials: [
        { platform: 'GitHub', username: 'Dev-Suraj-Dhawal', url: 'https://github.com/Dev-Suraj-Dhawal', enabled: true },
        { platform: 'LinkedIn', username: 'surajdhawal', url: 'https://linkedin.com/in/surajdhawal', enabled: true },
        { platform: 'Website', username: 'surajdhawal.com.np', url: 'https://surajdhawal.com.np/', enabled: true },
        { platform: 'Discord', username: 'suraj#0001', url: 'https://discord.com', enabled: true }
      ],
      stats: {
        showStatsCard: true,
        statsTheme: 'radical',
        showIcons: true,
        showRank: true,
        hideBorder: false,
        showStreak: true,
        streakTheme: 'radical',
        showTopLangs: true,
        topLangsTheme: 'radical',
        topLangsLayout: 'compact',
        showTrophies: true,
        trophiesTheme: 'matrix',
        showActivitySnake: true,
        showProfileViews: true,
        viewsColor: '00FF66',
        viewsStyle: 'for-the-badge'
      },
      projects: [
        {
          id: 'p1',
          title: '⚡ ReadmeForge Studio',
          description: 'Next-Gen Aesthetic GitHub Profile README Architect with real-time GitHub simulation.',
          tech: ['React', 'TypeScript', 'Tailwind', 'Vite'],
          repoUrl: 'https://github.com/Dev-Suraj-Dhawal/readmeforge',
          liveUrl: 'https://readme-gray-gamma.vercel.app',
          stars: 128
        },
        {
          id: 'p2',
          title: '🛠️ TerraForge Studio',
          description: 'Modern infrastructure management and automated deployment platform.',
          tech: ['TypeScript', 'Cloud', 'Automation'],
          repoUrl: 'https://github.com/Dev-Suraj-Dhawal/terraforge-studio',
          stars: 94
        },
        {
          id: 'p3',
          title: '🧠 OpenReview AI',
          description: 'Automated pull-request review and intelligent code feedback assistant.',
          tech: ['Python', 'AI/ML', 'GitHub API'],
          repoUrl: 'https://github.com/Dev-Suraj-Dhawal/openreview-ai',
          stars: 87
        }
      ],
      support: [
        { platform: 'buymeacoffee', username: 'surajdhawal', enabled: true },
        { platform: 'github', username: 'Dev-Suraj-Dhawal', enabled: true }
      ],
      customMarkdown: ''
    }
  },
  {
    id: 'minimal-executive',
    title: 'Silicon Valley // Minimal Executive',
    subtitle: 'Ultra-clean monochrome typography with executive metrics and polished aesthetic',
    category: 'Minimalist',
    badgeStyle: 'flat-square',
    tags: ['Monochrome', 'Minimalist', 'Clean', 'Executive', 'High Signal'],
    previewGradient: 'from-zinc-950 via-slate-900 to-zinc-900 border-zinc-500/20',
    config: {
      githubUsername: 'alexrivera',
      displayName: 'Alex Rivera',
      headline: 'Staff Software Engineer @ HyperScale // Building systems for 100M+ users',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      location: 'San Francisco, CA',
      company: 'HyperScale Systems',
      website: 'https://alexrivera.codes',
      pronouns: 'he/him',
      availableForHire: false,
      themeAesthetic: 'minimal',
      bannerType: 'minimal',
      typingText: [
        'Staff Software Engineer & Distributed Systems Lead',
        'Scaling infrastructure from 10k to 100M+ daily requests',
        'Open Source Contributor & Technical Writer'
      ],
      typingColor: 'FFFFFF',
      typingFont: 'Inter',
      workingOn: 'Multi-region active-active distributed databases with automatic conflict resolution',
      learning: 'Formal verification (TLA+) and modern database internal storage engines',
      collaborateOn: 'Architectural design reviews, high-scale backend systems, and OSS tooling',
      askMeAbout: 'System Architecture, TypeScript, Go, High Availability, Database Sharding',
      reachMe: 'alex@alexrivera.codes',
      funFact: 'I track my coffee intake with an IoT scale connected to an influxDB time-series.',
      quote: 'Simplicity is prerequisite for reliability.',
      quoteAuthor: 'Edsger W. Dijkstra',
      techBadges: [
        'typescript', 'go', 'python', 'nextjs', 'react', 'postgresql', 'redis',
        'docker', 'kubernetes', 'aws', 'terraform', 'git'
      ],
      badgeStyle: 'flat-square',
      socials: [
        { platform: 'GitHub', username: 'alexrivera', url: 'https://github.com/alexrivera', enabled: true },
        { platform: 'LinkedIn', username: 'alex-rivera-dev', url: 'https://linkedin.com/in/alex-rivera-dev', enabled: true },
        { platform: 'X / Twitter', username: 'alexrivera_dev', url: 'https://x.com/alexrivera_dev', enabled: true }
      ],
      stats: {
        showStatsCard: true,
        statsTheme: 'dark',
        showIcons: true,
        showRank: true,
        hideBorder: true,
        showStreak: true,
        streakTheme: 'dark',
        showTopLangs: true,
        topLangsTheme: 'dark',
        topLangsLayout: 'compact',
        showTrophies: false,
        trophiesTheme: 'dark',
        showActivitySnake: false,
        showProfileViews: true,
        viewsColor: '2d3748',
        viewsStyle: 'flat-square'
      },
      projects: [
        {
          id: 'p1',
          title: '📐 ScaleMesh Engine',
          description: 'Zero-downtime distributed state synchronizer powering billions of RPC calls.',
          tech: ['Go', 'gRPC', 'PostgreSQL'],
          repoUrl: 'https://github.com/alexrivera/scalemesh',
          liveUrl: 'https://scalemesh.org',
          stars: 2150
        }
      ],
      support: [],
      customMarkdown: ''
    }
  },
  {
    id: 'lofi-aesthetic',
    title: 'Lofi Retro // Chill Dev Oasis',
    subtitle: 'Cozy pastel aesthetic with animated lofi vibes, soft colors, and music player',
    category: 'Lofi & Anime',
    badgeStyle: 'flat',
    tags: ['Pastel', 'Cozy', 'Lofi Beats', 'Catppuccin', 'Cute'],
    previewGradient: 'from-pink-950/40 via-purple-950/50 to-indigo-950/40 border-pink-500/30',
    config: {
      githubUsername: 'sakuracodes',
      displayName: 'Sakura Tanaka 🌸',
      headline: 'Frontend Artisan & UI/UX Craftsman // Crafting delightful digital spaces with love',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      location: 'Kyoto, Japan // Remote',
      company: 'Studio Lumina',
      website: 'https://sakura.art',
      pronouns: 'she/her',
      availableForHire: true,
      themeAesthetic: 'lofi',
      bannerType: 'wave',
      typingText: [
        'Brewing artisanal code & iced matcha lattes 🍵',
        'Crafting micro-interactions and silky 60fps animations ✨',
        'Designing delightful user experiences that make you smile'
      ],
      typingColor: 'F4B8E4',
      typingFont: 'Plus+Jakarta+Sans',
      workingOn: 'An open-source aesthetic design system with buttery smooth spring physics',
      learning: 'Three.js shaders, WebGL particle systems, and generative audio',
      collaborateOn: 'Creative web experiments, interactive UI components, design systems',
      askMeAbout: 'CSS tricks, React animations, Tailwind, Figma design tokens, Typography',
      reachMe: 'sakura@studiolumina.dev',
      funFact: 'I have a collection of 14 mechanical keyboards with custom hand-lubed switches.',
      quote: 'Code is poetry written with logic and rendered with beauty.',
      quoteAuthor: 'Sakura',
      techBadges: [
        'typescript', 'react', 'nextjs', 'vue', 'tailwind', 'framer', 'threejs',
        'figma', 'vite', 'astro', 'supabase'
      ],
      badgeStyle: 'flat',
      socials: [
        { platform: 'GitHub', username: 'sakuracodes', url: 'https://github.com/sakuracodes', enabled: true },
        { platform: 'X / Twitter', username: 'sakuracodes', url: 'https://x.com/sakuracodes', enabled: true },
        { platform: 'YouTube', username: 'sakuradev', url: 'https://youtube.com', enabled: true }
      ],
      stats: {
        showStatsCard: true,
        statsTheme: 'catppuccin_latte',
        showIcons: true,
        showRank: true,
        hideBorder: false,
        showStreak: true,
        streakTheme: 'catppuccin_latte',
        showTopLangs: true,
        topLangsTheme: 'catppuccin_latte',
        topLangsLayout: 'compact',
        showTrophies: true,
        trophiesTheme: 'flat',
        showActivitySnake: true,
        showProfileViews: true,
        viewsColor: 'EA76CB',
        viewsStyle: 'flat'
      },
      projects: [
        {
          id: 'p1',
          title: '🌸 Bloom-UI',
          description: 'A whimsical, accessible React component library with buttery smooth physics.',
          tech: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
          repoUrl: 'https://github.com/sakuracodes/bloom-ui',
          liveUrl: 'https://bloom-ui.dev',
          stars: 940
        }
      ],
      support: [
        { platform: 'kofi', username: 'sakuracodes', enabled: true },
        { platform: 'buymeacoffee', username: 'sakuracodes', enabled: true }
      ],
      customMarkdown: ''
    }
  },
  {
    id: 'gamified-3d',
    title: 'Gamified 3D // Level 99 Code Warrior',
    subtitle: 'RPG stats, 3D trophies, dynamic health bars, and retro arcade achievements',
    category: 'Gamified 3D',
    badgeStyle: 'for-the-badge',
    tags: ['Trophies', '3D Badges', 'RPG', 'Level 99', 'Retro Arcade'],
    previewGradient: 'from-amber-950/40 via-red-950/40 to-slate-900 border-amber-500/30',
    config: {
      githubUsername: 'pixelknight',
      displayName: 'Captain Rex ⚔️',
      headline: 'Level 99 Full-Stack Sorcerer // Slaying bugs & crafting epic digital quests',
      avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80',
      location: 'The Citadel // Global Server',
      company: 'Guild of Code Architects',
      website: 'https://pixelknight.games',
      pronouns: 'he/him',
      availableForHire: true,
      themeAesthetic: 'gamified',
      bannerType: 'typing',
      typingText: [
        'Equipped with: TypeScript +10 & Rust Enchantment',
        'Current Quest: Reaching 10,000 GitHub Stars 🌟',
        'Mana: 100% | Critical Hit Rate on Bug Fixes: 98%'
      ],
      typingColor: 'F59E0B',
      typingFont: 'Fira+Code',
      workingOn: 'Multiplayer WebGPU real-time tactical dungeon crawler game engine',
      learning: 'Vulkan API, WebAssembly SIMD shaders, and ECS architecture',
      collaborateOn: 'Game development, indie hacking, high-FPS graphic simulations',
      askMeAbout: 'TypeScript, Rust, Three.js, Canvas API, Game Loops, State Management',
      reachMe: 'rex@pixelknight.games',
      funFact: 'Finished Dark Souls 1 on a dance pad while waiting for webpack to compile.',
      quote: 'It is dangerous to go alone! Take this: `git commit -m "fix everything"`',
      quoteAuthor: 'Old Code Hermit',
      techBadges: [
        'rust', 'cpp', 'typescript', 'threejs', 'vite', 'docker', 'webassembly' as any,
        'neovim', 'git'
      ],
      badgeStyle: 'for-the-badge',
      socials: [
        { platform: 'GitHub', username: 'pixelknight', url: 'https://github.com/pixelknight', enabled: true },
        { platform: 'Discord', username: 'rex#1337', url: 'https://discord.com', enabled: true },
        { platform: 'YouTube', username: 'pixelknightgames', url: 'https://youtube.com', enabled: true }
      ],
      stats: {
        showStatsCard: true,
        statsTheme: 'tokyonight',
        showIcons: true,
        showRank: true,
        hideBorder: false,
        showStreak: true,
        streakTheme: 'tokyonight',
        showTopLangs: true,
        topLangsTheme: 'tokyonight',
        topLangsLayout: 'compact',
        showTrophies: true,
        trophiesTheme: 'juicy',
        showActivitySnake: true,
        showProfileViews: true,
        viewsColor: 'F59E0B',
        viewsStyle: 'for-the-badge'
      },
      projects: [
        {
          id: 'p1',
          title: '🎮 DungeonForge-ECS',
          description: 'High-performance WebAssembly entity component system for 2D/3D browser games.',
          tech: ['Rust', 'Wasm', 'WebGL'],
          repoUrl: 'https://github.com/pixelknight/dungeonforge',
          stars: 1840
        }
      ],
      support: [
        { platform: 'buymeacoffee', username: 'pixelknight', enabled: true }
      ],
      customMarkdown: ''
    }
  },
  {
    id: 'ai-neural',
    title: 'Neural Weaver // AI & Deep Learning',
    subtitle: 'Cutting-edge PyTorch, Hugging Face, LLM orchestration, and mathematical elegance',
    category: 'AI & Data',
    badgeStyle: 'flat-square',
    tags: ['Machine Learning', 'PyTorch', 'LLMs', 'Hugging Face', 'Data Science'],
    previewGradient: 'from-violet-950/50 via-slate-900 to-indigo-950/40 border-violet-500/30',
    config: {
      githubUsername: 'neural-alchemist',
      displayName: 'Dr. Elena Rostova',
      headline: 'AI Research Scientist & LLM Systems Architect // Training models that reason',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      location: 'Zurich, Switzerland',
      company: 'Cortex Research Labs',
      website: 'https://elenarostova.ai',
      pronouns: 'she/her',
      availableForHire: false,
      themeAesthetic: 'cyberpunk',
      bannerType: 'typing',
      typingText: [
        'Autonomous Agent Architectures & LLM Fine-Tuning',
        'Transformer interpretability & mechanistic analysis',
        'Scaling multi-modal reasoning engines with low-rank adaptation'
      ],
      typingColor: 'A855F7',
      typingFont: 'Fira+Code',
      workingOn: 'Sparse Mixture-of-Experts routing for efficient on-device reasoning',
      learning: 'Mechanistic interpretability of residual streams in 70B+ param models',
      collaborateOn: 'Open foundation models, synthetic data pipelines, robotics foundation models',
      askMeAbout: 'PyTorch, CUDA optimizations, LoRA/QLoRA, vLLM, Vector Databases',
      reachMe: 'elena@cortexresearch.ai',
      funFact: 'My GPU cluster produces enough heat to keep my tea warm all winter.',
      quote: 'What I cannot create, I do not understand.',
      quoteAuthor: 'Richard Feynman',
      techBadges: [
        'python', 'pytorch', 'huggingface', 'openai', 'langchain', 'pandas', 'numpy',
        'docker', 'fastapi', 'postgresql'
      ],
      badgeStyle: 'flat-square',
      socials: [
        { platform: 'GitHub', username: 'neural-alchemist', url: 'https://github.com/neural-alchemist', enabled: true },
        { platform: 'X / Twitter', username: 'elena_ai', url: 'https://x.com/elena_ai', enabled: true },
        { platform: 'LinkedIn', username: 'elena-rostova-ai', url: 'https://linkedin.com/in/elena-rostova-ai', enabled: true }
      ],
      stats: {
        showStatsCard: true,
        statsTheme: 'synthwave',
        showIcons: true,
        showRank: true,
        hideBorder: false,
        showStreak: true,
        streakTheme: 'synthwave',
        showTopLangs: true,
        topLangsTheme: 'synthwave',
        topLangsLayout: 'compact',
        showTrophies: true,
        trophiesTheme: 'radical',
        showActivitySnake: true,
        showProfileViews: true,
        viewsColor: '8B5CF6',
        viewsStyle: 'flat-square'
      },
      projects: [
        {
          id: 'p1',
          title: '🧠 NanoMoE-Trainer',
          description: 'Lightweight distributed mixture-of-experts trainer running on single consumer GPUs.',
          tech: ['PyTorch', 'CUDA', 'Python'],
          repoUrl: 'https://github.com/neural-alchemist/nanomoe',
          stars: 3200
        }
      ],
      support: [],
      customMarkdown: ''
    }
  },
  {
    id: 'fullstack-saas',
    title: 'Full-Stack Unicorn // Modern SaaS Builder',
    subtitle: 'Vibrant gradients, tech badges, product showcase, and live GitHub stats',
    category: 'Full-Stack',
    badgeStyle: 'for-the-badge',
    tags: ['Next.js', 'TypeScript', 'SaaS', 'Tailwind', 'Indie Hacker'],
    previewGradient: 'from-blue-950/40 via-slate-900 to-indigo-950/40 border-blue-500/30',
    config: {
      githubUsername: 'davidbuilds',
      displayName: 'David Chen 🚀',
      headline: 'Full-Stack Product Engineer & Indie Hacker // $20k MRR building micro-SaaS',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      location: 'Vancouver, Canada // Digital Nomad',
      company: 'Founder @ ShipFastly',
      website: 'https://davidchen.dev',
      pronouns: 'he/him',
      availableForHire: true,
      themeAesthetic: 'cyberpunk',
      bannerType: 'typing',
      typingText: [
        'Building SaaS products at lightspeed ⚡',
        'Next.js 15, React 19, TypeScript, Tailwind & Supabase',
        'Turning caffeine and ideas into profitable software'
      ],
      typingColor: '38BDF8',
      typingFont: 'Plus+Jakarta+Sans',
      workingOn: 'AI-assisted customer feedback analyzer for indie makers',
      learning: 'Advanced Stripe billing webhooks and automated SEO indexing engines',
      collaborateOn: 'Next.js open source starter kits, indie maker directory, UI templates',
      askMeAbout: 'Next.js App Router, Supabase RLS, Tailwind v4, Product Strategy, Stripe',
      reachMe: 'david@shipfastly.com',
      funFact: 'Shipped 6 SaaS products in 6 months from coffee shops in 4 different continents.',
      quote: 'Ideas are cheap. Execution is the only currency that matters.',
      quoteAuthor: 'Anonymous Indie Maker',
      techBadges: [
        'typescript', 'react', 'nextjs', 'tailwind', 'nodejs', 'supabase', 'postgresql',
        'redis', 'prisma', 'docker', 'vercel', 'stripe' as any
      ],
      badgeStyle: 'for-the-badge',
      socials: [
        { platform: 'GitHub', username: 'davidbuilds', url: 'https://github.com/davidbuilds', enabled: true },
        { platform: 'X / Twitter', username: 'davidbuilds', url: 'https://x.com/davidbuilds', enabled: true },
        { platform: 'LinkedIn', username: 'davidchen-dev', url: 'https://linkedin.com/in/davidchen-dev', enabled: true }
      ],
      stats: {
        showStatsCard: true,
        statsTheme: 'dracula',
        showIcons: true,
        showRank: true,
        hideBorder: false,
        showStreak: true,
        streakTheme: 'dracula',
        showTopLangs: true,
        topLangsTheme: 'dracula',
        topLangsLayout: 'compact',
        showTrophies: true,
        trophiesTheme: 'dracula',
        showActivitySnake: true,
        showProfileViews: true,
        viewsColor: '38BDF8',
        viewsStyle: 'for-the-badge'
      },
      projects: [
        {
          id: 'p1',
          title: '🚀 LaunchPulse SaaS',
          description: 'Real-time analytics and user onboarding feedback platform with 15k active users.',
          tech: ['Next.js', 'Tailwind', 'Supabase', 'Stripe'],
          repoUrl: 'https://github.com/davidbuilds/launchpulse',
          liveUrl: 'https://launchpulse.co',
          stars: 1250
        }
      ],
      support: [
        { platform: 'buymeacoffee', username: 'davidbuilds', enabled: true },
        { platform: 'github', username: 'davidbuilds', enabled: true }
      ],
      customMarkdown: ''
    }
  }
];

