"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SimpleGrid, Stack, Title, Group, Container } from "@mantine/core";
import LayoutSwitcher from "./LayoutSwitcher";
import { useLayoutMode } from "./LayoutContext";
import ArticleCard from "./ArticleCard";

export type ArticleCategory = "computing" | "philosophy";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  type: "pdf" | "link";
  category: ArticleCategory;
}

const pdf = (name: string) => `/articles/${encodeURIComponent(name)}`;

const ARTICLES: Article[] = [
  {
    id: "1",
    title: "Homomorphic Encryption",
    excerpt:
      "An introductory research paper on homomorphic encryption, a rapidly advancing cryptography technique.",
    url: pdf("Homomorphic Encryption Final Paper.pdf"),
    type: "pdf",
    category: "computing",
  },
  {
    id: "2",
    title: "Modeling Autonomous Vehicles",
    excerpt:
      "Research paper covering the modeling of highway functionality in automated vehicles using finite automata.",
    url: pdf("CSC212 Final Project.pdf"),
    type: "pdf",
    category: "computing",
  },
  {
    id: "3",
    title: "Blender 3D-Rendering Project",
    excerpt:
      "Introductory Blender Project working with photogrammetry tools to model a given 3D object.",
    url: pdf("CSC322_Final_Project_Report.pdf"),
    type: "pdf",
    category: "computing",
  },
  {
    id: "4",
    title: "Simple Compiler in Java",
    excerpt:
      "This is a report recounting a group project on a simple compiler that grapples with some fundamental concepts of programming languages.",
    url: pdf("Compiler Project Report.pdf"),
    type: "pdf",
    category: "computing",
  },
  {
    id: "5",
    title: "Reason: A Missing Link",
    excerpt:
      "This paper investigates claims about reason, Naturalism, and Supernaturalism in C.S. Lewis's Miracles and contrasts them with those of John McDowell, a contemporary philosopher.",
    url: pdf("Miracles Term Paper HSPH 203.pdf"),
    type: "pdf",
    category: "philosophy",
  },
  {
    id: "6",
    title: "Whether Eternal Matter Matters?",
    excerpt: "A brief investigation into St. Thomas Aquinas's views on the eternity of the world.",
    url: pdf("Thesis Final Take.pdf"),
    type: "pdf",
    category: "philosophy",
  },
];

const SECTIONS: { key: ArticleCategory; title: string }[] = [
  { key: "computing", title: "Computing & Mathematics" },
  { key: "philosophy", title: "Philosophical Essays" },
];

const PREVIEW_IDS = ARTICLES.filter((a) => a.type === "pdf").map((a) => a.id);

const ArticlesPage = () => {
  const [layoutMode] = useLayoutMode("articles");
  const [previewsActive, setPreviewsActive] = useState(false);
  const [loadedIds, setLoadedIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setPreviewsActive(window.matchMedia("(min-width: 64em)").matches);
  }, []);

  const docsReady = !previewsActive || PREVIEW_IDS.every((id) => loadedIds.has(id));

  const onDocLoad = (id: string) => {
    setLoadedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

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
            <Title order={2}>Articles</Title>
          </motion.div>
          <div className="layout-switcher-wrap">
            <LayoutSwitcher page="articles" />
          </div>
        </Group>
        <div className="retro-divider" />

        {SECTIONS.map((section, sectionIdx) => {
          const sectionArticles = ARTICLES.filter((a) => a.category === section.key);
          if (sectionArticles.length === 0) return null;

          return (
            <Stack key={section.key} gap="md">
              {sectionIdx > 0 && <div className="retro-divider retro-divider--section" />}
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
                <Stack gap="md">
                  {sectionArticles.map((article, i) => (
                    <ArticleCard
                      key={article.id}
                      {...article}
                      layoutMode="list"
                      index={sectionIdx * 10 + i}
                      docsReady={docsReady}
                      onDocLoad={onDocLoad}
                    />
                  ))}
                </Stack>
              ) : (
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  {sectionArticles.map((article, i) => (
                    <ArticleCard
                      key={article.id}
                      {...article}
                      layoutMode="grid"
                      index={sectionIdx * 10 + i}
                      docsReady={docsReady}
                      onDocLoad={onDocLoad}
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
