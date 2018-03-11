/* jshint ignore:start */
const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new RichEmbed()
        .setColor("#cb0231")
        .addField("Full Name", message.author.tag)
        .addField("ID", message.author.id)
        .addField("Ngày Tạo", message.author.createdAt)
        .setThumbnail("https://static.zerochan.net/Ichigo.%28Darling.in.the.FranXX%29.full.2261892.jpg")
        .addField("Avatar", "Profile Avatar")
        .setImage(message.author.displayAvatarURL);


        message.channel.send(embed);
        return;
}

module.exports.help = {
    name: "userinfo"
}