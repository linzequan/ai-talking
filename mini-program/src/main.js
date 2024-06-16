import Vue from 'vue'
import App from './App'
import store from './store'
import tuiTabbar from './components/tui-tabbar/tui-tabbar'

const Common = require('./common/')
Vue.component('tui-tabbar', tuiTabbar)

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.getApp = getApp();

for (let k in Common) {
    let key = k.toLowerCase();
    // 如果是请求则特殊处理
    if (key == 'fetch') {
        // 若是开发环境并且Mock开关开启则调用拦截
        let MockConfig = true
        if (process.env && process.env.NODE_ENV === 'development' && MockConfig) {
            // Vue.prototype.$fetch = Common[k].before(() => {
            //     return true
            // })
            Vue.prototype.$fetch = Common[k]
        } else {
            Vue.prototype.$fetch = Common[k]
        }
    } else {
        Vue.prototype['$' + key] = Common[k]
    }
}

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()