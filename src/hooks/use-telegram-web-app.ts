import { useEffect, useState } from "react";

import { initializeWebApp, TelegramWebApp } from "@/lib/telegram";

export const useTelegramWebApp = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);

  useEffect(() => {
    const app = initializeWebApp();
    if (app) {
      setWebApp(app);
      app.ready();
    }
  }, []);

  return webApp;
};
