import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Generator, type Language } from "../utils/Generator";
import { soundManager } from "../utils/SoundManager";
import { getStorageItem, setStorageItem } from "../utils/storage";

interface TypingEngineProps {
    mode: "practice" | "beginner" | "custom";
    language: Language;
    correctionMode: boolean;
}

export function useTypingEngine({ mode, language, correctionMode }: TypingEngineProps) {
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

    // Generator
    const generator = useMemo(() => new Generator(language), [language]);

    // Custom Mode State
    const [customText, setCustomText] = useState(() => getStorageItem("customText") || "");
    const [isCustomSetup, setIsCustomSetup] = useState(false);

    const generateText = useCallback(() => {
        if (mode === "custom") {
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
    }, [mode, generator]);

    // Initialize text when mode or language changes
    useEffect(() => {
        queueMicrotask(() => {
            if (mode === "custom") {
                const saved = getStorageItem("customText");
                if (saved && saved.trim()) {
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
        });
    }, [mode, language, generateText]);

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
                soundManager.playError();
                setErrors((prev) => {
                    const newErrors = prev + 1;
                    const newTotal = totalTyped + 1;
                    setAccuracy(Math.max(0, ((newTotal - newErrors) / newTotal) * 100));
                    return newErrors;
                });

                if (correctionMode) return;
            } else {
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
        customText, setCustomText, isCustomSetup, setIsCustomSetup,
        handleInput, handleCustomSubmit, generateText
    };
}
