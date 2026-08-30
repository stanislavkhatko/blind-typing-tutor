import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Generator, type Language } from "../utils/Generator";
import { soundManager } from "../utils/SoundManager";
import { getStorageItem, setStorageItem } from "../utils/storage";
import { medicalTerms } from "@/data/medicalTerms";
import { keyboardTrainingLessons } from "@/data/keyboardTraining";
import type { SessionTrainingPhase } from "@/utils/sessionTraining";
import type { KeyFeedbackEvent, KeyFeedbackStatus } from "@/components/game/KeyFeedbackIndicator";

interface TypingEngineProps {
  mode: "practice" | "beginner" | "custom";
  language: Language;
  correctionMode: boolean;
  sessionTrainingPhase?: SessionTrainingPhase;
}

function pickRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function generateKeyboardTrainingText() {
  const lesson = pickRandomItem(keyboardTrainingLessons);
  return Array.from({ length: 3 }, () => pickRandomItem(lesson.patterns)).join(" ");
}

function generateMedicalTrainingText() {
  return Array.from({ length: 8 }, () => pickRandomItem(medicalTerms)).join(" ");
}

export function useTypingEngine({
  mode,
  language,
  correctionMode,
  sessionTrainingPhase,
}: TypingEngineProps) {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stats State
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);
  const [keyFeedbackEvent, setKeyFeedbackEvent] = useState<KeyFeedbackEvent | null>(null);
  const feedbackEventCounterRef = useRef(0);

  // Generator
  const generator = useMemo(() => new Generator(language), [language]);
  const germanGenerator = useMemo(() => new Generator("de"), []);

  // Custom Mode State
  const [customText, setCustomText] = useState(() => getStorageItem("customText") || "");
  const [isCustomSetup, setIsCustomSetup] = useState(false);

  // Track previous mode to detect mode switches
  const prevModeRef = useRef<"practice" | "beginner" | "custom">(mode);
  // Track if this is the initial mount
  const isInitialMountRef = useRef(true);

  const generateText = useCallback(() => {
    if (sessionTrainingPhase === "phase1") {
      setText(generateKeyboardTrainingText());
      setInput("");
    } else if (sessionTrainingPhase === "phase2") {
      germanGenerator.update();
      setText(germanGenerator.getWords());
      setInput("");
    } else if (sessionTrainingPhase === "phase3") {
      setText(generateMedicalTrainingText());
      setInput("");
    } else if (mode === "custom") {
      setInput("");
    } else if (mode === "beginner") {
      setText(generator.getOne());
      setInput("");
    } else {
      generator.update();
      setText(generator.getWords());
      setInput("");
    }

    setStartTime(null);
    setErrors(0);
    setTotalTyped(0);
    setWpm(0);
    setAccuracy(100);
    // Defer focus to ensure DOM is ready
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [mode, generator, germanGenerator, sessionTrainingPhase]);

  // Initialize text when mode or language changes
  /* eslint-disable react-hooks/set-state-in-effect -- intentional mode/language initialization */
  useEffect(() => {
    if (sessionTrainingPhase) {
      setIsCustomSetup(false);
      generateText();
    } else if (mode === "custom") {
      const saved = getStorageItem("customText");
      const isSwitchingToCustom = !isInitialMountRef.current && prevModeRef.current !== "custom";

      if (isSwitchingToCustom) {
        setIsCustomSetup(true);
        setText("");
        setCustomText(saved || "");
      } else if (isInitialMountRef.current && saved && saved.trim()) {
        setText(saved.trim());
        setIsCustomSetup(false);
      } else if (saved && saved.trim()) {
        setText(saved.trim());
        setIsCustomSetup(false);
      } else {
        setIsCustomSetup(true);
        setText("");
      }
    } else {
      setIsCustomSetup(false);
      generateText();
    }

    // Update previous mode and mark initial mount as complete
    prevModeRef.current = mode;
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
    }
  }, [mode, language, generateText, sessionTrainingPhase]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Timer for WPM updates
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (startTime) {
      interval = setInterval(() => {
        const timeInMinutes = (Date.now() - startTime) / 60000;
        const currentWpm = totalTyped / 5 / timeInMinutes;
        setWpm(Math.max(0, currentWpm));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, totalTyped]);

  const triggerKeyFeedback = (status: KeyFeedbackStatus) => {
    feedbackEventCounterRef.current += 1;
    setKeyFeedbackEvent({ status, eventId: feedbackEventCounterRef.current });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val.length > text.length) {
      e.target.value = input;
      return;
    }

    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    if (val.length > input.length) {
      const lastCharIndex = val.length - 1;
      const expectedChar = text[lastCharIndex];
      const typedChar = val[lastCharIndex];

      setTotalTyped((prev) => prev + 1);

      if (typedChar !== expectedChar) {
        triggerKeyFeedback("incorrect");
        soundManager.playError();
        setErrors((prev) => {
          const newErrors = prev + 1;
          const newTotal = totalTyped + 1;
          setAccuracy(Math.max(0, ((newTotal - newErrors) / newTotal) * 100));
          return newErrors;
        });

        if (correctionMode) return;
      } else {
        triggerKeyFeedback("correct");
        soundManager.playClick();
        const newTotal = totalTyped + 1;
        setAccuracy(Math.max(0, ((newTotal - errors) / newTotal) * 100));
      }
    } else if (val.length < input.length) {
      // Backspace
      let currentErrors = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] !== text[i]) currentErrors++;
      }
      setErrors(currentErrors);
      setAccuracy(val.length > 0 ? Math.max(0, ((val.length - currentErrors) / val.length) * 100) : 100);
      setTotalTyped(val.length);
    }

    setInput(val);

    if (val.length === text.length) {
      if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = setTimeout(() => {
        generateText();
        completionTimeoutRef.current = null;
      }, 300);
    }
  };

  const handleCustomSubmit = () => {
    if (customText.trim()) {
      const trimmedText = customText.trim();
      setText(trimmedText);
      setStorageItem("customText", trimmedText);
      setIsCustomSetup(false);
      setStartTime(null);
      setErrors(0);
      setTotalTyped(0);
      setWpm(0);
      setAccuracy(100);
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const activeKey = useMemo(() => {
    if (input.length >= text.length) return null;
    return text[input.length];
  }, [input.length, text]);

  // Keyboard highlighting listener
  useEffect(() => {
    const timeoutRefs: ReturnType<typeof setTimeout>[] = [];
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCustomSetup) return;
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }
      timeoutRefs.forEach(clearTimeout);
      timeoutRefs.length = 0;

      let keyLabel: string | null = null;
      if (e.key.length === 1) keyLabel = e.key;
      else if (["Backspace", "Enter", "Tab", " "].includes(e.key)) {
        keyLabel = e.key.toLowerCase() === " " ? " " : e.key.toLowerCase();
      }

      if (keyLabel) {
        setLastPressedKey(keyLabel);
        const timeout = setTimeout(() => setLastPressedKey(null), 200);
        timeoutRefs.push(timeout);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      timeoutRefs.forEach(clearTimeout);
    };
  }, [isCustomSetup]);

  return {
    text, input, setInput, inputRef,
    startTime, errors, totalTyped, wpm, accuracy,
    lastPressedKey, activeKey,
    keyFeedbackEvent,
    customText, setCustomText, isCustomSetup, setIsCustomSetup,
    handleInput, handleCustomSubmit, generateText
  };
}
