<template lang="pug">
    //- 主游戏区
    div.playpanel
        div.table-panel(v-el:panel,v-bind:style="{width:imgSize.width*zoomRate.x+'px',height:imgSize.height*zoomRate.y+'px'}")
            div.num.single(v-bind:style="single",@touchend="dobet('single')")
                img.chip(v-for="item in bets|filterBy 'single' in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.double(v-bind:style="double",@touchend="dobet('double')")
                img.chip(v-for="item in bets|filterBy 'double' in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.zero(v-bind:style="zero",@touchend="dobet(0)")
                img.chip(v-for="item in bets|filterBy 0 in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.one(v-bind:style="one",@touchend="dobet(1)")
                img.chip(v-for="item in bets|filterBy 1 in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.two(v-bind:style="two",@touchend="dobet(2)")
                img.chip(v-for="item in bets|filterBy 2 in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.three(v-bind:style="three",@touchend="dobet(3)")
                img.chip(v-for="item in bets|filterBy 3 in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.four(v-bind:style="four",@touchend="dobet(4)")
                img.chip(v-for="item in bets|filterBy 4 in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.five(v-bind:style="five",@touchend="dobet(5)")
                img.chip(v-for="item in bets|filterBy 5 in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.six(v-bind:style="six",@touchend="dobet(6)")
                img.chip(v-for="item in bets|filterBy 6 in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.seven(v-bind:style="seven",@touchend="dobet(7)")
                img.chip(v-for="item in bets|filterBy 7 in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.eight(v-bind:style="eight",@touchend="dobet(8)")
                img.chip(v-for="item in bets|filterBy 8 in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.nine(v-bind:style="nine",@touchend="dobet(9)")
                img.chip(v-for="item in bets|filterBy 9 in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.big(v-bind:style="big",@touchend="dobet('big')")
                img.chip(v-for="item in bets|filterBy 'big' in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.small(v-bind:style="small",@touchend="dobet('small')")
                img.chip(v-for="item in bets|filterBy 'small' in 'betnum'",v-bind:src="chipImg",v-bind:style="{margin: (Math.random() * 50) + '% 0 0 ' + (Math.random() * 50) + '%'}")
            div.num.formula(v-bind:style="formula",v-html="bonusNum") 
            div.num.bonudnum(v-bind:style="bonudnum")
                table
                    tr
                        td(v-html="isBouns|covert")
        img(v-bind:src="tablePanelImg",v-bind:style="{width:imgSize.width*zoomRate.x+'px',height:imgSize.height*zoomRate.y+'px'}")
</template>
<script>
export default {
    props: ['zoomRate', 'userinfo', 'lastbets', 'bets', 'userBet', 'countDown', 'countNum', 'lockmoney', 'lotterynum'],
    data() {
        return {
            showBetNum: '', //中奖后在方块中显示此数字
            tablePanelImg: require('../assets/切图/主界面/主操作.png'),
            chipImg: require('../assets/切图/主界面/5X筹码-拷贝.png'),
            imgSize: {
                width: 640,
                height: 528
            }
        }
    },
    computed: {
        // TODO 重新设定中奖规则
        bonusNum() {
            var nums = this.lotterynum.lotterynums.split(',')
            var sum = parseInt(nums[0]) + parseInt(nums[nums.length - 1])
            var showsum = isNaN(sum) ? '?' : (Math.floor(sum / 10) ? Math.floor(sum / 10) : '') + '(' + sum % 10 + ')'
            var firstnum = isNaN(parseInt(nums[0])) ? '?' : parseInt(nums[0])
            var secnum = isNaN(parseInt(nums[nums.length - 1])) ? '?' : parseInt(nums[nums.length - 1])
            return firstnum + '+' + secnum + '=' + showsum
        },
        // 是否中奖 中奖的话显示为方块绿色
        isBouns() {
            var _this = this
            var nums = this.lotterynum.lotterynums.split(',')
            var sum = parseInt(nums[0]) + parseInt(nums[nums.length - 1])
            var checkBouns = (betnum, bonudnum) => { //判断是否中奖
                if (betnum === bonudnum % 10) return true
                if (betnum === 'single' && bonudnum % 2 === 1) return true
                if (betnum === 'double' && bonudnum % 2 === 0) return true
                if (betnum === 'big' && bonudnum >= 5) return true
                if (betnum === 'small' && bonudnum < 5) return true

                return false
            }
            this.lastbets ? this.lastbets.forEach((key, value) => {
                if (this.userBet.idnum === value.idnum + 1 && checkBouns(value.betnum, sum)) { //只显示上次开奖结果
                    _this.showBetNum = value.betnum
                }
            }) : ''
            return this.showBetNum || this.showBetNum === 0 ? this.showBetNum : ''
        },
        single() {
            return {
                width: 83 * this.zoomRate.x + 'px',
                height: 83 * this.zoomRate.y + 'px',
                margin: 20 * this.zoomRate.y + 'px 0 0 ' + 7 * this.zoomRate.x + 'px'
            }
        },
        double() {
            return {
                width: 83 * this.zoomRate.x + 'px',
                height: 83 * this.zoomRate.y + 'px',
                margin: 20 * this.zoomRate.y + 'px 0 0 ' + 548 * this.zoomRate.x + 'px'
            }
        },
        zero() {
            return {
                width: 120 * this.zoomRate.x + 'px',
                height: 120 * this.zoomRate.y + 'px',
                margin: 174 * this.zoomRate.y + 'px 0 0 ' + (18 + 120 * 0) * this.zoomRate.x + 'px'
            }
        },
        one() {
            return {
                width: 120 * this.zoomRate.x + 'px',
                height: 120 * this.zoomRate.y + 'px',
                margin: 174 * this.zoomRate.y + 'px 0 0 ' + (18 + 120 * 1) * this.zoomRate.x + 'px'
            }
        },
        two() {
            return {
                width: 120 * this.zoomRate.x + 'px',
                height: 120 * this.zoomRate.y + 'px',
                margin: 174 * this.zoomRate.y + 'px 0 0 ' + (18 + 120 * 2) * this.zoomRate.x + 'px'
            }
        },
        three() {
            return {
                width: 120 * this.zoomRate.x + 'px',
                height: 120 * this.zoomRate.y + 'px',
                margin: 174 * this.zoomRate.y + 'px 0 0 ' + (18 + 120 * 3) * this.zoomRate.x + 'px'
            }
        },
        four() {
            return {
                width: 120 * this.zoomRate.x + 'px',
                height: 120 * this.zoomRate.y + 'px',
                margin: 174 * this.zoomRate.y + 'px 0 0 ' + (18 + 120 * 4) * this.zoomRate.x + 'px'
            }
        },
        five() {
            return {
                width: 120 * this.zoomRate.x + 'px',
                height: 120 * this.zoomRate.y + 'px',
                margin: (174 + 120) * this.zoomRate.y + 'px 0 0 ' + (18 + 120 * 0) * this.zoomRate.x + 'px'
            }
        },
        six() {
            return {
                width: 120 * this.zoomRate.x + 'px',
                height: 120 * this.zoomRate.y + 'px',
                margin: (174 + 120) * this.zoomRate.y + 'px 0 0 ' + (18 + 120 * 1) * this.zoomRate.x + 'px'
            }
        },
        seven() {
            return {
                width: 120 * this.zoomRate.x + 'px',
                height: 120 * this.zoomRate.y + 'px',
                margin: (174 + 120) * this.zoomRate.y + 'px 0 0 ' + (18 + 120 * 2) * this.zoomRate.x + 'px'
            }
        },
        eight() {
            return {
                width: 120 * this.zoomRate.x + 'px',
                height: 120 * this.zoomRate.y + 'px',
                margin: (174 + 120) * this.zoomRate.y + 'px 0 0 ' + (18 + 120 * 3) * this.zoomRate.x + 'px'
            }
        },
        nine() {
            return {
                width: 120 * this.zoomRate.x + 'px',
                height: 120 * this.zoomRate.y + 'px',
                margin: (174 + 120) * this.zoomRate.y + 'px 0 0 ' + (18 + 120 * 4) * this.zoomRate.x + 'px'
            }
        },
        big() {
            return {
                width: 83 * this.zoomRate.x + 'px',
                height: 83 * this.zoomRate.y + 'px',
                margin: 425 * this.zoomRate.y + 'px 0 0 ' + 8 * this.zoomRate.x + 'px'
            }
        },
        small() {
            return {
                width: 83 * this.zoomRate.x + 'px',
                height: 83 * this.zoomRate.y + 'px',
                margin: 425 * this.zoomRate.y + 'px 0 0 ' + 548 * this.zoomRate.x + 'px'
            }
        },
        formula() {
            return {
                width: 210 * this.zoomRate.x + 'px',
                textAlign: 'center',
                // height: 83 * this.zoomRate.y + 'px',
                fontSize: 42 * this.zoomRate.x + 'px',
                margin: 37 * this.zoomRate.y + 'px 0 0 ' + 220 * this.zoomRate.x + 'px'
            }
        },
        // TODO 遍历上期下注记录，计算筛选是否有中奖号码
        bonudnum() {
            return {
                width: 68 * this.zoomRate.x + 'px',
                textAlign: 'center',
                fontSize: 40 * this.zoomRate.x + 'px',
                height: 68 * this.zoomRate.y + 'px',
                margin: 90 * this.zoomRate.y + 'px 0 0 ' + 290 * this.zoomRate.x + 'px',
                backgroundImage: this.isBouns ? 'url(' + require('../assets/切图/主界面/显示-绿.png') + ')' : 'url(' + require('../assets/切图/主界面/显示-红.png') + ')'
            }
        }
    },
    methods: {
        bet(event) {
            console.log('Height' + event.target.offsetHeight)
            console.log('Width' + event.target.offsetWidth)
            console.log(event)
        },
        // 用户下注
        dobet(num) {
            if (this.userinfo.money - this.userBet.betmoney - this.lockmoney < 0) return //余额小于0是禁止下注
            if (this.countDown < 30) return // 倒计时小于30秒时禁止下注
            if (Object.prototype.toString.call(num) === '[object Number]') {
                this.userBet.type = 'NUMBER'
                this.userBet.betnum = num
            } else if (Object.prototype.toString.call(num) === '[object String]') {
                switch (num) {
                    case 'single':
                        this.userBet.type = 'SINGLE_OR_DOUBLE'
                        this.userBet.betnum = num
                        break
                    case 'double':
                        this.userBet.type = 'SINGLE_OR_DOUBLE'
                        this.userBet.betnum = num
                        break
                    case 'big':
                        this.userBet.type = 'BIG_OR_SMALL'
                        this.userBet.betnum = num
                        break
                    case 'small':
                        this.userBet.type = 'BIG_OR_SMALL'
                        this.userBet.betnum = num
                        break
                    default:
                        break
                }
            }
            this.bets.push(Object.assign({}, this.userBet))
        }
    },
    events: {
        cancelBet(event) {
            this.bets = []
        }
    }
}
</script>
<style>
.playpanel {
    /*background: url(../assets/切图/主界面/主操作.png) 50% 50%;*/
    background-size: contain;
    background-repeat: no-repeat;
    height: 50%;
}

img.chip {
    width: 50%;
    height: 50%;
    position: absolute;
}

div.table-panel {
    width: 100%;
    height: 50%;
    position: absolute;
    /*display: none;*/
    /*background: rgba(255, 0, 0, .3);*/
}

div.single {
    /*background: rgba(0, 255, 255, .6);*/
    border-bottom-right-radius: 1em;
}

div.double {
    /*background: rgba(0, 255, 255, .6);*/
    margin: 3% 0% 0% 86%;
    border-bottom-left-radius: 1em;
}

div.big {
    border-top-right-radius: 1em;
}

div.small {
    border-top-left-radius: 1em;
}

div.num {
    position: absolute;
    /*background: rgba(0, 255, 255, .6);*/
}


/*中奖*/

div.bonudnum.active {
    /*background: url(../assets/切图/主界面/显示-绿.png) 50% 50%;*/
}

div.bonudnum {
    /*background: url(../assets/切图/主界面/显示-红.png) 50% 50%;*/
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}
</style>
