<template>
	<view class="forgetPage">
		<view class="forgetContent">
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
		</view>
		<view class="btnRow"><button>修改</button></view>
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
.forgetPage {
	padding: 27.17391upx;
	.forgetContent {
		view {
			display: flex;
			vertical-align: middle;
			align-items: center;
			padding:32.60869upx 27.17391upx;
			border-bottom: 0.55px solid #e8ebec;
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
		margin-top:45.28985upx;
		button {
			color: white;
			border-radius: 45.28985upx;
			background: -webkit-gradient(linear, left top, left bottom, from(#cda754), to(#e5c893)) !important;
			background: linear-gradient(to bottom, #cda754, #e5c893) !important;
		}
	}
}
</style>
