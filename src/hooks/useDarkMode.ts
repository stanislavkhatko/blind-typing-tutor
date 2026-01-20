"use client";

import { useState, useEffect } from "react";
import { getStorageItem, setStorageItem } from "../utils/storage";

/**
 * Hook to manage dark mode state with localStorage persistence and system preference detection
 * @returns [darkMode, setDarkMode, isInitialized]
 */
export function useDarkMode(): [boolean, (dark: boolean) => void, boolean] {
  // Initialize with false to ensure consistent SSR/client rendering
  const [darkMode, setDarkMode] = useState(false);
  const [darkModeInitialized, setDarkModeInitialized] = useState(false);

  // Initialize darkMode from localStorage after mount (prevents hydration mismatch)
  // This pattern is necessary for SSR apps to avoid hydration mismatches
  useEffect(() => {
    if (!darkModeInitialized) {
      const saved = getStorageItem("darkMode");
      let initialDarkMode = false;

      if (saved === "true" || saved === "false") {
        initialDarkMode = saved === "true";
      } else if (typeof window !== "undefined" && window.matchMedia) {
        initialDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDarkMode(initialDarkMode);
      setDarkModeInitialized(true);
    }
  }, [darkModeInitialized]);

  // Apply darkMode changes after initialization
  useEffect(() => {
    if (darkModeInitialized) {
      setStorageItem("darkMode", String(darkMode));
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [darkMode, darkModeInitialized]);

  // System theme detection (only after darkMode is initialized)
  useEffect(() => {
    if (darkModeInitialized && typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        const saved = getStorageItem("darkMode");
        if (saved === null || saved === "") {
          setDarkMode(e.matches);
        }
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [darkModeInitialized]);

  return [darkMode, setDarkMode, darkModeInitialized];
}
