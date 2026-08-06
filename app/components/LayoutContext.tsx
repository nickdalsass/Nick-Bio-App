"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type LayoutMode = "grid" | "list";
export type LayoutPage = "projects" | "articles";

const DEFAULTS: Record<LayoutPage, LayoutMode> = {
  projects: "list",
  articles: "grid",
};

const storageKey = (page: LayoutPage) => `bio-app-layout-${page}`;

interface LayoutContextType {
  modes: Record<LayoutPage, LayoutMode>;
  setLayoutMode: (page: LayoutPage, mode: LayoutMode) => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [modes, setModes] = useState<Record<LayoutPage, LayoutMode>>(DEFAULTS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const next = { ...DEFAULTS };
    for (const page of Object.keys(DEFAULTS) as LayoutPage[]) {
      const stored = localStorage.getItem(storageKey(page)) as LayoutMode | null;
      if (stored && ["grid", "list"].includes(stored)) {
        next[page] = stored;
      }
    }
    setModes(next);
  }, [mounted]);

  const setLayoutMode = useCallback((page: LayoutPage, mode: LayoutMode) => {
    setModes((prev) => ({ ...prev, [page]: mode }));
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey(page), mode);
    }
  }, []);

  return (
    <LayoutContext.Provider value={{ modes, setLayoutMode }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutMode(
  page: LayoutPage
): [LayoutMode, (mode: LayoutMode) => void] {
  const ctx = useContext(LayoutContext);
  if (!ctx) {
    return [DEFAULTS[page], () => {}];
  }
  return [ctx.modes[page], (mode) => ctx.setLayoutMode(page, mode)];
}
