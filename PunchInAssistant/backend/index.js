var http = require('http');

// req 请求信息，res 返回信息
http.createServer(function (req, res) {
    if(req.url !== "/favicon.ico"){
        var cache = []
        //拿到浏览器访问的url路劲,并且替换掉前面的/
        res.end(JSON.stringify(req,function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    return;
                }
                cache.push(value);
            }
            return value;
        }));
    }
    res.end({code: 201, msg: '路由错误', data: null});
}).listen(3000);
