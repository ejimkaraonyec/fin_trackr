import { useEffect, useState } from "react";

import { initializeWebApp, TelegramWebApp } from "@/lib/telegram";

export const useTelegramWebApp = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);

  useEffect(() => {
    const app = initializeWebApp();
    if (app) {
      setWebApp(app);
      app.ready();

      app.expand(); // Expand the app by default for better visibility
      app.MainButton.hide(); // Hide the MainButton since we're using custom navigation
    }
  }, []);

  return webApp;
};
