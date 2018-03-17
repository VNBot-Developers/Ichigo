*
	Sun Jan, 14 2018 6:00 PM
	This file is for common function & library defines. Modify it 
	following your project request.
	
*/
'use strict'

/**
 * Module dependencies.
 * @private
 */
const colors = require('colors');

/**
 * Module exports.
 * @public
 */
module.exports = {
	throwErr_s: function (obj, eInfo) {
 		//Make sure this is an error
 		if(obj instanceof Error) {
 			log(eInfo, 'ERROR');
 		}
 	}, 

 	log: function(ctx, opt) {	
 		try {
 			opt = opt.toUpperCase();
	 	} catch(e) {
	 		return console.log(('[LOGGER]::'+ctx).bgBlack);	//Make sure we don't uppercase the null-string or something like that
	 	}

		switch (opt) {
			case 'SUCCESS':
				return console.log(('[O]::'+ctx).green.bgBlack);
			break;
			case 'WARNING':
				return console.log(('[!]::'+ctx).yellow.bgBlack);				
			break;
			case 'ERROR':
				return console.log(('[X]::'+ctx).red.bgBlack);				
			break;
			default:
				// statements_def
				return console.log(('[LOGGER]::'+ctx).bgBlack);	
			break;
		}

	}
};  
