import Vue from 'vue'
import App from './App'
import wx from 'weixin-js-sdk'
import VueResource from 'vue-resource'
import RequestList from './js/request-list'
Vue.use(VueResource)
Vue.filter('time', function (value) {
    let hour = Math.floor(value / 3600)
    let min = Math.floor((value % 3600) / 60)
    if (hour < 10) {
        hour = '0' + hour
    }
    if (min < 10) {
        min = '0' + min
    }
    let sec = value % 60
    if (sec < 10) {
        sec = '0' + sec
    }
    return (hour > 0 ? hour + ':' : '') + min + ':' + sec
})
Vue.filter('datetime', value => {
    let date = new Date(value)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
    // return new Date(value).toLocaleString()
})
Vue.filter('covert', value => {
    switch (value) {
        case 'single':
            return '单'
        case 'double':
            return '双'
        case 'big':
            return '大'
        case 'small':
            return '小'
        default:
            return value
    }
})
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxffe190dec3271a1c&redirect_uri=http://lsweixintest.applinzi.com/php/urlopenid.php&response_type=code&scope=snsapi_userinfo&state=123
var main = new Vue({
    el: 'body',
    components: { app: App }
})
