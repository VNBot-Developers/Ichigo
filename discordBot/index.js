/*jshint shadow: true */
/* jshint ignore:start */
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
console.log(`======================

`);
console.log(chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Discord Bot`));
console.log(`>>>>>>>>>>>>>>>>>>>>>>
`);
console.log(chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bot Is Running...`));
console.log(`<<<<<<<<<<<<<<<<<<<<<<
`);
    require('./src/index.js');