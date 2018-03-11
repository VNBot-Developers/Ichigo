/* jshint ignore:start */
module.exports.run = async (bot, message, args) => {
    var args = message.content.split(" ").slice(1);
    message.channel.send(`${message.author.username} Đã tạo lượt vote \`${args.join(" ")}\`. Vote sẽ kết thúc trong vòng 30s! chọn yes or no`)
    var yes = 0;
    var no = 0;
    const votecollector = message.channel.createCollector(m => message.channel === message.channel, { time: 30000 });
    votecollector.on(`message`, m => {
        if (message.content.toLowerCase() === `no` && !message.author.id.voted) {
            no++;
            message.author.id.voted = true;
        }
        if (message.content.toLowerCase() === `yes` && !message.author.id.voted) {
            yes++;
            message.author.id.voted = true;
        }
    });
    votecollector.on(`end`, (collected, reason) => {
        if (yes > no) {
            message.channel.send(`${message.author.username}'s vote on \`${args.join(" ")}\` has ended. Yes won with ${yes} votes. No only had ${no} votes. :cry: `)
        }
        if (yes < no) {
            message.channel.send(`${message.author.username}'s vote on \`${args.join(" ")}\` has ended. No won with ${no} votes. In comparison, yes only had ${yes} votes. Pitiful. :joy: `)
        }
        if (yes == no) {
            message.channel.send(`${message.author.username}'s vote on \`${args.join(" ")}\` has ended. Yes had ${yes} votes. No had ${no} votes. We have ourselves a tie. :crossed_swords:`)
        }
    });
}

module.exports.help = {
    name: "vote"
}