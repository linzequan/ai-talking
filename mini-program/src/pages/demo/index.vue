<template>
    <web-view :src="url"></web-view>
</template>

<script>
export default {
  data() {
    return {
        // url: uni.setStorageSync('720url') || "https://720yun.com/t/91vkcl1h029"
        url: 'https://wxpma-stg1.kakaday.com/index.php/demo/h5tomp1'
    };
  },
  onLoad(e) {
    console.log('11')
  },
  methods: {

  },
};
</script>
<style scoped>

</style>
