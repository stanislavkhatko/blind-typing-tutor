"use client";

import React from "react";
import { Gamepad2, ChevronDown } from "lucide-react";
import type { TranslationKeys } from "../../translations";

interface GameControlsProps {
  mode: "practice" | "beginner" | "custom";
  setMode: (mode: "practice" | "beginner" | "custom") => void;
  translations: TranslationKeys;
}

export const GameControls: React.FC<GameControlsProps> = ({
  mode,
  setMode,
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
          <option value="beginner">{translations.beginner}</option>
          <option value="practice">{translations.practice}</option>
          <option value="custom">{translations.custom}</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
};
