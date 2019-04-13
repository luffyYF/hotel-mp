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

function setStorage(key, data) {
	var timestamp = Date.parse(new Date());
	var expiration = timestamp + 60 * 60 * 1000;
	wx.setStorageSync(key, data);
	wx.setStorageSync(key + "_expiration", expiration);
}

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

const util = {
	checkSession,
	login,
	getStorage,
	setStorage
}

export default util
