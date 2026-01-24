import React from "react";
import { translations } from "@/translations";
import type { InterfaceLanguage } from "@/translations";
import type { ContentType } from "@/utils/url";

interface SEOContentDisplayProps {
  interfaceLang: InterfaceLanguage;
  studyLang: string;
  learningMode: ContentType;
}

// SEO content templates for different modes
const seoContent = {
  words: {
    en: {
      heading: "Practice Touch Typing with Individual Words",
      intro:
        "Master the fundamentals of touch typing by practicing individual words. This mode is perfect for beginners who want to build muscle memory for common letter combinations and improve finger placement accuracy. Focus on typing single words correctly before progressing to more complex phrases and sentences.",
      about:
        "Word-based typing practice helps you concentrate on proper finger positioning without the complexity of sentence structure. By repeatedly typing common words, you develop automatic responses to letter patterns, which is essential for achieving higher typing speeds. Our word practice mode presents carefully selected vocabulary that covers all keys on the keyboard, ensuring balanced practice across all fingers.",
      benefits:
        "Practicing with individual words allows you to focus entirely on technique and accuracy. You can identify which specific letter combinations cause difficulty and practice them repeatedly. This targeted approach accelerates learning and helps you master the home row keys (ASDF JKL;) and the reaches to upper and lower rows. As you progress, you'll notice improved speed and reduced errors when transitioning to phrase-based practice.",
      howTo:
        "Start by typing each word carefully, focusing on using the correct finger for each key. Don't look at the keyboard - use the visual keyboard guide if needed to learn proper finger placement. Begin with shorter words and gradually progress to longer ones as your confidence grows. Practice for short 10-15 minute sessions multiple times per day for best results.",
      tips: "Maintain proper hand position on the home row between words. Type at a comfortable pace - speed will come naturally with practice. If you make a mistake, slow down and focus on accuracy. Our correction mode can help you develop proper technique by requiring you to correct errors before continuing.",
    },
  },
  phrases: {
    en: {
      heading: "Improve Typing Speed with Common Phrases",
      intro:
        "Enhance your touch typing skills by practicing complete sentences and common phrases. This mode simulates real-world typing scenarios, helping you develop rhythm, flow, and the ability to type continuously without breaks. Perfect for intermediate typists ready to move beyond individual words.",
      about:
        "Phrase-based typing practice introduces the complexity of punctuation, capitalization, and natural sentence flow. By practicing complete sentences, you learn to maintain consistent typing speed across word boundaries and handle the full range of keyboard characters. Our phrase practice mode uses commonly used expressions, idioms, and sentence structures that you'll encounter in everyday typing.",
      benefits:
        "Typing full phrases develops your ability to think ahead while your fingers execute previous keystrokes - a crucial skill for achieving high typing speeds. You'll learn to handle spaces, punctuation marks, and capital letters smoothly without breaking your rhythm. This practice mode also improves your reading comprehension and eye-hand coordination as you learn to read ahead while maintaining accurate typing.",
      howTo:
        "Type each phrase exactly as shown, including all punctuation and capitalization. Focus on maintaining a steady rhythm rather than rushing. Use the shift key with the opposite hand when capitalizing letters. Keep your eyes on the text, not your fingers. Practice reading ahead so you know what's coming next while your fingers type the current word.",
      tips: "Don't pause between words - develop a smooth, continuous typing rhythm. Practice using the space bar with your thumb without looking down. When you encounter punctuation, use the correct finger (typically the pinky for periods and commas). As your confidence grows, try to increase your speed while maintaining 95%+ accuracy.",
    },
  },
};

function getLocalizedContent(mode: ContentType) {
  const modeKey = mode === "custom" ? "words" : mode;
  const modeContent = seoContent[modeKey];
  return modeContent.en; // For now, only English content
}

export function SEOContentDisplay({
  interfaceLang,
  studyLang,
  learningMode,
}: SEOContentDisplayProps) {
  const t = translations[interfaceLang];
  const content = getLocalizedContent(learningMode);
  const studyLangName =
    studyLang in t.languageNames
      ? t.languageNames[studyLang as keyof typeof t.languageNames]
      : studyLang.toUpperCase();
  const modeName = learningMode === "words" ? t.words : t.phrases;

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {studyLangName} {modeName} - {t.title}
      </h1>

      <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
        {t.seoDescription}
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        {content.heading}
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{content.intro}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        About {modeName} Typing Practice
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{content.about}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Benefits of {modeName} Practice
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        {content.benefits}
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        How to Practice Effectively
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{content.howTo}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Practice Tips
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{content.tips}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Features of Our Typing Tutor
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          Real-time typing speed measurement (WPM - Words Per Minute) and
          accuracy tracking
        </li>
        <li>
          Visual keyboard with finger position guidance and color-coded keys
        </li>
        <li>
          Support for 28+ keyboard layouts including QWERTY, AZERTY, QWERTZ,
          Dvorak, and more
        </li>
        <li>
          Practice in multiple languages: English, Spanish, French, German,
          Russian, Chinese, Japanese, Korean, Arabic, and many others
        </li>
        <li>
          Three practice modes: individual words, common phrases, and custom
          text
        </li>
        <li>Sound feedback for correct and incorrect keystrokes</li>
        <li>
          Dark mode support for comfortable practice in low-light conditions
        </li>
        <li>
          Detailed statistics including mistakes heat map and finger usage
          analysis
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Track Your Progress
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Monitor your improvement with detailed statistics. View your typing
        speed (WPM), accuracy percentage, total characters typed, and mistakes
        made. The mistakes heat map shows which keys you struggle with most,
        allowing you to focus your practice where it's needed. Character
        statistics reveal your typing patterns and help identify areas for
        improvement.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Free Online Typing Practice
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        This typing tutor is completely free to use with no registration
        required. Practice as much as you want, whenever you want. All features
        are available immediately - no premium subscriptions or locked content.
        We believe everyone should have access to quality typing education tools
        to improve their skills.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Multilingual Support
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Our typing tutor supports practice in over 28 languages with native
        keyboard layouts. Whether you're learning English typing on a QWERTY
        layout, French on AZERTY, German on QWERTZ, or practicing Cyrillic,
        Arabic, Chinese, or Japanese characters, our tool provides the
        appropriate keyboard layout and practice content.
      </p>
    </>
  );
}
