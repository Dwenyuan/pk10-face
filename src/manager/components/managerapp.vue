<template lang="pug">
    div.row
        div.col-xs-12
            h1.text-center 后台管理
    div.row
        div.col-xs-12
            div.col-xs-2
                div.list-group
                    div.list-group-item.btn.btn-default(v-if="isadmin",v-link="{path:'/systemsetting'}") 系统设置
                    div.list-group-item.btn.btn-default(v-if="isagent",v-link="{path:'/usermanager'}") 用户管理
                    div.list-group-item.btn.btn-default(v-if="isadmin",v-link="{path:'/goodmanager'}") 商品管理
                    div.list-group-item.btn.btn-default(v-if="isadmin",v-link="{path:'/agent'}") 代理商管理
                    div.list-group-item.btn.btn-default(v-if="true",v-link="{path:'/lotteryhistory'}") 开奖记录
            router-view
</template>
<script>
    export default {
        props: [],
        data() {
            return {

            }
        },
        computed: {
            isadmin() {
                return true
            },
            isagent() {
                return false
            }
        }
    }
</script>