/* jshint ignore:start */
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let mute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0])

if (message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES"))
    if (!mute) return message.channel.sendMessage('Bạn phải tag ai đó trước như là **@username** hoặc **@ID**!');

if (mute.id === message.author.id) return message.channel.sendMessage("Bạn không thể mute chính mình!");
if (mute.highestRole.position >= message.member.highestRole.position) return message.channel.sendMessage("Người này có quyền cao hơn bạn đấy!")

    let role = message.guild.roles.find(r => r.name === "Ichigo Muted");
if (!role) {
    try {
        role = await message.guild.createRole({
            name: "Ichigo Muted",
            color: "#000000",
            permissions: []
        });

        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(role, {
                SEND_MESSAGES: false,
            })
        });
    } catch (err) {
        console.log(err.stack)
    }
}
if (mute.roles.has(role.id)) return message.channel.sendMessage("User này đã bị chặn từ trước!")
await mute.addRole(role);
message.channel.sendMessage("Đã chặn user này :3");
return;


}

module.exports.help = {
    name: "mute"
}
     