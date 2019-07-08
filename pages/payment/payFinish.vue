<template>
	<view class="finshPage">
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="支付完成"></uni-nav-bar>
		<view class="b-w">
			<view class="payPrice">
				<image :src="msg ? '../../static/images/order/icon/gouxuan.png' : '../../static/images/order/icon/shibai.png'" mode=""></image>
				<h2>{{ msg ? '支付成功' : '支付失败' }}</h2>
				<h4 v-show="msg">￥{{ orderInfo.totalPrice }}</h4>
			</view>
			<view class="payDetails">
				<view>
					<p>交易商品</p>
					<p>{{ orderInfo.companyName }}</p>
				</view>
				<view>
					<p>交易单号</p>
					<p>{{ orderInfo.orderNo }}</p>
				</view>
				<view>
					<p>当前状态</p>
					<p>{{ msg ? '支付成功' : '支付失败' }}</p>
				</view>
				<view>
					<p>支付方式</p>
					<p>微信支付</p>
				</view>
				<view>
					<p>交易时间</p>
					<p>{{ orderInfo.createTime }}</p>
				</view>
			</view>
			<view class="footer"><a @tap="backHomepage">返回首页</a></view>
		</view>
	</view>
</template>

<script>
import api from '@/utils/api.js';
export default {
	data() {
		return {
			orderInfo: {
				price: 0
			},
			msg: true
		};
	},
	onLoad(opt) {
		let that = this;
		if (opt.orderPk != null && opt.orderPk != '') {
			api.getOrder({
				orderPk: opt.orderPk,
				userPk: opt.userPk
			}).then(res => {
				that.orderInfo = res.data.orderInfo;
				
			});
		}
	},
	methods: {
		back(){
			uni.navigateBack();
		},
		backHomepage() {
			uni.switchTab({
				url: '../index/index'
			});
		}
		/* 		gotoBack() {
			uni.navigateBack({
				delta: 2
			});
		} */
	}
};
</script>

<style lang="scss">
uni-page-body {
	height: 100%;
}

.finshPage {
	background-color: #f5f9fc;
	height: 100%;

	.b-w {
		background-color: white;

		.payPrice {
			text-align: center;
			padding: 72.46376upx 0;
			margin: 0 36.23188upx;
			border-bottom: 1.81159upx solid #d0d0d0;

			image {
				width: 126.81159upx;
				height: 126.81159upx;
			}

			h2 {
				font-size: 36.23188upx;
				margin: 18.11594upx;
			}

			h4 {
				font-size: 81.52173upx;
				font-weight: 500;
			}
		}

		.payDetails {
			padding: 18.11594upx;
			color: #666;

			view {
				display: flex;
				margin: 18.11594upx 32.60869upx;
				font-size: 28.9855upx;

				p:nth-child(1) {
					flex: 0.3;

					.m-l {
						margin-left: 59.7826upx;
					}
				}

				p:nth-child(2) {
					text-align: right;
					flex: 0.7;
				}
			}
		}

		.footer {
			display: flex;
			justify-content: center;
			text-align: center;
			font-size: 25.36231upx;
			color: cornflowerblue;
			padding: 72.46376upx;

			a {
				border-bottom: 1px solid cornflowerblue;
				margin: 0 9.05797upx;
			}
		}
	}
}
</style>
