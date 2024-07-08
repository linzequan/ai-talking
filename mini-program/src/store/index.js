import Vue from 'vue'
import Vuex from 'vuex'

import addContact from './modules/addContact' // 添加联系人
const { default: fetch } = require("../common/fetch");
Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
        openid: null,
        hasLogin: false,
        domain: 'https://wxpma-stg1.kakaday.com/index.php/aitalking/',
        // 登录信息
        userLoginInfo: null,
        // 申请状态查询结果信息
        applyInfo: null,
        // 申请号
        apllyNo: null,
        tabBar: [{
            "pagePath": "/pages/chat/simple-chat",
            "iconPath": "/static/tabbar/page01-icon01.png",
            "selectedIconPath": "/static/tabbar/page01-icon01-selected.png",
            "text": "聊天宝",
            "verify": true,
            "outlink": false
        }, {
            "pagePath": "/pages/chat/ai-chat",
            "iconPath": "/static/tabbar/page01-icon02.png",
            "selectedIconPath": "/static/tabbar/page01-icon02-selected.png",
            "text": "智能宝",
            "verify": true,
            "outlink": false
        }, {
            "pagePath": "/pages/my/index",
            "iconPath": "/static/tabbar/page01-icon03.png",
            "selectedIconPath": "/static/tabbar/page01-icon03-selected.png",
            "text": "我的",
            "verify": true,
            "outlink": false
        }],
        tabBarIndex: 0,
    },
    mutations: {
        'LOGIN': async (state, userInfo) => {
            return await new Promise((resolve, reject) => {
                console.log(userInfo)
                state.userLoginInfo = userInfo;
                state.hasLogin = true;
                fetch({
                    url: state.domain + 'post?actionxm=save_userinfo',
                    method: 'POST',
                    data: {
                        openid: state.openid,
                        userinfo: JSON.stringify(userInfo)
                    }
                }).then(() => {
                    return resolve()
                })
            })
        },
        'SETLOGIN': (state) => {
            state.hasLogin = true;
        },
        'SETOPENID': (state, openid) => {
            uni.setStorageSync('openid', openid)
            state.openid = openid
        },
        userLoginInfo(state, params) {
            state.userLoginInfo = params
        },
        applyInfo(state, params) {
            state.applyInfo = params
        },
        apllyNo(state, params) {
            state.apllyNo = params
        },
        'POSTSHARE': function(state, sid) { // 分享获取积分
            fetch({
                url: state.domain + "post?actionxm=add_jifen", // sid（积分来源，1：阅读文章，2：分享转发，3：留言，4：进入“古韵凤城”）
                data: {
                    sid
                }
            }).then(res => {
                if (res.status == 0) {
                    // uni.showToast({
                    //     icon: "none",
                    //     title: state.jifenTips[sid],
                    //     duration: 2000
                    // });
                }
            })
        },
        changeTabBar(state, payload) {
            console.log('changeTabBar')
            if (payload) {
                state.tabBarIndex = payload.index
            }
        },
    },
    actions: {
        'GETOPENID': async function({
            commit,
            state
        }) {
            return await new Promise((resolve, reject) => {
                if (state.openid) {
                    resolve(state.openid)
                } else {
                    // uni.showLoading({
                    //     'title': 'loading...'
                    // })
                    uni.login({
                        success: (data) => {
                            uni.hideLoading();
                            const {
                                code
                            } = data;
                            fetch({
                                url: state.domain + "get?actionxm=get_openid",
                                data: {
                                    code
                                }
                            }).then(res => {
                                const {
                                    data
                                } = res
                                commit('SETOPENID', data);
                                if (uni.getUserProfile) {
                                    uni.getUserProfile()
                                } else {
                                    uni.getUserInfo()
                                }
                                return resolve(data)
                            }).then((res) => {
                                // if (res[1]) {
                                //     const userInfo = res[1].userInfo
                                //     store.commit('LOGIN', userInfo)
                                // }
                            })
                        }
                    })
                }
            })
        },
        'GETOPENIDV2': async function({
            commit,
            state
        }) {
            return await new Promise((resolve, reject) => {
                uni.login({
                    success: (data) => {
                        uni.hideLoading();
                        const {
                            code
                        } = data;
                        fetch({
                            url: state.domain + "get?actionxm=get_userinfo",
                            data: {
                                code
                            }
                        }).then(res => {
                            const {
                                data
                            } = res
                            console.log(data);
                            commit('SETOPENID', data['openid'])
                            if (data.hasLogin) {
                                commit('SETLOGIN', true)
                                commit('userLoginInfo', data['userinfo'])
                            }
                            return resolve(data['openid'])
                        })
                    }
                })
            })
        }
    },
    moudles: {
        addContact
    }
})
export default store