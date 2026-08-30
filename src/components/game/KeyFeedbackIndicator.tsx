"use client";

import { useEffect, useRef, useState } from "react";

export type KeyFeedbackStatus = "correct" | "incorrect";

export interface KeyFeedbackEvent {
  status: KeyFeedbackStatus;
  eventId: number;
}

interface KeyFeedbackIndicatorProps {
  feedbackEvent: KeyFeedbackEvent | null;
}

const FEEDBACK_VISIBLE_MS = 320;

export function KeyFeedbackIndicator({ feedbackEvent }: KeyFeedbackIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState<KeyFeedbackStatus | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!feedbackEvent) {
      return;
    }

    setStatus(feedbackEvent.status);
    setIsVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      timeoutRef.current = null;
    }, FEEDBACK_VISIBLE_MS);
  }, [feedbackEvent]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const classes = status === "correct"
    ? "bg-green-500 text-green-50"
    : "bg-red-500 text-red-50";

  return (
    <div className="w-9 h-9 flex items-center justify-center" aria-live="polite" aria-atomic="true">
      {isVisible && status && (
        <span
          key={feedbackEvent?.eventId}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${classes}`}
        >
          {status === "correct" ? "✓" : "×"}
        </span>
      )}
    </div>
  );
}

