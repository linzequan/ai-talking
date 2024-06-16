
const bmap = require('../static/bmap-wx.js')
function map(address) {
    if (!address) {
        uni.showToast({
            title: "未设置商家地址~",
            icon: "none",
        });
        return;
    }
    var BMap = new bmap.BMapWX({
        ak: 'GqBpjuzFgbcaqlCzyC0xY9NIqYmGxj4v'
    });
    BMap.geocoding({
        address: address,
        fail: (err => {
            uni.showToast({
                title: '定位异常~',
                icon: "none",
                duration: 2000
            });
            uni.showModal({
                title: '定位异常~',
                icon: "none",
                content: JSON.string(err)
            })
            console.log('err', err)
        }),
        success: (data => {
            if (data.status == 0) {
                let lng = data.result.location.lng;
                let lat = data.result.location.lat;
                uni.openLocation({
                    latitude: lat,
                    longitude: lng,
                    success: function () {
                        // uni.showToast({
                        //   title: '一键导航成功~',
                        //   icon: "none",
                        //   duration: 2000
                        // });
                        console.log('success');
                    }
                });
            } else {
            }
        })
    });
}

export default map;