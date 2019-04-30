<template>
	<view class="PayPage">
		<view class="reminder">
			<view class="reminder-title">
				<view class="re-icon"><image src="../../static/images/room/succees.png" mode=""></image></view>
				<view class="re-content">
					<h2>提交订单完成，请尽快完成付款！</h2>
					<p>订单为您保留30分钟，请及时付款，超时订单将自动取消!</p>
				</view>
			</view>
			<view class="re-details">
				<p>
					房费：
					<span>￥166.4</span>
				</p>
				<p>
					住房押金：
					<span>免押金</span>
				</p>
				<p>
					待付总金额：
					<span>￥166.4</span>
				</p>
			</view>
		</view>
		<view class="sel-title"><p>选择支付方式</p></view>
		<view class="select-mode">
			<image src="../../static/images/room/wx.jpg" mode=""></image>
			<p>微信支付</p>
		</view>
		<view class="footer">
			<a @tap="backHomepage">返回首页</a>
			|
			<a @tap="gotoBack">返回订单页面</a>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad(opt) {
		console.log(JSON.stringify(opt.keyValue));
	},
	methods: {
		backHomepage() {
			uni.navigateTo({
				url: '../index/index'
			});
		},
		gotoBack() {
			uni.navigateBack({
				delta:1
			})
		}
	}
};
</script>

<style>
.PayPage {
	background-color: #f5f9fc;
	height: 100%;
}
uni-page-body {
	height: 100%;
}
.PayPage .reminder {
	background-color: white;
	border-bottom: 1px solid #eee;
}
.PayPage .reminder-title {
	display: flex;
	padding: 36.23188upx 0 36.23188upx 28.9855upx;
	vertical-align: middle;
	align-items: center;
	background-color: white;
	border-bottom: 1px solid #eee;
}
.PayPage .reminder-title > .re-icon {
	flex: 0.2;
	text-align: center;
}
.PayPage .reminder-title > .re-icon > image {
	width: 90.57971upx;
	height: 90.57971upx;
}
.PayPage .reminder-title > .re-content {
	flex: 0.8;
}
.PayPage .reminder-title > .re-content > h2 {
	font-size: 28.9855upx;
	font-weight: 400;
}
.PayPage .reminder-title > .re-content > p {
	font-size: 25.36231upx;
	color: #999999;
	line-height: 20px;
}
.PayPage .reminder .re-details {
	padding: 27.17391upx 28.9855upx;
}
.PayPage .reminder .re-details > p {
	color: #333333;
	background-color: white;
	font-size: 25.36231upx;
	margin: 14.49275upx;
	line-height: normal;
}
.PayPage .reminder .re-details > p > span {
	color: #f72845;
	font-size: 27.17391upx;
}
.PayPage .sel-title {
	padding: 9.05797upx 28.9855upx;
}
.PayPage .sel-title p {
	font-size: 21.73913upx;
	color: #666666;
	margin: 19.92753upx 0;
}
.PayPage .select-mode {
	background-color: white;
	padding: 21.73913upx 28.9855upx;
	display: flex;
	vertical-align: middle;
	align-items: center;
	border-top: 1px solid #eee;
	border-bottom: 1px solid #eee;
}
.PayPage .select-mode > image {
	width: 72.46376upx;
	height: 72.46376upx;
}
.PayPage .select-mode > p {
	font-size: 25.36231upx;
	margin-left: 18.11594upx;
}
.footer {
	display: flex;
	padding-top: 181.15942upx;
	vertical-align: middle;
	align-items: center;
	justify-content: center;
	background-color: white;
}
.footer > a {
	color: #007aff;
	margin: 18.11594upx;
}
</style>
