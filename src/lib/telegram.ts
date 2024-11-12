import WebApp from "@twa-dev/sdk";

declare global {
  interface Window {
    Telegram?: {
      WebApp: typeof WebApp;
    };
  }
}

export const initializeWebApp = () => {
  if (typeof window !== "undefined") {
    return window.Telegram?.WebApp || null;
  }
  return null;
};

export type TelegramWebApp = typeof WebApp;
