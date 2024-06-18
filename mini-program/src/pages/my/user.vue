<template>
    <div class="page">
        <div class="form-wrap">
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
        </div>
    </div>
</template>

<script>
export default {
    data() {
        const currentDate = this.getDate({
            format: true
        })
        return {
            nickname: '',
            sex: '男',
            date: currentDate,
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
    onLoad(e) {
    },
    onShareAppMessage() {
    },
    methods: {
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
    },
};
</script>
<style scoped>
.page {
    width: 700rpx;
    margin: 0 auto;
}
.form-wrap {
    margin-top: 30rpx;
}
.form-item-wrap {
    margin-bottom: 30rpx;
}
.form-item-label {
    font-size: 32rpx;
    color: #182444;
    font-weight: bold;
}
.form-item-input {
    font-size: 32rpx;
    border: 2rpx solid #f54a45;
    border-radius: 8rpx;
    margin-top: 15rpx;
    padding: 5rpx 10rpx;
    height: 70rpx;
}
.form-item-radio-group {
    margin-top: 15rpx;
}
.form-item-radio-group label {
    margin-right: 40rpx;
    font-size: 32rpx;
    display: inline-flex;
    align-items: center;
}
.form-item-radio {
    transform:scale(0.7)
}
.form-item-picker {
    font-size: 32rpx;
    border: 2rpx solid #f54a45;
    border-radius: 8rpx;
    margin-top: 15rpx;
    padding: 5rpx 10rpx;
    height: 70rpx;
    align-items: center;
    display: flex;
}
.form-item-textarea {
    font-size: 32rpx;
    border: 2rpx solid #f54a45;
    border-radius: 8rpx;
    margin-top: 15rpx;
    padding: 20rpx 20rpx;
    height: 300rpx;
    width: 660rpx;
    line-height: 1.5;
}
.submit-btn {
    font-size: 32rpx;
    background: #f54a45;
    color: #fff;
}
</style>
