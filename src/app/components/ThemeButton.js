"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const onClickHandler = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
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
