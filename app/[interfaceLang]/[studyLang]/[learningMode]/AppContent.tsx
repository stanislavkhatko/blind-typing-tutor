"use client";

import { useEffect } from "react";
import { Game } from "@/components/Game";
import { translations } from "@/translations";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Header } from "@/components/layout/Header";
import { MobileMessage } from "@/components/layout/MobileMessage";
import { initGA, trackPageView } from "@/utils/analytics";

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

  // Mobile detection
  const isMobile = useIsMobile();

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
      className={`min-h-screen flex flex-col transition-colors duration-300 ${settings.darkMode ? "dark:bg-gray-900" : "bg-gray-50"
        }`}
      suppressHydrationWarning
    >
      <Header
        title={t.title}
        lightMode={t.lightMode}
        darkMode={t.darkMode}
        interfaceLanguage={settings.interfaceLanguage}
        isDarkMode={settings.darkMode}
        setDarkMode={settings.setDarkMode}
        studyLang={params.studyLang}
        learningMode={params.learningMode as "words" | "phrases" | "custom"}
      />

      <main className="grow pt-20">
        <Game
          mode={settings.mode}
          setMode={settings.setMode}
          layoutId={settings.layoutId}
          learningLanguage={settings.learningLanguage}
          language={settings.learningLanguage}
          showKeyboard={settings.showKeyboard}
          showHands={settings.showHands}
          showColors={settings.showColors}
          correctionMode={settings.correctionMode}
          soundEnabled={settings.soundEnabled}
          onToggleKeyboard={() => settings.setShowKeyboard((v) => !v)}
          onToggleHands={() => settings.setShowHands((v) => !v)}
          onToggleColors={() => settings.setShowColors((v) => !v)}
          onToggleCorrection={() => settings.setCorrectionMode((v) => !v)}
          onToggleSound={() => settings.setSoundEnabled((v) => !v)}
          translations={t}
        />
      </main>
    </div>
  );
}
