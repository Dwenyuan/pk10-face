<template lang="pug">
    div.bet-info(v-bind:style="content")
        div.record
            div.split-record 期数
            div.split-record 开奖结果
            div.split-record
                div.half 大
                div.half 小
            div.split-record  
                div.half 单
                div.half 双
        div.record(v-for="item in bonusRecord")
            div.split-record(v-html="item.id")
            div.split-record(v-html="lotterynum(item.lotterynums)")
            div.split-record
                div.half(v-html="lotterynum(item.lotterynums)>=5?'●':'&nbsp;'")
                div.half(v-html="lotterynum(item.lotterynums)>=5?'&nbsp;':'●'")
            div.split-record
                div.half(v-html="lotterynum(item.lotterynums)%2==0?'&nbsp;':'●'")
                div.half(v-html="lotterynum(item.lotterynums)%2==0?'●':'&nbsp;'")
            //- p.created-time(v-html="item.createdAt | datetime")
            //- p.bonus-num
                //- span 开奖号码：
                //- span(v-html="lotterynum(item.lotterynums)")
</template>
<script>
    import RequestList from '../../js/request-list'
    export default {
        props: ['zoomRate'],
        ready() {
            RequestList.getBonusRecord(20).then(res => this.bonusRecord = res.data)
        },
        data() {
            return {
                bonusRecord: require('../../data/bounsRecord')
            }
        },
        methods: {
            lotterynum(nums) {
                if (Object.prototype.toString.call(nums) !== '[object String]') {
                    throw new Error('获取中奖结果出错')
                }
                // 中奖数字总共十位数，取第一位和最后一位相加结果的个位数作为开奖结果
                nums = nums.split(',')
                return (parseInt(nums[0]) + parseInt(nums[nums.length - 1])) % 10
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
        events: {
            getBonusRecord() {
                RequestList.getBonusRecord(20).then(res => this.bonusRecord = res.data)
            }
        }
    }
</script>
<style>
    div.bet-info {
        position: absolute;
        overflow: auto;
        padding: 10px;
    }
    
    div.record {
        color: white;
        margin-bottom: 2em;
        padding: 5px;
    }
    
    div.record p {
        margin-bottom: .5em;
        margin-top: .5em;
    }
    
    div.half {
        width: 50%;
        height: 100%;
        float: left;
        text-align: center;
    }
    
    div.split-record {
        float: left;
        text-align: center;
        width: 25%;
    }
</style>