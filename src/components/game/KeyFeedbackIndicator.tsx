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
  const classes =
    feedbackEvent?.status === "correct"
      ? "bg-green-500"
      : feedbackEvent?.status === "incorrect"
        ? "bg-red-500"
        : "bg-transparent";

  return (
    <div
      className="w-full max-w-4xl mb-4 flex justify-center"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="w-[85%] h-4 rounded-full bg-transparent">
        {feedbackEvent && (
          <span
            key={feedbackEvent.eventId}
            className={`key-feedback-bar-pulse block h-4 w-full rounded-full ${classes}`}
          />
        )}
      </div>
    </div>
  );
}
