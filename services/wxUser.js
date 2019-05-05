/**
 * 用户相关服务
 */
import util from '@/utils/util';
import gwx from '@/utils/wx';

function getUserInfo() {
	return getStorage(gwx.wxUserKey)
}

function setUserInfo(userInfo) {
	return setStorage(gwx.wxUserKey, userInfo)
}

function getStorage(Key) {
	return new Promise((resolve, reject) => {
		util.getStorage(Key, (res) => {
			resolve(res)
		}, () => {
			reject(null)
		})
	})
}

function setStorage(Key, token) {
	return new Promise((resolve, reject) => {
		util.setStorage(Key, token)
	})
}

const wxUser = {
	getUserInfo,
	setUserInfo
}

export default wxUser
