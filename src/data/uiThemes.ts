import { StatsConfig, LiveWidgetsConfig, DEFAULT_LIVE_WIDGETS } from '../types';

export interface UIThemeItem {
  id: string;
  name: string;
  category: 'Cyber & Hacker' | 'Pastel & Cozy' | 'Dark Modern' | 'Retro & Synth' | 'Minimalist' | 'Nature & Warm';
  dotColor: string;
  secondaryColor: string;
  bgClass: string;
  borderClass: string;
  glowClass: string;
  vibe: string;
  config: {
    typingColor: string;
    avatarBorderColor: string;
    asciiDotColor: string;
    themeAesthetic: string;
    stats: {
      statsTheme: string;
      activityGraphTheme: string;
      topLangsTheme: string;
      streakTheme: string;
      trophiesTheme: string;
    };
    widgets: {
      leetcodeTheme: string;
      quoteTheme: string;
      jokeTheme: string;
      wakatimeTheme: string;
    };
  };
}

export const UI_THEMES: UIThemeItem[] = [
  {
    id: 'matrix',
    name: 'Matrix Phosphor',
    category: 'Cyber & Hacker',
    dotColor: '#00FF66',
    secondaryColor: '#059669',
    bgClass: 'bg-emerald-500',
    borderClass: 'border-emerald-400',
    glowClass: 'shadow-emerald-500/20',
    vibe: 'Classic CRT phosphor green with cyber matrix terminal glow',
    config: {
      typingColor: '00FF66',
      avatarBorderColor: '#00FF66',
      asciiDotColor: '#00FF66',
      themeAesthetic: 'matrix',
      stats: {
        statsTheme: 'matrix',
        activityGraphTheme: 'matrix',
        topLangsTheme: 'matrix',
        streakTheme: 'matrix',
        trophiesTheme: 'matrix'
      },
      widgets: {
        leetcodeTheme: 'forest',
        quoteTheme: 'matrix',
        jokeTheme: 'matrix',
        wakatimeTheme: 'matrix'
      }
    }
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    category: 'Cyber & Hacker',
    dotColor: '#38BDF8',
    secondaryColor: '#0284C7',
    bgClass: 'bg-cyan-500',
    borderClass: 'border-cyan-400',
    glowClass: 'shadow-cyan-500/20',
    vibe: 'Tokyo Night neon cyan & deep high-contrast electric blues',
    config: {
      typingColor: '38BDF8',
      avatarBorderColor: '#38BDF8',
      asciiDotColor: '#38BDF8',
      themeAesthetic: 'cyberpunk',
      stats: {
        statsTheme: 'tokyonight',
        activityGraphTheme: 'react',
        topLangsTheme: 'tokyonight',
        streakTheme: 'tokyonight',
        trophiesTheme: 'tokyonight'
      },
      widgets: {
        leetcodeTheme: 'nord',
        quoteTheme: 'tokyonight',
        jokeTheme: 'dark',
        wakatimeTheme: 'tokyonight'
      }
    }
  },
  {
    id: 'synthwave',
    name: 'Neon Synthwave',
    category: 'Retro & Synth',
    dotColor: '#C084FC',
    secondaryColor: '#E879F9',
    bgClass: 'bg-purple-500',
    borderClass: 'border-purple-400',
    glowClass: 'shadow-purple-500/20',
    vibe: '80s outrun sunsets, neon purple and glowing magenta laser lines',
    config: {
      typingColor: 'C084FC',
      avatarBorderColor: '#C084FC',
      asciiDotColor: '#C084FC',
      themeAesthetic: 'dracula',
      stats: {
        statsTheme: 'synthwave',
        activityGraphTheme: 'radical',
        topLangsTheme: 'synthwave',
        streakTheme: 'synthwave',
        trophiesTheme: 'radical'
      },
      widgets: {
        leetcodeTheme: 'unicorn',
        quoteTheme: 'radical',
        jokeTheme: 'radical',
        wakatimeTheme: 'radical'
      }
    }
  },
  {
    id: 'amber',
    name: 'Solarized Amber',
    category: 'Retro & Synth',
    dotColor: '#F59E0B',
    secondaryColor: '#D97706',
    bgClass: 'bg-amber-500',
    borderClass: 'border-amber-400',
    glowClass: 'shadow-amber-500/20',
    vibe: 'Warm amber-phosphor monochrome monitor & vintage terminal comfort',
    config: {
      typingColor: 'F59E0B',
      avatarBorderColor: '#F59E0B',
      asciiDotColor: '#F59E0B',
      themeAesthetic: 'lofi',
      stats: {
        statsTheme: 'gruvbox',
        activityGraphTheme: 'solarized-dark',
        topLangsTheme: 'gruvbox',
        streakTheme: 'gruvbox',
        trophiesTheme: 'juicy'
      },
      widgets: {
        leetcodeTheme: 'dark',
        quoteTheme: 'solarized-dark',
        jokeTheme: 'dark',
        wakatimeTheme: 'gruvbox'
      }
    }
  },
  {
    id: 'crimson',
    name: 'Tokyo Crimson',
    category: 'Cyber & Hacker',
    dotColor: '#F43F5E',
    secondaryColor: '#E11D48',
    bgClass: 'bg-rose-500',
    borderClass: 'border-rose-400',
    glowClass: 'shadow-rose-500/20',
    vibe: 'Akira-inspired neon ruby & high-octane dark stealth aesthetic',
    config: {
      typingColor: 'F43F5E',
      avatarBorderColor: '#F43F5E',
      asciiDotColor: '#F43F5E',
      themeAesthetic: 'gamified',
      stats: {
        statsTheme: 'radical',
        activityGraphTheme: 'radical',
        topLangsTheme: 'radical',
        streakTheme: 'radical',
        trophiesTheme: 'radical'
      },
      widgets: {
        leetcodeTheme: 'radical',
        quoteTheme: 'radical',
        jokeTheme: 'radical',
        wakatimeTheme: 'radical'
      }
    }
  },
  {
    id: 'monochrome',
    name: 'Stark Monochrome',
    category: 'Minimalist',
    dotColor: '#FFFFFF',
    secondaryColor: '#94A3B8',
    bgClass: 'bg-white',
    borderClass: 'border-slate-300',
    glowClass: 'shadow-white/20',
    vibe: 'Pure black & white Swiss typography with razor-sharp contrast',
    config: {
      typingColor: 'FFFFFF',
      avatarBorderColor: '#FFFFFF',
      asciiDotColor: '#FFFFFF',
      themeAesthetic: 'minimal',
      stats: {
        statsTheme: 'highcontrast',
        activityGraphTheme: 'github-compact',
        topLangsTheme: 'highcontrast',
        streakTheme: 'highcontrast',
        trophiesTheme: 'flat'
      },
      widgets: {
        leetcodeTheme: 'light',
        quoteTheme: 'github_dark',
        jokeTheme: 'dark',
        wakatimeTheme: 'highcontrast'
      }
    }
  },
  {
    id: 'dracula',
    name: 'Dracula Midnight',
    category: 'Dark Modern',
    dotColor: '#BD93F9',
    secondaryColor: '#50FA7B',
    bgClass: 'bg-purple-400',
    borderClass: 'border-purple-300',
    glowClass: 'shadow-purple-400/20',
    vibe: 'Canonical dark theme with vampire purple, gothic cyan & mint tones',
    config: {
      typingColor: 'BD93F9',
      avatarBorderColor: '#BD93F9',
      asciiDotColor: '#BD93F9',
      themeAesthetic: 'dracula',
      stats: {
        statsTheme: 'dracula',
        activityGraphTheme: 'dracula',
        topLangsTheme: 'dracula',
        streakTheme: 'dracula',
        trophiesTheme: 'dracula'
      },
      widgets: {
        leetcodeTheme: 'dark',
        quoteTheme: 'dracula',
        jokeTheme: 'dracula',
        wakatimeTheme: 'dracula'
      }
    }
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin Mocha',
    category: 'Pastel & Cozy',
    dotColor: '#F5C2E7',
    secondaryColor: '#CBA6F7',
    bgClass: 'bg-pink-300',
    borderClass: 'border-pink-200',
    glowClass: 'shadow-pink-300/20',
    vibe: 'Soothing pastel lavender, rosewater & cozy midnight cocoa',
    config: {
      typingColor: 'F5C2E7',
      avatarBorderColor: '#F5C2E7',
      asciiDotColor: '#F5C2E7',
      themeAesthetic: 'lofi',
      stats: {
        statsTheme: 'catppuccin_latte',
        activityGraphTheme: 'react',
        topLangsTheme: 'catppuccin_latte',
        streakTheme: 'catppuccin_latte',
        trophiesTheme: 'dracula'
      },
      widgets: {
        leetcodeTheme: 'nord',
        quoteTheme: 'nord',
        jokeTheme: 'dark',
        wakatimeTheme: 'catppuccin_latte'
      }
    }
  },
  {
    id: 'nord',
    name: 'Nordic Frost',
    category: 'Dark Modern',
    dotColor: '#88C0D0',
    secondaryColor: '#81A1C1',
    bgClass: 'bg-sky-400',
    borderClass: 'border-sky-300',
    glowClass: 'shadow-sky-400/20',
    vibe: 'Arctic fjord ice blue, sub-zero serenity & clean Scandinavian slate',
    config: {
      typingColor: '88C0D0',
      avatarBorderColor: '#88C0D0',
      asciiDotColor: '#88C0D0',
      themeAesthetic: 'minimal',
      stats: {
        statsTheme: 'nord',
        activityGraphTheme: 'nord',
        topLangsTheme: 'nord',
        streakTheme: 'nord',
        trophiesTheme: 'nord'
      },
      widgets: {
        leetcodeTheme: 'nord',
        quoteTheme: 'nord',
        jokeTheme: 'dark',
        wakatimeTheme: 'nord'
      }
    }
  },
  {
    id: 'onedark',
    name: 'One Dark Pro',
    category: 'Dark Modern',
    dotColor: '#61AFEF',
    secondaryColor: '#98C379',
    bgClass: 'bg-blue-400',
    borderClass: 'border-blue-300',
    glowClass: 'shadow-blue-400/20',
    vibe: 'Iconic Atom & VS Code palette of soft azure and balanced dark charcoal',
    config: {
      typingColor: '61AFEF',
      avatarBorderColor: '#61AFEF',
      asciiDotColor: '#61AFEF',
      themeAesthetic: 'cyberpunk',
      stats: {
        statsTheme: 'onedark',
        activityGraphTheme: 'react',
        topLangsTheme: 'onedark',
        streakTheme: 'onedark',
        trophiesTheme: 'onedark'
      },
      widgets: {
        leetcodeTheme: 'dark',
        quoteTheme: 'onedark',
        jokeTheme: 'dark',
        wakatimeTheme: 'onedark'
      }
    }
  },
  {
    id: 'gruvbox',
    name: 'Gruvbox Vintage',
    category: 'Retro & Synth',
    dotColor: '#FABD2F',
    secondaryColor: '#FE8019',
    bgClass: 'bg-yellow-500',
    borderClass: 'border-yellow-400',
    glowClass: 'shadow-yellow-500/20',
    vibe: 'Warm retro 70s earthy mustard, terracotta and mellow comfort',
    config: {
      typingColor: 'FABD2F',
      avatarBorderColor: '#FABD2F',
      asciiDotColor: '#FABD2F',
      themeAesthetic: 'lofi',
      stats: {
        statsTheme: 'gruvbox',
        activityGraphTheme: 'solarized-dark',
        topLangsTheme: 'gruvbox',
        streakTheme: 'gruvbox',
        trophiesTheme: 'gruvbox'
      },
      widgets: {
        leetcodeTheme: 'dark',
        quoteTheme: 'gruvbox',
        jokeTheme: 'dark',
        wakatimeTheme: 'gruvbox'
      }
    }
  },
  {
    id: 'emerald',
    name: 'Emerald Rainforest',
    category: 'Nature & Warm',
    dotColor: '#10B981',
    secondaryColor: '#059669',
    bgClass: 'bg-emerald-600',
    borderClass: 'border-emerald-500',
    glowClass: 'shadow-emerald-600/20',
    vibe: 'Deep botanical canopy with radiant mint and lush moss vitality',
    config: {
      typingColor: '10B981',
      avatarBorderColor: '#10B981',
      asciiDotColor: '#10B981',
      themeAesthetic: 'matrix',
      stats: {
        statsTheme: 'dark',
        activityGraphTheme: 'matrix',
        topLangsTheme: 'dark',
        streakTheme: 'dark',
        trophiesTheme: 'matrix'
      },
      widgets: {
        leetcodeTheme: 'forest',
        quoteTheme: 'matrix',
        jokeTheme: 'dark',
        wakatimeTheme: 'matrix'
      }
    }
  },
  {
    id: 'rosegold',
    name: 'Rose Gold Luxe',
    category: 'Pastel & Cozy',
    dotColor: '#FB7185',
    secondaryColor: '#F43F5E',
    bgClass: 'bg-rose-400',
    borderClass: 'border-rose-300',
    glowClass: 'shadow-rose-400/20',
    vibe: 'High-end champagne shimmer, velvet blush & modern luxury',
    config: {
      typingColor: 'FB7185',
      avatarBorderColor: '#FB7185',
      asciiDotColor: '#FB7185',
      themeAesthetic: 'lofi',
      stats: {
        statsTheme: 'radical',
        activityGraphTheme: 'radical',
        topLangsTheme: 'radical',
        streakTheme: 'radical',
        trophiesTheme: 'radical'
      },
      widgets: {
        leetcodeTheme: 'unicorn',
        quoteTheme: 'radical',
        jokeTheme: 'dark',
        wakatimeTheme: 'radical'
      }
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Horizon',
    category: 'Nature & Warm',
    dotColor: '#FB923C',
    secondaryColor: '#EA580C',
    bgClass: 'bg-orange-400',
    borderClass: 'border-orange-300',
    glowClass: 'shadow-orange-400/20',
    vibe: 'Pacific dusk gradient blending tangerine glow into twilight indigo',
    config: {
      typingColor: 'FB923C',
      avatarBorderColor: '#FB923C',
      asciiDotColor: '#FB923C',
      themeAesthetic: 'gamified',
      stats: {
        statsTheme: 'solarized-dark',
        activityGraphTheme: 'solarized-dark',
        topLangsTheme: 'solarized-dark',
        streakTheme: 'solarized-dark',
        trophiesTheme: 'juicy'
      },
      widgets: {
        leetcodeTheme: 'dark',
        quoteTheme: 'solarized-dark',
        jokeTheme: 'dark',
        wakatimeTheme: 'solarized-dark'
      }
    }
  },
  {
    id: 'abyss',
    name: 'Deep Abyss Ocean',
    category: 'Cyber & Hacker',
    dotColor: '#06B6D4',
    secondaryColor: '#0891B2',
    bgClass: 'bg-cyan-600',
    borderClass: 'border-cyan-500',
    glowClass: 'shadow-cyan-600/20',
    vibe: 'Deep-sea bioluminescence, marine teal and midnight trench currents',
    config: {
      typingColor: '06B6D4',
      avatarBorderColor: '#06B6D4',
      asciiDotColor: '#06B6D4',
      themeAesthetic: 'cyberpunk',
      stats: {
        statsTheme: 'tokyonight',
        activityGraphTheme: 'react',
        topLangsTheme: 'tokyonight',
        streakTheme: 'tokyonight',
        trophiesTheme: 'tokyonight'
      },
      widgets: {
        leetcodeTheme: 'nord',
        quoteTheme: 'tokyonight',
        jokeTheme: 'dark',
        wakatimeTheme: 'tokyonight'
      }
    }
  },
  {
    id: 'neonlime',
    name: 'Acid Hyper-Lime',
    category: 'Cyber & Hacker',
    dotColor: '#A3E635',
    secondaryColor: '#65A30D',
    bgClass: 'bg-lime-400',
    borderClass: 'border-lime-300',
    glowClass: 'shadow-lime-400/20',
    vibe: 'Electrified neon highlighter lime, radioactive developer overdrive',
    config: {
      typingColor: 'A3E635',
      avatarBorderColor: '#A3E635',
      asciiDotColor: '#A3E635',
      themeAesthetic: 'matrix',
      stats: {
        statsTheme: 'matrix',
        activityGraphTheme: 'matrix',
        topLangsTheme: 'matrix',
        streakTheme: 'matrix',
        trophiesTheme: 'matrix'
      },
      widgets: {
        leetcodeTheme: 'forest',
        quoteTheme: 'matrix',
        jokeTheme: 'matrix',
        wakatimeTheme: 'matrix'
      }
    }
  },
  {
    id: 'amethyst',
    name: 'Amethyst Crystal',
    category: 'Dark Modern',
    dotColor: '#A855F7',
    secondaryColor: '#7E22CE',
    bgClass: 'bg-purple-600',
    borderClass: 'border-purple-500',
    glowClass: 'shadow-purple-600/20',
    vibe: 'Shimmering royal purple quartz with iridescent violet highlights',
    config: {
      typingColor: 'A855F7',
      avatarBorderColor: '#A855F7',
      asciiDotColor: '#A855F7',
      themeAesthetic: 'dracula',
      stats: {
        statsTheme: 'synthwave',
        activityGraphTheme: 'radical',
        topLangsTheme: 'synthwave',
        streakTheme: 'synthwave',
        trophiesTheme: 'radical'
      },
      widgets: {
        leetcodeTheme: 'unicorn',
        quoteTheme: 'radical',
        jokeTheme: 'dark',
        wakatimeTheme: 'synthwave'
      }
    }
  },
  {
    id: 'flamingo',
    name: 'Flamingo Vapor',
    category: 'Pastel & Cozy',
    dotColor: '#F472B6',
    secondaryColor: '#DB2777',
    bgClass: 'bg-pink-400',
    borderClass: 'border-pink-300',
    glowClass: 'shadow-pink-400/20',
    vibe: 'Playful bubblegum, retro Miami pastel & dreamy vaporwave warmth',
    config: {
      typingColor: 'F472B6',
      avatarBorderColor: '#F472B6',
      asciiDotColor: '#F472B6',
      themeAesthetic: 'lofi',
      stats: {
        statsTheme: 'catppuccin_latte',
        activityGraphTheme: 'radical',
        topLangsTheme: 'catppuccin_latte',
        streakTheme: 'catppuccin_latte',
        trophiesTheme: 'radical'
      },
      widgets: {
        leetcodeTheme: 'unicorn',
        quoteTheme: 'radical',
        jokeTheme: 'dark',
        wakatimeTheme: 'catppuccin_latte'
      }
    }
  },
  {
    id: 'carbon',
    name: 'Carbon Stealth',
    category: 'Minimalist',
    dotColor: '#94A3B8',
    secondaryColor: '#475569',
    bgClass: 'bg-slate-400',
    borderClass: 'border-slate-300',
    glowClass: 'shadow-slate-400/20',
    vibe: 'Matte titanium, stealth aircraft chassis & muted dark slate',
    config: {
      typingColor: '94A3B8',
      avatarBorderColor: '#94A3B8',
      asciiDotColor: '#94A3B8',
      themeAesthetic: 'minimal',
      stats: {
        statsTheme: 'github-compact',
        activityGraphTheme: 'github-compact',
        topLangsTheme: 'github-compact',
        streakTheme: 'dark',
        trophiesTheme: 'flat'
      },
      widgets: {
        leetcodeTheme: 'dark',
        quoteTheme: 'github_dark',
        jokeTheme: 'dark',
        wakatimeTheme: 'highcontrast'
      }
    }
  },
  {
    id: 'coffee',
    name: 'Espresso Roast',
    category: 'Nature & Warm',
    dotColor: '#D97706',
    secondaryColor: '#92400E',
    bgClass: 'bg-amber-600',
    borderClass: 'border-amber-500',
    glowClass: 'shadow-amber-600/20',
    vibe: 'Aromatic espresso crema, warm dark cocoa & artisan coffee shop calm',
    config: {
      typingColor: 'D97706',
      avatarBorderColor: '#D97706',
      asciiDotColor: '#D97706',
      themeAesthetic: 'lofi',
      stats: {
        statsTheme: 'gruvbox',
        activityGraphTheme: 'solarized-dark',
        topLangsTheme: 'gruvbox',
        streakTheme: 'gruvbox',
        trophiesTheme: 'juicy'
      },
      widgets: {
        leetcodeTheme: 'dark',
        quoteTheme: 'gruvbox',
        jokeTheme: 'dark',
        wakatimeTheme: 'gruvbox'
      }
    }
  },
  {
    id: 'hyperviolet',
    name: 'Electric Hyper-Violet',
    category: 'Cyber & Hacker',
    dotColor: '#818CF8',
    secondaryColor: '#4F46E5',
    bgClass: 'bg-indigo-400',
    borderClass: 'border-indigo-300',
    glowClass: 'shadow-indigo-400/20',
    vibe: 'Next-gen AI neural core, electric indigo & futuristic quantum beams',
    config: {
      typingColor: '818CF8',
      avatarBorderColor: '#818CF8',
      asciiDotColor: '#818CF8',
      themeAesthetic: 'cyberpunk',
      stats: {
        statsTheme: 'tokyonight',
        activityGraphTheme: 'react',
        topLangsTheme: 'tokyonight',
        streakTheme: 'tokyonight',
        trophiesTheme: 'tokyonight'
      },
      widgets: {
        leetcodeTheme: 'nord',
        quoteTheme: 'tokyonight',
        jokeTheme: 'dark',
        wakatimeTheme: 'tokyonight'
      }
    }
  }
];

