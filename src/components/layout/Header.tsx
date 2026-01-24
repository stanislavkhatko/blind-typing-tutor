"use client";

import React, { useState } from "react";
import {
  Keyboard as KeyboardIcon,
  Coffee,
  Languages,
  ChevronDown,
  Moon,
  Sun,
  Info,
} from "lucide-react";
import type { InterfaceLanguage } from "../../translations";
import type { ContentType } from "../../utils/url";
import { LandingOverlay } from "./LandingOverlay";

interface HeaderProps {
  title: string;
  reportIssue: string;
  reportIssueTitle: string;
  support: string;
  supportTitle: string;
  interfaceLanguageLabel: string;
  lightMode: string;
  darkMode: string;
  interfaceLanguage: InterfaceLanguage;
  setInterfaceLanguage: (lang: InterfaceLanguage) => void;
  interfaceLanguageOptions: Array<{
    code: InterfaceLanguage;
    name: string;
    flag: string;
  }>;
  isDarkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  studyLang: string;
  learningMode: ContentType;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  support,
  supportTitle,
  interfaceLanguageLabel,
  lightMode,
  darkMode: darkModeLabel,
  interfaceLanguage,
  setInterfaceLanguage,
  interfaceLanguageOptions,
  isDarkMode,
  setDarkMode,
  studyLang,
  learningMode,
}) => {
  const [showLanding, setShowLanding] = useState(false);
  return (
    <>
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <h1
            data-testid="app-title"
            className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap transition-colors flex items-center gap-2 font-mono"
          >
            <KeyboardIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            {title}
          </h1>

          <button
            onClick={() => setShowLanding(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors"
            title="About this typing tutor"
            aria-label="Show information about the typing tutor"
          >
            <Info size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <a
            data-testid="support-link"
            href="https://buymeacoffee.com/stanislavkhatko"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg cursor-pointer transition-colors font-medium text-sm shadow-sm hover:shadow-md"
            title={supportTitle}
            aria-label={supportTitle}
          >
            <Coffee size={16} />
            <span className="hidden sm:inline">{support}</span>
          </a>

          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700 dark:text-gray-300">
              <Languages size={18} />
            </div>
            <select
              data-testid="interface-language-selector"
              value={interfaceLanguage}
              onChange={(e) =>
                setInterfaceLanguage(e.target.value as InterfaceLanguage)
              }
              className="appearance-none bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white py-1.5 pl-10 pr-8 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium transition-colors"
              title={interfaceLanguageLabel}
            >
              {interfaceLanguageOptions.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <ChevronDown size={14} />
            </div>

            {/* sr-only links for SEO - all language links */}
            <div className="sr-only">
              {interfaceLanguageOptions.map((lang) => (
                <a
                  key={lang.code}
                  href={`/${lang.code}/${studyLang}/${learningMode}`}
                  aria-label={`Switch to ${lang.name}`}
                >
                  {lang.flag} {lang.name}
                </a>
              ))}
            </div>
          </div>

          <button
            data-testid="theme-toggle-button"
            onClick={() => setDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors"
            title={isDarkMode ? lightMode : darkModeLabel}
            aria-label={isDarkMode ? lightMode : darkModeLabel}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Landing Overlay - outside header so it can appear on top */}
      <LandingOverlay
        show={showLanding}
        onClose={() => setShowLanding(false)}
        interfaceLang={interfaceLanguage}
        studyLang={studyLang}
        learningMode={learningMode}
      />
    </>
  );
};
