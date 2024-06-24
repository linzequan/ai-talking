<template>
    <div>
        <!-- 顶部搜索 -->
        <div class="top-wrap">
            <view class="uni-input-wrapper search-txt-wrap">
                <input class="uni-input" confirm-type="search" placeholder="复制对方聊天的话" v-model="searchTxt" />
                <image src="@/static/cancel.png" class="icon-cancel" v-if="showClearIcon" @click="clearSearchTxt">
                </image>
            </view>
            <button size="default" type="default" class="search-btn" v-if="hasLogin" @click="searchSimpleTxt">生成</button>
            <button size="default" type="default" class="search-btn" v-else @click="getUserInfo('searchSimpleTxt')">生成</button>
        </div>
        <!-- 热门推荐 -->
        <div class="recommend-wrap">
            <div class="recommend-title">热门推荐</div>
            <div class="recommend-group">
                <template v-for="item in recommendList" :key="item.id">
                    <div class="recommend-item checked" @click="checkRecommend(item.label)"
                        v-if="item.label === recommendCheck">{{ item.label }}</div>
                    <div class="recommend-item" @click="checkRecommend(item.label)" v-else>{{ item.label }}</div>
                </template>
                <!-- <div class="recommend-item checked">再见</div>
                <div class="recommend-item">没兴趣</div>
                <div class="recommend-item">不想说话</div>
                <div class="recommend-item">我回来了</div>
                <div class="recommend-item">出来</div>
                <div class="recommend-item">回答</div> -->
            </div>
            <button size="default" type="default" class="recommend-btn" @click="getRecommendList">换一换</button>
        </div>
        <!-- 历史记录 -->
        <div class="history-wrap" v-if="historyList.length > 0">
            <div class="history-title">历史记录</div>
            <div class="history-group">
                <template v-for="item in historyList" :key="item.id">
                    <div class="history-item">{{ item.label }}</div>
                </template>
            </div>
            <button size="default" type="default" class="history-btn" @click="deleteHistory">清除历史记录</button>
        </div>
        <!-- 底部tabbar -->
        <div class="footer-tabbar-wrap">
            <tui-tabbar></tui-tabbar>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            searchTxt: '',
            recommendList: {},
            recommendCheck: '',
            historyList: {},
            canIUseGetUserProfile: false,
        };
    },
    computed: {
        ...mapState({
            hasLogin: (state) => state.hasLogin
        }),
        showClearIcon() {
            if (this.searchTxt == '') return false
            return true
        }
    },
    onLoad(e) {
        if (uni.getUserProfile) {
            this.canIUseGetUserProfile = true
        }
        this.getRecommendList();
        if(this.hasLogin) {
            this.getHistoryList();
        }
    },
    onShareAppMessage() {
    },
    methods: {
        clearSearchTxt() {
            this.searchTxt = '';
        },
        searchInput() {
            console.log('input', this.searchTxt == '')
            if (this.searchTxt == '') return this.showClearIcon = false
            return this.showClearIcon = true
        },
        searchSimpleTxt() {
            uni.navigateTo({
                url: '/pages/chat/search-result'
            })
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
        getHistoryList() {
            this.$fetch({
                url: this.$store.state.domain + 'get?actionxm=get_simple_chat_txt_list',
                showLoading: false
            }).then(res => {
                if (res.status == 0) {
                    this.historyList = res.data
                } else {
                    uni.showToast({
                        title: "获取数据异常~",
                        icon: "none",
                    });
                    return;
                }
            })
        },
        deleteHistory() {
            this.$fetch({
                url: this.$store.state.domain + 'get?actionxm=delete_simple_chat_txt_list',
                showLoading: false
            }).then(res => {
                if (res.status == 0) {
                    return uni.showToast({
                        title: '清除成功~',
                        icon: 'none'
                    });
                } else {
                    uni.showToast({
                        title: "获取数据异常~",
                        icon: "none",
                    });
                }
            })
        },
        checkRecommend(label) {
            this.recommendCheck = label
            this.searchTxt = label
            this.searchSimpleTxt()
        },
        getUserInfo(elem) {
            if (!this.canIUseGetUserProfile) {
                uni.showModal({
                    title: '温馨提示',
                    content: "微信版本过低，请升级后使用~",
                    showCancel: false
                })
            }
            uni.getUserProfile({
                desc: '对话大师',
                success: (result) => {
                    console.log('使用新api获取用户信息=> ', result);
                    if (result.errMsg !== "getUserProfile:ok") {
                        uni.showModal({
                            title: "温馨提示",
                            content: "请同意微信授权，才能获取积分哟！",
                            showCancel: false,
                        });
                        return;
                    }
                    this.$store.commit("LOGIN", result.userInfo);
                    this.$store.dispatch('GETOPENID');
                    switch (elem) {
                        case 'searchSimpleTxt':
                            this.searchSimpleTxt();
                            break;
                        default:
                            break;
                    }
                }
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

.top-wrap {
    display: flex;
    width: 720rpx;
    margin: 10rpx auto;
}

.search-txt-wrap {
    flex: 1;
    position: relative;
}

.search-txt-wrap .uni-input {
    border: 2rpx solid #f54a45;
    border-radius: 10rpx;
    display: inline-block;
    height: 76rpx;
    padding: 0 10rpx;
    padding-right: 70rpx;
    display: block;
    font-size: 28rpx;
}

.icon-cancel {
    position: absolute;
    right: 0;
    top: 0;
    width: 60rpx;
    height: 60rpx;
    padding: 10rpx;
}

.search-btn {
    width: 120rpx;
    background-color: #f54a45;
    color: #fff;
    margin-left: 10rpx;
    font-size: 28rpx;
    line-height: 80rpx;
    height: 80rpx;
}

.recommend-wrap {
    width: 700rpx;
    margin: 20rpx auto 0;
    border: 2rpx solid #f54a45;
    border-radius: 10rpx;
    background: #f6f0f0;
    padding: 20rpx 10rpx;
}

.recommend-title {
    font-size: 36rpx;
    font-weight: bold;
    margin: 5rpx 0 15rpx 5rpx;
}

.recommend-group {
    display: flex;
    flex-wrap: wrap;
}

.recommend-item {
    width: 140rpx;
    height: 60rpx;
    margin: 10rpx;
    line-height: 60rpx;
    border: 1rpx solid #f54a45;
    border-radius: 10rpx;
    background: #fff;
    color: #000;
    text-align: center;
    font-size: 28rpx;
    padding: 5rpx;
}

.recommend-item.checked {
    border: 1rpx solid #f54a45;
    border-radius: 10rpx;
    background: #f54a45;
    color: #fff;
}

.recommend-btn {
    width: 160rpx;
    background-color: #f54a45;
    color: #fff;
    margin-top: 25rpx;
    font-size: 28rpx;
    line-height: 80rpx;
    height: 80rpx;
    margin-bottom: 15rpx;
}

.history-wrap {
    width: 700rpx;
    margin: 20rpx auto 0;
    border: 2rpx solid #f54a45;
    border-radius: 10rpx;
    background: #f6f0f0;
    padding: 20rpx 10rpx;
}

.history-title {
    font-size: 36rpx;
    font-weight: bold;
    margin: 5rpx 0 15rpx 5rpx;
}

.history-group {
    display: flex;
    flex-wrap: wrap;
}

.history-item {
    width: 140rpx;
    height: 60rpx;
    margin: 10rpx;
    line-height: 60rpx;
    border: 1rpx solid #f54a45;
    border-radius: 10rpx;
    background: #fff;
    color: #000;
    text-align: center;
    font-size: 28rpx;
    padding: 5rpx;
}

.history-item.checked {
    border: 1rpx solid #f54a45;
    border-radius: 10rpx;
    background: #f54a45;
    color: #fff;
}

.history-btn {
    width: 240rpx;
    background-color: #f54a45;
    color: #fff;
    margin-top: 25rpx;
    font-size: 28rpx;
    line-height: 80rpx;
    height: 80rpx;
    margin-bottom: 15rpx;
}
</style>
