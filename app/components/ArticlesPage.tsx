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
    title: "Articles Coming Soon",
    excerpt:
      "I'm working on sharing thoughts on software development, AI, and building in public. Check back soon!",
    url: "#",
    isPlaceholder: true,
  },
];

function ArticleCard({
  title,
  excerpt,
  url,
  isPlaceholder,
}: {
  title: string;
  excerpt: string;
  url: string;
  isPlaceholder?: boolean;
}) {
  const content = (
    <Paper
      p="lg"
      radius={0}
      style={{
        border: "2px solid",
        borderColor: "#fff #404040 #404040 #fff",
        boxShadow: "inset 1px 1px 0 #fff",
        background: "#c0c0c0",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <Stack gap="xs">
        <Title order={4}>{title}</Title>
        <Text size="sm" c="dimmed" lineClamp={2}>
          {excerpt}
        </Text>
      </Stack>
    </Paper>
  );

  if (isPlaceholder) {
    return content;
  }

  return (
    <Anchor href={url} target="_blank" rel="noopener noreferrer" underline="never">
      {content}
    </Anchor>
  );
}

const ArticlesPage = () => {
  const [layoutMode] = useLayoutMode();

  const showPlaceholder = ARTICLES.length === 1 && ARTICLES[0].isPlaceholder;

  return (
    <Container size="xl" py="xl" style={{ minHeight: "70vh" }}>
      <Stack gap="xl">
        <Group justify="space-between" align="center" wrap="wrap" gap="md">
          <Title order={2}>Articles</Title>
          {!showPlaceholder && <LayoutSwitcher />}
        </Group>

        {layoutMode === "list" ? (
          <Stack gap="md">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </Stack>
        ) : (
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: layoutMode === "compact" ? 3 : 2 }}
            spacing={{ base: "md", md: "lg" }}
          >
            {ARTICLES.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
};

export default ArticlesPage;
