let Constant = {
    Flag: {
        // 登录超时
        LOGIN_TIMEOUT: '0',
        // 登录成功
        LOGIN_SUCCESS: '001',
        // 系统异常
        ERROR: '004',
        // 操作成功
        SUCCESS: '1',
        // 操作失败
        FAIL: '2',
        // 渠道标识
        CHANNEL: '06',
        // CGI模式
        CGIMODEL: '01',
        // 联合放款模式
        UNIONMODEL: '02',
        // 新模式开关
        NEWMODEL: '03',
        // 放款失败
        LOANFAIL: '0'
    },
    BANKCARDNO: {
        'cib': '兴业银行',
        'icbc': '中国工商银行',
        'abc': '中国农业银行',
        'ccb': '中国建设银行',
        'boc': '中国银行',
        'hxb': '华夏银行',
        'ceb': '中国光大银行',
        'cmbc': '中国民生银行',
        'cncb': '中信实业银行',
        'pab': '平安银行',
        'spdb': '上海浦东发展银行',
        'bos': '上海银行'
    },
    MERRYINFO: [{
        code: '10',
        text: '未婚',
        value: '未婚'
    }, {
        code: '20',
        text: '已婚',
        value: '已婚'
    }, {
        code: '40',
        text: '离异',
        value: '离异'
    }, {
        code: '22',
        text: '再婚',
        value: '再婚'
    }, {
        code: '30',
        text: '丧偶',
        value: '丧偶'
    }, {
        code: '90',
        text: '其他',
        value: '其他'
    }],
    JOBINFO: [{
        code: '1',
        text: '高级领导',
        value: '高级领导'
    }, {
        code: '2',
        text: '中级领导',
        value: '中级领导'
    }, {
        code: '3',
        text: '一般员工',
        value: '一般员工'
    }, {
        code: '4',
        text: '其他',
        value: '其他'
    }, {
        code: '9',
        text: '未知',
        value: '未知'
    }],
    DEGREEINFO: [{
        code: '10',
        text: '研究生及以上',
        value: '研究生及以上'
    }, {
        code: '20',
        text: '本科',
        value: '本科'
    }, {
        code: '30',
        text: '大专',
        value: '大专'
    }, {
        code: '40',
        text: '中专',
        value: '中专'
    }, {
        code: '60',
        text: '高中',
        value: '高中'
    }, {
        code: '70',
        text: '初中',
        value: '初中'
    }, {
        code: '80',
        text: '小学',
        value: '小学'
    }, {
        code: '99',
        text: '其他(未知)',
        value: '其他(未知)'
    }],
    // 申请渠道
    SALES_CHANNEL: {
        WX: '自主申请通道',
        DS: '直销客户经理通道',
        TK: '个渠专员通道',
        SF: '合作方通道',
        NW: '自主申请通道',
        NC: '自主申请通道'
    },
    // 客户资质
    PREMIUM_CUST: {
        STP: '车险客户',
        GBD: '车险客户',
        GBDYZT: '车险客户',
        CRM: '产险白名单',
        YZT: '一帐通白名单',
        PALIFE: '寿险白名单'
    }
}
export default Constant