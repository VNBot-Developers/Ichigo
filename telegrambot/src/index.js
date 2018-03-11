/* jshint ignore:start */
const TelegramBot = require('node-telegram-bot-api');
const config = require('../../config.json');
const token = config.token_telegram;
const prefix = config.prefix;
const client = new TelegramBot(token, {
    polling: true
});
const requireDir = require('require-dir');


client.on('message', async message => {
    //I HATE THIS SHIT PLEPLE PLEEx
    if (message.text === `${prefix}start`) {
        client.sendMessage(message.chat.id, "Chào bạn :3 mình có thể giúp gì không ạ")
    }
    if (message.text === `${prefix}ping`) { 
        client.sendMessage(message.chat.id, "Pong!!");
    }

});