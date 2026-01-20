/**
 * Custom error class for Typing Tutor application errors
 */
export class TypingTutorError extends Error {
  constructor(
    message: string,
    public code: string,
    public recoverable: boolean = true
  ) {
    super(message);
    this.name = "TypingTutorError";
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TypingTutorError);
    }
  }
}

/**
 * Error codes used throughout the application
 */
export const ErrorCodes = {
  LANGUAGE_NOT_FOUND: "LANGUAGE_NOT_FOUND",
  LAYOUT_NOT_FOUND: "LAYOUT_NOT_FOUND",
  WORDS_NOT_FOUND: "WORDS_NOT_FOUND",
  STORAGE_ERROR: "STORAGE_ERROR",
  INVALID_URL: "INVALID_URL",
  INVALID_PARAMS: "INVALID_PARAMS",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

/**
 * Creates a TypingTutorError with a standardized format
 */
export function createError(
  code: ErrorCode,
  message: string,
  recoverable: boolean = true
): TypingTutorError {
  return new TypingTutorError(message, code, recoverable);
}

/**
 * Handles errors with optional recovery strategy
 */
export function handleError(
  error: unknown,
  fallback?: () => void
): TypingTutorError {
  if (error instanceof TypingTutorError) {
    if (error.recoverable && fallback) {
      fallback();
    }
    return error;
  }

  // Handle unknown errors
  const unknownError = new TypingTutorError(
    error instanceof Error ? error.message : "An unknown error occurred",
    ErrorCodes.INVALID_PARAMS,
    false
  );

  if (fallback) {
    fallback();
  }

  return unknownError;
}
