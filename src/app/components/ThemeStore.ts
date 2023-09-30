import { create, useStore } from "zustand";

type Theme = "dark" | "light";

type ThemeStore = {
  themeState: Theme;
  setThemeState: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  themeState: "dark",
  setThemeState: (theme) => set({ themeState: theme }),
}));
