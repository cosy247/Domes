const express = require('express');
const router = require('./router.js');

express().all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '119.23.110.222');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('X-Powered-By', ' 3.2.1');
    if (req.method === 'OPTIONS') res.send(200);
    else next();
}).use(router).listen(7799, () => {
    console.log('server running at http://127.0.0.1:7799');
});;
