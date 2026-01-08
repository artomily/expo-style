import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    subtext: string;
    accent: string;
  };
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const LIGHT_COLORS = {
  background: "#f8fafc",
  surface: "#ffffff",
  text: "#0f172a",
  subtext: "#475569",
  accent: "#2563eb"
};

const DARK_COLORS = {
  background: "#020617",
  surface: "rgba(15,23,42,0.95)",
  text: "#f8fafc",
  subtext: "#94a3b8",
  accent: "#facc15"
};

const THEME_STORAGE_KEY = "setra-theme";

export function ThemeProvider({
  children
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loadPreference = async (): Promise<void> => {
      try {
        let stored: string | null = null;
        if (Platform.OS === "web" && typeof window !== "undefined") {
          stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        } else {
          stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        }
        if (stored === "light" || stored === "dark") {
          setTheme(stored);
        }
      } catch (error) {
        console.warn("Failed to load theme preference", error);
      } finally {
        setHydrated(true);
      }
    };
    loadPreference().catch(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const persist = async (): Promise<void> => {
      try {
        if (Platform.OS === "web" && typeof window !== "undefined") {
          window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        } else {
          await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
        }
      } catch (error) {
        console.warn("Failed to save theme preference", error);
      }
    };
    persist().catch(() => null);
  }, [theme, hydrated]);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      theme,
      toggleTheme: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
      colors: theme === "dark" ? DARK_COLORS : LIGHT_COLORS
    };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
