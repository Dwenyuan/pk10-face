<template lang="pug">
    div.col-xs-10
        div.panel.panel-info
            div.panel-heading 代理商管理
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
                                    td 用户电话
                                    td 注册时间
                                    td 等级
                                    td 返点
                                    td
                                    td
                                    td
                            tbody
                                tr(v-for="user in userList | filterBy searchNickname in 'username'| limitBy pagenum pageindex*pagenum ",track-by="id")
                                    td(v-html="user.id")
                                    td(v-html="user.username")
                                    td(v-html="user.tel")
                                    td(v-html="user.createdAt | date")
                                    td(v-html="user.isagent")
                                    td(v-html="user.rebate")
                                    td
                                        a.btn.btn-default.btn-xs(@click="showSetMoney(user)",data-toggle="modal",data-target="#myModal") 修改代理商
                                    td
                                        a.btn.btn-default.btn-xs 删除 
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
                    h4.modal-title(v-html="setUser.nickname")
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
                            span.btn.btn-default.list-name 等级
                        input.form-control(v-model="setUser.isagent")
                    br
                    div.input-group
                        span.input-group-btn
                            span.btn.btn-default.list-name 返点
                        input.form-control(v-model="setUser.rebate")
                    br

                div.modal-footer
                    button.btn.btn-default(data-dismiss="modal") 关闭
                    button.btn.btn-primary(@click="updateUser") 确认修改
</template>
<script>
    import RequestList from '../../js/request-list'
    export default {
        props: [],
        ready() {
            RequestList.getAllAgent().then(res => this.userList = res.data)
        },
        data() {
            return {
                searchNickname: '',
                setUser: {},
                userList: require('../../data/userinfo'),
                pageindex: 0,
                pagenum: 20
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
                    'openid': this.setUser.openid,
                    'isagent': this.setUser.isagent,
                    'rebate': this.setUser.rebate,
                    'owner':this.setUser.owner
                }).then((res) => {
                    $(this.$els.model).modal('hide')
                }, (res) => {
                    console.log(res)
                })
            },
            showSetMoney(user) {
                this.setUser = user
                $(this.$els.model).modal('show')
            }
        }
    }
</script>
<style>
    .list-name {
        width: 120px;
    }
</style>