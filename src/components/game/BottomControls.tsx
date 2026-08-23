"use client";

import React from "react";
import {
  Keyboard as KeyboardIcon,
  Hand,
  Palette,
  CheckCircle,
  Volume2,
  VolumeX,
} from "lucide-react";
import { TranslationKeys } from "@/translations";

interface BottomControlsProps {
  showKeyboard: boolean;
  onToggleKeyboard: () => void;
  showHands: boolean;
  onToggleHands: () => void;
  showColors: boolean;
  onToggleColors: () => void;
  correctionMode: boolean;
  onToggleCorrection: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  translations: TranslationKeys;
}

export const BottomControls: React.FC<BottomControlsProps> = ({
  showKeyboard,
  onToggleKeyboard,
  showHands,
  onToggleHands,
  showColors,
  onToggleColors,
  correctionMode,
  onToggleCorrection,
  soundEnabled,
  onToggleSound,
  translations,
}) => {
  return (
    <div className="relative w-full max-w-4xl">
      <div className="absolute top-0 right-0 flex gap-2 mb-2 z-10">
        <button
          data-testid="keyboard-toggle-button"
          onClick={onToggleKeyboard}
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${showKeyboard
              ? "text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80"
              : "text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60"
            }`}
          title={translations.toggleKeyboard}
        >
          <KeyboardIcon size={18} />
        </button>

        <button
          data-testid="hand-hints-toggle-button"
          onClick={onToggleHands}
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${showHands
              ? "text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80"
              : "text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60"
            }`}
          title={translations.toggleHands}
        >
          <Hand size={18} />
        </button>

        <button
          data-testid="color-zones-toggle-button"
          onClick={onToggleColors}
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${showColors
              ? "text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80"
              : "text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60"
            }`}
          title={translations.toggleColors}
        >
          <Palette size={18} />
        </button>

        <button
          data-testid="correction-mode-toggle-button"
          onClick={onToggleCorrection}
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${correctionMode
              ? "text-green-600 dark:text-green-400 bg-white/80 dark:bg-gray-800/80"
              : "text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60"
            }`}
          title={translations.toggleCorrection}
        >
          <CheckCircle size={18} />
        </button>

        <button
          data-testid="sound-toggle-button"
          onClick={onToggleSound}
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${soundEnabled
              ? "text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80"
              : "text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60"
            }`}
          title={soundEnabled ? translations.soundOn : translations.soundOff}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>
    </div>
  );
};
