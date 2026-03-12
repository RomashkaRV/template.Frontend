"use client";

import { useMount } from "hooks";

import type { SwitchThemeButtonTheme } from "../../widgets";

export const SetTheme = () => {
  useMount(() => {
    const saved = localStorage.getItem("theme") as SwitchThemeButtonTheme;
    if (saved) {
      document.body.classList.add(saved);
    } else {
      const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

      const initial = prefersLight ? "dark" : "light";
      document.body.classList.add(initial);
    }
  });

  return null;
};
