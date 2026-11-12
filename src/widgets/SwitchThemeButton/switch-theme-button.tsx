"use client";

import type { FC } from "react";

import type { ButtonProps } from "react-html-props";

import { IconButton } from "components/core";
import { IconMoon, IconSun } from "components/icons";

import type { SwitchThemeButtonTheme } from "./types";

import style from "./switch-theme-button.module.scss";

export const SwitchThemeButton: FC<Omit<ButtonProps, "onClick">> = (props) => {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    const theme: SwitchThemeButtonTheme = isDark ? "dark" : "light";

    document.documentElement.style.colorScheme = theme;

    try {
      localStorage.setItem("theme", theme);
    } catch {
      // localStorage может быть недоступен (приватный режим) — тема просто не сохранится
    }
  };

  return (
    <IconButton {...props} onClick={toggleTheme}>
      <IconSun className={style.sun} />

      <IconMoon className={style.moon} />
    </IconButton>
  );
};
