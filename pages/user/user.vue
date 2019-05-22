<template>
	<view class="center">
		<view class="logo" :hover-class="!login ? 'logo-hover' : ''">
			<view class="logo-header">
				<view class="portrait" @click="goLogin"><image :src="login ? userInfo.avatarUrl : avatarUrl" mode="aspectFill"></image></view>
				<view class="uer-name">
					<text>{{ login ? userInfo.name : '您未登录' }}</text>
				</view>
				<view class="row">
					<view class="row-dock" @tap="goDiscounts">
						<image src="../../static/images/user/coupon.png" mode="aspectFill"></image>
						<view><text>优惠卷</text></view>
					</view>
					<view class="row-dock" @tap="gotoCollect">
						<image src="../../static/images/user/collection.png" mode="aspectFill"></image>
						<view><text>收藏</text></view>
					</view>
					<view class="row-dock" @tap="gotoShare">
						<image src="../../static/images/user/share.png" mode="aspectFill"></image>
						<view><text>分享</text></view>
					</view>
				</view>
				<view class="member" @tap="gotoMember">
					<view class="row-dock">
						<image src="../../static/images/user/vip.png" mode="aspectFill"></image>
						<text>钻石会员</text>
					</view>
					<view class="row-dock" style="justify-content: flex-end;"><text>会员积分规则>></text></view>
				</view>
			</view>
		</view>

		<view class="center-list">
			<view @tap="invoiceTitle()" hover-class="color-hover">
				<image src="../../static/images/user/feedback.png" mode=""></image>
				<span>发票抬头</span>
				<image src="../../static/images/index/right.png" mode=""></image>
			</view>
			<view @tap="gotoAddress()" hover-class="color-hover">
				<image src="../../static/images/user/position.png" mode=""></image>
				<span>收件地址</span>
				<image src="../../static/images/index/right.png" mode=""></image>
			</view>
			<view @tap="makingCall('12345678910')" hover-class="color-hover">
				<image src="../../static/images/user/phone.png" mode=""></image>
				<span>联系客服</span>
				<image src="../../static/images/index/right.png" mode=""></image>
			</view>
			<view @tap="gotoUs" hover-class="color-hover">
				<image src="../../static/images/user/about.png" mode=""></image>
				<span>关于我们</span>
				<image src="../../static/images/index/right.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
import user from '@/services/user.js';
import api from '@/utils/api.js';
export default {
	data() {
		return {
			login: false,
			avatarUrl: '../../static/images/user/user-img.jpg',
			userInfo: {}
		};
	},
	onShow() {
		var that = this;
		user.isUserinfo()
			.then(res => {
				user.getUserInfo().then(res => {
					wx.getUserInfo({
						success(res) {
							that.login = true;
							that.userInfo.avatarUrl = res.userInfo.avatarUrl;
							that.userInfo.name = res.userInfo.nickName;
						}
					});
				});
			})
			.catch(res => {
				uni.navigateTo({
					url: '../login/login'
				});
			});
	},
	methods: {
		goLogin() {
			/* if (!this.login) {
				uni.navigateTo({
					url: '../login/login'
				});
			} */
			if (!this.login) {
				uni.navigateTo({
					url: '../login/login'
				});
			}
		},
		goDiscounts() {
			if (this.login) {
				uni.navigateTo({
					url: '../discounts/discounts'
				});
			} else {
				uni.showToast({
					title: '请先登录！'
				});
			}
		},
		gotoUs() {
			uni.navigateTo({
				url: '../aboutUs/aboutUs'
			});
		},
		//跳转收藏
		gotoCollect() {
			if (this.login) {
				uni.navigateTo({
					url: '../collect/collect'
				});
			} else {
				uni.showToast({
					title: '请先登录！'
				});
			}
		},
		gotoShare() {
			uni.navigateTo({
				url: '../share/share'
			});
		},
		makingCall(phoneNumber) {
			uni.makePhoneCall({
				phoneNumber: phoneNumber
			});
		},
		gotoMember() {
			uni.navigateTo({
				url: '../member/member'
			});
		},
		//发票抬头
		invoiceTitle() {
			uni.navigateTo({
				url: '../invoice/updList?showType=UP'
			});
		},
		gotoAddress() {
			uni.navigateTo({
				url: '../invoice/updList?showType=ADDRESS'
			});
		}
	}
};
</script>

<style>
page {
	height: 100%;
	background: #f5f9fc;
}
.center {
	background: #fff;
}
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
	width: 100%;
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
.logo-header .row .row-dock view text {
	color: #5a450c;
	font-size: 25.36231upx;
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
	flex: 1;
	text-align: center;
	display: flex;
	vertical-align: middle;
	align-items: center;
}
.logo-header .member .row-dock image {
	width: 16px;
	height: 16px;
	vertical-align: middle;
}
.center-list .color-hover {
	background-color: #f7f9fb;
}
.center-list view {
	display: flex;
	vertical-align: middle;
	align-items: center;
	padding: 18.11594upx 36.23188upx;
	border-top: 0.99637upx solid #f7f9fb;
}
.center-list view image:nth-child(1) {
	width: 43.47826upx;
	height: 43.47826upx;
}
.center-list view image:nth-child(3) {
	width: 32.60869upx;
	height: 32.60869upx;
}
.center-list view span {
	flex: 1;
	padding-left: 9.05797upx;
	color: #333;
}
</style>
