const TelegramApi = require('node-telegram-bot-api');
const schedule = require('node-schedule');
require('dotenv').config();

let job;
const bot = new TelegramApi(process.env.TOKEN, { polling: true });

bot.on('message', msg => {
  const { text, chat } = msg;
  bot.sendMessage(
    chat.id,
    `Ссылка на новый wordle будет присылаться каждый день, если хочешь сыграть сейчас, то - https://wordle.belousov.one/ 🤗`
  );
});

bot.onText(/\/start/, message => {
  job = schedule.scheduleJob(`0 0 9 * * *`, () => {
    bot.sendMessage(message.chat.id, 'Новый wordle - https://wordle.belousov.one/');
  });
});

bot.onText(/\/stop/, message => {
  if (job) {
    job.cancel();
  }
});
