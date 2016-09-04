<template lang="pug">
    div.row
        div.col-xs-12
            h1.text-center 后台管理
    div.row
        div.col-xs-12
            div.col-xs-2
                div.list-group
                    div.list-group-item.btn.btn-default(v-if="isadmin",v-link="{path:'/systemsetting'}") 系统设置
                    div.list-group-item.btn.btn-default(v-if="isadmin||isagent",v-link="{path:'/usermanager'}") 用户管理
                    div.list-group-item.btn.btn-default(v-if="isadmin",v-link="{path:'/goodmanager'}") 商品管理
                    div.list-group-item.btn.btn-default(v-if="isadmin",v-link="{path:'/agent'}") 代理商管理
                    div.list-group-item.btn.btn-default(v-if="true",v-link="{path:'/lotteryhistory'}") 开奖记录
            router-view(v-bind:currentuserinfo="currentuserinfo")
</template>
<script>
    import RequestList from '../../js/request-list'
    export default {
        props: [],
        ready() {
            RequestList.getuserinfo({

            }).then(res => this.currentuserinfo = res.data)
        },
        data() {
            return {
                currentuserinfo: {}
            }
        },
        computed: {
            isadmin() {
                return this.currentuserinfo.isagent === 3
            },
            isagent() {
                return this.currentuserinfo.isagent !== 0
            }
        }
    }
</script>