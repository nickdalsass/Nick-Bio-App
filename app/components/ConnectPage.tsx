"use client";

import { Center, Image, Anchor, Group, Container, Paper, Text } from "@mantine/core";
import { motion } from "motion/react";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/nicholasdalsass/",
    handle: "@nicholasdalsass",
    src: "/LinkedInIcon.webp",
    alt: "LinkedIn Logo",
  },
  {
    href: "https://github.com/nickdalsass",
    handle: "@nickdalsass",
    src: "/GitHubLogo.png",
    alt: "GitHub Logo",
  },
  {
    href: "https://discord.com/users/1415143148585353246",
    handle: "@nickdalsass",
    src: "/DiscordLogo.jpg",
    alt: "Discord Logo",
  },
];

function SocialCard({
  href,
  handle,
  src,
  alt,
  index,
}: {
  href: string;
  handle: string;
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
          p="lg"
          radius={0}
          style={{
            border: "2px solid",
            borderColor: "#fff #404040 #404040 #fff",
            boxShadow: "inset 1px 1px 0 #fff",
            background: "#c0c0c0",
            width: 140,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Image
            w={64}
            h={64}
            radius="md"
            src={src}
            alt={alt}
            style={{ objectFit: "contain" }}
          />
          <Text size="sm" c="dimmed" ta="center">
            {handle}
          </Text>
        </Paper>
      </Anchor>
    </motion.div>
  );
}

const ConnectPage = () => {
  return (
    <Center style={{ minHeight: "70vh" }}>
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: "center", marginBottom: 24 }}
        >
          <Text size="sm" c="dimmed" mb="xl">
            You&apos;ve got mail! Let&apos;s connect.
          </Text>
        </motion.div>
        <Group justify="center" gap="xl" wrap="wrap">
          {socialLinks.map((link, i) => (
            <SocialCard key={link.href} {...link} index={i} />
          ))}
        </Group>
      </Container>
    </Center>
  );
};

export default ConnectPage;
