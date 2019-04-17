<template>
	<view class="registerPage">
		<view class="registerContent">
			<view>
				<image src="../../static/images/user/user-icon.png" mode=""></image>
				<input type="text" placeholder="用户名" value="" />
			</view>
			<view>
				<image src="../../static/images/user/telphone.png" mode=""></image>
				<input type="text" placeholder="手机号码" value="" />
			</view>
			<view>
				<image src="../../static/images/user/security.png" mode=""></image>
				<input type="text" placeholder="验证码" value="" />
				<span>获取验证码</span>
			</view>
			<view>
				<image src="../../static/images/user/pwd.png" mode=""></image>
				<input type="password" placeholder="密码" value="" />
			</view>
			<view>
				<image src="../../static/images/user/pwd.png" mode=""></image>
				<input type="password" placeholder="确认密码" value="" />
			</view>
			<view>
				<image src="../../static/images/user/recommend.png" mode=""></image>
				<input type="text" placeholder="推荐人号码(选填)" value="" />
			</view>
		</view>
		<view class="btnRow"><button>注册</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.registerPage {
	padding: 27.17391upx;
	.registerContent {
		view {
			display: flex;
			vertical-align: middle;
			align-items: center;
			padding: 32.60869upx 27.17391upx;
			border-bottom: 0.99637upx solid #e8ebec;
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
		}
	}
	.btnRow {
		padding-top: 36.23188upx;
		button {
			color: white;
			border-radius: 45.28985upx;
			background: -webkit-gradient(linear, left top, left bottom, from(#cda754), to(#e5c893)) !important;
			background: linear-gradient(to bottom, #cda754, #e5c893) !important;
		}
	}
}
</style>
