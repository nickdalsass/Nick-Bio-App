"use client";
import { useEffect, useState } from "react";
import { SegmentedControl } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";

const SEGMENT_TO_ROUTE: Record<string, string> = {
  Home: "/",
  Projects: "/projects",
  Articles: "/articles",
  Connect: "/connect",
};

const ROUTE_TO_SEGMENT: Record<string, string> = {
  "/": "Home",
  "/projects": "Projects",
  "/articles": "Articles",
  "/connect": "Connect",
};

const PageController = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentPage = ROUTE_TO_SEGMENT[pathname] ?? "Home";

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
      onChange={(selected) => router.push(SEGMENT_TO_ROUTE[selected] ?? "/")}
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