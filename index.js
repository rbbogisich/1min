const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const port = 3000;

const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

let userBalances = {};
let countdowns = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Добро пожаловать в игру-фармилку! Нажмите кнопку СТАРТ, чтобы начать фармить монетки.', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'СТАРТ', callback_data: 'start' }]
      ]
    }
  });
});

bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const data = callbackQuery.data;

  if (data === 'start') {
    if (!countdowns[chatId]) {
      bot.sendMessage(chatId, 'Фарминг начался! Подождите 1 минуту...');
      countdowns[chatId] = setTimeout(() => {
        bot.sendMessage(chatId, 'Время вышло! Нажмите кнопку ЗАБРАТЬ МОНЕТКИ.', {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'ЗАБРАТЬ МОНЕТКИ', callback_data: 'collect' }]
            ]
          }
        });
      }, 60000);
    } else {
      bot.sendMessage(chatId, 'Вы уже начали фарминг! Подождите завершения текущего.');
    }
  } else if (data === 'collect') {
    if (countdowns[chatId]) {
      clearTimeout(countdowns[chatId]);
      delete countdowns[chatId];
      userBalances[chatId] = (userBalances[chatId] || 0) + 10;
      bot.sendMessage(chatId, `Вы получили 10 монеток! Ваш баланс: ${userBalances[chatId]} монеток.`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'СТАРТ', callback_data: 'start' }]
          ]
        }
      });
    } else {
      bot.sendMessage(chatId, 'Вы ещё не начали фарминг! Нажмите кнопку СТАРТ, чтобы начать.');
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
