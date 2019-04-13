const request = {
	get: function(url, param, option) {
		return new Promise((resolve, reject) => {
			let baseURL = "";
			if (option.baseURL) {
				baseURL = option.baseURL + url;
			} else {
				baseURL = url;
			}
			uni.request({
				url: baseURL,
				data: param,
				header: {
					'X-Xbyjshop-Token': wx.getStorageSync('token')
				},
				method: "GET",
				success: function(res) {
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				}
			});
		})
	},
	post: function(url, param, option) {
		return new Promise((resolve, reject) => {
			let baseURL = "";
			if (option.baseURL) {
				baseURL = option.baseURL + url;
			} else {
				baseURL = url;
			}
			uni.request({
				url: baseURL,
				data: param,
				header: {
					'X-Xbyjshop-Token': wx.getStorageSync('token')
				},
				method: "POST",
				success: function(res) {
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				}
			});
		})
	}
}
export default request
