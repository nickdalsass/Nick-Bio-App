import { Center, Button, Image, Anchor, Stack, Group, Container } from "@mantine/core";

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
}: {
  href: string;
  handle: string;
  src: string;
  alt: string;
}) {
  return (
    <Stack align="center" gap="xs">
      <Anchor href={href} target="_blank" rel="noopener noreferrer">
        <Button variant="transparent" w={120} h={120} p={0}>
          <Image
            w={80}
            h={80}
            radius="md"
            src={src}
            alt={alt}
            style={{ objectFit: "contain" }}
          />
        </Button>
      </Anchor>
      <span style={{ fontSize: "0.875rem", color: "var(--mantine-color-dimmed)" }}>
        {handle}
      </span>
    </Stack>
  );
}

const ConnectPage = () => {
  return (
    <Center style={{ minHeight: "70vh" }}>
      <Container size="sm">
        <Group justify="center" gap="xl" wrap="wrap">
          {socialLinks.map((link) => (
            <SocialCard key={link.href} {...link} />
          ))}
        </Group>
      </Container>
    </Center>
  );
};

export default ConnectPage;
