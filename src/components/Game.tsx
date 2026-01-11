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
import type { LanguageCode } from "../types/keyboard";

interface GameProps {
  mode: "practice" | "beginner" | "custom";
  setMode: (mode: "practice" | "beginner" | "custom") => void;
  layoutId: KeyboardLayoutId;
  setLayoutId: (layoutId: KeyboardLayoutId) => void;
  learningLanguage: LanguageCode;
  setLearningLanguage: (lang: LanguageCode) => void;
  learningContentType: "words" | "phrases" | "custom";
  setLearningContentType: (type: "words" | "phrases" | "custom") => void;
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
  translations: Record<string, string>;
  availableLayouts: Array<{ id: KeyboardLayoutId; name: string; flag: string }>;
  learningLanguageOptions: Array<{
    code: LanguageCode;
    name: string;
    flag: string;
  }>;
}

export const Game: React.FC<GameProps> = ({
  mode,
  setMode,
  layoutId,
  setLayoutId,
  learningLanguage,
  setLearningLanguage,
  learningContentType,
  setLearningContentType,
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
  availableLayouts,
  learningLanguageOptions,
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
    customText,
    setCustomText,
    isCustomSetup,
    handleInput,
    handleCustomSubmit,
  } = useTypingEngine({ mode, language, correctionMode });

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
      className={`flex flex-col items-center bg-transparent p-4 ${
        !showKeyboard ? "pb-24" : ""
      }`}
    >
      <Stats
        wpm={wpm}
        accuracy={accuracy}
        errors={errors}
        translations={gameTranslations}
      />

      <GameControls
        mode={mode}
        setMode={setMode}
        learningContentType={learningContentType}
        setLearningContentType={setLearningContentType}
        learningLanguage={learningLanguage}
        setLearningLanguage={setLearningLanguage}
        learningLanguageOptions={learningLanguageOptions}
        translations={gameTranslations}
      />

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
        layoutId={layoutId}
        setLayoutId={setLayoutId}
        availableLayouts={availableLayouts}
        translations={gameTranslations}
      />

      {showKeyboard && (
        <Keyboard
          activeKey={activeKey}
          layoutId={layoutId}
          showHands={showHands}
          showColors={showColors}
          showEnglishHints={shouldShowHints}
          lastPressedKey={lastPressedKey}
        />
      )}
    </div>
  );
};
