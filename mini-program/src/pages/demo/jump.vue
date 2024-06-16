<template>
  <view class="content">
    <button @click="surejump">确认跳转</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  onLoad(e) {
  },
  onShareAppMessage() {
  },
  methods: {
    surejump() {
      wx.navigateToMiniProgram({
          // appId: 'wx82d43fee89cdc7df',
          // path: 'shz_minzongwei_shenzhenxierzhihui/pages/book/tips'
          appId: 'wxf8ec4062b441eaf9',
          path: 'views/article/classify_detail/index?mallId=11137&id=10828&pageUrl=https%3A%2F%2Fm.mallcoo.cn%2Fa%2Fcontent%2F11137%2Farticle%2Fdetail%3Fid%3D10828'
      })
    }
  },
};
</script>
<style scoped>

</style>
