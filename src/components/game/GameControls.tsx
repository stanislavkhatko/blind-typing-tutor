import React from "react";
import { Gamepad2, ChevronDown, BookOpen } from "lucide-react";
import type { LanguageCode } from "../../types/keyboard";

interface GameControlsProps {
  mode: "practice" | "beginner" | "custom";
  setMode: (mode: "practice" | "beginner" | "custom") => void;
  learningContentType: "words" | "phrases" | "custom";
  setLearningContentType: (type: "words" | "phrases" | "custom") => void;
  learningLanguage: LanguageCode;
  setLearningLanguage: (lang: LanguageCode) => void;
  learningLanguageOptions: Array<{
    code: LanguageCode;
    name: string;
    flag: string;
  }>;
  translations: Record<string, string>;
}

export const GameControls: React.FC<GameControlsProps> = ({
  mode,
  setMode,
  learningContentType,
  setLearningContentType,
  learningLanguage,
  setLearningLanguage,
  learningLanguageOptions,
  translations,
}) => {
  return (
    <div className="w-full max-w-4xl mb-4 flex gap-3 justify-center items-center">
      <div className="relative group">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700 dark:text-gray-300">
          <Gamepad2 size={18} />
        </div>
        <select
          data-testid="learning-mode-selector"
          value={mode}
          onChange={(e) =>
            setMode(e.target.value as "practice" | "beginner" | "custom")
          }
          className="appearance-none bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-800 text-gray-900 dark:text-white py-2.5 pl-10 pr-8 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none text-sm font-semibold transition-all shadow-sm hover:shadow-md"
          title={translations.learningMode}
        >
          <option value="practice">{translations.practice}</option>
          <option value="beginner">{translations.beginner}</option>
          <option value="custom">{translations.custom}</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <ChevronDown size={14} />
        </div>
      </div>

      <div className="relative group">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700 dark:text-gray-300">
          <BookOpen size={18} />
        </div>
        <select
          data-testid="learning-language-selector"
          value={`${learningContentType}-${learningLanguage}`}
          onChange={(e) => {
            const [contentType, lang] = e.target.value.split("-");
            setLearningContentType(
              contentType as "words" | "phrases" | "custom"
            );
            setLearningLanguage(lang as LanguageCode);
          }}
          className="appearance-none bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-800 text-gray-900 dark:text-white py-2.5 pl-10 pr-8 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none text-sm font-semibold transition-all shadow-sm hover:shadow-md"
          title={translations.learningLanguage}
        >
          <optgroup label={translations.words}>
            {learningLanguageOptions.map((lang) => (
              <option key={`words-${lang.code}`} value={`words-${lang.code}`}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </optgroup>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
};
