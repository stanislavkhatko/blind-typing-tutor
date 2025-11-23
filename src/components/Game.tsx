import { useState, useEffect, useRef } from 'react';
import { Generator, type Language } from '../utils/Generator';
import { Keyboard } from './Keyboard';
import { Stats } from './Stats';
import { translations } from '../utils/translations';
import { soundManager } from '../utils/SoundManager';
import { Keyboard as KeyboardIcon, Hand, Palette, CheckCircle } from 'lucide-react';

interface GameProps {
  mode: 'novice' | 'beginner' | 'custom';
  language: Language;
  showKeyboard: boolean;
  showHands: boolean;
  showColors: boolean;
  correctionMode: boolean;
  onToggleKeyboard: () => void;
  onToggleHands: () => void;
  onToggleColors: () => void;
  onToggleCorrection: () => void;
  translations: any;
}

export const Game: React.FC<GameProps> = ({ mode, language, showKeyboard, showHands, showColors, correctionMode, onToggleKeyboard, onToggleHands, onToggleColors, onToggleCorrection, translations: gameTranslations }) => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [generator] = useState(() => new Generator(language));
  const inputRef = useRef<HTMLInputElement>(null);
  const t = translations[language];

  // Custom Mode State
  const [customText, setCustomText] = useState(() => {
    const saved = localStorage.getItem('customText');
    return saved || '';
  });
  const [isCustomSetup, setIsCustomSetup] = useState(false);

  // Stats State
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    // Initialize text
    if (mode === 'custom') {
        // Check if we have saved custom text
        const savedCustomText = localStorage.getItem('customText');
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
  }, [mode, language]);

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

  const generateText = () => {
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
  };

  const handleCustomSubmit = () => {
      if (customText.trim()) {
          const trimmedText = customText.trim();
          setText(trimmedText);
          // Save to localStorage
          localStorage.setItem('customText', trimmedText);
          setIsCustomSetup(false);
          setStartTime(null);
          setErrors(0);
          setTotalTyped(0);
          setWpm(0);
          setAccuracy(100);
          setInput('');
          setTimeout(() => inputRef.current?.focus(), 100);
      }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // Start timer on first input
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    // Check for errors
    // We only check the *last* typed character if it was an addition
    if (val.length > input.length) {
        const lastCharIndex = val.length - 1;
        const expectedChar = text[lastCharIndex];
        const typedChar = val[lastCharIndex];
        
        setTotalTyped(prev => prev + 1);

        if (typedChar !== expectedChar) {
            soundManager.playError();
            setErrors(prev => {
                const newErrors = prev + 1;
                return newErrors;
            });
            
            // In correction mode, prevent cursor advancement by not updating input
            if (correctionMode) {
                // Update accuracy but don't advance cursor
                const currentErrors = errors + 1;
                const currentTotal = totalTyped + 1;
                if (currentTotal > 0) {
                    setAccuracy(Math.max(0, ((currentTotal - currentErrors) / currentTotal) * 100));
                }
                return; // Don't update input, blocking cursor advancement
            }
        } else {
            soundManager.playClick();
        }
    }
    
    // Update accuracy based on current state
    const currentErrors = val.length > input.length && val[val.length-1] !== text[val.length-1] ? errors + 1 : errors;
    const currentTotal = val.length > input.length ? totalTyped + 1 : totalTyped;
    
    if (currentTotal > 0) {
        setAccuracy(Math.max(0, ((currentTotal - currentErrors) / currentTotal) * 100));
    }

    setInput(val);
    
    // Check completion
    if (val.length === text.length) {
        if (val === text) {
             generateText();
        }
    }
  };

  const activeKey = input.length < text.length ? text[input.length] : null;

  if (isCustomSetup) {
      return (
        <div className="flex flex-col items-center min-h-screen bg-transparent p-4">
            <div className="w-full max-w-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-8 flex flex-col gap-4 transition-colors">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.custom}</h2>
                <textarea 
                    className="w-full h-48 p-4 border-2 border-gray-300 dark:border-gray-600 rounded focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none resize-none transition-colors"
                    placeholder={t.pasteText}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                />
                <button 
                    onClick={handleCustomSubmit}
                    disabled={!customText.trim()}
                    className="self-end px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {t.start}
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-transparent p-4">
      
      <Stats wpm={wpm} accuracy={accuracy} errors={errors} language={language} />

      <div className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-8 transition-colors">
        <div className="mb-8 text-3xl font-mono text-gray-600 dark:text-gray-300 leading-relaxed break-words relative tracking-wide">
           {/* Render text with highlighting */}
           {text.split('').map((char, index) => {
             let color = 'text-gray-400 dark:text-gray-500';
             if (index < input.length) {
               color = input[index] === char ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
             } else if (index === input.length) {
               color = 'text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 dark:border-blue-400'; // Cursor
             }
             return <span key={index} className={color}>{char}</span>;
           })}
        </div>
        
        <input
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
            onClick={onToggleKeyboard}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              showKeyboard ? 'text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80' : 'text-gray-400 dark:text-gray-500 bg-white/60 dark:bg-gray-800/60'
            }`}
            title={gameTranslations.toggleKeyboard}
          >
            <KeyboardIcon size={18} />
          </button>

          <button
            onClick={onToggleHands}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              showHands ? 'text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80' : 'text-gray-400 dark:text-gray-500 bg-white/60 dark:bg-gray-800/60'
            }`}
            title={gameTranslations.toggleHands}
          >
            <Hand size={18} />
          </button>

          <button
            onClick={onToggleColors}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              showColors ? 'text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80' : 'text-gray-400 dark:text-gray-500 bg-white/60 dark:bg-gray-800/60'
            }`}
            title={gameTranslations.toggleColors}
          >
            <Palette size={18} />
          </button>

          <button
            onClick={onToggleCorrection}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              correctionMode ? 'text-green-600 dark:text-green-400 bg-white/80 dark:bg-gray-800/80' : 'text-gray-400 dark:text-gray-500 bg-white/60 dark:bg-gray-800/60'
            }`}
            title={gameTranslations.toggleCorrection}
          >
            <CheckCircle size={18} />
          </button>
        </div>
        
        {/* Keyboard - Conditionally Visible */}
        {showKeyboard && (
          <Keyboard activeKey={activeKey} language={language} showHands={showHands} showColors={showColors} />
        )}
      </div>
    </div>
  );
};
