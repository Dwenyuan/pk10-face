<template lang="pug">
        div.bet-info(v-bind:style="content")
            div.record
                div.split-record-bet-2 期数
                div.split-record-bet-1 项目
                div.split-record-bet-2 金额
                div.split-record-bet-2 余额
                div.split-record-bet-3 结果
            div.record(v-for="item in betRecord")
                div.split-record-bet-2(v-html="item.idnum")
                div.split-record-bet-1(v-html="betnumshow(item)")
                div.split-record-bet-2(v-html="item.betmoney")
                div.split-record-bet-2(v-html="item.balance")
                div.split-record-bet-3(v-html="item.result")
</template>
<script>
    import RequestList from '../../js/request-list'
    export default {
        props: ['zoomRate', 'bonusRecord'],
        ready() {
            RequestList.getRecentlyBets().then(res => this.betRecord = res.data)
        },
        data() {
            return {
                betRecord: require('../../data/betRecord')
            }
        },
        methods: {
            betnumshow(bet) {
                const numtext = '〇一二三四五六七八九大小单双';
                if (bet.type === 'NUMBER') {
                    return numtext[bet.betnum]
                }
                switch (bet.betnum) {
                    case 'single':
                        return numtext[12]
                    case 'double':
                        return numtext[13]
                    case 'big':
                        return numtext[10]
                    case 'small':
                        return numtext[11]
                }
            },
            resultshow(item) {
            },
            betresult(item){ //投注结果
                return '未中奖'
            },
            calcresult(lotterynums){ //计算开奖结果
                var nums = lotterynums.split(',')
                var sum = parseInt(nums[0]) + parseInt(nums[nums.length - 1])
                var showsum = isNaN(sum) ? '?' : (Math.floor(sum / 10) ? Math.floor(sum / 10) : '') + '(' + sum % 10 + ')'
                var firstnum = isNaN(parseInt(nums[0])) ? '?' : parseInt(nums[0])
                var secnum = isNaN(parseInt(nums[nums.length - 1])) ? '?' : parseInt(nums[nums.length - 1])
                return sum%10;
            },
            searchLotteryById(ids){
                RequestList.getBonusNums(ids).then(res=>console.log(res.data))
            }
        },
        computed: {
            content() {
                return {
                    width: 458 * this.zoomRate.x + 'px',
                    height: 580 * this.zoomRate.y + 'px',
                    margin: 90 * this.zoomRate.y + 'px 0 0 ' + 37 * this.zoomRate.x + 'px'
                }
            }
        },
        event:{
            getRecentlyBets(){
                RequestList.getRecentlyBets().then(res => this.betRecord = res.data)
            }
        }
    }
</script>
<style>
    div.bet-info {
        position: absolute;
        overflow: scroll;
        padding: 10px;
    }
    
    div.record {
        color: white;
    }
    
    div.split-record-bet-1 {
        font-size: 13px;
        width: 10%;
        text-align: center;
        float: left;
    }
    
    div.split-record-bet-2 {
        font-size: 13px;
        width: 20%;
        text-align: center;
        float: left;
    }
    
    div.split-record-bet-3 {
        font-size: 13px;
        width: 30%;
        text-align: center;
        float: left;
    }
    
    div.split-record-bet-4 {
        font-size: 13px;
        width: 40%;
        text-align: center;
        float: left;
    }
</style>