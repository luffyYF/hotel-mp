function formatTime(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n;
}

/**
 * 日期格式
 */
var dateFilter = {
  getDateObject: function (str) {
    return new Date(str)
  },
  formatDate(date) {
    let _date = new Date(date);
    let _week = ['日', '一', '二', '三', '四', '五', '六']
    return {
      year: _date.getFullYear() || '',
      month: _date.getMonth() + 1 || '',
      day: _date.getDate() || '',
      week: _week[_date.getDay()] || '',
      timeStamp: date || ''
    }
  },
}

//判断是否是微信浏览器的函数
function isWeiXin() {
	//window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
	var ua = window.navigator.userAgent.toLowerCase();
	//通过正则表达式匹配ua中是否含有MicroMessenger字符串
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

function setStorage(key, data) {
	var timestamp = Date.parse(new Date());
	var expiration = timestamp + ((60 * 60 * 1000) * 24) * 30;
	uni.setStorageSync(key, data);
	uni.setStorageSync(key + "_expiration", expiration);
}

function getStorage(key, success, fail) {
	var timestamp = Date.parse(new Date());
	var expiration = uni.getStorageSync(key + "_expiration");
	var data = uni.getStorageSync(key);
	console.log(key, data)
	if (data && expiration > timestamp) {
		success(data);
	} else {
		fail(false);
	}
}

function removeStorage(key, success, fail) {
	uni.removeStorageSync(key + "_expiration");
	uni.removeStorageSync(key);
}

const util = {
	formatTime,
	getStorage,
	setStorage,
	removeStorage,
	dateFilter,
	isWeiXin
}

export default util
