#!/usr/bin/env node

const subscriber = require('./src/subscriber')
    , fetchMails = require('./src/imap')
    , glob = require('glob')
    , path = require('path')
    , config = require('config')
    , log  = require ('ololog').configure (config.log)
    , ansi = require ('ansicolor').nice;

(async function main () {
    await subscriber.init();

    glob.sync('./plugin/*.js').forEach(function(file) {
        require(path.resolve(file));
    });

    setInterval(fetchMails, config.imap.fetchingPauseTime);
}) ();
