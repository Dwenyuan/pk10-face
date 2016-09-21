<template lang="pug">
    div.col-xs-10
        div.panel.panel-info
            div.panel-heading 开奖记录
            div.panel-body
                div.row
                    div.col-xs-12
                        div.input-group.pull-right
                            input.form-control(placeholder="搜索期数",v-model="id")
                            span.input-group-addon
                                span.glyphicon.glyphicon-search
                div.row
                    div.col-xs-12
                        table.table
                            thead
                                tr
                                    td 期数
                                    td 开奖号码
                                    td 中奖号码
                                    td 开奖时间
                            tbody
                                tr(v-for="item in lotteryhistoryList | filterBy id in 'id'| limitBy pagenum pageindex*pagenum ",track-by="id")
                                    td(v-html="item.id")
                                    td(v-html="item.lotterynums")
                                    td(v-html="calcnum(item.lotterynums)")
                                    td(v-html="item.createdAt | datetime")
            div.panel-footer
                div.btn-toolbar(role="toolbar" aria-label="...")
                    div.btn-group
                        a.btn(v-for="1 in (lotteryhistoryList.length/pagenum)",v-html="$index+1",@click="changePage($index)")
</template>
<script>
    import RequestList from '../../js/request-list'
    export default {
        props: [],
        ready() {
            RequestList.getAllBonusNums(20).then(res => this.lotteryhistoryList = res.data)
        },
        data() {
            return {
                id: '',
                lotteryhistoryList: require('../../data/bounsRecord'),
                pageindex: 0,
                pagenum: 20
            }
        },
        methods: {
            calcnum(val) {
                var nums = val.split(',')
                var sum = parseInt(nums[0]) + parseInt(nums[nums.length - 1])
                return isNaN(sum) ? '?' : (Math.floor(sum / 10) ? Math.floor(sum / 10) : '') + sum % 10
            },
            changePage(val) {
                this.pageindex = val
            }
        }
    }
</script>