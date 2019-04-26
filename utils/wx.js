/* eslint-disable */
/**
 * 封封微信
 */
import req from '@/utils/request';
import util from '@/utils/util';
import config from '@/utils/config';
import api from '@/utils/api'


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
					let code = res.code;
					util.getStorage("userInfo",(userInfo)=>{
						authorize(code,userInfo);
					},()=>{
						getUserInfo().then(res=>{
							authorize(code,res);
						});
					})
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

function authorize(code,userInfo){
	// 登录远程服务器
	api.authorize({
		appid:config.appid,
		code:code,
		encryptedData:userInfo.encryptedData,
		iv:userInfo.iv
	}).then(res=>{
		if (res.errno === 0) {
		  // 存储用户信息
		  util.setStorage('userInfo', res.data.userInfo)
		  util.setStorage('token', res.data.token)
		  resolve(res);
		} else {
		  reject(res);
		}				  
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


function showErrorToast(msg) {
	wx.showToast({
		title: msg,
		image: '/static/images/icon_error.png'
	})
}


const gwx = {
	showErrorToast,
	checkSession,
	login,
	getUserInfo
}

export default gwx
