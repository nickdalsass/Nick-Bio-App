import { Center, Button, Image, Anchor, Stack } from "@mantine/core";

const ConnectPage = () => {
  return (
    <Center style={{ height: "80vh" }}>

        <Stack align="center">
        <Anchor
          href="https://www.linkedin.com/in/nicholasdalsass/"
          target="_blank"
        >
          <Button variant="transparent" w={200} h={100}>
            <Image w={100} src="/LinkedInIcon.webp" alt="LinkedIn Logo" />
          </Button>
        </Anchor>
        <p>@nicholasdalsass</p>
      </Stack>
      <Stack align="center">
        <Anchor href="https://github.com/nickdalsass" target="_blank">
          <Button variant="transparent" w={200} h={100}>
            <Image w={100} src="/GitHubLogo.png" alt="GitHub Logo" />
          </Button>
        </Anchor>
        <p>@nickdalsass</p>
      </Stack>
      <Stack align="center">
        <Anchor
          href="https://discord.com/users/1415143148585353246"
          target="_blank"
        >
          <Button variant="transparent" w={200} h={100}>
            <Image
              w={100}
              bdrs={30}
              src="/DiscordLogo.jpg"
              alt="Discord Logo"
            />
          </Button>
        </Anchor>
        <p>@nickdalsass</p>
      </Stack>

      
    </Center>
  );
};
export default ConnectPage;
