/* jshint ignore:start */
const request = require('request');
const key = require('../../../../config.json').osukey;
const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    var text = message.content;
    var word = text.split(" ");
    if(word[1] === "") return message.channel.send('Vui lòng nhập tên player');
    var json, mode_n, data;
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
    request('https://osu.ppy.sh/api/get_user?k=' + key + '&u=' + word[1] + '&m=' + mode_n, function (error, response, body) {
        json = body;
        data = JSON.parse(json);
        var acc = data[0].accuracy;
// lập trình đéo khác gì một trò chơi lắp ghép 
        var embed = new RichEmbed()
            .setAuthor('osu! ' + data[0].username +' Info')
            .setColor(0xFF1A8C)
            .setThumbnail('https://a.ppy.sh/' + data[0].user_id)
            .addField('**Total PP**', data[0].pp_raw + ' PP')
            .addField('**Hit Accuracy**', (data[0].accuracy).substr(0, 5) + '%')
            .addField('**Playcount**', data[0].playcount)
            .addField('Rank', '#' + data[0].pp_rank)
            .addField(data[0].country + ' Rank', '#' + data[0].pp_country_rank);

        message.channel.send({ embed });
    });
}

module.exports.help = {
    name:"osuinfo"
}