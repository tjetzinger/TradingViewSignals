const ccxt = require('ccxt')
    , config = require('config')
    , log  = require ('ololog').configure (config.log)
    , ansi = require ('ansicolor').nice;

const exchange = new ccxt[config.exchange.id](config.exchange.rate);

module.exports = {
    getTickerPrice: async function (symbol) {
        let ticker = await exchange.fetchTicker(symbol);
        return ticker.last;
    }
};
