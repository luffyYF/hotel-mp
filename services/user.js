/**
 * 用户相关服务
 */
import api from '@/utils/api';
import util from '@/utils/util';
import gwx from '@/utils/wx';
let userKey = 'userInfo'
let tokenKey = 'token'

function getUserInfo() {
	return getStorage(userKey)
}

function setUserInfo(userInfo) {
	return setStorage(userKey, userInfo)
}

function getToken() {
	return getStorage(tokenKey)
}

function setToken(token) {
	return setStorage(tokenKey, token)
}

function getStorage(Key){
	return new Promise((resolve, reject) => {
		util.getStorage(Key, (res) => {
			resolve(res)
		}, () => {
			reject(null)
		})
	})
}

function setStorage(Key, token){
	return new Promise((resolve, reject) => {
		util.setStorage(Key, token)
	})
}

/**
 * 验证是否登录
 */
function isUserinfo() {
	return new Promise((resolve, reject) => {
		util.getStorage(userKey, (res) => {
			resolve(true)
		}, () => {
			reject(false)
		})
	})
}

function authorizePhone(data) {
	console.log(data)
	return new Promise((resolve, reject) => {
		gwx.authorizePhone(data).then((res) => {
			if (res.code == 1) {
				api.bindPhone({
					memPhone: res.data
				}).then(res => {
					if(res.code == 1){
							setUserInfo(res.data)
							setToken(res.data.token)
							resolve(res)
					}else{
						reject(res)
					}
				})
			}else{
				reject(res)
			}
		})
	})
}


const user = {
	getUserInfo,
	setUserInfo,
	authorizePhone,
	isUserinfo
}

export default user
