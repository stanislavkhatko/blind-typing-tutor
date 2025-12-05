import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Generator, type Language } from '../utils/Generator';
import type { KeyboardLayoutId } from '../types/keyboard';
import { getLayout } from '../config/layouts';
import { Keyboard } from './Keyboard';
import { Stats } from './Stats';
import { translations } from '../utils/translations';
import { soundManager } from '../utils/SoundManager';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { Keyboard as KeyboardIcon, Hand, Palette, CheckCircle, Volume2, VolumeX } from 'lucide-react';

interface GameProps {
  mode: 'practice' | 'beginner' | 'custom';
  layoutId: KeyboardLayoutId;
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
  learningLanguage: Language; // Learning language for hint display
}

export const Game: React.FC<GameProps> = ({ mode, layoutId, language, showKeyboard, showHands, showColors, correctionMode, soundEnabled, onToggleKeyboard, onToggleHands, onToggleColors, onToggleCorrection, onToggleSound, translations: gameTranslations, learningLanguage }) => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = translations[language];

  // Create generator using useMemo - automatically recreates when language changes
  const generator = useMemo(() => new Generator(language), [language]);

  // Custom Mode State
  const [customText, setCustomText] = useState(() => {
    const saved = getStorageItem('customText');
    return saved || '';
  });
  
  // Initialize custom setup state based on mode and saved text
  const [isCustomSetup, setIsCustomSetup] = useState(() => {
    // Only check on initial mount, will be updated by useEffect if needed
    return false;
  });

  // Stats State
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);

  // Global keypress listener for keyboard highlighting
  useEffect(() => {
    const timeoutRefs: ReturnType<typeof setTimeout>[] = [];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only track keys when the game is active (not in custom setup)
      if (isCustomSetup) return;
      
      // Clear any existing timeouts
      timeoutRefs.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.length = 0;
      
      // Track the pressed key for keyboard highlighting
      if (e.key.length === 1) {
        setLastPressedKey(e.key);
        // Clear after a short delay
        const timeout = setTimeout(() => setLastPressedKey(null), 200);
        timeoutRefs.push(timeout);
      } else if (e.key === 'Backspace') {
        setLastPressedKey('backspace');
        const timeout = setTimeout(() => setLastPressedKey(null), 200);
        timeoutRefs.push(timeout);
      } else if (e.key === 'Enter') {
        setLastPressedKey('enter');
        const timeout = setTimeout(() => setLastPressedKey(null), 200);
        timeoutRefs.push(timeout);
      } else if (e.key === 'Tab') {
        setLastPressedKey('tab');
        const timeout = setTimeout(() => setLastPressedKey(null), 200);
        timeoutRefs.push(timeout);
      } else if (e.key === ' ') {
        setLastPressedKey(' ');
        const timeout = setTimeout(() => setLastPressedKey(null), 200);
        timeoutRefs.push(timeout);
      }
    };

    // Add global keydown listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Clear all pending timeouts
      timeoutRefs.forEach(timeout => clearTimeout(timeout));
    };
  }, [isCustomSetup]);

  // Cleanup completion timeout on unmount
  useEffect(() => {
    return () => {
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
        completionTimeoutRef.current = null;
      }
    };
  }, []);

  const generateText = useCallback(() => {
    if (mode === 'custom') {
        // In custom mode, we just reset input, not the text itself (unless we want to loop?)
        // For now, let's just reset input to restart the same text
        setInput('');
    } else if (mode === 'beginner') {
      setText(generator.getOne());
      setInput('');
    } else {
      generator.update(); // Update the pool
      setText(generator.getWords());
      setInput('');
    }
    
    setStartTime(null);
    setErrors(0);
    setTotalTyped(0);
    setWpm(0);
    setAccuracy(100);
    inputRef.current?.focus();
  }, [mode, generator]);

  // Track previous mode to detect changes
  const prevModeRef = useRef(mode);
  const prevLanguageRef = useRef(language);
  const initializedRef = useRef(false);

  // Initialize text when mode or language changes, or on first mount
  useEffect(() => {
    const modeChanged = prevModeRef.current !== mode;
    const languageChanged = prevLanguageRef.current !== language;
    const isFirstMount = !initializedRef.current;
    
    if (isFirstMount || modeChanged || languageChanged) {
      // Defer state updates to avoid synchronous setState in effect
      queueMicrotask(() => {
        if (mode === 'custom') {
          // Check if we have saved custom text
          const savedCustomText = getStorageItem('customText');
          if (savedCustomText && savedCustomText.trim()) {
            setText(savedCustomText.trim());
            setIsCustomSetup(false);
          } else {
            setIsCustomSetup(true);
            setText('');
          }
        } else {
          setIsCustomSetup(false);
          generateText();
        }
      });
      
      prevModeRef.current = mode;
      prevLanguageRef.current = language;
      initializedRef.current = true;
    }
  }, [mode, language, generateText]);

  // Timer for WPM updates
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (startTime) {
      interval = setInterval(() => {
        const timeInMinutes = (Date.now() - startTime) / 60000;
        // Standard WPM formula: (characters / 5) / minutes
        // We use totalTyped (including spaces/correct chars)
        const currentWpm = (totalTyped / 5) / timeInMinutes;
        setWpm(Math.max(0, currentWpm));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, totalTyped]);

  const handleCustomSubmit = () => {
      if (customText.trim()) {
          const trimmedText = customText.trim();
          setText(trimmedText);
          // Save to localStorage
          setStorageItem('customText', trimmedText);
          setIsCustomSetup(false);
          setStartTime(null);
          setErrors(0);
          setTotalTyped(0);
          setWpm(0);
          setAccuracy(100);
          setInput('');
          // Focus input after a short delay
          setTimeout(() => inputRef.current?.focus(), 100);
      }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // Prevent input from exceeding text length
    if (val.length > text.length) {
      e.target.value = input;
      return;
    }
    
    // Start timer on first input
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    // Check for errors only when new characters are added
    if (val.length > input.length) {
        const lastCharIndex = val.length - 1;
        const expectedChar = text[lastCharIndex];
        const typedChar = val[lastCharIndex];
        
        setTotalTyped(prev => prev + 1);

        if (typedChar !== expectedChar) {
            soundManager.playError();
            setErrors(prev => {
                const newErrors = prev + 1;
                // Update accuracy immediately with new error count
                const newTotal = totalTyped + 1;
                if (newTotal > 0) {
                    setAccuracy(Math.max(0, ((newTotal - newErrors) / newTotal) * 100));
                }
                return newErrors;
            });
            
            // In correction mode, prevent cursor advancement by not updating input
            if (correctionMode) {
                return; // Don't update input, blocking cursor advancement
            }
        } else {
            soundManager.playClick();
            // Update accuracy for correct character
            const newTotal = totalTyped + 1;
            if (newTotal > 0) {
                setAccuracy(Math.max(0, ((newTotal - errors) / newTotal) * 100));
            }
        }
    } else if (val.length < input.length) {
        // Handle backspace - recalculate accuracy
        // Count errors in current input
        let currentErrors = 0;
        for (let i = 0; i < val.length; i++) {
            if (val[i] !== text[i]) {
                currentErrors++;
            }
        }
        setErrors(currentErrors);
        if (val.length > 0) {
            setAccuracy(Math.max(0, ((val.length - currentErrors) / val.length) * 100));
        } else {
            setAccuracy(100);
        }
        setTotalTyped(val.length);
    }

    setInput(val);
    
    // Check completion - trigger when all characters are typed (even if there are errors)
    if (val.length === text.length) {
        // Clear any existing completion timeout
        if (completionTimeoutRef.current) {
            clearTimeout(completionTimeoutRef.current);
        }
        // Small delay to show completion before moving to next phrase
        completionTimeoutRef.current = setTimeout(() => {
            generateText();
            completionTimeoutRef.current = null;
        }, 300);
    }
  };

  // Get the next character to type, handling special cases
  const activeKey = useMemo(() => {
    if (input.length >= text.length) {
      return null;
    }
    const nextChar = text[input.length];
    // Return the character as-is, including spaces and special characters
    return nextChar;
  }, [input.length, text]);

  if (isCustomSetup) {
      return (
        <div className="flex flex-col items-center bg-transparent p-4">
            <div className="w-full max-w-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-8 flex flex-col gap-4 transition-colors">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.custom}</h2>
                <textarea 
                    data-testid="custom-text-input"
                    className="w-full h-48 p-4 border-2 border-gray-300 dark:border-gray-600 rounded focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none resize-none transition-colors"
                    placeholder={t.pasteText}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                />
                <button 
                    data-testid="custom-start-button"
                    onClick={handleCustomSubmit}
                    disabled={!customText.trim()}
                    className="self-end px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                    {t.start}
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col items-center bg-transparent p-4">
      
      <Stats wpm={wpm} accuracy={accuracy} errors={errors} language={language} />

      <div className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-8 transition-colors">
        <div data-testid="text-display" className="mb-8 text-3xl font-mono text-gray-900 dark:text-white leading-relaxed break-words relative tracking-wide">
           {/* Render text with highlighting */}
           {text.split('').map((char, index) => {
             let color = 'text-gray-400 dark:text-gray-500';
             if (index < input.length) {
               color = input[index] === char 
                 ? 'text-green-600 dark:text-green-400' 
                 : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
             } else if (index === input.length) {
               color = 'text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400'; // Cursor
             }
             return <span key={index} className={color}>{char}</span>;
           })}
        </div>
        
        <input
          data-testid="typing-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInput}
          className="absolute opacity-0 top-0 left-0 h-0 w-0"
          autoFocus
          onBlur={() => inputRef.current?.focus()}
        />
      </div>

      {/* Keyboard Controls - Always Visible */}
      <div className="relative w-full max-w-4xl">
        <div className="absolute top-0 right-0 flex gap-2 mb-2 z-10">
          <button
            data-testid="keyboard-toggle-button"
            onClick={onToggleKeyboard}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
              showKeyboard ? 'text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80' : 'text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60'
            }`}
            title={gameTranslations.toggleKeyboard}
            aria-label={gameTranslations.toggleKeyboard}
          >
            <KeyboardIcon size={18} />
          </button>

          <button
            data-testid="hand-hints-toggle-button"
            onClick={onToggleHands}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
              showHands ? 'text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80' : 'text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60'
            }`}
            title={gameTranslations.toggleHands}
            aria-label={gameTranslations.toggleHands}
          >
            <Hand size={18} />
          </button>

          <button
            data-testid="color-zones-toggle-button"
            onClick={onToggleColors}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
              showColors ? 'text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80' : 'text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60'
            }`}
            title={gameTranslations.toggleColors}
            aria-label={gameTranslations.toggleColors}
          >
            <Palette size={18} />
          </button>

          <button
            data-testid="correction-mode-toggle-button"
            onClick={onToggleCorrection}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
              correctionMode ? 'text-green-600 dark:text-green-400 bg-white/80 dark:bg-gray-800/80' : 'text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60'
            }`}
            title={gameTranslations.toggleCorrection}
            aria-label={gameTranslations.toggleCorrection}
          >
            <CheckCircle size={18} />
          </button>

          <button
            data-testid="sound-toggle-button"
            onClick={onToggleSound}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
              soundEnabled ? 'text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80' : 'text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60'
            }`}
            title={soundEnabled ? gameTranslations.soundOn : gameTranslations.soundOff}
            aria-label={soundEnabled ? gameTranslations.soundOn : gameTranslations.soundOff}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
        
        {/* Keyboard - Conditionally Visible - Memoize shouldShowHints to prevent re-renders */}
        {showKeyboard && (() => {
          // Get the keyboard layout language
          const currentLayout = getLayout(layoutId);
          const keyboardLanguage = currentLayout.language;
          
          // Show English hints when keyboard layout language differs from learning language
          // This helps users learn on any keyboard layout by showing English QWERTY hints
          const shouldShowHints = keyboardLanguage !== learningLanguage;
          
          return (
            <Keyboard 
              activeKey={activeKey} 
              layoutId={layoutId} 
              showHands={showHands} 
              showColors={showColors} 
              showEnglishHints={shouldShowHints}
              lastPressedKey={lastPressedKey}
            />
          );
        })()}
      </div>
    </div>
  );
};
