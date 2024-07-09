export default {
    data() {
        return {
            share: {
                title: '对话大师',
                desc: '对话，创造无限可能',
                path: '/pages/chat/simple-chat',
                imageUrl: 'https://wxpma-stg1.kakaday.com/mnt-public/ai-talking/images/share.png',
            
            }
        }
    },
    onShareAppMessage(res) { //发送给朋友
        return {
            title: this.share.title,
            desc: this.share.desc,
            path: this.share.path,
            imageUrl: this.share.imageUrl
        }
    },
    // onShareTimeline(res) {//分享到朋友圈
    //     return {
    //         title: this.share.title,
    //         desc: this.share.desc,
    //         path: this.share.path,
    //         imageUrl: this.share.imageUrl
    //     }
    // },
}