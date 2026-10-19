import { ProfileConfig } from '../types';
import { TECH_BADGES, getBadgeUrl } from '../data/techStackBadges';

export function generateMarkdown(config: ProfileConfig): string {
  const lines: string[] = [];
  const username = config.githubUsername.trim() || 'your-username';

  // Header Title
  lines.push(`<h1 align="center">Hi 👋, I'm ${config.displayName || username}</h1>`);

  // Subtitle / Headline
  if (config.headline) {
    lines.push(`<h3 align="center">${config.headline}</h3>`);
  }

  // Profile Picture in README (if enabled)
  if (config.showAvatarInReadme && config.avatarUrl) {
    const shapeStyle =
      config.avatarShape === 'circle'
        ? 'border-radius: 50%;'
        : config.avatarShape === 'squircle'
        ? 'border-radius: 24%;'
        : config.avatarShape === 'square'
        ? 'border-radius: 12px;'
        : '';
    const width = config.avatarWidth || 160;
    const avatarSrc = config.avatarUrl.startsWith('/')
      ? `https://raw.githubusercontent.com/Dev-Suraj-Dhawal/readmeforge/main/public${config.avatarUrl}`
      : config.avatarUrl;

    const borderColor = config.avatarBorderColor || '#00FF66';
    const borderWidth = typeof config.avatarBorderWidth === 'number' ? config.avatarBorderWidth : 3;
    const borderStyle = borderWidth > 0 ? `border: ${borderWidth}px solid ${borderColor};` : '';

    lines.push(`<p align="center">\n  <img src="${avatarSrc}" width="${width}" height="${width}" alt="${config.displayName || username}" style="${shapeStyle} ${borderStyle} object-fit: cover;" />\n</p>\n`);
  }

  // Profile Views Badge & Status
  const statusBadges: string[] = [];
  if (config.stats.showProfileViews) {
    statusBadges.push(
      `<img src="https://komarev.com/ghpvc/?username=${username}&label=PROFILE+VIEWS&style=${config.stats.viewsStyle}&color=${config.stats.viewsColor.replace('#', '')}" alt="Profile Views" />`
    );
  }
  if (config.availableForHire) {
    statusBadges.push(
      `<img src="https://img.shields.io/badge/Status-Available%20for%20Hire-22c55e?style=${config.badgeStyle}&logo=github" alt="Available for hire" />`
    );
  }

  if (statusBadges.length > 0) {
    lines.push(`<p align="center">\n  ${statusBadges.join('\n  ')}\n</p>\n`);
  }

  // Holographic ASCII Dot Matrix Portrait Banner
  if (config.bannerType === 'ascii-dots' || config.showAsciiHologram) {
    lines.push(`<p align="center">\n  <img src="https://raw.githubusercontent.com/Dev-Suraj-Dhawal/readmeforge/main/public/ascii-portrait.png" width="340" alt="Holographic ASCII Dot Matrix" />\n</p>\n`);
  }

  // Animated Typing Header Banner
  if ((config.bannerType === 'typing' || config.bannerType === 'ascii-dots') && config.typingText.length > 0) {
    const encodedLines = config.typingText.map((t) => encodeURIComponent(t)).join(';');
    const font = encodeURIComponent(config.typingFont || 'Fira Code');
    const color = config.typingColor.replace('#', '') || '00FF66';
    const typingUrl = `https://readme-typing-svg.demolab.com?font=${font}&size=22&pause=1000&color=${color}&center=true&vCenter=true&width=600&height=70&lines=${encodedLines}`;

    lines.push(`<p align="center">\n  <a href="https://github.com/${username}">\n    <img src="${typingUrl}" alt="Typing SVG" />\n  </a>\n</p>\n`);
  } else if (config.bannerType === 'wave') {
    lines.push(`<p align="center">\n  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=10,24,38&height=180&section=header&text=${encodeURIComponent(config.displayName || username)}&fontSize=42&fontColor=ffffff&animation=fadeIn" width="100%" />\n</p>\n`);
  } else if (config.bannerType === 'retro') {
    lines.push(`<p align="center">\n  <img src="https://capsule-render.vercel.app/api?type=rect&color=timeGradient&text=${encodeURIComponent(config.displayName || username)}&fontSize=40&fontColor=ffffff" width="100%" />\n</p>\n`);
  } else if (config.bannerType === 'custom' && config.customBannerUrl) {
    lines.push(`<p align="center">\n  <img src="${config.customBannerUrl}" alt="Banner" width="100%" />\n</p>\n`);
  }

  // Quote
  if (config.quote) {
    lines.push(`> *"${config.quote}"*  \n> — **${config.quoteAuthor || 'Unknown'}**\n`);
  }

  // About Me Section
  const aboutItems: string[] = [];
  if (config.workingOn) aboutItems.push(`- 🔭 **I'm currently working on**: ${config.workingOn}`);
  if (config.learning) aboutItems.push(`- 🌱 **I'm currently learning**: ${config.learning}`);
  if (config.collaborateOn) aboutItems.push(`- 👯 **I'm looking to collaborate on**: ${config.collaborateOn}`);
  if (config.askMeAbout) aboutItems.push(`- 💬 **Ask me about**: ${config.askMeAbout}`);
  if (config.reachMe) aboutItems.push(`- 📫 **How to reach me**: ${config.reachMe}`);
  if (config.funFact) aboutItems.push(`- ⚡ **Fun fact**: ${config.funFact}`);

  if (aboutItems.length > 0) {
    lines.push(`## 💫 About Me\n`);
    lines.push(aboutItems.join('\n') + '\n');
  }

  // Tech Stack Badges
  if (config.techBadges && config.techBadges.length > 0) {
    lines.push(`## 🛠️ Tech Stack & Arsenal\n`);
    lines.push(`<p align="left">`);
    const badgeMarkdownItems = config.techBadges
      .map((id) => TECH_BADGES.find((b) => b.id === id))
      .filter((b): b is NonNullable<typeof b> => Boolean(b))
      .map((b) => `  <img src="${getBadgeUrl(b, config.badgeStyle)}" alt="${b.name}" />`);
    lines.push(badgeMarkdownItems.join('\n'));
    lines.push(`</p>\n`);
  }

  // GitHub Stats & Analytics
  const hasStats =
    config.stats.showStatsCard ||
    config.stats.showStreak ||
    config.stats.showTopLangs ||
    config.stats.showTrophies ||
    config.stats.showActivitySnake;

  if (hasStats) {
    lines.push(`## 📊 GitHub Analytics & Milestones\n`);

    // Trophies
    if (config.stats.showTrophies) {
      lines.push(`<p align="center">\n  <img src="https://github-profile-trophy.vercel.app/?username=${username}&theme=${config.stats.trophiesTheme || 'radical'}&no-frame=false&no-bg=true&margin_w=4" alt="GitHub Trophies" />\n</p>\n`);
    }

    // Stats Card & Streak Card side-by-side
    if (config.stats.showStatsCard || config.stats.showStreak) {
      lines.push(`<p align="center">`);
      if (config.stats.showStatsCard) {
        const hideBorder = config.stats.hideBorder ? '&hide_border=true' : '';
        const showIcons = config.stats.showIcons ? '&show_icons=true' : '';
        const showRank = config.stats.showRank ? '&show_rank=true' : '';
        lines.push(`  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${config.stats.statsTheme}&include_all_commits=true&count_private=true${hideBorder}${showIcons}${showRank}" alt="GitHub Stats" />`);
      }
      if (config.stats.showStreak) {
        lines.push(`  <img height="180em" src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${config.stats.streakTheme}&hide_border=false" alt="GitHub Streak" />`);
      }
      lines.push(`</p>\n`);
    }

    // Top Languages Card
    if (config.stats.showTopLangs) {
      lines.push(`<p align="center">\n  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=${config.stats.topLangsLayout}&theme=${config.stats.topLangsTheme}&hide_border=false" alt="Top Languages" />\n</p>\n`);
    }

    // Contribution Snake Animation
    if (config.stats.showActivitySnake) {
      lines.push(`### 🐍 Contribution Activity Matrix\n`);
      lines.push(`<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake-dark.svg">\n  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg">\n  <img alt="github contribution snake" src="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg">\n</picture>\n`);
    }
  }

  // Featured Projects
  if (config.projects && config.projects.length > 0) {
    lines.push(`## 🚀 Featured Projects\n`);
    lines.push(`| Project | Description | Tech Stack | Links |`);
    lines.push(`| :--- | :--- | :--- | :--- |`);
    config.projects.forEach((proj) => {
      const techList = proj.tech.map((t) => `\`${t}\``).join(' ');
      const links = [
        proj.repoUrl ? `[📦 Source](${proj.repoUrl})` : '',
        proj.liveUrl ? `[🌐 Demo](${proj.liveUrl})` : ''
      ].filter(Boolean).join(' • ');

      lines.push(`| **${proj.title}** | ${proj.description} | ${techList} | ${links} |`);
    });
    lines.push('');
  }

  // Connect & Socials
  const enabledSocials = config.socials.filter((s) => s.enabled && s.url);
  if (enabledSocials.length > 0) {
    lines.push(`## 🌐 Connect With Me\n`);
    lines.push(`<p align="left">`);
    enabledSocials.forEach((soc) => {
      let logo = soc.platform.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (soc.platform.includes('Twitter') || soc.platform.includes('X')) logo = 'x';
      if (soc.platform.includes('LinkedIn')) logo = 'linkedin';
      if (soc.platform.includes('YouTube')) logo = 'youtube';
      if (soc.platform.includes('Discord')) logo = 'discord';

      lines.push(`  <a href="${soc.url}" target="_blank">\n    <img src="https://img.shields.io/badge/${encodeURIComponent(soc.platform)}-000000?style=${config.badgeStyle}&logo=${logo}&logoColor=white" alt="${soc.platform}" />\n  </a>`);
    });
    lines.push(`</p>\n`);
  }

  // Support & Sponsors
  const enabledSupport = config.support.filter((s) => s.enabled && s.username);
  if (enabledSupport.length > 0) {
    lines.push(`## ☕ Support My Work\n`);
    lines.push(`<p align="left">`);
    enabledSupport.forEach((sup) => {
      if (sup.platform === 'buymeacoffee') {
        lines.push(`  <a href="https://www.buymeacoffee.com/${sup.username}" target="_blank">\n    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40" />\n  </a>`);
      } else if (sup.platform === 'kofi') {
        lines.push(`  <a href="https://ko-fi.com/${sup.username}" target="_blank">\n    <img src="https://img.shields.io/badge/Ko--fi-F16061?style=${config.badgeStyle}&logo=ko-fi&logoColor=white" alt="Ko-fi" />\n  </a>`);
      } else if (sup.platform === 'github') {
        lines.push(`  <a href="https://github.com/sponsors/${sup.username}" target="_blank">\n    <img src="https://img.shields.io/badge/Sponsor-EA4AAA?style=${config.badgeStyle}&logo=githubsponsors&logoColor=white" alt="GitHub Sponsors" />\n  </a>`);
      }
    });
    lines.push(`</p>\n`);
  }

  // Custom Markdown Block (if user wrote custom additions)
  if (config.customMarkdown && config.customMarkdown.trim()) {
    lines.push(`\n${config.customMarkdown.trim()}\n`);
  }

  // Sleek Footer
  lines.push(`---\n<p align="center">\n  <i>⚡ Crafted with <a href="https://github.com">ReadmeForge</a> — The Next-Gen Aesthetic GitHub Profile Architect</i>\n</p>`);

  return lines.join('\n');
}

