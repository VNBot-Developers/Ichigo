/*jshint shadow: true */
/* jshint ignore:start */
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Hãy update node của bạn.");
const chalk = require('chalk');
const fs = require('fs');
const readlineSync = require('readline-sync');
const moment = require('moment');
var login = {};
var bot = () => {
    console.log(chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]
             === > Welcome to Ichigo bot < ===`));
    console.log(chalk.red(`1) Facebook Bot (User)`)),
console.log(chalk.blue(`2) Discord Bot`)),
console.log(chalk.yellow(`3) Telegram Bot`)),
console.log(chalk.magenta(`4) Facebook Bot (PAGE [WORKING IN PROCESS])`)),
console.log(`{Lưu ý chỉ nhập số (1 hoặc 2 hoặc 3)}`);
    var choose = readlineSync.question('Select : ');
    if(choose == '1'){
        console.log(`Bạn đã chọn Facebook Bot (User)!`);
    } else if(choose == '2') {
        console.log(`======================
Bạn đã chọn bot Discord!`);
        require(`./discordBot/index.js`);
    } else if(choose == '3') {
        console.log(`Bạn đã chọn bot Telegram!`);
        require(`./telegrambot/index.js`)
    } else {
        console.log(`Lựa chọn này không tồn tại!`)
    }
}

bot();