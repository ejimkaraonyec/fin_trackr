import { useEffect, useState } from "react";

import { initializeWebApp, TelegramWebApp } from "@/lib/telegram";

export const useTelegramWebApp = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);

  useEffect(() => {
    const app = initializeWebApp();
    // if (app) {
    //   setWebApp(app);
    //   app.ready();
    // }

    setWebApp(app);

    if (app) {
      app.expand(); // Expands the app by default
      app.MainButton.hide(); // Hides Telegram's default MainButton
    }
  }, []);

  return webApp;
};
