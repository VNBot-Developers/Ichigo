var animeHot, cheerio, fs, request;
request = require('request');
fs = require('fs');
cheerio = require('cheerio');
animeHot = function() {
  var crawled;
  crawled = [];
  return new Promise(function(resolve, reject) {
    var op, so;
    op = {
      url: 'http://vuighe.net',
      method: 'GET'
    };
    so = 0;
    request(op, function(err, res, body) {
      var $;
      $ = cheerio.load(body);
      $('section.tray.rank .tray-content.index .tray-item.index').map(function(index, element) {
        crawled[so] = element.children[0].next.children[1].attribs;
        so++;
      });
      resolve(crawled);
    });
  });
};

module.exports.animeHot = animeHot;
