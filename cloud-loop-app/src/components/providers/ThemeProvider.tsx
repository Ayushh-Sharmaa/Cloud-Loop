"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as DesignThemeProvider } from "@/context/theme/ThemeProvider";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <DesignThemeProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
      >
        {children}
      </NextThemesProvider>
    </DesignThemeProvider>
  );
}

