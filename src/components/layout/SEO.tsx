import { useEffect } from "react";
import type { InterfaceLanguage } from "../../utils/translations";

interface SEOProps {
  title: string;
  description: string;
  language: InterfaceLanguage;
  keywords?: string;
  author?: string;
  ogImage?: string;
  canonical?: string;
}

const LANGUAGES: InterfaceLanguage[] = [
  "en",
  "uk",
  "tr",
  "de",
  "fr",
  "es",
  "pt",
  "ru",
  "zh",
  "ja",
  "ko",
  "ar",
  "hi",
  "it",
  "pl",
  "nl",
  "sv",
  "no",
  "da",
  "fi",
  "cs",
  "hu",
  "ro",
  "el",
  "he",
  "th",
  "vi",
  "id",
  "ms",
];

export function SEO({
  title,
  description,
  language,
  keywords,
  author = "Stanislav Khatko",
  ogImage = "/og-image.png",
  canonical = "https://blind-typing-tutor.wordmemo.net",
}: SEOProps) {
  useEffect(() => {
    // Basic meta tags
    document.title = title;
    document.documentElement.lang = language;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement("meta");
      metaAuthor.setAttribute("name", "author");
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.setAttribute("content", author);

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute("content", ogImage);

    // Canonical link
    const localizedCanonical =
      language === "en" ? canonical : `${canonical}/${language}`;

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", localizedCanonical);

    // Hreflang tags
    LANGUAGES.forEach((lang) => {
      let link = document.querySelector(`link[hreflang="${lang}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", lang);
        document.head.appendChild(link);
      }
      const langUrl = lang === "en" ? canonical : `${canonical}/${lang}`;
      link.setAttribute("href", langUrl);
    });

    // x-default
    let xDefault = document.querySelector('link[hreflang="x-default"]');
    if (!xDefault) {
      xDefault = document.createElement("link");
      xDefault.setAttribute("rel", "alternate");
      xDefault.setAttribute("hreflang", "x-default");
      document.head.appendChild(xDefault);
    }
    xDefault.setAttribute("href", canonical); // English as default

    // Dynamic JSON-LD
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      url: localizedCanonical,
      description: description,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: language,
      author: {
        "@type": "Person",
        name: author,
      },
    };

    let scriptTag = document.querySelector(
      'script[type="application/ld+json"]#dynamic-seo-data'
    );
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      scriptTag.setAttribute("id", "dynamic-seo-data");
      document.head.appendChild(scriptTag);
    }
    scriptTag.innerHTML = JSON.stringify(structuredData);
  }, [title, description, language, keywords, author, ogImage, canonical]);

  return null;
}
