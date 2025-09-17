import { Center, Group } from "@mantine/core";
import StyledContainer from "./StyledContainer";

const ProjectsPage = () => {
  return (
    <Center style={{ height: "80vh" }}>
      <Group gap={200}>
        <StyledContainer />
        <StyledContainer />
      </Group>
    </Center>
  );
};
export default ProjectsPage;
