<template>
    <div>
        <h1>11111</h1>
        <pre id="log" class="log">{{ log }}</pre>
    </div>
</template>

<script>
export default {
    data() {
        return {
            log: ''
        };
    },
    onLoad(e) {
        console.log('start getdata')
        // this.getData()
    },
    methods: {
        getData() {
            // var url = 'http://dev.wxpma.com/index.php/aitalking/post?actionxm=test';
            var url = 'https://wxpma-stg1.kakaday.com/index.php/aitalking/post?actionxm=test';
            var source = new EventSource(url);
            source.onmessage = (event)=> {
                console.log(event, event.data)
                this.log += event.data + "\n"
                // document.getElementById("log").innerText += event.data + "\n";
            };

            source.onerror = function(event) {
                console.error("SSE Error: ", event);
            };
        },
        getData1() {

        }
    },
};
</script>

<style scoped>
.log {
    font-size: 32rpx;
    color: #000;
}
</style>