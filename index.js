var feed = require('rss-to-json');
var request = require('request');
var cheerio = require('cheerio');
var restify = require('restify');
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
        console.log(req.connection.remoteAddress + " " + req.params.jornal + " " + req.params.categoria +" " + new Date());
        res.header('Access-Control-Allow-Origin', '*');
        selectiveFeed(req.params.jornal, req.params.categoria, res);
        return next();
    });
    server.get('/ids', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        console.log(req.connection.remoteAddress + " ids"+" " + new Date());
        res.send(IDS);
        return next();
    });
    server.get('/home', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        console.log(req.connection.remoteAddress + " home"+" " + new Date());
        feed.load('https://news.google.com.br/news?cf=all&hl=pt-BR&pz=1&ned=pt-BR_br&output=rss', function(err, rss) {
            rss.ids = IDS;
            if (err) {
                console.log(err);
            } else {
                res.send(rss);
            }
        });
        return next();
    });
    server.on("listening", function() {
        console.log("server running!");
    });
    server.listen(7171);
};
var selectiveFeed = function(jornal, categoria, res) {   
    switch (jornal) {
        case 'estadao':
            var categoriasEstadao = ['últimas', 'esportes', 'política', 'saúde', 'educação', 'economia', 'internacional'];
            if (!categoria || categoria == 'últimas') {
                feed.load('http://www.estadao.com.br/rss/ultimas.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'últimas';
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
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
                        res.send(rss);
                    }
                });
            } else if (categoria == 'política') {
                feed.load('http://www.estadao.com.br/rss/politica.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'saúde') {
                feed.load('http://www.estadao.com.br/rss/saude.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'educação') {
                feed.load('http://www.estadao.com.br/rss/educacao.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        //console.log(rss);
                    }
                });
            } else if (categoria == 'economia') {
                feed.load('http://economia.estadao.com.br/rss/economia.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasEstadao;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
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
                        res.send(rss);
                        //console.log(rss);
                    }
                });
            }
            break;
        case 'g1':
            var categoriasG1 = ['brasil', 'esportes', 'política', 'carros', 'ciência', 'emprego', 'economia', 'educação', 'loterias', 'mundo', 'natureza', 'tecnologia', 'turismo'];
            if (!categoria || categoria == 'brasil') {
                feed.load('http://g1.globo.com/dynamo/brasil/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
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
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'política') {
                feed.load('http://g1.globo.com/dynamo/politica/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'carros') {
                feed.load('http://g1.globo.com/dynamo/carros/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'ciência') {
                feed.load('http://g1.globo.com/dynamo/ciencia-e-saude/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'emprego') {
                feed.load('http://g1.globo.com/dynamo/concursos-e-emprego/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'economia') {
                feed.load('http://g1.globo.com/dynamo/economia/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'educação') {
                feed.load('http://g1.globo.com/dynamo/educacao/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'loterias') {
                feed.load('http://g1.globo.com/dynamo/loterias/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'mundo') {
                feed.load('http://g1.globo.com/dynamo/mundo/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'música') {
                feed.load('http://g1.globo.com/dynamo/musica/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'natureza') {
                feed.load('http://g1.globo.com/dynamo/natureza/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'tecnologia') {
                feed.load('http://g1.globo.com/dynamo/tecnologia/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'turismo') {
                feed.load('http://g1.globo.com/dynamo/turismo-e-viagem/rss2.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasG1;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }
            break;
        case 'uol':
            var categoriasUol = ['últimas', 'economia','carros','internacional','tecnologia','política','educação','saúde'];
            if (!categoria || categoria == 'últimas') {
                feed.load('http://rss.uol.com.br/feed/noticias.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'últimas';
                    rss.categorias = categoriasUol;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } else if (categoria == 'economia') {
                feed.load('http://rss.uol.com.br/feed/economia.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasUol;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        //console.log(rss);
                    }
                });
            }else if (categoria == 'carros') {
                feed.load('http://rss.uol.com.br/feed/carros.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasUol;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        //console.log(rss);
                    }
                });
            }else if (categoria == 'internacional') {
                feed.load('http://rss.uol.com.br/feed/internacional.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasUol;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        //console.log(rss);
                    }
                });
            }else if (categoria == 'tecnologia') {
                feed.load('http://rss.uol.com.br/feed/tecnologia.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasUol;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        //console.log(rss);
                    }
                });
            }else if (categoria == 'política') {
                feed.load('http://rss.uol.com.br/feed/politica.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasUol;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        //console.log(rss);
                    }
                });
            }else if (categoria == 'educação') {
                feed.load('http://rss.uol.com.br/feed/educacao.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasUol;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        //console.log(rss);
                    }
                });
            }else if (categoria == 'saúde') {
                feed.load('http://rss.uol.com.br/feed/saude.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasUol;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        //console.log(rss);
                    }
                });
            }
            break;
        case 'elpais':
            var categoriasElpais = ['brasil'];
            if (!categoria || categoria == 'brasil') {
                feed.load('http://brasil.elpais.com/rss/brasil/portada.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = categoriasElpais;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            } 
            break;
        case 'exame':
            var categoriasExame = ['últimas', 'economia','tecnologia','negócios','mercados','mundo','finanças','gestão'];
            if (!categoria || categoria == 'últimas') {
                feed.load('http://feeds.feedburner.com/EXAME-Noticias?format=xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'últimas';
                    rss.categorias = categoriasExame;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
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
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }else if (categoria == 'tecnologia') {
                feed.load('http://feeds.feedburner.com/Exame-Tecnologia?format=xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasExame;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }else if (categoria == 'negócios') {
                feed.load('http://feeds.feedburner.com/Exame-Negocios?format=xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasExame;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }else if (categoria == 'mercados') {
                feed.load('http://feeds.feedburner.com/EXAME-Mercados?format=xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasExame;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }else if (categoria == 'mundo') {
                feed.load('http://feeds.feedburner.com/ExameMundo?format=xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasExame;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }else if (categoria == 'finanças') {
                feed.load('http://feeds.feedburner.com/Exame-FinancasPessoais?format=xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasExame;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }else if (categoria == 'gestão') {
                feed.load('http://feeds.feedburner.com/Exame-Gestao?format=xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasExame;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }
            break;
        case 'ig':
            var categoriasIg = ['brasil', 'esportes','mundo','política','educação','tecnologia','carros'];
            if (!categoria || categoria == 'brasil') {
                feed.load('http://ultimosegundo.ig.com.br/brasil/rss.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = 'brasil';
                    rss.categorias = categoriasIg;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
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
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }else if (categoria == 'mundo') {
                feed.load('http://ultimosegundo.ig.com.br/mundo/rss.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasIg;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }else if (categoria == 'política') {
                feed.load('http://ultimosegundo.ig.com.br/politica/rss.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasIg;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }else if (categoria == 'educação') {
                feed.load('http://ultimosegundo.ig.com.br/educacao/rss.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasIg;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }else if (categoria == 'tecnologia') {
                feed.load('http://tecnologia.ig.com.br/rss.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasIg;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }else if (categoria == 'carros') {
                feed.load('http://carros.ig.com.br/rss.xml', function(err, rss) {
                    rss.id = jornal;
                    rss.ids = IDS;
                    rss.categoria = categoria;
                    rss.categorias = categoriasIg;
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rss);
                        // console.log(rss);
                    }
                });
            }
            break;
        default:
            res.send("Especifique um jornal que o sistema aceite");
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