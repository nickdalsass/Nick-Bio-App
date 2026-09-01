"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Paper, Stack, Group, Title, Text, Anchor, Loader } from "@mantine/core";

export interface ArticleCardProps {
  id?: string;
  title: string;
  excerpt: string;
  url: string;
  type?: "pdf" | "link" | "gdoc";
  layoutMode?: "grid" | "list";
  index?: number;
  docsReady?: boolean;
  onDocLoad?: (id: string) => void;
}

const RETRO_CARD_STYLE = {
  border: "2px solid",
  borderColor: "#fff #404040 #404040 #fff",
  boxShadow: "inset 1px 1px 0 #fff",
  background: "#c0c0c0",
} as const;

export default function ArticleCard({
  id,
  title,
  excerpt,
  url,
  type = "pdf",
  layoutMode = "grid",
  index = 0,
  docsReady = true,
  onDocLoad,
}: ArticleCardProps) {
  const [loadPreview, setLoadPreview] = useState(false);
  const showPreview = type === "pdf" || type === "gdoc";
  const previewUrl =
    type === "pdf"
      ? `${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`
      : url;
  const iframeClass =
    layoutMode === "list" ? "article-card-iframe-list" : "article-card-iframe-grid";

  useEffect(() => {
    if (window.matchMedia("(min-width: 64em)").matches) {
      setLoadPreview(true);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      style={{ height: "100%" }}
    >
      <Paper
        p={{ base: "md", sm: "lg" }}
        radius={0}
        className="retro-card"
        style={{ ...RETRO_CARD_STYLE, height: "100%" }}
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
              py={4}
              px={4}
            >
              Open in new tab
            </Anchor>
          </Group>
          {excerpt && (
            <Text size="sm" c="dimmed" className="article-excerpt">
              {excerpt}
            </Text>
          )}
          {showPreview && (
            <Paper className="article-preview">
              {!docsReady && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    zIndex: 1,
                  }}
                >
                  <Loader size="lg" color="gray" />
                </div>
              )}
              {loadPreview && (
                <iframe
                  src={previewUrl}
                  title={title}
                  className={iframeClass}
                  onLoad={() => id && onDocLoad?.(id)}
                />
              )}
            </Paper>
          )}
        </Stack>
      </Paper>
    </motion.div>
  );
}
