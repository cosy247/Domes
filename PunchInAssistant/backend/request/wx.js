const config = require('../config');
const api = require('./api');

module.exports = {
    getToken() {
        return api.get({
            url: 'https://api.weixin.qq.com/cgi-bin/token',
            data: {
                grant_type: 'client_credential',
                appid: config.appid,
                secret: config.secret,
            },
        });
    },
	getTicket(token) {
        return api.get({
			url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
            data: {
				access_token: token,
				type: 'jsapi',
            },
        });
	}
};
