<template lang="pug">
    div.col-xs-10
        div.panel.panel-info
            div.panel-heading 用户管理
            div.panel-body
                div.row
                    div.col-xs-12
                        div.input-group.pull-right
                            input.form-control(placeholder="搜索用户",v-model="searchNickname")
                            span.input-group-addon
                                span.glyphicon.glyphicon-search
                div.row
                    div.col-xs-12
                        table.table
                            thead
                                tr
                                    td 序号
                                    td 用户昵称
                                    td 用户金币
                                    td 用户电话
                                    td 注册时间
                                    td
                                    td
                            tbody
                                tr(v-for="user in userList | filterBy searchNickname in 'username'| limitBy pagenum pageindex*pagenum ",track-by="id")
                                    td(v-html="user.id")
                                    td(v-html="user.username")
                                    td(v-html="user.money")
                                    td(v-html="user.tel")
                                    td(v-html="user.createdAt | date")
                                    td
                                        a.btn.btn-default.btn-xs(v-if="isadmin",@click="showSetMoney(user)",data-toggle="modal",data-target="#myModal") 修改用户信息
                                    td
                                        a.btn.btn-default.btn-xs(v-if="isadmin",@click="checkuserinfo") 查看用户记录
            div.panel-footer
                div.btn-toolbar(role="toolbar" aria-label="...")
                    div.btn-group
                        a.btn(v-for="1 in (userList.length/pagenum)",v-html="$index+1",@click="changePage($index)")
    div#mymodel.modal.fade(v-el:model)
        div.modal-dialog
            div.modal-content
                div.modal-header
                    button.close(data-dismiss="modal",aria-label="Close")
                        span(aria-hidden="true") &times;
                    h4.modal-title(v-html="setUser.username")
                div.modal-body
                    br
                    div.input-group
                        span.input-group-btn
                            span.btn.btn-default.list-name 用户id
                        input.form-control(v-model="setUser.id",disabled)
                    br
                    div.input-group
                        span.input-group-btn
                            span.btn.btn-default.list-name 用户名
                        input.form-control(v-model="setUser.username")
                    br
                    div.input-group
                        span.input-group-btn
                            span.btn.btn-default.list-name 电话
                        input.form-control(v-model="setUser.tel")
                    br
                    div.input-group
                        span.input-group-btn
                            span.btn.btn-default.list-name 注册时间
                        input.form-control(v-bind:value="setUser.createdAt|datetime",disabled)
                    br
                    div.input-group
                        span.input-group-btn
                            span.btn.btn-default.list-name 金币
                        input.form-control(v-model="setUser.money")
                div.modal-footer
                    button.btn.btn-default(data-dismiss="modal") 关闭
                    button.btn.btn-primary(@click="updateUser") 确认修改
    div.modal.fade(v-el:betrecord)
        div.modal-dialog
            div.panel.panel-default
                div.panel-heading
                    h5 投注记录
                div.panel-body
                    table.table.table-hover.table-bordered
                        thead
                            th 玩法
                            th 下注金额
                            th 下注数字
                            th 下注时间
                        tbody
                            tr(v-for="item in betRecords")
                                td(v-html="item.playlaw")
                                td(v-html="item.betmoney")
                                td(v-html="item.betnum|covert")
                                td(v-html="item.createdAt|datetime")
                div.panel-footer
</template>
<script>
    import RequestList from '../../js/request-list'
    export default {
        props: ['currentuserinfo'],
        ready() {
            if (this.currentuserinfo.isagent === 3) {
                RequestList.getAllUserInfo().then(res => this.userList = res.data)
            } else {
                RequestList.getUserForAgent(JSON.parse(JSON.stringify(this.currentuserinfo))).then(res => this.userList = res.data)
            }
        },
        data() {
            return {
                searchNickname: '',
                setUser: {},
                userList: require('../../data/userinfo'),
                pageindex: 0,
                pagenum: 20,
                betRecords: []
            }
        },
        methods: {
            changePage(event) {
                this.pageindex = event
            },
            updateUser() {
                RequestList.updateuserinfo({
                    'id': this.setUser.id,
                    'username': this.setUser.username,
                    'password': this.setUser.password,
                    'tel': this.setUser.tel,
                    'createdAt': this.setUser.createdAt,
                    'money': this.setUser.money,
                    'nickname': this.setUser.nickname,
                    'openid': this.setUser.openid
                }).then((res) => {
                    $(this.$els.model).modal('hide')
                }, (res) => {
                    console.log(res)
                })
            },
            showSetMoney(user) {
                this.setUser = user
                $(this.$els.model).modal('show')
            },
            checkuserinfo() {
                RequestList.getRecentlyBets().then(res => this.betRecords = res.data)
                $(this.$els.betrecord).modal('show')
            }
        }
    }
</script>
<style>
    .list-name {
        width: 120px;
    }
</style>