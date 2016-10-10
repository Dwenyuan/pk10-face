<template lang="pug">
    //- 状态区 ，展示用户的一些状态
    div.state
        div.state-item.money.table(@touchend="showMessage")
            div.my-money 我的金币
                span 
                    img.moneyplus(v-bind:src="moneyplus")
            div.my-money.my-money-show(v-html="userinfo.money-lockmoney")
        div.dobet-money-btn
            div.dobet-money-item-btn(@touchend="changecounter(100)")
                div.bet-text(v-show="this.userBet.betmoney===100")
            div.dobet-money-item-btn(@touchend="changecounter(1000)")
                div.bet-text(v-show="this.userBet.betmoney===1000")
            div.dobet-money-item-btn(@touchend="changecounter(10000)")
                div.bet-text(v-show="this.userBet.betmoney===10000")
            div.dobet-money-item-btn(@touchend="changecounter(100000)")
                div.bet-text(v-show="this.userBet.betmoney===100000")
            div.dobet-money-item-btn(@touchend="cancelbet")
</template>
<script>
    export default {
        props: ['zoomRate', 'userBet', 'userinfo', 'countDown', 'lockmoney', 'chipImg','limitDown'],
        ready() {
            console.log(this.zoomRate)
            console.log(this.$els.image)
        },
        data() {
            return {
                headzoom: 1.2,
                headborderimg: require('../assets/切图/主界面/头像1.png'),
                anonymousheadimg: require('../assets/unkown.jpg'),
                moneyplus: require('./../assets/修改切图/我的金豆加号.png')
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
            changecounter(event) {
                this.userBet.betmoney = event
                switch (event) {
                    case 100:
                        this.chipImg = require('./../assets/切图/主界面/铁-筹码.png')
                        break;
                    case 1000:
                        this.chipImg = require('./../assets/切图/主界面/铜-筹码.png')
                        break;
                    case 10000:
                        this.chipImg = require('./../assets/切图/主界面/银-筹码.png')
                        break;
                    case 100000:
                        this.chipImg = require('./../assets/切图/主界面/金-筹码.png')
                        break;
                    default:
                        this.chipImg = require('./../assets/切图/主界面/银-筹码.png')
                        break;
                }
            },
            showMessage() {
                this.$dispatch('showMessage', 4) // 5代表背景数组的最后一个，即显示充值的背景
            },
            cancelbet() {
                if (this.countDown > this.limitDown) { // 倒计时超过30秒是才能取消下注
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
        },
        watch: {
            userinfo: {
                handle(newval) {
                    if (newval && newval.money < 0) {
                        this.init()
                    }
                },
                deep: true
            }
        }
    }
</script>
<style>
    .state {
        height: 17%;
        width: 100%;
        bottom: 0em;
        position: absolute;
    }
    
    div.state-item.money {
        background: url('../assets/修改切图/我的金豆.png');
        background-repeat: no-repeat;
        background-size: contain;
        float: left;
    }
    
    table {
        width: 100%;
        height: 100%;
    }
    
    div.state-item {
        float: left;
        width: 35%;
        height: 100%;
    }
    
    img.moneyplus {
        width: 1em;
    }
    
    div.money-state {
        padding: 0 1em;
    }
    
    div.my-money {
        margin: 9% 0 0 7%;
        font-size: 16px;
    }
    
    div.my-money-show {
        margin: 16% 0 0 7%;
    }
    
    div.bet-text {
        width: 50%;
        height: 50%;
        /*background:url('./../assets/修改切图/杵.png') no-repeat;*/
        margin: 15% 0 0 20%;
    }
    
    div.dobet-money-item-btn:nth-child(1)>div.bet-text {
        background: url('./../assets/修改切图/杵.png') no-repeat;
        background-size: inherit;
    }
    
    div.dobet-money-item-btn:nth-child(2)>div.bet-text {
        background: url('./../assets/修改切图/泾.png') no-repeat;
        background-size: inherit;
    }
    
    div.dobet-money-item-btn:nth-child(3)>div.bet-text {
        background: url('./../assets/修改切图/銀.png') no-repeat;
        background-size: inherit;
    }
    
    div.dobet-money-item-btn:nth-child(4)>div.bet-text {
        background: url('./../assets/修改切图/金.png') no-repeat;
        background-size: inherit;
    }
    
    div.show-money-num {
        text-align: center;
        color: white;
        margin-top: 160%;
        background: rgba(0, 0, 0, 0.3);
        font-size: 12px;
        border-radius: 10px;
    }
    
    div.dobet-money-btn {
        width: 65%;
        float: left;
        height: 100%;
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
    
    div.dobet-money-item-btn {
        float: left;
        width: 19%;
        margin-left: 1%;
        height: 100%;
    }
    
    div.dobet-money-item-btn:nth-child(1) {
        background: url('./../assets/修改切图/100.png') no-repeat 50% 50%;
        background-size: contain;
    }
    
    div.dobet-money-item-btn:nth-child(2) {
        background: url('./../assets/修改切图/1000.png') no-repeat 50% 50%;
        background-size: contain;
    }
    
    div.dobet-money-item-btn:nth-child(3) {
        background: url('./../assets/修改切图/10000.png') no-repeat 50% 50%;
        background-size: contain;
    }
    
    div.dobet-money-item-btn:nth-child(4) {
        background: url('./../assets/修改切图/100000.png') no-repeat 50% 50%;
        background-size: contain;
    }
    
    div.dobet-money-item-btn:nth-child(5) {
        background: url('./../assets/修改切图/撤销.png') no-repeat 50% 50%;
        background-size: contain;
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