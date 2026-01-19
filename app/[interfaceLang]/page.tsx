import type { Metadata } from "next";
import { INTERFACE_LANGUAGE_OPTIONS } from "@/config/constants";
import type { InterfaceLanguage } from "@/translations";
import { translations } from "@/translations";
import { AppContent } from "./[studyLang]/[learningMode]/AppContent";

interface PageProps {
  params: Promise<{
    interfaceLang: string;
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { interfaceLang } = await params;

  // Validate interface language
  const validatedInterfaceLang: InterfaceLanguage =
    interfaceLang &&
      validInterfaceLangs.includes(interfaceLang as InterfaceLanguage)
      ? (interfaceLang as InterfaceLanguage)
      : "en";

  const t = translations[validatedInterfaceLang];
  const baseUrl = "https://blind-typing-tutor.wordmemo.net";
  const canonical = `${baseUrl}/${validatedInterfaceLang}`;

  return {
    title: t.seoTitle || t.title,
    description: t.seoDescription || t.metaDescription,
    keywords: t.seoKeywords || t.seoDescription || "",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title: t.seoTitle || t.title,
      description: t.seoDescription || t.metaDescription,
      url: canonical,
      images: ["/og-image.png"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seoTitle || t.title,
      description: t.seoDescription || t.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function InterfaceLangPage({ params }: PageProps) {
  const { interfaceLang } = await params;
  const validLang = INTERFACE_LANGUAGE_OPTIONS.find(
    (opt) => opt.code === interfaceLang
  );

  const validatedInterfaceLang = validLang ? interfaceLang : "en";

  // Render the app with default settings (phrases mode, same language for study)
  // This allows the homepage to be indexed
  return (
    <AppContent
      params={{
        interfaceLang: validatedInterfaceLang,
        studyLang: validatedInterfaceLang,
        learningMode: "phrases",
      }}
    />
  );
}
