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



const wxUser = {
	getUserInfo,
	setUserInfo
}

export default wxUser
