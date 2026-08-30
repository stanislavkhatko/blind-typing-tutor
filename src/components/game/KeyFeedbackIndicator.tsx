"use client";

export type KeyFeedbackStatus = "correct" | "incorrect";

export interface KeyFeedbackEvent {
  status: KeyFeedbackStatus;
  eventId: number;
}

interface KeyFeedbackIndicatorProps {
  feedbackEvent: KeyFeedbackEvent | null;
}

export function KeyFeedbackIndicator({ feedbackEvent }: KeyFeedbackIndicatorProps) {
  if (!feedbackEvent) {
    return <div className="w-9 h-9" />;
  }

  const classes = feedbackEvent.status === "correct"
    ? "bg-green-500 text-green-50"
    : "bg-red-500 text-red-50";

  return (
    <div className="w-9 h-9 flex items-center justify-center" aria-live="polite" aria-atomic="true">
      <span
        key={feedbackEvent.eventId}
        className={`key-feedback-pulse w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${classes}`}
      >
        {feedbackEvent.status === "correct" ? "✓" : "×"}
      </span>
    </div>
  );
}
