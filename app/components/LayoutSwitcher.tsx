"use client";

import { SegmentedControl } from "@mantine/core";
import { useLayoutMode, type LayoutMode, type LayoutPage } from "./LayoutContext";

export default function LayoutSwitcher({ page }: { page: LayoutPage }) {
  const [mode, setMode] = useLayoutMode(page);

  return (
    <SegmentedControl
      size="md"
      radius="md"
      value={mode}
      onChange={(value) => setMode(value as LayoutMode)}
      data={[
        { label: "List", value: "list" },
        { label: "Grid", value: "grid" },
      ]}
      styles={{
        label: { color: "#000" },
        indicator: {
          background: "#c0c0c0",
          border: "1px solid #808080",
          boxShadow: "inset 1px 1px 0 #404040",
        },
      }}
    />
  );
}
