"use client";

import { useEffect, useState } from "react";
import {
  Center,
  SimpleGrid,
  Stack,
  Title,
  Text,
  Loader,
  Group,
  Container,
} from "@mantine/core";
import ProjectCard from "./ProjectCard";
import LayoutSwitcher from "./LayoutSwitcher";
import { useLayoutMode } from "./LayoutContext";
import type { GitHubRepo } from "../api/github/repos/route";

export default function ProjectsPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [layoutMode] = useLayoutMode();

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch repos");
        return res.json();
      })
      .then((data) => {
        setRepos(data);
        setError(null);
      })
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : typeof err === "string" ? err : "An unexpected error occurred"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const cardVariant =
    layoutMode === "list"
      ? "list"
      : layoutMode === "compact"
        ? "compact"
        : "card";

  if (loading) {
    return (
      <Center style={{ minHeight: "70vh", background: "#c0c0c0" }}>
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text c="dimmed">Loading projects from GitHub...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ minHeight: "70vh", background: "#c0c0c0" }}>
        <Stack align="center" gap="md">
          <Text c="red">Failed to load projects: {error}</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Container size="xl" py="xl" style={{ minHeight: "70vh", background: "#c0c0c0" }}>
      <Stack gap="xl">
        <Group justify="space-between" align="center" wrap="wrap" gap="md">
          <Title order={2}>Projects</Title>
          <LayoutSwitcher />
        </Group>

        {layoutMode === "list" ? (
          <Stack gap="md">
            {repos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} variant={cardVariant} />
            ))}
          </Stack>
        ) : (
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: layoutMode === "compact" ? 3 : 2 }}
            spacing={{ base: "md", md: "lg" }}
          >
            {repos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} variant={cardVariant} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
}
