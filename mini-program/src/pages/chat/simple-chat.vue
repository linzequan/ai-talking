<template>
    <div>
        <!-- 顶部搜索 -->
        <div class="top-wrap">
            <view class="uni-input-wrapper search-txt-wrap">
                <input class="uni-input" confirm-type="search" placeholder="复制对方聊天的话" v-model="searchTxt" />
                <image src="@/static/cancel.png" class="icon-cancel" v-if="showClearIcon" @click="clearSearchTxt"></image>
            </view>
            <button size="default" type="default" class="search-btn" @click="searchSimpleTxt">生成</button>
        </div>
        <!-- 热门推荐 -->
        <div class="recommend-wrap">
            <div class="recommend-title">热门推荐</div>
            <div class="recommend-group">
                <div class="recommend-item checked">再见</div>
                <div class="recommend-item">没兴趣</div>
                <div class="recommend-item">不想说话</div>
                <div class="recommend-item">我回来了</div>
                <div class="recommend-item">出来</div>
                <div class="recommend-item">回答</div>
            </div>
            <button size="default" type="default" class="recommend-btn">换一换</button>
        </div>
        <!-- 历史记录 -->
        <div class="history-wrap">
            <div class="history-title">历史记录</div>
            <div class="history-group">
                <div class="history-item checked">再见</div>
                <div class="history-item">没兴趣</div>
                <div class="history-item">不想说话</div>
                <div class="history-item">我回来了</div>
                <div class="history-item">出来</div>
                <div class="history-item">回答</div>
            </div>
            <button size="default" type="default" class="history-btn">清除历史记录</button>
        </div>
        <!-- 底部tabbar -->
        <div class="footer-tabbar-wrap">
            <tui-tabbar></tui-tabbar>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // showClearIcon: false,
            searchTxt: ''
        };
    },
    computed: {
        showClearIcon() {
            if(this.searchTxt == '') return false
            return true
        }
    },
    onLoad(e) {
    },
    onShareAppMessage() {
    },
    methods: {
        clearSearchTxt() {
            this.searchTxt = '';
        },
        searchInput() {
            console.log('input', this.searchTxt == '')
            if(this.searchTxt == '') return this.showClearIcon = false
            return this.showClearIcon = true
        },
        searchSimpleTxt() {
            uni.navigateTo({
                url: '/pages/chat/chat-result'
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
