import config from '@/utils/config.js'

const request = {
	get: function(url, param, baseURL = config.APIROOTURL) {
		let token = "bearer " + wx.getStorageSync('token');
		let that = this;
		return new Promise(function(resolve, reject) {
			that.request(url, param, {
				baseURL: baseURL,
				token: token,
				method: 'GET'
			}, resolve, reject)
		})
	},
	post: function(url, param, baseURL = config.APIROOTURL) {
		let token = "bearer " + wx.getStorageSync('token');
		let that = this;
		return new Promise(function(resolve, reject) {
			that.request(url, param, {
				baseURL: baseURL,
				token: token,
				method: 'POST'
			}, resolve, reject)
		})
	},
	request: function(url, data = {}, option = {
		baseURL: '',
		token: '',
		method: 'GET'
	}, resolve, reject) {
		let baseURL = "";
		if (option.baseURL) {
			baseURL = option.baseURL + url;
		} else {
			baseURL = url;
		}
		let token = "";
		if (option.token) {
			token = option.token;
			console.log(token);
		}
		uni.request({
			url: option.baseURL + url,
			data: data,
			method: option.method,
			header: {
				'Content-Type': 'application/json',
				'Authorization': token
			},
			success: function(res) {
				if (res.data.code === 1) {
					//数据获取成功
					resolve(res.data)
				} else if (res.data.code === 20001) {
					//授权失效
					uni.navigateTo({
						url: 'login'
					})
					// reject(res.errMsg, res.code);
				} else {
					reject(res.data.errMsg, res.data.code);
				}
			},
			fail: function(err) {
				reject(err)
			}
		})
	}
}
export default request
