/* jshint ignore:start */
const fs = require('fs');
var waifu = require('../../waifu.json')
module.exports.run = async (bot, message, args) => {
    let route = Math.round(Math.random() * 5);
    if (route == 1) {
        message.channel.sendMessage(`**Được thôi, Mình sẽ làm waifu của bạn**`)
        waifu = {
            waifu_w: message.author.username
        }
        fs.writeFile('./src/waifu.json', JSON.stringify(waifu), err => {
            if (err) throw err;
        });
        return;
    } else if (route > 2) {
        message.channel.sendMessage(`**Xin lỗi ạ, tớ đang hẹn hò rồi**`)
        return;
    }
};

module.exports.help = {
    name : "waifu"
}