const TelegramApi = require('node-telegram-bot-api');
const schedule = require('node-schedule');
require('dotenv').config();

let job;
const bot = new TelegramApi(process.env.TOKEN, { polling: true });
const reminderHour = 6;
const reminderMinutes = 50;

bot.on('message', msg => {
  const { text, chat } = msg;
  bot.sendMessage(
    chat.id,
    `Ссылка на новый wordle будет присылаться каждый день в ${
      reminderHour + 3
    }:${reminderMinutes}, если хочешь сыграть сейчас, то - https://wordle.belousov.one/ 🤗`
  );
});

bot.onText(/\/start/, message => {
  job = schedule.scheduleJob(`${reminderMinutes} ${reminderHour} * * 0-6`, () => {
    bot.sendMessage(message.chat.id, 'Новый wordle - https://wordle.belousov.one/');
  });
});

bot.onText(/\/stop/, message => {
  if (job) {
    job.cancel();
  }
});
