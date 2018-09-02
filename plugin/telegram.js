const signal = require('../src/signal')
    , storage = require('../src/subscriber')
    , Telegraf = require ('telegraf')
    , config = require('config')
    , log  = require ('ololog').configure(config.log)
    , ansi = require ('ansicolor').nice;

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
bot.start((ctx) => {
    let newSubscriber = ctx.message.from;
    storage.addSubscriber(newSubscriber);
});
bot.startPolling();

signal.emitter.on('distribute', function (message) {
    log.dim.blue('Sending Telegram signal', message.yellow);

    storage.getSubscribers().then((subscribers) => {
        subscribers.forEach(function (subscriber) {
            bot.telegram.sendMessage(subscriber, message).catch((err) => {
                err.code === 403 ? storage.removeSubscriber(subscriber) : log.bright.red.error(err);
            });
        });
    });
});
