<template>
    <div class="main-page">
        <view class="nav" :style="'background-color: rgba(248, 248, 248, ' + op + ')'">
            <view class="status-bar" :style="'height:' + statusBarHeight + 'px'"></view>
            <div class="nav-back" @click="goback">
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-back.png" class="icon-back">
            </div>
            <view class="title"
                :style="'color: rgba(0, 0, 0,' + op + '); height: ' + navigationBarHeight + 'px; line-height: ' + navigationBarHeight + 'px;'">
                我的收藏</view>
        </view>
        <div class="empty-wrap" :style="{ 'height': navHeight + 'px' }"></div>
        <div class="wrap">
            <tui-no-data imgUrl="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/collect-no-data.png" v-if="chatLogList.length == 0">暂无数据</tui-no-data>
            <template v-else>
                <div class="chat-result-wrap" v-for="item in chatLogList" :key="item.id">
                    <!-- 渲染右侧搜索词/图片 -->
                    <div class="chat-bubble-right" v-if="item.type == 'txt'">{{ item.txt }}</div>
                    <div class="chat-bubble-right pic" v-else>
                        <img :src="item.pic" class="chat-bubble-pic" mode="widthFix"
                            @click="prevImg(item.pic)">
                    </div>
                    <!-- 渲染左侧回复 -->
                    <div class="chat-bubble-response">
                        <div class="chat-bubble-response-text">
                            {{ item.response }}
                        </div>
                        <div class="chat-bubble-response-break-line"></div>
                        <div class="chat-bubble-op-wrap">
                            <div class="chat-bubble-op-item left" @click="copy(item.response)">
                                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-copy.png"
                                    class="chat-bubble-op-icon">
                                <div class="chat-bubble-op-text">复制</div>
                            </div>
                            <!-- <div class="chat-bubble-op-item left" @click="showPopup">
                                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-relay.png"
                                    class="chat-bubble-op-icon">
                                <div class="chat-bubble-op-text">转发</div>
                            </div> -->
                            <div class="chat-bubble-op-item left" @click="collect(item.id, item.is_collect)">
                                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-collect-checked.png"
                                    class="chat-bubble-op-icon" v-if="item.is_collect == 1">
                                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-collect.png"
                                    class="chat-bubble-op-icon" v-else>
                                <div class="chat-bubble-op-text">已收藏</div>
                            </div>
                            <div class="chat-bubble-op-item right">
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="popupShow" @close="hiddenPopup">
            <div class="layer-head-wrap">
                <div class="layer-head-text">转发到</div>
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-close.png" class="icon-close" @click="hiddenPopup">
            </div>
            <div class="layer-content-wrap">
                <div class="layer-item-wrap">
                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-wechat.png" class="layer-item-icon">
                    <div class="layer-item-text">微信好友</div>
                </div>
                <div class="layer-item-wrap">
                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-moments.png" class="layer-item-icon">
                    <div class="layer-item-text">朋友圈</div>
                </div>
                <div class="layer-item-wrap">
                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-poster.png" class="layer-item-icon">
                    <div class="layer-item-text">生成图片</div>
                </div>
            </div>
        </tui-bottom-popup>
    </div>
</template>

<script>
import tuiBottomPopup from '../../components/tui-bottom-popup/tui-bottom-popup.vue'
import tuiNoData from "../../components/tui-no-data/tui-no-data.vue"

export default {
    components: {
        tuiBottomPopup,
        tuiNoData
    },
    data() {
        return {
            navHeight: 0,
            statusBarHeight: 0,
            navigationBarHeight: 0,
            op: 0,
            popupShow: false,
            chatLogList: []
        };
    },
    async onLoad(e) {
        this.calcTopHeight()
        this.chatLogList = await this.getChatLogCollectList()
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
        //调用此方法显示弹层
        showPopup() {
            this.popupShow = true
        },
        hiddenPopup() {
            this.popupShow = false
        },
        goback() {
            uni.navigateBack({
                delta: 1
            });
        },
        getChatLogCollectList() {
            return new Promise((resolve, reject) => {
                this.$fetch({
                    url: this.$store.state.domain + 'get?actionxm=get_chat_log_collect_list',
                    data: {},
                    method: 'post',
                    showLoading: false,
                }).then((res) => {
                    console.log(res)
                    if(res.status == 0) {
                        return resolve(res.data)
                    }
                    uni.showToast({
                        title: res.msg,
                        icon: "none",
                    });
                    return reject(res.msg)
                });
            })
        },

        // 复制内容
        copy(content) {
            uni.setClipboardData({
                data: content,
                success: function () {
                    return uni.showToast({
                        title: "复制成功~",
                        icon: "none",
                    });
                }
            });
        },
        // 收藏
        collect(id, is_collect) {
            let actionxm = 'save_collet_chat_log';
            let msg = '收藏成功~';
            if(is_collect == 1) {
                actionxm = 'cancel_collet_chat_log';
                msg = '取消收藏~'
            }
            return new Promise((resolve, reject) => {
                this.$fetch({
                    url: this.$store.state.domain + 'post?actionxm=' + actionxm,
                    data: {
                        chat_log_id: id
                    },
                    method: 'post',
                    showLoading: false,
                }).then((res) => {
                    console.log(res)
                    // 更新this.chatLogList中节点状态
                    this.chatLogList.map(item => {
                        if (item.id == id) {
                            item.is_collect = res.data['is_collect']
                        }
                    })
                    uni.showToast({
                        title: msg,
                        icon: "none",
                    });
                    console.log('collect chatloglist', this.chatLogList)
                    return resolve(res.data)
                });
            })
        },
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
    margin: 0 auto 24rpx;
    flex-direction: column;
    background: rgba(173, 207, 234, .3);
    border-radius: 24rpx;
    padding: 24rpx 20rpx;
}

.chat-result-wrap:first-of-type {
    margin: 48rpx auto 24rpx;
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

.chat-bubble-right.pic {
    padding: 20rpx 30rpx;
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
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76, 166, 245, 0.2);
    border-radius: 24rpx;
    border: 3rpx solid #FFFFFF;
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
    justify-content: space-between;
    /* 分布子元素，第一个和最后一个分别靠向两端 */
    align-items: center;
    /* 垂直居中对齐 */
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
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76, 166, 245, 0.2), inset 0rpx 6rpx 46rpx 0rpx #DBECFC;
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
    box-shadow: 0rpx 24rpx 40rpx 0rpx rgba(76, 166, 245, 0.33);
    border-radius: 78rpx;
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold;
    font-size: 36rpx;
    color: #FFFFFF;
    text-align: center;
    line-height: 96rpx;
    margin: 20rpx auto 60rpx;
}

.layer-head-wrap {
    position: relative;
}

.layer-head-text {
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold;
    font-size: 36rpx;
    color: #333333;
    line-height: 36rpx;
    text-align: center;
    display: block;
    margin: 42rpx auto;
}

.icon-close {
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    right: 48rpx;
    top: 0;
}

.layer-content-wrap {
    display: flex;
    margin: 60rpx 92rpx;
}

.layer-item-wrap {
    text-align: center;
    flex: 1;
}

.layer-item-icon {
    width: 100rpx;
    height: 100rpx;
}

.layer-item-text {
    font-family: PingFang-SC, PingFang-SC;
    font-size: 32rpx;
    color: #333333;
    line-height: 44rpx;
    text-align: center;
    margin-top: 20rpx;
}

.chat-bubble-pic {
    width: 284rpx;
}

.upload-wrap {
    width: 670rpx;
    height: 530rpx;
    background: rgba(255,255,255,0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76,166,245,0.2), inset 0rpx 6rpx 46rpx 0rpx #DBECFC;
    border-radius: 24rpx;
    border: 3rpx solid #FFFFFF;
    margin: 80rpx auto;
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
</style>
