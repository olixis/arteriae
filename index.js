var feed = require('rss-to-json');
var request = require('request');
var cheerio = require('cheerio');
var restify = require('restify');
var emitter = require('events'),
    eventEmitter = new emitter.EventEmitter();
var MAXRESULTS = 10;
var IDS = ['estadao', 'folha', 'g1', 'uol', 'elpais', 'exame', 'ig'];
var server = restify.createServer();
server.use(restify.queryParser());
module.exports.feedServer = function() {
    server.get('/', function(req, res, next) {
        selectiveFeed(req.params.jornal, req.params.categoria);
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
var selectiveFeed = function(jornal, categoria) {
    // switch case nome do jornal, default mensagem de erro jornal não definido
    switch (jornal) {
        case 'estadao':
            if (!categoria || categoria == 'brasil') {
                feed.load('http://www.estadao.com.br/rss/ultimas.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            } else if (categoria == 'esportes') {
                feed.load('http://www.estadao.com.br/rss/esportes.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            }
            break;
        case 'folha':
            if (!categoria || categoria == 'brasil') {
                feed.load('http://feeds.folha.uol.com.br/emcimadahora/rss091.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            } else if (categoria == 'esportes') {
                feed.load('http://feeds.folha.uol.com.br/folha/esporte/rss091.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            }
            break;
        case 'g1':
            if (!categoria || categoria == 'brasil') {
                feed.load('http://g1.globo.com/dynamo/brasil/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            } else if (categoria == 'esportes') {
                feed.load('http://globoesporte.globo.com/servico/semantica/editorias/plantao/feed.rss', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            }
            break;
        case 'uol':
            if (!categoria || categoria == 'brasil') {
                feed.load('http://rss.home.uol.com.br/index.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            } else if (categoria == 'esportes') {
                feed.load('http://esporte.uol.com.br/ultimas/index.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            }
            break;
        case 'elpais':
            if (!categoria || categoria == 'brasil') {
                feed.load('http://brasil.elpais.com/rss/brasil/portada.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            } else if (categoria == 'esportes') {
                feed.load('http://brasil.elpais.com/seccion/rss/deportes/', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            }
            break;
        case 'exame':
            if (!categoria || categoria == 'brasil') {
                feed.load('http://feeds.feedburner.com/EXAME-Noticias?format=xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = ['brasil', 'economia'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            } else if (categoria == 'economia') {
                feed.load('http://feeds.feedburner.com/Exame-Economia?format=xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = ['brasil', 'economia'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            }
            break;
        case 'ig':
            if (!categoria || categoria == 'brasil') {
                feed.load('http://ultimosegundo.ig.com.br/brasil/rss.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            } else if (categoria == 'esportes') {
                feed.load('http://esporte.ig.com.br/futebol/rss.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = ['brasil', 'esportes'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        console.log(rss);
                    }
                });
            }
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