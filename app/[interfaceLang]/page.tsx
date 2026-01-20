import type { Metadata } from "next";
import { INTERFACE_LANGUAGE_OPTIONS } from "@/config/constants";
import { generatePageMetadata } from "@/utils/metadata";
import { AppContent } from "./[studyLang]/[learningMode]/AppContent";

interface PageProps {
  params: Promise<{
    interfaceLang: string;
  }>;
}

/**
 * Generate static params for all interface languages
 * This ensures all language homepages are pre-rendered and indexable
 */
export async function generateStaticParams() {
  return INTERFACE_LANGUAGE_OPTIONS.map((lang) => ({
    interfaceLang: lang.code,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { interfaceLang } = await params;
  return generatePageMetadata({
    interfaceLang,
    robots: {
      index: true,
      follow: true,
    },
  });
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
