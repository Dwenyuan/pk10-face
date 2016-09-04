<template lang="pug">
    div.col-xs-10
        div.panel.panel-default
            div.panel-heading 系统设置
            div.panel-body
                div.row
                    div.col-xs-2
                        div.list-group
                            a.list-group-item(v-for="item in systemsetData",v-html="item.gName",@click="changeGame(item)")
                    div.col-xs-10
                        br
                        div.row
                            div.col-xs-2 游戏名称
                            div.col-xs-10
                                input.form-control(v-model="tempData[0].gName")
                        br
                        div.row
                            div.col-xs-2 赔率设置
                            div.col-xs-10
                                div.col-xs-8(v-for="item in tempData")
                                    div.input-group
                                        span.input-group-addon(v-html="item.type")
                                        input.form-control(v-model="item.rate")
                        br
                        div.row
                            div.col-xs-2 初始化赠送金币
                            div.col-xs-10
                                input.form-control(v-model="tempData[0].initMoney")
                        br
            div.panel-footer
                div.row
                    div.col-xs-10
                    div.col-xs-2
                        a.btn.btn-default(@click="updateSystemSet") 保存
</template>
<script>
    import RequestList from '../../js/request-list'
    export default {
        props: [],
        ready() {
            RequestList.getAllSystemSetting().then(res => this.systemsetData = res.data)
        },
        data() {
            return {
                tempData: [], //当前正在进行设置的游戏
                systemsetData: require('./../../data/systemsetting')
            }
        },
        methods: {
            changeGame(item) {
                RequestList.getGameInitDate({
                    gName: item.gName
                }).then(res => this.tempData = res.data, res => this.tempData = [])
            },
            updateSystemSet() {
                if (this.tempData) {
                    this.tempData.map(value => RequestList.updateGameInitDate(value).then(res => console.log(res.data)))
                }
            }
        }
    }
</script>