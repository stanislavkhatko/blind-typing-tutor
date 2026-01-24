import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { AppContent } from "./AppContent";
import { SEOContent } from "./SEOContent";
import type { ContentType } from "@/utils/url";
import {
  INTERFACE_LANGUAGE_OPTIONS,
  LEARNING_LANGUAGE_OPTIONS,
} from "@/config/constants";
import { generatePageMetadata } from "@/utils/metadata";

const CONTENT_TYPES: ContentType[] = ["words", "phrases", "custom"];

interface PageProps {
  params: Promise<{
    interfaceLang: string;
    studyLang: string;
    learningMode: string;
  }>;
}

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { interfaceLang, studyLang, learningMode } = await params;
  return generatePageMetadata({
    interfaceLang,
    studyLang,
    learningMode,
    robots: {
      index: true,
      follow: true,
    },
  });
}

export default async function LearningModePage({ params }: PageProps) {
  const { interfaceLang, studyLang, learningMode } = await params;

  // Validate interfaceLang
  const validInterfaceLang = INTERFACE_LANGUAGE_OPTIONS.find(
    (opt) => opt.code === interfaceLang
  );
  if (!validInterfaceLang) {
    notFound();
  }

  // Validate studyLang
  const validStudyLang = LEARNING_LANGUAGE_OPTIONS.find(
    (opt) => opt.code === studyLang
  );
  if (!validStudyLang) {
    notFound();
  }

  // Validate learningMode
  if (!CONTENT_TYPES.includes(learningMode as ContentType)) {
    redirect(`/${interfaceLang}/${studyLang}/phrases`);
  }

  return (
    <>
      <AppContent
        params={{
          interfaceLang,
          studyLang,
          learningMode: learningMode as ContentType,
        }}
      />
      <SEOContent
        interfaceLang={interfaceLang}
        studyLang={studyLang}
        learningMode={learningMode as ContentType}
      />
    </>
  );
}
