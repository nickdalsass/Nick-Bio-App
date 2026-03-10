import { NextResponse } from "next/server";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  homepage: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
}

const GITHUB_USER = process.env.GITHUB_USERNAME || "nickdalsass";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=all`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Nick-Bio-App",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();

    const PINNED_FORKS = ["recipe-project", "flowgo-ai"];
    const PIN_AT_BOTTOM = "Nick-Bio-App";

    const includeRepo = (name: string, fork: boolean) =>
      !fork || PINNED_FORKS.includes(name.toLowerCase());

    const allRepos = data
      .filter(
        (r: { owner: { login: string }; name: string; fork: boolean }) =>
          r.owner?.login?.toLowerCase() === GITHUB_USER.toLowerCase() &&
          includeRepo(r.name, r.fork)
      )
      .map((r: Record<string, unknown>) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        description: r.description ?? null,
        html_url: r.html_url,
        language: r.language ?? null,
        stargazers_count: r.stargazers_count ?? 0,
        forks_count: r.forks_count ?? 0,
        topics: r.topics ?? [],
        homepage: r.homepage ?? null,
        fork: r.fork,
        created_at: r.created_at,
        updated_at: r.updated_at,
      }));

    const repos = allRepos as GitHubRepo[];
    const sortedRepos = repos
      .sort((a: GitHubRepo, b: GitHubRepo) => {
        const aLower = a.name.toLowerCase();
        const bLower = b.name.toLowerCase();
        const aPinnedTop = PINNED_FORKS.indexOf(aLower);
        const bPinnedTop = PINNED_FORKS.indexOf(bLower);
        const aPinBottom = aLower === PIN_AT_BOTTOM.toLowerCase();
        const bPinBottom = bLower === PIN_AT_BOTTOM.toLowerCase();

        if (aPinnedTop >= 0 && bPinnedTop >= 0) return aPinnedTop - bPinnedTop;
        if (aPinnedTop >= 0) return -1;
        if (bPinnedTop >= 0) return 1;
        if (aPinBottom && !bPinBottom) return 1;
        if (!aPinBottom && bPinBottom) return -1;
        return 0;
      })
      .slice(0, 15);

    return NextResponse.json(sortedRepos);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
