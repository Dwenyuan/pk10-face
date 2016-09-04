import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);
// 获取开奖记录
module.exports.getBonusRecord = () => Vue.http.get('getBonusRecord');
// 获取主配置信息
module.exports.getMainConfig = () => Vue.http.get('getMainConfig', { params: { url: window.location.href.split('#')[0] } });
//每次开奖都重新获取 倒计时
module.exports.getCount = () => Vue.http.get('getCount');
// 获取开奖结果
module.exports.getBonusNum = (params) => Vue.http.get('getBonusNum', params);
// 获取开奖记录
module.exports.getAllBonusNums = (params) => Vue.http.get('getBonusRecord', params);
// 买定离手
module.exports.createUserBets = (params) => Vue.http.post('createUserBets', params);
// 获取最近下注
module.exports.getRecentlyBets = (params) => Vue.http.get('getRecentlyBets', params);

module.exports.getuserCodeFromNet = (code) => Vue.http.get('getUserCode', { params: { code: code } });
// 获取用户信息
module.exports.getuserinfo = (userinfo) => Vue.http.post('getuserinfo', userinfo);
// 获取所有用户
module.exports.getAllUserInfo = () => Vue.http.get('getUserInfoList');
// 获取公告信息
module.exports.getLastNotice = () => Vue.http.get('getLastNotice');
// 请求兑奖
module.exports.cashPrize = (userinfo) => Vue.http.post('cashPrize', userinfo);
// 获取微信用户code 用来后台获取用户openid
module.exports.getCode = function() { // 获取用户code值
        var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    /****后台管理用***/
module.exports.updateuserinfo = (params) => Vue.http.post('updateuserinfo', params);

// 获取所有系统设置信息
module.exports.getAllSystemSetting = () => Vue.http.get('getAllGameInitDate');
// 更新系统设置信息
module.exports.updateSystemSetting = (params) => Vue.http.post('updateSystemSetting', params);
//获取所有代理商
module.exports.getAllAgent = (params) => Vue.http.post('getAllAgent', params);

module.exports.getUserForAgent = (params) => Vue.http.post('getUserForAgent', params);
// 根据游戏名获取游戏配置
module.exports.getGameInitDate = (params) => Vue.http.post('getGameInitDate', params);
// 更新游戏设置
module.exports.updateGameInitDate = (params) => Vue.http.post('updateGameInitDate', params);