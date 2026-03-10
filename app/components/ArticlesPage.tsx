"use client";

import {
  SimpleGrid,
  Stack,
  Title,
  Text,
  Paper,
  Anchor,
  Group,
  Container,
} from "@mantine/core";
import LayoutSwitcher from "./LayoutSwitcher";
import { useLayoutMode } from "./LayoutContext";

const ARTICLES = [
  {
    id: "1",
    title: "Homomorphic Encryption",
    excerpt:
      "An introduction to homomorphic encryption, a rapidly advancing cryptography technique.",
    url: "https://docs.google.com/document/d/1EDQuT9CxJ-gVdZ8jWAfSlE5PpZ01hDL6J9UmGL4gyKI/preview",
    docId: "1EDQuT9CxJ-gVdZ8jWAfSlE5PpZ01hDL6J9UmGL4gyKI",
    type: "gdoc" as const,
  },
  {
    id: "2",
    title: "Modeling Autonomous Vehicles",
    excerpt:
      "Research on modeling highway functionality of automated vehicles using finite automata.",
    url: "https://docs.google.com/document/d/1NBAvv5JiQw-a9w_Z8hWeMqpVeHz5fktnbIzjHee8wsI/preview",
    docId: "1NBAvv5JiQw-a9w_Z8hWeMqpVeHz5fktnbIzjHee8wsI",
    type: "gdoc" as const,
  },
  {
    id: "3",
    title: "Blender 3D-Rendering Project",
    excerpt:
      "Introductory Blender Project working with photogrammetry tools to model a given 3D object.",
    url: "https://docs.google.com/document/d/1u2gcZYiIVxvm8n2kdDvFb4x0yOSrn3EiBpF5MnGGje8/preview",
    docId: "1u2gcZYiIVxvm8n2kdDvFb4x0yOSrn3EiBpF5MnGGje8",
    type: "gdoc" as const,
  },
  {
    id: "4",
    title: "Simple Compiler in Java",
    excerpt:
      "This is a report recounting a group project on a simple compiler. This report grapples with some fundamental concepts of programming languages.",
    url: "https://docs.google.com/document/d/1_9fKh5Kf_ynFQB0S8qzU0ZEt4yCEtyzZ6FQ44NTNMOw/preview",
    docId: "1_9fKh5Kf_ynFQB0S8qzU0ZEt4yCEtyzZ6FQ44NTNMOw",
    type: "gdoc" as const,
  },
];

interface ArticleCardProps {
  title: string;
  excerpt: string;
  url: string;
  type?: "gdoc" | "link";
  layoutMode?: "grid" | "list";
}

function ArticleCard({ title, excerpt, url, type, layoutMode = "grid" }: ArticleCardProps) {
  const previewUrl = type === "gdoc" ? url : null;
  const iframeHeight = layoutMode === "list" ? "min(70vh, 600px)" : "min(45vh, 400px)";

  return (
    <Paper
      p="lg"
      radius={0}
      style={{
        border: "2px solid",
        borderColor: "#fff #404040 #404040 #fff",
        boxShadow: "inset 1px 1px 0 #fff",
        background: "#c0c0c0",
        height: "100%",
      }}
    >
      <Stack gap="sm">
        <Group justify="space-between" wrap="nowrap" gap="xs">
          <Title order={4} lineClamp={2} style={{ flex: 1, minWidth: 0 }}>
            {title}
          </Title>
          <Anchor
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            size="xs"
            style={{ flexShrink: 0 }}
          >
            Open in new tab
          </Anchor>
        </Group>
        {excerpt && (
          <Text size="sm" c="dimmed" lineClamp={2}>
            {excerpt}
          </Text>
        )}
        {previewUrl && (
          <Paper
            style={{
              overflow: "hidden",
              border: "1px solid #808080",
            }}
          >
            <iframe
              src={previewUrl}
              title={title}
              style={{
                width: "100%",
                height: iframeHeight,
                minHeight: 320,
                border: "none",
                display: "block",
              }}
            />
          </Paper>
        )}
      </Stack>
    </Paper>
  );
}

const ArticlesPage = () => {
  const [layoutMode] = useLayoutMode();

  return (
    <Container size="xl" py="xl" style={{ minHeight: "70vh" }}>
      <Stack gap="xl">
        <Group justify="space-between" align="center" wrap="wrap" gap="md">
          <Title order={2}>Articles</Title>
          <LayoutSwitcher />
        </Group>

        {layoutMode === "list" ? (
          <Stack gap="xl">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.id} {...article} layoutMode="list" />
            ))}
          </Stack>
        ) : (
          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing={{ base: "lg", md: "xl" }}
          >
            {ARTICLES.map((article) => (
              <ArticleCard key={article.id} {...article} layoutMode="grid" />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
};

export default ArticlesPage;
