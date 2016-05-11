var feed = require('rss-to-json');
var request = require('request');
var cheerio = require('cheerio');
var restify = require('restify');
var emitter = require('events'),
    eventEmitter = new emitter.EventEmitter();
var MAXRESULTS = 10;
var server = restify.createServer();
server.use(restify.queryParser());
module.exports.feedServer = function() {
    server.get('/', function(req, res, next) {
        //console.log(req.connection.remoteAddress);
        // console.log(req.params.jornal);
        selectiveFeed(req.params.jornal);
        eventEmitter.once('retorno', function(retorno) {
            console.log('entrou');
            res.header('Access-Control-Allow-Origin', '*');
            res.send(retorno);
            return next();
        });
    });
    server.on("listening", function() {
        console.log("server running!");
    });
    server.listen(7171);
};
var selectiveFeed = function(jornal) {
    // switch case nome do jornal, default mensagem de erro jornal não definido
    switch (jornal) {
        case 'estadao':
            feed.load('http://www.estadao.com.br/rss/ultimas.xml', function(err, rss) {
                if (err) {
                    console.log(err);
                } else {
                    rss.id = 'estadao';
                    eventEmitter.emit('retorno', rss);
                    console.log(rss);
                }
            });
            break;
        case 'folha':
            feed.load('http://feeds.folha.uol.com.br/emcimadahora/rss091.xml', function(err, rss) {
                if (err) {
                    console.log(err);
                } else {
                    rss.id = 'folha';
                    eventEmitter.emit('retorno', rss);
                    console.log(rss);
                }
            });
            break;
                case 'g1':
            feed.load('http://g1.globo.com/dynamo/brasil/rss2.xml', function(err, rss) {
                if (err) {
                    console.log(err);
                } else {
                    rss.id = 'g1';
                    eventEmitter.emit('retorno', rss);
                    console.log(rss);
                }
            });
            break;
        case 'atarde':
            feed.load('http://atarde.uol.com.br/arquivos/rss/brasil.xml', function(err, rss) {
                if (err) {
                    console.log(err);
                } else {
                    rss.id = 'atarde';
                    eventEmitter.emit('retorno', rss);
                    console.log(rss);
                }
            });
            break;
        default:
            throw new Error("Especifique um jornal que o sistema aceite");
    }
};
var findHeadlines = function(url, word, cb) {
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
            keywords = word.split(" ");
            texto = Array.from(new Set(texto));
            for (var i = texto.length - 1; i >= 0; i--) {
                for (var o = keywords.length - 1; o >= 0; o--) {
                    if (texto[i].search(keywords[o]) !== -1 && texto[i].length < 100 && keywords[o].length > 2) {
                        retorno.push(texto[i]);
                    }
                }
                if (texto[i].search(word) !== -1 && texto[i].length < 100) {
                    retorno.push(texto[i]);
                }
            }
            retorno = Array.from(new Set(retorno));
            cb(retorno, url);
        } else {
            console.log(error);
            cb([], url);
        }
    });
};