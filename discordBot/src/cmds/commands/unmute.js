/* jshint ignore:start */
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bạn không có quyền sử dụng!")

    let mute = message.mentions.members.first() || message.guild.member.gets(args[0]);
    if(!mute) 
    return message.channel.send('Bạn phải tag ai đó trước như là **@username** hoặc **@ID**!')
    let role = message.guild.roles.find(r => r.name === "Ichigo Muted");

    if(!role || !mute.roles.has(role.id)) return message.channel.send("User này chưa bị chặn!");
    await mute.removeRole(role);
    message.channel.send("Đã gỡ chặn :3");
};

module.exports.help = {
    name : "unmute"
}