const exchange = require('./exchange')
    , signal = require('./signal')
    , _ = require('lodash')
    , imap = require('imap-riyo')
    , config = require('config')
    , log  = require ('ololog').configure (config.log)
    , ansi = require ('ansicolor').nice;

const inversePairs = _.invert(config.exchange.pairs);

var extractSymbol = function(text) {
    let words = text.split(' ');
    for(var i=0; i<words.length; i++) {
        let word = words[i];
        if(_.includes(inversePairs, word)) {
            let symbol = config.exchange.pairs[word];
            return symbol;
        }
    }
};

module.exports = function() {
    new imap(config.imap).on('success', async function (result) {
        if(result.status) {
            result.data.forEach(async (mail) => {
                try {
                    let message = _.replace(mail.subject, 'TradingView Alert: ', '');
                    let symbol = extractSymbol(message);
                    if(symbol === undefined)
                        throw Error('No valid pair found for given TradingView alert: ' + message);
                    let lastPrice = await exchange.getTickerPrice(symbol);
                    message = message + ' Price: ' + lastPrice;
                    signal.distribute(message);
                }
                catch (e) {
                    log.bright.red.error(e.constructor.name, e.message);
                }
            });
        }
    });
};
