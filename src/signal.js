const event = require('events')
    , config = require('config')
    , log  = require ('ololog').configure (config.log)
    , ansi = require ('ansicolor').nice;

const emitter = new event();

module.exports = {
    emitter: emitter,
    distribute: function (message) {
        emitter.emit('distribute', message);
        log.bright.green(message);
    }
};