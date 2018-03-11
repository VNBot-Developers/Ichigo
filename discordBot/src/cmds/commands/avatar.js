/* jshint ignore:start */
module.exports.run = async (bot, message, args, err) => {
    let msg = await message.channel.send("Đang Lấy Avatar....");
    let someone = message.mentions.users.first() || message.author;
    await message.channel.send(`Avatar của `+someone+` nè`,{
        files: [{
            attachment: someone.displayAvatarURL,
            name: "avatar.png",
        }]
    });
    msg.delete();
}

module.exports.help = {
    name: "avatar",
}