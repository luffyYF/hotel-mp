<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
			<view class="logo-header">
				<view class="portrait">
					<image :src="login ? uerInfo.avatarUrl :avatarUrl" mode="aspectFill"></image>
				</view>
				<view class="uer-name"><text>Hi，{{login ? uerInfo.name : '您未登录'}}</text></view>
				<view class="row">
					<view class="row-dock">
						<image src="../../static/images/user/coupon.png" mode="aspectFill"></image>
						<view><text>优惠卷</text></view>
					</view>
					<view class="row-dock">
						<image src="../../static/images/user/collection.png" mode="aspectFill"></image>
						<view><text>收藏</text></view>
					</view>
					<view class="row-dock">
						<image src="../../static/images/user/share.png" mode="aspectFill"></image>
						<view><text>分享</text></view>
					</view>
				</view>
				<view class="member">
					<view class="row-dock">
						<image src="../../static/images/user/vip.png" mode="aspectFill"></image>
						<text>钻石会员</text>
					</view>
					<view class="row-dock">
						<text> 会员积分规则>></text>
					</view>
				</view>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60c;</text>
				<text class="list-text">收藏图片</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe60d;</text>
				<text class="list-text">收藏图集</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">管理图片</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe61a;</text>
				<text class="list-text">上传图片</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="goAbout">
				<text class="list-icon">&#xe603;</text>
				<text class="list-text">关于</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe609;</text>
				<text class="list-text">帐号管理</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: false,
				avatarUrl: "../../static/images/user/user-img.jpg",
				uerInfo: {}
			}
		},
		methods: {
			goLogin() {
				if (!this.login) {
					uni.navigateTo({
						url: "../login/login"
					})
				}
			},
			goAbout() {

			}
		}
	}
</script>

<style>
	.logo {
		background: url(../../static/images/user/user-backimg.jpg) no-repeat center center;
		background-size: cover;
		padding: 80px 20px 30px;
	}

	.logo-header {
		background: url(../../static/images/user/card-top.png) no-repeat center center;
		background-size: cover;
		border-radius: 10px;
		position: relative;
		padding: 45px 0 0;
		-webkit-box-shadow: 1px 4px 40px #1c1706;
		box-shadow: 1px 4px 40px #1c1706;
	}

	.logo-header .portrait {
		width: 70px;
		height: 70px;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		top: -35px;
		margin-left: -35px;
		padding: 2px;
		overflow: hidden;
		background: #cdba83;
	}

	.logo-header .portrait image {
		width: 100% ;
		height: 100%;
		border-radius: 50%;
	}

	.logo-header .uer-name {
		margin: 0 0 5px;
		text-align: center;
		color: #2d240e;
		font-size: 16px;
		font-weight: 500;
	}
	.logo-header .row {
		display: flex;
		margin: 15px 0;
	}
	.logo-header .row .row-dock {
		width: 33.33%;
		text-align: center;
	}
	.logo-header .row .row-dock view text{
		color: #5a450c;
		font-size: 14upx;
	}
	.logo-header .row .row-dock image {
		width: 25px;
		height: 25px;
	}
	.logo-header .member {
		display: flex;
		padding: 0 5px;
		background: url(../../static/images/user/card-bottom.png) no-repeat center center;
		background-size: cover;
		border-radius: 0 0 10px 10px;
		color: #89733e;
	}
	.logo-header .member .row-dock {
		width: 33.33%;
		text-align: center;
		display: flex;
	}
	.logo-header .member .row-dock image {
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
</style>
