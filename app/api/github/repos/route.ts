import { NextResponse } from "next/server";
import type { GitHubRepo } from "@/app/types/github";

const GITHUB_USER = process.env.GITHUB_USERNAME || "nickdalsass";

const DISPLAY_OVERRIDES: Record<string, { displayName?: string; language?: string }> = {
  "flowgo-ai": { displayName: "FlowGo AI", language: "Python" },
  "recipe-project": { displayName: "Recipe Project", language: "TypeScript" },
  "travel-planner": { displayName: "Travel Planner" },
  "basic-morph-operations": { displayName: "Basic Morph Operations" },
  "compiler-project": { displayName: "Compiler Project" },
};

const EXCLUDED_REPOS = ["java-threading"];

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

    const PINNED_FORKS = ["recipe-project", "flowgo-ai", "compiler-project"];
    const PINNED_ORDER = ["recipe-project", "flowgo-ai", "travel-planner", "basic-morph-operations", "compiler-project"];
    const PIN_AT_BOTTOM = "Nick-Bio-App";

    const includeRepo = (name: string, fork: boolean) =>
      !fork || PINNED_FORKS.includes(name.toLowerCase());

    const isExcluded = (name: string) =>
      EXCLUDED_REPOS.includes(name.toLowerCase());

    const filtered = data.filter(
      (r: { owner: { login: string }; name: string; fork: boolean }) =>
        r.owner?.login?.toLowerCase() === GITHUB_USER.toLowerCase() &&
        !isExcluded(r.name) &&
        includeRepo(r.name, r.fork)
    );

    const sorted = filtered.sort(
      (a: { name: string }, b: { name: string }) => {
        const aLower = (a.name as string).toLowerCase();
        const bLower = (b.name as string).toLowerCase();
        const aPinned = PINNED_ORDER.indexOf(aLower);
        const bPinned = PINNED_ORDER.indexOf(bLower);
        const aPinBottom = aLower === PIN_AT_BOTTOM.toLowerCase();
        const bPinBottom = bLower === PIN_AT_BOTTOM.toLowerCase();

        if (aPinned >= 0 && bPinned >= 0) return aPinned - bPinned;
        if (aPinned >= 0) return -1;
        if (bPinned >= 0) return 1;
        if (aPinBottom && !bPinBottom) return 1;
        if (!aPinBottom && bPinBottom) return -1;
        return 0;
      }
    );

    const sortedRepos = sorted.slice(0, 15).map((r: Record<string, unknown>) => {
      const name = r.name as string;
      const override = DISPLAY_OVERRIDES[name.toLowerCase()];
      return {
        id: r.id,
        name: override?.displayName ?? name,
        full_name: r.full_name,
        description: r.description ?? null,
        html_url: r.html_url,
        language: (override?.language ?? r.language) as string | null,
        stargazers_count: r.stargazers_count ?? 0,
        forks_count: r.forks_count ?? 0,
        topics: r.topics ?? [],
        homepage: r.homepage ?? null,
        fork: r.fork,
        created_at: r.created_at,
        updated_at: r.updated_at,
      };
    });

    return NextResponse.json(sortedRepos as GitHubRepo[]);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
