import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 获取开奖记录
module.exports.getBonusRecord = () => Vue.http.get('getBonusRecord')
// 获取主配置信息
module.exports.getMainConfig = () => Vue.http.get('getMainConfig', { params: { url: window.location.href.split('#')[0] } })
//每次开奖都重新获取 倒计时
module.exports.getCount = () => Vue.http.get('getCount')
// 获取开奖结果
module.exports.getBonusNum = (params) => Vue.http.get('getBonusNum', params)
// 买定离手
module.exports.createUserBets = (params) => Vue.http.post('createUserBets', params)

module.exports.getRecentlyBets = (params) => Vue.http.get('getRecentlyBets', params)

module.exports.getuserCodeFromNet = (code) => Vue.http.get('getUserCode', { params: { code: code } })
// 获取用户信息
module.exports.getuserinfo = (userinfo) => Vue.http.post('getuserinfo', userinfo)
// 获取所有用户
module.exports.getAllUserInfo = () => Vue.http.get('getUserInfoList')
// 获取公告信息
module.exports.getLastNotice = () => Vue.http.get('getLastNotice')
// 请求兑奖
module.exports.cashPrize = (userinfo) => Vue.http.post('cashPrize', userinfo)
// 获取微信用户code 用来后台获取用户openid
module.exports.getCode = function () { // 获取用户code值
    var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
/****后台管理用***/
module.exports.updateuserinfo = (params) => Vue.http.post('updateuserinfo', params)
