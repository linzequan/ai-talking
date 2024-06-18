<template>
    <div class="wrap">
        <div class="upload-wrap">
            <div class="upload-title">
                <div>上传聊天记录图片</div>
                <div>智能生成对话</div>
            </div>
            <div class="upload-operation-wrap">
                <image src="@/static/upload.png" class="icon-upload"></image>
                <span class="upload-tip">点击上传/拍摄</span>
                <span class="upload-tip-tiny">采用本地大模型生成，安全可信任</span>
            </div>
        </div>
        <div class="tip-wrap">
            <div class="tip-title">参考示例</div>
            <div class="tip-group">
                <image src="@/static/chat-sample-01.png" class="chat-sample"></image>
                <image src="@/static/chat-sample-01.png" class="chat-sample"></image>
            </div>
        </div>
        <div class="footer-tabbar-wrap">
            <tui-tabbar></tui-tabbar>
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
.wrap {
    background: #F4F5F9;
    padding-top: 20rpx;
    width: 100%;
    height: 100%;
}
.upload-wrap {
    width: 720rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    display: block;
    margin: 0 auto;
    padding-top: 50rpx;
    padding-bottom: 50rpx;
}
.upload-title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 32rpx;
    color: #182444;
    line-height: 32rpx;
    text-align: left;
    font-style: normal;
    text-align: center;
}
.upload-title div {
    margin-bottom: 15rpx;
}
.upload-operation-wrap {
    width: 574rpx;
    height: 556rpx;
    border-radius: 8rpx;
    border: 3rpx dashed #B7B9C2;
    display: block;
    margin: 30rpx auto 0;
}
.icon-upload {
    width: 96rpx;
    height: 96rpx;
    margin: 180rpx auto 0;
    display: block;
}
.upload-tip {
    font-family: PingFangSC, PingFang SC;
    font-size: 26rpx;
    color: #121736;
    text-align: center;
    display: block;
    margin-top: 15rpx;
    margin-bottom: 15rpx;
}
.upload-tip-tiny {
    font-size: 26rpx;   
    color: #dddddd;
    text-align: center;
    display: block;
}
.tip-wrap {
    width: 700rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    display: block;
    margin: 20rpx auto 0;
    border-radius: 10rpx;
    padding: 20rpx 10rpx;
}
.tip-title {
    font-size: 32rpx;
    font-weight: bold;
    margin: 5rpx 0 15rpx 5rpx;
    color: #3b3b3b;
}
.tip-group {
    display: flex;
    flex-wrap: wrap;
}
.chat-sample {
    width: 320rpx;
    height: 692rpx;
    margin: 0 15rpx 20rpx;
}
.footer-tabbar-wrap {
    height: 112rpx;
    padding-bottom: env(safe-area-inset-bottom);
}
</style>
