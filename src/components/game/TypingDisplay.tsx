"use client";

import React, { useRef, useEffect } from "react";

interface TypingDisplayProps {
  text: string;
  input: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const TypingDisplay: React.FC<TypingDisplayProps> = ({
  text,
  input,
  handleInput,
  inputRef,
}) => {
  const textDisplayRef = useRef<HTMLDivElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);

  // Auto-scroll to current typing position
  useEffect(() => {
    if (currentCharRef.current && textDisplayRef.current) {
      currentCharRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [input.length, text]);

  return (
    <div className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-8 transition-colors">
      <div
        ref={textDisplayRef}
        data-testid="text-display"
        className="mb-8 text-3xl font-mono text-gray-900 dark:text-white leading-relaxed wrap-break-words relative tracking-wide max-h-32 overflow-y-auto"
      >
        {text.split("").map((char, index) => {
          let color = "text-gray-400 dark:text-gray-500";
          const isCurrentChar = index === input.length;

          if (index < input.length) {
            color =
              input[index] === char
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30";
          } else if (isCurrentChar) {
            color =
              "text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400";
          }
          return (
            <span
              key={index}
              ref={isCurrentChar ? currentCharRef : null}
              className={color}
            >
              {char}
            </span>
          );
        })}
      </div>

      <input
        data-testid="typing-input"
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        className="absolute opacity-0 top-0 left-0 h-0 w-0"
        autoFocus
        onBlur={() => inputRef.current?.focus()}
      />
    </div>
  );
};
