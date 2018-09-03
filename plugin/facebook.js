const signal = require('../src/signal')
    , config = require('config')
    , log  = require ('ololog').configure(config.log)
    , ansi = require ('ansicolor').nice;

signal.emitter.on('distribute', function (message) {
    //log.dim.blue('Sending Facebook signal', message.yellow);
});
