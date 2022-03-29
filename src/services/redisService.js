const redis = require('redis');
const config = require('../../config.json');
const Singleton = (function () {
    var chatDbClient;
    var installationDb;
    chatDbClient = redis.createClient({
        host: config.REDIS.HOST,
        port: config.REDIS.PORT,
        db: Number(config.REDIS.DATABASES.CHAT_DB)
    });
    installationDb = redis.createClient({
        host: config.REDIS.HOST,
        port: config.REDIS.PORT,
        db: Number(config.REDIS.DATABASES.INSTALLATION_ID_DB)
    });
    function createChatDbClient() {
        chatDbClient.on('close', function () {
            console.log('CLOSED event called.');
        })
        return chatDbClient;
    }
    function createInstallationDbClient() {
        installationDb.on('close', function () {
            console.log('CLOSED event called.');
        })
        return installationDb;
    }
    return {
        getChatDbClient: function () {
            if (!chatDbClient) {
                chatDbClient = createChatDbClient();
            }
            return chatDbClient;
        },
        getInstallationDbClient: function () {
            if (!installationDb) {
                installationDb = createInstallationDbClient();
            }
            return installationDb;
        }
    };
})();
function db_chat_getValue(key) {
    return new Promise((resolve) => {
        const client = Singleton.getChatDbClient();
        client.get(key, function (err, reply) {
            resolve(reply); ''
        })
    })
}
function db_installation_getValue(key) {
    return new Promise((resolve) => {
        const client = Singleton.getInstallationDbClient();
        client.get(key, function (err, reply) {
            resolve(reply);
        });
    });
}
module.exports = {
    Singleton,
    db_installation_getValue,
    db_chat_getValue
}
