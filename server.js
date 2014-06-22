/**
 * Created by 国正 on 2014/6/16 0016.
 */

var http = require('http');

var server = http.createServer();

server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    if (req.url.indexOf("isbn=") != -1) {
        var s = req.url.replace("/?isbn=", "");
        console.log(s);
        queryDouban(s, function (data) {
            console.log(data);
            res.end(data);
        });
    }
    else {
        var err = {
            "Result": false
        };
        res.end(JSON.stringify(err));
    }
}).listen(18080);

var request = require('request');

function queryDouban(isbn, callback) {
    request('https://api.douban.com/v2/book/isbn/' + isbn,
        function (err, res, body) {
            callback(body);
        });
}
