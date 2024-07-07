<template>
    <div class="main-page">
        <view class="nav" :style="'background-color: rgba(248, 248, 248, ' + op + ')'">
            <view class="status-bar" :style="'height:' + statusBarHeight + 'px'"></view>
            <view class="title" :style="'color: rgba(0, 0, 0,' + op + '); height: ' + navigationBarHeight + 'px; line-height: ' + navigationBarHeight + 'px;'">聊天大师</view>
        </view>
        <div class="empty-wrap" :style="{ 'height': navHeight + 'px' }"></div>
        <div class="top-wrap">
            <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/ai-chat-title.png" class="top-wrap-title" mode="widthFix">
        </div>
        <div class="upload-wrap">
            <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/ai-chat-upload-btn.png" class="ai-chat-upload-btn" @click="openActionSheet">
            <div class="upload-tip">上传聊天图片生成智能回复</div>
            <div class="chat-content-btn" @click="searchAiResult">生成智能回复</div>
        </div>
        <div class="upload-demo-wrap">
                <div class="upload-demo-head-wrap">
                    <div class="upload-demo-head-left">示例图片</div>
                    <!-- <div class="upload-demo-head-right">
                        <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-change.png" class="icon-change">
                        <div class="upload-demo-change-text">换一换</div>
                    </div> -->
                </div>
                <div class="upload-demo-item-group">
                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/ai-chat-demo01.png" class="ai-chat-demo-pic" mode="widthFix">
                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/ai-chat-demo02.png" class="ai-chat-demo-pic" mode="widthFix">
                </div>
            </div>
        <div class="footer-tabbar-wrap" v-show="isShowTabbar">
            <tui-tabbar></tui-tabbar>
        </div>
        <tui-actionsheet  
            :show="showActionSheet" 
            :item-list="itemList" 
            @click="itemClick" 
            @cancel="closeActionSheet">
        </tui-actionsheet>
    </div>
</template>

<script>
import tuiActionsheet from '../../components/tui-actionsheet/tui-actionsheet.vue'
export default {
    components: {
        tuiActionsheet
    },
    data() {
        return {
            // 自定义头部
            navHeight: 0,
            statusBarHeight: 0,
            navigationBarHeight: 0,
            op: 0,
            // 上传弹窗
            showActionSheet: false,
            itemList: [{
                text: "拍摄",
                color: "#333333"
            }, {
                text: "从手机相册选择",
                color: "#333333"
            }],
            isShowTabbar: true
        };
    },
    onLoad(e) {
        this.calcTopHeight()
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
    onShareAppMessage() {
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
        //隐藏组件
        closeActionSheet() {
            this.showActionSheet = false
            this.isShowTabbar = true
        },
        //调用此方法显示组件
        openActionSheet(type) {
            this.isShowTabbar = false;
            this.showActionSheet = true;
        },
        itemClick(e) {
            console.log(e)
            let index = e.index;
            this.closeActionSheet();
            this.tui.toast(`您点击的按钮索引为：${index}`)
        },
        searchAiResult() {
            uni.navigateTo({
                url: '/pages/chat/search-result?type=pic'
            })
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

.title {
    text-align: center;
    font-size: 28rpx;
}

.top-wrap {
    position: relative;
    margin-top: -68rpx;
    background: url(https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/simple-chat-top-bg.png) no-repeat right;
    background-size: 750rpx 420rpx;
    width: 750rpx;
    height: 420rpx;
}

.top-wrap-title {
    width: 588rpx;
    margin-top: 94rpx;
    margin-left: 40rpx;
}

.upload-wrap {
    width: 670rpx;
    height: 530rpx;
    background: rgba(255,255,255,0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76,166,245,0.2), inset 0rpx 6rpx 46rpx 0rpx #DBECFC;
    border-radius: 24rpx;
    border: 3rpx solid #FFFFFF;
    margin: -36rpx auto 0;
    position: relative;
}

.ai-chat-upload-btn {
    width: 208rpx;
    height: 208rpx;
    margin: 84rpx auto 0;
    display: block;
}

.upload-tip {
    font-family: PingFang-SC, PingFang-SC;
    font-size: 28rpx;
    color: #999999;
    line-height: 40rpx;
    text-align: center;
    margin-top: 40rpx;
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
    margin: 30rpx auto 0;
}

.upload-demo-wrap {
    width: 670rpx;
    margin: 80rpx auto 0;
    position: relative;
    display: block;
}

.upload-demo-head-wrap {
    display: flex;
    justify-content: space-between;
}

.upload-demo-head-left {
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold;
    font-size: 32rpx;
    color: #333333;
    line-height: 32rpx;
    display: inline-block;
}

.upload-demo-head-right {
    float: right;
    display: inline-flex;
    justify-content: center;
}

.icon-change {
    width: 28rpx;
    height: 28rpx;
    margin-right: 10rpx;
}

.upload-demo-change-text {
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold;
    font-size: 28rpx;
    color: #999999;
    line-height: 28rpx;
}

.upload-demo-item-group {
    width: 610rpx;
    background: rgba(255,255,255,0);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(120,76,245,0.2);
    border-radius: 24rpx;
    border: 3rpx solid #DFD3F8;
    filter: blur(0px);
    margin: 38rpx auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
}

.ai-chat-demo-pic {
    width: 288rpx;
}

.footer-tabbar-wrap {
    height: 112rpx;
    padding-bottom: env(safe-area-inset-bottom);
}
</style>
