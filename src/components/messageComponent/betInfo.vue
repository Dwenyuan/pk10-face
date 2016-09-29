<template lang="pug">
        div.bet-info(v-bind:style="content")
            div.record
                div.split-record-bet 期数
                div.split-record-bet 项目
                div.split-record-bet 金额
                div.split-record-bet 余额
                div.split-record-bet 结果
            div.record(v-for="item in betRecord")
                div.split-record-bet(v-html="item.idnum")
                div.split-record-bet(v-html="betnumshow(item)")
                div.split-record-bet(v-html="item.betmoney")
                div.split-record-bet(v-html="item.balance")
                div.split-record-bet(v-html="")
</template>
<script>
    import RequestList from '../../js/request-list'
    export default {
        props: ['zoomRate', 'lotterynum'],
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
    
    div.split-record-bet {
        font-size: 13px;
        width: 20%;
        float: left;
    }
</style>