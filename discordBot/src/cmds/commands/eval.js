/* jshint ignore:start */
module.exports.run = async (bot, message, args) => {
var args = message.content.split(" ").slice(1);
var code = args.join(" ");
try {
    var evaled = eval(code);
} catch (err) {
    return message.channel.send(`:thumbsdown:\`\`\`xl\n'${code}' failed with error: ${err} \n\`\`\``);
}
evaled = require('util').inspect(evaled);
try {
    if (evaled.length > 2000) {
        return message.channel.send(`:thumbsdown:\`\`\`xl\n'${code}' iz dat more than 2000 char ? ohboy.\`\`\``);
    } else {
        return message.channel.send(`:thumbsup:\`\`\`xl\n${evaled} \n\`\`\``);
    }
} catch (err) { }

}
module.exports.help = {
    name: "eval"
}