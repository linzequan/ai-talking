<template>
    <div class="main-page">
        <view class="nav" :style="'background-color: rgba(248, 248, 248, ' + op + ')'">
            <view class="status-bar" :style="'height:' + statusBarHeight + 'px'"></view>
            <div class="nav-back" @click="goback">
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-back.png" class="icon-back">
            </div>
            <view class="title"
                :style="'color: rgba(0, 0, 0,' + op + '); height: ' + navigationBarHeight + 'px; line-height: ' + navigationBarHeight + 'px;'">
                聊天大师</view>
        </view>
        <div class="empty-wrap" :style="{ 'height': navHeight + 'px' }"></div>
        <div class="wrap">
            <div class="chat-result-wrap">
                <template v-for="item in chatLogList">
                    <!-- 渲染右侧搜索词 -->
                    <template v-if="item.position == 'right'">
                        <div class="chat-bubble-right" v-if="item.type == 'txt'">{{ item.content }}</div>
                        <div class="chat-bubble-right pic" v-else>
                            <img :src="item.content" class="chat-bubble-pic" mode="widthFix"
                                @click="prevImg(item.content)">
                        </div>
                    </template>
                    <!-- 渲染左侧结果 -->
                    <template v-if="item.position == 'left'">
                        <div class="chat-bubble-response">
                            <div class="chat-bubble-response-text">{{ item.content }}
                                <!-- 甲辰龙年，大年三十除夕夜，家家户户的鞭炮声此起彼伏，绚丽的烟花盛开在沈阳的夜色上空，子儿带着儿子李自然，在窗前感受着这浓浓的年味儿。天亮后，居民楼的门口落了一层厚厚的“红地毯”，空气的爆竹味还没散去的，正是北上广深失去的“年味儿”。爆竹腾空，烟花盛开，为团聚的时刻增添了喜庆，但这一地的残局又该如何处理？ -->
                            </div>
                            <div class="chat-bubble-response-break-line"></div>
                            <div class="chat-bubble-op-wrap">
                                <div class="chat-bubble-op-item left">
                                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-copy.png"
                                        class="chat-bubble-op-icon">
                                    <div class="chat-bubble-op-text">复制</div>
                                </div>
                                <div class="chat-bubble-op-item left" @click="showPopup">
                                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-relay.png"
                                        class="chat-bubble-op-icon">
                                    <div class="chat-bubble-op-text">转发</div>
                                </div>
                                <div class="chat-bubble-op-item left">
                                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-collect.png"
                                        class="chat-bubble-op-icon">
                                    <div class="chat-bubble-op-text">收藏</div>
                                </div>
                                <div class="chat-bubble-op-item right" v-if="item.type == 'txt'"
                                    @click="changeTxtSearch(item.id)">
                                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/chat-icon-change.png"
                                        class="chat-bubble-op-icon">
                                    <div class="chat-bubble-op-text">换个答案</div>
                                </div>
                                <div class="chat-bubble-op-item right" v-else @click="changePicTxtSearch(item.id)">
                                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/chat-icon-change.png"
                                        class="chat-bubble-op-icon">
                                    <div class="chat-bubble-op-text">换个答案</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>

                <template v-if="searchTxt || searchPicList.length > 0">
                    <div class="chat-bubble-right" v-if="resultType == 'txt'">{{ searchTxt }}</div>
                    <div class="chat-bubble-right pic" v-else>
                        <img :src="searchPicList[0]" class="chat-bubble-pic" mode="widthFix"
                            @click="prevImg(searchPicList[0])">
                    </div>
                </template>
                <template v-if="responseText">
                    <div class="chat-bubble-response">
                        <div class="chat-bubble-response-text">{{ responseText }}
                            <!-- 甲辰龙年，大年三十除夕夜，家家户户的鞭炮声此起彼伏，绚丽的烟花盛开在沈阳的夜色上空，子儿带着儿子李自然，在窗前感受着这浓浓的年味儿。天亮后，居民楼的门口落了一层厚厚的“红地毯”，空气的爆竹味还没散去的，正是北上广深失去的“年味儿”。爆竹腾空，烟花盛开，为团聚的时刻增添了喜庆，但这一地的残局又该如何处理？ -->
                        </div>
                        <!-- <div class="chat-bubble-response-break-line" v-if="responseText"></div>
                        <div class="chat-bubble-op-wrap" v-if="responseText">
                            <div class="chat-bubble-op-item left">
                                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-copy.png"
                                    class="chat-bubble-op-icon">
                                <div class="chat-bubble-op-text">复制</div>
                            </div>
                            <div class="chat-bubble-op-item left" @click="showPopup">
                                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-relay.png"
                                    class="chat-bubble-op-icon">
                                <div class="chat-bubble-op-text">转发</div>
                            </div>
                            <div class="chat-bubble-op-item left">
                                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-collect.png"
                                    class="chat-bubble-op-icon">
                                <div class="chat-bubble-op-text">收藏</div>
                            </div>
                            <div class="chat-bubble-op-item right">
                                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/chat-icon-change.png"
                                    class="chat-bubble-op-icon">
                                <div class="chat-bubble-op-text">换个答案</div>
                            </div>
                        </div> -->
                    </div>
                </template>
            </div>
            <div :class="fadeInMoreCls" style="animation-duration: 1s; animation-delay: .5s;">
                <div class="chat-break-wrap">再聊点新内容吧</div>
                <div class="chat-content-wrap" v-if="resultType == 'txt'">
                    <textarea class="chat-content-textarea" maxlength="-1" placeholder="点击输入或粘贴对方聊天内容～"
                        placeholder-style="font-size: 32rpx; line-height: 1.5; color: #9C9C9C;"
                        v-model="newSearchTxt"></textarea>
                    <div class="chat-content-btn" @click="handleAnotherTxtSearch">一键生成回复</div>
                </div>
                <div class="upload-wrap" v-else>
                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/ai-chat-upload-btn.png"
                        class="ai-chat-upload-btn" @click="openActionSheet">
                    <div class="upload-tip">上传聊天图片生成智能回复</div>
                    <div class="chat-content-btn" @click="handleSearchPicTxt([])">生成智能回复</div>
                </div>
            </div>
        </div>
        <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="popupShow" @close="hiddenPopup">
            <div class="layer-head-wrap">
                <div class="layer-head-text">转发到</div>
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-close.png" class="icon-close"
                    @click="hiddenPopup">
            </div>
            <div class="layer-content-wrap">
                <div class="layer-item-wrap">
                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-wechat.png"
                        class="layer-item-icon">
                    <div class="layer-item-text">微信好友</div>
                </div>
                <div class="layer-item-wrap">
                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-moments.png"
                        class="layer-item-icon">
                    <div class="layer-item-text">朋友圈</div>
                </div>
                <div class="layer-item-wrap">
                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-poster.png"
                        class="layer-item-icon">
                    <div class="layer-item-text">生成图片</div>
                </div>
            </div>
        </tui-bottom-popup>

        <tui-actionsheet :show="showActionSheet" :item-list="itemList" @click="itemClick" @cancel="closeActionSheet">
        </tui-actionsheet>
    </div>
</template>

<script>
import tuiBottomPopup from '../../components/tui-bottom-popup/tui-bottom-popup.vue'
import tuiActionsheet from '../../components/tui-actionsheet/tui-actionsheet.vue'

export default {
    components: {
        tuiBottomPopup,
        tuiActionsheet
    },
    data() {
        return {
            navHeight: 0,
            statusBarHeight: 0,
            navigationBarHeight: 0,
            op: 0,
            resultType: 'txt', // txt, pic
            popupShow: false,
            // 上传弹窗
            showActionSheet: false,
            itemList: [{
                text: "拍摄",
                color: "#333333"
            }, {
                text: "从手机相册选择",
                color: "#333333"
            }],
            requestTask: undefined,
            searchTxt: '',
            responseText: '',
            searchPicList: [],
            responsePicText: '',
            chatLogList: [],
            // [{
            //     type: txt,
            //     position: 'right',
            //     content: 'xxxx'
            // }]
            newSearchTxt: '',
            hasSearch: true,
        };
    },
    computed: {
        fadeInMoreCls() {
            return !this.hasSearch ? 'animated fadeInUp' : 'dn'
        }
    },
    async onLoad(e) {
        this.calcTopHeight()
        this.resultType = e.type || 'txt'
        console.log(this.resultType)
        if (this.resultType == 'txt') {
            // 搜索文本
            this.searchTxt = uni.getStorageSync('simple_chat_text', '')
            if (this.searchTxt == '') {
                uni.setStorageSync('simple_chat_text', '');
                uni.showToast({
                    title: "参数异常~",
                    icon: "none",
                });
                this.goback()
                return
            }
            // 查询历史聊天记录
            // await this.getChatLog(this.resultType)
            await this.handleSearchTxt(this.searchTxt)
        } else if (this.resultType == 'pic') {
            // 搜索图片
            this.searchPicList = uni.getStorageSync('ai_chat_pic', [])
            if (this.searchPicList.length == 0) {
                uni.setStorageSync('ai_chat_pic', []);
                uni.showToast({
                    title: "参数异常~",
                    icon: "none",
                });
                this.goback()
                return
            }
            await this.handleSearchPicTxt(this.searchPicList)
        }
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
        handleAnotherTxtSearch() {
            this.searchTxt = this.newSearchTxt
            this.newSearchTxt = ''
            this.handleSearchTxt(this.searchTxt)
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
        //隐藏组件
        closeActionSheet() {
            this.showActionSheet = false
        },
        //调用此方法显示组件
        openActionSheet(type) {
            this.showActionSheet = true;
        },
        uploadImg(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFiles;
            const tempFiles = res.tempFiles;
            const self = this
            if (!tempFilePaths[0]) {
                uni.showToast({
                    title: "请上传图片",
                    duration: 2000,
                    icon: "none",
                });
                return;
            }
            self.value2 = tempFilePaths[0].path;
            uni.showLoading({
                mask: true,
                title: "加载中",
            });
            uni.uploadFile({
                url: self.$store.state.domain + "post?actionxm=upload",
                method: "post",
                filePath: tempFilePaths[0].path,
                name: "file",
                formData: {
                    type: 'aichat',
                    openid: self.$store.state.openid,
                },
                success: (res) => {
                    uni.hideLoading();
                    const resultObj = JSON.parse(res.data)
                    if (resultObj['status'] == 0) {
                        self.searchPicList = []
                        self.$forceUpdate()
                        self.searchPicList.push(resultObj.url)
                        self.handleSearchPicTxt(self.searchPicList)
                    } else {
                        uni.showToast({
                            title: "图片上传失败",
                            duration: 2000,
                            icon: "none",
                        });
                        return;
                    }
                },
                error: (error) => {
                    console.log(error);
                },
                complete: () => {
                    uni.hideLoading();
                },
            });
        },
        itemClick(e) {
            console.log(e)
            let index = e.index;
            this.closeActionSheet();
            var self = this
            if (index == 0) {
                // 拍摄
                uni.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['camera'], //从相册选择
                    success(res) {
                        self.uploadImg(res)
                    }
                });
            } else if (index == 1) {
                // 从相册选择
                uni.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success(res) {
                        self.uploadImg(res)
                    }
                });
            }
        },
        goback() {
            uni.navigateBack({
                delta: 1
            });
        },
        // 搜索文本
        handleSearchTxt(txt) {
            if (txt == '') {
                return uni.showToast({
                    title: "聊天内容为空~",
                    icon: "none",
                });
            }
            this.hasSearch = true
            this.requestTask = wx.request({
                // url: 'http://dev.wxpma.com/index.php/aitalking/get_simple_chat',
                url: this.$store.state.domain + 'get_simple_chat',
                data: {
                    txt: txt
                },
                header: { 'Content-Type': 'application/json' },
                enableChunked: true,
                responseType: 'text',
                method: 'GET',
                timeout: 300e3,
                success: res => {
                    console.log('handleSearchTxt finish', res)
                    console.log('保存聊天记录')
                    this.saveChatLog('txt', JSON.stringify({
                        response: this.responseText,
                        txt: this.searchTxt
                    }))
                    const timestamp = Date.now()
                    // 保存搜索词
                    this.chatLogList.push({
                        id: timestamp,
                        type: 'txt',
                        position: 'right',
                        content: this.searchTxt
                    })
                    // 保存回复
                    this.chatLogList.push({
                        id: timestamp,
                        type: 'txt',
                        position: 'left',
                        content: this.responseText
                    })
                    this.responseText = ''
                    this.searchTxt = ''
                    this.hasSearch = false
                    console.log(this.chatLogList)
                },
                fail: (err) => {
                    this.hasSearch = false
                    console.error('handleSearchTxt err: ', err)
                }
            });
            this.requestTask.onHeadersReceived(res => {
            })
            this.requestTask.onChunkReceived(res => this.handleChunk(res))
        },
        // 流式输出处理文本
        handleChunk(res) {
            const arrayBuffer = res.data;
            const uint8Array = new Uint8Array(arrayBuffer);
            let data = uni.arrayBufferToBase64(uint8Array)
            data = new Buffer(data, 'base64')
            data = data.toString('utf8')
            console.log(data)
            const lines = data.split("\n\n")
            lines.forEach(line => {
                if (!line.trim()) {
                    return
                }
                this.responseText += line.trim()
            })
        },
        // 搜索图片
        handleSearchPicTxt(picList) {
            if (picList.length == 0) {
                return uni.showToast({
                    title: "请先上传图片~",
                    icon: "none",
                });
            }
            // picList = ['https://wxpma-stg1.kakaday.com//mnt-public/aitalking/aichat/oswkJ7YAK_VjhWu0X98X-vxEcmkk_1720460850t8g53ks1.jpg']
            this.hasSearch = true
            this.requestTask = wx.request({
                // url: 'http://dev.wxpma.com/index.php/aitalking/get_ai_chat',
                url: this.$store.state.domain + 'get_ai_chat',
                data: {
                    picList: picList
                },
                header: { 'Content-Type': 'application/json' },
                enableChunked: true,
                responseType: 'text',
                method: 'GET',
                timeout: 300e3,
                success: res => {
                    console.log('handleSearchPicTxt finish', res)
                    console.log('保存聊天记录')
                    this.saveChatLog('pic', JSON.stringify({
                        response: this.responseText,
                        pic: this.searchPicList[0]
                    }))
                    const timestamp = Date.now()
                    // 保存搜索词
                    this.chatLogList.push({
                        id: timestamp,
                        type: 'pic',
                        position: 'right',
                        content: this.searchPicList[0]
                    })
                    // 保存回复
                    this.chatLogList.push({
                        id: timestamp,
                        type: 'pic',
                        position: 'left',
                        content: this.responseText
                    })
                    this.responseText = ''
                    this.searchPicList = []
                    this.hasSearch = false
                    console.log(this.chatLogList)
                },
                fail: (err) => {
                    this.hasSearch = false
                    console.error('handleSearchTxt err: ', err)
                }
            });
            this.requestTask.onHeadersReceived(res => {
            })
            this.requestTask.onChunkReceived(res => this.handleChunk(res))
        },
        // 保存聊天记录
        saveChatLog(type, params) {
            this.$fetch({
                url: this.$store.state.domain + 'post?actionxm=save_chat_log',
                data: {
                    type: type,
                    params: params
                },
                method: 'post',
                showLoading: false,
            }).then((res) => {
                console.log(res)
            });
        },
        // 获取聊天记录
        getChatLog(type) {
            this.$fetch({
                url: this.$store.state.domain + 'get?actionxm=get_chat_log_list',
                data: {
                    type: type
                },
                method: 'post',
                showLoading: false,
            }).then((res) => {
                console.log(res)
            });
        },
        // 文字搜索换个答案
        changeTxtSearch(id) {
            // 从当前chatLogList获取右侧的查询词
            const newArr = []
            this.chatLogList.forEach(item => {
                if (item.id == id && item.position == 'right') {
                    this.searchTxt = item.content
                }
                if (item.id != id) {
                    newArr.push(item)
                }
            })
            this.chatLogList = newArr
            this.handleSearchTxt(this.searchTxt)
        },
        // 图片搜索换个答案
        changePicTxtSearch(id) {
            // 从当前chatLogList获取右侧的查询词
            const newArr = []
            this.searchPicList = []
            this.chatLogList.forEach(item => {
                if (item.id == id && item.position == 'right') {
                    this.searchPicList.push(item.content)
                }
                if (item.id != id) {
                    newArr.push(item)
                }
            })
            this.chatLogList = newArr
            this.handleSearchPicTxt(this.searchPicList)
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
    margin-bottom: 26rpx;
}

.chat-bubble-response-text {
    min-width: 604rpx;
    min-height: 30rpx;
    font-family: PingFang-SC, PingFang-SC;
    font-size: 32rpx;
    color: #333333;
    line-height: 48rpx;
    margin: 28rpx 32rpx;
    text-align: left;
    display: block;
    text-align: justify;
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
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76, 166, 245, 0.2), inset 0rpx 6rpx 46rpx 0rpx #DBECFC;
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
    box-shadow: 0rpx 24rpx 40rpx 0rpx rgba(76, 166, 245, 0.33);
    border-radius: 78rpx;
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold;
    font-size: 36rpx;
    color: #FFFFFF;
    text-align: center;
    line-height: 96rpx;
    margin: 30rpx auto 0;
}

.dn {
    display: none;
}
</style>
