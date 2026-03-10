"use client";

import { motion } from "motion/react";
import { Paper, Stack, Group, Title, Text, Anchor } from "@mantine/core";

export interface ArticleCardProps {
  title: string;
  excerpt: string;
  url: string;
  type?: "gdoc" | "link";
  layoutMode?: "grid" | "list";
  index?: number;
}

const RETRO_CARD_STYLE = {
  border: "2px solid",
  borderColor: "#fff #404040 #404040 #fff",
  boxShadow: "inset 1px 1px 0 #fff",
  background: "#c0c0c0",
} as const;

export default function ArticleCard({
  title,
  excerpt,
  url,
  type = "gdoc",
  layoutMode = "grid",
  index = 0,
}: ArticleCardProps) {
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
            <Paper style={{ overflow: "hidden", border: "1px solid #808080" }}>
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
