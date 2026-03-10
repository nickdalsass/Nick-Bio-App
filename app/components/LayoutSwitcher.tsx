"use client";

import { SegmentedControl } from "@mantine/core";
import { useLayoutMode, type LayoutMode } from "./LayoutContext";

export default function LayoutSwitcher() {
  const [mode, setMode] = useLayoutMode();

  return (
    <SegmentedControl
      size="sm"
      radius="md"
      value={mode}
      onChange={(value) => setMode(value as LayoutMode)}
      data={[
        { label: "Grid", value: "grid" },
        { label: "List", value: "list" },
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
