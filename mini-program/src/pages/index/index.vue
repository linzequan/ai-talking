<template>
    <view class="commonPadding loginPage" :animation="animationData">
        <image src="@/static/logo.png" class="img"></image>
    </view>
</template>

<script>
export default {
    onLoad() {
        this.goto()
    },
    data() {
        return {
            animationData: {}
        }
    },
    methods: {
        goto(immediately) {
            new Promise((resolve, reject) => {
                if (immediately) {
                    resolve(0)
                }
                //创建动画实例
                let animation = uni.createAnimation({
                    duration: 1500,
                    timingFunction: "ease",
                    delay: 0
                })
                this.animation = animation
                //描绘动画效果
                animation.opacity(1).step()
                //导出动画数据
                this.animationData = animation.export()
                setTimeout(function () {
                    animation.opacity(0).step()
                    this.animationData = animation.export()
                    resolve(3000)
                }.bind(this), 500)
                // bind(this)是es6的function的一个原型方法，会使得函数的this必定指向调用他的对象
            }).then((timeout) => {
                setTimeout(() => {
                    uni.reLaunch({
                        url: '/pages/chat/simple-chat',
                    })
                }, timeout)
            })
        }
    }
}
</script>

<style scoped>
.loginPage {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

@keyframes breathe {
    0% {
        transform: scale(.97);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(.97);
    }
}

.img {
    width: 300rpx;
    height: 300rpx;
    animation: breathe 1.5s linear infinite;
    margin-bottom: 200rpx;
}
</style>