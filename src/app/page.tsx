"use client";

import { useTelegramWebApp } from "@/hooks/use-telegram-web-app";
import { useEffect, useState } from "react";

export default function Home() {
  const webApp = useTelegramWebApp();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (webApp) {
      // Configure MainButton as navigation trigger
      webApp.MainButton.setText("MENU");
      webApp.MainButton.show();

      const handleMainButtonClick = () => {
        setIsNavOpen((prev) => !prev);
        if (!isNavOpen) {
          webApp.MainButton.setText("CLOSE MENU");
        } else {
          webApp.MainButton.setText("MENU");
        }
      };

      webApp.MainButton.onClick(handleMainButtonClick);

      return () => {
        webApp.MainButton.offClick(handleMainButtonClick);
      };
    }
  }, [webApp, isNavOpen]);

  const userData = webApp?.initDataUnsafe.user;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Main content with bottom padding to avoid MainButton overlap */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm p-24 pb-32">
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
        </div>
      </div>

      {/* Navigation Menu (slides up when MainButton is clicked) */}
      {isNavOpen && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm transform transition-transform duration-300 pb-20">
          <div className="max-w-5xl mx-auto p-4">
            <ul className="space-y-4">
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                  Home
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                  Profile
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                  Settings
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </main>
  );
}
