"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SimpleGrid, Stack, Title, Text, Group, Container, Skeleton } from "@mantine/core";
import ProjectCard from "./ProjectCard";
import LayoutSwitcher from "./LayoutSwitcher";
import { useLayoutMode } from "./LayoutContext";
import type { GitHubRepo } from "@/app/types/github";

export default function ProjectsPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [layoutMode] = useLayoutMode("projects");

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
          err instanceof Error
            ? err.message
            : typeof err === "string"
              ? err
              : "An unexpected error occurred"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const cardVariant = layoutMode === "list" ? "list" : "card";

  if (error) {
    return (
      <Container size="xl" py={{ base: "md", md: "xl" }} px={{ base: 16, sm: 20, md: 24 }}>
        <Stack align="center" gap="md" style={{ minHeight: "50vh", justifyContent: "center" }}>
          <Text c="red">Failed to load projects: {error}</Text>
        </Stack>
      </Container>
    );
  }

  return (
    <Container
      size="xl"
      py={{ base: "md", md: "xl" }}
      px={{ base: 16, sm: 20, md: 24 }}
      style={{ minHeight: "70vh" }}
    >
      <Stack gap="md">
        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Title order={2}>Projects</Title>
          </motion.div>
          <div className="layout-switcher-wrap">
            <LayoutSwitcher page="projects" />
          </div>
        </Group>
        <div className="retro-divider" />

        {loading ? (
          layoutMode === "list" ? (
            <Stack gap="md">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height={170} radius={0} />
              ))}
            </Stack>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height={170} radius={0} />
              ))}
            </SimpleGrid>
          )
        ) : layoutMode === "list" ? (
          <Stack gap="md">
            {repos.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <ProjectCard repo={repo} variant={cardVariant} />
              </motion.div>
            ))}
          </Stack>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {repos.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <ProjectCard repo={repo} variant={cardVariant} />
              </motion.div>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
}
