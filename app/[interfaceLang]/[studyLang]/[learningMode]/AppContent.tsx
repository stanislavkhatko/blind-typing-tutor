"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Game } from "@/components/Game";
import { translations } from "@/translations";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Header } from "@/components/layout/Header";
import { MobileMessage } from "@/components/layout/MobileMessage";
import type { UserRole } from "@/types/auth";
import { initGA, trackPageView } from "@/utils/analytics";
import {
  getSessionRemainingMs,
  getSessionTrainingPhaseMeta,
} from "@/utils/sessionTraining";

interface AppContentProps {
  params: {
    interfaceLang: string;
    studyLang: string;
    learningMode: string;
  };
}

interface SessionData {
  authenticated: boolean;
  user?: {
    id: number;
    username: string;
    role: UserRole;
  };
  expiresAt?: number;
}

export function AppContent({ params }: AppContentProps) {
  const router = useRouter();
  const settings = useAppSettings(params);
  const t = translations[settings.interfaceLanguage];
  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(null);
  const [sessionRemainingMs, setSessionRemainingMs] = useState<number | null>(null);
  const [sessionUsername, setSessionUsername] = useState<string | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  // Initialize GA
  useEffect(() => {
    initGA();
  }, []);

  // Track page view on language or mode change
  useEffect(() => {
    trackPageView(window.location.pathname, `${t.title} - ${settings.mode}`);
  }, [settings.interfaceLanguage, settings.mode, t.title]);

  // Check session on mount; redirect if not authenticated or expired
  useEffect(() => {
    void fetch("/api/auth/session", { cache: "no-store" })
      .then((res) => res.json() as Promise<SessionData>)
      .then((data) => {
        if (!data.authenticated || typeof data.expiresAt !== "number") {
          router.replace("/login");
        } else {
          setSessionExpiresAt(data.expiresAt);
          setSessionRemainingMs(getSessionRemainingMs(data.expiresAt));
          setSessionUsername(typeof data.user?.username === "string" ? data.user.username : null);
          setSessionChecked(true);
        }
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [router]);

  const sessionPhaseMeta =
    sessionRemainingMs != null ? getSessionTrainingPhaseMeta(sessionRemainingMs) : null;
  const phaseCompletionSessionRef = useRef<number | null>(null);

  useEffect(() => {
    if (!sessionExpiresAt || !sessionPhaseMeta) {
      return;
    }
    if (sessionPhaseMeta.phase === "phase1") {
      return;
    }
    if (phaseCompletionSessionRef.current === sessionExpiresAt) {
      return;
    }

    phaseCompletionSessionRef.current = sessionExpiresAt;
    void fetch("/api/training/progress/complete-keyboard-phase", {
      method: "POST",
      cache: "no-store",
    }).catch(() => undefined);
  }, [sessionExpiresAt, sessionPhaseMeta]);

  // Mobile detection
  const isMobile = useIsMobile();

  // Don't render until session is verified to prevent flash of trainer for expired sessions
  if (!sessionChecked) {
    return null;
  }

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
        sessionExpiresAt={sessionExpiresAt}
        onSessionRemainingChange={setSessionRemainingMs}
        sessionUsername={sessionUsername}
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
          sessionTrainingPhase={sessionPhaseMeta?.phase}
          sessionTrainingPhaseLabel={sessionPhaseMeta?.display}
        />
      </main>
    </div>
  );
}
