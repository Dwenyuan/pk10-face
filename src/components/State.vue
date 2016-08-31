<template lang="pug">
    //- 状态区 ，展示用户的一些状态
    div.state
        div.state-item.money.table
            div.money-state.table-cell
                div.button
                    table
                        tr
                            td
                                span.money-num(contenteditable="true",@keyup="checkData",@blur="changeData",v-bind:style="{fontSize:34*zoomRate.x+'px'}",v-html="userBet.betmoney")
        div.state-item.portrait
            div.polygon(@touchend="showMessage",v-bind:style="headstyle")
                svg(xmlns="http://www.w3.org/2000/svg",version="1.1",v-bind:width="headsize.width+'px'",v-bind:height="headsize.height+'px'")
                    defs
                        pattern(id="image",x="0",y="0",patternUnits="userSpaceOnUse",v-bind:width="headsize.width",v-bind:height="headsize.height")
                            image(v-el:image,x="0",y="0",v-bind:width="headsize.width",v-bind:height="headsize.height")
                    polygon(v-bind:points="headborder",fill="url(#image)")
                    image(x="0",y="0",v-bind:width="headsize.width",v-bind:height="headsize.height",v-bind:xlink:href="headborderimg")
        div.state-item.stars.table
            div.money-state.table-cell
                div.button.undo(@click="cancelbet")
</template>
<script>
export default {
    props: ['zoomRate', 'userBet', 'userinfo', 'countDown'],
    ready() {
        console.log(this.zoomRate)
        console.log(this.$els.image)
    },
    data() {
        return {
            headzoom: 1.2,
            headborderimg: require('../assets/切图/主界面/头像1.png'),
            anonymousheadimg: require('../assets/unkown.jpg')
        }
    },
    watch: {
        'userinfo.headimgurl': function(newval) { //没有头像时 使用匿名头像
            if (!newval) {
                newval = this.anonymousheadimg
            }
            this.$els.image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', newval)
        }
    },
    computed: {
        headsize() {
            return {
                width: 142 * this.headzoom * this.zoomRate.x,
                height: 165 * this.headzoom * this.zoomRate.y
            }
        },
        headborder() {
            return 70 * this.headzoom * this.zoomRate.x + ',' + 15 * this.headzoom * this.zoomRate.y + ' ' + 128 * this.headzoom * this.zoomRate.x + ',' + 48 * this.headzoom * this.zoomRate.y + ' ' + 128 * this.headzoom * this.zoomRate.x + ',' + 113 * this.headzoom * this.zoomRate.y + ' ' + 71 * this.headzoom * this.zoomRate.x + ',' + 146 * this.headzoom * this.zoomRate.y + ' ' + 13 * this.headzoom * this.zoomRate.x + ',' + 113 * this.headzoom * this.zoomRate.y + ' ' + 13 * this.headzoom * this.zoomRate.x + ',' + 48 * this.headzoom * this.zoomRate.y
        },
        headstyle() {
            return {
                // width: 640 / 3 * this.zoomRate.x + 'px',
                // height: 640 / 3 * this.zoomRate.y + 'px',
                padding: '0px ' + (640 / 3 * this.zoomRate.x - this.headsize.width) / 2 + 'px' //
                    // transform: 'scale(' + this.headsize.width / (640 / 3 * this.zoomRate.x) + ')'
                    // transform: 'scale(' + this.headsize.width / (640 / 3 * this.zoomRate.x) + ',' + this.headsize.height / (1008 * 0.17) + ')'
            }
        }
    },
    methods: {
        showMessage() {
            this.$dispatch('showMessage', 5) // 5代表背景数组的最后一个，即显示充值的背景
        },
        cancelbet() {
            if (this.countDown > 30) { // 倒计时超过30秒是才能取消下注
                this.$dispatch('cancelbet')
            }
        },
        checkData(event) {
            // console.log(/\d+/.test(event.target.innerHTML))
            event.target.innerHTML = event.target.innerHTML.replace(/\D+/g, '')
            if (!event.target.innerHTML) {
                event.target.innerHTML = 1 //最小值为 1
            }
            this.userBet.betmoney = parseInt(event.target.innerHTML)
        },
        changeData(event) {
            event.target.innerHTML = event.target.innerHTML.replace(/\D+/g, '')
            if (!event.target.innerHTML) {
                event.target.innerHTML = 1 //最小值为 1
            }
            this.userBet.betmoney = parseInt(event.target.innerHTML)
        }
    }
}
</script>
<style>
.state {
    height: 17%;
    width: 100%;
    bottom: 1em;
    position: absolute;
}

table {
    width: 100%;
    height: 100%;
}

div.state-item {
    float: left;
    width: 33.3333%;
    height: 100%;
}

div.money-state {
    padding: 0 1em;
}

div.portrait {
    padding: 0;
}

div.portrait-img {
    width: 100%;
    height: 100%;
    background: url(../assets/th.jpg) 50% 50% no-repeat;
    background-size: contain;
}

div.polygon {
    /*clip-path: polygon(50% 0, 100% 27%, 100% 73%, 50% 100%, 0% 73%, 0 27%);*/
    width: 100%;
    height: 100%;
    /*    background: url(../assets/切图/主界面/头像1.png) 50% 50% no-repeat;
    background-size: contain;*/
    margin: auto;
}

div.button.undo {
    background: url(./../assets/切图/主界面/撤销.png) 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
}

div.button {
    background: url(./../assets/切图/主界面/投注金额.png) 50% 50%;
    background-size: contain;
    background-repeat: no-repeat;
    height: 40%;
    padding: 5%;
}

div.button span {
    /*font-size: 1.5rem;*/
}


/*div.stars-button{
    padding: .8em;
}*/

.money-icon {
    /*background: url(../assets/切图/商城/金币.png) 50% 50%;*/
    /*background-size: contain;*/
    /*background-repeat: no-repeat;*/
}

span.money-icon {
    float: left;
    font-size: 1.5em;
}

.money-num {
    color: white;
    -webkit-user-modify: read-write-plaintext-only;
    font-size: 1.5em;
}
</style>
