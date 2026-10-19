export type BadgeStyle = 'for-the-badge' | 'flat-square' | 'flat' | 'plastic';

export interface TechBadge {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'devops' | 'ai_ml' | 'tools';
  logo: string;
  logoColor: string;
  bgColor: string;
}

export interface TypingLine {
  text: string;
}

export interface SocialLink {
  platform: string;
  username: string;
  url: string;
  enabled: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repoUrl: string;
  liveUrl?: string;
  stars?: number;
}

export interface SupportPlatform {
  platform: 'buymeacoffee' | 'kofi' | 'github' | 'patreon';
  username: string;
  enabled: boolean;
}

export interface StatsConfig {
  showStatsCard: boolean;
  statsTheme: string;
  showIcons: boolean;
  showRank: boolean;
  hideBorder: boolean;
  
  showStreak: boolean;
  streakTheme: string;
  
  showTopLangs: boolean;
  topLangsTheme: string;
  topLangsLayout: 'compact' | 'donut' | 'pie';
  
  showTrophies: boolean;
  trophiesTheme: string;
  
  showActivitySnake: boolean;
  showProfileViews: boolean;
  viewsColor: string;
  viewsStyle: BadgeStyle;
}

export interface ProfileConfig {
  githubUsername: string;
  displayName: string;
  headline: string;
  avatarUrl: string;
  location: string;
  company: string;
  website: string;
  pronouns: string;
  availableForHire: boolean;
  
  // Header & Aesthetics
  themeAesthetic: 'cyberpunk' | 'minimal' | 'lofi' | 'gamified' | 'matrix' | 'dracula';
  titleStyle?: 'cyber-badge' | 'gradient-glow' | 'terminal-code' | 'minimal-modern';
  bannerType: 'typing' | 'wave' | 'retro' | 'custom' | 'minimal' | 'ascii-dots' | 'cyber-hud';
  customBannerUrl?: string;
  typingText: string[];
  typingColor: string;
  typingFont: string;
  showAsciiHologram?: boolean;
  asciiDotColor?: string;
  showAvatarInReadme?: boolean;
  avatarShape?: 'circle' | 'squircle' | 'hexagon' | 'square' | 'diamond' | 'shield' | 'octagon' | 'cut-corner' | 'leaf';
  avatarStyle?: 'crisp' | 'cyber-glow' | 'matrix-green' | 'monochrome' | 'synthwave';
  avatarBorderColor?: string;
  avatarBorderWidth?: number;
  avatarZoom?: number;
  avatarPanX?: number;
  avatarPanY?: number;
  avatarRawSource?: string;
  avatarWidth?: number;
  
  // Bio Bullets
  workingOn: string;
  learning: string;
  collaborateOn: string;
  askMeAbout: string;
  reachMe: string;
  funFact: string;
  quote: string;
  quoteAuthor: string;

  // Sections
  techBadges: string[]; // ids of selected badges
  badgeStyle: BadgeStyle;
  
  socials: SocialLink[];
  stats: StatsConfig;
  projects: ProjectItem[];
  support: SupportPlatform[];
  
  customMarkdown: string;
}

export interface TemplatePreset {
  id: string;
  title: string;
  subtitle: string;
  category: 'Cyberpunk' | 'Minimalist' | 'Lofi & Anime' | 'Gamified 3D' | 'AI & Data' | 'Full-Stack';
  badgeStyle: BadgeStyle;
  tags: string[];
  previewGradient: string;
  config: ProfileConfig;
}

