import { ProfileConfig, ProjectItem } from '../types';

export interface GitHubFetchResult {
  configUpdates: Partial<ProfileConfig>;
  reposCount: number;
}

export async function fetchGitHubProfile(username: string): Promise<GitHubFetchResult> {
  const cleanUsername = username.trim().replace(/^@/, '');
  if (!cleanUsername) {
    throw new Error('Please enter a valid GitHub username.');
  }

  // 1. Fetch User Profile
  const userRes = await fetch(`https://api.github.com/users/${cleanUsername}`);
  if (!userRes.ok) {
    if (userRes.status === 404) {
      throw new Error(`GitHub user "${cleanUsername}" not found.`);
    }
    throw new Error(`GitHub API error (${userRes.status}). Please try again later.`);
  }

  const userData = await userRes.json();

  // 2. Fetch User Repositories
  let projectItems: ProjectItem[] = [];
  try {
    const reposRes = await fetch(`https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=15`);
    if (reposRes.ok) {
      const reposData = await reposRes.json();
      if (Array.isArray(reposData)) {
        // Exclude forks, sort by stars descending
        const topRepos = reposData
          .filter((repo: any) => !repo.fork)
          .sort((a: any, b: any) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, 4);

        projectItems = topRepos.map((repo: any, idx: number) => ({
          id: `gh-${repo.id || idx}`,
          title: repo.name,
          description: repo.description || 'Open source repository built with passion.',
          tech: repo.language ? [repo.language] : ['Open Source'],
          repoUrl: repo.html_url,
          liveUrl: repo.homepage || repo.html_url,
          stars: repo.stargazers_count || 0
        }));
      }
    }
  } catch (e) {
    console.warn('Could not fetch repos:', e);
  }

  const configUpdates: Partial<ProfileConfig> = {
    githubUsername: cleanUsername,
    displayName: userData.name || cleanUsername,
    headline: userData.bio || 'Full-Stack Developer // Building Modern Software',
    avatarUrl: userData.avatar_url,
    avatarRawSource: userData.avatar_url,
    showAvatarInReadme: true,
    company: userData.company ? userData.company.replace(/^@/, '') : '',
    location: userData.location || '',
    website: userData.blog || '',
    availableForHire: Boolean(userData.hireable)
  };

  if (projectItems.length > 0) {
    configUpdates.projects = projectItems;
  }

  return {
    configUpdates,
    reposCount: projectItems.length
  };
}

