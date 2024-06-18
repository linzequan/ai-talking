<template>
    <div class="page">
        <div class="content-wrap">
            <div class="title">可以通过微信或邮件联系我们</div>
            <div class="qrcode-wrap">
                <img src="@/static/wechat-qrcode.png" class="wechat-qrcode" mode="widthFix">
            </div>
            <div class="sub-title">保存图片去微信扫一扫联系我们</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    onLoad(e) {
    },
    onShareAppMessage() {
    },
    methods: {
    },
};
</script>
<style scoped>
.page {
    background: #F4F5F9;
    padding-top: 40rpx;
    width: 100%;
    height: 100%;
}
.content-wrap {
    width: 680rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    display: block;
    margin: 0 auto;
    padding-top: 64rpx;
    padding-bottom: 64rpx;
}
.title {
    font-family: PingFangSC, PingFang SC;
    font-weight: bold;
    font-size: 40rpx;
    color: #121736;
    line-height: 56rpx;
    text-align: center;
}
.qrcode-wrap {
    width: 360rpx;
    height: 360rpx;
    border-radius: 23rpx;
    border: 2rpx solid #E6E8EB;
    margin: 64rpx auto 0;
    display: flex;
    align-items: center;
}
.wechat-qrcode {
    width: 300rpx;
    height: 300rpx;
    margin: 0 auto;
    display: block;
}
.sub-title {
    font-family: PingFangSC, PingFang SC;
    font-size: 28rpx;
    color: #595C72;
    line-height: 40rpx;
    text-align: center;
    margin-top: 40rpx;
}
</style>
