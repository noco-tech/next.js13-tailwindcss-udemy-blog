"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useThemeStore } from "./ThemeStore";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // const { themeState, setThemeState } = useThemeStore(); // zustand

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    theme === "dark" ? setTheme("dark") : setTheme("light");
  }, [theme, setTheme]);

  if (!mounted) return null;

  const onClickHandler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div>
      {/* <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select> */}

      <div class="toggle_button">
        <input
          value={theme}
          onClick={onClickHandler}
          id="toggle"
          class="toggle_input"
          type="checkbox"
        />
        <label for="toggle" class="toggle_label" />
      </div>
    </div>
  );
}
