/* jshint ignore:start */
module.exports.run = async (bot, message, args) => {
    const ping = await message.channel.send("Pingg!");
    ping.edit(`:mega: Pang. - My ping: **${Math.round(bot.ping)}ms**`)
}

module.exports.help = {
    name: "ping"
}