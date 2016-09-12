<template lang="pug">
    //- 展示用户的下注金额 以及 奖金金额 当然还有倒计时
    div.bonus-bar
       //- div.bonus-item.bet
       //-     div.item-back.forzen
       //-         div.item-show
       //-             div.bet-num(v-bind:style="betNum",v-html="lockmoney")
       //- div.bonus-item.count-down
       //-     div.count-down-back
       //-         div.count-down-show
       //-             div.count-down-num(v-bind:style="{fontSize:40*zoomRate.x+'px'}",v-html="countDown | time")
       //- div.bonus-item.bonus
       //-     div.item-back.balance
       //-         div.item-show(@touchend="showMessage")
       //-             div.bet-num(v-bind:style="betNum" v-html="userinfo.money-lockmoney")
       div.left-split
       div.left
            div.betnum 上期 
                span(v-html="bonusNum.num")
            div.bettype
                span(v-html="bonusNum.text+'&nbsp;&nbsp;'")
                span(@touchend="showMessage") 往期
       div.right
            div.count-down-num(v-html="countDown | time")
</template>
<script>
import RequestList from '../js/request-list'
export default {
    props: ['zoomRate', 'userinfo', 'userBet', 'lastbets', 'countDown', 'countNum', 'bets', 'lockmoney', 'lotterynum'],
    ready() {
        this.getCount(this.count(this.countDown))
    },
    data() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    },
    computed: {
        bonusNum() {
            var nums = this.lotterynum.lotterynums.split(',')
            var sum = parseInt(nums[0]) + parseInt(nums[nums.length - 1])
            var showsum = isNaN(sum) ? '?' : (Math.floor(sum / 10) ? Math.floor(sum / 10) : '') + '(' + sum % 10 + ')'
            var firstnum = isNaN(parseInt(nums[0])) ? '?' : parseInt(nums[0])
            var secnum = isNaN(parseInt(nums[nums.length - 1])) ? '?' : parseInt(nums[nums.length - 1])

            // 转换为文字显示
            const numtext = '〇一二三四五六七八九大小单双'
            return {
                num:firstnum + '+' + secnum + '=' + showsum, //数字显示结果
                text:(sum%10>=5?numtext[10]:numtext[11])+(sum%10%2==0?numtext[13]:numtext[12])+(numtext[sum%10]?numtext[sum%10]:'❌') //文字显示结果
            } 
        },
        betNum() {
            return {
                fontSize: 34 * this.zoomRate.x + 'px',
                lineHeight: 3 * 34 * this.zoomRate.x + 'px'
            }
        }
    },
    methods: {
        //每次开奖都重新获取 倒计时
        getCount(fn) {
            var that = this
            RequestList.getCount().then((res) => {
                that.countDown = res.data.countDown
                that.countNum = res.data.countNum
                that.lastbets = Object.assign([], that.bets)
                that.userBet.idnum = res.data.idnum //开奖期数
                if (Object.prototype.toString.call(that.countDown) !== '[object Number]') {
                    that.$dispatch('error')
                    return
                }
                fn ? fn() : null
            }, (res) => {
                that.countDown = 0
            })
        },
        // 买定离手
        createUserBets() {
            var that = this
            RequestList.createUserBets(JSON.stringify(this.bets)).then((res) => {
                if (typeof res.data.errmsg !== 'undefined') {
                    that.$dispatch('showTip', res.data.errmsg)
                }
                console.log(res.data)
            }, (res) => {
                that.$dispatch('showTip', '投注失败')
                console.error(res.data)
            })
        },
        // 兑奖
        cashPrize() {
            var that = this
            RequestList.cashPrize(JSON.stringify(this.userinfo)).then(res => res.data.errmsg ? this.$dispatch('showTip', '兑奖出错') : this.userinfo = res.data, res => console.error(res.data))
        },
        getBonusNum(id) { // 根据期数 获取开奖结果
            var that = this
            RequestList.getBonusNum(id).then((res) => {
                that.lotterynum = res.data
                that.cashPrize() //获取到开奖结果后再去兑奖
                that.getCount(that.count)
                that.$dispatch('cancelbet')
                that.$dispatch('reloadinfo')
            }, (res) => {
                console.error(res)
            })
            this.countDown = this.countNum
        },
        showMessage() {
            this.$dispatch('showMessage', 1) //查看往期开镜记录
        },
        count() {
            // 距离开奖时间30秒时 买定离手
            if (this.countDown === 30 && this.bets && this.bets.length > 0) {
                this.createUserBets()
            }
            // 倒计时不是数字时不进行倒计时
            if (Object.prototype.toString.call(this.countDown) !== '[object Number]') {
                this.$dispatch('showTip', '倒计时读取错误,请刷新页面')
                return
            }
            // console.log(this.countDown)
            this.countDown--
                let that = this
            setTimeout(function() {
                if (that.countDown > 0) {
                    that.count()
                } else {
                    // 倒计时小于0 时 获取获奖结果 并兑奖
                    that.getBonusNum(that.userBet.idnum)
                }
            }, 1000)
        }
    }
}
</script>
<style>
    img {
        width: 100%;
        height: 100%;
    }
    
    div.left-split {
        width: 6%;
        height: 100%;
        float: left;
    }
    
    div.left {
        width: 45%;
        height: 100%;
        float: left;
        background: url('../assets/修改切图/文字.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 0% 6%;
    }
    
    div.right {
        width: 55%;
        height: 100%;
        float: left;
        background: url('../assets/修改切图/倒计时副本.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 0% 6%;
        margin: 1% 0 0 -12%;
    }
    
    div.betnum {
        position: absolute;
        margin: 6% 0 0 14%;
    }
    
    div.bettype {
        position: absolute;
        margin: 11% 0 0 14%;
    }
    
    div.forzen {
        height: 100%;
        width: 80%;
        display: table-cell;
        vertical-align: middle;
        background: url(./../assets/切图/主界面/冻结.png) 50% 50%;
        background-size: contain;
        background-repeat: no-repeat;
    }
    
    div.balance {
        height: 100%;
        width: 80%;
        display: table-cell;
        vertical-align: middle;
        background: url(./../assets/切图/主界面/余额.png) 50% 50%;
        background-size: contain;
        background-repeat: no-repeat;
    }
    
    .bonus-bar {
        height: 20%;
        background: url('./../assets/修改切图/水墨画.png');
        background-size: cover;
        background-repeat: no-repeat;
    }
    
    div.item-back {
        display: table-cell;
        vertical-align: middle;
    }
    
    div.item-show {
        text-align: center;
    }
    
    div.item-show div {
        /*height: 30%;*/
    }
    
    div.bonus-item {
        display: table;
        float: left;
        height: 100%;
    }
    
    div.bet-num {
        margin: 30% 0 0 0;
        color: white;
    }
    
    div.bet,
    div.bonus {
        width: calc(35% - 1em);
        padding: 0 .5em;
    }
    
    div.count-down {
        width: calc(30% - 1em);
        padding: 0 .5em;
    }
    
    div.count-down-num {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        position: absolute;
        margin: 4% 0 0 41%;
        font-size: 1.2em;
    }
    
    div.count-down-back {
        height: 100%;
        display: table-cell;
        vertical-align: middle;
        background: url(./../assets/切图/主界面/count-down.png) 50% 50%;
        background-size: contain;
        background-repeat: no-repeat;
    }
    
    div.count-down-show {
        display: table;
        height: 92%;
        width: 92%;
        margin: 4%;
    }
</style>