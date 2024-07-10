<template>
    <div class="main-page">
        <view class="nav" :style="'background-color: rgba(248, 248, 248, ' + op + ')'">
            <view class="status-bar" :style="'height:' + statusBarHeight + 'px'"></view>
            <div class="nav-back" @click="goback">
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-back.png" class="icon-back">
            </div>
            <view class="title" :style="'color: rgba(0, 0, 0,' + op + '); height: ' + navigationBarHeight + 'px; line-height: ' + navigationBarHeight + 'px;'">联系我们</view>
        </view>
        <div class="empty-wrap" :style="{ 'height': navHeight + 'px' }"></div>
        <div class="main-wrap">
            <div class="qrcode-wrap">
                <image src="@/static/wechat-qrcode.png" class="wechat-qrcode" mode="widthFix" :show-menu-by-longpress="true"></image>
            </div>
            <div class="sub-title">长按二维码/扫码添加客服微信</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 自定义头部
            navHeight: 0,
            statusBarHeight: 0,
            navigationBarHeight: 0,
            op: 0,
        };
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
    },
    onLoad(e) {
        this.calcTopHeight()
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
        goback() {
            uni.navigateBack({
                delta: 1
            });
        }
    },
};
</script>
<style scoped>
.main-page {
    width: 100vw;
    min-height: 100vh;
    background-image: linear-gradient(to bottom, #BCE9FC, #F7FBFD 90%, #FFF);
    background-repeat: no-repeat;
    background-size: 100% 100%;
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
    width: 48rpx;
    height: 48rpx;
    margin: 18rpx 36rpx;
}

.title {
    text-align: center;
    font-size: 28rpx;
}

.main-wrap {
    position: relative;    
    padding-bottom: 80rpx;
    margin: 244rpx auto 0;
}

.qrcode-wrap {
    width: 450rpx;
    height: 450rpx;
    background: rgba(255,255,255,0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76,166,245,0.2), inset 0rpx 6rpx 46rpx 0rpx #DBECFC;
    border-radius: 24rpx;
    border: 3rpx solid #FFFFFF;
    display: flex;
    align-items: center;
    margin: 0 auto;
}
.wechat-qrcode {
    width: 332rpx;
    height: 332rpx;
    margin: 0 auto;
    display: block;
}
.sub-title {
    font-family: PingFang-SC, PingFang-SC;
    font-size: 32rpx;
    color: #999999;
    line-height: 32rpx;
    text-align: center;
    margin: 40rpx auto 0;
}
</style>
