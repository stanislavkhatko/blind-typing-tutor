/**
 * Safe localStorage utilities with error handling
 * Wraps localStorage operations to handle quota exceeded and disabled storage
 */

/**
 * Safely get an item from localStorage
 * @param key Storage key
 * @param defaultValue Value to return if key doesn't exist or error occurs
 * @returns Stored value or default
 */
export function getStorageItem(key: string, defaultValue: string | null = null): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    // localStorage might be disabled or quota exceeded
    console.warn(`Failed to read from localStorage (${key}):`, error);
    return defaultValue;
  }
}

/**
 * Safely set an item in localStorage
 * @param key Storage key
 * @param value Value to store
 * @returns true if successful, false otherwise
 */
export function setStorageItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    // localStorage might be disabled, quota exceeded, or in private browsing
    console.warn(`Failed to write to localStorage (${key}):`, error);
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * @param key Storage key
 * @returns true if successful, false otherwise
 */
export function removeStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove from localStorage (${key}):`, error);
    return false;
  }
}

/**
 * Check if localStorage is available
 * @returns true if localStorage is available and working
 */
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

