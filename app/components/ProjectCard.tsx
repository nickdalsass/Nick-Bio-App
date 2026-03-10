"use client";

import { Paper, Text, Group, Badge, Anchor, Stack } from "@mantine/core";
import type { GitHubRepo } from "@/app/types/github";
import { motion } from "motion/react";

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3776ab",
  Java: "#ed8b00",
  HTML: "#e34c26",
  CSS: "#563d7c",
  React: "#61dafb",
  Vue: "#42b883",
  Go: "#00add8",
  Rust: "#ce422b",
  C: "#555555",
  "C++": "#00599c",
};

interface ProjectCardProps {
  repo: GitHubRepo;
  variant?: "card" | "list";
}

export default function ProjectCard({ repo, variant = "card" }: ProjectCardProps) {
  const langColor = repo.language
    ? LANG_COLORS[repo.language] ?? "#94a3b8"
    : "#94a3b8";

  const cardContent = (
    <Anchor
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      underline="never"
      style={{ textDecoration: "none", color: "inherit" }}
    >
    <Paper
      p="lg"
      radius={0}
      style={{
        border: "2px solid",
        borderColor: "#fff #404040 #404040 #fff",
        boxShadow: "inset 1px 1px 0 #fff",
        background: "#c0c0c0",
        transition: "all 0.2s ease",
        height: 170,
        overflow: "hidden",
      }}
      className="project-card retro-card"
    >
      <Stack gap="xs" style={{ height: "100%", minHeight: 0 }}>
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} size="lg" lineClamp={1}>
            {repo.name.includes(" ") ? repo.name : repo.name.replace(/-/g, " ")}
          </Text>
          <Badge size="xs" variant="dot" color={langColor}>
            {repo.language ?? "Other"}
          </Badge>
        </Group>
        {repo.description && (
          <Text size="sm" c="dimmed" lineClamp={variant === "list" ? 2 : 2}>
            {repo.description}
          </Text>
        )}
        <Group gap="sm" mt="xs">
            <Text size="xs" c="dimmed">
              ★ {repo.stargazers_count}
            </Text>
            <Text size="xs" c="dimmed">
              ⎇ {repo.forks_count}
            </Text>
          </Group>
      </Stack>
    </Paper>
    </Anchor>
  );

  return (
    <motion.div style={{ height: "100%" }} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      {cardContent}
    </motion.div>
  );
}
