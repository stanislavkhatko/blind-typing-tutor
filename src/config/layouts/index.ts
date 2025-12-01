import type { KeyboardLayout, KeyboardLayoutId, LayoutMetadata } from '../../types/keyboard';
import { enUsLayout } from './en-us';
import { enGbLayout } from './en-gb';
import { ukUaLayout } from './uk-ua';
import { trQLayout } from './tr-q';
import { trFLayout } from './tr-f';
import { deDeLayout } from './de-de';
import { frFrLayout } from './fr-fr';
import { esEsLayout } from './es-es';
import { ptPtLayout } from './pt-pt';
import { itItLayout } from './it-it';
import { nlNlLayout } from './nl-nl';
import { svSeLayout } from './sv-se';
import { fiFiLayout } from './fi-fi';
import { noNoLayout } from './no-no';
import { daDkLayout } from './da-dk';
import { plPlLayout } from './pl-pl';
import { csCzLayout } from './cs-cz';
import { huHuLayout } from './hu-hu';
import { roRoLayout } from './ro-ro';
import { elGrLayout } from './el-gr';
import { heIlLayout } from './he-il';
import { ruRuLayout } from './ru-ru';
import { jaJpLayout } from './ja-jp';
import { koKrLayout } from './ko-kr';
import { zhCnLayout } from './zh-cn';
import { arSaLayout } from './ar-sa';
import { hiInLayout } from './hi-in';

/**
 * Central registry of all keyboard layouts
 */
const layouts = new Map<KeyboardLayoutId, KeyboardLayout>([
  // English
  ['en-us', enUsLayout],
  ['en-gb', enGbLayout],
  // German
  ['de-de', deDeLayout],
  // French
  ['fr-fr', frFrLayout],
  // Spanish
  ['es-es', esEsLayout],
  // Portuguese
  ['pt-pt', ptPtLayout],
  // Italian
  ['it-it', itItLayout],
  // Dutch
  ['nl-nl', nlNlLayout],
  // Nordic
  ['sv-se', svSeLayout],
  ['fi-fi', fiFiLayout],
  ['no-no', noNoLayout],
  ['da-dk', daDkLayout],
  // Central/Eastern European
  ['pl-pl', plPlLayout],
  ['cs-cz', csCzLayout],
  ['hu-hu', huHuLayout],
  ['ro-ro', roRoLayout],
  // Greek
  ['el-gr', elGrLayout],
  // Hebrew
  ['he-il', heIlLayout],
  // Cyrillic
  ['ru-ru', ruRuLayout],
  ['uk-ua', ukUaLayout],
  // Turkish
  ['tr-q', trQLayout],
  ['tr-f', trFLayout],
  // Asian
  ['ja-jp', jaJpLayout],
  ['ko-kr', koKrLayout],
  ['zh-cn', zhCnLayout],
  // Middle Eastern
  ['ar-sa', arSaLayout],
  // South Asian
  ['hi-in', hiInLayout],
]);

/**
 * Get a keyboard layout by ID
 */
export function getLayout(id: KeyboardLayoutId): KeyboardLayout {
  const layout = layouts.get(id);
  if (!layout) {
    throw new Error(`Layout ${id} not found`);
  }
  return layout;
}

/**
 * Get all available keyboard layouts as metadata
 */
export function getAllLayouts(): LayoutMetadata[] {
  return Array.from(layouts.values()).map(layout => ({
    id: layout.id,
    name: layout.name,
    language: layout.language,
    flag: layout.flag,
  }));
}

/**
 * Get layouts for a specific language
 */
export function getLayoutsByLanguage(language: string): LayoutMetadata[] {
  return Array.from(layouts.values())
    .filter(layout => layout.language === language)
    .map(layout => ({
      id: layout.id,
      name: layout.name,
      language: layout.language,
      flag: layout.flag,
    }));
}

/**
 * Find a key definition by character in a layout
 */
export function findKeyByChar(layoutId: KeyboardLayoutId, char: string): string | null {
  const layout = getLayout(layoutId);
  const lowerChar = char.toLowerCase();

  for (const key of layout.keys) {
    if (key.primary === lowerChar ||
      key.shifted?.toLowerCase() === lowerChar ||
      key.altGr?.toLowerCase() === lowerChar) {
      return key.id;
    }
  }

  return null;
}

// Export individual layouts
export { 
  enUsLayout, enGbLayout, ukUaLayout, trQLayout, trFLayout,
  deDeLayout, frFrLayout, esEsLayout, ptPtLayout, itItLayout,
  nlNlLayout, svSeLayout, fiFiLayout, noNoLayout, daDkLayout,
  plPlLayout, csCzLayout, huHuLayout, roRoLayout, elGrLayout,
  heIlLayout, ruRuLayout, jaJpLayout, koKrLayout, zhCnLayout,
  arSaLayout, hiInLayout
};
