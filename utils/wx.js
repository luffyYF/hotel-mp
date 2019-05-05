/* eslint-disable */
/**
 * 封封微信
 */
import req from '@/utils/request';
import util from '@/utils/util';
import config from '@/utils/config';
import api from '@/utils/api'

let wxUserKey = 'wxUserInfo'

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
function loginUserInfo() {
	return new Promise(function(resolve, reject) {
		wxlogin().then(code => {
			// 登录远程服务器
			getUserInfo().then(userInfo => {
				authorize(code, userInfo).then((rese) => {
					resolve(userInfo)
				}).catch((err) => {
					reject(err)
				})
			})
		}).catch((err) => {
			reject(err)
		})
	})
}

/**
 * 调用微信登录
 */
function wxlogin() {
	return new Promise(function(resolve, reject) {
		wx.login({
			success: function(res) {
				if (res.code) {
					resolve(res.code)
				} else {
					reject(res)
				}
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}

function authorize(code, userInfo) {
	return new Promise(function(resolve, reject) {
		// 登录远程服务器
		api.authorize({
			appid: config.APPID,
			code: code,
			encryptedData: userInfo.encryptedData,
			iv: userInfo.iv
		}).then(res => {
			if (res.code === 1) {
				// 存储用户信息
				userInfo['openId'] = res.data['openId']
				util.setStorage(wxUserKey, userInfo)
				util.setStorage('token', res.data['token'])
				resolve(res);
			} else {
				reject(res);
			}
		})
	})
}

/**
 * 调用微信获取用户信息接口，需要button授权
 */
function getUserInfo() {
	return new Promise(function(resolve, reject) {
		// 查看button是否授权
		wx.getSetting({
			success: function(res) {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					wx.getUserInfo({
						withCredentials: true,
						success: function(res) {
							// console.log('获取用户信息成功', res);
							resolve(res);
						},
						fail: function(err) {
							// console.log('获取用户信息失败', err);
							reject(err);
						}
					})
				} else { // 没有授权
					// console.log('但获取用户信息失败，未同意button授权');
				}
			}
		})
	});
}

function authorizePhone(data) {
	console.log(124325235)
	return new Promise(function(resolve, reject) {
		wxlogin().then((res) => {
			
			api.authorizePhone({
				appid: config.APPID,
				code: res,
				encryptedData: data.encryptedData,
				iv: data.iv
			}).then((res) => {
				if (res.code === 1) {
					resolve(res)
				} else {
					reject(res)
				}
			})

		})
	})

}



function showErrorToast(msg) {
	wx.showToast({
		title: msg,
		image: '/static/images/icon_error.png'
	})
}


const gwx = {
	showErrorToast,
	checkSession,
	authorize,
	authorizePhone,
	loginUserInfo,
	wxlogin,
	getUserInfo
}

export default gwx
