import * as motion from "motion/react-client";
import { Group } from "@mantine/core";

const HomeBackground = () => {
  const boxStyle = {
    position: "absolute" as const,
    marginTop: 500,
    marginLeft: -500,
    width: 800,
    height: 800,
    backgroundColor: "#D3D3D3",
    borderRadius: 15,
  };

  return (
    <>
      <Group
        ff={"JetBrains Mono, monospace"}
        style={{ position: "absolute", top: 350, left: 50, zIndex: 0 }}
      >
        <motion.div
          style={{ ...boxStyle }}
          animate={{ rotate: 20, scale: 1.4, opacity: 0.8 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          style={{ ...boxStyle }}
          animate={{ rotate: 30, scale: 1.5, opacity: 0.5 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          style={{ ...boxStyle }}
          animate={{ rotate: 37, scale: 1.54, opacity: 0.3 }}
          transition={{ duration: 1 }}
        />
      </Group>
    </>
  );
};
export default HomeBackground;
