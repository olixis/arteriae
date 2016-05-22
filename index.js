var feed = require('rss-to-json');
var request = require('request');
var cheerio = require('cheerio');
var restify = require('restify');
var emitter = require('events'),
    eventEmitter = new emitter.EventEmitter();
var MAXRESULTS = 10;
var IDS = ['estadao', 'g1', 'uol', 'elpais', 'exame', 'ig'];
var server = restify.createServer();
server.use(restify.queryParser());
server.use(function(req, res, next) {
    req.connection.setTimeout(1 * 3000);
    res.connection.setTimeout(1 * 3000);
    next();
});
module.exports.feedServer = function() {
    server.get('/', function(req, res, next) {
        console.log(req.connection.remoteAddress + " " + req.params.jornal + " " + req.params.categoria);
        selectiveFeed(req.params.jornal, req.params.categoria);
        eventEmitter.once('retorno', function(retorno) {
            res.header('Access-Control-Allow-Origin', '*');
            res.send(retorno);
            eventEmitter.removeListener('retorno', function() {});
            return next();
        });
    });
    server.get('/ids', function(req, res, next) {
        console.log(req.connection.remoteAddress + " ids");
        res.send(IDS);
        return next();
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
            var categoriasEstadao = ['Brasil', 'Esportes', 'Política', 'Arte e lazer', 'Cidades', 'Saúde', 'Educação', 'Economia', 'Ciência','Internacional'];
            if (!categoria || categoria == 'brasil') {
                feed.load('http://www.estadao.com.br/rss/ultimas.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'Brasil';
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'esportes') {
                feed.load('http://www.estadao.com.br/rss/esportes.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'politica') {
                feed.load('http://www.estadao.com.br/rss/politica.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'arteelazer') {
                feed.load('http://www.estadao.com.br/rss/arteelazer.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'cidades') {
                feed.load('http://www.estadao.com.br/rss/cidades.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'saude') {
                feed.load('http://www.estadao.com.br/rss/saude.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'educacao') {
                feed.load('http://www.estadao.com.br/rss/educacao.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'economia') {
                feed.load('http://www.estadao.com.br/rss/economia.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'ciencia') {
                feed.load('http://www.estadao.com.br/rss/ciencia.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'internacional') {
                feed.load('http://www.estadao.com.br/rss/internacional.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            }
            break;
        case 'g1':
            var categoriasG1 = ['brasil', 'esportes'];
            if (!categoria || categoria == 'brasil') {
                feed.load('http://g1.globo.com/dynamo/brasil/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'esportes') {
                feed.load('http://globoesporte.globo.com/servico/semantica/editorias/plantao/feed.rss', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        // console.log(rss);
                    }
                });
            }
            break;
        case 'uol':
            var categoriasUol = ['brasil', 'economia'];
            if (!categoria || categoria == 'brasil') {
                feed.load('http://rss.uol.com.br/feed/noticias.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = categoriasUol;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'economia') {
                feed.load('http://rss.uol.com.br/feed/economia.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = ['brasil', 'economia'];
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        //console.log(rss);
                    }
                });
            }
            break;
        case 'elpais':
            var categoriasElpais = ['brasil', 'esportes'];
            if (!categoria || categoria == 'brasil') {
                feed.load('http://brasil.elpais.com/rss/brasil/portada.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = categoriasElpais;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'esportes') {
                feed.load('http://brasil.elpais.com/seccion/rss/deportes/', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasElpais;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        // console.log(rss);
                    }
                });
            }
            break;
        case 'exame':
            var categoriasExame = ['brasil', 'economia'];
            if (!categoria || categoria == 'brasil') {
                feed.load('http://feeds.feedburner.com/EXAME-Noticias?format=xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = categoriasExame;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'economia') {
                feed.load('http://feeds.feedburner.com/Exame-Economia?format=xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasExame;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        // console.log(rss);
                    }
                });
            }
            break;
        case 'ig':
            var categoriasIg = ['brasil', 'esportes'];
            if (!categoria || categoria == 'brasil') {
                feed.load('http://ultimosegundo.ig.com.br/brasil/rss.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = categoriasIg;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'esportes') {
                feed.load('http://esporte.ig.com.br/futebol/rss.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasIg;
                    if (err) {
                        console.log(err);
                    } else {
                        eventEmitter.emit('retorno', rss);
                        // console.log(rss);
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