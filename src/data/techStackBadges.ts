import { TechBadge } from '../types';

export const TECH_BADGES: TechBadge[] = [
  // Languages
  { id: 'typescript', name: 'TypeScript', category: 'languages', logo: 'typescript', logoColor: 'white', bgColor: '3178C6' },
  { id: 'javascript', name: 'JavaScript', category: 'languages', logo: 'javascript', logoColor: 'black', bgColor: 'F7DF1E' },
  { id: 'python', name: 'Python', category: 'languages', logo: 'python', logoColor: 'white', bgColor: '3776AB' },
  { id: 'rust', name: 'Rust', category: 'languages', logo: 'rust', logoColor: 'white', bgColor: '000000' },
  { id: 'go', name: 'Go', category: 'languages', logo: 'go', logoColor: 'white', bgColor: '00ADD8' },
  { id: 'cpp', name: 'C++', category: 'languages', logo: 'c%2B%2B', logoColor: 'white', bgColor: '00599C' },
  { id: 'csharp', name: 'C#', category: 'languages', logo: 'csharp', logoColor: 'white', bgColor: '239120' },
  { id: 'java', name: 'Java', category: 'languages', logo: 'openjdk', logoColor: 'white', bgColor: 'ED8B00' },
  { id: 'kotlin', name: 'Kotlin', category: 'languages', logo: 'kotlin', logoColor: 'white', bgColor: '7F52FF' },
  { id: 'swift', name: 'Swift', category: 'languages', logo: 'swift', logoColor: 'white', bgColor: 'F05138' },
  { id: 'php', name: 'PHP', category: 'languages', logo: 'php', logoColor: 'white', bgColor: '777BB4' },
  { id: 'ruby', name: 'Ruby', category: 'languages', logo: 'ruby', logoColor: 'white', bgColor: 'CC342D' },
  { id: 'solidity', name: 'Solidity', category: 'languages', logo: 'solidity', logoColor: 'white', bgColor: '363636' },
  { id: 'lua', name: 'Lua', category: 'languages', logo: 'lua', logoColor: 'white', bgColor: '2C2D72' },
  { id: 'webassembly', name: 'WebAssembly', category: 'languages', logo: 'webassembly', logoColor: 'white', bgColor: '654FF0' },

  // Frontend
  { id: 'react', name: 'React', category: 'frontend', logo: 'react', logoColor: '61DAFB', bgColor: '20232A' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', logo: 'nextdotjs', logoColor: 'white', bgColor: '000000' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', logo: 'vuedotjs', logoColor: 'white', bgColor: '4FC08D' },
  { id: 'nuxt', name: 'Nuxt', category: 'frontend', logo: 'nuxtdotjs', logoColor: 'white', bgColor: '00DC82' },
  { id: 'svelte', name: 'Svelte', category: 'frontend', logo: 'svelte', logoColor: 'white', bgColor: 'FF3E00' },
  { id: 'angular', name: 'Angular', category: 'frontend', logo: 'angular', logoColor: 'white', bgColor: 'DD0031' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', logo: 'tailwindcss', logoColor: 'white', bgColor: '06B6D4' },
  { id: 'html5', name: 'HTML5', category: 'frontend', logo: 'html5', logoColor: 'white', bgColor: 'E34F26' },
  { id: 'css3', name: 'CSS3', category: 'frontend', logo: 'css3', logoColor: 'white', bgColor: '1572B6' },
  { id: 'sass', name: 'Sass', category: 'frontend', logo: 'sass', logoColor: 'white', bgColor: 'CC6699' },
  { id: 'vite', name: 'Vite', category: 'frontend', logo: 'vite', logoColor: 'white', bgColor: '646CFF' },
  { id: 'threejs', name: 'Three.js', category: 'frontend', logo: 'threedotjs', logoColor: 'white', bgColor: '000000' },
  { id: 'astro', name: 'Astro', category: 'frontend', logo: 'astro', logoColor: 'white', bgColor: 'BC52EE' },
  { id: 'shadcn', name: 'shadcn/ui', category: 'frontend', logo: 'shadcnui', logoColor: 'white', bgColor: '000000' },
  { id: 'framer', name: 'Framer Motion', category: 'frontend', logo: 'framer', logoColor: 'white', bgColor: '0055FF' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', logo: 'nodedotjs', logoColor: 'white', bgColor: '339933' },
  { id: 'express', name: 'Express', category: 'backend', logo: 'express', logoColor: 'white', bgColor: '000000' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', logo: 'nestjs', logoColor: 'white', bgColor: 'E0234E' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', logo: 'fastapi', logoColor: 'white', bgColor: '009688' },
  { id: 'django', name: 'Django', category: 'backend', logo: 'django', logoColor: 'white', bgColor: '092E20' },
  { id: 'flask', name: 'Flask', category: 'backend', logo: 'flask', logoColor: 'white', bgColor: '000000' },
  { id: 'springboot', name: 'Spring Boot', category: 'backend', logo: 'springboot', logoColor: 'white', bgColor: '6DB33F' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', logo: 'graphql', logoColor: 'white', bgColor: 'E10098' },
  { id: 'trpc', name: 'tRPC', category: 'backend', logo: 'trpc', logoColor: 'white', bgColor: '2596BE' },
  { id: 'hono', name: 'Hono', category: 'backend', logo: 'hono', logoColor: 'white', bgColor: 'E36002' },
  { id: 'bun', name: 'Bun', category: 'backend', logo: 'bun', logoColor: 'white', bgColor: '000000' },

  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', logo: 'postgresql', logoColor: 'white', bgColor: '4169E1' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', logo: 'mongodb', logoColor: 'white', bgColor: '47A248' },
  { id: 'redis', name: 'Redis', category: 'database', logo: 'redis', logoColor: 'white', bgColor: 'DC382D' },
  { id: 'mysql', name: 'MySQL', category: 'database', logo: 'mysql', logoColor: 'white', bgColor: '4479A1' },
  { id: 'sqlite', name: 'SQLite', category: 'database', logo: 'sqlite', logoColor: 'white', bgColor: '003B57' },
  { id: 'supabase', name: 'Supabase', category: 'database', logo: 'supabase', logoColor: 'white', bgColor: '3ECF8E' },
  { id: 'firebase', name: 'Firebase', category: 'database', logo: 'firebase', logoColor: 'white', bgColor: 'FFCA28' },
  { id: 'prisma', name: 'Prisma', category: 'database', logo: 'prisma', logoColor: 'white', bgColor: '2D3748' },
  { id: 'drizzle', name: 'Drizzle', category: 'database', logo: 'drizzle', logoColor: 'white', bgColor: 'C5F74F' },
  { id: 'neo4j', name: 'Neo4j', category: 'database', logo: 'neo4j', logoColor: 'white', bgColor: '008CC1' },

  // DevOps & Cloud
  { id: 'docker', name: 'Docker', category: 'devops', logo: 'docker', logoColor: 'white', bgColor: '2496ED' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', logo: 'kubernetes', logoColor: 'white', bgColor: '326CE5' },
  { id: 'aws', name: 'AWS', category: 'devops', logo: 'amazonwebservices', logoColor: 'white', bgColor: '232F3E' },
  { id: 'gcp', name: 'Google Cloud', category: 'devops', logo: 'googlecloud', logoColor: 'white', bgColor: '4285F4' },
  { id: 'azure', name: 'Azure', category: 'devops', logo: 'microsoftazure', logoColor: 'white', bgColor: '0078D4' },
  { id: 'linux', name: 'Linux', category: 'devops', logo: 'linux', logoColor: 'black', bgColor: 'FCC624' },
  { id: 'githubactions', name: 'GitHub Actions', category: 'devops', logo: 'githubactions', logoColor: 'white', bgColor: '2088FF' },
  { id: 'vercel', name: 'Vercel', category: 'devops', logo: 'vercel', logoColor: 'white', bgColor: '000000' },
  { id: 'cloudflare', name: 'Cloudflare', category: 'devops', logo: 'cloudflare', logoColor: 'white', bgColor: 'F38020' },
  { id: 'terraform', name: 'Terraform', category: 'devops', logo: 'terraform', logoColor: 'white', bgColor: '7B42BC' },
  { id: 'nginx', name: 'Nginx', category: 'devops', logo: 'nginx', logoColor: 'white', bgColor: '009639' },

  // AI & ML
  { id: 'pytorch', name: 'PyTorch', category: 'ai_ml', logo: 'pytorch', logoColor: 'white', bgColor: 'EE4C2C' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai_ml', logo: 'tensorflow', logoColor: 'white', bgColor: 'FF6F00' },
  { id: 'openai', name: 'OpenAI', category: 'ai_ml', logo: 'openai', logoColor: 'white', bgColor: '412991' },
  { id: 'huggingface', name: 'Hugging Face', category: 'ai_ml', logo: 'huggingface', logoColor: 'white', bgColor: 'FFD21E' },
  { id: 'langchain', name: 'LangChain', category: 'ai_ml', logo: 'langchain', logoColor: 'white', bgColor: '1C3C3C' },
  { id: 'pandas', name: 'Pandas', category: 'ai_ml', logo: 'pandas', logoColor: 'white', bgColor: '150458' },
  { id: 'numpy', name: 'NumPy', category: 'ai_ml', logo: 'numpy', logoColor: 'white', bgColor: '013243' },
  { id: 'opencv', name: 'OpenCV', category: 'ai_ml', logo: 'opencv', logoColor: 'white', bgColor: '5C3EE8' },

  // Tools
  { id: 'git', name: 'Git', category: 'tools', logo: 'git', logoColor: 'white', bgColor: 'F05032' },
  { id: 'github', name: 'GitHub', category: 'tools', logo: 'github', logoColor: 'white', bgColor: '181717' },
  { id: 'vscode', name: 'VS Code', category: 'tools', logo: 'visualstudiocode', logoColor: 'white', bgColor: '007ACC' },
  { id: 'figma', name: 'Figma', category: 'tools', logo: 'figma', logoColor: 'white', bgColor: 'F24E1E' },
  { id: 'postman', name: 'Postman', category: 'tools', logo: 'postman', logoColor: 'white', bgColor: 'FF6C37' },
  { id: 'jest', name: 'Jest', category: 'tools', logo: 'jest', logoColor: 'white', bgColor: 'C21325' },
  { id: 'pnpm', name: 'pnpm', category: 'tools', logo: 'pnpm', logoColor: 'white', bgColor: 'F69220' },
  { id: 'neovim', name: 'Neovim', category: 'tools', logo: 'neovim', logoColor: 'white', bgColor: '57A143' },
  { id: 'stripe', name: 'Stripe', category: 'tools', logo: 'stripe', logoColor: 'white', bgColor: '008CDD' }
];

export const BADGE_CATEGORIES = [
  { id: 'all', name: 'All Technologies' },
  { id: 'languages', name: 'Languages' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'database', name: 'Databases' },
  { id: 'devops', name: 'DevOps & Cloud' },
  { id: 'ai_ml', name: 'AI & Data Science' },
  { id: 'tools', name: 'Tools & Workflow' },
] as const;

export function getBadgeUrl(badge: TechBadge, style: string = 'for-the-badge'): string {
  return `https://img.shields.io/badge/${encodeURIComponent(badge.name)}-${badge.bgColor}?style=${style}&logo=${badge.logo}&logoColor=${badge.logoColor}`;
}

export function getBadgeHtml(badge: TechBadge, style: string = 'for-the-badge'): string {
  return `<img src="${getBadgeUrl(badge, style)}" alt="${badge.name}" />`;
}

export function getBadgeMarkdown(badge: TechBadge, style: string = 'for-the-badge'): string {
  return `<img src="${getBadgeUrl(badge, style)}" alt="${badge.name}" />`;
}

