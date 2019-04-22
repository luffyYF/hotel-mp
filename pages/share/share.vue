<template>
	<view>
		<view class="share-img1"><image src="../../static/images/user/share_img.jpg" mode="widthFix"></image></view>
		<view class="share-img2">
			<view>
				<image src="../../static/images/user/wx.png" mode=""></image>
				<p>微信好友</p>
			</view>
			<view>
				<image src="../../static/images/user/moments.png" mode=""></image>
				<p>微信好友</p>
			</view>
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
.share-img1 {
	image {
		width: 100%;
	}
}
.share-img2 {
	display: flex;
	vertical-align: middle;
	align-content: center;
	justify-content: center;
	view {
		flex: 1;
		text-align: center;
		image {
			padding-top: 90.57971upx;
			width: 108.69565upx;
			height: 108.69565upx;
		}
		
	}
}
</style>
