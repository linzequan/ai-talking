<template>
    <div class="main-page">
        <view class="nav" :style="'background-color: rgba(248, 248, 248, ' + op + ')'">
            <view class="status-bar" :style="'height:' + statusBarHeight + 'px'"></view>
            <div class="nav-back" @click="goback">
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-back.png" class="icon-back">
            </div>
            <view class="title" :style="'color: rgba(0, 0, 0,' + op + '); height: ' + navigationBarHeight + 'px; line-height: ' + navigationBarHeight + 'px;'">聊天大师</view>
        </view>
        <div class="empty-wrap" :style="{ 'height': navHeight + 'px' }"></div>
        <div class="wrap">
            <div class="chat-result-wrap">
                <div class="chat-bubble-right">还有什么办法</div>
                <div class="chat-bubble-response">
                    <div class="chat-bubble-response-text">甲辰龙年，大年三十除夕夜，家家户户的鞭炮声此起彼伏，绚丽的烟花盛开在沈阳的夜色上空，子儿带着儿子李自然，在窗前感受着这浓浓的年味儿。天亮后，居民楼的门口落了一层厚厚的“红地毯”，空气的爆竹味还没散去的，正是北上广深失去的“年味儿”。爆竹腾空，烟花盛开，为团聚的时刻增添了喜庆，但这一地的残局又该如何处理？</div>
                    <div class="chat-bubble-response-break-line"></div>
                    <div class="chat-bubble-op-wrap">
                        <div class="chat-bubble-op-item left">
                            <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-copy.png" class="chat-bubble-op-icon">
                            <div class="chat-bubble-op-text">复制</div>
                        </div>
                        <div class="chat-bubble-op-item left">
                            <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-relay.png" class="chat-bubble-op-icon">
                            <div class="chat-bubble-op-text">转发</div>
                        </div>
                        <div class="chat-bubble-op-item left">
                            <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-collect.png" class="chat-bubble-op-icon">
                            <div class="chat-bubble-op-text">收藏</div>
                        </div>
                        <div class="chat-bubble-op-item right">
                            <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/chat-icon-change.png" class="chat-bubble-op-icon">
                            <div class="chat-bubble-op-text">换个答案</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-break-wrap">再聊点新内容吧</div>
            <div class="chat-content-wrap">
                <textarea class="chat-content-textarea" maxlength="-1" placeholder="点击输入或粘贴对方聊天内容～" placeholder-style="font-size: 32rpx; line-height: 1.5; color: #9C9C9C;"></textarea>
                <div class="chat-content-btn" @click="searchSimpleTxt">一键生成回复</div>
            </div>
        </div>
        <!-- <div class="search-wrap">
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
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            navHeight: 0,
            statusBarHeight: 0,
            navigationBarHeight: 0,
            op: 0,
            resultType: 'txt',
        };
    },
    onLoad(e) {
        this.calcTopHeight()
    },
    onShareAppMessage() {
    },
    onPageScroll(res) {
        // res.scrollTop 为页面滚动距离
        let top = res.scrollTop
        // height为状态栏高度+自定义导航栏标题内容高度（这里是44px）
        let height = this.statusBarHeight + 44
        // 判断滚动高度
        // 如果小于顶部自定义导航的高度
        if (top <= height) {
            // 透明度(op) = 滚动距离/导航栏高度
            //  (不做操作 直接计算 this.op = top/height 也可以实现)
            // 由于(滚动距离/导航栏高度)得到0-1之间小数点后n位小数
            // 四舍五入后得到的只能是0/1
            // 因此做如下操作
            this.op = Math.round(top / height * 100) / 100
        } else {
            // 如果滚动距离大于导航高度，则透明度值为1（不透明）
            this.op = 1
        }
        console.log(top, height, this.op)
    },
    methods: {
        calcTopHeight() {
            // 状态栏高度
            this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
            // 获取微信胶囊的位置信息 width,height,top,right,left,bottom
            const custom = wx.getMenuButtonBoundingClientRect()
            // 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
            this.navigationBarHeight = custom.height + (custom.top - this.statusBarHeight) * 2
            this.navHeight = this.statusBarHeight + this.navigationBarHeight
            console.log('顶部高度：' + this.navHeight)
        },
        prevImg(img) {
            wx.previewImage({
                urls: [img]
            })
        },
        goback() {
            uni.navigateBack({
                delta: 1
            });
        }
    },
};
</script>
<style scoped>
.footer-tabbar-wrap {
    height: 112rpx;
    padding-bottom: env(safe-area-inset-bottom);
}

.nav {
    position: fixed;
    top: 0rpx;
    left: 0;
    right: 0;
    background: rgb(188, 233, 252);
    z-index: 9999;
}

.nav-back {
    width: 80rpx;
    height: 88rpx;
    position: absolute;
}

.icon-back {
    width: 32rpx;
    height: 48rpx;
    margin: 24rpx 36rpx;
}

.title {
    text-align: center;
    font-size: 28rpx;
}

.main-page {
    width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    background-image: linear-gradient(to bottom, #BCE9FC, #F7FBFD 90%, #FFF);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.wrap {
    padding-bottom: 80rpx;
}

.chat-result-wrap {
    width: 670rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 48rpx auto 0;
    flex-direction: column;
}

.chat-bubble-right {
    font-family: PingFang-SC, PingFang-SC;
    font-size: 32rpx;
    color: #FFFFFF;
    line-height: 44rpx;
    background: #435AFC;
    padding: 14rpx 28rpx;
    position: relative;
    border-radius: 35rpx;
    margin-left: auto;
    margin-right: 12rpx;
    margin-bottom: 26rpx;
}

.chat-bubble-right::after {
    content: ' ';
    width: 26rpx;
    height: 34rpx;
    background: url(https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/chat-msg-tail.png);
    background-size: 100% 100%;
    position: absolute;
    right: -12rpx;
    bottom: 0;
}

.chat-bubble-response {
    background: rgba(255,255,255,0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76,166,245,0.2);
    border-radius: 24rpx;
    border: 3rpx solid #FFFFFF;
    margin-bottom: 26rpx;
}

.chat-bubble-response-text {
    font-family: PingFang-SC, PingFang-SC;
    font-size: 32rpx;
    color: #333333;
    line-height: 48rpx;
    margin: 28rpx 32rpx;
    text-align: left;
    display: block;
}

.chat-bubble-response-break-line {
    width: 606rpx;
    border-bottom: 2rpx solid #F2F2F2;
    display: block;
    margin: 32rpx auto;
}

.chat-bubble-op-wrap {
    width: 606rpx;
    display: flex;
    justify-content: space-between; /* 分布子元素，第一个和最后一个分别靠向两端 */
    align-items: center; /* 垂直居中对齐 */
    margin: 0 auto 32rpx;
}

.chat-bubble-op-item {
    text-align: center;
}

.chat-bubble-op-item.left {
    margin-right: 60rpx;
}

.chat-bubble-op-item.right {
    margin-left: auto;
}

.chat-bubble-op-icon {
    width: 40rpx;
    height: 40rpx;
    margin-bottom: 8rpx;
}

.chat-bubble-op-text {
    font-family: PingFang-SC, PingFang-SC;
    font-size: 20rpx;
    color: #999999;
    line-height: 20rpx;
    text-align: center;
}

.chat-break-wrap {
    font-family: PingFang-SC, PingFang-SC;
    font-size: 28rpx;
    color: #999999;
    line-height: 28rpx;
    text-align: center;
    position: relative;
    width: 670rpx;
    display: block;
    margin: 80rpx auto 0;
}

.chat-break-wrap:before,
.chat-break-wrap:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 214rpx;
    border-top: 2rpx solid #DDDDDD;
}

.chat-break-wrap:before {
    left: 0;
}

.chat-break-wrap:after {
    right: 0;
}

.chat-content-wrap {
    width: 670rpx;
    height: 364rpx;
    position: relative;
    background: rgba(255,255,255,0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76,166,245,0.2), inset 0rpx 6rpx 46rpx 0rpx #DBECFC;
    display: block;
    margin: 80rpx auto;
    border: 3rpx solid #fff;
    border-radius: 24rpx;
    z-index: 99;
}

.chat-content-textarea {
    font-family: PingFang-SC, PingFang-SC;
    font-size: 32rpx;
    color: #9C9C9C;
    line-height: 44rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin: 36rpx auto 0;
    display: block;
    width: 594rpx;
    height: 158rpx;
    border: none;
    outline: none;
    box-shadow: none;
    resize: none;
    color: #333;
    line-height: 1.5;
}

.chat-content-btn {
    width: 550rpx;
    height: 96rpx;
    background: #435AFC;
    box-shadow: 0rpx 24rpx 40rpx 0rpx rgba(76,166,245,0.33);
    border-radius: 78rpx;
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold;
    font-size: 36rpx;
    color: #FFFFFF;
    text-align: center;
    line-height: 96rpx;
    margin: 20rpx auto 60rpx;
}


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
