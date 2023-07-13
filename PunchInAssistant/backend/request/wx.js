const config = require("../config")
const request = require("./api")

module.exports = {
	async getToken() {
		await request.get({
			url: 'https://api.weixin.qq.com/cgi-bin/token',
			data: {
				grant_type: 'client_credential',
				appid: config.appid,
				secret: config.secret,
			}
		})
	}
}