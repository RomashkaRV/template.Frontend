"use client";

import type { FC } from "react";
import { useState } from "react";
import type { ButtonProps } from "react-html-props";

import { IconButton } from "components/core";
import { IconMoon, IconSun } from "components/icons";

import { useMount } from "hooks";

import type { SwitchThemeButtonTheme } from "./types";

export const SwitchThemeButton: FC<Omit<ButtonProps, "onClick">> = (props) => {
  const [theme, setTheme] = useState<SwitchThemeButtonTheme>("light");

  useMount(() => {
    const saved = localStorage.getItem("theme") as SwitchThemeButtonTheme;
    if (saved) {
      setTheme(saved);
      document.body.classList.add(saved);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.body.classList.add(initial);
    }
  });

  const toggleTheme = () => {
    const toggledTheme: SwitchThemeButtonTheme =
      theme === "dark" ? "light" : "dark";
    setTheme(toggledTheme);

    document.body.classList.remove(theme);
    document.body.classList.add(toggledTheme);

    window.localStorage.setItem("theme", toggledTheme);
  };

  return (
    <IconButton {...props} onClick={toggleTheme}>
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </IconButton>
  );
};
