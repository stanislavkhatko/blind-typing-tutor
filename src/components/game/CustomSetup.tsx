import React from "react";

interface CustomSetupProps {
  customText: string;
  setCustomText: (text: string) => void;
  handleCustomSubmit: () => void;
  translations: Record<string, string>;
}

export const CustomSetup: React.FC<CustomSetupProps> = ({
  customText,
  setCustomText,
  handleCustomSubmit,
  translations,
}) => {
  return (
    <div className="flex flex-col items-center bg-transparent p-4">
      <div className="w-full max-w-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-8 flex flex-col gap-4 transition-colors">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {translations.custom}
        </h2>
        <textarea
          data-testid="custom-text-input"
          className="w-full h-48 p-4 border-2 border-gray-300 dark:border-gray-600 rounded focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none resize-none transition-colors"
          placeholder={translations.pasteText}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
        />
        <button
          data-testid="custom-start-button"
          onClick={handleCustomSubmit}
          disabled={!customText.trim()}
          className="self-end px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          {translations.start}
        </button>
      </div>
    </div>
  );
};
