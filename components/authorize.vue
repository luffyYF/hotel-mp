<template>
	<view class="block-p">
		<view class="block">
			<view class="logo">
				<image bindtap="bindViewTap" class="logo-avatar" src="../static/images/authorize/authorize.jpg" mode="cover"></image>
				<text class="logo-nickname">{{ name ? name : '豪斯' }}</text>
			</view>
			<view class="comten">
				<view>需要您的授权才能正常使用哦！</view>
				<view><label class="label">·请允许我们获得您的公开资讯</label></view>
				<view><label class="label">·我们不会公布您的这些信息</label></view>
				<view><label class="label">·只是为了给您提供更好的服务</label></view>
			</view>
			<view class="button-p"><button type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">允许</button></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		name: String
	},
	methods: {
		//授权成功
		bindGetUserInfo: function(res) {
			if (res.detail.userInfo) {
				var timestamp = Date.parse(new Date());
				var expiration = timestamp + 60 * 60 * 1000;
				uni.setStorageSync('wxUserInfo_expiration', expiration);
				uni.setStorageSync('wxUserInfo', res.detail);
				// this.isShow = false;
				this.$emit('GetUserInfo', res.detail);
			}
		}
	}
};
</script>

<style>
.block-p {
	height: 100%;
	width: 100%;
	background-color: rgba(37, 37, 37, 0.5);
	position: fixed;
	top: 0;
	text-align: center;
	z-index: 9999;
}

.block {
	background-color: white;
	border-radius: 8rpx;
	margin-top: 30%;
	padding: 40rpx;
	display: inline-block;
}

.logo {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.logo-avatar {
	width: 128rpx;
	height: 128rpx;
	margin: 20rpx;
	border-radius: 50%;
}

.logo-nickname {
	color: rgb(8, 8, 8);
	font-size: 33rpx;
}

.comten {
	border-top: 1rpx solid rgba(216, 214, 214, 0.4);
	margin-top: 30rpx;
	padding: 10rpx 0rpx;
	padding-top: 5rpx;
	text-align: left;
}

.comten view:first-child {
	color: rgb(8, 8, 8);
	font-size: 33rpx;
}

.comten view {
	margin-top: 10rpx;
}

.button-p {
	margin-top: 20rpx;
}

button {
	line-height: 1.55555556;
}

.label {
	color: rgb(146, 142, 142);
	font-size: 28rpx;
}
</style>
