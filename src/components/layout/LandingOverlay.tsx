"use client";

import React from "react";
import { X } from "lucide-react";
import { SEOContentDisplay } from "./SEOContentDisplay";
import type { InterfaceLanguage } from "@/translations";
import type { ContentType } from "@/utils/url";
import { translations } from "@/translations";

interface LandingOverlayProps {
  show: boolean;
  onClose: () => void;
  interfaceLang: InterfaceLanguage;
  studyLang: string;
  learningMode: ContentType;
}

export function LandingOverlay({
  show,
  onClose,
  interfaceLang,
  studyLang,
  learningMode,
}: LandingOverlayProps) {
  if (!show) return null;

  const t = translations[interfaceLang];

  return (
    <div
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen w-full" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {t.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors"
            title="Close"
            aria-label="Close information overlay"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mode navigation links */}
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            {t.learningMode}
          </h3>
          <div className="flex flex-wrap gap-3">
            <a
              href={`/${interfaceLang}/${studyLang}/words`}
              className={`px-4 py-2 rounded-lg transition-colors ${
                learningMode === "words"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t.words}
            </a>
            <a
              href={`/${interfaceLang}/${studyLang}/phrases`}
              className={`px-4 py-2 rounded-lg transition-colors ${
                learningMode === "phrases"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t.phrases}
            </a>
            <a
              href={`/${interfaceLang}/${studyLang}/custom`}
              className={`px-4 py-2 rounded-lg transition-colors ${
                learningMode === "custom"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t.custom}
            </a>
          </div>
        </div>

        {/* SEO Content - visible version for overlay */}
        <div className="max-w-4xl mx-auto px-8 pb-8">
          <SEOContentDisplay
            interfaceLang={interfaceLang}
            studyLang={studyLang}
            learningMode={learningMode}
          />
        </div>
      </div>
    </div>
  );
}
