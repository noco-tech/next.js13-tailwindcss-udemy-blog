import { create, useStore } from "zustand";

type Theme = "light" | "dark";

type ThemeStore = {
  themeState: Theme;
  setThemeState: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  themeState: "light",
  setThemeState: (theme) => set({ themeState: theme }),
}));
