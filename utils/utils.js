/**
 * 检查微信会话是否过期
 */
function checkSession() {
	return new Promise(function(resolve, reject) {
		wx.checkSession({
			success: function() {
				resolve(true);
			},
			fail: function() {
				reject(false);
			}
		})
	});
}
/**
 * 调用微信登录
 */
function login() {
	return new Promise(function(resolve, reject) {
		wx.login({
			success: function(res) {
				if (res.code) {
					// 登录远程服务器
					// console.log('微信登陆成功', res)
					resolve(res);
				} else {
					reject(res);
				}
			},
			fail: function(err) {
				reject(err);
			}
		});
	});
}

/**
 * 存储本地数据
 */
function setStorage(key, data) {
	var timestamp = Date.parse(new Date());
	var expiration = timestamp + 60 * 60 * 1000;
	wx.setStorageSync(key, data);
	wx.setStorageSync(key + "_expiration", expiration);
}

/**
 * 获取本地数据
 */
function getStorage(key, success, fail) {
	var timestamp = Date.parse(new Date());
	var expiration = wx.getStorageSync(key + "_expiration");
	var data = wx.getStorageSync(key);
	if (data && expiration > timestamp) {
		success(data);
	} else {
		fail();
	}
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

const util = {
	checkSession,
	login,
	getStorage,
	setStorage,
	dateFilter
}

export default util
