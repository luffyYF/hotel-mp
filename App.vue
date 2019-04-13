<script>
	import api from './utils/api.js'
	export default {
		data() {
			return {
				globalData: {
					appid: 'wx8da6ebf3721af9a4',
					code: '',
					userInfo: null,
					today: '',
					checkIn: '',
					checkOut: ''
				}
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			let _this = this;
			// 登录ode
			wx.login({
				success: function(res) {
					// console.log(res)
					if(res.errMsg == 'login:ok'){
						_this.globalData.code = res.code;
					}
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {}
	}
</script>

<style>

</style>
