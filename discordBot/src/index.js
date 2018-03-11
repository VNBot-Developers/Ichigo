/*jshint shadow: true */
/* jshint ignore:start */
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const bot = new Discord.Client({
    disableEveryone: true
});
const config = require('../../config.json');
const chalk = require('chalk');
const prefix = config.prefix;
const waifu = require('./waifu.json');
const fs = require('fs');
const queue = new Map();
const requireDir = require('require-dir');
bot.funcs = requireDir('./funcs/');
bot.commands = new Discord.Collection();
bot.funcs.loadcmds(bot, Discord, fs);

bot.on("ready", async () => {
    console.log(`Bot name = ` + chalk.bold.magenta(`${bot.user.username}`));
    console.log(`prefix = ` + chalk.bold.red(`${config.prefix}`));
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setGame(`${waifu.waifu_w}`);
    // Create Invite link
    // contact me fb.com/0x80f700
    try {
        let link = await bot.generateInvite([8]);
        console.log(chalk.bold.cyan(link));
    } catch (err) {
        console.log(err.stack);
    }
});

bot.on('error', console.error);

bot.on('disconnect', () => console.log('Reconnect now...'));

bot.on('reconnecting', () => console.log('I am reconnecting now!'))


bot.on("message", async message => {
    if (message.channel.type == 'dm' || message.channel.type == "group" || message.author == bot.user) return;

    //Some Shitty Command :3 It's important and not important :x
    let args = message.content.split(" ");
    let command = args[0];
    let mArgs = args.slice(1);
    const serverQueue = queue.get(message.guild.id);
    const youtube = new YouTube('AIzaSyBHVHTh5N9tXOV1KrlCEvijoUfWOVeKLEc');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';

    //
    if (!command.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);
    //INVITE SHIT
    if (command === `${prefix}invite`) {
        message.channel.send({
            "embed": {
                "description": "**Hi Everyone :3 Wanna Invite me ? **\nHere is the link :3 => [**Click me**](https://discordapp.com/oauth2/authorize?client_id=414544848708698112&permissions=8&scope=bot)\n",
                "color": 12455248,
                "thumbnail": {
                    "url": "https://static.zerochan.net/Zero.Two.%28Darling.in.the.FranXX%29.full.2249174.jpg"
                },
                "footer": {
                    "text": "Zero Two <3 "
                },
                "author": {
                    "name": "Zero Two Invite Link",
                    "icon_url": "https://i1.wp.com/www.n2anime.com/wp-content/uploads/2018/01/Zero-two-Darling-in-the-franxx-characters-002-N2anime.png"
                }
            }
        })
        return;
    };
    //MUSIC _ START
    if (command === `${prefix}play`) {
        // var mArgs = message.content.split(' ');
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel)
            return message.channel.send(`:x: Bạn cần phải ở trong voice channel để sử dụng!`);
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
            return
            message.channel.send(`Ichigo Không thể kết nối tới voice channel\nHãy chắc chắn 002 có đủ quyền để kết nối!`);
        }
        if (!permissions.has('SPEAK')) {
            return
            message.channel.send(`Ichigo Không thể kết nối tới voice channel\nHãy chắc chắn 002 có đủ quyền để kết nối!`);
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    message.channel.send(`
__**Chọn bài hát:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Nhập số theo thứ tự từ 1 tới 10
					`);
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return message.channel.send('Số không hợp lệ sẽ hủy chọn video');
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return message.channel.send('🆘 Không tìm thấy kết quả nào.');
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
    } else if (command === `${prefix}skip`) {
        if (!message.member.voiceChannel) return message.channel.send('Bạn không ở trong voice channel!');
        if (!serverQueue) return message.channel.send('Bài tiếp theo không có trong list.');
        serverQueue.connection.dispatcher.end('đã dùng lệnh skip!');
        return undefined;
    } else if (command === `${prefix}stop`) {
        if (!message.member.voiceChannel) return message.channel.send('Bạn không ở trong voice channel!');
        if (!serverQueue) return message.channel.send('Chưa có bài hát nào để dừng lại.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Đã dừng!');
        return undefined;
    } else if (command === `${prefix}volume`) {
        if (!message.member.voiceChannel) return message.channel.send('Bạn không ở trong voice channel!');
        if (!serverQueue) return message.channel.send('Chưa có bài hát nào cả.');
        if (!args[1]) return message.channel.send(`Âm lượng hiện tại là: **${serverQueue.volume}**`);
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        return message.channel.send(`Âm lượng hiện tại là: **${args[1]}**`);
    } else if (command === `${prefix}np`) {
        if (!serverQueue) return message.channel.send('Chưa có bài hát nào cả.');
        return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
    } else if (command === `${prefix}queue`) {
        if (!serverQueue) return message.channel.send('Chưa có bài hát nào cả.');
        return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Đang Phát:** ${serverQueue.songs[0].title}
		`);
    } else if (command === `${prefix}pause`) {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return message.channel.send('⏸ Đã tạm dừng!');
        }
        return message.channel.send('Không có video nào đang chạy!');
    } else if (command === `${prefix}resume`) {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send('▶ Tiếp tục!');
        }
        return message.channel.send('There is nothing playing.');
    }

    return undefined;
//MUSIC _ END
});


///SHIT FUNCTION FOR MUSIC


async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(`I could not join the voice channel: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
    }
    return undefined;
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}

///

///
// Login :3 
bot.login(config.token_discord);
//
