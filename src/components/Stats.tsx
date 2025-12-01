import React from 'react';
import { type Language } from '../utils/Generator';
import { translations } from '../utils/translations';

interface StatsProps {
  wpm: number;
  accuracy: number;
  errors: number;
  language: Language;
}

export const Stats: React.FC<StatsProps> = ({ wpm, accuracy, errors, language }) => {
  const t = translations[language];
  return (
    <div className="flex gap-8 mb-8 text-gray-900 dark:text-white font-mono transition-colors">
      <div data-testid="wpm-stat" className="flex flex-col items-center">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{Math.round(wpm)}</span>
        <span className="text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300">{t.wpm}</span>
      </div>
      <div data-testid="accuracy-stat" className="flex flex-col items-center">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{Math.round(accuracy)}%</span>
        <span className="text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300">{t.accuracy}</span>
      </div>
      <div data-testid="errors-stat" className="flex flex-col items-center">
        <span className="text-3xl font-bold text-red-600 dark:text-red-400">{errors}</span>
        <span className="text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300">{t.errors}</span>
      </div>
    </div>
  );
};
