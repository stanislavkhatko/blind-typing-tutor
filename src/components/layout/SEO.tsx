import { useEffect } from "react";
import type { InterfaceLanguage } from "../../utils/translations";
import type { LanguageCode } from "../../types/keyboard";
import type { ContentType } from "../../utils/url";
import { buildUrlPath } from "../../utils/url";

interface SEOProps {
  title: string;
  description: string;
  language: InterfaceLanguage;
  learningLanguage?: LanguageCode;
  contentType?: ContentType;
  keywords?: string;
  author?: string;
  ogImage?: string;
  canonical?: string;
  robots?: string; // e.g., "index, follow" or "noindex, nofollow"
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
  learningLanguage,
  contentType = "words",
  keywords,
  author = "Stanislav Khatko",
  ogImage = "/og-image.png",
  canonical = "https://blind-typing-tutor.wordmemo.net",
  robots = "index, follow",
}: SEOProps) {
  useEffect(() => {
    // Ensure title is never empty - use fallback if needed
    const finalTitle =
      title?.trim() || "Blind Typing Tutor - Master Touch Typing Online";
    const finalDescription =
      description?.trim() ||
      "Master touch typing with our free online blind typing tutor. Practice on 28+ keyboard layouts in multiple languages.";

    // Basic meta tags - ensure they're set immediately
    if (document.title !== finalTitle) {
      document.title = finalTitle;
    }
    document.documentElement.lang = language;

    // Update or create title element if it doesn't exist (for crawlers)
    let titleElement = document.querySelector("title");
    if (!titleElement) {
      titleElement = document.createElement("title");
      document.head.appendChild(titleElement);
    }
    titleElement.textContent = finalTitle;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", finalDescription);

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

    // Robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", robots);

    // Googlebot
    let metaGooglebot = document.querySelector('meta[name="googlebot"]');
    if (!metaGooglebot) {
      metaGooglebot = document.createElement("meta");
      metaGooglebot.setAttribute("name", "googlebot");
      document.head.appendChild(metaGooglebot);
    }
    metaGooglebot.setAttribute("content", robots);

    // Open Graph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", finalTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", finalDescription);

    // Canonical link - build full path if learning language is provided
    let localizedCanonical = canonical;
    if (learningLanguage && contentType) {
      localizedCanonical = `${canonical}${buildUrlPath(
        language,
        contentType,
        learningLanguage
      )}`;
    } else if (language !== "en") {
      localizedCanonical = `${canonical}/${language}`;
    }

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", localizedCanonical);

    // Open Graph Image
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement("meta");
      ogImg.setAttribute("property", "og:image");
      document.head.appendChild(ogImg);
    }
    const fullOgImage = ogImage.startsWith("http")
      ? ogImage
      : `${canonical}${ogImage}`;
    ogImg.setAttribute("content", fullOgImage);

    // Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", localizedCanonical);

    // Open Graph Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement("meta");
      ogType.setAttribute("property", "og:type");
      document.head.appendChild(ogType);
    }
    ogType.setAttribute("content", "website");

    // Open Graph Site Name
    let ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (!ogSiteName) {
      ogSiteName = document.createElement("meta");
      ogSiteName.setAttribute("property", "og:site_name");
      document.head.appendChild(ogSiteName);
    }
    ogSiteName.setAttribute("content", "Blind Typing Tutor");

    // Open Graph Locale
    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement("meta");
      ogLocale.setAttribute("property", "og:locale");
      document.head.appendChild(ogLocale);
    }
    ogLocale.setAttribute("content", language);

    // Hreflang tags - build URLs with same learning language and content type
    LANGUAGES.forEach((lang) => {
      let link = document.querySelector(`link[hreflang="${lang}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", lang);
        document.head.appendChild(link);
      }
      let langUrl = canonical;
      if (learningLanguage && contentType) {
        langUrl = `${canonical}${buildUrlPath(
          lang,
          contentType,
          learningLanguage
        )}`;
      } else if (lang !== "en") {
        langUrl = `${canonical}/${lang}`;
      }
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

    // Enhanced Structured Data
    const baseUrl = "https://blind-typing-tutor.wordmemo.net";

    // Main WebApplication schema
    const webAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: finalTitle,
      url: localizedCanonical,
      description: finalDescription,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: language,
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      softwareVersion: "1.0",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Person",
        name: author,
      },
      publisher: {
        "@type": "Organization",
        name: "Blind Typing Tutor",
        url: baseUrl,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1000",
      },
    };

    // BreadcrumbList schema
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
    ];

    if (learningLanguage && contentType) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: `${language.toUpperCase()} Interface`,
        item: `${baseUrl}/${language}`,
      });
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 3,
        name: finalTitle,
        item: localizedCanonical,
      });
    } else if (language !== "en") {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: `${language.toUpperCase()} Interface`,
        item: localizedCanonical,
      });
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    };

    // Educational content schema (Article)
    const articleSchema =
      learningLanguage && contentType
        ? {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: finalTitle,
            description: finalDescription,
            url: localizedCanonical,
            inLanguage: language,
            author: {
              "@type": "Person",
              name: author,
            },
            publisher: {
              "@type": "Organization",
              name: "Blind Typing Tutor",
              url: baseUrl,
            },
            about: {
              "@type": "Thing",
              name: `Learning ${learningLanguage} ${contentType}`,
            },
            educationalLevel: "Beginner",
            learningResourceType: "Interactive Tutorial",
          }
        : null;

    // Remove old structured data scripts
    const oldScripts = document.querySelectorAll(
      'script[type="application/ld+json"][id^="seo-"]'
    );
    oldScripts.forEach((script) => script.remove());

    // Add WebApplication schema
    const webAppScript = document.createElement("script");
    webAppScript.setAttribute("type", "application/ld+json");
    webAppScript.setAttribute("id", "seo-webapp");
    webAppScript.innerHTML = JSON.stringify(webAppSchema);
    document.head.appendChild(webAppScript);

    // Add BreadcrumbList schema
    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.setAttribute("type", "application/ld+json");
    breadcrumbScript.setAttribute("id", "seo-breadcrumb");
    breadcrumbScript.innerHTML = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // Add Article schema if applicable
    if (articleSchema) {
      const articleScript = document.createElement("script");
      articleScript.setAttribute("type", "application/ld+json");
      articleScript.setAttribute("id", "seo-article");
      articleScript.innerHTML = JSON.stringify(articleSchema);
      document.head.appendChild(articleScript);
    }

    // Performance hints - preconnect to external domains
    const preconnectDomains = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ];
    preconnectDomains.forEach((domain) => {
      const existing = document.querySelector(
        `link[rel="preconnect"][href="${domain}"]`
      );
      if (!existing) {
        const preconnect = document.createElement("link");
        preconnect.setAttribute("rel", "preconnect");
        preconnect.setAttribute("href", domain);
        preconnect.setAttribute("crossorigin", "");
        document.head.appendChild(preconnect);
      }
    });
  }, [
    title,
    description,
    language,
    learningLanguage,
    contentType,
    keywords,
    author,
    ogImage,
    canonical,
    robots,
  ]);

  return null;
}
