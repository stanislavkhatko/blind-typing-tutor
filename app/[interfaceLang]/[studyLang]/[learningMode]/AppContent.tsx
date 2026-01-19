"use client";

import { useState, useEffect } from "react";
import { Game } from "@/components/Game";
import { getAllLayouts } from "@/config/layouts";
import { translations } from "@/translations";
import { useAppSettings } from "@/hooks/useAppSettings";
import { Header } from "@/components/layout/Header";
import { MobileMessage } from "@/components/layout/MobileMessage";
import { initGA, trackPageView } from "@/utils/analytics";
import {
  POPULAR_LAYOUT_IDS,
  LEARNING_LANGUAGE_OPTIONS,
  INTERFACE_LANGUAGE_OPTIONS,
} from "@/config/constants";

interface AppContentProps {
  params: {
    interfaceLang: string;
    studyLang: string;
    learningMode: string;
  };
}

export function AppContent({ params }: AppContentProps) {
  const settings = useAppSettings(params);
  const t = translations[settings.interfaceLanguage];

  // Initialize GA
  useEffect(() => {
    initGA();
  }, []);

  // Track page view on language or mode change
  useEffect(() => {
    trackPageView(window.location.pathname, `${t.title} - ${settings.mode}`);
  }, [settings.interfaceLanguage, settings.mode, t.title]);

  // Layout filtering and sorting
  const allLayouts = getAllLayouts();
  const availableLayouts = allLayouts
    .filter(
      (layout) =>
        POPULAR_LAYOUT_IDS.includes(layout.id) ||
        layout.id === settings.layoutId
    )
    .sort((a, b) => {
      const aIndex = POPULAR_LAYOUT_IDS.indexOf(a.id);
      const bIndex = POPULAR_LAYOUT_IDS.indexOf(b.id);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });

  // Mobile detection
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <MobileMessage
        title={t.title}
        desktopRequired={t.mobileDesktopRequired}
        description={t.mobileDescription}
        footer={t.mobileFooter}
        darkMode={settings.darkMode}
      />
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        settings.darkMode ? "dark:bg-gray-900" : "bg-gray-50"
      }`}
      suppressHydrationWarning
    >
      <Header
        title={t.title}
        reportIssue={t.reportIssue}
        reportIssueTitle={t.reportIssueTitle}
        support={t.support}
        supportTitle={t.supportTitle}
        interfaceLanguageLabel={t.interfaceLanguage}
        lightMode={t.lightMode}
        darkMode={t.darkMode}
        interfaceLanguage={settings.interfaceLanguage}
        setInterfaceLanguage={settings.setInterfaceLanguage}
        interfaceLanguageOptions={INTERFACE_LANGUAGE_OPTIONS}
        isDarkMode={settings.darkMode}
        setDarkMode={settings.setDarkMode}
      />

      <main className="grow pt-20">
        <Game
          mode={settings.mode}
          setMode={settings.setMode}
          layoutId={settings.layoutId}
          setLayoutId={settings.setLayoutId}
          learningLanguage={settings.learningLanguage}
          setLearningLanguage={settings.setLearningLanguage}
          learningContentType={settings.learningContentType}
          setLearningContentType={settings.setLearningContentType}
          language={settings.learningLanguage}
          showKeyboard={settings.showKeyboard}
          showHands={settings.showHands}
          showColors={settings.showColors}
          correctionMode={settings.correctionMode}
          soundEnabled={settings.soundEnabled}
          onToggleKeyboard={() =>
            settings.setShowKeyboard(!settings.showKeyboard)
          }
          onToggleHands={() => settings.setShowHands(!settings.showHands)}
          onToggleColors={() => settings.setShowColors(!settings.showColors)}
          onToggleCorrection={() =>
            settings.setCorrectionMode(!settings.correctionMode)
          }
          onToggleSound={() => settings.setSoundEnabled(!settings.soundEnabled)}
          translations={t}
          availableLayouts={availableLayouts}
          learningLanguageOptions={LEARNING_LANGUAGE_OPTIONS}
        />
      </main>
    </div>
  );
}
