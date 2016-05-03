//var restify = require('restify');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
//var server = restify.createServer();
module.exports.findWordInURL = function(url, word) {
    request(url,{timeout: 1000}, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            texto = [];
            retorno = [];
            b = $('body').text().toLowerCase();
            c = b.replace(/\s+/g, ' ');
            texto = c.split("¬");
            for (var i = texto.length - 1; i >= 0; i--) {
                if (texto[i].search(word) !== -1) {
                    retorno.push("+" + texto[i] + "+");
                }
            }
           console.log(retorno);
        } else {
            console.log(error);
        }
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
//server.get('/', function(req, res, next) {
//   res.send("oi");
//   console.log("recebi requisição");
//    return next();
//});
//server.on("listening", function() {
//   console.log("server running!");
//});
//server.listen(8080);