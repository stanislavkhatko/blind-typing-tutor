import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { headers } from "next/headers";
import { INTERFACE_LANGUAGE_OPTIONS } from "@/config/constants";
import { getTextDirection, getLanguageTag } from "@/utils/textDirection";
import type { InterfaceLanguage } from "@/translations";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blind-typing-tutor.wordmemo.net"),
  title: "Touch Typing Trainer | Blind Typing Practice Online",
  description:
    "Master touch typing with our free online blind typing tutor. Practice on 28+ keyboard layouts with real-time WPM tracking, accuracy stats, and visual keyboard. Learn typing without looking at the keyboard.",
  keywords:
    "touch typing, blind typing, typing tutor, keyboard trainer, typing practice, typing speed, WPM, typing accuracy, typing trainer, online typing practice",
  authors: [{ name: "Stanislav Khatko" }],
  openGraph: {
    type: "website",
    url: "https://blind-typing-tutor.wordmemo.net",
    title: "Touch Typing Trainer | Blind Typing Practice Online",
    description:
      "Master touch typing with our free online blind typing tutor. Practice on 28+ keyboard layouts with real-time WPM tracking, accuracy stats, and visual keyboard. Learn typing without looking at the keyboard.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Touch Typing Trainer | Blind Typing Practice Online",
    description:
      "Master touch typing with our free online blind typing tutor. Practice on 28+ keyboard layouts with real-time WPM tracking, accuracy stats, and visual keyboard. Learn typing without looking at the keyboard.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Extract interface language from URL path
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Parse interface language from path (format: /[interfaceLang]/...)
  const pathSegments = pathname.split("/").filter(Boolean);
  const interfaceLangCode = pathSegments[0] || "en";

  // Validate interface language
  const validLang = INTERFACE_LANGUAGE_OPTIONS.find(
    (opt) => opt.code === interfaceLangCode,
  );
  const validatedLang = (
    validLang ? interfaceLangCode : "en"
  ) as InterfaceLanguage;

  // Get language attributes
  const lang = getLanguageTag(validatedLang);
  const dir = getTextDirection(validatedLang);

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
