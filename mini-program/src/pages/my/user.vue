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
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/user-boy.png" :class="boyAniCls" style="animation-duration: .5s; animation-delay: 0;">
                <div class="choose-sex-op">
                    <div class="choose-sex-title">请选择你的性别</div>
                    <div class="choose-sex-group">
                        <div :class="[user_sex == '男' ? 'choose-sex-item checked' : 'choose-sex-item']" @click="changeSex('男')">男生</div>
                        <div :class="[user_sex == '女' ? 'choose-sex-item checked' : 'choose-sex-item']" @click="changeSex('女')">女生</div>
                    </div>
                </div>
                <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/user-girl.png" :class="girlAniCls" style="animation-duration: .5s; animation-delay: 0;">
            </div>
            <div class="form-item-wrap">
                <div class="form-item-label">昵称</div>
                <input type="text" class="form-item-input" placeholder="请输入您的昵称" placeholder-style="font-size: 32rpx; line-height: 32rpx; color: #999999;" v-model="user_nickname">
            </div>
            <div class="form-item-wrap">
                <div class="form-item-label">出生年月</div>
                <picker mode="date" :start="startDate" :end="endDate" @change="bindDateChange" class="form-item-picker">
                    <input type="text" class="form-item-input" placeholder="请选择您的出生日期" readonly="true" placeholder-style="font-size: 32rpx; line-height: 32rpx; color: #999999;" v-model="birth">
                    <img src="https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/icon-right.png" class="icon-right">
                </picker>
            </div>
            <div class="form-item-wrap">
                <div class="form-item-label">个性描述</div>
                <textarea class="form-item-textarea" maxlength="-1" placeholder="请输入您个性描述" placeholder-style="font-size: 32rpx; line-height: 1.5; color: #999999;" v-model="description"></textarea>
            </div>
            <div class="user-save-btn" @click="handleUpdateUser">保存</div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
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
            user_nickname: '',
            user_sex: '男',
            description: '',
            birth: ''
        };
    },
    computed: {
        ...mapState({
            hasLogin: (state) => state.hasLogin,
            userLoginInfo: (state) => state.userLoginInfo
        }),
        startDate() {
            return this.getDate('start');
        },
        endDate() {
            return this.getDate('end');
        },
        boyAniCls() {
            return this.user_sex == '男' ? 'user-boy animated fadeInLeft' : 'user-boy dn'
        },
        girlAniCls() {
            return this.user_sex == '女' ? 'user-girl animated fadeInRight' : 'user-girl dn'
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
        console.log('this.userLoginInfo=> ', this.userLoginInfo)
        this.user_nickname = this.userLoginInfo['user_nickname'] == '' ? this.userLoginInfo['wx_nickname'] : this.userLoginInfo['user_nickname']
        this.user_sex = this.userLoginInfo['user_sex'] == '' ? '男' : this.userLoginInfo['user_sex']
        this.description = !!this.userLoginInfo['description'] ? this.userLoginInfo['description'] : ''
        this.birth = this.userLoginInfo['birth']
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
        changeSex(val) {
            this.user_sex = val
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
            this.birth = e.detail.value
        },
        goback() {
            uni.navigateBack({
                delta: 1
            });
        },
        // 更新用户信息
        handleUpdateUser() {
            this.$fetch({
                url: this.$store.state.domain + 'post?actionxm=update_userinfo',
                data: {
                    user_nickname: this.user_nickname,
                    user_sex: this.user_sex,
                    birth: this.birth,
                    description: this.description == null ? '' : this.description
                },
                method: 'post',
                showLoading: true,
            }).then(async (res) => {
                if(res.status == 0) {
                    console.log(res) 
                    await this.getUserInfo()
                } else {
                    uni.showToast({
                        title: res.msg,
                        icon: "none",
                    });
                }
            });
        },
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
                        uni.showToast({
                            title: '更新成功~',
                            icon: "none",
                            success() {
                                setTimeout(() => {
                                    uni.navigateBack({
                                        delta: 1
                                    });
                                }, 500);
                            }
                        })
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
    /* right: 46rpx; */
    right: 0;
    top: 50%;
    z-index: 99;
    transform: translateY(-50%);
    padding: 60rpx 46rpx 60rpx 610rpx;
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

.dn {
    opacity: 0;
}

</style>
