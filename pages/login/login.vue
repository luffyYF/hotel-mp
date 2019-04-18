<template>
	<view class="loginPage">
		<image class="loginback" src="../../static/images/login/loginback.jpg" mode=""></image>
		<view class="company-icon">
			<image src="../../static/images/login/logo.png" mode=""></image>
			<h3>豪斯格兰</h3>
		</view>
		<view class="form">
			<view class="accountNo">
				<image src="../../static/images/login/telphone.png" mode=""></image>
				<input type="text" placeholder="请输入您的手机号码" value="" />
			</view>
			<view class="verification">
				<image src="../../static/images/login/security.png" mode=""></image>
				<input type="text" placeholder="请输入验证码" value="" />
				<span>验证码</span>
			</view>
			<view class="loginRow"><button class="loginBtn">绑定</button></view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss">
page {
	height: 100%;
}
.loginPage {
	.company-icon,.form{
		position: relative;
		bottom: -90.57971upx;
	}
	.loginback{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.company-icon {
		text-align: center;
		image {
			width: 181.15942upx;
			height: 181.15942upx;
		}
		h3 {
			color: #cda754;
			font-size: 36.23188upx;
			font-weight: 500;
		}
	}
	.form {
		margin: 0 72.46376upx;
		margin-top: 90.57971upx;
		.accountNo,
		.verification {
			display: flex;
			vertical-align: middle;
			align-items: center;
			color: white;
			padding: 9.05797upx;
			border-bottom: 0.99637upx solid white;
			margin-bottom: 45.28985upx;
			image {
				width: 45.28985upx;
				height: 45.28985upx;
				margin-right: 36.23188upx;
			}
			span {
				flex: 1;
				text-align: right;
				font-size: 28.9855upx;
				color: #cda754;
			}
			input {
				color: white;
			}
		}
	}
	.loginRow {
		.loginBtn {
			color: white;
			background-color: rgba($color: #cda754, $alpha: 0.7);
			margin: 90.57971upx 0;
		}
	}
}
</style>
