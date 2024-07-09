<template>
    <div>
        <!-- 欢迎页 -->
        <div :class="fadeOutScreenPageCls" v-if="showOpenScreenPage">
            <!-- <image src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/open-screen-page-logo.png" class="open-screen-page-logo animated pulse infinite" style="animation-duration: 0.5s; animation-delay: 0.5s;"></image> -->
            <image src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/open-screen-page-logo.png"
                class="open-screen-page-logo animated jackInTheBox"
                style="animation-duration: 1s; animation-delay: .5s;"></image>
        </div>
        <!-- 首页内容 -->
        <div class="main-page" v-show="beginFadeOutScreenPage">
            <view class="nav" :style="'background-color: rgba(248, 248, 248, ' + op + ')'">
                <view class="status-bar" :style="'height:' + statusBarHeight + 'px'"></view>
                <view class="title"
                    :style="'color: rgba(0, 0, 0,' + op + '); height: ' + navigationBarHeight + 'px; line-height: ' + navigationBarHeight + 'px;'">
                    聊天大师</view>
            </view>
            <div class="empty-wrap" :style="{ 'height': navHeight + 'px' }"></div>
            <div class="top-wrap">
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/simple-chat-title.png"
                    class="top-wrap-title" mode="widthFix">
            </div>
            <div class="chat-content-wrap">
                <textarea class="chat-content-textarea" maxlength="-1" placeholder="点击输入或粘贴对方聊天内容～"
                    placeholder-style="font-size: 32rpx; line-height: 1.5; color: #9C9C9C;"
                    v-model="searchTxt"></textarea>
                <div v-if="hasLogin">
                    <div class="chat-content-btn" @click="searchSimpleTxt">一键生成回复</div>
                </div>
                <div v-else>
                    <div class="chat-content-btn" @click="showLoginDialog">一键生成回复</div>
                    <!-- <div class="chat-content-btn" @click="getUserInfo('searchSimpleTxt')">一键生成回复</div> -->
                </div>
            </div>
            <div class="guess-wrap">
                <div class="guess-head-wrap">
                    <div class="guess-head-left">猜你想搜</div>
                    <div class="guess-head-right">
                        <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-change.png"
                            class="icon-change">
                        <div class="guess-change-text" @click="getRecommendList">换一换</div>
                    </div>
                </div>
                <div class="guess-item-group">
                    <template v-for="item in recommendList">
                        <div class="guess-item-wrap" v-if="hasLogin" :key="item.id" @click="checkRecommend(item.label)">
                            {{ item.label }}</div>
                        <div class="guess-item-wrap" v-else :key="item.id" @click="showLoginDialog">{{ item.label }}
                        </div>
                    </template>
                    <!-- <div class="guess-item-wrap">我洗澡去了</div>
                    <div class="guess-item-wrap">明天再说吧</div>
                    <div class="guess-item-wrap">没兴趣</div>
                    <div class="guess-item-wrap">再说吧</div>
                    <div class="guess-item-wrap">你要这样想我也没办法</div>
                    <div class="guess-item-wrap">我错了还不行吗</div> -->
                </div>
            </div>
            <!-- 底部tabbar -->
            <div class="footer-tabbar-wrap">
                <!-- <tui-tabbar :canSwitch='canSwitch' @beforeSwitchFn='checkStatus'></tui-tabbar> -->
                <tui-tabbar :canSwitch='canSwitch' @beforeSwitchFn='showLoginDialog'></tui-tabbar>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            // 自定义头部
            navHeight: 0,
            statusBarHeight: 0,
            navigationBarHeight: 0,
            op: 0,
            searchTxt: '',
            recommendList: {},
            recommendCheck: '',
            historyList: {},
            canIUseGetUserProfile: false,
            isShowTabbar: false,
            showOpenScreenPage: true,
            beginFadeOutScreenPage: false,
        };
    },
    computed: {
        ...mapState({
            hasLogin: (state) => state.hasLogin,
            tabBarIndex: (state) => state.tabBarIndex
        }),
        canSwitch() {
            let flag = false;
            if (this.hasLogin) flag = true;
            // console.log('canSwitch=> ', this.hasLogin, flag)
            return flag
        },
        fadeOutScreenPageCls() {
            return this.beginFadeOutScreenPage ? 'open-screen-page animated fadeOut' : 'open-screen-page'
        }
    },
    onShareAppMessage() {
        return {
            title: "对话大师",
            path: "/pages/chat/simple-chat",
        };
    },
    onLoad(e) {
        this.calcTopHeight()
        if (uni.getUserProfile) {
            this.canIUseGetUserProfile = true
        }
        this.fadeOutOpenScreenPage();
        this.getRecommendList();
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
        fadeOutOpenScreenPage() {
            setTimeout(() => {
                this.beginFadeOutScreenPage = true;
                this.isShowTabbar = true;
                setTimeout(() => {
                    this.showOpenScreenPage = false
                }, 0)
            }, 0)
        },
        searchSimpleTxt() {
            if (this.searchTxt == '') {
                return uni.showToast({
                    title: "聊天内容为空~",
                    icon: "none",
                });
            }
            // 将文案存入缓存
            uni.setStorageSync('simple_chat_text', this.searchTxt);
            uni.navigateTo({
                url: '/pages/chat/search-result?type=txt'
            })
            this.searchTxt = ''
        },
        getRecommendList() {
            this.$fetch({
                url: this.$store.state.domain + 'get?actionxm=get_recommend_list',
                showLoading: false
            }).then(res => {
                if (res.status == 0) {
                    this.recommendList = res.data
                    this.recommendCheck = this.recommendList[0]['label']
                } else {
                    uni.showToast({
                        title: "获取数据异常~",
                        icon: "none",
                    });
                    return;
                }
            })
        },
        checkRecommend(label) {
            this.recommendCheck = label
            this.searchTxt = label
            this.searchSimpleTxt()
        },
        // 显示登录弹窗
        showLoginDialog() {
            const self = this
            uni.showModal({
                content: '请先登录，开启高情商对话之旅~',
                success(res) {
                    if (res.confirm) {
                        uni.showLoading()
                        // 进行微信登录
                        if (!self.canIUseGetUserProfile) {
                            uni.showModal({
                                title: '温馨提示',
                                content: "微信版本过低，请升级后使用~",
                                showCancel: false
                            })
                        }
                        uni.getUserProfile({
                            desc: '对话大师',
                            success: async (result) => {
                                console.log('使用新api获取用户信息=> ', result);
                                if (result.errMsg !== "getUserProfile:ok") {
                                    uni.showModal({
                                        title: "温馨提示",
                                        content: "请同意微信授权，开启高情商对话之旅",
                                        showCancel: false,
                                    });
                                    return;
                                }
                                await self.$store.dispatch('GETOPENID');
                                await self.$store.commit("LOGIN", result.userInfo);
                                // 更新用户信息
                                await self.getUserInfo()
                                uni.hideLoading()
                                uni.showToast({
                                    title: "登录成功~",
                                    icon: "none",
                                });
                            }
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            })
        },
        // async getUserInfo(elem) {
        //     if (!this.canIUseGetUserProfile) {
        //         uni.showModal({
        //             title: '温馨提示',
        //             content: "微信版本过低，请升级后使用~",
        //             showCancel: false
        //         })
        //     }
        //     uni.getUserProfile({
        //         desc: '对话大师',
        //         success: async (result) => {
        //             console.log('使用新api获取用户信息=> ', result);
        //             if (result.errMsg !== "getUserProfile:ok") {
        //                 uni.showModal({
        //                     title: "温馨提示",
        //                     content: "请同意微信授权，开启高情商对话之旅",
        //                     showCancel: false,
        //                 });
        //                 return;
        //             }
        //             await this.$store.dispatch('GETOPENID');
        //             await this.$store.commit("LOGIN", result.userInfo);
        //             switch (elem) {
        //                 case 'searchSimpleTxt':
        //                     this.searchSimpleTxt();
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         }
        //     })
        // },
        // 检查登录以及认证状态，显示对应弹窗提示
        async checkStatus() {
            console.log('点击tabbar', this.tabBarIndex)
            if (!this.hasLogin) {
                uni.getUserProfile({
                    desc: '对话大师',
                    success: async (result) => {
                        console.log('使用新api获取用户信息=> ', result);
                        if (result.errMsg !== "getUserProfile:ok") {
                            uni.showModal({
                                title: "温馨提示",
                                content: "请同意微信授权，开启高情商对话之旅",
                                showCancel: false,
                            });
                            return;
                        }
                        await this.$store.dispatch('GETOPENID');
                        await this.$store.commit("LOGIN", result.userInfo);
                    }
                });
                return false;
            }
            return true;
        },
        // 查询用户信息
        getUserInfo() {
            new Promise((resolve, reject) => {
                this.$fetch({
                    url: this.$store.state.domain + 'get?actionxm=get_userinfo_by_openid',
                    method: 'get',
                    showLoading: false,
                }).then((res) => {
                    console.log(res)
                    if(res.status == 0) {
                        this.$store.commit('userLoginInfo', res['data']['userinfo']);
                    } else {
                        uni.showModal({
                            title: "温馨提示",
                            content: "新版本已更新，点击确认升级~",
                            showCancel: false,
                            success(res) {
                                if (res.confirm) {
                                    // 获取当前页面信息
                                    const pages = getCurrentPages();
                                    const currentPage = pages[pages.length - 1];

                                    // 获取当前页面的路径
                                    const currentPath = currentPage.route;
                                    uni.reLaunch({
                                        url: currentPath
                                    });
                                }
                            }
                        });
                    }
                    return resolve(res)
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

.title {
    text-align: center;
    font-size: 28rpx;
}

.open-screen-page {
    width: 100vw;
    height: 100vh;
    background: url(https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/open-screen-page-bg.png) no-repeat center;
    background-size: cover;
    overflow: hidden;
    position: absolute;
    z-index: 99999;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.open-screen-page-logo {
    width: 280rpx;
    height: 280rpx;
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
    background: url(https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/simple-chat-top-bg.png) no-repeat right;
    background-size: 750rpx 420rpx;
    width: 750rpx;
    height: 420rpx;
}

.top-wrap-title {
    width: 530rpx;
    margin-top: 94rpx;
    margin-left: 40rpx;
}

.chat-content-wrap {
    width: 670rpx;
    height: 530rpx;
    position: relative;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76, 166, 245, 0.2), inset 0rpx 6rpx 46rpx 0rpx #DBECFC;
    display: block;
    margin: -36rpx auto 0;
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
    height: 325rpx;
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

.guess-wrap {
    width: 670rpx;
    margin: 80rpx auto 0;
    position: relative;
    display: block;
}

.guess-head-wrap {
    display: flex;
    justify-content: space-between;
}

.guess-head-left {
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold;
    font-size: 32rpx;
    color: #333333;
    line-height: 32rpx;
    display: inline-block;
}

.guess-head-right {
    float: right;
    display: inline-flex;
    justify-content: center;
}

.icon-change {
    width: 28rpx;
    height: 28rpx;
    margin-right: 10rpx;
}

.guess-change-text {
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold;
    font-size: 28rpx;
    color: #999999;
    line-height: 28rpx;
}

.guess-item-group {
    margin-top: 40rpx;
}

.guess-item-wrap {
    border-radius: 16rpx;
    border: 2rpx solid #DDDDDD;
    padding: 20rpx 24rpx;
    font-family: PingFang-SC, PingFang-SC;
    font-size: 24rpx;
    color: #333333;
    line-height: 24rpx;
    display: inline-block;
    margin-right: 24rpx;
    margin-bottom: 24rpx;
}
</style>
