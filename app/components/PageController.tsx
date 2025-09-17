"use client";
import { useEffect, useState } from "react";
import { SegmentedControl } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";

const routeToSegment = {
  "/": "Home",
  "/projects": "Projects",
  "/articles": "Articles",
  "/connect": "Connect",
};

const PageController = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentPage = (routeToSegment as Record<string, string>)[pathname] || "Home";

  if (!mounted) return null;

  return (
    <SegmentedControl
      size="lg"
      radius="lg"
      mr={20}
      withItemsBorders={false}
      bg="#d3d3d3"
      value={currentPage}
      onChange={(selectedPage) => {
        if (selectedPage === "Connect") router.push("/connect");
        else if (selectedPage === "Projects") router.push("/projects");
        else if (selectedPage === "Articles") router.push("/articles");
        else if (selectedPage === "Home") router.push("/");
      }}
      styles={{
        label: { color: "#222", position: "relative", zIndex: 1 },
        indicator: { backgroundColor: "rgba(0, 0, 0, 0.12)" },
      }}
      data={["Home", "Projects", "Articles", "Connect"]}
    />
  );
};

export default PageController;