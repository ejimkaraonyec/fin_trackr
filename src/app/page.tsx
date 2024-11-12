"use client";

import { useTelegramWebApp } from "@/hooks/use-telegram-web-app";
import { useEffect } from "react";

export default function Home() {
  const webApp = useTelegramWebApp();

  useEffect(() => {
    if (webApp) {
      // Configure MainButton
      webApp.MainButton.setText("MAIN BUTTON");
      webApp.MainButton.show();

      // Example of handling button click
      const handleMainButtonClick = () => {
        webApp.MainButton.showProgress(false);
        // Add your logic here
        webApp.MainButton.hideProgress();
      };

      webApp.MainButton.onClick(handleMainButtonClick);

      return () => {
        webApp.MainButton.offClick(handleMainButtonClick);
      };
    }
  }, [webApp]);

  const userData = webApp?.initDataUnsafe.user;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-2xl font-bold mb-4">Telegram Mini App</h1>

        {userData && (
          <div className="bg-white/30 p-4 rounded-lg backdrop-blur-sm">
            <p>Welcome, {userData.first_name}!</p>
            {userData.username && <p>@{userData.username}</p>}
          </div>
        )}

        <div className="mt-8 space-y-4">
          <button
            onClick={() => webApp?.expand()}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Expand App
          </button>

          <button
            onClick={() => webApp?.close()}
            className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-lg"
          >
            Close App
          </button>
        </div>
      </div>
    </main>
  );
}
