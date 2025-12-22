import React from "react";
import { Keyboard as KeyboardIcon } from "lucide-react";

interface MobileMessageProps {
  title: string;
}

export const MobileMessage: React.FC<MobileMessageProps> = ({ title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <KeyboardIcon className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg">
          Desktop Keyboard Required
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
          This application is designed for desktop use with a physical
          keyboard. Please visit this site on a desktop or laptop computer to
          practice touch typing.
        </p>
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Touch typing requires a physical keyboard for the best learning
            experience.
          </p>
        </div>
      </div>
    </div>
  );
};
