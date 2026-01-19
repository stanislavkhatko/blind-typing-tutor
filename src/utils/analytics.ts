/**
 * Google Analytics 4 (GA4) Integration Utility
 */

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, eventParams?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
    GAManifest?: boolean;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

export const initGA = () => {
  if (typeof window === "undefined" || window.GAManifest) return;

  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false // We will handle page views manually
        });
    `;
  document.head.appendChild(script2);

  window.GAManifest = true;
};

export const trackPageView = (path: string, title: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
    });
  }
};

export const trackSettingsChange = (settingName: string, value: string | boolean) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "settings_change", {
      setting_name: settingName,
      setting_value: value,
    });
  }
};
