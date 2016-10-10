<template lang="pug">
    div.bg
        img.bg-img(v-bind:src="backgroundImg")
    div.title 
        div {{statusText}}界面
    div.sub-title 
        div 请输入用户名
    
    template(v-if="status === 'login'")
        div.split-1
        div.tip 用户名/手机号
        div.username.input-box
            div.input
                input(v-model="userInfo.username")
        div.tip 密码
        div.password.input-box
            div.input
                input(type="password",v-model="userInfo.password")
        div.split-2
        div.button
            div.login-button
                img(@touchend="login",v-bind:src="loginButtonImg")
        div.button
            div.register-button
        //-        img(v-bind:src="registerButtonImg",@touchend="status = 'register'")
        tip-modal
        div.split-11
        div.forget 忘记密码？
    template(v-if="status === 'register'")
        validator(name="validationRegister")
            div.split-3
            div.tip 用户名/手机号&nbsp;
                span.require {{$validationRegister.username.required?'不能为空':''}}
                span.require {{$validationRegister.username.minlength?'不能少于8个字符':''}}
                span.require {{$validationRegister.username.maxlength?'大于16个字符':''}}
                span.require {{$validationRegister.username.pattern?'只接受字符和数字':''}}
            div.username.input-box.register
                div.input
                    input(v-model="userInfo.username",@keyup="checkusername | debounce 500",v-validate:username="{ required: true, minlength: 8, maxlength:16,pattern:'/[a-zA-Z][0-9]+/' }")
                    span.require *
            div.tip 密码&nbsp;
                span.require {{$validationRegister.password.required?'不能为空':''}}
                span.require {{$validationRegister.password.minlength?'不能少于8个字符':''}}
                span.require {{$validationRegister.password.maxlength?'大于16个字符':''}}
            div.password.input-box.register
                div.input
                    input(v-model="userInfo.password",type="password",v-validate:password="{ required: true, minlength: 8, maxlength:16 }")
                    span.require *
            div.tip 密码确认 &nbsp;
                span.require {{$validationRegister.confirm.required?'不能为空':''}}
                span.require {{$validationRegister.confirm.minlength?'不能少于8个字符':''}}
                span.require {{$validationRegister.confirm.maxlength?'大于16个字符':''}}
                span.require {{userInfo.password===userInfo.confirm?'':'密码不一致'}}
            div.password.input-box.register
                div.input
                    input(v-model="userInfo.confirm",type="password",v-validate:confirm="{ required: true, minlength: 8, maxlength:16 }")
                    span.require *
            div.tip.register
                div.tel.tip 手机号码&nbsp;
                    span.require {{$validationRegister.tel.tel?'手机格式错误':''}}
                div.checknum.tip 验证码
            div.tel.input-box.register
                div.input
                    input(style="width:45%;padding:0 5%;",v-model="userInfo.tel",v-validate:tel="['tel']")
                    span.require *
                    input(style="width:15%;padding:0 2.5%;margin:0 0 0 2%;",v-model="userInfo.checknum",disabled)
                    span.require *
            div.split-4
            div.get-check-btn
                img(v-bind:src="getCheckBtnImg")
            div.split-5
            div.button
                div.register-button
                    img(v-if="$validationRegister.valid",v-bind:class,v-bind:src="registerButtonImg",@touchend="registerUser")
            tip-modal
</template>
<script>
    import RequestList from './login-request'
    import TipModal from './../components/tip-modal.vue'
    export default {
        props: [],
        ready() {
            document.ontouchmove = e => e.preventDefault()
        },
        data() {
            return {
                userInfo: {
                    username: '',
                    password: '',
                    confirm: '',
                    tel: '',
                    checknum: ''
                },
                checkusernameflag: false,
                checktelflag: false,
                status: 'login',
                getCheckBtnImg: require('../assets/切图/登录界面/验证码.png'),
                backgroundImg: require('../assets/切图/登录界面/bg.png'),
                loginButtonImg: require('../assets/切图/登录界面/登录.png'),
                registerButtonImg: require('../assets/切图/登录界面/注册.png')
            }
        },
        methods: {
            login() {
                let _this = this
                RequestList.login(this.userInfo).then(res =>
                    res.data === 'ok' ? window.location.href = window.location.href.replace(/userlogin/, 'gamehall') : _this.$broadcast('showTip', res.data)
                )
            },
            registerUser() {
                RequestList.register(this.userInfo).then(res => res.data ? window.location.href = window.location.href.replace(/userlogin/, 'index') : this.$broadcast('showTip', '注册失败'))
            },
            checkusername() {
                RequestList.checkusername(this.userInfo.username).then(res => this.checkusername = res.data)
            },
            checktelflag() {
                RequestList.checktelflag(this.userInfo.tel).then(res => this.checktelflag = res.data)
            }
        },
        computed: {
            statusText() {
                switch (this.status) {
                    case 'login':
                        return '登录'
                    case 'register':
                        return '注册'
                }
            }
        },
        components: {
            'tip-modal': TipModal
        }
    }
</script>
<style>
    body,
    html {
        height: 100%;
        overflow: hidden;
    }
    
    body {
        margin: 0px;
    }
    
    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    
    .bg-img {
        width: 100%;
        height: 100%;
    }
    
    div.login-button {
        width: 50% !important;
        height: 80%;
        margin: 0 25%;
    }
    
    div.register-button {
        width: 50% !important;
        height: 80%;
        margin: 0 25%;
    }
    
    div.sub-title>div,
    div.button>div,
    div.title>div {
        width: 100%;
        position: absolute;
        bottom: 0;
        text-align: center;
    }
    
    div.input {
        height: 50%;
    }
    
    div.input>input {
        width: 70%;
        padding: 0 5%;
        height: 100%;
        border-radius: 5px;
        border-style: hidden;
    }
    
    div.tip {
        width: 80%;
        margin: 1% 10%;
        font-size: 15px;
        color: #fff;
        text-align: left;
    }
    
    div.title {
        height: 20%;
        position: relative;
        color: #ffffff;
        font-size: 32px;
    }
    
    div.input-box {
        height: 10%;
    }
    
    div.sub-title {
        height: 8%;
        color: #d85b5b;
        font-size: 16px;
    }
    
    div.button {
        height: 9%;
    }
    
    div.button img {
        width: 100%;
        height: 100%;
    }
    
    div.split-1 {
        height: 5%;
    }
    
    div.split-2 {
        height: 6%;
    }
    
    div.split-4 {
        height: 1%;
    }
    
    div.split-5 {
        height: 1%;
    }
    
    div.split-11 {
        height: 10%;
    }
    
    .input-box.register {
        height: 8%;
    }
    
    .input-box.register>div.input {
        height: 80%;
    }
    
    input {
        font-size: 15px;
    }
    
    .tip.register {
        text-align: left;
    }
    
    div.tel.tip {
        width: 75%;
        margin: 0;
        float: left;
    }
    
    div.checknum.tip {
        float: left;
        width: 25%;
        margin: 0;
    }
    
    span.require {
        margin-left: 5px;
        color: red;
    }
    
    div.get-check-btn {
        height: 6%;
        width: 80%;
        margin: 2% 8%;
        text-align: left;
    }
    
    div.get-check-btn>img {
        width: 25%;
        height: 100%;
    }
    
    div.forget {
        color: white;
    }
    
    .disabled {
        opacity: .5;
    }
    
    div {
        text-align: center;
        position: relative;
    }
</style>