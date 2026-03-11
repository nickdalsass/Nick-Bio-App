"use client";

import { motion } from "motion/react";
import { SimpleGrid, Stack, Title, Group, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import LayoutSwitcher from "./LayoutSwitcher";
import { useLayoutMode } from "./LayoutContext";
import ArticleCard from "./ArticleCard";

export type ArticleCategory = "computing" | "philosophy";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  docId?: string;
  type: "gdoc" | "link";
  category: ArticleCategory;
}

const ARTICLES: Article[] = [
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
      "This paper investigates claims about reason, Naturalism, and Supernaturalism in C.S. Lewis's Miracles and contrasts them with those of John McDowell, a contemporary philosopher.",
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

const ArticlesPage = () => {
  const [layoutMode] = useLayoutMode();
  const isMobile = useMediaQuery("(max-width: 47.99em)");
  const effectiveLayoutMode = isMobile ? "grid" : layoutMode;

  return (
    <Container size="xl" py={{ base: "md", md: "xl" }} px={{ base: 16, sm: 20, md: 24 }} style={{ minHeight: "70vh" }}>
      <Stack gap="md">
        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Title order={2}>Articles</Title>
          </motion.div>
          {!isMobile && <LayoutSwitcher />}
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
              {effectiveLayoutMode === "list" ? (
                <Stack gap="md">
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
                  spacing="md"
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
