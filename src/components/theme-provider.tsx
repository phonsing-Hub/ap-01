"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { FONT_OPTIONS, FontKey } from "@/lib/fonts";

const THEME_COLORS = [
  "theme-default",
  "theme-red",
  "theme-rose",
  "theme-orange",
  "theme-green",
  "theme-blue",
  "theme-yellow",
  "theme-violet",
];

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <FontAndThemeSync />
      {children}
    </NextThemesProvider>
  );
}

function FontAndThemeSync() {
  React.useEffect(() => {
    const font = localStorage.getItem("font") as FontKey;
    const fontDef = FONT_OPTIONS[font];
    if (fontDef) {
      document.documentElement.style.setProperty(
        "--font-sans",
        fontDef.var === "system-ui" ? fontDef.var : `var(${fontDef.var})`
      );
    }
    const themeColor = localStorage.getItem("theme-color") || "theme-default";
    const html = document.documentElement;
    html.classList.remove(...THEME_COLORS);
    html.classList.add(themeColor);
  }, []);

  return null;
}
