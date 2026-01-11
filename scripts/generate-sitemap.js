import { writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import constants - we'll need to read from the TypeScript file or use a JSON version
// For now, we'll define them here to avoid TypeScript compilation issues
const INTERFACE_LANGUAGE_OPTIONS = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "he", name: "עברית", flag: "🇮🇱" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
];

const LEARNING_LANGUAGE_OPTIONS = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "he", name: "עברית", flag: "🇮🇱" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
];

const CONTENT_TYPES = ["words", "phrases", "custom"];
const BASE_URL = "https://blind-typing-tutor.wordmemo.net";
const TODAY = new Date().toISOString().split("T")[0];

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

function generateSitemap() {
  const urls = [];

  // Generate all URL combinations
  INTERFACE_LANGUAGE_OPTIONS.forEach((interfaceLang) => {
    LEARNING_LANGUAGE_OPTIONS.forEach((learningLang) => {
      CONTENT_TYPES.forEach((contentType) => {
        const url = `${BASE_URL}/${interfaceLang.code}/${contentType}-${learningLang.code}`;
        urls.push({
          loc: url,
          interfaceLang: interfaceLang.code,
          learningLang: learningLang.code,
          contentType,
        });
      });
    });
  });

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml +=
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  // Calculate dynamic priorities
  function getPriority(urlData) {
    // English interface gets higher priority
    if (urlData.interfaceLang === "en") {
      // Popular learning languages get higher priority
      const popularLangs = ["en", "es", "fr", "de", "pt", "ru", "zh", "ja"];
      if (popularLangs.includes(urlData.learningLang)) {
        // Phrases mode is most popular
        if (urlData.contentType === "phrases") return "1.0";
        if (urlData.contentType === "words") return "0.9";
        return "0.8"; // custom
      }
      return "0.7";
    }
    // Non-English interfaces
    const popularLangs = ["en", "es", "fr", "de", "pt", "ru", "zh", "ja"];
    if (popularLangs.includes(urlData.learningLang)) {
      if (urlData.contentType === "phrases") return "0.9";
      if (urlData.contentType === "words") return "0.8";
      return "0.7";
    }
    return "0.6";
  }

  function getChangeFreq(urlData) {
    // More popular content types change more frequently
    if (urlData.contentType === "phrases") return "weekly";
    if (urlData.contentType === "words") return "monthly";
    return "monthly"; // custom
  }

  urls.forEach((urlData) => {
    xml += "  <url>\n";
    xml += `    <loc>${escapeXml(urlData.loc)}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${getChangeFreq(urlData)}</changefreq>\n`;
    xml += `    <priority>${getPriority(urlData)}</priority>\n`;

    // Add hreflang alternates for all interface languages with same learning language and content type
    INTERFACE_LANGUAGE_OPTIONS.forEach((altLang) => {
      const altUrl = `${BASE_URL}/${altLang.code}/${urlData.contentType}-${urlData.learningLang}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${
        altLang.code
      }" href="${escapeXml(altUrl)}"/>\n`;
    });

    // Add x-default pointing to English version
    const defaultUrl = `${BASE_URL}/en/${urlData.contentType}-${urlData.learningLang}`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
      defaultUrl
    )}"/>\n`;

    xml += "  </url>\n";
  });

  xml += "</urlset>\n";

  // Write to public/sitemap.xml
  const outputPath = join(__dirname, "..", "public", "sitemap.xml");
  writeFileSync(outputPath, xml, "utf8");
  console.log(`Generated sitemap with ${urls.length} URLs at ${outputPath}`);
}

generateSitemap();
