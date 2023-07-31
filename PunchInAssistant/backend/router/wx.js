const fs = require('fs');
const sha1 = require('../tools/sha1');
const config = require('../config');
const request = require('../request');
const dataCache = require('../dataCache.json');

module.exports = {
    getConfig(req, res) {
        const now = Date.now();
        if (now - dataCache.wx.updateTime >= 7200000) {
            const tokenData = request.wx.getToken();
            if (!tokenData.access_token) {
                res.end(JSON.stringify({ code: 201, msg: '服务器繁忙', data: null }));
                return;
            }
            const ticketData = request.wx.getTicket(tokenData.access_token);
            if (!ticketData.ticket) {
                res.end(JSON.stringify({ code: 201, msg: '服务器繁忙', data: null }));
                return;
            }
            dataCache.wx.updateTime = Date.now();
            dataCache.wx.access_token.value = tokenData.access_token;
            dataCache.wx.ticket.value = ticketData.ticket;
            fs.writeFile('../dataCache.json', JSON.stringify(dataCache));
        }

        const timestamp = Date.now();
        const nonceStr = 'juaasdgasdg';
        const signature = sha1(`noncestr=${nonceStr}&jsapi_ticket=${ticketData.ticket}&timestamp=${timestamp}&url=${location.href}`);

        res.end(
            JSON.stringify({
                code: 200,
                msg: '',
                data: {
                    appId: config.appid,
                    timestamp,
                    nonceStr,
                    signature,
                },
            })
        );
    },
};
