<template lang="pug">
        background
        menu-bar(v-bind:game-data="gameData",v-bind:notice="notice",v-bind:zoom-rate="zoomRate")
        bet-and-bonus(v-bind:zoom-rate="zoomRate",v-bind:userinfo.sync="userinfo",v-bind:user-bet="userBet",v-bind:bets.sync="bets",v-bind:lockmoney="lockmoney",v-bind:error.sync="error",v-bind:lotterynum.sync="lotterynum",v-bind:count-down.sync="countDown",v-bind:count-num.sync="countNum")
        play-panel(v-bind:zoom-rate="zoomRate",v-bind:userinfo="userinfo",v-bind:user-bet="userBet",v-bind:bets.sync="bets",v-bind:lockmoney="lockmoney",v-bind:error.sync="error",v-bind:chip-img.sync="chipImg",v-bind:lotterynum.sync="lotterynum",v-bind:count-down.sync="countDown",v-bind:count-num.sync="countNum")
        state(v-bind:zoom-rate="zoomRate",v-bind:userinfo="userinfo",v-bind:user-bet="userBet",v-bind:bets.sync="bets",v-bind:lockmoney="lockmoney",v-bind:chip-img.sync="chipImg",v-bind:count-down.sync="countDown",v-bind:error.sync="error")
        //- bet-multiple
        message(v-bind:zoom-rate="zoomRate",v-bind:userinfo="userinfo",v-bind:bets.sync="bets",v-bind:error.sync="error",v-bind:bonus-record.sync="bonusRecord")
        modal.modal(v-if="error")
        tip-modal
</template>
<script>
    import Background from './components/Background.vue'
    import MenuBar from './components/MenuBar.vue'
    import BetAndBonus from './components/BetAndBonus.vue'
    import PlayPanel from './components/PlayPanel.vue'
    import State from './components/State.vue'
    import BetMultiple from './components/BetMultiple.vue'
    import Message from './components/Message.vue'
    import gameData from './data/data' //  加载模板数据
    // import wx from 'weixin-js-sdk'
    import RequestList from './js/request-list'
    export default {
        props: [],
        ready() {
            // document.body.ontouchmove = e => e.preventDefault() //禁止用户移动网页
            RequestList.heart('checktoken').then(res=>res.data === 'checktoken' ? console.log('connected') : window.location.href='userlogin.html')
            let that = this
            window.onresize = function() {
                that.screenSize.width = window.innerWidth
                that.screenSize.height = window.innerHeight
            }
            this.init()
            RequestList.getlastBets().then(res => {
                    res.data.map(value => {
                        switch (value.betmoney) {
                            case 100:
                                value.betimg = require('./assets/切图/主界面/铁-筹码.png')
                                break;
                            case 1000:
                                value.betimg = require('./assets/切图/主界面/铜-筹码.png')
                                break;
                            case 10000:
                                value.betimg = require('./assets/切图/主界面/银-筹码.png')
                                break;
                            case 100000:
                                value.betimg = require('./assets/切图/主界面/金-筹码.png')
                                break;
                            default:
                                value.betimg = require('./assets/切图/主界面/银-筹码.png')
                                break;
                        }
                    })
                    this.bets = res.data
                })
                // 获取最近一期下注 并且未兑奖的记录 
                // this.getUserInfoByNet()
                // 初始化读取数据 在此版本中从session 中读取用户信息
            this.$emit('getUserInfo')
            this.heart()
        },
        data() {
            return {
                userBet: {
                    userid: null,
                    betnum: null,
                    betmoney: 1000 //默认下注金额为1000
                },
                chipImg: require('./assets/切图/主界面/铜-筹码.png'),
                lastbets: [], // 上次投注结果
                isinit: true,
                gameData: gameData,
                lotterynum: { //开奖结果
                    id: '',
                    createdAt: 0,
                    lotterynums: ''
                },
                bonusRecord:[],//开奖记录
                // wx: wx,
                countDown: 59, // 倒计时秒数
                countNum: 300, //开奖时间间隔 默认3分钟
                error: false,
                bets: [], // 下注集合，可以单次下多注
                notice: require('./data/notice'),
                userinfo: require('./data/singleuser'),
                stageSize: { // 整体画布大小,所有变化组件再次基础上乘以放大倍率
                    width: 640,
                    height: 1008
                },
                screenSize: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            }
        },
        methods: {
            init() {
                // 读取开奖数据
                RequestList.getBonusNum().then(res => this.lotterynum = res.data)
                    // 读取开奖记录
                this.$broadcast('getBonusRecord')
                    // 获取最近下注记录
                this.$broadcast('getRecentlyBets')
                // this.isinit ? this.getUserInfoByNet() : this.$emit('getUserInfo')
                // this.isinit = false
                // 获取公告数据
                this.$emit('getLastNotice')
            },
            show() {},
            heart() { // 心跳测试
                RequestList.heart('checktoken').then(res => {
                    res.data === 'checktoken' ? console.log('connected') : this.$dispatch('showTip', '断开连接')
                    setTimeout(() => this.heart(), 10000)
                }, res => this.$dispatch('showTip', '断开连接'))
            },
            initwx() {
                RequestList.getMainConfig().then((res) => { //从后台获取配置文件
                    this.wx.config({
                        debug: true,
                        appId: res.data.appId,
                        timestamp: res.data.timestamp,
                        nonceStr: res.data.nonceStr,
                        signature: res.data.signature,
                        jsApiList: [
                            // 所有要调用的 API 都要加到这个列表中
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'chooseImage'
                        ]
                    })
                    this.wx.ready(() => {
                        wx.checkJsApi({
                            jsApiList: ['chooseImage'],
                            success(res) {
                                console.log(res)
                            }
                        })
                    })
                }, (res) => {
                    console.error(res)
                })
            },
            getUserInfoByNet() { //从网络获取user信息
                var that = this
                RequestList.getuserCodeFromNet(RequestList.getCode()).then(res => {
                    // 获取用户数据
                    that.userinfo = Object.assign({}, that.userinfo, res.data)
                    that.$emit('getUserInfo')
                }, res => {
                    console.error(res.data)
                })
            }
        },
        computed: {
            zoomRate() { // 初始化放大倍率
                let x = this.screenSize.width / this.stageSize.width
                let y = this.screenSize.height / this.stageSize.height
                return {
                    x: x,
                    y: y
                }
            },
            lockmoney() { //锁定金额
                let result = 0
                for (let i = 0; i < this.bets.length; i++) {
                    result += this.bets[i].betmoney
                }
                return result
            }
        },
        events: {
            showMessage(event) {
                this.$broadcast('showMessage', event)
            },
            getUserInfo(event) {
                var that = this
                RequestList.getuserinfo(JSON.parse(JSON.stringify(this.userinfo))).then((res) => {
                    if (Object.prototype.toString.call(res.data) === '[object Object]') {
                        // that.userinfo = Object.assign({}, that.userinfo, res.data)
                        console.log('get user info sucess!')
                        that.userinfo = res.data
                            // that.userinfo.openid = res.data.openid
                            // that.userinfo.nickname = res.data.nickname
                            // that.userinfo.money = res.data.money
                        that.userBet.userid = res.data.id
                    } else {}
                    return
                }, (res) => {
                    console.error(res)
                })
            },
            getLastNotice(event) {
                RequestList.getLastNotice().then(res => this.notice = res.data, res => console.error(res))
            },
            cancelbet(event) {
                this.$broadcast('cancelBet')
            },
            reloadinfo(event) {
                this.init()
            },
            getBonusRecord() {

            },
            // 触发错误，并打开遮罩层
            error() {
                this.error = true
            },
            showTip(event) {
                this.$broadcast('showTip', event)
            }
        },
        components: {
            'modal': {
                template: '<div class="modal"></div>'
            },
            'tip-modal': require('./components/tip-modal.vue'),
            'background': Background,
            'menu-bar': MenuBar,
            'bet-and-bonus': BetAndBonus,
            'play-panel': PlayPanel,
            'state': State,
            'bet-multiple': BetMultiple,
            'message': Message
        }
    }
</script>
<style>
    body {
        margin: 0;
    }
    
    html,
    body {
        height: 100%;
    }
    
    .table {
        display: table;
    }
    
    div.modal {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, .6);
        top: 0px;
        left: 0;
        z-index: 999;
    }
    
    .table-cell {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
</style>