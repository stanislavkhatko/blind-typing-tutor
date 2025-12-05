import { useState, useEffect } from 'react';
import { Game } from './components/Game';
import type { KeyboardLayoutId } from './types/keyboard';
import type { LanguageCode } from './types/keyboard';
import { getAllLayouts } from './config/layouts';
import { translations, type InterfaceLanguage } from './utils/translations';
import { soundManager } from './utils/SoundManager';
import { detectKeyboardLayout, detectLearningLanguage, detectInterfaceLanguage } from './utils/browserDetection';
import { getStorageItem, setStorageItem } from './utils/storage';
import { Moon, Sun, Keyboard as KeyboardIcon, Gamepad2, ChevronDown, Coffee, Languages, BookOpen } from 'lucide-react';

function App() {
  // Initialize layout from localStorage with fallback defaults
  const [layoutId, setLayoutId] = useState<KeyboardLayoutId>(() => {
    const saved = getStorageItem('layoutId');
    // All valid layouts are now defined in the types, so we check against getAllLayouts
    const allValidLayouts = getAllLayouts().map(l => l.id);
    if (saved && allValidLayouts.includes(saved as KeyboardLayoutId)) {
      return saved as KeyboardLayoutId;
    }
    // Auto-detect based on browser language
    return detectKeyboardLayout() as KeyboardLayoutId;
  });

  // Initialize other state from localStorage with fallback defaults
  const [mode, setMode] = useState<'practice' | 'beginner' | 'custom'>(() => {
    const saved = getStorageItem('mode');
    // Migrate old 'novice' to 'practice'
    if (saved === 'novice' || saved === 'practice') return 'practice';
    if (saved === 'beginner' || saved === 'custom') return saved;
    // If no mode selected, default to practice
    return 'practice';
  });

  // Learning language (content language) - separate from keyboard layout
  const [learningLanguage, setLearningLanguage] = useState<LanguageCode>(() => {
    const saved = getStorageItem('learningLanguage');
    const validLanguages: LanguageCode[] = ['en', 'uk', 'tr', 'de', 'fr', 'es', 'pt', 'ru'];
    if (saved && validLanguages.includes(saved as LanguageCode)) {
      return saved as LanguageCode;
    }
    // If no mode selected, use random learning language
    const savedMode = getStorageItem('mode');
    if (!savedMode || savedMode === 'null' || savedMode === '') {
      // Random selection from available languages
      const randomLang = validLanguages[Math.floor(Math.random() * validLanguages.length)];
      return randomLang;
    }
    // Auto-detect based on browser language
    return detectLearningLanguage() as LanguageCode;
  });

  // Learning content type (words, phrases, programming)
  const [learningContentType, setLearningContentType] = useState<'words' | 'phrases' | 'programming'>(() => {
    const saved = getStorageItem('learningContentType');
    if (saved === 'words' || saved === 'phrases' || saved === 'programming') return saved;
    return 'words';
  });

  // Interface language (UI language) - separate from learning language
  const [interfaceLanguage, setInterfaceLanguage] = useState<InterfaceLanguage>(() => {
    const saved = getStorageItem('interfaceLanguage');
    const validLanguages: InterfaceLanguage[] = ['en', 'uk', 'tr', 'de', 'fr', 'es', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'it', 'pl', 'nl', 'sv', 'no', 'da', 'fi', 'cs', 'hu', 'ro', 'el', 'he', 'th', 'vi', 'id', 'ms'];
    if (saved && validLanguages.includes(saved as InterfaceLanguage)) {
      return saved as InterfaceLanguage;
    }
    // Auto-detect based on browser language
    return detectInterfaceLanguage() as InterfaceLanguage;
  });
  
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = getStorageItem('soundEnabled');
    return saved === 'true';
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    const saved = getStorageItem('darkMode');
    // If saved preference exists, use it
    if (saved === 'true' || saved === 'false') {
    return saved === 'true';
    }
    // Otherwise, auto-detect based on system theme
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const [showKeyboard, setShowKeyboard] = useState(() => {
    const saved = getStorageItem('showKeyboard');
    return saved !== 'false'; // Default to true
  });
  
  const [showHands, setShowHands] = useState(() => {
    const saved = getStorageItem('showHands');
    return saved !== 'false'; // Default to true
  });
  
  const [showColors, setShowColors] = useState(() => {
    const saved = getStorageItem('showColors');
    return saved !== 'false'; // Default to true
  });
  
  const [correctionMode, setCorrectionMode] = useState(() => {
    const saved = getStorageItem('correctionMode');
    // Default to true if not set
    if (saved === null || saved === '') return true;
    return saved === 'true';
  });

  const t = translations[interfaceLanguage];
  const allLayouts = getAllLayouts();
  
  // Most popular keyboard layouts worldwide (ordered by popularity)
  const popularLayoutIds: KeyboardLayoutId[] = [
    // Top tier - Most common globally
    'en-us',  // QWERTY US - most common globally
    'en-gb',  // QWERTY UK - United Kingdom, Ireland
    'de-de',  // QWERTZ German - Germany, Austria, Switzerland
    'fr-fr',  // AZERTY French - France, Belgium
    'es-es',  // Spanish - Spain, Latin America
    'pt-pt',  // Portuguese - Portugal, Brazil
    'ru-ru',  // Russian - Russia, CIS countries
    // Second tier - Major European languages
    'it-it',  // Italian - Italy
    'nl-nl',  // Dutch - Netherlands
    'pl-pl',  // Polish - Poland
    'tr-q',   // Turkish Q - Turkey
    'uk-ua',  // Ukrainian - Ukraine
    // Third tier - Nordic countries
    'sv-se',  // Swedish - Sweden
    'fi-fi',  // Finnish - Finland
    'no-no',  // Norwegian - Norway
    'da-dk',  // Danish - Denmark
    // Fourth tier - Central/Eastern European
    'cs-cz',  // Czech - Czech Republic
    'hu-hu',  // Hungarian - Hungary
    'ro-ro',  // Romanian - Romania
    'el-gr',  // Greek - Greece
    // Fifth tier - Asian languages
    'ja-jp',  // Japanese (Romaji) - Japan
    'ko-kr',  // Korean (Hangul) - South Korea
    'zh-cn',  // Chinese (Pinyin) - China
    // Sixth tier - Middle Eastern and South Asian
    'ar-sa',  // Arabic - Saudi Arabia, Middle East
    'he-il',  // Hebrew - Israel
    'hi-in',  // Hindi (Devanagari) - India
  ];
  
  // Filter to show only popular layouts, but include current layout if it's not in the list
  const availableLayouts = allLayouts.filter(layout => 
    popularLayoutIds.includes(layout.id) || layout.id === layoutId
  );
  
  // Sort: popular layouts first, then others, maintaining popularity order
  availableLayouts.sort((a, b) => {
    const aIndex = popularLayoutIds.indexOf(a.id);
    const bIndex = popularLayoutIds.indexOf(b.id);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });

  // Language options for learning content
  const learningLanguageOptions: { code: LanguageCode; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  // Interface language options (most common world languages)
  const interfaceLanguageOptions: { code: InterfaceLanguage; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'no', name: 'Norsk', flag: '🇳🇴' },
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
    { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  ];

  // Persist settings to localStorage
  useEffect(() => {
    setStorageItem('layoutId', layoutId);
  }, [layoutId]);

  useEffect(() => {
    setStorageItem('mode', mode);
  }, [mode]);

  useEffect(() => {
    setStorageItem('learningLanguage', learningLanguage);
  }, [learningLanguage]);

  useEffect(() => {
    setStorageItem('learningContentType', learningContentType);
  }, [learningContentType]);

  useEffect(() => {
    setStorageItem('interfaceLanguage', interfaceLanguage);
  }, [interfaceLanguage]);

  useEffect(() => {
    setStorageItem('soundEnabled', String(soundEnabled));
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Listen to system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        // Only auto-update if user hasn't manually set a preference
        const saved = getStorageItem('darkMode');
        if (saved === null || saved === '') {
          setDarkMode(e.matches);
        }
      };
      
      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
      // Fallback for older browsers
      else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, []);

  useEffect(() => {
    setStorageItem('darkMode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    setStorageItem('showKeyboard', String(showKeyboard));
  }, [showKeyboard]);

  useEffect(() => {
    setStorageItem('showHands', String(showHands));
  }, [showHands]);

  useEffect(() => {
    setStorageItem('showColors', String(showColors));
  }, [showColors]);

  useEffect(() => {
    setStorageItem('correctionMode', String(correctionMode));
  }, [correctionMode]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50 transition-colors duration-300">
        <div className="flex items-center gap-4">
            <h1 data-testid="app-title" className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap transition-colors flex items-center gap-2">
                <KeyboardIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                {t.title}
            </h1>
            
          {/* Learning Mode Selector (Dropdown) */}
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700 dark:text-gray-300">
                <Gamepad2 size={18} />
            </div>
            <select
                data-testid="learning-mode-selector"
                value={mode}
                onChange={(e) => setMode(e.target.value as 'practice' | 'beginner' | 'custom')}
                className="appearance-none bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white py-1.5 pl-10 pr-8 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium transition-colors"
                title={t.learningMode}
            >
                <option value="practice">{t.practice}</option>
                <option value="beginner">{t.beginner}</option>
                <option value="custom">{t.custom}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDown size={14} />
            </div>
          </div>

          {/* Learning Language Selector (Dropdown) */}
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700 dark:text-gray-300">
                <BookOpen size={18} />
            </div>
            <select
                data-testid="learning-language-selector"
                value={`${learningContentType}-${learningLanguage}`}
                onChange={(e) => {
                  const [contentType, lang] = e.target.value.split('-');
                  setLearningContentType(contentType as 'words' | 'phrases' | 'programming');
                  setLearningLanguage(lang as LanguageCode);
                }}
                className="appearance-none bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white py-1.5 pl-10 pr-8 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium transition-colors"
                title={t.learningLanguage}
            >
                <optgroup label={t.words}>
                  {learningLanguageOptions.map(lang => (
                    <option key={`words-${lang.code}`} value={`words-${lang.code}`}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </optgroup>
                {/* TODO: Add phrases and programming options */}
                {/* <optgroup label={t.phrases} disabled>
                  <option disabled>{t.phrases} (Coming soon)</option>
                </optgroup>
                <optgroup label={t.programming} disabled>
                  <option disabled>{t.programming} (Coming soon)</option>
                </optgroup> */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDown size={14} />
            </div>
          </div>

          {/* Keyboard Layout Selector (Dropdown) */}
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700 dark:text-gray-300">
                <KeyboardIcon size={18} />
            </div>
            <select
                data-testid="keyboard-layout-selector"
                value={layoutId}
                onChange={(e) => setLayoutId(e.target.value as KeyboardLayoutId)}
                className="appearance-none bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white py-1.5 pl-10 pr-8 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium transition-colors"
                title="Select keyboard layout"
            >
                {availableLayouts.map(layout => (
                  <option key={layout.id} value={layout.id}>
                    {layout.flag} {layout.name}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDown size={14} />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Buy Me a Coffee Link */}
          <a
            data-testid="support-link"
            href="https://buymeacoffee.com/stanislavkhatko"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg cursor-pointer transition-colors font-medium text-sm shadow-sm hover:shadow-md"
            title={t.supportTitle}
            aria-label={t.supportTitle}
          >
            <Coffee size={16} />
            <span className="hidden sm:inline">{t.support}</span>
          </a>

          {/* Interface Language Selector (Dropdown) */}
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700 dark:text-gray-300">
                <Languages size={18} />
            </div>
            <select
                data-testid="interface-language-selector"
                value={interfaceLanguage}
                onChange={(e) => setInterfaceLanguage(e.target.value as InterfaceLanguage)}
                className="appearance-none bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white py-1.5 pl-10 pr-8 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium transition-colors"
                title={t.interfaceLanguage}
            >
                {interfaceLanguageOptions.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDown size={14} />
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            data-testid="theme-toggle-button"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors"
            title={darkMode ? t.lightMode : t.darkMode}
            aria-label={darkMode ? t.lightMode : t.darkMode}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Game 
          mode={mode} 
          layoutId={layoutId}
          language={learningLanguage}
          showKeyboard={showKeyboard} 
          showHands={showHands} 
          showColors={showColors}
          correctionMode={correctionMode}
          soundEnabled={soundEnabled}
          onToggleKeyboard={() => setShowKeyboard(!showKeyboard)}
          onToggleHands={() => setShowHands(!showHands)}
          onToggleColors={() => setShowColors(!showColors)}
          onToggleCorrection={() => setCorrectionMode(!correctionMode)}
          onToggleSound={toggleSound}
          translations={t}
          learningLanguage={learningLanguage}
        />
      </main>
    </div>
  );
}

export default App;
