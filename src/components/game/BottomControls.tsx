import React from "react";
import {
  Keyboard as KeyboardIcon,
  Hand,
  Palette,
  CheckCircle,
  Volume2,
  VolumeX,
  ChevronDown,
} from "lucide-react";
import type { KeyboardLayoutId } from "../../types/keyboard";

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
  layoutId: KeyboardLayoutId;
  setLayoutId: (id: KeyboardLayoutId) => void;
  availableLayouts: Array<{ id: KeyboardLayoutId; name: string; flag: string }>;
  translations: Record<string, string>;
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
  layoutId,
  setLayoutId,
  availableLayouts,
  translations,
}) => {
  return (
    <div className="relative w-full max-w-4xl">
      {showKeyboard && (
        <div className="mb-4 flex justify-center">
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700 dark:text-gray-300">
              <KeyboardIcon size={18} />
            </div>
            <select
              data-testid="keyboard-layout-selector"
              value={layoutId}
              onChange={(e) => setLayoutId(e.target.value as KeyboardLayoutId)}
              className="appearance-none bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-800 text-gray-900 dark:text-white py-2.5 pl-10 pr-8 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none text-sm font-semibold transition-all shadow-sm hover:shadow-md"
              title={translations.selectKeyboardLayout}
            >
              {availableLayouts.map((layout) => (
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
      )}

      <div className="absolute top-0 right-0 flex gap-2 mb-2 z-10">
        <button
          data-testid="keyboard-toggle-button"
          onClick={onToggleKeyboard}
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
            showKeyboard
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
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
            showHands
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
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
            showColors
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
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
            correctionMode
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
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
            soundEnabled
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
