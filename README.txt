САЙТ-ПРИГЛАШЕНИЕ — ИНСТРУКЦИЯ

Что внутри:
- Адаптивный сайт для телефонов и компьютеров.
- Выбор «Хачапури и вино», «Якитория» или собственного ресторана.
- Выбор даты, времени и пожеланий.
- Отправка ответа в Telegram через защищённую Netlify Function.

ВАЖНО: Telegram-бот и Netlify пока не подключены. Для работы уведомлений нужны TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.

1. СОЗДАТЬ TELEGRAM-БОТА
- Открой Telegram и найди @BotFather.
- Отправь /newbot, задай имя и username.
- Скопируй токен. Никому его не отправляй и не вставляй в файлы сайта.

2. ПОЛУЧИТЬ CHAT ID
- Открой своего нового бота и нажми Start.
- Напиши ему любое сообщение.
- В браузере открой:
  https://api.telegram.org/botВАШ_ТОКЕН/getUpdates
- Найди в ответе "chat":{"id": ЧИСЛО ...}. Это твой TELEGRAM_CHAT_ID.
- Не публикуй ссылку с токеном и не отправляй её посторонним.

3. ОПУБЛИКОВАТЬ САЙТ
- Создай аккаунт на https://www.netlify.com/
- Создай новый сайт через Add new site -> Deploy manually и перетащи содержимое папки date-invitation (можно распаковать ZIP).
- Для функции и Telegram-уведомлений удобнее подключить GitHub: загрузи папку проекта в новый GitHub-репозиторий, затем в Netlify выбери Add new site -> Import an existing project и подключи репозиторий.
- В Netlify открой Site configuration -> Environment variables и добавь:
  TELEGRAM_BOT_TOKEN = токен от BotFather
  TELEGRAM_CHAT_ID = числовой chat id
- После добавления переменных запусти новый Deploy.

4. ПРОВЕРИТЬ
- Открой опубликованную ссылку на телефоне.
- Отправь тестовый выбор.
- Убедись, что сообщение пришло в Telegram.

БЕЗОПАСНОСТЬ
- Не вставляй токен бота в index.html, script.js или другие публичные файлы.
- Не публикуй токен в GitHub.
- Если токен случайно утёк, отзови его через BotFather и создай новый.

ИЗМЕНЕНИЯ
- Тексты и внешний вид: index.html и style.css.
- Логика формы: script.js.
- Telegram-отправка: netlify/functions/submit-invitation.js.
Telegram configuration updated.
