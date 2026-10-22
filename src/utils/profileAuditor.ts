import { ProfileConfig } from '../types';

export interface AuditItem {
  id: string;
  category: 'identity' | 'hero' | 'tech' | 'stats' | 'widgets' | 'projects' | 'socials';
  title: string;
  passed: boolean;
  score: number;
  maxScore: number;
  tip: string;
  targetTab: 'profile' | 'layout' | 'header' | 'badges' | 'stats' | 'widgets' | 'bio' | 'projects' | 'socials';
}

export interface ProfileAuditResult {
  totalScore: number;
  grade: 'S' | 'A+' | 'A' | 'B' | 'C';
  gradeTitle: string;
  gradeColor: string;
  items: AuditItem[];
  passedCount: number;
  totalCount: number;
  summary: string;
  topRecommendations: string[];
}

export function calculateProfileScore(config: ProfileConfig): ProfileAuditResult {
  const items: AuditItem[] = [];

  // 1. Identity & Branding (20 max)
  const hasName = Boolean(config.displayName && config.displayName.trim().length > 1);
  const hasHeadline = Boolean(config.headline && config.headline.trim().length > 5);
  items.push({
    id: 'identity-core',
    category: 'identity',
    title: 'Display Name & Headline',
    passed: hasName && hasHeadline,
    score: hasName && hasHeadline ? 10 : (hasName || hasHeadline ? 5 : 0),
    maxScore: 10,
    tip: 'Define a punchy name and professional role headline that immediately captures attention.',
    targetTab: 'profile'
  });

  const hasAvatar = Boolean(config.avatarUrl && config.avatarUrl.trim().length > 0);
  items.push({
    id: 'identity-avatar',
    category: 'identity',
    title: 'Custom Avatar Framing',
    passed: hasAvatar,
    score: hasAvatar ? 6 : 0,
    maxScore: 6,
    tip: 'Enable a high-contrast framed portrait or cyberpunk avatar shape.',
    targetTab: 'profile'
  });

  const hasLocationOrHire = Boolean(config.location || config.availableForHire);
  items.push({
    id: 'identity-hireable',
    category: 'identity',
    title: 'Recruiter Signals (Location & Hire Status)',
    passed: hasLocationOrHire,
    score: hasLocationOrHire ? 4 : 0,
    maxScore: 4,
    tip: 'Toggle "Available for Hire" and add your location/country to attract recruiter inquiries.',
    targetTab: 'profile'
  });

  // 2. Hero & Visual Presentation (15 max)
  const hasHeroBanner = Boolean(
    config.bannerType === 'cyber-hud' ||
    config.bannerType === 'typing' ||
    config.bannerType === 'wave' ||
    config.bannerType === 'retro' ||
    (config.bannerType === 'custom' && config.customBannerUrl)
  );
  items.push({
    id: 'hero-banner',
    category: 'hero',
    title: 'Dynamic Hero Header Banner',
    passed: hasHeroBanner,
    score: hasHeroBanner ? 10 : 0,
    maxScore: 10,
    tip: 'Use the Cyber HUD Terminal or Animated Typing SVG to make your profile stand out.',
    targetTab: 'header'
  });

  const hasTypingLines = Boolean(config.typingText && config.typingText.length >= 2);
  items.push({
    id: 'hero-typing',
    category: 'hero',
    title: 'Multi-Role Animated Typing Lines',
    passed: hasTypingLines,
    score: hasTypingLines ? 5 : (config.typingText && config.typingText.length === 1 ? 3 : 0),
    maxScore: 5,
    tip: 'Add at least 2-3 rotating typewriter roles to showcase your versatility.',
    targetTab: 'header'
  });

  // 3. Technical Stack Arsenal (20 max)
  const badgeCount = (config.techBadges?.length || 0) + (config.customBadges?.length || 0);
  const hasTechBadges = badgeCount >= 5;
  const isDiverseTech = badgeCount >= 8;
  items.push({
    id: 'tech-badges',
    category: 'tech',
    title: 'Tech Stack & Weaponry Badges',
    passed: hasTechBadges,
    score: isDiverseTech ? 15 : (hasTechBadges ? 10 : (badgeCount > 0 ? 5 : 0)),
    maxScore: 15,
    tip: 'Select at least 6-8 badges representing your languages, frameworks, cloud, and tools.',
    targetTab: 'badges'
  });

  const hasCustomBadgeOrStyle = Boolean(config.badgeStyle === 'for-the-badge' || (config.customBadges && config.customBadges.length > 0));
  items.push({
    id: 'tech-styling',
    category: 'tech',
    title: 'Badge Aesthetic Impact',
    passed: hasCustomBadgeOrStyle,
    score: hasCustomBadgeOrStyle ? 5 : 2,
    maxScore: 5,
    tip: 'Choose the high-impact "For the Badge" style or craft custom specialty badges.',
    targetTab: 'badges'
  });

  // 4. Live GitHub Analytics & Stats (15 max)
  const stats = config.stats;
  const hasStatsCard = Boolean(stats?.showStatsCard || stats?.showStreak);
  items.push({
    id: 'stats-cards',
    category: 'stats',
    title: 'GitHub Stats & Streak Counters',
    passed: hasStatsCard,
    score: hasStatsCard ? 8 : 0,
    maxScore: 8,
    tip: 'Display real-time commits, pull requests, stars, and streak analytics.',
    targetTab: 'stats'
  });

  const hasAdvancedStats = Boolean(stats?.showTopLangs || stats?.showActivityGraph || stats?.showTrophies || stats?.showActivitySnake);
  items.push({
    id: 'stats-advanced',
    category: 'stats',
    title: 'Top Languages or Activity Graph',
    passed: hasAdvancedStats,
    score: hasAdvancedStats ? 7 : 0,
    maxScore: 7,
    tip: 'Enable the Language Breakdown donut or Commit Activity Mountain Graph.',
    targetTab: 'stats'
  });

  // 5. Dynamic Cloud Live Widgets (10 max)
  const widgets = config.widgets;
  const hasWidgets = Boolean(widgets?.showLeetCode || widgets?.showDevQuote || widgets?.showDevJoke);
  items.push({
    id: 'widgets-dyno',
    category: 'widgets',
    title: 'Dynamic Live Cloud Widgets',
    passed: hasWidgets,
    score: hasWidgets ? 10 : 0,
    maxScore: 10,
    tip: 'Inject auto-refreshing LeetCode performance, daily quotes, or dev jokes.',
    targetTab: 'widgets'
  });

  // 6. Proof of Work & Featured Projects (12 max)
  const projectCount = config.projects?.length || 0;
  const hasProjects = projectCount >= 1;
  const hasMultipleProjects = projectCount >= 2;
  items.push({
    id: 'projects-featured',
    category: 'projects',
    title: 'Featured Open-Source Showcases',
    passed: hasProjects,
    score: hasMultipleProjects ? 12 : (hasProjects ? 7 : 0),
    maxScore: 12,
    tip: 'Add 2 or more repositories showcasing real architecture with demo and source links.',
    targetTab: 'projects'
  });

  // 7. Recruiter Reachability & Support (8 max)
  const enabledSocials = (config.socials || []).filter((s) => s.enabled && s.url);
  const hasSocials = enabledSocials.length >= 2;
  items.push({
    id: 'socials-connect',
    category: 'socials',
    title: 'Social Reachability (LinkedIn / X / Discord)',
    passed: hasSocials,
    score: hasSocials ? 5 : (enabledSocials.length > 0 ? 3 : 0),
    maxScore: 5,
    tip: 'Add LinkedIn and GitHub links so hiring managers can reach you instantly.',
    targetTab: 'socials'
  });

  const enabledSupport = (config.support || []).filter((s) => s.enabled && s.username);
  const hasSupport = enabledSupport.length > 0;
  items.push({
    id: 'support-sponsors',
    category: 'socials',
    title: 'Community Sponsorship (BuyMeACoffee / GitHub)',
    passed: hasSupport,
    score: hasSupport ? 3 : 0,
    maxScore: 3,
    tip: 'Add a sponsor or BuyMeACoffee button for open-source support.',
    targetTab: 'socials'
  });

  // Tally total score
  const totalScore = items.reduce((acc, item) => acc + item.score, 0);
  const passedCount = items.filter((i) => i.passed).length;
  const totalCount = items.length;

  let grade: ProfileAuditResult['grade'] = 'C';
  let gradeTitle = 'Needs Work 🌱';
  let gradeColor = 'text-amber-400';

  if (totalScore >= 90) {
    grade = 'S';
    gradeTitle = 'S-Tier Recruiter Magnet 🚀';
    gradeColor = 'text-emerald-400';
  } else if (totalScore >= 78) {
    grade = 'A+';
    gradeTitle = 'A+ High-Impact Professional ⚡';
    gradeColor = 'text-cyan-400';
  } else if (totalScore >= 65) {
    grade = 'A';
    gradeTitle = 'A-Tier Solid Profile ✨';
    gradeColor = 'text-blue-400';
  } else if (totalScore >= 50) {
    grade = 'B';
    gradeTitle = 'B-Tier Emerging Developer 🛠️';
    gradeColor = 'text-amber-400';
  }

  const topRecommendations = items
    .filter((i) => !i.passed)
    .slice(0, 3)
    .map((i) => i.tip);

  let summary = `Your profile scored ${totalScore}/100 points (${gradeTitle}).`;
  if (totalScore >= 90) {
    summary = `Exceptional build! Your profile is in the top 5% of GitHub developer profiles with elite presentation and social proof.`;
  } else if (totalScore >= 75) {
    summary = `Great profile! Completing ${totalCount - passedCount} more items will unlock the elite S-Tier badge.`;
  }

  return {
    totalScore,
    grade,
    gradeTitle,
    gradeColor,
    items,
    passedCount,
    totalCount,
    summary,
    topRecommendations
  };
}

