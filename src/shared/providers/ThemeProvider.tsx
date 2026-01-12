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

// Full ThemeProvider implementation
export function ThemeProvider({
  children
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [theme, setTheme] = useState<ThemeMode>("light");

  // Load theme from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === "dark" || savedTheme === "light") {
          setTheme(savedTheme);
        }
      } catch (e) {
        console.error("Failed to load theme", e);
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  };

  const value = useMemo<ThemeContextValue>(() => {
    return {
      theme,
      toggleTheme,
      colors: theme === "light" ? LIGHT_COLORS : DARK_COLORS
    };
  }, [theme]);

  // Force StatusBar update (optional but good practice)
  // StatusBar.setBarStyle(theme === "light" ? "dark-content" : "light-content");

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
