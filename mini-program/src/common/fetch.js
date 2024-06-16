let fetch = function({
    url,
    method = 'GET',
    data,
    showLoading = false,
    header = {
        'content-type': 'application/json'
    }
}) {
    if (showLoading) {
        uni.showLoading({
            mask: true,
            title: "加载中",
        });
    }
    if (method.toLowerCase() == 'post') {
        header['content-type'] = 'application/x-www-form-urlencoded'
    }
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            header,
            data: {
                ...data,
                openid: uni.getStorageSync('openid') || '',
                ver: getApp().globalData.ver
            },
            method,
            success: (res) => {
                if (res.statusCode == 200) {
                    resolve(res.data)
                    if (showLoading) {
                        uni.hideLoading();
                    }
                } else {
                    uni.hideLoading();
                    uni.showToast({
                        icon: "none",
                        title: "发生点小错误，请稍后重试~",
                        duration: 1500
                    })
                    reject(res)
                }
            },
            fail: (err) => {
                uni.hideLoading();
                reject(err)
            }
        })
    })
}

Function.prototype.before = (fn) => {
    return function() {
        let f = fn.apply(this, arguments)
        if (f) {
            console.log(arguments)
            let opt = arguments[0]
                // let index = opt.url.lastIndexOf('/')
            let name = opt.url.split("?")[1].split("=")[1];
            console.log(`[Mock][api]mock访问=> ${name}`)
            try {
                const json = require(`../mock/api/${name}.json`)
                console.log('json', json);
                return new Promise(resolve => {
                    resolve(json)
                })
            } catch (error) {
                console.error(`[mock][api]${name}.json未找到！`, error)
                return new Promise(resolve => {
                    resolve({
                        flag: '1',
                        data: {},
                        msg: `[mock][api]${name}.json未找到！`
                    })
                })
            }
        }
        return self.apply(this, arguments)
    }
}

export default fetch;