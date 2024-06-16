let env = process.env.NODE_ENV
let prefix = "https://cfs-phone-web.pingan.com.cn/cfsssfront/revision"
let cspfix = "https://cfs-phone-web.pingan.com.cn/csp"
switch (env) {
    default:
        prefix = 'https://cfs-phone-web.pingan.com.cn/cfsssfront/revision'
        cspfix = 'https://cfs-phone-web.pingan.com.cn/csp'
        break;
}

export default {
    // um登录接口
    PUBLIC_LOGIN: prefix + `/V2/login/umLogin.do`,
}