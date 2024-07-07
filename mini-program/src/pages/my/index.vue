<template>
    <div class="main-page">
        <view class="nav" :style="'background-color: rgba(248, 248, 248, ' + op + ')'">
            <view class="status-bar" :style="'height:' + statusBarHeight + 'px'"></view>
            <view class="title" :style="'color: rgba(0, 0, 0,' + op + '); height: ' + navigationBarHeight + 'px; line-height: ' + navigationBarHeight + 'px;'">个人中心</view>
        </view>
        <div class="empty-wrap" :style="{ 'height': navHeight + 'px' }"></div>
        <div class="wrap">
            <div class="top-wrap">
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/my-avatar.png" class="my-avatar" mode="widthFix">
                <div class="my-nickname">Jadia</div>
                <div class="my-vip-status">非会员</div>
            </div>
            <div class="menu-wrap">
                <div class="menu-item-wrap" @click="gotoUser">
                    <div class="menu-item-left">
                        <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/my-icon-personal.png" class="menu-icon">
                        <div class="menu-text">个人信息</div>
                    </div>
                    <div class="menu-item-right">
                        <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-right.png" class="icon-right" mode="widthFix">
                    </div>
                </div>
                <div class="menu-item-wrap">
                    <div class="menu-item-left">
                        <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/my-icon-vip.png" class="menu-icon">
                        <div class="menu-text">会员充值</div>
                    </div>
                    <div class="menu-item-right">
                        <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-right.png" class="icon-right" mode="widthFix">
                    </div>
                </div>
                <div class="menu-item-wrap">
                    <div class="menu-item-left">
                        <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/my-icon-collect.png" class="menu-icon">
                        <div class="menu-text">我的收藏</div>
                    </div>
                    <div class="menu-item-right">
                        <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-right.png" class="icon-right" mode="widthFix">
                    </div>
                </div>
                <div class="menu-item-wrap" @click="gotoContact">
                    <div class="menu-item-left">
                        <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/my-icon-contact.png" class="menu-icon">
                        <div class="menu-text">联系我们</div>
                    </div>
                    <div class="menu-item-right">
                        <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-right.png" class="icon-right" mode="widthFix">
                    </div>
                </div>
            </div>
            <div class="footer-tabbar-wrap">
                <tui-tabbar></tui-tabbar>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navHeight: 0,
            statusBarHeight: 0,
            navigationBarHeight: 0,
            op: 0
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
        gotoUser() {
            uni.navigateTo({
                url: '/pages/my/user'
            })
        },
        gotoContact() {
            uni.navigateTo({
                url: '/pages/my/contact'
            })
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

.top-wrap {
    position: relative;
    margin-top: -68rpx;
    background: url(https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/my-top-bg.png) no-repeat right;
    background-size: 750rpx 420rpx;
    width: 750rpx;
    height: 420rpx;
}

.my-avatar {
    width: 132rpx;
    display: block;
    margin: 0 auto;
    padding-top: 108rpx;
}

.my-nickname {
    font-family: Futura, Futura;
    font-weight: 700;
    font-size: 40rpx;
    color: #333333;
    line-height: 40rpx;
    text-align: center;
    margin-top: 24rpx;
}

.my-vip-status {
    font-family: PingFangSC, PingFang SC;
    font-size: 28rpx;
    color: #999999;
    line-height: 28rpx;
    text-align: center;
    margin-top: 16rpx;
}

.menu-wrap {
    width: 670rpx;
    display: block;
    margin: -20rpx auto 60rpx;
    background: rgba(255,255,255,0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76,166,245,0.2);
    border-radius: 24rpx;
    border: 3rpx solid #FFFFFF;
}

.menu-item-wrap {
    display: flex;
    justify-content: space-between;
    padding: 40rpx 32rpx;
    position: relative;
}

.menu-item-wrap:not(:last-child)::after {
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 20px; /* 调整此值以控制边框的起始位置 */
    width: 590rpx;
    height: 2rpx; /* 边框厚度 */
    background-color: #F1F1F1; /* 边框颜色 */
}

.menu-item-wrap:last-child {
    border-bottom: none;
}

.menu-item-left {
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu-icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 44rpx;
}

.menu-text {
    font-family: PingFang-SC, PingFang-SC;
    font-size: 32rpx;
    color: #0E1746;
    line-height: 32rpx;
}

.menu-item-right {
    display: inline-block;
}

.icon-right {
    width: 14rpx;
    height: 24rpx;
}
</style>
