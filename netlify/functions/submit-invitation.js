exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return { statusCode: 500, body: "Telegram is not configured" };
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const restaurant = String(data.restaurant || "").trim().slice(0, 180);
  const date = String(data.date || "").trim();
  const time = String(data.time || "").trim();
  const wishes = String(data.wishes || "").trim().slice(0, 700);

  if (!restaurant || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return { statusCode: 400, body: "Missing or invalid fields" };
  }

  const message =
    "💌 Новый ответ на приглашение!\n\n" +
    "🍽 Ресторан: " + restaurant + "\n" +
    "📅 Дата: " + date + "\n" +
    "🕒 Время: " + time +
    (wishes ? "\n\n💬 Пожелания: " + wishes : "");

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });
    const result = await telegramResponse.json();
    if (!telegramResponse.ok || !result.ok) {
      return { statusCode: 502, body: "Telegram delivery failed" };
    }
    return { statusCode: 200, body: "OK" };
  } catch {
    return { statusCode: 502, body: "Telegram request failed" };
  }
};
