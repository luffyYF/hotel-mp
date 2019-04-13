import request from './request'

const ApiRootUrl = 'http://192.168.5.11/'

const ApiWxUrl = ApiRootUrl+'wx/'


const api = {
  authorize: (data) => request.post('applet/authorize', {
		appid:data.appid,
		code:data.code,
		encryptedData:data.encryptedData,
		iv:data.encryptedData
	}, {
    baseURL: ApiWxUrl
  })
}

export default api
