<template>
    <div class="page">
        <view class="nav" :style="'background-color: rgba(245, 74, 69, ' + op + ')'">
            <view class="status-bar" :style="'height:' + statusBarHeight + 'px'"></view>
            <view class="title" :style="'color: rgba(255, 255, 255,' + op + '); height: ' + navigationBarHeight + 'px; line-height: ' + navigationBarHeight + 'px;'">个人中心</view>
        </view>
        <div class="empty-wrap" :style="{ 'height': navHeight + 'px' }"></div>
        <div class="wrap">
            <div class="top-welcome">Hi，欢迎您~</div>
            <div class="info-wrap">
                <img src="@/static/logo.png" class="user-avatar" mode="widthFix">
                <div class="user-info-wrap">
                    <div class="user-nickname">小宝宝</div>
                    <div class="vip-status">对话，创造无限可能</div>
                </div>
            </div>
            <div class="menu-wrap">
                <div class="menu-item-wrap" @click="gotoUser">
                    <div class="menu-item-text">个人信息</div>
                    <img src="@/static/arrow-left.png" class="menu-arrow-left" mode="widthFix">
                </div>
                <div class="menu-item-wrap" @click="gotoContact">
                    <div class="menu-item-text">联系我们</div>
                    <img src="@/static/arrow-left.png" class="menu-arrow-left" mode="widthFix">
                </div>
                <div class="menu-item-wrap">
                    <div class="menu-item-text">立即分享</div>
                    <img src="@/static/arrow-left.png" class="menu-arrow-left" mode="widthFix">
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
    background: rgb(245, 74, 69);
}
.title {
    text-align: center;
    font-size: 28rpx;
    font-weight: bold;
}
.page {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, rgb(245, 74, 69) 0%, #f6f0f0 78%, rgba(240, 248, 255, 0) 100%);
}

.wrap {
    width: 700rpx;
    margin: 0 auto;
}

.top-welcome {
    font-size: 36rpx;
    color: #fff;
    font-weight: bold;
}
.info-wrap {
    width: 700rpx;
    margin: 25rpx auto;
    background: #fff;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
}
.user-avatar {
    width: 160rpx;
    border-radius: 50%;
}
.user-info-wrap {
    flex: 1;
    margin-left: 15rpx;
}
.user-nickname {
    font-size: 36rpx;
    font-weight: bold;
    color: #000;
}
.vip-status {
    font-size: 28rpx;
    color: #ccc;
    margin-top: 5rpx;
}
.menu-wrap {
    width: 700rpx;
    margin: 25rpx auto;
    background: #fff;
    border-radius: 16rpx;
}
.menu-item-wrap {
    display: flex;
    align-items: center;
    height: 112rpx;
    padding: 0 40rpx;
}
.menu-item-text {
    font-size: 30rpx;
    font-weight: bold;
    color: #121736;
    flex: 1;
}
.menu-arrow-left {
    width: 10rpx;
}
</style>
