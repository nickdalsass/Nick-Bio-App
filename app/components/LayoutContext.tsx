"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type LayoutMode = "grid" | "list";

const LAYOUT_STORAGE_KEY = "bio-app-layout";

interface LayoutContextType {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layoutMode, setLayoutModeState] = useState<LayoutMode>("grid");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const stored = localStorage.getItem(LAYOUT_STORAGE_KEY) as LayoutMode | null;
    if (stored && ["grid", "list"].includes(stored)) {
      setLayoutModeState(stored);
    }
  }, [mounted]);

  const setLayoutMode = useCallback((mode: LayoutMode) => {
    setLayoutModeState(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem(LAYOUT_STORAGE_KEY, mode);
    }
  }, []);

  return (
    <LayoutContext.Provider value={{ layoutMode, setLayoutMode }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutMode(): [LayoutMode, (mode: LayoutMode) => void] {
  const ctx = useContext(LayoutContext);
  if (!ctx) {
    return ["grid", () => {}];
  }
  return [ctx.layoutMode, ctx.setLayoutMode];
}
