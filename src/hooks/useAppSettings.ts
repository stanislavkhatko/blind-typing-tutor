"use client";

import { useState, useEffect, startTransition, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { KeyboardLayoutId, LanguageCode } from "../types/keyboard";
import { getAllLayouts } from "../config/layouts";
import type { InterfaceLanguage } from "../translations";
import {
  detectKeyboardLayout,
  detectLearningLanguage,
  detectInterfaceLanguage,
} from "../utils/browserDetection";
import { getStorageItem, setStorageItem, removeStorageItem } from "../utils/storage";
import { updateDocumentDirection } from "../utils/textDirection";
import { soundManager } from "../utils/SoundManager";
import { parseUrlPath, buildUrlPath, type ContentType } from "../utils/url";
import { isValidInterfaceLanguage, VALID_LEARNING_LANGUAGES } from "../config/constants";
import { useDarkMode } from "./useDarkMode";

interface UseAppSettingsParams {
  interfaceLang?: string;
  contentTypeAndLang?: string; // Legacy: for /{interfaceLang}/{contentType}-{lang}
  studyLang?: string; // New: for /{interfaceLang}/{studyLang}/{learningMode}
  learningMode?: string; // New: for /{interfaceLang}/{studyLang}/{learningMode}
}

export function useAppSettings(params: UseAppSettingsParams) {
  const router = useRouter();
  const pathname = usePathname();

  // Helper to parse contentType-learningLang format (e.g., "words-es" -> { contentType: "words", learningLang: "es" })
  // Special case: "custom" has no language suffix
  const parseContentAndLang = (
    contentAndLang?: string
  ): { contentType?: ContentType; learningLang?: LanguageCode } => {
    if (!contentAndLang) return {};

    // Custom mode has no language suffix
    if (contentAndLang === "custom") {
      return { contentType: "custom" };
    }

    const parts = contentAndLang.split("-");
    if (parts.length < 2) return {};
    const contentType = parts[0] as ContentType;
    const learningLang = parts.slice(1).join("-") as LanguageCode;
    return { contentType, learningLang };
  };

  // Support both new structure ({studyLang, learningMode}) and legacy ({contentTypeAndLang})
  let urlContentType: ContentType | undefined;
  let urlLearningLang: LanguageCode | undefined;

  if (params.studyLang && params.learningMode) {
    // New structure: /{interfaceLang}/{studyLang}/{learningMode}
    urlLearningLang = params.studyLang as LanguageCode;
    urlContentType = params.learningMode as ContentType;
  } else if (params.contentTypeAndLang) {
    // Legacy structure: /{interfaceLang}/{contentType}-{lang}
    const parsed = parseContentAndLang(params.contentTypeAndLang);
    urlContentType = parsed.contentType;
    urlLearningLang = parsed.learningLang;
  }

  // Use ref to track if we're updating from URL to prevent circular updates
  const isUpdatingFromUrl = useRef(false);
  // Track previous params to detect actual changes
  const prevParamsRef = useRef({
    interfaceLang: params.interfaceLang,
    contentTypeAndLang: params.contentTypeAndLang,
    studyLang: params.studyLang,
    learningMode: params.learningMode,
  });

  // Initialize layout from localStorage with fallback defaults
  const [layoutId, setLayoutId] = useState<KeyboardLayoutId>(() => {
    const saved = getStorageItem("layoutId");
    const allValidLayouts = getAllLayouts().map((l) => l.id);
    if (saved && allValidLayouts.includes(saved as KeyboardLayoutId)) {
      return saved as KeyboardLayoutId;
    }
    return detectKeyboardLayout() as KeyboardLayoutId;
  });

  const [mode, setMode] = useState<"practice" | "beginner" | "custom">(() => {
    // Initialize from URL first if present
    if (urlContentType) {
      if (urlContentType === "words") return "beginner";
      if (urlContentType === "phrases") return "practice";
      if (urlContentType === "custom") return "custom";
    }

    const saved = getStorageItem("mode");
    if (saved === "novice" || saved === "practice") return "practice";
    if (saved === "beginner" || saved === "custom") return saved;
    return "practice";
  });

  // Initialize from URL first, then localStorage, then defaults
  const [learningLanguage, setLearningLanguage] = useState<LanguageCode>(() => {
    if (urlLearningLang) return urlLearningLang;

    const saved = getStorageItem("learningLanguage");
    if (saved && VALID_LEARNING_LANGUAGES.includes(saved as LanguageCode)) {
      return saved as LanguageCode;
    }
    const savedMode = getStorageItem("mode");
    if (!savedMode || savedMode === "null" || savedMode === "") {
      const randomLang =
        VALID_LEARNING_LANGUAGES[Math.floor(Math.random() * VALID_LEARNING_LANGUAGES.length)];
      return randomLang;
    }
    return detectLearningLanguage() as LanguageCode;
  });

  // Map mode to content type: beginner→words, practice→phrases, custom→custom
  const getContentTypeFromMode = (
    mode: "practice" | "beginner" | "custom"
  ): ContentType => {
    switch (mode) {
      case "beginner":
        return "words";
      case "practice":
        return "phrases";
      case "custom":
        return "custom";
    }
  };

  const [learningContentType, setLearningContentType] = useState<ContentType>(
    () => {
      if (urlContentType) return urlContentType;

      // Derive from mode if available
      const savedMode = getStorageItem("mode");
      if (
        savedMode === "beginner" ||
        savedMode === "practice" ||
        savedMode === "custom"
      ) {
        return getContentTypeFromMode(
          savedMode as "practice" | "beginner" | "custom"
        );
      }

      const saved = getStorageItem("learningContentType");
      if (saved === "words" || saved === "phrases" || saved === "custom")
        return saved as ContentType;
      return "words";
    }
  );

  const [interfaceLanguage, setInterfaceLanguage] = useState<InterfaceLanguage>(
    () => {
      if (params.interfaceLang && isValidInterfaceLanguage(params.interfaceLang)) {
        return params.interfaceLang;
      }

      const saved = getStorageItem("interfaceLanguage");
      if (saved && isValidInterfaceLanguage(saved)) {
        return saved;
      }
      return detectInterfaceLanguage() as InterfaceLanguage;
    }
  );

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = getStorageItem("soundEnabled");
    return saved === "true";
  });

  // Use extracted dark mode hook
  const [darkMode, setDarkMode] = useDarkMode();

  const [showKeyboard, setShowKeyboard] = useState(() => {
    const saved = getStorageItem("showKeyboard");
    return saved !== "false";
  });

  const [showHands, setShowHands] = useState(() => {
    const saved = getStorageItem("showHands");
    return saved !== "false";
  });

  const [showColors, setShowColors] = useState(() => {
    const saved = getStorageItem("showColors");
    return saved !== "false";
  });

  const [correctionMode, setCorrectionMode] = useState(() => {
    const saved = getStorageItem("correctionMode");
    if (saved === null || saved === "") return true;
    return saved === "true";
  });

  // Sync with URL params when they change (only update if different to prevent loops)
  // Use pathname as source of truth to avoid race conditions with router.replace()
  useEffect(() => {
    if (isUpdatingFromUrl.current) {
      return;
    }

    // Parse current pathname to get actual URL state (more reliable than params prop)
    const urlPath = parseUrlPath();
    const currentInterfaceLang = urlPath.interfaceLang || params.interfaceLang;

    // Support both new structure ({studyLang, learningMode}) and legacy ({contentTypeAndLang})
    let newContentType: ContentType | undefined;
    let newLearningLang: LanguageCode | undefined;

    if (params.studyLang && params.learningMode) {
      // New structure: /{interfaceLang}/{studyLang}/{learningMode}
      newLearningLang = params.studyLang as LanguageCode;
      newContentType = params.learningMode as ContentType;
    } else {
      // Legacy structure or parse from URL path
      let currentContentTypeAndLang: string | undefined;
      if (urlPath.contentType === "custom") {
        // Custom mode has no language suffix
        currentContentTypeAndLang = "custom";
      } else if (urlPath.contentType && urlPath.learningLang) {
        currentContentTypeAndLang = `${urlPath.contentType}-${urlPath.learningLang}`;
      } else {
        currentContentTypeAndLang = params.contentTypeAndLang;
      }

      const parsed = parseContentAndLang(currentContentTypeAndLang);
      newContentType = parsed.contentType;
      newLearningLang = parsed.learningLang;
    }

    // Check if params actually changed (not just state)
    // Compare both new and legacy structure params
    const currentParamsKey = `${currentInterfaceLang || ''}-${params.studyLang || ''}-${params.learningMode || ''}-${params.contentTypeAndLang || ''}`;
    const prevParamsKey = `${prevParamsRef.current.interfaceLang || ''}-${prevParamsRef.current.studyLang || ''}-${prevParamsRef.current.learningMode || ''}-${prevParamsRef.current.contentTypeAndLang || ''}`;

    if (currentParamsKey === prevParamsKey) {
      return;
    }

    // Update ref to track current params BEFORE making changes
    prevParamsRef.current = {
      interfaceLang: currentInterfaceLang,
      contentTypeAndLang: params.contentTypeAndLang,
      studyLang: params.studyLang,
      learningMode: params.learningMode,
    };

    // Only sync if params are valid and actually different from current state
    // Check if state already matches URL to avoid unnecessary updates
    const needsInterfaceUpdate =
      currentInterfaceLang &&
      isValidInterfaceLanguage(currentInterfaceLang) &&
      currentInterfaceLang !== interfaceLanguage;

    const needsLearningLangUpdate =
      newLearningLang && newLearningLang !== learningLanguage;

    const needsContentTypeUpdate =
      newContentType && newContentType !== learningContentType;

    if (needsInterfaceUpdate || needsLearningLangUpdate || needsContentTypeUpdate) {
      isUpdatingFromUrl.current = true;
      startTransition(() => {
        if (needsInterfaceUpdate) {
          setInterfaceLanguage(currentInterfaceLang as InterfaceLanguage);
        }
        if (needsLearningLangUpdate && newLearningLang) {
          setLearningLanguage(newLearningLang);
        }
        if (needsContentTypeUpdate && newContentType) {
          setLearningContentType(newContentType);
          // Update mode based on contentType
          let newMode: "practice" | "beginner" | "custom" = "practice";
          if (newContentType === "words") newMode = "beginner";
          else if (newContentType === "phrases") newMode = "practice";
          else if (newContentType === "custom") newMode = "custom";
          setMode(newMode);
        }
        // Reset flag after state updates complete - use a longer delay to ensure all effects have run
        setTimeout(() => {
          isUpdatingFromUrl.current = false;
        }, 100);
      });
    }
    // Dependencies: pathname and params are the source of truth for URL sync
    // We intentionally don't include state variables to avoid circular updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, params.interfaceLang, params.contentTypeAndLang, params.studyLang, params.learningMode]);

  // Sync mode with contentType - when mode changes, update contentType and URL
  // Skip if we're updating from URL to prevent circular updates
  // Also skip if the contentType already matches the mode to avoid unnecessary updates
  useEffect(() => {
    if (isUpdatingFromUrl.current) {
      return;
    }
    const expectedContentType = getContentTypeFromMode(mode);
    // Only update if there's an actual mismatch
    if (learningContentType !== expectedContentType) {
      startTransition(() => {
        setLearningContentType(expectedContentType);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Persist settings
  useEffect(() => {
    setStorageItem("layoutId", layoutId);
  }, [layoutId]);
  useEffect(() => {
    setStorageItem("mode", mode);
  }, [mode]);

  // Clear custom text from storage when switching away from custom mode
  const prevModeRef = useRef<"practice" | "beginner" | "custom">(mode);
  useEffect(() => {
    // If switching away from custom mode, clear the stored custom text
    if (prevModeRef.current === "custom" && mode !== "custom") {
      removeStorageItem("customText");
    }
    prevModeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    setStorageItem("learningLanguage", learningLanguage);
  }, [learningLanguage]);
  useEffect(() => {
    setStorageItem("learningContentType", learningContentType);
  }, [learningContentType]);

  // Update URL when settings change (only if different from current URL)
  // Skip if we're currently updating from URL to prevent circular updates
  useEffect(() => {
    if (isUpdatingFromUrl.current) {
      return;
    }

    // For custom mode, we don't need learningLanguage for URL building
    // buildUrlPath handles this internally
    const expectedPath = buildUrlPath(
      interfaceLanguage,
      learningContentType,
      learningLanguage
    );

    // Use pathname from Next.js router as it's more reliable than window.location
    const currentPath = pathname;

    // Only navigate if the path is actually different
    // Use a more precise comparison to avoid unnecessary redirects
    if (currentPath && currentPath !== expectedPath) {
      // Set flag before navigating to prevent sync effect from running
      isUpdatingFromUrl.current = true;
      router.replace(expectedPath);
      // Reset flag after navigation completes - use longer delay to ensure router has processed
      setTimeout(() => {
        isUpdatingFromUrl.current = false;
      }, 100);
    }
  }, [interfaceLanguage, learningContentType, learningLanguage, router, pathname]);

  useEffect(() => {
    setStorageItem("interfaceLanguage", interfaceLanguage);
    updateDocumentDirection(interfaceLanguage);
  }, [interfaceLanguage]);

  useEffect(() => {
    setStorageItem("soundEnabled", String(soundEnabled));
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    setStorageItem("showKeyboard", String(showKeyboard));
  }, [showKeyboard]);
  useEffect(() => {
    setStorageItem("showHands", String(showHands));
  }, [showHands]);
  useEffect(() => {
    setStorageItem("showColors", String(showColors));
  }, [showColors]);
  useEffect(() => {
    setStorageItem("correctionMode", String(correctionMode));
  }, [correctionMode]);

  // URL change listener (e.g. back button) - React Router handles this, but keep for compatibility
  useEffect(() => {
    const handlePopState = () => {
      const urlPath = parseUrlPath();
      if (
        urlPath.interfaceLang &&
        urlPath.interfaceLang !== interfaceLanguage
      ) {
        setInterfaceLanguage(urlPath.interfaceLang);
      }
      if (urlPath.learningLang && urlPath.learningLang !== learningLanguage) {
        setLearningLanguage(urlPath.learningLang);
      }
      if (urlPath.contentType && urlPath.contentType !== learningContentType) {
        setLearningContentType(urlPath.contentType);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [interfaceLanguage, learningLanguage, learningContentType]);

  return {
    layoutId,
    setLayoutId,
    mode,
    setMode,
    learningLanguage,
    setLearningLanguage,
    learningContentType,
    setLearningContentType,
    interfaceLanguage,
    setInterfaceLanguage,
    soundEnabled,
    setSoundEnabled,
    darkMode,
    setDarkMode,
    showKeyboard,
    setShowKeyboard,
    showHands,
    setShowHands,
    showColors,
    setShowColors,
    correctionMode,
    setCorrectionMode,
  };
}
