<script>
    export default {
        onLaunch: function() {
            uni.hideTabBar()
            console.log('App Launch')
            this.$store.dispatch('GETOPENIDV2');
        },
        onShow: function(e) {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        },
        globalData: {
            innerAudioContext: null,
            ver: '1.1.5'
        },
    }
</script>

<style>
    /* @import url('./common/animate.min.css'); */
    @import url("./components/animate.min.css");
    @import url("./common/common.css");
    /*每个页面公共css */
    page {
        height: 100%;
    }
</style>
