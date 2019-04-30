<script>
import api from '@/utils/api';
import util from '@/utils/util';
export default {
	data() {
		return {
			globalData: {
				code: '',
				userInfo: null,
				today: '',
				checkIn: '',
				checkOut: ''
			}
		};
	},
	onLaunch: function() {
		console.log('App Launch');

		let _now_day = new Date();
		_now_day.setHours(0);
		_now_day.setMinutes(0);
		_now_day.setSeconds(0);
		_now_day.setMilliseconds(0);

		this.globalData.today = Date.parse(_now_day);
		// 入住及离店
		let _checkOut = new Date();
		_checkOut.setHours(0);
		_checkOut.setMinutes(0);
		_checkOut.setSeconds(0);
		_checkOut.setMilliseconds(0);
		_checkOut.setDate(_checkOut.getDate() + 1);

		this.globalData.checkIn = util.dateFilter.formatDate(Date.parse(_now_day));
		this.globalData.checkOut = util.dateFilter.formatDate(Date.parse(_checkOut));

		let _this = this;
		// 登录ode
		wx.login({
			success: function(res) {
				// console.log(res)
				if (res.errMsg == 'login:ok') {
					_this.globalData.code = res.code;
				}
			}
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {}
};
</script>

<style>
@import url('./common/uni.css');
</style>
