import { ProfileConfig, DEFAULT_SECTION_ORDER } from '../types';
import { TECH_BADGES, getBadgeUrl } from '../data/techStackBadges';

function getDynamicAvatarUrl(config: ProfileConfig, username: string): string {
  const isSuraj = !username || username.toLowerCase().includes('suraj') || username === 'your-username';

  let url = config.avatarUrl;

  // Handle local base64 cropped data URLs (GitHub Camo blocks inline data: URIs)
  if (url && url.startsWith('data:')) {
    if (config.avatarRawSource && !config.avatarRawSource.startsWith('data:') && !config.avatarRawSource.startsWith('/')) {
      return config.avatarRawSource;
    }
    if (!isSuraj) {
      return `https://github.com/${encodeURIComponent(username)}.png`;
    }
    url = '/suraj-portrait.jpg';
  }

  // If user changed their GitHub username away from Suraj but avatarUrl is still default /suraj-portrait.jpg
  if (!isSuraj && (!url || url === '/suraj-portrait.jpg' || url.includes('suraj-portrait.jpg'))) {
    return `https://github.com/${encodeURIComponent(username)}.png`;
  }

  // If it's a relative path in public/
  if (url && url.startsWith('/')) {
    return `https://raw.githubusercontent.com/Dev-Suraj-Dhawal/readmeforge/main/public${url}`;
  }

  if (!url) {
    return isSuraj
      ? 'https://raw.githubusercontent.com/Dev-Suraj-Dhawal/readmeforge/main/public/suraj-portrait.jpg'
      : `https://github.com/${encodeURIComponent(username)}.png`;
  }

  return url;
}

function renderHeaderSection(
  config: ProfileConfig,
  username: string,
  name: string,
  headline: string
): string {
  const parts: string[] = [];
  const titleTheme = config.titleStyle || 'cyber-badge';
  const isSuraj = !username || username.toLowerCase().includes('suraj') || username === 'your-username';
  const dynamicAvatarUrl = getDynamicAvatarUrl(config, username);

  if (config.bannerType === 'cyber-hud') {
    const activeColor = config.typingColor ? `#${config.typingColor.replace('#', '')}` : '#00FF66';

    // 5-6 top Tech Badges as phosphor CLI capsules
    const techPills = (config.techBadges && config.techBadges.length > 0
      ? config.techBadges.slice(0, 6).map((id) => {
          const badge = TECH_BADGES.find((b) => b.id === id);
          const label = badge ? badge.name : id;
          return `<code><b>[ ${label} ]</b></code>`;
        })
      : ['<code><b>[ Java 21 ]</b></code>', '<code><b>[ Spring Boot ]</b></code>', '<code><b>[ TypeScript ]</b></code>', '<code><b>[ Docker ]</b></code>', '<code><b>[ AWS ]</b></code>']
    ).join(' ');

    const mission = config.workingOn || 'secure APIs, SaaS products, creative developer tooling';

    // Dynamic terminal portrait: Suraj's ASCII portrait for Suraj, or user's live avatar for custom users
    const terminalPortraitSrc = isSuraj
      ? 'https://raw.githubusercontent.com/Dev-Suraj-Dhawal/readmeforge/main/public/ascii-portrait.png'
      : dynamicAvatarUrl;

    parts.push(
`<div align="center">
  <table align="center" width="100%" style="background-color: #04080e; border: 2px solid ${activeColor}; border-radius: 20px; box-shadow: 0 0 25px ${activeColor}40; max-width: 840px;">
    <tr>
      <td width="60%" style="padding: 24px; vertical-align: top; text-align: left; border: none;">
        <p style="margin: 0 0 6px 0; font-family: monospace; font-size: 11px; color: ${activeColor}; font-weight: bold; letter-spacing: 1.5px;">
          ■■■ SYSTEM INTERFACE // ACTIVE
        </p>
        <p style="margin: 0 0 6px 0; font-family: monospace; font-size: 13px; color: ${activeColor}; font-weight: bold;">
          &gt; HELLO, WORLD
        </p>
        <div style="margin: 0 0 8px 0; font-family: monospace; font-size: 26px; color: ${activeColor}; font-weight: 900; letter-spacing: 1px; line-height: 1.2;">
          <b>${name.toUpperCase()}_</b>
        </div>
        <p style="margin: 0 0 14px 0; font-family: monospace; font-size: 12px; color: ${activeColor}dd; font-weight: 600;">
          ${headline}
        </p>
        <p style="margin: 0 0 14px 0;">
          ${techPills}
        </p>
        <p style="margin: 0; font-family: monospace; font-size: 11px; color: ${activeColor}; opacity: 0.85;">
          | mission -&gt; <b>${mission}</b>
        </p>
      </td>
      <td width="40%" align="center" style="padding: 24px; vertical-align: middle; border: none;">
        <div style="border: 1px solid ${activeColor}; border-radius: 14px; padding: 12px; background: #020508; box-shadow: 0 0 15px ${activeColor}26; max-width: 220px;">
          <p style="text-align: right; margin: 0 0 6px 0; font-family: monospace; font-size: 9px; color: ${activeColor}; font-weight: bold;">
            COMPLETE
          </p>
          <img src="${terminalPortraitSrc}" width="220" alt="${name} Terminal Portrait" style="border-radius: 12px; border: 2px solid ${activeColor}; object-fit: cover;" />
          <p style="text-align: left; margin: 8px 0 0 0; font-family: monospace; font-size: 9px; color: ${activeColor}; opacity: 0.8;">
            &gt; portrait.svg loaded // terminal profile
          </p>
        </div>
      </td>
    </tr>
  </table>
</div>`
    );
  } else if (titleTheme === 'terminal-code') {
    parts.push(
      `<div align="center">\n  <p align="center">\n    <code><b>$ whoami &gt;</b> ${name}</code><br/>\n    <code><b>$ echo $MISSION &gt;</b> ${headline || 'Building Scalable Software'}</code>\n  </p>\n</div>`
    );
  } else if (titleTheme === 'gradient-glow') {
    parts.push(
      `<div align="center">\n  <h1 align="center">\n    <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="32px" height="32px" alt="wave" /> <b>${name}</b>\n  </h1>\n  <p align="center"><em>✨ ${headline} ✨</em></p>\n</div>`
    );
  } else if (titleTheme === 'minimal-modern') {
    parts.push(
      `<div align="center">\n  <h1 align="center">${name}</h1>\n  <p align="center"><b>${headline}</b></p>\n</div>`
    );
  } else {
    // Default: 'cyber-badge' (Crazy Aesthetic Modern Theme)
    parts.push(
      `<div align="center">\n  <h1 align="center">\n    <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="32px" height="32px" alt="wave" /> Hi, I'm <b>${name}</b>\n  </h1>\n  <p align="center">\n    <code><b>⚡ ${headline} ⚡</b></code>\n  </p>\n</div>`
    );
  }

  // Profile Picture in README (if enabled and not cyber-hud)
  if (config.bannerType !== 'cyber-hud' && config.showAvatarInReadme && config.avatarUrl) {
    const shapeStyle =
      config.avatarShape === 'circle'
        ? 'border-radius: 50%;'
        : config.avatarShape === 'squircle'
        ? 'border-radius: 26%;'
        : config.avatarShape === 'square'
        ? 'border-radius: 14px;'
        : config.avatarShape === 'diamond'
        ? 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);'
        : config.avatarShape === 'hexagon'
        ? 'clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);'
        : config.avatarShape === 'shield'
        ? 'clip-path: polygon(50% 0%, 100% 15%, 100% 68%, 50% 100%, 0% 68%, 0% 15%);'
        : config.avatarShape === 'octagon'
        ? 'clip-path: polygon(28% 0%, 72% 0%, 100% 28%, 100% 72%, 72% 100%, 28% 100%, 0% 72%, 0% 28%);'
        : config.avatarShape === 'cut-corner'
        ? 'clip-path: polygon(18% 0, 100% 0, 100% 82%, 82% 100%, 0 100%, 0 18%);'
        : config.avatarShape === 'leaf'
        ? 'border-radius: 4px 50% 50% 50%;'
        : 'border-radius: 50%;';

    const filterStyle =
      config.avatarStyle === 'cyber-glow'
        ? 'filter: saturate(1.35) contrast(1.15);'
        : config.avatarStyle === 'matrix-green'
        ? 'filter: sepia(1) hue-rotate(80deg) saturate(2.5) contrast(1.2);'
        : config.avatarStyle === 'monochrome'
        ? 'filter: grayscale(1) contrast(1.2);'
        : config.avatarStyle === 'synthwave'
        ? 'filter: saturate(1.5) hue-rotate(295deg) contrast(1.2);'
        : config.avatarStyle === 'crisp'
        ? 'filter: contrast(1.06) brightness(1.02) saturate(1.05);'
        : '';

    const width = config.avatarWidth || 160;
    const avatarSrc = dynamicAvatarUrl;

    const borderColor = config.avatarBorderColor || '#00FF66';
    const borderWidth = typeof config.avatarBorderWidth === 'number' ? config.avatarBorderWidth : 3;
    const borderStyle = borderWidth > 0 ? `border: ${borderWidth}px solid ${borderColor};` : '';
    const glowStyle = borderWidth > 0 ? `box-shadow: 0 0 25px ${borderColor}66;` : '';

    parts.push(`<p align="center">\n  <img src="${avatarSrc}" width="${width}" height="${width}" alt="${config.displayName || username}" style="${shapeStyle} ${borderStyle} ${glowStyle} ${filterStyle} object-fit: cover;" />\n</p>`);
  }

  // Holographic ASCII Dot Matrix Portrait Banner
  if (config.bannerType === 'ascii-dots' || config.showAsciiHologram) {
    const dotBannerSrc = isSuraj
      ? 'https://raw.githubusercontent.com/Dev-Suraj-Dhawal/readmeforge/main/public/ascii-portrait.png'
      : dynamicAvatarUrl;
    parts.push(`<p align="center">\n  <img src="${dotBannerSrc}" width="340" alt="Holographic ASCII Dot Matrix" />\n</p>`);
  }

  // Animated Typing Header Banner
  if ((config.bannerType === 'typing' || config.bannerType === 'ascii-dots') && config.typingText.length > 0) {
    const encodedLines = config.typingText.map((t) => encodeURIComponent(t)).join(';');
    const font = encodeURIComponent(config.typingFont || 'Fira Code');
    const color = config.typingColor.replace('#', '') || '00FF66';
    const typingUrl = `https://readme-typing-svg.demolab.com?font=${font}&size=22&pause=1000&color=${color}&center=true&vCenter=true&width=600&height=70&lines=${encodedLines}`;

    parts.push(`<p align="center">\n  <a href="https://github.com/${username}">\n    <img src="${typingUrl}" alt="Typing SVG" />\n  </a>\n</p>`);
  } else if (config.bannerType === 'wave') {
    parts.push(`<p align="center">\n  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=10,24,38&height=180&section=header&text=${encodeURIComponent(config.displayName || username)}&fontSize=42&fontColor=ffffff&animation=fadeIn" width="100%" />\n</p>`);
  } else if (config.bannerType === 'retro') {
    parts.push(`<p align="center">\n  <img src="https://capsule-render.vercel.app/api?type=rect&color=timeGradient&text=${encodeURIComponent(config.displayName || username)}&fontSize=40&fontColor=ffffff" width="100%" />\n</p>`);
  } else if (config.bannerType === 'custom' && config.customBannerUrl) {
    parts.push(`<p align="center">\n  <img src="${config.customBannerUrl}" alt="Banner" width="100%" />\n</p>`);
  }

  return parts.join('\n\n');
}

function renderViewsSection(config: ProfileConfig, username: string): string {
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

  if (statusBadges.length === 0) return '';
  return `<p align="center">\n  ${statusBadges.join('\n  ')}\n</p>`;
}

function renderQuoteSection(config: ProfileConfig): string {
  if (!config.quote) return '';
  return `> *"${config.quote}"*  \n> — **${config.quoteAuthor || 'Unknown'}**`;
}

function renderAboutSection(config: ProfileConfig): string {
  const aboutItems: string[] = [];
  if (config.workingOn) aboutItems.push(`- 🔭 **I'm currently working on**: ${config.workingOn}`);
  if (config.learning) aboutItems.push(`- 🌱 **I'm currently learning**: ${config.learning}`);
  if (config.collaborateOn) aboutItems.push(`- 👯 **I'm looking to collaborate on**: ${config.collaborateOn}`);
  if (config.askMeAbout) aboutItems.push(`- 💬 **Ask me about**: ${config.askMeAbout}`);
  if (config.reachMe) aboutItems.push(`- 📫 **How to reach me**: ${config.reachMe}`);
  if (config.funFact) aboutItems.push(`- ⚡ **Fun fact**: ${config.funFact}`);

  if (aboutItems.length === 0) return '';
  return `## 💫 About Me\n\n${aboutItems.join('\n')}`;
}

function renderTechSection(config: ProfileConfig): string {
  const hasBadges = config.techBadges && config.techBadges.length > 0;
  const hasCustom = config.customBadges && config.customBadges.length > 0;
  if (!hasBadges && !hasCustom) return '';

  const badgeMarkdownItems: string[] = [];

  if (hasBadges) {
    config.techBadges
      .map((id) => TECH_BADGES.find((b) => b.id === id))
      .filter((b): b is NonNullable<typeof b> => Boolean(b))
      .forEach((b) => {
        badgeMarkdownItems.push(`  <img src="${getBadgeUrl(b, config.badgeStyle)}" alt="${b.name}" />`);
      });
  }

  if (hasCustom && config.customBadges) {
    config.customBadges.forEach((cb) => {
      const label = encodeURIComponent(cb.label);
      const msg = encodeURIComponent(cb.message);
      const col = cb.color.replace('#', '') || '00FF66';
      const logoParam = cb.logo ? `&logo=${encodeURIComponent(cb.logo)}` : '';
      const url = `https://img.shields.io/badge/${label}-${msg}-${col}?style=${config.badgeStyle}${logoParam}`;
      badgeMarkdownItems.push(`  <img src="${url}" alt="${cb.label}: ${cb.message}" />`);
    });
  }

  // Visual Skill Proficiency Meters
  if (config.skillMeters && config.skillMeters.length > 0) {
    badgeMarkdownItems.push('\n<br/>\n');
    config.skillMeters.forEach((sm) => {
      const name = encodeURIComponent(sm.name);
      const pct = encodeURIComponent(`${sm.percentage}%`);
      const col = (sm.color || '00FF66').replace('#', '');
      const url = `https://img.shields.io/badge/${name}-${pct}-${col}?style=for-the-badge`;
      badgeMarkdownItems.push(`  <img src="${url}" alt="${sm.name}: ${sm.percentage}%" />`);
    });
  }

  return `## 🛠️ Tech Stack & Arsenal\n\n<p align="left">\n${badgeMarkdownItems.join('\n')}\n</p>`;
}

function renderStatsSection(config: ProfileConfig, username: string): string {
  const hasStats =
    config.stats.showStatsCard ||
    config.stats.showStreak ||
    config.stats.showTopLangs ||
    config.stats.showTrophies ||
    config.stats.showActivityGraph ||
    config.stats.showActivitySnake;

  if (!hasStats) return '';

  const statBlocks: string[] = [`## 📊 GitHub Analytics & Milestones`];

  // Trophies
  if (config.stats.showTrophies) {
    statBlocks.push(`<p align="center">\n  <img src="https://github-profile-trophy.vercel.app/?username=${username}&theme=${config.stats.trophiesTheme || 'radical'}&no-frame=false&no-bg=true&margin_w=4" alt="GitHub Trophies" />\n</p>`);
  }

  // Stats Card & Streak Card side-by-side
  if (config.stats.showStatsCard || config.stats.showStreak) {
    const cards: string[] = [];
    if (config.stats.showStatsCard) {
      const hideBorder = config.stats.hideBorder ? '&hide_border=true' : '';
      const showIcons = config.stats.showIcons ? '&show_icons=true' : '';
      const showRank = config.stats.showRank ? '&show_rank=true' : '';
      const statsThemeParam = config.stats.statsTheme === 'matrix'
        ? 'title_color=00FF66&text_color=FFFFFF&icon_color=00FF66&bg_color=04080e&border_color=00FF66'
        : `theme=${config.stats.statsTheme || 'radical'}`;
      cards.push(`  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&${statsThemeParam}&include_all_commits=true&count_private=true${hideBorder}${showIcons}${showRank}" alt="GitHub Stats" />`);
    }
    if (config.stats.showStreak) {
      cards.push(`  <img height="180em" src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${config.stats.streakTheme}&hide_border=false" alt="GitHub Streak" />`);
    }
    statBlocks.push(`<p align="center">\n${cards.join('\n')}\n</p>`);
  }

  // Top Languages Card
  if (config.stats.showTopLangs) {
    const topLangsThemeParam = config.stats.topLangsTheme === 'matrix'
      ? 'title_color=00FF66&text_color=FFFFFF&icon_color=00FF66&bg_color=04080e&border_color=00FF66'
      : `theme=${config.stats.topLangsTheme || 'radical'}`;
    statBlocks.push(`<p align="center">\n  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs?username=${username}&layout=${config.stats.topLangsLayout}&${topLangsThemeParam}&hide_border=false" alt="Top Languages" />\n</p>`);
  }

  // Commit Activity Mountain Graph
  if (config.stats.showActivityGraph) {
    const graphTheme = config.stats.activityGraphTheme || 'github-compact';
    statBlocks.push(`<p align="center">\n  <img src="https://activity-graph.vercel.app/graph?username=${encodeURIComponent(username)}&theme=${encodeURIComponent(graphTheme)}&area=true&hide_border=true" alt="Commit Activity Graph" />\n</p>`);
  }

  // Contribution Snake Animation
  if (config.stats.showActivitySnake) {
    statBlocks.push(`### 🐍 Contribution Activity Matrix\n\n<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake-dark.svg">\n  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg">\n  <img alt="github contribution snake" src="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg">\n</picture>`);
  }

  return statBlocks.join('\n\n');
}

function renderWidgetsSection(config: ProfileConfig, username: string): string {
  const w = config.widgets;
  if (!w) return '';

  const widgetCards: string[] = [];
  const leetUser = (w.leetcodeUsername || config.githubUsername || username).trim();

  if (w.showLeetCode && leetUser) {
    const theme = encodeURIComponent(w.leetcodeTheme || 'nord');
    widgetCards.push(
      `<p align="center">\n  <a href="https://leetcode.com/${encodeURIComponent(leetUser)}" target="_blank">\n    <img src="https://leetcard.jacoblin.cool/${encodeURIComponent(leetUser)}?theme=${theme}&font=Fira+Code&ext=activity" alt="LeetCode Stats" />\n  </a>\n</p>`
    );
  }

  if (w.showDevQuote) {
    const theme = encodeURIComponent(w.quoteTheme || 'radical');
    widgetCards.push(
      `<p align="center">\n  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${theme}" alt="Daily Dev Quote" />\n</p>`
    );
  }

  if (w.showDevJoke) {
    const theme = encodeURIComponent(w.jokeTheme || 'dark');
    widgetCards.push(
      `<p align="center">\n  <img src="https://readme-jokes.vercel.app/api?theme=${theme}" alt="Dev Joke" />\n</p>`
    );
  }

  if (w.showWakatime) {
    const wakaUser = (w.wakatimeUsername || config.githubUsername || username).trim();
    if (wakaUser) {
      const theme = encodeURIComponent(w.wakatimeTheme || w.quoteTheme || 'radical');
      widgetCards.push(
        `<p align="center">\n  <img src="https://github-readme-stats.vercel.app/api/wakatime?username=${encodeURIComponent(wakaUser)}&theme=${theme}&layout=compact" alt="WakaTime Weekly Coding Stats" />\n</p>`
      );
    }
  }

  if (widgetCards.length === 0) return '';

  return `## ⚡ Dynamic Developer Live Widgets\n\n${widgetCards.join('\n\n')}`;
}

function renderProjectsSection(config: ProfileConfig): string {
  if (!config.projects || config.projects.length === 0) return '';

  const username = config.githubUsername.trim() || 'your-username';
  const isPinnedMode = config.projectDisplayMode === 'pinned-cards';

  if (isPinnedMode) {
    const theme = config.stats.statsTheme === 'matrix' ? 'matrix' : (config.stats.statsTheme || 'radical');
    const themeParam = theme === 'matrix'
      ? 'title_color=00FF66&text_color=FFFFFF&icon_color=00FF66&bg_color=04080e&border_color=00FF66'
      : `theme=${encodeURIComponent(theme)}`;

    const cards = config.projects.map((proj) => {
      let repoName = proj.title.replace(/\s+/g, '-');
      if (proj.repoUrl) {
        const match = proj.repoUrl.match(/github\.com\/[^/]+\/([^/]+)/);
        if (match && match[1]) repoName = match[1];
      }
      const repoUrl = proj.repoUrl || `https://github.com/${username}/${repoName}`;
      return `  <a href="${repoUrl}" target="_blank">\n    <img src="https://github-readme-stats.vercel.app/api/pin/?username=${encodeURIComponent(username)}&repo=${encodeURIComponent(repoName)}&${themeParam}" alt="${proj.title}" />\n  </a>`;
    });

    return `## 🚀 Featured Projects\n\n<p align="center">\n${cards.join('\n')}\n</p>`;
  }

  const lines: string[] = [
    `## 🚀 Featured Projects\n`,
    `| Project | Description | Tech Stack | Links |`,
    `| :--- | :--- | :--- | :--- |`
  ];

  config.projects.forEach((proj) => {
    const techList = proj.tech.map((t) => `\`${t}\``).join(' ');
    const links = [
      proj.repoUrl ? `[📦 Source](${proj.repoUrl})` : '',
      proj.liveUrl ? `[🌐 Demo](${proj.liveUrl})` : ''
    ].filter(Boolean).join(' • ');

    lines.push(`| **${proj.title}** | ${proj.description} | ${techList} | ${links} |`);
  });

  return lines.join('\n');
}

function renderSocialsSection(config: ProfileConfig): string {
  const enabledSocials = config.socials.filter((s) => s.enabled && s.url);
  if (enabledSocials.length === 0) return '';

  const badges: string[] = [];
  enabledSocials.forEach((soc) => {
    let logo = soc.platform.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (soc.platform.includes('Twitter') || soc.platform.includes('X')) logo = 'x';
    if (soc.platform.includes('LinkedIn')) logo = 'linkedin';
    if (soc.platform.includes('YouTube')) logo = 'youtube';
    if (soc.platform.includes('Discord')) logo = 'discord';

    badges.push(`  <a href="${soc.url}" target="_blank">\n    <img src="https://img.shields.io/badge/${encodeURIComponent(soc.platform)}-000000?style=${config.badgeStyle}&logo=${logo}&logoColor=white" alt="${soc.platform}" />\n  </a>`);
  });

  return `## 🌐 Connect With Me\n\n<p align="left">\n${badges.join('\n')}\n</p>`;
}

function renderSupportSection(config: ProfileConfig): string {
  const enabledSupport = config.support.filter((s) => s.enabled && s.username);
  if (enabledSupport.length === 0) return '';

  const buttons: string[] = [];
  enabledSupport.forEach((sup) => {
    if (sup.platform === 'buymeacoffee') {
      buttons.push(`  <a href="https://www.buymeacoffee.com/${sup.username}" target="_blank">\n    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40" />\n  </a>`);
    } else if (sup.platform === 'kofi') {
      buttons.push(`  <a href="https://ko-fi.com/${sup.username}" target="_blank">\n    <img src="https://img.shields.io/badge/Ko--fi-F16061?style=${config.badgeStyle}&logo=ko-fi&logoColor=white" alt="Ko-fi" />\n  </a>`);
    } else if (sup.platform === 'github') {
      buttons.push(`  <a href="https://github.com/sponsors/${sup.username}" target="_blank">\n    <img src="https://img.shields.io/badge/Sponsor-EA4AAA?style=${config.badgeStyle}&logo=githubsponsors&logoColor=white" alt="GitHub Sponsors" />\n  </a>`);
    }
  });

  return `## ☕ Support My Work\n\n<p align="left">\n${buttons.join('\n')}\n</p>`;
}

export function generateMarkdown(config: ProfileConfig): string {
  const username = config.githubUsername.trim() || 'your-username';
  const name = config.displayName || username;
  const headline = config.headline;

  // Resolve section order with fallback to DEFAULT_SECTION_ORDER
  const rawOrder = config.sectionOrder && config.sectionOrder.length > 0
    ? config.sectionOrder
    : DEFAULT_SECTION_ORDER;

  const existingIds = new Set(rawOrder.map((s) => s.id));
  const sectionOrder = [
    ...rawOrder,
    ...DEFAULT_SECTION_ORDER.filter((s) => !existingIds.has(s.id))
  ];

  const sections: string[] = [];

  for (const section of sectionOrder) {
    if (!section.enabled) continue;

    let content = '';
    switch (section.id) {
      case 'header':
        content = renderHeaderSection(config, username, name, headline);
        break;
      case 'views':
        content = renderViewsSection(config, username);
        break;
      case 'quote':
        content = renderQuoteSection(config);
        break;
      case 'about':
        content = renderAboutSection(config);
        break;
      case 'tech':
        content = renderTechSection(config);
        break;
      case 'stats':
        content = renderStatsSection(config, username);
        break;
      case 'widgets':
        content = renderWidgetsSection(config, username);
        break;
      case 'projects':
        content = renderProjectsSection(config);
        break;
      case 'socials':
        content = renderSocialsSection(config);
        break;
      case 'support':
        content = renderSupportSection(config);
        break;
    }

    if (content && content.trim()) {
      sections.push(content.trim());
    }
  }

  // Custom Markdown Block (if user wrote custom additions)
  if (config.customMarkdown && config.customMarkdown.trim()) {
    sections.push(config.customMarkdown.trim());
  }

  // Sleek Footer
  sections.push(`---\n<p align="center">\n  <i>⚡ Crafted with <a href="https://github.com">ReadmeForge</a> — The Next-Gen Aesthetic GitHub Profile Architect</i>\n</p>`);

  return sections.join('\n\n');
}
