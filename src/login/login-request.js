import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 用户登录
module.exports.login = (params) => Vue.http.post('login', params)
// 用户注册
module.exports.register = (params) => Vue.http.post('register', params)
// 检查电话占用
module.exports.checkTel = (params) => Vue.http.get('checkTel', params)
// 检查用户名占用
module.exports.checkusername = (params) => Vue.http.get('checkusername', params)

