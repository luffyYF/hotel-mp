<template>
	<view class="costPage">
		<view class="costContent">
			<view class="allPrice" @tap="showPrice()">
				<h3>总房费:</h3>
				<p>
					{{ details.oldTotalPrice }}元
					<image :src="isShow ? '../../static/images/room/up.png' : '../../static/images/room/down.png'" mode=""></image>
				</p>
			</view>
			<scroll-view scroll-y class="timeList" v-if="isShow">
				<view class="time" v-for="(item, index) in details.oldDailyPrice" :key="index">
					<span>{{ item.date }}</span>
					<span>{{ '￥' + item.price }}</span>
				</view>
			</scroll-view>
			<view class="detail">
				<view v-if="details.couponPrice == 0 ? false : true">
					<h3>优惠劵:</h3>
					<p>{{ details.couponPrice }}元</p>
				</view>
				<view>
					<h3>会员折扣:</h3>
					<p>{{ details.discount }}折</p>
				</view>
				<!-- <view>
					<h3>押金:</h3>
					<p>无</p>
				</view> -->
				<view>
					<h3>实际支付:</h3>
					<p>{{ details.totalPrice }}元</p>
				</view>
			</view>
		</view>
		<view style="display: flex;color: #898989;padding: 18.11594upx;margin: 28.9855upx;">
			<h3 style="font-size: 25.36231upx">注明:</h3>
			<h3 style="font-size: 25.36231upx">总房费 x 会员折扣 - 优惠卷 = 实际支付</h3>
		</view>
		<view class="bottomBtn" v-if="details.orderStatus == 0 ? true : false" @tap="AkeyPayment()"><button class="active" @click="">立即付款</button></view>
	</view>
</template>

<script>
import wxUser from '@/services/wxUser.js';
import api from '@/utils/api.js';
import allocation from '@/utils/config.js';
export default {
	data() {
		return {
			details: {},
			isShow: false
		};
	},
	onLoad(opt) {
		/* 	console.log(opt.details) */
		this.details = JSON.parse(opt.details);
	},
	methods: {
		//查看每日房价
		showPrice() {
			this.isShow = !this.isShow;
		},
		//一键付款
		AkeyPayment() {
			let that = this;

			wxUser.getUserInfo().then(res => {
				that.details.orderInfo.openId = res.openId;
				api.payment({
					appid: allocation.APPID,
					openid: that.details.orderInfo.openId,
					orderPk: that.details.orderInfo.orderPk,
					payType: 'WX_APPLET'
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
								uni.reLaunch({
									url: '../payment/payFinish?orderPk=' + that.details.orderInfo.orderPk + '&userPk=' + that.details.orderInfo.userPk
								});
							},
							fail: function(res) {},
							complete: function(res) {}
						});
					}
				});
			});
		}
	}
};
</script>

<style lang="scss">
.costPage {
	background-color: #f5f9fc !important;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	position: absolute;
	display: block;
	.bottomBtn {
		width: 100%;
		text-align: right;
		position: fixed;
		bottom: 0;
		margin: 0;
		padding: 20upx 0;
		background-color: white;
		border-top: 1px solid #f1f1f1;
	}
	.bottomBtn > button {
		display: inline-block;
		float: right;
		height: 56upx;
		font-size: 28upx;
		line-height: 56upx;
		margin-right: 20upx;
		color: #cda754;
		background: white;
	}
	.bottomBtn > .active {
		background-color: #cda754;
		color: white;
	}
}
.costContent {
	background-color: white;
	border-radius: 9.05797upx;
	margin: 28.9855upx;
	.allPrice,
	.time,
	.detail {
		display: flex;
		align-items: center;
		vertical-align: middle;
		justify-content: center;
	}
	.allPrice {
		padding: 18.11594upx;
		image {
			width: 36.23188upx;
			height: 36.23188upx;
		}
		h3 {
			flex: 1;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-weight: 500;
			padding: 18.11594upx;
		}
		p {
			color: #cda754;
			font-weight: 600;
			font-size: 32.60869upx;
			padding: 18.11594rpx 0;
			display: flex;
			align-items: center;
			vertical-align: middle;
			justify-content: center;
		}
	}
	.timeList {
		height: 543.47826upx;
		.time {
			padding: 18.11594upx;
			border-bottom: 1px solid #f6f7f9;
			span {
				overflow: inherit;
				font-size: 14px;
				line-height: normal;
				font-weight: 600;
				text-overflow: inherit;
				color: #8e9093;
				margin-right: 18.11594upx;
			}
		}
	}

	.detail {
		display: block;
		view {
			display: flex;
			padding: 18.11594upx;
			h3 {
				flex: 1;
				font-weight: 500;
			}
			p {
				flex: 1;
				justify-content: flex-end;
				color: #cda754;
				font-weight: 600;
				font-size: 32.60869upx;
			}
		}
	}
}
</style>
