import type { InterfaceLanguage } from "./translations";

const VALID_LANGUAGES: InterfaceLanguage[] = [
    "en", "uk", "tr", "de", "fr", "es", "pt", "ru", "zh", "ja", "ko", "ar",
    "hi", "it", "pl", "nl", "sv", "no", "da", "fi", "cs", "hu", "ro", "el",
    "he", "th", "vi", "id", "ms",
];

export function getLanguageFromUrl(): InterfaceLanguage | null {
    if (typeof window === "undefined") return null;
    const path = window.location.pathname.split("/")[1];
    if (path && VALID_LANGUAGES.includes(path as InterfaceLanguage)) {
        return path as InterfaceLanguage;
    }
    return null;
}

export function updateUrlLanguage(lang: InterfaceLanguage) {
    if (typeof window === "undefined") return;

    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const currentLangInUrl = pathParts[1];

    let newPath: string;

    if (VALID_LANGUAGES.includes(currentLangInUrl as InterfaceLanguage)) {
        // Replace existing language prefix
        pathParts[1] = lang;
        newPath = pathParts.join("/");
    } else {
        // Add language prefix (always prefix with /lang)
        newPath = `/${lang}${currentPath === "/" ? "" : currentPath}`;
    }

    if (window.location.pathname !== newPath) {
        window.history.pushState(null, "", newPath);
    }
}
