<template lang="pug">
    div.col-xs-10
        div.panel.panel-default
            div.panel-heading
                div.btn-group.btn-group-justified
                    a.btn.btn-default(v-for="item in systemsetData",v-html="item.gamename",@click="changeGame(item)")
            div.panel-body
                br
                div.row
                    div.col-xs-2 游戏名称
                    div.col-xs-10
                        input.form-control(v-model="tempData.gamename")
                br
                div.row
                    div.col-xs-2 赔率设置
                    div.col-xs-10
                        div.col-xs-6
                            div.input-group
                                span.input-group-addon 下注数字
                                input.form-control(v-model="tempData.numberodd")
                        div.col-xs-6
                            div.input-group
                                span.input-group-addon 下注大小或单双
                                input.form-control(v-model="tempData.singleodd")
                br
                div.row
                    div.col-xs-2 初始化赠送金币
                    div.col-xs-10
                        input.form-control(v-model="tempData.initmoney")
                br
            div.panel-footer
                div.row
                    div.col-xs-10
                    div.col-xs-2
                        a.btn.btn-default(@click="updateSystemSet") 保存
</template>
<script>
    export default {
        props: [],
        ready() {

        },
        data() {
            return {
                tempData: {}, //当前正在进行设置的游戏
                systemsetData: require('./../../data/systemsetting')
            }
        },
        methods: {
            changeGame(item) {
                this.tempData = item
            },
            updateSystemSet() {

            }
        }
    }
</script>