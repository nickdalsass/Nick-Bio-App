"use client";

import { motion } from "motion/react";
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

type ArticleCategory = "computing" | "philosophy";

const ARTICLES: Array<{
  id: string;
  title: string;
  excerpt: string;
  url: string;
  docId?: string;
  type: "gdoc" | "link";
  category: ArticleCategory;
}> = [
  {
    id: "1",
    title: "Homomorphic Encryption",
    excerpt:
      "An introductory research paper on homomorphic encryption, a rapidly advancing cryptography technique.",
    url: "https://docs.google.com/document/d/1EDQuT9CxJ-gVdZ8jWAfSlE5PpZ01hDL6J9UmGL4gyKI/preview",
    docId: "1EDQuT9CxJ-gVdZ8jWAfSlE5PpZ01hDL6J9UmGL4gyKI",
    type: "gdoc",
    category: "computing",
  },
  {
    id: "2",
    title: "Modeling Autonomous Vehicles",
    excerpt:
      "Research paper covering the modeling of highway functionality in automated vehicles using finite automata.",
    url: "https://docs.google.com/document/d/1NBAvv5JiQw-a9w_Z8hWeMqpVeHz5fktnbIzjHee8wsI/preview",
    docId: "1NBAvv5JiQw-a9w_Z8hWeMqpVeHz5fktnbIzjHee8wsI",
    type: "gdoc",
    category: "computing",
  },
  {
    id: "3",
    title: "Blender 3D-Rendering Project",
    excerpt:
      "Introductory Blender Project working with photogrammetry tools to model a given 3D object.",
    url: "https://docs.google.com/document/d/1u2gcZYiIVxvm8n2kdDvFb4x0yOSrn3EiBpF5MnGGje8/preview",
    docId: "1u2gcZYiIVxvm8n2kdDvFb4x0yOSrn3EiBpF5MnGGje8",
    type: "gdoc",
    category: "computing",
  },
  {
    id: "4",
    title: "Simple Compiler in Java",
    excerpt:
      "This is a report recounting a group project on a simple compiler that grapples with some fundamental concepts of programming languages.",
    url: "https://docs.google.com/document/d/1_9fKh5Kf_ynFQB0S8qzU0ZEt4yCEtyzZ6FQ44NTNMOw/preview",
    docId: "1_9fKh5Kf_ynFQB0S8qzU0ZEt4yCEtyzZ6FQ44NTNMOw",
    type: "gdoc",
    category: "computing",
  },
  {
    id: "5",
    title: "Reason: A Missing Link",
    excerpt:
      "This paper investigates claims about reason, Naturalism and Supernaturalism in C.S. Lewis's Miracles contrasts these claims with those of John McDowell, a contemporary philosopher.",
    url: "https://docs.google.com/document/d/1B33m6goNq4aqI-ucRJEZMSE8BrZgxydsnZA8dpEk2ng/preview",
    docId: "1B33m6goNq4aqI-ucRJEZMSE8BrZgxydsnZA8dpEk2ng",
    type: "gdoc",
    category: "philosophy",
  },
  {
    id: "6",
    title: "Whether Eternal Matter Matters?",
    excerpt:
      "A brief investigation into St. Thomas Aquinas's views on the eternity of the world.",
    url: "https://docs.google.com/document/d/1upRxz1fmhbyS39qIoCOp5FewUr29bdza1_geP4gk9d0/preview",
    docId: "1upRxz1fmhbyS39qIoCOp5FewUr29bdza1_geP4gk9d0",
    type: "gdoc",
    category: "philosophy",
  },
];

const SECTIONS: { key: ArticleCategory; title: string }[] = [
  { key: "computing", title: "Computing & Mathematics" },
  { key: "philosophy", title: "Philosophical Essays" },
];

interface ArticleCardProps {
  title: string;
  excerpt: string;
  url: string;
  type?: "gdoc" | "link";
  layoutMode?: "grid" | "list";
  index?: number;
}

function ArticleCard({ title, excerpt, url, type, layoutMode = "grid", index = 0 }: ArticleCardProps) {
  const previewUrl = type === "gdoc" ? url : null;
  const iframeHeight = layoutMode === "list" ? "min(70vh, 600px)" : "min(45vh, 400px)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      style={{ height: "100%" }}
    >
    <Paper
      p="lg"
      radius={0}
      className="retro-card"
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
    </motion.div>
  );
}

const ArticlesPage = () => {
  const [layoutMode] = useLayoutMode();

  return (
    <Container size="xl" py="xl" style={{ minHeight: "70vh" }}>
      <Stack gap="xl">
        <Group justify="space-between" align="center" wrap="wrap" gap="md">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Title order={2}>Articles</Title>
          </motion.div>
          <LayoutSwitcher />
        </Group>
        <div
          style={{
            margin: "0 0 1rem",
            borderTop: "2px solid #404040",
            borderBottom: "1px solid #fff",
            boxShadow: "0 1px 0 #808080",
          }}
        />

        {SECTIONS.map((section, sectionIdx) => {
          const sectionArticles = ARTICLES.filter((a) => a.category === section.key);
          if (sectionArticles.length === 0) return null;

          return (
            <Stack key={section.key} gap="md">
              {sectionIdx > 0 && (
                <div
                  style={{
                    margin: "1.5rem 0",
                    borderTop: "2px solid #404040",
                    borderBottom: "1px solid #fff",
                    boxShadow: "0 1px 0 #808080",
                  }}
                />
              )}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: sectionIdx * 0.1 }}
              >
                <Title order={3} size="h4" c="dark.7" fw={600}>
                  {section.title}
                </Title>
              </motion.div>
              {layoutMode === "list" ? (
                <Stack gap="xl">
                  {sectionArticles.map((article, i) => (
                    <ArticleCard
                      key={article.id}
                      {...article}
                      layoutMode="list"
                      index={sectionIdx * 10 + i}
                    />
                  ))}
                </Stack>
              ) : (
                <SimpleGrid
                  cols={{ base: 1, sm: 2 }}
                  spacing={{ base: "lg", md: "xl" }}
                >
                  {sectionArticles.map((article, i) => (
                    <ArticleCard
                      key={article.id}
                      {...article}
                      layoutMode="grid"
                      index={sectionIdx * 10 + i}
                    />
                  ))}
                </SimpleGrid>
              )}
            </Stack>
          );
        })}
      </Stack>
    </Container>
  );
};

export default ArticlesPage;
