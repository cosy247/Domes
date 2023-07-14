var http = require('https');

module.exports = {
    get({ url, data = {} }) {
        return new Promise((resolve, reject) => {
            const dataString = Object.entries(data)
                .map((key, value) => `${key}=${value}`)
                .join('&');
            const fullUrl = url + (dataString ? `?${dataString}` : '');
            http.get(fullUrl, (req, res) => {
                let html = '';
                req.on('data', function (data) {
                    html += data;
                });
                req.on('end', function () {
                    resolve(JSON.parse(html));
                });
            });
        });
    },
};
