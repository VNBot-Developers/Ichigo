/* jshint ignore:start */
module.exports = (bot, Discord, fs) => {
    bot.commands = new Discord.Collection();
    fs.readdir('./discordBot/src/cmds/commands' + '', (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        jsfiles.forEach((f, i) => {
            let props = require(`../cmds/commands/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });

    fs.readdir('./discordBot/src/cmds/osu' + '', (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        jsfiles.forEach((f, i) => {
            let props = require(`../cmds/osu/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });
}