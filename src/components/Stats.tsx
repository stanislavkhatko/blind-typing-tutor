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
    <div className="flex gap-8 mb-8 text-gray-700 dark:text-gray-300 font-mono transition-colors">
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{Math.round(wpm)}</span>
        <span className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">{t.wpm}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{Math.round(accuracy)}%</span>
        <span className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">{t.accuracy}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold text-red-500 dark:text-red-400">{errors}</span>
        <span className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">{t.errors}</span>
      </div>
    </div>
  );
};
