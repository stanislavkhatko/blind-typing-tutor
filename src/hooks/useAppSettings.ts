import { useState, useEffect, startTransition, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { KeyboardLayoutId, LanguageCode } from "../types/keyboard";
import { getAllLayouts } from "../config/layouts";
import type { InterfaceLanguage } from "../utils/translations";
import {
  detectKeyboardLayout,
  detectLearningLanguage,
  detectInterfaceLanguage,
} from "../utils/browserDetection";
import { getStorageItem, setStorageItem } from "../utils/storage";
import { updateDocumentDirection } from "../utils/textDirection";
import { soundManager } from "../utils/SoundManager";
import { parseUrlPath, buildUrlPath, type ContentType } from "../utils/url";

export function useAppSettings() {
  const params = useParams<{
    interfaceLang?: string;
    contentTypeAndLang?: string;
  }>();
  const navigate = useNavigate();

  // Helper to parse contentType-learningLang format (e.g., "words-es" -> { contentType: "words", learningLang: "es" })
  const parseContentAndLang = (
    contentAndLang?: string
  ): { contentType?: ContentType; learningLang?: LanguageCode } => {
    if (!contentAndLang) return {};
    const parts = contentAndLang.split("-");
    if (parts.length < 2) return {};
    const contentType = parts[0] as ContentType;
    const learningLang = parts.slice(1).join("-") as LanguageCode;
    return { contentType, learningLang };
  };

  const { contentType: urlContentType, learningLang: urlLearningLang } =
    parseContentAndLang(params.contentTypeAndLang);

  // Use ref to track if we're updating from URL to prevent circular updates
  const isUpdatingFromUrl = useRef(false);
  // Track previous params to detect actual changes
  const prevParamsRef = useRef({
    interfaceLang: params.interfaceLang,
    contentTypeAndLang: params.contentTypeAndLang,
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
    const saved = getStorageItem("mode");
    if (saved === "novice" || saved === "practice") return "practice";
    if (saved === "beginner" || saved === "custom") return saved;
    return "practice";
  });

  // Initialize from URL first, then localStorage, then defaults
  const [learningLanguage, setLearningLanguage] = useState<LanguageCode>(() => {
    if (urlLearningLang) return urlLearningLang;

    const saved = getStorageItem("learningLanguage");
    const validLanguages: LanguageCode[] = [
      "en",
      "uk",
      "tr",
      "de",
      "fr",
      "es",
      "pt",
      "ru",
      "zh",
      "ja",
      "ko",
      "ar",
      "hi",
      "it",
      "pl",
      "nl",
      "sv",
      "no",
      "da",
      "fi",
      "cs",
      "hu",
      "ro",
      "el",
      "he",
      "th",
      "vi",
      "id",
      "ms",
    ];
    if (saved && validLanguages.includes(saved as LanguageCode)) {
      return saved as LanguageCode;
    }
    const savedMode = getStorageItem("mode");
    if (!savedMode || savedMode === "null" || savedMode === "") {
      const randomLang =
        validLanguages[Math.floor(Math.random() * validLanguages.length)];
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
      if (params.interfaceLang) {
        const validLanguages: InterfaceLanguage[] = [
          "en",
          "uk",
          "tr",
          "de",
          "fr",
          "es",
          "pt",
          "ru",
          "zh",
          "ja",
          "ko",
          "ar",
          "hi",
          "it",
          "pl",
          "nl",
          "sv",
          "no",
          "da",
          "fi",
          "cs",
          "hu",
          "ro",
          "el",
          "he",
          "th",
          "vi",
          "id",
          "ms",
        ];
        if (
          validLanguages.includes(params.interfaceLang as InterfaceLanguage)
        ) {
          return params.interfaceLang as InterfaceLanguage;
        }
      }

      const saved = getStorageItem("interfaceLanguage");
      const validLanguages: InterfaceLanguage[] = [
        "en",
        "uk",
        "tr",
        "de",
        "fr",
        "es",
        "pt",
        "ru",
        "zh",
        "ja",
        "ko",
        "ar",
        "hi",
        "it",
        "pl",
        "nl",
        "sv",
        "no",
        "da",
        "fi",
        "cs",
        "hu",
        "ro",
        "el",
        "he",
        "th",
        "vi",
        "id",
        "ms",
      ];
      if (saved && validLanguages.includes(saved as InterfaceLanguage)) {
        return saved as InterfaceLanguage;
      }
      return detectInterfaceLanguage() as InterfaceLanguage;
    }
  );

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = getStorageItem("soundEnabled");
    return saved === "true";
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = getStorageItem("darkMode");
    if (saved === "true" || saved === "false") {
      return saved === "true";
    }
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

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

  const VALID_LANGUAGES: InterfaceLanguage[] = [
    "en",
    "uk",
    "tr",
    "de",
    "fr",
    "es",
    "pt",
    "ru",
    "zh",
    "ja",
    "ko",
    "ar",
    "hi",
    "it",
    "pl",
    "nl",
    "sv",
    "no",
    "da",
    "fi",
    "cs",
    "hu",
    "ro",
    "el",
    "he",
    "th",
    "vi",
    "id",
    "ms",
  ];

  // Sync with URL params when they change (only update if different to prevent loops)
  useEffect(() => {
    // Check if params actually changed (not just state)
    const paramsChanged =
      prevParamsRef.current.interfaceLang !== params.interfaceLang ||
      prevParamsRef.current.contentTypeAndLang !== params.contentTypeAndLang;

    if (!paramsChanged) {
      return;
    }

    // Update ref to track current params
    prevParamsRef.current = {
      interfaceLang: params.interfaceLang,
      contentTypeAndLang: params.contentTypeAndLang,
    };

    const { contentType: newContentType, learningLang: newLearningLang } =
      parseContentAndLang(params.contentTypeAndLang);

    // Only sync if params are valid - we'll update state regardless of current state
    // to ensure URL is the source of truth
    const needsInterfaceUpdate =
      params.interfaceLang &&
      VALID_LANGUAGES.includes(params.interfaceLang as InterfaceLanguage);

    if (needsInterfaceUpdate || newLearningLang || newContentType) {
      isUpdatingFromUrl.current = true;
      startTransition(() => {
        if (needsInterfaceUpdate) {
          setInterfaceLanguage(params.interfaceLang as InterfaceLanguage);
        }
        if (newLearningLang) {
          setLearningLanguage(newLearningLang);
        }
        if (newContentType) {
          setLearningContentType(newContentType);
          // Update mode based on contentType
          let newMode: "practice" | "beginner" | "custom" = "practice";
          if (newContentType === "words") newMode = "beginner";
          else if (newContentType === "phrases") newMode = "practice";
          else if (newContentType === "custom") newMode = "custom";
          setMode(newMode);
        }
        // Reset flag after state updates complete
        requestAnimationFrame(() => {
          isUpdatingFromUrl.current = false;
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.interfaceLang, params.contentTypeAndLang]);

  // Sync mode with contentType - when mode changes, update contentType and URL
  useEffect(() => {
    const expectedContentType = getContentTypeFromMode(mode);
    if (learningContentType !== expectedContentType) {
      startTransition(() => {
        setLearningContentType(expectedContentType);
      });
    }
  }, [mode, learningContentType]);

  // Persist settings
  useEffect(() => {
    setStorageItem("layoutId", layoutId);
  }, [layoutId]);
  useEffect(() => {
    setStorageItem("mode", mode);
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

    const expectedPath = buildUrlPath(
      interfaceLanguage,
      learningContentType,
      learningLanguage
    );
    const currentPath = window.location.pathname;

    // Only navigate if the path is actually different
    if (currentPath !== expectedPath) {
      // Set flag before navigating to prevent sync effect from running
      isUpdatingFromUrl.current = true;
      navigate(expectedPath, { replace: true });
      // Reset flag after navigation
      requestAnimationFrame(() => {
        isUpdatingFromUrl.current = false;
      });
    }
  }, [interfaceLanguage, learningContentType, learningLanguage, navigate]);

  useEffect(() => {
    setStorageItem("interfaceLanguage", interfaceLanguage);
    updateDocumentDirection(interfaceLanguage);
  }, [interfaceLanguage]);

  useEffect(() => {
    setStorageItem("soundEnabled", String(soundEnabled));
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    setStorageItem("darkMode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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

  // System theme detection
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
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
  }, []);

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
