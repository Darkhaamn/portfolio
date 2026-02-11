"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import * as React from "react";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function getThemeFromDom(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem("theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme | null>(null);

  React.useEffect(() => {
    setTheme(getThemeFromDom());
  }, []);

  const toggle = React.useCallback(() => {
    const next: Theme = (theme ?? getThemeFromDom()) === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }, [theme]);

  const isDark = theme === "dark";
  const Icon = isDark ? IconSun : IconMoon;
  const nextLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Button
      type="button"
      onClick={toggle}
      variant="outline"
      size="icon-sm"
      aria-label={nextLabel}
      title={nextLabel}
    >
      <Icon className="size-4" />
      <span className="sr-only">{nextLabel}</span>
    </Button>
  );
}

