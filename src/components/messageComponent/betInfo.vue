<template lang="pug">
    div.bet-info(v-bind:style="content")
        div.record(v-for="item in betRecord")
            p.created-time(v-html="item.createdAt|datetime")
            p.detail
                span 玩法：
                span(v-html="item.playlaw")
                span 下注金额：
                span(v-html="item.betmoney")
            p.bonus-num
                span 数字：
                span(v-html="item.betnum|covert")
</template>
<script>
import RequestList from '../../js/request-list'
export default {
    props: ['zoomRate'],
    ready() {
        RequestList.getRecentlyBets().then(res => this.betRecord = res.data)
    },
    data() {
        return {
            betRecord: require('../../data/betRecord')
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
    }
</style>