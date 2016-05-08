var querystring = require('querystring');
var request = require('request');
var cheerio = require('cheerio');
var google = require('google');
var restify = require('restify');
var emitter = require('events'),
    eventEmitter = new emitter.EventEmitter();
var MAXRESULTS = 10;
var server = restify.createServer();
server.use(restify.queryParser());
module.exports.feedServer = function() {
    server.get('/:keyword', function(req, res, next) {
        console.log(req.params);
        feed(req.params.keyword);
        eventEmitter.once('retorno', function(retorno) {
            res.header('Access-Control-Allow-Origin','*');
            res.send(retorno);
            return next();
        });
    });
    server.on("listening", function() {
        console.log("server running!");
    });
    server.listen(7171);
};
var feed = function headLinesBySite(word, l) {
    if (!Array.isArray(l) && l !== undefined) {
        console.log("por favor passe um array");
        return false;
    }
    if (l !== []) {
        links = l;
    }
    links = ["http://www.globo.com/", "http://atarde.uol.com.br/"];
    var teste = 0;
    var final = [];
    for (i = links.length - 1; i >= 0; i--) {
        findHeadlines(links[i], word.toLowerCase(), function(r, url) {
            final.push({
                url: url,
                keyword: word,
                manchetes: r
            });
            //console.log(url+" - "+r);
            teste++;
            console.log((teste / links.length) * 100 + "%");
            if (teste === links.length) {
                console.log("Concluído!");
                console.log(final);
                eventEmitter.emit('retorno', final);
            }
        });
    }
};
var findHeadlines = function findHeadlines(url, word, cb) {
    request(url, {
        timeout: 1000
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            texto = [];
            var retorno = [];
            b = $('body').text().toLowerCase();
            c = b.replace(/\s+/g, ' ');
            texto = c.split("¬");
            for (var i = texto.length - 1; i >= 0; i--) {
                if (texto[i].search(word) !== -1 && texto[i].length < 100) {
                    if (texto[i] !== "" && texto[i] !== " ") {
                        retorno.push("+" + texto[i] + "+");
                    }
                }
            }
            cb(retorno, url);
        } else {
            console.log(error);
            cb([], url);
        }
    });
};