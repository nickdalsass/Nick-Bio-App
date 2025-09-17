import { Center, Paper, Text } from "@mantine/core";

const StyledContainer = () => {
  return (
    <Paper
      h={200}
      w={400}
      shadow={"xs"}
      withBorder
      style={{
        alignContent: "center",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#ccc",
      }}
    >
      <Center>
        <Text>First Project</Text>
      </Center>
    </Paper>
  );
};
export default StyledContainer;
