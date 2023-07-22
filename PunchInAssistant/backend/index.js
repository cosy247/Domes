const http = require('http');
const router = require('./router');

// req 请求信息，res 返回信息
http.createServer(function (req, res) {
    res.writeHead(200, {
        'content-type': 'text/html;charset=utf8',
    });
    if (req.url !== '/favicon.ico') {
        const paths = req.url.split('?')[0].split('/').slice(1);
        const handel = paths.reduce((handel, path) => handel[path] || {}, router);
        if (typeof handel == 'function') {
            handel(req, res);
            return;
        }
    }
    res.end(JSON.stringify({ code: 201, msg: '请求路径不存在', data: null }));
}).listen(3000);
