"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <>
      <ThemeProvider defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </>
  );
}
