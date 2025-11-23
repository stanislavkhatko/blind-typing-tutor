import { useState, useEffect } from 'react';
import { Game } from './components/Game';
import { type Language } from './utils/Generator';
import { translations } from './utils/translations';
import { soundManager } from './utils/SoundManager';
import { Moon, Sun, Volume2, VolumeX, Keyboard as KeyboardIcon, Gamepad2, ChevronDown } from 'lucide-react';

function App() {
  // Initialize state from localStorage with fallback defaults
  const [mode, setMode] = useState<'novice' | 'beginner' | 'custom'>(() => {
    const saved = localStorage.getItem('mode');
    if (saved === 'novice' || saved === 'beginner' || saved === 'custom') return saved;
    return 'novice';
  });
  
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'uk') return saved;
    return navigator.language.startsWith('uk') ? 'uk' : 'en';
  });
  
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved === 'true';
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  
  const [showKeyboard, setShowKeyboard] = useState(() => {
    const saved = localStorage.getItem('showKeyboard');
    return saved !== 'false'; // Default to true
  });
  
  const [showHands, setShowHands] = useState(() => {
    const saved = localStorage.getItem('showHands');
    return saved !== 'false'; // Default to true
  });
  
  const [showColors, setShowColors] = useState(() => {
    const saved = localStorage.getItem('showColors');
    return saved !== 'false'; // Default to true
  });
  
  const [correctionMode, setCorrectionMode] = useState(() => {
    const saved = localStorage.getItem('correctionMode');
    return saved === 'true';
  });

  const t = translations[language];

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', String(soundEnabled));
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('showKeyboard', String(showKeyboard));
  }, [showKeyboard]);

  useEffect(() => {
    localStorage.setItem('showHands', String(showHands));
  }, [showHands]);

  useEffect(() => {
    localStorage.setItem('showColors', String(showColors));
  }, [showColors]);

  useEffect(() => {
    localStorage.setItem('correctionMode', String(correctionMode));
  }, [correctionMode]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50 transition-colors duration-300">
        <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white transition-colors flex items-center gap-2">
                <KeyboardIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                {t.title}
            </h1>
            
          {/* Mode Selector (Dropdown) */}
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                <Gamepad2 size={18} />
            </div>
            <select
                value={mode}
                onChange={(e) => setMode(e.target.value as 'novice' | 'beginner' | 'custom')}
                className="appearance-none bg-gray-100 dark:bg-gray-700 border-none text-gray-700 dark:text-gray-200 py-1.5 pl-10 pr-8 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium transition-colors"
            >
                <option value="novice">{t.novice}</option>
                <option value="beginner">{t.beginner}</option>
                <option value="custom">{t.custom}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                <ChevronDown size={14} />
            </div>
          </div>

          {/* Language Selector (Dropdown) */}
          <div className="relative group">
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="appearance-none bg-gray-100 dark:bg-gray-700 border-none text-gray-700 dark:text-gray-200 py-1.5 pl-3 pr-8 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium transition-colors"
            >
                <option value="uk">🇺🇦 UK</option>
                <option value="en">🇺🇸 EN</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                <ChevronDown size={14} />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              soundEnabled ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'
            }`}
            title={soundEnabled ? t.soundOn : t.soundOff}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            title={darkMode ? t.lightMode : t.darkMode}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Game 
          mode={mode} 
          language={language} 
          showKeyboard={showKeyboard} 
          showHands={showHands} 
          showColors={showColors}
          correctionMode={correctionMode}
          onToggleKeyboard={() => setShowKeyboard(!showKeyboard)}
          onToggleHands={() => setShowHands(!showHands)}
          onToggleColors={() => setShowColors(!showColors)}
          onToggleCorrection={() => setCorrectionMode(!correctionMode)}
          translations={t}
        />
      </main>
    </div>
  );
}

export default App;
