/* jshint ignore:start */
const Discord = require('discord.js');
const request = require('request');

module.exports.run = async (bot, message, args) => {
    var mode_n;
    var text = message.content;
    var word = text.split(" ");
    switch (word[2]) {
        case 'std':
        case 's':
            mode_n = 0;
            break;
        case 'taiko':
        case 't':
            mode_n = 1;
            break;
        case 'ctb':
        case 'c':
            mode_n = 2;
            break;
        case 'mania':
        case 'm':
            mode_n = 3;
            break;
        default:
            mode_n = 0;
            break;
    }

    var imageURL = "http://lemmmy.pw/osusig/sig.php?colour=pink&uname=" + word[1] + "&mode=" + mode_n + "&pp=1&countryrank&onlineindicator=undefined&xpbar"
    message.channel.send({
        files: [
            {
                attachment: imageURL,
                name: "sig.png"
            }
        ]
    });

}

module.exports.help = {
    name: "osusig"
}