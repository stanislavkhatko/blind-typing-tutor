import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { VALID_INTERFACE_LANGUAGES } from "@/config/constants";
import { InterfaceLanguage } from "@/translations";

export default async function RootPage() {
  // Detect browser language from Accept-Language header
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  // Parse accept-language header (format: "en-US,en;q=0.9,es;q=0.8")
  const preferredLanguages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code] = lang.trim().split(";");
      // Extract base language code (e.g., "en" from "en-US")
      return code.split("-")[0].toLowerCase();
    })
    .filter(Boolean);

  // Find first matching supported language
  const detectedLang = preferredLanguages.find((lang) =>
    VALID_INTERFACE_LANGUAGES.includes(lang as InterfaceLanguage),
  );

  const interfaceLang = detectedLang || "en";

  redirect(`/${interfaceLang}/${interfaceLang}/words`);
}
