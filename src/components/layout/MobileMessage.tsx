"use client";

import React from "react";
import { Keyboard as KeyboardIcon } from "lucide-react";
import Image from "next/image";

interface MobileMessageProps {
  title: string;
  desktopRequired: string;
  description: string;
  footer: string;
  darkMode: boolean;
}

export const MobileMessage: React.FC<MobileMessageProps> = ({
  title,
  desktopRequired,
  description,
  footer,
  darkMode,
}) => {

  const screenshot = darkMode ? '/screenshot-dark.png' : '/screenshot-light.png';
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <KeyboardIcon className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg">
          {desktopRequired}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
          {description}
        </p>

        {/* Screenshots */}
        <div className="mb-6 space-y-4">
          <div className="relative w-full rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
            <Image
              src={screenshot}
              alt="Light mode screenshot"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* WordMemo Link */}
        <div className="mb-6">
          <a
            href="https://wordmemo.net/en/blind-typing-tutor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors font-medium text-sm shadow-sm hover:shadow-md"
          >
            <img
              src="/wordmemo-logo.svg"
              alt="WordMemo"
              className="h-5 w-5"
              width="20"
              height="20"
            />
            <span>WordMemo.net</span>
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {footer}
          </p>
        </div>
      </div>
    </div>
  );
};
