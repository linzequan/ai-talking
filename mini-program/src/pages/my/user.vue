<template>
    <div class="main-page">
        <view class="nav" :style="'background-color: rgba(248, 248, 248, ' + op + ')'">
            <view class="status-bar" :style="'height:' + statusBarHeight + 'px'"></view>
            <div class="nav-back" @click="goback">
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-back.png" class="icon-back">
            </div>
            <view class="title" :style="'color: rgba(0, 0, 0,' + op + '); height: ' + navigationBarHeight + 'px; line-height: ' + navigationBarHeight + 'px;'">个人信息</view>
        </view>
        <div class="empty-wrap" :style="{ 'height': navHeight + 'px' }"></div>
        <div class="main-wrap">
            <div class="choose-sex-wrap">
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/user-boy.png" class="user-boy">
                <div class="choose-sex-op">
                    <div class="choose-sex-title">请选择你的性别</div>
                    <div class="choose-sex-group">
                        <div class="choose-sex-item checked">女生</div>
                        <div class="choose-sex-item">男生</div>
                    </div>
                </div>
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/user-girl.png" class="user-girl">
            </div>
            <div class="form-item-wrap">
                <div class="form-item-label">昵称</div>
                <input type="text" class="form-item-input" placeholder="请输入您的昵称" placeholder-style="font-size: 32rpx; line-height: 32rpx; color: #999999;">
            </div>
            <div class="form-item-wrap">
                <div class="form-item-label">出生年月</div>
                <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" class="form-item-picker">
                    <input type="text" class="form-item-input" placeholder="请选择您的出生日期" readonly="true" placeholder-style="font-size: 32rpx; line-height: 32rpx; color: #999999;" :value="date">
                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-right.png" class="icon-right">
                </picker>
            </div>
            <div class="form-item-wrap">
                <div class="form-item-label">个性描述</div>
                <textarea class="form-item-textarea" maxlength="-1" placeholder="请输入您个性描述" placeholder-style="font-size: 32rpx; line-height: 1.5; color: #999999;"></textarea>
            </div>
            <div class="user-save-btn" @click="searchSimpleTxt">保存</div>
        </div>

        <!-- <div class="form-wrap">
            <div class="form-item-wrap">
                <div class="form-item-label">昵称</div>
                <input type="text" placeholder="请输入昵称" :value="nickname" class="form-item-input">
            </div>
            <div class="form-item-wrap">
                <div class="form-item-label">性别</div>
                <radio-group name="sex" class="form-item-radio-group">
                    <label>
                        <radio class="form-item-radio" value="男" checked="true"/><text>男</text>
                    </label>
                    <label>
                        <radio class="form-item-radio" value="女" /><text>女</text>
                    </label>
                </radio-group>
            </div>
            <div class="form-item-wrap">
                <div class="form-item-label">出生年月</div>
                <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" class="form-item-picker">
                    <view class="uni-input">{{date}}</view>
                </picker>
            </div>
            <div class="form-item-wrap">
                <div class="form-item-label">个性描述</div>
                <textarea class="form-item-textarea" placeholder="请输入个性描述，生成更精准的聊天对话.." maxlength="-1" />
            </div>
            <button size="default" type="default" class="submit-btn">保存</button>
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        const currentDate = this.getDate({
            format: true
        })
        return {
            // 自定义头部
            navHeight: 0,
            statusBarHeight: 0,
            navigationBarHeight: 0,
            op: 0,
            nickname: '',
            sex: '男',
            date: '',
        };
    },
    computed: {
        startDate() {
            return this.getDate('start');
        },
        endDate() {
            return this.getDate('end');
        }
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
        getDate(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        },
        bindDateChange: function(e) {
            this.date = e.detail.value
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
    width: 32rpx;
    height: 48rpx;
    margin: 24rpx 36rpx;
}

.title {
    text-align: center;
    font-size: 28rpx;
}

.main-wrap {
    position: relative;    
    padding-bottom: 80rpx;
}

.choose-sex-wrap {
    display: flex;
    height: 370rpx;
    justify-content: center;
    align-items: center;
    margin-top: 40rpx;
}

.user-boy {
    width: 82rpx;
    height: 370rpx;
}

.user-girl {
    width: 122rpx;
    height: 310rpx;
}

.choose-sex-op {
    flex: 1;
    align-self: flex-start;
}

.choose-sex-title {
    font-family: PingFang-SC, PingFang-SC;
    font-weight: 700;
    font-size: 32rpx;
    color: #333333;
    line-height: 44rpx;
    text-align: center;
    margin: 20rpx auto 0;
}

.choose-sex-group {
    width: 366rpx;
    display: flex;
    justify-content: space-between;
    margin: 44rpx auto 0;
}

.choose-sex-item {
    width: 160rpx;
    height: 160rpx;
    border-radius: 24rpx;
    border: 4rpx solid #CCCCCC;
    font-family: PingFang-SC, PingFang-SC;
    font-weight: 700;
    font-size: 32rpx;
    color: #999999;
    line-height: 44rpx;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.choose-sex-item.checked {
    background: rgba(255,249,250,0.7);
    box-shadow: 0rpx 4rpx 10rpx 6rpx rgba(248,95,105,0.4);
    border-radius: 24rpx;
    border: 4rpx solid #F85F69;
    color: #F85F69;
}

.form-item-wrap {
    width: 670rpx;
    margin: 48rpx auto 0;
}

.form-item-label {
    font-family: PingFang-SC, PingFang-SC;
    font-weight: 700;
    font-size: 32rpx;
    color: #333333;
    line-height: 32rpx;
    text-align: left;
}

.form-item-input {
    width: 586rpx;
    background: rgba(255,255,255,0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76,166,245,0.2);
    border-radius: 24rpx;
    border: 3rpx solid #FFFFFF;
    padding: 40rpx 42rpx;
    margin-top: 32rpx;
    font-family: PingFang-SC, PingFang-SC;
    font-size: 32rpx;
    color: #333333;
    line-height: 32rpx;
    text-align: left;
}

.form-item-picker {
    position: relative;
}

.form-item-picker .form-item-input {
    width: 586rpx;
    background: rgba(255,255,255,0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76,166,245,0.2);
    border-radius: 24rpx;
    border: 3rpx solid #FFFFFF;
    padding: 40rpx 42rpx;
    /* margin-top: 32rpx; */
    font-family: PingFang-SC, PingFang-SC;
    font-size: 32rpx;
    color: #333333;
    line-height: 32rpx;
    text-align: left;
}

.icon-right {
    width: 14rpx;
    height: 24rpx;
    position: absolute;
    right: 46rpx;
    top: 50%;
    z-index: 99;
    transform: translateY(-50%);
}

.form-item-textarea {
    width: 586rpx;
    height: 156rpx;
    background: rgba(255,255,255,0.9);
    box-shadow: 0rpx 22rpx 54rpx 0rpx rgba(76,166,245,0.2);
    border-radius: 24rpx;
    border: 3rpx solid #FFFFFF;
    padding: 40rpx 42rpx;
    margin-top: 32rpx;
    font-family: PingFang-SC, PingFang-SC;
    font-size: 32rpx;
    color: #333333;
    line-height: 32rpx;
    text-align: left;
}

.user-save-btn {
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
    margin: 72rpx auto 0;
}

</style>
