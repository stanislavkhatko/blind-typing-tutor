/**
 * Central type exports for the application
 * Re-export all types from their respective modules for easier imports
 */

// Keyboard and layout types
export type {
  KeyboardLayoutId,
  LanguageCode,
  KeyDefinition,
  KeyboardLayout,
  LayoutMetadata,
} from "./keyboard";

// Translation types
export type {
  InterfaceLanguage,
  TranslationKeys,
  Translations,
} from "../translations/types";

// Route and URL types
export type { ContentType } from "../utils/url";

// Settings types
export enum GAME_MODE {
  PRACTICE = "practice",
  BEGINNER = "beginner",
  CUSTOM = "custom",
}
export type GameMode = (typeof GAME_MODE)[keyof typeof GAME_MODE];

// Error types
export type { ErrorCode } from "../utils/errors";
export { TypingTutorError, ErrorCodes } from "../utils/errors";
