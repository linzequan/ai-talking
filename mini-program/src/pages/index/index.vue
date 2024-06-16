<template>
  <view class="content">
    <!-- <img :src="poster" class="page01-head" mode="widthFix"> -->
    <view class="vipCard_block"
      :animation="num == item.id ? showpic : hidepic"
      v-for="item in posterList"
      :key="item.id">
      <image :src="item.url" class="poster-img" mode="widthFix" @tap="bannerClick"></image>
    </view>
    <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-footer.png" class="page01-footer">
    <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-search.png" class="page01-search" @tap="search">
    <!-- <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-title.png" class="page01-title"> -->
    <div v-if="hasLogin">
      <img src="https://n.sinaimg.cn/gd/880175a2/20210705/page01-btn-big.png" class="page01-btn-big animated pulse infinite" @tap="gotoMap" style="animation-duration: 2s">
    </div>
    <div v-else>
      <img src="https://n.sinaimg.cn/gd/880175a2/20210705/page01-btn-big.png" class="page01-btn-big animated pulse infinite" @tap="getUserInfo('gotoMap')" data-id="gotoMap" style="animation-duration: 2s">
    </div>
    <div class="page01-btn-group" v-if="hasLogin">
      <div class="page01-btn-wrap">
        <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-btn01.png" class="page01-btn page01-btn01" @tap="gotoXunwei">
      </div>
      <div class="page01-btn-wrap">
        <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-btn02.png" class="page01-btn page01-btn02" @tap="gotoMeigou">
      </div>
      <div class="page01-btn-wrap">
        <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-btn03.png" class="page01-btn page01-btn03" @tap="gotoChangyou">
      </div>
      <div class="page01-btn-wrap">
        <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-btn04.png" class="page01-btn page01-btn04" @tap="gotoZhusu">
      </div>
    </div>
    <div v-else>
      <div class="page01-btn-wrap">
        <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-btn01.png" class="page01-btn page01-btn01" @tap="getUserInfo('gotoXunwei')">
      </div>
      <div class="page01-btn-wrap">
        <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-btn02.png" class="page01-btn page01-btn02" @tap="getUserInfo('gotoMeigou')">
      </div>
      <div class="page01-btn-wrap">
        <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-btn03.png" class="page01-btn page01-btn03" @tap="getUserInfo('gotoChangyou')">
      </div>
      <div class="page01-btn-wrap">
        <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-btn04.png" class="page01-btn page01-btn04" @tap="getUserInfo('gotoZhusu')">
      </div>
    </div>
    <div class="page01-zixun-wrap">
      <img src="https://n.sinaimg.cn/gd/880175a2/20210620/page01-zixun-title.png" class="page01-zixun-title">
      <swiper class="swiper page01-zixun-ul" :indicator-dots="false" :disable-touch="true" :autoplay="true" :interval="3000" :circular="true" :vertical="true" :duration="1000" display-multiple-items="3">
        <swiper-item v-for="item in homelink" :key="item.url" class="zixun-swiper">
          <view class="swiper-item page01-zixun-itme" @click="goKanfoshan(item.url, item.title)">· {{item.title}}</view>
        </swiper-item>
      </swiper>
      <!-- <ul class="page01-zixun-ul">
        <li class="page01-zixun-itme" v-for="item in homelink" :key="item.url" @click="goKanfoshan(item.url, item.title)">{{item.title}}</li>
      </ul> -->
    </div>
    <tui-tabbar :canSwitch='canSwitch' @beforeSwitchFn='checkStatus'></tui-tabbar>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      ruleShow: false,
      canIUseGetUserProfile: false,
      posterInterval: null,
      posterIndex: 0,
      // poster: 'https://wxpma-stg1.kakaday.com/mini-program/wenlv/v2/page01-poster02.png',
      poster: '',
      posterList: [],
      showpic: '',
      hidepic: '',
      animation: '',
      picmaxnum: 0,
      num: 0,
      pic: [],
      homelink: []
    };
  },

  computed: {
    ...mapState({
      hasLogin: (state) => state.hasLogin,
      tabBarIndex: (state) => state.tabBarIndex
    }),
    canSwitch(hasLogin) {
      if(hasLogin) return true;
      return false;
    }
  },
  onShareAppMessage() {
    this.$store.commit("POSTSHARE", 2);
    return {
      title: "寻味凤城",
      path: "/pages/index/index_v2",
    };
  },
  async onLoad() {
    if (uni.getUserProfile) {
      this.canIUseGetUserProfile = true
    } else {
      // uni.showModal({
      //   title: '凤城攻略温馨提示',
      //   content: "微信版本过低，请升级后使用~",
      //   showCancel: false
      // })
    }
    // this.posterLoop();
    this.getHomeBanner(()=> {
      this.picmaxnum = this.posterList.length;
      this.posterLoop()
    });
    this.getHomeLinks();
  },
  methods: {
    goKanfoshan(url, title) {
      if(url == '') return;
      uni.setStorageSync('kanfoshanUrl', url);
      uni.setStorageSync('kanfoshanTitle', title);
      uni.navigateTo({
        url: '/pages/index/kanfoshan'
      })
    },
    bannerClick() {
      var url = '',
          title = '';
      for(var i in this.posterList) {
        if(this.posterList[i]['id'] == this.num) {
          url = this.posterList[i]['link'];
          title = this.posterList[i]['title']
        }
      }
      if(url == '') return;
      this.goKanfoshan(url, title);
    },
    // 轮播图
    posterLoop() {
      clearInterval(this.posterInterval);
      var animation= uni.createAnimation({
        timingFunction: 'ease',
      }) //创建一个动画实例
      this.animation = animation;
      var init = (() => {
        this.num++;
        if (this.num == this.picmaxnum) {
          this.num = 0;
        }
        // console.log(this.num)
        //淡入
        animation.opacity(1).step({ duration: 3000, delay: 1000 }); //描述动画
        this.showpic = animation.export(); //输出动画
        //淡出
        animation.opacity(0).step({ duration: 3000, delay: 1000 });
        this.hidepic = animation.export();
      })();
      this.posterInterval = setInterval(() => {
        // if(this.posterIndex++ >= this.posterList.length) {
        //   this.posterIndex = 0;
        // }
        this.num++;
        if (this.num == this.picmaxnum) {
          this.num = 0;
        }
        // console.log(this.num)
        //淡入
        animation.opacity(1).step({ duration: 1000, delay: 1000 }); //描述动画
        this.showpic = animation.export(); //输出动画
        //淡出
        animation.opacity(0).step({ duration: 1000, delay: 1000 });
        this.hidepic = animation.export();
        // this.poster = this.posterList[this.posterIndex];
      }, 5000);
    },
    // 检查登录以及认证状态，显示对应弹窗提示
    checkStatus() {
      console.log('点击tabbar', this.tabBarIndex)
      if(!this.hasLogin) {
        uni.getUserProfile({
          desc: '凤城攻略',
          success: (result) => {
            console.log('使用新api获取用户信息=> ', result);
            if (result.errMsg !== "getUserProfile:ok") {
              uni.showModal({
                title: "凤城攻略温馨提示",
                content: "请同意微信授权，才能获取积分哟！",
                showCancel: false,
              });
              return;
            }
            this.$store.commit("LOGIN", result.userInfo);
            this.$store.dispatch('GETOPENID');
          }
        });
        return false;
      }
      return true;
    },

    getUserInfo(elem) {
      if(!this.canIUseGetUserProfile) {
        uni.showModal({
          title: '凤城攻略温馨提示',
          content: "微信版本过低，请升级后使用~",
          showCancel: false
        })
      }
      uni.getUserProfile({
        desc: '凤城攻略',
        success: (result) => {
          console.log('使用新api获取用户信息=> ', result);
          if (result.errMsg !== "getUserProfile:ok") {
            uni.showModal({
              title: "凤城攻略温馨提示",
              content: "请同意微信授权，才能获取积分哟！",
              showCancel: false,
            });
            return;
          }
          this.$store.commit("LOGIN", result.userInfo);
          this.$store.dispatch('GETOPENID');
          switch (elem) {
            case 'gotoXunwei':
              this.gotoXunwei();
              break;
            case 'gotoMeigou':
              this.gotoMeigou();
              break;
            case 'gotoGuyun':
              this.gotoGuyun();
              break;
            case 'gotoMap':
              this.gotoMap();
              break;
            case 'gotoChangyou':
              this.gotoChangyou();
              break;
            case 'gotoZhusu':
              this.gotoZhusu();
              break;
            case 'gotoJifen':
              this.gotoJifen();
              break;
            default:
              break;
          }
        }
      })
    },
    mpGetUserInfo(result) {
      console.log('使用旧api获取用户信息=> ', result);
      if (result.detail.errMsg !== "getUserInfo:ok") {
        uni.showModal({
          title: "凤城攻略温馨提示",
          content: "请同意微信授权，才能获取积分哟！",
          showCancel: false,
        });
        return;
      }
      this.$store.commit("LOGIN", result.detail.userInfo);
      this.$store.dispatch('GETOPENID');
      if(result.currentTarget.dataset.id) {
        switch (result.currentTarget.dataset.id) {
          case 'gotoXunwei':
            this.gotoXunwei();
            break;
          case 'gotoMeigou':
            this.gotoMeigou();
            break;
          case 'gotoGuyun':
            this.gotoGuyun();
            break;
          case 'gotoMap':
            this.gotoMap();
            break;
          case 'gotoChangyou':
            this.gotoChangyou();
            break;
          case 'gotoZhusu':
            this.gotoZhusu();
            break;
          case 'gotoJifen':
            this.gotoJifen();
            break;
          default:
            break;
        }
      }
    },
    showRule() {
      this.ruleShow = true;
    },
    hideRule() {
      this.ruleShow = false;
    },
    gotoXunwei() {
      uni.navigateTo({
        url: "/pages/xunwei/list_v2",
      });
    },
    gotoWenlv() {
      uni.navigateTo({
        url: "/pages/wenlv/index_v2",
      });
    },
    getHomeLinks() {
      this.$fetch({
        url: this.$store.state.domain + 'get?actionxm=getHomeLinks',
        showLoading: false
      }).then(res=> {
        if(res.status == 0) {
          this.homelink = res.data
        } else {
          uni.showToast({
            title: "获取数据异常~",
            icon: "none",
          });
          return;
        }
      })
    },
    getHomeBanner(cb) {
      this.$fetch({
        url: this.$store.state.domain + 'get?actionxm=getHomeBanner',
        showLoading: false
      }).then(res=> {
        if(res.status == 0) {
          this.posterList = res.data
          this.poster = this.posterList[0]['url']
        } else {
          uni.showToast({
            title: "获取数据异常~",
            icon: "none",
          });
          return;
        }
        cb()
      })
    },
    gotoGuyun() {
      this.$fetch({
          url: this.$store.state.domain + 'get?actionxm=getSwitch',
          showLoading: false
      }).then(res=> {
          console.log(res)
          if(res.status == 0 && res.data == 'Y') {
            this.$fetch({
                url: this.$store.state.domain + 'post?actionxm=add_jifen',
                data: {
                    sid: 4
                },
                method: 'post',
                showLoading: true,
            }).then((res) => {
                console.log(res)
                uni.navigateTo({
                  url: "/pages/guyun/index",
                });
            });
          } else {
            uni.showToast({
              title: "栏目准备中~",
              icon: "none",
            });
            return;
          }
      });
    },
    gotoMeigou() {
      uni.navigateTo({
        url: "/pages/meigou/index_v2",
      });
    },
    gotoJifen() {
      uni.navigateTo({
        url: "/pages/jifen/index_v2",
      });
    },
    gotoChangyou() {
      uni.navigateTo({
        url: "/pages/changyou/index_v2",
      });
    },
    gotoZhusu() {
      uni.navigateTo({
        url: "/pages/zhusu/list_v2",
      });
    },
    gotoMap(){
      console.log('gotoMap')
      uni.navigateTo({
        url: "/pages/map/index_v2",
      });
    },
    gotoActivity() {
      wx.navigateToMiniProgram({
        appId: 'wxf8ec4062b441eaf9',
        path: 'views/article/classify_detail/index?mallId=11137&id=10828&pageUrl=https%3A%2F%2Fm.mallcoo.cn%2Fa%2Fcontent%2F11137%2Farticle%2Fdetail%3Fid%3D10828'
      })
    },
    search() {
      uni.navigateTo({
        url: '/pages/index/search'
      });
    }
  },
};
</script>

<style scoped>
.content-area {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
}
.content {
  background: #fff5c7;
  background-size: 100% 100%;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.page01-head {
  width: 750rpx;
  /* height: 814rpx; */
  position: absolute;
  left: 0;
  top: 0;
  z-index: 60;
}
.page01-footer {
  width: 750rpx;
  height: 771rpx;
  position: absolute;
  left: 0;
  top: 560rpx;
  z-index: 70;
}
.page01-title {
  width: 473rpx;
  height: 236rpx;
  position: absolute;
  left: 50%;
  top: 170rpx;
  transform: translateX(-50%);
  z-index: 80;
}
.page01-search {
  width: 563rpx;
  height: 54rpx;
  position: absolute;
  left: 50%;
  top: 50rpx;
  transform: translateX(-50%);
  z-index: 80;
}
.page01-btn-big {
  width: 430rpx;
  height: 188rpx;
  position: absolute;
  left: 160rpx;
  top: 450rpx;
  z-index: 80;
}
.page01-btn-group {
  width: 700rpx;
  position: absolute;
  top: 650rpx;
  left: 25rpx;
  z-index: 80;
  display: flex;
}
.page01-btn-wrap {
  flex: 1;
  text-align: center;
}
.page01-btn {
  width: 150rpx;
  height: 292rpx;
}
.page01-btn02, .page01-btn04 {
  margin-top: 25rpx;
}
.page01-zixun-wrap {
  width: 650rpx;
  position: absolute;
  top: 990rpx;
  left: 50rpx;
  z-index: 80;
}
.page01-zixun-title {
  width: 178rpx;
  height: 46rpx;
}
.page01-zixun-ul {
  color: #fd4128;
  font-size: 28rpx;
  margin-left: 15rpx;
  line-height: 36rpx;
  margin-top: 15rpx;
  line-height: 54rpx;
  height: 150rpx;
  /* height: 54rpx; */
}
.vipCard_block {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 2;
}
.poster-img {
  width: 100%;
}
.zixun-swiper {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  color: #fd4128;
}
.page01-zixun-itme {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>
