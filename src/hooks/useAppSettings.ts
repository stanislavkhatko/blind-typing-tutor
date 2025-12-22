import { useState, useEffect } from "react";
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
import { getLanguageFromUrl, updateUrlLanguage } from "../utils/url";

export function useAppSettings() {
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

    const [learningLanguage, setLearningLanguage] = useState<LanguageCode>(() => {
        const saved = getStorageItem("learningLanguage");
        const validLanguages: LanguageCode[] = [
            "en", "uk", "tr", "de", "fr", "es", "pt", "ru",
        ];
        if (saved && validLanguages.includes(saved as LanguageCode)) {
            return saved as LanguageCode;
        }
        const savedMode = getStorageItem("mode");
        if (!savedMode || savedMode === "null" || savedMode === "") {
            const randomLang = validLanguages[Math.floor(Math.random() * validLanguages.length)];
            return randomLang;
        }
        return detectLearningLanguage() as LanguageCode;
    });

    const [learningContentType, setLearningContentType] = useState<
        "words" | "phrases" | "programming"
    >(() => {
        const saved = getStorageItem("learningContentType");
        if (saved === "words" || saved === "phrases" || saved === "programming")
            return saved;
        return "words";
    });

    const [interfaceLanguage, setInterfaceLanguage] = useState<InterfaceLanguage>(
        () => {
            const urlLang = getLanguageFromUrl();
            if (urlLang) return urlLang;

            const saved = getStorageItem("interfaceLanguage");
            const validLanguages: InterfaceLanguage[] = [
                "en", "uk", "tr", "de", "fr", "es", "pt", "ru", "zh", "ja", "ko", "ar",
                "hi", "it", "pl", "nl", "sv", "no", "da", "fi", "cs", "hu", "ro", "el",
                "he", "th", "vi", "id", "ms",
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

    // Persist settings
    useEffect(() => { setStorageItem("layoutId", layoutId); }, [layoutId]);
    useEffect(() => { setStorageItem("mode", mode); }, [mode]);
    useEffect(() => { setStorageItem("learningLanguage", learningLanguage); }, [learningLanguage]);
    useEffect(() => { setStorageItem("learningContentType", learningContentType); }, [learningContentType]);

    useEffect(() => {
        setStorageItem("interfaceLanguage", interfaceLanguage);
        updateDocumentDirection(interfaceLanguage);
        updateUrlLanguage(interfaceLanguage);
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

    useEffect(() => { setStorageItem("showKeyboard", String(showKeyboard)); }, [showKeyboard]);
    useEffect(() => { setStorageItem("showHands", String(showHands)); }, [showHands]);
    useEffect(() => { setStorageItem("showColors", String(showColors)); }, [showColors]);
    useEffect(() => { setStorageItem("correctionMode", String(correctionMode)); }, [correctionMode]);

    // URL change listener (e.g. back button)
    useEffect(() => {
        const handlePopState = () => {
            const urlLang = getLanguageFromUrl();
            if (urlLang && urlLang !== interfaceLanguage) {
                setInterfaceLanguage(urlLang);
            }
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [interfaceLanguage]);

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
        layoutId, setLayoutId,
        mode, setMode,
        learningLanguage, setLearningLanguage,
        learningContentType, setLearningContentType,
        interfaceLanguage, setInterfaceLanguage,
        soundEnabled, setSoundEnabled,
        darkMode, setDarkMode,
        showKeyboard, setShowKeyboard,
        showHands, setShowHands,
        showColors, setShowColors,
        correctionMode, setCorrectionMode,
    };
}
