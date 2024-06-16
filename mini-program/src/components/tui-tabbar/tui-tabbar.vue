<template>
  <view class="tui-tabbar" :class="{ 'tui-tabbar-fixed': isFixed, 'tui-unlined': unlined }"
    :style="{ background: backgroundColor }">
    <block v-for="(item, index) in tabBar" :key="index">
      <view class="tui-tabbar-item" :class="{ 'tui-item-hump': item.hump }"
        :style="{ backgroundColor: item.hump ? backgroundColor : 'none' }"
        @tap="tabbarSwitch(index, item.hump, item.pagePath, item.verify, item.outlink)">
        <block v-if="item.iconPath">
          <view class="tui-icon-box" :class="{ 'tui-tabbar-hump': item.hump }">
            <image :src="current == index ? item.selectedIconPath : item.iconPath"
              :class="[item.hump ? '' : 'tui-tabbar-icon']"></image>
            <view :class="[item.isDot ? 'tui-badge-dot' : 'tui-badge']"
              :style="{ color: badgeColor, backgroundColor: badgeBgColor }" v-if="item.num">
              {{ item.isDot ? "" : item.num }}</view>
          </view>
          <view class="tui-text-scale" :class="{ 'tui-text-hump': item.hump }"
            :style="{ color: current == index ? selectedColor : color }">{{ item.text }}</view>
        </block>
        <view v-else class="middle"></view>
      </view>
    </block>
    <view :class="{ 'tui-hump-box': hump }" v-if="hump && !unlined"></view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "tuiTabbar",
  props: {
    // 字体颜色
    color: {
      type: String,
      default: "#B2B2B2",
    },
    // 字体选中颜色
    selectedColor: {
      type: String,
      default: "#222222",
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: "#FFFFFF",
    },
    // 是否需要中间凸起按钮
    hump: {
      type: Boolean,
      default: false,
    },
    // 固定在底部
    isFixed: {
      type: Boolean,
      default: true,
    },
    // 角标字体颜色
    badgeColor: {
      type: String,
      default: "#fff",
    },
    // 角标背景颜色
    badgeBgColor: {
      type: String,
      default: "#F74D54",
    },
    unlined: {
      type: Boolean,
      default: false,
    },
    canSwitch: {
      type: Boolean,
      default: true
    },
    beforeSwitchFn: {
      type: Function,
      default: null
    }
  },
  computed: mapState(["tabBarIndex", "tabBar"]),
  created() {
    this.current = this.tabBarIndex;
  },
  updated() {
    const search = uni.setStorageSync('wenlv_search') || ''
    console.log(search)
    uni.setStorageSync('wenlv_search', '')
    if(search === 'Y') {
      this.current = 2
    }
  },
  watch: {
    tabBarIndex() {
      this.current = this.tabBarIndex;
    },
  },
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    ...mapMutations(["changeTabBar"]),
    tabbarSwitch(index, hump, pagePath, verify, outlink) {
      if(!this.canSwitch) {
         this.$emit('beforeSwitchFn')
      } else {
        if (verify) {
          this.changeTabBar({
            index: index,
          });
          uni.switchTab({
            url: pagePath,
          });
        } else {
          if(outlink) {
            // 跳转其他小程序
            console.log('跳转其他小程序')
            wx.navigateToMiniProgram({
              appId: 'wxd947200f82267e58',
              path: 'pages/wjxqList/wjxqList?activityId=mV5DPli',
            })
          } else {
            uni.navigateTo({
              url: pagePath
            })
          }
          // this.$emit("click", {
          //   index: index,
          //   hump: hump,
          //   pagePath: pagePath,
          //   verify: verify,
          // });
        }
      }
    },
  },
};
</script>

<style>
.tui-tabbar {
  width: 100%;
  height: 112rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  -webkit-overflow-scroll: touch;
  box-shadow: 0 -4rpx 32rpx 0 rgba(0, 0, 0, .05);
}

.tui-tabbar-fixed {
  position: fixed;
  z-index: 99999;
  left: 0;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.tui-tabbar::before {
  content: "";
  width: 100%;
  /* border-top: 1rpx solid #b2b2b2; */
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleY(0.5);
  transform-origin: 0 100%;
}

.tui-tabbar-item {
  height: 100%;
  flex: 1;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 16rpx 0;
  box-sizing: border-box;
}

.tui-icon-box {
  position: relative;
}

.middle {
  position:relative;
  text-align: center;

  height: 80rpx;
  width: 80rpx;
  border-radius: 50%;
  background-image: linear-gradient(180deg, #FF981F 0%, #FF721F 100%);
}

.middle::before{
  content: "";
  background: #ffffff;
  height: 32rpx;
  width: 4rpx;
  border-radius: 2rpx;
  position: absolute;
  top: 24rpx;
  left: 38rpx;
}
.middle::after{
  content: "";
  background: #ffffff;
  height: 4rpx;
  width: 32rpx;
  border-radius: 2rpx;
  position: absolute;
  top: 38rpx;
  left: 24rpx;
}

.tui-item-hump {
  height: 98rpx;
  z-index: 2;
}

.tui-tabbar-icon {
  width: 56rpx;
  height: 56rpx;
  display: block;
}

.tui-hump-box {
  width: 120rpx;
  height: 120rpx;
  background: #ffffff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -50rpx;
  border-radius: 50%;
  z-index: 1;
}

.tui-hump-box::before {
  content: "";
  height: 200%;
  width: 200%;
  /* border: 1rpx solid #b2b2b2; */
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(0.5) translateZ(0);
  transform-origin: 0 0;
  border-radius: 100%;
}

.tui-unlined::before {
  border: 0 !important;
}

.tui-tabbar-hump {
  width: 100rpx;
  height: 100rpx;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) rotate(0deg);
  top: -40rpx;
  transition: all 0.2s linear;
}

.tui-tabbar-hump image {
  width: 100rpx;
  height: 100rpx;
  display: block;
}

.tui-hump-active {
  transform: translateX(-50%) rotate(135deg);
}

.tui-text-hump {
  position: absolute;
  bottom: 10rpx;
}

.tui-text-scale {
  /* font-weight: bold; */
  transform: scale(0.8);
  font-size: 25rpx;
  line-height: 20rpx;
  transform-origin: center 100%;
  font-family: PingFangSC-Regular;
}

.tui-badge {
  position: absolute;
  font-size: 24rpx;
  height: 32rpx;
  min-width: 20rpx;
  padding: 0 6rpx;
  border-radius: 40rpx;
  right: 0;
  top: -5rpx;
  transform: translateX(70%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tui-badge-dot {
  position: absolute;
  height: 16rpx;
  width: 16rpx;
  border-radius: 50%;
  right: -4rpx;
  top: -4rpx;
}
</style>
