"use client";

import { useMemo } from "react";
import { type Language } from "../utils/Generator";
import type { KeyboardLayoutId } from "../types/keyboard";
import { getLayout } from "../config/layouts";
import { Keyboard } from "./Keyboard";
import { Stats } from "./Stats";
import { useTypingEngine } from "../hooks/useTypingEngine";
import { TypingDisplay } from "./game/TypingDisplay";
import { GameControls } from "./game/GameControls";
import { BottomControls } from "./game/BottomControls";
import { CustomSetup } from "./game/CustomSetup";
import { KeyFeedbackIndicator } from "./game/KeyFeedbackIndicator";
import type { LanguageCode } from "../types/keyboard";
import type { TranslationKeys } from "../translations";
import type { SessionTrainingPhase } from "@/utils/sessionTraining";

interface GameProps {
  mode: "practice" | "beginner" | "custom";
  setMode: (mode: "practice" | "beginner" | "custom") => void;
  layoutId: KeyboardLayoutId;
  learningLanguage: LanguageCode;
  language: Language;
  showKeyboard: boolean;
  showHands: boolean;
  showColors: boolean;
  correctionMode: boolean;
  soundEnabled: boolean;
  onToggleKeyboard: () => void;
  onToggleHands: () => void;
  onToggleColors: () => void;
  onToggleCorrection: () => void;
  onToggleSound: () => void;
  translations: TranslationKeys;
  sessionTrainingPhase?: SessionTrainingPhase;
  sessionTrainingPhaseLabel?: string;
}

export const Game: React.FC<GameProps> = ({
  mode,
  setMode,
  layoutId,
  learningLanguage,
  language,
  showKeyboard,
  showHands,
  showColors,
  correctionMode,
  soundEnabled,
  onToggleKeyboard,
  onToggleHands,
  onToggleColors,
  onToggleCorrection,
  onToggleSound,
  translations: gameTranslations,
  sessionTrainingPhase,
  sessionTrainingPhaseLabel,
}) => {
  const {
    text,
    input,
    inputRef,
    wpm,
    accuracy,
    errors,
    lastPressedKey,
    activeKey,
    keyFeedbackEvent,
    customText,
    setCustomText,
    isCustomSetup,
    handleInput,
    handleCustomSubmit,
  } = useTypingEngine({ mode, language, correctionMode, sessionTrainingPhase });

  const currentLayout = useMemo(() => getLayout(layoutId), [layoutId]);
  const shouldShowHints = currentLayout.language !== learningLanguage;

  if (isCustomSetup) {
    return (
      <CustomSetup
        customText={customText}
        setCustomText={setCustomText}
        handleCustomSubmit={handleCustomSubmit}
        onCancel={() => setMode("practice")}
        translations={gameTranslations}
      />
    );
  }

  return (
    <div
      className={`flex flex-col items-center bg-transparent p-4 ${!showKeyboard ? "pb-24" : ""
        }`}
    >
      <Stats
        wpm={wpm}
        accuracy={accuracy}
        errors={errors}
        translations={gameTranslations}
      />

      {!sessionTrainingPhase && (
        <GameControls
          mode={mode}
          setMode={setMode}
          translations={gameTranslations}
        />
      )}

      {sessionTrainingPhaseLabel && (
        <div className="w-full max-w-4xl mb-3 text-sm text-gray-600 dark:text-gray-300">
          {sessionTrainingPhaseLabel}
        </div>
      )}

      <div className="w-full max-w-4xl mb-2 flex justify-end">
        <KeyFeedbackIndicator feedbackEvent={keyFeedbackEvent} />
      </div>

      <TypingDisplay
        text={text}
        input={input}
        handleInput={handleInput}
        inputRef={inputRef}
      />

      <BottomControls
        showKeyboard={showKeyboard}
        onToggleKeyboard={onToggleKeyboard}
        showHands={showHands}
        onToggleHands={onToggleHands}
        showColors={showColors}
        onToggleColors={onToggleColors}
        correctionMode={correctionMode}
        onToggleCorrection={onToggleCorrection}
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
        translations={gameTranslations}
      />

      {showKeyboard && (
        <>
          <Keyboard
            activeKey={activeKey}
            layoutId={layoutId}
            showHands={showHands}
            showColors={showColors}
            showEnglishHints={shouldShowHints}
            lastPressedKey={lastPressedKey}
          />
          <div className="mt-6 flex justify-center">
            <a
              data-testid="wordmemo-link"
              href="https://wordmemo.net/en/blind-typing-tutor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors group"
              title="WordMemo - Language Learning Platform"
              aria-label="WordMemo - Language Learning Platform"
            >
              <img
                src="/wordmemo-logo.svg"
                alt="WordMemo"
                className="h-5 w-5 transition-transform group-hover:scale-105"
                width="20"
                height="20"
              />
              <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                wordmemo.net
              </span>
            </a>
          </div>
        </>
      )}
    </div>
  );
};
