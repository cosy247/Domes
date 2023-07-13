import api from './api.js'

// 设置背景
(() => {
    function getRandom(max) {
        return Math.floor(Math.random() * max);
    }

    document.body.style.background = `linear-gradient(123deg, ${Array(3)
        .fill(1)
        .map(() => `rgba(${getRandom(255)},${getRandom(255)},${getRandom(255)},0.3)`)
        .join(',')}`;
})();

function sendShare() {
	
    // 获取ticket
    const ticketData = await api.get({
        url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
        data: {
            access_token: tokenData.access_token,
            type: jsapi,
        },
    });
    if (tokenData.errmsg !== 'ok') {
        return false;
    }

    // 配置分享信息
    const timestamp = Date.now();
    const nonceStr = 'juaasdgasdg';
    const signature = sha1(`noncestr=${nonceStr}&jsapi_ticket=${ticketData.ticket}&timestamp=${timestamp}&url=${location.href}`);
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: ['onMenuShareAppMessage'], // 必填，需要使用的JS接口列表
    });

    // 分享
    wx.ready(() => {
        wx.onMenuShareAppMessage({
            title: '打卡咯',
            desc: '打卡测试呢',
            link: 'link',
            imgUrl: 'imgUrl',
            success: function () {},
            cancel: function () {},
        });
    });
}
