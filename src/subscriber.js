const storage = require('node-persist')
    , config = require('config')
    , log  = require ('ololog').configure (config.log);

const subscriber = storage.create({ dir: config.subscriber.directory });

module.exports = {
    init: async function() {
        await subscriber.init()
    },
    addSubscriber: async function(newSubscriber) {
        await subscriber.set(newSubscriber.id.toString(), newSubscriber);
        log.dim.blue(newSubscriber.username, 'has subscribed');
    },
    removeSubscriber: async function(subscriberId) {
        await subscriber.del(subscriberId);
        log.dim.blue(subscriberId, 'has been removed');
    },
    getSubscribers: async function () {
        return await subscriber.keys();
    }
};
