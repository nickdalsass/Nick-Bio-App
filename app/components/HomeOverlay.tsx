import { Group, Title, Avatar } from "@mantine/core";

const HomeOverlay = () => {
  return (
    <>
      <Group gap={350} mt={200} ml={100} className="fade-element">
        <Avatar
          style={{ alignItems: "center", pointerEvents: "none" }}
          size={400}
          src={"/LinkedInHeadshot.jpeg"}
        />
        <Title>Software Developer.</Title>
      </Group>
    </>
  );
};
export default HomeOverlay;
