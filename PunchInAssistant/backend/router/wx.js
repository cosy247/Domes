const request = require('../request');

module.exports = {
    getConfig(req, res) {
        const request.wx.getToken().then((data) => {
            res.end(JSON.stringify({ code: 200, msg: '', data: {} }));
        });
		res.end(JSON.stringify({ code: 200, msg: '', data: {} }));

    },
};
