var animeNews, cheerio, fs, request;
request = require('request');
fs = require('fs');
cheerio = require('cheerio');
animeNews = function() {
  var crawled;
  crawled = [];
  return new Promise(function(resolve, reject) {
    var op, so;
    op = {
      url: 'http://tinanime.com/the-loai/tin-tuc-anime',
      method: 'GET'
    };
    so = 0;
    request(op, function(err, res, body) {
      var $;
      $ = cheerio.load(body);
      $('div .item-thumbnail').map(function(index, element) {
        if (index < 3 || index > 7 && index <= 14) {
          crawled[so] = element.children[0].next.children[1].attribs;
          so++;
        }
      });
      resolve(crawled);
    });
  });
};

module.exports.animeNews = animeNews;
