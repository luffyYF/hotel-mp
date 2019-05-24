<template>
	<view class="PayPage">
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="支付订单"></uni-nav-bar>
		<view class="reminder">
			<view class="re-icon"><image src="../../static/images/order/icon/gouxuan.png" mode=""></image></view>
			<view class="re-desc">
				<h2>提交订单完成</h2>
				<h2 v-if="!payOvertime">
					支付剩余时间：
					<span style="font-weight: bold;">{{ showTime }}</span>
				</h2>
				<h2 v-if="payOvertime">支付已超时</h2>
				<h2 style="font-size: 21.73913upx;">请及时付款，超时订单将自动取消!</h2>
			</view>
		</view>
		<view class="sel-title"><p>选择支付方式</p></view>
		<view class="select-mode" @tap="selPay('WX_APPLET')">
			<image src="../../static/images/room/wx.jpg" mode=""></image>
			<p style="flex: 1;">微信支付</p>
			<span>
				￥{{ orderInfo.totalPrice }}
				<span style="font-size: 18.11594upx;text-decoration: line-through;color: #ccc;margin: 0 18.11594upx;">￥{{ orderInfo.oldTotalPrice }}</span>
			</span>
			<label style="padding-right: 0;">
				<view><radio value="" :checked="payWay == 'WX_APPLET' ? true : false" /></view>
			</label>
		</view>
		<view class="payBtn"><button @tap="pay" type="primary">立即支付</button></view>
	</view>
</template>

<script>
import api from '@/utils/api.js';
import allocation from '@/utils/config.js';
import user from '@/services/user.js';
import wxUser from '@/services/wxUser.js';
export default {
	data() {
		return {
			orderInfo: {},
			//支付方式
			payWay: '',
			//显示时间
			showTime: '',
			//定时器id
			timerId: '',
			//分钟
			minutes: '',
			//秒
			seconds: '',
			//剩余时长
			remainTime: '',
			//是否支付超时
			payOvertime: false
		};
	},
	onLoad(opt) {
		var that = this;
		console.log(JSON.parse(opt.obj));
		this.orderInfo = JSON.parse(opt.obj);
		wxUser.getUserInfo().then(res => {
			console.log(res);
			that.orderInfo.openId = res.openId;
		});
		that.remainTime = that.orderInfo.paymentBufferTime * 60;
		that.resetTime();
	},
	onUnload() {
		clearInterval(this.timerId);
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		//时间倒计时
		resetTime() {
			let that = this;

			that.timerId = setInterval(() => {
				that.CountDown();
			}, 1000);
		},
		//循环执行
		CountDown() {
			let that = this;
			if (that.remainTime >= 0) {
				that.minutes = Math.floor(that.remainTime / 60); //算出有几分钟
				that.seconds = Math.floor(that.remainTime % 60); //算出有几秒钟
				that.showTime = that.minutes + '分' + that.seconds + '秒';
				that.remainTime--;
				console.log(that.showTime);
			} else {
				clearInterval(that.timerId);
				that.payOvertime = !that.payOvertime;
			}
		},
		//选择支付方式
		selPay(payWay) {
			this.payWay = payWay;
		},
		//提交支付
		pay() {
			var that = this;
			if (that.payOvertime) {
				uni.showToast({
					icon: 'none',
					title: '支付失败，订单已超时'
				});
			} else {
				if (that.payWay != '' && that.payWay != null) {
					console.log(that.payWay + '支付');
					api.payment({
						appid: allocation.APPID,
						openid: that.orderInfo.openId,
						orderPk: that.orderInfo.orderPk,
						payType: that.payWay
					}).then(res => {
						if (res.code == 1) {
							console.log(res);
							wx.requestPayment({
								appId: res.data.appId,
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package: res.data.package,
								signType: res.data.signType,
								paySign: res.data.paySign,
								success: function(res) {
									//支付成功执行回调
									uni.navigateTo({
										url: 'payFinish?orderPk=' + that.orderInfo.orderPk + '&userPk=' + that.orderInfo.userPk
									});
								},
								fail: function(res) {},
								complete: function(res) {}
							});
						}
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '请选择支付方式'
					});
				}
			}
		}
	}
};
</script>

<style lang="scss">
.PayPage {
	background-color: #f5f9fc;
	.reminder {
		background-color: white;
		border-bottom: 1px solid #eee;
		padding: 36.23188upx 0;
		.re-icon {
			text-align: center;
			padding: 18.11594upx 0;
			image {
				width: 126.81159upx;
				height: 126.81159upx;
			}
		}
		.re-desc {
			text-align: center;
			h2 {
				padding: 9.05797upx 0;
			}
		}
	}

	.sel-title {
		padding: 9.05797upx 28.9855upx;
		p {
			font-size: 27.17391upx;
			color: #666666;
			margin: 19.92753upx 0;
		}
	}
	.select-mode {
		background-color: white;
		padding: 27.17391upx;
		display: flex;
		vertical-align: middle;
		align-items: center;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		image {
			width: 72.46376upx;
			height: 72.46376upx;
		}
		p {
			font-size: 25.36231upx;
			margin-left: 18.11594upx;
		}
	}
	.payBtn {
		text-align: center;
		position: fixed;
		overflow: hidden;
		bottom: 90.57971upx;
		width: 100%;
		button {
			width: 90%;
		}
	}
}
</style>
