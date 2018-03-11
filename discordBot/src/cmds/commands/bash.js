/* jshint ignore:start */
var exec = require('child_process').exec;
module.exports.run = (bot, message, args) => {
    var args = message.content.split(" ").slice(1);
    var code = args.join(" ")
    var child = exec(code);
    child.stdout.on('data', function (data) {
        message.channel.send(`\`\`\`${data}\`\`\``);
    });
    child.stderr.on('data', function (data) {
        message.channel.send(`\`\`\`${data}\`\`\``);
    });
    child.on('close', function (code) {
        message.channel.send(`\`closing code:\` ${code}`);
    });

};

module.exports.help = {
    name : "bash"
}