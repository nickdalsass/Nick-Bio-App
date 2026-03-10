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
      style={{
        background: "#c0c0c0",
        border: "1px solid #808080",
        boxShadow: "inset 2px 2px 2px #fff, inset -1px -1px 1px #404040",
      }}
      value={currentPage}
      onChange={(selectedPage) => {
        if (selectedPage === "Connect") router.push("/connect");
        else if (selectedPage === "Projects") router.push("/projects");
        else if (selectedPage === "Articles") router.push("/articles");
        else if (selectedPage === "Home") router.push("/");
      }}
      styles={{
        label: { color: "#000", position: "relative", zIndex: 1 },
        indicator: {
          background: "#c0c0c0",
          border: "1px solid #808080",
          boxShadow: "inset 1px 1px 0 #404040",
        },
      }}
      data={["Home", "Projects", "Articles", "Connect"]}
    />
  );
};

export default PageController;