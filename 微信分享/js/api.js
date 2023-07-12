window.api = {
    get({ url, data = {} }) {
        return new Promise((resolve, reject) => {
            const httpRequest = new XMLHttpRequest();
            const dataString = Object.entries(data)
                .map((key, value) => `${key}=${value}`)
                .join('&');
            const fullUrl = url + (dataString ? `?${dataString}` : '');
            httpRequest.open('GET', fullUrl, true);
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    resolve(JSON.parse(httpRequest.responseText));
                } else {
                    reject(JSON.parse(httpRequest.responseText));
                }
            };
            httpRequest.send();
        });
    },
    post({ url, data = {} }) {
        return new Promise((resolve, reject) => {
            const httpRequest = new XMLHttpRequest();
            const dataString = Object.entries(data)
                .map((key, value) => `${key}=${value}`)
                .join('&');
            httpRequest.open('POST', url, true);
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            httpRequest.onreadystatechange = () => {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                        resolve(JSON.parse(httpRequest.responseText));
                    } else {
                        reject(JSON.parse(httpRequest.responseText));
                    }
                }
            };
            httpRequest.send(dataString);
        });
    },
};
