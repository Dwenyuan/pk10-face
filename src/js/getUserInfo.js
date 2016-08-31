module.exports.getCode = function(){ // 获取用户code值
	var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}