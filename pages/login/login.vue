<template>
	<view class="loginPage">
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="登录"></uni-nav-bar>
		<view class="company-icon">
			<image class="logo-avatar" :src="wxUserInfo.avatarUrl?wxUserInfo.avatarUrl:''" mode="cover"></image>
			<view class="accountNo">
				{{wxUserInfo.nickName?wxUserInfo.nickName:''}}
			</view>
			<button class="loginRow" type='primary' open-type='getPhoneNumber' @getphonenumber='getPhoneNumber'>登录</button>
		</view>
		<authorize v-if="isAuthorizeShow" :name='appName' @GetUserInfo="getUserInfo"></authorize>
	</view>
</template>
<script>
	import authorize from '@/components/authorize'	
	import gwx from '@/utils/wx'
	import api from "@/utils/api"
	import util from "@/utils/util"
	import config from "@/utils/config"
	import user from "@/services/user"
	var app = getApp();
	export default {
		components: {
			authorize
		},
		data() {
			return {
				isAuthorizeShow: false,
				wxUserInfo: {},
				appName: '',
				userInfo: {
					userName: '',
					password: ''
				}
			}
		},
		onLoad: function(option) {
			this.appName = config.APPNAME
			gwx.checkSession().then(()=>{
				this.goLogin();
			}).catch((err) => {
				this.isAuthorizeShow = true;
				this.goLogin();
			})
		},
		methods: {
			back(){
				uni.navigateBack();
			},
			getUserInfo: function(res) {
				this.isAuthorizeShow = false
				this.wxUserInfo = res.userInfo
				this.goLogin();
			},
			goLogin: function() {
				gwx.loginUserInfo().then((res)=>{
					console.log("============",res)
					this.wxUserInfo = res.userInfo
				}).catch((err) => {})
			},
			getPhoneNumber(res) {
				console.log(res.detail)
				if (res.detail.errMsg == 'getPhoneNumber:ok') {
					user.authorizePhone(res.detail).then(()=>{
						uni.navigateBack({
							data:1
						})
					}).catch((err) => {
						console.log("登录失败")
					})
				}else{
					
				}
			}
		}
	};
</script>

<style lang="scss">
	.loginPage {
		background-color: #ffffff;
		height: 100%;
		.company-icon {
			width: 70%;
			margin: auto;
			text-align: center;
			padding-top:50%;
			.logo-avatar {
				width: 128rpx;
				height: 128rpx;
				margin: 20rpx;
				border-radius: 50%;
			}
			.accountNo {
				text-align: center;
				padding: 9.05797upx;
				margin-bottom: 54.34782upx;
			}
			.loginRow {
				
			}
		}
		
	}
</style>
