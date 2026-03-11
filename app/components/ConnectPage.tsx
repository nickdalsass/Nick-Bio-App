"use client";

import { Center, Image, Anchor, Group, Container, Paper, Text, Stack } from "@mantine/core";
import { motion } from "motion/react";

const SOCIAL_CARD_STYLE = {
  border: "2px solid",
  borderColor: "#fff #404040 #404040 #fff",
  boxShadow: "inset 1px 1px 0 #fff",
  background: "#c0c0c0",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: 8,
} as const;

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/nicholasdalsass/",
    label: "LinkedIn",
    src: "/LinkedInIcon.webp",
    alt: "LinkedIn Logo",
  },
  {
    href: "https://github.com/nickdalsass",
    label: "GitHub",
    src: "/GitHubLogo.png",
    alt: "GitHub Logo",
  },
  {
    href: "https://discord.com/users/1415143148585353246",
    label: "Discord",
    src: "/DiscordLogo.png",
    alt: "Discord Logo",
  },
];

function SocialCard({
  href,
  label,
  src,
  alt,
  index,
}: {
  href: string;
  label: string;
  src: string;
  alt: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: (index ?? 0) * 0.1 }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Anchor href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        <Paper
          p={{ base: "md", sm: "lg" }}
          radius={0}
          w={{ base: 120, sm: 140 }}
          style={SOCIAL_CARD_STYLE}
        >
          <Image
            w={64}
            h={64}
            radius="md"
            src={src}
            alt={alt}
            style={{ objectFit: "contain" }}
          />
          <Text size="sm" c="dimmed" ta="center" lineClamp={1} style={{ overflow: "hidden", width: "100%" }}>
            {label}
          </Text>
        </Paper>
      </Anchor>
    </motion.div>
  );
}

const ConnectPage = () => {
  return (
    <Center style={{ minHeight: "70vh", padding: "24px 0" }}>
      <Container size="md" px={{ base: 16, sm: 20 }} py={{ base: "md", md: "lg" }}>
        <Stack align="center" gap="lg">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ textAlign: "center" }}
          >
            <Text size="sm" c="dimmed">
              You&apos;ve got mail! Let&apos;s connect.
            </Text>
          </motion.div>
          <Group justify="center" gap="lg" wrap="wrap">
            {socialLinks.map((link, i) => (
              <SocialCard key={link.href} {...link} index={i} />
            ))}
          </Group>
        </Stack>
      </Container>
    </Center>
  );
};

export default ConnectPage;
