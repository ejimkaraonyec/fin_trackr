import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chat_id");
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!chatId || !token) {
    return NextResponse.json(
      { error: "Missing chat_id or bot token" },
      { status: 400 }
    );
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "Tap 'Open' to launch the financial management app.",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Open", web_app: { url: "t.me/fin_trackr_bot/mini" } }],
        ],
      },
    }),
  });

  if (response.ok) {
    return NextResponse.json({ message: "Launch button sent successfully!" });
  } else {
    const error = await response.json();
    return NextResponse.json({ error }, { status: response.status });
  }
}
