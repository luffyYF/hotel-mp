<template>
	<view class="loginView">
		<view class="logoImg">
			<image src="../../static/images/user/logo3.png" mode=""></image>
		</view>
		<view class="top_view"><h1>你好,请登录!</h1></view>
		<form class="loginFrom" @submit="login">
			<view class="accountNo">
				<image src="../../static/images/user/telphone.png" mode=""></image>
				<input type="text" placeholder="请输入手机号码" value="" />
			</view>
			<view :class="flag?'verification':'pwd'">
				<image :src="flag?'../../static/images/user/security.png':'../../static/images/user/pwd.png'" mode=""></image>
				<input type="text"  :placeholder="flag?'请输入验证码':'请输入密码'" value="" />
				<span>获取验证码</span>
			</view>
			<view class="forgetPwd">
				<image src="../../static/images/user/forgetPwd.png" mode=""></image>
				<span @tap="forget">忘记密码</span>
			</view>
			<view class="loginRow"><button class="loginBtn">登录</button></view>
			<view class="selectElse">
				<span @tap="register">账号注册</span>
				<span>|</span>
				<span @tap="pwdLogin">{{flag?'密码登录':'验证码登录'}}</span>
			</view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			flag:false
		};
	},
	methods: {
		login(e) {
			console.log('得到账号:' + e.detail.value.nameValue + ';得到密码:' + e.detail.value.passwordValue);
		},
		register() {
			uni.navigateTo({
				url:'register'
			})
		},
		pwdLogin(){
			this.flag=!this.flag;
		},
		forget(){
			uni.navigateTo({
				url:'changePwd'
			})
		}
	}
};
</script>

<style lang="scss">
.loginView {
	padding: 90.57971upx 36.23188upx 54.34782upx 36.23188upx;
	.logoImg{
		text-align: center;
		image{
			width: 271.73913upx;
			height: 271.73913upx;
			
		}
	}
	
	.top_view {
		h1 {
			font-size: 45.28985upx;
			font-weight: 500;
			margin: 36.23188upx 0;
		}
	}
	.verification,
	.accountNo {
		display: flex;
		vertical-align: middle;
		align-items: center;
		padding: 39.85507upx 0;
		border-bottom: 0.99637upx solid #e8ebec;
		image {
			width: 36.23188upx;
			height: 36.23188upx;
			margin-right: 36.23188upx;
		}
		span {
			flex: 1;
			text-align: right;
			font-size: 28.9855upx;
			color: #cda754;
		}
	}
	.pwd{
		display: flex;
		vertical-align: middle;
		align-items: center;
		padding: 39.85507upx 0;
		border-bottom: 0.99637upx solid #e8ebec;
		image {
			src: '../../static/images/user/pwd.png';
			width: 36.23188upx;
			height: 36.23188upx;
			margin-right: 36.23188upx;
		}
		span{
			display: none
		}
	}
	.forgetPwd{
		text-align: right;
		display: flex;
		vertical-align: middle;
		align-items: center;
		justify-content: flex-end;
		padding-top: 18.11594upx;
		image{
			width: 36.23188upx;
			height: 36.23188upx;
			margin-right: 9.05797upx;
		}
		span{
			color: #cda754
		}
	}
	.loginRow {
		margin: 63.40579upx 0;
		.loginBtn {
			color: white;
			border-radius: 45.28985upx;
			background: -webkit-gradient(linear, left top, left bottom, from(#cda754), to(#e5c893)) !important;
			background: linear-gradient(to bottom, #cda754, #e5c893) !important;
		}
	}
	.selectElse{
		text-align: center;
		color: #cda754;
		span{
			margin: 0 9.05797upx;
		}
	}
}
</style>
