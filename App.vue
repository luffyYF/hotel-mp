<script>
	export default {
		data() {
			return {
				globalData: {
					today: '',
					checkIn: '',
					checkOut: '',
					userInfo: ''
				}
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			let _this = this;
			// 登录
			wx.login({
				success: function(res) {
					console.log(res)
					// _this.getAuthorize()
					_this.getUserInfo()
				}
			})

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 获取个人信息
			getUserInfo() {
				let _this = this;
				wx.getUserInfo({
					success: function(res) {
						_this.globalData.userInfo = res.userInfo;
						console.log(_this.globalData.userInfo)
					},
					fail: function(res) {
						// 未授权获取用户失败
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style>

</style>
