var querystring = require('querystring');
var request = require('request');
var cheerio = require('cheerio');
var google = require('google');


module.exports.feed = function headLinesBySite(theme, word) {
    retorno = [];
    findAllGoogleURLs(theme, function(links) {
        for (var i = links.length - 1; i >= 0; i--) {
            findHeadlines(links[i], word, function(r,url){
               console.log(url+" - "+r);
            });
        }
    });
};
//git

var findHeadlines = function findHeadlines(url, word, cb) {
    request(url, {
        timeout: 1000
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            texto = [];
            retorno = [];
            b = $('body').text().toLowerCase();
            c = b.replace(/\s+/g, ' ');
            texto = c.split("¬");
            for (var i = texto.length - 1; i >= 0; i--) {
                if (texto[i].search(word) !== -1 && texto[i].length < 100) {
                    //console.log(texto[i]);
                    retorno.push("+"+texto[i]+"+");
                }
            }
            //console.log(retorno);
            cb(retorno,url);
        } else {
            console.log(error);
        }
    });
};


var test = function() {
    google.resultsPerPage = 11;
    var nextCounter = 0;
    google('lasanha', function(err, res) {
        if (err) console.error(err);
        for (var i = 0; i < res.links.length; ++i) {
            var link = res.links[i];
            console.log(link.href);
        }
    });
};


var findAllGoogleURLs = function(theme, cb) {
    request({
        url: "https://www.google.com/search?hl=pt-BR&q=" + theme + "&start=0&sa=N&num=10&ie=UTF-8&oe=UTF-8&gws_rd=ssl",
        method: 'GET'
    }, function(error, response, body) {
        var links = [];
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            var a = $("div.g");
            a.each(function(i, elem) {
                linkElem = $(elem).find('h3.r a');
                var qsObj = querystring.parse($(linkElem).attr('href'));
                if (qsObj['/url?q']) {
                    links.push(qsObj['/url?q']);
                }
            });
            //console.log(links);
        } else {
            console.log(error);
        }
        cb(links);
    });
};

function findAllURLs(url) {
    request(url, function(error, response, body) {
        var links = [];
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            $("a").each(function() {
                if ($(this).attr('href') !== undefined && $(this).attr('href') !== "") {
                    links.push($(this).attr('href'));
                }
            });
            console.log(links);
        } else {
            console.log(error);
        }
        return links;
    });
}