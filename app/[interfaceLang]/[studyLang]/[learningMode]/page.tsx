import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppContent } from "./AppContent";
import type { InterfaceLanguage } from "@/translations";
import type { ContentType } from "@/utils/url";
import { translations } from "@/translations";
import { INTERFACE_LANGUAGE_OPTIONS, LEARNING_LANGUAGE_OPTIONS } from "@/config/constants";

const CONTENT_TYPES: ContentType[] = ["words", "phrases", "custom"];

interface PageProps {
  params: Promise<{
    interfaceLang: string;
    studyLang: string;
    learningMode: string;
  }>;
}

const validInterfaceLangs: InterfaceLanguage[] = [
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

// Generate static params for all route combinations at build time
export async function generateStaticParams() {
  const params: Array<{
    interfaceLang: string;
    studyLang: string;
    learningMode: string;
  }> = [];

  INTERFACE_LANGUAGE_OPTIONS.forEach((interfaceLang) => {
    LEARNING_LANGUAGE_OPTIONS.forEach((studyLang) => {
      CONTENT_TYPES.forEach((learningMode) => {
        params.push({
          interfaceLang: interfaceLang.code,
          studyLang: studyLang.code,
          learningMode,
        });
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { interfaceLang, studyLang, learningMode } = await params;

  // Validate interface language
  const validatedInterfaceLang: InterfaceLanguage =
    interfaceLang &&
      validInterfaceLangs.includes(interfaceLang as InterfaceLanguage)
      ? (interfaceLang as InterfaceLanguage)
      : "en";

  // Use base SEO metadata (no content-type specific variations)
  const t = translations[validatedInterfaceLang];
  const title = t.seoTitle || t.title;
  const description = t.seoDescription || t.metaDescription;
  const keywords = t.seoKeywords || t.seoDescription || "";

  // Build canonical URL
  const baseUrl = "https://blind-typing-tutor.wordmemo.net";
  const canonical = `${baseUrl}/${interfaceLang}/${studyLang}/${learningMode}`;

  return {
    title: title || "Blind Typing Tutor - Master Touch Typing Online",
    description:
      description ||
      "Master touch typing with our free online blind typing tutor.",
    keywords,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title: title || "Blind Typing Tutor - Master Touch Typing Online",
      description:
        description ||
        "Master touch typing with our free online blind typing tutor.",
      url: canonical,
      images: ["/og-image.png"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || "Blind Typing Tutor - Master Touch Typing Online",
      description:
        description ||
        "Master touch typing with our free online blind typing tutor.",
      images: ["/og-image.png"],
    },
  };
}

export default async function LearningModePage({ params }: PageProps) {
  const { interfaceLang, studyLang, learningMode } = await params;

  // Validate learningMode
  if (!CONTENT_TYPES.includes(learningMode as ContentType)) {
    redirect(`/${interfaceLang}/${studyLang}/phrases`);
  }

  return (
    <AppContent
      params={{
        interfaceLang,
        studyLang,
        learningMode: learningMode as ContentType,
      }}
    />
  );
}
