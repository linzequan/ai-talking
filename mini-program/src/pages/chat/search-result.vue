<template>
    <div>
        <div class="search-wrap">
            <div class="search-text" v-if="resultType=='txt'">我要去洗澡了我要去洗澡了我要去洗澡了我要去洗澡了我要去洗澡了我要去洗澡了我要去洗澡了我要去洗澡了我要去洗澡了我要去洗澡了</div>
            <div class="search-img" v-if="resultType=='img'">
                <img src="@/static/chat-sample-01.png" class="chat-sample" mode="widthFix" @click="prevImg('@/static/chat-sample-01.png')">
            </div>
        </div>
        <div class="response-wrap">
            <div class="response-item-wrap">
                <div class="response-item">
                    <image src="@/static/logo.png" class="response-item-avatar"></image>
                    <div class="responsse-item-text">去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起去洗澡也不叫我一起</div>
                </div>
                <div class="response-operation-wrap">
                    <button size="default" type="default" class="response-item-copy-btn">
                        <image src="@/static/copy.png" class="response-item-icon"></image>
                        <span>复制</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            resultType: 'txt'
        };
    },
    onLoad(e) {
    },
    onShareAppMessage() {
    },
    methods: {
        prevImg(img) {
            wx.previewImage({
                urls: [img]
            })
        }
    },
};
</script>
<style scoped>
.search-wrap {
    width: 680rpx;
    margin: 20rpx auto 0;
    border: 2rpx solid #f54a45;
    border-radius: 10rpx;
    background: #f6f0f0;
    padding: 20rpx 10rpx;
}
.search-text {
    font-size: 32rpx;
    color: #000;
    line-height: 1.5;
}
.response-wrap {
    width: 700rpx;
    display: block;
    margin: 40rpx auto 0;
    padding-bottom: 80rpx;
}
.response-item-wrap {
    margin-bottom: 40rpx;
}
.response-item {
    display: flex;
}
.response-item-avatar {
    width: 100rpx;
    height: 100rpx;
}
.responsse-item-text {
    flex: 1;
    font-size: 32rpx;
    color: #000;
    border: 2rpx solid #f54a45;
    background: #f6f0f0;
    border-radius: 10rpx;
    padding: 15rpx;
    line-height: 1.5;
}
.response-operation-wrap {
    text-align: right;
    margin-top: 30rpx;
}
.response-item-copy-btn {
    background: #fff;   
    width: 180rpx;
    display: inline-flex;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 80rpx;
    border: 2rpx solid #cdcdcd;
    align-items: center;
}
.response-item-copy-btn .response-item-icon {
    width: 48rpx;
    height: 48rpx;
}
.response-item-copy-btn span {
    font-size: 28rpx;
    color: #cdcdcd;
    margin-left: 5rpx;
}
.chat-sample {
    width: 240rpx;
    margin: 0 auto;
    display: block;
}
</style>
