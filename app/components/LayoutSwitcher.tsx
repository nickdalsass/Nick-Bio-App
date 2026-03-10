"use client";

import { SegmentedControl } from "@mantine/core";
import { useLayoutMode, type LayoutMode } from "./LayoutContext";

interface LayoutSwitcherProps {
  onChange?: (mode: LayoutMode) => void;
}

export default function LayoutSwitcher({ onChange }: LayoutSwitcherProps) {
  const [mode, setMode] = useLayoutMode();

  const handleChange = (value: string) => {
    const newMode = value as LayoutMode;
    setMode(newMode);
    onChange?.(newMode);
  };

  return (
    <SegmentedControl
      size="sm"
      radius="md"
      value={mode}
      onChange={handleChange}
      data={[
        { label: "Grid", value: "grid" },
        { label: "List", value: "list" },
        { label: "Compact", value: "compact" },
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
